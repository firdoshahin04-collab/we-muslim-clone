import { useState, useEffect } from 'react';
import { Book, Search, Play, ChevronRight, Sparkles, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { RubElHizb, IslamicPattern } from './DecorativeIcons';

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export default function Quran() {
  const navigate = useNavigate();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then((res) => res.json())
      .then((data) => {
        setSurahs(data.data);
        setLoading(false);
      });
  }, []);

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.number.toString().includes(search)
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd] pb-24">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 p-6 z-50 shadow-sm overflow-hidden">
        <IslamicPattern className="opacity-[0.03]" />
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
            <h1 className="text-xl font-black text-slate-800 tracking-tight">The Holy Quran</h1>
          </div>
          <RubElHizb className="w-8 h-8 text-emerald-600/20 animate-spin-slow" />
        </div>
        
        <div className="relative z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search surah name or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-100 rounded-[20px] py-3.5 pl-12 pr-4 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all font-medium"
          />
        </div>
      </header>

      <div className="p-6 space-y-8">
        {!search && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-200 group"
          >
            <div className="absolute inset-0 bg-islamic-pattern opacity-10 scale-150 group-hover:scale-125 transition-transform duration-[10s]" />
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Sparkles size={18} className="text-emerald-400" />
                </div>
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Surah of the Day</p>
              </div>
              <div>
                <h2 className="text-4xl font-black tracking-tighter mb-1">Al-Kahf</h2>
                <p className="text-emerald-100/60 text-xs font-bold uppercase tracking-widest">The Cave • 110 Verses</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/surah/18')}
                className="w-full py-5 bg-emerald-600 rounded-[24px] text-center font-black uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20"
              >
                Continue Reading
              </motion.button>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-600/20 rounded-full blur-[100px]" />
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {filteredSurahs.map((surah) => (
            <motion.button
              key={surah.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/surah/${surah.number}`)}
              className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-100 transition-all flex items-center gap-6 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-5 transition-opacity">
                <RubElHizb className="w-[120px] h-[120px]" />
              </div>
              
              <div className="w-16 h-16 rounded-[24px] bg-slate-50 text-slate-800 flex items-center justify-center text-lg font-black shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shrink-0">
                {surah.number}
              </div>
              
              <div className="flex-1 text-left">
                <h3 className="text-lg font-black text-slate-800 tracking-tight group-hover:text-emerald-700 transition-colors">{surah.englishName}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{surah.englishNameTranslation}</p>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-arabic text-emerald-700 font-bold mb-1">{surah.name}</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{surah.numberOfAyahs} Verses</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
