import React from 'react';
import { motion } from 'motion/react';
import { ArrowRightCircle, Zap, LockKeyhole, Fingerprint } from 'lucide-react';

export const VaultShieldHero: React.FC = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <section 
      id="vaultshield"
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center"
      style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--color-text)'
      }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4"
            type="video/mp4"
          />
        </video>
        {/* Subtle overlay if needed for contrast */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 sm:px-8 py-16 flex-1 flex flex-col justify-center">
        <div className="max-w-[560px]">
          {/* Heading */}
          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-6 tracking-[-0.01em] text-[#192837]"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.65rem, 5vw, 3rem)',
              lineHeight: '1.05'
            }}
          >
            <Zap
              className="inline-block align-middle relative -top-[2px] mr-1.5 text-[#192837]"
              style={{ width: 24, height: 24 }}
            />
            Lock Down Your Passwords{' '}
            <LockKeyhole
              className="inline-block align-middle relative -top-[2px] mx-1.5 text-[#192837]"
              style={{ width: 24, height: 24 }}
            />
            with Ironclad Security{' '}
            <Fingerprint
              className="inline-block align-middle relative -top-[2px] ml-1.5 text-[#192837]"
              style={{ width: 24, height: 24 }}
            />
          </motion.h1>

          {/* Subtext */}
          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-8 text-[#192837] opacity-80 max-w-[560px]"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              lineHeight: '1.65'
            }}
          >
            Zero stress, total control. VaultShield keeps you covered with unbreakable storage, one-tap access, and pro-grade tools for your non-stop world.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-between gap-8 text-white font-semibold cursor-pointer transition-all"
              style={{
                backgroundColor: '#7342E2',
                borderRadius: '50px',
                padding: '17px 24px',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                boxShadow: '0 4px 24px rgba(115, 66, 226, 0.28)',
                minWidth: '210px'
              }}
            >
              <span>Get It Free</span>
              <ArrowRightCircle style={{ width: 20, height: 20 }} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
