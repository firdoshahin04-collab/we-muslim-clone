import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Compass, MapPin, Settings, Fingerprint, List } from 'lucide-react';
import { cn } from '../lib/utils';

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
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-xl border-x border-slate-200">
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
              )
            }
          >
            <item.icon size={24} />
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
