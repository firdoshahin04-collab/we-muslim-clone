import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, List, Music, Volume2, ChevronDown, MoreHorizontal, Heart, Shuffle, Repeat } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Para {
  number: number;
  name: string;
  englishName: string;
  type: 'para' | 'surah';
}

const PARAS: Para[] = [
  ...Array.from({ length: 30 }, (_, i) => ({
    number: i + 1,
    name: `Para ${i + 1}`,
    englishName: `Juz ${i + 1}`,
    type: 'para' as const,
  })),
  { number: 36, name: 'Surah Yaseen', englishName: 'Ya-Sin', type: 'surah' as const },
  { number: 67, name: 'Surah Al-Mulk', englishName: 'Al-Mulk', type: 'surah' as const },
  { number: 18, name: 'Surah Al-Kahf', englishName: 'Al-Kahf', type: 'surah' as const },
  { number: 55, name: 'Surah Ar-Rahman', englishName: 'Ar-Rahman', type: 'surah' as const },
  { number: 56, name: 'Surah Al-Waqi\'a', englishName: 'Al-Waqi\'a', type: 'surah' as const },
];

export default function ParaMeanings() {
  const [selectedPara, setSelectedPara] = useState<Para | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [verses, setVerses] = useState<any[]>([]);
  const [translationVerses, setTranslationVerses] = useState<any[]>([]);
  const [isReadingTranslation, setIsReadingTranslation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (selectedPara) {
      if (selectedPara.type === 'para') {
        fetchParaVerses(selectedPara.number);
      } else {
        fetchSurahVerses(selectedPara.number);
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [selectedPara]);

  const fetchParaVerses = async (juzNumber: number) => {
    setLoading(true);
    try {
      const [arabicRes, urduRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/ar.alafasy`),
        fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/ur.jalandhry`)
      ]);
      const arabicData = await arabicRes.json();
      const urduData = await urduRes.json();
      setVerses(arabicData.data.ayahs);
      setTranslationVerses(urduData.data.ayahs);
      setCurrentVerseIndex(0);
      setIsReadingTranslation(false);
    } catch (error) {
      console.error("Failed to fetch Para verses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSurahVerses = async (surahNumber: number) => {
    setLoading(true);
    try {
      const [arabicRes, urduRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ur.jalandhry`)
      ]);
      const arabicData = await arabicRes.json();
      const urduData = await urduRes.json();
      setVerses(arabicData.data.ayahs);
      setTranslationVerses(urduData.data.ayahs);
      setCurrentVerseIndex(0);
      setIsReadingTranslation(false);
    } catch (error) {
      console.error("Failed to fetch Surah verses:", error);
    } finally {
      setLoading(false);
    }
  };

  const [showLyrics, setShowLyrics] = useState(false);
  const lyricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lyricsRef.current && showLyrics) {
      const activeVerse = lyricsRef.current.querySelector(`[data-verse-index="${currentVerseIndex}"]`);
      if (activeVerse) {
        activeVerse.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentVerseIndex, showLyrics]);

  const playAudio = (verseIndex: number, isTranslation: boolean) => {
    if (verses.length === 0) return;
    
    const verse = verses[verseIndex];
    const transVerse = translationVerses[verseIndex];
    let url = "";
    
    if (isTranslation) {
      // Use the audio URL from the API if available, otherwise fallback to everyayah
      url = transVerse?.audio || "";
      if (!url) {
        let sNum = 1;
        if (selectedPara?.type === 'surah') {
          sNum = selectedPara.number;
        } else if (verse.surah && typeof verse.surah.number === 'number') {
          sNum = verse.surah.number;
        } else if (typeof verse.surah === 'number') {
          sNum = verse.surah;
        }
        const surahNum = String(sNum).padStart(3, '0');
        const ayahNum = String(verse.numberInSurah).padStart(3, '0');
        url = `https://everyayah.com/data/Urdu_Jalandhry_128kbps/${surahNum}${ayahNum}.mp3`;
      }
      // Ensure https
      if (url && url.startsWith('http:')) url = url.replace('http:', 'https:');
    } else {
      url = verse.audio || `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${verse.number}.mp3`;
      if (url && url.startsWith('http:')) url = url.replace('http:', 'https:');
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
    }

    if (!url) {
      console.error("No audio URL found for", isTranslation ? "Urdu" : "Arabic");
      handleNext();
      return;
    }

    const audio = new Audio(url);
    audioRef.current = audio;
    setIsPlaying(true);
    setIsReadingTranslation(isTranslation);
    
    audio.play().catch(err => {
      console.error(`Audio play failed (${isTranslation ? 'Urdu' : 'Arabic'}):`, err, "URL:", url);
      // If Urdu fails, try to move to next Arabic verse
      if (isTranslation) {
        if (verseIndex < verses.length - 1) {
          setCurrentVerseIndex(verseIndex + 1);
          playAudio(verseIndex + 1, false);
        } else {
          setIsPlaying(false);
        }
      } else {
        // If Arabic fails, try Urdu for same verse
        playAudio(verseIndex, true);
      }
    });

    // Pre-load next audio
    if (!isTranslation) {
      const nextUrl = translationVerses[verseIndex]?.audio;
      if (nextUrl) {
        const preloader = new Audio(nextUrl.replace('http:', 'https:'));
        preloader.preload = "auto";
      }
    }

    audio.onended = () => {
      if (!isTranslation) {
        // Play Urdu after Arabic for the same verse
        playAudio(verseIndex, true);
      } else {
        // Play next verse Arabic
        if (verseIndex < verses.length - 1) {
          setCurrentVerseIndex(verseIndex + 1);
          playAudio(verseIndex + 1, false);
        } else {
          setIsPlaying(false);
        }
      }
    };
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        playAudio(currentVerseIndex, isReadingTranslation);
      }
    }
  };

  const handleNext = () => {
    if (currentVerseIndex < verses.length - 1) {
      const nextIndex = currentVerseIndex + 1;
      setCurrentVerseIndex(nextIndex);
      playAudio(nextIndex, false);
    }
  };

  const handlePrev = () => {
    if (currentVerseIndex > 0) {
      const prevIndex = currentVerseIndex - 1;
      setCurrentVerseIndex(prevIndex);
      playAudio(prevIndex, false);
    }
  };

  const openPlayer = (para: Para) => {
    setSelectedPara(para);
    setShowPlayer(true);
    // Auto play will happen after verses are fetched in useEffect
  };

  // Auto play when verses are loaded
  useEffect(() => {
    if (verses.length > 0 && selectedPara && isPlaying === false && !audioRef.current) {
      playAudio(0, false);
    }
  }, [verses]);

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white overflow-hidden">
      {/* Header */}
      <header className="p-4 bg-gradient-to-b from-[#1e1e1e] to-[#121212]">
        <h1 className="text-2xl font-black tracking-tight mb-1">Para Meanings</h1>
        <p className="text-slate-400 text-xs font-medium">Maulana Jalandhari Urdu Translation</p>
      </header>

      {/* List of Paras and Surahs */}
      <div className="flex-1 overflow-y-auto px-3 pb-32">
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 px-2">30 Paras</h2>
          <div className="grid grid-cols-1 gap-0.5">
            {PARAS.filter(p => p.type === 'para').map((para) => (
              <button
                key={para.number}
                onClick={() => openPlayer(para)}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg transition-all group",
                  selectedPara?.number === para.number && selectedPara.type === 'para' ? "bg-[#282828]" : "hover:bg-[#1a1a1a]"
                )}
              >
                <div className="w-10 h-10 bg-[#282828] rounded flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                  <Music size={18} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className={cn(
                    "font-bold text-sm transition-colors",
                    selectedPara?.number === para.number && selectedPara.type === 'para' ? "text-emerald-500" : "text-white"
                  )}>{para.englishName}</h3>
                  <p className="text-[10px] text-slate-400">{para.name}</p>
                </div>
                <div className="text-slate-500 group-hover:text-white transition-colors">
                  <Play size={14} fill="currentColor" className={cn(selectedPara?.number === para.number && selectedPara.type === 'para' ? "text-emerald-500" : "")} />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3 px-2">Popular Surahs</h2>
          <div className="grid grid-cols-1 gap-0.5">
            {PARAS.filter(p => p.type === 'surah').map((para) => (
              <button
                key={para.number}
                onClick={() => openPlayer(para)}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg transition-all group",
                  selectedPara?.number === para.number && selectedPara.type === 'surah' ? "bg-[#282828]" : "hover:bg-[#1a1a1a]"
                )}
              >
                <div className="w-10 h-10 bg-emerald-900/30 rounded flex items-center justify-center text-emerald-500 group-hover:text-white transition-colors">
                  <Music size={18} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className={cn(
                    "font-bold text-sm transition-colors",
                    selectedPara?.number === para.number && selectedPara.type === 'surah' ? "text-emerald-500" : "text-white"
                  )}>{para.englishName}</h3>
                  <p className="text-[10px] text-slate-400">{para.name}</p>
                </div>
                <div className="text-slate-500 group-hover:text-white transition-colors">
                  <Play size={14} fill="currentColor" className={cn(selectedPara?.number === para.number && selectedPara.type === 'surah' ? "text-emerald-500" : "")} />
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Spotify-like Player Bar */}
      <AnimatePresence>
        {selectedPara && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-20 left-0 right-0 mx-2 bg-[#1e1e1e] rounded-xl p-3 flex items-center justify-between shadow-2xl border border-[#282828] z-50"
            onClick={() => setShowPlayer(true)}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 bg-emerald-600 rounded shadow-lg flex items-center justify-center">
                <Music size={20} className="text-white" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold truncate">{selectedPara.englishName}</h4>
                <p className="text-[10px] text-slate-400 truncate">
                  {isReadingTranslation ? "Urdu Translation" : "Arabic Recitation"} - Verse {currentVerseIndex + 1}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Player */}
      <AnimatePresence>
        {showPlayer && selectedPara && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="fixed inset-0 bg-gradient-to-b from-[#2e2e2e] to-[#121212] z-[60] flex flex-col p-6"
          >
            <header className="flex items-center justify-between mb-8">
              <button onClick={() => setShowPlayer(false)} className="p-2 text-white/70 hover:text-white">
                <ChevronDown size={24} />
              </button>
              <div className="text-center">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/60">Playing from Para Meanings</p>
                <p className="text-[10px] font-bold">{selectedPara.englishName}</p>
              </div>
              <button className="p-2 text-white/70 hover:text-white">
                <MoreHorizontal size={20} />
              </button>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center gap-8 overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-emerald-500 text-sm font-bold animate-pulse">Loading Verses...</p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                  {showLyrics ? (
                    <div 
                      ref={lyricsRef}
                      className="w-full h-full overflow-y-auto px-2 py-4 space-y-6 scrollbar-hide"
                    >
                      {verses.map((v, i) => (
                        <div 
                          key={v.number} 
                          data-verse-index={i}
                          className={cn(
                            "transition-all duration-500",
                            currentVerseIndex === i ? "opacity-100 scale-105" : "opacity-30 scale-95"
                          )}
                        >
                          <p className="text-right text-2xl font-arabic mb-3 leading-relaxed" dir="rtl">{v.text}</p>
                          <p className={cn(
                            "text-base font-medium leading-relaxed",
                            currentVerseIndex === i && isReadingTranslation ? "text-emerald-400" : "text-white/70"
                          )}>
                            {v.numberInSurah}. {translationVerses[i]?.text || v.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <motion.div 
                        animate={{ scale: isPlaying ? 1 : 0.95 }}
                        className="w-full aspect-square max-w-[280px] bg-gradient-to-br from-emerald-600 to-emerald-900 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden"
                      >
                        <Music size={100} className="text-white/20 absolute" />
                        <div className="text-center z-10 p-4">
                          <h2 className="text-3xl font-black mb-1">{selectedPara.number}</h2>
                          <p className="text-lg font-bold opacity-80">{selectedPara.type === 'para' ? 'JUZ' : 'SURAH'}</p>
                        </div>
                      </motion.div>

                      <div className="w-full space-y-1">
                        <div className="flex justify-between items-end">
                          <div>
                            <h2 className="text-xl font-bold">{selectedPara.englishName}</h2>
                            <p className="text-emerald-500 text-sm font-medium">
                              {isReadingTranslation ? "Maulana Jalandhari" : "Mishary Rashid Alafasy"}
                            </p>
                          </div>
                          <button className="text-emerald-500">
                            <Heart size={20} fill="currentColor" />
                          </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="pt-3 space-y-1">
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-white"
                              initial={{ width: 0 }}
                              animate={{ width: verses.length > 0 ? `${((currentVerseIndex + (isReadingTranslation ? 1 : 0.5)) / verses.length) * 100}%` : 0 }}
                            />
                          </div>
                          <div className="flex justify-between text-[9px] font-bold text-white/40 uppercase tracking-wider">
                            <span>Verse {currentVerseIndex + 1}</span>
                            <span>{verses.length} Verses</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="mt-auto space-y-6">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setShowLyrics(!showLyrics)}
                  className={cn(
                    "transition-colors",
                    showLyrics ? "text-emerald-500" : "text-white/40 hover:text-white"
                  )}
                >
                  <List size={18} />
                </button>
                <div className="flex items-center gap-6">
                  <button onClick={handlePrev} className="text-white hover:scale-110 transition-transform"><SkipBack size={28} fill="currentColor" /></button>
                  <button 
                    onClick={handlePlayPause}
                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-xl"
                  >
                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                  </button>
                  <button onClick={handleNext} className="text-white hover:scale-110 transition-transform"><SkipForward size={28} fill="currentColor" /></button>
                </div>
                <button className="text-white/40 hover:text-white transition-colors"><Repeat size={18} /></button>
              </div>

              <div className="flex items-center justify-between text-white/40 px-4">
                <Volume2 size={18} />
                <Shuffle size={18} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
