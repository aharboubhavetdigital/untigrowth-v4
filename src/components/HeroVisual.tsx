import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, CheckCircle2, UserCheck, Layers, Sparkles, ArrowRight, Activity, Zap, Check } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2); // Qualification IA active by default

  const nodes = [
    {
      id: 0,
      title: 'Besoin client',
      subtitle: 'IAweb.dev Brief',
      tag: 'Cahier des charges',
      icon: Layers,
      color: 'bg-white text-[#101214]',
      badgeColor: 'border-[#E4E7EC] text-[#667085]',
      detail: 'Projet d\'automatisation IA & API Laravel/React pour client entreprise.',
    },
    {
      id: 1,
      title: 'Talent Pool',
      subtitle: 'Maroc & Madagascar',
      tag: '40-120 Talents',
      icon: Activity,
      color: 'bg-white text-[#101214]',
      badgeColor: 'border-[#E4E7EC] text-[#667085]',
      detail: 'Sourçage actif de profils vérifiés sur 4 familles de métiers du digital.',
    },
    {
      id: 2,
      title: 'Qualification IA',
      subtitle: 'Beyond the CV',
      tag: 'Score 92/100',
      icon: Cpu,
      color: 'bg-[#0B0D10] text-white border-[#6C55F5] glow-violet-sm',
      badgeColor: 'bg-[#6C55F5]/20 text-[#6C55F5] border-[#6C55F5]/30',
      detail: 'Tests techniques automatisés, évaluation logique et scoring IA en temps réel.',
    },
    {
      id: 3,
      title: 'Validation humaine',
      subtitle: 'Resp. Métiers',
      tag: 'Double Check',
      icon: UserCheck,
      color: 'bg-white text-[#101214]',
      badgeColor: 'bg-[#32D583]/10 text-[#32D583] border-[#32D583]/30',
      detail: 'Revue humaine des résultats et entretien de confirmation comportementale.',
    },
    {
      id: 4,
      title: 'Matching',
      subtitle: 'Fit & Availability',
      tag: 'Matching 96%',
      icon: Sparkles,
      color: 'bg-white text-[#101214]',
      badgeColor: 'bg-[#6C55F5]/10 text-[#6C55F5] border-[#6C55F5]/20',
      detail: 'Mise en correspondance instantanée avec les critères exacts du projet.',
    },
    {
      id: 5,
      title: 'Talent mobilisé',
      subtitle: 'Prêt à produire',
      tag: 'Contrat ✓',
      icon: CheckCircle2,
      color: 'bg-[#A8E635] text-[#101214] font-bold shadow-md',
      badgeColor: 'bg-[#101214]/10 text-[#101214]',
      detail: 'Attribution sécurisée des accès et démarrage immédiat de la mission.',
    },
  ];

  return (
    <div className="w-full relative py-4">
      {/* Container Box */}
      <div className="bg-[#15181D] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle Background Accent Lines */}
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A8E635] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              PRIVATE TALENT CLOUD ORCHESTRATOR
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#98A2B3]">
            <span className="inline-flex items-center gap-1 bg-[#0B0D10] px-2.5 py-1 rounded-full border border-white/10">
              <Zap className="w-3 h-3 text-[#A8E635]" />
              Flux automatisé IAweb.dev
            </span>
          </div>
        </div>

        {/* Desktop Pipeline Visual */}
        <div className="relative z-10 my-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isActive = activeStep === index;
              const isAiNode = index === 2;

              return (
                <motion.div
                  key={node.id}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => setActiveStep(index)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                    isActive
                      ? 'border-[#A8E635] ring-2 ring-[#A8E635]/30 shadow-lg bg-[#0B0D10]'
                      : isAiNode
                      ? 'border-[#6C55F5]/60 bg-[#0B0D10] text-white'
                      : 'border-white/10 bg-[#0B0D10] hover:border-white/20'
                  }`}
                >
                  {/* Step Index Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${node.badgeColor}`}
                    >
                      0{index + 1}
                    </span>
                    {index < nodes.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#98A2B3] hidden lg:block" />
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="mb-2">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${
                        isAiNode
                          ? 'bg-[#6C55F5] text-white'
                          : index === 5
                          ? 'bg-[#A8E635] text-[#101214]'
                          : 'bg-[#15181D] text-white border border-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold leading-tight text-white">
                      {node.title}
                    </h4>
                    <p className="text-[11px] mt-0.5 text-[#98A2B3]">
                      {node.subtitle}
                    </p>
                  </div>

                  {/* Tag */}
                  <div className="pt-2 border-t border-white/10 mt-1">
                    <span
                      className={`text-[10px] font-semibold ${
                        index === 5
                          ? 'text-[#A8E635] font-extrabold'
                          : isAiNode
                          ? 'text-[#A8E635]'
                          : 'text-[#98A2B3]'
                      }`}
                    >
                      {node.tag}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected Step Inspector Box */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#0B0D10] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A8E635] text-[#101214] flex items-center justify-center shrink-0 font-bold text-sm">
              0{activeStep + 1}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {nodes[activeStep].title}
                </span>
                <span className="text-xs text-[#98A2B3]">• {nodes[activeStep].subtitle}</span>
              </div>
              <p className="text-xs text-[#98A2B3] mt-0.5">{nodes[activeStep].detail}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold shrink-0">
            <span className="px-3 py-1 bg-[#15181D] border border-white/10 text-white rounded-full flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#32D583]" />
              Étape Validée
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
