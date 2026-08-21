import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  theme?: 'dark' | 'light';
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Sélectionner...',
  className = '',
  disabled = false,
  theme = 'dark',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLight = theme === 'light';

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border rounded-2xl px-3.5 py-2.5 text-xs flex items-center justify-between gap-2 transition-all cursor-pointer ${
          isLight
            ? isOpen
              ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-lg bg-white text-slate-950'
              : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 hover:bg-slate-100/50'
            : isOpen
              ? 'border-white ring-2 ring-white/20 shadow-lg shadow-white/5 bg-[#0d1015] text-white'
              : 'border-white/10 bg-[#090B0E] text-white hover:border-white/20 hover:bg-[#0c0f14]'
        }`}
      >
        <span className={`truncate font-medium ${isLight ? 'text-slate-800' : 'text-white'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isOpen
              ? isLight ? 'rotate-180 text-slate-900' : 'rotate-180 text-white'
              : isLight ? 'text-slate-500' : 'text-[#98A2B3]'
          }`}
        />
      </button>

      {isOpen && (
        <div className={`absolute left-0 right-0 top-full mt-1.5 z-50 border rounded-2xl p-1.5 max-h-60 overflow-y-auto space-y-0.5 animate-in fade-in zoom-in-95 duration-150 ${
          isLight
            ? 'bg-white/95 backdrop-blur-xl border-slate-200/80 shadow-xl shadow-slate-200/30'
            : 'bg-[#12151C]/95 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/80'
        }`}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left transition-all cursor-pointer rounded-xl ${
                  isSelected
                    ? isLight
                      ? 'bg-[#A8E635] text-[#0B0D10] font-black shadow-md shadow-[#A8E635]/15'
                      : 'bg-white text-[#0B0D10] font-black shadow-md shadow-white/10'
                    : isLight
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-semibold'
                      : 'text-[#98A2B3] hover:text-white hover:bg-white/5 font-medium'
                }`}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && (
                  <Check className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-[#0B0D10]' : 'text-[#0B0D10]'}`} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

