import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  UserCheck,
  FileText,
  FileCheck,
  Briefcase,
  Receipt,
  Download,
  LogOut,
  Sun,
  Moon,
  CheckCircle2,
  Building2,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Calendar,
  DollarSign,
  MapPin,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Star,
  Zap,
  Search,
  Bell,
  Settings,
  Brain,
  Activity,
  Filter,
  Folder,
  Send,
  Wallet,
  Target,
  Eye,
  MoreVertical,
  Lightbulb,
  Plus,
} from 'lucide-react';
import { OffresView } from './OffresView';
import { ContratsView } from './ContratsView';
import { ProfilView } from './ProfilView';
import { MissionsView } from './MissionsView';
import { FacturesView } from './FacturesView';
import { UnitGrowthLogo, UnitGrowthIcon } from './UnitGrowthLogo';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NotificationSettingsModal } from './NotificationSettingsModal';
import { NotificationEventsPopup } from './NotificationEventsPopup';

interface FreelanceDashboardProps {
  onLogout: () => void;
  onSwitchToSuperAdmin?: () => void;
  onSwitchToResponsable?: () => void;
}

export const FreelanceDashboard: React.FC<FreelanceDashboardProps> = ({
  onLogout,
  onSwitchToSuperAdmin,
  onSwitchToResponsable,
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isNotifPopupOpen, setIsNotifPopupOpen] = useState(false);
  const [csvExported, setCsvExported] = useState(false);
  const [selectedOpportunityIndex, setSelectedOpportunityIndex] = useState(0);
  const [opportunityFilter, setOpportunityFilter] = useState<'all' | 'candidatures' | 'offres'>('all');
  const [quoteIndex, setQuoteIndex] = useState(0);

  const motivationQuotes = [
    "Continuez, votre régularité augmente vos chances de décrocher votre prochaine mission.",
    "Chaque candidature envoyée vous rapproche d'un nouveau projet à la hauteur de vos ambitions.",
    "La clé de la réussite en freelance : régularité, réactivité et soin apporté à votre profil.",
    "Vos compétences sont votre plus bel atout, gardez votre profil actif pour maximiser vos opportunités.",
    "Un profil à jour et vérifié reçoit jusqu'à 3 fois plus de sollicitations directes de la part des clients.",
  ];

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationQuotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [motivationQuotes.length]);

  const sidebarNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profil', label: 'Mon profil', icon: UserCheck },
    { id: 'offres', label: 'Offres', icon: FileText },
    { id: 'contrats', label: 'Contrats', icon: FileCheck },
    { id: 'missions', label: 'Missions', icon: Briefcase },
    { id: 'factures', label: 'Factures', icon: Receipt },
  ];

  const opportunities = [
    {
      id: '#OPP-001',
      rank: 1,
      title: 'Refonte plateforme e-commerce B2B',
      client: 'Client Atlas Distribution',
      role: 'Développement full stack',
      score: '86/100',
      numericScore: 86,
      status: 'Candidature retenue',
      statusType: 'success',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      dailyRate: '3,500 DH/j',
      amount: '53,154 DH',
      due: 'Dispo immédiate',
      type: 'candidatures',
      description: 'Développement d\'une plateforme Web B2B haute performance avec React, Node.js et PostgreSQL.',
    },
    {
      id: '#OPP-002',
      rank: 2,
      title: 'Application Mobile Fintech Payment',
      client: 'PayTech Pro Maroc',
      role: 'React Native & Node.js',
      score: '90/100',
      numericScore: 90,
      status: 'Nouvelle offre',
      statusType: 'info',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      dailyRate: '4,000 DH/j',
      amount: '64,000 DH',
      due: 'Dans 3 jours',
      type: 'offres',
      description: 'Conception de modules de paiement sécurisés et intégration API bancaires locales.',
    },
    {
      id: '#OPP-003',
      rank: 3,
      title: 'Workflow Automation & Gemini AI',
      client: 'SmartFlow Technologies',
      role: 'IA & Automatisation',
      score: '82/100',
      numericScore: 82,
      status: 'En négociation',
      statusType: 'warning',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      dailyRate: '3,800 DH/j',
      amount: '45,600 DH',
      due: 'Dans 1 semaine',
      type: 'offres',
      description: 'Automatisation des processus métier via agents IA et intégration Google Workspace APIs.',
    },
  ];

  const handleExportCsv = () => {
    setCsvExported(true);
    const csvData = "Metric,Value\nOffres reçues,12\nCandidatures envoyées,3\nTests IA passés,86/100\nTJM Recommandé,3500 DH\nContrats actifs,1\nMissions en cours,1\nFactures à traiter,1\nCA Facturé,25200 DH\n";
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export_dashboard_freelance.csv';
    a.click();
    setTimeout(() => setCsvExported(false), 3000);
  };

  const filteredOpportunities = opportunities.filter((op) => {
    if (opportunityFilter === 'candidatures') return op.type === 'candidatures';
    if (opportunityFilter === 'offres') return op.type === 'offres';
    return true;
  });

  const selectedOpportunity = filteredOpportunities[selectedOpportunityIndex] || filteredOpportunities[0] || opportunities[0];

  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans selection:bg-[#A8E635] selection:text-[#0B0D10] pb-12 transition-colors duration-300 ${
        isLight ? 'light-dashboard bg-[#F8FAFC] text-slate-900' : 'bg-[#090B0E] text-white'
      }`}
    >
      {/* ================= TOP FLOATING NAVIGATION BAR (SAME DASHBOARD DESIGN SYSTEM) ================= */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b px-4 sm:px-8 py-3 transition-all ${
        isLight ? 'bg-white/90 border-slate-200/90 shadow-sm' : 'bg-[#090B0E]/90 border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <UnitGrowthLogo variant="stacked" theme={theme} size="sm" />
          </div>

          {/* Center Floating Capsule Nav Bar */}
          <nav className={`hidden lg:flex items-center gap-1.5 border rounded-full p-1.5 shadow-md overflow-x-auto no-scrollbar relative ${
            isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#12151C] border-white/10 shadow-2xl'
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
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTabIndicatorDesktopFreelance"
                      className="absolute inset-0 bg-[#A8E635] rounded-full shadow-md shadow-[#A8E635]/25"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-[#0B0D10]' : isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`} />
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isLight ? 'dark' : 'light')}
              className={`p-2 rounded-full border transition cursor-pointer flex items-center justify-center ${
                isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 shadow-sm'
                  : 'bg-[#12151C] border-white/10 text-[#98A2B3] hover:text-white'
              }`}
              title={isLight ? 'Basculer en Mode Sombre' : 'Basculer en Mode Clair'}
            >
              {isLight ? <Moon className="w-4 h-4 text-slate-800" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Quick Actions */}
            <div className={`hidden sm:flex items-center gap-1 border rounded-full px-2 py-1 ${
              isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#12151C] border-white/10'
            }`}>
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-1.5 transition-colors rounded-full cursor-pointer ${isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50' : 'text-[#98A2B3] hover:text-white hover:bg-white/5'}`}
                title="Rechercher (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsNotifPopupOpen(true)}
                className={`p-1.5 transition-colors rounded-full cursor-pointer relative ${isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50' : 'text-[#98A2B3] hover:text-white hover:bg-white/5'}`}
                title="Événements de notification"
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#A8E635]" />
              </button>
            </div>

            {/* Profile Avatar Pill */}
            <div className={`flex items-center gap-2 border rounded-full pl-1.5 pr-3 py-1 shadow-sm ${
              isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#12151C] border-white/10 shadow-md'
            }`}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Yassine El Amrani"
                  className={`w-7 h-7 rounded-full object-cover border ${isLight ? 'border-slate-300' : 'border-white/20'}`}
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#A8E635] rounded-full ring-2 ring-[#0F1218]" />
              </div>
              <div className="hidden md:block text-left">
                <div className={`text-xs font-bold leading-none ${isLight ? 'text-slate-900' : 'text-white'}`}>Yassine El Amrani</div>
                <div className={`text-[10px] leading-none mt-0.5 ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Freelance</div>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className={`p-2 rounded-full border transition cursor-pointer ${
                isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-600 hover:text-rose-600 hover:bg-rose-50 shadow-sm'
                  : 'bg-[#12151C] border-white/10 text-[#98A2B3] hover:text-rose-400'
              }`}
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className={`flex lg:hidden items-center justify-around mt-2 pt-2 border-t overflow-x-auto no-scrollbar ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}>
          {sidebarNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center p-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? 'text-[#A8E635] font-bold'
                    : isLight
                    ? 'text-slate-600'
                    : 'text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4 mb-0.5" />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ================= MAIN DASHBOARD BODY ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 flex-1 w-full space-y-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Mon activité
                </h1>
                <p className={`text-xs sm:text-sm mt-1.5 flex flex-wrap items-center gap-2 ${
                  isLight ? 'text-slate-500' : 'text-[#98A2B3]'
                }`}>
                  <span>Développement full stack</span>
                  <span className={isLight ? 'text-slate-300 hidden sm:inline' : 'text-slate-600 hidden sm:inline'}>·</span>
                  <span className="font-semibold text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                    Validé
                  </span>
                  <span className={isLight ? 'text-slate-300' : 'text-slate-600'}>·</span>
                  <span className={isLight ? 'font-bold text-amber-600' : 'font-semibold text-amber-400'}>Score 86/100</span>
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
                <button
                  onClick={handleExportCsv}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#A8E635] hover:bg-[#b8f045] text-[#0B0D10] font-bold text-xs px-3.5 sm:px-4 py-2.5 rounded-xl transition cursor-pointer shadow-lg shadow-emerald-950/20 active:scale-98"
                >
                  <Download className="w-4 h-4 text-[#0B0D10]" />
                  <span>{csvExported ? 'CSV Exporté !' : 'Exporter CSV'}</span>
                </button>
              </div>
            </div>

            {/* 4 TOP METRIC CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {/* Card 1: Dossiers reçus */}
              <div
                className={`border rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-all duration-200 ${
                  isLight
                    ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                    : 'bg-[#0E131F] border-white/10 shadow-xl'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                    isLight
                      ? 'bg-slate-100 border-slate-200 text-slate-700'
                      : 'bg-white/10 border-white/15 text-white/80'
                  }`}>
                    <Folder className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Dossiers reçus</span>
                    <div className={`text-2xl font-black tracking-tight mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>1</div>
                  </div>
                </div>
                <div className={`mt-3 text-[11px] font-medium flex items-center gap-1 ${
                  isLight ? 'text-slate-500' : 'text-white/80'
                }`}>
                  <span>+0 cette semaine</span>
                </div>
              </div>

              {/* Card 2: Réponses envoyées */}
              <div
                className={`border rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-all duration-200 ${
                  isLight
                    ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                    : 'bg-[#0E131F] border-white/10 shadow-xl'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                    isLight
                      ? 'bg-slate-100 border-slate-200 text-slate-700'
                      : 'bg-white/10 border-white/15 text-white/80'
                  }`}>
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Réponses envoyées</span>
                    <div className={`text-2xl font-black tracking-tight mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>1</div>
                  </div>
                </div>
                <div className={`mt-3 text-[11px] font-medium flex items-center gap-1 ${
                  isLight ? 'text-slate-500' : 'text-white/80'
                }`}>
                  <span>+0 cette semaine</span>
                </div>
              </div>

              {/* Card 3: Missions obtenues */}
              <div
                className={`border rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-all duration-200 ${
                  isLight
                    ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                    : 'bg-[#0E131F] border-white/10 shadow-xl'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                    isLight
                      ? 'bg-slate-100 border-slate-200 text-slate-700'
                      : 'bg-white/10 border-white/15 text-white/80'
                  }`}>
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Missions obtenues</span>
                    <div className={`text-2xl font-black tracking-tight mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>0</div>
                  </div>
                </div>
                <div className={`mt-3 text-[11px] font-medium flex items-center gap-1 ${
                  isLight ? 'text-slate-500' : 'text-white/80'
                }`}>
                  <span>+0 cette semaine</span>
                </div>
              </div>

              {/* Card 4: Total facturé */}
              <div
                className={`border rounded-2xl p-4 sm:p-5 relative overflow-hidden transition-all duration-200 ${
                  isLight
                    ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-md'
                    : 'bg-[#0E131F] border-white/10 shadow-xl'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                    isLight
                      ? 'bg-slate-100 border-slate-200 text-slate-700'
                      : 'bg-white/10 border-white/15 text-white/80'
                  }`}>
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Total facturé</span>
                    <div className={`text-2xl font-black tracking-tight mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>0 DH</div>
                  </div>
                </div>
                <div className={`mt-3 text-[11px] font-medium flex items-center gap-1 ${
                  isLight ? 'text-slate-500' : 'text-white/80'
                }`}>
                  <span>+0 cette semaine</span>
                </div>
              </div>
            </div>

            {/* MIDDLE ROW: PERFORMANCE MENSUELLE + MOTIVATION & OBJECTIFS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              {/* Left: Performance mensuelle Chart (7 cols) */}
              <div
                className={`lg:col-span-7 border rounded-2xl p-4 sm:p-6 flex flex-col justify-between transition-all ${
                  isLight
                    ? 'bg-white border-slate-200/90 shadow-sm'
                    : 'bg-[#0E131F] border-white/10 shadow-xl'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                  <h3 className={`font-bold text-sm tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>Performance mensuelle</h3>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    {/* Legend */}
                    <div className={`flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                        Candidatures
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                        Réponses
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-500 inline-block"></span>
                        Missions
                      </span>
                    </div>
                    {/* Filter Dropdown */}
                    <select className={`border text-xs rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-700'
                        : 'bg-[#141A28] border-white/10 text-slate-300'
                    }`}>
                      <option>6 derniers mois</option>
                      <option>3 derniers mois</option>
                      <option>Année 2026</option>
                    </select>
                  </div>
                </div>

                {/* SVG Chart Area */}
                <div className="w-full h-44 sm:h-48 relative pt-2 pb-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                    {/* Gridlines */}
                    <line x1="30" y1="20" x2="490" y2="20" stroke={isLight ? '#E2E8F0' : 'rgba(255,255,255,0.06)'} strokeDasharray="4 4" />
                    <line x1="30" y1="50" x2="490" y2="50" stroke={isLight ? '#E2E8F0' : 'rgba(255,255,255,0.06)'} strokeDasharray="4 4" />
                    <line x1="30" y1="80" x2="490" y2="80" stroke={isLight ? '#E2E8F0' : 'rgba(255,255,255,0.06)'} strokeDasharray="4 4" />
                    <line x1="30" y1="110" x2="490" y2="110" stroke={isLight ? '#E2E8F0' : 'rgba(255,255,255,0.06)'} strokeDasharray="4 4" />

                    {/* Y Axis Labels */}
                    <text x="10" y="24" fill={isLight ? '#64748B' : '#98A2B3'} fontSize="10">4</text>
                    <text x="10" y="54" fill={isLight ? '#64748B' : '#98A2B3'} fontSize="10">3</text>
                    <text x="10" y="84" fill={isLight ? '#64748B' : '#98A2B3'} fontSize="10">2</text>
                    <text x="10" y="114" fill={isLight ? '#64748B' : '#98A2B3'} fontSize="10">1</text>
                    <text x="10" y="144" fill={isLight ? '#64748B' : '#98A2B3'} fontSize="10">0</text>

                    {/* Purple Line (Missions = 0) */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      d="M 50 140 L 130 140 L 210 140 L 290 140 L 370 140 L 450 140"
                      fill="none"
                      stroke="#A855F7"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="140" r="3.5" fill="#A855F7" />
                    <circle cx="130" cy="140" r="3.5" fill="#A855F7" />
                    <circle cx="210" cy="140" r="3.5" fill="#A855F7" />
                    <circle cx="290" cy="140" r="3.5" fill="#A855F7" />
                    <circle cx="370" cy="140" r="3.5" fill="#A855F7" />
                    <circle cx="450" cy="140" r="3.5" fill="#A855F7" />

                    {/* Green Line (Réponses = 1) */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                      d="M 50 140 L 130 110 L 210 110 L 290 110 L 370 110 L 450 110"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="140" r="3.5" fill="#10B981" />
                    <circle cx="130" cy="110" r="3.5" fill="#10B981" />
                    <circle cx="210" cy="110" r="3.5" fill="#10B981" />
                    <circle cx="290" cy="110" r="3.5" fill="#10B981" />
                    <circle cx="370" cy="110" r="3.5" fill="#10B981" />
                    <circle cx="450" cy="110" r="3.5" fill="#10B981" />

                    {/* Blue Line (Candidatures = 1 -> 3 -> 1 -> 2 -> 1 -> 1) */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
                      d="M 50 110 L 130 50 L 210 110 L 290 80 L 370 110 L 450 110"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="110" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="130" cy="50" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="210" cy="110" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="290" cy="80" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="370" cy="110" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                    <circle cx="450" cy="110" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* X Axis Month Labels */}
                <div className={`flex justify-between text-xs font-medium pt-3 border-t pl-8 pr-4 ${
                  isLight ? 'text-slate-500 border-slate-100' : 'text-[#98A2B3] border-white/5'
                }`}>
                  <span>Nov.</span>
                  <span>Déc.</span>
                  <span>Jan.</span>
                  <span>Fév.</span>
                  <span>Mars</span>
                  <span>Avr.</span>
                </div>
              </div>

              {/* Right: Motivation freelance & Objectifs du mois (5 cols) */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                {/* Top Card: Motivation phrase slideshow */}
                <div
                  className={`border rounded-2xl p-4 sm:p-5 relative overflow-hidden flex items-center justify-between gap-3 sm:gap-4 min-h-[90px] transition-all ${
                    isLight
                      ? 'bg-gradient-to-br from-emerald-50 via-teal-50/60 to-emerald-50/30 border-emerald-200/80 shadow-sm'
                      : 'bg-gradient-to-br from-[#0C1A14] to-[#0A1510] border-emerald-500/20 shadow-xl'
                  }`}
                >
                  <div className="flex-1 min-w-0 relative py-1 z-10">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={quoteIndex}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                          isLight ? 'text-emerald-950' : 'text-emerald-100/90'
                        }`}
                      >
                        {motivationQuotes[quoteIndex]}
                      </motion.p>
                    </AnimatePresence>
                    
                    {/* Small dot indicators */}
                    <div className="flex items-center gap-1.5 mt-2.5">
                      {motivationQuotes.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            i === quoteIndex
                              ? isLight ? 'w-4 bg-emerald-600' : 'w-4 bg-[#A8E635]'
                              : isLight ? 'w-1 bg-slate-300' : 'w-1 bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sparkline Canvas / SVG */}
                  <div className="w-20 sm:w-24 h-14 sm:h-16 shrink-0 relative flex items-end z-10">
                    <svg className="w-full h-full" viewBox="0 0 100 60">
                      <defs>
                        <linearGradient id="motivationGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={isLight ? "#10B981" : "#A8E635"} stopOpacity="0.4" />
                          <stop offset="100%" stopColor={isLight ? "#10B981" : "#A8E635"} stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 5 50 Q 30 45, 50 35 T 80 20 L 95 10 L 95 60 L 5 60 Z"
                        fill="url(#motivationGrad)"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        d="M 5 50 Q 30 45, 50 35 T 80 20 L 95 10"
                        fill="none"
                        stroke={isLight ? "#059669" : "#A8E635"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="95" cy="10" r="4" fill={isLight ? "#059669" : "#A8E635"} stroke="#FFFFFF" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Card: Objectifs du mois */}
                <div
                  className={`border rounded-2xl p-4 sm:p-5 space-y-4 transition-all ${
                    isLight
                      ? 'bg-white border-slate-200/90 shadow-sm'
                      : 'bg-[#0E131F] border-white/10 shadow-xl'
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 items-center">
                    {/* Goal 1 */}
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                        isLight
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                          : 'bg-emerald-500/10 border-emerald-500/20 text-[#A8E635]'
                      }`}>
                        <Target className="w-4 h-4" />
                      </div>
                      <div>
                        <p className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Objectifs du mois</p>
                        <p className={`text-sm font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>Obtenir 3 missions</p>
                      </div>
                    </div>

                    {/* Progression */}
                    <div className={`pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l sm:pl-4 ${
                      isLight ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      <p className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Progression</p>
                      <p className={`text-lg font-extrabold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>1/3</p>
                      <div className={`w-full h-1.5 rounded-full overflow-hidden mt-1.5 ${
                        isLight ? 'bg-slate-100' : 'bg-slate-800'
                      }`}>
                        <div className="h-full bg-[#A8E635] rounded-full w-1/3"></div>
                      </div>
                    </div>

                    {/* Taux de réponse actuel */}
                    <div className={`pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l sm:pl-4 ${
                      isLight ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      <p className={`text-[11px] font-semibold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Taux de réponse actuel</p>
                      <p className={`text-lg font-extrabold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>100%</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        isLight
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold'
                          : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                      }`}>
                        Excellent
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM ROW: 4 COLUMNS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* Col 1: Dernières consultations */}
              <div
                className={`border rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all ${
                  isLight
                    ? 'bg-white border-slate-200/90 shadow-sm'
                    : 'bg-[#0E131F] border-white/10 shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3.5">
                    <Eye className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-[#A8E635]'}`} />
                    <h3 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>Dernières consultations</h3>
                  </div>

                  <div className={`p-3 sm:p-3.5 rounded-xl border flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2.5 ${
                    isLight
                      ? 'bg-slate-50 border-slate-200/80'
                      : 'bg-[#131926] border-white/10'
                  }`}>
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isLight ? 'bg-emerald-100/70 text-emerald-700' : 'bg-emerald-500/20 text-[#A8E635]'
                      }`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className={`text-xs font-bold line-clamp-2 leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>Refonte plateforme e-commerce B2B</h4>
                        <p className={`text-[11px] mt-0.5 truncate ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Client Atlas Distribution</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border shrink-0 self-start xs:self-auto ${
                      isLight ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold' : 'bg-emerald-500/15 text-[#A8E635] border-emerald-500/30'
                    }`}>
                      Candidature reçue
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('offres')}
                  className={`text-xs font-semibold flex items-center gap-1.5 mt-4 cursor-pointer transition ${
                    isLight ? 'text-emerald-700 hover:text-emerald-800' : 'text-[#A8E635] hover:text-[#b8f045]'
                  }`}
                >
                  <span>Voir toutes les consultations</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Col 2: Contrats */}
              <div
                className={`border rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all ${
                  isLight
                    ? 'bg-white border-slate-200/90 shadow-sm'
                    : 'bg-[#0E131F] border-white/10 shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <Briefcase className={`w-4 h-4 ${isLight ? 'text-slate-600' : 'text-slate-300'}`} />
                      <h3 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>Contrats</h3>
                    </div>
                    <button className={isLight ? 'text-slate-400 hover:text-slate-600 transition' : 'text-slate-500 hover:text-slate-300 transition'}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="py-5 sm:py-6 text-center space-y-2 flex flex-col items-center justify-center">
                    <div className={`w-11 h-11 rounded-full border flex items-center justify-center mb-1 ${
                      isLight ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-white/5 border-white/10 text-slate-400'
                    }`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <p className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>Aucun contrat pour le moment</p>
                    <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Les contrats signés apparaîtront ici.</p>
                  </div>
                </div>
              </div>

              {/* Col 3: Factures */}
              <div
                className={`border rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all ${
                  isLight
                    ? 'bg-white border-slate-200/90 shadow-sm'
                    : 'bg-[#0E131F] border-white/10 shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <Receipt className={`w-4 h-4 ${isLight ? 'text-slate-600' : 'text-slate-300'}`} />
                      <h3 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>Factures</h3>
                    </div>
                    <button className={isLight ? 'text-slate-400 hover:text-slate-600 transition' : 'text-slate-500 hover:text-slate-300 transition'}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="py-5 sm:py-6 text-center space-y-2 flex flex-col items-center justify-center">
                    <div className={`w-11 h-11 rounded-full border flex items-center justify-center mb-1 ${
                      isLight ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-white/5 border-white/10 text-slate-400'
                    }`}>
                      <Receipt className="w-5 h-5" />
                    </div>
                    <p className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>Aucune facture émise</p>
                    <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Vos factures apparaîtront ici.</p>
                  </div>
                </div>
              </div>

              {/* Col 4: Conseil du jour */}
              <div
                className={`border rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all ${
                  isLight
                    ? 'bg-gradient-to-br from-emerald-50 via-teal-50/60 to-emerald-50/30 border-emerald-200/80 shadow-sm'
                    : 'bg-gradient-to-br from-[#0C1A14] to-[#0A1510] border-emerald-500/20 shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isLight ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-500/20 text-[#A8E635]'
                    }`}>
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <h3 className={`font-bold text-sm ${isLight ? 'text-emerald-950' : 'text-white'}`}>Conseil du jour</h3>
                  </div>

                  <p className={`text-xs leading-relaxed mt-2 ${isLight ? 'text-emerald-950 font-medium' : 'text-slate-300'}`}>
                    Répondez dans les 24h pour augmenter vos chances de décrocher une mission.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('offres')}
                  className={`text-xs font-semibold flex items-center gap-1.5 mt-4 cursor-pointer transition ${
                    isLight ? 'text-emerald-700 hover:text-emerald-800 font-bold' : 'text-[#A8E635] hover:text-[#b8f045]'
                  }`}
                >
                  <span>Voir tous les conseils</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'profil' ? (
          <ProfilView key="profil" />
        ) : activeTab === 'offres' ? (
          <OffresView key="offres" userRole="freelance" />
        ) : activeTab === 'contrats' ? (
          <ContratsView key="contrats" userRole="freelance" onNavigateToOffres={() => setActiveTab('offres')} theme={theme} />
        ) : activeTab === 'missions' ? (
          <MissionsView
            key="missions"
            onNavigateToOffres={() => setActiveTab('offres')}
            onNavigateToContrats={() => setActiveTab('contrats')}
          />
        ) : activeTab === 'factures' ? (
          <FacturesView key="factures" />
        ) : null}
        </AnimatePresence>
      </main>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
        isLight={isLight}
      />

      {/* Role Notification Events Popup */}
      <NotificationEventsPopup
        isOpen={isNotifPopupOpen}
        onClose={() => setIsNotifPopupOpen(false)}
        role="freelance"
        onOpenSettings={() => setIsNotifModalOpen(true)}
        theme={theme}
      />

      {/* Role Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={isNotifModalOpen}
        onClose={() => setIsNotifModalOpen(false)}
        initialRole="freelance"
        theme={theme}
      />
    </div>
  );
};

export default FreelanceDashboard;
