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
    <div className="flex flex-col gap-6 p-6 bg-[#f8f9fb] min-h-full">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assalamu Alaikum</h1>
          <p className="text-slate-500 text-sm">{format(currentTime, 'EEEE, d MMMM')}</p>
        </div>
        <button 
          onClick={() => navigate('/settings')}
          className="p-2 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-emerald-600 transition-all shadow-sm"
        >
          <SettingsIcon size={20} />
        </button>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[40px] bg-emerald-600 p-8 text-white shadow-xl shadow-emerald-100"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
            <p className="text-emerald-100 font-bold uppercase tracking-[0.2em] text-[10px]">Next Prayer: {times.next}</p>
          </div>
          <h2 className="text-6xl font-black mb-6 tracking-tighter">{format(times.timeForNext, 'HH:mm')}</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-emerald-500/30 px-4 py-2 rounded-2xl backdrop-blur-md">
              <Clock size={16} className="text-emerald-200" />
              <span className="text-sm font-bold">{format(currentTime, 'HH:mm:ss')}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-200">
              <MapPin size={12} />
              {location?.lat.toFixed(2)}, {location?.lng.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -left-10 -top-10 w-48 h-48 bg-emerald-400 rounded-full opacity-10 blur-2xl" />
      </motion.div>

      <section className="grid grid-cols-1 gap-3">
        {prayerList.map((prayer, i) => (
          <motion.div 
            key={prayer.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "flex justify-between items-center p-5 rounded-[28px] border transition-all duration-300",
              currentPrayer.toLowerCase() === prayer.name.toLowerCase() 
                ? "bg-white border-emerald-200 shadow-md scale-[1.02]" 
                : "bg-white/50 border-slate-100"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                currentPrayer.toLowerCase() === prayer.name.toLowerCase() ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100" : "bg-slate-100 text-slate-400"
              )}>
                <Clock size={20} />
              </div>
              <div>
                <p className={cn(
                  "font-bold text-sm",
                  currentPrayer.toLowerCase() === prayer.name.toLowerCase() ? "text-emerald-900" : "text-slate-700"
                )}>{prayer.name}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Adhan at {format(prayer.time, 'HH:mm')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn(
                "text-xl font-black",
                currentPrayer.toLowerCase() === prayer.name.toLowerCase() ? "text-emerald-600" : "text-slate-800"
              )}>{format(prayer.time, 'HH:mm')}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800">Daily Dhikr</h3>
          <button 
            onClick={() => navigate('/tasbih')}
            className="text-emerald-600 text-xs font-bold uppercase tracking-widest flex items-center gap-1"
          >
            Open Tasbih <ChevronRight size={14} />
          </button>
        </div>
        <div className="p-6 bg-emerald-50 rounded-[32px] border border-emerald-100 relative overflow-hidden group cursor-pointer" onClick={() => navigate('/tasbih')}>
          <p className="text-emerald-900 font-arabic text-2xl text-right mb-4">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</p>
          <p className="text-emerald-700 font-bold text-sm mb-1">SubhanAllah wa bihamdihi</p>
          <p className="text-xs text-emerald-600/70 leading-relaxed">Glory be to Allah and His is the praise.</p>
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-emerald-200/30 rounded-full blur-xl group-hover:scale-150 transition-transform" />
        </div>
      </section>
    </div>
  );
}

