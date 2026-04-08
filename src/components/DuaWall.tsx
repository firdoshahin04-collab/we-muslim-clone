import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, User, Shield, MessageSquare, LogIn } from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, increment, serverTimestamp } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { cn } from '../lib/utils';
import { awardKarma } from '../lib/karma';

const PROFANITY_LIST = [
  'badword1', 'badword2', 'abuse', 'hate', 'kill', 'death', 'insult', 'curse',
  'stupid', 'idiot', 'fool', 'dumb', 'ugly', 'fat', 'loser', 'suck', 'hell',
  'damn', 'crap', 'piss', 'shit', 'fuck', 'bitch', 'asshole', 'bastard'
]; // Expanded list for basic filtering

export default function DuaWall() {
  const [duas, setDuas] = useState<any[]>([]);
  const [newDua, setNewDua] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'duas'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDuas(docs);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDua.trim() || !auth.currentUser) return;

    // Basic Profanity Filter
    const hasProfanity = PROFANITY_LIST.some(word => newDua.toLowerCase().includes(word));
    if (hasProfanity) {
      alert("Please keep your prayers respectful.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'duas'), {
        content: newDua,
        authorUid: auth.currentUser.uid,
        authorName: isAnonymous ? 'Anonymous' : auth.currentUser.displayName || 'User',
        isAnonymous,
        ameenCount: 0,
        createdAt: serverTimestamp(),
      });
      setNewDua('');
      await awardKarma(20); // Award points for helping/sharing
    } catch (error) {
      console.error("Error adding dua:", error);
    }
    setLoading(false);
  };

  const handleAmeen = async (duaId: string) => {
    const duaRef = doc(db, 'duas', duaId);
    await updateDoc(duaRef, {
      ameenCount: increment(1)
    });
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">Global Dua Wall</h1>
        <p className="text-slate-500">Share your prayers, say Ameen for others.</p>
      </div>

      {/* Post Form */}
      {!user ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
            <LogIn size={32} />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800">Sign in to post</h3>
            <p className="text-sm text-slate-500">Join the community and share your prayers.</p>
          </div>
          <button
            onClick={handleLogin}
            className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
          >
            Login with Google
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <textarea
            value={newDua}
            onChange={(e) => setNewDua(e.target.value)}
            placeholder="What is your prayer today?"
            className="w-full h-32 bg-slate-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={cn(
                "w-5 h-5 rounded border flex items-center justify-center transition-all",
                isAnonymous ? "bg-emerald-600 border-emerald-600" : "border-slate-300 group-hover:border-emerald-500"
              )}>
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="hidden"
                />
                {isAnonymous && <Shield size={12} className="text-white" />}
              </div>
              <span className="text-sm text-slate-600">Post Anonymously</span>
            </label>
            <button
              type="submit"
              disabled={loading || !newDua.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-all"
            >
              <span>Post</span>
              <Send size={16} />
            </button>
          </div>
        </form>
      )}

      {/* Duas List */}
      <div className="space-y-4">
        <AnimatePresence>
          {duas.map((dua) => (
            <motion.div
              key={dua.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <User size={16} />
                  <span className="text-sm font-medium">{dua.authorName}</span>
                </div>
                <span className="text-xs text-slate-400">
                  {dua.createdAt?.toDate ? new Date(dua.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg italic">
                "{dua.content}"
              </p>
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => handleAmeen(dua.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-full hover:bg-rose-100 transition-all group"
                >
                  <motion.div whileTap={{ scale: 1.5 }}>
                    <Heart size={18} className={cn("transition-all", dua.ameenCount > 0 && "fill-rose-600")} />
                  </motion.div>
                  <span className="font-bold">{dua.ameenCount} Ameen</span>
                </button>
                <div className="flex items-center gap-2 text-slate-400">
                  <MessageSquare size={16} />
                  <span className="text-sm">Reply</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
