import { useState, useEffect } from 'react';
import { Sun, Moon, Shield, Heart, Copy, RotateCcw, ChevronLeft, CheckCircle2, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { RubElHizb, IslamicPattern } from './DecorativeIcons';

interface Zikr {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  count: number;
  benefit?: string;
}

interface AzkarCategory {
  id: string;
  title: string;
  icon: any;
  color: string;
  items: Zikr[];
}

const AZKAR_DATA: AzkarCategory[] = [
  {
    id: 'morning',
    title: 'Morning Azkar',
    icon: Sun,
    color: 'amber',
    items: [
      {
        id: 1,
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        transliteration: "Asbahna wa asbahal-mulku lillah...",
        translation: "We have entered a new day and with it all dominion is Allah's...",
        count: 1,
        benefit: "Protection and gratitude for the new day."
      },
      {
        id: 2,
        arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ",
        transliteration: "Subhanallahi wa bihamdihi: 'Adada khalqihi...",
        translation: "Glory is to Allah and praise is to Him, by the multitude of His creation...",
        count: 3,
        benefit: "Immense reward, equivalent to hours of remembrance."
      },
      {
        id: 3,
        arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
        transliteration: "Allahumma bika asbahna, wa bika amsayna...",
        translation: "O Allah, by You we enter the morning and by You we enter the evening...",
        count: 1
      },
      {
        id: 10,
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
        transliteration: "Ya Hayyu Ya Qayyum bi-rahmatika astagheeth...",
        translation: "O Ever Living, O Self-Subsisting, by Your mercy I seek assistance...",
        count: 1,
        benefit: "Supplication for guidance and help in all affairs."
      },
      {
        id: 13,
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
        transliteration: "Allahumma inni as'aluka 'ilman nafi'an...",
        translation: "O Allah, I ask You for knowledge that is of benefit, a good provision and deeds that will be accepted.",
        count: 1
      },
      {
        id: 14,
        arabic: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
        transliteration: "Raditu billahi Rabban, wa bil-Islami dinan...",
        translation: "I am pleased with Allah as my Lord, with Islam as my religion and with Muhammad as my Prophet.",
        count: 3,
        benefit: "Allah has promised to please the one who says this."
      }
    ]
  },
  {
    id: 'evening',
    title: 'Evening Azkar',
    icon: Moon,
    color: 'indigo',
    items: [
      {
        id: 4,
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
        transliteration: "Amsayna wa amsal-mulku lillah...",
        translation: "We have entered the evening and with it all dominion is Allah's...",
        count: 1
      },
      {
        id: 5,
        arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        transliteration: "A'udhu bikalimatil-lahit-tammati min sharri ma khalaq",
        translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
        count: 3,
        benefit: "Protection from harm during the night."
      },
      {
        id: 6,
        arabic: "اللَّهُمَّ مَا أَمْسَى بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
        transliteration: "Allahumma ma amsa bi min ni'matin...",
        translation: "O Allah, whatever blessing has been received by me or any of Your creatures...",
        count: 1
      },
      {
        id: 11,
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
        transliteration: "Allahumma anta Rabbi la ilaha illa Anta...",
        translation: "O Allah, You are my Lord, none has the right to be worshipped but You...",
        count: 1,
        benefit: "The master of seeking forgiveness (Sayyidul Istighfar)."
      },
      {
        id: 15,
        arabic: "اللَّهُمَّ عافِني في بَدَني، اللَّهُمَّ عافِني في سَمْعي، اللَّهُمَّ عافِني في بَصَري، لا إلهَ إلاّ أَنْتَ",
        transliteration: "Allahumma 'afini fi badani...",
        translation: "O Allah, make me healthy in my body. O Allah, make me healthy in my hearing. O Allah, make me healthy in my sight.",
        count: 3
      }
    ]
  },
  {
    id: 'protection',
    title: 'Protection & Safety',
    icon: Shield,
    color: 'emerald',
    items: [
      {
        id: 7,
        arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهو السَّمِيعُ الْعَلِيمُ",
        transliteration: "Bismillahil-ladhi la yadurru ma'as-mihi shay'un...",
        translation: "In the name of Allah with whose name nothing is harmed on earth nor in heaven...",
        count: 3,
        benefit: "Nothing will harm the one who recites this."
      },
      {
        id: 8,
        arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        transliteration: "Hasbiyallahu la ilaha illa Huwa...",
        translation: "Allah is sufficient for me. There is no god but He. In Him I put my trust...",
        count: 7,
        benefit: "Allah will suffice him in whatever concerns him."
      },
      {
        id: 12,
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
        transliteration: "A'udhu bi-kalimatillahi at-tammah...",
        translation: "I seek refuge in the perfect words of Allah from every devil and poisonous creature...",
        count: 3,
        benefit: "Protection for children and family from evil eye and harm."
      },
      {
        id: 16,
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ",
        transliteration: "Allahumma inni a'udhu bika minal-kufri wal-faqr...",
        translation: "O Allah, I seek refuge in You from disbelief and poverty, and I seek refuge in You from the punishment of the grave.",
        count: 3
      }
    ]
  }
];

export default function Azkar() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(AZKAR_DATA[0].id);
  const [counts, setCounts] = useState<Record<number, number>>({});
  const [completed, setCompleted] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);

  const category = AZKAR_DATA.find(c => c.id === activeCategory)!;

  const handleIncrement = (zikr: Zikr) => {
    const currentCount = counts[zikr.id] || 0;
    if (currentCount < zikr.count) {
      const newCount = currentCount + 1;
      setCounts(prev => ({ ...prev, [zikr.id]: newCount }));
      
      if (newCount === zikr.count) {
        setCompleted(prev => [...prev, zikr.id]);
        if (window.navigator.vibrate) window.navigator.vibrate(50);
      }
    }
  };

  const resetZikr = (id: number) => {
    setCounts(prev => ({ ...prev, [id]: 0 }));
    setCompleted(prev => prev.filter(i => i !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd] pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 p-6 z-50 shadow-sm overflow-hidden">
        <IslamicPattern className="opacity-[0.03]" />
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)} 
              className="p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-2xl transition-all"
            >
              <ChevronLeft size={22} />
            </motion.button>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">Daily Azkar</h1>
              <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Remembrance of Allah</p>
            </div>
          </div>
          <RubElHizb className="w-8 h-8 text-emerald-600/20 animate-spin-slow" />
        </div>
      </header>

      {/* Category Tabs */}
      <div className="p-6 flex gap-3 overflow-x-auto no-scrollbar">
        {AZKAR_DATA.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-3 px-6 py-4 rounded-[24px] transition-all shrink-0 border",
              activeCategory === cat.id 
                ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200" 
                : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
            )}
          >
            <cat.icon size={20} className={activeCategory === cat.id ? "text-emerald-400" : ""} />
            <span className="font-black text-sm uppercase tracking-widest">{cat.title}</span>
          </button>
        ))}
      </div>

      {/* Azkar List */}
      <div className="px-6 flex flex-col gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-6"
          >
            {category.items.map((zikr) => (
              <motion.div
                key={zikr.id}
                className={cn(
                  "bg-white p-8 rounded-[40px] border transition-all duration-500 relative overflow-hidden",
                  completed.includes(zikr.id) 
                    ? "border-emerald-100 bg-emerald-50/30" 
                    : "border-slate-100 shadow-sm hover:shadow-md"
                )}
              >
                {completed.includes(zikr.id) && (
                  <div className="absolute top-6 right-6 text-emerald-500">
                    <CheckCircle2 size={24} />
                  </div>
                )}

                <div className="space-y-8 relative z-10">
                  <p className="text-right text-3xl font-arabic leading-[1.8] text-slate-800" dir="rtl">
                    {zikr.arabic}
                  </p>
                  
                  <div className="space-y-4">
                    <p className="text-sm text-slate-400 italic leading-relaxed">{zikr.transliteration}</p>
                    <p className="text-slate-600 font-medium leading-relaxed">{zikr.translation}</p>
                    {zikr.benefit && (
                      <div className="p-4 bg-emerald-50 rounded-2xl flex items-start gap-3">
                        <Heart size={16} className="text-emerald-500 shrink-0 mt-1" />
                        <p className="text-xs text-emerald-700 font-medium leading-relaxed">{zikr.benefit}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => copyToClipboard(zikr.arabic)}
                        className="p-3 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                      >
                        <Copy size={18} />
                      </button>
                      <button 
                        onClick={() => resetZikr(zikr.id)}
                        className="p-3 bg-slate-50 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                      >
                        <RotateCcw size={18} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleIncrement(zikr)}
                      disabled={completed.includes(zikr.id)}
                      className={cn(
                        "flex items-center gap-4 px-8 py-4 rounded-[24px] transition-all",
                        completed.includes(zikr.id)
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:scale-105 active:scale-95"
                      )}
                    >
                      <span className="text-2xl font-black">{(counts[zikr.id] || 0)}</span>
                      <div className="w-px h-6 bg-white/20" />
                      <span className="text-xs font-black uppercase tracking-widest">
                        {completed.includes(zikr.id) ? "Completed" : `Target: ${zikr.count}`}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 px-6 py-3 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest z-[100] shadow-2xl"
          >
            Copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
