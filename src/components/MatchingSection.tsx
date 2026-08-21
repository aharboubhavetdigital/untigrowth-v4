import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, Sliders, Layers, UserCheck } from 'lucide-react';

export const MatchingSection: React.FC = () => {
  const [selectedProfileId, setSelectedProfileId] = useState('sofia');
  const [matchingStep, setMatchingStep] = useState(2); // 2 = Matched

  const profiles = [
    {
      id: 'sofia',
      name: 'Sofia A.',
      title: 'Full Stack Developer',
      score: '92/100',
      availability: 'Disponible maintenant',
      matchScore: '98% Compatible',
      skills: ['Laravel', 'React', 'REST API', 'PostgreSQL'],
      rate: 'Forfait / TJM négocié',
      tagColor: 'border-[#A8E635] text-[#A8E635]',
    },
    {
      id: 'yassine',
      name: 'Yassine M.',
      title: 'Backend Developer',
      score: '89/100',
      availability: 'Disponible sous 48h',
      matchScore: '92% Compatible',
      skills: ['Laravel', 'Node.js', 'APIs', 'Docker'],
      rate: 'Forfait / TJM négocié',
      tagColor: 'border-[#6C55F5] text-[#6C55F5]',
    },
    {
      id: 'amine',
      name: 'Amine K.',
      title: 'Full Stack Developer',
      score: '87/100',
      availability: 'Disponible sous 3 jours',
      matchScore: '86% Compatible',
      skills: ['React', 'TypeScript', 'APIs', 'Tailwind'],
      rate: 'Forfait / TJM négocié',
      tagColor: 'border-[#98A2B3] text-[#98A2B3]',
    },
  ];

  const criteriaList = [
    'Compétences',
    'Score IA',
    'Historique Projets',
    'Disponibilité',
    'Tarif / TJM',
    'Performance passée',
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0B0D10] text-white border-t border-[#262B33] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15181D] border border-[#262B33] text-xs font-bold text-[#A8E635] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Talent Matching
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
            Le bon profil. Pour le bon besoin.
          </h2>
          <p className="text-base sm:text-lg text-[#98A2B3] leading-relaxed">
            Lorsqu’un nouveau besoin apparaît, Unitgrowth facilite l’identification et la comparaison des profils compatibles.
          </p>
        </div>

        {/* Matching Engine Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Column Left: Besoin Client Requirement Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-[#15181D] border border-[#262B33] rounded-3xl p-6 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold text-[#A8E635] bg-[#A8E635]/10 px-2.5 py-1 rounded-full border border-[#A8E635]/20">
                  INPUT BRIEF
                </span>
                <Layers className="w-4 h-4 text-[#98A2B3]" />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">Besoin Client IAweb.dev</h3>
              <p className="text-xs text-[#98A2B3] mb-6">Cahier des charges qualifié</p>

              <div className="space-y-3 text-xs bg-[#0B0D10] p-4 rounded-2xl border border-[#262B33]">
                <div className="flex justify-between border-b border-[#262B33] pb-2">
                  <span className="text-[#98A2B3]">Projet :</span>
                  <span className="font-semibold text-white">Développement API REST</span>
                </div>
                <div className="flex justify-between border-b border-[#262B33] pb-2">
                  <span className="text-[#98A2B3]">Stack :</span>
                  <span className="font-semibold text-[#A8E635]">Laravel / React</span>
                </div>
                <div className="flex justify-between border-b border-[#262B33] pb-2">
                  <span className="text-[#98A2B3]">Durée :</span>
                  <span className="font-semibold text-white">Mission 3 semaines</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#98A2B3]">Disponibilité :</span>
                  <span className="font-semibold text-[#32D583]">Immédiate</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#262B33] text-[11px] text-[#98A2B3] flex items-center justify-between">
              <span>Status: Requirement Locked</span>
              <span className="w-2 h-2 rounded-full bg-[#A8E635]" />
            </div>
          </motion.div>

          {/* Column Center: Interactive AI Matching Engine */}
          <div className="lg:col-span-4 bg-[#15181D] border border-[#262B33] rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden">
            {/* Subtle Violet pulse */}
            <div className="absolute w-40 h-40 bg-[#6C55F5]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-[#0B0D10] border-2 border-[#6C55F5] flex items-center justify-center text-[#6C55F5] mb-4 glow-violet-sm">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>

            <h4 className="text-lg font-bold text-white mb-1">AI Matching Engine</h4>
            <p className="text-xs text-[#98A2B3] max-w-xs mb-6">
              Algorithme d'analyse sémantique et de calcul de compatibilité multicritère.
            </p>

            <div className="w-full space-y-2 text-xs mb-6">
              <div className="p-2.5 bg-[#0B0D10] rounded-xl border border-[#262B33] flex justify-between items-center">
                <span className="text-[#98A2B3]">Matching Sémantique</span>
                <span className="text-[#A8E635] font-mono">100% OK</span>
              </div>
              <div className="p-2.5 bg-[#0B0D10] rounded-xl border border-[#262B33] flex justify-between items-center">
                <span className="text-[#98A2B3]">Vérification Disponibilité</span>
                <span className="text-[#A8E635] font-mono">100% OK</span>
              </div>
            </div>

            <div className="w-full py-2.5 bg-[#6C55F5]/20 text-[#6C55F5] border border-[#6C55F5]/30 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2">
              <UserCheck className="w-4 h-4" />
              <span>3 Profils recommandés sur 120</span>
            </div>
          </div>

          {/* Column Right: Compatible Candidate List */}
          <div className="lg:col-span-4 bg-[#15181D] border border-[#262B33] rounded-3xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold text-[#32D583] bg-[#32D583]/10 px-2.5 py-1 rounded-full border border-[#32D583]/20">
                  TALENTS COMPATIBLES
                </span>
                <Sliders className="w-4 h-4 text-[#98A2B3]" />
              </div>

              <div className="space-y-3">
                {profiles.map((p) => {
                  const isSelected = selectedProfileId === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProfileId(p.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0B0D10] border-[#A8E635] ring-1 ring-[#A8E635]/30'
                          : 'bg-[#0B0D10]/60 border-[#262B33] hover:border-[#667085]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-white">{p.name}</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${p.tagColor}`}>
                          {p.matchScore}
                        </span>
                      </div>
                      <p className="text-xs text-[#98A2B3] mb-2">{p.title} • Score {p.score}</p>
                      <div className="text-[11px] text-[#32D583] flex items-center gap-1 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#32D583]" />
                        {p.availability}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#262B33] text-xs text-[#98A2B3] flex items-center justify-between">
              <span>Talent Sélectionné</span>
              <span className="font-bold text-[#A8E635]">Prêt à contractualiser</span>
            </div>
          </div>
        </div>

        {/* Criteria Chips Bar */}
        <div className="p-6 bg-[#15181D] border border-[#262B33] rounded-3xl">
          <div className="text-xs font-mono text-[#98A2B3] uppercase tracking-wider mb-3">
            CRITÈRES DYNAMIQUES DE MATRICES ET COMPARISON
          </div>
          <div className="flex flex-wrap gap-2">
            {criteriaList.map((crit) => (
              <span
                key={crit}
                className="px-3.5 py-1.5 bg-[#0B0D10] text-[#F8FAFC] border border-[#262B33] rounded-full text-xs font-medium flex items-center gap-1.5 hover:border-[#A8E635] transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A8E635]" />
                {crit}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
