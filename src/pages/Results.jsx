import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Orbit, ArrowLeft, Sparkles, Grid, List } from 'lucide-react';
import UniverseCard from '../components/UniverseCard';
import Compass from '../components/Compass';
import PassportCard from '../components/PassportCard';
import CompareMode from '../components/CompareMode';
import ThemeToggle from '../components/ThemeToggle';
import LoadingScreen from '../components/LoadingScreen';

export default function Results() {
  const [universes, setUniverses] = useState([]);
  const [view, setView] = useState('cards');
  const [showPassports, setShowPassports] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('universes');
    if (stored) {
      try {
        setUniverses(JSON.parse(stored));
      } catch {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (universes.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-cosmic-900/70 border-b border-white/5">
        <div className="flex items-center justify-between px-6 md:px-12 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all opacity-50 hover:opacity-100"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-glow-purple to-glow-blue flex items-center justify-center">
                <Orbit size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">OtherYou</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setView('cards')}
              className={`p-2 rounded-lg transition-all ${view === 'cards' ? 'bg-glow-purple/20 text-glow-purple' : 'bg-white/5 opacity-40 hover:opacity-60'}`}
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-glow-purple/20 text-glow-purple' : 'bg-white/5 opacity-40 hover:opacity-60'}`}
            >
              <Grid size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="px-6 md:px-12 py-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Your Parallel Lives
          </h1>
          <p className="opacity-40">
            {universes.length} alternate realities discovered
          </p>
        </motion.div>

        <Compass universes={universes} />

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mr-auto">
            <Sparkles size={18} className="text-glow-purple" />
            Universe Explorer
          </h2>
          <CompareMode universes={universes} />
          <button
            onClick={() => setShowPassports(!showPassports)}
            className="btn-secondary text-sm"
          >
            {showPassports ? 'Card View' : 'Passport View'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {showPassports ? (
            <motion.div
              key="passports"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {universes.map((u, i) => (
                <PassportCard key={u.universe_id || i} universe={u} index={i} />
              ))}
            </motion.div>
          ) : view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {universes.map((u, i) => (
                <UniverseCard key={u.universe_id || i} universe={u} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 max-w-2xl mx-auto"
            >
              {universes.map((u, i) => (
                <UniverseCard key={u.universe_id || i} universe={u} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Sparkles size={18} />
            Generate New Universes
          </button>
        </motion.div>
      </main>
    </motion.div>
  );
}
