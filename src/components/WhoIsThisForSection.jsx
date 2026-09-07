import React, { useState, useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { Rocket, Eye, TrendingUp, Zap, ArrowRight, ArrowUpRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import logoSage from '../../assets/sage.png';
import logoUae from '../../assets/uae.png';
import logoXseed from '../../assets/xseed.png';
import logoOxford from '../../assets/oxford.png';
import logoNokia from '../../assets/nokia.png';
import logoCambridge from '../../assets/cambridge.png';
import logoAptara from '../../assets/aptara.png';
import logoOyo from '../../assets/oyo.png';

function AnimatedStatNumber({ value, prefix = '', suffix = '' }) {
  const targetNumber = typeof value === 'number' ? value : (parseInt(value, 10) || 0);
  const [count, setCount] = useState(targetNumber);

  useEffect(() => {
    setCount(targetNumber);
  }, [targetNumber]);

  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function WhoIsThisForSection({ onOpenContact, onExploreWork }) {
  const brandStats = [
    { id: 'exp', value: 8, suffix: '+ Years', label: 'Industry Experience' },
    { id: 'proj', value: 5000, suffix: '+', label: 'Projects Delivered' },
    { id: 'client', value: 250, suffix: '+', label: 'Global Clients' },
    { id: 'rev', prefix: '₹', value: 50, suffix: 'Cr+', label: 'Client Revenue Generated' }
  ];

  const brandLogos = [
    { name: "APTARA", logo: logoAptara },
    { name: "NOKIA", logo: logoNokia },
    { name: "SAGE", logo: logoSage },
    { name: "XSEED", logo: logoXseed },
    { name: "OXFORD", logo: logoOxford },
    { name: "CAMBRIDGE", logo: logoCambridge },
    { name: "UAE", logo: logoUae },
    { name: "OYO", logo: logoOyo },
  ];

  const situationCards = [
    {
      id: "scratch",
      num: "01",
      icon: Rocket,
      badge: "FOUNDATION",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      title: "Starting from scratch",
      subtitle: "No brand yet? No problem. We build your identity, visuals, and market presence from the ground up.",
      highlights: ["Brand Identity & Guidelines", "Custom Web & App Portal", "Launch Strategy Blueprint"],
      ctaPrimary: "See Scope",
      ctaSecondary: "Get started"
    },
    {
      id: "visibility",
      num: "02",
      icon: Eye,
      badge: "VISIBILITY",
      badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      title: "Brand exists, but no one sees it",
      subtitle: "You have a business but the world doesn't know it. Time to build your digital presence the right way.",
      highlights: ["Brand Identity Refresh", "Organic Social Engine", "SEO & Search Dominance"],
      ctaPrimary: "See Scope",
      ctaSecondary: "Get started"
    },
    {
      id: "growth",
      num: "03",
      icon: TrendingUp,
      badge: "PERFORMANCE",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      title: "Ready to market & grow",
      subtitle: "Your brand is ready. Now let's put it in front of the right people with the right message.",
      highlights: ["High-ROAS Media Buying", "UGC Video Creatives", "Conversion Rate Funnels"],
      ctaPrimary: "See Scope",
      ctaSecondary: "Get started"
    },
    {
      id: "scale",
      num: "04",
      icon: Zap,
      badge: "EXPANSION",
      badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      title: "Scale to the next level",
      subtitle: "You're already growing. Let's 10x it with performance, events, and marketplaces that convert.",
      highlights: ["Amazon & Flipkart Scaling", "Pan-India Retail Activations", "Omnichannel Strategy"],
      ctaPrimary: "See Scope",
      ctaSecondary: "Get started"
    }
  ];

  return (
    <section id="who-for" className="py-16 md:py-20 flex flex-col justify-center bg-[#f8f8f6] dark:bg-black text-[#1B1B1B] dark:text-white relative z-10 overflow-hidden">
      
      {/* 1. Infinite Auto-Scrolling Logo Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 lg:mb-10">
        <p className="text-center text-xs font-montserrat font-bold uppercase tracking-[0.25em] text-[#1B1B1B]/50 dark:text-white/60 mb-3 lg:mb-2">
          Trusted by Leading Brands
        </p>

        <div className="relative overflow-hidden w-full py-4 border-y border-black/5 dark:border-white/10">
          <div className="animate-marquee flex items-center gap-8 sm:gap-12 whitespace-nowrap" style={{ width: 'max-content' }}>
            {brandLogos.concat(brandLogos).map((brand, idx) => {
              return (
                <div
                  key={idx}
                  className="h-10 flex items-center justify-center shrink-0 px-2 cursor-pointer group"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-6 sm:h-7 max-w-[110px] sm:max-w-[125px] w-auto object-contain transition-all duration-300 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 dark:brightness-0 dark:invert dark:opacity-70 dark:group-hover:brightness-0 dark:group-hover:invert dark:group-hover:opacity-100"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Sleek Minimalist Brand Trust Stats Bar - Infinite Marquee Carousel on Mobile, 4-Col Grid on Desktop */}
        <div className="mt-6 sm:mt-8 lg:mt-10 stats-marquee-wrapper max-w-full">
          <div className="stats-marquee-track lg:grid lg:grid-cols-4 gap-3 sm:gap-3.5 w-full">
            {/* Primary Set of Stat Cards */}
            {brandStats.map((stat) => (
              <div 
                key={`stat-1-${stat.id}`}
                className="stat-card shrink-0 w-[190px] sm:w-auto lg:w-full p-3.5 sm:p-4 bg-white dark:bg-slate-900/90 rounded-xl border border-black/10 dark:border-slate-800 shadow-sm hover:border-[#00afc8] transition-colors flex flex-col items-center justify-center text-center lg:flex-row lg:items-center lg:justify-start lg:text-left gap-1 lg:gap-2.5"
              >
                <span className="stat-number font-montserrat font-black text-base sm:text-lg lg:text-xl text-[#1B1B1B] dark:text-white leading-none shrink-0">
                  <AnimatedStatNumber prefix={stat.prefix} value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="stat-label text-[10px] sm:text-xs lg:text-[11px] font-montserrat font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide leading-tight text-center lg:text-left">
                  {stat.label}
                </span>
              </div>
            ))}

            {/* Duplicate Set of Stat Cards (Mobile Only for Seamless Infinite Loop) */}
            {brandStats.map((stat) => (
              <div 
                key={`stat-2-${stat.id}`}
                className="stat-card lg:hidden shrink-0 w-[190px] sm:w-auto p-3.5 sm:p-4 bg-white dark:bg-slate-900/90 rounded-xl border border-black/10 dark:border-slate-800 shadow-sm hover:border-[#00afc8] transition-colors flex flex-col items-center justify-center text-center gap-1"
              >
                <span className="stat-number font-montserrat font-black text-base sm:text-lg text-[#1B1B1B] dark:text-white leading-none shrink-0">
                  <AnimatedStatNumber prefix={stat.prefix} value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="stat-label text-[10px] sm:text-xs font-montserrat font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide leading-tight text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. "Who Is This For" Situation Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 lg:pt-0">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-5 lg:mb-4"
        >
          <h2 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1B1B1B] dark:text-white tracking-tight mb-1">
            Where are you right now?
          </h2>
          
          <p className="text-[#1B1B1B]/70 dark:text-white/70 text-xs sm:text-sm font-light">
            Pick your stage — we'll show you exactly how we help.
          </p>
        </motion.div>

        {/* 4-Column Grid displaying ALL FOUR Stage Cards with Minimalist Glass Design & 2 CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {situationCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-[#F8F8F6] dark:bg-black hover:bg-[#00afc8] dark:hover:bg-[#00afc8] rounded-2xl p-4 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden cursor-pointer"
              >
                {/* Top Subtle Gradient Accent Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00afc8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Large Background Stroke Number Clipped Off Right Edge */}
                <span 
                  className="absolute bottom-14 -right-4 sm:bottom-16 sm:-right-4 lg:-right-4 text-6xl sm:text-7xl font-black font-sans tracking-tight leading-none pointer-events-none select-none z-0 transition-all duration-300 whitespace-nowrap opacity-20 dark:opacity-30 group-hover:opacity-75 text-transparent [-webkit-text-stroke:2px_#00afc8] dark:[-webkit-text-stroke:2px_#ffffff] group-hover:[-webkit-text-stroke:2px_#ffffff]"
                >
                  {card.num}
                </span>

                <div className="relative z-10">
                  {/* Top Bar: Icon + Stage Pill Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-[#00afc8]/10 text-[#00afc8] border border-[#00afc8]/20 flex items-center justify-center group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 transition-all duration-300 shadow-inner">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-montserrat font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${card.badgeColor} group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 transition-colors`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-montserrat text-xs sm:text-[13px] xl:text-sm font-extrabold text-[#1B1B1B] dark:text-white group-hover:text-white transition-colors duration-300 leading-snug sm:whitespace-nowrap mb-1">
                    {card.title}
                  </h3>

                  <p className="font-montserrat text-[11px] text-[#1B1B1B]/70 dark:text-white/70 group-hover:text-white/85 transition-colors duration-300 mb-3 font-normal leading-relaxed min-h-[30px]">
                    {card.subtitle}
                  </p>

                  {/* Bullet Highlights with Minimalist Check Icons */}
                  <div className="space-y-1.5 border-t border-black/5 dark:border-white/10 group-hover:border-white/20 pt-2.5 mb-3 transition-colors duration-300">
                    {card.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-montserrat font-medium text-[#1B1B1B]/80 dark:text-white/80 group-hover:text-white transition-colors duration-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00afc8] group-hover:text-white shrink-0 transition-colors duration-300" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Two Action Button Options */}
                <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-black/5 dark:border-white/10 group-hover:border-white/20 relative z-10 transition-colors duration-300">
                  {/* Primary Action Button (Audit) */}
                  <button
                    onClick={onOpenContact}
                    className="py-2 px-1.5 rounded-xl bg-[#00afc8] text-white font-montserrat font-bold text-[9px] uppercase tracking-wider group-hover:bg-white group-hover:text-[#003E4D] transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer shadow-sm hover:shadow-md group/btn"
                    title={card.ctaPrimary}
                  >
                    <span className="truncate">{card.ctaPrimary}</span>
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
                  </button>

                  {/* Secondary Action Button (Explore) */}
                  <button
                    onClick={onExploreWork}
                    className="py-2 px-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-montserrat font-bold text-[9px] uppercase tracking-wider group-hover:border-white/40 group-hover:text-white group-hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer group/btn2"
                    title={card.ctaSecondary}
                  >
                    <span className="truncate">{card.ctaSecondary}</span>
                    <ArrowUpRight className="w-3 h-3 group-hover/btn2:translate-x-0.5 group-hover/btn2:-translate-y-0.5 transition-transform shrink-0" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}