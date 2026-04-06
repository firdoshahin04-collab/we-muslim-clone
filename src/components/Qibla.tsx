import { useState, useEffect } from 'react';
import { Compass, MapPin, Info } from 'lucide-react';
import { getQiblaDirection } from '../lib/adhan';
import { motion, useAnimation } from 'motion/react';

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
    const handleOrientation = (e: DeviceOrientationEvent) => {
      const event = e as any;
      // Use webkitCompassHeading for iOS, alpha for Android
      if (event.webkitCompassHeading !== undefined) {
        setHeading(event.webkitCompassHeading);
      } else if (e.alpha !== null) {
        // For Android, alpha is 0 when the device is pointing North
        setHeading(360 - e.alpha);
      }
    };
    window.addEventListener('deviceorientation', handleOrientation, true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
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
              {/* Outer Ring */}
              <div className="absolute inset-0 border-[10px] border-white rounded-full shadow-xl" />
              <div className="absolute inset-0 border border-slate-100 rounded-full" />
              
              {/* Compass Markings */}
              <div className="absolute top-3 font-black text-slate-300 text-[10px]">N</div>
              <div className="absolute bottom-3 font-black text-slate-300 text-[10px]">S</div>
              <div className="absolute left-3 font-black text-slate-300 text-[10px]">W</div>
              <div className="absolute right-3 font-black text-slate-300 text-[10px]">E</div>

              {/* Rotating Compass Face */}
              <motion.div 
                className="absolute inset-6 border border-slate-50 rounded-full"
                animate={{ rotate: -heading }}
                transition={{ type: 'spring', stiffness: 40, damping: 20 }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-slate-200 rounded-full" />
              </motion.div>

              {/* Qibla Needle */}
              <motion.div 
                className="absolute w-full h-full flex items-center justify-center z-10"
                animate={{ rotate: qibla ? qibla - heading : 0 }}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              >
                <div className="relative h-full w-1.5 flex flex-col items-center">
                  <div className="w-6 h-6 bg-emerald-600 rotate-45 -mt-3 rounded-sm shadow-lg" />
                  <div className="w-1 h-32 bg-emerald-600 rounded-full shadow-sm" />
                  <div className="absolute top-8 bg-white rounded-full p-1 shadow-xl border-2 border-emerald-100 scale-110">
                    <img src="https://cdn-icons-png.flaticon.com/512/2972/2972143.png" alt="Kaaba" className="w-8 h-8" />
                  </div>
                </div>
              </motion.div>

              {/* Center Point */}
              <div className="w-3 h-3 bg-white rounded-full border-[3px] border-emerald-600 z-20 shadow-sm" />
            </div>

            <div className="text-center bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-4xl font-black text-emerald-600 tracking-tighter">{qibla?.toFixed(1)}°</p>
              <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-black mt-0.5">Qibla Direction</p>
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
