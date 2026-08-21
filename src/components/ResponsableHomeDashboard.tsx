import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Download,
  CreditCard,
  Send,
  FileCheck,
  ArrowRight,
  BarChart3,
  Edit2,
  Plus,
  Trash2,
  Check,
  X,
} from 'lucide-react';

interface ResponsableHomeDashboardProps {
  onNavigateTab: (tabId: string) => void;
  theme?: 'dark' | 'light';
}

export const ResponsableHomeDashboard: React.FC<ResponsableHomeDashboardProps> = ({
  onNavigateTab,
  theme = 'dark',
}) => {
  const [csvExported, setCsvExported] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<'monthly' | 'annually'>('monthly');

  // Edit modal state
  const [activeEditModal, setActiveEditModal] = useState<string | null>(null);

  const isLight = theme === 'light';

  const handleExportCsv = () => {
    setCsvExported(true);
    setTimeout(() => setCsvExported(false), 3000);
  };

  // 1. KPI metrics state
  const [kpis, setKpis] = useState([
    {
      label: 'Besoins ouverts',
      value: '5',
      sublabel: 'Taux réponse 86%',
      targetTab: 'offres',
      subColor: isLight ? 'text-slate-500' : 'text-[#98A2B3]',
    },
    {
      label: 'Profils disponibles',
      value: '19',
      sublabel: '+3 cette semaine',
      targetTab: 'vivier',
      subColor: isLight ? 'text-emerald-600 font-bold' : 'text-[#A8E635]',
    },
    {
      label: 'Contrats signés',
      value: '1',
      sublabel: 'Taux signature 33%',
      targetTab: 'contrats',
      subColor: isLight ? 'text-emerald-600 font-bold' : 'text-emerald-400',
    },
    {
      label: 'Volume d’affaires',
      value: '4.800 DH',
      sublabel: '1 facture(s) payée(s)',
      targetTab: 'factures',
      subColor: isLight ? 'text-slate-500' : 'text-[#98A2B3]',
    },
  ]);

  // 2. Portefeuille data state
  const [portefeuille, setPortefeuille] = useState({
    title: 'Portefeuille Missions & Facturation',
    cardName: 'VISA UNITGROWTH',
    cardType: 'PRO',
    balance: '78.989,09',
    unit: 'DH',
    cardNumber: '•••• 4090',
    expDate: 'EXP 08/28',
    weeklyCaLabel: 'CA Hebdomadaire',
    weeklyCaValue: '+3.945 DH',
    growthBadge: '+17.5%',
  });

  // 3. Offres ouvertes state
  const [offresOuvertes, setOffresOuvertes] = useState([
    {
      id: 'off-1',
      title: 'Expert n8n & Make pour flux logistique',
      client: 'Client Sofalog',
      budget: '600 DH/j',
      status: 'Ouverte',
    },
    {
      id: 'off-2',
      title: 'Dev Next.js & Supabase — Plateforme SaaS',
      client: 'Client AtlasTech',
      budget: '750 DH/j',
      status: 'Ouverte',
    },
    {
      id: 'off-3',
      title: 'Media Buyer Meta Ads & Google Ads',
      client: 'Client Riad Collection',
      budget: '500 DH/j',
      status: 'Ouverte',
    },
  ]);

  // 4. Entonnoir de preuve state
  const [funnelSteps, setFunnelSteps] = useState([
    { label: 'Candidats inscrits', sub: '(Total vivier)', count: '10', width: '100%', color: 'from-[#A8E635] to-[#84cc16]' },
    { label: 'Dossier complet', sub: '(CV, statut, TJ)', count: '9', width: '90%', color: 'from-[#84cc16] to-[#65a30d]' },
    { label: 'Test technique passé', sub: '(Validation IA/Maki)', count: '5', width: '50%', color: 'from-[#65a30d] to-[#4d7c0f]' },
    { label: 'Entretien vidéo validé', sub: '(Fit & Soft-skills)', count: '3', width: '30%', color: 'from-[#4d7c0f] to-[#3f6212]' },
    { label: 'Profil validé', sub: '(Prêt à mission)', count: '2', width: '20%', color: 'from-[#3f6212] to-[#1a2e05]' },
  ]);

  // 5. Couverture par famille state
  const [familyCoverage, setFamilyCoverage] = useState([
    {
      family: 'Développement web',
      valides: 0,
      dispos: 0,
      totalCount: '0 profil(s)',
      bgPill: isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-white/5 text-[#98A2B3] border-white/10',
    },
    {
      family: 'Marketing digital',
      valides: 0,
      dispos: 0,
      totalCount: '0 profil(s)',
      bgPill: isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-white/5 text-[#98A2B3] border-white/10',
    },
    {
      family: 'IA & automatisation',
      valides: 0,
      dispos: 0,
      totalCount: '0 profil(s)',
      bgPill: isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-white/5 text-[#98A2B3] border-white/10',
    },
    {
      family: 'No-code',
      valides: 2,
      dispos: 2,
      totalCount: '3 profil(s)',
      bgPill: isLight ? 'bg-amber-50 text-amber-700 border-amber-200 font-bold' : 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    },
  ]);

  // 6. Journal d'activité state
  const [activityLogs, setActivityLogs] = useState([
    {
      id: 'log-1',
      author: 'Super Admin',
      action: 'Facture declarer_paiement',
      ref: 'FAC-2026-0010',
      date: '12/08/2026 14:05:12',
    },
    {
      id: 'log-2',
      author: 'Anass HARBOUB',
      action: 'Inscription freelance',
      ref: 'Anass HARBOUB',
      date: '05/08/2026 18:21:54',
    },
    {
      id: 'log-3',
      author: 'Super Admin',
      action: 'Mise à jour test',
      ref: 'Développement full stack',
      date: '05/08/2026 11:47:10',
    },
  ]);

  // Temporary edit forms state
  const [tempKpis, setTempKpis] = useState(kpis);
  const [tempPortefeuille, setTempPortefeuille] = useState(portefeuille);
  const [tempOffres, setTempOffres] = useState(offresOuvertes);
  const [tempFunnel, setTempFunnel] = useState(funnelSteps);
  const [tempFamily, setTempFamily] = useState(familyCoverage);

  const barMetrics = [
    { month: 'JAN', val: 20, active: false },
    { month: 'FEV', val: 38, active: false },
    { month: 'MAR', val: 32, active: false },
    { month: 'AVR', val: 56, active: true, tag: '+124%' },
    { month: 'MAI', val: 44, active: false },
    { month: 'JUIN', val: 39, active: false },
  ];

  return (
    <div className={`space-y-6 ${isLight ? 'text-slate-800' : 'text-white'}`}>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <span>Dashboard · Responsable</span>
          </h1>
          <p className={`text-xs sm:text-sm mt-1 font-medium ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
            Besoins ouverts, couverture, réponses, tarifs, contrats et CA associé.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => {
              setTempKpis(kpis);
              setActiveEditModal('kpis');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border shadow-sm hover:scale-105 ${
              isLight
                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                : 'bg-[#A8E635]/15 text-[#A8E635] border-[#A8E635]/40 hover:bg-[#A8E635]/25'
            }`}
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Modifier le Dashboard</span>
          </button>

          <button
            onClick={() => onNavigateTab('offres')}
            className="px-4 py-2 rounded-xl bg-[#A8E635] text-[#0B0D10] hover:bg-[#b8f042] active:scale-95 text-xs font-black transition-all shadow-lg shadow-[#A8E635]/25 flex items-center gap-2 cursor-pointer"
          >
            <span>+ Nouvelle Offre</span>
          </button>
        </div>
      </div>

      {/* 4 Main Summary Cards */}
      <div className="relative group/kpis">
        <button
          onClick={() => {
            setTempKpis(kpis);
            setActiveEditModal('kpis');
          }}
          className="absolute -top-3.5 right-2 z-10 px-2.5 py-1 rounded-lg bg-[#A8E635] text-[#0B0D10] text-[11px] font-black shadow-md flex items-center gap-1 hover:scale-105 transition-all cursor-pointer opacity-80 group-hover/kpis:opacity-100"
        >
          <Edit2 className="w-3 h-3" />
          <span>Éditer KPI</span>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              onClick={() => onNavigateTab(kpi.targetTab)}
              className={`p-5 rounded-2xl transition-all cursor-pointer group flex flex-col justify-between ${
                isLight
                  ? 'bg-white border border-slate-200/90 hover:border-slate-300 shadow-sm'
                  : 'bg-[#0B0E17] border border-white/10 hover:border-[#A8E635]/40 shadow-xl'
              }`}
            >
              <div>
                <div className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                  {kpi.label}
                </div>
                <div
                  className={`mt-3 text-3xl font-black tracking-tight transition-colors ${
                    isLight
                      ? 'text-slate-900 group-hover:text-[#65a30d]'
                      : 'text-white group-hover:text-[#A8E635]'
                  }`}
                >
                  {kpi.value}
                </div>
              </div>
              <div className={`text-[11px] font-semibold mt-3 ${kpi.subColor}`}>
                {kpi.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Analytics Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Visual Card: Portefeuille Missions & Facturation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`lg:col-span-4 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group/portefeuille ${
            isLight
              ? 'bg-gradient-to-br from-emerald-50 via-lime-50/80 to-emerald-100/60 border border-emerald-300/80 shadow-sm'
              : 'bg-gradient-to-br from-[#1b3d18] via-[#142d12] to-[#0d1e0c] border border-[#A8E635]/30 shadow-2xl'
          }`}
        >
          <button
            onClick={() => {
              setTempPortefeuille(portefeuille);
              setActiveEditModal('portefeuille');
            }}
            className="absolute top-3 right-3 z-20 p-1.5 rounded-lg bg-[#A8E635] text-[#0B0D10] text-[11px] font-black shadow-md flex items-center gap-1 hover:scale-105 transition-all cursor-pointer opacity-80 group-hover/portefeuille:opacity-100"
            title="Modifier le portefeuille"
          >
            <Edit2 className="w-3 h-3" />
          </button>

          <div
            className={`absolute -right-10 -bottom-10 w-44 h-44 rounded-full blur-3xl pointer-events-none ${
              isLight ? 'bg-[#84cc16]/15' : 'bg-[#A8E635]/15'
            }`}
          />
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between pr-8">
              <span
                className={`text-[11px] font-extrabold uppercase tracking-wider ${
                  isLight ? 'text-emerald-900' : 'text-[#A8E635]'
                }`}
              >
                {portefeuille.title}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isLight
                    ? 'bg-emerald-600/15 text-emerald-800'
                    : 'bg-[#A8E635]/20 text-[#A8E635]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border ${
                isLight
                  ? 'bg-white/95 border-emerald-200/90 shadow-sm'
                  : 'bg-black/40 border-white/10 backdrop-blur-md'
              }`}
            >
              <div
                className={`flex items-center justify-between text-[11px] font-mono ${
                  isLight ? 'text-slate-500' : 'text-[#98A2B3]'
                }`}
              >
                <span>{portefeuille.cardName}</span>
                <span className={`font-bold ${isLight ? 'text-emerald-700 font-black' : 'text-white'}`}>
                  {portefeuille.cardType}
                </span>
              </div>
              <div
                className={`text-2xl font-black mt-2 tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {portefeuille.balance}{' '}
                <span className={`text-xs font-black ${isLight ? 'text-emerald-700' : 'text-[#A8E635]'}`}>
                  {portefeuille.unit}
                </span>
              </div>
              <div
                className={`text-[10px] mt-2 font-mono flex items-center justify-between ${
                  isLight ? 'text-slate-400' : 'text-[#98A2B3]'
                }`}
              >
                <span>{portefeuille.cardNumber}</span>
                <span>{portefeuille.expDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className={`text-[11px] block ${isLight ? 'text-slate-600 font-semibold' : 'text-[#98A2B3]'}`}>
                  {portefeuille.weeklyCaLabel}
                </span>
                <span className={`text-base font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {portefeuille.weeklyCaValue}
                </span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                  isLight
                    ? 'bg-[#A8E635] text-slate-950 border border-[#84cc16]/50 shadow-sm'
                    : 'bg-[#A8E635] text-[#0B0D10]'
                }`}
              >
                {portefeuille.growthBadge}
              </span>
            </div>
          </div>

          <div
            className={`pt-4 mt-4 border-t flex items-center justify-between gap-2 relative z-10 ${
              isLight ? 'border-emerald-200/80' : 'border-white/10'
            }`}
          >
            <button
              onClick={() => onNavigateTab('factures')}
              className="flex-1 py-2 bg-[#A8E635] text-[#0B0D10] hover:bg-[#97d42a] rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
            >
              <Send className="w-3 h-3" />
              <span>Émettre Facture</span>
            </button>
            <button
              onClick={() => onNavigateTab('contrats')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <FileCheck className="w-3 h-3" />
              <span>Contrats</span>
            </button>
          </div>
        </motion.div>

        {/* Engagement / Activity Graph */}
        <div
          className={`lg:col-span-8 rounded-2xl p-5 flex flex-col justify-between space-y-4 ${
            isLight
              ? 'bg-white border border-slate-200/90 shadow-sm'
              : 'bg-[#0B0E17] border border-white/10 shadow-2xl'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className={`text-sm font-black flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <BarChart3 className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-[#A8E635]'}`} />
                <span>Taux d'Engagement & Matching Vivier</span>
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                Volume de consultations et profils positionnés
              </p>
            </div>

            <div
              className={`flex items-center gap-1 p-1 rounded-xl text-xs border ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#121622] border-white/10'
              }`}
            >
              <button
                onClick={() => setChartPeriod('monthly')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  chartPeriod === 'monthly'
                    ? 'bg-[#A8E635] text-[#0B0D10] font-black'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-[#98A2B3] hover:text-white'
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setChartPeriod('annually')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  chartPeriod === 'annually'
                    ? 'bg-[#A8E635] text-[#0B0D10] font-black'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-[#98A2B3] hover:text-white'
                }`}
              >
                Annuel
              </button>
            </div>
          </div>

          {/* Minimalist Bar Visualization */}
          <div className={`pt-4 flex items-end justify-between gap-3 h-40 border-b pb-4 ${isLight ? 'border-slate-100' : 'border-white/10'}`}>
            {barMetrics.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                {item.active && (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-[#A8E635] text-[#0B0D10] mb-1 animate-bounce">
                    {item.tag}
                  </span>
                )}
                <div
                  style={{ height: `${item.val * 1.6}px` }}
                  className={`w-full max-w-[48px] rounded-t-xl transition-all ${
                    item.active
                      ? 'bg-[#84cc16] shadow-md ring-2 ring-[#84cc16]/40'
                      : isLight
                      ? 'bg-slate-100 group-hover:bg-slate-200'
                      : 'bg-white/10 group-hover:bg-white/20'
                  }`}
                />
                <span
                  className={`text-[10px] font-bold ${
                    item.active
                      ? isLight ? 'text-emerald-700' : 'text-[#A8E635]'
                      : isLight ? 'text-slate-400' : 'text-[#98A2B3]'
                  }`}
                >
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div className={`flex items-center justify-between text-xs ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
            <span>🎯 Taux de succès moyen : <strong className={isLight ? 'text-slate-800' : 'text-white'}>74.2%</strong></span>
            <button
              onClick={() => onNavigateTab('vivier')}
              className={`font-bold flex items-center gap-1 cursor-pointer hover:underline ${
                isLight ? 'text-emerald-700' : 'text-[#A8E635]'
              }`}
            >
              <span>Accéder au vivier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Offres ouvertes */}
      <div
        className={`rounded-2xl p-5 space-y-4 relative group/offres ${
          isLight
            ? 'bg-white border border-slate-200/90 shadow-sm'
            : 'bg-[#0B0E17] border border-white/10 shadow-2xl'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Offres ouvertes</h2>
            <button
              onClick={() => {
                setTempOffres(offresOuvertes);
                setActiveEditModal('offres');
              }}
              className="px-2 py-0.5 rounded bg-[#A8E635] text-[#0B0D10] text-[10px] font-black shadow flex items-center gap-1 hover:scale-105 transition-all cursor-pointer opacity-80 group-hover/offres:opacity-100"
              title="Modifier les offres"
            >
              <Edit2 className="w-3 h-3" />
              <span>Éditer</span>
            </button>
          </div>
          <button
            onClick={() => onNavigateTab('offres')}
            className={`text-xs font-bold hover:underline cursor-pointer ${
              isLight ? 'text-emerald-700' : 'text-[#A8E635]'
            }`}
          >
            Toutes les offres
          </button>
        </div>

        <div className={`divide-y ${isLight ? 'divide-slate-100' : 'divide-white/5'}`}>
          {offresOuvertes.map((offre) => (
            <div
              key={offre.id}
              onClick={() => onNavigateTab('offres')}
              className={`py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2 rounded-xl transition-colors cursor-pointer group ${
                isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#84cc16]" />
                <span
                  className={`text-xs sm:text-sm font-bold transition-colors ${
                    isLight
                      ? 'text-slate-900 group-hover:text-emerald-700'
                      : 'text-white group-hover:text-[#A8E635]'
                  }`}
                >
                  {offre.title}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className={isLight ? 'text-slate-500' : 'text-[#98A2B3]'}>{offre.client}</span>
                <span className={`font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{offre.budget}</span>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold border ${
                    isLight
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-[#A8E635]/15 text-[#A8E635] border-[#A8E635]/30'
                  }`}
                >
                  {offre.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Entonnoir de preuve */}
      <div
        className={`rounded-2xl p-5 space-y-5 relative group/funnel ${
          isLight
            ? 'bg-white border border-slate-200/90 shadow-sm'
            : 'bg-[#0B0E17] border border-white/10 shadow-2xl'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Entonnoir de preuve</h2>
            <button
              onClick={() => {
                setTempFunnel(funnelSteps);
                setActiveEditModal('funnel');
              }}
              className="px-2 py-0.5 rounded bg-[#A8E635] text-[#0B0D10] text-[10px] font-black shadow flex items-center gap-1 hover:scale-105 transition-all cursor-pointer opacity-80 group-hover/funnel:opacity-100"
              title="Modifier l'entonnoir"
            >
              <Edit2 className="w-3 h-3" />
              <span>Éditer</span>
            </button>
          </div>
          <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Pipeline de conversion des talents</span>
        </div>

        <div className="space-y-4">
          {funnelSteps.map((step, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className={`font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>
                  {step.label}{' '}
                  <span className={`font-normal text-[11px] ${isLight ? 'text-slate-400' : 'text-[#98A2B3]'}`}>
                    {step.sub}
                  </span>
                </div>
                <div className={`font-black font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>{step.count}</div>
              </div>
              <div
                className={`w-full h-2.5 rounded-full overflow-hidden border ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#121622] border-white/5'
                }`}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: step.width }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                  className={`h-full bg-gradient-to-r ${step.color} rounded-full shadow-sm`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Couverture par famille */}
      <div
        className={`rounded-2xl p-5 space-y-4 relative group/family ${
          isLight
            ? 'bg-white border border-slate-200/90 shadow-sm'
            : 'bg-[#0B0E17] border border-white/10 shadow-2xl'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Couverture par famille (cible 10–30)</h2>
            <button
              onClick={() => {
                setTempFamily(familyCoverage);
                setActiveEditModal('family');
              }}
              className="px-2 py-0.5 rounded bg-[#A8E635] text-[#0B0D10] text-[10px] font-black shadow flex items-center gap-1 hover:scale-105 transition-all cursor-pointer opacity-80 group-hover/family:opacity-100"
              title="Modifier les catégories"
            >
              <Edit2 className="w-3 h-3" />
              <span>Éditer</span>
            </button>
          </div>
          <button
            onClick={() => onNavigateTab('vivier')}
            className={`text-xs font-bold hover:underline cursor-pointer ${
              isLight ? 'text-emerald-700' : 'text-[#A8E635]'
            }`}
          >
            Gérer les catégories
          </button>
        </div>

        <div className={`divide-y ${isLight ? 'divide-slate-100' : 'divide-white/5'}`}>
          {familyCoverage.map((fam, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateTab('vivier')}
              className={`py-3.5 flex items-center justify-between gap-3 px-2 rounded-xl transition-colors cursor-pointer ${
                isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
              }`}
            >
              <div>
                <div className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-white'}`}>{fam.family}</div>
                <div className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-400' : 'text-[#98A2B3]'}`}>
                  {fam.valides} validé(s) · {fam.dispos} disponible(s)
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${fam.bgPill}`}>
                {fam.totalCount}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Journal d'activité */}
      <div
        className={`rounded-2xl p-5 space-y-4 ${
          isLight
            ? 'bg-white border border-slate-200/90 shadow-sm'
            : 'bg-[#0B0E17] border border-white/10 shadow-2xl'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Journal d'activité</h2>
          <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Historique des actions récentes</span>
        </div>

        <div className={`divide-y ${isLight ? 'divide-slate-100' : 'divide-white/5'}`}>
          {activityLogs.map((log) => (
            <div
              key={log.id}
              className={`py-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 rounded-xl transition-colors text-xs ${
                isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{log.author}</span>
                <span className={isLight ? 'text-slate-500' : 'text-[#98A2B3]'}>— {log.action}</span>
                <span
                  className={`font-mono px-2 py-0.5 rounded text-[11px] font-bold ${
                    isLight
                      ? 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                      : 'text-[#A8E635] bg-[#A8E635]/10'
                  }`}
                >
                  {log.ref}
                </span>
              </div>
              <div className={`text-[11px] font-mono shrink-0 ${isLight ? 'text-slate-400' : 'text-[#98A2B3]'}`}>
                {log.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT MODAL DIALOG */}
      {activeEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13161C] border border-white/15 rounded-2xl p-6 w-full max-w-xl text-white shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-[#A8E635]" />
                <span>
                  {activeEditModal === 'kpis' && 'Modifier les indicateurs KPI'}
                  {activeEditModal === 'portefeuille' && 'Modifier le portefeuille'}
                  {activeEditModal === 'offres' && 'Modifier les offres ouvertes'}
                  {activeEditModal === 'funnel' && "Modifier l'entonnoir de conversion"}
                  {activeEditModal === 'family' && 'Modifier la couverture par famille'}
                </span>
              </h3>
              <button
                onClick={() => setActiveEditModal(null)}
                className="text-[#98A2B3] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* EDIT KPIS FORM */}
            {activeEditModal === 'kpis' && (
              <div className="space-y-4">
                {tempKpis.map((kpi, idx) => (
                  <div key={idx} className="p-3 bg-[#0B0E17] rounded-xl border border-white/10 space-y-2">
                    <div className="text-xs font-bold text-[#A8E635]">KPI #{idx + 1}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] text-[#98A2B3] block mb-1">Titre</label>
                        <input
                          type="text"
                          value={kpi.label}
                          onChange={(e) => {
                            const updated = [...tempKpis];
                            updated[idx].label = e.target.value;
                            setTempKpis(updated);
                          }}
                          className="w-full bg-[#13161C] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E635]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#98A2B3] block mb-1">Valeur</label>
                        <input
                          type="text"
                          value={kpi.value}
                          onChange={(e) => {
                            const updated = [...tempKpis];
                            updated[idx].value = e.target.value;
                            setTempKpis(updated);
                          }}
                          className="w-full bg-[#13161C] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold outline-none focus:border-[#A8E635]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#98A2B3] block mb-1">Sous-titre</label>
                        <input
                          type="text"
                          value={kpi.sublabel}
                          onChange={(e) => {
                            const updated = [...tempKpis];
                            updated[idx].sublabel = e.target.value;
                            setTempKpis(updated);
                          }}
                          className="w-full bg-[#13161C] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E635]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* EDIT PORTEFEUILLE FORM */}
            {activeEditModal === 'portefeuille' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-[#98A2B3] block mb-1 font-semibold">Titre du bloc</label>
                  <input
                    type="text"
                    value={tempPortefeuille.title}
                    onChange={(e) => setTempPortefeuille({ ...tempPortefeuille, title: e.target.value })}
                    className="w-full bg-[#0B0E17] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#A8E635]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#98A2B3] block mb-1 font-semibold">Nom Carte</label>
                    <input
                      type="text"
                      value={tempPortefeuille.cardName}
                      onChange={(e) => setTempPortefeuille({ ...tempPortefeuille, cardName: e.target.value })}
                      className="w-full bg-[#0B0E17] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#A8E635]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#98A2B3] block mb-1 font-semibold">Solde (DH)</label>
                    <input
                      type="text"
                      value={tempPortefeuille.balance}
                      onChange={(e) => setTempPortefeuille({ ...tempPortefeuille, balance: e.target.value })}
                      className="w-full bg-[#0B0E17] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-bold outline-none focus:border-[#A8E635]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#98A2B3] block mb-1 font-semibold">CA Hebdomadaire</label>
                    <input
                      type="text"
                      value={tempPortefeuille.weeklyCaValue}
                      onChange={(e) => setTempPortefeuille({ ...tempPortefeuille, weeklyCaValue: e.target.value })}
                      className="w-full bg-[#0B0E17] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#A8E635]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#98A2B3] block mb-1 font-semibold">Croissance (%)</label>
                    <input
                      type="text"
                      value={tempPortefeuille.growthBadge}
                      onChange={(e) => setTempPortefeuille({ ...tempPortefeuille, growthBadge: e.target.value })}
                      className="w-full bg-[#0B0E17] border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#A8E635]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* EDIT OFFRES FORM */}
            {activeEditModal === 'offres' && (
              <div className="space-y-3">
                {tempOffres.map((off, idx) => (
                  <div key={off.id} className="p-3 bg-[#0B0E17] rounded-xl border border-white/10 space-y-2 relative">
                    <button
                      onClick={() => setTempOffres(tempOffres.filter((o) => o.id !== off.id))}
                      className="absolute top-2 right-2 text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <label className="text-[10px] text-[#98A2B3] block mb-0.5">Titre offre</label>
                      <input
                        type="text"
                        value={off.title}
                        onChange={(e) => {
                          const updated = [...tempOffres];
                          updated[idx].title = e.target.value;
                          setTempOffres(updated);
                        }}
                        className="w-full bg-[#13161C] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E635]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-[#98A2B3] block mb-0.5">Client</label>
                        <input
                          type="text"
                          value={off.client}
                          onChange={(e) => {
                            const updated = [...tempOffres];
                            updated[idx].client = e.target.value;
                            setTempOffres(updated);
                          }}
                          className="w-full bg-[#13161C] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E635]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#98A2B3] block mb-0.5">Budget</label>
                        <input
                          type="text"
                          value={off.budget}
                          onChange={(e) => {
                            const updated = [...tempOffres];
                            updated[idx].budget = e.target.value;
                            setTempOffres(updated);
                          }}
                          className="w-full bg-[#13161C] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E635]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setTempOffres([
                      ...tempOffres,
                      {
                        id: `off-${Date.now()}`,
                        title: 'Nouvelle offre de mission',
                        client: 'Client Nouveau',
                        budget: '500 DH/j',
                        status: 'Ouverte',
                      },
                    ])
                  }
                  className="w-full py-2 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-xl text-xs text-[#A8E635] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter une offre</span>
                </button>
              </div>
            )}

            {/* EDIT FUNNEL FORM */}
            {activeEditModal === 'funnel' && (
              <div className="space-y-3">
                {tempFunnel.map((step, idx) => (
                  <div key={idx} className="p-3 bg-[#0B0E17] rounded-xl border border-white/10 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] text-[#98A2B3] block mb-0.5">Étape</label>
                        <input
                          type="text"
                          value={step.label}
                          onChange={(e) => {
                            const updated = [...tempFunnel];
                            updated[idx].label = e.target.value;
                            setTempFunnel(updated);
                          }}
                          className="w-full bg-[#13161C] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E635]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#98A2B3] block mb-0.5">Sous-titre</label>
                        <input
                          type="text"
                          value={step.sub}
                          onChange={(e) => {
                            const updated = [...tempFunnel];
                            updated[idx].sub = e.target.value;
                            setTempFunnel(updated);
                          }}
                          className="w-full bg-[#13161C] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E635]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#98A2B3] block mb-0.5">Nombre (Count)</label>
                        <input
                          type="text"
                          value={step.count}
                          onChange={(e) => {
                            const updated = [...tempFunnel];
                            updated[idx].count = e.target.value;
                            setTempFunnel(updated);
                          }}
                          className="w-full bg-[#13161C] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold outline-none focus:border-[#A8E635]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* EDIT FAMILY FORM */}
            {activeEditModal === 'family' && (
              <div className="space-y-3">
                {tempFamily.map((fam, idx) => (
                  <div key={idx} className="p-3 bg-[#0B0E17] rounded-xl border border-white/10 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                      <div>
                        <label className="text-[10px] text-[#98A2B3] block mb-0.5">Catégorie</label>
                        <input
                          type="text"
                          value={fam.family}
                          onChange={(e) => {
                            const updated = [...tempFamily];
                            updated[idx].family = e.target.value;
                            setTempFamily(updated);
                          }}
                          className="w-full bg-[#13161C] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E635]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#98A2B3] block mb-0.5">Validés</label>
                        <input
                          type="number"
                          value={fam.valides}
                          onChange={(e) => {
                            const updated = [...tempFamily];
                            updated[idx].valides = Number(e.target.value);
                            setTempFamily(updated);
                          }}
                          className="w-full bg-[#13161C] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E635]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#98A2B3] block mb-0.5">Disponibles</label>
                        <input
                          type="number"
                          value={fam.dispos}
                          onChange={(e) => {
                            const updated = [...tempFamily];
                            updated[idx].dispos = Number(e.target.value);
                            setTempFamily(updated);
                          }}
                          className="w-full bg-[#13161C] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E635]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#98A2B3] block mb-0.5">Badge Total</label>
                        <input
                          type="text"
                          value={fam.totalCount}
                          onChange={(e) => {
                            const updated = [...tempFamily];
                            updated[idx].totalCount = e.target.value;
                            setTempFamily(updated);
                          }}
                          className="w-full bg-[#13161C] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none focus:border-[#A8E635]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setActiveEditModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#98A2B3] hover:text-white transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  if (activeEditModal === 'kpis') setKpis(tempKpis);
                  if (activeEditModal === 'portefeuille') setPortefeuille(tempPortefeuille);
                  if (activeEditModal === 'offres') setOffresOuvertes(tempOffres);
                  if (activeEditModal === 'funnel') setFunnelSteps(tempFunnel);
                  if (activeEditModal === 'family') setFamilyCoverage(tempFamily);
                  setActiveEditModal(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#A8E635] text-[#0B0D10] font-black text-xs hover:bg-[#b8f042] transition-colors cursor-pointer flex items-center gap-1.5 shadow-lg shadow-[#A8E635]/20"
              >
                <Check className="w-4 h-4" />
                <span>Enregistrer les modifications</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsableHomeDashboard;
