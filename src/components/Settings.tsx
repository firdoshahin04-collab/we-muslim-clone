import React from 'react';
import { usePrayer, ADHAN_OPTIONS } from './PrayerProvider';
import { Bell, BellOff, Volume2, Clock, ChevronRight, Settings as SettingsIcon, Shield, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Settings() {
  const { settings, updateOffsets, toggleAdhan, toggleMosqueMode, setAdhanAudio } = usePrayer();

  const prayers = [
    { id: 'fajr', name: 'Fajr' },
    { id: 'sunrise', name: 'Sunrise' },
    { id: 'dhuhr', name: 'Dhuhr' },
    { id: 'asr', name: 'Asr' },
    { id: 'maghrib', name: 'Maghrib' },
    { id: 'isha', name: 'Isha' },
  ];

  const previewAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const previewAudioPromiseRef = React.useRef<Promise<void> | null>(null);

  const previewAudio = (url: string) => {
    if (previewAudioRef.current) {
      const audioToPause = previewAudioRef.current;
      if (previewAudioPromiseRef.current) {
        previewAudioPromiseRef.current.then(() => {
          audioToPause.pause();
          audioToPause.currentTime = 0;
        }).catch(() => {});
      } else {
        audioToPause.pause();
        audioToPause.currentTime = 0;
      }
    }
    
    const audio = new Audio(url);
    previewAudioRef.current = audio;
    
    const playPromise = audio.play();
    previewAudioPromiseRef.current = playPromise;
    
    if (playPromise !== undefined) {
      playPromise.catch(e => {
        if (e.name !== 'AbortError') {
          console.error("Preview failed:", e);
        }
      });
    }

    // Stop after 5 seconds
    setTimeout(() => {
      if (previewAudioRef.current === audio) {
        if (previewAudioPromiseRef.current) {
          previewAudioPromiseRef.current.then(() => {
            audio.pause();
          }).catch(() => {});
        } else {
          audio.pause();
        }
      }
    }, 5000);
  };

  React.useEffect(() => {
    return () => {
      if (previewAudioRef.current) {
        const audioToPause = previewAudioRef.current;
        if (previewAudioPromiseRef.current) {
          previewAudioPromiseRef.current.then(() => {
            audioToPause.pause();
          }).catch(() => {});
        } else {
          audioToPause.pause();
        }
      }
    };
  }, []);

  return (
    <div className="p-7 flex flex-col gap-8 bg-[#f8f9fb] min-h-full">
      <header className="flex flex-col gap-1">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-slate-800 tracking-tight"
        >
          Settings
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-[11px] font-black uppercase tracking-widest"
        >
          Customize your prayer experience
        </motion.p>
      </header>

      {/* Adhan Alarm Toggle */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-7 rounded-[40px] border border-slate-100 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className={cn(
              "w-14 h-14 rounded-[22px] flex items-center justify-center transition-all duration-500 shadow-inner",
              settings.adhanEnabled ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
            )}>
              {settings.adhanEnabled ? <Bell size={26} /> : <BellOff size={26} />}
            </div>
            <div>
              <h3 className="font-black text-slate-800 tracking-tight">Adhan Alarm</h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Play Adhan at prayer times</p>
            </div>
          </div>
          <button 
            onClick={() => toggleAdhan(!settings.adhanEnabled)}
            className={cn(
              "w-16 h-9 rounded-full transition-all relative p-1.5 shadow-inner",
              settings.adhanEnabled ? "bg-emerald-500" : "bg-slate-200"
            )}
          >
            <motion.div 
              animate={{ x: settings.adhanEnabled ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-6 h-6 bg-white rounded-full shadow-md"
            />
          </button>
        </div>
      </motion.section>

      {/* Auto-Silent Geofencing Toggle */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white p-7 rounded-[40px] border border-slate-100 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className={cn(
              "w-14 h-14 rounded-[22px] flex items-center justify-center transition-all duration-500 shadow-inner",
              settings.mosqueModeEnabled ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-400"
            )}>
              <MapPin size={26} />
            </div>
            <div>
              <h3 className="font-black text-slate-800 tracking-tight">Mosque Mode</h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Auto-Silent in Masajid</p>
            </div>
          </div>
          <button 
            onClick={() => toggleMosqueMode(!settings.mosqueModeEnabled)}
            className={cn(
              "w-16 h-9 rounded-full transition-all relative p-1.5 shadow-inner",
              settings.mosqueModeEnabled ? "bg-blue-500" : "bg-slate-200"
            )}
          >
            <motion.div 
              animate={{ x: settings.mosqueModeEnabled ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-6 h-6 bg-white rounded-full shadow-md"
            />
          </button>
        </div>
      </motion.section>

      {/* Adhan Audio Choice */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-7 rounded-[40px] border border-slate-100 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-7">
          <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <Volume2 size={20} />
          </div>
          <h3 className="font-black text-slate-800 tracking-tight">Adhan Audio</h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {ADHAN_OPTIONS.map((option) => (
            <motion.button 
              key={option.url}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setAdhanAudio(option.url);
                previewAudio(option.url);
              }}
              className={cn(
                "flex items-center justify-between p-5 rounded-[24px] border transition-all duration-500",
                settings.adhanAudio === option.url 
                  ? "bg-emerald-50 border-emerald-100 shadow-sm" 
                  : "bg-slate-50 border-transparent hover:bg-slate-100"
              )}
            >
              <span className={cn(
                "font-black text-sm tracking-tight",
                settings.adhanAudio === option.url ? "text-emerald-800" : "text-slate-600"
              )}>{option.name}</span>
              {settings.adhanAudio === option.url && (
                <motion.div 
                  layoutId="active-audio"
                  className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Time Adjustments */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-7 rounded-[40px] border border-slate-100 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-7">
          <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <Clock size={20} />
          </div>
          <h3 className="font-black text-slate-800 tracking-tight">Adjust Prayer Times</h3>
        </div>
        <div className="space-y-3">
          {prayers.map((prayer) => (
            <div key={prayer.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-[24px] border border-transparent hover:border-slate-100 transition-all">
              <span className="font-black text-sm text-slate-700 tracking-tight">{prayer.name}</span>
              <div className="flex items-center gap-5">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateOffsets({ [prayer.id]: settings.offsets[prayer.id as keyof typeof settings.offsets] - 1 })}
                  className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all shadow-sm font-black"
                >
                  -
                </motion.button>
                <span className="w-14 text-center font-black text-emerald-600 text-sm tracking-tighter">
                  {settings.offsets[prayer.id as keyof typeof settings.offsets] > 0 ? '+' : ''}
                  {settings.offsets[prayer.id as keyof typeof settings.offsets]}m
                </span>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => updateOffsets({ [prayer.id]: settings.offsets[prayer.id as keyof typeof settings.offsets] + 1 })}
                  className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all shadow-sm font-black"
                >
                  +
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <div className="text-center py-12">
        <p className="text-[10px] text-slate-300 uppercase tracking-[0.4em] font-black">Islamic App v2.0</p>
      </div>
    </div>
  );
}
