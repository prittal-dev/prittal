import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageSquare, PhoneCall } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import { updateSEOTags } from '../utils/seo';

export default function ThankYouPage({ 
  onNavigateHome, 
  onNavigate, 
  onOpenContact,
  onReplayIntro,
  isDark, 
  onToggleTheme 
}) {
  useEffect(() => {
    // Update SEO tags for Thank You page
    updateSEOTags({
      title: 'THANK YOU — Message Received | Prittal Creative Agency',
      description: "We've received your message. Your message is in. We'll be in touch soon.",
      path: '/thank-you',
      noIndex: true
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  // Framer Motion Stagger Variants for Sequential Revealing Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  const headingLettersVariants = {
    hidden: { opacity: 0, y: 35, rotateX: 30 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut", delay: 0.3 }
    }
  };

  const circleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.15 }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-[#00afc8] selection:text-[#fff6f1] font-montserrat relative transition-colors duration-300 ${
      isDark ? 'bg-black text-[#fff6f1]' : 'bg-[#F8F8F6] text-[#003E4D]'
    }`}>
      {/* Navbar Header */}
      <Navbar
        onOpenContact={onOpenContact}
        onReplayIntro={onReplayIntro}
        onNavigate={onNavigate}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />

      {/* Main Content Body with Sequential Animation */}
      <main className="flex-1 flex flex-col items-center justify-center pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center relative z-10">
        
        {/* Stylish Large Background Checkmark Watermark & Cyan Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center">
          {/* Glowing Backlight */}
          <div className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-[#00afc8]/15 rounded-full filter blur-[100px] absolute" />

          {/* Large Stylish Background Checkmark Emblem */}
          <motion.svg
            initial={{ opacity: 0, scale: 0.75, rotate: -10 }}
            animate={{ opacity: isDark ? 0.22 : 0.15, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] text-[#00afc8] relative z-10"
            viewBox="0 0 50 50"
            fill="none"
          >
            {/* Outer Rotating Dashed Ring */}
            <circle
              cx="25"
              cy="25"
              r="22"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              className="animate-spin-slow origin-center"
            />
            {/* Inner Solid Ring */}
            <circle
              cx="25"
              cy="25"
              r="18"
              stroke="currentColor"
              strokeWidth="1"
            />
            {/* Animated Checkmark Path */}
            <motion.path
              variants={checkmarkVariants}
              initial="hidden"
              animate="visible"
              d="M16 25L22 31L34 18"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full space-y-8 relative z-10"
        >

          {/* Main Visual Focus: "THANK YOU." with Confident Reveal */}
          <motion.div variants={headingLettersVariants} className="relative">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-outfit tracking-tighter uppercase leading-none select-none">
              THANK <span className="text-[#00afc8]">YOU.</span>
            </h1>
          </motion.div>

          {/* 4. Supporting Messages */}
          <motion.div variants={itemVariants} className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black font-montserrat tracking-tight leading-snug">
              We've received your message.
            </h2>
            <p className={`text-sm sm:text-base font-light leading-relaxed tracking-wide ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Your message is in. We'll be in touch soon.
            </p>
          </motion.div>

          {/* Subtle Thin Divider */}
          <motion.div variants={itemVariants} className="pt-2">
            <div className="h-[1px] w-24 sm:w-32 bg-white/10 dark:bg-white/10 mx-auto" />
          </motion.div>

          {/* 5. CTA Buttons (Reusing Existing PRITTAL Button Design System) */}
          <motion.div variants={itemVariants} className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
            {/* Primary CTA: BACK TO HOME */}
            <button
              onClick={() => onNavigate ? onNavigate('/') : onNavigateHome()}
              className="w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#00afc8] hover:bg-[#003E4D] text-white font-montserrat font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>BACK TO HOME</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Secondary CTA: EXPLORE OUR WORK */}
            <button
              onClick={() => onNavigate ? onNavigate('/portfolio') : onNavigateHome()}
              className={`w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full font-montserrat font-extrabold text-xs uppercase tracking-widest transition-all border cursor-pointer flex items-center justify-center gap-2 group ${
                isDark 
                  ? 'bg-slate-900/80 hover:bg-white/10 text-white border-white/20 hover:border-white/40' 
                  : 'bg-white hover:bg-slate-100 text-[#003E4D] border-slate-300 hover:border-slate-400'
              }`}
            >
              <span>EXPLORE OUR WORK</span>
              <ArrowUpRight className="w-4 h-4 text-[#00afc8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* Direct Urgent Connect Quick Links */}
          <motion.div variants={itemVariants} className="pt-8 text-xs font-montserrat">
            <p className="text-slate-400 font-light text-[11px] mb-2.5">
              Need immediate assistance with a tight deadline?
            </p>
            <div className="flex items-center justify-center gap-4 text-xs font-bold">
              <a
                href="https://wa.me/919910992774?text=Hi%20Prittal%20Team%2C%20I%20just%20submitted%20a%20form%20on%20your%20website%20and%20would%20like%20an%20update."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00afc8] hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
              <span className="text-slate-500">•</span>
              <a
                href="tel:+919910992774"
                className={`hover:underline flex items-center gap-1.5 cursor-pointer ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#00afc8]" />
                <span>+91 99109 92774</span>
              </a>
            </div>
          </motion.div>

        </motion.div>
      </main>

      {/* Footer */}
      <Footer
        onOpenContact={onOpenContact}
        onReplayIntro={onReplayIntro}
        onNavigate={onNavigate}
      />

      {/* Floating WhatsApp Quick Contact Action */}
      <FloatingWhatsApp onOpenContact={onOpenContact} />
    </div>
  );
}
