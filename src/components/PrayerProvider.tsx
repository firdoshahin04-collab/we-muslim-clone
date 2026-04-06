import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getPrayerTimes } from '../lib/adhan';
import { format, addMinutes, isSameMinute } from 'date-fns';

interface PrayerOffsets {
  fajr: number;
  sunrise: number;
  dhuhr: number;
  asr: number;
  maghrib: number;
  isha: number;
}

interface PrayerSettings {
  offsets: PrayerOffsets;
  adhanEnabled: boolean;
  adhanAudio: string;
}

interface PrayerContextType {
  settings: PrayerSettings;
  updateOffsets: (offsets: Partial<PrayerOffsets>) => void;
  toggleAdhan: (enabled: boolean) => void;
  setAdhanAudio: (url: string) => void;
  times: any;
  location: { lat: number; lng: number } | null;
}

const ADHAN_OPTIONS = [
  { name: 'Makkah', url: 'https://www.islamcan.com/audio/adhan/azan1.mp3' },
  { name: 'Madinah', url: 'https://www.islamcan.com/audio/adhan/azan2.mp3' },
  { name: 'Al-Aqsa', url: 'https://www.islamcan.com/audio/adhan/azan3.mp3' },
  { name: 'Egypt', url: 'https://www.islamcan.com/audio/adhan/azan4.mp3' },
  { name: 'Turkey', url: 'https://www.islamcan.com/audio/adhan/azan5.mp3' },
];

const PrayerContext = createContext<PrayerContextType | undefined>(undefined);

export const PrayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [settings, setSettings] = useState<PrayerSettings>(() => {
    const saved = localStorage.getItem('prayer_settings');
    return saved ? JSON.parse(saved) : {
      offsets: { fajr: 0, sunrise: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 },
      adhanEnabled: true,
      adhanAudio: ADHAN_OPTIONS[0].url,
    };
  });

  const [times, setTimes] = useState<any>(null);
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('prayer_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setLocation({ lat: 21.4225, lng: 39.8262 }) // Default Mecca
    );
  }, []);

  const calculateTimes = useCallback(() => {
    if (location) {
      const rawTimes = getPrayerTimes(location.lat, location.lng);
      const adjustedTimes = {
        ...rawTimes,
        fajr: addMinutes(rawTimes.fajr, settings.offsets.fajr),
        sunrise: addMinutes(rawTimes.sunrise, settings.offsets.sunrise),
        dhuhr: addMinutes(rawTimes.dhuhr, settings.offsets.dhuhr),
        asr: addMinutes(rawTimes.asr, settings.offsets.asr),
        maghrib: addMinutes(rawTimes.maghrib, settings.offsets.maghrib),
        isha: addMinutes(rawTimes.isha, settings.offsets.isha),
      };
      setTimes(adjustedTimes);
    }
  }, [location, settings.offsets]);

  useEffect(() => {
    calculateTimes();
  }, [calculateTimes]);

  // Adhan Alarm Logic
  useEffect(() => {
    if (!settings.adhanEnabled || !times) return;

    const checkAdhan = () => {
      const now = new Date();
      const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
      
      for (const prayer of prayers) {
        const prayerTime = times[prayer];
        const prayerKey = `${prayer}_${format(prayerTime, 'yyyyMMddHHmm')}`;

        if (isSameMinute(now, prayerTime) && lastPlayed !== prayerKey) {
          const audio = new Audio(settings.adhanAudio);
          audio.play().catch(e => console.error("Adhan play failed:", e));
          setLastPlayed(prayerKey);
          break;
        }
      }
    };

    const interval = setInterval(checkAdhan, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [settings.adhanEnabled, settings.adhanAudio, times, lastPlayed]);

  const updateOffsets = (newOffsets: Partial<PrayerOffsets>) => {
    setSettings(prev => ({ ...prev, offsets: { ...prev.offsets, ...newOffsets } }));
  };

  const toggleAdhan = (enabled: boolean) => {
    setSettings(prev => ({ ...prev, adhanEnabled: enabled }));
  };

  const setAdhanAudio = (url: string) => {
    setSettings(prev => ({ ...prev, adhanAudio: url }));
  };

  return (
    <PrayerContext.Provider value={{ settings, updateOffsets, toggleAdhan, setAdhanAudio, times, location }}>
      {children}
    </PrayerContext.Provider>
  );
};

export const usePrayer = () => {
  const context = useContext(PrayerContext);
  if (!context) throw new Error('usePrayer must be used within a PrayerProvider');
  return context;
};

export { ADHAN_OPTIONS };
