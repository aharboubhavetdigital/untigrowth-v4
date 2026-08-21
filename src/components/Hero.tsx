import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { HeroVisual } from './HeroVisual';
import { HeroStats } from './HeroStats';

interface HeroProps {
  onOpenJoin: () => void;
  onOpenDiscover: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoin, onOpenDiscover }) => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-[#0B0D10] text-white overflow-hidden">
      {/* Subtle Lime glow ambient in top center */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#A8E635]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center sm:justify-start mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15181D] border border-white/10 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#A8E635]" />
            <span className="text-xs font-bold text-white tracking-wide">
              Le vivier qualifié par IAweb.dev
            </span>
            <span className="text-[10px] text-[#98A2B3] bg-[#0B0D10] px-2 py-0.5 rounded-full font-mono border border-white/10">
              Private Talent Cloud
            </span>
          </div>
        </motion.div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-4xl text-center sm:text-left mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold text-white tracking-tight leading-[0.95] mb-6"
          >
            Transformez vos besoins en <span className="underline decoration-[#A8E635] decoration-wavy decoration-2">capacité de production</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#98A2B3] leading-relaxed max-w-3xl mb-8 font-normal"
          >
            Unitgrowth connecte les besoins projets de <strong className="text-white font-semibold">IAweb.dev</strong> à un vivier de freelances qualifiés, disponibles et prêts à intégrer rapidement un environnement de travail sécurisé.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start"
          >
            <button
              onClick={onOpenJoin}
              className="w-full sm:w-auto px-7 py-4 bg-[#A8E635] hover:bg-[#98d42c] text-[#101214] font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group text-base cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#101214]" />
              <span>Rejoindre le vivier</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href="#fonctionnement"
              className="w-full sm:w-auto px-7 py-4 bg-[#15181D] hover:bg-[#262B33] border border-white/10 text-white font-semibold rounded-2xl transition-all duration-200 text-center text-base"
            >
              Découvrir le fonctionnement
            </a>
          </motion.div>
        </div>

        {/* Hero Visual Orchestrator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6"
        >
          <HeroVisual />
        </motion.div>

        {/* Key Stats Bar */}
        <HeroStats />
      </div>
    </section>
  );
};
