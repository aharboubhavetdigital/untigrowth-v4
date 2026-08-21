import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Fingerprint, Key, ShieldCheck, ScrollText } from 'lucide-react';

interface SecurityCardData {
  id: string;
  badgeNumber: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const LanyardBadgeCard: React.FC<{ card: SecurityCardData; index: number }> = ({ card, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for 3D physics tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative flex flex-col items-center pt-8 pb-4 group perspective-1000"
    >
      {/* LANYARD STRAP (Top Hanging Strap) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 overflow-hidden pointer-events-none z-20 flex justify-center">
        {/* Ribbon texture */}
        <div className="w-3.5 h-full bg-gradient-to-b from-white/20 via-white/40 to-white/60 rounded-t-sm shadow-[0_0_8px_rgba(255,255,255,0.2)] border-x border-white/30" />
      </div>

      {/* METALLIC BADGE CLIP & SLOT */}
      <div className="relative z-30 mb-[-12px] flex flex-col items-center pointer-events-none">
        {/* Metal Hook Ring */}
        <div className="w-5 h-4 border-2 border-white/80 rounded-t-full bg-black/40 shadow-md" />
        {/* Metal Clamp */}
        <div className="w-8 h-3.5 bg-gradient-to-r from-gray-400 via-white to-gray-400 rounded-sm shadow-md border border-white/60 flex items-center justify-center">
          <div className="w-4 h-0.5 bg-black/40 rounded-full" />
        </div>
      </div>

      {/* 3D BADGE CARD */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: isHovered ? -8 : [0, -4, 0],
        }}
        transition={{
          y: isHovered
            ? { duration: 0.2 }
            : { repeat: Infinity, duration: 4, ease: 'easeInOut', delay: index * 0.5 },
        }}
        className="relative w-full min-h-[300px] sm:min-h-[320px] p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#13161C] border-2 border-white/40 group-hover:border-white transition-colors duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing select-none will-change-transform transform-gpu"
      >
        {/* Top Punch Hole Clip Cutout inside Card */}
        <div className="w-8 h-2 bg-[#0B0D10] border border-white/30 rounded-full mx-auto mb-4 shadow-inner" />

        {/* Holographic Glare Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 45%, transparent 70%)`
            ),
          }}
        />

        {/* Card Body */}
        <div className="my-auto py-2">
          {/* Icon Badge */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center text-white mb-5 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:bg-white/20 transition-all duration-300">
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 tracking-tight group-hover:translate-z-4 transition-transform">
            {card.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#98A2B3] leading-relaxed">
            {card.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const SecurityTrustSection: React.FC = () => {
  const cards: SecurityCardData[] = [
    {
      id: 'nominatifs',
      badgeNumber: '#SEC-01',
      title: 'Comptes nominatifs',
      description: 'Chaque utilisateur dispose d\'un compte personnel, freelances comme équipe interne.',
      icon: Fingerprint,
    },
    {
      id: 'privilege',
      badgeNumber: '#SEC-02',
      title: 'Moindre privilège',
      description: 'Accès uniquement aux projets affectés, pour la durée autorisée.',
      icon: Key,
    },
    {
      id: 'revocation',
      badgeNumber: '#SEC-03',
      title: 'Révocation immédiate',
      description: 'Fin de mission ou suspension : les accès sont coupés instantanément.',
      icon: ShieldCheck,
    },
    {
      id: 'journalisation',
      badgeNumber: '#SEC-04',
      title: 'Journalisation',
      description: 'Chaque action sensible est tracée : validations, contrats, factures.',
      icon: ScrollText,
    },
  ];

  return (
    <section id="securite" className="py-20 sm:py-28 bg-[#0B0D10] border-t border-white/10 text-white relative overflow-hidden">
      {/* Background Subtle White Radial Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-mono font-bold tracking-widest text-white uppercase mb-3 sm:mb-4">
            UN ENVIRONNEMENT DE CONFIANCE
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            La sécurité n'est pas une option
          </h2>
        </div>

        {/* 4 Lanyard Badge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {cards.map((card, idx) => (
            <LanyardBadgeCard key={card.id} card={card} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityTrustSection;

