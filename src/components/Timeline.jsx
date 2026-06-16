import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function Timeline({ milestones }) {
  if (!milestones || milestones.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Clock size={14} className="text-glow-blue/60" />
        <p className="text-xs text-white/30 uppercase tracking-wider font-semibold">Timeline</p>
      </div>
      <div className="relative pl-6">
        <div className="absolute left-2 top-1 bottom-1 w-px bg-gradient-to-b from-glow-purple via-glow-blue to-glow-cyan" />
        {milestones.map((milestone, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="relative mb-3 last:mb-0"
          >
            <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-glow-purple to-glow-blue border-2 border-cosmic-800" />
            <p className="text-sm text-white/60 leading-relaxed">{milestone}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
