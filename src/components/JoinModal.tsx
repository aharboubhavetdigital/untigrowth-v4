import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, Sparkles, User, Mail, MapPin, Briefcase, FileCode2 } from 'lucide-react';
import { UnitGrowthIcon } from './UnitGrowthLogo';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: 'Maroc',
    expertise: 'Développement Full Stack',
    experience: '3-5 ans',
    availability: 'Immédiate',
    portfolioUrl: '',
    motivation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0D10]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-2xl bg-[#15181D] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-white/10 bg-[#0B0D10]/50">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5 shrink-0 mt-0.5">
                <UnitGrowthIcon className="w-full h-full" theme="dark" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#A8E635]/20 text-[#A8E635] border border-[#A8E635]/30">
                    <Sparkles className="w-3 h-3 text-[#A8E635]" />
                    Recrutement Vivier
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">Rejoindre le vivier UnitGrowth</h3>
                <p className="text-sm text-[#98A2B3]">Postulez pour intégrer le Private Talent Cloud de IAweb.dev</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-[#98A2B3] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 bg-[#A8E635]/20 text-[#A8E635] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[#32D583]" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2">Candidature reçue !</h4>
                <p className="text-[#98A2B3] max-w-md mx-auto mb-6 text-sm sm:text-base">
                  Merci <span className="font-semibold text-white">{formData.fullName}</span>. Notre processus de qualification IA et d'évaluation humaine va analyser votre profil sous 48h.
                </p>
                <div className="p-4 bg-[#0B0D10] border border-white/10 rounded-xl text-left max-w-md mx-auto text-xs sm:text-sm text-[#98A2B3] mb-8 space-y-2">
                  <div className="flex justify-between">
                    <span>Métier :</span>
                    <span className="font-semibold text-white">{formData.expertise}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pays :</span>
                    <span className="font-semibold text-white">{formData.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prochaine étape :</span>
                    <span className="font-semibold text-[#A8E635]">Test d'évaluation IA</span>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-[#A8E635] text-[#101214] font-semibold rounded-xl hover:bg-[#98d42c] transition-all text-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  Fermer
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Nom complet *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#98A2B3] absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="Sofia Alami"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 bg-[#0B0D10] border border-white/10 rounded-xl text-sm text-white placeholder-[#98A2B3]/50 focus:outline-none focus:border-[#A8E635] focus:ring-1 focus:ring-[#A8E635] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Adresse Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#98A2B3] absolute left-3 top-3.5" />
                      <input
                        type="email"
                        required
                        placeholder="sofia@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 bg-[#0B0D10] border border-white/10 rounded-xl text-sm text-white placeholder-[#98A2B3]/50 focus:outline-none focus:border-[#A8E635] focus:ring-1 focus:ring-[#A8E635] transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Domaine d'expertise principal *
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-[#98A2B3] absolute left-3 top-3.5" />
                      <select
                        value={formData.expertise}
                        onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 bg-[#0B0D10] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#A8E635] transition-all appearance-none"
                      >
                        <option value="Développement Full Stack" className="bg-[#15181D]">Développement Full Stack</option>
                        <option value="IA & Automatisation" className="bg-[#15181D]">IA & Automatisation</option>
                        <option value="No-code / Low-code" className="bg-[#15181D]">No-code / Low-code</option>
                        <option value="Marketing Digital" className="bg-[#15181D]">Marketing Digital</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Pays de résidence *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#98A2B3] absolute left-3 top-3.5" />
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full pl-9 pr-4 py-2.5 bg-[#0B0D10] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#A8E635] transition-all appearance-none"
                      >
                        <option value="Maroc" className="bg-[#15181D]">Maroc</option>
                        <option value="Madagascar" className="bg-[#15181D]">Madagascar</option>
                        <option value="Autre" className="bg-[#15181D]">Autre Afrique / International</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Expérience professionnelle
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0B0D10] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#A8E635] transition-all"
                    >
                      <option value="1-3 ans" className="bg-[#15181D]">1 - 3 ans</option>
                      <option value="3-5 ans" className="bg-[#15181D]">3 - 5 ans</option>
                      <option value="5-8 ans" className="bg-[#15181D]">5 - 8 ans</option>
                      <option value="8+ ans" className="bg-[#15181D]">8+ ans (Senior/Expert)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white mb-1.5">
                      Disponibilité
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#0B0D10] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#A8E635] transition-all"
                    >
                      <option value="Immédiate" className="bg-[#15181D]">Immédiate (Temps plein)</option>
                      <option value="Sous 48h" className="bg-[#15181D]">Sous 48h</option>
                      <option value="Sous 1 à 2 semaines" className="bg-[#15181D]">Sous 1 à 2 semaines</option>
                      <option value="Partiel (Projets spécifiques)" className="bg-[#15181D]">Partiel / Soirs & Week-ends</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Lien Portfolio / LinkedIn / GitHub
                  </label>
                  <div className="relative">
                    <FileCode2 className="w-4 h-4 text-[#98A2B3] absolute left-3 top-3.5" />
                    <input
                      type="url"
                      placeholder="https://linkedin.in/in/votre-profil"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                      className="w-full pl-9 pr-4 py-2.5 bg-[#0B0D10] border border-white/10 rounded-xl text-sm text-white placeholder-[#98A2B3]/50 focus:outline-none focus:border-[#A8E635] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">
                    Spécialités & Technologies clés
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Laravel, React, Node.js, Agents IA, n8n, Tailwind, Docker..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#0B0D10] border border-white/10 rounded-xl text-sm text-white placeholder-[#98A2B3]/50 focus:outline-none focus:border-[#A8E635] transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#A8E635] hover:bg-[#98d42c] text-[#101214] font-bold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Soumettre ma candidature au vivier</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-[11px] text-center text-[#98A2B3] mt-2">
                    En soumettant, vous acceptez d'être évalué par les tests de qualification assistés par IA de UNITGROWTH.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
