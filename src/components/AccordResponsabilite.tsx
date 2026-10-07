import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface AccordResponsabiliteProps {
  onBack: () => void;
}

export const AccordResponsabilite: React.FC<AccordResponsabiliteProps> = ({ onBack }) => {
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
          Accord de <span className="text-[#A8E635]">responsabilité</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-[#98A2B3] text-lg mb-16 max-w-2xl">
          Accord interne de responsabilité conjointe - données personnelles (IAWeb.dev / HAVET DIGITAL).
        </motion.p>

        <div className="space-y-12 text-[#98A2B3] leading-relaxed">
          
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">01.</span>
              Objet
            </h2>
            <p>Le présent accord organise les responsabilités d'IAWeb.dev et de HAVET DIGITAL pour les traitements de données personnelles qu'elles déterminent conjointement dans le cadre de l'exploitation de UNITGROWTH.</p>
            <p className="mt-4">IAWEB.DEV : SARL au capital de 100 000 DHS, RC 141395 (Tribunal de Marrakech), ICE 003375388000001, siège au N° 23 Boulevard Yaaqoub El Mansour, Immeuble Espace Gueliz, 1er étage, Bureau N° 5, Gueliz, Marrakech, Maroc, représentée par Gonzague Havet.</p>
            <p className="mt-2">HAVET DIGITAL : informations sociétaires telles qu'indiquées dans les mentions légales UNITGROWTH.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">02.</span>
              Périmètre des traitements communs
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Gestion de l'inscription et du compte UNITGROWTH.</li>
              <li>Réception et traitement des candidatures.</li>
              <li>Qualification, tests et évaluation des profils.</li>
              <li>Matching entre profils et missions.</li>
              <li>Administration commune de la base de talents et de l'historique utile.</li>
              <li>Sécurité, prévention de la fraude et administration technique commune.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">03.</span>
              Répartition des responsabilités
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 font-bold text-white w-1/4">Information des personnes</td><td className="py-3 px-4">Textes communs publiés sur UNITGROWTH ; mise à jour coordonnée.</td></tr>
                  <tr><td className="py-3 px-4 font-bold text-white">Base juridique et finalités</td><td className="py-3 px-4">Validation conjointe pour les traitements communs.</td></tr>
                  <tr><td className="py-3 px-4 font-bold text-white">Gestion des droits</td><td className="py-3 px-4">Toute demande reçue par une entité est transmise sans délai à l'autre si elle concerne un traitement commun ; un suivi commun est tenu.</td></tr>
                  <tr><td className="py-3 px-4 font-bold text-white">Sécurité</td><td className="py-3 px-4">Mesures techniques et organisationnelles coordonnées ; gestion des habilitations selon le besoin d'en connaître.</td></tr>
                  <tr><td className="py-3 px-4 font-bold text-white">Sous-traitants</td><td className="py-3 px-4">Chaque nouveau prestataire impliqué dans un traitement commun fait l'objet d'une validation et d'un encadrement contractuel approprié.</td></tr>
                  <tr><td className="py-3 px-4 font-bold text-white">Violations de données</td><td className="py-3 px-4">Notification interne immédiate entre les parties ; analyse conjointe du risque et coordination des notifications aux autorités/personnes si requises.</td></tr>
                  <tr><td className="py-3 px-4 font-bold text-white">Transferts UE/Maroc</td><td className="py-3 px-4">Mécanisme juridique et documentation de transfert mis en place lorsque requis ; formalités CNDP traitées pour les flux relevant de la loi marocaine.</td></tr>
                  <tr><td className="py-3 px-4 font-bold text-white">Conservation</td><td className="py-3 px-4">Durées communes documentées et appliquées techniquement.</td></tr>
                  <tr><td className="py-3 px-4 font-bold text-white">IA de qualification</td><td className="py-3 px-4">Documentation des fournisseurs, données, logique générale, supervision humaine et contrôle des biais/erreurs adapté au risque.</td></tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">04.</span>
              Point de contact des personnes
            </h2>
            <p>Les personnes peuvent contacter contact@iaweb.dev ou service@havetdigital.fr. Les parties peuvent ultérieurement désigner une adresse commune sans réduire le droit d'exercer les droits auprès de chacune d'elles.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">05.</span>
              Traitements propres à une mission
            </h2>
            <p>Les données de facturation, comptabilité, paiement, contentieux et obligations légales propres à une mission sont principalement gérées par l'entité contractante identifiée dans le document de mission, sauf traitement conjoint réel documenté entre les parties.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">06.</span>
              Clause de transfert
            </h2>
            <p>Avant tout accès régulier depuis le Maroc à des données relevant d'un transfert au sens du RGPD, HAVET DIGITAL et IAWeb.dev documentent le mécanisme de transfert approprié et les mesures supplémentaires éventuelles. IAWeb.dev vérifie en parallèle les formalités requises par la loi marocaine n° 09-08 pour les transferts à l'étranger.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">07.</span>
              Preuve et gouvernance
            </h2>
            <p>Les parties conservent une cartographie des traitements, la liste des prestataires, les décisions de gouvernance, les analyses de risque, les incidents et les demandes de droits. Une revue est organisée au moins annuellement et à chaque évolution majeure de UNITGROWTH.</p>
          </motion.section>

        </div>
      </motion.div>
    </div>
  );
};
