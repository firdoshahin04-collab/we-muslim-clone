import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Heart, Trophy, ChevronLeft, Play, CheckCircle2, XCircle, Sparkles, Music, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { awardKarma } from '../lib/karma';

const ALPHABET = [
  { letter: 'ا', name: 'Alif', sound: 'https://www.islamcan.com/audio/alphabet/alif.mp3' },
  { letter: 'ب', name: 'Ba', sound: 'https://www.islamcan.com/audio/alphabet/ba.mp3' },
  { letter: 'ت', name: 'Ta', sound: 'https://www.islamcan.com/audio/alphabet/ta.mp3' },
  { letter: 'ث', name: 'Tha', sound: 'https://www.islamcan.com/audio/alphabet/tha.mp3' },
  { letter: 'ج', name: 'Jeem', sound: 'https://www.islamcan.com/audio/alphabet/jeem.mp3' },
  { letter: 'ح', name: 'Ha', sound: 'https://www.islamcan.com/audio/alphabet/ha.mp3' },
  { letter: 'خ', name: 'Kha', sound: 'https://www.islamcan.com/audio/alphabet/kha.mp3' },
];

export default function KidsSection() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [gameState, setGameState] = useState<'learning' | 'quiz' | 'complete'>('learning');
  const [quizOptions, setQuizOptions] = useState<any[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<any>(null);

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play().catch(e => console.error(e));
  };

  const startQuiz = () => {
    const current = ALPHABET[currentStep];
    const others = ALPHABET.filter(a => a.letter !== current.letter)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [current, ...others].sort(() => 0.5 - Math.random());
    setQuizOptions(options);
    setCorrectAnswer(current);
    setGameState('quiz');
  };

  const handleAnswer = (option: any) => {
    if (option.letter === correctAnswer.letter) {
      setScore(prev => prev + 10);
      setShowSuccess(true);
      playSound('https://www.soundjay.com/buttons/sounds/button-3.mp3');
      setTimeout(() => {
        setShowSuccess(false);
        if (currentStep < ALPHABET.length - 1) {
          setCurrentStep(prev => prev + 1);
          setGameState('learning');
        } else {
          setGameState('complete');
          awardKarma(50);
        }
      }, 1500);
    } else {
      setHearts(prev => Math.max(0, prev - 1));
      playSound('https://www.soundjay.com/buttons/sounds/button-10.mp3');
      if (hearts === 1) {
        alert("Oh no! Try again from the beginning.");
        reset();
      }
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setScore(0);
    setHearts(3);
    setGameState('learning');
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] pb-24 font-sans">
      {/* Header */}
      <header className="p-6 flex items-center justify-between bg-white border-b-4 border-blue-100 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-blue-50 text-blue-600 rounded-2xl">
            <ChevronLeft size={24} />
          </button>
          <div className="h-4 w-32 bg-blue-50 rounded-full overflow-hidden border-2 border-blue-100">
            <motion.div 
              className="h-full bg-blue-400"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / ALPHABET.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-rose-50 px-3 py-1 rounded-full border-2 border-rose-100 text-rose-500 font-black">
            <Heart size={16} fill="currentColor" />
            {hearts}
          </div>
          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border-2 border-amber-100 text-amber-500 font-black">
            <Star size={16} fill="currentColor" />
            {score}
          </div>
        </div>
      </header>

      <div className="p-8 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {gameState === 'learning' && (
            <motion.div 
              key="learning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center text-center gap-12"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-64 h-64 bg-white rounded-[60px] border-8 border-blue-200 shadow-2xl flex items-center justify-center text-[120px] font-arabic text-blue-600"
                >
                  {ALPHABET[currentStep].letter}
                </motion.div>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => playSound(ALPHABET[currentStep].sound)}
                  className="absolute -bottom-6 -right-6 w-20 h-20 bg-emerald-500 text-white rounded-full border-8 border-white shadow-xl flex items-center justify-center"
                >
                  <Music size={32} />
                </motion.button>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-black text-blue-900 tracking-tight">This is {ALPHABET[currentStep].name}</h2>
                <p className="text-blue-600/60 font-bold uppercase tracking-widest">Listen and remember!</p>
              </div>

              <button 
                onClick={startQuiz}
                className="w-full py-6 bg-blue-500 text-white rounded-[32px] font-black uppercase tracking-widest text-lg shadow-xl shadow-blue-200 hover:bg-blue-600 transition-all border-b-8 border-blue-700 active:border-b-0 active:translate-y-2"
              >
                I'm Ready!
              </button>
            </motion.div>
          )}

          {gameState === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col items-center gap-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-black text-blue-900 tracking-tight">Which one is {correctAnswer.name}?</h2>
                <button onClick={() => playSound(correctAnswer.sound)} className="text-blue-500 font-black uppercase tracking-widest flex items-center gap-2 mx-auto">
                  <Play size={16} fill="currentColor" /> Hear sound again
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 w-full">
                {quizOptions.map((option, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(option)}
                    className="aspect-square bg-white rounded-[40px] border-4 border-blue-100 shadow-lg flex items-center justify-center text-6xl font-arabic text-blue-800 hover:border-blue-400 transition-all"
                  >
                    {option.letter}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {gameState === 'complete' && (
            <motion.div 
              key="complete"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center gap-8"
            >
              <div className="w-48 h-48 bg-amber-100 rounded-full flex items-center justify-center relative">
                <Trophy size={80} className="text-amber-500" />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-amber-400 rounded-full"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-blue-900 tracking-tight">MashaAllah!</h2>
                <p className="text-blue-600 font-bold">You've learned the first few letters!</p>
              </div>
              <div className="bg-white p-6 rounded-[32px] border-4 border-blue-100 w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                    <Sparkles size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Bonus</p>
                    <p className="text-lg font-black text-slate-800">+50 Karma Points</p>
                  </div>
                </div>
                <CheckCircle2 size={32} className="text-emerald-500" />
              </div>
              <button 
                onClick={reset}
                className="w-full py-6 bg-emerald-500 text-white rounded-[32px] font-black uppercase tracking-widest text-lg shadow-xl shadow-emerald-200 border-b-8 border-emerald-700"
              >
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="bg-emerald-500 text-white p-12 rounded-[60px] shadow-2xl flex flex-col items-center gap-4">
              <CheckCircle2 size={80} />
              <p className="text-4xl font-black tracking-tighter">AMAZING!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character */}
      <div className="fixed bottom-24 right-8 w-32 h-32 pointer-events-none">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="relative"
        >
          <div className="w-24 h-24 bg-blue-400 rounded-[30px] border-4 border-white shadow-xl flex items-center justify-center text-4xl">
            😊
          </div>
          <div className="absolute -top-12 -left-12 bg-white p-4 rounded-3xl shadow-lg border-2 border-blue-100 text-xs font-bold text-blue-900 max-w-[120px]">
            {gameState === 'learning' ? "Look at this letter!" : "Which one is it?"}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
