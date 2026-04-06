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
    <div className="p-4 flex flex-col gap-4">
      <header>
        <h1 className="text-xl font-bold text-slate-800">The Holy Quran</h1>
        <p className="text-slate-500 text-xs">Read and listen to the divine words</p>
      </header>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input 
          type="text" 
          placeholder="Search Surah..." 
          className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        {loading ? (
          Array(10).fill(0).map((_, i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
          ))
        ) : (
          filteredSurahs.map((surah) => (
            <Link 
              key={surah.number}
              to={`/quran/${surah.number}`}
            >
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-3 rounded-xl border border-slate-100 flex justify-between items-center hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-xs">
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800 group-hover:text-emerald-600 transition-colors">{surah.englishName}</h3>
                    <p className="text-[10px] text-slate-400">{surah.revelationType} • {surah.numberOfAyahs} Ayahs</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right mr-1">
                    <p className="text-base font-arabic text-emerald-700">{surah.name}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
