import { ChevronLeft, Image as ImageIcon, Heart, Download, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const IMAGES = [
  { id: 1, url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80", title: "Masjid Al-Haram" },
  { id: 2, url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80", title: "Sheikh Zayed Mosque" },
  { id: 3, url: "https://images.unsplash.com/photo-1564507592333-c60657eaa0ae?auto=format&fit=crop&w=800&q=80", title: "Blue Mosque" },
  { id: 4, url: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e84?auto=format&fit=crop&w=800&q=80", title: "Islamic Art" }
];

export default function Gallery() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#fcfcfd]">
      <header className="p-6 bg-white sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-xl font-black text-slate-800">Islamic Gallery</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 gap-4 pb-24">
        {IMAGES.map((img, i) => (
          <motion.div 
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group relative"
          >
            <div className="h-48 bg-slate-100 relative overflow-hidden">
              <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"><Heart size={18} /></button>
                <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"><Download size={18} /></button>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-[10px] font-black text-slate-800 truncate uppercase tracking-widest">{img.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
