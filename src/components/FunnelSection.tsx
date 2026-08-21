import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, TrendingUp, CheckCircle2 } from 'lucide-react';

export const FunnelSection: React.FC = () => {
  const funnelSteps = [
    {
      stage: 'CANDIDATS',
      subtitle: 'Acquisition',
      metric: '40 - 120 Profils',
      desc: 'Vivier global identifié au Maroc et à Madagascar',
      color: 'bg-[#15181D] text-white border-white/10',
      width: 'w-full',
    },
    {
      stage: 'VALIDÉS',
      subtitle: 'Qualification',
      metric: 'Score > 80/100',
      desc: 'Talents qualifiés par IA et validés par le pôle métier',
      color: 'bg-[#15181D] text-white border-[#6C55F5]/60',
      width: 'w-11/12',
    },
    {
      stage: 'CONSULTÉS',
      subtitle: 'Intérêt & TJM',
      metric: 'Confirmés sous 24h',
      desc: 'Talents sollicités sur un besoin client spécifique',
      color: 'bg-[#15181D] text-white border-[#A8E635]/60',
      width: 'w-10/12',
    },
    {
      stage: 'MISSIONNÉS',
      subtitle: 'Conversion & Production',
      metric: 'Contrats Exécutés',
      desc: 'Production active et valeur créée pour le client IAweb.dev',
      color: 'bg-[#15181D] text-white border-[#A8E635] ring-2 ring-[#A8E635]/30',
      width: 'w-9/12',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0B0D10] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15181D] border border-white/10 text-xs font-bold text-white mb-4">
            <TrendingUp className="w-4 h-4 text-[#A8E635]" />
            From Talent to Impact
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
            Un vivier qui doit convertir.
          </h2>
          <p className="text-base sm:text-lg text-[#98A2B3] leading-relaxed">
            La réussite de Unitgrowth ne se mesure pas uniquement au nombre de profils inscrits. Elle se mesure à sa capacité à transformer les besoins clients en missions réellement exécutées.
          </p>
        </div>

        {/* Funnel Visual Pipeline */}
        <div className="max-w-4xl mx-auto space-y-4 mb-12">
          {funnelSteps.map((f, idx) => (
            <motion.div
              key={f.stage}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`mx-auto ${f.width}`}
            >
              <div className={`p-6 rounded-3xl border ${f.color} shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-2xl font-mono font-extrabold flex items-center justify-center text-sm ${idx === 3 ? 'bg-[#A8E635] text-[#101214]' : 'bg-[#0B0D10] text-[#A8E635] border border-white/10'}`}>
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold tracking-tight text-white">{f.stage}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${idx === 3 ? 'bg-[#A8E635]/20 text-[#A8E635]' : 'bg-[#0B0D10] text-[#98A2B3] border border-white/10'}`}>
                        {f.subtitle}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5 text-[#98A2B3]">
                      {f.desc}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono font-bold text-sm text-[#A8E635]">
                  {f.metric}
                </div>
              </div>

              {idx < funnelSteps.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowDown className="w-4 h-4 text-[#98A2B3]/40" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Message Callout Box */}
        <div className="p-6 sm:p-8 bg-[#15181D] border border-white/10 rounded-3xl text-center max-w-3xl mx-auto">
          <p className="text-sm sm:text-base text-white font-semibold leading-relaxed">
            « De l'acquisition à la conversion, chaque étape du funnel est optimisée pour garantir un taux de transformation maximal des opportunités commerciales de IAweb.dev. »
          </p>
        </div>
      </div>
    </section>
  );
};
