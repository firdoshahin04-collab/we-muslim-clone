import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Fingerprint, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { cn } from '../lib/utils';

const TASBIHS = [
  { name: 'SubhanAllah', arabic: 'سُبْحَانَ ٱللَّٰهِ', translation: 'Glory be to Allah' },
  { name: 'Alhamdulillah', arabic: 'ٱلْحَمْدُ لِلَّٰهِ', translation: 'Praise be to Allah' },
  { name: 'Allahu Akbar', arabic: 'ٱللَّٰهُ أَكْبَرُ', translation: 'Allah is the Greatest' },
  { name: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ ٱللَّٰهَ', translation: 'I seek forgiveness from Allah' },
  { name: 'La ilaha illallah', arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', translation: 'There is no god but Allah' },
  { name: 'SubhanAllah wa bihamdihi', arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', translation: 'Glory be to Allah and His is the praise' },
  { name: 'Hasbunallahu wa ni\'mal wakil', arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', translation: 'Allah is sufficient for us, and He is the best disposer of affairs' },
];

export default function Tasbih() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [beads, setBeads] = useState(Array.from({ length: 10 }, (_, i) => i));
  const controls = useAnimation();

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    
    // Animate beads
    controls.start({
      x: -40,
      transition: { duration: 0.2, ease: "easeOut" }
    }).then(() => {
      setBeads(prev => {
        const next = [...prev];
        const first = next.shift()!;
        next.push(first + 10);
        return next;
      });
      controls.set({ x: 0 });
    });

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const resetCount = () => {
    setCount(0);
  };

  const nextTasbih = () => {
    setCurrentIndex((prev) => (prev + 1) % TASBIHS.length);
    resetCount();
  };

  const prevTasbih = () => {
    setCurrentIndex((prev) => (prev - 1 + TASBIHS.length) % TASBIHS.length);
    resetCount();
  };

  const currentTasbih = TASBIHS[currentIndex];

  return (
    <div className="flex flex-col h-full bg-[#f8f9fb] overflow-hidden">
      {/* Header */}
      <header className="p-6 flex items-center justify-between bg-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">Dhikr Session</h2>
            <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">Active</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={resetCount}
            className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
            title="Reset Count"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </header>

      {/* Tasbih Card */}
      <div className="p-6">
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <button onClick={prevTasbih} className="p-2 text-slate-300 hover:text-emerald-600"><ChevronLeft size={20} /></button>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{currentIndex + 1} - Dhikr</span>
            <button onClick={nextTasbih} className="p-2 text-slate-300 hover:text-emerald-600"><ChevronRight size={20} /></button>
          </div>

          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-slate-800">{currentTasbih.name}</h3>
            <p className="text-3xl font-arabic text-emerald-700" dir="rtl">{currentTasbih.arabic}</p>
            <p className="text-sm text-slate-400 italic">"{currentTasbih.translation}"</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Target</p>
              <p className="text-lg font-bold text-slate-700">{target}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Progress</p>
              <p className="text-lg font-bold text-emerald-600">{Math.round((count % target) / target * 100)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Beads Section */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden py-12">
        <div className="absolute w-full h-[2px] bg-slate-200 top-1/2 -translate-y-1/2" />
        <motion.div 
          animate={controls}
          className="flex gap-4 items-center px-20"
        >
          {beads.map((id) => (
            <motion.div
              key={id}
              className="w-10 h-10 rounded-full bg-emerald-600 shadow-lg shadow-emerald-200/50 flex-shrink-0"
              style={{
                background: "radial-gradient(circle at 30% 30%, #10b981, #059669)"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Counter Section */}
      <div className="p-8 bg-white rounded-t-[48px] shadow-[0_-8px_30px_rgba(0,0,0,0.04)] flex flex-col items-center gap-6">
        <div className="text-center">
          <span className="text-5xl font-black text-slate-800">{count % target}</span>
          <span className="text-xl text-slate-300 font-bold ml-2">/ {target}</span>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleIncrement}
          className="w-32 h-32 rounded-full bg-[#1e293b] shadow-2xl shadow-slate-400 flex items-center justify-center text-white relative group"
        >
          <div className="absolute inset-2 rounded-full border-2 border-slate-700 group-active:border-emerald-500 transition-colors" />
          <Fingerprint size={48} className="text-slate-400 group-active:text-emerald-400 transition-colors" />
        </motion.button>

        <div className="flex gap-3 w-full max-w-xs">
          {[33, 99, 100].map(t => (
            <button
              key={t}
              onClick={() => { setTarget(t); resetCount(); }}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-bold transition-all",
                target === t ? "bg-emerald-600 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-400"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
