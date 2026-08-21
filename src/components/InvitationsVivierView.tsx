import React, { useState, useRef, useEffect } from 'react';
import {
  UserPlus,
  History,
  Search,
  ChevronDown,
  Check,
  ArrowLeft,
  Send,
  MoreVertical,
  Copy,
  RotateCw,
  XCircle,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  className?: string;
  theme?: 'dark' | 'light';
}

const CustomDropdownSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  className = '',
  theme = 'dark',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isLight = theme === 'light';

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
        className={`w-full px-4 py-2.5 border rounded-xl text-xs text-left flex items-center justify-between cursor-pointer transition-all ${
          isLight
            ? open
              ? 'bg-white border-[#A8E635] text-slate-900 ring-1 ring-[#A8E635]/50'
              : 'bg-white border-slate-200 text-slate-800 hover:border-[#A8E635]/50'
            : open
              ? 'bg-[#0B0E17] border-[#A8E635] text-white ring-1 ring-[#A8E635]/50'
              : 'bg-[#0B0E17] border-white/10 text-white hover:border-[#A8E635]/50'
        }`}
      >
        <span className="truncate font-medium">{value}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ml-2 shrink-0 ${
            open ? 'rotate-180 text-[#A8E635]' : isLight ? 'text-slate-500' : 'text-[#98A2B3]'
          }`}
        />
      </button>

      {open && (
        <div className={`absolute top-full left-0 right-0 mt-1.5 z-50 rounded-xl shadow-2xl py-1.5 text-xs max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100 backdrop-blur-md ${
          isLight
            ? 'bg-white border border-slate-200/80 shadow-md'
            : 'bg-[#13161C] border border-white/20 shadow-2xl'
        }`}>
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
                    : isLight
                      ? 'text-slate-700 hover:bg-slate-100'
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

export interface VivierInvitation {
  id: string;
  name: string;
  email: string;
  metier: string;
  createdByName: string;
  createdAt: string;
  expiresAt: string;
  status: 'Envoyée' | 'Acceptée' | 'Expirée' | 'Annulée';
  token: string;
}

interface InvitationsVivierViewProps {
  onNavigateToVivier?: () => void;
  theme?: 'dark' | 'light';
}

export const InvitationsVivierView: React.FC<InvitationsVivierViewProps> = ({
  onNavigateToVivier,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  // Form State
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [metierInput, setMetierInput] = useState('Au choix du candidat');
  const [validityInput, setValidityInput] = useState('14 jours');
  const [messageInput, setMessageInput] = useState('');

  // Filter State
  const [search, setSearch] = useState('');
  const [statutFilter, setStatutFilter] = useState('Tous les statuts');
  const [familleFilter, setFamilleFilter] = useState('Toutes les familles');

  // Menu action state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Notification Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Data List
  const [invitations, setInvitations] = useState<VivierInvitation[]>([
    {
      id: '1',
      name: 'Candidat Invité',
      email: 'candidat.invite@example.com',
      metier: 'Développement full stack',
      createdByName: 'Responsable Commercial',
      createdAt: '04/08/2026',
      expiresAt: '18/08/2026',
      status: 'Envoyée',
      token: 'magic-token-fullstack-9821',
    },
  ]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    const daysCount = parseInt(validityInput) || 14;
    const today = new Date();
    const expireDate = new Date(today);
    expireDate.setDate(today.getDate() + daysCount);

    const formatDate = (d: Date) =>
      d.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

    const newInv: VivierInvitation = {
      id: Math.random().toString(36).substring(2, 9),
      name: nameInput.trim() || 'Candidat Invité',
      email: emailInput.trim(),
      metier: metierInput === 'Au choix du candidat' ? 'Développement full stack' : metierInput,
      createdByName: 'Responsable Commercial',
      createdAt: formatDate(today),
      expiresAt: formatDate(expireDate),
      status: 'Envoyée',
      token: 'magic-token-' + Math.random().toString(36).substring(2, 8),
    };

    setInvitations((prev) => [newInv, ...prev]);
    setEmailInput('');
    setNameInput('');
    setMessageInput('');
    setMetierInput('Au choix du candidat');
    setValidityInput('14 jours');
    showToast(`Invitation envoyée avec succès à ${newInv.email}`);
  };

  const handleCopyLink = (inv: VivierInvitation) => {
    const link = `https://unitgrowth.app/invite/${inv.token}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
    }
    setOpenMenuId(null);
    showToast(`Lien magique copié : ${link}`);
  };

  const handleResend = (inv: VivierInvitation) => {
    setOpenMenuId(null);
    showToast(`Nouvelle invitation envoyée à ${inv.email}`);
  };

  const handleCancelInvitation = (id: string) => {
    setInvitations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'Annulée' } : i))
    );
    setOpenMenuId(null);
    showToast('Invitation annulée avec succès.');
  };

  const filteredInvitations = invitations.filter((inv) => {
    const matchesSearch =
      inv.email.toLowerCase().includes(search.toLowerCase()) ||
      inv.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatut =
      statutFilter === 'Tous les statuts' || inv.status === statutFilter;

    const matchesFamille =
      familleFilter === 'Toutes les familles' ||
      inv.metier.toLowerCase() === familleFilter.toLowerCase();

    return matchesSearch && matchesStatut && matchesFamille;
  });

  const getInitials = (email: string, name: string) => {
    if (name && name !== 'Candidat Invité') {
      const parts = name.split(' ');
      if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return name.substring(0, 2).toUpperCase();
    }
    if (email) {
      const prefix = email.split('@')[0];
      const dotParts = prefix.split('.');
      if (dotParts.length >= 2) return `${dotParts[0][0]}${dotParts[1][0]}`.toUpperCase();
      return prefix.substring(0, 2).toUpperCase();
    }
    return 'CI';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMsg && (
        <div className={`p-3 border text-xs rounded-xl flex items-center justify-between animate-in fade-in shadow-xl ${
          isLight
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400'
        }`}>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#A8E635]" />
            <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>{toastMsg}</span>
          </div>
          <button
            onClick={() => setToastMsg(null)}
            className={`text-xs font-bold px-2 py-0.5 ${isLight ? 'text-slate-600 hover:text-slate-950' : 'text-white/60 hover:text-white'}`}
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Header matching Screenshot */}
      <div className="space-y-2">
        {onNavigateToVivier && (
          <button
            onClick={onNavigateToVivier}
            className={`text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
              isLight ? 'text-slate-500 hover:text-[#A8E635]' : 'text-[#98A2B3] hover:text-[#A8E635]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Vivier</span>
          </button>
        )}

        <div>
          <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Invitations vivier
          </h1>
          <p className={`text-xs sm:text-sm mt-1 font-medium max-w-2xl leading-relaxed ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
            Inviter un candidat à rejoindre le vivier Unitgrowth (lien magique – pas d'e-mail SMTP).
          </p>
        </div>
      </div>

      {/* Single Line / Side-by-Side Responsive Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Card 1: Inviter un candidat */}
        <div className={`p-5 sm:p-7 rounded-2xl border shadow-xl space-y-6 transition-all ${
          isLight ? 'bg-white border-slate-200/80 shadow-sm' : 'bg-[#0B0E17] border-white/10 shadow-xl'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
              isLight
                ? 'bg-[#A8E635]/15 border-[#A8E635]/35 text-[#A8E635]'
                : 'bg-[#A8E635]/15 border border-[#A8E635]/35 text-[#A8E635]'
            }`}>
              <UserPlus className="w-4 h-4" />
            </div>
            <h2 className={`text-base sm:text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Inviter un candidat
            </h2>
          </div>

          <form onSubmit={handleCreateInvitation} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* E-mail * */}
              <div className="space-y-1.5">
                <label className={`text-xs font-bold block ${isLight ? 'text-slate-700' : 'text-white'}`}>
                  E-mail *
                </label>
                <input
                  type="email"
                  required
                  placeholder="exemple@mail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-xl text-xs placeholder-[#98A2B3] focus:outline-none focus:border-[#A8E635] transition-colors ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white'
                      : 'bg-white/[0.03] border border-white/10 text-white focus:bg-transparent'
                  }`}
                />
              </div>

              {/* Nom (optionnel) */}
              <div className="space-y-1.5">
                <label className={`text-xs font-bold block ${isLight ? 'text-slate-700' : 'text-white'}`}>
                  Nom (optionnel)
                </label>
                <input
                  type="text"
                  placeholder="Nom du candidat"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className={`w-full px-4 py-2.5 border rounded-xl text-xs placeholder-[#98A2B3] focus:outline-none focus:border-[#A8E635] transition-colors ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white'
                      : 'bg-white/[0.03] border border-white/10 text-white focus:bg-transparent'
                  }`}
                />
              </div>

              {/* Métier suggéré */}
              <div className="space-y-1.5">
                <label className={`text-xs font-bold block ${isLight ? 'text-slate-700' : 'text-white'}`}>
                  Métier suggéré
                </label>
                <CustomDropdownSelect
                  theme={theme}
                  value={metierInput}
                  onChange={(val) => setMetierInput(val)}
                  options={[
                    'Au choix du candidat',
                    'Développement full stack',
                    'IA & automatisation',
                    'No-code',
                    'Marketing digital',
                    'Chef de projet',
                    'Design UI/UX',
                    'Data & Analytics',
                  ]}
                />
              </div>

              {/* Validité (jours) */}
              <div className="space-y-1.5">
                <label className={`text-xs font-bold block ${isLight ? 'text-slate-700' : 'text-white'}`}>
                  Validité (jours)
                </label>
                <CustomDropdownSelect
                  theme={theme}
                  value={validityInput}
                  onChange={(val) => setValidityInput(val)}
                  options={['7 jours', '14 jours', '30 jours', '60 jours', '90 jours']}
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className={`text-xs font-bold block ${isLight ? 'text-slate-700' : 'text-white'}`}>
                Message
              </label>
              <textarea
                rows={3}
                placeholder="Message personnalisé (optionnel)..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className={`w-full px-4 py-2.5 border rounded-xl text-xs placeholder-[#98A2B3] focus:outline-none focus:border-[#A8E635] transition-colors resize-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white'
                    : 'bg-white/[0.03] border border-white/10 text-white focus:bg-transparent'
                }`}
              />
            </div>

            {/* Submit CTA Button with Dashboard Green System */}
            <div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] font-black rounded-xl text-xs shadow-lg shadow-[#A8E635]/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95 animate-pulse"
              >
                <Send className="w-4 h-4 text-[#0B0D10]" />
                <span>Envoyer l'invitation</span>
              </button>
            </div>
          </form>
        </div>

        {/* Card 2: Historique */}
        <div className={`p-5 sm:p-7 rounded-2xl border shadow-xl space-y-5 transition-all ${
          isLight ? 'bg-white border-slate-200/80 shadow-sm' : 'bg-[#0B0E17] border-white/10 shadow-xl'
        }`}>
          <div className="flex items-center gap-2.5">
            <History className={`w-5 h-5 ${isLight ? 'text-slate-800' : 'text-white'}`} />
            <h2 className={`text-base sm:text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Historique
            </h2>
          </div>

          {/* Filter bar */}
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Search Input */}
              <div className="sm:col-span-6 relative">
                <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-[#98A2B3]'}`} />
                <input
                  type="text"
                  placeholder="Rechercher par e-mail ou nom..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-xl text-xs placeholder-[#98A2B3] focus:outline-none focus:border-[#A8E635] transition-colors ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white'
                      : 'bg-white/[0.03] border border-white/10 text-white focus:bg-transparent'
                  }`}
                />
              </div>

              {/* Filter: Statut */}
              <div className="sm:col-span-3">
                <CustomDropdownSelect
                  theme={theme}
                  value={statutFilter}
                  onChange={(val) => setStatutFilter(val)}
                  options={['Tous les statuts', 'Envoyée', 'Acceptée', 'Expirée', 'Annulée']}
                />
              </div>

              {/* Filter: Familles */}
              <div className="sm:col-span-3">
                <CustomDropdownSelect
                  theme={theme}
                  value={familleFilter}
                  onChange={(val) => setFamilleFilter(val)}
                  options={[
                    'Toutes les familles',
                    'Développement full stack',
                    'IA & automatisation',
                    'No-code',
                    'Marketing digital',
                    'Chef de projet',
                    'Design UI/UX',
                    'Data & Analytics',
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Invitation List Rows */}
          <div className={`divide-y pt-2 ${isLight ? 'divide-slate-100' : 'divide-white/5'}`}>
            {filteredInvitations.map((inv) => {
              const initials = getInitials(inv.email, inv.name);
              const isMenuOpen = openMenuId === inv.id;

              return (
                <div
                  key={inv.id}
                  className={`py-4 px-2 sm:px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl transition-colors group ${
                    isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Left side: Avatar + Email + Subtitles */}
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#A8E635]/15 border border-[#A8E635]/35 text-[#A8E635] font-black flex items-center justify-center text-xs shrink-0 shadow-inner">
                      {initials}
                    </div>
                    <div className="space-y-0.5">
                      <div className={`font-bold text-xs sm:text-sm group-hover:text-[#A8E635] transition-colors flex items-center gap-2 ${
                        isLight ? 'text-slate-800' : 'text-white'
                      }`}>
                        <span>{inv.email}</span>
                        {inv.name && inv.name !== 'Candidat Invité' && (
                          <span className={`text-xs font-normal ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>({inv.name})</span>
                        )}
                      </div>
                      <div className={`text-xs flex items-center gap-1.5 flex-wrap ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                        <span>{inv.metier}</span>
                        <span>•</span>
                        <span>par {inv.createdByName}</span>
                      </div>
                      <div className={`text-[11px] font-mono flex items-center gap-1.5 ${isLight ? 'text-slate-400' : 'text-[#98A2B3]'}`}>
                        <span>{inv.createdAt}</span>
                        <span>•</span>
                        <span>expire {inv.expiresAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side: Status Badge + 3 dots action menu */}
                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0 relative">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {inv.status}
                    </span>

                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(isMenuOpen ? null : inv.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isLight
                            ? 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
                            : 'text-[#98A2B3] hover:text-white hover:bg-white/10'
                        }`}
                        title="Options"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {isMenuOpen && (
                        <div className={`absolute right-0 top-full mt-1 z-50 w-48 rounded-xl shadow-2xl py-1.5 text-xs animate-in fade-in zoom-in-95 duration-100 backdrop-blur-md ${
                          isLight
                            ? 'bg-white border border-slate-200/80 shadow-lg'
                            : 'bg-[#13161C] border border-white/20'
                        }`}>
                          <button
                            onClick={() => handleCopyLink(inv)}
                            className={`w-full px-3.5 py-2 text-left hover:bg-[#A8E635] hover:text-[#0B0D10] font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                              isLight ? 'text-slate-800' : 'text-white'
                            }`}
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copier le lien magique</span>
                          </button>
                          <button
                            onClick={() => handleResend(inv)}
                            className={`w-full px-3.5 py-2 text-left hover:bg-white/10 font-medium flex items-center gap-2 transition-colors cursor-pointer ${
                              isLight ? 'text-slate-700 hover:bg-slate-50' : 'text-white'
                            }`}
                          >
                            <RotateCw className={`w-3.5 h-3.5 ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`} />
                            <span>Renvoyer l'invitation</span>
                          </button>
                          {inv.status !== 'Annulée' && (
                            <button
                              onClick={() => handleCancelInvitation(inv.id)}
                              className={`w-full px-3.5 py-2 text-left text-rose-400 hover:bg-rose-500/20 font-medium flex items-center gap-2 transition-colors cursor-pointer border-t mt-1 pt-1.5 ${
                                isLight ? 'border-slate-100' : 'border-white/5'
                              }`}
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Annuler l'invitation</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredInvitations.length === 0 && (
              <div className={`py-12 text-center text-xs italic border border-dashed rounded-xl ${
                isLight ? 'text-slate-400 border-slate-200 bg-slate-50' : 'text-[#98A2B3] border-white/10'
              }`}>
                Aucune invitation trouvée.
              </div>
            )}
          </div>

          {/* Counter */}
          <div className={`text-[11px] font-semibold pt-2 ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
            {filteredInvitations.length} résultat{filteredInvitations.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationsVivierView;
