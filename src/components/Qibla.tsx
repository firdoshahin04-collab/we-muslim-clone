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
  const [isManual, setIsManual] = useState(false);

  const requestPermission = async () => {
    // Check if it's iOS and needs permission
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
        } else {
          alert("Permission denied for compass. You can use manual mode.");
          setIsManual(true);
          setPermissionGranted(true);
        }
      } catch (err) {
        console.error("Permission error:", err);
        setIsManual(true);
        setPermissionGranted(true);
      }
    } else {
      // For Android and browsers that don't need explicit permission
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    if (!permissionGranted || isManual) return;

    const handleOrientation = (e: any) => {
      let currentHeading = 0;
      
      // iOS
      if (e.webkitCompassHeading !== undefined) {
        currentHeading = e.webkitCompassHeading;
      } 
      // Android / Standard
      else if (e.alpha !== null) {
        if (e.absolute === true || e.webkitCompassHeading === undefined) {
          currentHeading = 360 - e.alpha;
        } else {
          currentHeading = e.alpha;
        }
      }
      
      setHeading(currentHeading);
    };

    // Check if we are in a browser that might not have orientation sensors
    const hasSensor = 'ondeviceorientation' in window || 'ondeviceorientationabsolute' in window;
    const isTouch = 'ontouchstart' in window;

    if (!hasSensor || !isTouch) {
      setIsManual(true);
      return;
    }

    const absoluteListener = 'ondeviceorientationabsolute' in window;
    const eventName = absoluteListener ? 'deviceorientationabsolute' : 'deviceorientation';

    window.addEventListener(eventName, handleOrientation, true);

    return () => {
      window.removeEventListener(eventName, handleOrientation, true);
    };
  }, [permissionGranted, isManual]);

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
        const lat = 21.4225;
        const lng = 39.8262;
        setLocation({ lat, lng });
        setQibla(getQiblaDirection(lat, lng));
      }
    );
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4 items-center h-full bg-[#fcfcfd]">
      <header className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Qibla Direction</h1>
          <p className="text-slate-500 text-xs">Accurate direction towards the Kaaba</p>
        </div>
        {permissionGranted && (
          <button 
            onClick={() => setIsManual(!isManual)}
            className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg"
          >
            {isManual ? "Auto Mode" : "Manual Mode"}
          </button>
        )}
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
            {isManual && (
              <div className="w-full max-w-[200px] space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Rotate Manually</p>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={heading} 
                  onChange={(e) => setHeading(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            )}
            
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

        <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm w-full max-w-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
            <Info size={16} className="text-emerald-600" />
            Accuracy Guide
          </h3>
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-lg bg-slate-50 flex items-center justify-center text-[9px] font-bold text-slate-400">01</div>
              <p className="text-[10px] text-slate-500 leading-relaxed">Place your device on a flat surface or hold it level.</p>
            </div>
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-lg bg-slate-50 flex items-center justify-center text-[9px] font-bold text-slate-400">02</div>
              <p className="text-[10px] text-slate-500 leading-relaxed">Move your phone in a figure-8 motion to calibrate.</p>
            </div>
            <div className="flex gap-2">
              <div className="w-5 h-5 rounded-lg bg-slate-50 flex items-center justify-center text-[9px] font-bold text-slate-400">03</div>
              <p className="text-[10px] text-slate-500 leading-relaxed">Stay away from large metal objects or magnets.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
