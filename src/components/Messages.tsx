import { ChevronLeft, Search, MessageSquare, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const CHATS = [
  { 
    id: 1, 
    user: "Ahmad", 
    avatar: "https://i.pravatar.cc/150?u=ahmad", 
    lastMessage: "Assalamu Alaikum! Did you find the book?", 
    time: "10:30 AM", 
    unread: 2 
  },
  { 
    id: 2, 
    user: "Fatima", 
    avatar: "https://i.pravatar.cc/150?u=fatima", 
    lastMessage: "JazakAllah Khair for the help!", 
    time: "Yesterday", 
    unread: 0 
  },
  { 
    id: 3, 
    user: "Zaid", 
    avatar: "https://i.pravatar.cc/150?u=zaid", 
    lastMessage: "Let's meet after Asr prayer.", 
    time: "2 days ago", 
    unread: 0 
  }
];

export default function Messages() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#fcfcfd]">
      <header className="p-6 bg-white sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
              <ChevronLeft size={24} className="text-slate-800" />
            </button>
            <h1 className="text-xl font-black text-slate-800">Messages</h1>
          </div>
          <button className="p-2 bg-emerald-50 text-emerald-600 rounded-full">
            <MessageSquare size={24} />
          </button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search conversations..."
            className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-2 pb-24">
        {CHATS.map((chat, i) => (
          <motion.div 
            key={chat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
          >
            <div className="relative">
              <img src={chat.avatar} alt={chat.user} className="w-14 h-14 rounded-full border-2 border-emerald-50" />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-black text-slate-800">{chat.user}</h3>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{chat.time}</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate">{chat.lastMessage}</p>
            </div>

            {chat.unread > 0 && (
              <div className="w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[9px] font-black">
                {chat.unread}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <button className="fixed bottom-28 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-200 flex items-center justify-center active:scale-95 transition-all z-20">
        <Plus size={28} />
      </button>
    </div>
  );
}
