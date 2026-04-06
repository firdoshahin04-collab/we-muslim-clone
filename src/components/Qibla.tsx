import { useState, useEffect } from 'react';
import { Compass, MapPin, Info } from 'lucide-react';
import { getQiblaDirection } from '../lib/adhan';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Qibla() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [qibla, setQibla] = useState<number | null>(null);
  const [heading, setHeading] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          startListening();
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setPermissionGranted(true);
      startListening();
    }
  };

  const startListening = () => {
    const handleOrientation = (e: any) => {
      // Use webkitCompassHeading for iOS
      if (e.webkitCompassHeading !== undefined) {
        setHeading(e.webkitCompassHeading);
      } else if (e.alpha !== null) {
        // For Android, alpha is 0 when the device is pointing North in absolute mode
        setHeading(360 - e.alpha);
      }
    };

    if (window.DeviceOrientationEvent) {
      // Try absolute orientation first (Android)
      if ('ondeviceorientationabsolute' in (window as any)) {
        (window as any).addEventListener('deviceorientationabsolute', handleOrientation, true);
      } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocation({ lat, lng });
        setQibla(getQiblaDirection(lat, lng));
      },
      (err) => {
        console.error("Geolocation error:", err);
        // Default to Mecca if location fails
        const lat = 21.4225;
        const lng = 39.8262;
        setLocation({ lat, lng });
        setQibla(getQiblaDirection(lat, lng));
      }
    );
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4 items-center h-full bg-[#fcfcfd]">
      <header className="w-full">
        <h1 className="text-xl font-bold text-slate-800">Qibla Direction</h1>
        <p className="text-slate-500 text-xs">Accurate direction towards the Kaaba</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
        {!permissionGranted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center flex flex-col items-center gap-6 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm"
          >
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
              <Compass size={40} className="animate-pulse" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-800">Compass Access</h2>
              <p className="text-slate-500 text-xs max-w-[200px] leading-relaxed">
                We need your device's compass to show the exact Qibla direction.
              </p>
            </div>
            <button 
              onClick={requestPermission}
              className="bg-emerald-600 text-white px-8 py-3.5 rounded-[20px] font-bold shadow-xl shadow-emerald-200 active:scale-95 transition-all w-full text-sm"
            >
              Enable Compass
            </button>
          </motion.div>
        ) : (
          <div className="relative flex flex-col items-center gap-8">
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Outer Ring with Glow */}
              <div className={cn(
                "absolute inset-0 border-[10px] border-white rounded-full shadow-2xl transition-all duration-500",
                qibla && Math.abs(heading - qibla) < 5 ? "shadow-emerald-400/50 scale-105" : "shadow-slate-200"
              )} />
              <div className="absolute inset-0 border border-slate-100 rounded-full" />
              
              {/* Compass Markings */}
              <div className="absolute top-3 font-black text-slate-400 text-[10px]">N</div>
              <div className="absolute bottom-3 font-black text-slate-300 text-[10px]">S</div>
              <div className="absolute left-3 font-black text-slate-300 text-[10px]">W</div>
              <div className="absolute right-3 font-black text-slate-300 text-[10px]">E</div>

              {/* Rotating Compass Face */}
              <motion.div 
                className="absolute inset-6 border border-slate-50 rounded-full"
                animate={{ rotate: -heading }}
                transition={{ type: 'spring', stiffness: 40, damping: 20 }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-0.5 h-2 bg-slate-200 top-0 left-1/2 -translate-x-1/2 origin-[0_102px]"
                    style={{ transform: `translateX(-50%) rotate(${i * 30}deg)` }}
                  />
                ))}
              </motion.div>

              {/* Qibla Needle */}
              <motion.div 
                className="absolute w-full h-full flex items-center justify-center z-10"
                animate={{ rotate: qibla ? qibla - heading : 0 }}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              >
                <div className="relative h-full w-1.5 flex flex-col items-center">
                  <motion.div 
                    animate={{ 
                      scale: qibla && Math.abs(heading - qibla) < 5 ? 1.2 : 1,
                      filter: qibla && Math.abs(heading - qibla) < 5 ? 'brightness(1.2)' : 'brightness(1)'
                    }}
                    className="w-6 h-6 bg-emerald-600 rotate-45 -mt-3 rounded-sm shadow-lg" 
                  />
                  <div className={cn(
                    "w-1 h-32 rounded-full shadow-sm transition-colors duration-300",
                    qibla && Math.abs(heading - qibla) < 5 ? "bg-emerald-500" : "bg-emerald-600"
                  )} />
                  <div className={cn(
                    "absolute top-8 bg-white rounded-full p-1 shadow-xl border-2 transition-all duration-300",
                    qibla && Math.abs(heading - qibla) < 5 ? "border-emerald-400 scale-125" : "border-emerald-100 scale-110"
                  )}>
                    <img src="https://cdn-icons-png.flaticon.com/512/2972/2972143.png" alt="Kaaba" className="w-8 h-8" />
                  </div>
                </div>
              </motion.div>

              {/* Center Point */}
              <div className="w-3 h-3 bg-white rounded-full border-[3px] border-emerald-600 z-20 shadow-sm" />
              
              {/* Success Pulse */}
              <AnimatePresence>
                {qibla && Math.abs(heading - qibla) < 5 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.2, scale: 1.2 }}
                    exit={{ opacity: 0, scale: 1.5 }}
                    className="absolute inset-0 bg-emerald-400 rounded-full"
                  />
                )}
              </AnimatePresence>
            </div>

            <div className={cn(
              "text-center bg-white px-6 py-3 rounded-2xl border transition-all duration-300 shadow-sm",
              qibla && Math.abs(heading - qibla) < 5 ? "border-emerald-400 shadow-emerald-100" : "border-slate-100"
            )}>
              <p className={cn(
                "text-4xl font-black tracking-tighter transition-colors",
                qibla && Math.abs(heading - qibla) < 5 ? "text-emerald-600" : "text-slate-800"
              )}>{qibla?.toFixed(1)}°</p>
              <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-black mt-0.5">
                {qibla && Math.abs(heading - qibla) < 5 ? "Perfectly Aligned" : "Qibla Direction"}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm w-full max-w-sm">
          <h3 className="text-sm font-black text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-widest">
            <Info size={16} className="text-emerald-600" />
            Accuracy Guide
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3 items-center">
              <div className="w-6 h-6 rounded-xl bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0">01</div>
              <p className="text-[11px] text-slate-500 font-bold leading-tight">Place your device on a flat surface or hold it level.</p>
            </div>
            
            <div className="flex gap-3 items-start bg-emerald-50/30 p-3 rounded-2xl border border-emerald-50/50">
              <div className="w-6 h-6 rounded-xl bg-emerald-100 flex items-center justify-center text-[10px] font-black text-emerald-600 shrink-0">02</div>
              <div className="flex-1 space-y-3">
                <p className="text-[11px] text-emerald-800 font-black leading-tight">Move your phone in a figure-8 motion to calibrate.</p>
                <div className="relative h-16 bg-white/50 rounded-xl flex items-center justify-center overflow-hidden border border-emerald-100/50">
                  <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                    <path
                      d="M50 20C50 20 62.5 7.5 75 7.5C87.5 7.5 87.5 32.5 75 32.5C62.5 32.5 50 20 50 20ZM50 20C50 20 37.5 7.5 25 7.5C12.5 7.5 12.5 32.5 25 32.5C37.5 32.5 50 20 50 20Z"
                      stroke="#e2e8f0"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <motion.path
                      d="M50 20C50 20 62.5 7.5 75 7.5C87.5 7.5 87.5 32.5 75 32.5C62.5 32.5 50 20 50 20ZM50 20C50 20 37.5 7.5 25 7.5C12.5 7.5 12.5 32.5 25 32.5C37.5 32.5 50 20 50 20Z"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.g
                      animate={{
                        offsetDistance: ["0%", "100%"]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        offsetPath: "path('M50 20C50 20 62.5 7.5 75 7.5C87.5 7.5 87.5 32.5 75 32.5C62.5 32.5 50 20 50 20ZM50 20C50 20 37.5 7.5 25 7.5C12.5 7.5 12.5 32.5 25 32.5C37.5 32.5 50 20 50 20Z')",
                      }}
                    >
                      <rect x="-4" y="-6" width="8" height="12" rx="1.5" fill="#10b981" />
                      <circle r="1" fill="white" cy="-3" />
                    </motion.g>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <div className="w-6 h-6 rounded-xl bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0">03</div>
              <p className="text-[11px] text-slate-500 font-bold leading-tight">Stay away from large metal objects or magnets.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
