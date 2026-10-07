import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface AnnexeTraitementDonneesProps {
  onBack: () => void;
}

export const AnnexeTraitementDonnees: React.FC<AnnexeTraitementDonneesProps> = ({ onBack }) => {
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
          Annexe de traitement <span className="text-[#A8E635]">de données</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-[#98A2B3] text-lg mb-16 max-w-2xl">
          À joindre lorsqu'un freelance traite des données pour le compte d'une entité contractante.
        </motion.p>

        <div className="space-y-12 text-[#98A2B3] leading-relaxed">
          
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">01.</span>
              Rôles
            </h2>
            <p>Responsable du traitement : [IAWEB.DEV / HAVET DIGITAL / client final selon la mission]. Sous-traitant : [freelance]. Si la répartition des rôles est différente, elle doit être corrigée avant signature.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">02.</span>
              Instructions documentées
            </h2>
            <p>Le freelance traite les données uniquement sur instruction documentée du responsable, pour la durée et les finalités de la mission. Toute instruction paraissant illicite est signalée sans délai.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">03.</span>
              Description du traitement
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <tbody className="divide-y divide-white/5">
                  <tr><td className="py-3 px-4 font-bold text-white w-1/3">Objet</td><td className="py-3 px-4">[À COMPLÉTER]</td></tr>
                  <tr><td className="py-3 px-4 font-bold text-white">Durée</td><td className="py-3 px-4">[À COMPLÉTER]</td></tr>
                  <tr><td className="py-3 px-4 font-bold text-white">Nature des opérations</td><td className="py-3 px-4">[consultation / modification / export / développement / support / autre]</td></tr>
                  <tr><td className="py-3 px-4 font-bold text-white">Finalités</td><td className="py-3 px-4">[À COMPLÉTER]</td></tr>
                  <tr><td className="py-3 px-4 font-bold text-white">Catégories de personnes</td><td className="py-3 px-4">[À COMPLÉTER]</td></tr>
                  <tr><td className="py-3 px-4 font-bold text-white">Catégories de données</td><td className="py-3 px-4">[À COMPLÉTER]</td></tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">04.</span>
              Confidentialité
            </h2>
            <p>Le freelance veille à ce que toute personne autorisée à traiter les données soit soumise à une obligation de confidentialité appropriée.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">05.</span>
              Sécurité
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Protection des comptes et mots de passe, avec authentification forte lorsqu'elle est disponible.</li>
              <li>Accès limité aux seules données nécessaires.</li>
              <li>Poste de travail et logiciels maintenus à jour.</li>
              <li>Chiffrement des transferts et, lorsque pertinent, des supports de stockage.</li>
              <li>Interdiction de copier les données vers un service personnel ou non autorisé.</li>
              <li>Suppression ou restitution des données à la fin de la mission selon les instructions.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">06.</span>
              Sous-traitants ultérieurs
            </h2>
            <p>Le freelance ne fait pas intervenir un sous-traitant ultérieur sur les données sans autorisation préalable selon le mécanisme convenu. Tout sous-traitant ultérieur doit être soumis à des obligations de protection équivalentes.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">07.</span>
              Transferts internationaux
            </h2>
            <p>Aucun transfert ou accès depuis un pays non autorisé ne doit être effectué sans validation préalable et sans mécanisme juridique approprié lorsque celui-ci est requis.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">08.</span>
              Assistance
            </h2>
            <p>Le freelance assiste raisonnablement le responsable pour les demandes de droits, les analyses de risque, les violations de données et les contrôles de conformité liés au traitement confié.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">09.</span>
              Incident de sécurité
            </h2>
            <p>Toute violation ou suspicion de violation concernant les données de la mission est signalée sans délai injustifié à l'interlocuteur désigné, avec les informations disponibles sur la nature, les données, les personnes concernées, les conséquences probables et les mesures prises.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">10.</span>
              Fin de mission
            </h2>
            <p>À la fin de la mission, les données et copies sont restituées ou supprimées selon l'instruction du responsable, sauf obligation légale contraire documentée.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">11.</span>
              Audit et preuve
            </h2>
            <p>Le freelance met à disposition les informations raisonnablement nécessaires pour démontrer le respect de la présente annexe et coopère à un contrôle proportionné en cas d'incident, exigence client ou obligation réglementaire.</p>
          </motion.section>

        </div>
      </motion.div>
    </div>
  );
};
