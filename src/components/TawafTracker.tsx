import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, ChevronLeft, Info, Trophy, History, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { awardKarma } from '../lib/karma';

export default function TawafTracker() {
  const navigate = useNavigate();
  const [circuits, setCircuits] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [history, setHistory] = useState<{ date: string; count: number }[]>([]);
  
  // Accelerometer logic
  const lastAccel = useRef({ x: 0, y: 0, z: 0 });
  const steps = useRef(0);
  const threshold = 12; // Sensitivity

  useEffect(() => {
    const saved = localStorage.getItem('tawaf_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (!isTracking) return;

    const handleMotion = (event: DeviceMotionEvent) => {
      const accel = event.accelerationIncludingGravity;
      if (!accel) return;

      const { x, y, z } = accel;
      const total = Math.sqrt((x || 0) ** 2 + (y || 0) ** 2 + (z || 0) ** 2);
      
      // Simple step detection as a proxy for walking in Tawaf
      // Real circular detection would need more complex math (calculating angular velocity)
      if (total > threshold) {
        steps.current += 1;
        // Assume ~100 steps per circuit (rough estimate for Tawaf)
        if (steps.current >= 100) {
          setCircuits(prev => {
            const next = prev + 1;
            if (next === 7) {
              handleComplete();
            }
            return next > 7 ? 7 : next;
          });
          steps.current = 0;
          if (window.navigator.vibrate) window.navigator.vibrate(200);
        }
      }
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [isTracking]);

  const handleComplete = () => {
    setIsTracking(false);
    awardKarma(100);
    const newEntry = { date: new Date().toISOString(), count: 7 };
    const newHistory = [newEntry, ...history].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('tawaf_history', JSON.stringify(newHistory));
    alert("MashaAllah! You have completed 7 circuits of Tawaf.");
  };

  const reset = () => {
    setCircuits(0);
    steps.current = 0;
    setIsTracking(false);
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
              <h1 className="text-xl font-black text-slate-800 tracking-tight">Tawaf Tracker</h1>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Umrah Assistant</p>
            </div>
          </div>
          <button onClick={reset} className="p-2.5 bg-slate-50 text-slate-400 rounded-2xl">
            <RefreshCcw size={20} />
          </button>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Main Counter */}
        <div className="bg-slate-900 rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl shadow-slate-200 flex flex-col items-center">
          <div className="absolute inset-0 bg-islamic-pattern opacity-10 scale-150" />
          
          <div className="relative z-10 text-center">
            <motion.div 
              animate={{ rotate: isTracking ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="w-48 h-48 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 flex items-center justify-center mb-8"
            >
              <div className="text-center">
                <motion.span 
                  key={circuits}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-8xl font-black tracking-tighter block"
                >
                  {circuits}
                </motion.span>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">Circuits</span>
              </div>
            </motion.div>

            <button 
              onClick={() => setIsTracking(!isTracking)}
              className={cn(
                "px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-sm transition-all shadow-xl",
                isTracking 
                  ? "bg-rose-500 hover:bg-rose-600 shadow-rose-900/20" 
                  : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20"
              )}
            >
              {isTracking ? "Pause Tracking" : circuits === 0 ? "Start Tawaf" : "Resume Tawaf"}
            </button>
          </div>
        </div>

        {/* Progress Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Remaining</p>
            <p className="text-2xl font-black text-slate-800 tracking-tight">{7 - circuits} Rounds</p>
          </div>
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
            <p className="text-2xl font-black text-emerald-600 tracking-tight">{isTracking ? "Active" : "Idle"}</p>
          </div>
        </div>

        {/* History */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <History size={16} className="text-slate-400" />
            <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.3em]">Recent Tawafs</h3>
          </div>
          <div className="space-y-3">
            {history.length > 0 ? history.map((entry, i) => (
              <div key={i} className="bg-white p-5 rounded-[24px] border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">Completed 7 Circuits</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(entry.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  +100 Karma
                </div>
              </div>
            )) : (
              <div className="text-center py-10 text-slate-400 text-sm italic">No history yet.</div>
            )}
          </div>
        </section>

        {/* Tips */}
        <div className="bg-amber-50 rounded-[32px] p-6 border border-amber-100 flex gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
            <Info size={24} />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-amber-900 tracking-tight">How it works</h4>
            <p className="text-xs text-amber-800/70 leading-relaxed">
              Keep your phone in your hand or pocket. The app uses motion sensors to detect your movement around the Kaaba.
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
