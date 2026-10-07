import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { UnitGrowthLogo } from './UnitGrowthLogo';
import { FaLinkedinIn, FaXTwitter, FaFacebookF } from 'react-icons/fa6';
import BeamWordmarkWrapper from './ui/beam-wordmark-footer';

interface FooterProps {
  onNavigate?: (view: string) => void;
  onOpenJoin?: () => void;
  onOpenLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenJoin }) => {
  const handleNav = (e: React.MouseEvent, view: string) => {
    e.preventDefault();
    if (onNavigate) {
      setTimeout(() => onNavigate(view), 150);
    }
  };

  const handleNavSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = sectionId;
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <BeamWordmarkWrapper
      wordmark="UNITGROWTH"
      background="#0B0D10"
      accent="#A8E635"
      wordTop="#A8E635"
      wordFoot="#121b06"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4">
        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-12 gap-12 sm:gap-8 mb-12 sm:items-start">
          {/* Column 1: Brand & Tagline (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <a href="#" className="inline-block transition-transform active:scale-95">
              <UnitGrowthLogo variant="stacked" theme="dark" size="md" />
            </a>
            <p className="text-sm text-[#98A2B3] leading-relaxed max-w-sm">
              UnitGrowth est la plateforme dédiée aux freelances participant à la production des projets d'IAWeb.dev et Havet Digital.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-[#A8E635] hover:border-[#A8E635] transition-colors">
                <FaLinkedinIn size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-[#A8E635] hover:border-[#A8E635] transition-colors">
                <FaXTwitter size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-[#A8E635] hover:border-[#A8E635] transition-colors">
                <FaFacebookF size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-5 font-mono">
              NAVIGATION
            </h4>
            <ul className="space-y-4 text-sm text-[#98A2B3]">
              <li>
                <a href="#concept" onClick={(e) => handleNavSection(e, 'concept')} className="hover:text-[#A8E635] transition-colors inline-block">Concept</a>
              </li>
              <li>
                <a href="#parcours" onClick={(e) => handleNavSection(e, 'parcours')} className="hover:text-[#A8E635] transition-colors inline-block">Parcours</a>
              </li>
              <li>
                <a href="#offres" onClick={(e) => handleNavSection(e, 'offres')} className="hover:text-[#A8E635] transition-colors inline-block">Offres</a>
              </li>
              <li>
                <a href="#securite" onClick={(e) => handleNavSection(e, 'securite')} className="hover:text-[#A8E635] transition-colors inline-block">Sécurité</a>
              </li>
              <li>
                <a href="#vivier" onClick={(e) => handleNavSection(e, 'vivier')} className="hover:text-[#A8E635] transition-colors inline-block">Vivier</a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleNavSection(e, 'faq')} className="hover:text-[#A8E635] transition-colors inline-block">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Documents Légaux (4 cols with 2 sub-columns) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-5 font-mono">
              DOCUMENTS LÉGAUX
            </h4>
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-x-4 gap-y-4 text-sm text-[#98A2B3]">
              <ul className="space-y-4">
                <li>
                  <button onClick={(e) => handleNav(e, 'mentions-legales')} className="hover:text-[#A8E635] active:scale-95 transition-all duration-150 ease-out origin-left inline-block text-left w-full break-words">
                    Mentions légales
                  </button>
                </li>
                <li>
                  <button onClick={(e) => handleNav(e, 'cgu')} className="hover:text-[#A8E635] active:scale-95 transition-all duration-150 ease-out origin-left inline-block text-left w-full break-words">
                    CGU
                  </button>
                </li>
                <li>
                  <button onClick={(e) => handleNav(e, 'conditions-missions')} className="hover:text-[#A8E635] active:scale-95 transition-all duration-150 ease-out origin-left inline-block text-left w-full break-words">
                    Conditions de missions freelance
                  </button>
                </li>
                <li>
                  <button onClick={(e) => handleNav(e, 'politique-confidentialite')} className="hover:text-[#A8E635] active:scale-95 transition-all duration-150 ease-out origin-left inline-block text-left w-full break-words">
                    Politique de confidentialité
                  </button>
                </li>
              </ul>
              <ul className="space-y-4">
                <li>
                  <button onClick={(e) => handleNav(e, 'politique-cookies')} className="hover:text-[#A8E635] active:scale-95 transition-all duration-150 ease-out origin-left inline-block text-left w-full break-words">
                    Politique de cookies
                  </button>
                </li>
                <li>
                  <button onClick={(e) => handleNav(e, 'mentions-interface')} className="hover:text-[#A8E635] active:scale-95 transition-all duration-150 ease-out origin-left inline-block text-left w-full break-words">
                    Mentions interface
                  </button>
                </li>
                <li>
                  <button onClick={(e) => handleNav(e, 'accord-responsabilite')} className="hover:text-[#A8E635] active:scale-95 transition-all duration-150 ease-out origin-left inline-block text-left w-full break-words">
                    Accord de responsabilité conjointe
                  </button>
                </li>
                <li>
                  <button onClick={(e) => handleNav(e, 'annexe-traitement')} className="hover:text-[#A8E635] active:scale-95 transition-all duration-150 ease-out origin-left inline-block text-left w-full break-words">
                    Annexe de traitement de données
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Écosystème + CTA (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-6 font-mono">
              ÉCOSYSTÈME
            </h4>
            <ul className="space-y-3.5 text-sm text-[#98A2B3] mb-6">
              <li>
                <a href="https://iaweb.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-[#A8E635] transition-colors inline-block">Site officiel IAWeb.dev</a>
              </li>
              <li>
                <a href="https://havetdigital.fr/" target="_blank" rel="noopener noreferrer" className="hover:text-[#A8E635] transition-colors inline-block">Site officiel Havet Digital</a>
              </li>
            </ul>

            <div className="pt-1">
              <button
                onClick={onOpenJoin}
                className="px-5 py-2.5 bg-white hover:bg-[#A8E635] text-[#101214] text-xs font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Découvrir Unitgrowth</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/10 text-xs sm:text-sm text-[#98A2B3] font-mono text-center mb-6">
          © 2026 UnitGrowth — Fait avec <span className="text-[#A8E635]">♥</span> par <a href="https://iaweb.dev/" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 decoration-white/40 hover:text-[#A8E635] hover:decoration-[#A8E635] transition-colors font-bold">IAWeb.dev</a> & <a href="https://havetdigital.fr/" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 decoration-white/40 hover:text-[#A8E635] hover:decoration-[#A8E635] transition-colors font-bold">Havet Digital</a>. Tous droits réservés.
        </div>
      </div>
    </BeamWordmarkWrapper>
  );
};

