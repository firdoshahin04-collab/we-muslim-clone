import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, ShieldCheck, ShieldAlert, ShieldQuestion, Loader2, X } from 'lucide-react';
import { analyzeIngredients } from '../services/geminiService';
import { cn } from '../lib/utils';

export default function HalalScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    const data = await analyzeIngredients(image);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">Halal Scanner</h1>
        <p className="text-slate-500">Scan ingredients to check for Halal status.</p>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 space-y-8">
        {!image ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:bg-slate-100 transition-all group"
          >
            <div className="p-6 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
              <Camera size={48} className="text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium">Tap to scan or upload</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative aspect-square rounded-[40px] overflow-hidden group">
              <img src={image} alt="Ingredients" className="w-full h-full object-cover" />
              <button 
                onClick={() => setImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/40 text-white rounded-full backdrop-blur-md"
              >
                <X size={20} />
              </button>
              
              {result && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm",
                    result.status === 'Halal' ? "bg-emerald-500/80" : 
                    result.status === 'Haram' ? "bg-rose-500/80" : "bg-amber-500/80"
                  )}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="p-6 bg-white rounded-full shadow-2xl mb-4"
                  >
                    {result.status === 'Halal' ? <ShieldCheck size={64} className="text-emerald-600" /> :
                     result.status === 'Haram' ? <ShieldAlert size={64} className="text-rose-600" /> :
                     <ShieldQuestion size={64} className="text-amber-600" />}
                  </motion.div>
                  <h2 className="text-4xl font-black text-white mb-2">{result.status}</h2>
                  <p className="text-white/90 font-medium">{result.reason}</p>
                </motion.div>
              )}
            </div>

            {!result && (
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/10"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    <span>Check Halal Status</span>
                  </>
                )}
              </button>
            )}
            
            {result && (
              <button
                onClick={() => { setImage(null); setResult(null); }}
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                Scan Another
              </button>
            )}
          </div>
        )}

        <div className="bg-blue-50 p-6 rounded-3xl flex gap-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm h-fit">
            <Upload size={20} className="text-blue-600" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-blue-900">AI Powered Analysis</p>
            <p className="text-xs text-blue-700 leading-relaxed">
              Our AI scans for E-numbers, additives, and hidden ingredients. Always verify with official Halal certification logos on the packaging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
