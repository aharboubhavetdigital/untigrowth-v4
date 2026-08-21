import React, { useState } from 'react';
import {
  Search,
  X,
  CheckCircle2,
  Clock,
  Trash2,
  Plus,
  Layers,
  Building2,
  User,
  Calendar,
  ExternalLink,
  FolderArchive,
  Sparkles,
  AlertCircle,
  FileText,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export interface EtapeMission {
  id: string;
  number: number;
  title: string;
  poids: number;
  description: string;
  echeance: string;
  status: 'Validée' | 'En cours' | 'À venir';
  dansLesDelais?: boolean;
  progression: number; // 0 - 100
}

export interface MissionProject {
  id: string;
  title: string;
  client: string;
  freelance: string;
  famille: string;
  tab: 'encours' | 'historique';
  etapes: EtapeMission[];
}

interface MissionsViewProps {
  onNavigateToOffres?: () => void;
  onNavigateToContrats?: () => void;
  onNavigateToVivier?: () => void;
}

const DEFAULT_MISSIONS: MissionProject[] = [
  {
    id: 'mis-1',
    title: "Campagnes d'acquisition multi-canal",
    client: 'Client Riad Collection',
    freelance: 'Rania Skalli',
    famille: 'Marketing digital',
    tab: 'encours',
    etapes: [
      {
        id: 'et-1-1',
        number: 1,
        title: 'Cadrage & kickoff',
        poids: 20,
        description: 'Alignement sur le cahier des charges de « Campagnes d\'acquisition multi-canal », accès projet, planning.',
        echeance: '15/10/2026',
        status: 'Validée',
        dansLesDelais: true,
        progression: 100,
      },
      {
        id: 'et-1-2',
        number: 2,
        title: 'Réalisation',
        poids: 50,
        description: 'Production des livrables principaux selon le périmètre contractuel.',
        echeance: '15/10/2026',
        status: 'Validée',
        dansLesDelais: true,
        progression: 100,
      },
      {
        id: 'et-1-3',
        number: 3,
        title: 'Livraison & recette',
        poids: 30,
        description: 'Remise des livrables, corrections, validation IAweb.dev / client.',
        echeance: '15/10/2026',
        status: 'En cours',
        dansLesDelais: false,
        progression: 0,
      },
    ],
  },
  {
    id: 'mis-2',
    title: 'Automatisation reporting commercial',
    client: 'Client Sofalog',
    freelance: 'Hery Randria',
    famille: 'IA & automatisation',
    tab: 'encours',
    etapes: [
      {
        id: 'et-2-1',
        number: 1,
        title: 'Connexion ERP & flux n8n',
        poids: 30,
        description: 'Extraction automatisée des données ventes et configuration des webhooks de synchronisation.',
        echeance: '20/08/2026',
        status: 'Validée',
        dansLesDelais: true,
        progression: 100,
      },
      {
        id: 'et-2-2',
        number: 2,
        title: 'Rapports IA & synthèse exécutive',
        poids: 40,
        description: 'Génération automatique des dashboards et alertes de performance commerciale.',
        echeance: '28/08/2026',
        status: 'En cours',
        dansLesDelais: true,
        progression: 35,
      },
      {
        id: 'et-2-3',
        number: 3,
        title: 'Recette & transfert managérial',
        poids: 30,
        description: 'Formation de l\'équipe commerciale et mise en production continue.',
        echeance: '30/08/2026',
        status: 'À venir',
        dansLesDelais: false,
        progression: 0,
      },
    ],
  },
  {
    id: 'mis-3',
    title: 'Application interne de gestion de stock (no-code)',
    client: 'Client PharmaSud',
    freelance: 'Lova Rasoanaivo',
    famille: 'No-code',
    tab: 'historique',
    etapes: [
      {
        id: 'et-3-1',
        number: 1,
        title: 'Cadrage & kickoff',
        poids: 20,
        description: 'Alignement sur le cahier des charges de « Application interne de gestion de stock (no-code) », accès projet, planning.',
        echeance: '04/07/2026',
        status: 'Validée',
        dansLesDelais: true,
        progression: 100,
      },
      {
        id: 'et-3-2',
        number: 2,
        title: 'Réalisation',
        poids: 50,
        description: 'Production des livrables principaux selon le périmètre contractuel.',
        echeance: '04/07/2026',
        status: 'Validée',
        dansLesDelais: true,
        progression: 100,
      },
      {
        id: 'et-3-3',
        number: 3,
        title: 'Livraison & recette',
        poids: 30,
        description: 'Remise des livrables, corrections, validation IAweb.dev / client.',
        echeance: '04/07/2026',
        status: 'Validée',
        dansLesDelais: true,
        progression: 100,
      },
    ],
  },
];

export const MissionsView: React.FC<MissionsViewProps> = ({
  onNavigateToOffres,
  onNavigateToContrats,
  onNavigateToVivier,
}) => {
  const [missions, setMissions] = useState<MissionProject[]>(DEFAULT_MISSIONS);
  const [activeSubTab, setActiveSubTab] = useState<'encours' | 'historique'>('encours');
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedMissions, setCollapsedMissions] = useState<Record<string, boolean>>({});

  const toggleCollapse = (missionId: string) => {
    setCollapsedMissions((prev) => ({
      ...prev,
      [missionId]: !prev[missionId],
    }));
  };

  // Local state for adding steps to missions: { [missionId]: { title: string, poids: number } }
  const [newStepInputs, setNewStepInputs] = useState<
    Record<string, { title: string; poids: number }>
  >({});

  // Helper: calculate total validated percentage for a mission
  const calculateMissionProgress = (mission: MissionProject): number => {
    if (mission.etapes.length === 0) return 0;
    const totalPoids = mission.etapes.reduce((acc, curr) => acc + curr.poids, 0);
    if (totalPoids === 0) return 0;

    const validatedPoids = mission.etapes.reduce((acc, curr) => {
      if (curr.status === 'Validée') {
        return acc + curr.poids;
      }
      return acc + (curr.poids * curr.progression) / 100;
    }, 0);

    return Math.min(100, Math.round((validatedPoids / totalPoids) * 100));
  };

  // Helper: calculate number of validated steps
  const getValidatedStepsCount = (mission: MissionProject): { validated: number; total: number } => {
    const validated = mission.etapes.filter((e) => e.status === 'Validée').length;
    return { validated, total: mission.etapes.length };
  };

  // Sub-tab counts
  const countEncours = missions.filter((m) => m.tab === 'encours').length;
  const countHistorique = missions.filter((m) => m.tab === 'historique').length;

  // Filtered Missions
  const filteredMissions = missions.filter((item) => {
    if (item.tab !== activeSubTab) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = item.title.toLowerCase().includes(q);
      const matchesClient = item.client.toLowerCase().includes(q);
      const matchesFreelance = item.freelance.toLowerCase().includes(q);
      const matchesFamille = item.famille.toLowerCase().includes(q);
      if (!matchesTitle && !matchesClient && !matchesFreelance && !matchesFamille) return false;
    }

    return true;
  });

  // Action: Validate a step
  const handleValidateStep = (missionId: string, stepId: string) => {
    setMissions((prev) =>
      prev.map((mission) => {
        if (mission.id !== missionId) return mission;

        const updatedEtapes: EtapeMission[] = mission.etapes.map((step) => {
          if (step.id === stepId) {
            return {
              ...step,
              status: 'Validée' as const,
              progression: 100,
              dansLesDelais: true,
            };
          }
          return step;
        });

        // Check if all steps are now validated
        const allValidated = updatedEtapes.every((s) => s.status === 'Validée');

        return {
          ...mission,
          etapes: updatedEtapes,
          tab: allValidated ? 'historique' : mission.tab,
        };
      })
    );
  };

  // Action: Delete a step
  const handleDeleteStep = (missionId: string, stepId: string) => {
    setMissions((prev) =>
      prev.map((mission) => {
        if (mission.id !== missionId) return mission;

        const remainingSteps = mission.etapes
          .filter((step) => step.id !== stepId)
          .map((step, idx) => ({
            ...step,
            number: idx + 1,
          }));

        return {
          ...mission,
          etapes: remainingSteps,
        };
      })
    );
  };

  // Action: Add a new step
  const handleAddStep = (missionId: string) => {
    const inputData = newStepInputs[missionId] || { title: '', poids: 10 };
    if (!inputData.title.trim()) return;

    setMissions((prev) =>
      prev.map((mission) => {
        if (mission.id !== missionId) return mission;

        const nextNum = mission.etapes.length + 1;
        const newStep: EtapeMission = {
          id: `et-${mission.id}-${Date.now()}`,
          number: nextNum,
          title: inputData.title.trim(),
          poids: inputData.poids > 0 ? Number(inputData.poids) : 10,
          description: `Étape #${nextNum} ajoutée au suivi opérationnel de la mission.`,
          echeance: '15/10/2026',
          status: 'En cours',
          dansLesDelais: true,
          progression: 0,
        };

        return {
          ...mission,
          etapes: [...mission.etapes, newStep],
          tab: 'encours', // keep or move to encours if new step is added
        };
      })
    );

    // Reset input
    setNewStepInputs((prev) => ({
      ...prev,
      [missionId]: { title: '', poids: 10 },
    }));
  };

  return (
    <div className="space-y-6 text-white max-w-7xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* 1. Header Title & Dynamic Subtitle */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Missions</h1>

        {activeSubTab === 'encours' ? (
          <p className="text-xs sm:text-sm text-[#98A2B3] font-medium leading-relaxed">
            Projets actifs : les étapes validées font monter le % global jusqu'à 100 %
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-[#98A2B3] font-medium leading-relaxed">
            Projets terminés ou entièrement validés — consultation seule
          </p>
        )}
      </div>

      {/* 2. Sub-Tabs Navigation Bar with Counters */}
      <div className="bg-[#13161C] border border-white/10 rounded-2xl p-2 sm:p-2.5 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'encours', label: 'En cours', count: countEncours },
            { id: 'historique', label: 'Historique', count: countHistorique },
          ].map((tab) => {
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 relative ${
                  isActive ? 'text-[#A8E635] font-black' : 'text-[#98A2B3] hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 text-[11px] rounded-full font-extrabold transition-colors ${
                    isActive
                      ? 'bg-[#A8E635] text-[#0B0D10]'
                      : 'bg-white/5 border border-white/10 text-[#98A2B3]'
                  }`}
                >
                  {tab.count}
                </span>

                {/* Lime Bottom Underline Indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#A8E635] rounded-full shadow-sm" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Info / Policy Banner */}
      <div className="bg-[#13161C] border border-white/10 rounded-2xl p-4 sm:p-4.5 shadow-sm text-xs sm:text-sm text-[#98A2B3] leading-relaxed">
        <p>
          Chaque offre contractualisée a des <strong className="text-white font-bold">étapes</strong>.
          Leur validation (par IAweb.dev) fait progresser le projet vers{' '}
          <strong className="text-[#A8E635] font-black">100 %</strong>. Les documents / aller-retours
          restent dans Offres → En cours.
        </p>
      </div>

      {/* 4. Search Filter Input */}
      <div className="bg-[#13161C] p-3.5 sm:p-4 rounded-2xl border border-white/10 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Projet, client, freelance..."
            className="w-full bg-[#0B0E17] border border-white/10 focus:border-[#A8E635] focus:bg-[#0B0E17] text-white placeholder-white/40 text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A2B3] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-[#98A2B3] font-semibold px-1">
        {filteredMissions.length} résultat(s)
      </div>

      {/* 5. Main Missions Cards List */}
      {filteredMissions.length === 0 ? (
        <div className="bg-[#13161C] border border-white/10 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#A8E635]/15 border border-[#A8E635]/30 flex items-center justify-center text-[#A8E635] shadow-sm">
            <Layers className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-white">Aucune mission trouvée</h2>
          <p className="text-xs text-[#98A2B3] max-w-sm">
            {activeSubTab === 'encours'
              ? 'Aucun projet en cours ne correspond aux critères de recherche.'
              : 'Aucun projet archivé dans l’historique.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {filteredMissions.map((mission) => {
            const progress = calculateMissionProgress(mission);
            const { validated, total } = getValidatedStepsCount(mission);
            const stepInput = newStepInputs[mission.id] || { title: '', poids: 10 };
            const isCollapsed = !!collapsedMissions[mission.id];

            return (
              <div
                key={mission.id}
                className="p-6 bg-[#13161C] rounded-2xl border border-white/10 hover:border-white/20 transition-all shadow-sm space-y-5"
              >
                {/* Mission Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 min-w-0">
                    <h2 className="text-base sm:text-lg font-black text-white tracking-tight truncate">
                      {mission.title}
                    </h2>

                    <div className="flex items-center gap-2 text-xs text-[#98A2B3] flex-wrap">
                      <span>{mission.client}</span>
                      <span>·</span>
                      <span className="text-white font-bold">{mission.freelance}</span>
                      <span>·</span>
                      <span className="font-semibold text-white/80">
                        {validated}/{total} étape(s) validée(s)
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-0.5 text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={onNavigateToOffres}
                          className="text-[#A8E635] hover:text-[#bbf455] hover:underline font-bold transition-colors cursor-pointer"
                        >
                          Voir l'offre
                        </button>
                        <span className="text-white/20">·</span>
                        <button
                          onClick={onNavigateToContrats}
                          className="text-[#A8E635] hover:text-[#bbf455] hover:underline font-bold transition-colors cursor-pointer"
                        >
                          Voir le contrat
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleCollapse(mission.id)}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <span>{isCollapsed ? 'Déplier' : 'Replier'}</span>
                        {isCollapsed ? (
                          <ChevronDown className="w-3.5 h-3.5 text-[#A8E635]" />
                        ) : (
                          <ChevronUp className="w-3.5 h-3.5 text-[#A8E635]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Top Right Percentage */}
                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-2xl sm:text-3xl font-black text-[#A8E635] tracking-tight">
                      {progress}%
                    </div>
                    <div className="text-[10px] text-[#98A2B3] font-mono uppercase tracking-widest font-bold mt-0.5">
                      AVANCEMENT
                    </div>
                  </div>
                </div>

                {/* Overall Mission Progress Bar */}
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-[#A8E635] rounded-full transition-all duration-500 shadow-sm shadow-[#A8E635]/20"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Collapsible Content: Steps List & Add Step Form */}
                {!isCollapsed && (
                  <>
                    {/* Steps / Milestones List */}
                    <div className="space-y-3 pt-2">
                      {mission.etapes.map((step) => {
                        const isValidated = step.status === 'Validée';
                        const isEnCours = step.status === 'En cours';

                        return (
                          <div
                            key={step.id}
                            className="p-4 sm:p-4.5 rounded-xl bg-[#0B0E17] border border-white/10 hover:border-white/15 transition-all space-y-3"
                          >
                            {/* Step Top Row */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs sm:text-sm font-black text-white">
                                  #{step.number} {step.title}
                                </span>
                                <span className="text-xs text-[#98A2B3] font-mono">
                                  · poids {step.poids}
                                </span>
                              </div>

                              {/* Step Badges and Actions */}
                              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                                {isValidated && (
                                  <span className="px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    <span>Validée</span>
                                  </span>
                                )}

                                {isEnCours && (
                                  <>
                                    <span className="px-3 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold">
                                      En cours
                                    </span>

                                    <button
                                      type="button"
                                      onClick={() => handleValidateStep(mission.id, step.id)}
                                      className="px-3.5 py-1.5 rounded-xl bg-[#A8E635] hover:bg-[#97d42a] text-[#0B0D10] text-xs font-black transition-all shadow-sm cursor-pointer flex items-center gap-1 active:scale-95"
                                    >
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                      <span>Valider l'étape</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => handleDeleteStep(mission.id, step.id)}
                                      className="text-xs text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer ml-1"
                                    >
                                      Suppr.
                                    </button>
                                  </>
                                )}

                                {step.status === 'À venir' && (
                                  <>
                                    <span className="px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#98A2B3] text-xs font-bold">
                                      À venir
                                    </span>

                                    <button
                                      type="button"
                                      onClick={() => handleValidateStep(mission.id, step.id)}
                                      className="px-3 py-1 rounded-xl bg-white/10 hover:bg-[#A8E635] text-white hover:text-[#0B0D10] text-xs font-bold transition-all cursor-pointer"
                                    >
                                      Valider
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => handleDeleteStep(mission.id, step.id)}
                                      className="text-xs text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer ml-1"
                                    >
                                      Suppr.
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Step Description */}
                            <p className="text-xs text-[#98A2B3] leading-relaxed">
                              {step.description}
                            </p>

                            {/* Due Date Details */}
                            <div className="text-[11px] text-[#98A2B3]">
                              <span>Échéance : {step.echeance}</span>
                              {step.dansLesDelais && (
                                <span className="text-emerald-400 font-semibold ml-1">· Dans les délais</span>
                              )}
                            </div>

                            {/* Step Progress Line */}
                            <div className="space-y-1 pt-1">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#98A2B3]">Progression étape</span>
                                <span className="font-bold text-white">
                                  {isValidated ? '100%' : `${step.progression}%`}
                                </span>
                              </div>

                              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    isValidated
                                      ? 'bg-emerald-500'
                                      : isEnCours
                                      ? 'bg-[#A8E635]'
                                      : 'bg-white/20'
                                  }`}
                                  style={{ width: isValidated ? '100%' : `${step.progression}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add New Step Form */}
                    <div className="pt-2 border-t border-white/10">
                      <div className="flex flex-col sm:flex-row items-center gap-2.5">
                        <input
                          type="text"
                          placeholder="Nouvelle étape..."
                          value={stepInput.title}
                          onChange={(e) =>
                            setNewStepInputs((prev) => ({
                              ...prev,
                              [mission.id]: {
                                title: e.target.value,
                                poids: prev[mission.id]?.poids ?? 10,
                              },
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddStep(mission.id);
                            }
                          }}
                          className="w-full flex-1 bg-[#0B0E17] border border-white/10 focus:border-[#A8E635] focus:bg-[#0B0E17] text-white placeholder-white/40 text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all"
                        />

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <input
                            type="number"
                            min={1}
                            max={100}
                            value={stepInput.poids}
                            onChange={(e) =>
                              setNewStepInputs((prev) => ({
                                ...prev,
                                [mission.id]: {
                                  title: prev[mission.id]?.title ?? '',
                                  poids: parseInt(e.target.value, 10) || 10,
                                },
                              }))
                            }
                            title="Poids de l'étape"
                            className="w-20 bg-[#0B0E17] border border-white/10 focus:border-[#A8E635] focus:bg-[#0B0E17] text-white font-black text-center text-xs rounded-xl px-2 py-2.5 outline-none transition-all"
                          />

                          <button
                            type="button"
                            onClick={() => handleAddStep(mission.id)}
                            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#A8E635] hover:bg-[#97d42a] text-[#0B0D10] text-xs font-black transition-all shadow-sm cursor-pointer shrink-0 active:scale-95 flex items-center justify-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Ajouter</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MissionsView;
