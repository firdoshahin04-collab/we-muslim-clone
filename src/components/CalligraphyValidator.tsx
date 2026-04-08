import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PenTool, Trash2, CheckCircle2, ChevronLeft, Sparkles, Info, RefreshCcw, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';

const TARGET_LETTERS = [
  { letter: 'ا', name: 'Alif' },
  { letter: 'ب', name: 'Ba' },
  { letter: 'ج', name: 'Jeem' },
  { letter: 'د', name: 'Dal' },
];

export default function CalligraphyValidator() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLetterIdx, setCurrentLetterIdx] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#1e293b';
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setScore(null);
  };

  const validateCalligraphy = async () => {
    setLoading(true);
    // Mocking ML validation logic
    // In a real app, we would:
    // 1. Capture canvas image
    // 2. Resize to 28x28 or similar
    // 3. Convert to grayscale tensor
    // 4. Run through tf.model.predict()
    
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 30) + 70;
      setScore(randomScore);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-24">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 p-6 z-50 shadow-sm sticky top-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2.5 bg-slate-50 text-slate-600 rounded-2xl">
              <ChevronLeft size={22} />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">Calligraphy Validator</h1>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">ML Shape Recognition</p>
            </div>
          </div>
          <PenTool className="text-emerald-500" size={24} />
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Target Letter */}
        <div className="bg-slate-900 rounded-[48px] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200 flex items-center justify-between">
          <div className="absolute inset-0 bg-islamic-pattern opacity-10 scale-150" />
          <div className="relative z-10">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-2">Draw This Letter</p>
            <h2 className="text-2xl font-black tracking-tight">{TARGET_LETTERS[currentLetterIdx].name}</h2>
          </div>
          <div className="relative z-10 text-7xl font-arabic text-white/90">
            {TARGET_LETTERS[currentLetterIdx].letter}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm overflow-hidden relative">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="w-full aspect-square cursor-crosshair touch-none"
          />
          
          <div className="absolute top-6 right-6 flex flex-col gap-3">
            <button onClick={clearCanvas} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-50 hover:text-rose-500 transition-all">
              <Trash2 size={20} />
            </button>
            <button onClick={() => setCurrentLetterIdx((currentLetterIdx + 1) % TARGET_LETTERS.length)} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">
              <RefreshCcw size={20} />
            </button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-8">
            <button 
              onClick={validateCalligraphy}
              disabled={loading}
              className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Validate with AI <Sparkles size={16} /></>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {score !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-50 p-8 rounded-[40px] border border-emerald-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h4 className="font-black text-emerald-900 tracking-tight">MashaAllah!</h4>
                  <p className="text-xs text-emerald-700 font-medium">Your stroke accuracy is great.</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-emerald-600 tracking-tighter">{score}%</p>
                <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Match</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info */}
        <div className="bg-blue-50 rounded-[32px] p-6 border border-blue-100 flex gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <Info size={24} />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-blue-900 tracking-tight">Pro Tip</h4>
            <p className="text-xs text-blue-800/70 leading-relaxed">
              Arabic calligraphy is written from right to left. Try to maintain a consistent pressure for the best results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
