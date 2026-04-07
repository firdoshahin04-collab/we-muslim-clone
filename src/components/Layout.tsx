import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Compass, MapPin, Settings, Fingerprint, List } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/quran', icon: BookOpen, label: 'Quran' },
    { to: '/para', icon: List, label: 'Para' },
    { to: '/qibla', icon: Compass, label: 'Qibla' },
    { to: '/tasbih', icon: Fingerprint, label: 'Tasbih' },
    { to: '/nearby', icon: MapPin, label: 'Nearby' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="h-screen bg-[#f8f9fb] flex flex-col max-w-md mx-auto shadow-2xl border-x border-slate-200/50 overflow-hidden relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/30 to-transparent pointer-events-none" />
      
      {/* Animated Background Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 -left-20 w-80 h-80 bg-blue-100/10 rounded-full blur-3xl pointer-events-none"
      />

      <main className="flex-1 overflow-y-auto pb-24 scroll-smooth relative z-10">
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
      
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] glass rounded-[32px] px-2 py-2 flex justify-between items-center z-50 shadow-2xl shadow-emerald-900/10 border border-white/40">
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
      </nav>
    </div>
  );
}
