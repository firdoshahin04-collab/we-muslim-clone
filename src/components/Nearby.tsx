import { useState, useEffect } from 'react';
import { MapPin, Search, Store, Building2, ChevronRight, Clock, Star } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Nearby() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'mosque' | 'halal'>('mosque');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        console.error("Geolocation error:", err);
        setLocation({ lat: 21.4225, lng: 39.8262 }); // Default to Mecca
      }
    );
  }, []);

  const searchNearby = async (type: 'mosque' | 'halal') => {
    if (!location) return;
    setLoading(true);
    setResults([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const query = type === 'mosque' 
        ? "Find ONLY mosques (Masjids) near my current location. Do NOT include restaurants, shops, or halal meat stores. Provide a list of mosques. For each mosque, provide its name, address, rating, distance, and whether it's open now. Format each mosque as a single line like this: 'Name | Address | Rating | Distance | OpenNow'. Separate each mosque with a newline. Do not include any other text."
        : "Find ONLY halal meat shops, halal butchers, and halal restaurants near my current location. Do NOT include mosques or Masjids. Provide a list. For each place, provide its name, address, rating, distance, and whether it's open now. Format each place as a single line like this: 'Name | Address | Rating | Distance | OpenNow'. Separate each place with a newline. Do not include any other text.";

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: query,
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: location.lat,
                longitude: location.lng
              }
            }
          }
        },
      });

      if (response && response.text) {
        const lines = response.text.trim().split('\n');
        const data = lines.map(line => {
          // Remove leading numbers like "1. " or "- "
          const cleanLine = line.replace(/^[0-9.-]+\s*/, '').trim();
          const parts = cleanLine.split('|').map(s => s.trim());
          
          if (parts.length < 2) return null;

          const [name, address, rating, distance, open_now] = parts;
          return {
            name,
            address,
            rating: rating && rating !== 'N/A' ? rating : null,
            distance: distance && distance !== 'N/A' ? distance : null,
            open_now: open_now?.toLowerCase().includes('open') || open_now?.toLowerCase().includes('true') || open_now?.toLowerCase().includes('yes')
          };
        }).filter((item): item is any => item !== null && !!item.name);
        setResults(data);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      searchNearby(activeTab);
    }
  }, [location, activeTab]);

  return (
    <div className="p-5 flex flex-col gap-6 h-full bg-[#f8f9fb]">
      <header className="flex flex-col gap-1">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black text-slate-800 tracking-tight"
        >
          Nearby Services
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-[11px] font-bold uppercase tracking-widest"
        >
          Real-time results near your location
        </motion.p>
      </header>

      {/* Tabs */}
      <div className="flex p-1.5 bg-slate-100 rounded-[20px] shadow-inner relative">
        <button 
          onClick={() => setActiveTab('mosque')}
          className={cn(
            "flex-1 py-3 rounded-[16px] text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 relative z-10",
            activeTab === 'mosque' ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
          )}
        >
          {activeTab === 'mosque' && (
            <motion.div 
              layoutId="active-tab"
              className="absolute inset-0 bg-white rounded-[16px] shadow-md -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <Building2 size={16} /> Mosques
        </button>
        <button 
          onClick={() => setActiveTab('halal')}
          className={cn(
            "flex-1 py-3 rounded-[16px] text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 relative z-10",
            activeTab === 'halal' ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
          )}
        >
          {activeTab === 'halal' && (
            <motion.div 
              layoutId="active-tab"
              className="absolute inset-0 bg-white rounded-[16px] shadow-md -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <Store size={16} /> Halal Food
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center justify-center py-24 gap-6"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-emerald-500/20 rounded-full" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-slate-400 font-black text-xs uppercase tracking-[0.2em] animate-pulse">Finding nearby {activeTab}s...</p>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="space-y-4 pb-10"
            >
              {results.map((place, i) => (
                  <motion.div 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:border-emerald-100 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-black text-sm text-slate-800 group-hover:text-emerald-600 transition-colors tracking-tight">{place.name}</h3>
                      {place.rating && (
                        <div className="bg-amber-50 text-amber-600 px-2 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 shadow-sm shadow-amber-100">
                          <Star size={10} fill="currentColor" /> {place.rating}
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mb-4 flex items-start gap-2 leading-relaxed">
                      <MapPin size={12} className="mt-0.5 shrink-0 text-slate-300 group-hover:text-emerald-400 transition-colors" />
                      {place.address}
                    </p>
                    <div className="flex items-center gap-5 mt-4 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <MapPin size={10} /> {place.distance || 'Nearby'}
                      </div>
                      {place.open_now !== undefined && (
                        <div className={cn(
                          "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest",
                          place.open_now ? "text-emerald-600" : "text-rose-500"
                        )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full", place.open_now ? "bg-emerald-500 animate-pulse" : "bg-rose-500")} />
                          {place.open_now ? 'Open Now' : 'Closed'}
                        </div>
                      )}
                    </div>
                  </motion.div>
              ))}
              {results.length === 0 && !loading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-24 bg-white rounded-[40px] border-2 border-dashed border-slate-100"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="text-slate-200" size={32} />
                  </div>
                  <p className="text-slate-400 font-black text-xs uppercase tracking-widest">No {activeTab}s found nearby.</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

