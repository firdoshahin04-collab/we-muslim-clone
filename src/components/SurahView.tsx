import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Pause, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

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
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [translation, setTranslation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchSurah = async () => {
      setLoading(true);
      try {
        const [arabicRes, transRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/surah/${number}/ar.alafasy`),
          fetch(`https://api.alquran.cloud/v1/surah/${number}/ur.jalandhry`) // Maulana Jalandhari Urdu Translation
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

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playUrduOnly = (ayahIndex: number) => {
    if (!surah || !translation) return;
    
    const ayah = surah.ayahs[ayahIndex];
    const transAyah = translation.ayahs[ayahIndex];

    if (audioRef.current) {
      audioRef.current.pause();
      if (playingAyah === ayah.number && isReadingTranslation) {
        setPlayingAyah(null);
        setIsReadingTranslation(false);
        return;
      }
    }

    const surahNum = String(surah.number).padStart(3, '0');
    const ayahNum = String(ayah.numberInSurah).padStart(3, '0');
    let urduAudioUrl = transAyah.audio || `https://everyayah.com/data/Urdu_Jalandhry_128kbps/${surahNum}${ayahNum}.mp3`;
    
    // Ensure https
    if (urduAudioUrl.startsWith('http:')) urduAudioUrl = urduAudioUrl.replace('http:', 'https:');

    const urduAudio = new Audio(urduAudioUrl);
    audioRef.current = urduAudio;
    setPlayingAyah(ayah.number);
    setIsReadingTranslation(true);
    urduAudio.play().catch(err => {
      console.error("Urdu audio play failed, falling back to TTS:", err);
      const utterance = new SpeechSynthesisUtterance(transAyah.text);
      utterance.lang = 'ur-PK';
      utterance.onend = () => {
        setPlayingAyah(null);
        setIsReadingTranslation(false);
      };
      window.speechSynthesis.speak(utterance);
    });

    urduAudio.onended = () => {
      setPlayingAyah(null);
      setIsReadingTranslation(false);
    };
  };

  const playSequentialAudio = async (ayahIndex: number) => {
    if (!surah || !translation) return;
    
    const ayah = surah.ayahs[ayahIndex];
    const transAyah = translation.ayahs[ayahIndex];

    if (audioRef.current) {
      audioRef.current.pause();
      if (playingAyah === ayah.number && !isReadingTranslation) {
        setPlayingAyah(null);
        return;
      }
    }

    // Play Arabic first
    const arabicAudio = new Audio(ayah.audio);
    audioRef.current = arabicAudio;
    setPlayingAyah(ayah.number);
    setIsReadingTranslation(false);
    
    arabicAudio.play().catch(err => console.error("Arabic audio play failed:", err));

    arabicAudio.onended = () => {
      // After Arabic, play Jalandhari Urdu Audio immediately
      const surahNum = String(surah.number).padStart(3, '0');
      const ayahNum = String(ayah.numberInSurah).padStart(3, '0');
      let urduAudioUrl = transAyah.audio || `https://everyayah.com/data/Urdu_Jalandhry_128kbps/${surahNum}${ayahNum}.mp3`;
      
      // Ensure https
      if (urduAudioUrl.startsWith('http:')) urduAudioUrl = urduAudioUrl.replace('http:', 'https:');
      
      const urduAudio = new Audio(urduAudioUrl);
      audioRef.current = urduAudio;
      setIsReadingTranslation(true);
      
      urduAudio.play().catch(err => {
        console.error("Urdu audio play failed, falling back to TTS:", err);
        const utterance = new SpeechSynthesisUtterance(transAyah.text);
        utterance.lang = 'ur-PK';
        utterance.onend = () => {
          setPlayingAyah(null);
          setIsReadingTranslation(false);
        };
        window.speechSynthesis.speak(utterance);
      });

      urduAudio.onended = () => {
        setPlayingAyah(null);
        setIsReadingTranslation(false);
      };
    };
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-500 font-medium">Loading divine verses...</p>
    </div>
  );
  
  if (!surah) return <div className="p-8 text-center">Surah not found.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd]">
      <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-100 p-5 flex items-center gap-4 z-50 shadow-sm">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)} 
          className="p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-2xl transition-all"
        >
          <ChevronLeft size={22} />
        </motion.button>
        <div className="flex-1">
          <motion.h1 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-black text-slate-800 tracking-tight"
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
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-right"
        >
          <p className="text-3xl font-arabic text-emerald-700 leading-none font-bold">{surah.name}</p>
        </motion.div>
      </header>

      <div className="p-6 flex flex-col gap-12">
        {surah.number !== 1 && surah.number !== 9 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-white rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group"
          >
            <p className="text-5xl font-arabic text-slate-800 relative z-10">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p className="text-[10px] text-slate-400 mt-6 uppercase tracking-[0.3em] font-black relative z-10">In the name of Allah, the Most Gracious, the Most Merciful</p>
            <div className="absolute inset-0 bg-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>
        )}

        <div className="flex flex-col gap-20">
          {surah.ayahs.map((ayah, index) => (
            <motion.div 
              key={ayah.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className={cn(
                "flex flex-col gap-8 p-8 rounded-[40px] transition-all duration-700 relative",
                playingAyah === ayah.number ? "bg-white border-emerald-100 shadow-2xl shadow-emerald-100/50 ring-1 ring-emerald-50" : "bg-white/40 border-transparent"
              )}
            >
              <div className="flex justify-between items-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-black shadow-inner">
                  {ayah.numberInSurah}
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

              <div className="space-y-8">
                <p className="text-right text-5xl font-arabic leading-[1.8] text-slate-800 font-bold" dir="rtl">
                  {ayah.text}
                </p>
                <div className="pt-8 border-t border-slate-100/50">
                  <p 
                    dir="rtl"
                    className={cn(
                      "text-slate-600 font-medium leading-relaxed transition-all duration-500 text-right text-lg",
                      isReadingTranslation && playingAyah === ayah.number ? "text-emerald-800 font-black" : "text-slate-600"
                    )}
                  >
                    {translation?.ayahs[index].text}
                  </p>
                  <div className="flex items-center justify-between mt-6">
                    <p className="text-[10px] text-slate-300 uppercase tracking-[0.25em] font-black">Urdu Translation</p>
                    {playingAyah === ayah.number && (
                      <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="flex items-center gap-2 text-[10px] text-emerald-600 font-black uppercase tracking-widest"
                      >
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map(i => (
                            <motion.div 
                              key={i}
                              animate={{ height: [4, 10, 4] }}
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
                  className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-emerald-500 rounded-r-full"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
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
