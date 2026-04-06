import React from 'react';
import { usePrayer, ADHAN_OPTIONS } from './PrayerProvider';
import { Bell, BellOff, Volume2, Clock, ChevronRight, Settings as SettingsIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Settings() {
  const { settings, updateOffsets, toggleAdhan, setAdhanAudio } = usePrayer();

  const prayers = [
    { id: 'fajr', name: 'Fajr' },
    { id: 'sunrise', name: 'Sunrise' },
    { id: 'dhuhr', name: 'Dhuhr' },
    { id: 'asr', name: 'Asr' },
    { id: 'maghrib', name: 'Maghrib' },
    { id: 'isha', name: 'Isha' },
  ];

  const previewAudioRef = React.useRef<HTMLAudioElement | null>(null);

  const previewAudio = (url: string) => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
    }
    const audio = new Audio(url);
    previewAudioRef.current = audio;
    audio.play().catch(e => console.error("Preview failed:", e));
    // Stop after 5 seconds
    setTimeout(() => {
      if (previewAudioRef.current === audio) {
        audio.pause();
      }
    }, 5000);
  };

  React.useEffect(() => {
    return () => {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="p-6 flex flex-col gap-8 bg-[#f8f9fb] min-h-full">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 text-sm">Customize your prayer experience</p>
      </header>

      {/* Adhan Alarm Toggle */}
      <section className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
              settings.adhanEnabled ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
            )}>
              {settings.adhanEnabled ? <Bell size={24} /> : <BellOff size={24} />}
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Adhan Alarm</h3>
              <p className="text-xs text-slate-400">Play Adhan at prayer times</p>
            </div>
          </div>
          <button 
            onClick={() => toggleAdhan(!settings.adhanEnabled)}
            className={cn(
              "w-14 h-8 rounded-full transition-all relative p-1",
              settings.adhanEnabled ? "bg-emerald-500" : "bg-slate-200"
            )}
          >
            <motion.div 
              animate={{ x: settings.adhanEnabled ? 24 : 0 }}
              className="w-6 h-6 bg-white rounded-full shadow-sm"
            />
          </button>
        </div>
      </section>

      {/* Adhan Audio Choice */}
      <section className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Volume2 size={20} className="text-emerald-600" />
          <h3 className="font-bold text-slate-800">Adhan Audio</h3>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {ADHAN_OPTIONS.map((option) => (
            <button 
              key={option.url}
              onClick={() => {
                setAdhanAudio(option.url);
                previewAudio(option.url);
              }}
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border transition-all",
                settings.adhanAudio === option.url ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-transparent hover:bg-slate-100"
              )}
            >
              <span className={cn(
                "font-medium",
                settings.adhanAudio === option.url ? "text-emerald-700" : "text-slate-600"
              )}>{option.name}</span>
              {settings.adhanAudio === option.url && <div className="w-2 h-2 bg-emerald-500 rounded-full" />}
            </button>
          ))}
        </div>
      </section>

      {/* Time Adjustments */}
      <section className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Clock size={20} className="text-emerald-600" />
          <h3 className="font-bold text-slate-800">Adjust Prayer Times</h3>
        </div>
        <div className="space-y-4">
          {prayers.map((prayer) => (
            <div key={prayer.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span className="font-medium text-slate-700">{prayer.name}</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => updateOffsets({ [prayer.id]: settings.offsets[prayer.id as keyof typeof settings.offsets] - 1 })}
                  className="w-8 h-8 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-emerald-600">
                  {settings.offsets[prayer.id as keyof typeof settings.offsets] > 0 ? '+' : ''}
                  {settings.offsets[prayer.id as keyof typeof settings.offsets]}m
                </span>
                <button 
                  onClick={() => updateOffsets({ [prayer.id]: settings.offsets[prayer.id as keyof typeof settings.offsets] + 1 })}
                  className="w-8 h-8 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center py-8">
        <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">Islamic App v2.0</p>
      </div>
    </div>
  );
}
