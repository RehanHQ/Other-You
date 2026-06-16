import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useState, useRef } from 'react';
import { Download, Share2 } from 'lucide-react';

export default function PassportCard({ universe, index }) {
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef(null);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#12122a',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `other-you-passport-${index + 1}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    }
    setDownloading(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-6 w-full max-w-sm gradient-border"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs uppercase tracking-widest text-glow-purple/60 font-semibold">OtherYou Passport</div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-glow-purple to-glow-blue flex items-center justify-center text-white text-xs font-bold">
          {index + 1}
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-1">{universe.title}</h3>

      <div className="space-y-2 mt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-white/30">Career</span>
          <span className="text-white/80 text-right">{universe.career}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/30">Location</span>
          <span className="text-white/80 text-right">{universe.location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/30">Achievement</span>
          <span className="text-white/80 text-right max-w-[60%]">{universe.achievement}</span>
        </div>
      </div>

      {universe.decision_point && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-glow-purple/60 uppercase tracking-wider mb-1">Turning Point</p>
          <p className="text-sm text-white/60 italic">"{universe.decision_point}"</p>
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 text-sm transition-all"
        >
          <Download size={14} />
          {downloading ? 'Saving...' : 'Download'}
        </button>
      </div>
    </motion.div>
  );
}
