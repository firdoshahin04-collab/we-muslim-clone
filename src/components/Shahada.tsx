import { ChevronLeft, Play, Pause, Volume2, Share2, Copy } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Shahada() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#fcfcfd]">
      <header className="p-6 bg-white sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-xl font-black text-slate-800">Shahada</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-600 p-8 rounded-[40px] text-white shadow-2xl shadow-emerald-100 relative overflow-hidden"
        >
          <div className="relative z-10 text-center space-y-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4">
              <Volume2 size={32} />
            </div>
            <p className="text-4xl font-arabic leading-relaxed mb-6">أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ</p>
            <div className="h-px bg-white/20 w-full mb-6" />
            <p className="text-sm font-bold text-emerald-100 leading-relaxed italic">Ashhadu an la ilaha illa Allah, wa ashhadu anna Muhammadan rasulu Allah</p>
            <p className="text-xs font-medium text-emerald-50 leading-relaxed">"I bear witness that there is no deity but Allah, and I bear witness that Muhammad is the messenger of Allah."</p>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500 rounded-full opacity-20 blur-3xl" />
        </motion.div>

        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-800 px-2">The First Pillar</h3>
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              The Shahada is the Islamic creed, one of the Five Pillars of Islam. It is the declaration of belief in the oneness of God (Allah) and the acceptance of Muhammad as God's prophet.
            </p>
            <div className="flex gap-4">
              <button className="flex-1 bg-slate-50 text-slate-600 py-4 rounded-2xl text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-2">
                <Copy size={16} /> Copy Text
              </button>
              <button className="flex-1 bg-slate-50 text-slate-600 py-4 rounded-2xl text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-2">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-[32px] border border-amber-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
            <Play size={24} fill="currentColor" />
          </div>
          <div>
            <h4 className="text-sm font-black text-amber-900">Listen to Pronunciation</h4>
            <p className="text-[10px] text-amber-700 font-medium">Learn how to recite the Shahada correctly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
