import { ReactNode, useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Compass, MapPin, Settings, Fingerprint, List, Heart, Quote, Play, Pause, X, SkipForward, SkipBack } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { IslamicPattern } from './DecorativeIcons';
import { useAudio } from './AudioProvider';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { isPlaying, trackTitle, trackSubtitle, pauseTrack, resumeTrack, stopTrack, progress, duration, seek } = useAudio();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/quran', icon: BookOpen, label: 'Quran' },
    { to: '/para', icon: List, label: 'Para' },
    { to: '/qibla', icon: Compass, label: 'Qibla' },
    { to: '/nearby', icon: MapPin, label: 'Nearby' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const currentScrollY = scrollContainerRef.current.scrollTop;
      const delta = currentScrollY - lastScrollY.current;
      
      // Hide on scroll down, show on scroll up
      // Add a threshold to avoid flickering
      if (Math.abs(delta) > 10) {
        if (delta > 0 && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-screen bg-[#f8f9fb] flex flex-col max-w-md mx-auto shadow-2xl border-x border-slate-200/50 overflow-hidden relative">
      <IslamicPattern className="opacity-[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 to-transparent pointer-events-none" />
      
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 -left-20 w-80 h-80 bg-blue-100/10 rounded-full blur-3xl pointer-events-none"
      />

      <main 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto pb-32 scroll-smooth relative z-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Global Audio Player */}
      <AnimatePresence>
        {trackTitle && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: isVisible ? -100 : -20, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-[60] bottom-0"
          >
            <div className="bg-slate-900/95 backdrop-blur-xl rounded-[24px] p-3 shadow-2xl border border-white/10 flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                <BookOpen size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-black truncate tracking-tight">{trackTitle}</p>
                <p className="text-emerald-400 text-[10px] font-bold truncate uppercase tracking-widest">{trackSubtitle}</p>
                <div className="mt-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(progress / duration) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => isPlaying ? pauseTrack() : resumeTrack()}
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all"
                >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                </button>
                <button 
                  onClick={stopTrack}
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-rose-400 hover:bg-rose-500/20 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] glass rounded-[32px] px-2 py-2 flex justify-between items-center z-50 shadow-2xl shadow-emerald-900/10 border border-white/40"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "relative flex flex-col items-center gap-1 transition-all duration-500 px-3 py-2 rounded-2xl group",
                isActive ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-emerald-500/10 rounded-2xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon size={20} className={cn("transition-all duration-500", isActive ? "scale-110 stroke-[2.5px]" : "group-hover:scale-110")} />
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-[0.15em] transition-all duration-500",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                )}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="nav-dot"
                    className="absolute -bottom-1 w-1 h-1 bg-emerald-500 rounded-full"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </motion.nav>
    </div>
  );
}
