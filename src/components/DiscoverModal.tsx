import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Cpu, Zap, ArrowRight, CheckCircle2, Layers } from 'lucide-react';

interface DiscoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenJoin: () => void;
}

export const DiscoverModal: React.FC<DiscoverModalProps> = ({ isOpen, onClose, onOpenJoin }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0D10]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-3xl bg-[#15181D] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 bg-[#0B0D10]/50">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#6C55F5]/20 text-[#A8E635] border border-[#6C55F5]/30 mb-2">
                <Layers className="w-3.5 h-3.5" />
                Private Talent Cloud
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Découvrir <span className="text-white">UNIT</span><span className="text-[#A8E635]">GROWTH</span>
              </h3>
              <p className="text-sm text-[#98A2B3] mt-1">
                Le vivier qualifié de IAweb.dev pour transformer chaque besoin en capacité de production
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-[#98A2B3] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Positionnement */}
            <div className="p-5 bg-[#0B0D10] border border-white/10 rounded-2xl">
              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#32D583]" />
                Un positionnement différent d'une marketplace généraliste
              </h4>
              <p className="text-sm text-[#98A2B3] leading-relaxed">
                Unitgrowth n'est pas une marketplace ouverte ou anonyme. C'est un <strong className="text-white">Private Talent Cloud</strong> structuré, sélectif et dédié aux projets de l'écosystème IAweb.dev au Maroc et à Madagascar.
              </p>
            </div>

            {/* 3 Pilliers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-white/10 rounded-2xl bg-[#0B0D10] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#6C55F5]/20 flex items-center justify-center text-[#A8E635]">
                  <Cpu className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-sm text-white">Qualification IA</h5>
                <p className="text-xs text-[#98A2B3] leading-normal">
                  Évaluation progressive des compétences techniques, tests spécifiques et scoring précis sur 100.
                </p>
              </div>

              <div className="p-4 border border-white/10 rounded-2xl bg-[#0B0D10] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#32D583]/20 flex items-center justify-center text-[#32D583]">
                  <CheckCircle2 className="w-4 h-4 text-[#32D583]" />
                </div>
                <h5 className="font-bold text-sm text-white">Double Validation</h5>
                <p className="text-xs text-[#98A2B3] leading-normal">
                  L'IA évalue les compétences, mais les responsables métiers humains restent décisionnaires.
                </p>
              </div>

              <div className="p-4 border border-white/10 rounded-2xl bg-[#0B0D10] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#A8E635]/20 flex items-center justify-center text-[#A8E635]">
                  <Zap className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-sm text-white">Mobilisation Réelle</h5>
                <p className="text-xs text-[#98A2B3] leading-normal">
                  Chaque profil qualifié est pré-disponible pour intervenir rapidement sur un périmètre sécurisé.
                </p>
              </div>
            </div>

            {/* Chiffres d'impact */}
            <div className="p-5 border border-white/10 rounded-2xl bg-[#0B0D10] text-white">
              <div className="text-xs text-[#98A2B3] uppercase tracking-wider font-mono mb-3">Target Capacity</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="border-r border-white/10 last:border-0 pr-2">
                  <div className="text-2xl font-bold text-[#A8E635]">40-120</div>
                  <div className="text-[11px] text-[#98A2B3]">Talents ciblés</div>
                </div>
                <div className="border-r border-white/10 last:border-0 pr-2">
                  <div className="text-2xl font-bold text-white">4</div>
                  <div className="text-[11px] text-[#98A2B3]">Familles métiers</div>
                </div>
                <div className="border-r border-white/10 last:border-0 pr-2">
                  <div className="text-2xl font-bold text-white">2</div>
                  <div className="text-[11px] text-[#98A2B3]">Pays (MA / MG)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#A8E635]">100</div>
                  <div className="text-[11px] text-[#98A2B3]">Score Max IA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-t border-white/10 bg-[#0B0D10]/50 gap-4">
            <span className="text-xs text-[#98A2B3]">
              Qualifier. Mobiliser. Contractualiser. Piloter.
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 border border-white/10 text-white font-semibold text-sm rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenJoin();
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-[#A8E635] hover:bg-[#98d42c] text-[#101214] font-bold text-sm rounded-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Rejoindre le vivier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
