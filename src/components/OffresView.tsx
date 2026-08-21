import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Plus,
  ChevronDown,
  Check,
  X,
  Briefcase,
  Calendar,
  DollarSign,
  User,
  Users,
  Eye,
  Send,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Building,
  Clock,
  Sparkles,
  Handshake,
  ArrowRight,
  MessageSquare,
  RefreshCw,
  FileCheck2,
  UserCheck,
  XCircle,
  FileText,
} from 'lucide-react';

// Custom Dropdown Component
interface CustomFilterSelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  className?: string;
}

const CustomFilterSelect: React.FC<CustomFilterSelectProps> = ({
  value,
  onChange,
  options,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full px-3.5 py-2.5 bg-[#0B0E17] border rounded-xl text-xs text-left flex items-center justify-between cursor-pointer transition-all ${
          open
            ? 'border-[#A8E635] text-white ring-1 ring-[#A8E635]/50'
            : 'border-white/10 text-white hover:border-[#A8E635]/50'
        }`}
      >
        <span className="truncate font-medium">{value}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#98A2B3] transition-transform ml-2 shrink-0 ${
            open ? 'rotate-180 text-[#A8E635]' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 left-0 mt-1.5 z-50 bg-[#13161C] border border-white/20 rounded-xl shadow-2xl py-1.5 text-xs max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100 backdrop-blur-md">
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`px-3.5 py-2 mx-1 my-0.5 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#A8E635] text-[#0B0D10] font-black shadow-md shadow-[#A8E635]/15'
                    : 'text-white/90 hover:bg-white/10 hover:text-white font-medium'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#0B0D10] shrink-0" />}
                  <span className={`truncate ${!isSelected ? 'ml-5' : ''}`}>{option}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export interface CounterProposal {
  id: string;
  authorRole: 'freelance' | 'admin';
  authorName: string;
  proposedBudget: string; // e.g. "92.000 DH"
  proposedEcheance?: string;
  note?: string;
  timestamp: string;
}

export interface PropositionItem {
  id: string;
  freelanceName: string;
  freelanceAvatar?: string;
  freelanceSpecialite: string;
  initialProposedBudget: string;
  currentBudget: string;
  status: 'Proposé' | 'En négociation' | 'Accepté' | 'Refusé' | 'Contrat créé';
  lastActionBy: 'freelance' | 'admin';
  lastCounterProposal?: CounterProposal;
  history: CounterProposal[];
  submittedDate: string;
}

export interface MissionOffer {
  id: string;
  title: string;
  client: string;
  tabCategory: 'ouverts' | 'contrats' | 'encours' | 'historique';
  status: 'Ouverte' | 'En sélection' | 'Contractualisée' | 'Annulée';
  visibility: 'Offre ouverte' | 'Invitation ciblée';
  famille: string;
  echeance: string;
  budget: string; // e.g. "100.000 DH"
  propositionsCount?: number;
  progressPercentage?: number;
  description?: string;
  contexte?: string;
  perimetre?: string;
  livrables?: string;
  // Contract-specific fields
  retenuName?: string;
  contratStatus?: 'À signer' | 'Actif' | 'Terminé';
  contratDetails?: string; // e.g. "90.000 DH · 43% projet · 1/3 étape(s)"
  propositions?: PropositionItem[];
}

export const initialMissionOffers: MissionOffer[] = [
  // Ouverts (5)
  {
    id: 'off-1',
    title: 'Refonte plateforme e-commerce B2B',
    client: 'Client Atlas Distribution',
    tabCategory: 'ouverts',
    status: 'En sélection',
    visibility: 'Offre ouverte',
    famille: 'Développement full stack',
    echeance: '18/09/2026',
    budget: '100.000 DH',
    propositionsCount: 2,
    progressPercentage: 70,
    description: 'Modernisation globale de la plateforme de vente en gros avec tunnel B2B et connecteur ERP Sage.',
    contexte: 'Distributeur national de premier plan souhaitant digitaliser l\'ensemble de ses flux de commandes clients.',
    perimetre: 'Next.js 14, NestJS, architecture micro-services, passerelle de paiement CMI & Stripe.',
    livrables: 'Frontend B2B réactif, portail client, connecteur ERP sécurisé, guide de déploiement.',
    propositions: [
      {
        id: 'prop-1',
        freelanceName: 'Mehdi Alami',
        freelanceSpecialite: 'Développeur Full Stack Senior',
        initialProposedBudget: '98.000 DH',
        currentBudget: '92.000 DH',
        status: 'En négociation',
        lastActionBy: 'admin',
        submittedDate: '20/08/2026',
        lastCounterProposal: {
          id: 'cp-1',
          authorRole: 'admin',
          authorName: 'Manager / Super Admin',
          proposedBudget: '92.000 DH',
          note: 'Votre profil convient parfaitement. Pouvons-nous valider le projet à 92.000 DH avec livraison sous 6 semaines ?',
          timestamp: 'Aujourd\'hui à 11:15',
        },
        history: [
          {
            id: 'cp-0',
            authorRole: 'freelance',
            authorName: 'Mehdi Alami',
            proposedBudget: '98.000 DH',
            note: 'Proposition initiale comprenant le connecteur ERP Sage et tests de charge.',
            timestamp: 'Hier à 14:00',
          },
          {
            id: 'cp-1',
            authorRole: 'admin',
            authorName: 'Manager / Super Admin',
            proposedBudget: '92.000 DH',
            note: 'Votre profil convient parfaitement. Pouvons-nous valider le projet à 92.000 DH avec livraison sous 6 semaines ?',
            timestamp: 'Aujourd\'hui à 11:15',
          },
        ],
      },
      {
        id: 'prop-2',
        freelanceName: 'Youssef Benani',
        freelanceSpecialite: 'Architecte Web & Cloud',
        initialProposedBudget: '105.000 DH',
        currentBudget: '105.000 DH',
        status: 'Proposé',
        lastActionBy: 'freelance',
        submittedDate: '20/08/2026',
        history: [
          {
            id: 'cp-20',
            authorRole: 'freelance',
            authorName: 'Youssef Benani',
            proposedBudget: '105.000 DH',
            note: 'Inclus audit complet de sécurité et déploiement AWS CI/CD.',
            timestamp: 'Hier à 16:30',
          },
        ],
      },
    ],
  },
  {
    id: 'off-2',
    title: 'Agent IA de qualification de leads',
    client: 'Client Cabinet Juridis',
    tabCategory: 'ouverts',
    status: 'En sélection',
    visibility: 'Offre ouverte',
    famille: 'IA & automatisation',
    echeance: '03/09/2026',
    budget: '60.000 DH',
    propositionsCount: 1,
    progressPercentage: 50,
    description: 'Mise en place d\'un assistant conversationnel multimodal connecté à la base documentaire juridique interne.',
    contexte: 'Cabinet juridique cherchant à filtrer et qualifier automatiquement les demandes entrantes.',
    perimetre: 'Pipeline RAG avec Qdrant, orchestration LangChain/Gemini 2.5, intégration WhatsApp Business API.',
    livrables: 'Agent IA opérationnel, dashboard de supervision, guide de prise en main.',
    propositions: [
      {
        id: 'prop-3',
        freelanceName: 'Rania Skalli',
        freelanceSpecialite: 'Spécialiste IA & Data',
        initialProposedBudget: '58.000 DH',
        currentBudget: '58.000 DH',
        status: 'En négociation',
        lastActionBy: 'freelance',
        submittedDate: '21/08/2026',
        history: [
          {
            id: 'cp-30',
            authorRole: 'freelance',
            authorName: 'Rania Skalli',
            proposedBudget: '58.000 DH',
            note: 'Livraison possible sous 3 semaines avec pipeline RAG optimisé pour le Droit des affaires.',
            timestamp: 'Ce matin à 09:30',
          },
        ],
      },
    ],
  },
  {
    id: 'off-3',
    title: 'API mobile et back-office de réservation',
    client: 'Client Nomad Stay',
    tabCategory: 'ouverts',
    status: 'Ouverte',
    visibility: 'Offre ouverte',
    famille: 'Développement full stack',
    echeance: '23/09/2026',
    budget: '85.000 DH',
    propositionsCount: 0,
    progressPercentage: 15,
    description: 'Création d\'une architecture API REST et d\'un dashboard administrateur pour service d\'hôtellerie nomade.',
    contexte: 'Scale-up hospitality en pleine expansion internationale.',
    perimetre: 'API Node.js/TypeScript, base PostgreSQL, panel admin Tailwind + React.',
    livrables: 'Documentation Swagger, suite de tests unitaires, back-office complet.',
    propositions: [],
  },
  {
    id: 'off-4',
    title: 'Landing pages no-code + CRM Airtable',
    client: 'Client GreenGrow',
    tabCategory: 'ouverts',
    status: 'Ouverte',
    visibility: 'Offre ouverte',
    famille: 'No-code',
    echeance: '29/08/2026',
    budget: '22.000 DH',
    propositionsCount: 0,
    progressPercentage: 40,
    description: 'Conception de 4 landing pages à fort taux de conversion connectées à Airtable et Make.',
    contexte: 'Startup agritech lançant une nouvelle gamme de produits B2B.',
    perimetre: 'Webflow, formulaires interactifs, scénarios d\'automatisation Make.',
    livrables: 'Pages Webflow publiées, base Airtable structurée, webhooks configurés.',
    propositions: [],
  },
  {
    id: 'off-5',
    title: 'Community management & contenu LinkedIn B2B',
    client: 'Client DataForge',
    tabCategory: 'ouverts',
    status: 'Ouverte',
    visibility: 'Offre ouverte',
    famille: 'Marketing digital',
    echeance: '18/08/2026',
    budget: '45.000 DH',
    propositionsCount: 0,
    progressPercentage: 30,
    description: 'Stratégie éditoriale et production de 16 posts LinkedIn mensuels pour positionnement d\'experts data.',
    contexte: 'Entreprise de conseil en data intelligence.',
    perimetre: 'Calendrier éditorial, rédaction des contenus, visuels Notion/Canva, reporting d\'engagement.',
    livrables: 'Planning mensuel validé, posts rédigés, analyse mensuelle des KPIs.',
    propositions: [],
  },

  // Contrats (1)
  {
    id: 'off-6',
    title: 'Automatisation reporting commercial',
    client: 'Client Sofalog',
    tabCategory: 'contrats',
    status: 'Contractualisée',
    visibility: 'Invitation ciblée',
    famille: 'IA & automatisation',
    echeance: '25/08/2026',
    budget: '30.000 DH',
    retenuName: 'Hery Randria',
    contratStatus: 'À signer',
    contratDetails: '30.000 DH',
    description: 'Pipeline automatisé d\'extraction de données CRM HubSpot et génération de rapports PDF automatisés.',
  },

  // En cours (1)
  {
    id: 'off-7',
    title: "Campagnes d'acquisition multi-canal",
    client: 'Client Riad Collection',
    tabCategory: 'encours',
    status: 'Contractualisée',
    visibility: 'Offre ouverte',
    famille: 'Marketing digital',
    echeance: '25/07/2026',
    budget: '90.000 DH',
    retenuName: 'Rania Skalli',
    contratStatus: 'Actif',
    contratDetails: '90.000 DH · 43% projet · 1/3 étape(s)',
    description: 'Gestion et optimisation des campagnes Google Ads et Meta Ads pour 6 établissements hôteliers haut de gamme.',
  },

  // Historique (1)
  {
    id: 'off-8',
    title: 'Application interne de gestion de stock (no-code)',
    client: 'Client PharmaSud',
    tabCategory: 'historique',
    status: 'Contractualisée',
    visibility: 'Offre ouverte',
    famille: 'No-code',
    echeance: '04/06/2026',
    budget: '28.000 DH',
    retenuName: 'Lova Rasoanaivo',
    contratStatus: 'Terminé',
    contratDetails: '28.000 DH · 2 facture(s)',
    description: 'Application Softr + Airtable pour le suivi des inventaires pharmaceutiques en temps réel.',
  },
];

interface OffresViewProps {
  userRole?: 'superadmin' | 'admin' | 'responsable' | 'freelance';
}

export const OffresView: React.FC<OffresViewProps> = ({ userRole = 'superadmin' }) => {
  const isFreelance = userRole === 'freelance';
  const isSuperAdmin = userRole === 'superadmin' || userRole === 'admin' || userRole === 'responsable';

  const [offers, setOffers] = useState<MissionOffer[]>(initialMissionOffers);
  const [activeTab, setActiveTab] = useState<'ouverts' | 'contrats' | 'encours' | 'historique'>('ouverts');

  // Filters
  const [search, setSearch] = useState('');
  const [familleFilter, setFamilleFilter] = useState('Toutes les familles');
  const [visibilityFilter, setVisibilityFilter] = useState('Toute visibilité');
  const [statusFilter, setStatusFilter] = useState('Tous les statuts');

  // Modals
  const [selectedOffer, setSelectedOffer] = useState<MissionOffer | null>(null);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Negotiation Form States in Modal
  const [showCounterForm, setShowCounterForm] = useState(false);
  const [activePropId, setActivePropId] = useState<string | null>(null);
  const [counterBudget, setCounterBudget] = useState('');
  const [counterNote, setCounterNote] = useState('');

  // Freelance New Proposal State in Modal
  const [showNewPropForm, setShowNewPropForm] = useState(false);
  const [newPropBudget, setNewPropBudget] = useState('');
  const [newPropNote, setNewPropNote] = useState('');

  // New offer form state matching screenshot
  const [newVisibility, setNewVisibility] = useState<'Offre ouverte' | 'Invitation ciblée'>('Offre ouverte');
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newFamille, setNewFamille] = useState('Développement full stack');
  const [newBudget, setNewBudget] = useState('');
  const [newChargeEstimee, setNewChargeEstimee] = useState('');
  const [newEcheance, setNewEcheance] = useState('');
  const [newContexte, setNewContexte] = useState('');
  const [newPerimetre, setNewPerimetre] = useState('');
  const [newLivrables, setNewLivrables] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Helper to format budget with DH
  const formatBudget = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return '0 DH';
    if (trimmed.toUpperCase().includes('DH')) return trimmed;
    // Add dot separators if numeric
    const num = trimmed.replace(/\D/g, '');
    if (num) {
      return Number(num).toLocaleString('fr-FR').replace(/\s/g, '.') + ' DH';
    }
    return trimmed + ' DH';
  };

  // --- AUTO CONTRACT CREATION HANDLER ---
  const handleCreateContract = (offerId: string, prop: PropositionItem) => {
    const finalBudget = prop.currentBudget;
    const winnerName = prop.freelanceName;

    setOffers((prevOffers) =>
      prevOffers.map((o) => {
        if (o.id !== offerId) return o;

        const updatedPropositions = (o.propositions || []).map((p) => {
          if (p.id === prop.id) {
            return {
              ...p,
              status: 'Contrat créé' as const,
            };
          }
          return {
            ...p,
            status: p.status === 'Contrat créé' ? p.status : ('Refusé' as const),
          };
        });

        return {
          ...o,
          tabCategory: 'contrats' as const,
          status: 'Contractualisée' as const,
          retenuName: winnerName,
          contratStatus: 'À signer' as const,
          contratDetails: `${finalBudget} · À signer`,
          propositions: updatedPropositions,
        };
      })
    );

    // Update active modal selected offer
    setSelectedOffer((prev) => {
      if (!prev || prev.id !== offerId) return prev;

      const updatedPropositions = (prev.propositions || []).map((p) => {
        if (p.id === prop.id) {
          return {
            ...p,
            status: 'Contrat créé' as const,
          };
        }
        return {
          ...p,
          status: p.status === 'Contrat créé' ? p.status : ('Refusé' as const),
        };
      });

      return {
        ...prev,
        tabCategory: 'contrats',
        status: 'Contractualisée',
        retenuName: winnerName,
        contratStatus: 'À signer',
        contratDetails: `${finalBudget} · À signer`,
        propositions: updatedPropositions,
      };
    });

    showToast(
      `🎉 Accord conclu ! Le contrat pour "${winnerName}" (${finalBudget}) a été créé automatiquement.`
    );
  };

  // --- FREELANCE ACTIONS ---
  const handleFreelanceAcceptProposal = (offerId: string, propId: string) => {
    const offer = offers.find((o) => o.id === offerId);
    const prop = offer?.propositions?.find((p) => p.id === propId);
    if (offer && prop) {
      handleCreateContract(offerId, prop);
    }
  };

  const handleFreelanceCounterProposal = (
    offerId: string,
    propId: string,
    newBudgetVal: string,
    noteVal: string
  ) => {
    const formatted = formatBudget(newBudgetVal);
    const newCp: CounterProposal = {
      id: 'cp-' + Date.now(),
      authorRole: 'freelance',
      authorName: 'Mehdi Alami (Moi)',
      proposedBudget: formatted,
      note: noteVal.trim() || 'Contre-proposition soumise par le freelance.',
      timestamp: 'À l\'instant',
    };

    setOffers((prevOffers) =>
      prevOffers.map((o) => {
        if (o.id !== offerId) return o;
        const updatedProps = (o.propositions || []).map((p) => {
          if (p.id !== propId) return p;
          return {
            ...p,
            currentBudget: formatted,
            lastActionBy: 'freelance' as const,
            status: 'En négociation' as const,
            lastCounterProposal: newCp,
            history: [...p.history, newCp],
          };
        });
        return { ...o, propositions: updatedProps };
      })
    );

    setSelectedOffer((prev) => {
      if (!prev || prev.id !== offerId) return prev;
      const updatedProps = (prev.propositions || []).map((p) => {
        if (p.id !== propId) return p;
        return {
          ...p,
          currentBudget: formatted,
          lastActionBy: 'freelance' as const,
          status: 'En négociation' as const,
          lastCounterProposal: newCp,
          history: [...p.history, newCp],
        };
      });
      return { ...prev, propositions: updatedProps };
    });

    showToast(`Contre-proposition de ${formatted} transmise au client / manager. En attente de sa réponse.`);
  };

  const handleFreelanceDeclineProposal = (offerId: string, propId: string) => {
    setOffers((prevOffers) =>
      prevOffers.map((o) => {
        if (o.id !== offerId) return o;
        const updatedProps = (o.propositions || []).map((p) => {
          if (p.id !== propId) return p;
          return { ...p, status: 'Refusé' as const };
        });
        return { ...o, propositions: updatedProps };
      })
    );

    setSelectedOffer((prev) => {
      if (!prev || prev.id !== offerId) return prev;
      const updatedProps = (prev.propositions || []).map((p) => {
        if (p.id !== propId) return p;
        return { ...p, status: 'Refusé' as const };
      });
      return { ...prev, propositions: updatedProps };
    });

    showToast('Vous avez décliné la contre-proposition.');
  };

  const handleFreelanceSubmitNewProposal = (offerId: string, budgetVal: string, noteVal: string) => {
    const formatted = formatBudget(budgetVal);
    const newCp: CounterProposal = {
      id: 'cp-' + Date.now(),
      authorRole: 'freelance',
      authorName: 'Mehdi Alami (Moi)',
      proposedBudget: formatted,
      note: noteVal.trim() || 'Proposition initiale.',
      timestamp: 'À l\'instant',
    };

    const newProp: PropositionItem = {
      id: 'prop-' + Date.now(),
      freelanceName: 'Mehdi Alami',
      freelanceSpecialite: 'Développeur Full Stack Senior',
      initialProposedBudget: formatted,
      currentBudget: formatted,
      status: 'Proposé',
      lastActionBy: 'freelance',
      lastCounterProposal: newCp,
      history: [newCp],
      submittedDate: 'Aujourd\'hui',
    };

    setOffers((prevOffers) =>
      prevOffers.map((o) => {
        if (o.id !== offerId) return o;
        const currentProps = o.propositions || [];
        return {
          ...o,
          propositionsCount: (o.propositionsCount || 0) + 1,
          status: 'En sélection',
          propositions: [newProp, ...currentProps],
        };
      })
    );

    setSelectedOffer((prev) => {
      if (!prev || prev.id !== offerId) return prev;
      const currentProps = prev.propositions || [];
      return {
        ...prev,
        propositionsCount: (prev.propositionsCount || 0) + 1,
        status: 'En sélection',
        propositions: [newProp, ...currentProps],
      };
    });

    showToast(`Proposition de ${formatted} envoyée avec succès !`);
  };

  // --- ADMIN / MANAGER ACTIONS ---
  const handleAdminAcceptProposal = (offerId: string, propId: string) => {
    const offer = offers.find((o) => o.id === offerId);
    const prop = offer?.propositions?.find((p) => p.id === propId);
    if (offer && prop) {
      handleCreateContract(offerId, prop);
    }
  };

  const handleAdminCounterProposal = (
    offerId: string,
    propId: string,
    newBudgetVal: string,
    noteVal: string
  ) => {
    const formatted = formatBudget(newBudgetVal);
    const newCp: CounterProposal = {
      id: 'cp-' + Date.now(),
      authorRole: 'admin',
      authorName: 'Manager / Super Admin',
      proposedBudget: formatted,
      note: noteVal.trim() || 'Ajustement budgétaire proposé par l\'administration.',
      timestamp: 'À l\'instant',
    };

    setOffers((prevOffers) =>
      prevOffers.map((o) => {
        if (o.id !== offerId) return o;
        const updatedProps = (o.propositions || []).map((p) => {
          if (p.id !== propId) return p;
          return {
            ...p,
            currentBudget: formatted,
            lastActionBy: 'admin' as const,
            status: 'En négociation' as const,
            lastCounterProposal: newCp,
            history: [...p.history, newCp],
          };
        });
        return { ...o, propositions: updatedProps };
      })
    );

    setSelectedOffer((prev) => {
      if (!prev || prev.id !== offerId) return prev;
      const updatedProps = (prev.propositions || []).map((p) => {
        if (p.id !== propId) return p;
        return {
          ...p,
          currentBudget: formatted,
          lastActionBy: 'admin' as const,
          status: 'En négociation' as const,
          lastCounterProposal: newCp,
          history: [...p.history, newCp],
        };
      });
      return { ...prev, propositions: updatedProps };
    });

    showToast(`Contre-proposition de ${formatted} transmise au freelance. En attente de sa réponse.`);
  };

  const handleAdminDeclineProposal = (offerId: string, propId: string) => {
    setOffers((prevOffers) =>
      prevOffers.map((o) => {
        if (o.id !== offerId) return o;
        const updatedProps = (o.propositions || []).map((p) => {
          if (p.id !== propId) return p;
          return { ...p, status: 'Refusé' as const };
        });
        return { ...o, propositions: updatedProps };
      })
    );

    setSelectedOffer((prev) => {
      if (!prev || prev.id !== offerId) return prev;
      const updatedProps = (prev.propositions || []).map((p) => {
        if (p.id !== propId) return p;
        return { ...p, status: 'Refusé' as const };
      });
      return { ...prev, propositions: updatedProps };
    });

    showToast('La proposition a été déclinée.');
  };

  // Tab counts
  const tabCounts = {
    ouverts: offers.filter((o) => o.tabCategory === 'ouverts').length,
    contrats: offers.filter((o) => o.tabCategory === 'contrats').length,
    encours: offers.filter((o) => o.tabCategory === 'encours').length,
    historique: offers.filter((o) => o.tabCategory === 'historique').length,
  };

  // Subtitles per tab
  const tabSubtitles = {
    ouverts: 'Offres lancées avec candidatures / propositions',
    contrats: 'Offres retenues — personne choisie et contrat associé',
    encours: "Réalisation : étapes du projet (missions), documents et suivi jusqu'à 100 %",
    historique: 'Offres archivées après facturation réglée',
  };

  // Filtered offers in active tab
  const displayedOffers = offers.filter((offer) => {
    if (offer.tabCategory !== activeTab) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = offer.title.toLowerCase().includes(q);
      const matchClient = offer.client.toLowerCase().includes(q);
      const matchRetenu = offer.retenuName?.toLowerCase().includes(q) || false;
      const matchFamille = offer.famille.toLowerCase().includes(q);
      if (!matchTitle && !matchClient && !matchRetenu && !matchFamille) return false;
    }

    if (familleFilter !== 'Toutes les familles' && offer.famille.toLowerCase() !== familleFilter.toLowerCase()) {
      return false;
    }

    if (visibilityFilter !== 'Toute visibilité' && offer.visibility !== visibilityFilter) {
      return false;
    }

    if (statusFilter !== 'Tous les statuts' && offer.status !== statusFilter) {
      return false;
    }

    return true;
  });

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newClient.trim()) return;

    const formattedBudget = newBudget.trim() ? formatBudget(newBudget) : 'Tarif à définir';

    const newOffer: MissionOffer = {
      id: 'off-' + Math.random().toString(36).substring(2, 8),
      title: newTitle.trim(),
      client: newClient.trim().startsWith('Client') ? newClient.trim() : `Client ${newClient.trim()}`,
      tabCategory: 'ouverts',
      status: 'Ouverte',
      visibility: newVisibility,
      famille: newFamille,
      echeance: newEcheance.trim() || '30/09/2026',
      budget: formattedBudget,
      propositionsCount: 0,
      description: newContexte.trim() || newPerimetre.trim() || 'Mission stratégique pour notre client.',
      contexte: newContexte.trim(),
      perimetre: newPerimetre.trim(),
      livrables: newLivrables.trim(),
      propositions: [],
    };

    setOffers((prev) => [newOffer, ...prev]);
    setPublishModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewClient('');
    setNewBudget('');
    setNewChargeEstimee('');
    setNewEcheance('');
    setNewContexte('');
    setNewPerimetre('');
    setNewLivrables('');
    showToast(`Offre "${newOffer.title}" publiée avec succès !`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs rounded-xl flex items-center justify-between animate-in fade-in shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#A8E635] shrink-0" />
            <span className="font-semibold text-white">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white/60 hover:text-white text-xs font-bold px-2 py-0.5">
            ✕
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Offres de mission
          </h1>
          <p className="text-xs sm:text-sm text-[#98A2B3] mt-1 font-medium max-w-2xl leading-relaxed">
            {tabSubtitles[activeTab]}
          </p>
        </div>

        {/* Dashboard Green CTA Button - Available for SuperAdmin / Manager */}
        {isSuperAdmin && (
          <button
            onClick={() => setPublishModalOpen(true)}
            className="px-5 py-2.5 bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] font-black rounded-xl text-xs shadow-lg shadow-[#A8E635]/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95 shrink-0 self-start sm:self-center"
          >
            <Plus className="w-4 h-4 text-[#0B0D10] stroke-[3]" />
            <span>Publier une offre</span>
          </button>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-6 border-b border-white/10 text-xs font-bold overflow-x-auto no-scrollbar pt-1">
        {[
          { id: 'ouverts', label: 'Ouverts', count: tabCounts.ouverts },
          { id: 'contrats', label: 'Contrats', count: tabCounts.contrats },
          { id: 'encours', label: 'En cours', count: tabCounts.encours },
          { id: 'historique', label: 'Historique', count: tabCounts.historique },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3.5 flex items-center gap-2 transition-all relative cursor-pointer shrink-0 ${
                isActive ? 'text-[#A8E635]' : 'text-[#98A2B3] hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-black ${
                  isActive
                    ? 'bg-[#A8E635]/15 text-[#A8E635] border border-[#A8E635]/30'
                    : 'bg-white/5 text-[#98A2B3]'
                }`}
              >
                {tab.count}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A8E635] rounded-full shadow-sm shadow-[#A8E635]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher titre, client, freelance..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-[#98A2B3] focus:outline-none focus:border-[#A8E635] transition-colors"
            />
          </div>

          {/* Dropdown 1: Toutes les familles */}
          <div className="sm:col-span-2">
            <CustomFilterSelect
              value={familleFilter}
              onChange={(val) => setFamilleFilter(val)}
              options={[
                'Toutes les familles',
                'Développement full stack',
                'IA & automatisation',
                'No-code',
                'Marketing digital',
                'Chef de projet',
              ]}
            />
          </div>

          {/* Dropdown 2: Toute visibilité */}
          <div className="sm:col-span-2">
            <CustomFilterSelect
              value={visibilityFilter}
              onChange={(val) => setVisibilityFilter(val)}
              options={['Toute visibilité', 'Offre ouverte', 'Invitation ciblée']}
            />
          </div>

          {/* Dropdown 3: Tous les statuts */}
          <div className="sm:col-span-2">
            <CustomFilterSelect
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              options={['Tous les statuts', 'Ouverte', 'En sélection', 'Contractualisée', 'Annulée']}
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-[11px] font-semibold text-[#98A2B3] pt-1">
          {displayedOffers.length} résultat(s)
        </div>
      </div>

      {/* Grid of Offers Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {displayedOffers.map((offer) => {
          const hasNegotiationInProgess = offer.propositions?.some(
            (p) => p.status === 'En négociation'
          );

          return (
            <div
              key={offer.id}
              onClick={() => {
                setSelectedOffer(offer);
                setShowCounterForm(false);
                setShowNewPropForm(false);
              }}
              className="bg-[#0B0E17] hover:bg-[#0E121D] border border-white/10 hover:border-white/20 p-5 rounded-2xl shadow-xl transition-all space-y-4 cursor-pointer group flex flex-col justify-between"
            >
              {/* Card Top: Title, Client + Badges */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <h3 className="text-sm sm:text-base font-black text-white group-hover:text-[#A8E635] transition-colors leading-snug">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#98A2B3] font-medium">
                    {offer.client}
                  </p>
                </div>

                {/* Status Badges */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                      offer.status === 'En sélection'
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : offer.status === 'Ouverte'
                        ? 'bg-sky-500/15 text-sky-400 border-sky-500/30'
                        : offer.status === 'Contractualisée'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {offer.status}
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                      offer.visibility === 'Offre ouverte'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-violet-500/15 text-violet-300 border-violet-500/30'
                    }`}
                  >
                    {offer.visibility}
                  </span>
                </div>
              </div>

              {/* Middle Section: depends on Tab */}
              {activeTab === 'ouverts' ? (
                <div className="space-y-2.5 p-3.5 bg-[#A8E635] border border-[#A8E635] rounded-xl text-[#0B0E17] shadow-lg shadow-[#A8E635]/15">
                  <div className="flex items-center justify-between text-xs font-black text-[#0B0E17]">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#0B0E17] shrink-0" />
                      <span>{(offer.propositions?.length || offer.propositionsCount || 0)} proposition(s)</span>
                    </div>

                    {hasNegotiationInProgess && (
                      <span className="px-2 py-0.5 rounded bg-[#0B0E17] text-[#A8E635] text-[10px] font-black border border-[#A8E635]/40 flex items-center gap-1">
                        <Handshake className="w-3 h-3 text-[#A8E635]" />
                        Négociation en cours
                      </span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2.5 bg-[#0B0E17]/20 rounded-full overflow-hidden p-[1px]">
                      <div
                        className="h-full bg-[#0B0E17] rounded-full transition-all duration-500"
                        style={{ width: `${offer.progressPercentage ?? (offer.propositionsCount ? 70 : 15)}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono font-black text-[#A8E635] bg-[#0B0E17] px-2.5 py-0.5 rounded-md shrink-0 shadow-md">
                      {offer.progressPercentage ?? (offer.propositionsCount ? 70 : 15)}%
                    </span>
                  </div>
                </div>
              ) : (
                /* Contrats / En cours / Historique Middle Box */
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1.5 text-xs">
                  {offer.retenuName && (
                    <div className="flex items-center gap-1.5 text-white/90">
                      <span className="text-[#98A2B3]">Retenu :</span>
                      <span className="font-black text-white">{offer.retenuName}</span>
                    </div>
                  )}
                  {offer.contratStatus && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#98A2B3]">Contrat :</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                          offer.contratStatus === 'À signer'
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            : offer.contratStatus === 'Actif'
                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
                        }`}
                      >
                        {offer.contratStatus}
                      </span>
                      <span className="font-bold text-white text-xs">{offer.contratDetails}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Card Footer: Famille · Échéance · Budget */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#98A2B3] font-medium flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span>{offer.famille}</span>
                  <span>·</span>
                  <span>Échéance : {offer.echeance}</span>
                </div>
                <div className="font-black text-white text-xs text-right">
                  {offer.budget}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {displayedOffers.length === 0 && (
        <div className="bg-[#0B0E17] border border-dashed border-white/10 rounded-2xl p-12 text-center text-xs text-[#98A2B3] italic">
          Aucune offre ne correspond à vos critères de recherche.
        </div>
      )}

      {/* ================= MODAL: DETAIL DE L'OFFRE & NEGOCIATION ================= */}
      {selectedOffer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0B0E17] border border-white/20 rounded-3xl w-full max-w-3xl p-6 sm:p-8 shadow-2xl relative space-y-6 animate-in fade-in zoom-in-95 duration-150 my-auto max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => {
                setSelectedOffer(null);
                setShowCounterForm(false);
                setShowNewPropForm(false);
              }}
              className="absolute top-5 right-5 text-[#98A2B3] hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                    selectedOffer.status === 'En sélection'
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      : selectedOffer.status === 'Ouverte'
                      ? 'bg-sky-500/15 text-sky-400 border-sky-500/30'
                      : selectedOffer.status === 'Contractualisée'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                  }`}
                >
                  {selectedOffer.status}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                    selectedOffer.visibility === 'Offre ouverte'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-violet-500/15 text-violet-300 border-violet-500/30'
                  }`}
                >
                  {selectedOffer.visibility}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">{selectedOffer.title}</h2>
              <p className="text-xs text-[#98A2B3] font-medium">{selectedOffer.client} · {selectedOffer.famille}</p>
            </div>

            {/* Quick KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div>
                <span className="text-[11px] text-[#98A2B3] block">Budget cible client</span>
                <p className="text-sm font-black text-[#A8E635] mt-0.5">{selectedOffer.budget}</p>
              </div>
              <div>
                <span className="text-[11px] text-[#98A2B3] block">Échéance projet</span>
                <p className="text-sm font-bold text-white mt-0.5">{selectedOffer.echeance}</p>
              </div>
              <div>
                <span className="text-[11px] text-[#98A2B3] block">Candidatures reçues</span>
                <p className="text-sm font-bold text-white mt-0.5">
                  {(selectedOffer.propositions?.length || selectedOffer.propositionsCount || 0)} proposition(s)
                </p>
              </div>
            </div>

            {/* Description & Contexte */}
            {selectedOffer.description && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">Description de la mission</span>
                <p className="text-xs text-[#98A2B3] leading-relaxed">
                  {selectedOffer.description}
                </p>
              </div>
            )}

            {selectedOffer.perimetre && (
              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">Périmètre technique</span>
                <p className="text-xs text-[#98A2B3] leading-relaxed">
                  {selectedOffer.perimetre}
                </p>
              </div>
            )}

            {/* ================= SECTION NÉGOCIATION & PROPOSITIONS ================= */}
            <div className="bg-[#121622] border border-white/15 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#A8E635]/10 border border-[#A8E635]/30 flex items-center justify-center text-[#A8E635]">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">
                      {isFreelance ? 'Ma négociation & Proposition' : 'Négociation & Propositions'}
                    </h3>
                    <p className="text-[11px] text-[#98A2B3]">
                      {isFreelance
                        ? 'Acceptez, déclinez ou faites une contre-proposition au Manager.'
                        : 'Acceptez ou faites une contre-proposition financière puis attendez la réponse du freelance.'}
                    </p>
                  </div>
                </div>

                {selectedOffer.tabCategory === 'contrats' && (
                  <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-black text-[11px] rounded-full flex items-center gap-1.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A8E635]" />
                    Contrat créé
                  </span>
                )}
              </div>

              {/* CASE 1: CONTRACT ALREADY CREATED AUTOMATICALLY */}
              {selectedOffer.tabCategory === 'contrats' ? (
                <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#A8E635]" />
                    <span>Accord trouvé par les deux parties ! Le contrat a été automatiquement créé.</span>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed pl-6">
                    Freelance retenu : <strong className="text-white">{selectedOffer.retenuName}</strong> · Conditions : <strong className="text-[#A8E635]">{selectedOffer.contratDetails}</strong>
                  </p>
                  <div className="pt-2 pl-6">
                    <button
                      onClick={() => {
                        setSelectedOffer(null);
                        setActiveTab('contrats');
                      }}
                      className="px-4 py-2 bg-[#A8E635] text-[#0B0D10] font-black text-xs rounded-xl hover:bg-[#b8f042] transition-all flex items-center gap-1.5 shadow-lg shadow-[#A8E635]/20 cursor-pointer"
                    >
                      <FileCheck2 className="w-4 h-4 text-[#0B0D10]" />
                      <span>Consulter le contrat généré dans "Contrats"</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* CASE 2: ACTIVE NEGOTIATION WORKFLOW */
                <div className="space-y-4">
                  {/* --- FREELANCE WORKFLOW --- */}
                  {isFreelance && (
                    <div>
                      {(() => {
                        const myProp = selectedOffer.propositions?.find(
                          (p) => p.freelanceName.includes('Mehdi') || p.freelanceName.includes('Moi')
                        ) || selectedOffer.propositions?.[0];

                        // No proposal yet -> Show Apply Button / Form
                        if (!myProp && !showNewPropForm) {
                          return (
                            <div className="p-4 bg-white/[0.02] border border-dashed border-white/10 rounded-xl text-center space-y-3">
                              <p className="text-xs text-[#98A2B3]">
                                Vous n'avez pas encore soumis de proposition pour cette offre.
                              </p>
                              <button
                                onClick={() => setShowNewPropForm(true)}
                                className="px-5 py-2.5 bg-[#A8E635] text-[#0B0D10] font-black text-xs rounded-xl hover:bg-[#b8f042] transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-[#A8E635]/20 active:scale-95"
                              >
                                <Send className="w-4 h-4 text-[#0B0D10]" />
                                <span>Postuler & Soumettre une proposition</span>
                              </button>
                            </div>
                          );
                        }

                        // Form to submit initial proposal
                        if (showNewPropForm) {
                          return (
                            <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-3">
                              <h4 className="text-xs font-black text-white">Soumettre ma proposition financière</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="text-[11px] font-bold text-[#98A2B3] block mb-1">Votre tarif proposé (DH) *</label>
                                  <input
                                    type="text"
                                    placeholder="ex : 95000"
                                    value={newPropBudget}
                                    onChange={(e) => setNewPropBudget(e.target.value)}
                                    className="w-full px-3.5 py-2 bg-[#0B0E17] border border-white/10 rounded-lg text-xs text-white placeholder-[#98A2B3]/50 focus:outline-none focus:border-[#A8E635]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[11px] font-bold text-[#98A2B3] block mb-1">Délai / Disponibilité</label>
                                  <input
                                    type="text"
                                    placeholder="ex : 4 semaines"
                                    className="w-full px-3.5 py-2 bg-[#0B0E17] border border-white/10 rounded-lg text-xs text-white placeholder-[#98A2B3]/50 focus:outline-none focus:border-[#A8E635]"
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="text-[11px] font-bold text-[#98A2B3] block mb-1">Note explicative / argumentaire</label>
                                <textarea
                                  rows={2}
                                  placeholder="Note accompagnant votre proposition..."
                                  value={newPropNote}
                                  onChange={(e) => setNewPropNote(e.target.value)}
                                  className="w-full px-3.5 py-2 bg-[#0B0E17] border border-white/10 rounded-lg text-xs text-white resize-none placeholder-[#98A2B3]/50 focus:outline-none focus:border-[#A8E635]"
                                />
                              </div>
                              <div className="flex items-center justify-end gap-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => setShowNewPropForm(false)}
                                  className="px-3.5 py-1.5 bg-white/10 text-white font-bold text-xs rounded-lg hover:bg-white/20"
                                >
                                  Annuler
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (!newPropBudget.trim()) return;
                                    handleFreelanceSubmitNewProposal(selectedOffer.id, newPropBudget, newPropNote);
                                    setShowNewPropForm(false);
                                    setNewPropBudget('');
                                    setNewPropNote('');
                                  }}
                                  className="px-4 py-1.5 bg-[#A8E635] text-[#0B0D10] font-black text-xs rounded-lg hover:bg-[#b8f042]"
                                >
                                  Envoyer la proposition
                                </button>
                              </div>
                            </div>
                          );
                        }

                        // Existing proposal view for Freelance
                        if (myProp) {
                          const isPendingAdminAction = myProp.lastActionBy === 'admin' && myProp.status === 'En négociation';
                          const isWaitingForAdmin = myProp.lastActionBy === 'freelance' && myProp.status === 'En négociation';

                          return (
                            <div className="space-y-3">
                              {/* Current status header */}
                              <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/10 rounded-xl">
                                <div>
                                  <span className="text-[10px] text-[#98A2B3] uppercase font-mono tracking-wider font-bold">Votre proposition en cours</span>
                                  <p className="text-base font-black text-[#A8E635] mt-0.5">{myProp.currentBudget}</p>
                                </div>
                                <span
                                  className={`px-3 py-1 rounded-full text-[11px] font-black border ${
                                    myProp.status === 'En négociation'
                                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                      : myProp.status === 'Proposé'
                                      ? 'bg-sky-500/15 text-sky-400 border-sky-500/30'
                                      : myProp.status === 'Refusé'
                                      ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                                      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                  }`}
                                >
                                  {myProp.status}
                                </span>
                              </div>

                              {/* Negotiation thread timeline */}
                              {myProp.history && myProp.history.length > 0 && (
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                  <span className="text-[11px] font-bold text-[#98A2B3] block">Historique des échanges :</span>
                                  {myProp.history.map((cp) => (
                                    <div
                                      key={cp.id}
                                      className={`p-3 rounded-xl border text-xs space-y-1 ${
                                        cp.authorRole === 'admin'
                                          ? 'bg-amber-500/10 border-amber-500/30 text-white ml-2'
                                          : 'bg-white/5 border-white/10 text-white mr-2'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between text-[11px]">
                                        <span className="font-bold text-white flex items-center gap-1.5">
                                          {cp.authorRole === 'admin' ? '🛡️ Super Admin / Manager' : '👤 Vous'}
                                        </span>
                                        <span className="text-[#98A2B3] text-[10px]">{cp.timestamp}</span>
                                      </div>
                                      <p className="font-mono font-black text-[#A8E635]">Montant proposé : {cp.proposedBudget}</p>
                                      {cp.note && <p className="text-[#98A2B3] italic leading-relaxed">"{cp.note}"</p>}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* CASE 1: Admin sent a counter proposal -> Freelance Actions */}
                              {isPendingAdminAction && (
                                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-3">
                                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>Contre-proposition reçue du Manager ({myProp.currentBudget})</span>
                                  </div>

                                  {!showCounterForm ? (
                                    <div className="flex flex-wrap items-center gap-2 pt-1">
                                      {/* ACCEPT BUTTON */}
                                      <button
                                        onClick={() => handleFreelanceAcceptProposal(selectedOffer.id, myProp.id)}
                                        className="px-4 py-2 bg-[#A8E635] text-[#0B0D10] font-black text-xs rounded-xl hover:bg-[#b8f042] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#A8E635]/20 active:scale-95"
                                      >
                                        <Check className="w-4 h-4 text-[#0B0D10]" />
                                        <span>Accepter la proposition ({myProp.currentBudget})</span>
                                      </button>

                                      {/* COUNTER PROPOSE BUTTON */}
                                      <button
                                        onClick={() => setShowCounterForm(true)}
                                        className="px-4 py-2 bg-sky-500/20 border border-sky-500/40 text-sky-300 hover:bg-sky-500/30 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                                      >
                                        <RefreshCw className="w-3.5 h-3.5" />
                                        <span>Faire une contre-proposition</span>
                                      </button>

                                      {/* DECLINE BUTTON */}
                                      <button
                                        onClick={() => handleFreelanceDeclineProposal(selectedOffer.id, myProp.id)}
                                        className="px-3.5 py-2 bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 font-bold text-xs rounded-xl transition-all cursor-pointer"
                                      >
                                        Décliner
                                      </button>
                                    </div>
                                  ) : (
                                    /* Counter proposal form */
                                    <div className="p-3 bg-[#0B0E17] border border-white/10 rounded-xl space-y-3">
                                      <h5 className="text-xs font-black text-white">Votre contre-proposition au Manager</h5>
                                      <div>
                                        <label className="text-[11px] font-bold text-[#98A2B3] block mb-1">
                                          Nouveau montant souhaité (DH) *
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="ex : 94000"
                                          value={counterBudget}
                                          onChange={(e) => setCounterBudget(e.target.value)}
                                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#A8E635]"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-[11px] font-bold text-[#98A2B3] block mb-1">
                                          Message / justification
                                        </label>
                                        <textarea
                                          rows={2}
                                          placeholder="Explication du tarif..."
                                          value={counterNote}
                                          onChange={(e) => setCounterNote(e.target.value)}
                                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white resize-none focus:outline-none focus:border-[#A8E635]"
                                        />
                                      </div>
                                      <div className="flex items-center justify-end gap-2">
                                        <button
                                          type="button"
                                          onClick={() => setShowCounterForm(false)}
                                          className="px-3 py-1.5 bg-white/10 text-white font-bold text-xs rounded-lg hover:bg-white/20"
                                        >
                                          Annuler
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (!counterBudget.trim()) return;
                                            handleFreelanceCounterProposal(
                                              selectedOffer.id,
                                              myProp.id,
                                              counterBudget,
                                              counterNote
                                            );
                                            setShowCounterForm(false);
                                            setCounterBudget('');
                                            setCounterNote('');
                                          }}
                                          className="px-4 py-1.5 bg-[#A8E635] text-[#0B0D10] font-black text-xs rounded-lg hover:bg-[#b8f042]"
                                        >
                                          Transmettre au Manager
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* CASE 2: Waiting for Manager Response */}
                              {isWaitingForAdmin && (
                                <div className="p-3.5 bg-sky-500/10 border border-sky-500/30 rounded-xl flex items-center gap-3">
                                  <Clock className="w-5 h-5 text-sky-400 shrink-0" />
                                  <div className="text-xs">
                                    <p className="font-bold text-white">
                                      Contre-proposition envoyée ({myProp.currentBudget})
                                    </p>
                                    <p className="text-[#98A2B3]">
                                      En attente de la validation ou réponse du Super Admin / Manager.
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }
                      })()}
                    </div>
                  )}

                  {/* --- SUPER ADMIN / MANAGER WORKFLOW --- */}
                  {isSuperAdmin && (
                    <div className="space-y-4">
                      {(!selectedOffer.propositions || selectedOffer.propositions.length === 0) ? (
                        <div className="p-4 bg-white/[0.02] border border-dashed border-white/10 rounded-xl text-center text-xs text-[#98A2B3]">
                          Aucune candidature / proposition n'a encore été reçue pour cette offre.
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <span className="text-xs font-bold text-white block">
                            Propositions reçues ({selectedOffer.propositions.length}) :
                          </span>

                          {selectedOffer.propositions.map((prop) => {
                            const isPendingAdminAction = prop.lastActionBy === 'freelance' && prop.status !== 'Refusé' && prop.status !== 'Contrat créé';
                            const isWaitingForFreelance = prop.lastActionBy === 'admin' && prop.status === 'En négociation';
                            const isSelectedForCounter = activePropId === prop.id && showCounterForm;

                            return (
                              <div
                                key={prop.id}
                                className={`p-4 rounded-xl border transition-all space-y-3 ${
                                  isPendingAdminAction
                                    ? 'bg-[#181D2D] border-[#A8E635]/40 shadow-lg shadow-[#A8E635]/5'
                                    : 'bg-white/[0.02] border-white/10'
                                }`}
                              >
                                {/* Header of Proposal */}
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-[#A8E635]/20 border border-[#A8E635]/40 flex items-center justify-center font-black text-[#A8E635] text-xs shrink-0">
                                      {prop.freelanceName.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                      <h5 className="text-xs font-black text-white">{prop.freelanceName}</h5>
                                      <p className="text-[11px] text-[#98A2B3]">{prop.freelanceSpecialite}</p>
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <span className="text-[10px] text-[#98A2B3] block">Montant proposé</span>
                                    <span className="text-sm font-black text-[#A8E635]">{prop.currentBudget}</span>
                                  </div>
                                </div>

                                {/* History preview */}
                                {prop.history && prop.history.length > 0 && (
                                  <div className="space-y-1.5 pl-2 border-l-2 border-white/10 py-1 text-[11px]">
                                    {prop.history.map((cp) => (
                                      <div key={cp.id} className="text-[#98A2B3]">
                                        <span className="font-bold text-white">{cp.authorName} :</span>{' '}
                                        <span className="font-mono text-[#A8E635]">{cp.proposedBudget}</span>
                                        {cp.note && <span className="italic"> — "{cp.note}"</span>}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Admin Action Bar if Freelance sent a proposal */}
                                {isPendingAdminAction && !isSelectedForCounter && (
                                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
                                    <div className="flex items-center justify-between text-xs font-bold text-white">
                                      <span>Action requise de votre part :</span>
                                      <span className="text-[#A8E635]">{prop.currentBudget}</span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 pt-1">
                                      {/* ACCEPT BUTTON -> CREATES CONTRACT AUTOMATICALLY */}
                                      <button
                                        onClick={() => handleAdminAcceptProposal(selectedOffer.id, prop.id)}
                                        className="px-4 py-2 bg-[#A8E635] text-[#0B0D10] font-black text-xs rounded-xl hover:bg-[#b8f042] transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#A8E635]/20 active:scale-95"
                                      >
                                        <Check className="w-4 h-4 text-[#0B0D10]" />
                                        <span>Accepter & Créer le contrat ({prop.currentBudget})</span>
                                      </button>

                                      {/* COUNTER-PROPOSE BUTTON */}
                                      <button
                                        onClick={() => {
                                          setActivePropId(prop.id);
                                          setShowCounterForm(true);
                                        }}
                                        className="px-4 py-2 bg-sky-500/20 border border-sky-500/40 text-sky-300 hover:bg-sky-500/30 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                                      >
                                        <RefreshCw className="w-3.5 h-3.5" />
                                        <span>Faire une contre-proposition</span>
                                      </button>

                                      {/* DECLINE BUTTON */}
                                      <button
                                        onClick={() => handleAdminDeclineProposal(selectedOffer.id, prop.id)}
                                        className="px-3 py-2 bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 font-bold text-xs rounded-xl transition-all cursor-pointer"
                                      >
                                        Décliner
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Counter Proposal Form for Admin */}
                                {isSelectedForCounter && (
                                  <div className="p-3.5 bg-[#0B0E17] border border-sky-500/40 rounded-xl space-y-3">
                                    <h5 className="text-xs font-black text-sky-400">Contre-proposition à destination de {prop.freelanceName}</h5>
                                    <div>
                                      <label className="text-[11px] font-bold text-[#98A2B3] block mb-1">
                                        Montant proposé par le client / admin (DH) *
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="ex : 90000"
                                        value={counterBudget}
                                        onChange={(e) => setCounterBudget(e.target.value)}
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#A8E635]"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[11px] font-bold text-[#98A2B3] block mb-1">
                                        Note explicative / ajustements
                                      </label>
                                      <textarea
                                        rows={2}
                                        placeholder="Note pour le freelance..."
                                        value={counterNote}
                                        onChange={(e) => setCounterNote(e.target.value)}
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white resize-none focus:outline-none focus:border-[#A8E635]"
                                      />
                                    </div>
                                    <div className="flex items-center justify-end gap-2">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setShowCounterForm(false);
                                          setActivePropId(null);
                                        }}
                                        className="px-3 py-1.5 bg-white/10 text-white font-bold text-xs rounded-lg hover:bg-white/20"
                                      >
                                        Annuler
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (!counterBudget.trim()) return;
                                          handleAdminCounterProposal(
                                            selectedOffer.id,
                                            prop.id,
                                            counterBudget,
                                            counterNote
                                          );
                                          setShowCounterForm(false);
                                          setActivePropId(null);
                                          setCounterBudget('');
                                          setCounterNote('');
                                        }}
                                        className="px-4 py-1.5 bg-[#A8E635] text-[#0B0D10] font-black text-xs rounded-lg hover:bg-[#b8f042]"
                                      >
                                        Transmettre la contre-proposition
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {/* Waiting for Freelance Response */}
                                {isWaitingForFreelance && (
                                  <div className="p-3 bg-sky-500/10 border border-sky-500/30 rounded-xl flex items-center gap-2.5 text-xs text-sky-300 font-bold">
                                    <Clock className="w-4 h-4 shrink-0" />
                                    <span>Contre-proposition transmise ({prop.currentBudget}). En attente de la décision du freelance.</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Modal Action Buttons */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setSelectedOffer(null);
                  setShowCounterForm(false);
                  setShowNewPropForm(false);
                }}
                className="px-5 py-2.5 bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/20 transition-all cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: PUBLIER UNE OFFRE (SUPER ADMIN / MANAGER) ================= */}
      {publishModalOpen && isSuperAdmin && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0B0E17] border border-white/15 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative space-y-6 animate-in fade-in zoom-in-95 duration-150 my-auto max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setPublishModalOpen(false)}
              className="absolute top-5 right-5 text-[#98A2B3] hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5 pr-8">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Publier une offre
              </h2>
              <p className="text-xs text-[#98A2B3] font-medium leading-relaxed">
                Chaque offre a son propre forfait mission (DH), modifiable ensuite lors des négociation. Une offre ouverte apparaît chez tous les freelances de la catégorie ; une offre ciblée uniquement chez les profils sélectionnés.
              </p>
            </div>

            <form onSubmit={handlePublishSubmit} className="space-y-6">
              {/* Card 1: Type de publication */}
              <div className="bg-white/[0.02] border border-white/10 p-5 rounded-2xl space-y-3.5">
                <h3 className="text-xs sm:text-sm font-black text-white">
                  Type de publication
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Offre ouverte Option */}
                  <div
                    onClick={() => setNewVisibility('Offre ouverte')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      newVisibility === 'Offre ouverte'
                        ? 'bg-[#A8E635]/10 border-[#A8E635] shadow-lg shadow-[#A8E635]/10'
                        : 'bg-[#0B0E17]/60 border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-black ${newVisibility === 'Offre ouverte' ? 'text-[#A8E635]' : 'text-white'}`}>
                        Offre ouverte
                      </span>
                      {newVisibility === 'Offre ouverte' && (
                        <Check className="w-3.5 h-3.5 text-[#A8E635]" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#98A2B3] leading-relaxed">
                      Visible par tous les freelances validés de la famille de métier.
                    </p>
                  </div>

                  {/* Invitation ciblée Option */}
                  <div
                    onClick={() => setNewVisibility('Invitation ciblée')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      newVisibility === 'Invitation ciblée'
                        ? 'bg-[#A8E635]/10 border-[#A8E635] shadow-lg shadow-[#A8E635]/10'
                        : 'bg-[#0B0E17]/60 border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-black ${newVisibility === 'Invitation ciblée' ? 'text-[#A8E635]' : 'text-white'}`}>
                        Invitation ciblée
                      </span>
                      {newVisibility === 'Invitation ciblée' && (
                        <Check className="w-3.5 h-3.5 text-[#A8E635]" />
                      )}
                    </div>
                    <p className="text-[11px] text-[#98A2B3] leading-relaxed">
                      Envoyée uniquement aux profils que vous sélectionnez dans le vivier.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Détail de l'offre */}
              <div className="bg-white/[0.02] border border-white/10 p-5 rounded-2xl space-y-4">
                <h3 className="text-xs sm:text-sm font-black text-white">
                  Détail de l'offre
                </h3>

                {/* Titre de l'offre */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#98A2B3] block">
                    Titre de l'offre *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex : Refonte API e-commerce B2B"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0B0E17] border border-white/10 rounded-xl text-xs text-white placeholder-[#98A2B3]/60 focus:outline-none focus:border-[#A8E635] transition-colors"
                  />
                </div>

                {/* Client & Famille de métier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#98A2B3] block">
                      Client *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nom du client..."
                      value={newClient}
                      onChange={(e) => setNewClient(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#0B0E17] border border-white/10 rounded-xl text-xs text-white placeholder-[#98A2B3]/60 focus:outline-none focus:border-[#A8E635] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#98A2B3] block">
                      Famille de métier
                    </label>
                    <CustomFilterSelect
                      value={newFamille}
                      onChange={(val) => setNewFamille(val)}
                      options={[
                        'Développement full stack',
                        'IA & automatisation',
                        'No-code',
                        'Marketing digital',
                        'Chef de projet',
                      ]}
                    />
                  </div>
                </div>

                {/* Tarif de la mission & Charge estimée */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#98A2B3] block">
                      Tarif de la mission (DH)
                    </label>
                    <input
                      type="text"
                      placeholder="ex : 45000"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#0B0E17] border border-white/10 rounded-xl text-xs text-white placeholder-[#98A2B3]/60 focus:outline-none focus:border-[#A8E635] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#98A2B3] block">
                      Charge estimée
                    </label>
                    <input
                      type="text"
                      placeholder="ex : 20 j/h sur 6 semaines"
                      value={newChargeEstimee}
                      onChange={(e) => setNewChargeEstimee(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#0B0E17] border border-white/10 rounded-xl text-xs text-white placeholder-[#98A2B3]/60 focus:outline-none focus:border-[#A8E635] transition-colors"
                    />
                  </div>
                </div>

                {/* Échéance */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#98A2B3] block">
                    Échéance
                  </label>
                  <input
                    type="date"
                    value={newEcheance}
                    onChange={(e) => setNewEcheance(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0B0E17] border border-white/10 rounded-xl text-xs text-white placeholder-[#98A2B3]/60 focus:outline-none focus:border-[#A8E635] transition-colors"
                  />
                </div>

                {/* Contexte */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#98A2B3] block">
                    Contexte
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Contexte du projet, client, enjeux..."
                    value={newContexte}
                    onChange={(e) => setNewContexte(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0B0E17] border border-white/10 rounded-xl text-xs text-white placeholder-[#98A2B3]/60 focus:outline-none focus:border-[#A8E635] transition-colors resize-y min-h-[70px]"
                  />
                </div>

                {/* Périmètre & tâches */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#98A2B3] block">
                    Périmètre & tâches
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Périmètre technique, stack, modules à réaliser..."
                    value={newPerimetre}
                    onChange={(e) => setNewPerimetre(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0B0E17] border border-white/10 rounded-xl text-xs text-white placeholder-[#98A2B3]/60 focus:outline-none focus:border-[#A8E635] transition-colors resize-y min-h-[70px]"
                  />
                </div>

                {/* Livrables attendus */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#98A2B3] block">
                    Livrables attendus
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Livrables finaux attendus..."
                    value={newLivrables}
                    onChange={(e) => setNewLivrables(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0B0E17] border border-white/10 rounded-xl text-xs text-white placeholder-[#98A2B3]/60 focus:outline-none focus:border-[#A8E635] transition-colors resize-y min-h-[70px]"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPublishModalOpen(false)}
                  className="px-5 py-2.5 bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold hover:bg-white/20 transition-all cursor-pointer text-center"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] font-black rounded-xl text-xs shadow-lg shadow-[#A8E635]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4 text-[#0B0D10]" />
                  <span>
                    {newBudget.trim()
                      ? `Publier — ${formatBudget(newBudget)}`
                      : 'Publier — tarif à définir'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffresView;
