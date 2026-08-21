import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Flame,
  Clock,
  Target,
  Edit3,
  Plus,
  Code2,
  Globe,
  Briefcase,
  Phone,
  Languages,
  Github,
  Gitlab,
  Send,
  Link as LinkIcon,
  FileText,
  Award,
  Cloud,
  Upload,
  Eye,
  RefreshCw,
  Trash2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  ChevronRight,
  Save,
  CheckCircle,
  Bell
} from 'lucide-react';
import { NotificationSettingsModal } from './NotificationSettingsModal';
import { NotificationEventsPopup } from './NotificationEventsPopup';

export const ProfilView: React.FC = () => {
  const [availabilityStatus, setAvailabilityStatus] = useState('Disponible');
  const [availabilityDate, setAvailabilityDate] = useState('2026-08-04');
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmedSuccess, setConfirmedSuccess] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isNotifPopupOpen, setIsNotifPopupOpen] = useState(false);

  // Form states
  const [userInfo, setUserInfo] = useState({
    profession: 'Développement full stack',
    country: 'Maroc',
    legalStatus: 'Auto-entrepreneur',
    phone: '+212 6 80 59 26 89',
    languages: 'Français, Arabe, Anglais',
    github: 'https://github.com/yassine-demo',
    gitlab: 'https://gitlab.com/yassine-demo',
    planeUser: 'yassine@example.com',
    portfolioUrl: 'https://yassine-dev.ma',
    bio: 'Freelance fullstack validé — compte de démonstration.'
  });

  const handleConfirmAvailability = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setConfirmedSuccess(true);
      setTimeout(() => setConfirmedSuccess(false), 3000);
    }, 600);
  };

  const handleSaveFolder = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="space-y-6 pb-12"
    >
      {/* ================= HEADER SECTION ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E131F] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#A8E635]/5 rounded-full blur-2xl pointer-events-none" />
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Mon profil
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-[#A8E635] border border-emerald-500/30 shadow-sm animate-pulse">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Validé</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-[#A8E635] border border-emerald-500/20">
              <span>Score global : 86/100</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#98A2B3] mt-2">
            Gardez votre profil actif pour rester visible et décrocher plus de missions.
          </p>
        </div>

        <button
          onClick={() => setIsNotifPopupOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Bell className="w-4 h-4 text-[#A8E635]" />
          <span>Événements de notification</span>
        </button>
      </div>

      {/* ================= TOP GRID (4 CARDS) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Profil complet à 86% */}
        <div className="bg-[#0E131F] border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-4">
            {/* SVG Ring Meter */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="text-[#A8E635]"
                  strokeDasharray="86, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-extrabold text-white">86%</span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Votre profil est complet à</span>
              </p>
              <p className="text-xs font-semibold text-[#A8E635] mt-1 flex items-center gap-1">
                <span>Excellent !</span>
                <span>🎉</span>
              </p>
              <p className="text-[11px] text-[#98A2B3] mt-0.5 line-clamp-2">
                Continuez comme ça, vous êtes sur la bonne voie.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Actif cette semaine
            </span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              3 jours de régularité <Flame className="w-3.5 h-3.5 fill-amber-400" />
            </span>
          </div>
        </div>

        {/* Card 2: Actualiser ma disponibilité */}
        <div className="bg-[#0E131F] border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-[#A8E635] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#A8E635]" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Actualiser ma disponibilité</h3>
                <p className="text-[10px] text-[#98A2B3]">Dernière confirmation : 22/07/2026</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <div>
                <label className="text-[10px] font-medium text-[#98A2B3] block mb-1">Statut</label>
                <select
                  value={availabilityStatus}
                  onChange={(e) => setAvailabilityStatus(e.target.value)}
                  className="w-full bg-[#131926] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#A8E635] cursor-pointer"
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Occupé">Occupé</option>
                  <option value="En écoute">En écoute</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-medium text-[#98A2B3] block mb-1">Disponible à partir du</label>
                <input
                  type="date"
                  value={availabilityDate}
                  onChange={(e) => setAvailabilityDate(e.target.value)}
                  className="w-full bg-[#131926] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#A8E635] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleConfirmAvailability}
            disabled={isConfirming}
            className="w-full mt-3 bg-[#A8E635] hover:bg-[#b8f045] text-[#0B0D10] font-bold text-xs py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isConfirming ? 'animate-spin' : ''}`} />
            <span>{confirmedSuccess ? 'Disponibilité confirmée !' : 'Confirmer'}</span>
          </button>
        </div>

        {/* Card 3: Restez visible, gagnez en opportunités */}
        <div className="bg-[#0E131F] border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-white mb-1">Restez visible, gagnez en opportunités</h3>
            <p className="text-[11px] text-[#98A2B3] leading-relaxed">
              Les freelances qui mettent à jour leur profil au moins une fois par semaine reçoivent jusqu'à <span className="text-[#A8E635] font-semibold">2x plus d'opportunités</span>.
            </p>
          </div>

          {/* Sparkline chart */}
          <div className="w-full h-12 relative mt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40">
              <defs>
                <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A8E635" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#A8E635" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 10 30 Q 50 35, 90 25 T 150 15 L 190 5 L 190 40 L 10 40 Z"
                fill="url(#visGrad)"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                d="M 10 30 Q 50 35, 90 25 T 150 15 L 190 5"
                fill="none"
                stroke="#A8E635"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="10" cy="30" r="2.5" fill="#A8E635" />
              <circle cx="60" cy="32" r="2.5" fill="#A8E635" />
              <circle cx="110" cy="22" r="2.5" fill="#A8E635" />
              <circle cx="150" cy="15" r="2.5" fill="#A8E635" />
              <circle cx="190" cy="5" r="3" fill="#A8E635" stroke="#FFFFFF" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Card 4: Objectif de la semaine */}
        <div className="bg-[#0E131F] border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-[#A8E635] flex items-center justify-center shrink-0">
                <Target className="w-4 h-4 text-[#A8E635]" />
              </div>
              <h3 className="text-xs font-bold text-white">Objectif de la semaine</h3>
            </div>

            <h4 className="text-xs font-bold text-white mt-2">Complétez le portfolio</h4>
            <p className="text-[11px] text-[#98A2B3] mt-0.5">Ajoutez un lien vers votre portfolio public.</p>

            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-[#98A2B3] mb-1">
                <span>Progression</span>
                <span className="text-[#A8E635] font-bold">50%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#A8E635] rounded-full w-1/2"></div>
              </div>
            </div>
          </div>

          <button className="w-full mt-3 bg-[#131926] hover:bg-[#1A2234] border border-white/10 text-white font-semibold text-xs py-2 rounded-xl transition cursor-pointer">
            Voir mes objectifs
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT (2 COLUMNS) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (8 COLS) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card: Informations du dossier candidat */}
          <div className="bg-[#0E131F] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-[#A8E635] flex items-center justify-center shrink-0">
                  <Edit3 className="w-4 h-4 text-[#A8E635]" />
                </div>
                <h2 className="font-bold text-sm sm:text-base text-white">
                  Informations du dossier candidat
                </h2>
              </div>
              <button
                onClick={() => setIsEditingInfo(!isEditingInfo)}
                className="flex items-center gap-1.5 bg-[#131926] hover:bg-[#1A2234] border border-white/10 text-xs text-white font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#A8E635]" />
                <span>{isEditingInfo ? 'Fermer' : 'Modifier'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Famille de métier */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex items-start gap-3">
                <Code2 className="w-4 h-4 text-[#A8E635] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider block">Famille de métier</span>
                  {isEditingInfo ? (
                    <input
                      type="text"
                      value={userInfo.profession}
                      onChange={(e) => setUserInfo({ ...userInfo, profession: e.target.value })}
                      className="w-full bg-[#0E131F] border border-white/10 rounded px-2 py-1 text-white text-xs mt-1"
                    />
                  ) : (
                    <span className="text-white font-semibold mt-0.5 block truncate">{userInfo.profession}</span>
                  )}
                </div>
              </div>

              {/* Pays */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex items-start gap-3">
                <Globe className="w-4 h-4 text-[#A8E635] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider block">Pays</span>
                  {isEditingInfo ? (
                    <input
                      type="text"
                      value={userInfo.country}
                      onChange={(e) => setUserInfo({ ...userInfo, country: e.target.value })}
                      className="w-full bg-[#0E131F] border border-white/10 rounded px-2 py-1 text-white text-xs mt-1"
                    />
                  ) : (
                    <span className="text-white font-semibold mt-0.5 block truncate">{userInfo.country}</span>
                  )}
                </div>
              </div>

              {/* Statut légal */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex items-start gap-3">
                <Briefcase className="w-4 h-4 text-[#A8E635] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider block">Statut légal</span>
                  {isEditingInfo ? (
                    <input
                      type="text"
                      value={userInfo.legalStatus}
                      onChange={(e) => setUserInfo({ ...userInfo, legalStatus: e.target.value })}
                      className="w-full bg-[#0E131F] border border-white/10 rounded px-2 py-1 text-white text-xs mt-1"
                    />
                  ) : (
                    <span className="text-white font-semibold mt-0.5 block truncate">{userInfo.legalStatus}</span>
                  )}
                </div>
              </div>

              {/* Téléphone */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#A8E635] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider block">Téléphone</span>
                  {isEditingInfo ? (
                    <input
                      type="text"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                      className="w-full bg-[#0E131F] border border-white/10 rounded px-2 py-1 text-white text-xs mt-1"
                    />
                  ) : (
                    <span className="text-white font-semibold mt-0.5 block truncate">{userInfo.phone}</span>
                  )}
                </div>
              </div>

              {/* Langues */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex items-start gap-3">
                <Languages className="w-4 h-4 text-[#A8E635] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider block">Langues</span>
                  {isEditingInfo ? (
                    <input
                      type="text"
                      value={userInfo.languages}
                      onChange={(e) => setUserInfo({ ...userInfo, languages: e.target.value })}
                      className="w-full bg-[#0E131F] border border-white/10 rounded px-2 py-1 text-white text-xs mt-1"
                    />
                  ) : (
                    <span className="text-white font-semibold mt-0.5 block truncate">{userInfo.languages}</span>
                  )}
                </div>
              </div>

              {/* GitHub */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex items-start gap-3">
                <Github className="w-4 h-4 text-[#A8E635] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider block">GitHub</span>
                  <a href={userInfo.github} target="_blank" rel="noreferrer" className="text-[#A8E635] hover:underline font-medium mt-0.5 block truncate">
                    {userInfo.github}
                  </a>
                </div>
              </div>

              {/* GitLab */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex items-start gap-3">
                <Gitlab className="w-4 h-4 text-[#A8E635] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider block">GitLab</span>
                  <a href={userInfo.gitlab} target="_blank" rel="noreferrer" className="text-[#A8E635] hover:underline font-medium mt-0.5 block truncate">
                    {userInfo.gitlab}
                  </a>
                </div>
              </div>

              {/* Utilisateur Plane */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex items-start gap-3">
                <Send className="w-4 h-4 text-[#A8E635] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider block">Utilisateur Plane (optionnel)</span>
                  <span className="text-slate-300 mt-0.5 block truncate">{userInfo.planeUser}</span>
                </div>
              </div>

              {/* Portfolio URL */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex items-start gap-3 sm:col-span-2">
                <LinkIcon className="w-4 h-4 text-[#A8E635] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider block">Portfolio (URL publique)</span>
                  <a href={userInfo.portfolioUrl} target="_blank" rel="noreferrer" className="text-[#A8E635] hover:underline font-medium mt-0.5 block truncate">
                    {userInfo.portfolioUrl}
                  </a>
                </div>
              </div>

              {/* Présentation */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex items-start gap-3 sm:col-span-2">
                <FileText className="w-4 h-4 text-[#A8E635] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-[#98A2B3] uppercase tracking-wider block">Présentation</span>
                  <p className="text-white mt-0.5 leading-relaxed">{userInfo.bio}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Certificats */}
          <div className="bg-[#0E131F] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-[#A8E635] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-[#A8E635]" />
                </div>
                <h2 className="font-bold text-sm sm:text-base text-white">Certificats</h2>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-[#A8E635] hover:text-[#b8f045] font-semibold transition cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Ajouter</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cert 1 */}
              <div className="p-4 rounded-xl bg-[#131926] border border-white/5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#A8E635] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#A8E635]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate">Professional Developer</h4>
                  <p className="text-[11px] text-[#98A2B3]">ALWeb Academy</p>
                  <p className="text-[10px] text-slate-500 mt-1">🗓 2024</p>
                  <a
                    href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#A8E635] hover:underline font-medium mt-2"
                  >
                    <span>Voir le certificat</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Cert 2 */}
              <div className="p-4 rounded-xl bg-[#131926] border border-white/5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#A8E635] flex items-center justify-center shrink-0">
                  <Cloud className="w-5 h-5 text-[#A8E635]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white truncate">AWS Cloud Practitioner</h4>
                  <p className="text-[11px] text-[#98A2B3]">Amazon Web Services</p>
                  <p className="text-[10px] text-slate-500 mt-1">🗓 2023</p>
                  <a
                    href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#A8E635] hover:underline font-medium mt-2"
                  >
                    <span>Voir le certificat</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Pièces du dossier */}
          <div className="bg-[#0E131F] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-[#A8E635] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-[#A8E635]" />
                </div>
                <h2 className="font-bold text-sm sm:text-base text-white">Pièces du dossier</h2>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-[#A8E635] hover:text-[#b8f045] font-semibold transition cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Ajouter un fichier</span>
              </button>
            </div>

            {/* List of files */}
            <div className="space-y-2.5">
              {/* Doc 1: CV */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#A8E635] shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white">CV</h4>
                    <p className="text-[10px] text-slate-400">Fichier déposé</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-[#A8E635] border border-emerald-500/30">
                    OK
                  </span>
                  <button className="flex items-center gap-1 bg-[#0E131F] hover:bg-slate-800 border border-white/10 text-white text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer">
                    <Eye className="w-3 h-3 text-[#A8E635]" />
                    <span>Visualiser</span>
                  </button>
                  <button className="flex items-center gap-1 bg-[#0E131F] hover:bg-slate-800 border border-white/10 text-slate-300 text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer">
                    <RefreshCw className="w-3 h-3 text-slate-400" />
                    <span>Remplacer</span>
                  </button>
                  <button className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer">
                    <Trash2 className="w-3 h-3" />
                    <span>Supprimer</span>
                  </button>
                </div>
              </div>

              {/* Doc 2: Pièce d'identité */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#A8E635] shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Pièce d'identité</h4>
                    <p className="text-[10px] text-slate-400">Fichier déposé</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-[#A8E635] border border-emerald-500/30">
                    OK
                  </span>
                  <button className="flex items-center gap-1 bg-[#0E131F] hover:bg-slate-800 border border-white/10 text-white text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer">
                    <Eye className="w-3 h-3 text-[#A8E635]" />
                    <span>Visualiser</span>
                  </button>
                  <button className="flex items-center gap-1 bg-[#0E131F] hover:bg-slate-800 border border-white/10 text-slate-300 text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer">
                    <RefreshCw className="w-3 h-3 text-slate-400" />
                    <span>Remplacer</span>
                  </button>
                  <button className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer">
                    <Trash2 className="w-3 h-3" />
                    <span>Supprimer</span>
                  </button>
                </div>
              </div>

              {/* Doc 3: Références */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#A8E635] shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Références</h4>
                    <p className="text-[10px] text-slate-400">Fichier déposé</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-[#A8E635] border border-emerald-500/30">
                    OK
                  </span>
                  <button className="flex items-center gap-1 bg-[#0E131F] hover:bg-slate-800 border border-white/10 text-white text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer">
                    <Eye className="w-3 h-3 text-[#A8E635]" />
                    <span>Visualiser</span>
                  </button>
                  <button className="flex items-center gap-1 bg-[#0E131F] hover:bg-slate-800 border border-white/10 text-slate-300 text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer">
                    <RefreshCw className="w-3 h-3 text-slate-400" />
                    <span>Remplacer</span>
                  </button>
                  <button className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer">
                    <Trash2 className="w-3 h-3" />
                    <span>Supprimer</span>
                  </button>
                </div>
              </div>

              {/* Doc 4: Portfolio */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Upload className="w-5 h-5 text-slate-400 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Portfolio (fichier)</h4>
                    <p className="text-[10px] text-slate-500">Aucun fichier</p>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-1 bg-[#1A2234] hover:bg-slate-800 border border-[#A8E635]/30 text-[#A8E635] text-[11px] font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer self-start sm:self-auto">
                  <Upload className="w-3 h-3" />
                  <span>Ajouter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Large Save CTA Button */}
          <button
            onClick={handleSaveFolder}
            className="w-full bg-[#A8E635] hover:bg-[#b8f045] text-[#0B0D10] font-black text-sm py-3.5 rounded-2xl transition cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/40"
          >
            <Save className="w-5 h-5" />
            <span>{savedSuccess ? 'Dossier enregistré avec succès !' : 'Enregistrer mon dossier'}</span>
          </button>
        </div>

        {/* RIGHT COLUMN (4 COLS) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Mes tests affectés */}
          <div className="bg-[#0E131F] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-[#A8E635] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-[#A8E635]" />
              </div>
              <h3 className="text-xs font-bold text-white">Mes tests affectés</h3>
            </div>

            <div className="space-y-3">
              {/* Test 1 */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-white">Développement full stack</h4>
                    <p className="text-[10px] text-[#98A2B3]">QCM Unigrowth · requis</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-[#A8E635] border border-emerald-500/30 shrink-0">
                    Terminé
                  </span>
                </div>
                <div className="pt-1 border-t border-white/5 flex justify-end">
                  <button className="text-[11px] font-semibold text-[#A8E635] hover:underline flex items-center gap-1 cursor-pointer">
                    <span>Voir</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Test 2 */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-white/5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-white">Soft skills — Maki</h4>
                    <p className="text-[10px] text-[#98A2B3]">Externe · maki · requis · score 81</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-[#A8E635] border border-emerald-500/30 shrink-0">
                    Terminé
                  </span>
                </div>
                <div className="pt-1 border-t border-white/5 flex justify-end">
                  <button className="text-[11px] font-semibold text-[#A8E635] hover:underline flex items-center gap-1 cursor-pointer">
                    <span>Voir</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <button className="w-full text-xs font-semibold text-[#A8E635] hover:underline flex items-center justify-center gap-1 pt-1 cursor-pointer">
              <span>Voir tous mes tests</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card: Parcours de validation */}
          <div className="bg-[#0E131F] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-[#A8E635] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#A8E635]" />
              </div>
              <h3 className="text-xs font-bold text-white">Parcours de validation</h3>
            </div>

            <div className="space-y-2.5">
              {[
                'Dossier candidat complet',
                'Test IA passé',
                'Validation technique métier',
                'Validation super administrateur'
              ].map((step) => (
                <div key={step} className="flex items-center gap-2.5 text-xs text-white font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#A8E635]/20 text-[#A8E635] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Historique des tests */}
          <div className="bg-[#0E131F] border border-white/10 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-[#A8E635] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-[#A8E635]" />
              </div>
              <h3 className="text-xs font-bold text-white">Historique des tests</h3>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-xs text-[#98A2B3]">26/05/2026</span>
              <span className="text-sm font-extrabold text-[#A8E635]">86/100</span>
            </div>
          </div>

          {/* Card: Conseil du jour */}
          <div className="bg-gradient-to-br from-[#0C1A14] to-[#0A1510] border border-emerald-500/20 rounded-2xl p-5 shadow-xl relative overflow-hidden space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-[#A8E635] flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4 text-[#A8E635]" />
                </div>
                <h3 className="font-bold text-sm text-white">Conseil du jour</h3>
              </div>
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Un profil à jour inspire confiance et attire les meilleures missions. Continuez à le faire vivre !
            </p>
          </div>
        </div>
      </div>

      <NotificationEventsPopup
        isOpen={isNotifPopupOpen}
        onClose={() => setIsNotifPopupOpen(false)}
        role="freelance"
        onOpenSettings={() => setIsNotifModalOpen(true)}
      />

      <NotificationSettingsModal
        isOpen={isNotifModalOpen}
        onClose={() => setIsNotifModalOpen(false)}
        initialRole="freelance"
      />
    </motion.div>
  );
};
