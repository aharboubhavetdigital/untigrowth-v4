import React, { useState, useEffect } from 'react';
import { Search, X, User, Briefcase, FileText, ArrowRight, CornerDownLeft, Filter } from 'lucide-react';

interface SearchResultItem {
  id: string;
  type: 'navigation' | 'freelance' | 'contrat' | 'mission';
  title: string;
  subtitle: string;
  tabTarget?: string;
  badge?: string;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tabId: string) => void;
  isLight?: boolean;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  isLight = false,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard escape listener & shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Mock global searchable database
  const searchItems: SearchResultItem[] = [
    // Navigation
    { id: 'nav-vivier', type: 'navigation', title: 'Vivier Freelances', subtitle: 'Consulter la liste des talents qualifiés', tabTarget: 'vivier', badge: 'Section' },
    { id: 'nav-relances', type: 'navigation', title: 'Relances Dispo', subtitle: 'Demandes de disponibilité 7/14/30 jours', tabTarget: 'relances', badge: 'Section' },
    { id: 'nav-contrats', type: 'navigation', title: 'Gestion des Contrats', subtitle: 'Propositions, signatures et contrats actifs', tabTarget: 'contrats', badge: 'Section' },
    { id: 'nav-missions', type: 'navigation', title: 'Offres & Missions', subtitle: 'Consulter et attribuer les missions clients', tabTarget: 'offres', badge: 'Section' },
    { id: 'nav-factures', type: 'navigation', title: 'Facturation & Paiements', subtitle: 'Suivi des factures et appels de fonds', tabTarget: 'factures', badge: 'Section' },
    { id: 'nav-tests', type: 'navigation', title: 'Tests Technique IA', subtitle: 'Évaluations et automatisations', tabTarget: 'tests', badge: 'Section' },
    
    // Freelances
    { id: 'free-1', type: 'freelance', title: 'Mehdi Chraibi', subtitle: 'Développeur Full Stack React/Node · Score 74%', tabTarget: 'vivier', badge: 'Freelance' },
    { id: 'free-2', type: 'freelance', title: 'Rania Skalli', subtitle: 'Growth Marketer & Media Buyer · Score 92%', tabTarget: 'vivier', badge: 'Freelance' },
    { id: 'free-3', type: 'freelance', title: 'Sofia Alaoui', subtitle: 'Chef de projet Digital & Agile · Score 58%', tabTarget: 'vivier', badge: 'Freelance' },
    { id: 'free-4', type: 'freelance', title: 'Yassine El Amrani', subtitle: 'Expert No-Code Bubble & Automation · Score 88%', tabTarget: 'vivier', badge: 'Freelance' },

    // Missions & Contrats
    { id: 'ctr-1', type: 'contrat', title: 'Refonte plateforme e-commerce B2B', subtitle: 'Client PharmaSud · Contrat IAWeb · 120.000 DH', tabTarget: 'contrats', badge: 'Contrat' },
    { id: 'ctr-2', type: 'contrat', title: 'Application interne de gestion de stock (no-code)', subtitle: 'Client Logistics MA · Contrat Havet · 45.000 DH', tabTarget: 'contrats', badge: 'Contrat' },
    { id: 'ctr-3', type: 'mission', title: 'Audit Sécurité & Penetration Testing', subtitle: 'Client FinTech Atlas · Budget 65.000 DH', tabTarget: 'offres', badge: 'Mission' },
  ];

  const filteredResults = query.trim() === ''
    ? searchItems.slice(0, 6)
    : searchItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.badge?.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (item: SearchResultItem) => {
    if (item.tabTarget) {
      onNavigateTab(item.tabTarget);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden transition-all duration-200 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-slate-900/20'
            : 'bg-[#0B0E17] border-white/15 text-white shadow-black/80'
        }`}
      >
        {/* Top Input Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3">
          <Search className={`w-5 h-5 shrink-0 ${isLight ? 'text-slate-400' : 'text-[#A8E635]'}`} />
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une section, un candidat, une mission, un contrat..."
            className="w-full bg-transparent text-sm sm:text-base outline-none font-medium placeholder-[#98A2B3]"
            autoFocus
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#98A2B3] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition cursor-pointer shrink-0 ${
              isLight
                ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                : 'bg-white/5 border-white/10 text-[#98A2B3] hover:text-white'
            }`}
          >
            ESC
          </button>
        </div>

        {/* Results List Area */}
        <div className="p-3 sm:p-4 max-h-[60vh] overflow-y-auto space-y-1 divide-y divide-white/5">
          <div className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider px-3 pb-2 flex items-center justify-between">
            <span>{query ? 'Résultats de la recherche' : 'Suggestions rapides'}</span>
            <span>{filteredResults.length} résultat(s)</span>
          </div>

          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#98A2B3] space-y-2">
              <p className="font-bold text-white">Aucun résultat trouvé pour "{query}"</p>
              <p className="text-xs">Essayez avec un nom, une compétence ou un titre de contrat.</p>
            </div>
          ) : (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`group p-3 rounded-2xl flex items-center justify-between gap-3 transition-all cursor-pointer ${
                  isLight
                    ? 'hover:bg-slate-100'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 ${
                      item.type === 'navigation'
                        ? 'bg-[#A8E635]/10 text-[#A8E635] border border-[#A8E635]/20'
                        : item.type === 'freelance'
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                        : 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                    }`}
                  >
                    {item.type === 'navigation' && <Filter className="w-4 h-4" />}
                    {item.type === 'freelance' && <User className="w-4 h-4" />}
                    {item.type === 'contrat' && <FileText className="w-4 h-4" />}
                    {item.type === 'mission' && <Briefcase className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs sm:text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/10 text-[#98A2B3] border border-white/5">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#98A2B3] mt-0.5 line-clamp-1">{item.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-[#A8E635] shrink-0">
                  <span>Accéder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Bottom Hints Bar */}
        <div className={`p-3 px-5 border-t border-white/10 text-[11px] text-[#98A2B3] flex items-center justify-between ${
          isLight ? 'bg-slate-50' : 'bg-[#0E121D]'
        }`}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono">
              <CornerDownLeft className="w-3 h-3 text-[#A8E635]" /> Sélectionner
            </span>
            <span>·</span>
            <span>Recherche instantanée dans la plateforme</span>
          </div>
          <span className="font-bold text-[#A8E635]">UnitGrowth OS</span>
        </div>
      </div>
    </div>
  );
};
