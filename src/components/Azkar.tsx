import { useState } from 'react';
import { ChevronLeft, Search, Heart, Share2, Copy, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const AZKAR = [
  { 
    id: 1, 
    title: "Morning Azkar", 
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ", 
    transliteration: "Asbahna wa asbahal-mulku lillahi walhamdu lillahi...",
    meaning: "We have reached the morning and at this very time unto Allah belongs all sovereignty...",
    category: "Morning"
  },
  { 
    id: 2, 
    title: "Evening Azkar", 
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ", 
    transliteration: "Amsayna wa amsal-mulku lillahi walhamdu lillahi...",
    meaning: "We have reached the evening and at this very time unto Allah belongs all sovereignty...",
    category: "Evening"
  },
  { 
    id: 3, 
    title: "After Prayer", 
    arabic: "أَسْتَغْفِرُ اللهَ (ثَلَاثًا) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ", 
    transliteration: "Astaghfirullah (3 times). Allahumma Antas-Salam wa minkas-salam...",
    meaning: "I ask Allah for forgiveness. O Allah, You are Peace and from You comes peace...",
    category: "Prayer"
  }
];

export default function Azkar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Morning", "Evening", "Prayer", "Sleeping"];

  const filteredAzkar = AZKAR.filter(a => 
    (activeCategory === "All" || a.category === activeCategory) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.meaning.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full bg-[#fcfcfd]">
      <header className="p-6 bg-white sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-xl font-black text-slate-800">Azkar & Adhkar</h1>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search azkar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all",
                activeCategory === cat ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100" : "bg-slate-50 text-slate-400"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredAzkar.map((azkar, i) => (
            <motion.div 
              key={azkar.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest">
                  {azkar.category}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-50 rounded-full text-slate-300 transition-colors"><Bookmark size={16} /></button>
                  <button className="p-2 hover:bg-slate-50 rounded-full text-slate-300 transition-colors"><Share2 size={16} /></button>
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-800">{azkar.title}</h3>
              
              <div className="bg-slate-50/50 p-6 rounded-[24px] border border-slate-50">
                <p className="text-2xl font-arabic text-emerald-600 text-right leading-relaxed mb-4">{azkar.arabic}</p>
                <p className="text-xs text-slate-500 italic leading-relaxed mb-4">{azkar.transliteration}</p>
                <div className="h-px bg-slate-100 mb-4" />
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{azkar.meaning}</p>
              </div>

              <button className="w-full bg-emerald-600 text-white py-3.5 rounded-2xl text-xs font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-all flex items-center justify-center gap-2">
                <Copy size={16} /> Copy Text
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
