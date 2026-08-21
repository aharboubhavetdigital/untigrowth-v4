import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  UserPlus,
  Cpu,
  UserCheck,
  FileSearch,
  FileSignature,
  KeyRound,
  Kanban,
  Receipt,
  Repeat,
  CheckCircle2,
} from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(3);

  const timelineSteps = [
    {
      step: '01',
      title: 'Attirer',
      desc: 'Inscription libre ou invitation directe par IAweb.dev.',
      icon: UserPlus,
    },
    {
      step: '02',
      title: 'Qualifier',
      desc: 'Dossier candidat complet et tests de compétences IA.',
      icon: Cpu,
    },
    {
      step: '03',
      title: 'Valider',
      desc: 'Double validation : responsable métier puis validation finale.',
      icon: UserCheck,
    },
    {
      step: '04',
      title: 'Consulter',
      desc: 'Présentation du besoin client et du cahier des charges.',
      icon: FileSearch,
    },
    {
      step: '05',
      title: 'Contractualiser',
      desc: 'Accord sur le TJM/Forfait et signature numérique.',
      icon: FileSignature,
    },
    {
      step: '06',
      title: 'Affecter',
      desc: 'Activation ciblée des accès autorisés (Principe du moindre privilège).',
      icon: KeyRound,
    },
    {
      step: '07',
      title: 'Piloter',
      desc: 'Suivi rigoureux des tâches, livrables et jalons de production.',
      icon: Kanban,
    },
    {
      step: '08',
      title: 'Facturer',
      desc: 'Validation des livrables et suivi fluide de la facturation.',
      icon: Receipt,
    },
    {
      step: '09',
      title: 'Réengager',
      desc: 'Les talents performants sont remobilisés en priorité sur les futurs projets.',
      icon: Repeat,
    },
  ];

  return (
    <section id="fonctionnement" className="py-20 sm:py-28 bg-[#0B0D10] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15181D] border border-white/10 text-xs font-bold text-white mb-4">
            <span className="w-2 h-2 rounded-full bg-[#A8E635]" />
            End-to-End Workflow
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
            Du talent à la mission.
          </h2>
          <p className="text-base sm:text-lg text-[#98A2B3] leading-relaxed">
            Un parcours structuré en 9 étapes claires pour sécuriser chaque phase de la collaboration.
          </p>
        </div>

        {/* Step Selector Controls */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 overflow-x-auto gap-2">
          <span className="text-xs font-mono text-[#98A2B3] shrink-0 uppercase">SÉLECTIONNEZ UNE ÉTAPE :</span>
          <div className="flex items-center gap-2 shrink-0">
            {timelineSteps.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeStepIndex === idx
                    ? 'bg-[#A8E635] text-[#101214] shadow-sm'
                    : idx <= activeStepIndex
                    ? 'bg-[#15181D] text-white border border-[#A8E635]'
                    : 'bg-[#15181D] text-[#98A2B3] border border-white/10'
                }`}
              >
                {s.step}. {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Grid Timeline */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mb-12">
          {timelineSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx <= activeStepIndex;
            const isCurrent = idx === activeStepIndex;

            return (
              <motion.div
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                whileHover={{ y: -3 }}
                className={`p-6 rounded-3xl border transition-all cursor-pointer relative ${
                  isCurrent
                    ? 'bg-[#15181D] text-white border-[#A8E635] shadow-xl ring-1 ring-[#A8E635]/40'
                    : isCompleted
                    ? 'bg-[#15181D] text-white border-white/20 shadow-xs'
                    : 'bg-[#15181D]/50 text-[#98A2B3] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                      isCurrent
                        ? 'bg-[#A8E635] text-[#101214] border-[#A8E635]'
                        : isCompleted
                        ? 'bg-[#A8E635]/20 text-[#A8E635] border-[#A8E635]/40'
                        : 'bg-[#0B0D10] text-[#98A2B3] border-white/10'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      isCurrent
                        ? 'bg-[#A8E635] text-[#101214]'
                        : isCompleted
                        ? 'bg-[#0B0D10] text-[#A8E635]'
                        : 'bg-[#0B0D10] text-[#98A2B3]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-white">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#98A2B3]">
                  {step.desc}
                </p>

                {isCompleted && (
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-semibold text-[#32D583]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Processus défini</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-4">
          {timelineSteps.map((step, idx) => {
            return (
              <div
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-5 rounded-2xl border ${
                  idx === activeStepIndex
                    ? 'bg-[#15181D] text-white border-[#A8E635]'
                    : 'bg-[#15181D]/60 text-white border-white/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-[#A8E635] text-[#101214] flex items-center justify-center font-bold text-xs">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-base text-white">{step.title}</h3>
                </div>
                <p className="text-xs text-[#98A2B3] pl-11">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
