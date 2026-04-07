import { useState } from 'react';
import { ChevronLeft, Search, Bookmark, Share2, Copy, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const HADITHS = [
  { 
    id: 1, 
    source: "Sahih Bukhari", 
    narrator: "Umar bin Al-Khattab", 
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى", 
    english: "Actions are but by intentions and every man shall have only that which he intended.",
    reference: "Book 1, Hadith 1"
  },
  { 
    id: 2, 
    source: "Sahih Muslim", 
    narrator: "Abu Huraira", 
    arabic: "الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ", 
    english: "The world is a prison for the believer and a paradise for the disbeliever.",
    reference: "Book 42, Hadith 7058"
  },
  { 
    id: 3, 
    source: "Sunan Abu Dawood", 
    narrator: "Anas bin Malik", 
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ", 
    english: "Seeking knowledge is a duty upon every Muslim.",
    reference: "Book 1, Hadith 224"
  },
  {
    id: 4,
    source: "Sahih Bukhari",
    narrator: "Abu Huraira",
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    english: "Whoever believes in Allah and the Last Day should speak what is good or keep silent.",
    reference: "Book 78, Hadith 6018"
  },
  {
    id: 5,
    source: "Sahih Muslim",
    narrator: "Abu Huraira",
    arabic: "لاَ يَدْخُلُ الْجَنَّةَ مَنْ لاَ يَأْمَنُ جَارُهُ بَوَائِقَهُ",
    english: "He will not enter Paradise whose neighbor is not secure from his wrongful conduct.",
    reference: "Book 1, Hadith 74"
  },
  {
    id: 6,
    source: "Jami` at-Tirmidhi",
    narrator: "Abdullah bin Amr",
    arabic: "الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ ارْحَمُوا مَنْ فِي الأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ",
    english: "The merciful are shown mercy by the Most Merciful. Be merciful to those on the earth and the One in the heavens will have mercy upon you.",
    reference: "Book 27, Hadith 1924"
  }
];

export default function Hadith() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredHadiths = HADITHS.filter(h => 
    h.english.toLowerCase().includes(search.toLowerCase()) || 
    h.narrator.toLowerCase().includes(search.toLowerCase()) ||
    h.source.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#fcfcfd]">
      <header className="p-6 bg-white sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-xl font-black text-slate-800">Hadith Library</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search hadiths or narrators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredHadiths.map((hadith, i) => (
            <motion.div 
              key={hadith.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-800">{hadith.source}</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{hadith.reference}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-50 rounded-full text-slate-300 transition-colors"><Bookmark size={16} /></button>
                  <button className="p-2 hover:bg-slate-50 rounded-full text-slate-300 transition-colors"><Share2 size={16} /></button>
                </div>
              </div>

              <div className="bg-slate-50/50 p-6 rounded-[24px] border border-slate-50">
                <p className="text-2xl font-arabic text-emerald-600 text-right leading-relaxed mb-4">{hadith.arabic}</p>
                <div className="h-px bg-slate-100 mb-4" />
                <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">"{hadith.english}"</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">— Narrated by {hadith.narrator}</p>
              </div>

              <button className="w-full bg-emerald-600 text-white py-3.5 rounded-2xl text-xs font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-all flex items-center justify-center gap-2">
                <Copy size={16} /> Copy Hadith
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
