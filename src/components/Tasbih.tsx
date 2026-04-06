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
      <header className="p-5 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner"
          >
            <Fingerprint size={20} />
          </motion.div>
          <div>
            <h2 className="text-sm font-black text-slate-800 tracking-tight">Dhikr Session</h2>
            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em]">Active Now</p>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button 
            whileHover={{ rotate: -90 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetCount}
            className="p-2.5 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
            title="Reset Count"
          >
            <RotateCcw size={20} />
          </motion.button>
        </div>
      </header>

      {/* Tasbih Card */}
      <div className="p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 relative overflow-hidden group"
        >
          <div className="flex justify-between items-center mb-6">
            <motion.button whileTap={{ x: -5 }} onClick={prevTasbih} className="p-2 text-slate-300 hover:text-emerald-600 bg-slate-50 rounded-xl transition-colors"><ChevronLeft size={20} /></motion.button>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{currentIndex + 1} / {TASBIHS.length}</span>
            <motion.button whileTap={{ x: 5 }} onClick={nextTasbih} className="p-2 text-slate-300 hover:text-emerald-600 bg-slate-50 rounded-xl transition-colors"><ChevronRight size={20} /></motion.button>
          </div>

          <div className="text-center space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{currentTasbih.name}</h3>
                <p className="text-4xl font-arabic text-emerald-700 font-bold leading-relaxed" dir="rtl">{currentTasbih.arabic}</p>
                <p className="text-xs text-slate-400 italic font-medium">"{currentTasbih.translation}"</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-50 flex justify-center gap-12">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Target</p>
              <p className="text-lg font-black text-slate-700 tracking-tight">{target}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Progress</p>
              <p className="text-lg font-black text-emerald-600 tracking-tight">{Math.round((count % target) / target * 100)}%</p>
            </div>
          </div>
          
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>
      </div>

      {/* Animated Beads Section */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden py-8">
        <div className="absolute w-full h-[2px] bg-slate-100 top-1/2 -translate-y-1/2" />
        <motion.div 
          animate={controls}
          className="flex gap-4 items-center px-24"
        >
          {beads.map((id) => (
            <motion.div
              key={id}
              className="w-10 h-10 rounded-full shadow-lg flex-shrink-0 relative overflow-hidden"
              style={{
                background: "radial-gradient(circle at 35% 35%, #10b981, #065f46)",
                boxShadow: "0 10px 20px -5px rgba(16,185,129,0.3), inset -2px -2px 6px rgba(0,0,0,0.2)"
              }}
            >
              <div className="absolute top-1 left-2 w-2 h-2 bg-white/20 rounded-full blur-[1px]" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Counter Section */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="p-8 bg-white rounded-t-[60px] shadow-[0_-15px_40px_rgba(0,0,0,0.06)] flex flex-col items-center gap-6"
      >
        <div className="text-center">
          <motion.span 
            key={count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-black text-slate-800 tracking-tighter"
          >
            {count % target}
          </motion.span>
          <span className="text-2xl text-slate-200 font-black ml-2 tracking-tighter">/ {target}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleIncrement}
          className="w-28 h-28 rounded-[40px] bg-slate-900 shadow-2xl shadow-slate-400 flex items-center justify-center text-white relative group overflow-hidden"
        >
          <motion.div 
            className="absolute inset-0 bg-emerald-600 opacity-0 group-active:opacity-100 transition-opacity duration-100"
          />
          <div className="absolute inset-2 rounded-[32px] border-2 border-white/10 group-active:border-white/30 transition-colors" />
          <Fingerprint size={48} className="relative z-10 text-slate-400 group-active:text-white transition-colors" />
          
          {/* Ripple effect placeholder */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 4, opacity: 0.2 }}
            className="absolute bg-white rounded-full w-10 h-10 pointer-events-none"
          />
        </motion.button>

        <div className="flex gap-3 w-full max-w-xs">
          {[33, 99, 100].map(t => (
            <motion.button
              key={t}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setTarget(t); resetCount(); }}
              className={cn(
                "flex-1 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all",
                target === t 
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100" 
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100"
              )}
            >
              {t}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
