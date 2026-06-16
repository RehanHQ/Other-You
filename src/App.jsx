import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Results from './pages/Results';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cosmic-900 cosmic-gradient relative">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}
