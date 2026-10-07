import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import TiltedCard from './ui/TiltedCard';

interface MentionsLegalesProps {
  onBack: () => void;
}

export const MentionsLegales: React.FC<MentionsLegalesProps> = ({ onBack }) => {
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
          Mentions <span className="text-[#A8E635]">légales</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-[#98A2B3] text-lg mb-16 max-w-2xl">
          Retrouvez ici les informations légales concernant l'éditeur, l'hébergeur et l'exploitation de la plateforme UnitGrowth.
        </motion.p>

        <div className="space-y-12 text-[#98A2B3] leading-relaxed">
          {/* Section 1 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">01.</span>
              Editeurs et exploitants de la plateforme
            </h2>
            <p className="mb-6">La plateforme UNITGROWTH est exploitée conjointement par les entités suivantes :</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <TiltedCard
                containerWidth="100%"
                containerHeight="100%"
                imageWidth="100%"
                imageHeight="100%"
                scaleOnHover={1.02}
                rotateAmplitude={8}
                showTooltip={false}
                showMobileWarning={false}
              >
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 h-full hover:border-[#A8E635]/50 transition-colors shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-4">IAWEB.DEV - Maroc</h3>
                  <ul className="space-y-3 text-sm">
                    <li><strong className="text-white">Forme :</strong> Société à Responsabilité Limitée (SARL), au capital de 100 000 DHS</li>
                    <li><strong className="text-white">Immatriculation :</strong> RC 141395 (Tribunal de Marrakech), ICE 003375388000001</li>
                    <li><strong className="text-white">Adresse :</strong> N° 23 Boulevard Yaaqoub El Mansour, Immeuble Espace Gueliz, 1er étage, Bureau N° 5, Gueliz, Marrakech, Maroc</li>
                    <li><strong className="text-white">Contact :</strong> <a href="mailto:contact@iaweb.dev" className="text-[#A8E635] hover:underline">contact@iaweb.dev</a> - +212 6 97 89 39 29</li>
                    <li><strong className="text-white">Site Web :</strong> <a href="https://iaweb.dev/" target="_blank" rel="noopener noreferrer" className="text-[#A8E635] hover:underline">https://iaweb.dev/</a></li>
                  </ul>
                </div>
              </TiltedCard>

              <TiltedCard
                containerWidth="100%"
                containerHeight="100%"
                imageWidth="100%"
                imageHeight="100%"
                scaleOnHover={1.02}
                rotateAmplitude={8}
                showTooltip={false}
                showMobileWarning={false}
              >
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 h-full hover:border-[#A8E635]/50 transition-colors shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-4">HAVET DIGITAL - France</h3>
                  <ul className="space-y-3 text-sm">
                    <li><strong className="text-white">Forme :</strong> SASU, capital social 16 000 EUR</li>
                    <li><strong className="text-white">Immatriculation :</strong> SIREN 844 634 667 - SIRET 844 634 667 00019 - RCS Lille Metropole - TVA FR76 844 634 667</li>
                    <li><strong className="text-white">Siège :</strong> Arteparc Batiment 4, 9 rue des Bouleaux, 59810 Lesquin, France</li>
                    <li><strong className="text-white">Président :</strong> Gonzague Havet</li>
                    <li><strong className="text-white">Contact :</strong> <a href="mailto:service@havetdigital.fr" className="text-[#A8E635] hover:underline">service@havetdigital.fr</a> - +33 (0)3 21 63 19 19</li>
                    <li><strong className="text-white">Site Web :</strong> <a href="https://havetdigital.fr/" target="_blank" rel="noopener noreferrer" className="text-[#A8E635] hover:underline">https://havetdigital.fr/</a></li>
                  </ul>
                </div>
              </TiltedCard>
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">02.</span>
              Direction de la publication
            </h2>
            <p className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
              <strong className="text-white">Directeur de la publication :</strong> Gonzague Havet, représentant légal d’IAWEB.DEV et président de HAVET DIGITAL.
            </p>
          </motion.section>

          {/* Section 3 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">03.</span>
              Hébergement
            </h2>
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
              <ul className="space-y-3 text-sm">
                <li><strong className="text-white">Hébergeur :</strong> OVH SAS</li>
                <li><strong className="text-white">Forme et capital :</strong> SAS au capital de 50 000 000 EUR</li>
                <li><strong className="text-white">Immatriculation :</strong> RCS Lille Metropole 424 761 419 - TVA FR22 424 761 419</li>
                <li><strong className="text-white">Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France</li>
                <li><strong className="text-white">Localisation indiquée pour UNITGROWTH :</strong> France</li>
              </ul>
            </div>
          </motion.section>

          {/* Section 4 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">04.</span>
              Objet
            </h2>
            <p>
              UNITGROWTH est une plateforme de talents freelances destinée à faciliter la candidature, la qualification, le matching, la proposition et le suivi de missions de production pour IAWeb.dev, HAVET DIGITAL et, le cas échéant, les projets qu'elles pilotent.
            </p>
          </motion.section>

          {/* Section 5 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">05.</span>
              Entité contractante pour les missions
            </h2>
            <p>
              UNITGROWTH constitue l'interface commune de gestion. Pour chaque mission, le freelance est informé avant son acceptation de l'identité de l'entité contractante et payeuse : IAWeb.dev (Maroc), HAVET DIGITAL (France), ou les deux si la mission le prévoit expressément. Le document contractuel de mission précise notamment l'identité du cocontractant, le prix, la devise, les livrables et les modalités de paiement.
            </p>
          </motion.section>

          {/* Section 6 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">06.</span>
              Propriété intellectuelle
            </h2>
            <p>
              La structure, les textes, interfaces, logos, éléments graphiques, bases de données, logiciels et contenus propres à UNITGROWTH sont protégés par les règles de propriété intellectuelle applicables. Toute reproduction ou réutilisation non autorisée est interdite, sous réserve des droits appartenant à des tiers.
            </p>
          </motion.section>

          {/* Section 7 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">07.</span>
              Responsabilité
            </h2>
            <p>
              Les exploitants s'efforcent d'assurer la disponibilité, la sécurité et l'exactitude des informations publiées. Une inscription, une qualification ou l'intégration à la team UNITGROWTH ne constitue ni une promesse de mission, ni une garantie de revenu. Une mission devient contractuelle uniquement dans les conditions décrites dans les CGU, les conditions de missions et le bon de mission applicable.
            </p>
          </motion.section>

          {/* Section 8 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">08.</span>
              Données personnelles et cookies
            </h2>
            <p>
              Les traitements de données sont décrits dans la Politique de confidentialité. Les cookies et traceurs sont décrits dans la Politique de cookies et peuvent être gérés depuis le lien permanent « Gérer mes cookies ».
            </p>
          </motion.section>

          {/* Section 9 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">09.</span>
              Contacts
            </h2>
            <p>
              Pour toute question générale : <a href="mailto:contact@iaweb.dev" className="text-[#A8E635] hover:underline">contact@iaweb.dev</a> ou <a href="mailto:service@havetdigital.fr" className="text-[#A8E635] hover:underline">service@havetdigital.fr</a>. Pour une question relative à une mission, le contact indiqué dans le document de mission doit être utilisé en priorité.
            </p>
          </motion.section>

        </div>
      </motion.div>
    </div>
  );
};
