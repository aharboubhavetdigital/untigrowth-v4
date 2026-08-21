import React, { useState } from 'react';
import { CustomSelect } from './CustomSelect';
import {
  Brain,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Edit2,
  Trash2,
  ExternalLink,
  Save,
  Check,
  X,
  ChevronRight,
  SlidersHorizontal,
  HelpCircle,
  Layers,
} from 'lucide-react';

export interface Question {
  id: string;
  text: string;
  tag: string;
  active: boolean;
}

export interface TestItem {
  id: string;
  title: string;
  type: 'interne' | 'externe';
  active: boolean;
  pack: string;
  questionsCount: number;
  totalQuestionsNeeded: number;
  isReady: boolean;
  statusLabel: string;
  duration: number; // in seconds
  passThreshold?: number; // percentage
  retryDays: number;
  platform?: string;
  url?: string;
  consignes: string;
  questions: Question[];
}

export const initialTests: TestItem[] = [
  {
    id: 'test-1',
    title: 'Développement full stack',
    type: 'interne',
    active: true,
    pack: 'pack fullstack',
    questionsCount: 7,
    totalQuestionsNeeded: 8,
    isReady: false,
    statusLabel: 'Configuration incomplète.',
    duration: 600,
    passThreshold: 70,
    retryDays: 0,
    consignes:
      'Ce test évalue vos bases API, front et données. Répondez seul·e, sans aide externe. Une seule réponse par question.',
    questions: [
      {
        id: 'q1',
        text: 'Quelle méthode HTTP est idempotente ?',
        tag: 'API REST',
        active: false,
      },
      {
        id: 'q2',
        text: 'Dans une API REST, quel code indique une ressource créée ?',
        tag: 'API REST',
        active: true,
      },
      {
        id: 'q3',
        text: "Quel est l'intérêt principal d'un index en base de données ?",
        tag: 'Bases de données',
        active: true,
      },
      {
        id: 'q4',
        text: "En JavaScript, que retourne `typeof null` ?",
        tag: 'Frontend',
        active: true,
      },
      {
        id: 'q5',
        text: 'Quel mécanisme protège contre les injections SQL ?',
        tag: 'Sécurité',
        active: true,
      },
      {
        id: 'q6',
        text: "Qu'est-ce qu'une transaction ACID garantit ?",
        tag: 'Bases de données',
        active: true,
      },
      {
        id: 'q7',
        text: 'Quel header HTTP transporte un token Bearer ?',
        tag: 'API REST',
        active: true,
      },
      {
        id: 'q8',
        text: 'Dans React, à quoi sert useEffect ?',
        tag: 'Frontend',
        active: true,
      },
    ],
  },
  {
    id: 'test-2',
    title: 'IA & automatisation',
    type: 'interne',
    active: true,
    pack: 'pack ia_automation',
    questionsCount: 8,
    totalQuestionsNeeded: 8,
    isReady: true,
    statusLabel: 'Prêt à être affecté / passé.',
    duration: 600,
    passThreshold: 75,
    retryDays: 0,
    consignes:
      'Ce test couvre RAG, agents, orchestrations et métriques IA. Privilégiez la précision plutôt que la vitesse.',
    questions: [
      {
        id: 'q21',
        text: "Qu'est-ce que le RAG (Retrieval-Augmented Generation) ?",
        tag: 'Architecture IA',
        active: true,
      },
      {
        id: 'q22',
        text: 'Quel est le rôle principal de la température dans un LLM ?',
        tag: 'LLM Params',
        active: true,
      },
      {
        id: 'q23',
        text: "Quelle est la différence entre un Agent IA et un simple Workflow ?",
        tag: 'Agents IA',
        active: true,
      },
      {
        id: 'q24',
        text: 'Comment mesurer le hallucination rate dans une chaîne RAG ?',
        tag: 'Métriques',
        active: true,
      },
      {
        id: 'q25',
        text: "Quel outil d'orchestration est adapté aux pipelines LLM ?",
        tag: 'Orchestration',
        active: true,
      },
      {
        id: 'q26',
        text: "Qu'est-ce qu'un Embedding Vectoriel ?",
        tag: 'Embeddings',
        active: true,
      },
      {
        id: 'q27',
        text: 'Comment fonctionne le Prompt Injection et comment la contrer ?',
        tag: 'Sécurité IA',
        active: true,
      },
      {
        id: 'q28',
        text: 'Quel rôle joue la mémoire à long terme chez un agent autonome ?',
        tag: 'Mémoire Agent',
        active: true,
      },
    ],
  },
  {
    id: 'test-3',
    title: 'Marketing digital',
    type: 'interne',
    active: true,
    pack: 'pack marketing',
    questionsCount: 8,
    totalQuestionsNeeded: 8,
    isReady: true,
    statusLabel: 'Prêt à être affecté / passé.',
    duration: 600,
    passThreshold: 70,
    retryDays: 0,
    consignes:
      'Ce test mesure acquisition, SEO, performance média et culture data marketing.',
    questions: [
      {
        id: 'q31',
        text: 'Quelle est la différence entre CPA et CPL ?',
        tag: 'Performance Média',
        active: true,
      },
      {
        id: 'q32',
        text: 'Quel élément est crucial pour le référencement naturel (SEO) on-page ?',
        tag: 'SEO',
        active: true,
      },
      {
        id: 'q33',
        text: "Comment calculer le Taux de Conversion d'une landing page ?",
        tag: 'Analytics',
        active: true,
      },
      {
        id: 'q34',
        text: 'Quel est le rôle du Pixel de conversion Meta / Google ?',
        tag: 'Acquisition',
        active: true,
      },
      {
        id: 'q35',
        text: "Qu'est-ce que le CAC (Coût d'Acquisition Client) ?",
        tag: 'Data Marketing',
        active: true,
      },
      {
        id: 'q36',
        text: "Quelle est la fonction d'un A/B testing sur une campagne SEA ?",
        tag: 'SEA',
        active: true,
      },
      {
        id: 'q37',
        text: 'Comment mesurer la LTV (Lifetime Value) client ?',
        tag: 'Analytics',
        active: true,
      },
      {
        id: 'q38',
        text: 'Quel levier est privilégié pour le Retargeting dynamique ?',
        tag: 'Performance Média',
        active: true,
      },
    ],
  },
  {
    id: 'test-4',
    title: 'No-code',
    type: 'interne',
    active: true,
    pack: 'pack nocode',
    questionsCount: 8,
    totalQuestionsNeeded: 8,
    isReady: true,
    statusLabel: 'Prêt à être affecté / passé.',
    duration: 600,
    passThreshold: 70,
    retryDays: 0,
    consignes:
      'Ce test vérifie votre maîtrise des outils no-code, connecteurs et limites de plateforme.',
    questions: [
      {
        id: 'q41',
        text: 'Comment sécuriser une clé API dans Make / Zapier ?',
        tag: 'Connecteurs',
        active: true,
      },
      {
        id: 'q42',
        text: 'Quelle est la différence entre un Webhook et un Polling ?',
        tag: 'Automation',
        active: true,
      },
      {
        id: 'q43',
        text: 'Dans Airtable, comment structurer une relation 1-to-N ?',
        tag: 'Bases de données',
        active: true,
      },
      {
        id: 'q44',
        text: "Quelles sont les limites d'exécution d'un scénario Make ?",
        tag: 'Performances',
        active: true,
      },
      {
        id: 'q45',
        text: 'Comment gérer les erreurs d’exécution dans Zapier ?',
        tag: 'Error Handling',
        active: true,
      },
      {
        id: 'q46',
        text: 'Quel outil No-code est recommandé pour construire des Web Apps réactives ?',
        tag: 'Web Apps',
        active: true,
      },
      {
        id: 'q47',
        text: 'Comment configurer un domaine personnalisé dans Webflow ?',
        tag: 'Webflow',
        active: true,
      },
      {
        id: 'q48',
        text: "Qu'est-ce qu'un payload JSON reçu par un Webhook ?",
        tag: 'Data Format',
        active: true,
      },
    ],
  },
  {
    id: 'test-5',
    title: 'Soft skills — Maki',
    type: 'externe',
    active: true,
    pack: 'transverse',
    questionsCount: 0,
    totalQuestionsNeeded: 0,
    isReady: true,
    statusLabel: 'Prêt à être affecté / passé.',
    duration: 600,
    passThreshold: 60,
    retryDays: 0,
    platform: 'Maki',
    url: 'https://app.maki-people.com/',
    consignes:
      "Ouvrez le lien Maki, complétez l'évaluation, puis revenez déclarer votre score sur Unitgrowth.",
    questions: [],
  },
];

interface TestsIaViewProps {
  theme?: 'dark' | 'light';
}

export const TestsIaView: React.FC<TestsIaViewProps> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';
  const [tests, setTests] = useState<TestItem[]>(initialTests);
  const [selectedTestId, setSelectedTestId] = useState<string>('test-1');
  const [activeDetailTab, setActiveDetailTab] = useState<'config' | 'questions'>('config');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'interne' | 'externe'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'actifs' | 'inactifs'>('all');
  const [packFilter, setPackFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'questions'>('title');

  const [savedNotification, setSavedNotification] = useState(false);
  const [showNewTestModal, setShowNewTestModal] = useState(false);
  const [showNewQuestionModal, setShowNewQuestionModal] = useState(false);

  // Form states for creating a new test
  const [newTestTitle, setNewTestTitle] = useState('');
  const [newTestType, setNewTestType] = useState<'interne' | 'externe'>('interne');
  const [newTestPack, setNewTestPack] = useState('— Transverse (tous les candidats) —');
  const [newTestDuration, setNewTestDuration] = useState<number>(600);
  const [newTestQuestionsNeeded, setNewTestQuestionsNeeded] = useState<number>(8);
  const [newTestConsignes, setNewTestConsignes] = useState('');
  const [newTestUrl, setNewTestUrl] = useState('');

  // Form states for creating a question
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionTag, setNewQuestionTag] = useState('Général');

  const selectedTest = tests.find((t) => t.id === selectedTestId) || tests[0];

  // Filtering list
  const filteredTests = tests
    .filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.pack.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        typeFilter === 'all'
          ? true
          : typeFilter === 'interne'
          ? t.type === 'interne'
          : t.type === 'externe';

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'actifs'
          ? t.active
          : !t.active;

      const matchesPack =
        packFilter === 'all'
          ? true
          : t.pack.toLowerCase().includes(packFilter.replace('pack ', '').toLowerCase());

      return matchesSearch && matchesType && matchesStatus && matchesPack;
    })
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        return b.questionsCount - a.questionsCount;
      }
    });

  // Handle Save Test Settings
  const handleSaveTest = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  // Field change handler for currently selected test
  const updateSelectedTestField = (field: keyof TestItem, value: any) => {
    setTests((prev) =>
      prev.map((t) => {
        if (t.id === selectedTestId) {
          const updated = { ...t, [field]: value };
          // Re-evaluate readiness
          if (updated.type === 'interne') {
            const activeQuestions = updated.questions.filter((q) => q.active).length;
            updated.questionsCount = activeQuestions;
            if (activeQuestions >= updated.totalQuestionsNeeded && updated.totalQuestionsNeeded > 0) {
              updated.isReady = true;
              updated.statusLabel = 'Prêt à être affecté / passé.';
            } else {
              updated.isReady = false;
              updated.statusLabel = 'Configuration incomplète.';
            }
          }
          return updated;
        }
        return t;
      })
    );
  };

  // Toggle question active/inactive
  const toggleQuestionStatus = (qId: string) => {
    setTests((prev) =>
      prev.map((t) => {
        if (t.id === selectedTestId) {
          const newQuestions = t.questions.map((q) =>
            q.id === qId ? { ...q, active: !q.active } : q
          );
          const activeCount = newQuestions.filter((q) => q.active).length;
          const isReady = activeCount >= t.totalQuestionsNeeded && t.totalQuestionsNeeded > 0;
          return {
            ...t,
            questions: newQuestions,
            questionsCount: activeCount,
            isReady,
            statusLabel: isReady ? 'Prêt à être affecté / passé.' : 'Configuration incomplète.',
          };
        }
        return t;
      })
    );
  };

  // Add new Question
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ: Question = {
      id: 'q-' + Date.now(),
      text: newQuestionText.trim(),
      tag: newQuestionTag.trim() || 'Général',
      active: true,
    };

    setTests((prev) =>
      prev.map((t) => {
        if (t.id === selectedTestId) {
          const newQuestions = [...t.questions, newQ];
          const activeCount = newQuestions.filter((q) => q.active).length;
          const isReady = activeCount >= t.totalQuestionsNeeded && t.totalQuestionsNeeded > 0;
          return {
            ...t,
            questions: newQuestions,
            questionsCount: activeCount,
            isReady,
            statusLabel: isReady ? 'Prêt à être affecté / passé.' : 'Configuration incomplète.',
          };
        }
        return t;
      })
    );

    setNewQuestionText('');
    setNewQuestionTag('Général');
    setShowNewQuestionModal(false);
  };

  // Add new Test
  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestTitle.trim()) return;

    const newTest: TestItem = {
      id: 'test-' + Date.now(),
      title: newTestTitle.trim(),
      type: newTestType,
      active: true,
      pack: newTestPack,
      questionsCount: 0,
      totalQuestionsNeeded: newTestType === 'interne' ? newTestQuestionsNeeded : 0,
      isReady: newTestType === 'externe',
      statusLabel:
        newTestType === 'externe'
          ? 'Prêt à être affecté / passé.'
          : 'Configuration incomplète.',
      duration: newTestDuration,
      passThreshold: 70,
      retryDays: 0,
      consignes:
        newTestConsignes ||
        'Ce test évalue vos compétences et connaissances dans le domaine ciblé. Répondez avec précision.',
      platform: newTestType === 'externe' ? 'Maki' : undefined,
      url: newTestType === 'externe' ? newTestUrl || 'https://app.maki-people.com/' : undefined,
      questions: [],
    };

    setTests((prev) => [newTest, ...prev]);
    setSelectedTestId(newTest.id);
    setNewTestTitle('');
    setNewTestConsignes('');
    setNewTestUrl('');
    setShowNewTestModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <span>Catalogue de tests</span>
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${isLight ? 'bg-slate-100 text-slate-800 border-slate-200' : 'bg-white/15 text-white border-white/30'}`}>
              {tests.length} tests disponibles
            </span>
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
            Plusieurs évaluations (QCM Unitgrowth ou lien Maki / autre plateforme), assignables aux candidats.
          </p>
        </div>

        <button
          onClick={() => setShowNewTestModal(true)}
          className={`px-5 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto shadow-lg ${
            isLight
              ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10'
              : 'bg-white text-[#0B0D10] hover:bg-white/90 shadow-white/10'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau test</span>
        </button>
      </div>

      {/* Main Grid: Left Filter & List Column, Right Detail & Questions Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= LEFT COLUMN: TESTS LIST & FILTERS ================= */}
        <div className={`rounded-3xl border p-5 space-y-4 ${isLight ? 'bg-white border-slate-200/80 shadow-sm' : 'bg-[#12151C] border-white/10 shadow-2xl'}`}>
          <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-slate-100' : 'border-white/10'}`}>
            <h3 className={`text-sm font-black uppercase tracking-wider ${isLight ? 'text-slate-800' : 'text-white'}`}>
              Tests
            </h3>
            <span className={`text-xs font-mono ${isLight ? 'text-slate-600 font-extrabold' : 'text-white font-bold'}`}>
              {filteredTests.length} résultat(s)
            </span>
          </div>

          {/* Filters Box */}
          <div className="space-y-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className={`w-3.5 h-3.5 absolute left-3 top-3 ${isLight ? 'text-slate-400' : 'text-[#98A2B3]'}`} />
              <input
                type="text"
                placeholder="Titre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full border rounded-2xl pl-9 pr-3 py-2 text-xs transition-colors focus:outline-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-slate-900'
                    : 'bg-[#090B0E] border-white/10 text-white placeholder-[#98A2B3] focus:border-white'
                }`}
              />
            </div>

            {/* Dropdown Filters */}
            <div className="grid grid-cols-2 gap-2">
              <CustomSelect
                value={typeFilter}
                onChange={(val) => setTypeFilter(val as any)}
                options={[
                  { value: 'all', label: 'Tous les types' },
                  { value: 'interne', label: 'Interne' },
                  { value: 'externe', label: 'Externe' },
                ]}
                theme={theme}
              />

              <CustomSelect
                value={statusFilter}
                onChange={(val) => setStatusFilter(val as any)}
                options={[
                  { value: 'all', label: 'Tous statuts' },
                  { value: 'actifs', label: 'Actifs' },
                  { value: 'inactifs', label: 'Inactifs' },
                ]}
                theme={theme}
              />
            </div>

            {/* Additional Advanced Filters */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <CustomSelect
                value={packFilter}
                onChange={(val) => setPackFilter(val)}
                options={[
                  { value: 'all', label: 'Tous les packs' },
                  { value: 'pack fullstack', label: 'Full stack' },
                  { value: 'pack ia_automation', label: 'IA & automation' },
                  { value: 'pack marketing', label: 'Marketing' },
                  { value: 'pack nocode', label: 'No-code' },
                ]}
                theme={theme}
              />

              <CustomSelect
                value={sortBy}
                onChange={(val) => setSortBy(val as any)}
                options={[
                  { value: 'title', label: 'Tri: Titre' },
                  { value: 'questions', label: 'Tri: Nb questions' },
                ]}
                theme={theme}
              />
            </div>
          </div>

          {/* Tests List */}
          <div className="space-y-2 pt-1 max-h-[550px] overflow-y-auto pr-1 no-scrollbar">
            {filteredTests.map((test) => {
               const isSelected = selectedTestId === test.id;
               return (
                <div
                  key={test.id}
                  onClick={() => setSelectedTestId(test.id)}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? isLight
                        ? 'bg-[#A8E635]/15 border-[#A8E635] shadow-lg shadow-[#A8E635]/5 ring-1 ring-[#A8E635]/30'
                        : 'bg-[#181C26] border-[#A8E635] shadow-lg shadow-[#A8E635]/10 ring-1 ring-[#A8E635]/30'
                      : isLight
                        ? 'bg-slate-50 border-slate-100 hover:border-slate-200 hover:bg-slate-100/50'
                        : 'bg-[#090B0E]/60 border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className={`text-xs font-black ${isLight ? 'text-slate-800' : 'text-white'}`}>{test.title}</span>
                    {test.type === 'externe' ? (
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isLight
                          ? 'text-slate-700 bg-slate-100 border-slate-200'
                          : 'text-[#A8E635] bg-[#A8E635]/10 border-[#A8E635]/20'
                      }`}>
                        {test.platform || 'Externe'}
                      </span>
                    ) : (
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        isLight
                          ? 'text-slate-500 bg-slate-100 border-slate-200'
                          : 'text-[#98A2B3] bg-white/5 border-white/10'
                      }`}>
                        {test.questionsCount}/{test.totalQuestionsNeeded} Q
                      </span>
                    )}
                  </div>

                  <div className={`text-[11px] flex items-center justify-between gap-2 ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                    <span className="truncate">
                      {test.type === 'externe'
                        ? `${test.platform || 'Maki'} · prêt · ${test.pack}`
                        : `${test.questionsCount}/${test.totalQuestionsNeeded} questions · ${
                            test.isReady ? 'prêt' : 'incomplet'
                          } · ${test.pack}`}
                    </span>
                    {test.isReady ? (
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-emerald-600' : 'text-white'}`} />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}

            {filteredTests.length === 0 && (
              <div className="text-center py-8 text-xs text-[#98A2B3]">
                Aucun test ne correspond à la recherche.
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: UNIFIED SINGLE CARD WITH TABS ================= */}
        <div className="lg:col-span-2">
          <div className={`rounded-3xl border p-6 space-y-6 ${isLight ? 'bg-white border-slate-200/80 shadow-sm' : 'bg-[#12151C] border-white/10 shadow-2xl'}`}>
            {/* Unified Top Header & Tab Switcher (Tout en 1 ligne) */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${isLight ? 'border-slate-100' : 'border-white/10'}`}>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {selectedTest.title}
                  </span>
                  {selectedTest.isReady ? (
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      isLight ? 'bg-emerald-50 text-emerald-700' : 'bg-white/10 text-white'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      {selectedTest.statusLabel}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500">
                      <AlertCircle className="w-3 h-3" />
                      {selectedTest.statusLabel}
                    </span>
                  )}
                </div>
              </div>

              {/* Interactive Tabs / Options to Open */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/10 dark:bg-black/40 border border-white/5">
                <button
                  type="button"
                  onClick={() => setActiveDetailTab('config')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeDetailTab === 'config'
                      ? isLight
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-white text-[#0B0D10] shadow-md'
                      : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
                  }`}
                >
                  Configuration ({selectedTest.title})
                </button>

                {selectedTest.type === 'interne' && (
                  <button
                    type="button"
                    onClick={() => setActiveDetailTab('questions')}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeDetailTab === 'questions'
                        ? isLight
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'bg-white text-[#0B0D10] shadow-md'
                        : isLight
                          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                          : 'text-[#98A2B3] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>Banque de questions</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      activeDetailTab === 'questions'
                        ? isLight ? 'bg-white/20 text-white' : 'bg-black/20 text-[#0B0D10]'
                        : isLight ? 'bg-slate-200 text-slate-700' : 'bg-white/10 text-white'
                    }`}>
                      {selectedTest.questions.length}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* TAB CONTENT 1: CONFIGURATION FORM */}
            {activeDetailTab === 'config' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                {/* Form Grid Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Titre */}
                  <div className="space-y-1">
                    <label className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Titre</label>
                    <input
                      type="text"
                      value={selectedTest.title}
                      onChange={(e) => updateSelectedTestField('title', e.target.value)}
                      className={`w-full border rounded-2xl px-3.5 py-2 text-xs transition-colors focus:outline-none focus:border-[#A8E635] ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#090B0E] border-white/10 text-white'
                      }`}
                    />
                  </div>

                  {/* Actif */}
                  <div className="space-y-1">
                    <label className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Actif</label>
                    <CustomSelect
                      value={selectedTest.active ? 'Oui' : 'Non'}
                      onChange={(val) => updateSelectedTestField('active', val === 'Oui')}
                      options={[
                        { value: 'Oui', label: 'Oui' },
                        { value: 'Non', label: 'Non' },
                      ]}
                      theme={theme}
                    />
                  </div>

                  {/* Pack auto (métier) */}
                  <div className="space-y-1">
                    <label className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Pack auto (métier)</label>
                    <CustomSelect
                      value={selectedTest.pack}
                      onChange={(val) => updateSelectedTestField('pack', val)}
                      options={[
                        { value: 'pack fullstack', label: 'Développement full stack' },
                        { value: 'pack ia_automation', label: 'IA & automatisation' },
                        { value: 'pack marketing', label: 'Marketing digital' },
                        { value: 'pack nocode', label: 'No-code' },
                        { value: 'transverse', label: '— Transverse —' },
                      ]}
                      theme={theme}
                    />
                  </div>

                  {/* Duration or Platform */}
                  {selectedTest.type === 'externe' ? (
                    <div className="space-y-1">
                      <label className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Plateforme</label>
                      <CustomSelect
                        value={selectedTest.platform || 'Maki'}
                        onChange={(val) => updateSelectedTestField('platform', val)}
                        options={[
                          { value: 'Maki', label: 'Maki' },
                          { value: 'Gorilla', label: 'TestGorilla' },
                          { value: 'HackerRank', label: 'HackerRank' },
                          { value: 'Autre', label: 'Autre plateforme' },
                        ]}
                        theme={theme}
                      />
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <label className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Durée (s)</label>
                      <input
                        type="number"
                        value={selectedTest.duration}
                        onChange={(e) => updateSelectedTestField('duration', Number(e.target.value))}
                        className={`w-full border rounded-2xl px-3.5 py-2 text-xs transition-colors focus:outline-none focus:border-[#A8E635] ${
                          isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#090B0E] border-white/10 text-white'
                        }`}
                      />
                    </div>
                  )}

                  {/* Nb Questions or URL */}
                  {selectedTest.type === 'externe' ? (
                    <div className="space-y-1 md:col-span-2">
                      <label className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>URL d'accès au test</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={selectedTest.url || ''}
                          onChange={(e) => updateSelectedTestField('url', e.target.value)}
                          className={`w-full border rounded-2xl px-3.5 py-2 text-xs transition-colors focus:outline-none focus:border-[#A8E635] ${
                            isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#090B0E] border-white/10 text-white'
                          }`}
                        />
                        {selectedTest.url && (
                          <a
                            href={selectedTest.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`p-2 border rounded-xl transition-colors shrink-0 ${
                              isLight
                                ? 'bg-slate-50 border-slate-200 hover:bg-[#A8E635] hover:text-[#0B0D10] text-slate-500'
                                : 'bg-white/5 border-white/10 hover:bg-[#A8E635] hover:text-[#0B0D10] text-[#98A2B3]'
                            }`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-1">
                        <label className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Nb questions requises</label>
                        <input
                          type="number"
                          value={selectedTest.totalQuestionsNeeded}
                          onChange={(e) =>
                            updateSelectedTestField('totalQuestionsNeeded', Number(e.target.value))
                          }
                          className={`w-full border rounded-2xl px-3.5 py-2 text-xs transition-colors focus:outline-none focus:border-[#A8E635] ${
                            isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#090B0E] border-white/10 text-white'
                          }`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Seuil de réussite (%)</label>
                        <input
                          type="number"
                          placeholder="Ex: 70"
                          value={selectedTest.passThreshold || ''}
                          onChange={(e) => updateSelectedTestField('passThreshold', Number(e.target.value))}
                          className={`w-full border rounded-2xl px-3.5 py-2 text-xs transition-colors focus:outline-none focus:border-[#A8E635] ${
                            isLight ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400' : 'bg-[#090B0E] border-white/10 text-white placeholder-[#98A2B3]'
                          }`}
                        />
                      </div>
                    </>
                  )}

                  {/* Retentative (jours) */}
                  <div className="space-y-1">
                    <label className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Retentative (jours)</label>
                    <input
                      type="number"
                      value={selectedTest.retryDays}
                      onChange={(e) => updateSelectedTestField('retryDays', Number(e.target.value))}
                      className={`w-full border rounded-2xl px-3.5 py-2 text-xs transition-colors focus:outline-none focus:border-[#A8E635] ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#090B0E] border-white/10 text-white'
                      }`}
                    />
                  </div>

                  {/* Consignes Textarea */}
                  <div className="space-y-1 md:col-span-2">
                    <label className={`text-xs font-bold ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>Consignes</label>
                    <textarea
                      rows={3}
                      value={selectedTest.consignes}
                      onChange={(e) => updateSelectedTestField('consignes', e.target.value)}
                      className={`w-full border rounded-2xl p-3 text-xs resize-none transition-colors focus:outline-none focus:border-[#A8E635] ${
                        isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#090B0E] border-white/10 text-white'
                      }`}
                    ></textarea>
                  </div>
                </div>

                {/* Save Action */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handleSaveTest}
                    className={`px-5 py-2.5 rounded-full text-xs font-black transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                      isLight
                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                        : 'bg-white text-[#0B0D10] hover:bg-white/90'
                    }`}
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Enregistrer les modifications</span>
                  </button>

                  {savedNotification && (
                    <span className={`text-xs font-bold flex items-center gap-1 animate-pulse ${isLight ? 'text-emerald-600' : 'text-white'}`}>
                      <Check className="w-4 h-4" />
                      Modifications enregistrées !
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: QUESTION BANK */}
            {activeDetailTab === 'questions' && selectedTest.type === 'interne' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-2">
                  <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-[#98A2B3]'}`}>
                    Gérez les questions actives et désactivées pour ce test ({selectedTest.questions.length} questions)
                  </p>

                  <button
                    onClick={() => setShowNewQuestionModal(true)}
                    className={`px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900'
                        : 'bg-white/10 border-white/15 hover:bg-white hover:text-[#0B0D10] text-white'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Ajouter</span>
                  </button>
                </div>

                {/* Questions List */}
                <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1 no-scrollbar">
                  {selectedTest.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isLight ? 'bg-slate-50 border-slate-100 hover:border-slate-200' : 'bg-[#090B0E]/80 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                              q.active
                                ? isLight
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-white/20 text-white border-white/30'
                                : isLight
                                  ? 'bg-slate-100 text-slate-400 border-slate-200/80'
                                  : 'bg-white/5 text-[#98A2B3] border-white/10'
                            }`}
                          >
                            {q.active ? 'Active' : 'Désactivée'}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${
                            isLight ? 'bg-slate-100 text-slate-500 border-slate-200/50' : 'bg-white/5 text-[#98A2B3] border-white/10'
                          }`}>
                            {q.tag}
                          </span>
                        </div>
                        <div className={`text-xs font-extrabold ${isLight ? 'text-slate-800' : 'text-white'}`}>{q.text}</div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => toggleQuestionStatus(q.id)}
                          className={`px-3 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                            q.active
                              ? isLight
                                ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-200'
                                : 'bg-red-500/15 text-red-300 border-red-500/30 hover:bg-red-500/30'
                              : isLight
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                                : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                          }`}
                        >
                          {q.active ? 'Désactiver' : 'Activer'}
                        </button>
                      </div>
                    </div>
                  ))}

                  {selectedTest.questions.length === 0 && (
                    <div className={`text-center py-8 text-xs border border-dashed rounded-2xl ${
                      isLight ? 'text-slate-400 border-slate-200' : 'text-[#98A2B3] border-white/10'
                    }`}>
                      Aucune question pour ce test. Cliquez sur "+ Ajouter" pour insérer une question.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL 1: NEW TEST CREATION */}
      {showNewTestModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12151C] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">Créer un test</h3>
                <p className="text-xs text-[#98A2B3] mt-0.5">
                  Configurez le nouveau test à ajouter au catalogue
                </p>
              </div>
              <button
                onClick={() => setShowNewTestModal(false)}
                className="p-1.5 rounded-full text-[#98A2B3] hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Titre */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#98A2B3] block">Titre</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Développement full stack"
                    value={newTestTitle}
                    onChange={(e) => setNewTestTitle(e.target.value)}
                    className="w-full bg-[#090B0E] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder-[#98A2B3] focus:outline-none focus:border-[#A8E635]"
                  />
                </div>

                {/* Type */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#98A2B3] block">Type</label>
                  <CustomSelect
                    value={newTestType}
                    onChange={(val) => setNewTestType(val as any)}
                    options={[
                      { value: 'interne', label: 'Interne (QCM Unitgrowth)' },
                      { value: 'externe', label: 'Externe (lien plateforme)' },
                    ]}
                  />
                </div>

                {/* Pack auto à l'inscription (métier) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#98A2B3] block">
                    Pack auto à l'inscription (métier)
                  </label>
                  <CustomSelect
                    value={newTestPack}
                    onChange={(val) => setNewTestPack(val)}
                    options={[
                      {
                        value: '— Transverse (tous les candidats) —',
                        label: '— Transverse (tous les candidats) —',
                      },
                      { value: 'Chef de projet', label: 'Chef de projet' },
                      { value: 'Développement full stack', label: 'Développement full stack' },
                      { value: 'IA & automatisation', label: 'IA & automatisation' },
                      { value: 'Marketing digital', label: 'Marketing digital' },
                      { value: 'No-code', label: 'No-code' },
                    ]}
                  />
                </div>

                {/* Durée (s) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#98A2B3] block">Durée (s)</label>
                  <input
                    type="number"
                    value={newTestDuration}
                    onChange={(e) => setNewTestDuration(Number(e.target.value))}
                    className="w-full bg-[#090B0E] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#A8E635]"
                  />
                </div>

                {/* Nb questions or URL */}
                {newTestType === 'interne' ? (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#98A2B3] block">
                      Nb questions
                    </label>
                    <input
                      type="number"
                      value={newTestQuestionsNeeded}
                      onChange={(e) => setNewTestQuestionsNeeded(Number(e.target.value))}
                      className="w-full bg-[#090B0E] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#A8E635]"
                    />
                  </div>
                ) : (
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-[#98A2B3] block">
                      URL du test (Maki, Gorilla, etc.)
                    </label>
                    <input
                      type="url"
                      placeholder="https://app.maki-people.com/..."
                      value={newTestUrl}
                      onChange={(e) => setNewTestUrl(e.target.value)}
                      className="w-full bg-[#090B0E] border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white placeholder-[#98A2B3] focus:outline-none focus:border-[#A8E635]"
                    />
                  </div>
                )}
              </div>

              {/* Consignes candidat */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#98A2B3] block">
                  Consignes candidat
                </label>
                <textarea
                  rows={3}
                  placeholder="Consignes affichées au candidat avant de démarrer le test..."
                  value={newTestConsignes}
                  onChange={(e) => setNewTestConsignes(e.target.value)}
                  className="w-full bg-[#090B0E] border border-white/10 rounded-2xl p-3.5 text-xs text-white placeholder-[#98A2B3] focus:outline-none focus:border-[#A8E635] resize-none"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewTestModal(false)}
                  className="px-5 py-2.5 rounded-full border border-white/10 text-xs font-bold text-[#98A2B3] hover:text-white transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-white text-[#0B0D10] text-xs font-black hover:bg-white/90 transition-all shadow-lg shadow-white/10 cursor-pointer"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: NEW QUESTION CREATION */}
      {showNewQuestionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12151C] border border-white/15 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-base font-black text-white">Ajouter une question</h3>
              <button
                onClick={() => setShowNewQuestionModal(false)}
                className="p-1 rounded-full text-[#98A2B3] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#98A2B3] block mb-1">
                  Intitulé de la question
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Intitulé exact de la question QCM..."
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full bg-[#090B0E] border border-white/10 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-[#A8E635] resize-none"
                ></textarea>
              </div>

              <div>
                <label className="text-xs font-bold text-[#98A2B3] block mb-1">Catégorie / Tag</label>
                <input
                  type="text"
                  placeholder="Ex: API REST, Security, SQL..."
                  value={newQuestionTag}
                  onChange={(e) => setNewQuestionTag(e.target.value)}
                  className="w-full bg-[#090B0E] border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#A8E635]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewQuestionModal(false)}
                  className="px-4 py-2 rounded-full border border-white/10 text-xs text-[#98A2B3] hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-white text-[#0B0D10] text-xs font-black hover:bg-white/90"
                >
                  Ajouter la question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
