import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Award, Heart, Lightbulb, Users, ChevronDown, ChevronUp,
  Calendar, Share2, Download
} from 'lucide-react';
import html2canvas from 'html2canvas';
import ButterflyEffect from './ButterflyEffect';
import Timeline from './Timeline';

export default function UniverseCard({ universe, index }) {
  const [expanded, setExpanded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef(null);

  const similarity = universe.similarity_score || 0;

  const getSimilarityColor = (score) => {
    if (score >= 70) return 'from-green-500 to-emerald-400';
    if (score >= 40) return 'from-yellow-500 to-amber-400';
    return 'from-red-500 to-pink-400';
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#12122a',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `other-you-${universe.universe_id || index + 1}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloading(false);
  };

  const handleShare = async () => {
    const text = `🌌 OtherYou — Universe ${index + 1}: ${universe.title}\n💼 ${universe.career}\n📍 ${universe.location}\n🏆 ${universe.achievement}`;
    if (navigator.share) {
      await navigator.share({ title: `OtherYou - ${universe.title}`, text });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      <div
        ref={cardRef}
        className="glass-card glass-card-hover overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-glow-purple to-glow-blue flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{universe.title}</h3>
                <p className="text-sm text-white/50">Universe #{universe.universe_id || index + 1}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-white/50 hover:text-white"
                title="Share"
              >
                <Share2 size={16} />
              </button>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-white/50 hover:text-white"
                title="Download"
              >
                <Download size={16} className={downloading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <InfoRow icon={<Users size={16} />} label="Career" value={universe.career} />
            <InfoRow icon={<MapPin size={16} />} label="Location" value={universe.location} />
            <InfoRow icon={<Award size={16} />} label="Achievement" value={universe.achievement} />
            <InfoRow icon={<Heart size={16} />} label="Life Event" value={universe.life_event} />
            <InfoRow icon={<Lightbulb size={16} />} label="Unexpected Fact" value={universe.unexpected_fact} />
          </div>

          {universe.decision_point && (
            <motion.div
              className="mt-4 p-4 rounded-xl bg-gradient-to-r from-glow-purple/10 to-glow-blue/10 border border-glow-purple/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={14} className="text-glow-purple" />
                <span className="text-xs font-semibold uppercase tracking-wider text-glow-purple">The Decision Point</span>
              </div>
              <p className="text-white/80 text-sm italic">"{universe.decision_point}"</p>
            </motion.div>
          )}

          {universe.similarity_score !== undefined && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/40">Similarity to your current life</span>
                <span className="text-xs font-semibold text-white/70">{similarity}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${getSimilarityColor(similarity)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${similarity}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {expanded ? 'Show less' : 'Show more'}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-5">
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                  <p className="text-xs text-red-400/70 uppercase tracking-wider mb-1 font-semibold">Regret</p>
                  <p className="text-white/60 text-sm">{universe.regret}</p>
                </div>

                <div className="p-4 rounded-xl bg-glow-cyan/5 border border-glow-cyan/10">
                  <p className="text-xs text-glow-cyan/70 uppercase tracking-wider mb-1 font-semibold">Personality Shift</p>
                  <p className="text-white/60 text-sm">{universe.personality_shift}</p>
                </div>

                {universe.butterfly_effect && (
                  <ButterflyEffect steps={universe.butterfly_effect} />
                )}

                {universe.timeline && (
                  <Timeline milestones={universe.timeline} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-glow-purple/60 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-white/30 uppercase tracking-wider">{label}</p>
        <p className="text-white/80 text-sm">{value}</p>
      </div>
    </div>
  );
}
