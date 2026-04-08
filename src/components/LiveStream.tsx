import { useState } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize, Radio } from 'lucide-react';
import { cn } from '../lib/utils';

const STREAMS = [
  {
    id: 'makkah',
    name: 'Makkah Live',
    url: 'https://www.youtube.com/watch?v=M9v7GZ93X0o',
    thumbnail: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'madinah',
    name: 'Madinah Live',
    url: 'https://www.youtube.com/watch?v=0_u6c0_u6c0',
    thumbnail: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80'
  }
];

export default function LiveStream() {
  const [activeStream, setActiveStream] = useState(STREAMS[0]);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const Player = ReactPlayer as any;

  return (
    <div className="p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">Live Streams</h1>
        <p className="text-slate-500">Watch Makkah and Madinah live 24/7.</p>
      </div>

      {/* Video Player Container */}
      <div className="relative aspect-video bg-black rounded-[32px] overflow-hidden shadow-2xl group">
        <Player
          url={activeStream.url}
          playing={playing}
          muted={muted}
          width="100%"
          height="100%"
          playsinline
        />

        {/* Custom Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setPlaying(!playing)}
                className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
              >
                {playing ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button 
                onClick={() => setMuted(!muted)}
                className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
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

        {!playing && (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={() => setPlaying(true)}
          >
            <div className="w-20 h-20 bg-emerald-600/90 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-900/20">
              <Play size={40} className="ml-2" />
            </div>
          </div>
        )}
      </div>

      {/* Stream Selection */}
      <div className="grid grid-cols-2 gap-4">
        {STREAMS.map((stream) => (
          <button
            key={stream.id}
            onClick={() => {
              setActiveStream(stream);
              setPlaying(true);
            }}
            className={cn(
              "relative h-32 rounded-3xl overflow-hidden transition-all duration-500 group",
              activeStream.id === stream.id ? "ring-4 ring-emerald-500 ring-offset-4" : "opacity-70 hover:opacity-100"
            )}
          >
            <img 
              src={stream.thumbnail} 
              alt={stream.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-bold text-lg">{stream.name}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
        <p className="text-sm text-emerald-800 leading-relaxed">
          <strong>Note:</strong> Streams are provided by third-party services. If a stream is unavailable, please try again later. Mute is enabled by default.
        </p>
      </div>
    </div>
  );
}
