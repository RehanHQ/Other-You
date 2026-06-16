import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function ButterflyEffect({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">🦋</span>
        <p className="text-xs text-white/30 uppercase tracking-wider font-semibold">The Butterfly Effect</p>
      </div>
      <div className="space-y-0">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.15 }}
            className="flex flex-col items-center"
          >
            <div className="w-full p-3 rounded-xl bg-white/5 border border-white/5 text-center">
              <p className="text-sm text-white/70">{step}</p>
            </div>
            {i < steps.length - 1 && (
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="my-1"
              >
                <ArrowDown size={16} className="text-glow-purple/50" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
