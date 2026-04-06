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
    <div className="p-6 flex flex-col gap-8 items-center h-full bg-[#fcfcfd]">
      <header className="w-full">
        <h1 className="text-2xl font-bold text-slate-800">Qibla Direction</h1>
        <p className="text-slate-500">Accurate direction towards the Kaaba</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-16 w-full">
        {!permissionGranted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center flex flex-col items-center gap-8 bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm"
          >
            <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
              <Compass size={48} className="animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Compass Access</h2>
              <p className="text-slate-500 text-sm max-w-[240px] leading-relaxed">
                We need your device's compass to show the exact Qibla direction.
              </p>
            </div>
            <button 
              onClick={requestPermission}
              className="bg-emerald-600 text-white px-10 py-4 rounded-[24px] font-bold shadow-xl shadow-emerald-200 active:scale-95 transition-all w-full"
            >
              Enable Compass
            </button>
          </motion.div>
        ) : (
          <div className="relative flex flex-col items-center gap-12">
            <div className="relative w-72 h-72 flex items-center justify-center">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-[12px] border-white rounded-full shadow-xl" />
              <div className="absolute inset-0 border border-slate-100 rounded-full" />
              
              {/* Compass Markings */}
              <div className="absolute top-4 font-black text-slate-300 text-sm">N</div>
              <div className="absolute bottom-4 font-black text-slate-300 text-sm">S</div>
              <div className="absolute left-4 font-black text-slate-300 text-sm">W</div>
              <div className="absolute right-4 font-black text-slate-300 text-sm">E</div>

              {/* Rotating Compass Face */}
              <motion.div 
                className="absolute inset-8 border border-slate-50 rounded-full"
                animate={{ rotate: -heading }}
                transition={{ type: 'spring', stiffness: 40, damping: 20 }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-slate-200 rounded-full" />
              </motion.div>

              {/* Qibla Needle */}
              <motion.div 
                className="absolute w-full h-full flex items-center justify-center z-10"
                animate={{ rotate: qibla ? qibla - heading : 0 }}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
              >
                <div className="relative h-full w-2 flex flex-col items-center">
                  <div className="w-8 h-8 bg-emerald-600 rotate-45 -mt-4 rounded-sm shadow-lg" />
                  <div className="w-1.5 h-36 bg-emerald-600 rounded-full shadow-sm" />
                  <div className="absolute top-10 bg-white rounded-full p-1.5 shadow-xl border-2 border-emerald-100 scale-125">
                    <img src="https://cdn-icons-png.flaticon.com/512/2972/2972143.png" alt="Kaaba" className="w-10 h-10" />
                  </div>
                </div>
              </motion.div>

              {/* Center Point */}
              <div className="w-4 h-4 bg-white rounded-full border-4 border-emerald-600 z-20 shadow-sm" />
            </div>

            <div className="text-center bg-white px-8 py-4 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-5xl font-black text-emerald-600 tracking-tighter">{qibla?.toFixed(1)}°</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black mt-1">Qibla Direction</p>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm w-full max-w-sm">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Info size={18} className="text-emerald-600" />
            Accuracy Guide
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400">01</div>
              <p className="text-xs text-slate-500 leading-relaxed">Place your device on a flat surface or hold it level.</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400">02</div>
              <p className="text-xs text-slate-500 leading-relaxed">Move your phone in a figure-8 motion to calibrate.</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400">03</div>
              <p className="text-xs text-slate-500 leading-relaxed">Stay away from large metal objects or magnets.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
