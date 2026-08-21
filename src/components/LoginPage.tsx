import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Mail, Lock, ArrowRight, CheckCircle2, ShieldCheck, Briefcase } from 'lucide-react';
import { UnitGrowthLogo } from './UnitGrowthLogo';

interface LoginPageProps {
  onBack: () => void;
  onNavigateToDashboard?: (role: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBack, onNavigateToDashboard }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Super administrateur');

  const demoRoles = [
    {
      id: 'super-admin',
      title: 'Super administrateur',
      email: 'admin@unitgrowth.app',
      roleName: 'Super administrateur',
      icon: ShieldCheck,
    },
    {
      id: 'responsable',
      title: 'Responsable',
      email: 'responsable@unitgrowth.app',
      roleName: 'Responsable',
      icon: Briefcase,
    },
    {
      id: 'freelance',
      title: 'Freelance',
      email: 'freelance@unitgrowth.app',
      roleName: 'Freelance',
      icon: User,
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoggedIn(true);
    if (onNavigateToDashboard) {
      onNavigateToDashboard(selectedRole || 'Super administrateur');
    }
  };

  const handleSelectRole = (role: typeof demoRoles[0]) => {
    setEmail(role.email);
    setPassword('demopassword123');
    setSelectedRole(role.roleName);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between selection:bg-white selection:text-[#101214] pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Full-bleed cinematic video background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
            type="video/mp4"
          />
        </video>

        {/* Cinematic Fade Overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom,
                rgba(5,5,5,0.5) 0%,
                rgba(5,5,5,0.2) 40%,
                rgba(5,5,5,0) 78.8%,
                rgba(5,5,5,0.23) 79.6%,
                rgba(5,5,5,0.45) 81.4%,
                rgba(5,5,5,0.75) 83.3%,
                rgba(5,5,5,0.84) 85.2%,
                rgba(5,5,5,0.888) 88%,
                rgba(5,5,5,0.905) 91%,
                rgba(5,5,5,0.96) 95%,
                #050505 100%),
              linear-gradient(to right,
                #050505 0%,
                rgba(5,5,5,0.6) 15%,
                rgba(5,5,5,0.2) 50%,
                rgba(5,5,5,0.6) 85%,
                #050505 100%)
            `,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
        {/* Top Back Navigation */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#13161C] border border-white/20 text-white hover:bg-white hover:text-[#101214] transition-all duration-200 text-sm font-semibold cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero / Brand info */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Accédez à votre espace <span className="text-white underline decoration-white/40">Unitgrowth</span>
            </h1>

            <p className="text-sm sm:text-base text-[#98A2B3] leading-relaxed max-w-lg">
              Connectez-vous pour piloter vos missions, suivre vos validations, gérer vos contrats et collaborer avec les meilleurs talents du vivier qualifié.
            </p>

            {/* Demo Roles Quick Select */}
            <div className="pt-2 space-y-3">
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#98A2B3]">
                COMPTES DE DÉMONSTRATION (N'IMPORTE QUEL MOT DE PASSE)
              </p>
              <div className="flex flex-wrap gap-2.5">
                {demoRoles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.roleName;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleSelectRole(role)}
                      className={`px-4 py-2.5 rounded-full border text-xs font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-md ${
                        isSelected
                          ? 'bg-white text-[#101214] border-white'
                          : 'bg-[#13161C] text-white/90 border-white/20 hover:border-white/50 hover:bg-white/10'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#101214]' : 'text-white'}`} />
                      <span>{role.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>


          </div>

          {/* Right Login Form Card */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#13161C]/80 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden"
            >
              {loggedIn ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 bg-white/10 border border-white/30 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Connexion réussie !</h3>
                    <p className="text-sm text-[#98A2B3]">
                      Bienvenue dans votre espace <span className="font-semibold text-white">{selectedRole || 'Espace Membre'}</span> ({email}).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0B0D10] border border-white/10 text-xs text-[#98A2B3] text-left space-y-1">
                    <div className="text-white font-semibold">Session active sécurisée</div>
                    <div>• Rôle : {selectedRole || 'Utilisateur'}</div>
                    <div>• Chiffrement SSL bout en bout actif</div>
                  </div>
                  <div className="flex gap-3 justify-center pt-2">
                    <button
                      onClick={() => setLoggedIn(false)}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer border border-white/20"
                    >
                      Se déconnecter
                    </button>
                    <button
                      onClick={() => {
                        if (onNavigateToDashboard) {
                          onNavigateToDashboard(selectedRole || 'Super administrateur');
                        } else {
                          onBack();
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#A8E635] text-[#0B0D10] text-xs font-black transition-all hover:bg-[#b8f042] active:scale-95 cursor-pointer shadow-lg shadow-[#A8E635]/25"
                    >
                      Accéder au tableau de bord
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                      Connexion
                    </h3>
                    <p className="text-xs sm:text-sm text-[#98A2B3]">
                      Entrez vos identifiants ou utilisez un compte de démo rapide ci-contre.
                    </p>
                  </div>

                  {selectedRole && (
                    <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-xs text-white flex items-center justify-between">
                      <span>Rôle sélectionné : <strong className="text-white font-bold">{selectedRole}</strong></span>
                      <button
                        type="button"
                        onClick={() => setSelectedRole('')}
                        className="text-xs text-white/70 hover:text-white underline cursor-pointer"
                      >
                        Effacer
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-white mb-1.5">
                        Adresse Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          required
                          placeholder="vous@exemple.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-[#0B0D10] border border-white/20 rounded-xl text-sm text-white placeholder-[#98A2B3]/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white mb-1.5">
                        Mot de passe
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#98A2B3] absolute left-3.5 top-3.5" />
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-[#0B0D10] border border-white/20 rounded-xl text-sm text-white placeholder-[#98A2B3]/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all shadow-inner"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#A8E635] text-[#0B0D10] font-black text-sm hover:bg-[#b8f042] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-[#A8E635]/20"
                  >
                    <span>Se connecter à Unitgrowth</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-2 border-t border-white/10">
                    <p className="text-xs text-[#98A2B3]">
                      Vous êtes freelance ?{' '}
                      <button
                        type="button"
                        onClick={onBack}
                        className="text-white font-semibold hover:underline cursor-pointer ml-1"
                      >
                        Rejoindre le vivier
                      </button>
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
