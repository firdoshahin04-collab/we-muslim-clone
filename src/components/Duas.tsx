import { useState, useEffect } from 'react';
import { ChevronLeft, Search, Heart, Share2, Copy, Bookmark, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { RubElHizb, IslamicPattern } from './DecorativeIcons';

const DUAS = [
  { 
    id: 1, 
    title: "Dua for Protection", 
    arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", 
    transliteration: "Bismillahilladhi la yadurru ma'asmihi shay'un fil-ardi wa la fis-sama'i wa Huwas-Sami'ul-'Alim",
    meaning: "In the Name of Allah with Whose Name there is protection against every kind of harm in the earth or in the heaven, and He is the All-Hearing and All-Knowing.",
    category: "Protection"
  },
  { 
    id: 2, 
    title: "Dua for Forgiveness", 
    arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ", 
    transliteration: "Rabbana-ghfir lana dhunubana wa israfana fi amrina wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
    meaning: "Our Lord! Forgive us our sins and our transgressions (in keeping our duties to You), establish our feet firmly, and give us victory over the disbelieving folk.",
    category: "Forgiveness"
  },
  { 
    id: 3, 
    title: "Dua for Knowledge", 
    arabic: "رَّبِّ زِدْنِي عِلْمًا", 
    transliteration: "Rabbi zidni 'ilma",
    meaning: "My Lord, increase me in knowledge.",
    category: "Knowledge"
  },
  {
    id: 4,
    title: "Dua for Parents",
    arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
    transliteration: "Rabbi-rhamhuma kama rabbayani saghira",
    meaning: "My Lord, have mercy upon them as they brought me up [when I was] small.",
    category: "Family"
  },
  {
    id: 5,
    title: "Dua for Patience",
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Rabbana afrigh 'alayna sabran wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
    meaning: "Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.",
    category: "Patience"
  },
  {
    id: 6,
    title: "Dua for Anxiety",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazani, wal-'ajzi wal-kasali, wal-bukhli wal-jubni, wa dala'id-dayni, wa ghalabatir-rijal",
    meaning: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
    category: "Protection"
  }
];

export default function Duas() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('dua-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id) 
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('dua-favorites', JSON.stringify(newFavorites));
  };

  const copyToClipboard = (dua: typeof DUAS[0]) => {
    const text = `${dua.title}\n\n${dua.arabic}\n\n${dua.transliteration}\n\nMeaning: ${dua.meaning}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(dua.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const categories = ["All", "Protection", "Forgiveness", "Knowledge", "Family", "Patience", "Favorites"];

  const filteredDuas = DUAS.filter(d => {
    const matchesCategory = activeCategory === "All" || 
                           (activeCategory === "Favorites" ? favorites.includes(d.id) : d.category === activeCategory);
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) || 
                         d.meaning.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[#fcfcfd]">
      <header className="p-6 bg-white sticky top-0 z-10 border-b border-slate-100 relative overflow-hidden">
        <IslamicPattern className="opacity-[0.03]" />
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
              <ChevronLeft size={24} className="text-slate-800" />
            </button>
            <h1 className="text-xl font-black text-slate-800">Daily Duas</h1>
          </div>
          <RubElHizb className="w-8 h-8 text-emerald-600/20 animate-spin-slow" />
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search duas or meaning..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar relative">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all relative z-10",
                activeCategory === cat ? "text-white" : "bg-slate-50 text-slate-400"
              )}
            >
              {activeCategory === cat && (
                <motion.div 
                  layoutId="active-cat"
                  className="absolute inset-0 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-100 -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={activeCategory}
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="space-y-6"
          >
            {filteredDuas.length > 0 ? (
              filteredDuas.map((dua) => (
                <motion.div 
                  key={dua.id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95, y: 20 },
                    visible: { opacity: 1, scale: 1, y: 0 }
                  }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest">
                      {dua.category}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => toggleFavorite(dua.id)}
                        className={cn(
                          "p-2 rounded-full transition-colors",
                          favorites.includes(dua.id) ? "bg-red-50 text-red-500" : "hover:bg-slate-50 text-slate-300"
                        )}
                      >
                        <Heart size={16} fill={favorites.includes(dua.id) ? "currentColor" : "none"} />
                      </button>
                      <button className="p-2 hover:bg-slate-50 rounded-full text-slate-300 transition-colors"><Share2 size={16} /></button>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-800">{dua.title}</h3>
                  
                  <div className="bg-slate-50/50 p-6 rounded-[24px] border border-slate-50">
                    <p className="text-2xl font-arabic text-emerald-600 text-right leading-relaxed mb-4">{dua.arabic}</p>
                    <p className="text-xs text-slate-500 italic leading-relaxed mb-4">{dua.transliteration}</p>
                    <div className="h-px bg-slate-100 mb-4" />
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{dua.meaning}</p>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button 
                      onClick={() => copyToClipboard(dua)}
                      className={cn(
                        "flex-1 py-3 rounded-2xl text-xs font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2",
                        copiedId === dua.id ? "bg-emerald-100 text-emerald-700" : "bg-emerald-600 text-white shadow-emerald-100"
                      )}
                    >
                      {copiedId === dua.id ? <Check size={16} /> : <Copy size={16} />}
                      {copiedId === dua.id ? "Copied!" : "Copy Text"}
                    </button>
                    <button 
                      onClick={() => toggleFavorite(dua.id)}
                      className={cn(
                        "flex-1 py-3 rounded-2xl text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-2",
                        favorites.includes(dua.id) ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-600"
                      )}
                    >
                      <Heart size={16} fill={favorites.includes(dua.id) ? "currentColor" : "none"} />
                      {favorites.includes(dua.id) ? "Favorited" : "Favorite"}
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Bookmark size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-medium">No duas found</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
