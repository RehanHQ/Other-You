import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompareArrows, X, Check } from 'lucide-react';

export default function CompareMode({ universes }) {
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState(false);

  const toggleSelect = (index) => {
    setSelected(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : prev.length < 2 ? [...prev, index] : [prev[1], index]
    );
  };

  const a = selected[0] !== undefined ? universes[selected[0]] : null;
  const b = selected[1] !== undefined ? universes[selected[1]] : null;

  return (
    <>
      <button
        onClick={() => { setActive(!active); setSelected([]); }}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
          active
            ? 'bg-glow-purple/20 border border-glow-purple/30 text-glow-purple'
            : 'bg-white/5 border border-white/10 text-white/50 hover:text-white/70'
        }`}
      >
        <GitCompareArrows size={14} />
        {active ? `Comparing (${selected.length}/2)` : 'Compare'}
      </button>

      <AnimatePresence>
        {active && a && b && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full overflow-hidden mb-6"
          >
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Side by Side</h3>
                <button onClick={() => setSelected([])} className="text-white/30 hover:text-white/60">
                  <X size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[a, b].map((u, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/5 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-glow-purple to-glow-blue flex items-center justify-center text-xs font-bold">
                        {selected[idx] + 1}
                      </div>
                      <h4 className="font-semibold text-white text-sm">{u.title}</h4>
                    </div>
                    {[
                      ['Career', u.career],
                      ['Location', u.location],
                      ['Achievement', u.achievement],
                      ['Regret', u.regret],
                      ['Similarity', `${u.similarity_score}%`],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs text-white/30 uppercase">{label}</p>
                        <p className="text-sm text-white/70">{value}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {active && (
        <div className="flex flex-wrap gap-2 mb-4">
          {universes.map((u, i) => (
            <button
              key={i}
              onClick={() => toggleSelect(i)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selected.includes(i)
                  ? 'bg-glow-purple text-white'
                  : 'bg-white/5 text-white/40 border border-white/10 hover:bg-white/10'
              }`}
            >
              {selected.includes(i) && <Check size={12} />}
              #{i + 1} {u.title}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
