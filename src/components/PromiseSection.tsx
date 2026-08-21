import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Code, Bot, Layers, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const PromiseSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      id: 'fullstack',
      title: 'Développement full stack',
      subtitle: 'Architecture, Web & Mobile',
      description:
        'Conception d’applications robustes, API sur mesure et interfaces ultra-performantes avec React, Node.js, Next.js et Python.',
      details: ['React / Next.js & Node.js', 'Architectures Scalables', 'Code Review & Tests'],
      icon: Code,
      bg: 'bg-[#15181D]',
      borderColor: 'border-white/10',
      accentTag: 'text-white bg-white/10 border border-white/20',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'ai',
      title: 'IA & automatisation',
      subtitle: 'Agents, LLM & Workflows',
      description:
        'Intégration d’IA génératives, pipelines RAG, agents autonomes et automatisation avancée des processus métier.',
      details: ['Agents IA & LLM (Gemini, OpenAI)', 'Workflows n8n / Make', 'Pipelines de données & RAG'],
      icon: Bot,
      bg: 'bg-[#181C24]',
      borderColor: 'border-[#6C55F5]/30',
      accentTag: 'text-white bg-white/10 border border-white/20',
      image: 'https://appian.com/adobe/dynamicmedia/deliver/dm-aid--8f25364d-62da-44d9-afb2-05b4aa53d5a2/blog-artificial-intelligence-11.png?quality=85&width=1200&preferwebp=true',
    },
    {
      id: 'nocode',
      title: 'No-code',
      subtitle: 'Webflow, Bubble & FlutterFlow',
      description:
        'Déploiement rapide de plateformes web et mobiles complexes avec les meilleurs outils visual-development du marché.',
      details: ['Bubble & Webflow experts', 'Intégration API & DB', 'Prototypage & MVP rapide'],
      icon: Layers,
      bg: 'bg-[#1C221D]',
      borderColor: 'border-[#32D583]/30',
      accentTag: 'text-white bg-white/10 border border-white/20',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'marketing',
      title: 'Marketing digital',
      subtitle: 'Growth, SEO & Data Analytics',
      description:
        'Stratégies d\'acquisition, optimisation du taux de conversion (CRO), référencement et analytics de haut niveau.',
      details: ['Growth Hacking & SEO', 'Analytics & Attribution', 'Optimisation Conversion (CRO)'],
      icon: TrendingUp,
      bg: 'bg-[#1E2519]',
      borderColor: 'border-[#A8E635]/40 shadow-[0_0_40px_rgba(168,230,53,0.12)]',
      accentTag: 'text-white bg-white/10 border border-white/20',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  useEffect(() => {
    // Lenis smooth scroll setup tied to GSAP ScrollTrigger
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 1) Intro text disappears smoothly as soon as scrolling starts in section
    if (introRef.current && containerRef.current) {
      gsap.to(introRef.current, {
        opacity: 0,
        y: -40,
        scale: 0.95,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 20%',
          end: 'top -5%',
          scrub: true,
        },
      });
    }

    // 2) Cards smooth scroll into screen center and stack elegantly
    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);

    if (cards.length > 0 && outroRef.current) {
      cards.forEach((card, index) => {
        const cardInner = card.querySelector('.card-inner');

        // Pin each card smoothly at top 18% (center viewport offset)
        ScrollTrigger.create({
          trigger: card,
          start: 'top 18%',
          endTrigger: outroRef.current,
          end: 'top 70%',
          pin: true,
          pinSpacing: false,
        });

        // Scale & dim previous card as next card overlays it
        if (cardInner && index < cards.length - 1) {
          gsap.to(cardInner, {
            scale: 0.93,
            opacity: 0.35,
            y: -15,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: cards[index + 1],
              start: 'top 65%',
              end: 'top 20%',
              scrub: true,
            },
          });
        }
      });
    }

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="concept" ref={containerRef} className="relative bg-[#0B0D10] text-white overflow-hidden py-16 sm:py-24 border-y border-white/10">
      {/* Intro Section - Pinned on scroll */}
      <div ref={introRef} className="intro z-20 max-w-4xl mx-auto text-center px-4 mb-16 sm:mb-20">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-4">
          Votre expertise a sa place dans le vivier
        </h2>
        <p className="text-base sm:text-lg text-[#98A2B3] max-w-2xl mx-auto leading-relaxed">
          10 à 30 profils mobilisables par famille. Choisissez la vôtre et lancez votre candidature — aucune connexion requise pour commencer.
        </p>
      </div>

      {/* Cards Container */}
      <div className="cards max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12 sm:space-y-16">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="card relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center"
            >
              <div
                className={`card-inner will-change-transform w-full p-6 sm:p-10 md:p-12 rounded-3xl border ${step.borderColor} ${step.bg} shadow-2xl backdrop-blur-xl flex flex-col md:flex-row gap-8 items-stretch justify-between transition-shadow duration-300`}
              >
                {/* Content */}
                <div className="card-content flex-1 md:flex-[3] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#0B0D10] text-[#A8E635] flex items-center justify-center border border-white/10">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                      {step.title}
                    </h3>
                    
                    <div className={`text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4 ${step.accentTag}`}>
                      {step.subtitle}
                    </div>

                    <p className="text-sm sm:text-base text-[#98A2B3] leading-relaxed mb-6">
                      {step.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {step.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-[#A8E635] shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white font-semibold">
                    <span>Processus qualitatif et sécurisé</span>
                    <ArrowRight className="w-4 h-4 text-[#A8E635]" />
                  </div>
                </div>

                {/* Image Column */}
                <div className="card-img hidden sm:block flex-1 md:flex-[2] aspect-[16/9] md:aspect-auto rounded-2xl overflow-hidden border border-white/10 relative group">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Outro Section */}
      <div ref={outroRef} className="outro py-24 sm:py-32 text-center max-w-3xl mx-auto px-4 relative z-20">
        <h3 className="text-2xl sm:text-4xl font-bold text-white mb-4">
          Un processus fluide de l'admission à la mission
        </h3>
        <p className="text-[#98A2B3] text-sm sm:text-base mb-8">
          Rejoignez un écosystème où chaque mission est cadrée, financée et prête à être exécutée.
        </p>
        <button
          onClick={() => {
            const joinBtn = document.querySelector('button[data-join-modal]');
            if (joinBtn instanceof HTMLElement) joinBtn.click();
          }}
          className="px-8 py-4 bg-[#A8E635] text-[#101214] font-bold rounded-xl shadow-lg hover:bg-[#b8f047] transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          Rejoindre le vivier
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

