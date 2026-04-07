import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Heart, Book, Lightbulb } from 'lucide-react';
import { getMoodDua } from '../services/geminiService';

export default function MoodDua() {
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;
    
    setLoading(true);
    const data = await getMoodDua(mood);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">How are you feeling?</h1>
        <p className="text-slate-500">Share your heart, find comfort in the Word of Allah.</p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="I feel anxious about my future..."
          className="w-full px-6 py-4 bg-white rounded-2xl shadow-sm border border-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none pr-14 transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={20} />
            </motion.div>
          ) : (
            <Send size={20} />
          )}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Ayat Card */}
            <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100 space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Book size={18} />
                <span>Comforting Ayat</span>
              </div>
              <p className="text-2xl text-right font-arabic leading-loose text-slate-800">
                {result.ayat.arabic}
              </p>
              <p className="text-slate-600 italic">
                "{result.ayat.translation}"
              </p>
            </div>

            {/* Dua Card */}
            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 space-y-4">
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <Heart size={18} />
                <span>Recommended Dua</span>
              </div>
              <p className="text-xl text-right font-arabic leading-loose text-slate-800">
                {result.dua.arabic}
              </p>
              <p className="text-slate-600">
                {result.dua.translation}
              </p>
            </div>

            {/* Advice Card */}
            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100 space-y-4">
              <div className="flex items-center gap-2 text-amber-700 font-semibold">
                <Lightbulb size={18} />
                <span>Sunnah Advice</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {result.advice}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
