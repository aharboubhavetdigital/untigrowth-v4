import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface CGUProps {
  onBack: () => void;
}

export const CGU: React.FC<CGUProps> = ({ onBack }) => {
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
          Conditions générales <span className="text-[#A8E635]">d'utilisation</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-[#98A2B3] text-lg mb-16 max-w-2xl">
          UNITGROWTH - candidats, freelances et utilisateurs
        </motion.p>

        <div className="space-y-12 text-[#98A2B3] leading-relaxed">
          
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">01.</span>
              Objet et exploitants
            </h2>
            <p>Les présentes CGU régissent l'accès et l'utilisation de UNITGROWTH, plateforme exploitée conjointement par IAWeb.dev au Maroc et HAVET DIGITAL en France.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">02.</span>
              Services proposés
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Création et gestion d'un profil freelance.</li>
              <li>Dépôt et suivi d'une candidature.</li>
              <li>Qualification des compétences et disponibilités, y compris au moyen de tests.</li>
              <li>Matching entre profils et besoins de production.</li>
              <li>Proposition, acceptation et suivi de missions.</li>
              <li>Échanges, livrables, validation et éléments administratifs liés aux missions.</li>
            </ul>
            <p className="mt-4">L'inscription ou la qualification d'un profil ne garantit aucune mission, aucun volume d'activité ni aucun niveau de rémunération.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">03.</span>
              Conditions d'accès
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Être majeur et disposer de la capacité juridique nécessaire.</li>
              <li>Fournir des informations exactes, complètes et à jour.</li>
              <li>Disposer d'un statut permettant légalement de facturer la mission lorsqu'une mission rémunérée est acceptée, sauf montage contractuel différent expressément prévu.</li>
              <li>Respecter les présentes CGU, les conditions de mission et les règles de sécurité applicables.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">04.</span>
              Compte et sécurité
            </h2>
            <p>L'utilisateur est responsable de la confidentialité de ses identifiants. Toute suspicion d'accès non autorisé doit être signalée à l'un des exploitants. Des mesures de vérification, restriction ou suspension peuvent être mises en place en cas de risque de fraude, usurpation ou compromission.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">05.</span>
              Profil et contenus
            </h2>
            <p>L'utilisateur garantit disposer des droits nécessaires sur les informations, CV, liens, portfolios, fichiers et réalisations transmis. Il s'interdit de fournir des contenus illicites, trompeurs, malveillants ou confidentiels sans autorisation.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">06.</span>
              Qualification et matching assisté par IA
            </h2>
            <p>UNITGROWTH peut utiliser des outils d'automatisation ou d'intelligence artificielle pour assister l'analyse de candidatures, la notation de tests, l'identification de compétences et le rapprochement entre un profil et une mission.</p>
            <p className="mt-4">Le fonctionnement exact, les fournisseurs concernés et le niveau de supervision humaine doivent correspondre au service réel. UNITGROWTH ne doit pas présenter comme exclusivement humaine une évaluation automatisée, ni comme exclusivement automatisée une décision qui fait en réalité l'objet d'une revue humaine.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">07.</span>
              Missions et cocontractant
            </h2>
            <p>Chaque proposition de mission indique l'entité contractante : IAWeb.dev, HAVET DIGITAL ou, exceptionnellement, les deux. Le freelance doit connaître avant acceptation le périmètre, les livrables, le calendrier, le prix ou son mode de détermination, la devise, les critères de validation et les modalités de paiement.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">08.</span>
              Statut indépendant
            </h2>
            <p>Lorsqu'il intervient comme prestataire indépendant, le freelance organise librement son activité dans le respect des livrables, délais, contraintes de sécurité, de confidentialité et de coordination du projet. La qualification juridique de la relation dépend toujours des conditions réelles d'exécution.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">09.</span>
              Utilisations interdites
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Usurpation d'identité ou fausse information substantielle.</li>
              <li>Contournement des mesures de sécurité ou accès non autorisé.</li>
              <li>Scraping abusif, extraction massive ou réutilisation non autorisée de données.</li>
              <li>Transmission de programmes malveillants.</li>
              <li>Divulgation ou réutilisation non autorisée d'informations confidentielles de mission.</li>
              <li>Utilisation de UNITGROWTH à une finalité illicite ou portant atteinte aux droits d'un tiers.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">10.</span>
              Suspension et fermeture
            </h2>
            <p>Un compte peut être suspendu ou limité lorsqu'une mesure est nécessaire pour la sécurité, la prévention de la fraude, le respect de la loi ou en cas de manquement contractuel. Lorsque cela est raisonnablement possible, l'utilisateur est informé du motif et peut fournir ses observations.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">11.</span>
              Disponibilité et évolution
            </h2>
            <p>UNITGROWTH peut évoluer, faire l'objet d'opérations de maintenance ou subir des interruptions. Les exploitants mettent en œuvre des moyens raisonnables pour maintenir le service, sans garantir une disponibilité continue et absolue.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">12.</span>
              Données personnelles
            </h2>
            <p>La Politique de confidentialité explique le rôle respectif d'IAWeb.dev et HAVET DIGITAL, les finalités, transferts, destinataires, durées et droits des personnes.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">13.</span>
              Droit applicable aux missions
            </h2>
            <p>Le droit applicable à une mission est précisé dans le document de mission ou le contrat signé par l'entité contractante. Les présentes CGU de plateforme ne doivent pas être interprétées comme imposant un droit unique à toutes les missions internationales.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">14.</span>
              Modification
            </h2>
            <p>Les CGU peuvent être mises à jour. Les changements substantiels applicables aux utilisateurs disposant d'un compte seront portés à leur connaissance lorsque cela est nécessaire.</p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">15.</span>
              Contact
            </h2>
            <p><a href="mailto:contact@iaweb.dev" className="text-[#A8E635] hover:underline">contact@iaweb.dev</a> ou <a href="mailto:service@havetdigital.fr" className="text-[#A8E635] hover:underline">service@havetdigital.fr</a></p>
          </motion.section>

        </div>
      </motion.div>
    </div>
  );
};
