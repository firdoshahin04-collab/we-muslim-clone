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
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 p-4 flex items-center gap-4 z-10 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-slate-800">{surah.englishName}</h1>
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{surah.revelationType} • {surah.numberOfAyahs} Verses</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-arabic text-emerald-700 leading-none">{surah.name}</p>
        </div>
      </header>

      <div className="p-6 flex flex-col gap-10">
        {surah.number !== 1 && surah.number !== 9 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-10 bg-white rounded-[32px] border border-slate-100 shadow-sm"
          >
            <p className="text-4xl font-arabic text-slate-800">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <p className="text-xs text-slate-400 mt-4 uppercase tracking-widest font-medium">In the name of Allah, the Most Gracious, the Most Merciful</p>
          </motion.div>
        )}

        <div className="flex flex-col gap-16">
          {surah.ayahs.map((ayah, index) => (
            <motion.div 
              key={ayah.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className={cn(
                "flex flex-col gap-6 p-6 rounded-[32px] transition-all duration-500",
                playingAyah === ayah.number ? "bg-emerald-50 border-emerald-100 shadow-md" : "bg-white border-transparent"
              )}
            >
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shadow-sm">
                  {ayah.numberInSurah}
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => playSequentialAudio(index)}
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm",
                      playingAyah === ayah.number && !isReadingTranslation ? "bg-emerald-600 text-white scale-110" : "bg-slate-50 text-slate-400 hover:text-emerald-600"
                    )}
                    title="Play Arabic + Urdu"
                  >
                    {playingAyah === ayah.number && !isReadingTranslation ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button 
                    onClick={() => playUrduOnly(index)}
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm",
                      playingAyah === ayah.number && isReadingTranslation ? "bg-emerald-600 text-white scale-110" : "bg-slate-50 text-slate-400 hover:text-emerald-600"
                    )}
                    title="Play Urdu Translation"
                  >
                    <Volume2 size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-right text-4xl font-arabic leading-[1.8] text-slate-800" dir="rtl">
                  {ayah.text}
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <p 
                    dir="rtl"
                    className={cn(
                      "text-slate-600 font-medium leading-relaxed transition-colors duration-300 text-right",
                      isReadingTranslation && playingAyah === ayah.number ? "text-emerald-700 font-bold" : "text-slate-600"
                    )}
                  >
                    {translation?.ayahs[index].text}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">Urdu Translation</p>
                    {isReadingTranslation && playingAyah === ayah.number && (
                      <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold uppercase tracking-widest"
                      >
                        <Volume2 size={10} /> Reading...
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* PDF Link Section */}
      <div className="p-8 mt-12 bg-slate-900 text-white rounded-t-[48px]">
        <h3 className="text-xl font-bold mb-4">Full Quran PDF</h3>
        <p className="text-slate-400 text-sm mb-6">Download or read the complete Holy Quran in high-quality PDF format.</p>
        <a 
          href="https://quran.com/pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full py-4 bg-emerald-600 rounded-2xl text-center font-bold hover:bg-emerald-500 transition-colors"
        >
          Open Quran PDF
        </a>
      </div>
    </div>
  );
}
