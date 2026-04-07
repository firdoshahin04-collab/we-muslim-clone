import { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { usePrayer } from './PrayerProvider';
import { Clock, MapPin, ChevronRight, Settings as SettingsIcon, Fingerprint, Heart, BookOpen, Quote, Check, Share2, Star, Sun, Moon, Sparkles, Book, Search, VolumeX, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { RubElHizb, CrescentStar, IslamicPattern } from './DecorativeIcons';

const DAILY_VERSES = [
  { arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", meaning: "For indeed, with hardship [will be] ease.", reference: "94:5" },
  { arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا", meaning: "And say, 'My Lord, increase me in knowledge.'", reference: "20:114" },
  { arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", meaning: "Indeed, Allah is with the patient.", reference: "2:153" },
  { arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ", meaning: "And seek help through patience and prayer.", reference: "2:45" },
  { arabic: "نَبِّئْ عِبَادِي أَنِّي أَنَا الْغَفُورُ الرَّحِيمُ", meaning: "Inform My servants that it is I who am the Forgiving, the Merciful.", reference: "15:49" }
];

const DAILY_DUAS = [
  { title: "Dua for Protection", arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", meaning: "In the Name of Allah with Whose Name there is protection against every kind of harm..." },
  { title: "Dua for Forgiveness", arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا", meaning: "Our Lord! Forgive us our sins and our transgressions..." },
  { title: "Dua for Knowledge", arabic: "رَّبِّ زِدْنِي عِلْمًا", meaning: "My Lord, increase me in knowledge." },
  { title: "Dua for Parents", arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا", meaning: "My Lord, have mercy upon them as they brought me up..." }
];

export default function Home() {
  const { times, location, isAdhanPlaying, stopAdhan } = usePrayer();
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRead, setLastRead] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('lastReadSurah');
    if (saved) {
      setLastRead(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dailyVerse = useMemo(() => {
    const day = new Date().getDate();
    return DAILY_VERSES[day % DAILY_VERSES.length];
  }, []);

  const duaOfTheDay = useMemo(() => {
    const day = new Date().getDate();
    return DAILY_DUAS[day % DAILY_DUAS.length];
  }, []);

  // Spiritual Progress State (Persisted in localStorage)
  const [prayersDone, setPrayersDone] = useState<string[]>(() => {
    const saved = localStorage.getItem('prayersDone');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('prayersDone', JSON.stringify(prayersDone));
  }, [prayersDone]);

  const hijriDate = useMemo(() => {
    return new Intl.DateTimeFormat('en-u-ca-islamic-uma', { day: 'numeric', month: 'long', year: 'numeric' }).format(currentTime);
  }, [currentTime]);

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

  const togglePrayer = (name: string) => {
    setPrayersDone(prev => prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]);
  };

  return (
    <div className="flex flex-col gap-6 bg-[#fcfcfd] min-h-full pb-24">
      {/* Premium Header (Non-sticky as per user request to avoid overlap) */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 p-6 z-50 shadow-sm overflow-hidden">
        <IslamicPattern className="opacity-[0.03]" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 rotate-3 group hover:rotate-0 transition-transform duration-500">
                <RubElHizb className="w-6 h-6 text-white" />
              </div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-black text-slate-800 tracking-tight leading-none"
              >
                Assalamu Alaikum
              </motion.h1>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 mt-1"
            >
              <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em]">
                {format(currentTime, 'EEEE, d MMMM')}
              </p>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                {hijriDate}
              </p>
            </motion.div>
          </div>
          <div className="flex gap-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Islamic Hub',
                    text: 'Check out this amazing Islamic app!',
                    url: window.location.href,
                  });
                }
              }}
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-all"
            >
              <Share2 size={20} strokeWidth={2.5} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/settings')}
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-500 hover:text-emerald-600 transition-all"
            >
              <SettingsIcon size={22} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>

        {/* Optimized Search Bar */}
        <div className="mt-6 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search mosque, halal food, or place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                navigate(`/nearby?q=${encodeURIComponent(searchQuery)}`);
              }
            }}
            className="w-full bg-slate-50/50 border border-slate-100 rounded-[24px] py-4 pl-12 pr-16 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all shadow-sm"
          />
          <button 
            onClick={() => searchQuery.trim() && navigate(`/nearby?q=${encodeURIComponent(searchQuery)}`)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200"
          >
            Search
          </button>
        </div>
      </header>

      {/* Features Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-6">
        {[
          { id: 'names', title: '99 Names', icon: Sparkles, color: 'bg-amber-50', iconColor: 'text-amber-600', path: '/names', description: 'Asma-ul-Husna' },
          { id: 'quran', title: 'Holy Quran', icon: Book, color: 'bg-emerald-50', iconColor: 'text-emerald-600', path: '/quran', description: 'Read & Listen' },
          { id: 'duas', title: 'Daily Duas', icon: Heart, color: 'bg-rose-50', iconColor: 'text-rose-600', path: '/duas', description: 'Supplications' },
          { id: 'azkar', title: 'Azkar', icon: Moon, color: 'bg-indigo-50', iconColor: 'text-indigo-600', path: '/azkar', description: 'Remembrance' },
          { id: 'nearby', title: 'Nearby', icon: MapPin, color: 'bg-blue-50', iconColor: 'text-blue-600', path: '/nearby', description: 'Find Masjids' },
          { id: 'tasbih', title: 'Tasbih', icon: Fingerprint, color: 'bg-slate-50', iconColor: 'text-slate-600', path: '/tasbih', description: 'Digital Counter' },
        ].map((feature) => (
          <motion.button
            key={feature.id}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(feature.path)}
            className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm flex flex-col gap-3 group relative overflow-hidden min-w-[160px] shrink-0"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <feature.icon size={60} />
            </div>
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center group-hover:text-white transition-all shadow-inner",
              feature.color,
              feature.iconColor,
              feature.id === 'names' ? 'group-hover:bg-amber-500' : 
              feature.id === 'quran' ? 'group-hover:bg-emerald-500' :
              feature.id === 'duas' ? 'group-hover:bg-rose-500' :
              feature.id === 'azkar' ? 'group-hover:bg-indigo-500' :
              feature.id === 'nearby' ? 'group-hover:bg-blue-500' : 'group-hover:bg-slate-500'
            )}>
              <feature.icon size={24} fill={feature.id === 'names' || feature.id === 'duas' ? "currentColor" : "none"} />
            </div>
            <div className="text-left relative z-10">
              <p className="font-black text-slate-800 tracking-tight text-sm">{feature.title}</p>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{feature.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="px-6 flex flex-col gap-6">
        
      {/* Stop Adhan Button */}
      <AnimatePresence>
        {isAdhanPlaying && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <button
              onClick={stopAdhan}
              className="w-full bg-rose-500 text-white p-6 rounded-[32px] shadow-xl shadow-rose-200 flex items-center justify-between group hover:bg-rose-600 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
                  <VolumeX size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Adhan is playing</p>
                  <p className="text-lg font-black tracking-tight">Stop Adhan Sound</p>
                </div>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-white/30 transition-colors">
                Dismiss
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Prayer Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative overflow-hidden rounded-[48px] bg-slate-900 p-9 text-white shadow-2xl shadow-slate-200 group"
      >
        <motion.div 
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-islamic-pattern opacity-10" 
        />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="bg-emerald-500/20 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/10 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,1)]" />
              <p className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Next: {times.next}</p>
            </div>
            <CrescentStar className="w-8 h-8 text-emerald-400/50 animate-float" />
          </div>
          
          <div className="flex flex-col gap-1 mb-8">
            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Time Remaining</p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-7xl font-black tracking-tighter drop-shadow-2xl"
            >
              {times.timeForNext ? (() => {
                const diff = times.timeForNext.getTime() - currentTime.getTime();
                const hours = Math.floor(diff / 3600000);
                const minutes = Math.floor((diff % 3600000) / 60000);
                const seconds = Math.floor((diff % 60000) / 1000);
                return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
              })() : '--:--:--'}
            </motion.h2>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                <Clock size={18} className="text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Next Adhan</p>
                <p className="text-sm font-black tracking-tight">{times.timeForNext ? format(times.timeForNext, 'hh:mm a') : '--:--'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current</p>
              <p className="text-sm font-black tracking-tight text-emerald-400">{currentPrayer}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Spiritual Progress Tracker */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-[48px] p-8 border border-slate-100 shadow-sm relative overflow-hidden"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.3em]">Daily Progress</h3>
          </div>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{prayersDone.length}/5 Prayers</p>
        </div>

        <div className="flex justify-between gap-2">
          {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((p) => (
            <button 
              key={p}
              onClick={() => togglePrayer(p)}
              className={cn(
                "flex-1 aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border",
                prayersDone.includes(p) 
                  ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-100" 
                  : "bg-slate-50 border-slate-100 text-slate-400 hover:border-emerald-200"
              )}
            >
              <p className="text-[8px] font-black uppercase tracking-tighter">{p}</p>
              {prayersDone.includes(p) ? <Check size={14} strokeWidth={3} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-200" />}
            </button>
          ))}
        </div>

        <div className="mt-6 h-2 bg-slate-50 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(prayersDone.length / 5) * 100}%` }}
          />
        </div>
      </motion.section>

      {/* Missed Prayer Warning Feature */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0a0f1a] rounded-[48px] p-8 text-white relative overflow-hidden border border-white/5 shadow-2xl group"
      >
        <div className="absolute inset-0 bg-islamic-pattern opacity-[0.03]" />
        
        {/* Realistic Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ 
              opacity: prayersDone.length === 5 ? [0.1, 0.2, 0.1] : [0.05, 0.1, 0.05],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className={cn(
              "absolute -right-20 -top-20 w-96 h-96 rounded-full blur-[100px]",
              prayersDone.length < 3 ? "bg-rose-500/20" : "bg-emerald-500/20"
            )}
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse shadow-lg",
              prayersDone.length < 3 ? "bg-rose-500 shadow-rose-500/50" : "bg-emerald-500 shadow-emerald-500/50"
            )} />
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Spiritual Pulse</h3>
          </div>
          
          <div className="flex gap-10 items-center">
            <div className="flex-1">
              <h4 className="text-2xl font-black tracking-tight mb-4 leading-tight">
                {prayersDone.length === 5 
                  ? "Your soul is bathed in divine light." 
                  : prayersDone.length >= 3 
                    ? "Nurture the light within you."
                    : "The shadows are growing longer."}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed italic mb-8 opacity-70 font-medium">
                {prayersDone.length < 3 
                  ? "\"The prayer is a light, and charity is a proof, and patience is illumination.\""
                  : "\"The coolness of my eyes has been provided in prayer.\""}
              </p>
              
              <div className={cn(
                "inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-700",
                prayersDone.length < 3 
                  ? "bg-rose-500/10 border-rose-500/20 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.1)]" 
                  : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.1)]"
              )}>
                <Fingerprint size={16} />
                {prayersDone.length < 3 ? "Urgent: Reclaim your peace" : "Soul State: Luminous"}
              </div>
            </div>
            
            {/* Realistic Lantern/Soul Animation */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Flickering Light Aura */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 0.9, 1.1, 1],
                  opacity: prayersDone.length === 5 ? [0.3, 0.6, 0.4, 0.7, 0.3] : [0.1, 0.3, 0.2, 0.4, 0.1],
                }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
                className={cn(
                  "absolute w-24 h-24 rounded-full blur-3xl",
                  prayersDone.length < 3 ? "bg-rose-500" : "bg-emerald-400"
                )}
              />

              {/* Lantern Structure */}
              <div className="relative z-10 w-20 h-28 flex flex-col items-center">
                <div className="w-8 h-2 bg-slate-800 rounded-full mb-1" />
                <div className={cn(
                  "w-16 h-20 rounded-2xl border-2 relative overflow-hidden flex items-center justify-center transition-colors duration-1000",
                  prayersDone.length < 3 ? "border-rose-900/50 bg-rose-950/30" : "border-emerald-900/50 bg-emerald-950/30"
                )}>
                  {/* Internal Flame */}
                  <motion.div 
                    animate={{ 
                      scale: prayersDone.length === 5 ? [1, 1.1, 0.9, 1] : [0.6, 0.8, 0.5, 0.6],
                      y: [0, -2, 1, 0],
                      opacity: prayersDone.length === 0 ? 0.2 : 1
                    }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                    className={cn(
                      "w-8 h-12 rounded-full blur-sm",
                      prayersDone.length < 3 ? "bg-gradient-to-t from-rose-600 to-orange-400" : "bg-gradient-to-t from-emerald-500 to-yellow-200"
                    )}
                  />
                  
                  {/* Glass Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                </div>
                <div className="w-12 h-3 bg-slate-800 rounded-b-xl mt-1" />
              </div>

              {/* Rising Smoke/Light Particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 20, x: 0, opacity: 0, scale: 0 }}
                    animate={{ 
                      y: -80, 
                      x: Math.sin(i) * 30,
                      opacity: [0, 0.8, 0],
                      scale: [0, 1.5, 0.5]
                    }}
                    transition={{ 
                      duration: 3 + Math.random() * 2, 
                      repeat: Infinity, 
                      delay: i * 0.8 
                    }}
                    className={cn(
                      "absolute bottom-1/4 left-1/2 w-1.5 h-1.5 rounded-full blur-[1px]",
                      prayersDone.length < 3 ? "bg-rose-400/40" : "bg-emerald-400/40"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Prayer Schedule moved here */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
        className="grid grid-cols-1 gap-3"
      >
        <div className="flex items-center justify-between px-2 mb-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Prayer Schedule</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/settings')}
              className="p-1.5 bg-slate-100 text-slate-500 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-all"
            >
              <SettingsIcon size={12} />
            </motion.button>
          </div>
          <div className="h-[1px] flex-1 mx-4 bg-slate-100" />
          <button 
            onClick={() => navigate('/settings')}
            className="text-[9px] font-black text-emerald-600 uppercase tracking-widest hover:underline"
          >
            Edit Timing
          </button>
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
              )}>{format(prayer.time, 'hh:mm a')}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Continue Reading / Verse of the Day Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-[48px] p-8 border border-slate-100 shadow-sm relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 p-8 opacity-[0.02] group-hover:opacity-5 transition-opacity">
          <BookOpen size={120} />
        </div>
        
        {lastRead ? (
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.3em]">Continue Reading</h3>
              </div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
                Last read: {new Date(lastRead.timestamp).toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                  <Book size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-800 tracking-tight">Surah {lastRead.englishName}</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Verse {lastRead.ayahNumber}</p>
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/surah/${lastRead.number}`)}
                className="w-full py-5 bg-emerald-600 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 hover:bg-emerald-500 transition-all"
              >
                <Play size={16} fill="currentColor" />
                Resume Reading
              </motion.button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.3em]">Verse of the Day</h3>
              </div>
              <button onClick={() => navigate('/quran')} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Read More</button>
            </div>
            <div className="relative z-10 space-y-4">
              <p className="text-3xl font-arabic text-emerald-700 text-right leading-relaxed">{dailyVerse.arabic}</p>
              <div className="flex gap-4">
                <Quote size={20} className="text-emerald-100 shrink-0" />
                <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"{dailyVerse.meaning}"</p>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">— Surah {dailyVerse.reference}</p>
            </div>
          </>
        )}
      </motion.section>

      {/* Dua of the Day */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-emerald-900 rounded-[48px] p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-900/40"
      >
        <div className="absolute inset-0 bg-islamic-pattern opacity-10" />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <h3 className="text-[11px] font-black text-emerald-200 uppercase tracking-[0.3em]">Featured Dua</h3>
            </div>
            <button onClick={() => navigate('/duas')} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-black tracking-tight">{duaOfTheDay.title}</h4>
            <p className="text-2xl font-arabic text-emerald-300 text-right leading-relaxed">{duaOfTheDay.arabic}</p>
            <p className="text-xs text-emerald-100/70 font-medium leading-relaxed italic line-clamp-2">"{duaOfTheDay.meaning}"</p>
          </div>
        </div>
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
    </div>
  );
}

