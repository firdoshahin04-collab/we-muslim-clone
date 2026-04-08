import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Pause, Volume2, Share2, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { RubElHizb, IslamicPattern } from './DecorativeIcons';
import { awardKarma } from '../lib/karma';
import { useAudio } from './AudioProvider';

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  audio: string;
}

interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
}

export default function SurahView() {
  const { number } = useParams();
  const navigate = useNavigate();
  const { playTrack, pauseTrack, resumeTrack, isPlaying: isGlobalPlaying, currentTrack } = useAudio();
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [translation, setTranslation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [karmaAwarded, setKarmaAwarded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setReadingTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (readingTime >= 600 && !karmaAwarded) {
      awardKarma(50);
      setKarmaAwarded(true);
      alert("MashaAllah! You've earned 50 points for reading Quran for 10 minutes.");
    }
  }, [readingTime, karmaAwarded]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchSurah = async () => {
      setLoading(true);
      try {
        const [arabicRes, transRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/surah/${number}/quran-uthmani`),
          fetch(`https://api.alquran.cloud/v1/surah/${number}/ur.jalandhry`),
        ]);
        const arabicData = await arabicRes.json();
        const transData = await transRes.json();
        
        setSurah(arabicData.data);
        setTranslation(transData.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurah();
  }, [number]);

  const [isReadingTranslation, setIsReadingTranslation] = useState(false);

  useEffect(() => {
    if (surah && playingAyah) {
      const ayah = surah.ayahs.find(a => a.number === playingAyah);
      if (ayah) {
        localStorage.setItem('lastReadSurah', JSON.stringify({
          number: surah.number,
          englishName: surah.englishName,
          ayahNumber: ayah.numberInSurah,
          timestamp: Date.now()
        }));
      }
    }
  }, [surah, playingAyah]);

  const playUrduOnly = (ayahIndex: number) => {
    if (!surah || !translation) return;
    const ayah = surah.ayahs[ayahIndex];
    
    // Use EveryAyah as a more reliable fallback for Urdu
    const surahNum = String(surah.number).padStart(3, '0');
    const ayahNum = String(ayah.numberInSurah).padStart(3, '0');
    const urduAudioUrl = `https://everyayah.com/data/Urdu_Jalandhry_128kbps/${surahNum}${ayahNum}.mp3`;
    
    if (currentTrack === urduAudioUrl && isGlobalPlaying) {
      pauseTrack();
      setPlayingAyah(null);
    } else {
      playTrack(urduAudioUrl, `Surah ${surah.englishName}`, `Ayah ${ayah.numberInSurah} (Urdu)`);
      setPlayingAyah(ayah.number);
      setIsReadingTranslation(true);
    }
  };

  const playSequentialAudio = (ayahIndex: number) => {
    if (!surah) return;
    const ayah = surah.ayahs[ayahIndex];
    
    // Use the audio URL from the object if it exists, otherwise construct it
    const arabicAudioUrl = ayah.audio || `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3`;
    
    if (currentTrack === arabicAudioUrl && isGlobalPlaying) {
      pauseTrack();
      setPlayingAyah(null);
    } else {
      playTrack(arabicAudioUrl, `Surah ${surah.englishName}`, `Ayah ${ayah.numberInSurah} (Arabic)`);
      setPlayingAyah(ayah.number);
      setIsReadingTranslation(false);
    }
  };

  const togglePlayback = () => {
    if (isGlobalPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-500 font-medium">Loading divine verses...</p>
    </div>
  );
  
  if (!surah) return <div className="p-8 text-center">Surah not found.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd] pb-24">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 p-6 z-50 shadow-sm overflow-hidden">
        <IslamicPattern className="opacity-[0.03]" />
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-emerald-500 z-50"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", bounce: 0, duration: 0.1 }}
        />
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)} 
              className="p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-2xl transition-all"
            >
              <ChevronLeft size={22} />
            </motion.button>
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-black text-slate-800 tracking-tight text-lg leading-none mb-1"
              >
                {surah.englishName}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em]"
              >
                {surah.revelationType} • {surah.numberOfAyahs} Verses
              </motion.p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-arabic text-emerald-700 leading-none font-bold">{surah.name}</p>
          </div>
        </div>
      </header>

      <div className="p-6 flex flex-col gap-12">
        {surah.number !== 1 && surah.number !== 9 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: [0, -10, 0],
            }}
            transition={{ 
              opacity: { duration: 0.6 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="text-center py-16 bg-white rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-islamic-pattern opacity-5 scale-125" />
            <p className="text-5xl font-arabic text-slate-800 relative z-10">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p className="text-[10px] text-slate-400 mt-8 uppercase tracking-[0.4em] font-black relative z-10">In the name of Allah, the Most Gracious, the Most Merciful</p>
            <div className="absolute inset-0 bg-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>
        )}

        <div className="flex flex-col gap-16">
          {surah.ayahs.map((ayah, index) => (
            <motion.div 
              key={ayah.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className={cn(
                "flex flex-col gap-8 p-8 rounded-[48px] transition-all duration-700 relative overflow-hidden",
                playingAyah === ayah.number 
                  ? "bg-white border-emerald-100 shadow-2xl shadow-emerald-200/40 ring-1 ring-emerald-50" 
                  : "bg-white/60 border border-slate-50 shadow-sm hover:shadow-md hover:bg-white transition-all"
              )}
            >
              {playingAyah === ayah.number && (
                <div className="absolute inset-0 bg-islamic-pattern opacity-[0.03] scale-110 pointer-events-none" />
              )}
              
              <div className="flex justify-between items-center relative z-10">
                <div className="relative">
                  <RubElHizb className="w-14 h-14 text-emerald-100 absolute inset-0 -rotate-12" />
                  <div className="w-14 h-14 rounded-[22px] bg-emerald-50 text-emerald-700 flex items-center justify-center text-sm font-black shadow-inner relative z-10">
                    {ayah.numberInSurah}
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => playSequentialAudio(index)}
                    className={cn(
                      "w-14 h-14 rounded-[22px] flex items-center justify-center transition-all duration-500 shadow-sm",
                      playingAyah === ayah.number && !isReadingTranslation 
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                        : "bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                    )}
                  >
                    {playingAyah === ayah.number && !isReadingTranslation ? <Pause size={24} /> : <Play size={24} />}
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => playUrduOnly(index)}
                    className={cn(
                      "w-14 h-14 rounded-[22px] flex items-center justify-center transition-all duration-500 shadow-sm",
                      playingAyah === ayah.number && isReadingTranslation 
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                        : "bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                    )}
                  >
                    <Volume2 size={24} />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-10 relative z-10">
                <p className="text-right text-5xl font-arabic leading-[1.8] text-slate-800 font-bold" dir="rtl">
                  {ayah.text}
                </p>
                <div className="pt-10 border-t border-slate-100/80">
                  <p 
                    dir="rtl"
                    className={cn(
                      "text-slate-600 font-medium leading-relaxed transition-all duration-500 text-right text-xl",
                      isReadingTranslation && playingAyah === ayah.number ? "text-emerald-800 font-black" : "text-slate-500"
                    )}
                  >
                    {translation?.ayahs[index].text}
                  </p>
                  <div className="flex items-center justify-between mt-8">
                    <p className="text-[10px] text-slate-300 uppercase tracking-[0.3em] font-black">Urdu Translation</p>
                    {playingAyah === ayah.number && (
                      <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="flex items-center gap-3 text-[10px] text-emerald-600 font-black uppercase tracking-widest"
                      >
                        <div className="flex gap-1">
                          {[1, 2, 3].map(i => (
                            <motion.div 
                              key={i}
                              animate={{ height: [4, 12, 4] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                              className="w-0.5 bg-emerald-500 rounded-full"
                            />
                          ))}
                        </div>
                        {isReadingTranslation ? "Reading Translation..." : "Reciting Arabic..."}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              
              {playingAyah === ayah.number && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 rounded-r-full"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Audio Controls Bar */}
      <AnimatePresence>
        {playingAyah && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] glass rounded-[32px] p-4 flex items-center gap-4 z-[60] shadow-2xl border border-white/40"
          >
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayback}
              className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200 shrink-0"
            >
              {isGlobalPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
            </motion.button>
            
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest truncate">
                {isReadingTranslation ? "Urdu Translation" : "Arabic Recitation"}
              </p>
              <p className="text-xs font-black text-slate-800 truncate">
                Ayah {surah.ayahs.find(a => a.number === playingAyah)?.numberInSurah} of {surah.englishName}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="p-10 mt-20 bg-slate-900 text-white rounded-t-[60px] relative overflow-hidden"
      >
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-4 tracking-tight">Full Quran PDF</h3>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-xs">Download or read the complete Holy Quran in high-quality PDF format for offline reading.</p>
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://quran.com/pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block w-full py-5 bg-emerald-600 rounded-[24px] text-center font-black uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20"
          >
            Open Quran PDF
          </motion.a>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl" />
      </motion.div>
    </div>
  );
}
