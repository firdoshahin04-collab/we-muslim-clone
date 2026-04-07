import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Fingerprint, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'motion/react';
import { cn } from '../lib/utils';
import { RubElHizb, IslamicPattern } from './DecorativeIcons';

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
  const [totalDaily, setTotalDaily] = useState(0);
  const [target, setTarget] = useState(33);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [beads, setBeads] = useState(Array.from({ length: 10 }, (_, i) => i));
  const [particles, setParticles] = useState<{ id: number, x: number, y: number }[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    const saved = localStorage.getItem('tasbih_daily_count');
    if (saved) setTotalDaily(parseInt(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasbih_daily_count', totalDaily.toString());
  }, [totalDaily]);

  const handleIncrement = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    const newCount = count + 1;
    setCount(newCount);
    setTotalDaily(prev => prev + 1);
    
    // Advanced Haptics
    if (navigator.vibrate) {
      if (newCount % 100 === 0) {
        navigator.vibrate(1000); // Continuous 1-sec
      } else if (newCount % 33 === 0) {
        navigator.vibrate([200, 100, 200]); // Double heavy
      } else {
        navigator.vibrate(50); // Light
      }
    }
    
    // Add particle
    const id = Date.now();
    setParticles(prev => [...prev, { id, x: Math.random() * 40 - 20, y: Math.random() * 40 - 20 }]);
    setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 1000);

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
    <div className="flex flex-col h-full bg-[#f8f9fb] overflow-hidden pb-24">
      {/* Massive Invisible Button */}
      <div 
        className="fixed inset-0 z-0 cursor-pointer" 
        onClick={() => handleIncrement()}
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Header */}
      <header className="p-5 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner group"
          >
            <RubElHizb className="w-6 h-6 group-hover:text-emerald-500 transition-colors" />
          </motion.div>
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-base font-black text-slate-800 tracking-tight"
            >
              Dhikr Session
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em]"
            >
              Active Now
            </motion.p>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button 
            whileHover={{ rotate: -90 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetCount}
            className="p-3 bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
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
          className="bg-white rounded-[48px] p-10 shadow-sm border border-slate-100 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-islamic-pattern opacity-[0.03] scale-125" />
          
          <div className="flex justify-between items-center mb-8 relative z-10">
            <motion.button whileTap={{ x: -5 }} onClick={prevTasbih} className="p-3 text-slate-300 hover:text-emerald-600 bg-slate-50 rounded-2xl transition-colors"><ChevronLeft size={20} /></motion.button>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{currentIndex + 1} / {TASBIHS.length}</span>
            <motion.button whileTap={{ x: 5 }} onClick={nextTasbih} className="p-3 text-slate-300 hover:text-emerald-600 bg-slate-50 rounded-2xl transition-colors"><ChevronRight size={20} /></motion.button>
          </div>

          <div className="text-center space-y-6 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{currentTasbih.name}</h3>
                <p className="text-5xl font-arabic text-emerald-700 font-bold leading-relaxed" dir="rtl">{currentTasbih.arabic}</p>
                <p className="text-sm text-slate-400 italic font-medium px-4">"{currentTasbih.translation}"</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 pt-10 border-t border-slate-50 flex justify-center gap-16 relative z-10">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Target</p>
              <p className="text-xl font-black text-slate-700 tracking-tight">{target}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Progress</p>
              <p className="text-xl font-black text-emerald-600 tracking-tight">{Math.round((count % target) / target * 100)}%</p>
            </div>
          </div>
          
          <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>
      </div>

      {/* Animated Beads Section */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden py-12">
        <div className="absolute w-full h-[3px] bg-slate-100 top-1/2 -translate-y-1/2 shadow-inner" />
        <motion.div 
          animate={controls}
          className="flex gap-6 items-center px-32"
        >
          {beads.map((id) => (
            <motion.div
              key={id}
              className="w-12 h-12 rounded-full shadow-xl flex-shrink-0 relative overflow-hidden"
              style={{
                background: "radial-gradient(circle at 35% 35%, #10b981, #065f46)",
                boxShadow: "0 12px 24px -6px rgba(16,185,129,0.4), inset -3px -3px 8px rgba(0,0,0,0.3)"
              }}
            >
              <div className="absolute top-1.5 left-2.5 w-2.5 h-2.5 bg-white/30 rounded-full blur-[1px]" />
              <div className="absolute inset-0 bg-islamic-pattern opacity-10 scale-50" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Counter Section */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="p-10 bg-white rounded-t-[64px] shadow-[0_-20px_50px_rgba(0,0,0,0.08)] flex flex-col items-center gap-8"
      >
        <div className="text-center relative">
          <AnimatePresence>
            {count > 0 && count % target === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 2 }}
                exit={{ opacity: 0, scale: 3 }}
                className="absolute inset-0 bg-emerald-400/20 rounded-full blur-2xl -z-10"
              />
            )}
          </AnimatePresence>
          <motion.span 
            key={count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "text-7xl font-black tracking-tighter transition-colors duration-300",
              count > 0 && count % target === 0 ? "text-emerald-600" : "text-slate-800"
            )}
          >
            {count % target === 0 && count > 0 ? target : count % target}
          </motion.span>
          <span className="text-3xl text-slate-200 font-black ml-3 tracking-tighter">/ {target}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleIncrement}
          className="w-32 h-32 rounded-[48px] bg-slate-900 shadow-2xl shadow-slate-400 flex items-center justify-center text-white relative group overflow-hidden"
        >
          <AnimatePresence>
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 0, x: p.x * 5, y: p.y * 5 }}
                exit={{ opacity: 0 }}
                className="absolute w-2 h-2 bg-emerald-400 rounded-full blur-[1px] pointer-events-none"
              />
            ))}
          </AnimatePresence>
          <motion.div 
            className="absolute inset-0 bg-emerald-600 opacity-0 group-active:opacity-100 transition-opacity duration-100"
          />
          <div className="absolute inset-2.5 rounded-[38px] border-2 border-white/10 group-active:border-white/30 transition-colors" />
          <Fingerprint size={56} className="relative z-10 text-slate-400 group-active:text-white transition-colors" />
          
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 4, opacity: 0.3 }}
            className="absolute bg-white rounded-full w-10 h-10 pointer-events-none"
          />
        </motion.button>

        <div className="flex gap-4 w-full max-w-sm">
          {[33, 99, 100].map(t => (
            <motion.button
              key={t}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setTarget(t); resetCount(); }}
              className={cn(
                "flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all",
                target === t 
                  ? "bg-emerald-600 text-white shadow-xl shadow-emerald-200" 
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
