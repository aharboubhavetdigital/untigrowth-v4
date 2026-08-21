import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  RotateCw,
  Search,
  ChevronDown,
  Check,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  User,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  className?: string;
}

const CustomReasonSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
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
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full sm:w-56 px-4 py-2.5 bg-[#0B0E17] border rounded-xl text-xs text-left flex items-center justify-between cursor-pointer transition-all ${
          open
            ? 'border-[#A8E635] text-white ring-1 ring-[#A8E635]/50'
            : 'border-white/10 text-white hover:border-[#A8E635]/50'
        }`}
      >
        <span className="truncate font-medium">{value}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#98A2B3] transition-transform ml-2 shrink-0 ${open ? 'rotate-180 text-[#A8E635]' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1.5 z-50 w-56 bg-[#13161C] border border-white/20 rounded-xl shadow-2xl py-1.5 text-xs animate-in fade-in zoom-in-95 duration-100 backdrop-blur-md">
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`px-3.5 py-2 mx-1 my-0.5 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#A8E635] text-[#0B0D10] font-black shadow-md shadow-[#A8E635]/15'
                    : 'text-white/90 hover:bg-white/10 hover:text-white font-medium'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#0B0D10] shrink-0" />}
                  <span className={`truncate ${!isSelected ? 'ml-5' : ''}`}>{option}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export interface RelanceCandidate {
  id: string;
  name: string;
  avatar: string;
  email: string;
  dispoSub: string;
  confirmedDate: string;
  reason: 'Expirée' | 'Inconnue' | 'Manuelle';
  badge: 'Expirée' | 'Inconnue' | 'Manuelle';
}

export interface RelanceHistoryEntry {
  id: string;
  name: string;
  email: string;
  timestamp: string;
  type: 'Automatique' | 'Forcée' | 'Manuelle';
  status: 'Envoyé' | 'Délivré';
}

interface RelancesDispoViewProps {
  onNavigateToVivier?: () => void;
}

export const RelancesDispoView: React.FC<RelancesDispoViewProps> = ({ onNavigateToVivier }) => {
  const [items, setItems] = useState<RelanceCandidate[]>([
    {
      id: '1',
      name: 'Andry Rakoto',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      email: 'andry@freelance.mg',
      dispoSub: 'Partiellement dispo',
      confirmedDate: '20/06/2026',
      reason: 'Expirée',
      badge: 'Expirée',
    },
    {
      id: '2',
      name: 'Tiana Ravelo',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      email: 'tiana@freelance.mg',
      dispoSub: 'Partiellement dispo',
      confirmedDate: '20/06/2026',
      reason: 'Expirée',
      badge: 'Expirée',
    },
  ]);

  const [history, setHistory] = useState<RelanceHistoryEntry[]>([]);
  const [search, setSearch] = useState('');
  const [reasonFilter, setReasonFilter] = useState('Toutes les raisons');
  const [notification, setNotification] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.dispoSub.toLowerCase().includes(search.toLowerCase());

    const matchesReason =
      reasonFilter === 'Toutes les raisons' ||
      item.reason === reasonFilter ||
      item.badge === reasonFilter;

    return matchesSearch && matchesReason;
  });

  const handleLancerRelances = (type: 'Automatique' | 'Forcée') => {
    if (items.length === 0) {
      showNotification('Aucun freelance en attente de relance.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const nowStr = new Date().toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const newLogs: RelanceHistoryEntry[] = items.map((item) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: item.name,
        email: item.email,
        timestamp: nowStr,
        type,
        status: 'Envoyé',
      }));

      setHistory((prev) => [...newLogs, ...prev]);
      setItems([]);
      setIsProcessing(false);
      showNotification(`Relances (${type.toLowerCase()}) envoyées avec succès à ${items.length} freelance(s).`);
    }, 600);
  };

  const handleRelancerIndividual = (item: RelanceCandidate) => {
    const nowStr = new Date().toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newLog: RelanceHistoryEntry = {
      id: Math.random().toString(36).substring(2, 9),
      name: item.name,
      email: item.email,
      timestamp: nowStr,
      type: 'Manuelle',
      status: 'Envoyé',
    };

    setHistory((prev) => [newLog, ...prev]);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    showNotification(`Relance de disponibilité envoyée à ${item.name}.`);
  };

  const handleResetDemoData = () => {
    setItems([
      {
        id: '1',
        name: 'Andry Rakoto',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        email: 'andry@freelance.mg',
        dispoSub: 'Partiellement dispo',
        confirmedDate: '20/06/2026',
        reason: 'Expirée',
        badge: 'Expirée',
      },
      {
        id: '2',
        name: 'Tiana Ravelo',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        email: 'tiana@freelance.mg',
        dispoSub: 'Partiellement dispo',
        confirmedDate: '20/06/2026',
        reason: 'Expirée',
        badge: 'Expirée',
      },
    ]);
    showNotification('Données de relance réinitialisées.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs rounded-xl flex items-center justify-between animate-in fade-in shadow-xl">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#A8E635]" />
            <span className="font-semibold text-white">{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-white/60 hover:text-white text-xs font-bold px-2 py-0.5">
            ✕
          </button>
        </div>
      )}

      {/* Top Header matching Screenshot 1 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Relances disponibilité
          </h1>
          <p className="text-xs sm:text-sm text-[#98A2B3] mt-1 font-medium max-w-2xl leading-relaxed">
            Relance automatique des freelances validés (disponibilité inconnue ou non confirmée depuis 30jours). MVP interne — pas d'e-mail SMTP.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {onNavigateToVivier && (
            <button
              onClick={onNavigateToVivier}
              className="text-xs font-bold text-[#98A2B3] hover:text-[#A8E635] transition-colors cursor-pointer px-2 py-2"
            >
              <span>Vivier</span>
            </button>
          )}

          {/* Green CTA Button matching Design System */}
          <button
            onClick={() => handleLancerRelances('Automatique')}
            disabled={isProcessing}
            className="px-4 sm:px-5 py-2.5 bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] font-black rounded-xl text-xs shadow-lg shadow-[#A8E635]/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Bell className={`w-4 h-4 ${isProcessing ? 'animate-bounce' : ''}`} />
            <span>Lancer les relances</span>
          </button>

          {/* Secondary Button */}
          <button
            onClick={() => handleLancerRelances('Forcée')}
            disabled={isProcessing}
            className="px-4 py-2.5 bg-[#0B0E17] border border-white/15 hover:bg-white/10 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <RotateCw className={`w-3.5 h-3.5 text-[#98A2B3] ${isProcessing ? 'animate-spin' : ''}`} />
            <span>Forcer</span>
          </button>
        </div>
      </div>

      {/* Card 1: À relancer (2) matching Screenshot 1 */}
      <div className="bg-[#0B0E17] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
        <div className="pb-3 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-black text-white">
            À relancer ({filteredItems.length})
          </h2>
          {items.length === 0 && (
            <button
              onClick={handleResetDemoData}
              className="text-[11px] font-bold text-[#A8E635] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Recharger les freelances démo</span>
            </button>
          )}
        </div>

        {/* Search Input & Reason Dropdown Filter matching Screenshot 1 & 2 */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Nom, e-mail..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-[#98A2B3] focus:outline-none focus:border-[#A8E635] transition-colors"
              />
            </div>

            {/* Reason Custom Dropdown Filter */}
            <CustomReasonSelect
              value={reasonFilter}
              onChange={(val) => setReasonFilter(val)}
              options={['Toutes les raisons', 'Inconnue', 'Expirée', 'Manuelle']}
            />
          </div>

          <div className="text-[11px] font-semibold text-[#98A2B3] pt-1">
            {filteredItems.length} résultat(s)
          </div>
        </div>

        {/* Candidate List Rows */}
        <div className="divide-y divide-white/5 pt-1">
          {filteredItems.map((candidate) => (
            <div
              key={candidate.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] px-2 sm:px-3 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-10 h-10 rounded-xl object-cover border border-white/10 group-hover:border-[#A8E635] transition-colors shrink-0"
                />
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm group-hover:text-[#A8E635] transition-colors">
                    {candidate.name}
                  </div>
                  <div className="text-xs text-[#98A2B3] mt-0.5">
                    {candidate.dispoSub} · confirmée {candidate.confirmedDate}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                {/* Expirée Badge */}
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#382613] text-[#FBBF24] border border-[#FBBF24]/30 shadow-sm">
                  {candidate.badge}
                </span>

                {/* Relancer Action Link */}
                <button
                  onClick={() => handleRelancerIndividual(candidate)}
                  className="text-xs font-black text-[#A8E635] hover:text-[#b8f042] hover:underline transition-all cursor-pointer px-2 py-1 active:scale-95"
                >
                  Relancer
                </button>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-xs text-[#98A2B3] italic">
              Aucun freelance à relancer avec ces critères.
            </div>
          )}
        </div>
      </div>

      {/* Card 2: Historique des relances matching Screenshot 1 */}
      <div className="bg-[#0B0E17] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
        <div className="pb-3 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-black text-white">
            Historique des relances
          </h2>
          {history.length > 0 && (
            <span className="text-xs font-semibold text-[#98A2B3]">
              {history.length} relance(s) envoyée(s)
            </span>
          )}
        </div>

        {history.length === 0 ? (
          <div className="py-14 text-center text-xs text-[#98A2B3] italic border border-dashed border-white/10 rounded-xl">
            Aucune relance enregistrée.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {history.map((log) => (
              <div
                key={log.id}
                className="py-3 px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs hover:bg-white/[0.02] rounded-xl transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1 rounded-md bg-[#A8E635]/15 text-[#A8E635] border border-[#A8E635]/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-white">{log.name}</span>
                    <span className="text-[#98A2B3] ml-2 font-medium">
                      ({log.email}) — Relance {log.type.toLowerCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#98A2B3] font-mono self-end sm:self-center">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    {log.status}
                  </span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RelancesDispoView;

