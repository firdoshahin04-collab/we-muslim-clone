import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Layout from './components/Layout';
import Home from './components/Home';
import Quran from './components/Quran';
import SurahView from './components/SurahView';
import ParaMeanings from './components/ParaMeanings';
import Qibla from './components/Qibla';
import Nearby from './components/Nearby';
import Tasbih from './components/Tasbih';
import Settings from './components/Settings';
import { PrayerProvider } from './components/PrayerProvider';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/quran" element={<PageWrapper><Quran /></PageWrapper>} />
        <Route path="/quran/:number" element={<PageWrapper><SurahView /></PageWrapper>} />
        <Route path="/para" element={<PageWrapper><ParaMeanings /></PageWrapper>} />
        <Route path="/qibla" element={<PageWrapper><Qibla /></PageWrapper>} />
        <Route path="/tasbih" element={<PageWrapper><Tasbih /></PageWrapper>} />
        <Route path="/nearby" element={<PageWrapper><Nearby /></PageWrapper>} />
        <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <PrayerProvider>
      <BrowserRouter>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </BrowserRouter>
    </PrayerProvider>
  );
}
