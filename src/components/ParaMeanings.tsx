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
  const [urduAudioVerses, setUrduAudioVerses] = useState<any[]>([]);
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
      const [arabicRes, urduRes, urduAudioRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/ar.alafasy`),
        fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/ur.jalandhry`),
        fetch(`https://api.alquran.cloud/v1/juz/${juzNumber}/ur.khan`)
      ]);
      const arabicData = await arabicRes.json();
      const urduData = await urduRes.json();
      const urduAudioData = await urduAudioRes.json();
      
      setVerses(arabicData.data.ayahs);
      setTranslationVerses(urduData.data.ayahs);
      setUrduAudioVerses(urduAudioData.data.ayahs);
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
      const [arabicRes, urduRes, urduAudioRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ur.jalandhry`),
        fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ur.khan`)
      ]);
      const arabicData = await arabicRes.json();
      const urduData = await urduRes.json();
      const urduAudioData = await urduAudioRes.json();
      
      setVerses(arabicData.data.ayahs);
      setTranslationVerses(urduData.data.ayahs);
      setUrduAudioVerses(urduAudioData.data.ayahs);
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
    const urduAudioVerse = urduAudioVerses[verseIndex];
    let url = "";
    
    if (isTranslation) {
      // Try ur.khan first, then transVerse.audio, then everyayah
      url = urduAudioVerse?.audio || transVerse?.audio || "";
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
      audioRef.current.onerror = null;
    }

    const handleNextStep = () => {
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

    const handleFallback = () => {
      if (isTranslation && transVerse?.text) {
        console.log("Urdu audio failed, using TTS fallback...");
        const utterance = new SpeechSynthesisUtterance(transVerse.text);
        utterance.lang = 'ur-PK';
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => {
          handleNextStep();
        };
        window.speechSynthesis.speak(utterance);
      } else {
        handleNextStep();
      }
    };

    if (!url) {
      handleFallback();
      return;
    }

    const audio = new Audio(url);
    audioRef.current = audio;
    setIsPlaying(true);
    setIsReadingTranslation(isTranslation);
    
    audio.play().catch(err => {
      console.error(`Audio play failed (${isTranslation ? 'Urdu' : 'Arabic'}):`, err, "URL:", url);
      handleFallback();
    });

    audio.onerror = () => {
      console.error(`Audio load failed (${isTranslation ? 'Urdu' : 'Arabic'}):`, url);
      handleFallback();
    };

    audio.onended = () => {
      handleNextStep();
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
    <div className="flex flex-col h-full bg-[#f8f9fb] overflow-hidden pb-24">
      {/* Header */}
      <header className="p-6 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-islamic-pattern opacity-[0.03] scale-150" />
        <div className="relative z-10">
          <h1 className="text-2xl font-black tracking-tight text-slate-800 mb-1">Para Meanings</h1>
          <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em]">Maulana Jalandhari Urdu Translation</p>
        </div>
      </header>

      {/* List of Paras and Surahs */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-lg font-black text-slate-800 tracking-tight">30 Paras</h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Complete Quran</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {PARAS.filter(p => p.type === 'para').map((para, i) => (
              <motion.button
                key={para.number}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02 }}
                onClick={() => openPlayer(para)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-[24px] transition-all group relative overflow-hidden border",
                  selectedPara?.number === para.number && selectedPara.type === 'para' 
                    ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-100" 
                    : "bg-white border-slate-100 hover:border-emerald-200 hover:shadow-md text-slate-800"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                  selectedPara?.number === para.number && selectedPara.type === 'para' 
                    ? "bg-white/20 text-white" 
                    : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                )}>
                  <Music size={20} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-black text-sm tracking-tight">{para.englishName}</h3>
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-widest mt-0.5",
                    selectedPara?.number === para.number && selectedPara.type === 'para' ? "text-emerald-100" : "text-slate-400"
                  )}>{para.name}</p>
                </div>
                <div className={cn(
                  "transition-all duration-500",
                  selectedPara?.number === para.number && selectedPara.type === 'para' ? "text-white" : "text-slate-200 group-hover:text-emerald-500"
                )}>
                  <Play size={18} fill="currentColor" />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-lg font-black text-slate-800 tracking-tight">Popular Surahs</h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Featured</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {PARAS.filter(p => p.type === 'surah').map((para, i) => (
              <motion.button
                key={para.number}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => openPlayer(para)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-[24px] transition-all group relative overflow-hidden border",
                  selectedPara?.number === para.number && selectedPara.type === 'surah' 
                    ? "bg-slate-900 border-slate-800 text-white shadow-xl shadow-slate-200" 
                    : "bg-white border-slate-100 hover:border-emerald-200 hover:shadow-md text-slate-800"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                  selectedPara?.number === para.number && selectedPara.type === 'surah' 
                    ? "bg-emerald-600 text-white" 
                    : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                )}>
                  <Music size={20} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-black text-sm tracking-tight">{para.englishName}</h3>
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-widest mt-0.5",
                    selectedPara?.number === para.number && selectedPara.type === 'surah' ? "text-slate-400" : "text-slate-400"
                  )}>{para.name}</p>
                </div>
                <div className={cn(
                  "transition-all duration-500",
                  selectedPara?.number === para.number && selectedPara.type === 'surah' ? "text-emerald-500" : "text-slate-200 group-hover:text-emerald-500"
                )}>
                  <Play size={18} fill="currentColor" />
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      </div>

      {/* Player Bar */}
      <AnimatePresence>
        {selectedPara && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-24 left-4 right-4 bg-slate-900 rounded-[28px] p-4 flex items-center justify-between shadow-2xl z-50 border border-white/5"
            onClick={() => setShowPlayer(true)}
          >
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl shadow-lg flex items-center justify-center flex-shrink-0">
                <Music size={24} className="text-white" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-black text-white truncate tracking-tight">{selectedPara.englishName}</h4>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest truncate">
                  {isReadingTranslation ? "Urdu Translation" : "Arabic Recitation"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
                className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 hover:scale-105 transition-transform shadow-lg"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col"
          >
            <div className="absolute inset-0 bg-islamic-pattern opacity-[0.02] scale-150 pointer-events-none" />
            
            <header className="flex items-center justify-between p-6 relative z-10">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPlayer(false)} 
                className="p-3 bg-slate-50 text-slate-400 rounded-2xl"
              >
                <ChevronDown size={24} />
              </motion.button>
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Now Playing</p>
                <p className="text-xs font-black text-slate-800">{selectedPara.englishName}</p>
              </div>
              <button className="p-3 text-slate-400">
                <MoreHorizontal size={24} />
              </button>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10 overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center gap-6">
                  <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-emerald-600 text-sm font-black uppercase tracking-widest animate-pulse">Loading Verses...</p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-10">
                  {showLyrics ? (
                    <div 
                      ref={lyricsRef}
                      className="w-full h-full overflow-y-auto py-10 space-y-12 scrollbar-hide"
                    >
                      {verses.map((v, i) => (
                        <motion.div 
                          key={v.number} 
                          data-verse-index={i}
                          className={cn(
                            "transition-all duration-700 p-6 rounded-[32px]",
                            currentVerseIndex === i ? "bg-emerald-50 scale-105 shadow-sm" : "opacity-30 scale-95"
                          )}
                        >
                          <p className="text-right text-3xl font-arabic mb-6 leading-relaxed text-slate-800 font-bold" dir="rtl">{v.text}</p>
                          <p className={cn(
                            "text-lg font-medium leading-relaxed text-right",
                            currentVerseIndex === i && isReadingTranslation ? "text-emerald-800 font-black" : "text-slate-500"
                          )}>
                            {translationVerses[i]?.text || v.text}
                          </p>
                          <div className="mt-4 flex justify-end">
                            <span className="text-[10px] font-black text-emerald-600/40 uppercase tracking-widest">Verse {v.numberInSurah}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <motion.div 
                        animate={{ 
                          scale: isPlaying ? 1 : 0.9,
                          rotate: isPlaying ? [0, 1, -1, 0] : 0
                        }}
                        transition={{ 
                          rotate: { repeat: Infinity, duration: 5, ease: "linear" }
                        }}
                        className="w-full aspect-square max-w-[320px] bg-slate-900 rounded-[48px] shadow-2xl flex items-center justify-center relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-islamic-pattern opacity-10 scale-150" />
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                        <Music size={120} className="text-white/5 absolute" />
                        <div className="text-center z-10">
                          <h2 className="text-6xl font-black text-white mb-2 tracking-tighter">{selectedPara.number}</h2>
                          <p className="text-xl font-black text-emerald-400 uppercase tracking-[0.3em]">{selectedPara.type === 'para' ? 'JUZ' : 'SURAH'}</p>
                        </div>
                        <div className="absolute inset-4 border-2 border-white/5 rounded-[40px]" />
                      </motion.div>

                      <div className="w-full space-y-8">
                        <div className="flex justify-between items-center">
                          <div>
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-1">{selectedPara.englishName}</h2>
                            <p className="text-emerald-600 text-sm font-black uppercase tracking-widest">
                              {isReadingTranslation ? "Maulana Jalandhari" : "Mishary Rashid Alafasy"}
                            </p>
                          </div>
                          <motion.button 
                            whileTap={{ scale: 0.8 }}
                            className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center"
                          >
                            <Heart size={24} fill="currentColor" />
                          </motion.button>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-3">
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-emerald-600 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: verses.length > 0 ? `${((currentVerseIndex + (isReadingTranslation ? 1 : 0.5)) / verses.length) * 100}%` : 0 }}
                              transition={{ duration: 0.5 }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
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

            <div className="p-8 bg-slate-50 rounded-t-[64px] space-y-8 relative z-10">
              <div className="flex items-center justify-between">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowLyrics(!showLyrics)}
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                    showLyrics ? "bg-emerald-600 text-white shadow-lg" : "bg-white text-slate-400 shadow-sm"
                  )}
                >
                  <List size={20} />
                </motion.button>
                <div className="flex items-center gap-8">
                  <motion.button whileTap={{ scale: 0.8 }} onClick={handlePrev} className="text-slate-800"><SkipBack size={32} fill="currentColor" /></motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePlayPause}
                    className="w-20 h-20 bg-slate-900 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-slate-400"
                  >
                    {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.8 }} onClick={handleNext} className="text-slate-800"><SkipForward size={32} fill="currentColor" /></motion.button>
                </div>
                <motion.button whileTap={{ scale: 0.9 }} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                  <Repeat size={20} />
                </motion.button>
              </div>

              <div className="flex items-center justify-between text-slate-300 px-6">
                <Volume2 size={20} />
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ height: isPlaying ? [4, 12, 4] : 4 }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                      className="w-1 bg-emerald-500 rounded-full"
                    />
                  ))}
                </div>
                <Shuffle size={20} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
