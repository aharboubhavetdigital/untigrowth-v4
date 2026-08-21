import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  Bell,
  Mail,
  Brain,
  FileText,
  FileCheck,
  Briefcase,
  Receipt,
  Shield,
  Activity,
  LogOut,
  Download,
  ArrowUpRight,
  Sparkles,
  Search,
  Settings,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Star,
  Check,
  Sun,
  Moon,
  BookOpen,
  Rocket,
  TrendingUp,
  PieChart,
} from 'lucide-react';
import { VivierView } from './VivierView';
import { RelancesDispoView } from './RelancesDispoView';
import { InvitationsVivierView } from './InvitationsVivierView';
import { TestsIaView } from './TestsIaView';
import { OffresView } from './OffresView';
import { ContratsView } from './ContratsView';
import { MissionsView } from './MissionsView';
import { FacturesView } from './FacturesView';
import { UnitGrowthLogo } from './UnitGrowthLogo';
import { EquipeView } from './EquipeView';
import { JournauxView } from './JournauxView';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NotificationSettingsModal } from './NotificationSettingsModal';
import { NotificationEventsPopup } from './NotificationEventsPopup';

interface SuperAdminDashboardProps {
  onLogout: () => void;
  onSwitchToResponsable?: () => void;
  onSwitchToFreelance?: () => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  onLogout,
  onSwitchToResponsable,
  onSwitchToFreelance,
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [csvExported, setCsvExported] = useState(false);
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(0);
  const [candidateFilter, setCandidateFilter] = useState<'all' | 'valides' | 'encours'>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isNotifPopupOpen, setIsNotifPopupOpen] = useState(false);

  // Collapsible dashboard sections (collapsed by default on Dashboard open)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    vivier: false,
    candidateDetail: false,
    testsIa: false,
    entonnoir: false,
    couverture: false,
    journal: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sidebarNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vivier', label: 'Vivier', icon: Users },
    { id: 'relances', label: 'Relances dispo', icon: Bell },
    { id: 'invitations', label: 'Invitations', icon: Mail },
    { id: 'tests', label: 'Tests IA', icon: Brain },
    { id: 'offres', label: 'Offres', icon: FileText },
    { id: 'contrats', label: 'Contrats', icon: FileCheck },
    { id: 'missions', label: 'Missions', icon: Briefcase },
    { id: 'factures', label: 'Factures', icon: Receipt },
    { id: 'equipe', label: 'Équipe', icon: Shield },
    { id: 'journaux', label: 'Journaux', icon: Activity },
  ];

  const candidateRankings = [
    {
      id: '#CAN-001',
      rank: 1,
      name: 'Mehdi Chraibi',
      role: 'Développement full stack',
      score: '74/100',
      numericScore: 74,
      status: 'Validé métier',
      statusType: 'success',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      dailyRate: '3,500 DH/j',
      amount: '53,154 DH',
      due: 'Dispo immédiate',
    },
    {
      id: '#CAN-002',
      rank: 2,
      name: 'Nadia Berrada',
      role: 'Marketing digital',
      score: '71/100',
      numericScore: 71,
      status: 'Validé métier',
      statusType: 'success',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      dailyRate: '2,800 DH/j',
      amount: '61,223 DH',
      due: 'Dans 4 jours',
    },
    {
      id: '#CAN-003',
      rank: 3,
      name: 'Nofy Andriana',
      role: 'IA & automatisation',
      score: '65/100',
      numericScore: 65,
      status: 'Test effectué',
      statusType: 'warning',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      dailyRate: '4,200 DH/j',
      amount: '27,114 DH',
      due: 'Dans 2 jours',
    },
    {
      id: '#CAN-004',
      rank: 4,
      name: 'Sofia Alaoui',
      role: 'Chef de projet',
      score: '58/100',
      numericScore: 58,
      status: 'Suspendu',
      statusType: 'danger',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      dailyRate: '3,000 DH/j',
      amount: '7,311 DH',
      due: 'Inactif',
    },
  ];

  const handleExportCsv = () => {
    setCsvExported(true);
    setTimeout(() => setCsvExported(false), 3000);
  };

  const filteredCandidates = candidateRankings.filter((c) => {
    if (candidateFilter === 'valides') return c.statusType === 'success';
    if (candidateFilter === 'encours') return c.statusType === 'warning' || c.statusType === 'danger';
    return true;
  });

  const selectedCandidate = filteredCandidates[selectedCandidateIndex] || filteredCandidates[0] || candidateRankings[0];

  return (
    <div className={`min-h-screen bg-[#090B0E] text-white flex flex-col font-sans selection:bg-[#A8E635] selection:text-[#0B0D10] pb-12 transition-colors duration-300 ${theme === 'light' ? 'light-dashboard bg-[#F8FAFC] text-[#0F172A]' : ''}`}>
      {/* ================= TOP FLOATING NAVIGATION BAR (SALESFORCE DESIGN SYSTEM) ================= */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b px-4 sm:px-8 py-3 transition-all ${
        theme === 'light' ? 'bg-white/90 border-slate-200/90 shadow-sm' : 'bg-[#090B0E]/90 border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <UnitGrowthLogo variant="stacked" theme={theme} size="sm" />
          </div>

          {/* Center Floating Capsule Nav Bar */}
          <nav className={`hidden lg:flex items-center gap-1.5 border rounded-full p-1.5 shadow-md overflow-x-auto no-scrollbar relative ${
            theme === 'light' ? 'bg-slate-100/80 border-slate-200' : 'bg-[#12151C] border-white/10 shadow-2xl'
          }`}>
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={item.label}
                  className={`relative flex items-center justify-center p-2.5 rounded-full transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#0B0D10]'
                      : theme === 'light'
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTabIndicatorDesktop"
                      className="absolute inset-0 bg-[#A8E635] rounded-full shadow-md shadow-[#A8E635]/25"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-[#0B0D10]' : theme === 'light' ? 'text-slate-600' : 'text-[#98A2B3]'}`} />
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions & Avatar */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mode Light / Mode Black Toggle Button (Icon Only) */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-full transition-all border cursor-pointer flex items-center justify-center ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 shadow-sm'
                  : 'bg-[#12151C] border-white/10 text-white hover:bg-white/10 hover:border-white/20'
              }`}
              title={theme === 'dark' ? 'Basculer en Mode Clair' : 'Basculer en Mode Noir (normal)'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-black font-bold" />
              )}
            </button>

            <div className={`hidden sm:flex items-center gap-1 border rounded-full px-2 py-1 ${
              theme === 'light' ? 'bg-slate-100/80 border-slate-200' : 'bg-[#12151C] border-white/10'
            }`}>
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-1.5 transition-colors rounded-full cursor-pointer ${
                  theme === 'light' ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50' : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
                }`}
                title="Rechercher (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsNotifPopupOpen(true)}
                className={`p-1.5 transition-colors rounded-full cursor-pointer relative ${
                  theme === 'light' ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50' : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
                }`}
                title="Événements de notification"
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#A8E635] ring-2 ring-[#090B0E]" />
              </button>
            </div>



            {/* Profile Avatar Pill */}
            <div className={`flex items-center gap-2 border rounded-full pl-1.5 pr-3 py-1 shadow-md ${
              theme === 'light' ? 'bg-slate-100/80 border-slate-200' : 'bg-[#12151C] border-white/10'
            }`}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Super Admin"
                  className={`w-7 h-7 rounded-full object-cover border ${theme === 'light' ? 'border-slate-300' : 'border-white'}`}
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#090B0E]"></span>
              </div>
              <div className="hidden md:block text-left">
                <div className={`text-[11px] font-extrabold leading-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Super Admin</div>
                <div className={`text-[9px] leading-none ${theme === 'light' ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Administrateur</div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-600 hover:text-rose-600 hover:bg-rose-50 shadow-sm'
                  : 'bg-white/5 border-white/10 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 text-[#98A2B3]'
              }`}
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar Pills Scrollable */}
        <div className="flex lg:hidden items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar pb-1">
          {sidebarNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={item.label}
                className={`relative flex items-center justify-center p-2 rounded-full transition-colors shrink-0 ${
                  isActive
                    ? 'text-[#0B0D10] font-black'
                    : 'bg-[#12151C] text-[#98A2B3] border border-white/10'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTabIndicatorMobile"
                    className="absolute inset-0 bg-[#A8E635] rounded-full shadow-md shadow-[#A8E635]/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-[#0B0D10]' : 'text-[#98A2B3]'}`} />
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {activeTab === 'vivier' ? (
              <VivierView
                onNavigateToRelances={() => setActiveTab('relances')}
                onNavigateToInvitations={() => setActiveTab('invitations')}
              />
            ) : activeTab === 'relances' ? (
              <RelancesDispoView onNavigateToVivier={() => setActiveTab('vivier')} />
            ) : activeTab === 'invitations' ? (
              <InvitationsVivierView onNavigateToVivier={() => setActiveTab('vivier')} theme={theme} />
            ) : activeTab === 'tests' ? (
              <TestsIaView theme={theme} />
            ) : activeTab === 'offres' ? (
              <OffresView userRole="superadmin" />
            ) : activeTab === 'contrats' ? (
              <ContratsView
                userRole="admin"
                onNavigateToOffres={() => setActiveTab('offres')}
                onNavigateToVivier={() => setActiveTab('vivier')}
                theme={theme}
              />
            ) : activeTab === 'missions' ? (
              <MissionsView
                onNavigateToOffres={() => setActiveTab('offres')}
                onNavigateToContrats={() => setActiveTab('contrats')}
                onNavigateToVivier={() => setActiveTab('vivier')}
              />
            ) : activeTab === 'factures' ? (
              <FacturesView userRole="superadmin" />
            ) : activeTab === 'equipe' ? (
              <EquipeView />
            ) : activeTab === 'journaux' ? (
              <JournauxView />
            ) : (
              <>
            {/* Top Page Header & Export */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Dashboard · Super administrateur
                </h1>
                <p className="text-xs sm:text-sm text-[#98A2B3] mt-1">
                  Profils, accès, tests, suspensions, contrats, projets, factures et journaux.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleExportCsv}
                  className="px-5 py-2.5 bg-[#14171E] border border-white/15 hover:bg-white hover:text-[#0B0D10] text-white rounded-full text-xs font-extrabold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{csvExported ? 'CSV Exporté !' : 'Exporter CSV'}</span>
                </button>
              </div>
            </div>

            {/* ================= 8 STATS METRIC CARDS MATCHING DASHBOARD DESIGN SYSTEM ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Card 1: Profils */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="p-4 sm:p-5 bg-[#0F1218] rounded-2xl border border-white/10 shadow-lg hover:border-white/30 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white">Profils</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#98A2B3] group-hover:text-white transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight my-2">17</div>
                <div className="flex items-center justify-between">
                  <div className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-[#98A2B3]">
                    1 suspendu(s)
                  </div>
                  {/* Stacked Avatars */}
                  <div className="flex items-center -space-x-1.5">
                    {candidateRankings.slice(0, 4).map((c, i) => (
                      <img
                        key={i}
                        src={c.avatar}
                        alt={c.name}
                        className="w-5 h-5 rounded-full ring-2 ring-[#0F1218] object-cover"
                      />
                    ))}
                    <span className="w-5 h-5 rounded-full bg-white/10 ring-2 ring-[#0F1218] text-[9px] font-bold text-white flex items-center justify-center">
                      +2
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Validations en attente */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="p-4 sm:p-5 bg-[#0F1218] rounded-2xl border border-white/10 shadow-lg hover:border-white/30 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white">Validations en attente</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#98A2B3] group-hover:text-white transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight my-2">3</div>
                <div className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-bold text-white w-fit">
                  En cours de révision
                </div>
              </motion.div>

              {/* Card 3: Banque de tests */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="p-4 sm:p-5 bg-[#0F1218] rounded-2xl border border-white/10 shadow-lg hover:border-white/30 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white">Banque de tests</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#98A2B3] group-hover:text-white transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight my-2">32</div>
                <div className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-[#98A2B3] w-fit">
                  13 test(s) passés
                </div>
              </motion.div>

              {/* Card 4: Comptes internes */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="p-4 sm:p-5 bg-[#0F1218] rounded-2xl border border-white/10 shadow-lg hover:border-white/30 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white">Comptes internes</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#98A2B3] group-hover:text-white transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight my-2">5</div>
                <div className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-[#98A2B3] w-fit">
                  Accès / équipe
                </div>
              </motion.div>

              {/* Card 5: Contrats actifs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="p-4 sm:p-5 bg-[#0F1218] rounded-2xl border border-white/10 shadow-lg hover:border-white/30 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white">Contrats actifs</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#98A2B3] group-hover:text-white transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight my-2">1</div>
                <div className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-[#98A2B3] w-fit">
                  1 à signer
                </div>
              </motion.div>

              {/* Card 6: Projets en cours */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="p-4 sm:p-5 bg-[#0F1218] rounded-2xl border border-white/10 shadow-lg hover:border-white/30 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white">Projets en cours</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#98A2B3] group-hover:text-white transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight my-2">1</div>
                <div className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-[#98A2B3] w-fit">
                  0 étape(s) en retard
                </div>
              </motion.div>

              {/* Card 7: Factures à traiter */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="p-4 sm:p-5 bg-[#0F1218] rounded-2xl border border-white/10 shadow-lg hover:border-white/30 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-white" />
                    <span className="text-xs font-semibold text-white">Factures à traiter</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#98A2B3] group-hover:text-white transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight my-2">1</div>
                <div className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-[#98A2B3] w-fit">
                  Paiement en attente
                </div>
              </motion.div>

              {/* Card 8: CA FACTURÉ (Animated Green Glow Highlight) */}
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 sm:p-5 bg-gradient-to-br from-[#101A12] via-[#122416] to-[#18331A] rounded-2xl border border-[#A8E635]/40 shadow-xl shadow-[#A8E635]/10 hover:border-[#A8E635] transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    opacity: [0.3, 0.75, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.2,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 right-0 w-28 h-28 bg-[#A8E635]/20 rounded-full blur-2xl pointer-events-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#A8E635]" />
                    <span className="text-xs font-bold text-white tracking-wider uppercase">CA FACTURÉ</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight my-2">25.200 DH</div>
                <div className="flex items-center justify-between gap-2">
                  <div className="px-2.5 py-0.5 rounded-full bg-[#A8E635]/20 border border-[#A8E635]/30 text-[11px] font-semibold text-[#A8E635]">
                    Mois en cours
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-white text-[#0B0D10] text-xs font-black rounded-lg shadow-md hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    Pay out now
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* ================= ANALYTICS CHARTS SECTION WITH MOTION ANIMATIONS ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Chart: Évolution du CA facturé (Animated Line Chart) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -2 }}
                className={`p-5 rounded-2xl border shadow-xl flex flex-col justify-between transition-colors duration-300 ${
                  theme === 'light'
                    ? 'bg-white border-slate-200/80 shadow-sm'
                    : 'bg-[#0F1218] border-white/10 shadow-xl'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#A8E635]" />
                    <h3 className={`text-sm font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Évolution du CA facturé</h3>
                  </div>
                  <button className={`flex items-center gap-1.5 text-xs font-medium border px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    theme === 'light'
                      ? 'text-slate-700 bg-slate-100/80 hover:bg-slate-200/80 border-slate-200'
                      : 'text-white/80 bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}>
                    <span>6 derniers mois</span>
                    <ChevronDown className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-slate-500' : 'text-[#98A2B3]'}`} />
                  </button>
                </div>

                {/* Area Line Chart SVG with motion paths */}
                <div className="w-full relative pt-2 pb-1">
                  <svg viewBox="0 0 500 160" className="w-full h-auto overflow-visible">
                    <defs>
                      <linearGradient id="caAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#A8E635" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#A8E635" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Y-axis Labels */}
                    <text x="10" y="20" fill={theme === 'light' ? '#64748B' : '#98A2B3'} fontSize="10" fontWeight="600">DH</text>
                    <text x="10" y="42" fill={theme === 'light' ? '#64748B' : '#98A2B3'} fontSize="10">30k</text>
                    <text x="10" y="72" fill={theme === 'light' ? '#64748B' : '#98A2B3'} fontSize="10">20k</text>
                    <text x="10" y="102" fill={theme === 'light' ? '#64748B' : '#98A2B3'} fontSize="10">10k</text>
                    <text x="10" y="132" fill={theme === 'light' ? '#64748B' : '#98A2B3'} fontSize="10">0</text>

                    {/* Horizontal Gridlines */}
                    <line x1="45" y1="38" x2="480" y2="38" stroke={theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'} strokeDasharray="3 3" />
                    <line x1="45" y1="68" x2="480" y2="68" stroke={theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'} strokeDasharray="3 3" />
                    <line x1="45" y1="98" x2="480" y2="98" stroke={theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'} strokeDasharray="3 3" />
                    <line x1="45" y1="128" x2="480" y2="128" stroke={theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'} strokeDasharray="3 3" />

                    {/* Animated Gradient Area Fill */}
                    <motion.path
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      d="M 60,110 Q 140,95 210,82 T 360,60 T 450,45 L 450,128 L 60,128 Z"
                      fill="url(#caAreaGradient)"
                    />

                    {/* Animated Smooth Green Stroke Line */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.6, ease: "easeInOut", delay: 0.5 }}
                      d="M 60,110 Q 140,95 210,82 T 360,60 T 450,45"
                      fill="none"
                      stroke="#A8E635"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Animated Data Points */}
                    <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.7 }} cx="60" cy="110" r="3.5" fill="#FFFFFF" stroke="#A8E635" strokeWidth="2" />
                    <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.85 }} cx="138" cy="98" r="3.5" fill="#FFFFFF" stroke="#A8E635" strokeWidth="2" />
                    <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.0 }} cx="216" cy="85" r="3.5" fill="#FFFFFF" stroke="#A8E635" strokeWidth="2" />
                    <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.15 }} cx="294" cy="72" r="3.5" fill="#FFFFFF" stroke="#A8E635" strokeWidth="2" />
                    <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.3 }} cx="372" cy="60" r="3.5" fill="#FFFFFF" stroke="#A8E635" strokeWidth="2" />
                    <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.45 }} cx="450" cy="45" r="4.5" fill="#FFFFFF" stroke="#A8E635" strokeWidth="2.5" />

                    {/* X-axis Month Labels */}
                    <text x="60" y="150" fill={theme === 'light' ? '#64748B' : '#98A2B3'} fontSize="10" textAnchor="middle">Déc.</text>
                    <text x="138" y="150" fill={theme === 'light' ? '#64748B' : '#98A2B3'} fontSize="10" textAnchor="middle">Janv.</text>
                    <text x="216" y="150" fill={theme === 'light' ? '#64748B' : '#98A2B3'} fontSize="10" textAnchor="middle">Févr.</text>
                    <text x="294" y="150" fill={theme === 'light' ? '#64748B' : '#98A2B3'} fontSize="10" textAnchor="middle">Mars</text>
                    <text x="372" y="150" fill={theme === 'light' ? '#64748B' : '#98A2B3'} fontSize="10" textAnchor="middle">Avr.</text>
                    <text x="450" y="150" fill={theme === 'light' ? '#64748B' : '#98A2B3'} fontSize="10" textAnchor="middle">Mai</text>
                  </svg>
                </div>
              </motion.div>

              {/* Right Chart: Répartition des éléments clés (Animated Donut Chart) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -2 }}
                className={`p-5 rounded-2xl border shadow-xl flex flex-col justify-between transition-colors duration-300 ${
                  theme === 'light'
                    ? 'bg-white border-slate-200/80 shadow-sm'
                    : 'bg-[#0F1218] border-white/10 shadow-xl'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-[#A8E635]" />
                    <h3 className={`text-sm font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Répartition des éléments clés</h3>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
                  {/* Animated Donut Chart Visual */}
                  <motion.div
                    initial={{ scale: 0.8, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                    className="relative w-36 h-36 shrink-0 flex items-center justify-center"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-md">
                      <defs>
                        <linearGradient id="donutGreen1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#A8E635" />
                          <stop offset="100%" stopColor="#84CC16" />
                        </linearGradient>
                        <linearGradient id="donutGreen2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#84CC16" />
                          <stop offset="100%" stopColor="#22C55E" />
                        </linearGradient>
                        <linearGradient id="donutGreen3" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#22C55E" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                        <linearGradient id="donutGreen4" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10B981" />
                          <stop offset="100%" stopColor="#059669" />
                        </linearGradient>
                        <linearGradient id="donutGreen5" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#059669" />
                          <stop offset="100%" stopColor="#047857" />
                        </linearGradient>
                        <linearGradient id="donutGreen6" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#047857" />
                          <stop offset="100%" stopColor="#065F46" />
                        </linearGradient>
                        <linearGradient id="donutGreen7" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#065F46" />
                          <stop offset="100%" stopColor="#15803D" />
                        </linearGradient>
                        <linearGradient id="donutGreen8" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#BEF264" />
                          <stop offset="100%" stopColor="#A8E635" />
                        </linearGradient>
                      </defs>

                      {/* Donut Segments */}
                      <circle cx="50" cy="50" r="38" fill="none" stroke="url(#donutGreen1)" strokeWidth="15" strokeDasharray="125 113.8" strokeDashoffset="0" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="url(#donutGreen2)" strokeWidth="15" strokeDasharray="66.8 172" strokeDashoffset="-125" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="url(#donutGreen3)" strokeWidth="15" strokeDasharray="19.6 219.2" strokeDashoffset="-191.8" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="url(#donutGreen4)" strokeWidth="15" strokeDasharray="11.8 227" strokeDashoffset="-211.4" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="url(#donutGreen5)" strokeWidth="15" strokeDasharray="3.9 234.9" strokeDashoffset="-223.2" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="url(#donutGreen6)" strokeWidth="15" strokeDasharray="3.9 234.9" strokeDashoffset="-227.1" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="url(#donutGreen7)" strokeWidth="15" strokeDasharray="3.9 234.9" strokeDashoffset="-231" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="url(#donutGreen8)" strokeWidth="15" strokeDasharray="3.9 234.9" strokeDashoffset="-234.9" />
                    </svg>

                    {/* Animated Center Text Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9, type: "spring", stiffness: 220 }}
                      className={`absolute inset-0 m-auto w-20 h-20 rounded-full ring-1 flex flex-col items-center justify-center shadow-inner ${
                        theme === 'light'
                          ? 'bg-slate-50 ring-slate-200/60'
                          : 'bg-[#0F1218] ring-white/10'
                      }`}
                    >
                      <span className={`text-xl font-black leading-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>61</span>
                      <span className="text-[10px] font-bold text-[#A8E635]">Total</span>
                    </motion.div>
                  </motion.div>

                  {/* Legend Table List */}
                  <div className="w-full space-y-0.5 text-xs">
                    {[
                      { color: '#84CC16', label: 'Profils', val: '17' },
                      { color: '#A8E635', label: 'Banque de tests', val: '32' },
                      { color: '#22C55E', label: 'Comptes internes', val: '5' },
                      { color: '#10B981', label: 'Validations en attente', val: '3' },
                      { color: '#059669', label: 'Contrats actifs', val: '1' },
                      { color: '#047857', label: 'Projets en cours', val: '1' },
                      { color: '#065F46', label: 'Factures à traiter', val: '1' },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.05 }}
                        className={`flex items-center justify-between py-1 px-2 -mx-2 rounded-lg transition-colors ${
                          theme === 'light' ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-white/5 text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: item.color }} />
                          <span className={`font-medium ${theme === 'light' ? 'text-slate-600' : 'text-[#98A2B3]'}`}>{item.label}</span>
                        </div>
                        <span className={`font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{item.val}</span>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      className={`flex items-center justify-between py-1 px-2 -mx-2 rounded-lg border mt-1 ${
                        theme === 'light'
                          ? 'bg-[#A8E635]/15 border-[#A8E635]/30'
                          : 'bg-[#A8E635]/10 border-[#A8E635]/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#A8E635] shrink-0 shadow-sm" />
                        <span className={`font-semibold ${theme === 'light' ? 'text-slate-900 font-bold' : 'text-white font-semibold'}`}>CA facturé (mois)</span>
                      </div>
                      <span className="font-black text-[#A8E635]">25.200 DH</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ================= CANDIDATE RANKING & DETAILS SECTION (SALESFORCE DESIGN SYSTEM) ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Left 2-Cols: Candidate Ranking Table Card */}
              <div className="lg:col-span-2 bg-[#12151C] rounded-3xl border border-white/10 shadow-2xl p-6 flex flex-col justify-between h-fit">
                <div>
                  {/* Top Header & Filters */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                    <div>
                      <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                        <span>Classement Candidats & Validations</span>
                        <span className="text-xs bg-[#A8E635]/60 text-[#0B0D10] px-2.5 py-0.5 rounded-full font-black border border-[#A8E635]/60">
                          Top 4
                        </span>
                      </h3>
                      <p className="text-xs text-[#98A2B3] mt-0.5">
                        Supervision en direct des scores et statuts du vivier
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Filter Pills Capsule */}
                      <div className="flex items-center gap-1 bg-[#090B0E] p-1 rounded-full border border-white/10">
                        <button
                          onClick={() => { setCandidateFilter('all'); setSelectedCandidateIndex(0); }}
                          className={`px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                            candidateFilter === 'all'
                              ? 'bg-white text-[#0B0D10] font-black shadow'
                              : 'text-[#98A2B3] hover:text-white font-semibold'
                          }`}
                        >
                          Tous (17)
                        </button>
                        <button
                          onClick={() => { setCandidateFilter('valides'); setSelectedCandidateIndex(0); }}
                          className={`px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                            candidateFilter === 'valides'
                              ? 'bg-white text-[#0B0D10] font-black shadow'
                              : 'text-[#98A2B3] hover:text-white font-semibold'
                          }`}
                        >
                          Validés (9)
                        </button>
                        <button
                          onClick={() => { setCandidateFilter('encours'); setSelectedCandidateIndex(0); }}
                          className={`px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                            candidateFilter === 'encours'
                              ? 'bg-white text-[#0B0D10] font-black shadow'
                              : 'text-[#98A2B3] hover:text-white font-semibold'
                          }`}
                        >
                          En cours (3)
                        </button>
                      </div>

                      <button
                        onClick={() => toggleSection('vivier')}
                        className="px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-xs font-bold text-white transition-all flex items-center gap-1 cursor-pointer shrink-0"
                        title={openSections.vivier ? "Replier" : "Déplier"}
                      >
                        <span>{openSections.vivier ? 'Replier' : 'Déplier'}</span>
                        {openSections.vivier ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {openSections.vivier && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden space-y-2.5"
                      >
                        {filteredCandidates.map((c, idx) => {
                          const isSelected = (filteredCandidates[selectedCandidateIndex] || filteredCandidates[0])?.id === c.id;
                          const isFirst = idx === 0 || c.rank === 1;
                          return (
                            <div
                              key={c.id}
                              onClick={() => setSelectedCandidateIndex(idx)}
                              className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                isSelected
                                  ? isFirst
                                    ? 'bg-[#181C26] border-[#A8E635]/60 shadow-lg shadow-[#A8E635]/20 ring-1 ring-[#A8E635]/60'
                                    : 'bg-[#181C26] border-white shadow-lg shadow-white/10 ring-1 ring-white/30'
                                  : isFirst
                                  ? 'bg-[#A8E635]/10 border-[#A8E635]/60 hover:border-[#A8E635] hover:bg-[#A8E635]/15'
                                  : 'bg-[#090B0E]/60 border-white/5 hover:border-white/20 hover:bg-white/5'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {/* Rank Badge */}
                                <div className={`font-mono text-xs font-black px-2 py-1 rounded-lg shrink-0 ${
                                  isFirst
                                    ? 'text-[#0B0D10] bg-[#A8E635]/60 border border-[#A8E635]/80'
                                    : 'text-white bg-white/10 border border-white/20'
                                }`}>
                                  #{c.rank}
                                </div>

                                {/* Candidate Avatar */}
                                <div className="relative shrink-0">
                                  <img
                                    src={c.avatar}
                                    alt={c.name}
                                    className={`w-10 h-10 rounded-full object-cover ring-2 ${
                                      isFirst ? 'ring-[#A8E635]/60' : 'ring-white/10'
                                    }`}
                                  />
                                  {c.rank === 1 && (
                                    <span className="absolute -top-1 -right-1 text-xs">👑</span>
                                  )}
                                </div>

                                {/* Name & Info */}
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-black text-white">{c.name}</span>
                                    <span className="text-[10px] font-mono text-[#98A2B3] bg-white/5 px-1.5 py-0.5 rounded">
                                      {c.id}
                                    </span>
                                  </div>
                                  <div className="text-xs text-[#98A2B3] mt-0.5">{c.role}</div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                                {/* Status Tag */}
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                                    isFirst
                                      ? 'bg-[#A8E635]/60 text-[#0B0D10] border-[#A8E635]/80'
                                      : c.statusType === 'success'
                                      ? 'bg-white/10 text-white border-white/20'
                                      : c.statusType === 'warning'
                                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                      : 'bg-red-500/20 text-red-300 border-red-500/30'
                                  }`}
                                >
                                  {c.status}
                                </span>

                                {/* Score & Rate */}
                                <div className="text-right">
                                  <div className={`text-sm font-black font-mono ${isFirst ? 'text-[#A8E635]' : 'text-white'}`}>{c.score}</div>
                                  <div className="text-[10px] text-[#98A2B3]">{c.dailyRate}</div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {openSections.vivier && (
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => setActiveTab('vivier')}
                      className="text-xs font-extrabold text-white hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Voir tout le Vivier ({17} candidats)</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono text-[#98A2B3]">Mise à jour directe</span>
                  </div>
                )}
              </div>

              {/* Right 1-Col: Active Candidate Detail Panel (Salesforce Detail Box) */}
              <div className={`bg-[#12151C] rounded-3xl border border-white/10 shadow-2xl p-6 flex flex-col justify-between h-fit ${openSections.candidateDetail ? 'space-y-5' : ''}`}>
                <div>
                  <div className={`flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-3 ${openSections.candidateDetail ? 'border-b border-white/10 pb-4' : ''}`}>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#98A2B3] block truncate">
                        Détails candidat sélectionné
                      </span>
                      <h4 className="text-lg font-black text-white truncate">{selectedCandidate.name}</h4>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
                      <span className="font-mono text-xs font-black text-white bg-white/10 px-2.5 py-1 rounded-full border border-white/30 shrink-0 whitespace-nowrap">
                        {selectedCandidate.id}
                      </span>
                      <button
                        onClick={() => toggleSection('candidateDetail')}
                        className="px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-xs font-bold text-white transition-all flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap"
                        title={openSections.candidateDetail ? "Replier" : "Déplier"}
                      >
                        <span>{openSections.candidateDetail ? 'Replier' : 'Déplier'}</span>
                        {openSections.candidateDetail ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {openSections.candidateDetail && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden space-y-4 pt-1"
                      >
                        <div className="my-4 flex items-center gap-3">
                          <img
                            src={selectedCandidate.avatar}
                            alt={selectedCandidate.name}
                            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white"
                          />
                          <div>
                            <div className="text-xs font-bold text-[#98A2B3]">{selectedCandidate.role}</div>
                            <div className="text-sm font-black text-white mt-0.5">{selectedCandidate.due}</div>
                            <div className="flex items-center gap-1 text-[11px] text-white mt-1 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Vérifié par UNITGROWTH</span>
                            </div>
                          </div>
                        </div>

                        {/* 3 Micro Stat Cards Grid */}
                        <div className="grid grid-cols-2 gap-2 my-4">
                          <div className="p-3 rounded-2xl bg-[#090B0E] border border-white/10">
                            <div className="text-[10px] font-semibold text-[#98A2B3]">Score IA</div>
                            <div className="text-base font-black text-white font-mono">{selectedCandidate.score}</div>
                          </div>
                          <div className="p-3 rounded-2xl bg-[#090B0E] border border-white/10">
                            <div className="text-[10px] font-semibold text-[#98A2B3]">TJM Recommandé</div>
                            <div className="text-base font-black text-white font-mono">{selectedCandidate.dailyRate}</div>
                          </div>
                        </div>

                        {/* Total Value Row */}
                        <div className="p-3.5 rounded-2xl bg-[#090B0E] border border-white/10 space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-[#98A2B3]">Total estimé:</span>
                            <span className="font-mono font-bold text-white">{selectedCandidate.amount}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-[#98A2B3]">Statut validation:</span>
                            <span className="font-bold text-white">{selectedCandidate.status}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {openSections.candidateDetail && (
                  <button
                    onClick={() => setActiveTab('vivier')}
                    className="w-full py-3 px-4 rounded-full bg-[#A8E635] text-[#0B0D10] font-black text-xs hover:bg-[#bbf048] transition-all shadow-xl shadow-[#A8E635]/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Valider & Affecter</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* ================= TWO PANELS: TESTS IA & ENTONNOIR ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Left Card: Tests IA */}
              <div className="bg-[#12151C] p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4 transition-all h-fit">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      Tests IA
                    </h3>
                    <span className="text-[10px] font-mono text-[#98A2B3] bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      4 catégories
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('tests')}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-white/80 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                    >
                      Guider les tests
                    </button>
                    <button
                      onClick={() => toggleSection('testsIa')}
                      className="px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-xs font-bold text-white transition-all flex items-center gap-1 cursor-pointer"
                      title={openSections.testsIa ? "Replier" : "Déplier"}
                    >
                      <span>{openSections.testsIa ? 'Replier' : 'Déplier'}</span>
                      {openSections.testsIa ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {openSections.testsIa && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden space-y-5 pt-1"
                    >
                      {/* Test Categories counts */}
                      <div className="space-y-2 border-b border-white/10 pb-4">
                        <div className="flex justify-between items-center text-xs py-1">
                          <span className="text-[#98A2B3] font-semibold">Développement full stack</span>
                          <span className="font-extrabold text-white bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">8 questions</span>
                        </div>
                        <div className="flex justify-between items-center text-xs py-1">
                          <span className="text-[#98A2B3] font-semibold">IA & automatisation</span>
                          <span className="font-extrabold text-white bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">8 questions</span>
                        </div>
                        <div className="flex justify-between items-center text-xs py-1">
                          <span className="text-[#98A2B3] font-semibold">Marketing digital</span>
                          <span className="font-extrabold text-white bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">8 questions</span>
                        </div>
                        <div className="flex justify-between items-center text-xs py-1">
                          <span className="text-[#98A2B3] font-semibold">No-code</span>
                          <span className="font-extrabold text-white bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">8 questions</span>
                        </div>
                      </div>

                      {/* Subheader: DERNIERS TESTS */}
                      <div>
                        <p className="text-[11px] font-mono font-black uppercase tracking-widest text-[#98A2B3] mb-2 px-1">
                          DERNIERS TESTS PASSÉS
                        </p>
                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                          {[
                            { name: 'Rania Skalli', score: '90/100 · 04/08/2026', badge: 'Top 1' },
                            { name: 'Hery Randria', score: '88/100 · 04/08/2026', badge: 'Top 2' },
                            { name: 'Lova Rasoanaivo', score: '84/100 · 04/08/2026', badge: 'Top 3' },
                            { name: 'Imane Tazi', score: '82/100 · 04/08/2026', badge: 'Top 4' },
                            { name: 'Karim Bousfiha', score: '79/100 · 04/08/2026', badge: '' },
                            { name: 'Tiana Ravelo', score: '76/100 · 04/08/2026', badge: '' },
                            { name: 'Nadia Berrada', score: '71/100 · 04/08/2026', badge: '' },
                            { name: 'Sofia Alaoui', score: '58/100 · 04/08/2026', badge: '' },
                          ].map((test, i) => (
                            <div key={i} className="flex justify-between items-center p-2.5 rounded-xl bg-[#090B0E]/60 hover:bg-white/5 transition-colors border border-white/5 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white">{test.name}</span>
                                {test.badge && (
                                  <span className="text-[10px] font-black bg-white text-[#0B0D10] px-1.5 py-0.2 rounded-full">
                                    {test.badge}
                                  </span>
                                )}
                              </div>
                              <span className="font-mono text-[#98A2B3] text-[11px] bg-white/5 px-2 py-0.5 rounded-md">{test.score}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Card: Entonnoir de preuve */}
              <div className="bg-[#12151C] p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4 transition-all h-fit">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      Entonnoir de preuve
                    </h3>
                    <span className="text-xs font-mono text-white font-bold bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      4 étapes
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSection('entonnoir')}
                    className="px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-xs font-bold text-white transition-all flex items-center gap-1 cursor-pointer"
                    title={openSections.entonnoir ? "Replier" : "Déplier"}
                  >
                    <span>{openSections.entonnoir ? 'Replier' : 'Déplier'}</span>
                    {openSections.entonnoir ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {openSections.entonnoir && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden space-y-5 pt-1"
                    >
                      {/* Step 1 */}
                      <div>
                        <div className="flex justify-between items-center text-xs mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-white">Candidats</span>
                            <span className="text-[#98A2B3] text-[11px]">(acquisition)</span>
                          </div>
                          <span className="font-black text-white text-sm">17</span>
                        </div>
                        <div className="w-full bg-white/5 h-3.5 rounded-full overflow-hidden border border-white/10 p-0.5">
                          <div className="bg-gradient-to-r from-white to-slate-200 h-full rounded-full w-full shadow-[0_0_12px_rgba(255,255,255,0.35)]"></div>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div>
                        <div className="flex justify-between items-center text-xs mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-white">Validés</span>
                            <span className="text-[#98A2B3] text-[11px]">(qualification)</span>
                          </div>
                          <span className="font-black text-white text-sm">9</span>
                        </div>
                        <div className="w-full bg-white/5 h-3.5 rounded-full overflow-hidden border border-white/10 p-0.5">
                          <div className="bg-gradient-to-r from-white to-slate-200 h-full rounded-full w-[53%] shadow-[0_0_12px_rgba(255,255,255,0.35)]"></div>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div>
                        <div className="flex justify-between items-center text-xs mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-white">Consultés</span>
                            <span className="text-[#98A2B3] text-[11px]">(intérêt)</span>
                          </div>
                          <span className="font-black text-white text-sm">7</span>
                        </div>
                        <div className="w-full bg-white/5 h-3.5 rounded-full overflow-hidden border border-white/10 p-0.5">
                          <div className="bg-gradient-to-r from-white to-slate-200 h-full rounded-full w-[41%] shadow-[0_0_12px_rgba(255,255,255,0.35)]"></div>
                        </div>
                      </div>

                      {/* Step 4 */}
                      <div>
                        <div className="flex justify-between items-center text-xs mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-white">Missionnés</span>
                            <span className="text-[#98A2B3] text-[11px]">(conversion)</span>
                          </div>
                          <span className="font-black text-white text-sm">3</span>
                        </div>
                        <div className="w-full bg-white/5 h-3.5 rounded-full overflow-hidden border border-white/10 p-0.5">
                          <div className="bg-gradient-to-r from-white to-slate-200 h-full rounded-full w-[18%] shadow-[0_0_12px_rgba(255,255,255,0.35)]"></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ================= TWO PANELS: COUVERTURE & JOURNAL ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Left Card: Couverture par famille (cible 10–30) */}
              <div className="bg-[#12151C] p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4 transition-all h-fit">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      Couverture par famille <span className="text-xs font-normal text-[#98A2B3]">(cible 10–30)</span>
                    </h3>
                    <span className="text-xs font-mono text-[#98A2B3] bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      5 familles
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSection('couverture')}
                    className="px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-xs font-bold text-white transition-all flex items-center gap-1 cursor-pointer"
                    title={openSections.couverture ? "Replier" : "Déplier"}
                  >
                    <span>{openSections.couverture ? 'Replier' : 'Déplier'}</span>
                    {openSections.couverture ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <AnimatePresence>
                  {openSections.couverture && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden divide-y divide-white/5 pt-1"
                    >
                      {[
                        {
                          title: 'Chef de projet',
                          sub: '0 validé(s) · 0 disponible(s)',
                          badge: '0 profil(s)',
                        },
                        {
                          title: 'Développement full stack',
                          sub: '3 validé(s) · 2 disponible(s)',
                          badge: '6 profil(s)',
                        },
                        {
                          title: 'IA & automatisation',
                          sub: '2 validé(s) · 1 disponible(s)',
                          badge: '4 profil(s)',
                        },
                        {
                          title: 'Marketing digital',
                          sub: '2 validé(s) · 1 disponible(s)',
                          badge: '4 profil(s)',
                        },
                        {
                          title: 'No-code',
                          sub: '2 validé(s) · 2 disponible(s)',
                          badge: '3 profil(s)',
                        },
                      ].map((fam, idx) => (
                        <div key={idx} className="flex items-center justify-between py-3.5 first:pt-1 last:pb-1">
                          <div>
                            <div className="text-sm font-extrabold text-white">{fam.title}</div>
                            <div className="text-xs text-[#98A2B3] mt-0.5">{fam.sub}</div>
                          </div>
                          <span className="px-3.5 py-1.5 rounded-full text-xs font-black bg-white text-[#0B0D10] shadow-md shadow-white/10">
                            {fam.badge}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Card: Journal d'activité */}
              <div className="bg-[#12151C] p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4 transition-all h-fit">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      Journal d'activité
                    </h3>
                    <span className="text-xs font-mono text-[#98A2B3] bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                      12 récents
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('journaux')}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-extrabold text-white hover:bg-white/10 cursor-pointer transition-all"
                    >
                      Voir tout
                    </button>
                    <button
                      onClick={() => toggleSection('journal')}
                      className="px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-xs font-bold text-white transition-all flex items-center gap-1 cursor-pointer"
                      title={openSections.journal ? "Replier" : "Déplier"}
                    >
                      <span>{openSections.journal ? 'Replier' : 'Déplier'}</span>
                      {openSections.journal ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {openSections.journal && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden divide-y divide-white/5 pt-1 max-h-[340px] overflow-y-auto pr-1"
                    >
                      {[
                        {
                          title: 'Anass HARBOUB — Inscription freelance',
                          detail: 'Anass HARBOUB',
                          time: '05/08/2026 18:21:54',
                        },
                        {
                          title: 'Super Admin — Mise à jour test',
                          detail: 'Développement full stack',
                          time: '05/08/2026 11:47:10',
                        },
                        {
                          title: 'Super Admin — Désactivation question test',
                          detail: 'Q#1',
                          time: '05/08/2026 11:36:39',
                        },
                        {
                          title: 'Super Admin — Modification question test',
                          detail: 'Q#1',
                          time: '04/08/2026 17:17:34',
                        },
                        {
                          title: 'Super Admin — Retrait test',
                          detail: 'Salma Benali',
                          time: '04/08/2026 17:12:31',
                        },
                        {
                          title: 'Super Admin — Affectation test',
                          detail: 'Salma Benali · IA & automatisation',
                          time: '04/08/2026 17:12:29',
                        },
                        {
                          title: 'Super Admin — Accès projet accordé',
                          detail: "Campagnes d'acquisition multi-canal · user #16",
                          time: '04/08/2026 15:57:21',
                        },
                        {
                          title: 'Super Admin — Accès projet accordé',
                          detail: 'Application interne de gestion de stock (no-code) · user #14',
                          time: '04/08/2026 15:57:21',
                        },
                        {
                          title: 'Super Admin — Accès projet révoqué (fin_contrat)',
                          detail: 'Application interne de gestion de stock (no-code)',
                          time: '04/08/2026 15:57:21',
                        },
                        {
                          title: 'Super Admin — Validation profil',
                          detail: 'Salma Benali',
                          time: '04/08/2026 15:57:21',
                        },
                        {
                          title: 'Responsable Commercial — Création consultation',
                          detail: 'Refonte plateforme e-commerce B2B',
                          time: '04/08/2026 15:57:21',
                        },
                        {
                          title: 'Super Admin — Validation facture',
                          detail: 'FAC-2026-0012',
                          time: '04/08/2026 15:57:21',
                        },
                      ].map((log, idx) => (
                        <div key={idx} className="py-3 px-3 rounded-xl hover:bg-white/5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div>
                            <span className="text-xs font-bold text-white">{log.title}</span>
                            {log.detail && (
                              <span className="text-xs text-[#98A2B3]"> · {log.detail}</span>
                            )}
                          </div>
                          <div className="text-[11px] font-mono text-[#98A2B3] shrink-0 bg-white/5 px-2 py-0.5 rounded-md">
                            {log.time}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
        isLight={theme === 'light'}
      />

      {/* Role Notification Events Popup */}
      <NotificationEventsPopup
        isOpen={isNotifPopupOpen}
        onClose={() => setIsNotifPopupOpen(false)}
        role="admin"
        onOpenSettings={() => setIsNotifModalOpen(true)}
        theme={theme}
      />

      {/* Role Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={isNotifModalOpen}
        onClose={() => setIsNotifModalOpen(false)}
        initialRole="admin"
        theme={theme}
      />
    </div>
  );
};

export default SuperAdminDashboard;
