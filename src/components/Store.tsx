import { ChevronLeft, ShoppingBag, Star, Tag, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const PRODUCTS = [
  { id: 1, name: "Premium Prayer Mat", price: "$29.99", rating: 4.8, image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Digital Tasbih Counter", price: "$12.50", rating: 4.5, image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e84?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Islamic Wall Art", price: "$45.00", rating: 4.9, image: "https://images.unsplash.com/photo-1564507592333-c60657eaa0ae?auto=format&fit=crop&w=400&q=80" }
];

export default function Store() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#fcfcfd]">
      <header className="p-6 bg-white sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-xl font-black text-slate-800">Islamic Store</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
        <div className="bg-emerald-600 p-6 rounded-[32px] text-white flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-xl font-black mb-1">Ramadan Sale!</h2>
            <p className="text-xs text-emerald-100 font-bold uppercase tracking-widest">Up to 50% Off</p>
          </div>
          <Tag size={48} className="text-emerald-500 opacity-50 -rotate-12" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group"
            >
              <div className="h-40 bg-slate-100 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[9px] font-black text-amber-600 flex items-center gap-1">
                  <Star size={10} fill="currentColor" /> {product.rating}
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="text-xs font-black text-slate-800 truncate">{product.name}</h3>
                <p className="text-emerald-600 font-black text-sm">{product.price}</p>
                <button className="w-full bg-slate-50 text-slate-600 py-2 rounded-xl text-[10px] font-bold mt-2 active:scale-95 transition-all">Add to Cart</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
