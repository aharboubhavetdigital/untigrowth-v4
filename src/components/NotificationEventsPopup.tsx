import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  X,
  Check,
  CheckCheck,
  Clock,
  ExternalLink,
  ShieldAlert,
  FileText,
  UserCheck,
  Briefcase,
  Sparkles,
  CreditCard,
  Sliders,
  Trash2,
  Filter
} from 'lucide-react';

export type NotificationRole = 'admin' | 'manager' | 'freelance';

export interface NotificationEventItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'contract' | 'security' | 'invoice' | 'candidate' | 'test' | 'matching' | 'dispo' | 'mission' | 'offer';
  actionUrl?: string;
  badge?: string;
}

const INITIAL_EVENTS: Record<NotificationRole, NotificationEventItem[]> = {
  admin: [
    {
      id: 'adm-1',
      title: 'Nouveau contrat signé',
      description: 'Thomas Bernard a signé électroniquement le contrat de mission #CTR-2026-88.',
      timestamp: 'Il y a 12 min',
      read: false,
      type: 'contract',
      badge: 'Contrat',
    },
    {
      id: 'adm-2',
      title: 'Alerte de sécurité système',
      description: 'Nouvelle connexion SuperAdmin détectée depuis un nouvel appareil (Paris, IP: 185.24.xx.xx).',
      timestamp: 'Il y a 45 min',
      read: false,
      type: 'security',
      badge: 'Sécurité',
    },
    {
      id: 'adm-3',
      title: 'Facture en attente de validation',
      description: 'Facture #FAC-2026-0491 (Montant : 4 200,00 €) déposée par Sarah Jenkins.',
      timestamp: 'Il y a 2 heures',
      read: false,
      type: 'invoice',
      badge: 'Facture',
    },
    {
      id: 'adm-4',
      title: 'Nouveau candidat inscrit dans le vivier',
      description: 'Dossier complet soumis par Mounir K. (Architecte Cloud GCP / Kubernetes).',
      timestamp: 'Il y a 3 heures',
      read: true,
      type: 'candidate',
      badge: 'Vivier',
    },
    {
      id: 'adm-5',
      title: 'Test IA complété avec fort score (94/100)',
      description: 'Alexandre Moreau a terminé l’évaluation technique "Fullstack Node.js / React".',
      timestamp: 'Il y a 5 heures',
      read: true,
      type: 'test',
      badge: 'Test IA',
    },
  ],
  manager: [
    {
      id: 'mgr-1',
      title: 'Nouveau Matching High-Score (92%)',
      description: 'Marc Dupont correspond parfaitement à votre besoin "Lead Frontend React / Vite".',
      timestamp: 'Il y a 8 min',
      read: false,
      type: 'matching',
      badge: 'Matching IA',
    },
    {
      id: 'mgr-2',
      title: 'Changement de disponibilité vivier',
      description: 'Claire V. (UX/UI Designer) a confirmé sa disponibilité immédiate.',
      timestamp: 'Il y a 1 heure',
      read: false,
      type: 'dispo',
      badge: 'Disponibilité',
    },
    {
      id: 'mgr-3',
      title: 'Livrable déposé - Sprint 3',
      description: 'Mission Mobile React Native : le freelance a déposé le livrable pour validation.',
      timestamp: 'Il y a 3 heures',
      read: false,
      type: 'mission',
      badge: 'Mission',
    },
    {
      id: 'mgr-4',
      title: 'Invitation vivier acceptée',
      description: 'Lucas M. (DevOps Senior) a accepté d’intégrer votre vivier prioritaire.',
      timestamp: 'Il y a 6 heures',
      read: true,
      type: 'candidate',
      badge: 'Invitation',
    },
  ],
  freelance: [
    {
      id: 'fre-1',
      title: 'Nouvelle offre recommandée sur-mesure',
      description: 'Mission Senior Fullstack Node/React (TJM: 720 €/j - Full Remote) vous correspond à 95%.',
      timestamp: 'Il y a 5 min',
      read: false,
      type: 'offer',
      badge: 'Opportunité',
    },
    {
      id: 'fre-2',
      title: 'Confirmation de disponibilité requise',
      description: 'Confirmez votre statut pour rester en tête des recherches des managers ce mois-ci.',
      timestamp: 'Il y a 2 heures',
      read: false,
      type: 'dispo',
      badge: 'Relance',
    },
    {
      id: 'fre-3',
      title: 'Contrat prêt pour signature électronique',
      description: 'Le contrat pour la mission "Refonte Dashboard UnitGrowth" est disponible.',
      timestamp: 'Il y a 4 heures',
      read: false,
      type: 'contract',
      badge: 'Contrat',
    },
    {
      id: 'fre-4',
      title: 'Paiement effectué avec succès',
      description: 'Le virement de 5 400,00 € pour la facture #FAC-8812 a été exécuté sur votre compte.',
      timestamp: 'Hier à 16:30',
      read: true,
      type: 'invoice',
      badge: 'Paiement',
    },
  ],
};

interface NotificationEventsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  role: NotificationRole;
  onOpenSettings?: () => void;
  theme?: 'dark' | 'light';
}

export const NotificationEventsPopup: React.FC<NotificationEventsPopupProps> = ({
  isOpen,
  onClose,
  role,
  onOpenSettings,
  theme = 'dark',
}) => {
  const [events, setEvents] = useState<Record<NotificationRole, NotificationEventItem[]>>(INITIAL_EVENTS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const currentRoleEvents = events[role] || [];
  const unreadCount = currentRoleEvents.filter((item) => !item.read).length;

  const displayedEvents = currentRoleEvents.filter((item) => {
    if (filter === 'unread') return !item.read;
    return true;
  });

  const handleMarkAllAsRead = () => {
    setEvents((prev) => ({
      ...prev,
      [role]: prev[role].map((ev) => ({ ...ev, read: true })),
    }));
  };

  const handleToggleRead = (id: string) => {
    setEvents((prev) => ({
      ...prev,
      [role]: prev[role].map((ev) => (ev.id === id ? { ...ev, read: !ev.read } : ev)),
    }));
  };

  const handleDeleteEvent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEvents((prev) => ({
      ...prev,
      [role]: prev[role].filter((ev) => ev.id !== id),
    }));
  };

  const isLight = theme === 'light';

  const getEventIcon = (type: NotificationEventItem['type']) => {
    switch (type) {
      case 'contract':
        return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'security':
        return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'invoice':
        return <CreditCard className="w-4 h-4 text-blue-400" />;
      case 'candidate':
        return <UserCheck className="w-4 h-4 text-purple-400" />;
      case 'test':
        return <Sparkles className="w-4 h-4 text-amber-300" />;
      case 'matching':
        return <Sparkles className="w-4 h-4 text-[#A8E635]" />;
      case 'dispo':
        return <Clock className="w-4 h-4 text-teal-400" />;
      case 'mission':
      case 'offer':
        return <Briefcase className="w-4 h-4 text-[#A8E635]" />;
      default:
        return <Bell className="w-4 h-4 text-slate-300" />;
    }
  };

  const roleTitles: Record<NotificationRole, string> = {
    admin: 'Espace Administrateur',
    manager: 'Espace Responsable Vivier',
    freelance: 'Espace Freelance',
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-end sm:pt-16 sm:pr-6 p-3 overflow-hidden">
        {/* Backdrop for closing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Floating Popup Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={`relative w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden z-10 flex flex-col ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0E121A] border-white/10 text-white'
          }`}
          style={{ maxHeight: 'calc(100vh - 5rem)' }}
        >
          {/* Header */}
          <div className={`p-4 border-b flex items-center justify-between ${
            isLight ? 'border-slate-100 bg-slate-50' : 'border-white/10 bg-[#121722]'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#A8E635]/20 border border-[#A8E635]/30 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-[#A8E635]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold tracking-tight">
                    Événements de notification
                  </h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#A8E635] text-slate-950">
                      {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                  {roleTitles[role]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onClose}
                className={`p-1.5 rounded-xl transition cursor-pointer ${
                  isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-[#98A2B3] hover:text-white'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-header Controls / Filters */}
          <div className={`px-4 py-2.5 border-b flex items-center justify-between gap-2 text-xs ${
            isLight ? 'border-slate-100 bg-slate-50/50' : 'border-white/5 bg-[#10141E]'
          }`}>
            {/* Filter Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#A8E635] text-slate-950'
                    : isLight
                    ? 'text-slate-600 hover:bg-slate-200'
                    : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
                }`}
              >
                Toutes ({currentRoleEvents.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition cursor-pointer ${
                  filter === 'unread'
                    ? 'bg-[#A8E635] text-slate-950'
                    : isLight
                    ? 'text-slate-600 hover:bg-slate-200'
                    : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
                }`}
              >
                Non lues ({unreadCount})
              </button>
            </div>

            {/* Mark all as read */}
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className={`text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
                  isLight ? 'text-slate-600 hover:text-slate-900' : 'text-[#A8E635] hover:text-white'
                }`}
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Tout marquer lu</span>
              </button>
            )}
          </div>

          {/* Event Items List */}
          <div className="p-3 space-y-2 overflow-y-auto flex-1 custom-scrollbar">
            {displayedEvents.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <div className={`w-10 h-10 rounded-2xl border mx-auto flex items-center justify-center ${
                  isLight ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-white/5 border-white/10 text-slate-400'
                }`}>
                  <Check className="w-5 h-5 text-[#A8E635]" />
                </div>
                <p className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>Aucun événement à afficher</p>
                <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {filter === 'unread'
                    ? 'Vous avez lu toutes vos notifications !'
                    : 'Aucun événement récent enregistré.'}
                </p>
              </div>
            ) : (
              displayedEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => handleToggleRead(ev.id)}
                  className={`p-3 rounded-2xl border transition relative cursor-pointer group ${
                    !ev.read
                      ? isLight
                        ? 'bg-amber-500/5 border-amber-500/30'
                        : 'bg-[#151B28] border-white/15'
                      : isLight
                      ? 'bg-slate-50 border-slate-200 opacity-80'
                      : 'bg-[#0E121A] border-white/5 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Event Icon */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      !ev.read
                        ? isLight ? 'bg-slate-100' : 'bg-white/10'
                        : isLight ? 'bg-slate-50' : 'bg-white/5'
                    }`}>
                      {getEventIcon(ev.type)}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <h4 className={`text-xs font-bold truncate ${
                            !ev.read
                              ? isLight ? 'text-slate-900' : 'text-white'
                              : isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}>
                            {ev.title}
                          </h4>
                          {!ev.read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A8E635] shrink-0" />
                          )}
                        </div>

                        <span className={`text-[10px] shrink-0 ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                          {ev.timestamp}
                        </span>
                      </div>

                      <p className={`text-[11px] mt-1 line-clamp-2 ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                        {ev.description}
                      </p>

                      <div className="flex items-center justify-between mt-2 pt-1">
                        {ev.badge && (
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider border ${
                            isLight
                              ? 'bg-slate-100 border-slate-200 text-slate-600'
                              : 'bg-white/5 border-white/10 text-slate-300'
                          }`}>
                            {ev.badge}
                          </span>
                        )}

                        <div className="flex items-center gap-2 ml-auto">
                          <button
                            onClick={(e) => handleDeleteEvent(ev.id, e)}
                            className={`p-1 rounded transition ${
                              isLight ? 'hover:bg-slate-200 text-slate-400 hover:text-red-600' : 'hover:bg-white/10 text-slate-500 hover:text-red-400'
                            }`}
                            title="Supprimer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Footer Bar */}
          <div className={`p-3 border-t flex items-center justify-between gap-2 ${
            isLight ? 'border-slate-100 bg-slate-50' : 'border-white/10 bg-[#121722]'
          }`}>
            <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
              {unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
