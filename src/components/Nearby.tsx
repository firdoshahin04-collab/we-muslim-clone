import { useState, useEffect } from 'react';
import { MapPin, Search, Store, Building2, ChevronRight, Clock, Star } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { CrescentStar, IslamicPattern } from './DecorativeIcons';

export default function Nearby() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'mosque' | 'halal'>('mosque');
  const [searchQuery, setSearchQuery] = useState('');

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

  const searchNearby = async (type: 'mosque' | 'halal', customQuery?: string) => {
    if (!location) return;
    setLoading(true);
    setResults([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      let prompt = "";
      
      if (customQuery) {
        prompt = `Find places matching "${customQuery}" near my current location. Provide a list of places. For each place, provide its name, address, rating, distance, and whether it's open now. Format each place as a single line like this: 'Name | Address | Rating | Distance | OpenNow'. Separate each place with a newline. Do not include any other text.`;
      } else {
        prompt = type === 'mosque' 
          ? "Find ONLY mosques (Masjids) near my current location. Provide a list of mosques. For each mosque, provide its name, address, rating, distance, and whether it's open now. Format each mosque as a single line like this: 'Name | Address | Rating | Distance | OpenNow'. Separate each mosque with a newline. Do not include any other text."
          : "Find ONLY halal meat shops and halal restaurants near my current location. Provide a list. For each place, provide its name, address, rating, distance, and whether it's open now. Format each place as a single line like this: 'Name | Address | Rating | Distance | OpenNow'. Separate each place with a newline. Do not include any other text.";
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
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
      <header className="flex flex-col gap-4 relative">
        <div className="flex justify-between items-start">
          <div className="relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-black text-slate-800 tracking-tight"
            >
              Nearby Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-emerald-600 text-[11px] font-black uppercase tracking-[0.2em]"
            >
              Discover {activeTab}s around you
            </motion.p>
          </div>
          <CrescentStar className="w-10 h-10 text-emerald-600/20 animate-float" />
        </div>

        <div className="relative z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search mosque or place name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchNearby(activeTab, searchQuery)}
            className="w-full bg-white border border-slate-100 rounded-[24px] py-4 pl-12 pr-16 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-sm"
          />
          <button 
            onClick={() => searchNearby(activeTab, searchQuery)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all"
          >
            Search
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex p-2 bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 relative">
        <button 
          onClick={() => setActiveTab('mosque')}
          className={cn(
            "flex-1 py-4 rounded-[24px] text-[12px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 relative z-10",
            activeTab === 'mosque' ? "text-white" : "text-slate-400 hover:text-slate-600"
          )}
        >
          {activeTab === 'mosque' && (
            <motion.div 
              layoutId="active-tab-bg"
              className="absolute inset-0 bg-emerald-600 rounded-[24px] shadow-lg shadow-emerald-200 -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <Building2 size={18} strokeWidth={2.5} /> Mosques
        </button>
        <button 
          onClick={() => setActiveTab('halal')}
          className={cn(
            "flex-1 py-4 rounded-[24px] text-[12px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 relative z-10",
            activeTab === 'halal' ? "text-white" : "text-slate-400 hover:text-slate-600"
          )}
        >
          {activeTab === 'halal' && (
            <motion.div 
              layoutId="active-tab-bg"
              className="absolute inset-0 bg-emerald-600 rounded-[24px] shadow-lg shadow-emerald-200 -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <Store size={18} strokeWidth={2.5} /> Halal Food
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 -mx-2 px-2">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center justify-center py-32 gap-8"
            >
              <div className="relative">
                <div className="w-24 h-24 border-8 border-emerald-500/10 rounded-[32px] rotate-45" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-24 h-24 border-8 border-emerald-500 border-t-transparent rounded-[32px] rotate-45" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin size={24} className="text-emerald-500 animate-bounce" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-slate-800 font-black text-sm uppercase tracking-[0.3em] mb-2">Scanning Area</p>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest animate-pulse">Finding {activeTab}s near you...</p>
              </div>
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
              className="space-y-4 pb-24"
            >
              {results.map((place, i) => (
                  <motion.div 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1 }
                    }}
                    whileHover={{ y: -4 }}
                    className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 hover:border-emerald-100 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.02] group-hover:opacity-5 transition-opacity">
                      <IslamicPattern />
                    </div>

                    <div className="flex justify-between items-start mb-3 relative z-10">
                      <div className="flex-1">
                        <h3 className="font-black text-lg text-slate-800 group-hover:text-emerald-600 transition-colors tracking-tight leading-tight mb-1">{place.name}</h3>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{activeTab}</p>
                      </div>
                      {place.rating && (
                        <div className="bg-amber-50 text-amber-600 px-3 py-1.5 rounded-2xl text-[11px] font-black flex items-center gap-1.5 shadow-sm shadow-amber-100 border border-amber-100">
                          <Star size={12} fill="currentColor" /> {place.rating}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-slate-500 mb-6 flex items-start gap-2.5 leading-relaxed relative z-10">
                      <div className="w-6 h-6 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-emerald-50 transition-colors">
                        <MapPin size={14} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                      </div>
                      {place.address}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-5 border-t border-slate-50 relative z-10">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                          {place.distance || 'Nearby'}
                        </div>
                        {place.open_now !== undefined && (
                          <div className={cn(
                            "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest",
                            place.open_now ? "text-emerald-600" : "text-rose-500"
                          )}>
                            <div className={cn("w-2 h-2 rounded-full", place.open_now ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-rose-500")} />
                            {place.open_now ? 'Open Now' : 'Closed'}
                          </div>
                        )}
                      </div>
                      
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          if (location) {
                            window.open(`https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${encodeURIComponent(place.name + ' ' + place.address)}&travelmode=driving`, '_blank');
                          } else {
                            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`, '_blank');
                          }
                        }}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200"
                      >
                        Navigate <ChevronRight size={16} strokeWidth={3} />
                      </motion.button>
                    </div>
                  </motion.div>
              ))}
              {results.length === 0 && !loading && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-32 bg-white rounded-[48px] border-2 border-dashed border-slate-100"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-8 rotate-12">
                    <MapPin className="text-slate-200 -rotate-12" size={40} />
                  </div>
                  <h4 className="text-slate-800 font-black text-lg mb-2 tracking-tight">No results found</h4>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Try refreshing or checking your location</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => searchNearby(activeTab)}
                    className="mt-8 px-8 py-4 bg-emerald-600 text-white rounded-[24px] text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200"
                  >
                    Refresh Search
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

