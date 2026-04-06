import { ChevronLeft, Search, Heart, MessageCircle, Share2, Users, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const POSTS = [
  { 
    id: 1, 
    user: "Ahmad", 
    avatar: "https://i.pravatar.cc/150?u=ahmad", 
    content: "SubhanAllah! The morning prayer today was so peaceful. May Allah bless us all with a productive day.", 
    likes: 124, 
    comments: 12, 
    time: "2h ago" 
  },
  { 
    id: 2, 
    user: "Fatima", 
    avatar: "https://i.pravatar.cc/150?u=fatima", 
    content: "Just finished reading Surah Al-Kahf. Don't forget to read it today! #FridayBlessings", 
    likes: 89, 
    comments: 5, 
    time: "4h ago" 
  },
  { 
    id: 3, 
    user: "Zaid", 
    avatar: "https://i.pravatar.cc/150?u=zaid", 
    content: "Does anyone have recommendations for a good Tafsir book for beginners?", 
    likes: 45, 
    comments: 28, 
    time: "6h ago" 
  }
];

export default function Community() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#fcfcfd]">
      <header className="p-6 bg-white sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
              <ChevronLeft size={24} className="text-slate-800" />
            </button>
            <h1 className="text-xl font-black text-slate-800">Ummah Feed</h1>
          </div>
          <button className="p-2 bg-emerald-50 text-emerald-600 rounded-full">
            <Users size={24} />
          </button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search community posts..."
            className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
        {POSTS.map((post, i) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img src={post.avatar} alt={post.user} className="w-10 h-10 rounded-full border-2 border-emerald-50" />
                <div>
                  <h3 className="text-sm font-black text-slate-800">{post.user}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{post.time}</p>
                </div>
              </div>
              <button className="text-slate-300 hover:text-slate-500 transition-colors">
                <Share2 size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">{post.content}</p>

            <div className="flex items-center gap-6 pt-2">
              <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-rose-500 transition-colors">
                <Heart size={16} /> {post.likes}
              </button>
              <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-emerald-500 transition-colors">
                <MessageCircle size={16} /> {post.comments}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="fixed bottom-28 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-200 flex items-center justify-center active:scale-95 transition-all z-20">
        <Plus size={28} />
      </button>
    </div>
  );
}
