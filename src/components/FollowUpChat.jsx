import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';

export default function FollowUpChat({ universe, index }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `You are OtherYou, an AI multiverse storyteller. Answer this follow-up question about Universe #${index + 1} (${universe.title}) in 2-3 sentences. Be warm, insightful, and slightly poetic. Keep it concise.

Context about this universe:
- Career: ${universe.career}
- Location: ${universe.location}
- Achievement: ${universe.achievement}
- Life event: ${universe.life_event}
- Regret: ${universe.regret}
- Decision point: ${universe.decision_point}
- Personality shift: ${universe.personality_shift}

Question: ${input.trim()}

Return ONLY a plain text response. No JSON, no markdown.`,
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || data.error || "The multiverse is silent on this matter...";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Multiverse interference detected. Try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg bg-white/5 hover:bg-glow-purple/20 text-white/40 hover:text-glow-purple transition-all"
        title="Ask about this universe"
      >
        <MessageCircle size={14} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] glass-card overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-glow-purple/20 to-glow-blue/20">
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className="text-glow-purple" />
                <div>
                  <p className="text-sm font-semibold text-white">Universe #{index + 1}</p>
                  <p className="text-xs text-white/40">{universe.title}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
                <X size={16} />
              </button>
            </div>

            <div className="h-[280px] overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-white/20 text-sm mt-8">
                  <p>Ask anything about this universe.</p>
                  <p className="text-xs mt-1">e.g. "What's my relationship like here?"</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-glow-purple/30 text-white'
                        : 'bg-white/5 text-white/70'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 px-3 py-2 rounded-xl">
                    <Loader2 size={14} className="text-glow-purple animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about this universe..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-glow-purple/50"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="p-2 rounded-lg bg-glow-purple/20 text-glow-purple hover:bg-glow-purple/30 disabled:opacity-30 transition-all"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
