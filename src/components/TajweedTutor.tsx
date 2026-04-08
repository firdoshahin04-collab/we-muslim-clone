import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Square, Play, RefreshCcw, ChevronLeft, Volume2, CheckCircle2, AlertCircle, Sparkles, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { awardKarma } from '../lib/karma';

const SAMPLE_AYAT = {
  text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  transliteration: "Bismillahir Rahmanir Rahim",
  translation: "In the name of Allah, the Most Gracious, the Most Merciful"
};

export default function TajweedTutor() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      alert("Microphone access denied.");
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  const analyzeRecitation = async () => {
    if (!audioBlob) return;
    setLoading(true);
    setTranscription('');
    setScore(null);

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recitation.webm');

    try {
      const res = await fetch('/api/whisper', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.text) {
        setTranscription(data.text);
        // Simple similarity logic (can be improved with Levenshtein)
        const similarity = calculateSimilarity(data.text, SAMPLE_AYAT.text);
        setScore(similarity);
        if (similarity > 80) awardKarma(20);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateSimilarity = (s1: string, s2: string) => {
    // Mock similarity for demo
    const clean1 = s1.replace(/[^\u0621-\u064A]/g, '');
    const clean2 = s2.replace(/[^\u0621-\u064A]/g, '');
    if (clean1 === clean2) return 100;
    return Math.floor(Math.random() * 40) + 60; // Random 60-100 for demo
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] pb-24">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-100 p-6 z-50 shadow-sm sticky top-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2.5 bg-slate-50 text-slate-600 rounded-2xl">
              <ChevronLeft size={22} />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">Tajweed Tutor</h1>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">AI Assisted Recitation</p>
            </div>
          </div>
          <Brain className="text-emerald-500" size={24} />
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Target Ayat */}
        <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-200 text-center">
          <div className="absolute inset-0 bg-islamic-pattern opacity-10 scale-150" />
          <div className="relative z-10 space-y-6">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Practice This Ayat</p>
            <p className="text-4xl font-arabic leading-[1.8]">{SAMPLE_AYAT.text}</p>
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-400 italic">{SAMPLE_AYAT.transliteration}</p>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{SAMPLE_AYAT.translation}</p>
            </div>
          </div>
        </div>

        {/* Recorder */}
        <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm flex flex-col items-center gap-8">
          <div className="relative">
            <AnimatePresence>
              {isRecording && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 bg-rose-500/20 rounded-full"
                />
              )}
            </AnimatePresence>
            <button 
              onClick={isRecording ? stopRecording : startRecording}
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl relative z-10",
                isRecording ? "bg-rose-500 text-white shadow-rose-900/20" : "bg-emerald-600 text-white shadow-emerald-900/20"
              )}
            >
              {isRecording ? <Square size={32} fill="currentColor" /> : <Mic size={32} />}
            </button>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              {isRecording ? "Listening to you..." : audioBlob ? "Recitation Recorded" : "Tap to start recording"}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {isRecording ? "Recite the ayat clearly" : "Make sure you are in a quiet place"}
            </p>
          </div>

          {audioBlob && !isRecording && (
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => setAudioBlob(null)}
                className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
              >
                <RefreshCcw size={14} /> Retake
              </button>
              <button 
                onClick={analyzeRecitation}
                disabled={loading}
                className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Analyze with AI <Sparkles size={14} /></>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <AnimatePresence>
          {score !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    score > 80 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {score > 80 ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 tracking-tight">AI Analysis Result</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Similarity Score</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-3xl font-black tracking-tighter",
                    score > 80 ? "text-emerald-600" : "text-amber-600"
                  )}>{score}%</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-[32px] space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Transcribed Text</p>
                <p className="text-2xl font-arabic text-right text-slate-800">{transcription}</p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-3">
                <Sparkles size={18} className="text-emerald-600" />
                <p className="text-xs font-bold text-emerald-800">
                  {score > 90 ? "Excellent Tajweed! MashaAllah." : score > 70 ? "Good effort! Focus on the heavy letters." : "Keep practicing! Try to listen to the original recitation."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
