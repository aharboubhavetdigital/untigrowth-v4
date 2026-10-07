import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface MentionsInterfaceProps {
  onBack: () => void;
}

export const MentionsInterface: React.FC<MentionsInterfaceProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#F8FAFC] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <motion.button
          variants={itemVariants}
          onClick={onBack}
          className="group flex items-center text-sm font-medium text-[#98A2B3] hover:text-white transition-colors mb-12"
        >
          <svg className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l'accueil
        </motion.button>

        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Mentions <span className="text-[#A8E635]">interface</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-[#98A2B3] text-lg mb-16 max-w-2xl">
          Mentions formulaires et bannière cookies. Textes courts à intégrer dans l'interface UNITGROWTH.
        </motion.p>

        <div className="space-y-12 text-[#98A2B3] leading-relaxed">
          
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">01.</span>
              Sous le formulaire « Rejoindre la team »
            </h2>
            <p className="italic bg-white/[0.02] border border-white/10 rounded-xl p-5">
              « Les informations saisies sont utilisées conjointement par IAWeb.dev et HAVET DIGITAL pour traiter votre candidature, qualifier votre profil et vous proposer, le cas échéant, des missions correspondant à vos compétences. Certains outils d'IA peuvent assister la qualification. Consultez notre Politique de confidentialité pour en savoir plus sur les destinataires, transferts, durées de conservation et vos droits. »
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">02.</span>
              Conservation pour de futures missions
            </h2>
            <p>Si la base retenue est le consentement, utiliser une case non pré-cochée et distincte :</p>
            <p className="mt-4 italic bg-white/[0.02] border border-white/10 rounded-xl p-5">
              « J'accepte que IAWeb.dev et HAVET DIGITAL conservent mon profil afin de me proposer de futures missions pendant une durée maximale de 24 mois à compter de mon dernier contact. Je peux retirer mon accord à tout moment. »
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">03.</span>
              Information IA
            </h2>
            <p className="italic bg-white/[0.02] border border-white/10 rounded-xl p-5">
              « Certaines étapes de qualification et de matching peuvent être assistées par intelligence artificielle. Les modalités de supervision humaine et vos droits sont décrits dans notre Politique de confidentialité. »
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">04.</span>
              Confirmation de candidature
            </h2>
            <p className="italic bg-white/[0.02] border border-white/10 rounded-xl p-5">
              « Candidature envoyée. Votre profil a bien été transmis à l'équipe UNITGROWTH. Nous vous contacterons si une opportunité correspond à vos compétences et disponibilités. »
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">05.</span>
              Bannière cookies
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Titre :</strong> « Vos choix de confidentialité »</li>
              <li><strong className="text-white">Texte :</strong> « Nous utilisons des cookies nécessaires au fonctionnement de UNITGROWTH. Avec votre accord, nous pouvons également utiliser des traceurs de mesure d'audience et des services tiers afin d'améliorer l'expérience. Vous pouvez accepter, refuser ou personnaliser vos choix. »</li>
              <li><strong className="text-white">Boutons :</strong> « Tout accepter » - « Tout refuser » - « Personnaliser »</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">06.</span>
              Lien permanent
            </h2>
            <p><strong className="text-white">Footer :</strong> « Gérer mes cookies » ou « Mes préférences de confidentialité ».</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">07.</span>
              Avant acceptation d'une mission
            </h2>
            <p className="italic bg-white/[0.02] border border-white/10 rounded-xl p-5">
              « Cette mission sera conclue avec [IAWEB.DEV / HAVET DIGITAL]. Avant d'accepter, vérifiez le périmètre, les livrables, le calendrier, la devise, le prix ou son mode de détermination, ainsi que les modalités de facturation et de paiement. »
            </p>
          </motion.section>

        </div>
      </motion.div>
    </div>
  );
};
