import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <PrayerProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quran" element={<Quran />} />
            <Route path="/quran/:number" element={<SurahView />} />
            <Route path="/para" element={<ParaMeanings />} />
            <Route path="/qibla" element={<Qibla />} />
            <Route path="/tasbih" element={<Tasbih />} />
            <Route path="/nearby" element={<Nearby />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </PrayerProvider>
  );
}
