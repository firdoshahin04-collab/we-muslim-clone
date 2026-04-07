import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { getPrayerTimes } from '../lib/adhan';
import { format, addMinutes, isSameMinute, startOfDay, addDays } from 'date-fns';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

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
  stopAdhan: () => void;
  setAdhanAudio: (url: string) => void;
  isAdhanPlaying: boolean;
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
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isAdhanPlaying, setIsAdhanPlaying] = useState(false);
  const adhanPlayPromiseRef = useRef<Promise<void> | null>(null);

  // Request Notification Permissions
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      LocalNotifications.requestPermissions();
    }
  }, []);

  // Schedule Notifications for Background Azan
  const scheduleNotifications = useCallback(async (prayerTimes: any) => {
    if (!Capacitor.isNativePlatform() || !settings.adhanEnabled) return;

    try {
      // Cancel existing notifications first
      await LocalNotifications.cancel({ notifications: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] });

      const prayers = [
        { id: 1, name: 'Fajr', time: prayerTimes.fajr },
        { id: 2, name: 'Dhuhr', time: prayerTimes.dhuhr },
        { id: 3, name: 'Asr', time: prayerTimes.asr },
        { id: 4, name: 'Maghrib', time: prayerTimes.maghrib },
        { id: 5, name: 'Isha', time: prayerTimes.isha },
      ];

      const notifications = prayers
        .filter(p => p.time > new Date()) // Only schedule future prayers
        .map(p => ({
          id: p.id,
          title: `Time for ${p.name}`,
          body: `It's time for ${p.name} prayer.`,
          schedule: { at: p.time, allowWhileIdle: true },
          sound: 'azan.wav', // Custom sound in android/app/src/main/res/raw/
        }));

      if (notifications.length > 0) {
        await LocalNotifications.schedule({ notifications });
      }
    } catch (e) {
      console.error("Failed to schedule notifications:", e);
    }
  }, [settings.adhanEnabled]);

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
      const adjustedTimes: any = {
        fajr: addMinutes(rawTimes.fajr, settings.offsets.fajr),
        sunrise: addMinutes(rawTimes.sunrise, settings.offsets.sunrise),
        dhuhr: addMinutes(rawTimes.dhuhr, settings.offsets.dhuhr),
        asr: addMinutes(rawTimes.asr, settings.offsets.asr),
        maghrib: addMinutes(rawTimes.maghrib, settings.offsets.maghrib),
        isha: addMinutes(rawTimes.isha, settings.offsets.isha),
      };

      // Recalculate current and next prayer based on adjusted times
      const now = new Date();
      const prayerOrder = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
      let current = 'none';
      let next = 'fajr';
      let timeForNext = adjustedTimes.fajr;

      for (let i = 0; i < prayerOrder.length; i++) {
        const p = prayerOrder[i];
        if (now >= adjustedTimes[p]) {
          current = p;
          if (i < prayerOrder.length - 1) {
            next = prayerOrder[i + 1];
            timeForNext = adjustedTimes[next];
          } else {
            // After Isha, next is tomorrow's Fajr
            next = 'fajr';
            timeForNext = addDays(adjustedTimes.fajr, 1);
          }
        }
      }

      setTimes({
        ...adjustedTimes,
        current,
        next,
        timeForNext
      });
    }
  }, [location, settings.offsets]);

  useEffect(() => {
    calculateTimes();
  }, [calculateTimes]);

  useEffect(() => {
    if (times) {
      scheduleNotifications(times);
    }
  }, [times, scheduleNotifications]);

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
          setCurrentAudio(audio);
          setIsAdhanPlaying(true);
          const playPromise = audio.play();
          adhanPlayPromiseRef.current = playPromise;
          playPromise.catch(e => {
            if (e.name !== 'AbortError') console.error("Adhan play failed:", e);
          });
          audio.onended = () => {
            setIsAdhanPlaying(false);
            setCurrentAudio(null);
            adhanPlayPromiseRef.current = null;
          };
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

  const stopAdhan = () => {
    if (currentAudio) {
      const audioToPause = currentAudio;
      if (adhanPlayPromiseRef.current) {
        adhanPlayPromiseRef.current.then(() => {
          audioToPause.pause();
          audioToPause.currentTime = 0;
        }).catch(() => {});
      } else {
        audioToPause.pause();
        audioToPause.currentTime = 0;
      }
      setCurrentAudio(null);
      setIsAdhanPlaying(false);
      adhanPlayPromiseRef.current = null;
    }
  };

  const setAdhanAudio = (url: string) => {
    setSettings(prev => ({ ...prev, adhanAudio: url }));
  };

  return (
    <PrayerContext.Provider value={{ settings, updateOffsets, toggleAdhan, stopAdhan, setAdhanAudio, isAdhanPlaying, times, location }}>
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
