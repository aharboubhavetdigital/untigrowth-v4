import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

interface TalentItem {
  tempId: number;
  id: string;
  quote: string;
  initials: string;
  name: string;
  roleLocation: string;
  avatarBg: string;
}

const initialTalents: TalentItem[] = [
  {
    tempId: 0,
    id: 'salma',
    quote:
      'Je ne cherche plus de clients : les consultations arrivent avec un vrai cahier des charges, je réponds avec mon tarif, et tout est contractualisé proprement.',
    initials: 'SB',
    name: 'Salma B.',
    roleLocation: 'Full stack · Maroc',
    avatarBg: 'bg-white/10 border border-white/20 text-white',
  },
  {
    tempId: 1,
    id: 'hery',
    quote:
      "Le test IA m'a pris dix minutes et mon score a parlé pour moi. Deux semaines après ma validation, je démarrais ma première mission.",
    initials: 'HR',
    name: 'Hery R.',
    roleLocation: 'IA & automatisation · Madagascar',
    avatarBg: 'bg-white/10 border border-white/20 text-white',
  },
  {
    tempId: 2,
    id: 'rania',
    quote:
      'La facturation à double validation rassure tout le monde. Mon historique de missions me ramène des consultations sans rien demander.',
    initials: 'RS',
    name: 'Rania S.',
    roleLocation: 'Marketing digital · Maroc',
    avatarBg: 'bg-white/10 border border-white/20 text-white',
  },
  {
    tempId: 3,
    id: 'youssef',
    quote:
      'Les projets sont déjà pré-qualifiés avec un cadrage technique précis. On évite 90% des réunions d’avant-vente inutiles.',
    initials: 'YM',
    name: 'Youssef M.',
    roleLocation: 'Data Engineer · Maroc',
    avatarBg: 'bg-white/10 border border-white/20 text-white',
  },
  {
    tempId: 4,
    id: 'fara',
    quote:
      'Grâce à Unitgrowth, je travaille sur des produits ambitieux depuis Antananarivo avec une rémunération à la hauteur de mes compétences.',
    initials: 'FT',
    name: 'Fara T.',
    roleLocation: 'UX/UI Designer · Madagascar',
    avatarBg: 'bg-white/10 border border-white/20 text-white',
  },
  {
    tempId: 5,
    id: 'karim',
    quote:
      'Plateforme ultra fluide : la contractualisation est automatique et le paiement sous séquestre est libéré à chaque jalon validé.',
    initials: 'KK',
    name: 'Karim K.',
    roleLocation: 'DevOps & Cloud · Maroc',
    avatarBg: 'bg-white/10 border border-white/20 text-white',
  },
  {
    tempId: 6,
    id: 'ando',
    quote:
      'Le matching automatique me propose des missions parfaitement alignées sur mes technologies sans perte de temps.',
    initials: 'AN',
    name: 'Ando N.',
    roleLocation: 'Python & Scraping · Madagascar',
    avatarBg: 'bg-white/10 border border-white/20 text-white',
  },
];

interface TalentCardProps {
  position: number;
  talent: TalentItem;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TalentCard: React.FC<TalentCardProps> = ({
  position,
  talent,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        'absolute left-1/2 top-1/2 cursor-pointer p-6 sm:p-8 transition-all duration-500 ease-out flex flex-col justify-between select-none',
        isCenter
          ? 'z-20 bg-[#15181D] text-white border-2 border-white shadow-[0_20px_50px_rgba(255,255,255,0.1)] scale-100 opacity-100'
          : 'z-0 bg-[#13161C]/90 text-white/70 border-2 border-white/10 hover:border-white/30 hover:text-white scale-95 opacity-80'
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.35) * position}px)
          translateY(${isCenter ? -35 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
      }}
    >
      {/* Decorative Corner Slash */}
      <span
        className="absolute block origin-top-right rotate-45 bg-white/20"
        style={{
          right: -2,
          top: 38,
          width: SQRT_5000,
          height: 2,
        }}
      />

      {/* Top Header: Quote Icon & Badge */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Quote className={cn('w-7 h-7 rotate-180', isCenter ? 'text-white' : 'text-white/40')} />
          {isCenter && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-[#101214] bg-white px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-[#101214]" /> VERIFIED TALENT
            </span>
          )}
        </div>

        {/* Quote */}
        <p className={cn(
          'text-xs sm:text-sm md:text-base font-medium leading-relaxed italic',
          isCenter ? 'text-white' : 'text-white/80'
        )}>
          "{talent.quote}"
        </p>
      </div>

      {/* Footer: Avatar + Name + Role */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-auto">
        <div
          className={cn(
            'w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm text-white shrink-0 shadow-md',
            talent.avatarBg
          )}
        >
          {talent.initials}
        </div>
        <div className="overflow-hidden">
          <h4 className={cn('text-sm font-bold truncate', isCenter ? 'text-white' : 'text-white/90')}>
            {talent.name}
          </h4>
          <p className="text-xs text-[#98A2B3] truncate">{talent.roleLocation}</p>
        </div>
      </div>
    </div>
  );
};

export const TalentPoolSection: React.FC = () => {
  const [cardSize, setCardSize] = useState(380);
  const [talentsList, setTalentsList] = useState<TalentItem[]>(initialTalents);
  const [isPaused, setIsPaused] = useState(false);

  const handleMove = (steps: number) => {
    if (steps === 0) return;
    const newList = [...talentsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTalentsList(newList);
  };

  // Fast Auto-Animation interval (every 2.5s) unless paused on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleMove(1);
    }, 2500);

    return () => clearInterval(timer);
  }, [isPaused, talentsList]);

  // Responsive card dimensions
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setCardSize(290);
      } else if (window.innerWidth < 1024) {
        setCardSize(340);
      } else {
        setCardSize(380);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <section id="vivier" className="py-20 sm:py-28 bg-[#0B0D10] border-t border-white/10 text-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-mono font-bold tracking-widest text-white uppercase mb-3 sm:mb-4">
            ILS FONT PARTIE DU VIVIER
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Des freelances qui travaillent, pas qui prospectent
          </h2>
        </div>

        {/* Staggered Cards Stage Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full overflow-hidden flex justify-center items-center"
          style={{ height: cardSize + 160 }}
        >
          {talentsList.map((talent, index) => {
            const position =
              talentsList.length % 2
                ? index - Math.floor(talentsList.length / 2)
                : index - Math.floor(talentsList.length / 2);

            return (
              <TalentCard
                key={talent.tempId}
                talent={talent}
                handleMove={handleMove}
                position={position}
                cardSize={cardSize}
              />
            );
          })}

          {/* Navigation Controls */}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-3 z-30">
            <button
              onClick={() => handleMove(-1)}
              className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-xl transition-all duration-200 rounded-full bg-[#13161C] border-2 border-white/20 text-white hover:bg-white hover:text-[#101214] hover:border-white shadow-lg cursor-pointer"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleMove(1)}
              className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center text-xl transition-all duration-200 rounded-full bg-[#13161C] border-2 border-white/20 text-white hover:bg-white hover:text-[#101214] hover:border-white shadow-lg cursor-pointer"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentPoolSection;
