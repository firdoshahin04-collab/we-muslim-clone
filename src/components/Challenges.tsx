import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Target, Zap, ChevronLeft, CheckCircle2, Star, Sparkles, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { awardKarma } from '../lib/karma';

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  type: 'daily' | 'weekly' | 'special';
  icon?: string;
}

export default function Challenges() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch challenges
    const q = query(collection(db, 'challenges'));
    const unsubChallenges = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Challenge[];
      setChallenges(data);
      setLoading(false);
    });

    // Fetch user progress
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const unsubUser = onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          setCompletedIds(doc.data().completedChallenges || []);
        }
      });
      return () => {
        unsubChallenges();
        unsubUser();
      };
    }

    return () => unsubChallenges();
  }, []);

  const completeChallenge = async (challenge: Challenge) => {
    if (!auth.currentUser || completedIds.includes(challenge.id)) return;

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        karmaPoints: increment(challenge.points),
        completedChallenges: [...completedIds, challenge.id],
        // Level up logic: every 1000 points = 1 level
        level: Math.floor(( (await getDoc(userRef)).data()?.karmaPoints + challenge.points ) / 1000) + 1
      });
      alert(`MashaAllah! You've completed "${challenge.title}" and earned ${challenge.points} points!`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-24">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 p-6 z-50 shadow-sm sticky top-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2.5 bg-slate-50 text-slate-600 rounded-2xl">
              <ChevronLeft size={22} />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">Spiritual Challenges</h1>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Level Up Your Deen</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
            <Zap size={20} fill="currentColor" />
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Daily Progress */}
        <div className="bg-slate-900 rounded-[48px] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
          <div className="absolute inset-0 bg-islamic-pattern opacity-10 scale-150" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Current Goal</p>
              <h2 className="text-3xl font-black tracking-tight">Master of Salah</h2>
              <div className="flex items-center gap-2 mt-4">
                <div className="h-2 w-32 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-3/4" />
                </div>
                <span className="text-[10px] font-black">75%</span>
              </div>
            </div>
            <div className="w-20 h-20 bg-emerald-500/20 rounded-[32px] flex items-center justify-center border border-emerald-500/30">
              <Trophy size={40} className="text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Challenges List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Available Tasks</h3>
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
              <Clock size={12} />
              Resets in 12h
            </div>
          </div>

          {challenges.length === 0 && !loading && (
            <div className="text-center py-12 bg-white rounded-[40px] border border-slate-100 italic text-slate-400 text-sm">
              No challenges available right now. Check back later!
            </div>
          )}

          {challenges.map((challenge, i) => {
            const isCompleted = completedIds.includes(challenge.id);
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-6 rounded-[40px] border transition-all flex items-center gap-6 group relative overflow-hidden",
                  isCompleted 
                    ? "bg-slate-50 border-slate-100 opacity-60" 
                    : "bg-white border-slate-100 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-900/5"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 transition-all duration-500",
                  isCompleted ? "bg-slate-200 text-slate-400" : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                )}>
                  <Target size={24} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-black text-slate-800 tracking-tight">{challenge.title}</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">{challenge.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1 text-[10px] font-black text-amber-600 uppercase tracking-widest">
                      <Star size={12} fill="currentColor" />
                      {challenge.points} Points
                    </div>
                    <div className="w-1 h-1 bg-slate-200 rounded-full" />
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {challenge.type}
                    </div>
                  </div>
                </div>

                <button 
                  disabled={isCompleted}
                  onClick={() => completeChallenge(challenge)}
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                    isCompleted ? "bg-emerald-100 text-emerald-600" : "bg-slate-50 text-slate-300 hover:bg-emerald-50 hover:text-emerald-600"
                  )}
                >
                  {isCompleted ? <CheckCircle2 size={24} /> : <Sparkles size={24} />}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
