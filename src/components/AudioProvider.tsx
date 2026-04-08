import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  currentTrack: string | null;
  trackTitle: string | null;
  trackSubtitle: string | null;
  playTrack: (url: string, title: string, subtitle: string) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  stopTrack: () => void;
  progress: number;
  duration: number;
  seek: (time: number) => void;
  setOnEnded: (callback: (() => void) | undefined) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [trackTitle, setTrackTitle] = useState<string | null>(null);
  const [trackSubtitle, setTrackSubtitle] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const onEndedRef = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      if (onEndedRef.current) onEndedRef.current();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.pause();
      audio.src = ""; // Clear source to avoid memory leaks and interruptions
      audioRef.current = null;
    };
  }, []);

  const playTrack = React.useCallback(async (url: string, title: string, subtitle: string) => {
    if (!audioRef.current) return;

    // If same track, just resume
    if (currentTrack === url) {
      resumeTrack();
      return;
    }

    // Wait for any pending play promise to settle before pausing
    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current;
      } catch (e) {
        // Ignore errors from previous play attempts
      }
    }
    
    audioRef.current.pause();

    setCurrentTrack(url);
    setTrackTitle(title);
    setTrackSubtitle(subtitle);
    audioRef.current.src = url;
    
    try {
      const promise = audioRef.current.play();
      playPromiseRef.current = promise;
      await promise;
      setIsPlaying(true);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error("Audio playback failed:", error);
      }
      setIsPlaying(false);
    }
  }, [currentTrack]);

  const pauseTrack = React.useCallback(async () => {
    if (!audioRef.current) return;
    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current;
      } catch (e) {}
    }
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  const resumeTrack = React.useCallback(async () => {
    if (!audioRef.current || !currentTrack) return;
    try {
      const promise = audioRef.current.play();
      playPromiseRef.current = promise;
      await promise;
      setIsPlaying(true);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error("Audio resume failed:", error);
      }
    }
  }, [currentTrack]);

  const stopTrack = React.useCallback(async () => {
    if (!audioRef.current) return;
    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current;
      } catch (e) {}
    }
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTrack(null);
    setTrackTitle(null);
    setTrackSubtitle(null);
  }, []);

  const seek = React.useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  }, []);

  const setOnEnded = React.useCallback((callback: (() => void) | undefined) => {
    onEndedRef.current = callback;
  }, []);

  const value = React.useMemo(() => ({
    isPlaying,
    currentTrack,
    trackTitle,
    trackSubtitle,
    playTrack,
    pauseTrack,
    resumeTrack,
    stopTrack,
    progress,
    duration,
    seek,
    setOnEnded
  }), [
    isPlaying,
    currentTrack,
    trackTitle,
    trackSubtitle,
    playTrack,
    pauseTrack,
    resumeTrack,
    stopTrack,
    progress,
    duration,
    seek,
    setOnEnded
  ]);

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
