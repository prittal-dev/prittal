import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Mail } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function NotFoundPage({
  onNavigateHome,
  onExploreWork,
  onNavigate,
  onOpenContact,
  onReplayIntro,
  isDark,
  onToggleTheme
}) {
  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-[#00afc8] selection:text-white font-montserrat relative transition-colors duration-300 ${
      isDark ? 'bg-[#05070a] text-[#fff6f1]' : 'bg-[#F8F8F6] text-[#003E4D]'
    }`}>
      {/* Existing Navbar */}
      <Navbar
        onOpenContact={onOpenContact}
        onReplayIntro={onReplayIntro}
        onNavigate={onNavigate}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />

      {/* Main 404 Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center relative overflow-hidden pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* Background Grid & Ambient Glow */}
        <div className="absolute inset-0 bg-grid-light opacity-10 pointer-events-none" />
        <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[#00afc8]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl w-full mx-auto text-center relative z-10 flex flex-col items-center">

          {/* Central 404 Composition */}
          <div className="relative flex items-center justify-center mb-4 select-none w-full">
            
            {/* Oversized Expressive 404 Number */}
            <motion.h1
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-outfit font-extrabold text-[120px] sm:text-[180px] md:text-[230px] lg:text-[270px] leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#00A9B9] via-[#00707c] to-[#003E4D] dark:from-[#00afc8] dark:via-[#e0f7fa] dark:to-white drop-shadow-[0_15px_35px_rgba(0,175,200,0.25)]"
            >
              404
            </motion.h1>
          </div>

          {/* Supporting Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl text-center space-y-3"
          >
            <h2 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#003E4D] dark:text-white">
              Sorry, the page you were looking for could not be found.
            </h2>
          </motion.div>

          {/* Assistance Query Divider Line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-3 sm:gap-4 my-8 w-full max-w-2xl px-2"
          >
            <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#00afc8]/50 to-[#00afc8]" />
            <span className="text-xs sm:text-sm font-montserrat font-bold text-[#00afc8] italic text-center leading-snug">
              For any assistance or query, you can reach us through
            </span>
            <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#00afc8]/50 to-[#00afc8]" />
          </motion.div>

          {/* 2 Buttons / Cards: Back To Home & Email Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl"
          >
            {/* 1st Button: Back to Home */}
            <button
              onClick={() => onNavigateHome ? onNavigateHome() : onNavigate('/')}
              className="group p-5 rounded-2xl bg-[#00A9B9] hover:bg-[#003E4D] dark:hover:bg-[#008f9d] text-white transition-all duration-300 shadow-xl shadow-[#00A9B9]/20 flex items-center gap-4 text-left cursor-pointer border border-[#00A9B9]"
            >
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-montserrat font-extrabold text-sm uppercase tracking-wider text-white flex items-center gap-1.5">
                  <span>Back to Home</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-white/80 font-normal mt-0.5">Return to homepage</p>
              </div>
            </button>

            {/* 2nd Button: Email Us */}
            <a
              href="mailto:sales@prittal.com"
              className={`group p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-lg flex items-center gap-4 text-left cursor-pointer backdrop-blur-md ${
                isDark
                  ? 'bg-[#0c1017] border-white/15 hover:border-[#00afc8] text-white'
                  : 'bg-white border-black/10 hover:border-[#00afc8] text-[#003E4D]'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#00afc8]/15 text-[#00afc8] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#00afc8] group-hover:text-white transition-all">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className={`font-montserrat font-extrabold text-sm uppercase tracking-wider group-hover:text-[#00afc8] transition-colors flex items-center gap-1.5 ${
                  isDark ? 'text-white' : 'text-[#003E4D]'
                }`}>
                  <span>Email Us</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00afc8]" />
                </h3>
                <p className={`text-xs font-normal mt-0.5 ${
                  isDark ? 'text-slate-300' : 'text-[#003E4D]/70'
                }`}>
                  sales@prittal.com
                </p>
              </div>
            </a>
          </motion.div>

        </div>
      </main>

      {/* Existing Footer */}
      <Footer
        onOpenContact={onOpenContact}
        onReplayIntro={onReplayIntro}
        onNavigate={onNavigate}
      />
    </div>
  );
}
