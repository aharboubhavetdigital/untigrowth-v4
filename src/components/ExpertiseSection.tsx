import React from 'react';
import { motion } from 'motion/react';
import { Code2, Bot, Workflow, Megaphone, CheckCircle2 } from 'lucide-react';

export const ExpertiseSection: React.FC = () => {
  return (
    <section id="expertises" className="py-20 sm:py-28 bg-[#0B0D10] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15181D] border border-white/10 text-xs font-bold text-white mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#A8E635]" />
            Un vivier multi-expertise
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
            Les talents dont les projets ont besoin.
          </h2>
          <p className="text-base sm:text-lg text-[#98A2B3] leading-relaxed">
            Unitgrowth structure son vivier autour de quatre grandes familles de métiers du digital pour couvrir tous les besoins de production de IAweb.dev.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Card 01 - Large: Développement Full Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 bg-[#15181D] border border-white/10 rounded-3xl p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#0B0D10] text-[#A8E635] flex items-center justify-center font-bold border border-white/10">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#98A2B3] bg-[#0B0D10] px-3 py-1 rounded-full border border-white/10">
                  FAMILLE 01
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Développement Full Stack</h3>
              <p className="text-[#98A2B3] text-base leading-relaxed mb-6">
                Front-end, back-end, API, bases de données, intégration et développement sur-mesure de solutions digitales complexes.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {['Frontend', 'Backend', 'API', 'Database', 'Integration', 'Laravel / React'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#0B0D10] text-white text-xs font-semibold rounded-full border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 02 - Large Highlight: IA & Automatisation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 bg-[#15181D] border-2 border-[#6C55F5]/60 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Subtle Violet Accent Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6C55F5]/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#6C55F5] text-white flex items-center justify-center font-bold shadow-md">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#A8E635] bg-[#6C55F5]/20 px-3 py-1 rounded-full border border-[#6C55F5]/30">
                  IA HIGHLIGHT 02
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">IA & Automatisation</h3>
              <p className="text-[#98A2B3] text-base leading-relaxed mb-6">
                Agents IA, automatisations métiers, orchestration de workflows, traitement de données et intégration de LLMs.
              </p>
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {['AI Agents', 'Automation', 'LLM', 'Data', 'Orchestration'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#6C55F5]/20 text-[#A8E635] text-xs font-semibold rounded-full border border-[#6C55F5]/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 03: No-code / Low-code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-6 bg-[#15181D] border border-white/10 rounded-3xl p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#0B0D10] text-white border border-white/10 flex items-center justify-center font-bold">
                  <Workflow className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#98A2B3] bg-[#0B0D10] px-3 py-1 rounded-full border border-white/10">
                  FAMILLE 03
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">No-code / Low-code</h3>
              <p className="text-[#98A2B3] text-sm leading-relaxed mb-6">
                Applications rapides, workflows métier, interfaces et automatisations no-code/low-code robustes.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {['Workflow', 'No-code', 'Low-code', 'Make / n8n'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#0B0D10] text-white text-xs font-semibold rounded-full border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 04: Marketing Digital */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="lg:col-span-6 bg-[#15181D] border border-white/10 rounded-3xl p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#0B0D10] text-white border border-white/10 flex items-center justify-center font-bold">
                  <Megaphone className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold text-[#98A2B3] bg-[#0B0D10] px-3 py-1 rounded-full border border-white/10">
                  FAMILLE 04
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Marketing Digital</h3>
              <p className="text-[#98A2B3] text-sm leading-relaxed mb-6">
                Community management, media buying, acquisition de trafic, création de contenu, CRM et opérations marketing.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {['Acquisition', 'Content', 'Media Buying', 'CRM'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#0B0D10] text-white text-xs font-semibold rounded-full border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Stat Callout Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-10 bg-[#15181D] text-white rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#A8E635] text-[#101214] flex items-center justify-center font-extrabold text-2xl shrink-0">
              ✓
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#A8E635] mb-1">CAPACITÉ GLOBALE CIBLÉE</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                10 à 30 profils qualifiés par métier
              </h3>
              <p className="text-[#98A2B3] text-sm mt-1">
                Garantissant un vivier de <strong className="text-white font-semibold">40 à 120 talents actifs</strong> répartis au Maroc et à Madagascar.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 bg-[#0B0D10] border border-white/10 rounded-xl text-xs font-semibold text-[#F8FAFC] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A8E635]" />
              Sourcing Continu
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
