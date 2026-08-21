import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, UserCheck, ShieldCheck, Check, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const QualificationSection: React.FC = () => {
  const [activeProfileTab, setActiveProfileTab] = useState<'sofia' | 'yassine' | 'amine'>('sofia');

  const candidates = {
    sofia: {
      name: 'Sofia A.',
      title: 'Full Stack Developer',
      location: 'Casablanca, Maroc',
      aiScore: 92,
      skills: [
        { name: 'Laravel', level: 'Expert', score: '95/100' },
        { name: 'React', level: 'Advanced', score: '90/100' },
        { name: 'APIs REST / GraphQL', level: 'Expert', score: '94/100' },
        { name: 'Docker / CI-CD', level: 'Advanced', score: '88/100' },
      ],
      tradeValidation: 'Validé par Lead Dev IAweb.dev',
      finalValidation: 'Validation Métier Confirmée',
      availability: 'Disponible maintenant',
      experience: '6 ans d\'expérience',
    },
    yassine: {
      name: 'Yassine M.',
      title: 'IA & Automation Engineer',
      location: 'Antananarivo, Madagascar',
      aiScore: 89,
      skills: [
        { name: 'LangChain & Agents IA', level: 'Expert', score: '92/100' },
        { name: 'Python / FastApi', level: 'Expert', score: '91/100' },
        { name: 'n8n & Workflows', level: 'Advanced', score: '86/100' },
        { name: 'LLM Fine-tuning', level: 'Intermediate', score: '82/100' },
      ],
      tradeValidation: 'Validé par Architecte IA',
      finalValidation: 'Validation Métier Confirmée',
      availability: 'Disponible sous 48h',
      experience: '5 ans d\'expérience',
    },
    amine: {
      name: 'Amine K.',
      title: 'No-Code / Low-Code Specialist',
      location: 'Rabat, Maroc',
      aiScore: 87,
      skills: [
        { name: 'Make / Integromat', level: 'Expert', score: '94/100' },
        { name: 'Bubble.io', level: 'Advanced', score: '88/100' },
        { name: 'Airtable & Webhooks', level: 'Expert', score: '90/100' },
        { name: 'CRM Integration', level: 'Advanced', score: '84/100' },
      ],
      tradeValidation: 'Validé par Chef de Projet No-Code',
      finalValidation: 'Validation Métier Confirmée',
      availability: 'Disponible sous 3 jours',
      experience: '4 ans d\'expérience',
    },
  };

  const candidate = candidates[activeProfileTab];

  return (
    <section id="qualification" className="py-20 sm:py-28 bg-[#0B0D10] text-white relative overflow-hidden">
      {/* Background Subtle Violet/Lime Radial Glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#6C55F5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#A8E635]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15181D] border border-[#262B33] text-xs font-bold text-[#6C55F5] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Beyond the CV
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
            Un talent ne se résume pas à son CV.
          </h2>
          <p className="text-base sm:text-lg text-[#98A2B3] leading-relaxed">
            Unitgrowth combine dossier candidat, intelligence artificielle et validation humaine pour construire une vision plus fiable de chaque profil.
          </p>
        </div>

        {/* Profile Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {(['sofia', 'yassine', 'amine'] as const).map((key) => {
            const c = candidates[key];
            const isActive = activeProfileTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveProfileTab(key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#6C55F5] text-white shadow-lg'
                    : 'bg-[#15181D] text-[#98A2B3] border border-[#262B33] hover:text-white'
                }`}
              >
                {c.name} — {c.title} ({c.aiScore}/100)
              </button>
            );
          })}
        </div>

        {/* Main Grid: Profile Intelligence Card + Qualification Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Profile Intelligence Card (Left/Center) */}
          <motion.div
            key={activeProfileTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-7 bg-[#15181D] border border-[#262B33] rounded-3xl p-6 sm:p-8 shadow-2xl relative"
          >
            {/* Header Candidate Info */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#262B33]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0B0D10] border border-[#262B33] flex items-center justify-center font-bold text-xl text-[#A8E635]">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{candidate.name}</h3>
                  <p className="text-sm text-[#98A2B3]">{candidate.title}</p>
                  <p className="text-xs text-[#667085] mt-0.5">{candidate.location} • {candidate.experience}</p>
                </div>
              </div>

              <div className="bg-[#0B0D10] border border-[#262B33] px-4 py-2 rounded-2xl text-right">
                <div className="text-[10px] font-mono uppercase text-[#98A2B3]">AI QUALIFICATION SCORE</div>
                <div className="text-2xl font-extrabold text-[#A8E635] flex items-center gap-1 justify-end">
                  <span>{candidate.aiScore}</span>
                  <span className="text-xs text-[#98A2B3]">/ 100</span>
                </div>
              </div>
            </div>

            {/* Score Progress Bar */}
            <div className="my-6">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-[#98A2B3]">Score global d'aptitude technique</span>
                <span className="text-[#A8E635] font-mono font-bold">{candidate.aiScore}%</span>
              </div>
              <div className="w-full h-3 bg-[#0B0D10] rounded-full overflow-hidden border border-[#262B33]">
                <div
                  className="h-full bg-gradient-to-r from-[#6C55F5] to-[#A8E635] transition-all duration-500 rounded-full"
                  style={{ width: `${candidate.aiScore}%` }}
                />
              </div>
            </div>

            {/* Evaluated Skills List */}
            <div className="space-y-3 mb-6">
              <div className="text-xs font-mono uppercase text-[#98A2B3] tracking-wider">COMPÉTENCES ÉVALUÉES</div>
              {candidate.skills.map((s) => (
                <div key={s.name} className="flex items-center justify-between p-2.5 bg-[#0B0D10] border border-[#262B33] rounded-xl text-xs">
                  <span className="font-semibold text-white">{s.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#98A2B3]">{s.level}</span>
                    <span className="font-mono text-[#A8E635] font-bold">{s.score}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Human Validations & Status */}
            <div className="pt-6 border-t border-[#262B33] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#0B0D10] border border-[#262B33] rounded-xl flex items-center gap-2 text-[#32D583]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{candidate.tradeValidation}</span>
              </div>
              <div className="p-3 bg-[#0B0D10] border border-[#262B33] rounded-xl flex items-center gap-2 text-[#A8E635]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{candidate.finalValidation}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-[#98A2B3] pt-2">
              <span className="inline-flex items-center gap-1.5 text-[#32D583] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#32D583] animate-ping" />
                ● {candidate.availability}
              </span>
              <span className="font-mono text-[10px]">VERIFIED_TALENT_ID_2026</span>
            </div>
          </motion.div>

          {/* Qualification Pipeline Visual & Key Principles (Right) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Pipeline Step Nodes */}
            <div className="bg-[#15181D] border border-[#262B33] rounded-3xl p-6 shadow-xl">
              <h4 className="text-xs font-mono text-[#98A2B3] uppercase tracking-wider mb-4">
                PARCOURS DE QUALIFICATION EN 5 ÉTAPES
              </h4>

              <div className="space-y-3 relative">
                {[
                  { title: 'Dossier candidat', desc: 'Dossier, portfolio & expérience', color: 'border-[#262B33] text-white' },
                  { title: 'Test IA', desc: 'Évaluation technique automatisée', color: 'border-[#6C55F5] text-[#6C55F5] bg-[#6C55F5]/10', isAi: true },
                  { title: 'Score /100', desc: 'Pondération algorithmique', color: 'border-[#262B33] text-white' },
                  { title: 'Validation métier', desc: 'Revue par l\'expert Lead IAweb.dev', color: 'border-[#262B33] text-white' },
                  { title: 'Validation finale & Talent qualifié', desc: 'Inclusion dans le Private Talent Cloud', color: 'border-[#A8E635] text-[#A8E635] bg-[#A8E635]/10', isLime: true },
                ].map((step, idx) => (
                  <div key={step.title} className={`p-3.5 rounded-2xl border ${step.color} flex items-center justify-between`}>
                    <div>
                      <div className="text-xs font-bold">{step.title}</div>
                      <div className="text-[11px] text-[#98A2B3]">{step.desc}</div>
                    </div>
                    <div className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0B0D10] text-[#98A2B3]">
                      0{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2 Core Principles */}
            <div className="grid grid-cols-1 gap-4">
              <div className="p-5 bg-[#15181D] border border-[#262B33] rounded-2xl flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#6C55F5]/20 text-[#6C55F5] flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">Qualification assistée par IA</h5>
                  <p className="text-xs text-[#98A2B3] leading-relaxed">
                    Les tests permettent d'évaluer progressivement et objectivement les compétences selon le métier recherché.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-[#15181D] border border-[#262B33] rounded-2xl flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#A8E635]/20 text-[#A8E635] flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">Double validation humaine</h5>
                  <p className="text-xs text-[#98A2B3] leading-relaxed">
                    L'intelligence artificielle aide à évaluer, mais <strong className="text-white">l'humain reste décisionnaire</strong> pour la validation finale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
