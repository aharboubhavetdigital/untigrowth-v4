import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ZoomIn,
  ZoomOut,
  FileText,
  Printer,
  CheckCircle2,
  ShieldCheck,
  Upload,
  UploadCloud,
  X,
  FileCode,
  Image as ImageIcon,
  Check,
  RefreshCw,
} from 'lucide-react';

interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  address: string;
  ice: string;
  representative: string;
  representativeTitle: string;
}

interface FreelanceInfo {
  freelance?: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  legalStatus?: string;
  legalId?: string;
}

interface ContractPdfViewerProps {
  company: CompanyInfo;
  freelance: FreelanceInfo;
  contractTitle?: string;
  forfait?: string;
  client?: string;
  periode?: string;
  paymentTerms?: string;
  isSignedByFreelance?: boolean;
  freelanceSignatureDate?: string;
  freelanceSignatureUrl?: string;
  isSignedByCompany?: boolean;
  showImportButton?: boolean;
  theme?: 'dark' | 'light';
}

export const ContractPdfViewer: React.FC<ContractPdfViewerProps> = ({
  company,
  freelance,
  contractTitle = 'Mission Développement Web & Conseil',
  forfait = '12 500 EUR HT',
  client = 'HAVET Digital / Client Final',
  periode = 'Du 01/09/2026 au 30/11/2026',
  paymentTerms = 'Paiement à 30 jours fin de mois après validation du livrable.',
  isSignedByFreelance = false,
  freelanceSignatureDate,
  freelanceSignatureUrl,
  isSignedByCompany = true,
  showImportButton = true,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [uploadedContract, setUploadedContract] = useState<{
    fileName: string;
    fileSize: string;
    fileType: string;
    fileUrl: string;
    uploadDate: string;
  } | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalPages = 9;

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 15, 140));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 15, 75));

  const handlePrint = () => {
    window.print();
  };

  const processFile = (file: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

    setUploadedContract({
      fileName: file.name,
      fileSize: sizeInMb,
      fileType: ext,
      fileUrl: url,
      uploadDate: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const freelanceName = freelance.freelance || '<< Nom du Prestataire >>';
  const freelanceEmail = freelance.email || '<< Email du Prestataire >>';
  const freelancePhone = freelance.phone || '<< Téléphone >>';
  const freelanceAddress = freelance.address || '<< Adresse officielle >>';
  const freelanceStatus = freelance.legalStatus || 'Auto-entrepreneur';
  const freelanceId = freelance.legalId || '<< SIRET / ICE >>';

  return (
    <div className={`space-y-4 font-sans ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        className="hidden"
      />

      {/* Active Upload Banner (renders when a file is imported) */}
      {uploadedContract && (
        <div className={`p-4 border rounded-2xl flex flex-wrap items-center justify-between gap-3 transition-all ${
          isLight ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-emerald-500/10 border-emerald-500/30'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500 text-slate-950 rounded-xl font-bold shadow-md shrink-0">
              {['PNG', 'JPG', 'JPEG'].includes(uploadedContract.fileType) ? (
                <ImageIcon className="w-5 h-5" />
              ) : (
                <FileCode className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className={`text-xs font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {uploadedContract.fileName}
                </h4>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  isLight ? 'bg-emerald-200 text-emerald-800' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  Format {uploadedContract.fileType}
                </span>
              </div>
              <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'} pt-0.5`}>
                Taille : {uploadedContract.fileSize} · Importé le {uploadedContract.uploadDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-white/10 hover:bg-white/20 text-slate-200'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Changer de fichier</span>
            </button>
            <button
              onClick={() => setUploadedContract(null)}
              className="p-1.5 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
              title="Supprimer ce fichier importé"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Viewer Top Toolbar */}
      <div className={`rounded-2xl p-3 px-4 flex flex-wrap items-center justify-between gap-3 shadow-md border ${
        isLight
          ? 'bg-slate-100 border-slate-200 text-slate-900'
          : 'bg-slate-800 border-slate-700 text-white shadow-lg'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl border ${
            isLight ? 'bg-red-100/50 text-red-700 border-red-200' : 'bg-red-500/20 text-red-400 border-red-500/30'
          }`}>
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-xs font-bold tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {uploadedContract ? uploadedContract.fileName : 'CONTRAT-CADRE_FREELANCE_2026.pdf'}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {uploadedContract ? `Importé (${uploadedContract.fileType})` : 'Officiel 9 Pages'}
              </span>
            </div>
            <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {company.name} · Document contractuel conforme version 08/2026
            </p>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {!uploadedContract && (
            <div className={`flex items-center rounded-xl p-1 border text-xs ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-700'
            }`}>
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`p-1.5 disabled:opacity-30 rounded-lg transition-colors cursor-pointer ${
                  isLight ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-slate-800 text-slate-300'
                }`}
                title="Page précédente"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className={`px-3 font-mono font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Page {currentPage} / {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`p-1.5 disabled:opacity-30 rounded-lg transition-colors cursor-pointer ${
                  isLight ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-slate-800 text-slate-300'
                }`}
                title="Page suivante"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Zoom controls */}
          <div className={`hidden sm:flex items-center rounded-xl p-1 border text-xs ${
            isLight ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-slate-700'
          }`}>
            <button
              onClick={handleZoomOut}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isLight ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-slate-800 text-slate-300'
              }`}
              title="Dézoomer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className={`px-2 font-mono text-[11px] font-bold ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isLight ? 'hover:bg-slate-100 text-slate-600' : 'hover:bg-slate-800 text-slate-300'
              }`}
              title="Zoomer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            {showImportButton && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                  isLight ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200' : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
                }`}
                title="Importer un autre format"
              >
                <Upload className="w-3.5 h-3.5 text-[#A8E635]" />
                <span className="hidden sm:inline">Importer</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                isLight ? 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200' : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'
              }`}
            >
              <Printer className={`w-3.5 h-3.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`} />
              <span className="hidden md:inline">Imprimer</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger</span>
            </button>
          </div>
        </div>
      </div>

      {/* Page Selector Tabs / Toggle between Uploaded & Template */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none">
        {uploadedContract ? (
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Aperçu du fichier importé ({uploadedContract.fileType})
            </span>
            <button
              onClick={() => setUploadedContract(null)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' : 'bg-white/10 hover:bg-white/20 text-slate-200'
              }`}
            >
              Voir le modèle officiel 9 pages
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  currentPage === num
                    ? 'bg-[#A8E635] text-[#0B0D10] font-black shadow-md'
                    : isLight
                    ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400'
                }`}
              >
                Page {num}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PDF Document Paper Sheet Container */}
      <div className={`p-4 sm:p-8 rounded-2xl border overflow-x-auto flex justify-center shadow-inner ${
        isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-white/10'
      }`}>
        {uploadedContract ? (
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="bg-white text-slate-900 w-full max-w-[800px] min-h-[600px] shadow-2xl border border-slate-300 rounded-sm p-8 space-y-6 transition-all duration-200 relative font-sans text-xs text-center flex flex-col items-center justify-center"
          >
            {['PNG', 'JPG', 'JPEG'].includes(uploadedContract.fileType) ? (
              <div className="space-y-4 w-full">
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-lg p-2 bg-slate-50">
                  <img
                    src={uploadedContract.fileUrl}
                    alt={uploadedContract.fileName}
                    className="w-full h-auto object-contain max-h-[800px] rounded"
                  />
                </div>
                <p className="text-xs text-slate-500 font-bold">
                  {uploadedContract.fileName} · Image de contrat importée
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-w-md p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="w-16 h-16 rounded-2xl bg-[#A8E635]/20 text-[#0B0D10] flex items-center justify-center mx-auto shadow-inner">
                  <FileText className="w-8 h-8 text-[#0B0D10]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{uploadedContract.fileName}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Document contractuel au format <strong>.{uploadedContract.fileType}</strong> ({uploadedContract.fileSize})
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-left text-[11px] font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Fichier importé avec succès et rattaché au contrat.</span>
                </div>
                <div className="flex gap-2 justify-center pt-2">
                  <a
                    href={uploadedContract.fileUrl}
                    download={uploadedContract.fileName}
                    className="px-4 py-2 rounded-xl bg-[#A8E635] text-[#0B0D10] font-black text-xs hover:bg-[#b8f042] transition-all cursor-pointer shadow-md inline-flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Télécharger le fichier</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="bg-white text-slate-900 w-full max-w-[800px] min-h-[1050px] shadow-2xl border border-slate-300 rounded-sm p-8 sm:p-12 space-y-6 transition-all duration-200 relative font-serif text-[13px] leading-relaxed select-text"
          >
          {/* Header Bar on PDF Page */}
          <div className="border-b border-slate-300 pb-2 flex justify-between items-center text-[11px] text-slate-500 font-sans uppercase font-semibold">
            <span>{company.name.toUpperCase()} | Contrat-cadre de prestation de services freelance</span>
            <span>Version 08/2026</span>
          </div>

          {/* ==================================================================== */}
          {/* PAGE 1 CONTENT                                                      */}
          {/* ==================================================================== */}
          {currentPage === 1 && (
            <div className="space-y-6 font-sans">
              <div className="text-center space-y-2 py-2 border-b border-slate-200 pb-6">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-wide">
                  CONTRAT-CADRE DE PRESTATION<br />DE SERVICES FREELANCE
                </h1>
                <p className="text-sm font-bold text-slate-600">{company.name}</p>
                <p className="text-xs text-slate-500 italic">
                  Modèle général pour missions commerciales, digitales, IT, marketing, conseil ou support
                </p>
              </div>

              {/* Company Table */}
              <div className="space-y-2">
                <h2 className="text-xs font-black uppercase tracking-wider bg-slate-100 p-2 text-slate-800 rounded">
                  IDENTIFICATION DE LA SOCIÉTÉ
                </h2>
                <table className="w-full text-xs border border-slate-300 border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-300">
                      <td className="w-1/3 p-2 font-bold bg-slate-50 border-r border-slate-300">Dénomination</td>
                      <td className="p-2 font-semibold text-slate-900">{company.name}</td>
                    </tr>
                    <tr className="border-b border-slate-300">
                      <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Forme / capital</td>
                      <td className="p-2 text-slate-800">{company.legalName}</td>
                    </tr>
                    <tr className="border-b border-slate-300">
                      <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Immatriculation / ICE</td>
                      <td className="p-2 text-slate-800">{company.ice}</td>
                    </tr>
                    <tr className="border-b border-slate-300">
                      <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Siège social</td>
                      <td className="p-2 text-slate-800">{company.address}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Représentée par</td>
                      <td className="p-2 text-slate-800">{company.representative} ({company.representativeTitle})</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Freelance Table */}
              <div className="space-y-2 pt-2">
                <h2 className="text-xs font-black uppercase tracking-wider bg-slate-100 p-2 text-slate-800 rounded">
                  IDENTIFICATION DU PRESTATAIRE FREELANCE
                </h2>
                <table className="w-full text-xs border border-slate-300 border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-300">
                      <td className="w-1/3 p-2 font-bold bg-slate-50 border-r border-slate-300">Nom / dénomination</td>
                      <td className="p-2 font-bold text-slate-900">{freelanceName}</td>
                    </tr>
                    <tr className="border-b border-slate-300">
                      <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Forme / statut</td>
                      <td className="p-2 text-slate-800">{freelanceStatus}</td>
                    </tr>
                    <tr className="border-b border-slate-300">
                      <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">N° immatriculation / identifiant fiscal</td>
                      <td className="p-2 text-slate-800">{freelanceId}</td>
                    </tr>
                    <tr className="border-b border-slate-300">
                      <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Adresse officielle</td>
                      <td className="p-2 text-slate-800">{freelanceAddress}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">E-mail / téléphone</td>
                      <td className="p-2 text-slate-800">{freelanceEmail} · {freelancePhone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-xs text-slate-700 leading-relaxed pt-2 space-y-3 font-serif">
                <p>
                  <strong>{company.name}</strong> est ci-après dénommée la « <em>Société</em> » et le prestataire indépendant identifié ci-dessus le « <em>Prestataire</em> ». Ensemble, ils sont désignés les « <em>Parties</em> ».
                </p>
                <p>
                  Les Parties souhaitent encadrer, par le présent contrat-cadre, les missions confiées au Prestataire. Le périmètre opérationnel, les livrables, le calendrier et les conditions financières sont précisés dans les annexes ou dans tout bon de commande / ordre de mission accepté par écrit.
                </p>
                <div className="space-y-1">
                  <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 1 – Objet et documents contractuels</h3>
                  <p>
                    Le présent contrat a pour objet de définir les conditions dans lesquelles le Prestataire réalise, en toute indépendance, les prestations décrites en Annexe 1 et, le cas échéant, dans des ordres de mission ultérieurs acceptés par les Parties.
                  </p>
                  <p>
                    Le contrat est complété par : (i) l’Annexe 1 – Fiche mission et livrables, (ii) l’Annexe 2 – Conditions financières, et (iii) le cas échéant, les bons de commande, ordres de mission, avenants ou consignes de sécurité expressément acceptés par écrit.
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 2 – Statut indépendant – absence de lien de subordination</h3>
                  <p>
                    Le Prestataire exerce son activité en professionnel indépendant, pour son propre compte, à ses risques et sous sa responsabilité. Il organise librement ses méthodes, son temps et ses moyens de travail, sous réserve du respect des délais, livrables, règles de sécurité, contraintes client et niveaux de service convenus.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* PAGE 2 CONTENT                                                      */}
          {/* ==================================================================== */}
          {currentPage === 2 && (
            <div className="space-y-5 font-serif text-xs text-slate-800 leading-relaxed">
              <p>
                Le Prestataire demeure seul responsable de ses obligations administratives, fiscales, sociales, assurantielles et professionnelles. Il déclare disposer de tous enregistrements, autorisations et assurances nécessaires à son activité.
              </p>
              <p>
                Le présent contrat ne constitue ni un contrat de travail, ni une association, ni une société créée de fait. Le Prestataire ne bénéficie d’aucun pouvoir hiérarchique au sein de la Société et ne peut engager celle-ci vis-à-vis d’un tiers sans mandat écrit préalable.
              </p>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 3 – Obligations du Prestataire</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>exécuter les missions avec diligence, compétence, loyauté et selon les standards professionnels applicables ;</li>
                  <li>respecter les objectifs, délais, budgets et modalités de validation précisés dans la Fiche mission ;</li>
                  <li>alerter sans délai la Société de tout risque de dérive, retard, incident, conflit d’intérêts ou difficulté susceptible d’affecter la mission ;</li>
                  <li>ne pas prendre d’engagement, consentir de remise, publier de communication ou transmettre d’information au nom de la Société sans autorisation ;</li>
                  <li>utiliser les outils, accès, environnements et données mis à disposition exclusivement pour les besoins de la mission ;</li>
                  <li>maintenir à jour la documentation, les fichiers sources et les comptes rendus nécessaires à la continuité de la mission.</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 4 – Obligations de la Société</h3>
                <p>
                  La Société s’engage à communiquer au Prestataire, dans des délais raisonnables, les informations, accès et éléments nécessaires à la mission, à désigner un interlocuteur lorsque cela est utile, et à régler les factures conformes selon les conditions convenues.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 5 – Modalités d’exécution – livrables – validation</h3>
                <p>
                  Les modalités pratiques de la mission sont définies en Annexe 1 : périmètre, objectifs, livrables, jalons, interlocuteurs, disponibilité attendue, outils, lieu d’exécution et critères de validation. Sauf délai différent prévu en Annexe 1, la Société dispose de cinq (5) jours ouvrés après remise d’un livrable pour notifier par écrit des réserves précises.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 6 – Conditions financières – facturation – frais</h3>
                <p>
                  La rémunération du Prestataire est définie en Annexe 2 ({forfait}). Sauf stipulation contraire en Annexe 2, les factures conformes sont payables à trente (30) jours à compter de leur date de réception.
                </p>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* PAGE 3 CONTENT                                                      */}
          {/* ==================================================================== */}
          {currentPage === 3 && (
            <div className="space-y-5 font-serif text-xs text-slate-800 leading-relaxed">
              <div className="space-y-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 7 – Durée – suspension – résiliation</h3>
                <p>
                  Le contrat prend effet à la date indiquée en Annexe 1 ({periode}).
                  Sauf disposition différente, chaque Partie peut mettre fin au contrat-cadre ou à une mission en cours moyennant un préavis écrit de trente (30) jours. Les prestations effectivement réalisées et acceptées restent dues.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 8 – Confidentialité et communication</h3>
                <p>
                  Sont confidentiels tous documents, données, informations commerciales, financières, techniques, stratégiques, méthodes, codes, bases, identifiants, prompts, contenus, maquettes, listes de clients/prospects, prix, contrats et informations concernant la Société, ses affiliées, partenaires ou clients.
                </p>
                <p>
                  Le Prestataire s’engage à ne les utiliser que pour la mission, à ne les divulguer qu’aux personnes expressément autorisées et soumises à une obligation équivalente. Cette obligation demeure applicable pendant toute la durée du contrat et pendant cinq (5) ans après sa fin.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 9 – Propriété intellectuelle et livrables</h3>
                <p>
                  Les outils, méthodes, bibliothèques, composants, modèles, savoir-faire, contenus ou éléments appartenant au Prestataire avant la mission ou développés indépendamment restent sa propriété.
                </p>
                <p>
                  Pour chaque livrable original remis dans le cadre de la mission, le Prestataire cède à la Société, sous réserve du paiement intégral des sommes dues, l’ensemble des droits patrimoniaux nécessaires à son exploitation sur tous supports, pour le monde entier et pour la durée légale de protection.
                </p>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* PAGE 4 CONTENT                                                      */}
          {/* ==================================================================== */}
          {currentPage === 4 && (
            <div className="space-y-5 font-serif text-xs text-slate-800 leading-relaxed">
              <div className="space-y-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 10 – Données personnelles, cybersécurité et usage de l’IA</h3>
                <p>
                  Lorsque la mission implique des données à caractère personnel, le Prestataire respecte les réglementations applicables en matière de protection des données (Loi 09-08 / CNDP / RGPD).
                </p>
                <p>
                  L’utilisation d’outils d’intelligence artificielle générative, d’assistants de code ou de services tiers est autorisée uniquement dans le cadre défini en Annexe 1. Sauf accord écrit, le Prestataire ne doit pas transmettre à un service d’IA public des données confidentielles ou du code source privé.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 11 – Sous-traitance – cession – équipe</h3>
                <p>
                  Le Prestataire est choisi en considération de ses compétences. Il ne peut sous-traiter tout ou partie substantielle d’une mission, ni transférer le contrat, sans accord écrit préalable de la Société.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 12 – Non-sollicitation et conflits d’intérêts</h3>
                <p>
                  Pendant la durée du contrat et pendant douze (12) mois après la fin de la dernière mission, le Prestataire s’engage à ne pas solliciter activement, en vue d’une relation directe concurrente, les clients ou prospects de la Société avec lesquels il a eu un contact substantiel.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 13 – Responsabilité – garanties – assurances</h3>
                <p>
                  Chaque Partie répond des dommages directs causés par ses fautes ou manquements contractuels. Le Prestataire maintient une assurance responsabilité civile professionnelle.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 14 – Force majeure</h3>
                <p>
                  Aucune Partie n’est responsable d’un retard ou d’une inexécution résultant d’un événement échappant raisonnablement à son contrôle.
                </p>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* PAGE 5 CONTENT                                                      */}
          {/* ==================================================================== */}
          {currentPage === 5 && (
            <div className="space-y-5 font-serif text-xs text-slate-800 leading-relaxed">
              <div className="space-y-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 15 – Conformité – éthique professionnelle</h3>
                <p>
                  Le Prestataire s’engage à respecter les lois et réglementations applicables à son activité, notamment en matière de lutte contre la corruption et droits de tiers.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 16 – Notifications – preuve – signature électronique</h3>
                <p>
                  Les Parties reconnaissent la valeur probante des échanges électroniques, validations écrites, bons de commande et signatures électroniques.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 17 – Droit applicable – règlement des différends</h3>
                <p>
                  Le présent contrat est soumis au droit marocain / français applicable selon l'entité contractante. En cas de différend, une tentative de conciliation amiable aura lieu pendant 30 jours.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold font-sans text-slate-900 text-xs uppercase">Article 18 – Dispositions générales</h3>
                <p>
                  Le présent contrat et ses annexes constituent l’intégralité de l’accord entre les Parties.
                </p>
              </div>

              {/* Signature Box Preview in Document */}
              <div className="pt-6 border-t-2 border-slate-300 font-sans">
                <p className="text-xs italic text-slate-600 mb-4">
                  Fait en deux exemplaires originaux électroniques horodatés.
                </p>
                <div className="grid grid-cols-2 gap-6 border border-slate-300 p-4 rounded bg-slate-50">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-slate-900">POUR {company.name.toUpperCase()}</p>
                    <p className="text-xs text-slate-700">{company.representative}</p>
                    <p className="text-[11px] text-slate-500 italic">Mention : « Lu et approuvé »</p>
                    {isSignedByCompany && (
                      <div className="pt-2 text-emerald-700 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>✓ Signé électroniquement</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 border-l border-slate-300 pl-4">
                    <p className="text-xs font-bold uppercase text-slate-900">POUR LE PRESTATAIRE</p>
                    <p className="text-xs text-slate-700">{freelanceName}</p>
                    <p className="text-[11px] text-slate-500 italic">Mention : « Lu et approuvé »</p>
                    {isSignedByFreelance ? (
                      <div className="pt-1 space-y-1">
                        <div className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>✓ Signé le {freelanceSignatureDate || '01/09/2026'}</span>
                        </div>
                        {freelanceSignatureUrl && (
                          <img src={freelanceSignatureUrl} alt="Signature" className="h-10 object-contain" />
                        )}
                      </div>
                    ) : (
                      <div className="text-amber-600 italic text-xs pt-2">
                        En attente de signature en Section 7
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* PAGE 6 CONTENT (ANNEXE 1)                                           */}
          {/* ==================================================================== */}
          {currentPage === 6 && (
            <div className="space-y-5 font-sans">
              <div className="text-center border-b border-slate-200 pb-4">
                <h2 className="text-base font-black text-slate-900 uppercase">
                  ANNEXE 1 – FICHE MISSION & LIVRABLES
                </h2>
                <p className="text-xs text-slate-500 italic">À compléter pour chaque mission ou ordre de mission</p>
              </div>

              <table className="w-full text-xs border border-slate-300 border-collapse">
                <tbody>
                  <tr className="border-b border-slate-300">
                    <td className="w-1/3 p-2 font-bold bg-slate-50 border-r border-slate-300">Intitulé de la mission</td>
                    <td className="p-2 font-bold text-slate-900">{contractTitle}</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Client final / Projet</td>
                    <td className="p-2 text-slate-800">{client}</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Dates & Durée</td>
                    <td className="p-2 text-slate-800">{periode}</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Lieu / Mode d’exécution</td>
                    <td className="p-2 text-slate-800">☐ À distance  ☒ Hybride / Remote</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Interlocuteur Société</td>
                    <td className="p-2 text-slate-800">{company.representative}</td>
                  </tr>
                </tbody>
              </table>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase bg-slate-100 p-1.5 rounded">
                  1. Périmètre et objectifs
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-serif">
                  Réalisation des prestations techniques et stratégiques associées à la mission « {contractTitle} ». Développement, tests, livraison des composants et accompagnement.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase bg-slate-100 p-1.5 rounded">
                  2. Livrables et jalons
                </h3>
                <table className="w-full text-[11px] border border-slate-300 border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 font-bold">
                      <th className="p-1.5 text-left border-r border-slate-300">N°</th>
                      <th className="p-1.5 text-left border-r border-slate-300">Livrable</th>
                      <th className="p-1.5 text-left border-r border-slate-300">Échéance</th>
                      <th className="p-1.5 text-left">Critère de validation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-300">
                      <td className="p-1.5 border-r border-slate-300 font-bold">1</td>
                      <td className="p-1.5 border-r border-slate-300">Cahier des charges & Architecture</td>
                      <td className="p-1.5 border-r border-slate-300">Semaine 2</td>
                      <td className="p-1.5">Validation technique client</td>
                    </tr>
                    <tr className="border-b border-slate-300">
                      <td className="p-1.5 border-r border-slate-300 font-bold">2</td>
                      <td className="p-1.5 border-r border-slate-300">Développement des modules v1</td>
                      <td className="p-1.5 border-r border-slate-300">Semaine 6</td>
                      <td className="p-1.5">Tests d'intégration validés</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 border-r border-slate-300 font-bold">3</td>
                      <td className="p-1.5 border-r border-slate-300">Livraison finale & Recette</td>
                      <td className="p-1.5 border-r border-slate-300">Fin de contrat</td>
                      <td className="p-1.5">Procès-verbal de recette signé</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* PAGE 7 CONTENT (ANNEXE 1 SUITE)                                     */}
          {/* ==================================================================== */}
          {currentPage === 7 && (
            <div className="space-y-5 font-sans">
              <div className="text-center border-b border-slate-200 pb-2">
                <h2 className="text-sm font-black text-slate-900 uppercase">
                  ANNEXE 1 – FICHE MISSION & LIVRABLES (Suite)
                </h2>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase bg-slate-100 p-1.5 rounded">
                  3. Accès, données et outils autorisés
                </h3>
                <table className="w-full text-xs border border-slate-300 border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-300">
                      <td className="w-1/3 p-2 font-bold bg-slate-50 border-r border-slate-300">Outils / comptes fournis</td>
                      <td className="p-2 text-slate-800">Accès GitHub, Slack, Figma et environnement Cloud staging</td>
                    </tr>
                    <tr className="border-b border-slate-300">
                      <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Usage d'IA générative</td>
                      <td className="p-2 text-slate-800">☒ Autorisé sans transmission de données confidentielles ni clés privées</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Règles de sécurité</td>
                      <td className="p-2 text-slate-800">2FA obligatoire, VPN d'entreprise si nécessaire</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase bg-slate-100 p-1.5 rounded">
                  4. Validation & Recette
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-serif">
                  Délai de validation spécifique : 5 jours ouvrés après soumission du livrable.
                  Les réserves éventuelles sont motivées par écrit sur le gestionnaire de projet.
                </p>
              </div>
            </div>
          )}

          {/* ==================================================================== */}
          {/* PAGE 8 CONTENT (ANNEXE 2)                                           */}
          {/* ==================================================================== */}
          {currentPage === 8 && (
            <div className="space-y-5 font-sans">
              <div className="text-center border-b border-slate-200 pb-4">
                <h2 className="text-base font-black text-slate-900 uppercase">
                  ANNEXE 2 – CONDITIONS FINANCIÈRES
                </h2>
                <p className="text-xs text-slate-500 italic">Cocher et compléter uniquement les modalités applicables</p>
              </div>

              <table className="w-full text-xs border border-slate-300 border-collapse">
                <tbody>
                  <tr className="border-b border-slate-300">
                    <td className="w-1/3 p-2 font-bold bg-slate-50 border-r border-slate-300">Rémunération convenue</td>
                    <td className="p-2 font-bold text-emerald-700 text-sm">{forfait}</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Mode principal</td>
                    <td className="p-2 text-slate-800">☒ Forfait global de prestation</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Cadence de facturation</td>
                    <td className="p-2 text-slate-800">Facturation par jalons de livraison ou mensuelle selon avancement</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Délai de paiement</td>
                    <td className="p-2 text-slate-800">{paymentTerms}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Frais remboursables</td>
                    <td className="p-2 text-slate-800">Sur autorisation préalable écrite uniquement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* ==================================================================== */}
          {/* PAGE 9 CONTENT (ANNEXE 3)                                           */}
          {/* ==================================================================== */}
          {currentPage === 9 && (
            <div className="space-y-5 font-sans">
              <div className="text-center border-b border-slate-200 pb-4">
                <h2 className="text-base font-black text-slate-900 uppercase">
                  ANNEXE 3 – RESTITUTION DES ACCÈS ET ACTIFS
                </h2>
                <p className="text-xs text-slate-500 italic">Checklist à utiliser à la fin de chaque mission</p>
              </div>

              <table className="w-full text-xs border border-slate-300 border-collapse">
                <tbody>
                  <tr className="border-b border-slate-300">
                    <td className="w-1/3 p-2 font-bold bg-slate-50 border-r border-slate-300">Accès désactivés / restitués</td>
                    <td className="p-2 text-slate-800">☐ E-mail  ☐ CRM  ☒ Dépôts Code  ☒ Serveurs Cloud</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Clés / secrets / API</td>
                    <td className="p-2 text-slate-800">☒ Restitués / révoqués en fin de mission</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Données locales</td>
                    <td className="p-2 text-slate-800">☒ Supprimées à la clôture de la mission</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold bg-slate-50 border-r border-slate-300">Validation Société</td>
                    <td className="p-2 text-slate-800">{company.representative} ({company.name})</td>
                  </tr>
                </tbody>
              </table>

              <div className="p-4 bg-slate-100 border border-slate-300 rounded text-xs italic text-slate-700 leading-relaxed font-serif">
                Le Prestataire confirme, à la clôture, ne conserver aucune copie non autorisée de données, secrets, documents ou accès de la Société ou de ses clients, sous réserve des obligations légales de conservation.
              </div>
            </div>
          )}

          {/* Footer Bar on PDF Page */}
          <div className="absolute bottom-4 left-8 right-8 border-t border-slate-300 pt-2 flex justify-between items-center text-[11px] text-slate-500 font-sans">
            <span>Modèle vierge – Version 08/2026</span>
            <span className="font-bold text-slate-800">Page {currentPage} / {totalPages}</span>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default ContractPdfViewer;
