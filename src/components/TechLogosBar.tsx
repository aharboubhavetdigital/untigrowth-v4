import React from 'react';
import LogoLoop, { LogoItem } from './ui/LogoLoop';

export const TechLogosBar: React.FC = () => {
  const techLogos: LogoItem[] = [
    {
      // React
      node: (
        <div className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer text-base font-bold">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <ellipse cx="12" cy="12" rx="10" ry="4" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          </svg>
          <span>React</span>
        </div>
      ),
      title: 'React',
    },
    {
      // Next.js
      node: (
        <div className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer text-base font-bold">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.13 17.5L8.7 6.5H11l6.3 9.42V6.5h1.8v11h-1.97zM6.5 6.5h1.8v11H6.5v-11z" />
          </svg>
          <span>Next.js</span>
        </div>
      ),
      title: 'Next.js',
    },
    {
      // TypeScript
      node: (
        <div className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer text-base font-bold">
          <span className="w-6 h-6 rounded-sm bg-white text-[#0B0D10] flex items-center justify-center font-mono text-xs font-black">
            TS
          </span>
          <span>TypeScript</span>
        </div>
      ),
      title: 'TypeScript',
    },
    {
      // Tailwind
      node: (
        <div className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer text-base font-bold">
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 6C9.333 6 7.667 7.333 7 10c1-1.333 2.167-1.833 3.5-1.5 1.02.255 1.75 1 2.553 1.821C14.36 11.642 16.02 13.333 20 13.333c2.667 0 4.333-1.333 5-4-1 1.333-2.167 1.833-3.5 1.5-1.02-.255-1.75-1-2.553-1.821C17.64 7.69 15.98 6 12 6z" />
          </svg>
          <span>Tailwind CSS</span>
        </div>
      ),
      title: 'Tailwind CSS',
    },
    {
      // Python
      node: (
        <div className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer text-base font-bold">
          <span className="w-6 h-6 rounded-sm bg-white text-[#0B0D10] flex items-center justify-center font-mono text-xs font-black">
            PY
          </span>
          <span>Python</span>
        </div>
      ),
      title: 'Python',
    },
    {
      // Node.js
      node: (
        <div className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer text-base font-bold">
          <span className="w-6 h-6 rounded-sm bg-white text-[#0B0D10] flex items-center justify-center font-mono text-xs font-black">
            JS
          </span>
          <span>Node.js</span>
        </div>
      ),
      title: 'Node.js',
    },
    {
      // AI & LLMs
      node: (
        <div className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer text-base font-bold">
          <span className="w-6 h-6 rounded-sm bg-white text-[#0B0D10] flex items-center justify-center font-mono text-xs font-black">
            AI
          </span>
          <span>IA & LLMs</span>
        </div>
      ),
      title: 'AI & LLMs',
    },
    {
      // Webflow
      node: (
        <div className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer text-base font-bold">
          <span className="w-6 h-6 rounded-sm bg-white text-[#0B0D10] flex items-center justify-center font-mono text-xs font-black">
            WF
          </span>
          <span>Webflow</span>
        </div>
      ),
      title: 'Webflow',
    },
    {
      // PostgreSQL
      node: (
        <div className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer text-base font-bold">
          <span className="w-6 h-6 rounded-sm bg-white text-[#0B0D10] flex items-center justify-center font-mono text-xs font-black">
            DB
          </span>
          <span>PostgreSQL</span>
        </div>
      ),
      title: 'PostgreSQL',
    },
    {
      // Figma
      node: (
        <div className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer text-base font-bold">
          <span className="w-6 h-6 rounded-sm bg-white text-[#0B0D10] flex items-center justify-center font-mono text-xs font-black">
            FG
          </span>
          <span>Figma</span>
        </div>
      ),
      title: 'Figma',
    },
  ];

  return (
    <section className="bg-[#0B0D10] py-8 overflow-hidden relative z-20 flex items-center justify-center">
      <LogoLoop
        logos={techLogos}
        speed={50}
        direction="left"
        logoHeight={28}
        gap={64}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#0B0D10"
        ariaLabel="Technologies"
      />
    </section>
  );
};
