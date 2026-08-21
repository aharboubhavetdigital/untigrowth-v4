import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  X,
  Check,
  Shield,
  Briefcase,
  UserCheck,
  Mail,
  Smartphone,
  MessageSquare,
  Clock,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Send
} from 'lucide-react';

export type NotificationRole = 'admin' | 'manager' | 'freelance';

export interface NotificationCategorySetting {
  id: string;
  label: string;
  description: string;
  email: boolean;
  inApp: boolean;
  push: boolean;
  sms: boolean;
}

export interface RoleNotificationConfig {
  role: NotificationRole;
  roleTitle: string;
  roleBadge: string;
  roleDescription: string;
  roleColor: string;
  masterEmail: boolean;
  masterInApp: boolean;
  masterPush: boolean;
  masterSms: boolean;
  frequency: 'realtime' | 'daily' | 'weekly';
  categories: NotificationCategorySetting[];
}

const DEFAULT_ADMIN_CONFIG: RoleNotificationConfig = {
  role: 'admin',
  roleTitle: 'Super Administrateur',
  roleBadge: 'Admin',
  roleDescription: 'Supervision globale de la plateforme, sécurité, validation des contrats et paiements.',
  roleColor: 'amber',
  masterEmail: true,
  masterInApp: true,
  masterPush: true,
  masterSms: false,
  frequency: 'realtime',
  categories: [
    {
      id: 'admin_candidats',
      label: 'Nouveaux candidats & vivier',
      description: 'Inscriptions de nouveaux freelances et dépôts de dossiers à valider.',
      email: true,
      inApp: true,
      push: true,
      sms: false,
    },
    {
      id: 'admin_tests',
      label: 'Résultats des tests IA',
      description: 'Alertes lors de la complétion des évaluations IA par les candidats.',
      email: true,
      inApp: true,
      push: false,
      sms: false,
    },
    {
      id: 'admin_relances',
      label: 'Campagnes de relance dispo',
      description: 'Rapports automatiques des relances de disponibilité envoyées.',
      email: false,
      inApp: true,
      push: false,
      sms: false,
    },
    {
      id: 'admin_contrats',
      label: 'Création & signatures de contrats',
      description: 'Demandes d’émission et notifications de signature électronique.',
      email: true,
      inApp: true,
      push: true,
      sms: true,
    },
    {
      id: 'admin_factures',
      label: 'Validation des factures & virements',
      description: 'Validation finale des factures d’honoraires et déblocage des fonds.',
      email: true,
      inApp: true,
      push: true,
      sms: false,
    },
    {
      id: 'admin_systeme',
      label: 'Alertes de sécurité & audit logs',
      description: 'Tentatives d’accès suspectes et anomalies système critiques.',
      email: true,
      inApp: true,
      push: true,
      sms: true,
    },
  ],
};

const DEFAULT_MANAGER_CONFIG: RoleNotificationConfig = {
  role: 'manager',
  roleTitle: 'Responsable Vivier / Manager',
  roleBadge: 'Manager',
  roleDescription: 'Gestion opérationnelle des missions, sélection des talents et suivi d’équipe.',
  roleColor: 'emerald',
  masterEmail: true,
  masterInApp: true,
  masterPush: true,
  masterSms: false,
  frequency: 'realtime',
  categories: [
    {
      id: 'mgr_matching',
      label: 'Matching & candidats haut score (85%+)',
      description: 'Notification instantanée dès qu’un profil qualifié correspond à vos besoins.',
      email: true,
      inApp: true,
      push: true,
      sms: false,
    },
    {
      id: 'mgr_dispo',
      label: 'Disponibilité de votre vivier',
      description: 'Changements de statut ou de date de disponibilité des membres de votre équipe.',
      email: true,
      inApp: true,
      push: false,
      sms: false,
    },
    {
      id: 'mgr_missions',
      label: 'Avancement & jalons de mission',
      description: 'Rapports de progression, livrables déposés et alertes de retards.',
      email: true,
      inApp: true,
      push: true,
      sms: false,
    },
    {
      id: 'mgr_offres',
      label: 'Validation & publication d’offres',
      description: 'Statut des offres de mission soumises et candidatures reçues.',
      email: true,
      inApp: true,
      push: false,
      sms: false,
    },
    {
      id: 'mgr_invitations',
      label: 'Réponses aux invitations vivier',
      description: 'Alertes quand un freelance accepte votre invitation à rejoindre le vivier.',
      email: true,
      inApp: true,
      push: true,
      sms: false,
    },
  ],
};

const DEFAULT_FREELANCE_CONFIG: RoleNotificationConfig = {
  role: 'freelance',
  roleTitle: 'Talent Freelance',
  roleBadge: 'Freelance',
  roleDescription: 'Opportunités de missions, rappels de disponibilité, contrats et facturation.',
  roleColor: 'lime',
  masterEmail: true,
  masterInApp: true,
  masterPush: true,
  masterSms: true,
  frequency: 'realtime',
  categories: [
    {
      id: 'free_offres',
      label: 'Nouvelles opportunités de mission',
      description: 'Propositions ciblées sur mesure selon vos compétences et votre TJM.',
      email: true,
      inApp: true,
      push: true,
      sms: true,
    },
    {
      id: 'free_dispo',
      label: 'Rappels de confirmation de disponibilité',
      description: 'Rappels amicals pour maintenir votre profil au sommet des recherches.',
      email: true,
      inApp: true,
      push: true,
      sms: false,
    },
    {
      id: 'free_contrats',
      label: 'Contrats & avenants à signer',
      description: 'Notifications prioritaires pour signer vos contrats en ligne sans délai.',
      email: true,
      inApp: true,
      push: true,
      sms: true,
    },
    {
      id: 'free_factures',
      label: 'Validation des factures & paiements',
      description: 'Confirmations d’approbation de CRA/Factures et ordre de virement bancaire.',
      email: true,
      inApp: true,
      push: true,
      sms: false,
    },
    {
      id: 'free_tests',
      label: 'Invitations aux tests IA & certifications',
      description: 'Opportunités de booster votre score IA et débloquer de nouveaux badges.',
      email: false,
      inApp: true,
      push: false,
      sms: false,
    },
  ],
};

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: NotificationRole;
  theme?: 'dark' | 'light';
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'admin',
  theme = 'dark'
}) => {
  const [activeRole, setActiveRole] = useState<NotificationRole>(initialRole);
  const [configs, setConfigs] = useState<Record<NotificationRole, RoleNotificationConfig>>({
    admin: DEFAULT_ADMIN_CONFIG,
    manager: DEFAULT_MANAGER_CONFIG,
    freelance: DEFAULT_FREELANCE_CONFIG,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load persisted configs on mount
  useEffect(() => {
    try {
      const savedAdmin = localStorage.getItem('unitgrowth_notif_admin');
      const savedManager = localStorage.getItem('unitgrowth_notif_manager');
      const savedFreelance = localStorage.getItem('unitgrowth_notif_freelance');

      setConfigs({
        admin: savedAdmin ? JSON.parse(savedAdmin) : DEFAULT_ADMIN_CONFIG,
        manager: savedManager ? JSON.parse(savedManager) : DEFAULT_MANAGER_CONFIG,
        freelance: savedFreelance ? JSON.parse(savedFreelance) : DEFAULT_FREELANCE_CONFIG,
      });
    } catch {
      // Fallback to default configs
    }
  }, []);

  useEffect(() => {
    if (initialRole) {
      setActiveRole(initialRole);
    }
  }, [initialRole]);

  if (!isOpen) return null;

  const currentConfig = configs[activeRole];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpdateCurrentConfig = (updated: RoleNotificationConfig) => {
    const newConfigs = {
      ...configs,
      [activeRole]: updated,
    };
    setConfigs(newConfigs);
    try {
      localStorage.setItem(`unitgrowth_notif_${activeRole}`, JSON.stringify(updated));
    } catch {
      // localStorage error fallback
    }
  };

  const handleToggleMasterChannel = (channel: 'masterEmail' | 'masterInApp' | 'masterPush' | 'masterSms') => {
    const updated = {
      ...currentConfig,
      [channel]: !currentConfig[channel],
    };
    handleUpdateCurrentConfig(updated);
  };

  const handleToggleCategoryChannel = (categoryId: string, channel: 'email' | 'inApp' | 'push' | 'sms') => {
    const updatedCategories = currentConfig.categories.map((cat) => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          [channel]: !cat[channel],
        };
      }
      return cat;
    });

    const updated = {
      ...currentConfig,
      categories: updatedCategories,
    };
    handleUpdateCurrentConfig(updated);
  };

  const handleChangeFrequency = (freq: 'realtime' | 'daily' | 'weekly') => {
    const updated = {
      ...currentConfig,
      frequency: freq,
    };
    handleUpdateCurrentConfig(updated);
  };

  const handleResetRoleConfig = () => {
    let defaultConfig = DEFAULT_ADMIN_CONFIG;
    if (activeRole === 'manager') defaultConfig = DEFAULT_MANAGER_CONFIG;
    if (activeRole === 'freelance') defaultConfig = DEFAULT_FREELANCE_CONFIG;

    handleUpdateCurrentConfig(defaultConfig);
    showToast(`Paramètres de notification réinitialisés pour le rôle : ${currentConfig.roleTitle}`);
  };

  const handleSaveAll = () => {
    try {
      localStorage.setItem('unitgrowth_notif_admin', JSON.stringify(configs.admin));
      localStorage.setItem('unitgrowth_notif_manager', JSON.stringify(configs.manager));
      localStorage.setItem('unitgrowth_notif_freelance', JSON.stringify(configs.freelance));
    } catch {
      // silent catch
    }
    setSaveSuccess(true);
    showToast('Toutes les préférences de notifications par rôle ont été sauvegardées avec succès.');
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleTestNotification = () => {
    const roleLabels: Record<NotificationRole, string> = {
      admin: 'Super Administrateur: Alerte contrat & sécurité déclenchée !',
      manager: 'Manager: Nouveau talent qualifié à 92% prêt pour votre mission !',
      freelance: 'Freelance: Nouvelle mission React / Node disponible (750€/j) !',
    };

    showToast(`🔔 Test notification [${currentConfig.roleTitle}] : "${roleLabels[activeRole]}"`);
  };

  const isLight = theme === 'light';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden z-10 my-auto ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0E121A] border-white/10 text-white'
          }`}
        >
          {/* Top Header Bar */}
          <div className={`p-6 border-b flex items-center justify-between ${
            isLight ? 'border-slate-100 bg-slate-50/80' : 'border-white/10 bg-[#121722]'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#A8E635]/20 text-[#A8E635] border border-[#A8E635]/30 flex items-center justify-center shrink-0 shadow-sm">
                <Bell className="w-5 h-5 text-[#A8E635]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold tracking-tight">
                    Centre de notifications par rôle
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#A8E635]/15 text-[#A8E635] border border-[#A8E635]/30">
                    Paramètres indépendants
                  </span>
                </div>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                  Configurez séparément les canaux d’alerte et la fréquence pour l’Admin, le Manager et le Freelance.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition cursor-pointer ${
                isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-[#98A2B3] hover:text-white'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Toast Banner */}
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-[#A8E635] text-[#0B0D10] px-6 py-2.5 font-bold text-xs flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 fill-[#0B0D10]" />
                <span>{toastMessage}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="hover:opacity-75 p-0.5">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Body Content */}
          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {/* ROLE SELECTOR TABS */}
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2.5 ${
                isLight ? 'text-slate-500' : 'text-[#98A2B3]'
              }`}>
                Sélectionnez le rôle à configurer :
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Admin Tab */}
                <button
                  onClick={() => setActiveRole('admin')}
                  className={`p-4 rounded-2xl border text-left transition flex items-start justify-between cursor-pointer ${
                    activeRole === 'admin'
                      ? 'border-amber-400/80 bg-amber-500/10 shadow-lg ring-1 ring-amber-400/50'
                      : isLight
                      ? 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      : 'border-white/10 bg-[#131824] hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      activeRole === 'admin'
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold flex items-center gap-1.5">
                        <span>Admin</span>
                        {activeRole === 'admin' && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                        Super Administrateur
                      </p>
                    </div>
                  </div>
                </button>

                {/* Manager Tab */}
                <button
                  onClick={() => setActiveRole('manager')}
                  className={`p-4 rounded-2xl border text-left transition flex items-start justify-between cursor-pointer ${
                    activeRole === 'manager'
                      ? 'border-emerald-400/80 bg-emerald-500/10 shadow-lg ring-1 ring-emerald-400/50'
                      : isLight
                      ? 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      : 'border-white/10 bg-[#131824] hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      activeRole === 'manager'
                        ? 'bg-emerald-400 text-slate-950 font-bold'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold flex items-center gap-1.5">
                        <span>Manager</span>
                        {activeRole === 'manager' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                        Responsable Vivier
                      </p>
                    </div>
                  </div>
                </button>

                {/* Freelance Tab */}
                <button
                  onClick={() => setActiveRole('freelance')}
                  className={`p-4 rounded-2xl border text-left transition flex items-start justify-between cursor-pointer ${
                    activeRole === 'freelance'
                      ? 'border-[#A8E635] bg-[#A8E635]/10 shadow-lg ring-1 ring-[#A8E635]/50'
                      : isLight
                      ? 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      : 'border-white/10 bg-[#131824] hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      activeRole === 'freelance'
                        ? 'bg-[#A8E635] text-slate-950 font-bold'
                        : 'bg-[#A8E635]/20 text-[#A8E635]'
                    }`}>
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold flex items-center gap-1.5">
                        <span>Freelance</span>
                        {activeRole === 'freelance' && <CheckCircle2 className="w-4 h-4 text-[#A8E635]" />}
                      </div>
                      <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                        Talent Indépendant
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* ACTIVE ROLE HEADER CARD */}
            <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#131824] border-white/10'
            }`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                    activeRole === 'admin'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : activeRole === 'manager'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-[#A8E635]/20 text-[#A8E635] border border-[#A8E635]/30'
                  }`}>
                    Configuration active : {currentConfig.roleTitle}
                  </span>
                </div>
                <p className={`text-xs mt-1.5 ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                  {currentConfig.roleDescription}
                </p>
              </div>

              <button
                onClick={handleTestNotification}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/15 transition flex items-center gap-2 shrink-0 cursor-pointer text-white"
              >
                <Send className="w-3.5 h-3.5 text-[#A8E635]" />
                <span>Tester une notification</span>
              </button>
            </div>

            {/* GLOBAL MASTER CHANNELS FOR ACTIVE ROLE */}
            <div className={`p-5 rounded-2xl border space-y-4 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#131824] border-white/10'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#A8E635]" />
                    <span>Canaux de réception globaux [{currentConfig.roleBadge}]</span>
                  </h3>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                    Activez ou désactivez les canaux généraux pour ce rôle spécifique.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Email Master */}
                <div
                  onClick={() => handleToggleMasterChannel('masterEmail')}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    currentConfig.masterEmail
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-400'
                      : 'bg-[#0E121A] border-white/10 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs font-bold">Email</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition ${
                    currentConfig.masterEmail ? 'bg-emerald-400' : 'bg-slate-600'
                  }`}>
                    <div className={`w-3 h-3 rounded-full bg-slate-950 transition transform ${
                      currentConfig.masterEmail ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </div>
                </div>

                {/* InApp Master */}
                <div
                  onClick={() => handleToggleMasterChannel('masterInApp')}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    currentConfig.masterInApp
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-400'
                      : 'bg-[#0E121A] border-white/10 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    <span className="text-xs font-bold">In-App</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition ${
                    currentConfig.masterInApp ? 'bg-emerald-400' : 'bg-slate-600'
                  }`}>
                    <div className={`w-3 h-3 rounded-full bg-slate-950 transition transform ${
                      currentConfig.masterInApp ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </div>
                </div>

                {/* Push Master */}
                <div
                  onClick={() => handleToggleMasterChannel('masterPush')}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    currentConfig.masterPush
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-400'
                      : 'bg-[#0E121A] border-white/10 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    <span className="text-xs font-bold">Push Mobile</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition ${
                    currentConfig.masterPush ? 'bg-emerald-400' : 'bg-slate-600'
                  }`}>
                    <div className={`w-3 h-3 rounded-full bg-slate-950 transition transform ${
                      currentConfig.masterPush ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </div>
                </div>

                {/* SMS Master */}
                <div
                  onClick={() => handleToggleMasterChannel('masterSms')}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    currentConfig.masterSms
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-400'
                      : 'bg-[#0E121A] border-white/10 text-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs font-bold">SMS</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full p-0.5 transition ${
                    currentConfig.masterSms ? 'bg-emerald-400' : 'bg-slate-600'
                  }`}>
                    <div className={`w-3 h-3 rounded-full bg-slate-950 transition transform ${
                      currentConfig.masterSms ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </div>
                </div>
              </div>
            </div>

            {/* FREQUENCY PREFERENCE */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#131824] border-white/10'
            }`}>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#A8E635]" />
                <div>
                  <h4 className="text-xs font-bold">Fréquence des notifications [{currentConfig.roleBadge}]</h4>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                    Choisissez quand recevoir les récapitulatifs.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleChangeFrequency('realtime')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    currentConfig.frequency === 'realtime'
                      ? 'bg-[#A8E635] text-slate-950 border-[#A8E635]'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      : 'bg-[#0E121A] border-white/10 text-[#98A2B3] hover:text-white'
                  }`}
                >
                  Temps réel
                </button>
                <button
                  onClick={() => handleChangeFrequency('daily')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    currentConfig.frequency === 'daily'
                      ? 'bg-[#A8E635] text-slate-950 border-[#A8E635]'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      : 'bg-[#0E121A] border-white/10 text-[#98A2B3] hover:text-white'
                  }`}
                >
                  Résumé quotidien (09h)
                </button>
                <button
                  onClick={() => handleChangeFrequency('weekly')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    currentConfig.frequency === 'weekly'
                      ? 'bg-[#A8E635] text-slate-950 border-[#A8E635]'
                      : isLight
                      ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      : 'bg-[#0E121A] border-white/10 text-[#98A2B3] hover:text-white'
                  }`}
                >
                  Hebdomadaire (Lundi)
                </button>
              </div>
            </div>

            {/* CATEGORIES DETAILED TABLE / LIST */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#98A2B3]">
                  Règles & événements de notification ({currentConfig.categories.length})
                </h3>
                <span className="text-[11px] text-[#A8E635] font-semibold">
                  Contrôle fin par événement
                </span>
              </div>

              <div className="space-y-2.5">
                {currentConfig.categories.map((cat) => (
                  <div
                    key={cat.id}
                    className={`p-4 rounded-2xl border transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isLight
                        ? 'bg-white border-slate-200 hover:border-slate-300'
                        : 'bg-[#131824] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{cat.label}</span>
                      </h4>
                      <p className={`text-[11px] mt-1 ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                        {cat.description}
                      </p>
                    </div>

                    {/* Per-channel Toggles */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Email Toggle */}
                      <button
                        onClick={() => handleToggleCategoryChannel(cat.id, 'email')}
                        disabled={!currentConfig.masterEmail}
                        title={currentConfig.masterEmail ? 'Activer/désactiver Email' : 'Email désactivé au niveau global'}
                        className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                          !currentConfig.masterEmail
                            ? 'opacity-40 cursor-not-allowed bg-slate-800 border-transparent text-slate-500'
                            : cat.email
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : isLight
                            ? 'bg-slate-100 text-slate-400 border-slate-200'
                            : 'bg-[#0E121A] text-slate-500 border-white/10'
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email</span>
                        {cat.email && currentConfig.masterEmail && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>

                      {/* InApp Toggle */}
                      <button
                        onClick={() => handleToggleCategoryChannel(cat.id, 'inApp')}
                        disabled={!currentConfig.masterInApp}
                        title={currentConfig.masterInApp ? 'Activer/désactiver In-App' : 'In-App désactivé au niveau global'}
                        className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                          !currentConfig.masterInApp
                            ? 'opacity-40 cursor-not-allowed bg-slate-800 border-transparent text-slate-500'
                            : cat.inApp
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : isLight
                            ? 'bg-slate-100 text-slate-400 border-slate-200'
                            : 'bg-[#0E121A] text-slate-500 border-white/10'
                        }`}
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>In-App</span>
                        {cat.inApp && currentConfig.masterInApp && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>

                      {/* Push Toggle */}
                      <button
                        onClick={() => handleToggleCategoryChannel(cat.id, 'push')}
                        disabled={!currentConfig.masterPush}
                        title={currentConfig.masterPush ? 'Activer/désactiver Push Mobile' : 'Push désactivé au niveau global'}
                        className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                          !currentConfig.masterPush
                            ? 'opacity-40 cursor-not-allowed bg-slate-800 border-transparent text-slate-500'
                            : cat.push
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : isLight
                            ? 'bg-slate-100 text-slate-400 border-slate-200'
                            : 'bg-[#0E121A] text-slate-500 border-white/10'
                        }`}
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Push</span>
                        {cat.push && currentConfig.masterPush && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>

                      {/* SMS Toggle */}
                      <button
                        onClick={() => handleToggleCategoryChannel(cat.id, 'sms')}
                        disabled={!currentConfig.masterSms}
                        title={currentConfig.masterSms ? 'Activer/désactiver SMS' : 'SMS désactivé au niveau global'}
                        className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                          !currentConfig.masterSms
                            ? 'opacity-40 cursor-not-allowed bg-slate-800 border-transparent text-slate-500'
                            : cat.sms
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : isLight
                            ? 'bg-slate-100 text-slate-400 border-slate-200'
                            : 'bg-[#0E121A] text-slate-500 border-white/10'
                        }`}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>SMS</span>
                        {cat.sms && currentConfig.masterSms && <Check className="w-3 h-3 stroke-[3]" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Actions Bar */}
          <div className={`p-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isLight ? 'border-slate-100 bg-slate-50/80' : 'border-white/10 bg-[#121722]'
          }`}>
            <button
              onClick={handleResetRoleConfig}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition flex items-center gap-2 cursor-pointer ${
                isLight
                  ? 'border-slate-200 hover:bg-slate-200 text-slate-700'
                  : 'border-white/10 hover:bg-white/10 text-[#98A2B3] hover:text-white'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser ce rôle</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  isLight
                    ? 'border-slate-200 hover:bg-slate-100 text-slate-700'
                    : 'border-white/10 hover:bg-white/5 text-[#98A2B3] hover:text-white'
                }`}
              >
                Fermer
              </button>

              <button
                onClick={handleSaveAll}
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold bg-[#A8E635] hover:bg-[#b8f045] text-[#0B0D10] transition flex items-center justify-center gap-2 shadow-lg shadow-[#A8E635]/20 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Enregistrer les préférences</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
