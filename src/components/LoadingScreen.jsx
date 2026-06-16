import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const messages = [
  'Calculating alternate timelines...',
  'Exploring branching decisions...',
  'Simulating unexpected opportunities...',
  'Finding roads not taken...',
  'Recovering parallel memories...',
  'Searching nearby universes...',
  'Mapping divergent paths...',
  'Aligning quantum probabilities...',
  'Peering into adjacent realities...',
  'Decoding life trajectories...',
];

function Particle({ delay, size, x, y, color }) {
  return (
    <motion.div
      className="particle"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: color,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1.5, 0],
        y: [0, -100, -200],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  const particles = useMemo(() => {
    const colors = ['#a855f7', '#3b82f6', '#ec4899', '#06b6d4'];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      size: Math.random() * 6 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cosmic-900"
    >
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(p => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="relative w-24 h-24"
        >
          <div className="absolute inset-0 rounded-full border-2 border-glow-purple/30" />
          <div className="absolute inset-1 rounded-full border-2 border-t-glow-blue border-r-transparent border-b-transparent border-l-transparent" />
          <div className="absolute inset-3 rounded-full border-2 border-t-transparent border-r-glow-pink border-b-transparent border-l-transparent" />
          <div className="absolute inset-5 rounded-full border-2 border-t-transparent border-r-transparent border-b-glow-cyan border-l-transparent" />
          <div className="absolute inset-7 rounded-full bg-gradient-to-br from-glow-purple to-glow-blue opacity-40 blur-sm" />
        </motion.div>

        <div className="text-center">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xl text-white/70 font-light tracking-wide"
          >
            {messages[messageIndex]}
          </motion.p>
        </div>

        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-glow-purple"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
