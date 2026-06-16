import { motion } from 'framer-motion';
import { Compass as CompassIcon, Sword, Crown, Feather, Leaf } from 'lucide-react';

const categories = [
  { key: 'adventurous', label: 'Most Adventurous', icon: <Sword size={18} />, gradient: 'from-orange-500 to-red-500' },
  { key: 'successful', label: 'Most Successful', icon: <Crown size={18} />, gradient: 'from-yellow-500 to-amber-500' },
  { key: 'peaceful', label: 'Most Peaceful', icon: <Leaf size={18} />, gradient: 'from-green-500 to-emerald-500' },
  { key: 'creative', label: 'Most Creative', icon: <Feather size={18} />, gradient: 'from-purple-500 to-pink-500' },
];

function analyzeUniverses(universes) {
  const results = {};

  const adventureKeywords = ['travel', 'adventure', 'risk', 'explore', 'abroad', 'mountain', 'ocean', 'expedition', 'journey', 'wander', 'nomad', 'survival'];
  const successKeywords = ['CEO', 'founder', 'million', 'billion', 'leadership', 'president', 'director', 'award', 'bestselling', 'profit', 'company'];
  const peaceKeywords = ['peace', 'calm', 'meditation', 'community', 'volunteer', 'garden', 'cottage', 'yoga', 'simple', 'nature', 'rural', 'quiet'];
  const creativeKeywords = ['art', 'music', 'design', 'write', 'film', 'create', 'studio', 'creative', 'paint', 'novel', 'album', 'invention'];

  const scoreKeywords = (universe, keywords) => {
    const text = `${universe.title} ${universe.career} ${universe.achievement} ${universe.life_event} ${universe.personality_shift} ${(universe.timeline || []).join(' ')}`.toLowerCase();
    return keywords.reduce((score, kw) => score + (text.includes(kw.toLowerCase()) ? 1 : 0), 0);
  };

  const scores = universes.map(u => ({
    universe: u,
    adventure: scoreKeywords(u, adventureKeywords),
    success: scoreKeywords(u, successKeywords),
    peace: scoreKeywords(u, peaceKeywords),
    creative: scoreKeywords(u, creativeKeywords),
  }));

  results.adventurous = scores.reduce((best, s) => s.adventure > best.adventure ? s : best).universe;
  results.successful = scores.reduce((best, s) => s.success > best.success ? s : best).universe;
  results.peaceful = scores.reduce((best, s) => s.peace > best.peace ? s : best).universe;
  results.creative = scores.reduce((best, s) => s.creative > best.creative ? s : best).universe;

  return results;
}

export default function Compass({ universes }) {
  if (!universes || universes.length === 0) return null;

  const analyzed = analyzeUniverses(universes);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto mb-10"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-glow-purple/20">
          <CompassIcon size={20} className="text-glow-purple" />
        </div>
        <h2 className="text-xl font-semibold text-white">Multiverse Compass</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((cat, i) => {
          const universe = analyzed[cat.key];
          if (!universe) return null;
          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-4 text-center"
            >
              <div className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${cat.gradient} mb-3`}>
                {cat.icon}
              </div>
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{cat.label}</p>
              <p className="text-sm font-medium text-white/80 line-clamp-2">{universe.title}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
