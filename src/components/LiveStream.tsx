import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';
import { cn } from '../lib/utils';

const STREAMS = [
  {
    id: 'makkah',
    name: 'Makkah Live',
    // Ye latest active permanent-style links hain
    url: 'https://www.youtube.com/watch?v=x37VqwbKRys', 
    thumbnail: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'madinah',
    name: 'Madinah Live',
    url: 'https://www.youtube.com/watch?v=Xpk9X8Vf5_4',
    thumbnail: 'https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?auto=format&fit=crop&w=800&q=80'
  }
];

export default function LiveStream() {
  const [hasWindow, setHasWindow] = useState(false);
  const [activeStream, setActiveStream] = useState(STREAMS[0]);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const Player = ReactPlayer as any;

  // Hydration Error se bachne ke liye (Next.js compatibility)
  useEffect(() => {
    setHasWindow(true);
    return () => {
      setPlaying(false);
    };
  }, []);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  if (!hasWindow) return <div className="p-6 text-center">Loading Player...</div>;

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">Live Streams</h1>
        <p className="text-slate-500">Watch Makkah and Madinah live 24/7.</p>
      </div>

      {/* Main Player Container */}
      <div className="relative aspect-video bg-black rounded-[24px] overflow-hidden shadow-2xl group border-4 border-white">
        <Player
          url={activeStream.url}
          playing={playing}
          muted={muted}
          width="100%"
          height="100%"
          controls={false} // Custom controls use kar rahe hain
          onReady={() => setIsReady(true)}
          config={{
            youtube: {
              playerVars: { showinfo: 0, modestbranding: 1, rel: 0 }
            }
          }}
        />

        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={togglePlay}
                className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
              >
                {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              </button>
              <button 
                onClick={() => setMuted(!muted)}
                className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
              >
                {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-rose-600 rounded-full text-white text-xs font-bold animate-pulse">
              <Radio size={14} />
              <span>LIVE</span>
            </div>
          </div>
        </div>

        {/* Big Play Button when paused */}
        {!playing && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
            onClick={() => setPlaying(true)}
          >
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl">
              <Play size={32} className="ml-1" fill="currentColor" />
            </div>
          </div>
        )}
      </div>

      {/* Selection Cards */}
      <div className="grid grid-cols-2 gap-4">
        {STREAMS.map((stream) => (
          <button
            key={stream.id}
            onClick={() => {
              if (activeStream.id !== stream.id) {
                setPlaying(false);
                setIsReady(false);
                setTimeout(() => {
                  setActiveStream(stream);
                  setPlaying(true);
                }, 150);
              } else {
                setPlaying(true);
              }
            }}
            className={cn(
              "relative h-28 rounded-2xl overflow-hidden transition-all duration-300",
              activeStream.id === stream.id 
                ? "ring-4 ring-emerald-500 scale-[0.98]" 
                : "opacity-80 hover:opacity-100 hover:scale-[1.02]"
            )}
          >
            <img 
              src={stream.thumbnail} 
              alt={stream.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className={cn(
              "absolute inset-0 flex items-center justify-center font-bold text-white text-lg",
              activeStream.id === stream.id ? "bg-emerald-900/40" : "bg-black/40"
            )}>
              {stream.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}