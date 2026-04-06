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
    <div className="p-4 flex flex-col gap-4 h-full bg-[#f8f9fb]">
      <header>
        <h1 className="text-xl font-bold text-slate-800">Nearby Services</h1>
        <p className="text-slate-500 text-xs">Real-time results near your location</p>
      </header>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-100 rounded-xl">
        <button 
          onClick={() => setActiveTab('mosque')}
          className={cn(
            "flex-1 py-2.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-2",
            activeTab === 'mosque' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400"
          )}
        >
          <Building2 size={14} /> Mosques
        </button>
        <button 
          onClick={() => setActiveTab('halal')}
          className={cn(
            "flex-1 py-2.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-2",
            activeTab === 'halal' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400"
          )}
        >
          <Store size={14} /> Halal Meat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 gap-4"
            >
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-400 font-medium animate-pulse">Finding nearby {activeTab}s...</p>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {results.map((place, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <h3 className="font-bold text-sm text-slate-800 group-hover:text-emerald-600 transition-colors">{place.name}</h3>
                      {place.rating && (
                        <div className="bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-1">
                          <Star size={8} fill="currentColor" /> {place.rating}
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 mb-2 flex items-start gap-1">
                      <MapPin size={10} className="mt-0.5 shrink-0 text-slate-300" />
                      {place.address}
                    </p>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-50">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        <MapPin size={9} /> {place.distance || 'Nearby'}
                      </div>
                      {place.open_now !== undefined && (
                        <div className={cn(
                          "flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest",
                          place.open_now ? "text-emerald-600" : "text-rose-500"
                        )}>
                          <Clock size={9} /> {place.open_now ? 'Open Now' : 'Closed'}
                        </div>
                      )}
                    </div>
                  </motion.div>
              ))}
              {results.length === 0 && !loading && (
                <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-200">
                  <MapPin className="mx-auto text-slate-200 mb-4" size={48} />
                  <p className="text-slate-400 font-medium">No {activeTab}s found in this area.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

