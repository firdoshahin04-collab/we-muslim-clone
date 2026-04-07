import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, BookOpen, Target, ChevronRight, CheckCircle2, Bell } from 'lucide-react';
import { cn } from '../lib/utils';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export default function KhatamPlanner() {
  const [targetDate, setTargetDate] = useState('');
  const [currentPara, setCurrentPara] = useState(1);
  const [plan, setPlan] = useState<any>(null);
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  const scheduleReminder = useCallback(async () => {
    if (!Capacitor.isNativePlatform() || !remindersEnabled || !plan) return;

    try {
      await LocalNotifications.requestPermissions();
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 100,
            title: "Quran Reading Reminder",
            body: `Don't forget to read your ${plan.parasPerDay} paras today!`,
            schedule: { at: new Date(Date.now() + 1000 * 60 * 60 * 2), allowWhileIdle: true }, // Remind in 2 hours
          }
        ]
      });
    } catch (e) {
      console.error("Failed to schedule khatam reminder:", e);
    }
  }, [remindersEnabled, plan]);

  useEffect(() => {
    if (remindersEnabled) {
      scheduleReminder();
    }
  }, [remindersEnabled, scheduleReminder]);

  const calculatePlan = () => {
    if (!targetDate) return;
    
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = Math.abs(target.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const remainingParas = 30 - (currentPara - 1);
    const parasPerDay = (remainingParas / (diffDays || 1)).toFixed(2);
    
    setPlan({
      daysLeft: diffDays,
      parasPerDay,
      remainingParas
    });
  };

  useEffect(() => {
    calculatePlan();
  }, [targetDate, currentPara]);

  return (
    <div className="p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">Khatam Planner</h1>
        <p className="text-slate-500">Plan your journey through the Quran.</p>
      </div>

      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 space-y-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
              <Calendar size={16} />
              Target Completion Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
              <BookOpen size={16} />
              Current Para (1-30)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="30"
                value={currentPara}
                onChange={(e) => setCurrentPara(parseInt(e.target.value))}
                className="flex-1 accent-emerald-600"
              />
              <span className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
                {currentPara}
              </span>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <AnimatePresence mode="wait">
          {plan ? (
            <motion.div
              key="plan"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="relative h-48 w-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    fill="transparent"
                    stroke="#f1f5f9"
                    strokeWidth="12"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="80"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="12"
                    strokeDasharray={502.6}
                    initial={{ strokeDashoffset: 502.6 }}
                    animate={{ strokeDashoffset: 502.6 * (1 - (currentPara - 1) / 30) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-black text-slate-800">{Math.round(((currentPara - 1) / 30) * 100)}%</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Progress</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-2xl text-center">
                  <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold">Daily Goal</p>
                  <p className="text-xl font-black text-emerald-900">{plan.parasPerDay} Para</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl text-center">
                  <p className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">Days Left</p>
                  <p className="text-xl font-black text-blue-900">{plan.daysLeft}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="text-emerald-600" size={20} />
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-800">Daily Reminder</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Remind me to read daily</p>
                  </div>
                </div>
                <button
                  onClick={() => setRemindersEnabled(!remindersEnabled)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative p-1",
                    remindersEnabled ? "bg-emerald-600" : "bg-slate-200"
                  )}
                >
                  <motion.div
                    animate={{ x: remindersEnabled ? 24 : 0 }}
                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                <Target className="text-emerald-600" size={20} />
                <p className="text-sm text-slate-600">
                  To reach your goal by <strong>{new Date(targetDate).toLocaleDateString()}</strong>, please read <strong>{plan.parasPerDay}</strong> paras every day.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-slate-300 space-y-2">
              <Calendar size={48} />
              <p className="text-sm font-medium">Set a target date to see your plan</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
