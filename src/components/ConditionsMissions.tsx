import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface ConditionsMissionsProps {
  onBack: () => void;
}

export const ConditionsMissions: React.FC<ConditionsMissionsProps> = ({ onBack }) => {
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
          Conditions de <span className="text-[#A8E635]">missions</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-[#98A2B3] text-lg mb-16 max-w-2xl">
          Conditions générales de services et de missions freelance - Cadre B2B applicable aux missions proposées via UNITGROWTH.
        </motion.p>

        <div className="space-y-12 text-[#98A2B3] leading-relaxed">
          
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">01.</span>
              Principe
            </h2>
            <p>Les présentes conditions constituent le cadre commun des missions proposées via UNITGROWTH. Elles sont complétées par les conditions particulières ou par le modèle de bon de mission déjà utilisé par IAWeb.dev / HAVET DIGITAL. En cas de contradiction, les conditions particulières du bon de mission priment pour la mission concernée.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">02.</span>
              Entité contractante
            </h2>
            <p>L'entité contractante est identifiée sur chaque document de mission : IAWeb.dev (Maroc), HAVET DIGITAL (France), ou les deux si cela est expressément prévu. L'entité contractante signe ou confirme la mission et en assure le paiement, sauf mention expresse d'un payeur distinct intervenant pour son compte.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">03.</span>
              Formation de la mission
            </h2>
            <p>La mission est formée lorsque les conditions particulières sont acceptées par le freelance et confirmées par l'entité contractante. Une carte de mission, un message exploratoire ou la mention « forfait à déterminer » ne constitue pas, à elle seule, un engagement de commande.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">04.</span>
              Contenu du document de mission
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Entité contractante et interlocuteur.</li>
              <li>Objet, périmètre et livrables.</li>
              <li>Dates, jalons et disponibilité attendue.</li>
              <li>Prix ou mode de calcul, devise et taxes applicables.</li>
              <li>Conditions de facturation et paiement.</li>
              <li>Critères et délai de validation des livrables.</li>
              <li>Confidentialité et sécurité.</li>
              <li>Régime de propriété intellectuelle.</li>
              <li>Conditions de report, suspension et résiliation.</li>
              <li>Droit applicable et règlement des litiges.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">05.</span>
              Prix et devises
            </h2>
            <p>Le prix peut être fixé au forfait, au temps passé ou selon des jalons. Avant validation définitive, une mission peut être affichée avec la mention « Forfait à déterminer ». Les devises utilisées peuvent notamment être EUR, MAD ou MGA selon la mission et l'entité contractante.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">06.</span>
              Facturation
            </h2>
            <p>Le freelance établit une facture conforme au droit et au statut qui lui sont applicables, sauf mécanisme licite d'autofacturation expressément convenu. Les coordonnées de facturation figurent dans le document de mission ou sont communiquées au moment opportun.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">07.</span>
              Paiement
            </h2>
            <p>Selon la mission, le paiement peut prendre la forme d'un acompte, d'un paiement hebdomadaire, mensuel, par jalon ou à la livraison. Le document de mission précise le calendrier, les conditions de validation et le délai de paiement. Les frais de transfert ou conversion doivent être indiqués lorsqu'ils sont à la charge du freelance.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">08.</span>
              Compte séquestre
            </h2>
            <p>UNITGROWTH ne doit annoncer un compte séquestre que si un service de séquestre ou de réservation de fonds est effectivement opérationnel. Dans ce cas, le prestataire, les conditions de blocage/libération, les frais et le traitement des litiges sont présentés avant acceptation de la mission.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">09.</span>
              Validation et corrections
            </h2>
            <p>Les livrables sont vérifiés selon les critères convenus. Les corrections correspondant au périmètre initial sont réalisées dans des conditions raisonnables. Toute évolution significative hors périmètre fait l'objet d'un accord complémentaire sur le prix et le calendrier.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">10.</span>
              Obligations du freelance
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Exécuter la mission avec diligence et selon les règles de l'art.</li>
              <li>Respecter les délais et signaler rapidement les blocages.</li>
              <li>Protéger les accès et informations confidentielles.</li>
              <li>Respecter les règles de sécurité et de protection des données.</li>
              <li>Utiliser uniquement des éléments tiers dont les licences sont compatibles avec la mission.</li>
              <li>Informer l'entité contractante de tout conflit d'intérêts significatif.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">11.</span>
              Obligations de l'entité contractante
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Fournir les informations et accès nécessaires.</li>
              <li>Désigner un interlocuteur et formuler les retours utiles.</li>
              <li>Valider ou motiver les réserves dans un délai raisonnable.</li>
              <li>Payer les sommes dues selon les conditions convenues.</li>
              <li>Informer le freelance des obligations de sécurité, confidentialité et conformité propres au projet.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">12.</span>
              Propriété intellectuelle
            </h2>
            <p>Les droits sur les livrables sont définis dans le document de mission. La cession ou licence doit identifier les droits concernés, les usages autorisés, la durée et le territoire lorsqu'ils sont juridiquement requis. Les composants préexistants du freelance et les logiciels open source restent soumis à leur régime propre.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">13.</span>
              Confidentialité
            </h2>
            <p>Les informations non publiques relatives aux clients, projets, logiciels, données, stratégies, accès et documents sont confidentielles. Le freelance les utilise uniquement pour la mission et met en place des mesures raisonnables de protection. La durée post-contractuelle est précisée dans le document de mission ou l'accord de confidentialité applicable.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">14.</span>
              Données personnelles
            </h2>
            <p>Si le freelance traite des données personnelles pour le compte de l'entité contractante ou d'un client, l'annexe de traitement de données ou un accord équivalent doit être accepté avant le traitement.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">15.</span>
              Annulation et résiliation
            </h2>
            <p>Les conséquences d'une annulation ou d'un report sont prévues dans le document de mission. En cas de manquement grave, la mission peut être résiliée selon le droit applicable, sous réserve du paiement des prestations valablement réalisées et acceptées, sauf faute justifiant une autre conséquence.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">16.</span>
              Responsabilité
            </h2>
            <p>Chaque partie répond des dommages directs qu'elle cause par sa faute dans les limites autorisées par la loi et le contrat. Toute limitation de responsabilité doit être adaptée à la nature de la mission et ne peut neutraliser les responsabilités qui ne peuvent légalement être limitées.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">17.</span>
              Fiscalité, statut et assurances
            </h2>
            <p>Le freelance demeure responsable de son immatriculation, de ses obligations fiscales et sociales et, lorsque cela est nécessaire, de ses assurances professionnelles dans son pays de résidence ou d'établissement.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">18.</span>
              Droit applicable
            </h2>
            <p>Le droit applicable et la juridiction ou le mécanisme de résolution des litiges sont définis dans le document de mission en fonction de l'entité contractante et de la situation du freelance.</p>
          </motion.section>

        </div>
      </motion.div>
    </div>
  );
};
