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
          {/* Column 1: Brand & Tagline & CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#" className="inline-block transition-transform active:scale-95">
              <UnitGrowthLogo variant="stacked" theme="dark" size="md" />
            </a>
            <p className="text-sm text-[#98A2B3] leading-relaxed max-w-sm">
              UnitGrowth est la plateforme dédiée<br />
              aux freelances participant à la production<br />
              des projets d'IAWeb.dev et Havet Digital.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-[#A8E635] hover:border-[#A8E635] transition-colors">
                <FaLinkedinIn size={15} />
              </a>
              <a href="#" className="w-9 h-9 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-[#A8E635] hover:border-[#A8E635] transition-colors">
                <FaXTwitter size={15} />
              </a>
              <a href="#" className="w-9 h-9 shrink-0 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-[#A8E635] hover:border-[#A8E635] transition-colors">
                <FaFacebookF size={15} />
              </a>
              <button
                onClick={onOpenJoin}
                className="ml-1 sm:ml-2 px-5 h-9 bg-white text-[#101214] border border-white hover:bg-[#A8E635] hover:border-[#A8E635] hover:text-[#101214] text-xs font-bold rounded-full transition-colors inline-flex items-center justify-center gap-2 group cursor-pointer shrink-0"
              >
                <span>Découvrir Unitgrowth</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>



          {/* Column 2: Documents Légaux (7 cols) */}
          <div className="lg:col-span-7">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-5 font-mono">
              DOCUMENTS LÉGAUX
            </h4>
            <div className="flex flex-col sm:grid sm:grid-cols-3 gap-x-4 gap-y-4 text-sm text-[#98A2B3]">
              {/* Column 1 */}
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
              </ul>
              {/* Column 2 */}
              <ul className="space-y-4">
                <li>
                  <button onClick={(e) => handleNav(e, 'politique-confidentialite')} className="hover:text-[#A8E635] active:scale-95 transition-all duration-150 ease-out origin-left inline-block text-left w-full break-words">
                    Politique de confidentialité
                  </button>
                </li>
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
              </ul>
              {/* Column 3 */}
              <ul className="space-y-4">
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


        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/10 text-xs sm:text-sm text-[#98A2B3] font-mono text-center mb-6">
          © 2026 UnitGrowth — Fait avec <span className="text-[#A8E635]">♥</span> par <a href="https://iaweb.dev/" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 decoration-white/40 hover:text-[#A8E635] hover:decoration-[#A8E635] transition-colors font-bold">IAWeb.dev</a> & <a href="https://havetdigital.fr/" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 decoration-white/40 hover:text-[#A8E635] hover:decoration-[#A8E635] transition-colors font-bold">Havet Digital</a>. Tous droits réservés.
        </div>
      </div>
    </BeamWordmarkWrapper>
  );
};

