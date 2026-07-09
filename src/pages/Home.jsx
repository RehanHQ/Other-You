import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Orbit } from 'lucide-react';
import InputForm from '../components/InputForm';
import ThemeToggle from '../components/ThemeToggle';
import History from '../components/History';
import { generateUniverses } from '../services/api';
import { saveToHistory } from '../utils/history';

function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-glow-purple"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGenerate = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const count = userData.premium ? 10 : 5;
      const result = await generateUniverses(userData, count);
      sessionStorage.setItem('universes', JSON.stringify(result.universes));
      sessionStorage.setItem('userData', JSON.stringify(userData));
      saveToHistory(userData, result.universes);
      navigate('/results');
    } catch (err) {
      console.error(err);
      setError('Multiverse instability detected. Unable to access nearby realities.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLoadHistory = useCallback((userData, universes) => {
    sessionStorage.setItem('universes', JSON.stringify(universes));
    sessionStorage.setItem('userData', JSON.stringify(userData));
    navigate('/results');
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative flex flex-col"
    >
      <ParticleField />

      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-glow-purple to-glow-blue flex items-center justify-center">
            <Orbit size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">OtherYou</span>
        </div>
        <div className="flex items-center gap-2">
          <History onLoad={handleLoadHistory} />
          <ThemeToggle />
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="text-center mb-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              <span className="gradient-text">Meet the versions</span>
              <br />
              <span>of yourself that</span>
              <br />
              <span className="opacity-70">never existed.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg opacity-40 font-light"
          >
            Every choice creates a different story.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-2xl"
        >
          <div className="glass-card p-8">
            <InputForm onSubmit={handleGenerate} isLoading={isLoading} />

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center"
              >
                <p className="text-red-400 text-sm mb-3">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="btn-secondary text-sm"
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex items-center gap-2 opacity-20 text-sm"
        >
          <Sparkles size={14} />
          <span>Powered by AI • 5 or 10 unique universes generated</span>
        </motion.div>
      </main>
    </motion.div>
  );
}
