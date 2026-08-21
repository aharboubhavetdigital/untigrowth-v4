import React, { useState } from 'react';
import { CustomSelect } from './CustomSelect';
import {
  Search,
  Eye,
  CheckCircle2,
  Clock,
  Building2,
  Calendar,
  FileText,
  Download,
  Printer,
  ShieldCheck,
  AlertCircle,
  X,
  CreditCard,
  Check,
  Receipt,
  Plus,
  Upload,
  FileUp,
  Sparkles,
  FileSpreadsheet,
  ArrowRight,
  User,
  Hash,
  DollarSign,
  Info,
  MessageSquare,
} from 'lucide-react';

export interface FactureTemplateData {
  freelanceName: string;
  cine: string;
  freelanceAdresse: string;
  iceFreelance: string;
  ifNumber: string;
  taxePro: string;
  tel: string;
  mail: string;
  factureNumero: string;
  date: string;
  clientName: string;
  iceClient: string;
  adresseClient: string;
  designation: string;
  periode: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
  sommeLettres: string;
  isTemplateUsed: boolean;
}

export interface FactureItem {
  id: string; // e.g. "FAC-2026-0012"
  freelance: string;
  mission: string;
  montant: string;
  montantNum: number;
  emiseLe: string;
  statut: 'Draft' | 'Sent' | 'Returned' | 'Validated' | 'Paid' | 'Déposée' | 'Validée super admin' | 'Validée finance' | 'Paiement déclaré' | 'Brouillon';
  statutNote?: string;
  iban?: string;
  iceFreelance?: string;
  jalonName?: string;
  fileName?: string;
  templateData?: FactureTemplateData;
  comments?: {
    id: string;
    author: string;
    role: string;
    text: string;
    date: string;
  }[];
  paymentDetails?: {
    method: string;
    reference: string;
    date: string;
    proofFile?: string;
  };
}

export function getNormalizedStatus(statut: string): 'Draft' | 'Sent' | 'Returned' | 'Validated' | 'Paid' {
  if (statut === 'Draft' || statut === 'Brouillon') return 'Draft';
  if (statut === 'Sent' || statut === 'Déposée' || statut === 'Envoyée') return 'Sent';
  if (statut === 'Returned' || statut === 'Retournée') return 'Returned';
  if (statut === 'Validated' || statut === 'Validée' || statut === 'Validée super admin' || statut === 'Validée finance') return 'Validated';
  if (statut === 'Paid' || statut === 'Payée' || statut === 'Paiement déclaré') return 'Paid';
  return 'Sent';
}

export const sampleFactures: FactureItem[] = [
  {
    id: 'FAC-2026-0014',
    freelance: 'Amine Nejjari',
    mission: 'Application interne CRM & Portails Clients',
    montant: '18.000 DH',
    montantNum: 18000,
    emiseLe: '18/08/2026',
    statut: 'Draft',
    jalonName: 'Brouillon en cours de finalisation',
    iban: 'MA64 0077 8000 0123 4567 8901 2345',
    iceFreelance: '003740165000014',
    comments: [],
  },
  {
    id: 'FAC-2025-0001',
    freelance: 'Amine Nejjari',
    mission: 'Prestations de services marketing',
    montant: '1.000 DH',
    montantNum: 1000,
    emiseLe: '12/05/2025',
    statut: 'Sent',
    jalonName: 'Période : 17/03/2025 au 31/03/2025',
    iban: 'MA64 0077 8000 0123 4567 8901 2345',
    iceFreelance: '003740165000014',
    templateData: {
      freelanceName: 'Amine Nejjari',
      cine: 'EE963348',
      freelanceAdresse: 'Inara bloc a 1 n 10',
      iceFreelance: '003740165000014',
      ifNumber: '66299820',
      taxePro: '67302429',
      tel: '0695509364',
      mail: 'aminenejjari2@gmail.com',
      factureNumero: '000 001',
      date: '12 / 05 / 2025',
      clientName: 'IAWEB.DEV',
      iceClient: '003375388000001',
      adresseClient: 'Espace Guéliz N°23 Avenue Yacoub El Mansour, 1er étage Bureau 5',
      designation: 'Prestations de services marketing',
      periode: '17/03/2025 au 31/03/2025',
      quantite: 1,
      prixUnitaire: 1000,
      total: 1000,
      sommeLettres: 'Mille dirhams',
      isTemplateUsed: true,
    },
    comments: [
      {
        id: 'c1',
        author: 'Amine Nejjari',
        role: 'Freelance',
        text: 'Voici la facture pour la première période de prestations de services marketing.',
        date: '12/05/2025 09:00',
      },
      {
        id: 'c2',
        author: 'Gonzague Havet',
        role: 'Super Admin',
        text: 'Reçu et validé. Le virement est en cours de traitement par notre équipe comptable.',
        date: '13/05/2025 14:00',
      },
    ],
  },
  {
    id: 'FAC-2026-0013',
    freelance: 'Hery Randria',
    mission: 'Automatisation reporting commercial',
    montant: '10.000 DH',
    montantNum: 10000,
    emiseLe: '02/08/2026',
    statut: 'Sent',
    jalonName: 'Étape 2 : Prompt Engineering & Modèles de Synthèse PDF',
    iban: 'MA64 0077 8000 0123 4567 8901 2345',
    iceFreelance: '003291823000045',
    comments: [],
  },
  {
    id: 'FAC-2026-0012',
    freelance: 'Rania Skalli',
    mission: "Campagnes d'acquisition multi-canal",
    montant: '30.000 DH',
    montantNum: 30000,
    emiseLe: '30/07/2026',
    statut: 'Validated',
    jalonName: 'Étape 1 : Audit & Configuration Pixel GA4 / Meta',
    iban: 'MA64 0077 8000 0987 6543 2109 8765',
    iceFreelance: '002819203000088',
    comments: [],
  },
  {
    id: 'FAC-2026-0011',
    freelance: 'Rania Skalli',
    mission: "Campagnes d'acquisition multi-canal",
    montant: '15.000 DH',
    montantNum: 15000,
    emiseLe: '23/07/2026',
    statut: 'Returned',
    statutNote: 'Le montant ne correspond pas au jalon prévu au contrat (30 000 DH attendus).',
    jalonName: 'Étape 1 : Audit & Configuration Pixel GA4 / Meta',
    iban: 'MA64 0077 8000 0987 6543 2109 8765',
    iceFreelance: '002819203000088',
    comments: [
      {
        id: '1',
        author: 'Gonzague Havet',
        role: 'Super Admin',
        text: 'Le montant ne correspond pas au jalon prévu au contrat (30 000 DH attendus). Pourriez-vous corriger s’il vous plaît ?',
        date: '24/07/2026 10:15',
      },
      {
        id: '2',
        author: 'Rania Skalli',
        role: 'Freelance',
        text: 'Désolée, j’ai fait une erreur de saisie sur le montant net. Je vais mettre à jour la facture d’après le modèle.',
        date: '24/07/2026 11:30',
      },
    ],
  },
  {
    id: 'FAC-2026-0010',
    freelance: 'Lova Rasoanaivo',
    mission: 'Application interne de gestion de stock (no-code)',
    montant: '12.600 DH',
    montantNum: 12600,
    emiseLe: '04/07/2026',
    statut: 'Validated',
    jalonName: 'Étape 2 : Déploiement Glide App & formation utilisateurs',
    iban: 'MA64 0077 8000 0456 7890 1234 5678',
    iceFreelance: '001928374000012',
    comments: [],
  },
  {
    id: 'FAC-2026-0008',
    freelance: 'Lova Rasoanaivo',
    mission: 'Application interne de gestion de stock (no-code)',
    montant: '12.600 DH',
    montantNum: 12600,
    emiseLe: '04/06/2026',
    statut: 'Paid',
    jalonName: 'Étape 1 : Structuration base Airtable & wireframes Glide',
    iban: 'MA64 0077 8000 0456 7890 1234 5678',
    iceFreelance: '001928374000012',
    comments: [],
    paymentDetails: {
      method: 'Virement bancaire (Attijariwafa Bank)',
      reference: 'VIR-2026-8839201',
      date: '06/06/2026',
      proofFile: 'Avis_de_virement_FAC-2026-0008.pdf',
    },
  },
];

/* Helper to format french sums */
function numberToFrenchWords(num: number): string {
  if (num === 1000) return 'Mille dirhams';
  if (num === 2000) return 'Deux mille dirhams';
  if (num === 3000) return 'Trois mille dirhams';
  if (num === 5000) return 'Cinq mille dirhams';
  if (num === 10000) return 'Dix mille dirhams';
  if (num === 15000) return 'Quinze mille dirhams';
  if (num === 20000) return 'Vingt mille dirhams';
  if (num === 30000) return 'Trente mille dirhams';
  return `${num} dirhams`;
}

/* Document Component matching Official Auto-Entrepreneur Invoice PDF Screenshot */
export const OfficialInvoiceDocument: React.FC<{ data: FactureTemplateData }> = ({ data }) => {
  return (
    <div className="bg-white text-slate-900 p-6 sm:p-10 font-sans shadow-2xl border border-slate-300 rounded-xl max-w-2xl mx-auto space-y-6 text-xs sm:text-sm leading-relaxed">
      {/* Top Header Logo & Date */}
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 via-amber-400 to-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-sm shrink-0">
            🇲🇦
          </div>
          <div>
            <p className="text-xs font-bold text-slate-600">المقاول الذاتي</p>
            <p className="text-xs text-slate-500 font-semibold">Auto-entrepreneur</p>
            <p className="text-sm font-black text-slate-900 tracking-tight">{data.freelanceName}</p>
          </div>
        </div>

        <div className="border border-slate-900 px-4 py-1.5 rounded font-bold text-xs bg-slate-50 shrink-0">
          Date : {data.date}
        </div>
      </div>

      {/* Facture Number Header Box */}
      <div className="text-center py-2.5 bg-slate-200/90 border border-slate-400 rounded-md font-black text-sm text-slate-900 tracking-wide uppercase">
        Facture numéro {data.factureNumero}
      </div>

      {/* Client Block */}
      <div className="space-y-1 text-xs border-l-2 border-slate-800 pl-3 py-1">
        <p><strong className="font-bold text-slate-900">Client :</strong> {data.clientName}</p>
        <p><strong className="font-bold text-slate-900">ICE :</strong> {data.iceClient}</p>
        <p><strong className="font-bold text-slate-900">Adresse :</strong> {data.adresseClient}</p>
      </div>

      {/* Line Items Table */}
      <div className="overflow-hidden border border-slate-400 rounded-md">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-500 text-white font-bold text-[11px] uppercase tracking-wider">
              <th className="p-2.5 border-r border-slate-400">Désignation</th>
              <th className="p-2.5 border-r border-slate-400 text-center w-20">Quantité</th>
              <th className="p-2.5 border-r border-slate-400 text-right w-28">Prix unitaire</th>
              <th className="p-2.5 text-right w-28">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-300">
              <td className="p-3 border-r border-slate-300 align-top">
                <p className="font-bold text-slate-900">{data.designation}</p>
                {data.periode && (
                  <p className="text-[11px] text-slate-600 font-medium mt-1">Période : {data.periode}</p>
                )}
              </td>
              <td className="p-3 border-r border-slate-300 text-center font-semibold align-top">{data.quantite}</td>
              <td className="p-3 border-r border-slate-300 text-right font-semibold align-top">{data.prixUnitaire}</td>
              <td className="p-3 text-right font-bold align-top">{data.total}</td>
            </tr>
            {/* Table filler spacing */}
            <tr className="border-t border-slate-200 min-h-[60px]">
              <td className="p-4 border-r border-slate-200"></td>
              <td className="p-4 border-r border-slate-200"></td>
              <td className="p-4 border-r border-slate-200"></td>
              <td className="p-4"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Total Net Box */}
      <div className="border border-slate-900 rounded-md grid grid-cols-12 text-xs font-bold divide-x divide-slate-900 overflow-hidden">
        <div className="col-span-5 p-2.5 bg-slate-100/80">Montant en dirhams</div>
        <div className="col-span-4 p-2.5 bg-slate-100/80 text-center">Total Net à payer</div>
        <div className="col-span-3 p-2.5 text-right font-black bg-slate-200 text-slate-900">{data.total} MAD</div>
      </div>

      {/* Arrêté de la somme */}
      <div className="text-xs font-black uppercase text-slate-900 tracking-wide pt-1">
        ARRETE LA PRESENTE FACTURE A LA SOMME DE : <span className="underline">{data.sommeLettres}</span>
      </div>

      {/* Signature Area */}
      <div className="flex justify-end pt-4 pb-4">
        <div className="text-center space-y-2">
          <p className="text-xs font-bold text-slate-800">Signature :</p>
          <div className="border-b border-slate-400 w-48 h-12 flex items-center justify-center font-serif italic text-slate-900 text-sm font-bold">
            {data.freelanceName}
          </div>
        </div>
      </div>

      {/* Legal Footer Section */}
      <div className="pt-4 border-t border-dashed border-slate-400 text-[10px] text-slate-700 space-y-2 font-mono">
        <p className="italic text-[9px] text-slate-500">¹Art 89 – II – 1° - c, Code Général des Impôts.</p>
        <div className="border-t border-dashed border-slate-300 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 leading-relaxed">
          <div>
            <p><strong className="font-bold">Auto Entrepreneur :</strong> {data.freelanceName}</p>
            <p><strong className="font-bold">Adresse :</strong> {data.freelanceAdresse}</p>
            <p><strong className="font-bold">ICE (N° d’inscription) :</strong> {data.iceFreelance}</p>
            <p><strong className="font-bold">IF :</strong> {data.ifNumber}</p>
            <p><strong className="font-bold">TEL :</strong> {data.tel}</p>
          </div>
          <div>
            <p><strong className="font-bold">CINE :</strong> {data.cine}</p>
            <p><strong className="font-bold">Taxe professionnelle N° :</strong> {data.taxePro}</p>
            <p><strong className="font-bold">Mail :</strong> {data.mail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FacturesViewProps {
  userRole?: 'superadmin' | 'admin' | 'responsable' | 'freelance';
}

export const FacturesView: React.FC<FacturesViewProps> = ({ userRole = 'freelance' }) => {
  const isSuperAdmin = userRole === 'superadmin' || userRole === 'admin' || userRole === 'responsable';

  // Factures list state
  const [factures, setFactures] = useState<FactureItem[]>(sampleFactures);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Comment state
  const [newCommentText, setNewCommentText] = useState('');

  const handleAddInvoiceComment = (factureId: string) => {
    if (!newCommentText.trim()) return;

    let authorName = 'Rania Skalli';
    let displayRole = 'Freelance';
    if (userRole === 'superadmin' || userRole === 'admin') {
      authorName = 'Gonzague Havet';
      displayRole = 'Super Admin';
    } else if (userRole === 'responsable') {
      authorName = 'Responsable Havet';
      displayRole = 'Responsable';
    }

    const newComment = {
      id: `comm-${Date.now()}`,
      author: authorName,
      role: displayRole,
      text: newCommentText.trim(),
      date: new Date().toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setFactures((prev) =>
      prev.map((f) => {
        if (f.id === factureId) {
          return {
            ...f,
            comments: [...(f.comments || []), newComment],
          };
        }
        return f;
      })
    );

    setPreviewFacture((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        comments: [...(prev.comments || []), newComment],
      };
    });

    setNewCommentText('');
    setToastMessage('✓ Commentaire ajouté avec succès.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Modals
  const [previewFacture, setPreviewFacture] = useState<FactureItem | null>(null);
  const [paymentFacture, setPaymentFacture] = useState<FactureItem | null>(null);
  const [returnFacture, setReturnFacture] = useState<FactureItem | null>(null);
  const [returnReasonInput, setReturnReasonInput] = useState('');

  // New Deposit Modal State
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [depositStep, setDepositStep] = useState<'choice' | 'upload' | 'template'>('choice');
  const [activeTemplateTab, setActiveTemplateTab] = useState<'form' | 'preview'>('form');

  // Custom File Upload Form State
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadMission, setUploadMission] = useState('Prestations de services marketing');
  const [uploadFactureNum, setUploadFactureNum] = useState(`FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [uploadMontant, setUploadMontant] = useState('10.000 DH');
  const [uploadIban, setUploadIban] = useState('MA64 0077 8000 0123 4567 8901 2345');
  const [uploadIce, setUploadIce] = useState('003740165000014');

  // Template Form State pre-filled with OCR details
  const [templateForm, setTemplateForm] = useState<FactureTemplateData>({
    freelanceName: 'Amine Nejjari',
    cine: 'EE963348',
    freelanceAdresse: 'Inara bloc a 1 n 10',
    iceFreelance: '003740165000014',
    ifNumber: '66299820',
    taxePro: '67302429',
    tel: '0695509364',
    mail: 'aminenejjari2@gmail.com',
    factureNumero: '000 001',
    date: '12 / 05 / 2025',
    clientName: 'IAWEB.DEV',
    iceClient: '003375388000001',
    adresseClient: 'Espace Guéliz N°23 Avenue Yacoub El Mansour, 1er étage Bureau 5',
    designation: 'Prestations de services marketing',
    periode: '17/03/2025 au 31/03/2025',
    quantite: 1,
    prixUnitaire: 1000,
    total: 1000,
    sommeLettres: 'Mille dirhams',
    isTemplateUsed: true,
  });

  // Payment declaration form
  const [payMethod, setPayMethod] = useState('Virement bancaire (Attijariwafa Bank)');
  const [payRef, setPayRef] = useState('');
  const [payDate, setPayDate] = useState('14/08/2026');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'Draft', label: 'Draft / Brouillon' },
    { value: 'Sent', label: 'Sent / Déposée' },
    { value: 'Returned', label: 'Returned / Retournée' },
    { value: 'Validated', label: 'Validated / Validée' },
    { value: 'Paid', label: 'Paid / Payée' },
  ];

  // Filtered list
  const filteredFactures = factures.filter((f) => {
    if (selectedStatus !== 'all') {
      const normalized = getNormalizedStatus(f.statut);
      if (normalized !== selectedStatus) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = f.id.toLowerCase().includes(q);
      const matchFreelance = f.freelance.toLowerCase().includes(q);
      const matchMission = f.mission.toLowerCase().includes(q);
      const matchMontant = f.montant.toLowerCase().includes(q);
      if (!matchId && !matchFreelance && !matchMission && !matchMontant) return false;
    }

    return true;
  });

  // Action: Submit Custom File Facture
  const handleDepositCustomFile = (e: React.FormEvent) => {
    e.preventDefault();
    const newFacture: FactureItem = {
      id: uploadFactureNum || `FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      freelance: 'Yassine El Amrani',
      mission: uploadMission || 'Mission de conseil IT',
      montant: uploadMontant || '10.000 DH',
      montantNum: parseInt(uploadMontant.replace(/[^0-9]/g, '')) || 10000,
      emiseLe: new Date().toLocaleDateString('fr-FR'),
      statut: 'Sent',
      iban: uploadIban,
      iceFreelance: uploadIce,
      fileName: uploadFileName || 'Facture_Freelance_Scan.pdf',
    };

    setFactures([newFacture, ...factures]);
    setDepositModalOpen(false);
    showToast(`✓ Facture ${newFacture.id} déposée avec succès (Fichier importé)`);
  };

  // Action: Submit Official Template Facture
  const handleDepositTemplateFacture = () => {
    const newFacture: FactureItem = {
      id: `FAC-${templateForm.factureNumero.replace(/\s/g, '')}`,
      freelance: templateForm.freelanceName || 'Amine Nejjari',
      mission: templateForm.designation,
      montant: `${templateForm.total.toLocaleString('fr-FR')} DH`,
      montantNum: templateForm.total,
      emiseLe: templateForm.date || new Date().toLocaleDateString('fr-FR'),
      statut: 'Sent',
      iban: 'MA64 0077 8000 0123 4567 8901 2345',
      iceFreelance: templateForm.iceFreelance,
      jalonName: `Période : ${templateForm.periode}`,
      templateData: { ...templateForm },
    };

    setFactures([newFacture, ...factures]);
    setDepositModalOpen(false);
    showToast(`✓ Facture officielle ${newFacture.id} générée et déposée avec succès !`);
  };

  // Action: Super Admin Validate
  const handleValidateSuperAdmin = (id: string) => {
    setFactures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, statut: 'Validated' as const } : f))
    );
    showToast(`✓ Facture ${id} validée`);
  };

  // Action: Finance Validate
  const handleValidateFinance = (id: string) => {
    setFactures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, statut: 'Validated' as const } : f))
    );
    showToast(`✓ Facture ${id} validée par le département Finance`);
  };

  // Action: Return Invoice
  const handleConfirmReturn = () => {
    if (!returnFacture) return;
    setFactures((prev) =>
      prev.map((f) =>
        f.id === returnFacture.id
          ? {
              ...f,
              statut: 'Returned' as const,
              statutNote: returnReasonInput || 'Facture retournée pour révision par l’administration.',
            }
          : f
      )
    );
    showToast(`Facture ${returnFacture.id} retournée au freelance`);
    setReturnFacture(null);
    setReturnReasonInput('');
  };

  // Action: Declare Payment
  const handleConfirmPayment = () => {
    if (!paymentFacture) return;
    setFactures((prev) =>
      prev.map((f) =>
        f.id === paymentFacture.id
          ? {
              ...f,
              statut: 'Paid' as const,
              paymentDetails: {
                method: payMethod,
                reference: payRef || `VIR-${Math.floor(1000000 + Math.random() * 9000000)}`,
                date: payDate,
                proofFile: 'Preuve_virement.pdf',
              },
            }
          : f
      )
    );
    showToast(`✓ Paiement déclaré pour la facture ${paymentFacture.id}`);
    setPaymentFacture(null);
    setPayRef('');
  };

  return (
    <div className="space-y-6 text-slate-100 max-w-7xl mx-auto pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#A8E635] text-[#0B0D10] font-black text-xs px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-black/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Section with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B0E17] p-6 rounded-2xl border border-white/10 shadow-2xl">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span>Factures Freelance</span>
            <span className="text-xs px-3 py-1 rounded-full bg-[#A8E635]/10 text-[#A8E635] border border-[#A8E635]/30 font-bold">
              Freelance & Finance
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#98A2B3] font-medium leading-relaxed">
            {isSuperAdmin
              ? "Importez et gérez les factures transmises par vos prestataires et freelances."
              : "Importez vos factures existantes ou utilisez le modèle officiel d'Auto-Entrepreneur Maroc conforme."}
          </p>
        </div>

        <button
          onClick={() => {
            setDepositModalOpen(true);
            setDepositStep(isSuperAdmin ? 'upload' : 'choice');
          }}
          className="px-5 py-3 rounded-xl bg-[#A8E635] text-[#0B0D10] font-black text-xs hover:bg-[#b8f042] transition-all cursor-pointer flex items-center gap-2 shadow-xl shadow-[#A8E635]/20 active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Déposer une facture</span>
        </button>
      </div>

      {/* 2. Filter & Search Toolbar */}
      {factures.length > 0 && (
        <div className="bg-[#0B0E17] p-3.5 sm:p-4 rounded-2xl border border-white/10 shadow-2xl space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="N° facture, mission, subject, freelance, montant..."
                className="w-full bg-[#121622] border border-white/10 focus:border-[#A8E635] text-white placeholder-[#98A2B3] text-xs rounded-xl pl-10 pr-10 py-2.5 outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#98A2B3] hover:text-white bg-white/5 hover:bg-white/10 active:scale-95 rounded-full transition-all cursor-pointer"
                  title="Effacer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Select */}
            <div className="md:col-span-4">
              <CustomSelect
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={statusOptions}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#98A2B3] pt-1">
            <span>{filteredFactures.length} résultat(s)</span>
            <button
              onClick={() => setFactures([])}
              className="text-xs text-[#98A2B3] hover:text-rose-400 font-medium transition cursor-pointer"
            >
              Réinitialiser la liste (Vider)
            </button>
          </div>
        </div>
      )}

      {/* 3. Main Content Table / Empty State */}
      {filteredFactures.length === 0 ? (
        <div className="bg-[#0B0E17] border border-white/10 rounded-2xl p-12 sm:p-20 text-center shadow-2xl flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#A8E635]">
            <Receipt className="w-8 h-8" />
          </div>

          <p className="text-sm sm:text-base text-white font-bold">
            Aucune facture trouvée.
          </p>
          <p className="text-xs text-[#98A2B3] max-w-sm">
            Vous pouvez ajouter une nouvelle facture en cliquant sur le bouton "+ Déposer une facture".
          </p>

          <div className="pt-2 flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => {
                setDepositModalOpen(true);
                setDepositStep('choice');
              }}
              className="px-5 py-2.5 rounded-xl text-xs bg-[#A8E635] text-[#0B0D10] font-black hover:bg-[#b8f042] transition-all cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Déposer une facture</span>
            </button>

            <button
              onClick={() => setFactures(sampleFactures)}
              className="px-4 py-2.5 rounded-xl text-xs text-[#98A2B3] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer font-bold flex items-center gap-2"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Recharger les exemples</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#0B0E17] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#98A2B3]">
              <thead className="bg-[#121622] uppercase text-[10px] font-black tracking-wider text-[#98A2B3] border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-5">Number</th>
                  <th className="py-3.5 px-5">Mission / Subject</th>
                  <th className="py-3.5 px-5">Amount</th>
                  <th className="py-3.5 px-5">Document Type</th>
                  <th className="py-3.5 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredFactures.map((row) => {
                  const normStatus = getNormalizedStatus(row.statut);
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* NUMBER + APERÇU */}
                      <td className="py-4 px-5 align-top">
                        <div className="flex flex-col gap-1.5 items-start">
                          <span className="font-mono font-black text-white text-xs">
                            {row.id}
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setPreviewFacture(row)}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A8E635] hover:underline cursor-pointer active:scale-95 transition-all"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Aperçu & Commentaires</span>
                            </button>
                            {row.comments && row.comments.length > 0 && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#A8E635]/15 text-[#A8E635] text-[9px] font-black border border-[#A8E635]/30 shadow-sm animate-pulse" title={`${row.comments.length} commentaire(s) / aller-retour`}>
                                <MessageSquare className="w-2.5 h-2.5 text-[#A8E635]" />
                                <span>{row.comments.length}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* MISSION / SUBJECT */}
                      <td className="py-4 px-5 align-top text-white font-medium max-w-xs">
                        <div className="font-bold text-white">{row.mission}</div>
                        <div className="text-[11px] text-[#98A2B3] flex items-center gap-1.5 mt-0.5">
                          <span className="font-semibold text-white/90">{row.freelance}</span>
                          {row.jalonName && <span>• {row.jalonName}</span>}
                        </div>
                      </td>

                      {/* AMOUNT */}
                      <td className="py-4 px-5 align-top font-black text-[#A8E635] text-xs">
                        {row.montant}
                      </td>

                      {/* DOCUMENT TYPE */}
                      <td className="py-4 px-5 align-top">
                        {row.templateData?.isTemplateUsed ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold inline-flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#A8E635]" />
                            Modèle Officiel
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/30 text-[10px] font-bold inline-flex items-center gap-1">
                            <FileText className="w-3 h-3 text-sky-400" />
                            Fichier importé
                          </span>
                        )}
                      </td>

                      {/* STATUS + NOTE & ACTIONS */}
                      <td className="py-4 px-5 align-top">
                        <div className="space-y-3">
                          {/* Current Status Badge */}
                          <div>
                            {normStatus === 'Draft' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/15 border border-slate-500/30 text-slate-300 text-[11px] font-extrabold">
                                <FileText className="w-3 h-3 text-slate-400" />
                                <span>Brouillon (Draft)</span>
                              </span>
                            )}

                            {normStatus === 'Sent' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[11px] font-extrabold">
                                <Clock className="w-3 h-3 text-sky-400" />
                                <span>Envoyé (Sent)</span>
                              </span>
                            )}

                            {normStatus === 'Returned' && (
                              <div>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-[11px] font-extrabold">
                                  <AlertCircle className="w-3 h-3 text-rose-400" />
                                  <span>Retourné (Returned)</span>
                                </span>
                                {row.statutNote && (
                                  <p className="text-[11px] text-rose-400 font-medium mt-1 leading-snug">
                                    {row.statutNote}
                                  </p>
                                )}
                              </div>
                            )}

                            {normStatus === 'Validated' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-extrabold">
                                <ShieldCheck className="w-3 h-3 text-purple-400" />
                                <span>Validé (Validated)</span>
                              </span>
                            )}

                            {normStatus === 'Paid' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-extrabold">
                                <Check className="w-3 h-3 text-[#A8E635]" />
                                <span>Payé (Paid)</span>
                              </span>
                            )}
                          </div>

                          {/* Quick Change Status Buttons */}
                          <div className="pt-2 border-t border-white/[0.06]">
                            <p className="text-[9px] uppercase tracking-wider text-[#98A2B3]/70 font-bold mb-1.5">
                              Changer le statut :
                            </p>
                            <div className="flex flex-wrap gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setFactures((prev) => prev.map((f) => f.id === row.id ? { ...f, statut: 'Draft' } : f));
                                  showToast(`Statut de ${row.id} changé en Brouillon`);
                                }}
                                className={`px-2 py-1 rounded text-[10px] font-bold transition-all border ${
                                  normStatus === 'Draft'
                                    ? 'bg-slate-500/25 text-white border-slate-500/50 scale-95 shadow-sm font-black'
                                    : 'bg-white/[0.02] text-[#98A2B3] hover:text-white border-white/5 hover:border-white/10 hover:bg-white/5'
                                }`}
                              >
                                Brouillon
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setFactures((prev) => prev.map((f) => f.id === row.id ? { ...f, statut: 'Sent' } : f));
                                  showToast(`Statut de ${row.id} changé en Envoyé`);
                                }}
                                className={`px-2 py-1 rounded text-[10px] font-bold transition-all border ${
                                  normStatus === 'Sent'
                                    ? 'bg-sky-500/25 text-white border-sky-500/50 scale-95 shadow-sm font-black'
                                    : 'bg-white/[0.02] text-[#98A2B3] hover:text-white border-white/5 hover:border-white/10 hover:bg-white/5'
                                }`}
                              >
                                Envoyé
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setFactures((prev) => prev.map((f) => f.id === row.id ? { ...f, statut: 'Returned', statutNote: 'Facture retournée pour révision.' } : f));
                                  showToast(`Statut de ${row.id} changé en Retourné`);
                                }}
                                className={`px-2 py-1 rounded text-[10px] font-bold transition-all border ${
                                  normStatus === 'Returned'
                                    ? 'bg-rose-500/25 text-white border-rose-500/50 scale-95 shadow-sm font-black'
                                    : 'bg-white/[0.02] text-[#98A2B3] hover:text-white border-white/5 hover:border-white/10 hover:bg-white/5'
                                }`}
                              >
                                Retourné
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setFactures((prev) => prev.map((f) => f.id === row.id ? { ...f, statut: 'Validated' } : f));
                                  showToast(`Statut de ${row.id} changé en Validé`);
                                }}
                                className={`px-2 py-1 rounded text-[10px] font-bold transition-all border ${
                                  normStatus === 'Validated'
                                    ? 'bg-purple-500/25 text-white border-purple-500/50 scale-95 shadow-sm font-black'
                                    : 'bg-white/[0.02] text-[#98A2B3] hover:text-white border-white/5 hover:border-white/10 hover:bg-white/5'
                                }`}
                              >
                                Validé
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setFactures((prev) => prev.map((f) => f.id === row.id ? { ...f, statut: 'Paid' } : f));
                                  showToast(`Statut de ${row.id} changé en Payé`);
                                }}
                                className={`px-2 py-1 rounded text-[10px] font-bold transition-all border ${
                                  normStatus === 'Paid'
                                    ? 'bg-emerald-500/25 text-[#A8E635] border-emerald-500/50 scale-95 shadow-sm font-black'
                                    : 'bg-white/[0.02] text-[#98A2B3] hover:text-white border-white/5 hover:border-white/10 hover:bg-white/5'
                                }`}
                              >
                                Payé
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= MODAL: DÉPOSER UNE FACTURE (CHOICE / UPLOAD / TEMPLATE) ================= */}
      {depositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B0D12] border border-white/15 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col text-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121622] shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 text-[#A8E635] bg-[#A8E635]/10 rounded-xl border border-[#A8E635]/20">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {depositStep === 'choice' && 'Déposer une nouvelle facture'}
                    {depositStep === 'upload' && 'Importer un fichier de facture'}
                    {depositStep === 'template' && 'Modèle de facture officiel (Auto-entrepreneur)'}
                  </h3>
                  <p className="text-xs text-[#98A2B3] mt-0.5">
                    {depositStep === 'choice' && 'Choisissez entre utiliser votre propre facture ou le modèle officiel'}
                    {depositStep === 'upload' && 'Renseignez les détails et téléchargez votre fichier'}
                    {depositStep === 'template' && 'Remplissez le formulaire conforme ou prévisualisez le document PDF'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDepositModalOpen(false)}
                className="p-1.5 text-[#98A2B3] hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* CHOICE STEP */}
              {depositStep === 'choice' && (
                <div className="space-y-6 py-2">
                  <div className="text-center max-w-md mx-auto space-y-1">
                    <h2 className="text-lg font-black text-white">Comment souhaitez-vous créer votre facture ?</h2>
                    <p className="text-xs text-[#98A2B3]">
                      Vous pouvez soit importer votre propre facture déjà créée, soit générer une facture conforme via notre modèle officiel Auto-Entrepreneur.
                    </p>
                  </div>

                  <div className={`grid grid-cols-1 ${isSuperAdmin ? 'max-w-md' : 'md:grid-cols-2 max-w-2xl'} gap-4 mx-auto`}>
                    {/* CHOICE 1: Custom File Upload */}
                    <div
                      onClick={() => setDepositStep('upload')}
                      className="p-6 rounded-2xl bg-[#121622] border border-white/10 hover:border-[#A8E635]/50 hover:bg-white/[0.03] transition-all cursor-pointer space-y-4 group relative flex flex-col justify-between"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-sm font-black text-white group-hover:text-sky-400 transition-colors flex items-center justify-between">
                          <span>Importer ma facture</span>
                          <ArrowRight className="w-4 h-4 text-[#98A2B3] group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                        </h3>
                        <p className="text-xs text-[#98A2B3] leading-relaxed">
                          Si vous avez déjà votre propre facture au format PDF, PNG ou JPG, téléchargez-la directement avec ses références.
                        </p>
                      </div>

                      <div className="pt-2 text-[11px] font-bold text-sky-400 flex items-center gap-1">
                        <FileUp className="w-3.5 h-3.5" />
                        <span>Format PDF / Image supporté</span>
                      </div>
                    </div>

                    {/* CHOICE 2: Official Template (Non-superadmin only) */}
                    {!isSuperAdmin && (
                      <div
                        onClick={() => setDepositStep('template')}
                        className="p-6 rounded-2xl bg-[#121622] border border-[#A8E635]/30 hover:border-[#A8E635] hover:bg-[#A8E635]/5 transition-all cursor-pointer space-y-4 group relative flex flex-col justify-between"
                      >
                        <div className="absolute top-4 right-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#A8E635]/15 text-[#A8E635] text-[10px] font-black border border-[#A8E635]/30">
                            Recommandé
                          </span>
                        </div>

                        <div className="w-12 h-12 rounded-2xl bg-[#A8E635]/10 border border-[#A8E635]/30 flex items-center justify-center text-[#A8E635] group-hover:scale-110 transition-transform">
                          <Sparkles className="w-6 h-6" />
                        </div>

                        <div className="space-y-1.5">
                          <h3 className="text-sm font-black text-white group-hover:text-[#A8E635] transition-colors flex items-center justify-between">
                            <span>Utiliser le modèle officiel</span>
                            <ArrowRight className="w-4 h-4 text-[#98A2B3] group-hover:text-[#A8E635] group-hover:translate-x-1 transition-all" />
                          </h3>
                          <p className="text-xs text-[#98A2B3] leading-relaxed">
                            Générez automatiquement une facture officielle Auto-Entrepreneur (CGI Art. 89) pré-remplie, conforme avec signature.
                          </p>
                        </div>

                        <div className="pt-2 text-[11px] font-bold text-[#A8E635] flex items-center gap-1">
                          <FileSpreadsheet className="w-3.5 h-3.5" />
                          <span>Génération automatique PDF</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* UPLOAD CUSTOM FILE STEP */}
              {depositStep === 'upload' && (
                <form onSubmit={handleDepositCustomFile} className="space-y-5 text-xs">
                  <div className="border-2 border-dashed border-white/15 hover:border-[#A8E635]/50 bg-[#121622] rounded-2xl p-6 text-center space-y-2 cursor-pointer transition-colors">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A8E635] mx-auto">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Glissez votre fichier ici ou parcourez</p>
                      <p className="text-[11px] text-[#98A2B3] mt-0.5">Formats PDF, PNG, JPG (Max 10 Mo)</p>
                    </div>
                    <input
                      type="file"
                      onChange={(e) => setUploadFileName(e.target.files?.[0]?.name || 'Facture_Importee.pdf')}
                      className="hidden"
                      id="file-upload-input"
                    />
                    <label
                      htmlFor="file-upload-input"
                      className="inline-block px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold cursor-pointer transition-colors mt-2"
                    >
                      Choisir un fichier
                    </label>
                    {uploadFileName && (
                      <p className="text-xs font-bold text-[#A8E635] pt-2">✓ Fichier sélectionné : {uploadFileName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#98A2B3] font-bold mb-1">Intitulé de la mission</label>
                      <input
                        type="text"
                        value={uploadMission}
                        onChange={(e) => setUploadMission(e.target.value)}
                        className="w-full bg-[#121622] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#A8E635]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#98A2B3] font-bold mb-1">N° de Facture</label>
                      <input
                        type="text"
                        value={uploadFactureNum}
                        onChange={(e) => setUploadFactureNum(e.target.value)}
                        className="w-full bg-[#121622] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#A8E635]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#98A2B3] font-bold mb-1">Montant Total (DH)</label>
                      <input
                        type="text"
                        value={uploadMontant}
                        onChange={(e) => setUploadMontant(e.target.value)}
                        className="w-full bg-[#121622] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#A8E635]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#98A2B3] font-bold mb-1">ICE Freelance</label>
                      <input
                        type="text"
                        value={uploadIce}
                        onChange={(e) => setUploadIce(e.target.value)}
                        className="w-full bg-[#121622] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#A8E635]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[#98A2B3] font-bold mb-1">IBAN pour virement</label>
                      <input
                        type="text"
                        value={uploadIban}
                        onChange={(e) => setUploadIban(e.target.value)}
                        className="w-full bg-[#121622] border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono outline-none focus:border-[#A8E635]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        if (isSuperAdmin) {
                          setDepositModalOpen(false);
                        } else {
                          setDepositStep('choice');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 font-bold"
                    >
                      {isSuperAdmin ? 'Annuler' : 'Retour'}
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#A8E635] text-[#0B0D10] font-black hover:bg-[#b8f042] shadow-lg shadow-[#A8E635]/20 cursor-pointer active:scale-95"
                    >
                      Valider & Déposer la facture
                    </button>
                  </div>
                </form>
              )}

              {/* OFFICIAL TEMPLATE FORM / PREVIEW STEP */}
              {depositStep === 'template' && (
                <div className="space-y-5">
                  {/* Sub-tab navigation: Formulaire vs Aperçu PDF */}
                  <div className="flex items-center gap-2 bg-[#121622] p-1.5 rounded-xl border border-white/10 text-xs font-bold w-fit">
                    <button
                      type="button"
                      onClick={() => setActiveTemplateTab('form')}
                      className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                        activeTemplateTab === 'form' ? 'bg-[#A8E635] text-[#0B0D10] shadow-md' : 'text-[#98A2B3] hover:text-white'
                      }`}
                    >
                      1. Formulaire & Données
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTemplateTab('preview')}
                      className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeTemplateTab === 'preview' ? 'bg-[#A8E635] text-[#0B0D10] shadow-md' : 'text-[#98A2B3] hover:text-white'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>2. Aperçu Document Officiel</span>
                    </button>
                  </div>

                  {activeTemplateTab === 'form' ? (
                    <div className="space-y-5 text-xs">
                      {/* Section 1: Auto-Entrepreneur */}
                      <div className="p-4 rounded-2xl bg-[#121622] border border-white/10 space-y-3">
                        <h4 className="font-bold text-white text-xs flex items-center gap-2">
                          <User className="w-4 h-4 text-[#A8E635]" />
                          <span>Identité Auto-Entrepreneur (Émetteur)</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[#98A2B3] mb-1 font-bold">Nom & Prénom</label>
                            <input
                              type="text"
                              value={templateForm.freelanceName}
                              onChange={(e) => setTemplateForm({ ...templateForm, freelanceName: e.target.value })}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#A8E635]"
                            />
                          </div>
                          <div>
                            <label className="block text-[#98A2B3] mb-1 font-bold">CINE</label>
                            <input
                              type="text"
                              value={templateForm.cine}
                              onChange={(e) => setTemplateForm({ ...templateForm, cine: e.target.value })}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#A8E635]"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[#98A2B3] mb-1 font-bold">Adresse</label>
                            <input
                              type="text"
                              value={templateForm.freelanceAdresse}
                              onChange={(e) => setTemplateForm({ ...templateForm, freelanceAdresse: e.target.value })}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#A8E635]"
                            />
                          </div>
                          <div>
                            <label className="block text-[#98A2B3] mb-1 font-bold">ICE Auto-entrepreneur</label>
                            <input
                              type="text"
                              value={templateForm.iceFreelance}
                              onChange={(e) => setTemplateForm({ ...templateForm, iceFreelance: e.target.value })}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-[#A8E635]"
                            />
                          </div>
                          <div>
                            <label className="block text-[#98A2B3] mb-1 font-bold">IF</label>
                            <input
                              type="text"
                              value={templateForm.ifNumber}
                              onChange={(e) => setTemplateForm({ ...templateForm, ifNumber: e.target.value })}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-[#A8E635]"
                            />
                          </div>
                          <div>
                            <label className="block text-[#98A2B3] mb-1 font-bold">Taxe Professionnelle N°</label>
                            <input
                              type="text"
                              value={templateForm.taxePro}
                              onChange={(e) => setTemplateForm({ ...templateForm, taxePro: e.target.value })}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-[#A8E635]"
                            />
                          </div>
                          <div>
                            <label className="block text-[#98A2B3] mb-1 font-bold">Téléphone</label>
                            <input
                              type="text"
                              value={templateForm.tel}
                              onChange={(e) => setTemplateForm({ ...templateForm, tel: e.target.value })}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#A8E635]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Details Facture & Prestations */}
                      <div className="p-4 rounded-2xl bg-[#121622] border border-white/10 space-y-3">
                        <h4 className="font-bold text-white text-xs flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#A8E635]" />
                          <span>Détails de la prestation & Montants</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[#98A2B3] mb-1 font-bold">Facture Numéro</label>
                            <input
                              type="text"
                              value={templateForm.factureNumero}
                              onChange={(e) => setTemplateForm({ ...templateForm, factureNumero: e.target.value })}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#A8E635]"
                            />
                          </div>
                          <div>
                            <label className="block text-[#98A2B3] mb-1 font-bold">Date de Facture</label>
                            <input
                              type="text"
                              value={templateForm.date}
                              onChange={(e) => setTemplateForm({ ...templateForm, date: e.target.value })}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#A8E635]"
                            />
                          </div>
                          <div>
                            <label className="block text-[#98A2B3] mb-1 font-bold">Client</label>
                            <input
                              type="text"
                              value={templateForm.clientName}
                              onChange={(e) => setTemplateForm({ ...templateForm, clientName: e.target.value })}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#A8E635]"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[#98A2B3] mb-1 font-bold">Désignation des Prestations</label>
                            <input
                              type="text"
                              value={templateForm.designation}
                              onChange={(e) => setTemplateForm({ ...templateForm, designation: e.target.value })}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#A8E635]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#98A2B3] mb-1 font-bold">Période</label>
                            <input
                              type="text"
                              value={templateForm.periode}
                              onChange={(e) => setTemplateForm({ ...templateForm, periode: e.target.value })}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#A8E635]"
                            />
                          </div>

                          <div>
                            <label className="block text-[#98A2B3] mb-1 font-bold">Prix Unitaire (MAD)</label>
                            <input
                              type="number"
                              value={templateForm.prixUnitaire}
                              onChange={(e) => {
                                const pu = parseFloat(e.target.value) || 0;
                                const tot = pu * templateForm.quantite;
                                setTemplateForm({
                                  ...templateForm,
                                  prixUnitaire: pu,
                                  total: tot,
                                  sommeLettres: numberToFrenchWords(tot),
                                });
                              }}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-[#A8E635] font-black outline-none focus:border-[#A8E635]"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-[#98A2B3] mb-1 font-bold">Somme en toutes lettres</label>
                            <input
                              type="text"
                              value={templateForm.sommeLettres}
                              onChange={(e) => setTemplateForm({ ...templateForm, sommeLettres: e.target.value })}
                              className="w-full bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-white outline-none focus:border-[#A8E635]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* PREVIEW TAB */
                    <div className="space-y-4">
                      <div className="p-3 bg-[#121622] rounded-xl border border-white/10 flex items-center justify-between text-xs">
                        <span className="text-[#98A2B3]">Rendu en direct du document PDF d'après le modèle officiel</span>
                        <span className="text-[#A8E635] font-bold">✓ Conforme Art. 89 CGI</span>
                      </div>
                      <OfficialInvoiceDocument data={templateForm} />
                    </div>
                  )}

                  {/* Template Footer Action */}
                  <div className="flex justify-between items-center pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setDepositStep('choice')}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 font-bold text-xs"
                    >
                      Retour aux choix
                    </button>

                    <button
                      type="button"
                      onClick={handleDepositTemplateFacture}
                      className="px-6 py-2.5 rounded-xl bg-[#A8E635] text-[#0B0D10] font-black text-xs hover:bg-[#b8f042] shadow-xl shadow-[#A8E635]/20 cursor-pointer active:scale-95 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Générer & Déposer la facture</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: APERÇU FACTURE PDF ================= */}
      {previewFacture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B0D12] border border-white/15 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col text-slate-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121622] shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 text-[#A8E635] bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    Facture {previewFacture.id}
                  </h3>
                  <p className="text-xs text-[#98A2B3] mt-0.5 font-medium">
                    {previewFacture.mission} · {previewFacture.freelance}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewFacture(null)}
                className="p-1.5 text-[#98A2B3] hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              {previewFacture.templateData ? (
                /* OFFICIAL TEMPLATE DOCUMENT DISPLAY */
                <OfficialInvoiceDocument data={previewFacture.templateData} />
              ) : (
                /* STANDARD INVOICE DETAILS DISPLAY */
                <div className="bg-[#121622] rounded-2xl border border-white/10 p-6 space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#A8E635] font-bold tracking-wider">
                      Pièce Comptable Officielle (Fichier Déposé)
                    </span>
                    <h2 className="text-2xl font-black text-white tracking-tight mt-0.5">
                      Facture {previewFacture.id}
                    </h2>
                    <p className="text-xs text-[#98A2B3] mt-1 font-medium">
                      Unitgrowth Platform · Intermédiaire de mise en relation
                    </p>
                  </div>

                  <div className="border border-white/10 rounded-xl p-5 space-y-3 bg-[#0B0E17] text-xs">
                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-4 font-bold text-white">Mission :</span>
                      <span className="col-span-8 text-slate-300 font-medium">{previewFacture.mission}</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-4 font-bold text-white">Freelance :</span>
                      <span className="col-span-8 text-slate-300 font-medium">{previewFacture.freelance}</span>
                    </div>
                    {previewFacture.iban && (
                      <div className="grid grid-cols-12 gap-2">
                        <span className="col-span-4 font-bold text-white">IBAN :</span>
                        <span className="col-span-8 font-mono text-slate-300">{previewFacture.iban}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-4 font-bold text-white">Montant Total :</span>
                      <span className="col-span-8 text-[#A8E635] font-black text-sm">{previewFacture.montant}</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-4 font-bold text-white">Statut :</span>
                      <span className="col-span-8 text-slate-300 font-medium">{previewFacture.statut}</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-4 font-bold text-white">Date d'émission :</span>
                      <span className="col-span-8 text-slate-300 font-medium">{previewFacture.emiseLe}</span>
                    </div>
                    {previewFacture.fileName && (
                      <div className="grid grid-cols-12 gap-2 pt-2 border-t border-white/5">
                        <span className="col-span-4 font-bold text-white">Fichier attaché :</span>
                        <span className="col-span-8 text-sky-400 font-bold flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{previewFacture.fileName}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SECTION: ÉCHANGES & COMMENTAIRES (ALLER-RETOUR) */}
              <div className="pt-5 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-white">
                  <div className="p-1.5 rounded-lg bg-white/5 text-[#A8E635]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-wider font-mono">
                    Fil de discussion & notes (Aller-retour)
                  </h4>
                </div>

                {/* List of comments */}
                <div className="space-y-3">
                  {previewFacture.comments && previewFacture.comments.length > 0 ? (
                    <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                      {previewFacture.comments.map((comm) => (
                        <div
                          key={comm.id}
                          className={`p-3 rounded-xl border text-xs leading-relaxed space-y-1 ${
                            comm.role === 'Super Admin'
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-white ml-6 animate-in fade-in duration-200'
                              : comm.role === 'Responsable'
                              ? 'bg-sky-500/10 border-sky-500/20 text-white ml-6 animate-in fade-in duration-200'
                              : 'bg-white/[0.03] border-white/10 text-white mr-6 animate-in fade-in duration-200'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="flex items-center gap-1.5">
                              {comm.role === 'Super Admin' ? '🛡️' : comm.role === 'Responsable' ? '💼' : '👤'}
                              <span>{comm.author}</span>
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                                comm.role === 'Super Admin'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : comm.role === 'Responsable'
                                  ? 'bg-sky-500/20 text-sky-300'
                                  : 'bg-white/10 text-slate-300'
                              }`}>
                                {comm.role}
                              </span>
                            </span>
                            <span className="text-[#98A2B3] text-[10px] font-medium">{comm.date}</span>
                          </div>
                          <p className="text-slate-200 mt-1">{comm.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#98A2B3] italic pl-2">Aucun commentaire sur cette facture pour le moment.</p>
                  )}
                </div>

                {/* Add comment form */}
                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-[#98A2B3] uppercase font-mono tracking-wider block">
                    Ajouter une remarque ou une réponse
                  </span>
                  <div className="flex gap-2">
                    <textarea
                      rows={2}
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Tapez votre remarque, question ou réponse pour l'aller-retour..."
                      className="flex-1 bg-[#0B0E17] border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#A8E635] resize-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddInvoiceComment(previewFacture.id)}
                      className="px-4 py-2 bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] font-black text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 self-end shadow-md active:scale-95"
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end px-6 py-4 border-t border-white/10 bg-[#121622] shrink-0 gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl transition-all border border-white/10 flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer / Télécharger PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewFacture(null)}
                className="px-5 py-2.5 bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] text-xs font-black rounded-xl transition-all cursor-pointer active:scale-95"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: DÉCLARER LE PAIEMENT ================= */}
      {paymentFacture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B0D12] border border-white/15 rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 space-y-5 relative text-white">
            <button
              onClick={() => setPaymentFacture(null)}
              className="absolute top-5 right-5 p-2 text-[#98A2B3] hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#A8E635] mb-3">
                <CreditCard className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Déclarer le Paiement Hors-Plateforme
              </h2>
              <p className="text-xs text-[#98A2B3] mt-1">
                Enregistrer la preuve de virement pour la facture <strong className="text-white">{paymentFacture.id}</strong> ({paymentFacture.montant}).
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#98A2B3] font-bold mb-1">
                  Mode de règlement
                </label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full bg-[#121622] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#A8E635]"
                >
                  <option value="Virement bancaire (Attijariwafa Bank)">Virement bancaire (Attijariwafa Bank)</option>
                  <option value="Virement bancaire (BP / BMCE / CIH)">Virement bancaire (BP / BMCE / CIH)</option>
                  <option value="Chèque certifié">Chèque certifié</option>
                  <option value="Autre virement B2B">Autre virement B2B</option>
                </select>
              </div>

              <div>
                <label className="block text-[#98A2B3] font-bold mb-1">
                  Référence du virement / N° transaction
                </label>
                <input
                  type="text"
                  value={payRef}
                  onChange={(e) => setPayRef(e.target.value)}
                  placeholder="ex: VIR-2026-998201"
                  className="w-full bg-[#121622] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#A8E635]"
                />
              </div>

              <div>
                <label className="block text-[#98A2B3] font-bold mb-1">
                  Date d'exécution du virement
                </label>
                <input
                  type="text"
                  value={payDate}
                  onChange={(e) => setPayDate(e.target.value)}
                  className="w-full bg-[#121622] border border-white/10 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#A8E635]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPaymentFacture(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 text-xs font-bold cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="px-6 py-2.5 rounded-xl bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] text-xs font-black transition-all shadow-lg shadow-[#A8E635]/20 cursor-pointer active:scale-95"
              >
                Valider & Déclarer le Paiement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: RETOURNER LA FACTURE ================= */}
      {returnFacture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0B0D12] border border-white/15 rounded-3xl max-w-lg w-full shadow-2xl p-6 space-y-5 relative text-white">
            <button
              onClick={() => setReturnFacture(null)}
              className="absolute top-5 right-5 p-2 text-[#98A2B3] hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Retourner la Facture au Freelance
              </h2>
              <p className="text-xs text-[#98A2B3] mt-1">
                Indiquez le motif de rejet/retour pour la facture <strong className="text-white">{returnFacture.id}</strong> ({returnFacture.freelance}).
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <label className="block text-[#98A2B3] font-bold">
                Motif de retour (ex: montant non conforme, RIB erroné) :
              </label>
              <textarea
                rows={3}
                value={returnReasonInput}
                onChange={(e) => setReturnReasonInput(e.target.value)}
                placeholder="ex: Le montant ne correspond pas au jalon prévu au contrat (30 000 DH attendus)."
                className="w-full bg-[#121622] border border-white/10 rounded-xl p-3 text-white placeholder-[#98A2B3] outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReturnFacture(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 text-xs font-bold cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmReturn}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black transition-all shadow-lg shadow-rose-600/30 cursor-pointer active:scale-95"
              >
                Confirmer le Retour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacturesView;
