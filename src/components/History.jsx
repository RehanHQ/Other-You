import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trash2, Eye, X, User, Briefcase } from 'lucide-react';
import { getHistory, removeFromHistory, clearHistory } from '../utils/history';

export default function History({ onLoad }) {
  const [history, setHistory] = useState(getHistory);
  const [open, setOpen] = useState(false);

  const handleLoad = (entry) => {
    onLoad(entry.userData, entry.universes);
    setOpen(false);
  };

  const handleRemove = (id) => {
    setHistory(removeFromHistory(id));
  };

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  if (history.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white/70 hover:bg-white/8 transition-all text-sm"
      >
        <Clock size={14} />
        History ({history.length})
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card w-full max-w-lg max-h-[80vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Past Universes</h3>
                <div className="flex items-center gap-2">
                  {history.length > 0 && (
                    <button
                      onClick={handleClear}
                      className="text-xs text-red-400/60 hover:text-red-400 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/10 text-white/40"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[60vh] p-5 space-y-3">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="glass-card p-4 flex items-center justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <User size={12} className="text-glow-purple" />
                        <span className="font-medium">{entry.userData.name}</span>
                        <span className="text-white/30">•</span>
                        <Briefcase size={12} className="text-white/30" />
                        <span className="text-white/50 truncate">{entry.userData.currentRole}</span>
                      </div>
                      <p className="text-xs text-white/30 mt-1">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                        {' • '}
                        {entry.universes.length} universes
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                      <button
                        onClick={() => handleLoad(entry)}
                        className="p-2 rounded-lg bg-glow-purple/20 text-glow-purple hover:bg-glow-purple/30 transition-all"
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => handleRemove(entry.id)}
                        className="p-2 rounded-lg bg-white/5 text-white/30 hover:bg-red-500/20 hover:text-red-400 transition-all"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
