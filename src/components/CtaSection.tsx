import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Matter from 'matter-js';

gsap.registerPlugin(ScrollTrigger);

const PILL_TAGS = [
  'Node.js',
  'IA & LLMs',
  'TypeScript',
  'Tailwind CSS',
  'Next.js',
  'Airtable',
  'Python',
  'React 18',
  'PostgreSQL',
];

export const CtaSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    let engine: Matter.Engine | null = null;
    let runner: Matter.Runner | null = null;
    let animFrameId: number | null = null;
    let topWall: Matter.Body | null = null;
    let sealTimeout: NodeJS.Timeout | null = null;

    const initPhysics = () => {
      if (engine) return;

      engine = Matter.Engine.create({
        gravity: { x: 0, y: 1, scale: 0.001 },
      });

      engine.constraintIterations = 10;
      engine.positionIterations = 20;
      engine.velocityIterations = 16;
      engine.timing.timeScale = 1;

      const containerRect = container.getBoundingClientRect();
      const width = containerRect.width || window.innerWidth;
      const height = containerRect.height || 550;
      const wallThickness = 200;

      // Floor, Left, Right static walls
      const floor = Matter.Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width + wallThickness * 2,
        wallThickness,
        { isStatic: true, friction: 0.8 }
      );

      const leftWall = Matter.Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height + wallThickness * 2,
        { isStatic: true, friction: 0.8 }
      );

      const rightWall = Matter.Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height + wallThickness * 2,
        { isStatic: true, friction: 0.8 }
      );

      Matter.Composite.add(engine.world, [floor, leftWall, rightWall]);

      // Create rigid bodies for pills
      const bodyItems: {
        body: Matter.Body;
        element: HTMLDivElement;
        w: number;
        h: number;
      }[] = [];

      const elements = Array.from(
        container.querySelectorAll('.physics-pill')
      ) as HTMLDivElement[];

      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const w = rect.width || 130;
        const h = rect.height || 48;

        const startX = Math.random() * Math.max(20, width - w) + w / 2;
        const startY = -400 - index * 140; // Staggered drop from above
        const startAngle = (Math.random() - 0.5) * Math.PI;

        const body = Matter.Bodies.rectangle(startX, startY, w, h, {
          restitution: 0.5,
          friction: 0.15,
          frictionAir: 0.02,
          density: 0.002,
          chamfer: { radius: h / 2 },
        });

        Matter.Body.setAngle(body, startAngle);
        Matter.Composite.add(engine!.world, body);

        bodyItems.push({ body, element: el, w, h });
      });

      // Seal ceiling after 3.5 seconds
      sealTimeout = setTimeout(() => {
        if (engine && !topWall) {
          topWall = Matter.Bodies.rectangle(
            width / 2,
            -wallThickness / 2,
            width + wallThickness * 2,
            wallThickness,
            { isStatic: true }
          );
          Matter.Composite.add(engine.world, topWall);
        }
      }, 3500);

      // Mouse Constraint
      const mouse = Matter.Mouse.create(container);
      // Remove Matter mousewheel hijacking so smooth scrolling works!
      if ((mouse as any).mousewheel) {
        mouse.element.removeEventListener('mousewheel', (mouse as any).mousewheel);
        mouse.element.removeEventListener('DOMMouseScroll', (mouse as any).mousewheel);
      }

      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.6,
          render: { visible: false },
        },
      });

      if (mouseConstraint.mouse.element) {
        (mouseConstraint.mouse.element as HTMLElement).oncontextmenu = () => false;
      }

      let draggedBody: Matter.Body | null = null;
      let originalInertia = 1;

      Matter.Events.on(mouseConstraint, 'startdrag', (evt: any) => {
        draggedBody = evt.body;
        if (draggedBody) {
          originalInertia = draggedBody.inertia;
          Matter.Body.setInertia(draggedBody, Infinity);
          Matter.Body.setVelocity(draggedBody, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(draggedBody, 0);
        }
      });

      Matter.Events.on(mouseConstraint, 'enddrag', () => {
        if (draggedBody) {
          Matter.Body.setInertia(draggedBody, originalInertia || 1);
          draggedBody = null;
        }
      });

      Matter.Events.on(engine, 'beforeUpdate', () => {
        if (draggedBody) {
          const maxVel = 22;
          const vx = Math.min(Math.max(draggedBody.velocity.x, -maxVel), maxVel);
          const vy = Math.min(Math.max(draggedBody.velocity.y, -maxVel), maxVel);
          Matter.Body.setVelocity(draggedBody, { x: vx, y: vy });
        }
      });

      const releaseConstraint = () => {
        if (mouseConstraint.constraint) {
          mouseConstraint.constraint.bodyB = null;
          mouseConstraint.constraint.pointB = null;
        }
        if (draggedBody) {
          Matter.Body.setInertia(draggedBody, originalInertia || 1);
          draggedBody = null;
        }
      };

      container.addEventListener('mouseleave', releaseConstraint);
      window.addEventListener('mouseup', releaseConstraint);

      Matter.Composite.add(engine.world, mouseConstraint);

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      // RAF loop for rendering DOM elements
      const updateDOM = () => {
        const cRect = container.getBoundingClientRect();
        const cWidth = cRect.width || width;
        const cHeight = cRect.height || height;

        bodyItems.forEach(({ body, element, w, h }) => {
          const clampX = Math.min(Math.max(body.position.x - w / 2, 0), cWidth - w);
          const clampY = Math.min(Math.max(body.position.y - h / 2, -h * 3), cHeight - h);

          element.style.left = `${clampX}px`;
          element.style.top = `${clampY}px`;
          element.style.transform = `rotate(${body.angle}rad)`;
        });

        animFrameId = requestAnimationFrame(updateDOM);
      };

      updateDOM();
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom-=50',
      once: true,
      onEnter: () => {
        initPhysics();
      },
    });

    return () => {
      trigger.kill();
      if (sealTimeout) clearTimeout(sealTimeout);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (runner) Matter.Runner.stop(runner);
      if (engine) Matter.World.clear(engine.world, false);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0B0D10] text-[#98A2B3] overflow-hidden">
      {/* Interactive Physics Zone */}
      <div className="relative w-full h-[520px] sm:h-[600px] border-t border-white/10 overflow-hidden bg-[#0B0D10]">
        {/* Background Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A8E635]/5 rounded-full blur-[130px] pointer-events-none" />

        {/* Physics Pills Container */}
        <div
          ref={containerRef}
          className="object-container absolute inset-0 w-full h-full overflow-hidden"
        >
          {PILL_TAGS.map((tag, idx) => (
            <div
              key={idx}
              className="physics-pill absolute w-max font-mono font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full cursor-grab active:cursor-grabbing border-2 border-white/60 bg-black text-white shadow-[0_10px_25px_rgba(0,0,0,0.8)] pointer-events-auto z-10 hover:border-[#A8E635] hover:text-[#A8E635] transition-colors select-none"
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Center Headline Overlay */}
        <div className="footer-content absolute inset-0 w-full h-full p-6 flex flex-col justify-center items-center text-center pointer-events-none z-0">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight pointer-events-auto drop-shadow-md max-w-3xl">
            Prêt à transformer votre expertise en missions ?
          </h2>
          <p className="text-sm sm:text-base text-[#98A2B3] mt-4 max-w-2xl pointer-events-auto leading-relaxed">
            Candidature en 3 minutes. Test IA en 10 minutes.
            <br className="hidden sm:inline" /> Aucun engagement — votre score reste valable même sans seuil éliminatoire.
          </p>
        </div>
      </div>
    </section>
  );
};
