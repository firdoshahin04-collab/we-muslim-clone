import { useState, useEffect } from 'react';
import { Book, Search, Play, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
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
    <div className="p-5 flex flex-col gap-6 bg-[#f8f9fb] min-h-full pb-24">
      <header className="relative overflow-hidden rounded-[32px] p-8 bg-slate-900 text-white shadow-2xl shadow-slate-200 group">
        <motion.div 
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
            scale: [1.5, 1.6, 1.5]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-islamic-pattern opacity-10" 
        />
        <div className="relative z-10 flex items-center justify-between w-full">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-black tracking-tight mb-2"
            >
              The Holy Quran
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-emerald-400 text-[11px] font-bold uppercase tracking-[0.2em]"
            >
              Read and listen to the divine words
            </motion.p>
          </div>
          <RubElHizb className="w-12 h-12 text-emerald-500/50 animate-float" />
        </div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500 rounded-full blur-3xl" 
        />
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative group"
      >
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Search Surah by name or number..." 
          className="w-full bg-white border border-slate-100 rounded-[24px] py-4.5 pl-14 pr-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm shadow-slate-200/50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
        className="grid grid-cols-1 gap-4"
      >
        {loading ? (
          Array(10).fill(0).map((_, i) => (
            <div key={i} className="h-24 bg-white border border-slate-100 rounded-[32px] animate-pulse" />
          ))
        ) : (
          filteredSurahs.map((surah) => (
            <Link 
              key={surah.number}
              to={`/quran/${surah.number}`}
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-5 rounded-[32px] border border-slate-100 flex justify-between items-center shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-100 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-center gap-5 relative z-10">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[20px] flex items-center justify-center font-black text-sm shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500"
                  >
                    {surah.number}
                  </motion.div>
                  <div>
                    <h3 className="font-black text-base text-slate-800 group-hover:text-emerald-700 transition-colors tracking-tight">{surah.englishName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{surah.revelationType}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{surah.numberOfAyahs} Ayahs</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  <div className="text-right">
                    <p className="text-2xl font-arabic text-slate-800 font-bold group-hover:text-emerald-700 transition-colors">{surah.name}</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-all duration-500">
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </motion.div>
    </div>
  );
}
