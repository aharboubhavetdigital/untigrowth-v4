import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Activity,
  Calendar,
  Clock,
  Shield,
  User,
  Receipt,
  Brain,
  Key,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Download,
  ChevronRight,
  Filter,
  X,
  ExternalLink,
  SlidersHorizontal,
  RefreshCw,
  Sparkles,
  Copy
} from 'lucide-react';

export interface LogItem {
  id: string;
  actor: string;
  email: string;
  role: 'superadmin' | 'commercial' | 'freelance' | 'system';
  action: string;
  target: string;
  timestamp: string;
  category: 'factures' | 'utilisateurs' | 'tests' | 'acces' | 'profils' | 'projets' | 'systeme';
  statusType: 'success' | 'warning' | 'danger' | 'info';
  ipAddress?: string;
  details?: string;
}

const INITIAL_LOGS: LogItem[] = [
  {
    id: 'LOG-0015',
    actor: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'superadmin',
    action: 'Facture declarer_paiement',
    target: 'FAC-2026-0010',
    timestamp: '12/08/2026 14:05:12',
    category: 'factures',
    statusType: 'success',
    ipAddress: '196.217.42.10',
    details: 'Paiement virement bancaire confirmé. Montant: 25,200 DH.'
  },
  {
    id: 'LOG-0014',
    actor: 'Anass HARBOUB',
    email: 'aharboub@havetdigital.app',
    role: 'freelance',
    action: 'Inscription freelance',
    target: 'Anass HARBOUB',
    timestamp: '05/08/2026 18:21:54',
    category: 'utilisateurs',
    statusType: 'info',
    ipAddress: '105.158.12.89',
    details: 'Nouveau compte créé via formulaire public. Métier: Développeur Fullstack.'
  },
  {
    id: 'LOG-0013',
    actor: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'superadmin',
    action: 'Mise à jour test',
    target: 'Développement full stack',
    timestamp: '05/08/2026 11:47:10',
    category: 'tests',
    statusType: 'warning',
    ipAddress: '196.217.42.10',
    details: 'Modifications des critères de notation et consignes du test technique.'
  },
  {
    id: 'LOG-0012',
    actor: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'superadmin',
    action: 'Désactivation question test',
    target: 'Q#1',
    timestamp: '05/08/2026 11:36:39',
    category: 'tests',
    statusType: 'danger',
    ipAddress: '196.217.42.10',
    details: 'Question Q#1 désactivée de la banque de questions active.'
  },
  {
    id: 'LOG-0011',
    actor: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'superadmin',
    action: 'Modification question test',
    target: 'Q#1',
    timestamp: '04/08/2026 17:17:34',
    category: 'tests',
    statusType: 'warning',
    ipAddress: '196.217.42.10',
    details: 'Mise à jour des choix de réponses et de la réponse modèle.'
  },
  {
    id: 'LOG-0010',
    actor: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'superadmin',
    action: 'Retrait test',
    target: 'Salma Benali',
    timestamp: '04/08/2026 17:12:31',
    category: 'tests',
    statusType: 'danger',
    ipAddress: '196.217.42.10',
    details: 'Annulation du test de qualification en cours.'
  },
  {
    id: 'LOG-0009',
    actor: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'superadmin',
    action: 'Affectation test',
    target: 'Salma Benali · IA & automatisation',
    timestamp: '04/08/2026 17:12:29',
    category: 'tests',
    statusType: 'info',
    ipAddress: '196.217.42.10',
    details: 'Invitation envoyée pour passer le test IA & automatisation.'
  },
  {
    id: 'LOG-0008',
    actor: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'superadmin',
    action: 'Accès projet accordé',
    target: "Campagnes d'acquisition multi-canal · user #16",
    timestamp: '04/08/2026 15:57:21',
    category: 'acces',
    statusType: 'success',
    ipAddress: '196.217.42.10',
    details: 'Autorisations de lecture et écriture accordées sur le projet.'
  },
  {
    id: 'LOG-0007',
    actor: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'superadmin',
    action: 'Accès projet accordé',
    target: 'Application interne de gestion de stock (no-code) · user #14',
    timestamp: '04/08/2026 15:57:21',
    category: 'acces',
    statusType: 'success',
    ipAddress: '196.217.42.10',
    details: 'Inclusion dans l’équipe projet et partage des clés API.'
  },
  {
    id: 'LOG-0006',
    actor: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'superadmin',
    action: 'Accès projet révoqué (fin_contrat)',
    target: 'Application interne de gestion de stock (no-code)',
    timestamp: '04/08/2026 15:57:21',
    category: 'acces',
    statusType: 'danger',
    ipAddress: '196.217.42.10',
    details: 'Révocation systématique des accès à la fin du contrat.'
  },
  {
    id: 'LOG-0005',
    actor: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'superadmin',
    action: 'Validation profil',
    target: 'Salma Benali',
    timestamp: '04/08/2026 15:57:21',
    category: 'profils',
    statusType: 'success',
    ipAddress: '196.217.42.10',
    details: 'Validation métier et intégration dans le vivier actif.'
  },
  {
    id: 'LOG-0004',
    actor: 'Responsable Commercial',
    email: 'commercial@iaweb.dev',
    role: 'commercial',
    action: 'Création consultation',
    target: 'Refonte plateforme e-commerce B2B',
    timestamp: '04/08/2026 15:57:21',
    category: 'projets',
    statusType: 'info',
    ipAddress: '41.140.23.4',
    details: 'Dépôt d’un nouveau besoin client avec budget prévisionnel.'
  },
  {
    id: 'LOG-0003',
    actor: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'superadmin',
    action: 'Validation facture',
    target: 'FAC-2026-0012',
    timestamp: '04/08/2026 15:57:21',
    category: 'factures',
    statusType: 'success',
    ipAddress: '196.217.42.10',
    details: 'Facture contrôlée et approuvée pour traitement comptable.'
  },
  {
    id: 'LOG-0002',
    actor: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'superadmin',
    action: 'Suspension profil',
    target: 'Sofia Alaoui',
    timestamp: '04/08/2026 15:57:21',
    category: 'profils',
    statusType: 'danger',
    ipAddress: '196.217.42.10',
    details: 'Compte suspendu pour indisponibilité non déclarée.'
  },
  {
    id: 'LOG-0001',
    actor: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'superadmin',
    action: 'Mise à jour paramètres système',
    target: 'Seuil de réussite des tests IA passé à 70%',
    timestamp: '03/08/2026 09:12:00',
    category: 'systeme',
    statusType: 'warning',
    ipAddress: '196.217.42.10',
    details: 'Ajustement de la politique globale de qualification.'
  }
];

export const JournauxView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedActor, setSelectedActor] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<LogItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Tous les évènements', icon: Activity },
    { id: 'factures', label: 'Factures & Paiements', icon: Receipt },
    { id: 'utilisateurs', label: 'Utilisateurs & Profils', icon: User },
    { id: 'tests', label: 'Tests IA', icon: Brain },
    { id: 'acces', label: 'Accès & Clés', icon: Key },
    { id: 'projets', label: 'Consultations & Projets', icon: FileText },
    { id: 'systeme', label: 'Paramètres Système', icon: SlidersHorizontal },
  ];

  const filteredLogs = INITIAL_LOGS.filter((log) => {
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    const matchesActor = selectedActor === 'all' || log.actor.toLowerCase().includes(selectedActor.toLowerCase());
    
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      log.actor.toLowerCase().includes(term) ||
      log.email.toLowerCase().includes(term) ||
      log.action.toLowerCase().includes(term) ||
      log.target.toLowerCase().includes(term) ||
      log.timestamp.toLowerCase().includes(term) ||
      (log.details && log.details.toLowerCase().includes(term));

    return matchesCategory && matchesActor && matchesSearch;
  });

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'factures':
        return { label: 'Facture / Paiement', bg: 'bg-white/10 text-white border-white/20', icon: Receipt };
      case 'utilisateurs':
        return { label: 'Utilisateur', bg: 'bg-white/10 text-white border-white/20', icon: User };
      case 'tests':
        return { label: 'Test IA', bg: 'bg-white/10 text-white border-white/20', icon: Brain };
      case 'acces':
        return { label: 'Accès Projet', bg: 'bg-white/10 text-white border-white/20', icon: Key };
      case 'profils':
        return { label: 'Profil Freelance', bg: 'bg-white/10 text-white border-white/20', icon: Shield };
      case 'projets':
        return { label: 'Projet / Consultation', bg: 'bg-white/10 text-white border-white/20', icon: FileText };
      default:
        return { label: 'Système', bg: 'bg-white/10 text-white border-white/20', icon: SlidersHorizontal };
    }
  };

  const getStatusIcon = (statusType: string) => {
    switch (statusType) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-white" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-white" />;
      case 'danger':
        return <XCircle className="w-4 h-4 text-white" />;
      default:
        return <Info className="w-4 h-4 text-white" />;
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Acteur', 'Email', 'Action', 'Sujet/Cible', 'Horodatage', 'Catégorie', 'Détails'];
    const rows = filteredLogs.map(l => [
      l.id,
      `"${l.actor}"`,
      `"${l.email}"`,
      `"${l.action}"`,
      `"${l.target}"`,
      `"${l.timestamp}"`,
      `"${l.category}"`,
      `"${l.details || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `journaux_activite_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* ================= PAGE TITLE & SUMMARY KPI BAR ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Journaux d'activité
            </h1>
            <span className="px-3 py-0.5 rounded-full bg-[#A8E635]/10 border border-[#A8E635]/30 text-[#A8E635] text-xs font-bold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Super Administrateur
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#98A2B3] mt-1 max-w-2xl">
            Trace complète des actions (validations, contrats, factures, accès, tests) pour un contrôle et un suivi d'audit rigoureux.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCsv}
            className="px-4 py-2 bg-[#12151C] hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Download className="w-4 h-4 text-[#A8E635]" />
            Exporter CSV
          </button>
        </div>
      </div>

      {/* ================= TOP SUMMARY METRICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 bg-[#0F1218] rounded-2xl border border-white/10 shadow-lg flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#98A2B3] uppercase tracking-wider">Évènements récents</div>
            <div className="text-xl font-black text-white">{INITIAL_LOGS.length}</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 bg-[#0F1218] rounded-2xl border border-white/10 shadow-lg flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#98A2B3] uppercase tracking-wider">Acteurs distincts</div>
            <div className="text-xl font-black text-white">3 administrateurs</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 bg-[#0F1218] rounded-2xl border border-white/10 shadow-lg flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Key className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#98A2B3] uppercase tracking-wider">Accès & Sécurité</div>
            <div className="text-xl font-black text-white">3 révocations/accès</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 bg-[#0F1218] rounded-2xl border border-white/10 shadow-lg flex items-center gap-3.5"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#98A2B3] uppercase tracking-wider">Dernier journal</div>
            <div className="text-xs font-bold text-white">Aujourd'hui à 14:05</div>
          </div>
        </motion.div>
      </div>

      {/* ================= CONTROLS: SEARCH & CATEGORY FILTERS ================= */}
      <div className="bg-[#12151C] p-4 rounded-2xl border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3 justify-between">
          {/* High-Contrast Search Field matching user request */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Action, sujet, utilisateur..."
              className="w-full pl-10 pr-9 py-2.5 bg-[#090B0E] border border-white/15 focus:border-[#A8E635] text-white placeholder-[#98A2B3] rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#A8E635] transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Result Count Indicator Pill */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs font-semibold text-[#98A2B3]">
              <strong className="text-white font-extrabold">{filteredLogs.length}</strong> résultat(s)
            </span>
            {(searchTerm || selectedCategory !== 'all' || selectedActor !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedActor('all');
                }}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-[11px] font-bold text-[#A8E635] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Réinitialiser
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#A8E635] text-[#0B0D10] border-[#A8E635] shadow-md shadow-[#A8E635]/20'
                    : 'bg-[#090B0E] text-[#98A2B3] border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#0B0D10]' : 'text-[#98A2B3]'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= MAIN LOGS FEED LIST ================= */}
      <div className="bg-[#12151C] rounded-2xl border border-white/10 shadow-2xl overflow-hidden divide-y divide-white/5">
        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-[#98A2B3]">
              <Search className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-white">Aucun journal d'activité trouvé</p>
            <p className="text-xs text-[#98A2B3]">Essayez de modifier votre terme de recherche ou les filtres sélectionnés.</p>
          </div>
        ) : (
          filteredLogs.map((log, index) => {
            const catBadge = getCategoryBadge(log.category);
            const CatIcon = catBadge.icon;

            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                onClick={() => setSelectedLog(log)}
                className="p-4 sm:p-5 hover:bg-white/[0.03] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  {/* Category / Status Icon Circle */}
                  <div className="w-9 h-9 rounded-xl bg-[#090B0E] border border-white/10 group-hover:border-white/30 flex items-center justify-center shrink-0 transition-colors shadow-inner mt-0.5">
                    {getStatusIcon(log.statusType)}
                  </div>

                  {/* Log Header & Details */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Actor Name */}
                      <span className="text-xs font-black text-white group-hover:text-white transition-colors">
                        {log.actor}
                      </span>
                      
                      {/* Actor Email */}
                      <span className="text-xs text-[#98A2B3] font-mono">
                        ({log.email})
                      </span>

                      <span className="text-xs font-bold text-[#98A2B3]">—</span>

                      {/* Action Name */}
                      <span className="text-xs font-extrabold text-white">
                        {log.action}
                      </span>

                      {/* Target Highlight */}
                      {log.target && (
                        <span className="text-xs font-bold text-white bg-white/10 border border-white/20 px-2 py-0.5 rounded-md">
                          · {log.target}
                        </span>
                      )}
                    </div>

                    {/* Secondary Description line */}
                    {log.details && (
                      <p className="text-xs text-[#98A2B3] line-clamp-1 group-hover:text-slate-300 transition-colors">
                        {log.details}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Metadata: Category Tag & Timestamp */}
                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                  <span className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold flex items-center gap-1.5 ${catBadge.bg}`}>
                    <CatIcon className="w-3 h-3 text-white" />
                    {catBadge.label}
                  </span>

                  <div className="text-[11px] font-mono text-[#98A2B3] bg-[#090B0E] border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shrink-0 shadow-inner">
                    <Clock className="w-3 h-3 text-white" />
                    {log.timestamp}
                  </div>

                  <ChevronRight className="w-4 h-4 text-[#98A2B3] group-hover:text-white group-hover:translate-x-0.5 transition-all hidden sm:block" />
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* ================= LOG DETAIL INSPECTOR MODAL ================= */}
      <AnimatePresence>
        {selectedLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-[#0F1218] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#A8E635]/15 border border-[#A8E635]/30 rounded-xl text-[#A8E635]">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">Détails de l'évènement</h3>
                    <p className="text-xs font-mono text-[#98A2B3]">{selectedLog.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="p-1.5 rounded-full bg-white/5 border border-white/10 text-[#98A2B3] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Content Details */}
              <div className="space-y-4 text-xs">
                {/* Action & Target */}
                <div className="p-3.5 bg-[#090B0E] rounded-xl border border-white/10 space-y-1">
                  <div className="text-[10px] font-bold text-[#98A2B3] uppercase tracking-wider">Action effectuée</div>
                  <div className="text-sm font-black text-white">{selectedLog.action}</div>
                  <div className="text-xs text-[#A8E635] font-semibold">{selectedLog.target}</div>
                </div>

                {/* Actor & Role */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#090B0E] rounded-xl border border-white/10 space-y-1">
                    <div className="text-[10px] font-bold text-[#98A2B3] uppercase">Exécuté par</div>
                    <div className="font-extrabold text-white">{selectedLog.actor}</div>
                    <div className="text-[11px] font-mono text-[#98A2B3] truncate">{selectedLog.email}</div>
                  </div>

                  <div className="p-3 bg-[#090B0E] rounded-xl border border-white/10 space-y-1">
                    <div className="text-[10px] font-bold text-[#98A2B3] uppercase">Date & Heure</div>
                    <div className="font-mono text-white font-bold">{selectedLog.timestamp}</div>
                    <div className="text-[11px] text-emerald-400 font-semibold">Horodaté UTC+1</div>
                  </div>
                </div>

                {/* Technical Meta (IP & Category) */}
                <div className="p-3 bg-[#090B0E] rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#98A2B3]">Catégorie:</span>
                    <span className="font-bold text-white capitalize">{selectedLog.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#98A2B3]">Adresse IP source:</span>
                    <span className="font-mono text-sky-400 font-semibold">{selectedLog.ipAddress || '196.217.42.10'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#98A2B3]">Statut système:</span>
                    <span className="font-bold text-[#A8E635]">Succès (200 OK)</span>
                  </div>
                </div>

                {/* Full Description / Details Payload */}
                {selectedLog.details && (
                  <div className="p-3.5 bg-[#090B0E] rounded-xl border border-white/10 space-y-1">
                    <div className="text-[10px] font-bold text-[#98A2B3] uppercase tracking-wider">Payload / Remarques</div>
                    <p className="text-xs text-slate-200 leading-relaxed">{selectedLog.details}</p>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => handleCopy(JSON.stringify(selectedLog, null, 2))}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-[#A8E635]" />
                  {copiedId ? 'Copié !' : 'Copier JSON'}
                </button>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="px-5 py-2 bg-[#A8E635] text-[#0B0D10] font-black text-xs rounded-xl hover:bg-[#bbf047] transition-all cursor-pointer shadow-lg shadow-[#A8E635]/20"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JournauxView;
