import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './utils/ThemeContext';
import Home from './pages/Home';
import Results from './pages/Results';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-cosmic-900 dark:bg-cosmic-900 bg-white dark:text-white text-gray-900 cosmic-gradient relative transition-colors duration-300">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Router>
    </ThemeProvider>
  );
}
