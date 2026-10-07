"use client"

import * as React from "react"

export const clamp = (v: number, lo: number, hi: number): number => (v < lo ? lo : v > hi ? hi : v)

/** "#3d6bff" / "#A8E635" → "168, 230, 53". Anything unparseable falls back. */
export const hexToRgb = (hex: string, fallback: string = "168, 230, 53"): string => {
  const m = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec((hex || "").trim())
  if (!m) return fallback
  const h = m[1].length === 3 ? m[1].replace(/./g, (c) => c + c) : m[1]
  const n = parseInt(h, 16)
  return ((n >> 16) & 255) + ", " + ((n >> 8) & 255) + ", " + (n & 255)
}

export const fitSize = (measuredAt100: number, target: number, cap: number): number => {
  if (!(measuredAt100 > 0) || !(target > 0)) return 0
  const size = (100 * target) / measuredAt100
  return cap > 0 ? Math.min(size, cap) : size
}

export const beamTarget = (u: number, lo: number = 30, hi: number = 82): number =>
  lo + (hi - lo) * clamp(Number.isFinite(u) ? u : 0.5, 0, 1)

export const drift = (t: number, centre: number = 58, amp: number = 9): number =>
  centre + amp * (0.7 * Math.sin(t * 0.21) + 0.3 * Math.sin(t * 0.077 + 1.3))

export const approach = (from: number, to: number, k: number, dt: number): number =>
  to + (from - to) * Math.pow(1 - clamp(k, 0, 1), clamp(dt, 0, 0.1) * 60)

export const baselineAt = (ascent: number, descent: number): number => {
  if (!(ascent > 0) || !(descent >= 0)) return 0.8
  return clamp(((100 - ascent - descent) / 2 + ascent) / 100, 0.5, 1.2)
}

export const wordHeight = (fontSize: number, baseline: number, cut: number): number =>
  Math.max(0, fontSize * (baseline + clamp(Number.isFinite(cut) ? cut : 0, -0.4, 0.4)))

const SANS = '"Outfit", "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif'

const measureBaseline = (family: string, weight: number, text: string): number => {
  try {
    const ctx = document.createElement("canvas").getContext("2d")
    if (!ctx) return 0.8
    ctx.font = weight + " 100px " + family
    const m = ctx.measureText(text)
    return baselineAt(m.fontBoundingBoxAscent, m.fontBoundingBoxDescent)
  } catch {
    return 0.8
  }
}

const CSS = `
.bwf {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  container-type: inline-size;
  background: var(--bwf-bg);
  color: var(--bwf-ink);
  font-family: var(--bwf-sans);
  -webkit-font-smoothing: antialiased;
  touch-action: pan-y;
}

.bwf-rule {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  z-index: 3;
  background: linear-gradient(90deg, rgba(var(--bwf-acc),.12), rgba(var(--bwf-acc),.6) var(--bwf-b), rgba(var(--bwf-acc),.12));
}

.bwf-sky {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.bwf-wash {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(120% 90% at 8% 0%, rgba(var(--bwf-acc),.15), transparent 55%),
    radial-gradient(90% 70% at 92% 8%, rgba(var(--bwf-acc),.10), transparent 60%),
    linear-gradient(180deg, rgba(var(--bwf-acc),.04), transparent 70%);
}

.bwf-bands {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(90deg, rgba(var(--bwf-acc),.03) 0 1.6cqw, transparent 1.6cqw 4.2cqw);
  -webkit-mask-image: linear-gradient(100deg, #000 0%, transparent 55%);
  mask-image: linear-gradient(100deg, #000 0%, transparent 55%);
  opacity: .8;
}

.bwf-beam {
  position: absolute;
  inset: 0;
  filter: blur(calc(1px + 1.6cqw));
  background: 
    linear-gradient(var(--bwf-ang), transparent calc(var(--bwf-b) - 11%), rgba(var(--bwf-acc),.08) calc(var(--bwf-b) - 5%), rgba(var(--bwf-acc),.32) var(--bwf-b), rgba(var(--bwf-acc),.06) calc(var(--bwf-b) + 4%), transparent calc(var(--bwf-b) + 9%)),
    linear-gradient(var(--bwf-ang), transparent calc(var(--bwf-b) - 34%), rgba(var(--bwf-acc),.08) calc(var(--bwf-b) - 27%), transparent calc(var(--bwf-b) - 20%));
}

.bwf-glow {
  position: absolute;
  inset: 0;
  opacity: var(--bwf-g);
  background: radial-gradient(circle 26cqw at var(--bwf-px) var(--bwf-py), rgba(var(--bwf-acc),.16), transparent 70%);
}

.bwf-grain {
  position: absolute;
  inset: 0;
  opacity: .12;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}

.bwf-content {
  position: relative;
  z-index: 2;
}

.bwf-word {
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin-top: clamp(16px, 4cqw, 48px);
}

.bwf-word-box {
  padding: 0 clamp(16px, 4cqw, 48px);
  max-width: 1280px;
  margin: 0 auto;
  box-sizing: border-box;
}

.bwf-word-in {
  display: inline-flex;
  white-space: nowrap;
  font-weight: var(--bwf-ww);
  line-height: 1;
  letter-spacing: -.045em;
  user-select: none;
  -webkit-user-select: none;
}

.bwf-lw {
  display: inline-block;
  translate: 0 0;
  transition: translate 1.25s cubic-bezier(.16,.84,.2,1) var(--bwf-d, 0ms);
}

.bwf[data-in='false'] .bwf-lw {
  translate: 0 85%;
}

.bwf-l {
  display: inline-block;
  cursor: pointer;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-repeat: no-repeat;
  background-size: var(--bwf-rw) var(--bwf-rh);
  background-position: calc(var(--bwf-x) * -1) calc(var(--bwf-y) * -1);
  background-image: 
    radial-gradient(circle 22cqw at var(--bwf-px) var(--bwf-py), rgba(var(--bwf-lit), calc(var(--bwf-g) * .85)), transparent 70%),
    linear-gradient(var(--bwf-ang), transparent calc(var(--bwf-b) - 9%), rgba(var(--bwf-lit),.65) calc(var(--bwf-b) - 1.5%), rgba(var(--bwf-lit),.85) var(--bwf-b), rgba(var(--bwf-lit),.25) calc(var(--bwf-b) + 3.5%), transparent calc(var(--bwf-b) + 8%)),
    linear-gradient(180deg, var(--bwf-wt) var(--bwf-top), var(--bwf-wf) var(--bwf-bot));
  transition: transform .5s cubic-bezier(.2,.9,.25,1.2), filter .4s;
  transform-origin: 50% 100%;
}

.bwf-l:hover {
  transform: translateY(-.045em);
  filter: brightness(1.35) saturate(1.2);
}

.bwf-l.is-hop {
  animation: bwf-hop .75s cubic-bezier(.2,.8,.2,1);
}

@keyframes bwf-hop {
  0% { transform: translateY(0) scale(1,1); }
  18% { transform: translateY(.02em) scale(1.06,.9); }
  45% { transform: translateY(-.14em) scale(.97,1.05); }
  70% { transform: translateY(.01em) scale(1.02,.97); }
  100% { transform: translateY(-.045em) scale(1,1); }
}

.bwf-foot {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 34%;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(var(--bwf-bg-rgb),.55) 55%, var(--bwf-bg));
}
`

export interface BeamWordmarkWrapperProps {
  children?: React.ReactNode
  wordmark?: string
  background?: string
  accent?: string
  wordTop?: string
  wordFoot?: string
  cut?: number
  animate?: boolean
  className?: string
}

export default function BeamWordmarkWrapper({
  children,
  wordmark = "UNITGROWTH",
  background = "#0B0D10",
  accent = "#A8E635",
  wordTop = "#A8E635",
  wordFoot = "#151e08",
  cut = 0.14,
  animate = true,
  className = "",
}: BeamWordmarkWrapperProps) {
  const word = wordmark.trim() || "UNITGROWTH"
  const letters = React.useMemo(() => Array.from(word), [word])

  const rootRef = React.useRef<HTMLElement>(null)
  const wordRef = React.useRef<HTMLDivElement>(null)
  const innerRef = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState(0)
  const [base, setBase] = React.useState(0.8)
  const [seen, setSeen] = React.useState(false)

  const ptr = React.useRef({ u: 0.5, x: 0, y: 0, inside: false })

  React.useLayoutEffect(() => {
    const root = rootRef.current
    const box = wordRef.current
    const inner = innerRef.current
    if (!root || !box || !inner) return
    let frame = 0
    const fit = () => {
      const wb = inner.parentElement ?? box
      const pad = parseFloat(getComputedStyle(wb).paddingLeft) || 0
      const target = wb.clientWidth - pad * 2
      inner.style.fontSize = "100px"
      const measured = inner.offsetWidth
      setBase(measureBaseline(getComputedStyle(inner).fontFamily, 800, word))
      const next = fitSize(measured, target, target * 0.42)
      inner.style.fontSize = next + "px"
      setSize(next)
      place()
    }
    const place = () => {
      const r = root.getBoundingClientRect()
      root.style.setProperty("--bwf-rw", r.width + "px")
      root.style.setProperty("--bwf-rh", r.height + "px")
      const spans = inner.querySelectorAll<HTMLElement>(".bwf-l")
      let top = 0
      spans.forEach((s, i) => {
        let x = 0
        let y = 0
        let el: HTMLElement | null = s
        while (el && el !== root) {
          x += el.offsetLeft
          y += el.offsetTop
          el = el.offsetParent as HTMLElement | null
        }
        s.style.setProperty("--bwf-x", x + "px")
        s.style.setProperty("--bwf-y", y + "px")
        if (i === 0) top = y
      })
      root.style.setProperty("--bwf-top", top + "px")
      root.style.setProperty("--bwf-bot", top + (parseFloat(inner.style.fontSize) || 0) * 0.92 + "px")
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fit)
    }
    fit()
    const ro = new ResizeObserver(schedule)
    ro.observe(root)
    let alive = true
    document.fonts?.ready.then(() => alive && schedule())
    return () => {
      alive = false
      cancelAnimationFrame(frame)
      ro.disconnect()
    }
  }, [word])

  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting)
        if (e.isIntersecting) setSeen(true)
      },
      { threshold: 0.1 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onMq = () => setReduced(mq.matches)
    onMq()
    mq.addEventListener("change", onMq)
    return () => mq.removeEventListener("change", onMq)
  }, [])

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const set = (b: number, px: number, py: number, g: number) => {
      root.style.setProperty("--bwf-b", b.toFixed(2) + "%")
      root.style.setProperty("--bwf-px", px.toFixed(1) + "px")
      root.style.setProperty("--bwf-py", py.toFixed(1) + "px")
      root.style.setProperty("--bwf-g", g.toFixed(3))
    }
    const still = reduced || !animate
    if (still || !visible) {
      const p = ptr.current
      set(58, p.x, p.y, p.inside ? 1 : 0)
      if (!still) return
      const onMove = () => set(58, ptr.current.x, ptr.current.y, ptr.current.inside ? 1 : 0)
      root.addEventListener("pointermove", onMove)
      root.addEventListener("pointerleave", onMove)
      return () => {
        root.removeEventListener("pointermove", onMove)
        root.removeEventListener("pointerleave", onMove)
      }
    }
    let raf = 0
    let last = performance.now()
    let t = last / 1000
    let b = 58
    let px = ptr.current.x
    let py = ptr.current.y
    let g = 0
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      t += dt
      const p = ptr.current
      const idle = drift(t)
      const target = p.inside ? beamTarget(p.u) * 0.75 + idle * 0.25 : idle
      b = approach(b, target, 0.035, dt)
      px = approach(px, p.x, 0.16, dt)
      py = approach(py, p.y, 0.16, dt)
      g = approach(g, p.inside ? 1 : 0, 0.06, dt)
      set(b, px, py, g)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced, animate, visible])

  const onPointer = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const p = ptr.current
    p.x = e.clientX - r.left
    p.y = e.clientY - r.top
    p.u = r.width ? p.x / r.width : 0.5
    p.inside = e.type !== "pointerleave"
  }

  const hop = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (reduced) return
    const el = e.currentTarget
    el.classList.remove("is-hop")
    void el.offsetWidth
    el.classList.add("is-hop")
  }

  const vars = {
    "--bwf-bg": background,
    "--bwf-bg-rgb": hexToRgb(background, "11, 13, 16"),
    "--bwf-ink": "#98A2B3",
    "--bwf-ink-rgb": hexToRgb("#98A2B3", "152, 162, 179"),
    "--bwf-muted": "#98A2B3",
    "--bwf-acc": hexToRgb(accent, "168, 230, 53"),
    "--bwf-lit": hexToRgb(accent, "168, 230, 53"),
    "--bwf-wt": wordTop,
    "--bwf-wf": wordFoot,
    "--bwf-sans": SANS,
    "--bwf-ww": "800",
    "--bwf-ang": "118deg",
    "--bwf-b": "58%",
    "--bwf-px": "50%",
    "--bwf-py": "50%",
    "--bwf-g": "0",
    "--bwf-top": "0px",
    "--bwf-bot": "100%",
  } as React.CSSProperties

  return (
    <footer
      ref={rootRef}
      className={"bwf " + className}
      style={vars}
      data-in={seen || reduced ? "true" : "false"}
      onPointerMove={onPointer}
      onPointerEnter={onPointer}
      onPointerLeave={onPointer}
    >
      <style>{CSS}</style>
      <div className="bwf-rule" aria-hidden="true" />
      <div className="bwf-sky" aria-hidden="true">
        <div className="bwf-wash" />
        <div className="bwf-bands" />
        <div className="bwf-beam" />
        <div className="bwf-glow" />
        <div className="bwf-grain" />
      </div>

      <div className="bwf-content">
        {children}
      </div>

      <div
        ref={wordRef}
        className="bwf-word"
        style={{ height: size ? wordHeight(size, base, cut) : "calc(" + (0.8 + cut) * 26 + "cqw)" }}
      >
        <p className="sr-only">{word}</p>
        <div className="bwf-word-box">
          <div ref={innerRef} className="bwf-word-in" aria-hidden="true">
            {letters.map((ch, i) => (
              <span key={i} className="bwf-lw" style={{ "--bwf-d": 260 + i * 75 + "ms" } as React.CSSProperties}>
                <span className="bwf-l" onClick={hop} onAnimationEnd={(e) => e.currentTarget.classList.remove("is-hop")}>
                  {ch === " " ? " " : ch}
                </span>
              </span>
            ))}
          </div>
        </div>
        <div className="bwf-foot" aria-hidden="true" />
      </div>
    </footer>
  )
}
