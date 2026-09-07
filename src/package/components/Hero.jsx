import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const Hero = () => {
  const { isDark } = useTheme();

  return (
    <section id="hero" className={`relative pt-32 pb-16 md:pt-40 md:pb-24 ${isDark ? 'bg-black text-white' : 'bg-white text-slate-900'} overflow-hidden transition-colors`}>
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 text-center relative z-10">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.15] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Solutions Built Around <br className="hidden sm:inline" />
          <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
            isDark
              ? 'from-white via-cyan-200 to-[#11b1d0]'
              : 'from-slate-900 via-slate-800 to-[#11b1d0]'
          }`}>
            Your Goals.
          </span>
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-medium leading-relaxed mb-10 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Explore our digital marketing, website, SEO, social media, paid campaign, product shoot and Google Business packages.
        </motion.p>
      </div>
    </section>
  );
};
