import { useState, useEffect, useMemo } from 'react';
import { Search, Heart, Play, Pause, ChevronLeft, Volume2, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ALLAH_NAMES, AllahName } from '../constants/namesOfAllah';
import { useNavigate } from 'react-router-dom';
import { RubElHizb, IslamicPattern } from './DecorativeIcons';

export default function NamesOfAllah() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('allah_names_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedName, setSelectedName] = useState<AllahName | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem('allah_names_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filteredNames = useMemo(() => {
    return ALLAH_NAMES.filter(name => {
      const matchesSearch = 
        name.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
        name.en.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        name.name.includes(searchQuery);
      
      if (showFavoritesOnly) {
        return matchesSearch && favorites.includes(name.number);
      }
      return matchesSearch;
    });
  }, [searchQuery, favorites, showFavoritesOnly]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const playAudio = (name: AllahName) => {
    if (playingId === name.number) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(name.name);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.8;
    utterance.onstart = () => setPlayingId(name.number);
    utterance.onend = () => setPlayingId(null);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd] pb-24">
      {/* Premium Header */}
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
            <h1 className="text-xl font-black text-slate-800 tracking-tight">99 Names of Allah</h1>
          </div>
          <RubElHizb className="w-8 h-8 text-emerald-600/20 animate-spin-slow" />
        </div>
        
        <div className="relative z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or meaning..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-100 rounded-[20px] py-3.5 pl-12 pr-4 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all font-medium"
          />
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button 
            onClick={() => setShowFavoritesOnly(false)}
            className={cn(
              "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 border",
              !showFavoritesOnly ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200" : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
            )}
          >
            All Names
          </button>
          <button 
            onClick={() => setShowFavoritesOnly(true)}
            className={cn(
              "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 flex items-center gap-2 border",
              showFavoritesOnly ? "bg-rose-600 text-white border-rose-600 shadow-xl shadow-rose-100" : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
            )}
          >
            <Heart size={14} fill={showFavoritesOnly ? "currentColor" : "none"} />
            Favorites
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredNames.map((name, index) => (
              <motion.div
                key={name.number}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.02 }}
                className="group bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:opacity-5 transition-opacity">
                  <RubElHizb className="w-32 h-32" />
                </div>

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center text-xs font-black shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                    {name.number}
                  </div>
                  <div className="flex gap-2">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(name.number)}
                      className={cn(
                        "p-3 rounded-2xl transition-all",
                        favorites.includes(name.number) ? "text-rose-500 bg-rose-50" : "text-slate-300 hover:text-rose-500 hover:bg-rose-50"
                      )}
                    >
                      <Heart size={20} fill={favorites.includes(name.number) ? "currentColor" : "none"} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => playAudio(name)}
                      className={cn(
                        "p-3 rounded-2xl transition-all",
                        playingId === name.number ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "text-slate-300 hover:text-emerald-600 hover:bg-emerald-50"
                      )}
                    >
                      {playingId === name.number ? <Pause size={20} /> : <Play size={20} />}
                    </motion.button>
                  </div>
                </div>

                <div className="text-center mb-8 relative z-10">
                  <h2 className="text-5xl font-arabic text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">{name.name}</h2>
                  <p className="text-sm font-black text-emerald-600 uppercase tracking-[0.3em]">{name.transliteration}</p>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="p-6 bg-slate-50/50 rounded-[32px] border border-slate-100/50">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-2">English Meaning</p>
                    <p className="text-slate-700 font-bold text-lg leading-tight">{name.en.meaning}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-emerald-50/30 rounded-[32px] border border-emerald-100/30 text-center group-hover:bg-emerald-50 transition-colors">
                      <p className="text-[10px] text-emerald-600 uppercase tracking-widest font-black mb-2">Urdu</p>
                      <p className="text-xl font-arabic text-emerald-900">{name.ur.meaning}</p>
                    </div>
                    <div className="p-5 bg-emerald-50/30 rounded-[32px] border border-emerald-100/30 text-center group-hover:bg-emerald-50 transition-colors">
                      <p className="text-[10px] text-emerald-600 uppercase tracking-widest font-black mb-2">Hindi</p>
                      <p className="text-lg font-bold text-emerald-900 leading-tight">{name.hi.meaning}</p>
                    </div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedName(name)}
                  className="mt-8 w-full py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all flex items-center justify-center gap-2 border border-transparent hover:border-emerald-100"
                >
                  <Info size={14} />
                  View Details & Description
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedName && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedName(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[48px] overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 inset-x-0 h-32 bg-emerald-600">
                <div className="absolute inset-0 bg-islamic-pattern opacity-10 scale-150" />
                <button 
                  onClick={() => setSelectedName(null)}
                  className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-8 pt-16 pb-10 relative">
                <div className="text-center mb-10">
                  <div className="w-24 h-24 bg-white rounded-[32px] shadow-xl flex items-center justify-center mx-auto -mt-20 mb-6 border-4 border-emerald-50">
                    <span className="text-4xl font-arabic text-emerald-700">{selectedName.name}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-1">{selectedName.transliteration}</h3>
                  <p className="text-emerald-600 font-black uppercase tracking-widest text-xs">{selectedName.en.meaning}</p>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black flex items-center gap-3">
                      <div className="h-px flex-1 bg-slate-100" />
                      Description
                      <div className="h-px flex-1 bg-slate-100" />
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-center italic">
                      "{selectedName.en.description}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-slate-50 rounded-[32px] text-center">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-2">Urdu Meaning</p>
                      <p className="text-2xl font-arabic text-emerald-900">{selectedName.ur.meaning}</p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-[32px] text-center">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-2">Hindi Meaning</p>
                      <p className="text-xl font-medium text-emerald-900">{selectedName.hi.meaning}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => playAudio(selectedName)}
                    className="w-full py-5 bg-emerald-600 text-white rounded-[24px] font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 hover:bg-emerald-500 transition-all"
                  >
                    <Volume2 size={20} />
                    Listen Pronunciation
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
