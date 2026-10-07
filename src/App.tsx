import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import AetherFlowHero from './components/ui/aether-flow-hero';
import { TechLogosBar } from './components/TechLogosBar';
import { PromiseSection } from './components/PromiseSection';
import { ProcessJourneySection } from './components/ProcessJourneySection';
import { MissionsSection } from './components/MissionsSection';
import { SecurityTrustSection } from './components/SecurityTrustSection';
import { TalentPoolSection } from './components/TalentPoolSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { JoinModal } from './components/JoinModal';
import { DiscoverModal } from './components/DiscoverModal';
import { LoginPage } from './components/LoginPage';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { ResponsableDashboard } from './components/ResponsableDashboard';
import { FreelanceDashboard } from './components/FreelanceDashboard';
import { FluidSplashCursor } from './components/FluidSplashCursor';
import { MentionsLegales } from './components/MentionsLegales';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'dashboard-admin' | 'dashboard-responsable' | 'dashboard-freelance' | 'mentions-legales'>('home');
  const [activeRole, setActiveRole] = useState<string>('Super administrateur');
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [discoverModalOpen, setDiscoverModalOpen] = useState(false);

  const handleNavigateToDashboard = (role: string) => {
    setActiveRole(role);
    if (role.toLowerCase().includes('freelance')) {
      setCurrentView('dashboard-freelance');
    } else if (role.toLowerCase().includes('responsable')) {
      setCurrentView('dashboard-responsable');
    } else {
      setCurrentView('dashboard-admin');
    }
  };

  const isDashboard = currentView === 'dashboard-admin' || currentView === 'dashboard-responsable' || currentView === 'dashboard-freelance';
  const isMentionsLegales = currentView === 'mentions-legales';

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F8FAFC] font-sans antialiased selection:bg-white selection:text-[#101214]">
      {/* Full-Page WebGL Fluid Splash Overlay Cursor */}
      <FluidSplashCursor />

      {/* Sticky Navbar (Only shown on non-dashboard pages) */}
      {!isDashboard && (
        <Navbar
          onOpenJoin={() => setJoinModalOpen(true)}
          onOpenDiscover={() => setDiscoverModalOpen(true)}
          onOpenLogin={() => setCurrentView('login')}
          reduceOpacityOnScroll={isMentionsLegales}
          minimalMode={isMentionsLegales}
          onNavigateHome={() => setCurrentView('home')}
        />
      )}

      {currentView === 'dashboard-freelance' ? (
        <FreelanceDashboard
          onLogout={() => setCurrentView('login')}
          onSwitchToSuperAdmin={() => setCurrentView('dashboard-admin')}
          onSwitchToResponsable={() => setCurrentView('dashboard-responsable')}
        />
      ) : currentView === 'dashboard-responsable' ? (
        <ResponsableDashboard
          onLogout={() => setCurrentView('login')}
          onSwitchToSuperAdmin={() => setCurrentView('dashboard-admin')}
          onSwitchToFreelance={() => setCurrentView('dashboard-freelance')}
        />
      ) : currentView === 'dashboard-admin' ? (
        <SuperAdminDashboard
          onLogout={() => setCurrentView('login')}
          onSwitchToResponsable={() => setCurrentView('dashboard-responsable')}
          onSwitchToFreelance={() => setCurrentView('dashboard-freelance')}
        />
      ) : currentView === 'login' ? (
        <LoginPage
          onBack={() => setCurrentView('home')}
          onNavigateToDashboard={handleNavigateToDashboard}
        />
      ) : currentView === 'mentions-legales' ? (
        <>
          <MentionsLegales onBack={() => setCurrentView('home')} />
          <Footer onOpenMentions={() => setCurrentView('mentions-legales')} />
        </>
      ) : (
        <>
          {/* Main Sections Hierarchy */}
          <main>
            {/* Aether Flow Interactive Dynamic Canvas Hero Section */}
            <AetherFlowHero />

            {/* Tech Logos Loop Bar */}
            <TechLogosBar />

            {/* 04: Promesse Unitgrowth */}
            <PromiseSection />

            {/* Parcours transparent de bout en bout */}
            <ProcessJourneySection />

            {/* Offres du moment / Missions réelles */}
            <MissionsSection onOpenJoin={() => setJoinModalOpen(true)} />

            {/* Environnement de confiance / Sécurité */}
            <SecurityTrustSection />

            {/* Ils font partie du vivier / Freelances */}
            <TalentPoolSection />

            {/* Questions fréquentes / FAQ */}
            <FaqSection />
          </main>

          {/* Footer */}
          <Footer onOpenMentions={() => setCurrentView('mentions-legales')} />
        </>
      )}

      {/* Modals */}
      <JoinModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
      />

      <DiscoverModal
        isOpen={discoverModalOpen}
        onClose={() => setDiscoverModalOpen(false)}
        onOpenJoin={() => setJoinModalOpen(true)}
      />
    </div>
  );
}
