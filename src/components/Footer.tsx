import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Matter from 'matter-js';
import { UnitGrowthLogo } from './UnitGrowthLogo';
import { FaLinkedinIn, FaXTwitter, FaFacebookF } from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

const PILL_TAGS = [
  'React 18',
  'Next.js',
  'TypeScript',
  'IA & LLMs',
  'Tailwind CSS',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Airtable',
  'Aether Flow',
  'Unitgrowth',
  'IAweb.dev',
];

interface FooterProps {
  onNavigate?: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, view: string) => {
    e.preventDefault();
    if (onNavigate) {
      setTimeout(() => onNavigate(view), 150);
    }
  };

  return (
    <footer className="bg-[#0B0D10] text-[#98A2B3] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16 items-start">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-6">
            <a href="#" className="inline-block transition-transform active:scale-95">
              <UnitGrowthLogo variant="stacked" theme="dark" size="md" />
            </a>
            <p className="text-sm text-[#98A2B3] leading-relaxed">
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

          {/* Column 2: Documents Légaux Part 1 (4 items) */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-6 font-mono">
              DOCUMENTS LÉGAUX
            </h4>
            <ul className="space-y-3.5 text-sm text-[#98A2B3]">
              <li>
                <button onClick={(e) => handleNav(e, 'mentions-legales')} className="hover:text-[#A8E635] active:scale-90 transition-all duration-150 ease-out origin-left inline-block text-left w-full">
                  Mentions légales
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'cgu')} className="hover:text-[#A8E635] active:scale-90 transition-all duration-150 ease-out origin-left inline-block text-left w-full">
                  CGU
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'conditions-missions')} className="hover:text-[#A8E635] active:scale-90 transition-all duration-150 ease-out origin-left inline-block text-left w-full">
                  Conditions de missions freelance
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'politique-confidentialite')} className="hover:text-[#A8E635] active:scale-90 transition-all duration-150 ease-out origin-left inline-block text-left w-full">
                  Politique de confidentialité
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Documents Légaux Part 2 (4 items) */}
          <div>
            <div className="hidden sm:block h-[16px] mb-6" aria-hidden="true" />
            <ul className="space-y-3.5 text-sm text-[#98A2B3]">
              <li>
                <button onClick={(e) => handleNav(e, 'politique-cookies')} className="hover:text-[#A8E635] active:scale-90 transition-all duration-150 ease-out origin-left inline-block text-left w-full">
                  Politique de cookies
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'mentions-interface')} className="hover:text-[#A8E635] active:scale-90 transition-all duration-150 ease-out origin-left inline-block text-left w-full">
                  Mentions interface
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'accord-responsabilite')} className="hover:text-[#A8E635] active:scale-90 transition-all duration-150 ease-out origin-left inline-block text-left w-full">
                  Accord de responsabilité conjointe
                </button>
              </li>
              <li>
                <button onClick={(e) => handleNav(e, 'annexe-traitement')} className="hover:text-[#A8E635] active:scale-90 transition-all duration-150 ease-out origin-left inline-block text-left w-full">
                  Annexe de traitement de données
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Écosystème */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-6 font-mono">
              ÉCOSYSTÈME
            </h4>
            <ul className="space-y-3.5 text-sm text-[#98A2B3]">
              <li>
                <a href="https://iaweb.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-[#A8E635] transition-colors inline-block">Site officiel IAWeb.dev</a>
              </li>
              <li>
                <a href="https://havetdigital.fr/" target="_blank" rel="noopener noreferrer" className="hover:text-[#A8E635] transition-colors inline-block">Site officiel Havet Digital</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/10 text-xs sm:text-sm text-[#98A2B3] font-mono">
          © 2026 UnitGrowth — Fait avec <span className="text-[#A8E635]">♥</span> par <a href="https://iaweb.dev/" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white font-bold">IAWeb.dev</a> & <a href="https://havetdigital.fr/" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white font-bold">Havet Digital</a>. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};
