import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, MessageSquare, TrendingUp, CheckCircle, DollarSign, Repeat, ShieldCheck } from 'lucide-react';

export const KpiSection: React.FC = () => {
  const kpis = [
    {
      title: 'Vivier Mobilisable',
      stat: '40–120',
      unit: 'profils',
      desc: 'Capacité totale ciblée et qualifiée sur 4 métiers.',
      icon: Users,
    },
    {
      title: 'Couverture Réactivité',
      stat: '< 24h',
      unit: 'disponibilité',
      desc: 'Délai d\'identification et de réponse sur besoin urgent.',
      icon: Target,
    },
    {
      title: 'Taux d\'Engagement',
      stat: '94%',
      unit: 'réponses',
      desc: 'Taux de réponse positive aux consultations IAweb.dev.',
      icon: MessageSquare,
    },
    {
      title: 'Taux de Conversion',
      stat: '85%',
      unit: 'transformés',
      desc: 'Propositions de consultation converties en contrats signés.',
      icon: TrendingUp,
    },
    {
      title: 'Qualité & Délais',
      stat: '98%',
      unit: 'conformité',
      desc: 'Missions validées avec succès dans le respect du jalonnage.',
      icon: CheckCircle,
    },
    {
      title: 'Impact Économique',
      stat: '100%',
      unit: 'rentabilité',
      desc: 'Capacité freelance flexible qui soutient la facturation client.',
      icon: DollarSign,
    },
    {
      title: 'Fidélisation Talents',
      stat: '75%',
      unit: 'réengagés',
      desc: 'Réengagement prioritaire des meilleurs freelances qualifiés.',
      icon: Repeat,
    },
    {
      title: 'Sécurité Zéro-Trust',
      stat: '0',
      unit: 'incident',
      desc: 'Aucun accès non autorisé accordé en dehors des projets.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0B0D10] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15181D] border border-white/10 text-xs font-bold text-white mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#A8E635]" />
            Tableau de Bord KPI
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
            La performance doit être mesurable.
          </h2>
          <p className="text-base sm:text-lg text-[#98A2B3] leading-relaxed">
            Huit indicateurs clés de performance suivis pour piloter la qualité et la croissance du vivier.
          </p>
        </div>

        {/* Grid of 8 Minimalist KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 bg-[#15181D] border border-white/10 rounded-3xl shadow-xs hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-[#98A2B3] uppercase tracking-wider">
                      KPI 0{idx + 1}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#0B0D10] text-[#A8E635] border border-white/10 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {kpi.stat}
                    </span>
                    <span className="text-xs font-semibold text-[#A8E635] bg-[#0B0D10] border border-white/10 px-2 py-0.5 rounded-full font-mono">
                      {kpi.unit}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2">{kpi.title}</h3>
                  <p className="text-xs text-[#98A2B3] leading-relaxed">
                    {kpi.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
