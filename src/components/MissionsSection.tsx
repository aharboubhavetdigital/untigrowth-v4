import React from 'react';
import { Clock, Briefcase, Calendar, ArrowRight, Sparkles, CheckCircle2, Zap, Tag } from 'lucide-react';
import { Marquee } from '@/components/ui/marquee';
import { cn } from '@/lib/utils';

interface MissionsSectionProps {
  onOpenJoin?: () => void;
}

interface Mission {
  id: string;
  status: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  type: string;
  deadline: string;
  budget: string;
  clientBadge: string;
  skills: string[];
}

const missions: Mission[] = [
  {
    id: '1',
    status: 'OFFRE OUVERTE',
    category: 'No-code & Workflow',
    title: 'Landing pages no-code + CRM Airtable',
    description: 'Conception de 3 landing pages haute conversion sous Make & Airtable automatisé pour la collecte de leads.',
    duration: '10 j/h sur 3 semaines',
    type: 'Forfait mission',
    deadline: '29/08/2026',
    budget: '22.000 DH',
    clientBadge: 'Client Vérifié · Casablanca',
    skills: ['Make', 'Airtable', 'Webflow'],
  },
  {
    id: '2',
    status: 'OFFRE OUVERTE',
    category: 'Fullstack Dev',
    title: 'API mobile et back-office de réservation',
    description: 'Développement complet de l’architecture backend Node.js / PostgreSQL et dashboard React Admin.',
    duration: '30 j/h sur 8 semaines',
    type: 'Forfait mission',
    deadline: '23/09/2026',
    budget: '85.000 DH',
    clientBadge: 'Fintech · Rabat',
    skills: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: '3',
    status: 'OFFRE OUVERTE',
    category: 'Marketing Digital',
    title: 'Community management & contenu LinkedIn B2B',
    description: 'Stratégie éditoriale B2B, rédaction de posts hebdomadaires et animation de la communauté tech.',
    duration: 'Mi-temps · 3 mois',
    type: 'Forfait mission',
    deadline: '18/08/2026',
    budget: '45.000 DH',
    clientBadge: 'Agence Tech · Marrakech',
    skills: ['Copywriting', 'LinkedIn B2B', 'Branding'],
  },
  {
    id: '4',
    status: 'OFFRE OUVERTE',
    category: 'IA & Automation',
    title: 'Agent IA de qualification de leads',
    description: 'Intégration RAG avec Gemini API & WhatsApp Business pour le support client et qualification en temps réel.',
    duration: '25 j/h sur 6 semaines',
    type: 'Forfait mission',
    deadline: '03/09/2026',
    budget: '60.000 DH',
    clientBadge: 'E-commerce · Tanger',
    skills: ['Gemini API', 'Python', 'LangChain'],
  },
  {
    id: '5',
    status: 'OFFRE OUVERTE',
    category: 'Cybersécurité Cloud',
    title: 'Audit de sécurité & conformité AWS',
    description: 'Pentest infrastructure cloud, hardening des accès IAM et rapport de conformité PCI-DSS.',
    duration: '12 j/h sur 4 semaines',
    type: 'Forfait mission',
    deadline: '15/09/2026',
    budget: '38.000 DH',
    clientBadge: 'Banque Privée · Casablanca',
    skills: ['AWS IAM', 'Pentesting', 'SecOps'],
  },
  {
    id: '6',
    status: 'OFFRE OUVERTE',
    category: 'Mobile Application',
    title: 'Application mobile Flutter iOS & Android',
    description: 'Création d’une application de livraison en temps réel avec géolocalisation et paiement en ligne.',
    duration: '20 j/h sur 5 semaines',
    type: 'Forfait mission',
    deadline: '30/09/2026',
    budget: '72.000 DH',
    clientBadge: 'Logistique · Antananarivo',
    skills: ['Flutter', 'Firebase', 'Google Maps'],
  },
];

export const MissionsSection: React.FC<MissionsSectionProps> = ({ onOpenJoin }) => {
  return (
    <section id="offres" className="bg-[#0B0D10] py-24 sm:py-32 border-b border-white/10 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-r from-[#A8E635]/10 via-[#A8E635]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-24 left-10 w-80 h-80 bg-[#A8E635]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Des missions au forfait, publiées par IAweb et Havet Digital
            </h2>
            <p className="text-base sm:text-lg text-[#98A2B3] leading-relaxed">
              Consultez nos offres actuelles. Les freelances validés candidatent directement sur leur espace avec des jalons clairs et des paiements sécurisés.
            </p>
          </div>

          <div>
            <button
              onClick={onOpenJoin}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#A8E635] hover:bg-[#98d42c] text-[#0B0D10] font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(168,230,53,0.3)] hover:shadow-[0_0_35px_rgba(168,230,53,0.5)] cursor-pointer group shrink-0"
            >
              <span>Rejoindre pour candidater</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Container with Horizontal Fade Gradient Mask */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 opacity-60">
        {/* Row 1: Forward Marquee */}
        <Marquee pauseOnHover repeat={4} className="[--duration:40s] [--gap:1rem] sm:[--gap:1.5rem] mb-4 sm:mb-6">
          {missions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} onOpenJoin={onOpenJoin} />
          ))}
        </Marquee>

        {/* Row 2: Reverse Marquee */}
        <Marquee reverse pauseOnHover repeat={4} className="[--duration:45s] [--gap:1rem] sm:[--gap:1.5rem]">
          {missions.slice().reverse().map((mission) => (
            <MissionCard key={`rev-${mission.id}`} mission={mission} onOpenJoin={onOpenJoin} />
          ))}
        </Marquee>
      </div>


    </section>
  );
};

function MissionCard({
  mission,
  onOpenJoin,
}: {
  mission: Mission;
  onOpenJoin?: () => void;
  key?: React.Key;
}) {
  return (
    <div
      onClick={onOpenJoin}
      className={cn(
        "relative flex flex-col justify-between w-[280px] sm:w-[420px] shrink-0 bg-[#13161C] border-2 border-white/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 cursor-pointer select-none",
        "bg-gradient-to-b from-black via-[#13161C] to-black"
      )}
    >
      {/* Card Header: Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#A8E635]/10 border border-[#A8E635]/30 text-[10px] sm:text-[11px] font-mono font-bold text-[#A8E635] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8E635] animate-pulse" />
            {mission.status}
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono text-white/60 bg-white/5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-white/10">
            {mission.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white leading-snug mb-1.5 sm:mb-2.5 line-clamp-2">
          {mission.title}
        </h3>

        {/* Short Description */}
        <p className="text-[11px] sm:text-xs text-[#98A2B3] line-clamp-2 leading-relaxed mb-3 sm:mb-4">
          {mission.description}
        </p>

        {/* Tech Skills Pills */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-5">
          {mission.skills.map((skill, i) => (
            <span
              key={i}
              className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 sm:px-2 rounded bg-white/5 text-white/70 border border-white/5"
            >
              #{skill}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Metadata & Budget */}
      <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-end justify-between gap-2 sm:gap-3 mt-auto">
        <div className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-xs text-[#98A2B3]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A8E635]" />
            <span className="text-white/80 font-medium">{mission.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/40" />
            <span>Échéance: {mission.deadline}</span>
          </div>
        </div>

        {/* Budget */}
        <div className="text-right">
          <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-widest text-[#98A2B3] uppercase block">
            FORFAIT
          </span>
          <span className="text-lg sm:text-2xl font-extrabold text-white font-mono tracking-tight">
            {mission.budget}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MissionsSection;
