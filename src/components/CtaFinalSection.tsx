import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface CtaFinalSectionProps {
  onOpenJoin: () => void;
  onOpenDiscover: () => void;
}

export const CtaFinalSection: React.FC<CtaFinalSectionProps> = ({ onOpenJoin, onOpenDiscover }) => {
  return (
    <section className="py-24 sm:py-36 bg-[#0B0D10] text-white relative overflow-hidden border-t border-[#262B33]">
      {/* Background Lime Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A8E635]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#15181D] border border-[#262B33] text-xs font-mono font-extrabold uppercase tracking-widest text-[#A8E635] mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#A8E635]" />
          UNITGROWTH
        </motion.div>

        {/* H2 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.02] mb-6"
        >
          Transformez chaque besoin en <span className="text-[#A8E635]">capacité de production</span>.
        </motion.h2>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-xl text-[#98A2B3] leading-relaxed max-w-3xl mx-auto mb-10 font-normal"
        >
          Unitgrowth crée le lien entre la demande commerciale de <strong className="text-white">IAweb.dev</strong> et une capacité freelance qualifiée, disponible et prête à intervenir. De la qualification à la mission, chaque étape est structurée pour permettre une mobilisation plus rapide, plus fiable et plus sécurisée.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onOpenJoin}
            className="w-full sm:w-auto px-8 py-4 bg-[#A8E635] hover:bg-[#98d42c] text-[#101214] font-extrabold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 text-base cursor-pointer group"
          >
            <span>Rejoindre le vivier</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={onOpenDiscover}
            className="w-full sm:w-auto px-8 py-4 bg-[#15181D] hover:bg-[#262B33] border border-[#262B33] text-white font-semibold rounded-2xl transition-all duration-200 text-base cursor-pointer"
          >
            Découvrir Unitgrowth
          </button>
        </motion.div>

        {/* Signature */}
        <div className="pt-10 border-t border-[#262B33]/80 flex flex-col items-center gap-2 text-sm text-[#98A2B3]">
          <div className="font-extrabold tracking-widest text-[#F8FAFC] uppercase text-xs sm:text-sm">
            Qualifier. Mobiliser. Contractualiser. Piloter.
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-white">UNIT<span className="text-[#A8E635]">GROWTH</span></span>
            <span className="text-xs text-[#98A2B3]">• Une marque IAweb.dev</span>
          </div>
        </div>
      </div>
    </section>
  );
};
