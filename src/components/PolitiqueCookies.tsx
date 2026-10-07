import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface PolitiqueCookiesProps {
  onBack: () => void;
}

export const PolitiqueCookies: React.FC<PolitiqueCookiesProps> = ({ onBack }) => {
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
          Politique de <span className="text-[#A8E635]">cookies</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-[#98A2B3] text-lg mb-16 max-w-2xl">
          UNITGROWTH - cookies et autres traceurs
        </motion.p>

        <div className="space-y-12 text-[#98A2B3] leading-relaxed">
          
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">01.</span>
              Définition
            </h2>
            <p>Un cookie ou traceur est une technologie permettant de lire ou d'enregistrer des informations sur un terminal lors de l'utilisation d'un site ou d'un service numérique.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">02.</span>
              Catégories possibles
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Cookies strictement nécessaires :</strong> session, authentification, sécurité, équilibrage de charge et mémorisation du choix de consentement.</li>
              <li><strong className="text-white">Préférences :</strong> mémorisation de réglages ou choix d'interface non strictement nécessaires.</li>
              <li><strong className="text-white">Mesure d'audience :</strong> statistiques de fréquentation et performance.</li>
              <li><strong className="text-white">Services tiers / réseaux sociaux :</strong> widgets, contenus intégrés et boutons sociaux.</li>
              <li><strong className="text-white">Publicité ou personnalisation :</strong> uniquement si ces fonctions sont réellement installées.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">03.</span>
              Consentement
            </h2>
            <p>Les traceurs soumis au consentement ne sont activés qu'après le choix de l'utilisateur. La bannière doit permettre d'accepter, refuser ou personnaliser les choix avec une facilité comparable. Le consentement peut être retiré à tout moment via le lien « Gérer mes cookies ».</p>
            <p className="mt-4">Une durée de mémorisation du choix d'environ six mois peut être retenue, sous réserve de vérifier qu'elle reste adaptée au contexte et aux recommandations applicables au moment de la mise en production.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">04.</span>
              Inventaire
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-white font-bold">Cookie / fournisseur</th>
                    <th className="py-3 px-4 text-white font-bold">Finalité</th>
                    <th className="py-3 px-4 text-white font-bold">Catégorie</th>
                    <th className="py-3 px-4 text-white font-bold">Durée</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 px-4">[consent cookie] - UNITGROWTH</td>
                    <td className="py-3 px-4">Mémoriser le choix de consentement</td>
                    <td className="py-3 px-4">Nécessaire</td>
                    <td className="py-3 px-4">[durée]</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">[session] - UNITGROWTH</td>
                    <td className="py-3 px-4">Session / authentification</td>
                    <td className="py-3 px-4">Nécessaire</td>
                    <td className="py-3 px-4">Session ou durée technique</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">[analytics] - [prestataire]</td>
                    <td className="py-3 px-4">Mesure d'audience</td>
                    <td className="py-3 px-4">Analytics</td>
                    <td className="py-3 px-4">[durée]</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">[social/widget] - [prestataire]</td>
                    <td className="py-3 px-4">Service tiers / réseau social</td>
                    <td className="py-3 px-4">Tiers</td>
                    <td className="py-3 px-4">[durée]</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">05.</span>
              Cookies tiers
            </h2>
            <p>Les prestataires tiers qui déposent ou lisent des traceurs doivent être identifiés dans le gestionnaire de consentement avec leur finalité et leur durée. Les politiques des prestataires peuvent être accessibles depuis le panneau de personnalisation lorsque cela est utile.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">06.</span>
              Refus
            </h2>
            <p>Le refus des cookies non nécessaires ne doit pas empêcher l'accès aux fonctions essentielles de UNITGROWTH. Une fonctionnalité tierce optionnelle peut toutefois ne pas fonctionner tant que le consentement nécessaire n'a pas été donné.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">07.</span>
              Contact
            </h2>
            <p><a href="mailto:contact@iaweb.dev" className="text-[#A8E635] hover:underline">contact@iaweb.dev</a> ou <a href="mailto:service@havetdigital.fr" className="text-[#A8E635] hover:underline">service@havetdigital.fr</a></p>
          </motion.section>

        </div>
      </motion.div>
    </div>
  );
};
