export interface SplashCursorOptions {
  simResolution?: number;
  dyeResolution?: number;
  densityDissipation?: number;
  velocityDissipation?: number;
  pressure?: number;
  pressureIterations?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;
  shading?: boolean;
  colorUpdateSpeed?: number;
  rainbow?: boolean;
  color?: string;
  intensity?: number;
  maxDpr?: number;
  idleStopMs?: number;
  respectReducedMotion?: boolean;
  zIndex?: number;
  mount?: HTMLElement;
}

export interface SplashCursorController {
  canvas: HTMLCanvasElement | null;
  config: Required<SplashCursorOptions>;
  running: boolean;
  splat: (x: number, y: number, dx: number, dy: number, colorOverride?: { r: number; g: number; b: number }) => void;
  set: (partial: Partial<SplashCursorOptions>) => void;
  destroy: () => void;
}

export const KNOB_DEFAULTS: Required<SplashCursorOptions> = {
  simResolution: 128,
  dyeResolution: 1440,
  densityDissipation: 3.5,
  velocityDissipation: 2.0,
  pressure: 0.1,
  pressureIterations: 20,
  curl: 12,
  splatRadius: 0.2,
  splatForce: 6000,
  shading: true,
  colorUpdateSpeed: 10,
  rainbow: true,
  color: "#ff0000",
  intensity: 0.15,
  maxDpr: 2,
  idleStopMs: 4000,
  respectReducedMotion: true,
  zIndex: 50,
  mount: typeof document !== "undefined" ? document.body : (null as any),
};

function hexToRgb(hex: string) {
  const c = hex.replace("#", "");
  const num = parseInt(c, 16);
  if (isNaN(num)) return { r: 1, g: 0, b: 0 };
  return {
    r: ((num >> 16) & 255) / 255,
    g: ((num >> 8) & 255) / 255,
    b: (num & 255) / 255,
  };
}

function HSVtoRGB(h: number, s: number, v: number) {
  let r = 0, g = 0, b = 0;
  let i = Math.floor(h * 6);
  let f = h * 6 - i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return { r, g, b };
}

export function splashCursor(userOptions?: SplashCursorOptions): SplashCursorController {
  const options: Required<SplashCursorOptions> = { ...KNOB_DEFAULTS, ...userOptions };

  if (
    options.respectReducedMotion &&
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return {
      canvas: null,
      config: options,
      running: false,
      splat: () => {},
      set: () => {},
      destroy: () => {},
    };
  }

  const mountTarget = options.mount || document.body;
  if (!mountTarget) {
    return {
      canvas: null,
      config: options,
      running: false,
      splat: () => {},
      set: () => {},
      destroy: () => {},
    };
  }

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = String(options.zIndex);
  canvas.style.background = "transparent";

  mountTarget.appendChild(canvas);

  let gl = canvas.getContext("webgl2", { alpha: true, preserveDrawingBuffer: false }) as WebGL2RenderingContext | null;
  let isWebGL2 = true;

  if (!gl) {
    gl = (canvas.getContext("webgl", { alpha: true, preserveDrawingBuffer: false }) ||
      canvas.getContext("experimental-webgl", { alpha: true, preserveDrawingBuffer: false })) as any;
    isWebGL2 = false;
  }

  if (!gl) {
    canvas.remove();
    return {
      canvas: null,
      config: options,
      running: false,
      splat: () => {},
      set: () => {},
      destroy: () => {},
    };
  }

  // Extensions
  let extHalfFloat: any = null;
  let extLinearFiltering: any = null;

  if (isWebGL2) {
    gl.getExtension("EXT_color_buffer_float");
    extLinearFiltering = gl.getExtension("OES_texture_float_linear");
  } else {
    extHalfFloat = gl.getExtension("OES_texture_half_float");
    gl.getExtension("OES_texture_half_float_linear");
    gl.getExtension("OES_texture_float");
    extLinearFiltering = gl.getExtension("OES_texture_float_linear");
  }

  gl.clearColor(0.0, 0.0, 0.0, 0.0);

  const halfFloatType = isWebGL2 ? (gl as WebGL2RenderingContext).HALF_FLOAT : extHalfFloat ? extHalfFloat.HALF_FLOAT_OES : gl.UNSIGNED_BYTE;

  function getSupportedFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number) {
    if (!isWebGL2) {
      return { internalFormat: format, format, type };
    }
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteTexture(texture);
    gl.deleteFramebuffer(fbo);

    if (status === gl.FRAMEBUFFER_COMPLETE) {
      return { internalFormat, format, type };
    }
    return null;
  }

  let texType = halfFloatType;
  let rgbaFormat: any = null;
  let rgFormat: any = null;
  let rFormat: any = null;

  if (isWebGL2) {
    const gl2 = gl as WebGL2RenderingContext;
    rgbaFormat = getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, halfFloatType);
    rgFormat = getSupportedFormat(gl2, gl2.RG16F, gl2.RG, halfFloatType) || rgbaFormat;
    rFormat = getSupportedFormat(gl2, gl2.R16F, gl2.RED, halfFloatType) || rgFormat;
  } else {
    rgbaFormat = { internalFormat: gl.RGBA, format: gl.RGBA, type: halfFloatType };
    rgFormat = rgbaFormat;
    rFormat = rgbaFormat;
  }

  // Common Vertex Shader
  const baseVertexShaderSource = isWebGL2 ? `#version 300 es
    precision highp float;
    in vec2 aPosition;
    out vec2 vUv;
    out vec2 vL;
    out vec2 vR;
    out vec2 vT;
    out vec2 vB;
    uniform vec2 texelSize;
    void main () {
      vUv = aPosition * 0.5 + 0.5;
      vL = vUv - vec2(texelSize.x, 0.0);
      vR = vUv + vec2(texelSize.x, 0.0);
      vT = vUv + vec2(0.0, texelSize.y);
      vB = vUv - vec2(0.0, texelSize.y);
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }` : `
    precision highp float;
    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;
    void main () {
      vUv = aPosition * 0.5 + 0.5;
      vL = vUv - vec2(texelSize.x, 0.0);
      vR = vUv + vec2(texelSize.x, 0.0);
      vT = vUv + vec2(0.0, texelSize.y);
      vB = vUv - vec2(0.0, texelSize.y);
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }`;

  // Helper Shaders
  const compileShader = (type: number, source: string) => {
    const shader = gl!.createShader(type)!;
    gl!.shaderSource(shader, source);
    gl!.compileShader(shader);
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      console.warn("Shader compile error:", gl!.getShaderInfoLog(shader));
    }
    return shader;
  };

  const createProgram = (vertexSource: string, fragmentSource: string) => {
    const program = gl!.createProgram()!;
    const vs = compileShader(gl!.VERTEX_SHADER, vertexSource);
    const fs = compileShader(gl!.FRAGMENT_SHADER, fragmentSource);
    gl!.attachShader(program, vs);
    gl!.attachShader(program, fs);
    gl!.linkProgram(program);
    return program;
  };

  const prefixFS = isWebGL2 ? `#version 300 es
    precision highp float;
    precision highp sampler2D;
    out vec4 fragColor;
    #define gl_FragColor fragColor
    #define texture2D texture
  ` : `
    precision highp float;
    precision highp sampler2D;
  `;

  // Shaders
  const copyShader = createProgram(baseVertexShaderSource, prefixFS + `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    void main () {
      gl_FragColor = texture2D(uTexture, vUv);
    }
  `);

  const clearShader = createProgram(baseVertexShaderSource, prefixFS + `
    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;
    void main () {
      gl_FragColor = value * texture2D(uTexture, vUv);
    }
  `);

  const splatShader = createProgram(baseVertexShaderSource, prefixFS + `
    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;
    void main () {
      vec2 p = vUv - point.xy;
      p.x *= aspectRatio;
      vec3 splat = exp(-dot(p, p) / radius) * color;
      vec3 base = texture2D(uTarget, vUv).xyz;
      gl_FragColor = vec4(base + splat, 1.0);
    }
  `);

  const advectionShader = createProgram(baseVertexShaderSource, prefixFS + `
    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;
    void main () {
      vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
      vec4 result = texture2D(uSource, coord);
      float decay = 1.0 + dissipation * dt;
      gl_FragColor = result / decay;
    }
  `);

  const divergenceShader = createProgram(baseVertexShaderSource, prefixFS + `
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;
      vec2 C = texture2D(uVelocity, vUv).xy;
      if (vL.x < 0.0) { L = -C.x; }
      if (vR.x > 1.0) { R = -C.x; }
      if (vT.y > 1.0) { T = -C.y; }
      if (vB.y < 0.0) { B = -C.y; }
      float div = 0.5 * (R - L + T - B);
      gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
  `);

  const curlShader = createProgram(baseVertexShaderSource, prefixFS + `
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    void main () {
      float L = texture2D(uVelocity, vL).y;
      float R = texture2D(uVelocity, vR).y;
      float T = texture2D(uVelocity, vT).x;
      float B = texture2D(uVelocity, vB).x;
      float vorticity = R - L - T + B;
      gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
  `);

  const vorticityShader = createProgram(baseVertexShaderSource, prefixFS + `
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;
    void main () {
      float L = texture2D(uCurl, vL).x;
      float R = texture2D(uCurl, vR).x;
      float T = texture2D(uCurl, vT).x;
      float B = texture2D(uCurl, vB).x;
      float C = texture2D(uCurl, vUv).x;
      vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
      float l = length(force);
      force = (l > 0.0001) ? (force / l) : vec2(0.0);
      force *= curl * C;
      force.y *= -1.0;
      vec2 vel = texture2D(uVelocity, vUv).xy;
      gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
    }
  `);

  const pressureShader = createProgram(baseVertexShaderSource, prefixFS + `
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;
    void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      float div = texture2D(uDivergence, vUv).x;
      float pressure = (L + R + T + B - div) * 0.25;
      gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
  `);

  const gradSubShader = createProgram(baseVertexShaderSource, prefixFS + `
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;
    void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity.xy -= vec2(R - L, T - B) * 0.5;
      gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
  `);

  const displayShader = createProgram(baseVertexShaderSource, prefixFS + `
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;
    void main () {
      vec3 c = texture2D(uTexture, vUv).rgb * intensity;
      float a = max(c.r, max(c.g, c.b));
      gl_FragColor = vec4(c, a);
    }
  `);

  // Quad Geometry
  const quadBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  function bindQuad(program: WebGLProgram) {
    const posLoc = gl!.getAttribLocation(program, "aPosition");
    gl!.enableVertexAttribArray(posLoc);
    gl!.bindBuffer(gl!.ARRAY_BUFFER, quadBuffer);
    gl!.vertexAttribPointer(posLoc, 2, gl!.FLOAT, false, 0, 0);
  }

  // FBO setup helper
  function createFBO(w: number, h: number, formatObj: any) {
    gl!.activeTexture(gl!.TEXTURE0);
    const texture = gl!.createTexture()!;
    gl!.bindTexture(gl!.TEXTURE_2D, texture);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, extLinearFiltering ? gl!.LINEAR : gl!.NEAREST);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, extLinearFiltering ? gl!.LINEAR : gl!.NEAREST);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
    gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
    gl!.texImage2D(gl!.TEXTURE_2D, 0, formatObj.internalFormat, w, h, 0, formatObj.format, formatObj.type, null);

    const fbo = gl!.createFramebuffer()!;
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
    gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, texture, 0);
    gl!.viewport(0, 0, w, h);
    gl!.clear(gl!.COLOR_BUFFER_BIT);

    return {
      texture,
      fbo,
      width: w,
      height: h,
      attach(id: number) {
        gl!.activeTexture(gl!.TEXTURE0 + id);
        gl!.bindTexture(gl!.TEXTURE_2D, texture);
        return id;
      },
    };
  }

  function createDoubleFBO(w: number, h: number, formatObj: any) {
    let fbo1 = createFBO(w, h, formatObj);
    let fbo2 = createFBO(w, h, formatObj);
    return {
      get read() { return fbo1; },
      set read(val) { fbo1 = val; },
      get write() { return fbo2; },
      set write(val) { fbo2 = val; },
      swap() {
        const temp = fbo1;
        fbo1 = fbo2;
        fbo2 = temp;
      },
    };
  }

  let simWidth = 128;
  let simHeight = 128;
  let dyeWidth = 1024;
  let dyeHeight = 1024;

  let density: any = null;
  let velocity: any = null;
  let divergence: any = null;
  let curl: any = null;
  let pressure: any = null;

  function initFramebuffers() {
    const dpr = Math.min(window.devicePixelRatio || 1, options.maxDpr);
    const width = Math.floor(window.innerWidth * dpr);
    const height = Math.floor(window.innerHeight * dpr);

    const aspect = width / height;

    if (aspect > 1) {
      simHeight = options.simResolution;
      simWidth = Math.round(options.simResolution * aspect);
      dyeHeight = options.dyeResolution;
      dyeWidth = Math.round(options.dyeResolution * aspect);
    } else {
      simWidth = options.simResolution;
      simHeight = Math.round(options.simResolution / aspect);
      dyeWidth = options.dyeResolution;
      dyeHeight = Math.round(options.dyeResolution / aspect);
    }

    if (density) {
      // Clean up previous
      gl!.deleteTexture(density.read.texture);
      gl!.deleteFramebuffer(density.read.fbo);
      gl!.deleteTexture(density.write.texture);
      gl!.deleteFramebuffer(density.write.fbo);

      gl!.deleteTexture(velocity.read.texture);
      gl!.deleteFramebuffer(velocity.read.fbo);
      gl!.deleteTexture(velocity.write.texture);
      gl!.deleteFramebuffer(velocity.write.fbo);

      gl!.deleteTexture(divergence.texture);
      gl!.deleteFramebuffer(divergence.fbo);
      gl!.deleteTexture(curl.texture);
      gl!.deleteFramebuffer(curl.fbo);

      gl!.deleteTexture(pressure.read.texture);
      gl!.deleteFramebuffer(pressure.read.fbo);
      gl!.deleteTexture(pressure.write.texture);
      gl!.deleteFramebuffer(pressure.write.fbo);
    }

    density = createDoubleFBO(dyeWidth, dyeHeight, rgbaFormat);
    velocity = createDoubleFBO(simWidth, simHeight, rgFormat);
    divergence = createFBO(simWidth, simHeight, rFormat);
    curl = createFBO(simWidth, simHeight, rFormat);
    pressure = createDoubleFBO(simWidth, simHeight, rFormat);
  }

  initFramebuffers();

  let lastTime = Date.now();
  let colorTimer = 0;
  let colorHue = Math.random();
  let animId: number | null = null;
  let lastInputTime = Date.now();
  let isRunning = false;

  const splatQueue: Array<{ x: number; y: number; dx: number; dy: number; color?: { r: number; g: number; b: number } }> = [];

  function addSplat(x: number, y: number, dx: number, dy: number, customColor?: { r: number; g: number; b: number }) {
    splatQueue.push({ x, y, dx, dy, color: customColor });
    lastInputTime = Date.now();
    if (!isRunning) {
      startLoop();
    }
  }

  function applySplat(x: number, y: number, dx: number, dy: number, colorOverride?: { r: number; g: number; b: number }) {
    const aspect = canvas.width / canvas.height;
    let colorVal = colorOverride;

    if (!colorVal) {
      if (options.rainbow) {
        colorVal = HSVtoRGB(colorHue, 0.9, 1.0);
      } else {
        colorVal = hexToRgb(options.color);
      }
    }

    // Velocity splat
    gl!.useProgram(splatShader);
    gl!.viewport(0, 0, simWidth, simHeight);
    bindQuad(splatShader);
    gl!.uniform1i(gl!.getUniformLocation(splatShader, "uTarget"), velocity.read.attach(0));
    gl!.uniform1f(gl!.getUniformLocation(splatShader, "aspectRatio"), aspect);
    gl!.uniform2f(gl!.getUniformLocation(splatShader, "point"), x / canvas.width, 1.0 - y / canvas.height);
    gl!.uniform3f(gl!.getUniformLocation(splatShader, "color"), dx, -dy, 1.0);
    gl!.uniform1f(gl!.getUniformLocation(splatShader, "radius"), options.splatRadius / 100);
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, velocity.write.fbo);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    velocity.swap();

    // Dye splat
    gl!.viewport(0, 0, dyeWidth, dyeHeight);
    gl!.uniform1i(gl!.getUniformLocation(splatShader, "uTarget"), density.read.attach(0));
    gl!.uniform3f(gl!.getUniformLocation(splatShader, "color"), colorVal.r, colorVal.g, colorVal.b);
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, density.write.fbo);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    density.swap();
  }

  function render(dt: number) {
    gl!.disable(gl!.BLEND);

    // 1. Curl
    gl!.useProgram(curlShader);
    gl!.viewport(0, 0, simWidth, simHeight);
    bindQuad(curlShader);
    gl!.uniform2f(gl!.getUniformLocation(curlShader, "texelSize"), 1.0 / simWidth, 1.0 / simHeight);
    gl!.uniform1i(gl!.getUniformLocation(curlShader, "uVelocity"), velocity.read.attach(0));
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, curl.fbo);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

    // 2. Vorticity Confinement
    gl!.useProgram(vorticityShader);
    bindQuad(vorticityShader);
    gl!.uniform2f(gl!.getUniformLocation(vorticityShader, "texelSize"), 1.0 / simWidth, 1.0 / simHeight);
    gl!.uniform1i(gl!.getUniformLocation(vorticityShader, "uVelocity"), velocity.read.attach(0));
    gl!.uniform1i(gl!.getUniformLocation(vorticityShader, "uCurl"), curl.attach(1));
    gl!.uniform1f(gl!.getUniformLocation(vorticityShader, "curl"), options.curl);
    gl!.uniform1f(gl!.getUniformLocation(vorticityShader, "dt"), dt);
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, velocity.write.fbo);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    velocity.swap();

    // 3. Divergence
    gl!.useProgram(divergenceShader);
    bindQuad(divergenceShader);
    gl!.uniform2f(gl!.getUniformLocation(divergenceShader, "texelSize"), 1.0 / simWidth, 1.0 / simHeight);
    gl!.uniform1i(gl!.getUniformLocation(divergenceShader, "uVelocity"), velocity.read.attach(0));
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, divergence.fbo);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);

    // 4. Pressure decay & Jacobi iterations
    gl!.useProgram(clearShader);
    bindQuad(clearShader);
    gl!.uniform1i(gl!.getUniformLocation(clearShader, "uTexture"), pressure.read.attach(0));
    gl!.uniform1f(gl!.getUniformLocation(clearShader, "value"), options.pressure);
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, pressure.write.fbo);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    pressure.swap();

    gl!.useProgram(pressureShader);
    bindQuad(pressureShader);
    gl!.uniform2f(gl!.getUniformLocation(pressureShader, "texelSize"), 1.0 / simWidth, 1.0 / simHeight);
    gl!.uniform1i(gl!.getUniformLocation(pressureShader, "uDivergence"), divergence.attach(0));
    for (let i = 0; i < options.pressureIterations; i++) {
      gl!.uniform1i(gl!.getUniformLocation(pressureShader, "uPressure"), pressure.read.attach(1));
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, pressure.write.fbo);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      pressure.swap();
    }

    // 5. Gradient Subtract
    gl!.useProgram(gradSubShader);
    bindQuad(gradSubShader);
    gl!.uniform2f(gl!.getUniformLocation(gradSubShader, "texelSize"), 1.0 / simWidth, 1.0 / simHeight);
    gl!.uniform1i(gl!.getUniformLocation(gradSubShader, "uPressure"), pressure.read.attach(0));
    gl!.uniform1i(gl!.getUniformLocation(gradSubShader, "uVelocity"), velocity.read.attach(1));
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, velocity.write.fbo);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    velocity.swap();

    // 6. Advect Velocity
    gl!.useProgram(advectionShader);
    bindQuad(advectionShader);
    gl!.uniform2f(gl!.getUniformLocation(advectionShader, "texelSize"), 1.0 / simWidth, 1.0 / simHeight);
    gl!.uniform2f(gl!.getUniformLocation(advectionShader, "dyeTexelSize"), 1.0 / simWidth, 1.0 / simHeight);
    gl!.uniform1i(gl!.getUniformLocation(advectionShader, "uVelocity"), velocity.read.attach(0));
    gl!.uniform1i(gl!.getUniformLocation(advectionShader, "uSource"), velocity.read.attach(0));
    gl!.uniform1f(gl!.getUniformLocation(advectionShader, "dt"), dt);
    gl!.uniform1f(gl!.getUniformLocation(advectionShader, "dissipation"), options.velocityDissipation);
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, velocity.write.fbo);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    velocity.swap();

    // 7. Advect Dye
    gl!.viewport(0, 0, dyeWidth, dyeHeight);
    gl!.uniform2f(gl!.getUniformLocation(advectionShader, "dyeTexelSize"), 1.0 / dyeWidth, 1.0 / dyeHeight);
    gl!.uniform1i(gl!.getUniformLocation(advectionShader, "uVelocity"), velocity.read.attach(0));
    gl!.uniform1i(gl!.getUniformLocation(advectionShader, "uSource"), density.read.attach(1));
    gl!.uniform1f(gl!.getUniformLocation(advectionShader, "dissipation"), options.densityDissipation);
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, density.write.fbo);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    density.swap();

    // 8. Output to screen
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.enable(gl!.BLEND);
    gl!.blendFunc(gl!.ONE, gl!.ONE_MINUS_SRC_ALPHA);

    gl!.useProgram(displayShader);
    bindQuad(displayShader);
    gl!.uniform1i(gl!.getUniformLocation(displayShader, "uTexture"), density.read.attach(0));
    gl!.uniform1f(gl!.getUniformLocation(displayShader, "intensity"), options.intensity);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
  }

  function update() {
    const now = Date.now();
    let dt = Math.min((now - lastTime) / 1000, 1 / 60);
    if (dt <= 0) dt = 1 / 60;
    lastTime = now;

    if (options.rainbow) {
      colorTimer += dt;
      if (colorTimer >= 1 / options.colorUpdateSpeed) {
        colorTimer = 0;
        colorHue = (colorHue + 0.01) % 1.0;
      }
    }

    // Process splats
    while (splatQueue.length > 0) {
      const s = splatQueue.shift()!;
      applySplat(s.x, s.y, s.dx, s.dy, s.color);
    }

    render(dt);

    // Check idle timeout
    if (Date.now() - lastInputTime > options.idleStopMs) {
      stopLoop();
    } else {
      animId = requestAnimationFrame(update);
    }
  }

  function startLoop() {
    if (isRunning) return;
    isRunning = true;
    lastTime = Date.now();
    animId = requestAnimationFrame(update);
  }

  function stopLoop() {
    isRunning = false;
    if (animId !== null) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, options.maxDpr);
    const w = Math.floor(window.innerWidth * dpr);
    const h = Math.floor(window.innerHeight * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      initFramebuffers();
    }
  }

  resizeCanvas();

  // Pointer event handlers
  let lastPtrX = 0;
  let lastPtrY = 0;
  let ptrInitialized = false;

  function handlePointerMove(e: PointerEvent | MouseEvent | Touch) {
    const dpr = Math.min(window.devicePixelRatio || 1, options.maxDpr);
    const clientX = e.clientX * dpr;
    const clientY = e.clientY * dpr;

    if (!ptrInitialized) {
      lastPtrX = clientX;
      lastPtrY = clientY;
      ptrInitialized = true;
      return;
    }

    const dx = (clientX - lastPtrX) * options.splatForce;
    const dy = (clientY - lastPtrY) * options.splatForce;

    if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
      addSplat(clientX, clientY, dx, dy);
    }

    lastPtrX = clientX;
    lastPtrY = clientY;
  }

  function handlePointerDown(e: PointerEvent | MouseEvent | Touch) {
    const dpr = Math.min(window.devicePixelRatio || 1, options.maxDpr);
    const clientX = e.clientX * dpr;
    const clientY = e.clientY * dpr;

    lastPtrX = clientX;
    lastPtrY = clientY;
    ptrInitialized = true;

    // Burst click splat
    const kickX = 10 * (Math.random() - 0.5) * options.splatForce;
    const kickY = 30 * (Math.random() - 0.5) * options.splatForce;
    addSplat(clientX, clientY, kickX, kickY);
  }

  const onPointerMove = (e: PointerEvent) => handlePointerMove(e);
  const onPointerDown = (e: PointerEvent) => handlePointerDown(e);
  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0]);
    }
  };
  const onTouchStart = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handlePointerDown(e.touches[0]);
    }
  };

  const onResize = () => {
    resizeCanvas();
    lastInputTime = Date.now();
    if (!isRunning) startLoop();
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("resize", onResize);

  // Auto Attract mode demo (Lissajous trace) for initial paint
  let attractTime = 0;
  let attractAnim: number | null = null;
  let attractActive = true;
  const attractStartTime = Date.now();

  function stopAttract() {
    attractActive = false;
    if (attractAnim !== null) {
      cancelAnimationFrame(attractAnim);
      attractAnim = null;
    }
  }

  const stopAttractOnInput = () => stopAttract();
  window.addEventListener("pointermove", stopAttractOnInput, { once: true });
  window.addEventListener("pointerdown", stopAttractOnInput, { once: true });

  function attractStep() {
    if (!attractActive) return;

    if (Date.now() - attractStartTime > 12000) {
      stopAttract();
      return;
    }

    attractTime += 0.02;
    const dpr = Math.min(window.devicePixelRatio || 1, options.maxDpr);
    const w = window.innerWidth * dpr;
    const h = window.innerHeight * dpr;

    const x = w * (0.5 + 0.35 * Math.sin(attractTime * 2.8));
    const y = h * (0.4 + 0.25 * Math.sin(attractTime * 3.6 + 0.5));

    const dx = Math.cos(attractTime * 2.8) * options.splatForce * 0.4;
    const dy = Math.cos(attractTime * 3.6 + 0.5) * options.splatForce * 0.4;

    addSplat(x, y, dx, dy);
    attractAnim = requestAnimationFrame(attractStep);
  }

  // Start attract loop & initial render
  startLoop();
  attractStep();

  return {
    canvas,
    config: options,
    get running() { return isRunning; },
    splat(x: number, y: number, dx: number, dy: number, colorOverride?: { r: number; g: number; b: number }) {
      const dpr = Math.min(window.devicePixelRatio || 1, options.maxDpr);
      addSplat(x * dpr, y * dpr, dx * options.splatForce, dy * options.splatForce, colorOverride);
    },
    set(partial: Partial<SplashCursorOptions>) {
      Object.assign(options, partial);
    },
    destroy() {
      stopAttract();
      stopLoop();

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("pointermove", stopAttractOnInput);
      window.removeEventListener("pointerdown", stopAttractOnInput);
      window.removeEventListener("resize", onResize);

      if (gl) {
        const loseExt = gl.getExtension("WEBGL_lose_context");
        if (loseExt) loseExt.loseContext();
      }

      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    },
  };
}
