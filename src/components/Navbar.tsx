import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, User } from 'lucide-react';
import { UnitGrowthLogo } from './UnitGrowthLogo';

interface NavbarProps {
  onOpenJoin: () => void;
  onOpenDiscover: () => void;
  onOpenLogin: () => void;
  reduceOpacityOnScroll?: boolean;
  minimalMode?: boolean;
  onNavigateHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenJoin, 
  onOpenDiscover, 
  onOpenLogin, 
  reduceOpacityOnScroll = false,
  minimalMode = false,
  onNavigateHome
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isExpanded = minimalMode ? false : (!scrolled || isHovered || mobileMenuOpen);
  
  // Apply opacity reduction if prop is true, we have scrolled, and it's not currently hovered or open
  const shouldReduceOpacity = reduceOpacityOnScroll && scrolled && !isHovered && !mobileMenuOpen;

  const navLinks = [
    { name: 'Concept', href: '#concept' },
    { name: 'Parcours', href: '#parcours' },
    { name: 'Offres', href: '#offres' },
    { name: 'Sécurité', href: '#securite' },
    { name: 'Vivier', href: '#vivier' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        id="main-navbar-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`pointer-events-auto w-full transition-all duration-500 ease-out backdrop-blur-[40px] border border-white/10 shadow-2xl shadow-black/40 ${
          shouldReduceOpacity ? 'opacity-40' : 'opacity-100'
        } ${
          mobileMenuOpen ? 'rounded-3xl bg-[#15181D]/80 max-w-5xl' : 'rounded-full'
        } ${
          isExpanded
            ? 'bg-white/[0.03] py-3 px-6 max-w-5xl border-white/20 shadow-2xl'
            : 'bg-white/[0.02] border-white/15 shadow-lg py-2 px-5 max-w-[320px]'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              if (minimalMode && onNavigateHome) {
                e.preventDefault();
                onNavigateHome();
              }
            }}
            className="flex items-center group shrink-0 transition-transform hover:scale-105 active:scale-95"
          >
            <UnitGrowthLogo variant="stacked" theme="dark" size={isExpanded ? 'md' : 'sm'} />
          </a>

          {/* Desktop Navigation Links - Centered (Expands on scroll/hover) */}
          <nav
            className={`hidden md:flex items-center justify-center transition-all duration-500 ease-out overflow-hidden ${
              isExpanded
                ? 'max-w-[620px] opacity-100 pointer-events-auto scale-100 mx-2 gap-1'
                : 'max-w-0 opacity-0 pointer-events-none scale-95 mx-0'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-sm font-medium text-[#98A2B3] hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {/* Connexion Button */}
            <button
              onClick={onOpenLogin}
              className="w-9 h-9 sm:w-10 sm:h-10 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer shrink-0"
              title="Connexion"
              aria-label="Connexion"
            >
              <User className="w-4 h-4 text-white" />
            </button>

            {/* CTA Button */}
            <button
              onClick={minimalMode && onNavigateHome ? onNavigateHome : onOpenJoin}
              className={`text-sm font-bold bg-[#A8E635] hover:bg-[#98d42c] text-[#101214] rounded-full transition-all duration-500 ease-out shadow-sm hover:shadow-md flex items-center justify-center cursor-pointer whitespace-nowrap h-9 sm:h-10 ${
                isExpanded ? 'px-5 gap-2' : 'w-9 sm:w-10 px-0'
              }`}
              title={minimalMode ? "Retour à l'accueil" : "Découvrir Unitgrowth"}
            >
              <span
                className={`transition-all duration-500 ease-out overflow-hidden flex items-center ${
                  isExpanded ? 'max-w-[200px] opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                Découvrir Unitgrowth
              </span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenLogin}
              className="p-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center"
              title="Connexion"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenJoin}
              className="px-3 py-1.5 text-xs font-bold bg-[#A8E635] text-[#101214] rounded-full"
            >
              Découvrir
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer inside floating container */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 mt-3 border-t border-white/10 space-y-3">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-2.5 text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-center flex items-center justify-center gap-1.5"
              >
                <User className="w-4 h-4" />
                <span>Connexion</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoin();
                }}
                className="w-full py-2.5 text-sm font-bold bg-[#A8E635] text-[#101214] rounded-xl text-center flex items-center justify-center gap-1.5"
              >
                <span>Découvrir Unitgrowth</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
