import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { usePrayer } from './PrayerProvider';
import { Clock, MapPin, ChevronRight, Settings as SettingsIcon, Fingerprint } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { RubElHizb, CrescentStar, IslamicPattern } from './DecorativeIcons';

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
    <div className="flex flex-col gap-6 p-6 bg-[#f8f9fb] min-h-full pb-24">
      <header className="flex justify-between items-center mb-2 relative">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <RubElHizb className="w-5 h-5 text-emerald-600 animate-pulse" />
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-black text-slate-800 tracking-tight"
            >
              Assalamu Alaikum
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <p className="text-emerald-600 text-[11px] font-black uppercase tracking-[0.2em]">
              {format(currentTime, 'EEEE, d MMMM')}
            </p>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em]">
              {format(currentTime, 'yyyy')}
            </p>
          </motion.div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/settings')}
          className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-all"
        >
          <SettingsIcon size={22} strokeWidth={2.5} />
        </motion.button>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden rounded-[48px] bg-emerald-600 p-9 text-white shadow-2xl shadow-emerald-900/20 group"
      >
        {/* Pattern Overlay */}
        <motion.div 
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-islamic-pattern opacity-20" 
        />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-2"
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-2 h-2 bg-emerald-300 rounded-full shadow-[0_0_10px_rgba(110,231,183,1)]" 
              />
              <p className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Next: {times.next}</p>
            </motion.div>
          </div>
          
          <div className="flex flex-col gap-1 mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-7xl font-black tracking-tighter drop-shadow-2xl"
            >
              {times.timeForNext ? format(times.timeForNext, 'HH:mm') : '--:--'}
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 text-emerald-100/70 font-black text-xs uppercase tracking-widest"
            >
              <Clock size={14} strokeWidth={2.5} />
              <span>Time Remaining: {times.timeForNext ? format(new Date(times.timeForNext.getTime() - currentTime.getTime()), 'H:mm:ss') : '--:--:--'}</span>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between pt-6 border-t border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                <MapPin size={18} className="text-emerald-200" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200/60">Current Location</p>
                <p className="text-xs font-black tracking-tight">{location?.lat.toFixed(2)}°N, {location?.lng.toFixed(2)}°E</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative background blobs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-400/30 rounded-full blur-[80px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-900/40 rounded-full blur-[80px]" 
        />
      </motion.div>

      <motion.section 
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.5
            }
          }
        }}
        className="grid grid-cols-1 gap-3"
      >
        <div className="flex items-center justify-between px-2 mb-1">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Prayer Schedule</h3>
          <div className="h-[1px] flex-1 mx-4 bg-slate-100" />
        </div>
        {prayerList.map((prayer) => (
          <motion.div 
            key={prayer.name}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex justify-between items-center p-5 rounded-[32px] border transition-all duration-500 group cursor-pointer relative overflow-hidden",
              currentPrayer.toLowerCase() === prayer.name.toLowerCase() 
                ? "bg-white border-emerald-100 shadow-xl shadow-emerald-900/5 ring-1 ring-emerald-50" 
                : "bg-white/40 border-transparent hover:bg-white hover:border-slate-100"
            )}
          >
            {currentPrayer.toLowerCase() === prayer.name.toLowerCase() && (
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />
            )}

            <div className="flex items-center gap-5">
              <div className={cn(
                "w-14 h-14 rounded-[22px] flex items-center justify-center transition-all duration-500 shadow-inner",
                currentPrayer.toLowerCase() === prayer.name.toLowerCase() 
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                  : "bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500"
              )}>
                <Clock size={22} strokeWidth={2.5} />
              </div>
              <div>
                <p className={cn(
                  "font-black text-base tracking-tight",
                  currentPrayer.toLowerCase() === prayer.name.toLowerCase() ? "text-emerald-900" : "text-slate-700"
                )}>{prayer.name}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mt-0.5">
                  {currentPrayer.toLowerCase() === prayer.name.toLowerCase() ? "Current Prayer" : "Upcoming"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={cn(
                "text-2xl font-black tracking-tighter",
                currentPrayer.toLowerCase() === prayer.name.toLowerCase() ? "text-emerald-600" : "text-slate-800"
              )}>{format(prayer.time, 'HH:mm')}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-[48px] p-8 border border-slate-100 shadow-sm mb-10 relative overflow-hidden animate-float"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Fingerprint size={120} />
        </div>
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.3em]">Daily Dhikr</h3>
          <button 
            onClick={() => navigate('/tasbih')}
            className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform islamic-glow"
          >
            <ChevronRight size={18} strokeWidth={3} />
          </button>
        </div>
        
        <motion.div 
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-8 bg-emerald-50 rounded-[40px] border border-emerald-100/50 relative overflow-hidden group cursor-pointer shadow-inner hover:shadow-emerald-100 transition-all duration-500" 
          onClick={() => navigate('/tasbih')}
        >
          <div className="absolute inset-0 bg-islamic-pattern-dark opacity-[0.03]" />
          <p className="text-emerald-900 font-arabic text-4xl text-right mb-6 leading-relaxed relative z-10">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</p>
          <div className="relative z-10">
            <p className="text-emerald-800 font-black text-lg mb-1 tracking-tight">SubhanAllah wa bihamdihi</p>
            <p className="text-[12px] text-emerald-600/80 leading-relaxed font-bold uppercase tracking-wide">Glory be to Allah and His is the praise.</p>
          </div>
          
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000 animate-glow" />
        </motion.div>
      </motion.section>
    </div>
  );
}

