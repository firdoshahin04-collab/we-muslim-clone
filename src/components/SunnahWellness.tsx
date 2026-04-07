import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Apple, Droplets, Moon, Sun, Timer, Heart, Info } from 'lucide-react';
import { cn } from '../lib/utils';

const SUNNAH_FOODS = [
  { name: 'Dates', benefit: 'Rich in fiber, energy booster, and Sunnah to break fast with.', icon: '🌴', color: 'bg-amber-100 text-amber-900' },
  { name: 'Honey', benefit: 'Healing for mankind, natural antibiotic, and great for digestion.', icon: '🍯', color: 'bg-yellow-100 text-yellow-900' },
  { name: 'Olive Oil', benefit: 'Healthy fats, good for heart and skin. Mentioned in the Quran.', icon: '🫒', color: 'bg-emerald-100 text-emerald-900' },
  { name: 'Black Seed', benefit: 'A cure for every disease except death (Sahih Hadith).', icon: '🌑', color: 'bg-slate-100 text-slate-900' },
  { name: 'Water', benefit: 'Drink in three breaths, sitting down. Essential for life.', icon: '💧', color: 'bg-blue-100 text-blue-900' },
  { name: 'Milk', benefit: 'A blessed drink, provides strength and nutrition.', icon: '🥛', color: 'bg-stone-100 text-stone-900' },
];

export default function SunnahWellness() {
  const [fastingEnabled, setFastingEnabled] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any>(null);

  return (
    <div className="p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">Sunnah Wellness</h1>
        <p className="text-slate-500">Heal your body and soul through the Sunnah.</p>
      </div>

      {/* Fasting Tracker */}
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
              <Timer size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Sunnah Fasting</h3>
              <p className="text-xs text-slate-500">Monday & Thursday</p>
            </div>
          </div>
          <button
            onClick={() => setFastingEnabled(!fastingEnabled)}
            className={cn(
              "w-14 h-8 rounded-full transition-all relative p-1",
              fastingEnabled ? "bg-emerald-600" : "bg-slate-200"
            )}
          >
            <motion.div
              animate={{ x: fastingEnabled ? 24 : 0 }}
              className="w-6 h-6 bg-white rounded-full shadow-sm"
            />
          </button>
        </div>

        {fastingEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-4 border-t border-slate-50 space-y-4"
          >
            <div className="flex justify-between items-center bg-emerald-50 p-4 rounded-2xl">
              <div className="text-center flex-1">
                <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold">Suhoor Ends</p>
                <p className="text-xl font-bold text-emerald-900">04:42 AM</p>
              </div>
              <div className="w-px h-8 bg-emerald-200" />
              <div className="text-center flex-1">
                <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold">Iftar Starts</p>
                <p className="text-xl font-bold text-emerald-900">06:35 PM</p>
              </div>
            </div>
            <p className="text-xs text-center text-slate-500 italic">
              "The deeds are presented on Monday and Thursday, and I love that my deeds be presented while I am fasting." (Tirmidhi)
            </p>
          </motion.div>
        )}
      </div>

      {/* Sunnah Foods Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 px-2">Sunnah Foods</h3>
        <div className="grid grid-cols-2 gap-4">
          {SUNNAH_FOODS.map((food) => (
            <button
              key={food.name}
              onClick={() => setSelectedFood(food)}
              className={cn(
                "p-6 rounded-[32px] transition-all text-left space-y-3 group",
                food.color,
                "hover:scale-105 active:scale-95"
              )}
            >
              <span className="text-3xl block group-hover:scale-125 transition-transform">{food.icon}</span>
              <h4 className="font-bold">{food.name}</h4>
            </button>
          ))}
        </div>
      </div>

      {/* Food Detail Modal */}
      <AnimatePresence>
        {selectedFood && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white w-full max-w-md rounded-[40px] p-8 space-y-6 shadow-2xl"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-5xl">{selectedFood.icon}</span>
                  <h2 className="text-3xl font-bold text-slate-800">{selectedFood.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedFood(null)}
                  className="p-2 bg-slate-100 rounded-full text-slate-400"
                >
                  <Info size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-emerald-600">
                  <Heart size={20} />
                  <span className="font-bold">Health Benefits</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {selectedFood.benefit}
                </p>
              </div>
              <button
                onClick={() => setSelectedFood(null)}
                className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
