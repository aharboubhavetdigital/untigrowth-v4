import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  UserPlus,
  Send,
  X,
  CheckCircle2,
  ChevronDown,
  Check,
  Briefcase,
  MapPin,
  Ban,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { TalentDetailFiche } from './TalentDetailFiche';

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

const CustomDropdown: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full px-3.5 py-2.5 bg-white/5 border rounded-xl text-xs text-left flex items-center justify-between cursor-pointer transition-all ${
          open
            ? 'border-[#A8E635] text-white ring-2 ring-[#A8E635]/20 bg-[#121622]'
            : 'border-white/10 text-white/90 hover:border-white/20 hover:bg-white/[0.07]'
        }`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#98A2B3] shrink-0 ml-1.5 transition-transform ${open ? 'rotate-180 text-white' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 z-50 min-w-[200px] w-full bg-[#272E3B] border border-white/15 rounded-xl shadow-2xl py-1.5 text-xs overflow-hidden animate-in fade-in duration-100">
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`px-3.5 py-2 flex items-center gap-2.5 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 text-[#A8E635] shrink-0" />
                ) : (
                  <span className="w-3.5 h-3.5 shrink-0" />
                )}
                <span className="truncate">{option}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export interface Talent {
  id: string;
  name: string;
  email: string;
  avatar: string;
  skills: string[];
  famille: string;
  country: 'Maroc' | 'Madagascar';
  score: number;
  emoji: string;
  emojiLabel: string;
  disponibilite: 'Disponible' | 'Partiellement dispo' | 'Indisponible' | 'À confirmer';
  statut: 'Dossier incomplet' | 'Dossier soumis' | 'Test effectué' | 'Validé métier' | 'Validé' | 'Rejeté' | 'Suspendu';
}

const ScoreCircle: React.FC<{ score: number; size?: number }> = ({ score, size = 46 }) => {
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 85) return '#A8E635';
    if (s >= 70) return '#34D399';
    if (s >= 55) return '#FBBF24';
    return '#F87171';
  };

  const color = getColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 drop-shadow-sm" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          fill="transparent"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none pointer-events-none">
        <span className="text-[12px] font-black text-white tracking-tight">
          {score}
        </span>
        <span className="text-[8px] font-extrabold text-[#98A2B3] -mt-0.5">%</span>
      </div>
    </div>
  );
};

const INITIAL_TALENTS: Talent[] = [
  {
    id: '1',
    name: 'Salma Benali',
    email: 'salma@freelance.ma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    skills: ['Next.js', 'Node.js', 'TypeScript'],
    famille: 'Développement full stack',
    country: 'Maroc',
    score: 91,
    emoji: '⚡',
    emojiLabel: 'Lead Dev',
    disponibilite: 'Disponible',
    statut: 'Validé',
  },
  {
    id: '2',
    name: 'Rania Skalli',
    email: 'rania@freelance.ma',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    skills: ['Media buying', 'Meta Ads', 'CRM'],
    famille: 'Marketing digital',
    country: 'Maroc',
    score: 90,
    emoji: '🎯',
    emojiLabel: 'Growth Star',
    disponibilite: 'Disponible',
    statut: 'Validé',
  },
  {
    id: '3',
    name: 'Hery Randria',
    email: 'hery@freelance.mg',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    skills: ['Agents IA', 'n8n', 'Python'],
    famille: 'IA & automatisation',
    country: 'Madagascar',
    score: 88,
    emoji: '🤖',
    emojiLabel: 'AI Master',
    disponibilite: 'Disponible',
    statut: 'Validé',
  },
  {
    id: '4',
    name: 'Yassine El Amrani',
    email: 'yassine@freelance.ma',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    skills: ['React', 'Laravel', 'PostgreSQL'],
    famille: 'Développement full stack',
    country: 'Maroc',
    score: 86,
    emoji: '💻',
    emojiLabel: 'Fullstack Pro',
    disponibilite: 'Disponible',
    statut: 'Validé',
  },
  {
    id: '5',
    name: 'Lova Rasoanaivo',
    email: 'lova@freelance.mg',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    skills: ['Glide', 'Make', 'Softr'],
    famille: 'No-code',
    country: 'Madagascar',
    score: 84,
    emoji: '🧩',
    emojiLabel: 'No-Code Wizard',
    disponibilite: 'Disponible',
    statut: 'Validé',
  },
  {
    id: '6',
    name: 'Imane Tazi',
    email: 'imane@freelance.ma',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    skills: ['LangChain', 'OpenAI API', 'Automatisation'],
    famille: 'IA & automatisation',
    country: 'Maroc',
    score: 82,
    emoji: '🧠',
    emojiLabel: 'Prompt & LLM',
    disponibilite: 'Indisponible',
    statut: 'Validé',
  },
  {
    id: '7',
    name: 'Karim Bousfiha',
    email: 'karim@freelance.ma',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
    skills: ['Bubble', 'Webflow', 'Airtable'],
    famille: 'No-code',
    country: 'Maroc',
    score: 79,
    emoji: '🎨',
    emojiLabel: 'Webflow Ninja',
    disponibilite: 'Disponible',
    statut: 'Validé',
  },
  {
    id: '8',
    name: 'Andry Rakoto',
    email: 'andry@freelance.mg',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    skills: ['Vue.js', 'PHP', 'MySQL'],
    famille: 'Développement full stack',
    country: 'Madagascar',
    score: 78,
    emoji: '🔥',
    emojiLabel: 'Fast Builder',
    disponibilite: 'Partiellement dispo',
    statut: 'Validé',
  },
  {
    id: '9',
    name: 'Tiana Ravelo',
    email: 'tiana@freelance.mg',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    skills: ['Community management', 'SEO', 'Canva'],
    famille: 'Marketing digital',
    country: 'Madagascar',
    score: 76,
    emoji: '📱',
    emojiLabel: 'Social Media',
    disponibilite: 'Partiellement dispo',
    statut: 'Validé',
  },
  {
    id: '10',
    name: 'Mehdi Chraibi',
    email: 'mehdi@freelance.ma',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150',
    skills: ['Django', 'React', 'Docker'],
    famille: 'Développement full stack',
    country: 'Maroc',
    score: 74,
    emoji: '🚀',
    emojiLabel: 'Backend Arch',
    disponibilite: 'Disponible',
    statut: 'Validé métier',
  },
  {
    id: '11',
    name: 'Nadia Berrada',
    email: 'nadia@freelance.ma',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150',
    skills: ['SEO', 'Content', 'Google Ads'],
    famille: 'Marketing digital',
    country: 'Maroc',
    score: 71,
    emoji: '📈',
    emojiLabel: 'SEO Strategist',
    disponibilite: 'Disponible',
    statut: 'Validé métier',
  },
  {
    id: '12',
    name: 'Nofy Andriana',
    email: 'nofy@freelance.mg',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
    skills: ['Python', 'Zapier', 'Make'],
    famille: 'IA & automatisation',
    country: 'Madagascar',
    score: 65,
    emoji: '⚙️',
    emojiLabel: 'Auto Workflows',
    disponibilite: 'Disponible',
    statut: 'Test effectué',
  },
  {
    id: '13',
    name: 'Othmane Tahiri',
    email: 'othmane@freelance.ma',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
    skills: ['Flutter', 'Mobile', 'Firebase'],
    famille: 'Développement full stack',
    country: 'Maroc',
    score: 66,
    emoji: '📲',
    emojiLabel: 'Mobile Flutter',
    disponibilite: 'Disponible',
    statut: 'Test effectué',
  },
  {
    id: '14',
    name: 'Mirana Rakotomalala',
    email: 'mirana@freelance.mg',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    skills: ['Make', 'Airtable', 'Notion'],
    famille: 'No-code',
    country: 'Madagascar',
    score: 64,
    emoji: '🗂️',
    emojiLabel: 'Ops & Notion',
    disponibilite: 'Partiellement dispo',
    statut: 'Dossier soumis',
  },
  {
    id: '15',
    name: 'Hamza Fassi',
    email: 'hamza@freelance.ma',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    skills: ['Scrum', 'Jira', 'Product Management'],
    famille: 'Chef de projet',
    country: 'Maroc',
    score: 62,
    emoji: '⏱️',
    emojiLabel: 'Scrum Master',
    disponibilite: 'À confirmer',
    statut: 'Dossier incomplet',
  },
  {
    id: '16',
    name: 'Faly Razafy',
    email: 'faly@freelance.mg',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    skills: ['Python', 'LangChain', 'RAG'],
    famille: 'IA & automatisation',
    country: 'Madagascar',
    score: 59,
    emoji: '🧪',
    emojiLabel: 'RAG Specialist',
    disponibilite: 'À confirmer',
    statut: 'Dossier soumis',
  },
  {
    id: '17',
    name: 'Sofia Alaoui',
    email: 'sofia@freelance.ma',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
    skills: ['Agile', 'Product Owner', 'Roadmaps'],
    famille: 'Chef de projet',
    country: 'Maroc',
    score: 58,
    emoji: '🧭',
    emojiLabel: 'Product Lead',
    disponibilite: 'Indisponible',
    statut: 'Suspendu',
  },
];

interface VivierViewProps {
  onNavigateToRelances?: () => void;
  onNavigateToInvitations?: () => void;
}

export const VivierView: React.FC<VivierViewProps> = ({ onNavigateToRelances, onNavigateToInvitations }) => {
  const [talents] = useState<Talent[]>(INITIAL_TALENTS);
  const [search, setSearch] = useState('');
  const [familleFilter, setFamilleFilter] = useState('Toutes les familles');
  const [countryFilter, setCountryFilter] = useState('Tous les pays');
  const [statutFilter, setStatutFilter] = useState('Tous les statuts');
  const [dispoFilter, setDispoFilter] = useState('Toutes disponibilités');
  
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [relanceSent, setRelanceSent] = useState(false);

  // Invite form state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteFamille, setInviteFamille] = useState('Développement full stack');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const filteredTalents = talents.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesFamille =
      familleFilter === 'Toutes les familles' || t.famille === familleFilter;

    const matchesCountry =
      countryFilter === 'Tous les pays' || t.country === countryFilter;

    const matchesStatut =
      statutFilter === 'Tous les statuts' || t.statut === statutFilter;

    const matchesDispo =
      dispoFilter === 'Toutes disponibilités' || t.disponibilite === dispoFilter;

    return (
      matchesSearch &&
      matchesFamille &&
      matchesCountry &&
      matchesStatut &&
      matchesDispo
    );
  });

  const handleSendRelance = () => {
    setRelanceSent(true);
    setTimeout(() => setRelanceSent(false), 3000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setInviteModalOpen(false);
      setInviteEmail('');
    }, 2000);
  };

  const getDispoBadge = (dispo: Talent['disponibilite']) => {
    switch (dispo) {
      case 'Disponible':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Partiellement dispo':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Indisponible':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getStatutBadge = (statut: Talent['statut']) => {
    switch (statut) {
      case 'Validé':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Validé métier':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Test effectué':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Dossier soumis':
        return 'bg-teal-500/15 text-teal-300 border-teal-500/30';
      case 'Dossier incomplet':
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
      case 'Suspendu':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'Rejeté':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  if (selectedTalent) {
    return (
      <TalentDetailFiche
        talent={selectedTalent}
        onBack={() => setSelectedTalent(null)}
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* Top Header from Screenshot 1 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Talent Hub
          </h1>
          <p className="text-xs sm:text-sm text-[#98A2B3] mt-1 font-medium">
            Profils freelances, validations et suivi du parcours de qualification.
          </p>
        </div>

        {/* Action Buttons: Green CTA + Secondary Button */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => {
              if (onNavigateToInvitations) {
                onNavigateToInvitations();
              } else {
                setInviteModalOpen(true);
              }
            }}
            className="px-5 py-2.5 bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] font-black rounded-xl text-xs shadow-lg shadow-[#A8E635]/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>Inviter un candidat</span>
          </button>
          <button
            onClick={() => {
              if (onNavigateToRelances) {
                onNavigateToRelances();
              } else {
                handleSendRelance();
              }
            }}
            className="px-4 py-2.5 bg-[#12151C] border border-white/15 hover:bg-white hover:text-[#0B0D10] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{relanceSent ? 'Relances envoyées !' : 'Relances disponibilité'}</span>
          </button>
        </div>
      </div>

      {/* Filter Bar from Screenshots 1, 2, 3, 4, 5 */}
      <div className="bg-[#0B0E17] p-3 rounded-2xl border border-white/10 shadow-xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher nom, email, skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-[#98A2B3] focus:outline-none focus:border-[#A8E635] transition-colors"
            />
          </div>

          {/* Filter 1: Familles (Screenshot 2) */}
          <CustomDropdown
            value={familleFilter}
            onChange={(val) => setFamilleFilter(val)}
            options={[
              'Toutes les familles',
              'Développement full stack',
              'IA & automatisation',
              'No-code',
              'Marketing digital',
              'Chef de projet',
            ]}
          />

          {/* Filter 2: Pays (Screenshot 3) */}
          <CustomDropdown
            value={countryFilter}
            onChange={(val) => setCountryFilter(val)}
            options={['Tous les pays', 'Maroc', 'Madagascar']}
          />

          {/* Filter 3: Statuts (Screenshot 4) */}
          <CustomDropdown
            value={statutFilter}
            onChange={(val) => setStatutFilter(val)}
            options={[
              'Tous les statuts',
              'Dossier incomplet',
              'Dossier soumis',
              'Test effectué',
              'Validé métier',
              'Validé',
              'Rejeté',
              'Suspendu',
            ]}
          />

          {/* Filter 4: Disponibilités (Screenshot 5) */}
          <CustomDropdown
            value={dispoFilter}
            onChange={(val) => setDispoFilter(val)}
            options={[
              'Toutes disponibilités',
              'Disponible',
              'Partiellement dispo',
              'Indisponible',
              'À confirmer',
            ]}
          />
        </div>
      </div>

      {/* Counter & Instruction text from Screenshot 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-[#98A2B3] px-1">
        <span className="font-semibold">{filteredTalents.length} résultat(s)</span>
        <span className="text-[11px] italic">Cliquez sur un talent pour ouvrir sa fiche (dossier, scores, historique).</span>
      </div>

      {/* Talent Table from Screenshot 1 */}
      <div className="bg-[#0B0E17] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-extrabold uppercase tracking-wider text-[#98A2B3]">
                <th className="py-4 px-4 sm:px-6">TALENT</th>
                <th className="py-4 px-3 text-center">BADGE / MOOD</th>
                <th className="py-4 px-4">MÉTIER / PAYS</th>
                <th className="py-4 px-4 text-center">SCORE</th>
                <th className="py-4 px-4 text-center">DISPONIBILITÉ</th>
                <th className="py-4 px-4 text-center">STATUT</th>
                <th className="py-4 px-4 sm:px-6 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {filteredTalents.map((talent) => (
                <tr
                  key={talent.id}
                  onClick={() => setSelectedTalent(talent)}
                  className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                >
                  {/* TALENT WITH PICTURE */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="relative shrink-0">
                        <img
                          src={talent.avatar}
                          alt={talent.name}
                          className="w-11 h-11 rounded-xl object-cover border border-white/15 group-hover:border-[#A8E635] shadow-md transition-colors"
                          loading="lazy"
                        />
                        <span
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0B0E17] ${
                            talent.disponibilite === 'Disponible'
                              ? 'bg-emerald-400'
                              : talent.disponibilite === 'Partiellement dispo'
                              ? 'bg-amber-400'
                              : 'bg-rose-400'
                          }`}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-white text-sm group-hover:text-[#A8E635] transition-colors truncate">
                          {talent.name}
                        </div>
                        <div className="text-xs text-[#98A2B3] mt-0.5 truncate">{talent.email}</div>
                        <div className="text-[11px] text-[#98A2B3]/80 mt-1 font-mono truncate">
                          {talent.skills.join(', ')}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* EMOJI / MOOD TD */}
                  <td className="py-4 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#A8E635] border border-[#A8E635] shadow-md shadow-[#A8E635]/20 group-hover:bg-[#b8f042] transition-all">
                      <span className="text-base leading-none select-none">{talent.emoji}</span>
                      <span className="text-[10px] font-black text-[#0B0E17] whitespace-nowrap">{talent.emojiLabel}</span>
                    </div>
                  </td>

                  {/* MÉTIER / PAYS */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-white text-xs">
                      {talent.famille}
                    </div>
                    <div className="text-xs text-[#98A2B3] mt-0.5">
                      {talent.country}
                    </div>
                  </td>

                  {/* SCORE CIRCLE (PERCENTAGE GAUGE) */}
                  <td className="py-4 px-4 text-center">
                    <ScoreCircle score={talent.score} />
                  </td>

                  {/* DISPONIBILITÉ */}
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getDispoBadge(
                        talent.disponibilite
                      )}`}
                    >
                      {talent.disponibilite}
                    </span>
                  </td>

                  {/* STATUT */}
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatutBadge(
                        talent.statut
                      )}`}
                    >
                      {talent.statut}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTalent(talent);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#A8E635]/15 border border-[#A8E635]/35 hover:bg-[#A8E635] hover:text-[#0B0D10] text-[#A8E635] font-bold text-xs transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      Fiche
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTalents.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#98A2B3]">
                    Aucun talent ne correspond à vos filtres.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0E17] border border-white/20 rounded-2xl w-full max-w-md p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setInviteModalOpen(false)}
              className="absolute top-4 right-4 text-[#98A2B3] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#A8E635]/15 text-[#A8E635] border border-[#A8E635]/30">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Inviter un candidat</h3>
                <p className="text-xs text-[#98A2B3]">Envoyez un lien d'inscription personnalisé.</p>
              </div>
            </div>

            {inviteSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-1 text-emerald-400" />
                <p className="font-bold">Invitation envoyée avec succès !</p>
                <p className="text-white/70">Un email a été envoyé à {inviteEmail}</p>
              </div>
            ) : (
              <form onSubmit={handleSendInvite} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Adresse email du freelance
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ex: candidat@freelance.ma"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-[#98A2B3] focus:outline-none focus:border-[#A8E635]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Famille de métier
                  </label>
                  <CustomDropdown
                    value={inviteFamille}
                    onChange={(val) => setInviteFamille(val)}
                    options={[
                      'Développement full stack',
                      'IA & automatisation',
                      'No-code',
                      'Marketing digital',
                      'Chef de projet',
                    ]}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setInviteModalOpen(false)}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-semibold hover:bg-white/10 cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#A8E635] text-[#0B0D10] font-extrabold rounded-xl text-xs shadow-lg hover:bg-[#b8f042] cursor-pointer"
                  >
                    Envoyer l'invitation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VivierView;
