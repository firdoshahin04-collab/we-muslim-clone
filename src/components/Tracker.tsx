import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Trophy, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, getDay } from 'date-fns';

export default function Tracker() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [stats, setStats] = useState({
    consecutive: 3,
    accumulatedDays: 3,
    accumulatedTimes: 7,
    accumulatedDuration: 1
  });

  // Simple Hijri conversion (approximate for UI)
  const getHijriDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-u-ca-islamic-uma-nu-latn', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getHijriMonth = (date: Date) => {
    const parts = new Intl.DateTimeFormat('en-u-ca-islamic-uma-nu-latn', {
      month: 'long',
      year: 'numeric'
    }).formatToParts(date);
    const month = parts.find(p => p.type === 'month')?.value;
    const year = parts.find(p => p.type === 'year')?.value;
    return `${month}, ${year}`;
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const startDay = getDay(startOfMonth(currentDate));
  const blanks = Array(startDay).fill(null);

  return (
    <div className="flex flex-col h-full bg-[#fcfcfd] overflow-hidden pb-24">
      {/* Header - WeMuslim Style */}
      <header className="bg-[#004d40] pt-12 pb-16 px-6 rounded-b-[48px] relative overflow-hidden shadow-2xl shadow-emerald-900/20">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/islamic-art.png")' }} />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">Prayer Tracker</h1>
            <p className="text-emerald-200 text-xs font-medium">Monitor your spiritual journey</p>
          </div>
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center text-amber-400">
            <Trophy size={24} fill="currentColor" />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 -mt-8 relative z-20">
        {/* Hero Section - Streak Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200/50 border border-slate-50 overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Zap size={24} fill="currentColor" className="animate-pulse" />
              </div>
              <span className="text-5xl font-black text-slate-800 tracking-tighter">{stats.consecutive}</span>
            </div>
            <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest leading-tight max-w-[120px]">Day Prayer Streak</p>
          </div>
          
          <img 
            src="https://img.freepik.com/free-vector/muslim-man-praying-flat-illustration_23-2148943144.jpg" 
            alt="Praying Man" 
            className="absolute right-0 bottom-0 w-44 h-44 object-contain opacity-20 group-hover:opacity-40 transition-opacity duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl" />
        </motion.div>

        {/* Stats Grid - Premium Look */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Accumulated Days', value: `${stats.accumulatedDays} days`, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Accumulated Times', value: `${stats.accumulatedTimes} times`, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Accumulated Duration', value: `${stats.accumulatedDuration} min`, color: 'text-amber-600', bg: 'bg-amber-50' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm text-center flex flex-col items-center gap-2">
              <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center", stat.bg, stat.color)}>
                <Activity size={16} />
              </div>
              <p className="text-sm font-black text-slate-800 tracking-tight">{stat.value}</p>
              <p className="text-[8px] text-slate-400 font-black uppercase tracking-widest leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Calendar Section - WeMuslim Style */}
        <div className="bg-white rounded-[48px] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                {getHijriMonth(currentDate)}
                <ChevronRight size={16} className="rotate-90 text-emerald-600" />
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{format(currentDate, 'MMMM, yyyy')}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-slate-50 rounded-xl text-slate-300 hover:text-emerald-600 transition-colors"><ChevronLeft size={20} /></button>
              <button className="p-2 bg-slate-50 rounded-xl text-slate-300 hover:text-emerald-600 transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-y-6 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={`${day}-${i}`} className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{day}</div>
            ))}
            
            {blanks.map((_, i) => <div key={`blank-${i}`} />)}
            
            {days.map((day, i) => {
              const isToday = isSameDay(day, new Date());
              const isSelected = isSameDay(day, currentDate);
              
              return (
                <button 
                  key={i}
                  onClick={() => setCurrentDate(day)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black transition-all duration-300",
                    isToday ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : 
                    isSelected ? "bg-emerald-50 text-emerald-600" : "text-slate-800 hover:bg-slate-50"
                  )}>
                    {format(day, 'd')}
                  </div>
                  <span className={cn("text-[8px] font-bold", isToday ? "text-emerald-600" : "text-slate-300")}>{i + 20}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Badges Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-sm font-black text-slate-800">Achievements</h3>
            <button className="text-emerald-600 text-[10px] font-black uppercase tracking-widest">View All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {[
              { name: "Early Bird", icon: "🌅", desc: "Fajr on time", color: "bg-amber-50" },
              { name: "Consistent", icon: "🔥", desc: "7 day streak", color: "bg-rose-50" },
              { name: "Charitable", icon: "🤝", desc: "Zakat paid", color: "bg-blue-50" },
              { name: "Learner", icon: "📚", desc: "10 Surahs", color: "bg-emerald-50" }
            ].map((badge, i) => (
              <div key={i} className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm min-w-[140px] text-center space-y-3 group active:scale-95 transition-all">
                <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center text-3xl mx-auto shadow-sm", badge.color)}>
                  {badge.icon}
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-slate-800 tracking-tight">{badge.name}</h4>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History Section */}
        <div className="space-y-6 pb-12">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-sm font-black text-slate-800">Recent Activity</h3>
            <button className="text-emerald-600 text-[10px] font-black uppercase tracking-widest">Full History</button>
          </div>
          <div className="space-y-3">
            {[
              { name: "Isha Prayer", time: "8:05 PM", status: "Completed", icon: <Clock size={18} /> },
              { name: "Maghrib Prayer", time: "6:45 PM", status: "Completed", icon: <Clock size={18} /> },
              { name: "Asr Prayer", time: "5:10 PM", status: "Completed", icon: <Clock size={18} /> }
            ].map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800 tracking-tight">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{item.time}</p>
                  </div>
                </div>
                <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl uppercase tracking-widest">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { CheckCircle2, Activity } from 'lucide-react';
