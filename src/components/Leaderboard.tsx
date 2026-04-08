import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Medal, Star, ChevronLeft, Search, Sparkles, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IslamicPattern } from './DecorativeIcons';

interface LeaderboardEntry {
  uid: string;
  displayName: string;
  karmaPoints: number;
  level: number;
  photoURL?: string;
}

export default function Leaderboard() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('karmaPoints', 'desc'), limit(20));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as LeaderboardEntry[];
      setEntries(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-24">
      <header className="bg-slate-900 text-white p-8 relative overflow-hidden rounded-b-[64px] shadow-2xl">
        <IslamicPattern className="opacity-10 scale-150" />
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-black tracking-tight">Global Leaderboard</h1>
            <Sparkles className="text-amber-400" size={24} />
          </div>
          
          <div className="flex justify-center items-end gap-4 py-8">
            {/* 2nd Place */}
            {entries[1] && (
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-slate-300 overflow-hidden bg-slate-800">
                    <img src={entries[1].photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entries[1].uid}`} alt="" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center text-slate-900 font-black text-xs">2</div>
                </div>
                <p className="text-xs font-black truncate w-20 text-center">{entries[1].displayName}</p>
                <div className="h-16 w-12 bg-slate-300/20 rounded-t-xl" />
              </div>
            )}

            {/* 1st Place */}
            {entries[0] && (
              <div className="flex flex-col items-center gap-3">
                <Crown className="text-amber-400 animate-bounce" size={32} />
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-amber-400 overflow-hidden bg-slate-800 shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                    <img src={entries[0].photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entries[0].uid}`} alt="" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-black">1</div>
                </div>
                <p className="text-sm font-black truncate w-24 text-center">{entries[0].displayName}</p>
                <div className="h-24 w-16 bg-amber-400/20 rounded-t-2xl" />
              </div>
            )}

            {/* 3rd Place */}
            {entries[2] && (
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-orange-400 overflow-hidden bg-slate-800">
                    <img src={entries[2].photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entries[2].uid}`} alt="" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-slate-900 font-black text-xs">3</div>
                </div>
                <p className="text-xs font-black truncate w-20 text-center">{entries[2].displayName}</p>
                <div className="h-12 w-12 bg-orange-400/20 rounded-t-xl" />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="p-6 -mt-8 relative z-20">
        <div className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden">
          {loading ? (
            <div className="p-20 text-center">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Loading Rankings...</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {entries.slice(3).map((entry, index) => (
                <motion.div 
                  key={entry.uid}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-8 text-center font-black text-slate-300 text-sm">{index + 4}</div>
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                    <img src={entry.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.uid}`} alt="" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-slate-800 tracking-tight">{entry.displayName}</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Level {entry.level || 1}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-emerald-600 font-black tracking-tighter text-lg">
                      <Star size={14} fill="currentColor" />
                      {entry.karmaPoints.toLocaleString()}
                    </div>
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Karma</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
