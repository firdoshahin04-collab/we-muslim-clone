import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Compass, MapPin, Settings, Fingerprint, List } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
    <div className="h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-xl border-x border-slate-200 overflow-hidden relative">
      <main className="flex-1 overflow-y-auto pb-20 scroll-smooth">
        {children}
      </main>
      
      <nav className="fixed bottom-0 w-full max-w-md bg-white/80 backdrop-blur-xl border-t border-slate-200 px-4 py-3 flex justify-between items-center z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "relative flex flex-col items-center gap-1 transition-all duration-300 px-2 py-1 rounded-xl",
                isActive ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-emerald-50 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon size={22} className={cn("transition-transform duration-300", isActive && "scale-110")} />
                <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
