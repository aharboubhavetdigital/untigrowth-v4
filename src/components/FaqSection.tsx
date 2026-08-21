import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: "L'inscription est-elle vraiment gratuite et sans engagement ?",
      answer:
        "Oui, l'inscription est 100% gratuite et sans aucun engagement. Vous créez votre profil, passez le test d'évaluation IA, et accédez aux opportunités du vivier sans aucun frais caché.",
    },
    {
      id: 'faq-2',
      question: 'Comment se déroule le test de qualification IA ?',
      answer:
        "Le test prend entre 10 et 15 minutes. Il s'agit d'un parcours d'évaluation adapté à votre spécialité (Développement, IA, Marketing, Design...). Votre score détermine la validation immédiate de vos compétences.",
    },
    {
      id: 'faq-3',
      question: 'Qui valide mon profil après le test ?',
      answer:
        "Dès l'obtention du score requis au test IA, notre équipe de Tech Leads & Talent Managers effectue une vérification rapide de votre profil avant l'activation définitive de votre accès au vivier.",
    },
    {
      id: 'faq-4',
      question: 'Comment sont fixés les tarifs des missions ?',
      answer:
        "Chaque mission arrive avec un budget ou un TJM clair défini au préalable dans le cahier des charges. Vous gardez la liberté de répondre avec votre tarif et d'ajuster l'offre en fonction du besoin.",
    },
    {
      id: 'faq-5',
      question: 'Comment suis-je payé ?',
      answer:
        'Le paiement s’effectue en toute sécurité grâce au système de compte séquestre et de double validation. Une fois le livrable validé par le client, les fonds sont débloqués et transférés sur votre compte.',
    },
    {
      id: 'faq-6',
      question: 'À quoi ai-je accès pendant une mission ?',
      answer:
        'Pendant la mission, vous disposez d’un espace de suivi complet : gestion des contrats, factures automatique, canal de communication direct et support de l’équipe IAweb.dev / Unitgrowth.',
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#0B0D10] border-t border-white/10 text-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Centered */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-mono font-bold tracking-widest text-white uppercase mb-3 sm:mb-4">
            QUESTIONS FRÉQUENTES
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Tout ce qu'il faut savoir avant de candidater
          </h2>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl bg-[#13161C] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-white/40 shadow-[0_10px_30px_rgba(255,255,255,0.05)]'
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-white tracking-tight leading-snug">
                    {faq.question}
                  </span>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white transition-colors duration-200">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-7 text-sm sm:text-base text-[#98A2B3] leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
