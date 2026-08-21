import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  Bell,
  Mail,
  FileText,
  FileCheck,
  Briefcase,
  Receipt,
  LogOut,
  Search,
  Settings,
  Sun,
  Moon,
} from 'lucide-react';
import { VivierView } from './VivierView';
import { RelancesDispoView } from './RelancesDispoView';
import { InvitationsVivierView } from './InvitationsVivierView';
import { OffresView } from './OffresView';
import { ContratsView } from './ContratsView';
import { MissionsView } from './MissionsView';
import { FacturesView } from './FacturesView';
import { ResponsableHomeDashboard } from './ResponsableHomeDashboard';
import { UnitGrowthLogo } from './UnitGrowthLogo';
import { GlobalSearchModal } from './GlobalSearchModal';
import { NotificationSettingsModal } from './NotificationSettingsModal';
import { NotificationEventsPopup } from './NotificationEventsPopup';

interface ResponsableDashboardProps {
  onLogout: () => void;
  onSwitchToSuperAdmin?: () => void;
  onSwitchToFreelance?: () => void;
}

export const ResponsableDashboard: React.FC<ResponsableDashboardProps> = ({
  onLogout,
  onSwitchToSuperAdmin,
  onSwitchToFreelance,
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isNotifPopupOpen, setIsNotifPopupOpen] = useState(false);

  // Exact 8 sidebar pages given in the screenshot
  const sidebarNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vivier', label: 'Vivier', icon: Users },
    { id: 'relances', label: 'Relances dispo', icon: Bell },
    { id: 'invitations', label: 'Invitations', icon: Mail },
    { id: 'offres', label: 'Offres', icon: FileText },
    { id: 'contrats', label: 'Contrats', icon: FileCheck },
    { id: 'missions', label: 'Missions', icon: Briefcase },
    { id: 'factures', label: 'Factures', icon: Receipt },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-[#A8E635] selection:text-[#0B0D10] pb-12 transition-colors duration-300 ${theme === 'light' ? 'light-dashboard bg-[#F8FAFC] text-slate-900' : 'bg-[#090B0E] text-white'}`}>
      {/* ================= TOP FLOATING NAVIGATION BAR ================= */}
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
                      layoutId="activeTabIndicatorDesktopResponsable"
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
            {/* Mode Light / Dark Toggle */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-full transition-all border cursor-pointer flex items-center justify-center ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200 shadow-sm'
                  : 'bg-[#12151C] border-white/10 text-white hover:bg-white/10 hover:border-white/20'
              }`}
              title={theme === 'dark' ? 'Basculer en Mode Clair' : 'Basculer en Mode Sombre'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-800" />
              )}
            </button>

            <div className={`hidden sm:flex items-center gap-1 border rounded-full px-2 py-1 ${
              theme === 'light' ? 'bg-slate-100/80 border-slate-200' : 'bg-[#12151C] border-white/10'
            }`}>
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-1.5 transition-colors rounded-full cursor-pointer ${theme === 'light' ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50' : 'text-[#98A2B3] hover:text-white hover:bg-white/5'}`}
                title="Rechercher (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsNotifPopupOpen(true)}
                className={`p-1.5 transition-colors rounded-full cursor-pointer relative ${theme === 'light' ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50' : 'text-[#98A2B3] hover:text-white hover:bg-white/5'}`}
                title="Événements de notification"
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#84cc16]" />
              </button>
            </div>

            {/* Profile Avatar Pill */}
            <div className={`flex items-center gap-2 border rounded-full pl-1.5 pr-3 py-1 shadow-sm ${
              theme === 'light' ? 'bg-slate-100/80 border-slate-200' : 'bg-[#12151C] border-white/10'
            }`}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Responsable"
                  className="w-7 h-7 rounded-full object-cover border border-[#84cc16]"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#84cc16] ring-2 ring-white"></span>
              </div>
              <div className="hidden md:block text-left">
                <div className={`text-[11px] font-extrabold leading-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Yassine E.</div>
                <div className={`text-[9px] font-semibold leading-none ${theme === 'light' ? 'text-emerald-700' : 'text-[#A8E635]'}`}>Responsable Vivier</div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className={`p-2 border rounded-full transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'
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
                    layoutId="activeTabIndicatorMobileResponsable"
                    className="absolute inset-0 bg-[#A8E635] rounded-full shadow-md shadow-[#A8E635]/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-[#0B0D10]' : 'text-[#98A2B3]'}`} />
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
              <InvitationsVivierView onNavigateToVivier={() => setActiveTab('vivier')} />
            ) : activeTab === 'offres' ? (
              <OffresView userRole="responsable" />
            ) : activeTab === 'contrats' ? (
              <ContratsView
                userRole="responsable"
                onNavigateToOffres={() => setActiveTab('offres')}
                onNavigateToVivier={() => setActiveTab('vivier')}
              />
            ) : activeTab === 'missions' ? (
              <MissionsView
                onNavigateToOffres={() => setActiveTab('offres')}
                onNavigateToContrats={() => setActiveTab('contrats')}
                onNavigateToVivier={() => setActiveTab('vivier')}
              />
            ) : activeTab === 'factures' ? (
              <FacturesView userRole="responsable" />
            ) : (
              <ResponsableHomeDashboard onNavigateTab={(tabId) => setActiveTab(tabId)} theme={theme} />
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
        role="manager"
        onOpenSettings={() => setIsNotifModalOpen(true)}
        theme={theme}
      />

      {/* Role Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={isNotifModalOpen}
        onClose={() => setIsNotifModalOpen(false)}
        initialRole="manager"
        theme={theme}
      />
    </div>
  );
};

export default ResponsableDashboard;
