import React from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const plans = [
    {
      badge: '€ / h',
      title: 'Tarif horaire',
      subtitle: 'Facturation au temps réel',
      description: 'Pour les missions ponctuelles, la maintenance ou le support facturés au temps réellement consacré.',
      icon: Clock,
      highlight: false,
      features: [
        'Facturation à la demi-heure',
        'Feuilles de temps validées',
        'Flexibilité maximale',
        'Idéal pour régie courte',
      ],
    },
    {
      badge: '€ / j',
      title: 'Tarif journalier (TJM)',
      subtitle: 'Production structurée',
      description: 'Pour les interventions récurrentes ou l\'intégration continue de talents en journées de production.',
      icon: Calendar,
      highlight: true,
      features: [
        'Journées de 7h/8h de production',
        'Suivi de présence & livrables',
        'Tarif préférentiel dégressif',
        'Priorité de réservation vivier',
      ],
    },
    {
      badge: 'Forfait',
      title: 'Par mission',
      subtitle: 'Engagé sur livrables',
      description: 'Pour les projets disposant d’un cahier des charges précis, d’un périmètre net et de livrables définis.',
      icon: ShieldAlert,
      highlight: false,
      features: [
        'Périmètre & jalons locked',
        'Prix fixe garanti par contrat',
        'Engagement sur la recette',
        'Garantie post-livraison',
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0B0D10] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15181D] border border-white/10 text-xs font-bold text-white mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#A8E635]" />
            Flexible by design
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
            Une formule adaptée à chaque mission.
          </h2>
          <p className="text-base sm:text-lg text-[#98A2B3] leading-relaxed">
            Unitgrowth propose trois modes de contractualisation pour s'ajuster parfaitement au type d'intervention requis par IAweb.dev.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`p-8 bg-[#15181D] border rounded-3xl transition-all duration-300 flex flex-col justify-between relative ${
                  plan.highlight
                    ? 'border-2 border-[#A8E635] shadow-2xl ring-2 ring-[#A8E635]/30'
                    : 'border-white/10 shadow-xs hover:border-white/20'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#A8E635] text-[#101214] text-[10px] font-mono font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    POPULAIRE / PRODUCTION
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-black font-mono text-[#A8E635] bg-[#0B0D10] px-4 py-2 rounded-2xl border border-white/10">
                      {plan.badge}
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-[#0B0D10] text-[#A8E635] border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1">{plan.title}</h3>
                  <div className="text-xs font-semibold text-[#98A2B3] mb-4">{plan.subtitle}</div>

                  <p className="text-sm text-[#98A2B3] leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-white/10">
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs text-white">
                        <CheckCircle2 className="w-4 h-4 text-[#32D583] shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <div className="text-[11px] text-[#98A2B3] text-center font-mono">
                    Cadre contractuel IAweb.dev
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
