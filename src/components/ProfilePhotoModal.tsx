import React, { useState, useRef } from 'react';
import { X, Camera, UploadCloud, User } from 'lucide-react';

interface ProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userRole: string;
  currentAvatar: string;
  onSave: (newAvatarUrl: string) => void;
}

const PREDEFINED_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
];

export const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({
  isOpen,
  onClose,
  userName,
  userRole,
  currentAvatar,
  onSave,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(selectedAvatar);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we would upload this file to a server.
      // For now, we'll create a local blob URL so the user can preview it.
      const objectUrl = URL.createObjectURL(file);
      setSelectedAvatar(objectUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[480px] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 pb-4 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#A8E635]/10 flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-[#A8E635]" />
          </div>
          <div className="flex-1 pt-1">
            <h2 className="text-xl font-bold text-slate-900 leading-tight">Changer ma photo de profil</h2>
            <p className="text-sm text-slate-500 mt-1">Sélectionnez un avatar ou importez votre propre image</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6 border-b border-slate-100 flex-1 overflow-y-auto">
          {/* Current Avatar Display */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full p-1 border-2 border-[#A8E635]">
                <img
                  src={selectedAvatar}
                  alt={userName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 w-9 h-9 bg-[#A8E635] hover:bg-[#97cf2e] rounded-full flex items-center justify-center text-slate-900 shadow-md transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-slate-900">{userName}</h3>
              <p className="text-sm text-slate-500 font-medium">{userRole}</p>
            </div>
          </div>

          {/* Predefined Avatars */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-700 text-center">Choisir un avatar prédéfini</h4>
            <div className="flex items-center justify-center gap-3">
              {PREDEFINED_AVATARS.map((avatar, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-12 h-12 rounded-full p-0.5 transition-all ${
                    selectedAvatar === avatar
                      ? 'border-2 border-[#A8E635] scale-110'
                      : 'border-2 border-transparent hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={avatar} alt={`Avatar ${idx + 1}`} className="w-full h-full rounded-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div className="mt-8 space-y-3">
            <h4 className="text-sm font-bold text-slate-700">Importer une photo depuis votre appareil</h4>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-4 flex items-center justify-center gap-2 hover:border-[#A8E635] hover:bg-[#A8E635]/5 transition-colors cursor-pointer"
            >
              <UploadCloud className="w-5 h-5 text-[#A8E635]" />
              <span className="text-sm font-medium text-slate-600">Sélectionner un fichier image...</span>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 flex items-center justify-between gap-4 bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-100 transition-colors"
          >
            Fermer
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2.5 rounded-full bg-[#A8E635] text-slate-900 text-sm font-bold hover:bg-[#97cf2e] transition-colors shadow-sm"
          >
            Valider
          </button>
        </div>

      </div>
    </div>
  );
};
