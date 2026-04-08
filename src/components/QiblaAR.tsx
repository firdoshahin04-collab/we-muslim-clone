import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Camera, Info, ChevronLeft, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { MotionService, calculateQibla } from '../services/motionService';
import * as THREE from 'three';

function KaabaModel({ rotation }: { rotation: number }) {
  // Simple box representation of Kaaba if GLTF fails, or just a placeholder
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh rotation={[0, rotation * (Math.PI / 180), 0]}>
        <boxGeometry args={[1, 1.2, 1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
        {/* Gold band */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.01, 0.1, 1.01]} />
          <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.5} />
        </mesh>
      </mesh>
    </Float>
  );
}

export default function QiblaAR() {
  const navigate = useNavigate();
  const [heading, setHeading] = useState(0);
  const [qiblaAngle, setQiblaAngle] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isAR, setIsAR] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocation({ lat, lng });
        setQiblaAngle(calculateQibla(lat, lng));
      },
      (err) => console.error(err)
    );

    const motionService = MotionService.getInstance();
    const handleMotion = (data: any) => {
      setHeading(data.alpha);
    };

    motionService.startListening(handleMotion);
    return () => motionService.stopListening(handleMotion);
  }, []);

  const handleStart = async () => {
    const granted = await MotionService.getInstance().requestPermission();
    setPermissionGranted(granted);
  };

  const relativeAngle = (qiblaAngle - heading + 360) % 360;
  const isPointed = Math.abs(relativeAngle) < 10 || Math.abs(relativeAngle - 360) < 10;

  return (
    <div className="fixed inset-0 bg-slate-950 text-white overflow-hidden flex flex-col">
      {isAR && (
        <div className="absolute inset-0 z-0">
          <Webcam 
            audio={false}
            className="w-full h-full object-cover opacity-60"
            videoConstraints={{ facingMode: "environment" }}
          />
        </div>
      )}

      <header className="relative z-10 p-6 flex items-center justify-between bg-gradient-to-b from-slate-950 to-transparent">
        <button onClick={() => navigate(-1)} className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-black tracking-tight">Qibla Finder</h1>
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">AR Integration</p>
        </div>
        <button onClick={() => setIsAR(!isAR)} className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
          {isAR ? <Compass size={24} /> : <Camera size={24} />}
        </button>
      </header>

      <div className="flex-1 relative z-10 flex flex-col items-center justify-center p-8">
        {!permissionGranted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 max-w-xs"
          >
            <div className="w-24 h-24 bg-emerald-500/20 rounded-[32px] flex items-center justify-center mx-auto mb-8">
              <Compass size={48} className="text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black tracking-tight">Sensor Access</h2>
            <p className="text-slate-400 text-sm leading-relaxed">We need access to your compass and motion sensors to find the Qibla direction accurately.</p>
            <button 
              onClick={handleStart}
              className="w-full py-5 bg-emerald-600 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-900/20"
            >
              Grant Permission
            </button>
          </motion.div>
        ) : (
          <>
            <div className="relative w-full aspect-square max-w-[400px]">
              {/* 3D View */}
              <div className="absolute inset-0">
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <KaabaModel rotation={-relativeAngle} />
                  <Environment preset="city" />
                </Canvas>
              </div>

              {/* Compass Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="45" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth="0.5" 
                />
                <motion.path
                  d="M 50 5 A 45 45 0 0 1 95 50"
                  fill="none"
                  stroke={isPointed ? "#10b981" : "#334155"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ rotate: relativeAngle }}
                  style={{ transformOrigin: '50px 50px' }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div 
                  animate={{ 
                    scale: isPointed ? [1, 1.1, 1] : 1,
                    opacity: isPointed ? 1 : 0.5
                  }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className={cn(
                    "text-6xl font-black tracking-tighter",
                    isPointed ? "text-emerald-400" : "text-white"
                  )}
                >
                  {Math.round(heading)}°
                </motion.div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mt-2">Heading</p>
              </div>
            </div>

            <div className="mt-12 text-center space-y-4">
              <div className="flex items-center gap-2 justify-center">
                <MapPin size={14} className="text-emerald-400" />
                <p className="text-xs font-bold text-slate-400">
                  {location ? `${location.lat.toFixed(4)}°N, ${location.lng.toFixed(4)}°E` : 'Locating...'}
                </p>
              </div>
              <h3 className="text-xl font-black tracking-tight">
                {isPointed ? "You are facing the Kaaba" : "Rotate to find Qibla"}
              </h3>
              <p className="text-sm text-slate-500 max-w-xs">The Kaaba is at {Math.round(qiblaAngle)}° from your location.</p>
            </div>
          </>
        )}
      </div>

      <footer className="p-8 bg-slate-900/50 backdrop-blur-xl border-t border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
            <Info size={24} className="text-emerald-400" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Keep your phone away from metal objects and electronic devices for better accuracy.
          </p>
        </div>
      </footer>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
