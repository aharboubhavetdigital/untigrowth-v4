import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PenTool, Check, Trash2, RotateCcw } from 'lucide-react';

interface SignaturePadProps {
  onSave: (dataUrl: string) => void;
  onClear?: () => void;
  disabled?: boolean;
}

interface Point {
  x: number;
  y: number;
}

const INK_COLORS = [
  { name: 'Bleu Stylo', value: '#1E3A8A', bg: 'bg-blue-900' },
  { name: 'Noir Encre', value: '#090D16', bg: 'bg-slate-900' },
  { name: 'Bleu Roi', value: '#0284C7', bg: 'bg-sky-600' },
];

export const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onClear, disabled = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [selectedInk, setSelectedInk] = useState<string>('#1E3A8A');

  // Store all completed stroke paths and current active stroke
  const pathsRef = useRef<{ points: Point[]; color: string }[]>([]);
  const currentPathRef = useRef<Point[]>([]);

  // Redraw all stored paths and current active path onto the canvas
  const redrawAll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear entire high-dpi canvas resolution
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply 2x scale for crisp Retina display
    ctx.scale(2, 2);

    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const allPaths = [...pathsRef.current];
    if (currentPathRef.current.length > 0) {
      allPaths.push({ points: currentPathRef.current, color: selectedInk });
    }

    allPaths.forEach((stroke) => {
      const { points, color } = stroke;
      if (!points || points.length === 0) return;

      ctx.strokeStyle = color || '#1E3A8A';
      ctx.fillStyle = color || '#1E3A8A';

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      if (points.length === 1) {
        // Single tap dot
        ctx.arc(points[0].x, points[0].y, 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }
    });
  }, [selectedInk]);

  // Ensure canvas resolution matches element dimensions smoothly
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const w = Math.max(Math.floor(rect.width), 280);
    const h = Math.max(Math.floor(rect.height), 160);

    if (canvas.width !== w * 2 || canvas.height !== h * 2) {
      canvas.width = w * 2;
      canvas.height = h * 2;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      redrawAll();
    }
  }, [redrawAll]);

  useEffect(() => {
    updateCanvasDimensions();

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      updateCanvasDimensions();
    });
    observer.observe(container);

    window.addEventListener('resize', updateCanvasDimensions);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateCanvasDimensions);
    };
  }, [updateCanvasDimensions]);

  useEffect(() => {
    redrawAll();
  }, [selectedInk, redrawAll]);

  // Helper to get precise coordinates inside the canvas element
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      return {
        x: touch ? touch.clientX - rect.left : 0,
        y: touch ? touch.clientY - rect.top : 0,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    if ('touches' in e && e.cancelable) {
      e.preventDefault();
    }

    updateCanvasDimensions();

    const pt = getCoordinates(e);
    setIsDrawing(true);
    setHasDrawn(true);

    currentPathRef.current = [pt];
    redrawAll();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled) return;
    if ('touches' in e && e.cancelable) {
      e.preventDefault();
    }

    const pt = getCoordinates(e);
    currentPathRef.current.push(pt);
    redrawAll();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentPathRef.current.length > 0) {
      pathsRef.current.push({
        points: [...currentPathRef.current],
        color: selectedInk,
      });
      currentPathRef.current = [];
    }
    redrawAll();
  };

  const handleClearCanvas = () => {
    pathsRef.current = [];
    currentPathRef.current = [];
    setHasDrawn(false);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    if (onClear) onClear();
  };

  const handleValidateSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn || pathsRef.current.length === 0) return;

    // Create a temporary canvas to render clean signature with transparent or white background
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    if (tempCtx) {
      tempCtx.scale(2, 2);
      tempCtx.lineWidth = 3.5;
      tempCtx.lineCap = 'round';
      tempCtx.lineJoin = 'round';

      pathsRef.current.forEach((stroke) => {
        const { points, color } = stroke;
        if (!points || points.length === 0) return;

        tempCtx.strokeStyle = color || '#1E3A8A';
        tempCtx.fillStyle = color || '#1E3A8A';

        tempCtx.beginPath();
        tempCtx.moveTo(points[0].x, points[0].y);

        if (points.length === 1) {
          tempCtx.arc(points[0].x, points[0].y, 2, 0, Math.PI * 2);
          tempCtx.fill();
        } else {
          for (let i = 1; i < points.length; i++) {
            tempCtx.lineTo(points[i].x, points[i].y);
          }
          tempCtx.stroke();
        }
      });
    }

    const dataUrl = tempCanvas.toDataURL('image/png');
    onSave(dataUrl);
  };

  return (
    <div className="bg-white dark:bg-[#0B0E17] border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5 transition-colors">
      {/* Header & Ink Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#A8E635]/20 border border-[#A8E635]/40 text-slate-900 dark:text-[#A8E635]">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white tracking-wide block">
              Piste de signature électronique
            </span>
            <span className="text-[10px] text-slate-500 dark:text-[#98A2B3]">
              Surface papier haute lisibilité
            </span>
          </div>
        </div>

        {/* Ink Colors */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 px-1.5 hidden sm:inline">
            Couleur :
          </span>
          {INK_COLORS.map((ink) => (
            <button
              key={ink.value}
              type="button"
              onClick={() => setSelectedInk(ink.value)}
              className={`w-5 h-5 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                ink.bg
              } ${
                selectedInk === ink.value
                  ? 'ring-2 ring-[#A8E635] scale-110 shadow-md'
                  : 'opacity-60 hover:opacity-100'
              }`}
              title={ink.name}
            />
          ))}
        </div>
      </div>

      {/* High-Contrast White Paper Drawing Surface */}
      <div
        ref={containerRef}
        className="relative w-full h-44 bg-white rounded-2xl border-2 border-slate-300 shadow-inner overflow-hidden group hover:border-[#A8E635] transition-all cursor-crosshair"
      >
        {/* Paper Baseline Guidance */}
        <div className="absolute inset-x-6 bottom-7 border-b-2 border-dashed border-slate-300 pointer-events-none flex items-center justify-between">
          <span className="text-xs font-serif font-bold text-slate-400 select-none pb-0.5">
            X __________________________________________________
          </span>
          <span className="text-[10px] font-sans text-slate-400 uppercase font-bold tracking-widest select-none pb-0.5">
            Zone de signature
          </span>
        </div>

        {!hasDrawn && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-400 text-xs sm:text-sm font-medium">
            ✍️ Dessinez votre signature ici (souris ou écran tactile)
          </div>
        )}

        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full touch-none select-none block relative z-10"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={handleClearCanvas}
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          <span>Effacer & recommencer</span>
        </button>

        <button
          type="button"
          onClick={handleValidateSignature}
          disabled={!hasDrawn || disabled}
          className="px-5 py-2 rounded-xl bg-[#A8E635] hover:bg-[#b8f042] text-[#0B0D10] font-black text-xs transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2 shadow-lg shadow-[#A8E635]/20"
        >
          <Check className="w-4 h-4" />
          <span>Valider la signature</span>
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
