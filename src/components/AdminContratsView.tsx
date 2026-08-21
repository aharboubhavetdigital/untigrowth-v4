import React, { useState } from 'react';
import {
  FileText,
  Search,
  Lock,
  Edit3,
  Eye,
  CheckCircle2,
  Clock,
  Download,
  ArrowLeft,
  Users,
  Building2,
  Calendar,
  DollarSign,
  Plus,
  ShieldCheck,
  AlertCircle,
  FileCode2,
  MessageSquare,
  Globe,
  PenTool,
  X,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SignaturePad } from './SignaturePad';
import { ContractPdfViewer } from './ContractPdfViewer';
import {
  ContratItem,
  COMPANIES,
  ModificationRequest,
} from './ContratsView';

interface AdminContratsViewProps {
  onNavigateToOffres?: () => void;
  onNavigateToVivier?: () => void;
  contratsList?: ContratItem[];
  theme?: 'dark' | 'light';
}

export const getStatusBadge = (status: string) => {
  const norm = status.toLowerCase();
  if (norm.includes('brouillon')) {
    return (
      <span className="px-2 py-0.5 rounded-full bg-slate-500/15 text-slate-400 border border-slate-500/30 text-[10px] font-extrabold uppercase">
        📁 Brouillon
      </span>
    );
  }
  if (norm.includes('envoyé') || norm.includes('envoye')) {
    return (
      <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px] font-extrabold uppercase">
        ✉️ Envoyé
      </span>
    );
  }
  if (norm.includes('retourné') || norm.includes('retourne')) {
    return (
      <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30 text-[10px] font-extrabold uppercase">
        ↩️ Retourné
      </span>
    );
  }
  if (norm.includes('validée') || norm.includes('valide')) {
    return (
      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold uppercase">
        ✅ Validée
      </span>
    );
  }
  if (norm.includes('payé') || norm.includes('paye')) {
    return (
      <span className="px-2 py-0.5 rounded-full bg-[#A8E635]/20 text-[#A8E635] border border-[#A8E635]/35 text-[10px] font-extrabold uppercase">
        💰 Payé
      </span>
    );
  }
  if (norm.includes('signé') || norm.includes('partiellement')) {
    return (
      <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 text-[10px] font-extrabold uppercase">
        ✍️ {status}
      </span>
    );
  }
  if (norm.includes('actif')) {
    return (
      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold uppercase">
        ⚡ Actif
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded-full bg-slate-500/15 text-slate-400 border border-slate-500/20 text-[10px] font-extrabold uppercase">
      {status}
    </span>
  );
};

export const AdminContratsView: React.FC<AdminContratsViewProps> = ({
  onNavigateToOffres,
  onNavigateToVivier,
  contratsList,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const [contrats, setContrats] = useState<ContratItem[]>(() => {
    const saved = localStorage.getItem('app_contrats_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback to initial
      }
    }
    return contratsList || [
      {
        id: 'ctr-1',
        title: 'Automatisation reporting commercial',
        client: 'Client Sofalog',
        freelance: 'Hery Randria',
        email: 'hery@freelance.mg',
        phone: '+212 6 37 30 61 28',
        famille: 'IA & automatisation',
        country: 'Madagascar',
        address: 'Lot IVG 12 Faravohitra, Antananarivo',
        legalStatus: 'Auto-entrepreneur',
        legalId: 'ICE 00298371900012',
        score: '88/100',
        skills: ['Agents IA', 'n8n', 'Python', 'RAG'],
        tab: 'nouveaux',
        status: 'À signer',
        isEditable: true,
        unitgrowthSigned: false,
        freelanceSigned: false,
        forfait: '30.000 DH',
        amountVal: '30000',
        periode: '09/08/2026 → 30/08/2026',
        startDate: '2026-08-09',
        endDate: '2026-08-30',
        lieu: 'Remote / Maroc',
        activeDate: '—',
        workload: '12 j/h sur 3 semaines',
        contexte: 'Reporting hebdomadaire manuel de 6h à automatiser (extraction ERP, mise en forme, envoi).',
        perimetre: 'Pipeline n8n, connecteurs ERP, génération de rapports, alertes anomalies.',
        livrables: 'Pipeline en production, documentation, transfert de compétences.',
        paymentTerms: 'Paiement en jalons après validation des livrables. Règlement sous 15 jours à compter de la réception de facture.',
        clauses: `CONTRAT DE MISSION FREELANCE — PRESTATION DE SERVICES NUMÉRIQUES

Article 1 — Objet de la mission
Le présent contrat définit les termes et conditions de réalisation de la mission « Automatisation reporting commercial » confiée au freelance par iaweb.dev.

Article 2 — Obligations du freelance
Le freelance s'engage à exécuter la mission avec soin et diligence conformément au cahier des charges et aux livrables convenus.

Article 3 — Propriété intellectuelle
Tous les livrables, codes, scripts et documentations développés dans le cadre de cette mission deviennent la propriété exclusive de la société contractante.`,
        internalNotes: 'Freelance très réactif, entretien technique validé sans réserve.',
        contractingCompany: 'iaweb',
        companyImposed: false,
        modificationRequests: [],
        comments: [
          {
            id: 'init-1',
            author: 'Hery Randria',
            role: 'Freelance',
            text: "Bonjour, j'ai relu le projet de contrat. J'ai deux remarques concernant l'article 3 et le calendrier de livraison. Pourrions-nous faire un ajustement rapide sur le forfait ?",
            date: '20/08/2026 10:30',
            type: 'comment',
          }
        ],
      },
      {
        id: 'ctr-2',
        title: 'Développement API Microservices Cloud',
        client: 'Client Retail Tech',
        freelance: 'Julien Dupont',
        email: 'julien.dupont@freelance.fr',
        phone: '+33 6 12 34 56 78',
        famille: 'Développement full stack',
        country: 'France',
        address: '15 Rue de la Paix, 75002 Paris, France',
        legalStatus: 'SASU / Auto-entrepreneur',
        legalId: 'SIRET 892 384 102 00019',
        score: '95/100',
        skills: ['Node.js', 'React', 'Docker'],
        tab: 'nouveaux',
        status: 'À signer',
        isEditable: true,
        unitgrowthSigned: false,
        freelanceSigned: false,
        forfait: '4.500 €',
        amountVal: '4500',
        periode: '01/09/2026 → 30/09/2026',
        startDate: '2026-09-01',
        endDate: '2026-09-30',
        lieu: 'Remote / France',
        activeDate: '—',
        workload: '20 j/h sur 1 mois',
        contexte: 'Développement d\'une architecture microservices Node.js/TypeScript pour la plateforme retail.',
        perimetre: 'APIs GraphQL/REST, conteneurisation Docker, CI/CD GitHub Actions.',
        livrables: 'Code source testé, conteneurs déployés, documentation OpenAPI.',
        paymentTerms: 'Paiement à 30 jours fin de mois. Virement par HAVET DIGITAL SAS (France).',
        clauses: `CONTRAT DE MISSION FREELANCE — HAVET DIGITAL (FRANCE)

Article 1 — Objet de la mission
Prestation de développement informatique réalisée conformément à la réglementation française et aux conditions générales d'HAVET DIGITAL SAS.`,
        internalNotes: 'Prestataire basé en France — Contrat émis par HAVET DIGITAL SAS.',
        contractingCompany: 'havet',
        companyImposed: false,
        modificationRequests: [],
      },
    ];
  });

  const [activeSubTab, setActiveSubTab] = useState<'nouveaux' | 'encours' | 'historique'>('nouveaux');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDetailContract, setActiveDetailContract] = useState<ContratItem | null>(null);
  const [adminFormData, setAdminFormData] = useState<Partial<ContratItem>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [adminResponseNotes, setAdminResponseNotes] = useState<Record<string, string>>({});

  // Direct comments & counter proposal states
  const [newDirectComment, setNewDirectComment] = useState('');
  const [showCounterForm, setShowCounterForm] = useState(false);
  const [counterForfait, setCounterForfait] = useState('');
  const [counterExplanation, setCounterExplanation] = useState('');

  const handleAddContractComment = (text: string, type: 'comment' | 'counter_proposal' | 'validation' = 'comment') => {
    if (!activeDetailContract || !text.trim()) return;

    const newComment = {
      id: `ctr-comm-${Date.now()}`,
      author: 'Gonzague Havet',
      role: 'Super Admin',
      text: text.trim(),
      date: new Date().toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      type,
    };

    const updatedContract: ContratItem = {
      ...activeDetailContract,
      comments: [...(activeDetailContract.comments || []), newComment],
    };

    if (type === 'validation') {
      updatedContract.status = 'Partiellement signé';
      updatedContract.unitgrowthSigned = true;
    }

    const newContrats = contrats.map((c) => (c.id === updatedContract.id ? updatedContract : c));
    setContrats(newContrats);
    localStorage.setItem('app_contrats_list', JSON.stringify(newContrats));
    setActiveDetailContract(updatedContract);
    
    setAdminFormData(prev => ({
      ...prev,
      unitgrowthSigned: updatedContract.unitgrowthSigned,
    }));

    triggerToast(
      type === 'validation'
        ? '✓ Contrat validé avec succès'
        : type === 'counter_proposal'
        ? '✓ Contre-proposition envoyée'
        : '✓ Commentaire ajouté'
    );
  };

  // Section collapse / accordion states (1 to 8) - collapsed by default to save space
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    1: false, // Informations de la mission
    2: false, // Dates & montant
    3: false, // Informations du Freelance
    4: false, // Entreprise contractante
    5: false, // Conditions de paiement
    6: false, // Contrat de mission & PDF
    7: false, // Notes internes
    8: false, // Signatures
  });

  const toggleSection = (sectionId: number) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const expandAllSections = () => {
    setOpenSections({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true });
  };

  const collapseAllSections = () => {
    setOpenSections({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false });
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenDetail = (contract: ContratItem) => {
    let autoCompany: 'iaweb' | 'havet' = contract.contractingCompany || 'iaweb';
    if (!contract.companyImposed && contract.country) {
      const cnt = contract.country.toLowerCase();
      if (cnt.includes('france') || cnt.includes('eu') || cnt.includes('europe') || cnt.includes('fr')) {
        autoCompany = 'havet';
      } else {
        autoCompany = 'iaweb';
      }
    }
    const merged = { ...contract, contractingCompany: autoCompany };
    setActiveDetailContract(merged);
    setAdminFormData({ ...merged });
  };

  const handleSaveAdminDetail = () => {
    if (!activeDetailContract) return;

    const updatedContract: ContratItem = {
      ...activeDetailContract,
      ...adminFormData,
      forfait: adminFormData.amountVal ? `${adminFormData.amountVal} DH` : activeDetailContract.forfait,
    };

    setContrats((prev) => prev.map((c) => (c.id === updatedContract.id ? updatedContract : c)));
    setActiveDetailContract(updatedContract);
    triggerToast('✓ Modifications administratives enregistrées avec succès.');
  };

  const handleUpdateStatus = (newStatus: string) => {
    if (!activeDetailContract) return;

    const updatedContract: ContratItem = {
      ...activeDetailContract,
      status: newStatus,
    };

    setContrats((prev) => prev.map((c) => (c.id === updatedContract.id ? updatedContract : c)));
    setActiveDetailContract(updatedContract);
    triggerToast(`✓ Statut mis à jour : ${newStatus}`);
  };

  const handleCompanySignature = () => {
    if (!activeDetailContract) return;

    const isBothSigned = activeDetailContract.freelanceSigned;
    const updated: ContratItem = {
      ...activeDetailContract,
      unitgrowthSigned: true,
      status: isBothSigned ? 'Actif' : 'Partiellement signé',
      tab: isBothSigned ? 'encours' : 'nouveaux',
      activeDate: isBothSigned ? new Date().toLocaleDateString('fr-FR') : activeDetailContract.activeDate || '—',
    };

    setContrats((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setActiveDetailContract(updated);
    triggerToast('✓ Signature de l\'entreprise enregistrée par M. Gonzague HAVET.');
  };

  const handleRespondModifRequest = (reqId: string, status: 'Acceptée' | 'Refusée', responseMsg: string) => {
    if (!activeDetailContract) return;

    const updatedRequests = (activeDetailContract.modificationRequests || []).map((req) =>
      req.id === reqId ? { ...req, status, response: responseMsg } : req
    );

    const updatedContract: ContratItem = {
      ...activeDetailContract,
      modificationRequests: updatedRequests,
    };

    setContrats((prev) => prev.map((c) => (c.id === updatedContract.id ? updatedContract : c)));
    setActiveDetailContract(updatedContract);
    triggerToast(`Demande de modification ${status.toLowerCase()}.`);
  };

  const handleCreateNewContract = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = formData.get('title') as string;
    const client = formData.get('client') as string;
    const freelance = formData.get('freelance') as string;
    const country = formData.get('country') as string;
    const amountVal = formData.get('amountVal') as string;
    const famille = formData.get('famille') as string;

    const company: 'iaweb' | 'havet' = country.toLowerCase().includes('france') ? 'havet' : 'iaweb';

    const newContract: ContratItem = {
      id: `ctr-${Date.now()}`,
      title,
      client,
      freelance,
      email: `${freelance.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      famille,
      country,
      tab: 'nouveaux',
      status: 'À signer',
      isEditable: true,
      unitgrowthSigned: false,
      freelanceSigned: false,
      forfait: `${amountVal} DH`,
      amountVal,
      periode: 'Du 01/09/2026 au 30/09/2026',
      startDate: '2026-09-01',
      endDate: '2026-09-30',
      lieu: country.includes('France') ? 'Remote / France' : 'Remote / Maroc',
      activeDate: '—',
      contexte: 'Mission créée par la direction.',
      perimetre: 'Développement & intégration.',
      livrables: 'Code source et documentation.',
      paymentTerms: 'Paiement sous 30 jours à réception de facture.',
      clauses: `CONTRAT DE MISSION FREELANCE — ${COMPANIES[company].name.toUpperCase()}

Article 1 — Objet de la mission
Mission « ${title} » réalisée par le freelance pour le client ${client}.`,
      contractingCompany: company,
      companyImposed: false,
      modificationRequests: [],
    };

    setContrats((prev) => [newContract, ...prev]);
    setCreateModalOpen(false);
    triggerToast('✓ Nouveau contrat créé avec succès.');
  };

  const filteredContrats = contrats.filter((item) => {
    if (item.tab !== activeSubTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.client.toLowerCase().includes(q) ||
        item.freelance.toLowerCase().includes(q)
      );
    }
    return true;
  });

  /* ======================================================================== */
  /* SCREEN B: ADMIN DETAIL VIEW (7 SECTIONS)                                 */
  /* ======================================================================== */
  if (activeDetailContract) {
    const selectedCompanyKey = (adminFormData.contractingCompany || activeDetailContract.contractingCompany || 'iaweb') as 'iaweb' | 'havet';
    const currentCompany = COMPANIES[selectedCompanyKey];
    const pendingModifCount = (activeDetailContract.modificationRequests || []).filter((r) => r.status === 'En attente').length;

    return (
      <div className={`space-y-6 max-w-6xl mx-auto pb-16 animate-in fade-in duration-200 transition-colors duration-300 ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-[#A8E635] text-[#0B0D10] font-black text-xs px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-black/10">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header */}
        <div className={`rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4 border transition-colors ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#0B0E17] border-white/10'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveDetailContract(null)}
              className={`p-2.5 rounded-xl text-[#A8E635] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                isLight ? 'bg-slate-100 hover:bg-slate-200 border border-slate-200' : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à la liste</span>
            </button>

            <div className={`hidden sm:flex items-center gap-1.5 ml-2 border-l pl-3 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
              <button
                type="button"
                onClick={expandAllSections}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                  isLight
                    ? 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200'
                    : 'text-[#98A2B3] hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                Tout déplier
              </button>
              <button
                type="button"
                onClick={collapseAllSections}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                  isLight
                    ? 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200'
                    : 'text-[#98A2B3] hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                Tout replier
              </button>
            </div>

            <div>
              <span className={`text-[10px] uppercase font-mono font-bold block ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                ADMINISTRATION CONTRAT #{activeDetailContract.id}
              </span>
              <h1 className={`text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{activeDetailContract.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAdminDetail}
              className="px-5 py-2 rounded-xl bg-[#A8E635] text-[#0B0D10] font-black text-xs hover:bg-[#b8f042] transition-all cursor-pointer shadow-md"
            >
              Enregistrer les modifications
            </button>
          </div>
        </div>

        {/* Alert for pending modification requests */}
        {pendingModifCount > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-xs text-amber-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong className="text-amber-300 font-bold">Demande de modification en attente</strong>
                <p className="text-[11px] text-amber-200/80">
                  Le freelance a soumis {pendingModifCount} demande(s) de révision des clauses.
                </p>
              </div>
            </div>
            <a
              href="#modification-requests-zone"
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-[#0B0D10] font-black text-xs hover:bg-amber-400 cursor-pointer shrink-0"
            >
              Examiner la demande
            </a>
          </div>
        )}

        {/* CONTRACT STATUS CONTROL PANEL */}
        <div className={`p-5 rounded-2xl border shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#0B0E17] border-white/10'
        }`}>
          <div className="space-y-1">
            <h2 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
              Statut du Contrat
            </h2>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Statut actuel :
              </span>
              {getStatusBadge(activeDetailContract.status)}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'Brouillon', value: 'Brouillon', color: 'bg-slate-500/10 hover:bg-slate-500/20 text-slate-500 border-slate-500/20' },
              { label: 'Envoyé', value: 'Envoyé', color: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/20' },
              { label: 'Retourné', value: 'Retourné', color: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/20' },
              { label: 'Validée', value: 'Validée', color: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20' },
              { label: 'Payé', value: 'Payé', color: 'bg-lime-500/10 hover:bg-lime-500/20 text-[#A8E635] border-lime-500/20' },
            ].map((btn) => {
              const isActive = activeDetailContract.status.toLowerCase() === btn.value.toLowerCase();
              return (
                <button
                  key={btn.value}
                  onClick={() => handleUpdateStatus(btn.value)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-[#A8E635] text-[#0B0D10] border-[#A8E635] shadow-lg scale-105'
                      : `${btn.color} opacity-85 hover:opacity-100`
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 1: INFORMATIONS DE LA MISSION */}
        <div className={`border rounded-2xl shadow-2xl overflow-hidden transition-all ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#0B0E17] border-white/10'
        }`}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(1)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(1); } }}
            className={`w-full p-5 text-left flex items-center justify-between cursor-pointer transition-colors ${
              isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl text-[#A8E635] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <span>1. Informations de la mission</span>
                  <span className="px-3 py-1 rounded-full bg-[#A8E635]/10 text-[#A8E635] text-[11px] font-bold">
                    Éditable par l'admin ✏️
                  </span>
                </h2>
                {!openSections[1] && (
                  <p className={`text-xs mt-0.5 truncate max-w-md ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                    {adminFormData.title || activeDetailContract.title} · Client: {adminFormData.client || activeDetailContract.client}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold hidden sm:inline ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                {openSections[1] ? 'Masquer' : 'Afficher'}
              </span>
              <div className={`p-1 rounded-lg text-[#98A2B3] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                {openSections[1] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[1] && (
            <div className={`p-5 pt-0 border-t space-y-4 animate-in fade-in duration-150 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <label className={`text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Titre de la mission</label>
                  <input
                    type="text"
                    value={adminFormData.title || ''}
                    onChange={(e) => setAdminFormData({ ...adminFormData, title: e.target.value })}
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Client bénéficiaire</label>
                  <input
                    type="text"
                    value={adminFormData.client || ''}
                    onChange={(e) => setAdminFormData({ ...adminFormData, client: e.target.value })}
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Famille métier</label>
                  <input
                    type="text"
                    value={adminFormData.famille || ''}
                    onChange={(e) => setAdminFormData({ ...adminFormData, famille: e.target.value })}
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Lieu / Modalités</label>
                  <input
                    type="text"
                    value={adminFormData.lieu || ''}
                    onChange={(e) => setAdminFormData({ ...adminFormData, lieu: e.target.value })}
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={`text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Contexte de la mission</label>
                <textarea
                  rows={2}
                  value={adminFormData.contexte || ''}
                  onChange={(e) => setAdminFormData({ ...adminFormData, contexte: e.target.value })}
                  className={`w-full border text-xs rounded-xl p-3.5 outline-none transition-all ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className={`text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Livrables attendus</label>
                <textarea
                  rows={2}
                  value={adminFormData.livrables || ''}
                  onChange={(e) => setAdminFormData({ ...adminFormData, livrables: e.target.value })}
                  className={`w-full border text-xs rounded-xl p-3.5 outline-none transition-all ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: DATES & MONTANT */}
        <div className={`border rounded-2xl shadow-2xl overflow-hidden transition-all ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#0B0E17] border-white/10'
        }`}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(2)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(2); } }}
            className={`w-full p-5 text-left flex items-center justify-between cursor-pointer transition-colors ${
              isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl text-[#A8E635] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h2 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <span>2. Dates & montant</span>
                  <span className="px-3 py-1 rounded-full bg-[#A8E635]/10 text-[#A8E635] text-[11px] font-bold">
                    Éditable par l'admin ✏️
                  </span>
                </h2>
                {!openSections[2] && (
                  <p className={`text-xs mt-0.5 truncate ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                    Période : {adminFormData.startDate || '—'} au {adminFormData.endDate || '—'} · Montant : <strong className="text-[#A8E635]">{adminFormData.amountVal ? `${adminFormData.amountVal} ${currentCompany.currency}` : activeDetailContract.forfait}</strong>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold hidden sm:inline ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                {openSections[2] ? 'Masquer' : 'Afficher'}
              </span>
              <div className={`p-1 rounded-lg text-[#98A2B3] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                {openSections[2] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[2] && (
            <div className={`p-5 pt-0 border-t space-y-4 animate-in fade-in duration-150 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="space-y-1">
                  <label className={`text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Date de début</label>
                  <input
                    type="date"
                    value={adminFormData.startDate || ''}
                    onChange={(e) => setAdminFormData({ ...adminFormData, startDate: e.target.value })}
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Date de fin estimée</label>
                  <input
                    type="date"
                    value={adminFormData.endDate || ''}
                    onChange={(e) => setAdminFormData({ ...adminFormData, endDate: e.target.value })}
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Montant de la mission ({currentCompany.currency})</label>
                  <input
                    type="text"
                    value={adminFormData.amountVal || ''}
                    onChange={(e) => setAdminFormData({ ...adminFormData, amountVal: e.target.value })}
                    className={`w-full border text-[#A8E635] font-black text-sm rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 focus:bg-white' : 'bg-[#121622] border-white/10'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: INFORMATIONS FREELANCE */}
        <div className={`border rounded-2xl shadow-2xl overflow-hidden transition-all ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#0B0E17] border-white/10'
        }`}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(3)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(3); } }}
            className={`w-full p-5 text-left flex items-center justify-between cursor-pointer transition-colors ${
              isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl text-[#A8E635] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h2 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <span>3. Informations du Freelance</span>
                  <span className="px-3 py-1 rounded-full bg-[#A8E635]/10 text-[#A8E635] text-[11px] font-bold">
                    Éditable ✏️
                  </span>
                </h2>
                {!openSections[3] && (
                  <p className={`text-xs mt-0.5 truncate ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                    {adminFormData.freelance || activeDetailContract.freelance} · {adminFormData.email || activeDetailContract.email} ({adminFormData.country || '—'})
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold hidden sm:inline ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                {openSections[3] ? 'Masquer' : 'Afficher'}
              </span>
              <div className={`p-1 rounded-lg text-[#98A2B3] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                {openSections[3] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[3] && (
            <div className={`p-5 pt-0 border-t space-y-4 animate-in fade-in duration-150 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="space-y-1">
                  <label className={`text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Nom & Prénom / Raison sociale</label>
                  <input
                    type="text"
                    value={adminFormData.freelance || ''}
                    onChange={(e) => setAdminFormData({ ...adminFormData, freelance: e.target.value })}
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Adresse e-mail</label>
                  <input
                    type="email"
                    value={adminFormData.email || ''}
                    onChange={(e) => setAdminFormData({ ...adminFormData, email: e.target.value })}
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Pays de résidence</label>
                  <input
                    type="text"
                    value={adminFormData.country || ''}
                    onChange={(e) => setAdminFormData({ ...adminFormData, country: e.target.value })}
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-[11px] font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Identifiant légal (ICE / SIRET)</label>
                  <input
                    type="text"
                    value={adminFormData.legalId || ''}
                    onChange={(e) => setAdminFormData({ ...adminFormData, legalId: e.target.value })}
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: ENTREPRISE CONTRACTANTE (IAWEB.DEV VS HAVET DIGITAL) */}
        <div className={`border rounded-2xl shadow-2xl overflow-hidden transition-all ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#0B0E17] border-white/10'
        }`}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(4)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(4); } }}
            className={`w-full p-5 text-left flex items-center justify-between cursor-pointer transition-colors ${
              isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl text-[#A8E635] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <span>4. Entreprise contractante (iaweb.dev vs HAVET DIGITAL)</span>
                  <span className="px-3 py-1 rounded-full bg-[#A8E635]/10 text-[#A8E635] text-[11px] font-bold">
                    Choix modifiable par l'admin ⚙️
                  </span>
                </h2>
                {!openSections[4] && (
                  <p className={`text-xs mt-0.5 truncate ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                    Entreprise sélectionnée : <strong className={isLight ? 'text-slate-900' : 'text-white'}>{currentCompany.name}</strong> ({currentCompany.legalName})
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold hidden sm:inline ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                {openSections[4] ? 'Masquer' : 'Afficher'}
              </span>
              <div className={`p-1 rounded-lg text-[#98A2B3] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                {openSections[4] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[4] && (
            <div className={`p-5 pt-0 border-t space-y-4 animate-in fade-in duration-150 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
              <p className={`text-xs pt-4 ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                Attribuée selon le pays du freelance : <strong className="text-sky-600">HAVET DIGITAL SAS</strong> (France) ou <strong className="text-[#A8E635]">iaweb.dev SARL</strong> (Maroc).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(COMPANIES).map((comp) => {
                  const isSelected = selectedCompanyKey === comp.id;

                  return (
                    <div
                      key={comp.id}
                      onClick={() => setAdminFormData({ ...adminFormData, contractingCompany: comp.id })}
                      className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? `${comp.badgeBg} ${comp.borderColor} shadow-xl ring-2 ring-[#A8E635]/30`
                          : isLight ? 'bg-slate-50 border-slate-200 hover:border-slate-300' : 'bg-[#121622] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {comp.logoUrl && (
                            <img src={comp.logoUrl} alt={comp.name} className="h-7 w-auto object-contain" />
                          )}
                          <h3 className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{comp.name}</h3>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#A8E635]" />}
                      </div>
                      <p className={`text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{comp.legalName}</p>
                      <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>📍 {comp.address}</p>
                      <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>📄 ICE/SIRET : {comp.ice}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: CONDITIONS DE PAIEMENT */}
        <div className={`border rounded-2xl shadow-2xl overflow-hidden transition-all ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#0B0E17] border-white/10'
        }`}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(5)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(5); } }}
            className={`w-full p-5 text-left flex items-center justify-between cursor-pointer transition-colors ${
              isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl text-[#A8E635] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <h2 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <span>5. Conditions de paiement</span>
                  <span className="px-3 py-1 rounded-full bg-[#A8E635]/10 text-[#A8E635] text-[11px] font-bold">
                    Éditable par l'admin ✏️
                  </span>
                </h2>
                {!openSections[5] && (
                  <p className={`text-xs mt-0.5 truncate max-w-md ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                    {adminFormData.paymentTerms || activeDetailContract.paymentTerms}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold hidden sm:inline ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                {openSections[5] ? 'Masquer' : 'Afficher'}
              </span>
              <div className={`p-1 rounded-lg text-[#98A2B3] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                {openSections[5] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[5] && (
            <div className={`p-5 pt-0 border-t space-y-3 animate-in fade-in duration-150 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
              <div className="pt-4">
                <textarea
                  rows={3}
                  value={adminFormData.paymentTerms || ''}
                  onChange={(e) => setAdminFormData({ ...adminFormData, paymentTerms: e.target.value })}
                  className={`w-full border text-xs rounded-xl p-3.5 outline-none transition-all ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 6: CONTRAT DE MISSION & DEMANDES DE MODIFICATION */}
        <div className={`border rounded-2xl shadow-2xl overflow-hidden transition-all ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#0B0E17] border-white/10'
        }`}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(6)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(6); } }}
            className={`w-full p-5 text-left flex items-center justify-between cursor-pointer transition-colors ${
              isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl text-[#A8E635] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                <FileCode2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <span>6. Contrat de mission & PDF Officiel ({currentCompany.name})</span>
                  <span className="px-3 py-1 rounded-full bg-[#A8E635]/10 text-[#A8E635] text-[11px] font-bold">
                    Aperçu PDF & Modifiable ✏️
                  </span>
                </h2>
                {!openSections[6] && (
                  <p className={`text-xs mt-0.5 truncate ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                    Document légal officiel généré pour {currentCompany.displayName}
                    {pendingModifCount > 0 && <span className="text-amber-500 font-bold ml-2">({pendingModifCount} demande(s) en attente)</span>}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold hidden sm:inline ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                {openSections[6] ? 'Masquer' : 'Afficher'}
              </span>
              <div className={`p-1 rounded-lg text-[#98A2B3] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                {openSections[6] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[6] && (
            <div className={`p-5 pt-0 border-t space-y-4 animate-in fade-in duration-150 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
              <div className="pt-4">
                <ContractPdfViewer
                  company={currentCompany}
                  freelance={{
                    freelance: adminFormData.freelance,
                    email: adminFormData.email,
                    phone: adminFormData.phone,
                    country: adminFormData.country,
                    legalId: adminFormData.legalId,
                    legalStatus: adminFormData.legalStatus,
                  }}
                  contractTitle={adminFormData.title}
                  forfait={adminFormData.forfait}
                  client={adminFormData.client}
                  periode={`${adminFormData.startDate || '01/09/2026'} - ${adminFormData.endDate || '30/11/2026'}`}
                  paymentTerms={adminFormData.paymentTerms}
                  isSignedByFreelance={activeDetailContract.freelanceSigned}
                  freelanceSignatureDate={activeDetailContract.freelanceSignatureDate}
                  freelanceSignatureUrl={activeDetailContract.freelanceSignatureUrl}
                  isSignedByCompany={activeDetailContract.unitgrowthSigned}
                  theme={theme}
                />
              </div>

              {/* Review Modification Requests */}
              {(activeDetailContract.modificationRequests || []).length > 0 && (
                <div id="modification-requests-zone" className={`pt-3 border-t space-y-3 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                  <h3 className={`text-xs font-bold flex items-center gap-2 ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>
                    <MessageSquare className="w-4 h-4" />
                    <span>Demandes de modification du freelance</span>
                  </h3>

                  <div className="space-y-2">
                    {activeDetailContract.modificationRequests!.map((req) => (
                      <div key={req.id} className={`p-3.5 rounded-xl border space-y-2 text-xs ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#121622] border-white/10 text-white'
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className={`font-bold ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>Clause : {req.clause}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            req.status === 'Acceptée' ? 'bg-emerald-500/15 text-emerald-300' : req.status === 'Refusée' ? 'bg-red-500/15 text-red-300' : 'bg-amber-500/15 text-amber-300'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                        <p className={`text-[11px] ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>« {req.explanation} »</p>

                        {req.status === 'En attente' ? (
                          <div className={`space-y-2 pt-2 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                            <textarea
                              rows={1}
                              placeholder="Écrire un commentaire ou motif d'acceptation/refus..."
                              value={adminResponseNotes[req.id] || ''}
                              onChange={(e) => setAdminResponseNotes(prev => ({ ...prev, [req.id]: e.target.value }))}
                              className={`w-full border rounded-lg px-2.5 py-1.5 text-[11px] outline-none focus:border-[#A8E635] resize-none transition-all ${
                                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#0B0E17] border-white/10 text-white'
                              }`}
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  const note = adminResponseNotes[req.id]?.trim() || 'Non validé';
                                  handleRespondModifRequest(req.id, 'Refusée', note);
                                }}
                                className="px-3 py-1 rounded-lg bg-red-500/15 text-red-300 font-bold text-[11px] cursor-pointer"
                              >
                                Refuser
                              </button>
                              <button
                                onClick={() => {
                                  const note = adminResponseNotes[req.id]?.trim() || 'Validé';
                                  handleRespondModifRequest(req.id, 'Acceptée', note);
                                }}
                                className="px-3 py-1 rounded-lg bg-emerald-500 text-black font-black text-[11px] cursor-pointer"
                              >
                                Accepter & Valider
                              </button>
                            </div>
                          </div>
                        ) : (
                          req.response && (
                            <div className={`mt-2 p-2 border-l-2 border-[#A8E635]/50 rounded text-[11px] leading-normal ${
                              isLight ? 'bg-slate-100 text-slate-800' : 'bg-white/[0.02] text-slate-300'
                            }`}>
                              <strong className={`block font-bold text-[10px] uppercase font-mono tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>Votre réponse :</strong>
                              « {req.response} »
                            </div>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INTERACTIVE DISCUSSION & ACTIONS FOR ADMIN */}
              <div className={`pt-5 border-t space-y-4 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                <div className={`flex flex-col md:flex-row md:items-center justify-between gap-3 p-3 rounded-xl border ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02]'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#A8E635]/10 text-[#A8E635]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`text-xs font-black uppercase tracking-wider font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Négociation & Fil de Discussion (Aller-retour)
                      </h4>
                      <p className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Échanges directs et révisions de propositions entre le freelance et la direction.</p>
                    </div>
                  </div>

                  {/* Super Admin Action Buttons */}
                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <button
                      type="button"
                      onClick={() => setShowCounterForm(!showCounterForm)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
                        showCounterForm
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : isLight ? 'bg-slate-100 hover:bg-slate-200 text-[#A8E635] border border-slate-200' : 'bg-white/5 hover:bg-white/10 text-[#A8E635] border border-white/10'
                      }`}
                    >
                      💡 Faire une contre-proposition
                    </button>
                    <button
                      type="button"
                      disabled={activeDetailContract.unitgrowthSigned}
                      onClick={() => handleAddContractComment("La direction a validé la proposition de contrat et apposé sa signature.", 'validation')}
                      className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
                        activeDetailContract.unitgrowthSigned
                          ? 'bg-white/5 text-[#98A2B3] border border-white/5 cursor-not-allowed'
                          : 'bg-[#A8E635] text-[#0B0D10] hover:bg-[#b8f042]'
                      }`}
                    >
                      🛡️ Valider la proposition
                    </button>
                  </div>
                </div>

                {/* Counter-proposal Inline Form */}
                {showCounterForm && (
                  <div className={`p-4 rounded-xl space-y-3 animate-in slide-in-from-top-2 duration-150 border ${
                    isLight ? 'bg-amber-500/5 border-amber-500/20 text-slate-900' : 'bg-amber-500/10 border-amber-500/20 text-white'
                  }`}>
                    <h5 className="text-xs font-bold text-amber-500 uppercase font-mono tracking-wider">
                      Nouvelle contre-proposition de la direction
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className={`text-[10px] font-bold ${isLight ? 'text-amber-800' : 'text-amber-200'}`}>Nouveau montant forfaitaire proposé</label>
                        <input
                          type="text"
                          placeholder="Ex: 32.000 DH"
                          value={counterForfait}
                          onChange={(e) => setCounterForfait(e.target.value)}
                          className={`w-full border rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-[#A8E635] transition-all ${
                            isLight ? 'bg-white border-amber-500/30 text-slate-900' : 'bg-[#0B0E17] border-amber-500/30 text-white'
                          }`}
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <label className={`text-[10px] font-bold ${isLight ? 'text-amber-800' : 'text-amber-200'}`}>Explications, concessions ou conditions</label>
                        <input
                          type="text"
                          placeholder="Ex: Nous vous proposons un jalon supplémentaire avec un forfait global rehaussé."
                          value={counterExplanation}
                          onChange={(e) => setCounterExplanation(e.target.value)}
                          className={`w-full border rounded-lg px-2.5 py-1.5 text-xs outline-none focus:border-[#A8E635] transition-all ${
                            isLight ? 'bg-white border-amber-500/30 text-slate-900' : 'bg-[#0B0E17] border-amber-500/30 text-white'
                          }`}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowCounterForm(false)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`}
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!counterForfait.trim()) return;
                          const msg = `CONTRE-PROPOSITION DIRECTION : Nouveau montant proposé de ${counterForfait}. Explication : ${counterExplanation || 'Aucune explication.'}`;
                          
                          const updated = {
                            ...activeDetailContract,
                            forfait: counterForfait.trim(),
                            amountVal: counterForfait.trim().replace(/\D/g, ''),
                          };
                          const newContratsList = contrats.map(c => c.id === updated.id ? updated : c);
                          setContrats(newContratsList);
                          localStorage.setItem('app_contrats_list', JSON.stringify(newContratsList));
                          setActiveDetailContract(updated);
                          setAdminFormData(prev => ({ ...prev, forfait: counterForfait.trim(), amountVal: counterForfait.trim().replace(/\D/g, '') }));

                          handleAddContractComment(msg, 'counter_proposal');
                          setCounterForfait('');
                          setCounterExplanation('');
                          setShowCounterForm(false);
                        }}
                        className="px-3 py-1 rounded-lg bg-amber-500 text-[#0B0D10] font-black text-[10px] hover:bg-amber-400 cursor-pointer"
                      >
                        Envoyer la contre-proposition
                      </button>
                    </div>
                  </div>
                )}

                {/* Timeline comments list */}
                <div className="space-y-3">
                  {activeDetailContract.comments && activeDetailContract.comments.length > 0 ? (
                    <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                      {activeDetailContract.comments.map((comm) => (
                        <div
                          key={comm.id}
                          className={`p-3 rounded-xl border text-xs leading-relaxed space-y-1 ${
                            comm.type === 'validation'
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-800 dark:text-white animate-pulse'
                              : comm.type === 'counter_proposal'
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-800 dark:text-white'
                              : comm.role === 'Super Admin'
                              ? (isLight ? 'bg-slate-100 border-slate-200 text-slate-900 ml-8' : 'bg-white/5 border-white/10 text-white ml-8')
                              : (isLight ? 'bg-slate-50 border-slate-200 text-slate-800 mr-8' : 'bg-white/[0.02] border-white/5 text-white mr-8')
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="flex items-center gap-1.5">
                              {comm.role === 'Super Admin' ? '🛡️' : '👤'}
                              <span className={isLight ? 'text-slate-900' : 'text-white'}>{comm.author}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono ${
                                comm.role === 'Super Admin'
                                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                                  : 'bg-white/10 text-slate-500 dark:text-slate-300'
                              }`}>
                                {comm.role}
                              </span>
                            </span>
                            <span className="text-[#98A2B3] text-[9px] font-medium">{comm.date}</span>
                          </div>
                          <p className={`mt-1 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{comm.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-xs italic pl-2 ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Aucun message de négociation pour le moment. Rédigez un commentaire ci-dessous.</p>
                  )}
                </div>

                {/* Writing box */}
                <div className={`p-3 rounded-xl space-y-2 border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.01] border-white/5'}`}>
                  <span className={`text-[10px] font-bold uppercase font-mono tracking-wider block ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                    Écrire un message au freelance
                  </span>
                  <div className="flex gap-2">
                    <textarea
                      rows={2}
                      value={newDirectComment}
                      onChange={(e) => setNewDirectComment(e.target.value)}
                      placeholder="Tapez votre message pour le freelance (ex: Article 3 modifié...)"
                      className={`flex-1 border rounded-xl px-3 py-2 text-xs outline-none focus:border-[#A8E635] resize-none transition-all ${
                        isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#0B0E17] border-white/10 text-white'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleAddContractComment(newDirectComment);
                        setNewDirectComment('');
                      }}
                      className="px-4 py-2 bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] font-black text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 self-end shadow-md active:scale-95"
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 7: NOTES INTERNES */}
        <div className={`border rounded-2xl shadow-2xl overflow-hidden transition-all ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#0B0E17] border-white/10'
        }`}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(7)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(7); } }}
            className={`w-full p-5 text-left flex items-center justify-between cursor-pointer transition-colors ${
              isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl text-[#A8E635] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h2 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <span>7. Notes internes (iaweb.dev - Confidentiel)</span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[11px] font-bold">
                    Confidentiel
                  </span>
                </h2>
                {!openSections[7] && (
                  <p className={`text-xs mt-0.5 truncate ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                    {adminFormData.internalNotes || 'Aucune note interne saisie'}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold hidden sm:inline ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                {openSections[7] ? 'Masquer' : 'Afficher'}
              </span>
              <div className={`p-1 rounded-lg text-[#98A2B3] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                {openSections[7] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[7] && (
            <div className={`p-5 pt-0 border-t space-y-4 animate-in fade-in duration-150 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
              <div className="pt-4">
                <textarea
                  rows={2}
                  value={adminFormData.internalNotes || ''}
                  onChange={(e) => setAdminFormData({ ...adminFormData, internalNotes: e.target.value })}
                  placeholder="Notes internes invisibles pour le freelance..."
                  className={`w-full border text-xs rounded-xl p-3.5 outline-none transition-all ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 8: SIGNATURES */}
        <div className={`border rounded-2xl shadow-2xl overflow-hidden transition-all ${
          isLight ? 'bg-white border-[#A8E635]/50' : 'bg-[#0B0E17] border-[#A8E635]/30'
        }`}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(8)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(8); } }}
            className={`w-full p-5 text-left flex items-center justify-between cursor-pointer transition-colors ${
              isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#A8E635]/10 text-[#A8E635]">
                <PenTool className="w-4 h-4" />
              </div>
              <div>
                <h2 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <span>8. Signatures du contrat final</span>
                  {activeDetailContract.unitgrowthSigned ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 text-[10px] font-bold">
                      ✓ Signé entreprise
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-300 text-[10px] font-bold">
                      À signer
                    </span>
                  )}
                </h2>
                {!openSections[8] && (
                  <p className={`text-xs mt-0.5 truncate ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                    Entreprise: {activeDetailContract.unitgrowthSigned ? 'Signé' : 'Non signé'} · Freelance: {activeDetailContract.freelanceSigned ? 'Signé' : 'Non signé'}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-bold hidden sm:inline ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                {openSections[8] ? 'Masquer' : 'Afficher'}
              </span>
              <div className={`p-1 rounded-lg text-[#98A2B3] ${isLight ? 'bg-slate-100' : 'bg-white/5'}`}>
                {openSections[8] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[8] && (
            <div className={`p-6 pt-0 border-t space-y-6 animate-in fade-in duration-150 ${isLight ? 'border-slate-100' : 'border-white/5'}`}>
              <div className={`flex items-center justify-between border-b pt-4 pb-4 ${isLight ? 'border-slate-100' : 'border-white/10'}`}>
                <div>
                  <h3 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    <PenTool className="w-4 h-4 text-[#A8E635]" />
                    <span>Validation administrative par double signature</span>
                  </h3>
                  <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                    Signature de l'entreprise et du freelance.
                  </p>
                </div>

                {!activeDetailContract.unitgrowthSigned && (
                  <button
                    onClick={handleCompanySignature}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-black text-xs hover:bg-emerald-400 transition-all cursor-pointer flex items-center gap-2 shadow-lg"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Signer en tant que {currentCompany.representative}</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className={`p-4 rounded-xl border space-y-3 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#121622] border-white/10'}`}>
                  <span className={`text-[10px] uppercase font-mono font-bold block ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                    POUR {currentCompany.displayName.toUpperCase()}
                  </span>
                  <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{currentCompany.representative}</p>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>{currentCompany.representativeTitle}</p>

                  {activeDetailContract.unitgrowthSigned ? (
                    <div className={`pt-2 border-t border-dashed ${isLight ? 'border-slate-200' : 'border-white/15'}`}>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 text-xs font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>✓ Signé par l'entreprise</span>
                      </span>
                    </div>
                  ) : (
                    <div className={`pt-2 border-t border-dashed space-y-3 ${isLight ? 'border-slate-200' : 'border-white/15'}`}>
                      <p className="text-xs text-amber-600 dark:text-amber-300/80 italic">En attente de signature par l'entreprise</p>
                      <SignaturePad
                        onSave={(dataUrl) => {
                          const isBothSigned = activeDetailContract.freelanceSigned;
                          const updated: ContratItem = {
                            ...activeDetailContract,
                            unitgrowthSigned: true,
                            status: isBothSigned ? 'Actif' : 'Partiellement signé',
                            tab: isBothSigned ? 'encours' : 'nouveaux',
                            activeDate: isBothSigned ? new Date().toLocaleDateString('fr-FR') : activeDetailContract.activeDate || '—',
                          };

                          setContrats((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
                          setActiveDetailContract(updated);
                          triggerToast('✓ Signature de l\'entreprise enregistrée par M. Gonzague HAVET.');
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className={`p-4 rounded-xl border space-y-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#121622] border-white/10'}`}>
                  <span className={`text-[10px] uppercase font-mono font-bold block ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                    POUR LE FREELANCE
                  </span>
                  <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{activeDetailContract.freelance}</p>
                  <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>{activeDetailContract.legalStatus || 'Auto-entrepreneur'}</p>
                  <div className={`pt-2 border-t border-dashed ${isLight ? 'border-slate-200' : 'border-white/15'}`}>
                    {activeDetailContract.freelanceSigned ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 text-xs font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>✓ Signé par le freelance</span>
                      </span>
                    ) : (
                      <span className="text-xs text-amber-600 dark:text-amber-300/80 italic">En attente de signature par le freelance</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ======================================================================== */
  /* SCREEN A: ADMIN CONTRACTS LIST VIEW                                      */
  /* ======================================================================== */
  return (
    <div className={`space-y-6 max-w-6xl mx-auto pb-12 transition-colors duration-300 ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#A8E635] text-[#0B0D10] font-black text-xs px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-black/10">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Gestion des Contrats (Super Admin)</h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
            Édition des missions, sélection de l'entreprise contractante (iaweb.dev / HAVET DIGITAL) et suivi des signatures.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#A8E635] text-[#0B0D10] font-black text-xs hover:bg-[#b8f042] transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-[#A8E635]/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau contrat</span>
        </button>
      </div>

      {/* Subtabs and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className={`flex items-center gap-2 p-1.5 rounded-2xl border text-xs font-bold w-full sm:w-auto ${
          isLight ? 'bg-slate-200/80 border-slate-300' : 'bg-[#0B0E17] border-white/10'
        }`}>
          <button
            onClick={() => setActiveSubTab('nouveaux')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'nouveaux'
                ? 'bg-[#A8E635] text-[#0B0D10] shadow-md'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-[#98A2B3] hover:text-white'
            }`}
          >
            Nouveaux / À signer
          </button>
          <button
            onClick={() => setActiveSubTab('encours')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'encours'
                ? 'bg-[#A8E635] text-[#0B0D10] shadow-md'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-[#98A2B3] hover:text-white'
            }`}
          >
            Contrats Actifs
          </button>
          <button
            onClick={() => setActiveSubTab('historique')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'historique'
                ? 'bg-[#A8E635] text-[#0B0D10] shadow-md'
                : isLight
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-[#98A2B3] hover:text-white'
            }`}
          >
            Historique
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#98A2B3]" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border focus:border-[#A8E635] text-xs rounded-2xl pl-10 pr-4 py-2.5 outline-none transition-colors ${
              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-[#0B0E17] border-white/10 text-white'
            }`}
          />
        </div>
      </div>

      {/* Contracts List */}
      {filteredContrats.length === 0 ? (
        <div className={`border rounded-2xl p-12 text-center space-y-3 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#0B0E17] border-white/10'
        }`}>
          <FileText className="w-8 h-8 text-[#A8E635] mx-auto opacity-80" />
          <h3 className={`text-sm font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>Aucun contrat trouvé</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContrats.map((item) => {
            const company = COMPANIES[item.contractingCompany || 'iaweb'];

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  isLight
                    ? 'bg-white border-slate-200 hover:border-slate-300'
                    : 'bg-[#0B0E17] border-white/10 hover:border-[#A8E635]/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.title}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#A8E635]/10 text-[#A8E635] border border-[#A8E635]/20 text-[10px] font-bold">
                        🏢 {company.name}
                      </span>
                      {getStatusBadge(item.status)}
                    </div>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                      Freelance : <strong className={isLight ? 'text-slate-900' : 'text-white'}>{item.freelance}</strong> ({item.country || 'Maroc'}) · Client : {item.client}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-black text-[#A8E635]">{item.forfait}</span>
                    <button
                      onClick={() => handleOpenDetail(item)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                        isLight
                          ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#A8E635]" />
                      <span>Gérer le Contrat (Admin)</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0B0E17] border-white/10'
          }`}>
            <div className="flex justify-between items-center">
              <h3 className={`text-base font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Plus className="w-5 h-5 text-[#A8E635]" />
                <span>Créer un nouveau contrat de mission</span>
              </h3>
              <button onClick={() => setCreateModalOpen(false)} className={`${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-[#98A2B3] hover:text-white'} cursor-pointer`}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewContract} className="space-y-4">
              <div className="space-y-1">
                <label className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Titre de la mission</label>
                <input
                  name="title"
                  type="text"
                  required
                  placeholder="Ex: Refonte Frontend React"
                  className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Client</label>
                  <input
                    name="client"
                    type="text"
                    required
                    placeholder="Ex: Client Sofalog"
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Freelance</label>
                  <input
                    name="freelance"
                    type="text"
                    required
                    placeholder="Ex: Hery Randria"
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Pays du Freelance</label>
                  <input
                    name="country"
                    type="text"
                    required
                    placeholder="Ex: Maroc / France"
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Montant du forfait</label>
                  <input
                    name="amountVal"
                    type="text"
                    required
                    placeholder="Ex: 30000"
                    className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                      isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Famille métier</label>
                <input
                  name="famille"
                  type="text"
                  required
                  placeholder="Ex: Développement full stack"
                  className={`w-full border text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white' : 'bg-[#121622] border-white/10 text-white'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${
                    isLight ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#A8E635] text-[#0B0D10] font-black text-xs hover:bg-[#b8f042]"
                >
                  Créer le contrat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContratsView;
