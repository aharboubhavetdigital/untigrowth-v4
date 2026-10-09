import React, { useState } from 'react';
import { CustomSelect } from './CustomSelect';
import {
  Search,
  UserPlus,
  Shield,
  ShieldCheck,
  CheckSquare,
  Square,
  X,
  Check,
  Edit2,
  Lock,
  Mail,
  User,
  AlertCircle,
  Key,
} from 'lucide-react';

export interface ModuleOption {
  id: string;
  title: string;
  description: string;
}

export const ALL_MODULES: ModuleOption[] = [
  {
    id: 'dashboard',
    title: 'Dashboard & indicateurs',
    description: "Voir les KPIs, l'entonnoir et l'activité.",
  },
  {
    id: 'vivier',
    title: 'Vivier de talents',
    description: 'Consulter et filtrer les profils freelances.',
  },
  {
    id: 'validation_metier',
    title: 'Validation métier',
    description: 'Valider techniquement un candidat après le test IA.',
  },
  {
    id: 'tests_ia',
    title: 'Tests IA (banque & paramètres)',
    description: 'Guider les tests : questions, consignes, durée, seuil, retentative par métier.',
  },
  {
    id: 'validation_finale',
    title: 'Validation finale',
    description: 'Valider définitivement un profil dans le vivier.',
  },
  {
    id: 'suspension',
    title: 'Suspension / réactivation',
    description: 'Suspendre ou réactiver un profil freelance.',
  },
  {
    id: 'offres',
    title: 'Offres de mission',
    description: 'Créer, publier et suivre les offres ouvertes ou ciblées.',
  },
  {
    id: 'selection_contrat',
    title: 'Sélection & contractualisation',
    description: 'Retenir un candidat et créer le contrat.',
  },
  {
    id: 'contrats',
    title: 'Contrats',
    description: 'Consulter, signer et clore les contrats.',
  },
  {
    id: 'missions',
    title: 'Missions',
    description: "Suivre l'avancement et valider les livrables.",
  },
  {
    id: 'factures_consultation',
    title: 'Factures (consultation)',
    description: 'Voir les factures déposées par les freelances.',
  },
  {
    id: 'validation_factures',
    title: 'Validation des factures',
    description: 'Valider ou retourner une facture.',
  },
  {
    id: 'declaration_paiement',
    title: 'Déclaration de paiement',
    description: 'Marquer un paiement comme exécuté hors plateforme.',
  },
];

export interface InternalAccount {
  id: string;
  name: string;
  email: string;
  role: 'SUPER ADMINISTRATEUR' | 'RESPONSABLE';
  isSuperAdmin: boolean;
  isActive: boolean;
  modules: string[]; // module titles or IDs
}

export const initialAccounts: InternalAccount[] = [
  {
    id: 'acc-1',
    name: 'Super Admin',
    email: 'superadmin@iaweb.dev',
    role: 'SUPER ADMINISTRATEUR',
    isSuperAdmin: true,
    isActive: true,
    modules: ALL_MODULES.map((m) => m.title),
  },
  {
    id: 'acc-2',
    name: 'Direction',
    email: 'direction@iaweb.dev',
    role: 'RESPONSABLE',
    isSuperAdmin: false,
    isActive: true,
    modules: [
      'Dashboard & indicateurs',
      'Vivier de talents',
      'Offres de mission',
      'Contrats',
      'Missions',
      'Factures (consultation)',
      'Validation des factures',
    ],
  },
  {
    id: 'acc-3',
    name: 'Responsable Commercial',
    email: 'commercial@iaweb.dev',
    role: 'RESPONSABLE',
    isSuperAdmin: false,
    isActive: true,
    modules: [
      'Dashboard & indicateurs',
      'Vivier de talents',
      'Offres de mission',
      'Sélection & contractualisation',
      'Contrats',
      'Missions',
      'Factures (consultation)',
    ],
  },
  {
    id: 'acc-4',
    name: 'Responsable Finance',
    email: 'finance@iaweb.dev',
    role: 'RESPONSABLE',
    isSuperAdmin: false,
    isActive: true,
    modules: [
      'Dashboard & indicateurs',
      'Factures (consultation)',
      'Validation des factures',
      'Déclaration de paiement',
    ],
  },
  {
    id: 'acc-5',
    name: 'Responsable Métier',
    email: 'metier@iaweb.dev',
    role: 'RESPONSABLE',
    isSuperAdmin: false,
    isActive: true,
    modules: [
      'Dashboard & indicateurs',
      'Vivier de talents',
      'Validation métier',
      'Tests IA (banque & paramètres)',
    ],
  },
];

export const EquipeView: React.FC = () => {
  const [accounts, setAccounts] = useState<InternalAccount[]>(initialAccounts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mode: 'list' | 'create' | 'edit'
  const [viewMode, setViewMode] = useState<'list' | 'create' | 'edit'>('list');
  const [editingAccount, setEditingAccount] = useState<InternalAccount | null>(null);

  // Form states for Create/Edit
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formSelectedModules, setFormSelectedModules] = useState<string[]>([]);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formIsSuperAdmin, setFormIsSuperAdmin] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'Tous les comptes' },
    { value: 'actifs', label: 'Actifs' },
    { value: 'inactifs', label: 'Inactifs' },
  ];

  // Filter accounts
  const filteredAccounts = accounts.filter((acc) => {
    if (statusFilter === 'actifs' && !acc.isActive) return false;
    if (statusFilter === 'inactifs' && acc.isActive) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = acc.name.toLowerCase().includes(q);
      const matchEmail = acc.email.toLowerCase().includes(q);
      if (!matchName && !matchEmail) return false;
    }

    return true;
  });

  // Open Create Form
  const handleOpenCreate = () => {
    setFormName('');
    setFormEmail('');
    setFormPassword('');
    setFormSelectedModules([]);
    setFormIsActive(true);
    setFormIsSuperAdmin(false);
    setEditingAccount(null);
    setViewMode('create');
  };

  // Open Edit Form
  const handleOpenEdit = (acc: InternalAccount) => {
    setEditingAccount(acc);
    setFormName(acc.name);
    setFormEmail(acc.email);
    setFormPassword('');
    setFormSelectedModules(acc.modules);
    setFormIsActive(acc.isActive);
    setFormIsSuperAdmin(acc.isSuperAdmin || false);
    setViewMode('edit');
  };

  // Toggle module selection
  const handleToggleModule = (moduleTitle: string) => {
    setFormSelectedModules((prev) =>
      prev.includes(moduleTitle)
        ? prev.filter((m) => m !== moduleTitle)
        : [...prev, moduleTitle]
    );
  };

  // Save Create
  const handleSaveCreate = () => {
    if (!formName.trim() || !formEmail.trim()) {
      alert('Veuillez remplir le nom et l’adresse email.');
      return;
    }

    const newAcc: InternalAccount = {
      id: `acc-${Date.now()}`,
      name: formName.trim(),
      email: formEmail.trim(),
      role: formIsSuperAdmin ? 'SUPER ADMINISTRATEUR' : 'RESPONSABLE',
      isSuperAdmin: formIsSuperAdmin,
      isActive: formIsActive,
      modules: formIsSuperAdmin ? ALL_MODULES.map((m) => m.title) : formSelectedModules,
    };

    setAccounts((prev) => [...prev, newAcc]);
    setViewMode('list');
  };

  // Save Edit
  const handleSaveEdit = () => {
    if (!editingAccount) return;
    if (!formName.trim() || !formEmail.trim()) {
      alert('Veuillez remplir le nom et l’adresse email.');
      return;
    }

    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === editingAccount.id
          ? {
              ...acc,
              name: formName.trim(),
              email: formEmail.trim(),
              isActive: formIsActive,
              modules: formIsSuperAdmin ? ALL_MODULES.map(m => m.title) : formSelectedModules,
              role: formIsSuperAdmin ? 'SUPER ADMINISTRATEUR' : 'RESPONSABLE',
              isSuperAdmin: formIsSuperAdmin,
            }
          : acc
      )
    );
    setViewMode('list');
    setEditingAccount(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>Équipe & permissions</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#98A2B3] mt-1 font-medium">
            Créez des comptes responsables et accordez-leur uniquement les modules souhaités. Le super admin conserve l'accès à tout.
          </p>
        </div>

        {viewMode === 'list' && (
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-full bg-[#A8E635] hover:bg-[#b8f042] active:bg-[#97cf2e] text-[#090B0E] text-xs font-black transition-all shadow-lg shadow-[#A8E635]/20 cursor-pointer active:scale-95 flex items-center justify-center gap-2 shrink-0"
          >
            <UserPlus className="w-4 h-4 text-[#090B0E]" />
            <span>Nouveau compte</span>
          </button>
        )}
      </div>

      {/* ================= VIEW MODE 1: LIST ACCOUNTS ================= */}
      {viewMode === 'list' && (
        <div className="bg-[#12151C] p-6 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          <h3 className="text-base font-black text-white tracking-tight">
            Comptes internes
          </h3>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nom, e-mail..."
                className="w-full bg-[#090B0E] border border-white/10 focus:border-[#A8E635] focus:ring-1 focus:ring-[#A8E635] text-white placeholder-[#98A2B3] text-xs rounded-2xl pl-10 pr-10 py-2.5 outline-none transition-all"
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

            <div className="md:col-span-4">
              <CustomSelect
                value={statusFilter}
                onChange={setStatusFilter}
                options={filterOptions}
              />
            </div>
          </div>

          {/* Counter info */}
          <div className="text-xs text-[#98A2B3] font-medium px-1">
            {filteredAccounts.length} résultat(s)
          </div>

          {/* Accounts Cards List */}
          <div className="space-y-3">
            {filteredAccounts.map((account) => (
              <div
                key={account.id}
                className="bg-[#090B0E] rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                {/* Account Details */}
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h4 className="text-sm font-black text-white">
                      {account.name}
                    </h4>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        account.isSuperAdmin
                          ? 'bg-white/10 border-white/20 text-slate-300'
                          : 'bg-white/10 border-white/20 text-white'
                      }`}
                    >
                      {account.role}
                    </span>
                    {!account.isActive && (
                      <span className="text-[10px] font-bold bg-rose-500/10 border border-rose-500/30 text-rose-400 px-2 py-0.5 rounded-full">
                        Compte inactif
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-mono text-[#98A2B3]">
                    {account.email}
                  </p>

                  {/* Modules or Super Admin access text */}
                  {account.isSuperAdmin ? (
                    <p className="text-xs font-semibold text-[#A8E635] pt-1">
                      Accès total à tous les modules
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {account.modules.map((modTitle, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white text-[11px] font-medium"
                        >
                          {modTitle}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Action Button */}
                <div className="shrink-0 pt-2 md:pt-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(account)}
                    className="w-full md:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/20 active:scale-95 border border-white/10 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Modifier</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= VIEW MODE 2: CRÉER UN COMPTE ================= */}
      {viewMode === 'create' && (
        <div className="bg-[#12151C] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          <h3 className="text-base font-black text-white tracking-tight">
            Créer un compte
          </h3>

          <div className="space-y-4">
            {/* Input: Role (Super Admin or not) */}
            <div className="pb-2 border-b border-white/10">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formIsSuperAdmin}
                  onChange={(e) => {
                    setFormIsSuperAdmin(e.target.checked);
                    if (e.target.checked) setFormSelectedModules(ALL_MODULES.map(m => m.title));
                  }}
                  className="rounded border-white/20 text-[#A8E635] focus:ring-0 cursor-pointer accent-[#A8E635]"
                />
                <span className="text-xs font-bold text-white">Créer en tant que Super Administrateur (Accès total)</span>
              </label>
            </div>
            {/* Inputs: Nom & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#98A2B3] mb-1.5">
                  Nom
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="ex: Direction Commerciale"
                  className="w-full bg-[#090B0E] border border-white/10 focus:border-[#A8E635] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#98A2B3] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="ex: direction@iaweb.dev"
                  className="w-full bg-[#090B0E] border border-white/10 focus:border-[#A8E635] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all"
                />
              </div>
            </div>

            {/* Input: Password */}
            <div>
              <label className="block text-xs font-bold text-[#98A2B3] mb-1.5">
                Mot de passe
              </label>
              <input
                type="password"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                placeholder="8 caractères min."
                className="w-full bg-[#090B0E] border border-white/10 focus:border-[#A8E635] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all"
              />
            </div>

            {/* Modules accordés Section */}
            {!formIsSuperAdmin && (
              <div className="pt-2 space-y-3">
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Modules accordés
                  </h4>
                  <p className="text-[11px] text-[#98A2B3] mt-0.5">
                    Chaque case correspond à une action / un écran de la plateforme.
                  </p>
                </div>

                {/* Modules Grid Checkboxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ALL_MODULES.map((mod) => {
                    const isChecked = formSelectedModules.includes(mod.title);
                    return (
                      <div
                        key={mod.id}
                        onClick={() => handleToggleModule(mod.title)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isChecked
                            ? 'bg-[#A8E635]/10 border-[#A8E635]/50 shadow-sm'
                            : 'bg-[#090B0E] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent onClick
                          className="mt-0.5 rounded border-white/20 text-[#A8E635] focus:ring-0 cursor-pointer accent-[#A8E635]"
                        />
                        <div className="space-y-0.5">
                          <h5 className="text-xs font-bold text-white">
                            {mod.title}
                          </h5>
                          <p className="text-[11px] text-[#98A2B3] leading-snug">
                            {mod.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={handleSaveCreate}
              className="px-6 py-2.5 rounded-full bg-[#A8E635] hover:bg-[#b8f042] active:bg-[#97cf2e] text-[#090B0E] text-xs font-black transition-all shadow-md shadow-[#A8E635]/20 cursor-pointer active:scale-95"
            >
              Créer le compte
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* ================= VIEW MODE 3: MODIFIER RESPONSABLE ================= */}
      {viewMode === 'edit' && editingAccount && (
        <div className="bg-[#12151C] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          <h3 className="text-base font-black text-white tracking-tight">
            Modifier — {editingAccount.name}
          </h3>

          <div className="space-y-4">
            {/* Input: Role (Super Admin or not) */}
            <div className="pb-2 border-b border-white/10">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formIsSuperAdmin}
                  onChange={(e) => {
                    setFormIsSuperAdmin(e.target.checked);
                    if (e.target.checked) setFormSelectedModules(ALL_MODULES.map(m => m.title));
                  }}
                  className="rounded border-white/20 text-[#A8E635] focus:ring-0 cursor-pointer accent-[#A8E635]"
                />
                <span className="text-xs font-bold text-white">Changer en Super Administrateur (Accès total)</span>
              </label>
            </div>
            {/* Inputs: Nom & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#98A2B3] mb-1.5">
                  Nom
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-[#090B0E] border border-white/10 focus:border-[#A8E635] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#98A2B3] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-[#090B0E] border border-white/10 focus:border-[#A8E635] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all"
                />
              </div>
            </div>

            {/* Input: Password optional */}
            <div>
              <label className="block text-xs font-bold text-[#98A2B3] mb-1.5">
                Nouveau mot de passe (optionnel)
              </label>
              <input
                type="password"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                placeholder="Laisser vide pour ne pas changer"
                className="w-full bg-[#090B0E] border border-white/10 focus:border-[#A8E635] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition-all"
              />
            </div>

            {/* Modules accordés Section */}
            {!formIsSuperAdmin && (
              <div className="pt-2 space-y-3">
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Modules accordés
                  </h4>
                <p className="text-[11px] text-[#98A2B3] mt-0.5">
                  Chaque case correspond à une action / un écran de la plateforme.
                </p>
              </div>

              {/* Modules Grid Checkboxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ALL_MODULES.map((mod) => {
                  const isChecked = formSelectedModules.includes(mod.title);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => handleToggleModule(mod.title)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-[#A8E635]/10 border-[#A8E635]/50 shadow-sm'
                          : 'bg-[#090B0E] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by parent onClick
                        className="mt-0.5 rounded border-white/20 text-[#A8E635] focus:ring-0 cursor-pointer accent-[#A8E635]"
                      />
                      <div className="space-y-0.5">
                        <h5 className="text-xs font-bold text-white">
                          {mod.title}
                        </h5>
                        <p className="text-[11px] text-[#98A2B3] leading-snug">
                          {mod.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            )}

            {/* Active Account Checkbox */}
            <div className="pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formIsActive}
                  onChange={(e) => setFormIsActive(e.target.checked)}
                  className="rounded border-white/20 text-[#A8E635] focus:ring-0 cursor-pointer accent-[#A8E635]"
                />
                <span className="text-xs font-bold text-white">Compte actif</span>
              </label>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={handleSaveEdit}
              className="px-6 py-2.5 rounded-full bg-[#A8E635] hover:bg-[#b8f042] active:bg-[#97cf2e] text-[#090B0E] text-xs font-black transition-all shadow-md shadow-[#A8E635]/20 cursor-pointer active:scale-95"
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('list');
                setEditingAccount(null);
              }}
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all cursor-pointer"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
