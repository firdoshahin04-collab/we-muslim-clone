import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { usePrayer } from './PrayerProvider';
import { Clock, MapPin, ChevronRight, Settings as SettingsIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { times, location } = usePrayer();
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!times) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-500 font-medium">Calculating prayer times...</p>
    </div>
  );

  const prayerList = [
    { name: 'Fajr', time: times.fajr },
    { name: 'Sunrise', time: times.sunrise },
    { name: 'Dhuhr', time: times.dhuhr },
    { name: 'Asr', time: times.asr },
    { name: 'Maghrib', time: times.maghrib },
    { name: 'Isha', time: times.isha },
  ];

  const currentPrayer = times.current === 'none' ? 'Isha' : times.current;

  return (
    <div className="flex flex-col gap-5 p-5 bg-[#f8f9fb] min-h-full">
      <header className="flex justify-between items-end mb-1">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black text-slate-800 tracking-tight"
          >
            Assalamu Alaikum
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.25em]"
          >
            {format(currentTime, 'EEEE, d MMMM')}
          </motion.p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/settings')}
          className="p-2.5 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-emerald-600 transition-all shadow-sm"
        >
          <SettingsIcon size={20} />
        </motion.button>
      </header>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative overflow-hidden rounded-[40px] bg-emerald-600 p-8 text-white shadow-2xl shadow-emerald-200/50"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-emerald-300 rounded-full shadow-[0_0_8px_rgba(110,231,183,0.8)]" 
            />
            <p className="text-emerald-100 font-bold uppercase tracking-[0.3em] text-[10px]">Next Prayer: {times.next}</p>
          </div>
          <h2 className="text-6xl font-black mb-6 tracking-tighter drop-shadow-sm">
            {format(times.timeForNext, 'HH:mm')}
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-xl border border-white/10">
              <Clock size={16} className="text-emerald-200" />
              <span className="text-sm font-black tracking-tight">{format(currentTime, 'HH:mm:ss')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-200/80">
              <MapPin size={12} />
              {location?.lat.toFixed(2)}, {location?.lng.toFixed(2)}
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="absolute -right-16 -bottom-16 w-80 h-80 bg-emerald-500 rounded-full opacity-30 blur-[80px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0]
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute -left-16 -top-16 w-64 h-64 bg-emerald-400 rounded-full opacity-20 blur-[60px]" 
        />
      </motion.div>

      <section className="grid grid-cols-1 gap-2.5">
        {prayerList.map((prayer, i) => (
          <motion.div 
            key={prayer.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex justify-between items-center p-4 rounded-[28px] border transition-all duration-500",
              currentPrayer.toLowerCase() === prayer.name.toLowerCase() 
                ? "bg-white border-emerald-100 shadow-[0_10px_25px_-5px_rgba(16,185,129,0.1)] ring-1 ring-emerald-50" 
                : "bg-white/60 border-slate-100/50"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                currentPrayer.toLowerCase() === prayer.name.toLowerCase() 
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                  : "bg-slate-100 text-slate-400"
              )}>
                <Clock size={20} />
              </div>
              <div>
                <p className={cn(
                  "font-black text-sm tracking-tight",
                  currentPrayer.toLowerCase() === prayer.name.toLowerCase() ? "text-emerald-900" : "text-slate-700"
                )}>{prayer.name}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">Adhan at {format(prayer.time, 'HH:mm')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn(
                "text-xl font-black tracking-tighter",
                currentPrayer.toLowerCase() === prayer.name.toLowerCase() ? "text-emerald-600" : "text-slate-800"
              )}>{format(prayer.time, 'HH:mm')}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-[40px] p-7 border border-slate-100 shadow-sm mb-6"
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Daily Dhikr</h3>
          <button 
            onClick={() => navigate('/tasbih')}
            className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1 hover:gap-2 transition-all"
          >
            Open Tasbih <ChevronRight size={14} />
          </button>
        </div>
        <motion.div 
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="p-6 bg-emerald-50/50 rounded-[32px] border border-emerald-100/50 relative overflow-hidden group cursor-pointer" 
          onClick={() => navigate('/tasbih')}
        >
          <p className="text-emerald-900 font-arabic text-3xl text-right mb-4 leading-relaxed">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</p>
          <p className="text-emerald-800 font-black text-sm mb-1 tracking-tight">SubhanAllah wa bihamdihi</p>
          <p className="text-[11px] text-emerald-600/80 leading-relaxed font-medium">Glory be to Allah and His is the praise.</p>
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-emerald-200/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        </motion.div>
      </motion.section>
    </div>
  );
}

