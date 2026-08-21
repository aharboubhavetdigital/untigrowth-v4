import React, { useState } from 'react';
import {
  ArrowLeft,
  Eye,
  FileText,
  Github,
  Gitlab,
  Globe,
  ExternalLink,
  Award,
  CheckCircle2,
  Phone,
  Languages,
  Calendar,
  Briefcase,
  Layers,
  FileCheck,
  Receipt,
  UserCheck,
  Send,
  Sparkles,
  X,
  AlertCircle,
} from 'lucide-react';
import { Talent } from './VivierView';

interface TalentDetailFicheProps {
  talent: Talent;
  onBack: () => void;
}

export const TalentDetailFiche: React.FC<TalentDetailFicheProps> = ({ talent, onBack }) => {
  const [activeDocPreview, setActiveDocPreview] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const getDispoBadge = (dispo: Talent['disponibilite']) => {
    switch (dispo) {
      case 'Disponible':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Partiellement dispo':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Indisponible':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getStatutBadge = (statut: Talent['statut']) => {
    switch (statut) {
      case 'Validé':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Validé métier':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Test effectué':
        return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'Dossier soumis':
        return 'bg-teal-500/15 text-teal-300 border-teal-500/30';
      case 'Dossier incomplet':
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
      case 'Suspendu':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'Rejeté':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const phoneFormatted = talent.country === 'Maroc' ? '+212 6 98 82 57 35' : '+261 34 56 78 90';
  const statutLegal = talent.country === 'Maroc' ? 'auto-entrepreneur' : 'Freelance individuel';
  const langues = talent.country === 'Maroc' ? 'Français, Arabe, Anglais' : 'Français, Malagasy, Anglais';
  const dateInscription = '04/08/2026';
  const githubSlug = talent.name.toLowerCase().replace(/\s+/g, '-');
  const portfolioUrl = `portfolio-demo.iaweb.dev/${githubSlug}`;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Bar with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#98A2B3] hover:text-[#A8E635] transition-colors mb-2 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Retour au vivier</span>
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>{talent.name}</span>
              <span className="text-xl" title={talent.emojiLabel}>{talent.emoji}</span>
            </h1>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStatutBadge(talent.statut)}`}>
              {talent.statut}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getDispoBadge(talent.disponibilite)}`}>
              {talent.disponibilite}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#98A2B3] mt-1 font-medium">
            {talent.email} · {talent.famille} · {talent.country} · Inscrit le {dateInscription}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => showNotification(`Email de contact envoyé à ${talent.name}`)}
            className="px-4 py-2.5 bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] font-black rounded-xl text-xs shadow-lg shadow-[#A8E635]/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Contacter le talent</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs rounded-xl flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-emerald-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top 8 KPI stat cards (Grid 4 cols x 2 rows) matching Screenshot 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Score global */}
        <div className="bg-[#0B0E17] p-4 rounded-2xl border border-white/10 shadow-lg">
          <div className="text-[11px] font-semibold text-[#98A2B3]">Score global</div>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#A8E635]">{talent.score}</span>
            <span className="text-xs font-semibold text-[#98A2B3]">/100</span>
          </div>
        </div>

        {/* Meilleur score */}
        <div className="bg-[#0B0E17] p-4 rounded-2xl border border-white/10 shadow-lg">
          <div className="text-[11px] font-semibold text-[#98A2B3]">Meilleur score</div>
          <div className="mt-1.5 flex items-baseline gap-1">
            <span className="text-2xl font-black text-[#A8E635]">{talent.score}</span>
            <span className="text-xs font-semibold text-[#98A2B3]">/100</span>
          </div>
        </div>

        {/* Projets en cours */}
        <div className="bg-[#0B0E17] p-4 rounded-2xl border border-white/10 shadow-lg">
          <div className="text-[11px] font-semibold text-[#98A2B3]">Projets en cours</div>
          <div className="mt-1.5 text-2xl font-black text-white">0</div>
        </div>

        {/* Contrats */}
        <div className="bg-[#0B0E17] p-4 rounded-2xl border border-white/10 shadow-lg">
          <div className="text-[11px] font-semibold text-[#98A2B3]">Contrats</div>
          <div className="mt-1.5 text-2xl font-black text-white">0</div>
        </div>

        {/* Factures */}
        <div className="bg-[#0B0E17] p-4 rounded-2xl border border-white/10 shadow-lg">
          <div className="text-[11px] font-semibold text-[#98A2B3]">Factures</div>
          <div className="mt-1.5 text-2xl font-black text-white">0</div>
        </div>

        {/* Candidatures */}
        <div className="bg-[#0B0E17] p-4 rounded-2xl border border-white/10 shadow-lg">
          <div className="text-[11px] font-semibold text-[#98A2B3]">Candidatures</div>
          <div className="mt-1.5 text-2xl font-black text-white">1</div>
        </div>

        {/* Tests */}
        <div className="bg-[#0B0E17] p-4 rounded-2xl border border-white/10 shadow-lg">
          <div className="text-[11px] font-semibold text-[#98A2B3]">Tests</div>
          <div className="mt-1.5 text-2xl font-black text-white">1</div>
        </div>

        {/* Accepté plateforme */}
        <div className="bg-[#0B0E17] p-4 rounded-2xl border border-white/10 shadow-lg">
          <div className="text-[11px] font-semibold text-[#98A2B3]">Accepté plateforme</div>
          <div className="mt-1.5 text-2xl font-black text-white flex items-center gap-1.5">
            <span>Oui</span>
            <CheckCircle2 className="w-4 h-4 text-[#A8E635]" />
          </div>
        </div>
      </div>

      {/* Main 2-Column Section (Screenshot 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Card: Profil */}
          <div className="bg-[#0B0E17] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl space-y-5">
            <h2 className="text-sm font-black text-white uppercase tracking-wider">
              Profil
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
              <div>
                <span className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider block mb-1">
                  TÉLÉPHONE
                </span>
                <span className="font-semibold text-white font-mono">{phoneFormatted}</span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider block mb-1">
                  STATUT LÉGAL
                </span>
                <span className="font-semibold text-white capitalize">{statutLegal}</span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider block mb-1">
                  LANGUES
                </span>
                <span className="font-semibold text-white">{langues}</span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider block mb-1">
                  UTILISATEUR PLANE
                </span>
                <span className="font-semibold text-[#98A2B3]">—</span>
              </div>

              <div className="sm:col-span-2">
                <span className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider block mb-1">
                  DISPONIBLE À PARTIR
                </span>
                <span className="font-semibold text-white">{dateInscription}</span>
              </div>

              <div className="sm:col-span-2">
                <span className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider block mb-2">
                  COMPÉTENCES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {talent.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/90">
                    AWS
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/90">
                    PostgreSQL
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2 pt-2 border-t border-white/5">
                <span className="text-[11px] font-bold text-[#98A2B3] uppercase tracking-wider block mb-1">
                  PRÉSENTATION
                </span>
                <p className="text-xs text-white/80 leading-relaxed font-normal">
                  Freelance {talent.famille.toLowerCase()} avec plusieurs années d'expérience sur des projets clients variés en environnement agile.
                </p>
              </div>
            </div>
          </div>

          {/* Card: Documents du dossier */}
          <div className="bg-[#0B0E17] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider">
              Documents du dossier
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'CV', key: 'cv' },
                { name: 'Portfolio', key: 'portfolio' },
                { name: "Pièce d'identité", key: 'id_card' },
                { name: 'Références', key: 'references' },
              ].map((doc) => (
                <div
                  key={doc.key}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#A8E635]" />
                    <span className="text-xs font-bold text-white">{doc.name}</span>
                  </div>
                  <button
                    onClick={() => setActiveDocPreview(doc.name)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A8E635] hover:text-[#b8f042] transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-[#A8E635]/10"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Aperçu / PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Card: Certificats */}
          <div className="bg-[#0B0E17] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider">
              Certificats
            </h2>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between hover:border-white/20 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#A8E635]/15 text-[#A8E635] border border-[#A8E635]/30">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Professional Developer</div>
                  <div className="text-[11px] text-[#98A2B3]">IAweb Academy · 2025</div>
                </div>
              </div>
              <button
                onClick={() => setActiveDocPreview('Certificat Professional Developer')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A8E635] hover:text-[#b8f042] transition-colors cursor-pointer px-2.5 py-1 rounded-lg hover:bg-[#A8E635]/10"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Aperçu / PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Card: Candidatures */}
          <div className="bg-[#0B0E17] p-5 rounded-2xl border border-white/10 shadow-xl space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider">
              Candidatures
            </h2>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="font-bold text-white text-xs leading-snug">
                  Refonte plateforme e-commerce B2B
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0">
                  Candidature reçue
                </span>
              </div>
              <div className="text-xs font-mono font-bold text-[#A8E635]">
                110.000 DH
              </div>
            </div>
          </div>

          {/* Card: Contrats */}
          <div className="bg-[#0B0E17] p-5 rounded-2xl border border-white/10 shadow-xl space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider">
              Contrats
            </h2>
            <div className="py-8 text-center text-xs text-[#98A2B3] italic border border-dashed border-white/10 rounded-xl">
              Aucun contrat.
            </div>
          </div>

          {/* Card: Factures */}
          <div className="bg-[#0B0E17] p-5 rounded-2xl border border-white/10 shadow-xl space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider">
              Factures
            </h2>
            <div className="py-8 text-center text-xs text-[#98A2B3] italic border border-dashed border-white/10 rounded-xl">
              Aucune facture.
            </div>
          </div>
        </div>
      </div>

      {/* Screenshot 2 Components: Full Width & Extended Cards */}
      <div className="space-y-5">
        {/* Card: Comptes Git & portfolio */}
        <div className="bg-[#0B0E17] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">
            Comptes Git & portfolio
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* GitHub */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Github className="w-4 h-4 text-white" />
                <span>GitHub</span>
              </div>
              <a
                href={`https://github.com/${githubSlug}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#A8E635] hover:underline font-mono mt-2 flex items-center gap-1 truncate"
              >
                <span>github.com/{githubSlug}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>

            {/* GitLab */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-dashed border-white/15 flex flex-col justify-between opacity-80">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#98A2B3]">
                <Gitlab className="w-4 h-4 text-[#98A2B3]" />
                <span>GitLab</span>
              </div>
              <div className="text-xs text-[#98A2B3] mt-2 italic">
                Non renseigné
              </div>
            </div>

            {/* Portfolio */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Globe className="w-4 h-4 text-[#A8E635]" />
                <span>Portfolio</span>
              </div>
              <a
                href={`https://${portfolioUrl}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#A8E635] hover:underline font-mono mt-2 flex items-center gap-1 truncate"
              >
                <span>{portfolioUrl}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>

          <p className="text-[11px] text-[#98A2B3] italic pt-1">
            Ouvrez les profils pour consulter l'activité réelle (repos, contributions).
          </p>
        </div>

        {/* Card: Accès projet */}
        <div className="bg-[#0B0E17] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">
            Accès projet
          </h2>
          <div className="py-8 text-center text-xs text-[#98A2B3] italic border border-dashed border-white/10 rounded-xl">
            Aucun accès projet enregistré.
          </div>
        </div>

        {/* Card: Historique des tests IA */}
        <div className="bg-[#0B0E17] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">
            Historique des tests IA
          </h2>

          <div className="space-y-2.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#98A2B3] block">
              TESTS AFFECTÉS
            </span>

            {/* Test 1 */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-white">{talent.famille}</div>
                <div className="text-[11px] text-[#98A2B3] mt-0.5">QCM</div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Terminé
              </span>
            </div>

            {/* Test 2 */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-white">Soft skills — Maki</div>
                <div className="text-[11px] text-[#98A2B3] mt-0.5">Externe · maki · score 87</div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Terminé
              </span>
            </div>

            {/* Test 3 with Score */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-white">{talent.famille}</div>
                <div className="text-[11px] text-[#98A2B3] mt-0.5">09/06/2026 · 0/8 bonnes réponses</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-black text-[#A8E635]">{talent.score}</span>
                <span className="text-xs text-[#98A2B3]">/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card: Projets en cours */}
        <div className="bg-[#0B0E17] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">
            Projets en cours
          </h2>
          <div className="py-8 text-center text-xs text-[#98A2B3] italic border border-dashed border-white/10 rounded-xl">
            Aucun projet en cours.
          </div>
        </div>

        {/* Card: Projets terminés */}
        <div className="bg-[#0B0E17] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <h2 className="text-sm font-black text-white uppercase tracking-wider">
            Projets terminés
          </h2>
          <div className="py-8 text-center text-xs text-[#98A2B3] italic border border-dashed border-white/10 rounded-xl">
            Aucun projet terminé.
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {activeDocPreview && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0E17] border border-white/20 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveDocPreview(null)}
              className="absolute top-4 right-4 text-[#98A2B3] hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#A8E635]/15 text-[#A8E635] border border-[#A8E635]/30">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">{activeDocPreview}</h3>
                <p className="text-xs text-[#98A2B3]">Dossier candidat de {talent.name}</p>
              </div>
            </div>

            <div className="p-8 rounded-xl bg-white/5 border border-white/10 text-center space-y-3">
              <FileCheck className="w-12 h-12 text-[#A8E635] mx-auto opacity-80" />
              <div>
                <p className="text-xs font-bold text-white">Document vérifié & certifié</p>
                <p className="text-[11px] text-[#98A2B3] mt-1">
                  Format: PDF officiel sécurisé (Taille: 1.4 Mo)
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveDocPreview(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  showNotification(`Téléchargement de ${activeDocPreview} lancé.`);
                  setActiveDocPreview(null);
                }}
                className="px-5 py-2 bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] font-black rounded-xl text-xs shadow-lg transition-all cursor-pointer"
              >
                Télécharger le PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
