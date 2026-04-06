import { useState } from 'react';
import { ChevronLeft, Search, Play, Pause, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const NAMES = [
  { id: 1, name: "Ar-Rahman", transliteration: "The Most Merciful", arabic: "الرحمن" },
  { id: 2, name: "Ar-Rahim", transliteration: "The Most Kind", arabic: "الرحيم" },
  { id: 3, name: "Al-Malik", transliteration: "The Sovereign", arabic: "الملك" },
  { id: 4, name: "Al-Quddus", transliteration: "The Most Pure", arabic: "القدوس" },
  { id: 5, name: "As-Salam", transliteration: "The Source of Peace", arabic: "السلام" },
  { id: 6, name: "Al-Mu'min", transliteration: "The Giver of Faith", arabic: "المؤمن" },
  { id: 7, name: "Al-Muhaymin", transliteration: "The Guardian", arabic: "المهيمن" },
  { id: 8, name: "Al-Aziz", transliteration: "The Almighty", arabic: "العزيز" },
  { id: 9, name: "Al-Jabbar", transliteration: "The Compeller", arabic: "الجبار" },
  { id: 10, name: "Al-Mutakabbir", transliteration: "The Supreme", arabic: "المتكبر" },
  // ... adding more for "detail"
  { id: 11, name: "Al-Khaliq", transliteration: "The Creator", arabic: "الخالق" },
  { id: 12, name: "Al-Bari", transliteration: "The Evolver", arabic: "البارئ" },
  { id: 13, name: "Al-Musawwir", transliteration: "The Fashioner", arabic: "المصور" },
  { id: 14, name: "Al-Ghaffar", transliteration: "The Forgiver", arabic: "الغفار" },
  { id: 15, name: "Al-Qahhar", transliteration: "The Subduer", arabic: "القهار" },
];

export default function NamesOfAllah() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredNames = NAMES.filter(n => 
    n.name.toLowerCase().includes(search.toLowerCase()) || 
    n.transliteration.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="flex flex-col h-full bg-[#fcfcfd]">
      <header className="p-6 bg-white sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-xl font-black text-slate-800">99 Names of Allah</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search names or meanings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 gap-4">
        <AnimatePresence>
          {filteredNames.map((name, i) => (
            <motion.div 
              key={name.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-slate-300 bg-slate-50 px-2 py-1 rounded-lg">#{name.id.toString().padStart(2, '0')}</span>
                <button 
                  onClick={() => toggleFavorite(name.id)}
                  className={cn(
                    "p-1.5 rounded-full transition-colors",
                    favorites.includes(name.id) ? "text-rose-500 bg-rose-50" : "text-slate-300 hover:bg-slate-50"
                  )}
                >
                  <Heart size={14} fill={favorites.includes(name.id) ? "currentColor" : "none"} />
                </button>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-3xl font-arabic text-emerald-600 mb-2">{name.arabic}</p>
                <h3 className="font-black text-slate-800 text-sm">{name.name}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-tight">{name.transliteration}</p>
              </div>

              <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-emerald-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
