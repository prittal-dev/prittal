import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const BottomCTA = ({ onStartConversation }) => {
  return (
    <section className="py-28 sm:py-36 bg-slate-900 dark:bg-black text-white relative overflow-hidden border-t border-slate-800">
      {/* Background Animated Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-prittal-cyan/15 blur-[140px] rounded-full pointer-events-none animate-glow-pulse"></div>

      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Have a requirement that doesn't fit a standard package?
          </h2>

          <p className="text-xl sm:text-2xl font-bold text-prittal-cyan tracking-wide">
            Build Your Custom Package
          </p>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            We partner with ambitious brands to design custom digital retainers, multi-channel marketing campaigns, and specialized web ecosystems.
          </p>

          <div className="pt-6">
            <button
              onClick={onStartConversation}
              className="inline-flex items-center space-x-3 px-9 py-4 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-prittal-cyan text-slate-950 hover:bg-white hover:text-prittal-navy transition-all duration-300 shadow-2xl transform hover:scale-105 group"
            >
              <span>START A CONVERSATION</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
