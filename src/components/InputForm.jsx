import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User, Briefcase, MapPin, Target, Brain, Zap, RotateCcw } from 'lucide-react';
import { getRandomProfile } from '../utils/surpriseProfiles';

const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55+'];

export default function InputForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState({
    name: '',
    currentRole: '',
    ageRange: '',
    interests: [],
    currentCity: '',
    dreamJob: '',
    skills: '',
    biggestGoal: '',
  });

  const [interestInput, setInterestInput] = useState('');

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const addInterest = useCallback(() => {
    if (interestInput.trim() && form.interests.length < 5) {
      setForm(prev => ({
        ...prev,
        interests: [...prev.interests, interestInput.trim()],
      }));
      setInterestInput('');
    }
  }, [interestInput, form.interests.length]);

  const removeInterest = useCallback((index) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSurpriseMe = () => {
    const profile = getRandomProfile();
    setForm(profile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.currentRole || !form.ageRange) return;
    onSubmit(form);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-glow-purple/50 focus:bg-white/8 transition-all duration-300";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-5"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white/90">Tell us about yourself</h2>
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-glow-purple/20 border border-glow-purple/30 text-glow-purple text-sm font-medium hover:bg-glow-purple/30 transition-all"
        >
          <Sparkles size={14} />
          Surprise Me
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            className={`${inputClass} pl-10`}
            required
          />
        </div>

        <div className="relative">
          <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Current role (e.g., Software Engineer)"
            value={form.currentRole}
            onChange={e => handleChange('currentRole', e.target.value)}
            className={`${inputClass} pl-10`}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-white/50 mb-2">Age Range *</label>
        <div className="flex flex-wrap gap-2">
          {ageRanges.map(range => (
            <button
              key={range}
              type="button"
              onClick={() => handleChange('ageRange', range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                form.ageRange === range
                  ? 'bg-glow-purple text-white shadow-lg shadow-glow-purple/30'
                  : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-white/50 mb-2">Interests (max 5)</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add an interest..."
            value={interestInput}
            onChange={e => setInterestInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addInterest(); } }}
            className={`${inputClass} flex-1`}
          />
          <button
            type="button"
            onClick={addInterest}
            className="px-4 py-2 rounded-xl bg-white/10 text-white/70 hover:bg-white/15 transition-all"
          >
            <Zap size={18} />
          </button>
        </div>
        {form.interests.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {form.interests.map((interest, i) => (
              <span
                key={i}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-glow-purple/20 text-glow-purple text-sm border border-glow-purple/30"
              >
                {interest}
                <button type="button" onClick={() => removeInterest(i)} className="hover:text-white">×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Current city (optional)"
            value={form.currentCity}
            onChange={e => handleChange('currentCity', e.target.value)}
            className={`${inputClass} pl-10`}
          />
        </div>

        <div className="relative">
          <Target size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Dream job (optional)"
            value={form.dreamJob}
            onChange={e => handleChange('dreamJob', e.target.value)}
            className={`${inputClass} pl-10`}
          />
        </div>
      </div>

      <div className="relative">
        <Brain size={16} className="absolute left-4 top-4 text-white/30" />
        <textarea
          placeholder="Key skills (optional)"
          value={form.skills}
          onChange={e => handleChange('skills', e.target.value)}
          className={`${inputClass} pl-10 min-h-[60px]`}
          rows={1}
        />
      </div>

      <div className="relative">
        <Target size={16} className="absolute left-4 top-4 text-white/30" />
        <textarea
          placeholder="Your biggest goal (optional)"
          value={form.biggestGoal}
          onChange={e => handleChange('biggestGoal', e.target.value)}
          className={`${inputClass} pl-10 min-h-[60px]`}
          rows={1}
        />
      </div>

      <motion.button
        type="submit"
        disabled={isLoading || !form.name || !form.currentRole || !form.ageRange}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-primary disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <>
            <RotateCcw size={20} className="animate-spin" />
            Scanning Multiverse...
          </>
        ) : (
          <>
            <Sparkles size={20} />
            Generate Universes
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
