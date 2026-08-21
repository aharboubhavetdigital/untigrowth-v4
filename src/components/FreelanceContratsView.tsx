import React, { useState } from 'react';
import {
  FileText,
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
  MessageSquare,
  Globe,
  PenTool,
  ShieldCheck,
  FileCode2,
  X,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  Check,
} from 'lucide-react';
import { SignaturePad } from './SignaturePad';
import { ContractPdfViewer } from './ContractPdfViewer';
import {
  ContratItem,
  COMPANIES,
  ModificationRequest,
} from './ContratsView';

interface FreelanceContratsViewProps {
  onNavigateToOffres?: () => void;
  onNavigateToVivier?: () => void;
  contratsList?: ContratItem[];
  theme?: 'dark' | 'light';
}

const getStatusBadge = (status: string) => {
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

export const FreelanceContratsView: React.FC<FreelanceContratsViewProps> = ({
  onNavigateToOffres,
  onNavigateToVivier,
  contratsList,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  // Local state for Contracts
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
Le présent contrat définit les termes et conditions de réalisation de la mission « Automatisation reporting commercial » confiée au freelance.

Article 2 — Obligations du freelance
Le freelance s'engage à exécuter la mission avec soin et diligence conformément au cahier des charges et aux livrables convenus.

Article 3 — Propriété intellectuelle
Tous les livrables, codes, scripts et documentations développés dans le cadre de cette mission deviennent la propriété exclusive de la société émettrice.`,
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
        freelance: 'Hery Randria',
        email: 'hery@freelance.mg',
        phone: '+33 6 12 34 56 78',
        famille: 'Développement full stack',
        country: 'France',
        address: '15 Rue de la Paix, 75002 Paris, France',
        legalStatus: 'Auto-entrepreneur',
        legalId: 'SIRET 892 384 102 00019',
        score: '92/100',
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
        contexte: 'Développement microservices pour la plateforme retail client.',
        perimetre: 'APIs GraphQL/REST, conteneurisation Docker, CI/CD GitHub Actions.',
        livrables: 'Code source testé, conteneurs déployés.',
        paymentTerms: 'Paiement à 30 jours fin de mois. Virement par HAVET DIGITAL SAS (France).',
        clauses: `CONTRAT DE MISSION FREELANCE — HAVET DIGITAL (FRANCE)

Article 1 — Objet de la mission
Prestation de développement informatique réalisée conformément à la réglementation française et aux conditions générales d'HAVET DIGITAL SAS.`,
        contractingCompany: 'havet',
        companyImposed: false,
        modificationRequests: [],
      },
    ];
  });

  const [activeSubTab, setActiveSubTab] = useState<'nouveaux' | 'encours' | 'historique'>('nouveaux');
  const [activeDetailContract, setActiveDetailContract] = useState<ContratItem | null>(null);
  const [freelanceFormData, setFreelanceFormData] = useState<Partial<ContratItem>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modifModalOpen, setModifModalOpen] = useState(false);
  const [signatureCanvasOpen, setSignatureCanvasOpen] = useState(false);
  const [acceptTermsChecked, setAcceptTermsChecked] = useState(false);
  const [hasSignatureTrace, setHasSignatureTrace] = useState(false);

  // Section collapse / tab states (1 to 7)
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    1: true,  // Informations de la mission
    2: false, // Dates & montant
    3: true,  // Vos informations (Freelance)
    4: false, // Entreprise contractante
    5: false, // Conditions de paiement
    6: true,  // Contrat de mission
    7: true,  // Signatures
  });

  const toggleSection = (sectionId: number) => {
    setOpenSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const expandAllSections = () => {
    setOpenSections({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true });
  };

  const collapseAllSections = () => {
    setOpenSections({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false });
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
    setFreelanceFormData({ ...merged });
    setAcceptTermsChecked(merged.freelanceSigned);
    setHasSignatureTrace(Boolean(merged.freelanceSignatureUrl));
  };

  // Freelance comments and responses
  const [newDirectComment, setNewDirectComment] = useState('');

  const handleAddContractComment = (text: string, type: 'comment' | 'counter_proposal' | 'validation' = 'comment') => {
    if (!activeDetailContract || !text.trim()) return;

    const newComment = {
      id: `ctr-comm-${Date.now()}`,
      author: activeDetailContract.freelance || 'Hery Randria',
      role: 'Freelance',
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

    const newContrats = contrats.map((c) => (c.id === updatedContract.id ? updatedContract : c));
    setContrats(newContrats);
    localStorage.setItem('app_contrats_list', JSON.stringify(newContrats));
    setActiveDetailContract(updatedContract);
    
    triggerToast(
      type === 'validation'
        ? '✓ Contre-proposition acceptée avec succès !'
        : '✓ Commentaire envoyé'
    );
  };

  const handleSaveFreelanceInfo = () => {
    if (!activeDetailContract) return;

    const updatedContract: ContratItem = {
      ...activeDetailContract,
      freelance: freelanceFormData.freelance || activeDetailContract.freelance,
      email: freelanceFormData.email || activeDetailContract.email,
      phone: freelanceFormData.phone || activeDetailContract.phone,
      country: freelanceFormData.country || activeDetailContract.country,
      address: freelanceFormData.address || activeDetailContract.address,
      legalStatus: freelanceFormData.legalStatus || activeDetailContract.legalStatus,
      legalId: freelanceFormData.legalId || activeDetailContract.legalId,
    };

    setContrats((prev) => prev.map((c) => (c.id === updatedContract.id ? updatedContract : c)));
    setActiveDetailContract(updatedContract);
    triggerToast('✓ Vos informations personnelles ont été enregistrées avec succès.');
  };

  const handleSignContract = () => {
    if (!activeDetailContract) return;
    if (!acceptTermsChecked) {
      alert('Veuillez cocher la case d\'acceptation des termes du contrat.');
      return;
    }

    const now = new Date();
    const dateStr = `Signé le ${now.toLocaleDateString('fr-FR')} à ${now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    const isBothSigned = activeDetailContract.unitgrowthSigned;

    const updated: ContratItem = {
      ...activeDetailContract,
      freelanceSigned: true,
      freelanceSignatureDate: dateStr,
      status: isBothSigned ? 'Actif' : 'Partiellement signé',
      tab: isBothSigned ? 'encours' : 'nouveaux',
      activeDate: isBothSigned ? new Date().toLocaleDateString('fr-FR') : activeDetailContract.activeDate || '—',
    };

    setContrats((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setActiveDetailContract(updated);
    triggerToast(
      isBothSigned
        ? '🎉 Double signature effectuée ! Le contrat est désormais actif.'
        : '✓ Votre signature électronique a été enregistrée avec succès.'
    );
  };

  const handleAddModificationRequest = (clause: string, text: string) => {
    if (!activeDetailContract) return;
    const newReq: ModificationRequest = {
      id: `mod-${Date.now()}`,
      clause,
      explanation: text,
      date: new Date().toLocaleDateString('fr-FR'),
      status: 'En attente',
    };

    const updated: ContratItem = {
      ...activeDetailContract,
      modificationRequests: [...(activeDetailContract.modificationRequests || []), newReq],
    };

    setContrats((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setActiveDetailContract(updated);
    setModifModalOpen(false);
    triggerToast('✓ Votre demande de modification a été soumise au responsable.');
  };

  const filteredContrats = contrats.filter((c) => c.tab === activeSubTab);

  /* ======================================================================== */
  /* SCREEN B: FREELANCE DETAIL VIEW (7 SECTIONS)                            */
  /* ======================================================================== */
  if (activeDetailContract) {
    const selectedCompanyKey = (activeDetailContract.contractingCompany || 'iaweb') as 'iaweb' | 'havet';
    const currentCompany = COMPANIES[selectedCompanyKey];

    return (
      <div className="space-y-6 text-slate-900 dark:text-slate-100 max-w-5xl mx-auto pb-16 animate-in fade-in duration-200">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-[#A8E635] text-[#0B0D10] font-black text-xs px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-black/10">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="bg-white dark:bg-[#0B0E17] border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm dark:shadow-2xl flex items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveDetailContract(null)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-[#A8E635] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à mes contrats</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 ml-2 border-l border-slate-200 dark:border-white/10 pl-3">
              <button
                type="button"
                onClick={expandAllSections}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-600 dark:text-[#98A2B3] hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                Tout déplier
              </button>
              <button
                type="button"
                onClick={collapseAllSections}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-600 dark:text-[#98A2B3] hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                Tout replier
              </button>
            </div>
          </div>

          <div className="text-right flex flex-col items-end gap-1">
            <span className="text-[10px] text-slate-500 dark:text-[#98A2B3] uppercase font-mono font-bold block">
              Espace Freelance · Contrat #{activeDetailContract.id}
            </span>
            <div className="flex items-center gap-2 justify-end">
              {getStatusBadge(activeDetailContract.status)}
              <h1 className="text-base font-black text-slate-900 dark:text-white">{activeDetailContract.title}</h1>
            </div>
          </div>
        </div>

        {/* Banner workflow */}
        <div className="bg-slate-100 dark:bg-gradient-to-r dark:from-[#0B0E17] dark:via-[#121829] dark:to-[#0B0E17] border border-[#A8E635]/40 rounded-2xl p-5 shadow-sm dark:shadow-2xl space-y-2 transition-colors">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-[#A8E635]/20 border border-[#A8E635]/40 text-[#0B0D10] dark:text-[#A8E635] text-xs font-black uppercase font-mono">
              Contrat de Prestation Freelance
            </span>

            {activeDetailContract.freelanceSigned ? (
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Contrat signé par vous</span>
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Votre signature est requise</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 dark:text-[#98A2B3]">
            Vérifiez vos informations, lisez le contrat de mission et signez électroniquement votre engagement.
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 1: INFORMATIONS DE LA MISSION (READ-ONLY) */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white dark:bg-[#0B0E17] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-2xl overflow-hidden transition-all">
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(1)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(1); } }}
            className="w-full p-5 text-left flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-[#A8E635]">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>1. Informations de la mission</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-500/10 border border-slate-200 dark:border-slate-500/20 text-slate-700 dark:text-slate-300 text-[10px] font-bold flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5 text-amber-500 dark:text-amber-400" />
                    <span>Non éditable</span>
                  </span>
                </h2>
                {!openSections[1] && (
                  <p className="text-xs text-slate-500 dark:text-[#98A2B3] mt-0.5 truncate max-w-md">
                    {activeDetailContract.title} · Client: {activeDetailContract.client}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
                {openSections[1] ? 'Masquer' : 'Afficher'}
              </span>
              <div className="p-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-[#98A2B3]">
                {openSections[1] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[1] && (
            <div className="p-5 pt-0 border-t border-slate-100 dark:border-white/5 space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-slate-50 dark:bg-[#121622] p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-[#98A2B3] font-medium block">Titre de la mission</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{activeDetailContract.title}</p>
                </div>

                <div className="bg-slate-50 dark:bg-[#121622] p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-[#98A2B3] font-medium block">Client bénéficiaire</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{activeDetailContract.client}</p>
                </div>

                <div className="bg-slate-50 dark:bg-[#121622] p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-[#98A2B3] font-medium block">Famille métier</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{activeDetailContract.famille}</p>
                </div>

                <div className="bg-slate-50 dark:bg-[#121622] p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-[#98A2B3] font-medium block">Lieu / Modalités</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{activeDetailContract.lieu}</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-[#121622] p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 space-y-1">
                <span className="text-[11px] text-slate-500 dark:text-[#98A2B3] font-medium block">Contexte & Périmètre</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{activeDetailContract.contexte || 'N/A'}</p>
              </div>

              <div className="bg-slate-50 dark:bg-[#121622] p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 space-y-1">
                <span className="text-[11px] text-slate-500 dark:text-[#98A2B3] font-medium block">Livrables attendus</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{activeDetailContract.livrables || 'N/A'}</p>
              </div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 2: DATES & MONTANT (READ-ONLY) */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white dark:bg-[#0B0E17] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-2xl overflow-hidden transition-all">
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(2)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(2); } }}
            className="w-full p-5 text-left flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-[#A8E635]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>2. Dates & montant</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-500/10 border border-slate-200 dark:border-slate-500/20 text-slate-700 dark:text-slate-300 text-[10px] font-bold flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5 text-amber-500 dark:text-amber-400" />
                    <span>Non éditable</span>
                  </span>
                </h2>
                {!openSections[2] && (
                  <p className="text-xs text-slate-500 dark:text-[#98A2B3] mt-0.5 truncate">
                    Période : {activeDetailContract.periode} · Rémunération : <strong className="text-emerald-600 dark:text-[#A8E635]">{activeDetailContract.forfait}</strong>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
                {openSections[2] ? 'Masquer' : 'Afficher'}
              </span>
              <div className="p-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-[#98A2B3]">
                {openSections[2] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[2] && (
            <div className="p-5 pt-0 border-t border-slate-100 dark:border-white/5 space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-slate-50 dark:bg-[#121622] p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-[#98A2B3] font-medium block">Période globale</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{activeDetailContract.periode}</p>
                </div>

                <div className="bg-slate-50 dark:bg-[#121622] p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-[#98A2B3] font-medium block">Volume estimé</span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{activeDetailContract.workload || 'Projet global'}</p>
                </div>

                <div className="bg-slate-50 dark:bg-[#121622] p-3.5 rounded-xl border border-slate-200/80 dark:border-white/5 space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-[#98A2B3] font-medium block">Rémunération forfaitaire</span>
                  <p className="text-sm font-black text-emerald-600 dark:text-[#A8E635]">{activeDetailContract.forfait}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 3: VOS INFORMATIONS (FREELANCE) (EDITABLE) */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white dark:bg-[#0B0E17] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-2xl overflow-hidden transition-all">
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(3)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(3); } }}
            className="w-full p-5 text-left flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#A8E635]/20 text-slate-900 dark:text-[#A8E635]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>3. Vos informations (Freelance)</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#A8E635]/15 border border-[#A8E635]/30 text-slate-900 dark:text-[#A8E635] text-[10px] font-bold flex items-center gap-1">
                    <Edit3 className="w-2.5 h-2.5" />
                    <span>Éditable</span>
                  </span>
                </h2>
                {!openSections[3] && (
                  <p className="text-xs text-slate-500 dark:text-[#98A2B3] mt-0.5 truncate">
                    {freelanceFormData.freelance || activeDetailContract.freelance} · {freelanceFormData.legalStatus || 'Auto-entrepreneur'} ({freelanceFormData.country || 'Maroc'})
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
                {openSections[3] ? 'Masquer' : 'Afficher & Modifier'}
              </span>
              <div className="p-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-[#98A2B3]">
                {openSections[3] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[3] && (
            <div className="p-5 pt-0 border-t border-slate-100 dark:border-white/5 space-y-4 animate-in fade-in duration-150">
              <p className="text-xs text-slate-600 dark:text-[#98A2B3] pt-3">
                Mettez à jour vos coordonnées administratives qui figureront sur le contrat final.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-[#98A2B3]">Nom & Prénom / Dénomination</label>
                  <input
                    type="text"
                    value={freelanceFormData.freelance || ''}
                    onChange={(e) => setFreelanceFormData({ ...freelanceFormData, freelance: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#121622] border border-slate-200 dark:border-white/10 focus:border-[#A8E635] text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-[#98A2B3]">Adresse e-mail</label>
                  <input
                    type="email"
                    value={freelanceFormData.email || ''}
                    onChange={(e) => setFreelanceFormData({ ...freelanceFormData, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#121622] border border-slate-200 dark:border-white/10 focus:border-[#A8E635] text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-[#98A2B3]">Téléphone</label>
                  <input
                    type="text"
                    value={freelanceFormData.phone || ''}
                    onChange={(e) => setFreelanceFormData({ ...freelanceFormData, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#121622] border border-slate-200 dark:border-white/10 focus:border-[#A8E635] text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-[#98A2B3]">Pays de résidence</label>
                  <input
                    type="text"
                    value={freelanceFormData.country || ''}
                    onChange={(e) => setFreelanceFormData({ ...freelanceFormData, country: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#121622] border border-slate-200 dark:border-white/10 focus:border-[#A8E635] text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-[#98A2B3]">Adresse postale officielle</label>
                  <input
                    type="text"
                    value={freelanceFormData.address || ''}
                    onChange={(e) => setFreelanceFormData({ ...freelanceFormData, address: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#121622] border border-slate-200 dark:border-white/10 focus:border-[#A8E635] text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-[#98A2B3]">Statut juridique</label>
                  <select
                    value={freelanceFormData.legalStatus || 'Auto-entrepreneur'}
                    onChange={(e) => setFreelanceFormData({ ...freelanceFormData, legalStatus: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#121622] border border-slate-200 dark:border-white/10 focus:border-[#A8E635] text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                  >
                    <option value="Auto-entrepreneur">Auto-entrepreneur / Micro-entreprise</option>
                    <option value="SARL AU">SARL AU (Société à associé unique)</option>
                    <option value="SARL">SARL / SAS / Société commercial</option>
                    <option value="Portage Salarial">Portage Salarial</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-[#98A2B3]">Identifiant légal (ICE / SIRET)</label>
                  <input
                    type="text"
                    value={freelanceFormData.legalId || ''}
                    onChange={(e) => setFreelanceFormData({ ...freelanceFormData, legalId: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-[#121622] border border-slate-200 dark:border-white/10 focus:border-[#A8E635] text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveFreelanceInfo}
                  className="px-4 py-2.5 rounded-xl bg-[#A8E635] text-[#0B0D10] font-black text-xs hover:bg-[#b8f042] transition-all cursor-pointer shadow-md shadow-[#A8E635]/20"
                >
                  Enregistrer mes informations
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 4: ENTREPRISE CONTRACTANTE (READ-ONLY FOR FREELANCE) */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white dark:bg-[#0B0E17] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-2xl overflow-hidden transition-all">
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(4)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(4); } }}
            className="w-full p-5 text-left flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-[#A8E635]">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>4. Entreprise contractante</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-500/10 border border-slate-200 dark:border-slate-500/20 text-slate-700 dark:text-slate-300 text-[10px] font-bold flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5 text-amber-500 dark:text-amber-400" />
                    <span>Attribuée selon pays</span>
                  </span>
                </h2>
                {!openSections[4] && (
                  <p className="text-xs text-slate-500 dark:text-[#98A2B3] mt-0.5 truncate">
                    {currentCompany.name} ({currentCompany.legalName})
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
                {openSections[4] ? 'Masquer' : 'Afficher'}
              </span>
              <div className="p-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-[#98A2B3]">
                {openSections[4] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[4] && (
            <div className="p-5 pt-0 border-t border-slate-100 dark:border-white/5 space-y-4 animate-in fade-in duration-150">
              <div className="bg-slate-50 dark:bg-[#121622] p-4 rounded-xl border border-slate-200/80 dark:border-white/10 flex items-center gap-5 transition-colors mt-4">
                {currentCompany.logoUrl ? (
                  <img
                    src={currentCompany.logoUrl}
                    alt={currentCompany.name}
                    className="h-14 sm:h-16 w-auto max-w-[180px] object-contain shrink-0"
                  />
                ) : (
                  <Building2 className="w-10 h-10 text-[#A8E635] shrink-0" />
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">{currentCompany.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#A8E635]/20 text-[#0B0D10] dark:text-[#A8E635] text-[10px] font-bold">
                      {currentCompany.legalName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{currentCompany.tagline}</p>
                  <p className="text-[11px] text-slate-500 dark:text-[#98A2B3] pt-1">
                    📍 {currentCompany.address} · 🏢 ICE / SIRET : {currentCompany.ice} · ✍️ Représentant : {currentCompany.representative}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 5: CONDITIONS DE PAIEMENT (READ-ONLY) */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white dark:bg-[#0B0E17] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-2xl overflow-hidden transition-all">
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(5)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(5); } }}
            className="w-full p-5 text-left flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-[#A8E635]">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>5. Conditions de paiement</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-500/10 border border-slate-200 dark:border-slate-500/20 text-slate-700 dark:text-slate-300 text-[10px] font-bold flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5 text-amber-500 dark:text-amber-400" />
                    <span>Non éditable</span>
                  </span>
                </h2>
                {!openSections[5] && (
                  <p className="text-xs text-slate-500 dark:text-[#98A2B3] mt-0.5 truncate max-w-md">
                    {activeDetailContract.paymentTerms}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
                {openSections[5] ? 'Masquer' : 'Afficher'}
              </span>
              <div className="p-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-[#98A2B3]">
                {openSections[5] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[5] && (
            <div className="p-5 pt-0 border-t border-slate-100 dark:border-white/5 space-y-3 animate-in fade-in duration-150">
              <div className="bg-slate-50 dark:bg-[#121622] p-4 rounded-xl border border-slate-200/80 dark:border-white/5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed transition-colors mt-4">
                {activeDetailContract.paymentTerms}
              </div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 6: CONTRAT DE MISSION (READ-ONLY + COMMENTAIRES) */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white dark:bg-[#0B0E17] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-2xl overflow-hidden transition-all">
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(6)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(6); } }}
            className="w-full p-5 text-left flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-[#A8E635]">
                <FileCode2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>6. Contrat de mission ({currentCompany.name})</span>
                </h2>
                {!openSections[6] && (
                  <p className="text-xs text-slate-500 dark:text-[#98A2B3] mt-0.5 truncate">
                    Document officiel en PDF · Proposer des commentaires si besoin
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModifModalOpen(true);
                }}
                className="px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 hover:bg-amber-500/25 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0"
              >
                <MessageSquare className="w-3 h-3" />
                <span className="hidden sm:inline">Proposer modification</span>
              </button>

              <div className="p-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-[#98A2B3]">
                {openSections[6] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[6] && (
            <div className="p-5 pt-0 border-t border-slate-100 dark:border-white/5 space-y-4 animate-in fade-in duration-150">
              <div className="pt-4">
                <ContractPdfViewer
                  company={currentCompany}
                  freelance={freelanceFormData}
                  contractTitle={activeDetailContract.title}
                  forfait={activeDetailContract.forfait}
                  client={activeDetailContract.client}
                  periode={activeDetailContract.periode}
                  paymentTerms={activeDetailContract.paymentTerms}
                  isSignedByFreelance={activeDetailContract.freelanceSigned}
                  freelanceSignatureDate={activeDetailContract.freelanceSignatureDate}
                  freelanceSignatureUrl={activeDetailContract.freelanceSignatureUrl}
                  isSignedByCompany={activeDetailContract.unitgrowthSigned}
                  showImportButton={false}
                  theme={theme}
                />
              </div>

              {/* List of submitted modification requests */}
              {(activeDetailContract.modificationRequests || []).length > 0 && (
                <div className="pt-2 space-y-2">
                  <h3 className="text-xs font-bold text-amber-600 dark:text-amber-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Vos demandes de modification soumises</span>
                  </h3>
                  <div className="space-y-2">
                    {activeDetailContract.modificationRequests!.map((req) => (
                      <div key={req.id} className="p-3 bg-slate-50 dark:bg-[#121622] rounded-xl border border-slate-200 dark:border-white/10 text-xs space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-slate-900 dark:text-white">Clause : {req.clause}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            req.status === 'Acceptée' ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : req.status === 'Refusée' ? 'bg-red-500/15 text-red-700 dark:text-red-300' : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-[#98A2B3]">« {req.explanation} »</p>
                        {req.response && (
                          <div className="mt-2 p-2 bg-slate-100 dark:bg-white/[0.02] border-l-2 border-slate-500 rounded text-[11px] text-slate-700 dark:text-[#98A2B3]">
                            <strong className="text-slate-900 dark:text-white block font-bold">Réponse de la direction :</strong>
                            « {req.response} »
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FREELANCE REPLIES & NEGOTIATION */}
              <div className="pt-5 border-t border-slate-100 dark:border-white/10 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#A8E635]/10 text-[#A8E635]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider font-mono text-slate-950 dark:text-white">
                        Fil de Discussion & Négociation (Aller-retour)
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-[#98A2B3]">Échanges en direct avec la direction d'iaweb.dev.</p>
                    </div>
                  </div>
                </div>

                {/* Detect active counter proposals */}
                {activeDetailContract.comments && activeDetailContract.comments.some(c => c.type === 'counter_proposal') && (
                  <div className="p-4 bg-amber-500/15 border border-amber-500/20 rounded-xl space-y-3">
                    <h5 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase font-mono tracking-wider">
                      ⚡ Proposition ou Contre-proposition active de la direction
                    </h5>
                    <p className="text-xs text-slate-700 dark:text-slate-200">
                      La direction a formulé une contre-proposition financière ou contractuelle. Vous pouvez l'accepter pour mettre à jour automatiquement les termes du contrat.
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const latestCounter = [...activeDetailContract.comments!].reverse().find(c => c.type === 'counter_proposal');
                          const text = latestCounter ? latestCounter.text : '';
                          const match = text.match(/montant proposé de ([^.]+)/);
                          const extractedAmount = match ? match[1].trim() : '';

                          const updated = {
                            ...activeDetailContract,
                            forfait: extractedAmount || activeDetailContract.forfait,
                          };
                          const newContratsList = contrats.map(c => c.id === updated.id ? updated : c);
                          setContrats(newContratsList);
                          localStorage.setItem('app_contrats_list', JSON.stringify(newContratsList));
                          setActiveDetailContract(updated);
                          setFreelanceFormData(prev => ({ ...prev, forfait: extractedAmount || activeDetailContract.forfait }));

                          handleAddContractComment("👤 J'accepte la contre-proposition proposée. Les termes du contrat ont été mis à jour.", 'comment');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#A8E635] text-[#0B0D10] font-black text-xs hover:bg-[#b8f042] cursor-pointer"
                      >
                        ✓ Accepter la contre-proposition
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleAddContractComment("👤 Je refuse la contre-proposition proposée. Je souhaite conserver l'offre initiale ou poursuivre la négociation.", 'comment');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-red-500/15 text-red-700 dark:text-red-300 font-bold text-xs hover:bg-red-500/20 cursor-pointer"
                      >
                        ✕ Refuser
                      </button>
                    </div>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-3">
                  {activeDetailContract.comments && activeDetailContract.comments.length > 0 ? (
                    <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                      {activeDetailContract.comments.map((comm) => (
                        <div
                          key={comm.id}
                          className={`p-3 rounded-xl border text-xs leading-relaxed space-y-1 ${
                            comm.type === 'validation'
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-950 dark:text-emerald-100'
                              : comm.type === 'counter_proposal'
                              ? 'bg-amber-500/10 border-amber-500/20 text-amber-950 dark:text-amber-100'
                              : comm.role === 'Freelance'
                              ? 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-800 dark:text-white ml-8'
                              : 'bg-slate-100/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 text-slate-800 dark:text-white mr-8'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                              {comm.role === 'Freelance' ? '👤' : '🛡️'}
                              <span>{comm.author}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono ${
                                comm.role === 'Freelance'
                                  ? 'bg-[#A8E635]/20 text-[#A8E635]'
                                  : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300'
                              }`}>
                                {comm.role}
                              </span>
                            </span>
                            <span className="text-slate-500 dark:text-[#98A2B3] text-[9px] font-medium">{comm.date}</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-200 mt-1">{comm.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 dark:text-[#98A2B3] italic pl-2">Aucun message de négociation pour le moment.</p>
                  )}
                </div>

                {/* Write comment box */}
                <div className="p-3 bg-slate-50 dark:bg-white/[0.01] border border-slate-200 dark:border-white/5 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-[#98A2B3] uppercase font-mono tracking-wider block">
                    Écrire un message à la direction
                  </span>
                  <div className="flex gap-2">
                    <textarea
                      rows={2}
                      value={newDirectComment}
                      onChange={(e) => setNewDirectComment(e.target.value)}
                      placeholder="Tapez votre message pour la direction..."
                      className="flex-1 bg-white dark:bg-[#0B0E17] border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-white outline-none focus:border-[#A8E635] resize-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleAddContractComment(newDirectComment);
                        setNewDirectComment('');
                      }}
                      className="px-4 py-2 bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] font-black text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 self-end shadow-md active:scale-95 animate-in fade-in"
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* SECTION 7: SIGNATURES DU CONTRAT FINAL (EDITABLE / INTERACTIVE) */}
        {/* ------------------------------------------------------------------ */}
        <div className="bg-white dark:bg-[#0B0E17] border border-[#A8E635]/40 rounded-2xl shadow-sm dark:shadow-2xl overflow-hidden transition-all">
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggleSection(7)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(7); } }}
            className="w-full p-5 text-left flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#A8E635]/20 text-slate-900 dark:text-[#A8E635]">
                <PenTool className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>7. Signatures du contrat final</span>
                  {activeDetailContract.freelanceSigned ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                      ✓ Signé
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[10px] font-bold animate-pulse">
                      À signer
                    </span>
                  )}
                </h2>
                {!openSections[7] && (
                  <p className="text-xs text-slate-500 dark:text-[#98A2B3] mt-0.5 truncate">
                    {activeDetailContract.freelanceSigned ? `Signé électroniquement le ${activeDetailContract.freelanceSignatureDate || ''}` : 'Apposez votre signature manuscrite pour valider définitivement'}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
                {openSections[7] ? 'Masquer' : 'Afficher la zone de signature'}
              </span>
              <div className="p-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-[#98A2B3]">
                {openSections[7] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {openSections[7] && (
            <div className="p-5 pt-0 border-t border-slate-100 dark:border-white/5 space-y-6 animate-in fade-in duration-150">
              <p className="text-xs text-slate-600 dark:text-[#98A2B3] pt-3">
                Apposez votre signature électronique pour valider définitivement la mission.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Left: Company signature box */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121622] border border-slate-200 dark:border-white/10 space-y-2">
                  <span className="text-[10px] text-slate-500 dark:text-[#98A2B3] uppercase font-mono font-bold block">
                    POUR {currentCompany.displayName.toUpperCase()}
                  </span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{currentCompany.representative}</p>
                  <p className="text-[11px] text-slate-500 dark:text-[#98A2B3]">{currentCompany.representativeTitle}</p>
                  <div className="pt-3 border-t border-dashed border-slate-200 dark:border-white/15">
                    {activeDetailContract.unitgrowthSigned ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>✓ Signé électroniquement</span>
                      </span>
                    ) : (
                      <span className="text-xs text-amber-700 dark:text-amber-300/80 italic">En attente de signature par la direction</span>
                    )}
                  </div>
                </div>

                {/* Right: Freelance signature box */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#121622] border border-slate-200 dark:border-white/10 space-y-3">
                  <span className="text-[10px] text-slate-500 dark:text-[#98A2B3] uppercase font-mono font-bold block">
                    POUR LE FREELANCE
                  </span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{freelanceFormData.freelance || activeDetailContract.freelance}</p>
                  <p className="text-[11px] text-slate-500 dark:text-[#98A2B3]">{freelanceFormData.legalStatus || 'Auto-entrepreneur'}</p>

                  {activeDetailContract.freelanceSigned ? (
                    <div className="pt-2 border-t border-dashed border-slate-200 dark:border-white/15 space-y-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>✓ Signé électroniquement par vous</span>
                      </span>
                      <p className="text-[10px] text-slate-500 dark:text-[#98A2B3] font-mono">{activeDetailContract.freelanceSignatureDate}</p>

                      {activeDetailContract.freelanceSignatureUrl && (
                        <div className="bg-white dark:bg-[#0B0E17] p-2 rounded-xl border border-slate-200 dark:border-white/10 max-w-xs">
                          <img src={activeDetailContract.freelanceSignatureUrl} alt="Signature freelance" className="h-12 object-contain mx-auto" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4 pt-2">
                      <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acceptTermsChecked}
                          onChange={(e) => setAcceptTermsChecked(e.target.checked)}
                          className="mt-0.5 accent-[#A8E635]"
                        />
                        <span>
                          J'ai lu et j'accepte l'intégralité des termes du contrat-cadre de prestation pour la mission « {activeDetailContract.title} ».
                        </span>
                      </label>

                      {/* Interactive Electronic Signature Drawing Pad */}
                      {acceptTermsChecked ? (
                        <div className="pt-2">
                          <SignaturePad
                            onSave={(dataUrl) => {
                              const now = new Date();
                              const dateStr = `Signé le ${now.toLocaleDateString('fr-FR')} à ${now.toLocaleTimeString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}`;
                              const isBothSigned = activeDetailContract.unitgrowthSigned;

                              const updated: ContratItem = {
                                ...activeDetailContract,
                                freelanceSigned: true,
                                freelanceSignatureUrl: dataUrl,
                                freelanceSignatureDate: dateStr,
                                status: isBothSigned ? 'Actif' : 'Partiellement signé',
                                tab: isBothSigned ? 'encours' : 'nouveaux',
                                activeDate: isBothSigned ? new Date().toLocaleDateString('fr-FR') : activeDetailContract.activeDate || '—',
                              };

                              setContrats((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
                              setActiveDetailContract(updated);
                              triggerToast('✓ Votre signature manuscrite a été enregistrée avec succès.');
                            }}
                          />
                        </div>
                      ) : (
                        <div className="bg-white dark:bg-[#0B0E17] border border-dashed border-slate-200 dark:border-white/15 p-4 rounded-xl text-center space-y-1">
                          <p className="text-xs text-slate-500 dark:text-[#98A2B3]">
                            Cochez la case ci-dessus pour débloquer le pavé de signature électronique.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Modification Request */}
        {modifModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0B0E17] border border-slate-200 dark:border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                  <span>Demande de modification de clause</span>
                </h3>
                <button onClick={() => setModifModalOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const clause = (form.elements.namedItem('clause') as HTMLInputElement).value;
                  const text = (form.elements.namedItem('explanation') as HTMLTextAreaElement).value;
                  if (clause && text) handleAddModificationRequest(clause, text);
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-[#98A2B3]">Clause ou section concernée</label>
                  <input
                    name="clause"
                    type="text"
                    required
                    placeholder="Ex: Article 5 — Conditions de règlement"
                    className="w-full bg-slate-50 dark:bg-[#121622] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs rounded-xl px-3.5 py-2.5 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-[#98A2B3]">Détail de la modification souhaitée</label>
                  <textarea
                    name="explanation"
                    required
                    rows={4}
                    placeholder="Expliquez la modification souhaitée..."
                    className="w-full bg-slate-50 dark:bg-[#121622] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs rounded-xl p-3.5 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModifModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white text-xs font-bold"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 text-black font-black text-xs hover:bg-amber-400"
                  >
                    Envoyer au responsable
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ======================================================================== */
  /* SCREEN A: FREELANCE CONTRACTS LIST VIEW                                  */
  /* ======================================================================== */
  return (
    <div className={`space-y-6 max-w-6xl mx-auto pb-12 transition-colors ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#A8E635] text-[#0B0D10] font-black text-xs px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-black/10">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="space-y-1">
        <h1 className={`text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Espace Contrats Freelance</h1>
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
          Consultez vos propositions de contrats, complétez vos coordonnées et signez directement vos missions.
        </p>
      </div>

      {/* Subtabs */}
      <div className={`flex items-center gap-2 p-1.5 rounded-2xl border text-xs font-bold max-w-md transition-colors ${
        isLight ? 'bg-slate-200/80 border-slate-300/80 shadow-sm' : 'bg-[#0B0E17] border-white/10'
      }`}>
        <button
          onClick={() => setActiveSubTab('nouveaux')}
          className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
            activeSubTab === 'nouveaux'
              ? 'bg-[#A8E635] text-[#0B0D10] shadow-md font-black'
              : isLight
              ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/50'
              : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
          }`}
        >
          À signer / Nouveaux
        </button>
        <button
          onClick={() => setActiveSubTab('encours')}
          className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
            activeSubTab === 'encours'
              ? 'bg-[#A8E635] text-[#0B0D10] shadow-md font-black'
              : isLight
              ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/50'
              : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
          }`}
        >
          Missions en cours
        </button>
        <button
          onClick={() => setActiveSubTab('historique')}
          className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
            activeSubTab === 'historique'
              ? 'bg-[#A8E635] text-[#0B0D10] shadow-md font-black'
              : isLight
              ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-300/50'
              : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
          }`}
        >
          Historique
        </button>
      </div>

      {/* List */}
      {filteredContrats.length === 0 ? (
        <div className={`border rounded-2xl p-12 text-center space-y-3 shadow-sm transition-colors ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#0B0E17] border-white/10 shadow-2xl'
        }`}>
          <FileText className="w-8 h-8 text-[#A8E635] mx-auto opacity-80" />
          <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Aucun contrat dans cet onglet</h3>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>Vous n'avez pas de contrat sous cette catégorie pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContrats.map((item) => {
            const company = COMPANIES[item.contractingCompany || 'iaweb'];

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all space-y-4 shadow-sm ${
                  isLight
                    ? 'bg-white border-slate-200 hover:border-emerald-500/50 hover:shadow-md'
                    : 'bg-[#0B0E17] border-white/10 hover:border-[#A8E635]/50 shadow-2xl'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${
                        isLight
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                          : 'bg-[#A8E635]/15 border-[#A8E635]/30 text-[#A8E635]'
                      }`}>
                        🏢 {company.name}
                      </span>
                      {getStatusBadge(item.status)}
                    </div>
                    <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-[#98A2B3]'}`}>
                      Client : <strong className={isLight ? 'text-slate-900' : 'text-white'}>{item.client}</strong> · Famille : {item.famille}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-sm font-black ${isLight ? 'text-emerald-700' : 'text-[#A8E635]'}`}>{item.forfait}</span>
                    <button
                      onClick={() => handleOpenDetail(item)}
                      className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-md ${
                        isLight
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'
                          : 'bg-[#A8E635] text-[#0B0D10] hover:bg-[#b8f042] shadow-[#A8E635]/20'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Consulter & Signer (7 sections)</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FreelanceContratsView;
