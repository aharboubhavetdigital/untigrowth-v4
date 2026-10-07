import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import TiltedCard from './ui/TiltedCard';

interface PolitiqueConfidentialiteProps {
  onBack: () => void;
}

export const PolitiqueConfidentialite: React.FC<PolitiqueConfidentialiteProps> = ({ onBack }) => {
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
          Politique de <span className="text-[#A8E635]">confidentialité</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-[#98A2B3] text-lg mb-16 max-w-2xl">
          Découvrez comment nous protégeons vos données personnelles et quels sont vos droits concernant leur utilisation sur la plateforme UnitGrowth.
        </motion.p>

        <div className="space-y-12 text-[#98A2B3] leading-relaxed">
          
          {/* Section 1 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">01.</span>
              Qui traite vos données ?
            </h2>
            <p className="mb-6">
              Pour les traitements communs nécessaires à l'exploitation de UNITGROWTH (gestion des candidatures, qualification des profils, matching et administration), <strong>IAWeb.dev (Maroc)</strong> et <strong>HAVET DIGITAL (France)</strong> déterminent conjointement certains objectifs et moyens du traitement et agissent comme responsables conjoints du traitement.
            </p>
            <p className="mb-8">
              Pour les données propres à l'exécution d'une mission, à la facturation et au paiement, l'entité contractante identifiée dans le document de mission peut agir comme responsable du traitement pour ses obligations propres.
            </p>

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
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#A8E635]/20 flex items-center justify-center text-[#A8E635]">MA</span>
                    IAWEB.DEV
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li><strong className="text-white">Forme :</strong> SARL, capital 100 000 DHS</li>
                    <li><strong className="text-white">Immatriculation :</strong> RC 141395 (Marrakech), ICE 003375388000001</li>
                    <li><strong className="text-white">Siège :</strong> 23 Bd Yaaqoub El Mansour, Imm. Espace Gueliz, 1er étage, Bureau N° 5, Gueliz, Marrakech, Maroc</li>
                    <li><strong className="text-white">Contact :</strong> <a href="mailto:contact@iaweb.dev" className="text-[#A8E635] hover:underline">contact@iaweb.dev</a> - +212 6 97 89 39 29</li>
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
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#A8E635]/20 flex items-center justify-center text-[#A8E635]">FR</span>
                    HAVET DIGITAL
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li><strong className="text-white">Siège :</strong> Arteparc Batiment 4, 9 rue des Bouleaux, 59810 Lesquin, France</li>
                    <li><strong className="text-white">Contact :</strong> <a href="mailto:service@havetdigital.fr" className="text-[#A8E635] hover:underline">service@havetdigital.fr</a> - +33 (0)3 21 63 19 19</li>
                  </ul>
                </div>
              </TiltedCard>
            </div>
            <p className="mt-8 bg-white/[0.02] border border-white/10 rounded-xl p-5">
              Vous pouvez exercer vos droits auprès de l'une ou l'autre entité. Les deux exploitants se coordonnent pour traiter la demande lorsqu'elle concerne un traitement commun.
            </p>
          </motion.section>

          {/* Section 2 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">02.</span>
              Données collectées
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-white">Identité et coordonnées :</strong> nom, prénom, e-mail, téléphone, pays de résidence.</li>
              <li><strong className="text-white">Compte :</strong> identifiant, mot de passe protégé, paramètres, historique de connexion.</li>
              <li><strong className="text-white">Profil professionnel :</strong> domaine d'expertise, spécialités, technologies, expérience, disponibilité, CV, portfolio, LinkedIn, GitHub et réalisations.</li>
              <li><strong className="text-white">Candidature et qualification :</strong> réponses aux questionnaires, tests, résultats, évaluations, commentaires de qualification et éléments de matching.</li>
              <li><strong className="text-white">Missions :</strong> propositions, acceptations, échanges, livrables, jalons, validations et historique utile au suivi.</li>
              <li><strong className="text-white">Administration et paiement :</strong> statut professionnel, coordonnées de facturation, factures et informations nécessaires au paiement.</li>
              <li><strong className="text-white">Données techniques :</strong> adresse IP, logs de sécurité, navigateur, appareil, cookies et traceurs selon vos choix.</li>
            </ul>
          </motion.section>

          {/* Section 3 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">03.</span>
              Pourquoi utilisons-nous ces données ?
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-white font-bold">Finalité</th>
                    <th className="py-3 px-4 text-white font-bold">Base juridique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 px-4">Création et gestion du compte</td>
                    <td className="py-3 px-4">Exécution de mesures précontractuelles / relation contractuelle.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Candidature et qualification</td>
                    <td className="py-3 px-4">Mesures précontractuelles et/ou intérêt légitime selon le traitement ; consentement lorsqu'il est retenu.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Conservation d'un profil pour de futures missions</td>
                    <td className="py-3 px-4">Intérêt légitime avec droit d'opposition ou consentement.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Matching et proposition de missions</td>
                    <td className="py-3 px-4">Mesures précontractuelles, contrat et intérêt légitime selon le contexte.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Exécution des missions, facturation et paiement</td>
                    <td className="py-3 px-4">Exécution du contrat et obligations légales.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Sécurité, prévention de la fraude et journalisation</td>
                    <td className="py-3 px-4">Intérêt légitime et/ou obligation légale.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Mesure d'audience et services non essentiels</td>
                    <td className="py-3 px-4">Consentement lorsqu'il est requis.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Communications facultatives</td>
                    <td className="py-3 px-4">Consentement ou autre base permise selon le contexte B2B.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Section 4 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">04.</span>
              Qualification assistée par intelligence artificielle
            </h2>
            <p>
              Des outils d'IA ou d'automatisation peuvent assister l'analyse de candidatures, la notation de tests, l'identification de compétences et le matching avec des missions. UNITGROWTH documente les outils utilisés, les données transmises, la logique générale et les conséquences possibles.
              Si une décision ayant un effet juridique ou affectant significativement une personne repose exclusivement sur un traitement automatisé, les garanties et droits requis par la réglementation applicable doivent être mis en place. Dans les processus de recrutement/sélection, une supervision humaine appropriée est recommandée.
            </p>
          </motion.section>

          {/* Section 5 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">05.</span>
              Destinataires
            </h2>
            <p>
              Selon le besoin d'en connaître, les données peuvent être accessibles aux équipes autorisées d'IAWeb.dev et HAVET DIGITAL, aux responsables de projet, aux personnes chargées de la qualification et de la gestion administrative, ainsi qu'aux prestataires techniques nécessaires au fonctionnement de UNITGROWTH.
            </p>
          </motion.section>

          {/* Section 6 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">06.</span>
              Hébergement et prestataires
            </h2>
            <p>
              La plateforme est hébergée chez OVH SAS, 2 rue Kellermann, 59100 Roubaix, France. D'autres prestataires peuvent intervenir pour l'e-mail, l'authentification, l'analyse d'audience, les outils d'IA, le support, la gestion de projet ou les paiements. La liste doit être tenue à jour en interne et communiquée lorsque la loi l'exige.
            </p>
          </motion.section>

          {/* Section 7 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">07.</span>
              Transferts entre France, Union européenne et Maroc
            </h2>
            <p>
              Le fonctionnement commun de UNITGROWTH implique potentiellement des accès ou transferts de données entre la France/EEE et le Maroc. Lorsque le RGPD exige une garantie pour un transfert vers un pays tiers, les parties mettent en place le mécanisme approprié, par exemple des clauses contractuelles types et les mesures complémentaires nécessaires. IAWeb.dev doit également respecter les formalités marocaines applicables aux transferts internationaux de données personnelles.
            </p>
          </motion.section>

          {/* Section 8 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">08.</span>
              Durées de conservation
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 px-4 font-bold text-white w-1/3">Compte actif</td>
                    <td className="py-3 px-4">Pendant la durée d'utilisation puis le temps nécessaire à la clôture et à la preuve de la relation.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Candidature non retenue / profil conservé</td>
                    <td className="py-3 px-4">Jusqu'à 2 ans à compter du dernier contact si ce choix est justifié.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Tests et évaluations</td>
                    <td className="py-3 px-4">Durée nécessaire à la qualification et au suivi des opportunités.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Missions et contrats</td>
                    <td className="py-3 px-4">Pendant la relation puis archivage pendant les délais de prescription applicables.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Factures et pièces comptables</td>
                    <td className="py-3 px-4">Durée légale applicable à l'entité contractante.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Logs de sécurité</td>
                    <td className="py-3 px-4">Durée proportionnée au besoin de sécurité, à documenter.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-white">Choix cookies</td>
                    <td className="py-3 px-4">Selon la Politique de cookies et le gestionnaire de consentement.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Section 9 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">09.</span>
              Données obligatoires
            </h2>
            <p>
              Les champs marqués comme obligatoires sont nécessaires pour traiter la candidature, créer le compte ou conclure une mission. Leur absence peut empêcher le traitement de la demande.
            </p>
          </motion.section>

          {/* Section 10 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">10.</span>
              Sécurité
            </h2>
            <p>
              Les exploitants mettent en place des mesures techniques et organisationnelles adaptées aux risques : contrôle d'accès, habilitations, sauvegardes, chiffrement lorsque pertinent, journalisation, mises à jour de sécurité, cloisonnement et procédures de gestion des incidents.
            </p>
          </motion.section>

          {/* Section 11 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">11.</span>
              Vos droits
            </h2>
            <p>
              Selon la réglementation qui vous est applicable, vous pouvez disposer notamment de droits d'accès, rectification, effacement, limitation, opposition, portabilité et retrait du consentement. Pour une demande relative à une décision automatisée, des droits ou garanties spécifiques peuvent également s'appliquer.
              <br/><br/>
              Contact : <a href="mailto:contact@iaweb.dev" className="text-[#A8E635] hover:underline">contact@iaweb.dev</a> ou <a href="mailto:service@havetdigital.fr" className="text-[#A8E635] hover:underline">service@havetdigital.fr</a>. Une pièce d'identité ne doit être demandée que si elle est nécessaire pour vérifier raisonnablement l'identité du demandeur.
            </p>
          </motion.section>

          {/* Section 12 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">12.</span>
              Réclamations
            </h2>
            <p>
              Lorsque le RGPD s'applique, une réclamation peut être adressée à l'autorité de contrôle compétente, notamment la CNIL en France. Lorsque la loi marocaine n° 09-08 s'applique, la CNDP peut être saisie selon les conditions prévues par cette loi.
            </p>
          </motion.section>

          {/* Section 13 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">13.</span>
              Mineurs
            </h2>
            <p>
              UNITGROWTH est destinée à des personnes majeures et n'est pas conçue pour recueillir volontairement des candidatures de mineurs.
            </p>
          </motion.section>

          {/* Section 14 */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-[#A8E635] mr-3 font-mono text-lg">14.</span>
              Mise à jour
            </h2>
            <p>
              La présente politique peut être mise à jour pour tenir compte des évolutions de la plateforme, des prestataires, des traitements ou de la réglementation.
            </p>
          </motion.section>

        </div>
      </motion.div>
    </div>
  );
};
