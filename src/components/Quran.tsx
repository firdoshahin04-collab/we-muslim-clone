import { useState, useEffect } from 'react';
import { Book, Search, Play, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

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
    <div className="p-5 flex flex-col gap-6 bg-[#f8f9fb] min-h-full">
      <header className="flex flex-col gap-1">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black text-slate-800 tracking-tight"
        >
          The Holy Quran
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-[11px] font-bold uppercase tracking-widest"
        >
          Read and listen to the divine words
        </motion.p>
      </header>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative group"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search Surah by name or number..." 
          className="w-full bg-white border border-slate-200 rounded-[20px] py-3.5 pl-12 pr-5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm shadow-slate-200/50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-3">
        {loading ? (
          Array(10).fill(0).map((_, i) => (
            <div key={i} className="h-20 bg-white border border-slate-100 rounded-[24px] animate-pulse" />
          ))
        ) : (
          filteredSurahs.map((surah, i) => (
            <Link 
              key={surah.number}
              to={`/quran/${surah.number}`}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i % 10) * 0.05 }}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-4 rounded-[28px] border border-slate-100 flex justify-between items-center shadow-sm hover:shadow-md hover:border-emerald-100 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-xs shadow-inner">
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-800 group-hover:text-emerald-600 transition-colors tracking-tight">{surah.englishName}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{surah.revelationType} • {surah.numberOfAyahs} Ayahs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right mr-1">
                    <p className="text-xl font-arabic text-emerald-700 font-bold">{surah.name}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
