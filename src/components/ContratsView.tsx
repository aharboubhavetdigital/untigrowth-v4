import React from 'react';
import { FreelanceContratsView } from './FreelanceContratsView';
import { AdminContratsView } from './AdminContratsView';

export interface ModificationRequest {
  id: string;
  clause: string;
  explanation: string;
  date: string;
  status: 'En attente' | 'Acceptée' | 'Refusée';
  response?: string;
}

export interface ContratItem {
  id: string;
  title: string;
  client: string;
  freelance: string;
  email: string;
  phone?: string;
  famille: string;
  country?: string;
  address?: string;
  legalStatus?: string;
  legalId?: string; // SIRET / ICE
  score?: string;
  skills?: string[];
  tab: 'nouveaux' | 'encours' | 'historique';
  status: 'À signer' | 'Partiellement signé' | 'Actif' | 'Terminé';
  isEditable: boolean;
  unitgrowthSigned: boolean;
  freelanceSigned: boolean;
  freelanceSignatureUrl?: string;
  freelanceSignatureDate?: string;
  forfait: string;
  amountVal: string;
  periode: string;
  startDate: string;
  endDate: string;
  lieu: string;
  activeDate: string;
  workload?: string;
  contexte?: string;
  perimetre?: string;
  livrables?: string;
  paymentTerms?: string;
  clauses?: string;
  internalNotes?: string;
  
  // Entreprise contractante (iaweb.dev vs HAVET DIGITAL)
  contractingCompany: 'iaweb' | 'havet';
  companyImposed: boolean;

  // Modification Requests from Freelancer
  modificationRequests?: ModificationRequest[];

  // Conversation & Counter-proposals
  comments?: {
    id: string;
    author: string;
    role: string;
    text: string;
    date: string;
    type?: 'comment' | 'counter_proposal' | 'validation';
  }[];
}

export interface CompanyInfo {
  id: 'iaweb' | 'havet';
  name: string;
  displayName: string;
  legalName: string;
  tagline: string;
  logoType: 'iaweb' | 'havet';
  logoUrl?: string;
  address: string;
  ice: string;
  email: string;
  phone: string;
  representative: string;
  representativeTitle: string;
  jurisdiction: string;
  countryScope: string;
  currency: string;
  color: string;
  borderColor: string;
  badgeBg: string;
}

export const COMPANIES: Record<'iaweb' | 'havet', CompanyInfo> = {
  iaweb: {
    id: 'iaweb',
    name: 'iaweb.dev',
    displayName: 'iaweb.dev (SARL - Maroc)',
    legalName: 'iaweb.dev SARL (Capital : 100 000 MAD)',
    tagline: 'Société émettrice pour les prestataires et missions basés au Maroc ou zone internationale.',
    logoType: 'iaweb',
    logoUrl: 'https://iaweb.dev/wp-content/uploads/2025/10/Frame-1261156058.svg',
    address: 'N°23 Boulevard Yaaqoub El Mansour, Immeuble Espace Guéliz, 1er étage, Bureau n°5, Marrakech, Maroc',
    ice: '003375388000001 (RC Marrakech n° 141395)',
    email: 'contact@iaweb.dev',
    phone: '+212 5 24 00 11 22',
    representative: 'M. Gonzague HAVET',
    representativeTitle: 'Co-gérant, dûment habilité',
    jurisdiction: 'Tribunal de Commerce de Marrakech (Droit Marocain)',
    countryScope: 'Prestataires résidant au Maroc & Afrique',
    currency: 'MAD / DH',
    color: '#A8E635',
    borderColor: 'border-[#A8E635]/40',
    badgeBg: 'bg-[#A8E635]/10',
  },
  havet: {
    id: 'havet',
    name: 'HAVET DIGITAL',
    displayName: 'HAVET DIGITAL (SAS - France)',
    legalName: 'HAVET DIGITAL SAS (Capital : 16 000 €)',
    tagline: 'Société émettrice pour les prestataires et missions basés en France et Union Européenne.',
    logoType: 'havet',
    logoUrl: 'https://havetdigital.fr/wp-content/uploads/2023/04/signature-mail-havet-digitale.png',
    address: '9 rue des Bouleaux, Arteparc Bât. 4, 59810 Lesquin, France',
    ice: 'RCS Lille Métropole n° 844 634 667',
    email: 'contact@havetdigital.app',
    phone: '+33 3 20 00 11 22',
    representative: 'M. Gonzague HAVET',
    representativeTitle: 'Président, dûment habilité',
    jurisdiction: 'Juridictions du ressort de Lille (Droit Français)',
    countryScope: 'Prestataires résidant en France & Union Européenne',
    currency: 'EUR / €',
    color: '#38BDF8',
    borderColor: 'border-sky-500/40',
    badgeBg: 'bg-sky-500/10',
  },
};

export interface ContratsViewProps {
  onNavigateToOffres?: () => void;
  onNavigateToVivier?: () => void;
  userRole?: 'admin' | 'responsable' | 'freelance';
  theme?: 'dark' | 'light';
}

export const ContratsView: React.FC<ContratsViewProps> = ({
  onNavigateToOffres,
  onNavigateToVivier,
  userRole = 'admin',
  theme = 'dark',
}) => {
  if (userRole === 'freelance') {
    return (
      <FreelanceContratsView
        onNavigateToOffres={onNavigateToOffres}
        onNavigateToVivier={onNavigateToVivier}
        theme={theme}
      />
    );
  }

  return (
    <AdminContratsView
      onNavigateToOffres={onNavigateToOffres}
      onNavigateToVivier={onNavigateToVivier}
      theme={theme}
    />
  );
};

export { FreelanceContratsView } from './FreelanceContratsView';
export { AdminContratsView } from './AdminContratsView';
export default ContratsView;
