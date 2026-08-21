import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  Sparkles,
  Timer,
  ShieldCheck,
  FileText,
  FileCheck2,
  TrendingUp,
  ArrowDown,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ProcessJourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const frontCardRef = useRef<HTMLDivElement | null>(null);
  const backCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      num: '01',
      title: 'Candidature libre',
      tag: 'INSCRIPTION SIMPLE',
      description:
        'Inscrivez-vous en quelques minutes, sans aucune invitation préalable.',
      icon: Sparkles,
      cardBg:
        'bg-black border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)]',
      accentColor: '#A8E635',
    },
    {
      num: '02',
      title: 'Test IA chronométré',
      tag: 'EVALUATION METIER',
      description:
        'Questions ciblées générées selon votre profil. Score sur 100 sans seuil éliminatoire.',
      icon: Timer,
      cardBg:
        'bg-black border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)]',
      accentColor: '#8B5CF6',
    },
    {
      num: '03',
      title: 'Double validation',
      tag: 'HUMAIN & QUALITÉ',
      description:
        'Examen attentif par le responsable métier puis validation par le super admin.',
      icon: ShieldCheck,
      cardBg:
        'bg-black border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)]',
      accentColor: '#38BDF8',
    },
    {
      num: '04',
      title: 'Consultations ciblées',
      tag: 'MISSIONS REELLES',
      description:
        'Recevez des besoins clients avec périmètre, livrables et forfaits transparents.',
      icon: FileText,
      cardBg:
        'bg-black border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)]',
      accentColor: '#F59E0B',
    },
    {
      num: '05',
      title: 'Contrat & mission',
      tag: 'SIGNATURE EN LIGNE',
      description:
        'Accès sécurisé à l’espace de travail, signature rapide et démarrage immédiat.',
      icon: FileCheck2,
      cardBg:
        'bg-black border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)]',
      accentColor: '#10B981',
    },
    {
      num: '06',
      title: 'Facturation & suivi',
      tag: 'PAIEMENT SÉCURISÉ',
      description:
        'Validation rapide des factures, historique de performance et missions récurrentes.',
      icon: TrendingUp,
      cardBg:
        'bg-black border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)]',
      accentColor: '#EC4899',
    },
  ];

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const stickyCardCount = 6;
    const cardFlipTiltAngles = [-12, -8, -4, 4, 8, 12];
    const cardDismissTiltAngles = [-45, -35, -25, 25, 35, 45];

    const totalScrollSvh = 300 + stickyCardCount * 100; // 900 svh
    const totalScrollPx = window.innerHeight * (totalScrollSvh / 100);

    let isFlipped = false;

    // Set initial positions via GSAP
    if (frontCardRef.current) {
      gsap.set(frontCardRef.current, {
        xPercent: -50,
        yPercent: 50,
        rotationY: 0,
        rotationZ: 0,
      });
    }

    backCardRefs.current.forEach((card) => {
      if (card) {
        gsap.set(card, {
          xPercent: -50,
          yPercent: 50,
          rotationY: -180,
          rotationZ: 0,
        });
      }
    });

    const revealBackCards = () => {
      if (frontCardRef.current) {
        gsap.to(frontCardRef.current, {
          rotationY: 180,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        });
      }
      backCardRefs.current.forEach((card, i) => {
        if (card) {
          gsap.to(card, {
            rotationY: 0,
            rotationZ: cardFlipTiltAngles[i],
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
          });
        }
      });
    };

    const concealBackCards = () => {
      if (frontCardRef.current) {
        gsap.to(frontCardRef.current, {
          rotationY: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
        });
      }
      backCardRefs.current.forEach((card) => {
        if (card) {
          gsap.to(card, {
            rotationY: -180,
            rotationZ: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
          });
        }
      });
    };

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${totalScrollPx}px`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // 1. Enter phase (0..100 svh mapped to progress)
        const enterEndProgress = 100 / totalScrollSvh;
        const enterProgress = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0, enterEndProgress, 0, 1, progress)
        );

        const currentY = gsap.utils.mapRange(0, 1, 50, -50, enterProgress);
        if (frontCardRef.current) {
          gsap.set(frontCardRef.current, { yPercent: currentY });
        }
        backCardRefs.current.forEach((card) => {
          if (card) {
            gsap.set(card, { yPercent: currentY });
          }
        });

        if (headlineRef.current) {
          const headlineY = gsap.utils.mapRange(0, 1, 0, -100, enterProgress);
          const headlineOpacity = gsap.utils.mapRange(0, 1, 1, 0, enterProgress);
          gsap.set(headlineRef.current, {
            yPercent: headlineY,
            opacity: headlineOpacity,
          });
        }

        // 2. Flip trigger (at 200 svh)
        const flipTriggerProgress = 200 / totalScrollSvh;
        if (progress > flipTriggerProgress && !isFlipped) {
          isFlipped = true;
          revealBackCards();
        } else if (progress <= flipTriggerProgress && isFlipped) {
          isFlipped = false;
          concealBackCards();
        }

        // 3. Dismiss phase (300 svh onwards, order card 1 -> 6)
        backCardRefs.current.forEach((card, i) => {
          if (!card) return;
          const dismissOrder = i; // Card 1 (i=0) dismisses first, then 2, 3, 4, 5, 6
          const dismissStart = (300 + dismissOrder * 100) / totalScrollSvh;
          const dismissEnd = (300 + (dismissOrder + 1) * 100) / totalScrollSvh;

          const dismissProgress = gsap.utils.clamp(
            0,
            1,
            gsap.utils.mapRange(dismissStart, dismissEnd, 0, 1, progress)
          );

          if (dismissProgress > 0) {
            const cardY = gsap.utils.mapRange(0, 1, -50, -250, dismissProgress);
            const cardRotZ = gsap.utils.mapRange(
              0,
              1,
              cardFlipTiltAngles[i],
              cardDismissTiltAngles[i],
              dismissProgress
            );
            gsap.set(card, { yPercent: cardY, rotationZ: cardRotZ });
          }
        });
      },
    });

    return () => {
      st.kill();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <section
      id="parcours"
      ref={sectionRef}
      className="relative w-full h-[100svh] bg-[#0B0D10] overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A8E635]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Headline Header */}
      <div
        ref={headlineRef}
        className="absolute top-12 sm:top-16 left-0 right-0 z-20 text-center px-4 max-w-4xl mx-auto pointer-events-none"
      >
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Un parcours transparent, de bout en bout
        </h2>
      </div>

      {/* 3D Stack Container */}
      <div
        className="absolute inset-0 w-full h-[100svh] overflow-hidden"
        style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
      >
        {/* FRONT CARD */}
        <div
          ref={frontCardRef}
          className="absolute top-1/2 left-1/2 w-[78%] max-w-[290px] sm:w-[88%] sm:max-w-[420px] aspect-[4/5] p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-black border-2 border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between items-center text-center z-10"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            willChange: 'transform',
          }}
        >
          <div className="w-full flex justify-between items-center">
            <span className="text-[10px] sm:text-xs font-mono uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#A8E635]/20 text-[#A8E635] border border-[#A8E635]/30 font-bold">
              VIVIER FREELANCE
            </span>
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-[#A8E635]" />
          </div>

          <div className="my-auto py-2 sm:py-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#A8E635]/10 border border-[#A8E635]/30 text-[#A8E635] flex items-center justify-center mx-auto mb-3 sm:mb-6 shadow-[0_0_20px_rgba(168,230,53,0.2)]">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-1.5 sm:mb-3 tracking-tight">
              6 Étapes Clés
            </h3>
            <p className="text-xs sm:text-base text-[#98A2B3] leading-relaxed">
              Un parcours fluide et sécurisé pour décrocher et exécuter vos missions.
            </p>
          </div>

          <div className="w-full py-2 sm:py-2.5 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 text-[10px] sm:text-xs font-mono text-[#98A2B3] flex items-center justify-center gap-1.5 sm:gap-2">
            <span>Scrollez pour retourner la carte</span>
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A8E635] animate-bounce" />
          </div>
        </div>

        {/* 6 BACK CARDS */}
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              ref={(el) => {
                backCardRefs.current[idx] = el;
              }}
              className={`absolute top-1/2 left-1/2 w-[78%] max-w-[290px] sm:w-[88%] sm:max-w-[420px] aspect-[4/5] p-4 sm:p-8 rounded-2xl sm:rounded-3xl border-2 flex flex-col justify-between items-center text-center transition-colors ${step.cardBg}`}
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                willChange: 'transform',
                zIndex: steps.length - idx,
              }}
            >
              {/* Card Header */}
              <div className="w-full flex justify-between items-center">
                <span
                  className="text-[10px] sm:text-xs font-mono uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border font-bold"
                  style={{
                    color: step.accentColor,
                    backgroundColor: `${step.accentColor}20`,
                    borderColor: `${step.accentColor}40`,
                  }}
                >
                  {step.tag}
                </span>
                <span
                  className="text-lg sm:text-2xl font-mono font-black opacity-40"
                  style={{ color: step.accentColor }}
                >
                  {step.num}
                </span>
              </div>

              {/* Card Body */}
              <div className="my-auto py-1.5 sm:py-2">
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl border flex items-center justify-center mx-auto mb-3 sm:mb-5 shadow-lg"
                  style={{
                    color: step.accentColor,
                    backgroundColor: `${step.accentColor}15`,
                    borderColor: `${step.accentColor}30`,
                  }}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-1.5 sm:mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-base text-[#98A2B3] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="w-full py-2 sm:py-2.5 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 text-[10px] sm:text-xs font-mono text-white/50 flex items-center justify-center gap-2">
                <span>Étape {step.num} sur 06</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
