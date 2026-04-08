import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Share2, Heart, Copy, Search, ChevronLeft, Sparkles, Filter, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IslamicPattern } from './DecorativeIcons';

const QUOTES = [
  { id: 1, text: "The best among you are those who have the best manners and character.", author: "Prophet Muhammad (PBUH)", category: "Character" },
  { id: 2, text: "For indeed, with hardship [will be] ease.", author: "Quran 94:5", category: "Hope" },
  { id: 3, text: "Be kind, for whenever kindness becomes part of something, it beautifies it.", author: "Prophet Muhammad (PBUH)", category: "Kindness" },
  { id: 4, text: "The most beloved of deeds to Allah are those that are most consistent, even if they are small.", author: "Prophet Muhammad (PBUH)", category: "Deeds" },
  { id: 5, text: "Allah does not burden a soul beyond that it can bear.", author: "Quran 2:286", category: "Strength" },
  { id: 6, text: "Speak a good word or remain silent.", author: "Prophet Muhammad (PBUH)", category: "Speech" },
  { id: 7, text: "The strongest among you is the one who controls his anger.", author: "Prophet Muhammad (PBUH)", category: "Character" },
  { id: 8, text: "Patience is the key to paradise.", author: "Islamic Proverb", category: "Patience" },
  { id: 9, text: "Do not lose hope, nor be sad.", author: "Quran 3:139", category: "Hope" },
  { id: 10, text: "A good word is a form of charity.", author: "Prophet Muhammad (PBUH)", category: "Kindness" },
  // ... Imagine 1000 more here
];

const CATEGORIES = ["All", "Hope", "Character", "Kindness", "Deeds", "Strength", "Patience"];

export default function StatusSection() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedQuotes, setLikedQuotes] = useState<number[]>([]);

  const filteredQuotes = QUOTES.filter(q => {
    const matchesSearch = q.text.toLowerCase().includes(search.toLowerCase()) || q.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleLike = (id: number) => {
    setLikedQuotes(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Quote copied to clipboard!");
  };

  const handleShare = async (quote: any) => {
    const text = `"${quote.text}" - ${quote.author}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Islamic Quote', text });
      } catch (e) {}
    } else {
      handleCopy(text);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-24">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 p-6 z-50 shadow-sm sticky top-0">
        <IslamicPattern className="opacity-[0.03]" />
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2.5 bg-slate-50 text-slate-600 rounded-2xl">
              <ChevronLeft size={22} />
            </button>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Islamic Status</h1>
          </div>
          <Sparkles className="text-amber-500 animate-pulse" size={24} />
        </div>
        
        <div className="space-y-4 relative z-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search quotes or authors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50/50 border border-slate-100 rounded-[20px] py-3.5 pl-12 pr-4 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all font-medium"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                  selectedCategory === cat 
                    ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-100" 
                    : "bg-white border-slate-100 text-slate-400 hover:border-emerald-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="p-6 grid grid-cols-1 gap-6">
        {filteredQuotes.map((quote, i) => (
          <motion.div
            key={quote.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 p-8 opacity-[0.02] group-hover:opacity-5 transition-opacity">
              <Quote size={120} />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  {quote.category}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleLike(quote.id)} className={cn("p-2 rounded-xl transition-all", likedQuotes.includes(quote.id) ? "bg-rose-50 text-rose-500" : "bg-slate-50 text-slate-300")}>
                    <Heart size={18} fill={likedQuotes.includes(quote.id) ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>

              <p className="text-xl font-medium text-slate-800 leading-relaxed italic">"{quote.text}"</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">— {quote.author}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleCopy(quote.text)} className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                    <Copy size={18} />
                  </button>
                  <button onClick={() => handleShare(quote)} className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
