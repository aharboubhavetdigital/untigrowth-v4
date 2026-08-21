import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Key, Lock, Eye, ShieldAlert } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const items = [
    {
      title: 'Double Authentification (2FA)',
      desc: 'Authentification forte obligatoire pour l\'ensemble des freelances et gestionnaires du vivier.',
      icon: Key,
      badge: '2FA Mandatory',
    },
    {
      title: 'Accès Projet Limité',
      desc: 'Chaque freelance accède exclusivement aux dépôts et projets auxquels il est formellement affecté.',
      icon: Lock,
      badge: 'Moindre Privilège',
    },
    {
      title: 'Révocation Immédiate',
      desc: 'Les accès applicatifs et dépôts sont révoqués instantanément en fin de mission ou sur décision d\'urgence.',
      icon: ShieldAlert,
      badge: 'Kill Switch 1-Click',
    },
    {
      title: 'Traçabilité & Audits',
      desc: 'Journalisation complète des actions, horodatage et respect strict des normes de sécurité des données.',
      icon: Eye,
      badge: 'Audit Logs',
    },
  ];

  return (
    <section id="securite" className="py-20 sm:py-28 bg-[#0B0D10] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#15181D] border border-white/10 text-xs font-bold text-white mb-4">
            <ShieldCheck className="w-4 h-4 text-[#32D583]" />
            Secure by design
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
            Chaque talent accède uniquement à ce dont il a besoin.
          </h2>
          <p className="text-base sm:text-lg text-[#98A2B3] leading-relaxed">
            Une architecture de permissions étanche pour protéger le patrimoine applicatif et les données de nos clients.
          </p>
        </div>

        {/* Bento Grid Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-8 bg-[#15181D] border border-white/10 rounded-3xl hover:border-[#A8E635]/50 transition-all duration-300 flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0B0D10] text-[#A8E635] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <span className="text-[10px] font-mono font-bold text-[#A8E635] bg-[#0B0D10] px-2.5 py-0.5 rounded-full border border-white/10">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-sm text-[#98A2B3] leading-relaxed">
                    {item.desc}
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
