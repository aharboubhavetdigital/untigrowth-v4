import React from 'react';
import { motion } from 'motion/react';
import { Kanban, MessageSquare, BookOpen, Clock, Layers } from 'lucide-react';

export const EcosystemSection: React.FC = () => {
  const tools = [
    {
      title: 'Plane',
      badge: 'Projets & Tâches',
      desc: 'Suivi centralisé des projets, découpage en tâches, charge de travail, jalons et délais de livraison.',
      icon: Kanban,
      bg: 'bg-white',
    },
    {
      title: 'Mattermost',
      badge: 'Communication',
      desc: 'Canaux de discussion étanches et échanges sécurisés dédiés aux projets autorisés.',
      icon: MessageSquare,
      bg: 'bg-white',
    },
    {
      title: 'Wiki',
      badge: 'Knowledge Base',
      desc: 'Accès aux guidances méthodologiques, normes de code, ressources et documentation technique.',
      icon: BookOpen,
      bg: 'bg-white',
    },
    {
      title: 'Suivi du temps',
      badge: 'Performance & Time',
      desc: 'Saisie et validation des heures/jours consommés pour un pilotage précis de la facturation.',
      icon: Clock,
      bg: 'bg-white',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0B0D10] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15181D] border border-white/10 text-xs font-bold text-white mb-4 shadow-2xs">
            <Layers className="w-4 h-4 text-[#6C55F5]" />
            IAweb.dev Ecosystem
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
            Connecté à l’environnement de production.
          </h2>
          <p className="text-base sm:text-lg text-[#98A2B3] leading-relaxed">
            Unitgrowth s’intègre directement dans les outils opérationnels de IAweb.dev pour une prise en main immédiate dès le premier jour de mission.
          </p>
        </div>

        {/* Bento Grid Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((t, idx) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-6 bg-[#15181D] border border-white/10 rounded-3xl shadow-xs hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#0B0D10] text-[#A8E635] border border-white/10 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#A8E635] bg-[#0B0D10] px-2.5 py-1 rounded-full border border-white/10">
                      {t.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
                  <p className="text-xs text-[#98A2B3] leading-relaxed mb-4">
                    {t.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] text-[#A8E635] bg-[#0B0D10] border border-white/10 px-3 py-1.5 rounded-xl font-mono font-bold flex items-center justify-between">
                  <span>Connecté</span>
                  <span>● Active API</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
