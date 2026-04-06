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
    <div className="p-6 flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">The Holy Quran</h1>
        <p className="text-slate-500">Read and listen to the divine words</p>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search Surah..." 
          className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {loading ? (
          Array(10).fill(0).map((_, i) => (
            <div key={i} className="h-20 bg-slate-100 rounded-2xl animate-pulse" />
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
                className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center hover:shadow-md transition-all cursor-pointer group mb-3"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-sm">
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{surah.englishName}</h3>
                    <p className="text-xs text-slate-400">{surah.revelationType} • {surah.numberOfAyahs} Ayahs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right mr-2">
                    <p className="text-lg font-arabic text-emerald-700">{surah.name}</p>
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
