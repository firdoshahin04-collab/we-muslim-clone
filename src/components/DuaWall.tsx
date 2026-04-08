import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Send, User, Shield, MessageSquare, LogIn, Share2, CornerDownRight } from 'lucide-react';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, increment, serverTimestamp, getDocs } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { cn } from '../lib/utils';
import { awardKarma } from '../lib/karma';

const PROFANITY_LIST = [
  'badword1', 'badword2', 'abuse', 'hate', 'kill', 'death', 'insult', 'curse',
  'stupid', 'idiot', 'fool', 'dumb', 'ugly', 'fat', 'loser', 'suck', 'hell',
  'damn', 'crap', 'piss', 'shit', 'fuck', 'bitch', 'asshole', 'bastard'
];

export default function DuaWall() {
  const [duas, setDuas] = useState<any[]>([]);
  const [newDua, setNewDua] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [user, setUser] = useState(auth.currentUser);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState<Record<string, any[]>>({});
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.code === 'auth/popup-blocked') {
        setAuthError("Popup blocked! Please allow popups for this site in your browser settings.");
      } else if (error.code === 'auth/cancelled-popup-request') {
        // Ignore cancellation
      } else {
        setAuthError("Login failed. Please try again.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'duas'), orderBy('createdAt', 'desc'));
    const unsubscribes: (() => void)[] = [];

    const unsubscribeDuas = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDuas(docs);
      
      // Fetch replies for each dua
      docs.forEach(dua => {
        if (!unsubscribes.some(u => (u as any).id === dua.id)) {
          const repliesQuery = query(collection(db, `duas/${dua.id}/replies`), orderBy('createdAt', 'asc'));
          const unsubReply = onSnapshot(repliesQuery, (replySnapshot) => {
            const replyDocs = replySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setReplies(prev => ({ ...prev, [dua.id]: replyDocs }));
          }, (error) => {
            console.error(`Error fetching replies for ${dua.id}:`, error);
          });
          (unsubReply as any).id = dua.id;
          unsubscribes.push(unsubReply);
        }
      });
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'duas');
    });

    return () => {
      unsubscribeDuas();
      unsubscribes.forEach(unsub => unsub());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDua.trim() || !auth.currentUser) return;

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
      await awardKarma(20);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'duas');
    }
    setLoading(false);
  };

  const handleReply = async (duaId: string) => {
    if (!replyText.trim() || !auth.currentUser) return;

    const hasProfanity = PROFANITY_LIST.some(word => replyText.toLowerCase().includes(word));
    if (hasProfanity) {
      alert("Please keep your replies respectful.");
      return;
    }

    try {
      await addDoc(collection(db, `duas/${duaId}/replies`), {
        content: replyText,
        authorUid: auth.currentUser.uid,
        authorName: auth.currentUser.displayName || 'User',
        createdAt: serverTimestamp(),
      });
      setReplyText('');
      setReplyingTo(null);
      await awardKarma(10);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `duas/${duaId}/replies`);
    }
  };

  const handleAmeen = async (duaId: string) => {
    if (!auth.currentUser) {
      alert("Please login to say Ameen.");
      return;
    }

    const dua = duas.find(d => d.id === duaId);
    if (dua?.likedBy?.includes(auth.currentUser.uid)) {
      alert("You have already said Ameen for this prayer.");
      return;
    }

    const duaRef = doc(db, 'duas', duaId);
    try {
      await updateDoc(duaRef, {
        ameenCount: increment(1),
        likedBy: [...(dua?.likedBy || []), auth.currentUser.uid]
      });
      await awardKarma(5);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `duas/${duaId}`);
    }
  };

  const handleShare = async (dua: any) => {
    if (isSharing) return;
    setIsSharing(true);
    
    const shareText = `"${dua.content}" - A prayer from ${dua.authorName} on Quran App. Join us in saying Ameen!`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Share Dua',
          text: shareText,
          url: window.location.href,
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareText);
        alert("Prayer copied to clipboard!");
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    } finally {
      setIsSharing(false);
    }
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
          {authError && (
            <p className="text-xs text-rose-500 bg-rose-50 p-3 rounded-xl border border-rose-100">
              {authError}
            </p>
          )}
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-emerald-200"
          >
            {isLoggingIn ? "Connecting..." : "Login with Google"}
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
                <button 
                  onClick={() => setReplyingTo(replyingTo === dua.id ? null : dua.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                    replyingTo === dua.id ? "bg-emerald-100 text-emerald-700" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  )}
                >
                  <MessageSquare size={18} />
                  <span className="text-sm font-bold">{replies[dua.id]?.length || 0} Replies</span>
                </button>
                <button 
                  onClick={() => handleShare(dua)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-500 rounded-full hover:bg-slate-100 transition-all"
                >
                  <Share2 size={18} />
                </button>
              </div>

              {/* Replies Section */}
              <AnimatePresence>
                {replyingTo === dua.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-4 pt-4 border-t border-slate-50"
                  >
                    <div className="space-y-3">
                      {replies[dua.id]?.map((reply) => (
                        <div key={reply.id} className="flex gap-3 items-start pl-4">
                          <CornerDownRight size={16} className="text-slate-300 mt-1 shrink-0" />
                          <div className="bg-slate-50 rounded-2xl p-3 flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{reply.authorName}</span>
                              <span className="text-[8px] text-slate-400">
                                {reply.createdAt?.toDate ? new Date(reply.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                              </span>
                            </div>
                            <p className="text-sm text-slate-700">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {user ? (
                      <div className="flex gap-2 pl-4">
                        <input 
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a supportive reply..."
                          className="flex-1 bg-slate-50 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                          onKeyDown={(e) => e.key === 'Enter' && handleReply(dua.id)}
                        />
                        <button 
                          onClick={() => handleReply(dua.id)}
                          disabled={!replyText.trim()}
                          className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50"
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-center text-slate-400 py-2">Sign in to reply to this prayer.</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
