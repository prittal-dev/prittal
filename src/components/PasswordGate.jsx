import React, { useState } from 'react';
import { Lock, ArrowRight, Eye, EyeOff, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PasswordGate({ pageTitle, pageType, onAuthenticated, onGoHome }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim() === 'prittal@2026') {
      try {
        sessionStorage.setItem(`prittal_auth_${pageType}`, 'true');
      } catch (err) {}
      onAuthenticated();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070a] text-white p-4 select-none">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-grid-light opacity-10 pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] bg-[#00afc8]/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md bg-[#0c1017] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col items-center text-center"
      >
        {/* Lock Icon Header */}
        <div className="w-16 h-16 rounded-2xl bg-[#00afc8]/15 border border-[#00afc8]/30 flex items-center justify-center mb-6 text-[#00afc8] shadow-[0_0_25px_rgba(0,175,200,0.25)]">
          <Lock className="w-8 h-8" />
        </div>

        <h2 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Protected Access
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
          Please enter the password to view <span className="text-[#00afc8] font-semibold">{pageTitle}</span>.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Enter password..."
              autoFocus
              className={`w-full px-4 py-3.5 pl-11 pr-11 bg-white/5 border ${
                error ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/15 focus:border-[#00afc8]'
              } rounded-xl text-white placeholder-slate-500 font-montserrat text-sm outline-none transition-all duration-200`}
            />
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-xs font-medium text-left flex items-center gap-1.5"
            >
              ⚠️ Incorrect password. Please try again.
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-[#00afc8] hover:bg-[#009cb3] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#00afc8]/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Unlock Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <button
          type="button"
          onClick={onGoHome}
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-montserrat font-medium transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </button>
      </motion.div>
    </div>
  );
}
