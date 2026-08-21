import React from 'react';
import { motion } from 'motion/react';
import { Users, Briefcase, Globe2, Award } from 'lucide-react';

export const HeroStats: React.FC = () => {
  const stats = [
    {
      stat: '40–120',
      label: 'talents ciblés',
      description: 'Capacité dédiée au vivier',
      icon: Users,
      accent: 'text-[#A8E635]',
      bgAccent: 'bg-[#A8E635]',
    },
    {
      stat: '4',
      label: 'familles de métiers',
      description: 'Dev, IA, No-Code, Marketing',
      icon: Briefcase,
      accent: 'text-white',
      bgAccent: 'bg-[#0B0D10] text-white border border-white/10',
    },
    {
      stat: '2',
      label: 'pays stratégiques',
      description: 'Maroc & Madagascar',
      icon: Globe2,
      accent: 'text-white',
      bgAccent: 'bg-[#0B0D10] text-white border border-white/10',
    },
    {
      stat: '100',
      label: 'score maximum',
      description: 'Évaluation & qualification IA',
      icon: Award,
      accent: 'text-[#6C55F5]',
      bgAccent: 'bg-[#6C55F5]/20 text-[#6C55F5]',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-5 bg-[#15181D] border border-white/10 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 text-white"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.bgAccent}`}>
                <Icon className="w-4 h-4 text-[#101214]" />
              </span>
              <span className="text-[10px] font-mono text-[#98A2B3] uppercase tracking-wider">KPI 0{index + 1}</span>
            </div>
            <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${item.accent} mb-1`}>
              {item.stat}
            </div>
            <div className="text-sm font-bold text-white">{item.label}</div>
            <div className="text-xs text-[#98A2B3] mt-0.5">{item.description}</div>
          </motion.div>
        );
      })}
    </div>
  );
};
