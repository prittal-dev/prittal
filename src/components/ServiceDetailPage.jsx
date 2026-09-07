import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  ChevronRight 
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import ServiceHeroVisual from './ServiceHeroVisual';
import { servicesData } from '../data/servicesData';

export default function ServiceDetailPage({
  service,
  onSelectService,
  onBack,
  onNavigate,
  onOpenContact,
  isDark,
  onToggleTheme
}) {
  // Scroll to top whenever the service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [service?.id]);

  if (!service) return null;

  const ServiceMainIcon = service.icon || Sparkles;
  const otherServices = servicesData.filter(s => s.id !== service.id);

  const scrollToCapabilities = () => {
    const el = document.getElementById('capabilities');
    if (el) {
      if (window.lenis) window.lenis.scrollTo(el, { offset: -70, duration: 0.8 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whyChoosePrittal = [
    {
      icon: ShieldCheck,
      title: 'Zero Fragmented Teams',
      desc: 'Everything built as one connected growth engine without six disconnected vendors.'
    },
    {
      icon: TrendingUp,
      title: 'Outcome-Driven ROI',
      desc: 'Strategies tied directly to conversions, customer retention, and real revenue metrics.'
    },
    {
      icon: Zap,
      title: 'Senior-Led Execution',
      desc: 'Direct collaboration with senior strategists, creative directors, and media buyers.'
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-[#00afc8] selection:text-[#fff6f1] font-outfit transition-colors duration-300 ${
      isDark ? 'bg-[#07090e] text-[#fff6f1]' : 'bg-[#F8F8F6] text-[#003E4D]'
    }`}>
      
      {/* Top Navbar */}
      <Navbar
        onOpenContact={() => onOpenContact(service.displayTitle || service.title)}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        onNavigate={onNavigate}
        forcedActiveSection="services"
      />

      {/* Main Container - Scaled for MacBook 13", 14", 16" & Desktops */}
      <main className="flex-1 pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-6xl lg:max-w-6xl xl:max-w-7xl mx-auto w-full relative">
        
        {/* Ambient Top Lighting Blur */}
        <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-[450px] sm:w-[600px] lg:w-[750px] h-[250px] sm:h-[320px] ${
          isDark ? 'bg-[#00afc8]/20' : 'bg-[#00afc8]/15'
        } rounded-full filter blur-[100px] sm:blur-[140px] pointer-events-none -z-10`} />

        {/* Back Link Bar */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between gap-4 mb-6 sm:mb-8"
        >
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold text-[#00A9B9] ${
              isDark ? 'hover:text-white hover:bg-white/5 hover:border-white/10' : 'hover:text-[#003E4D] hover:bg-black/5 hover:border-black/5'
            } uppercase tracking-wider cursor-pointer group transition-all px-3 py-1.5 rounded-xl border border-transparent`}
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1.5 transition-transform" />
            <span>All services</span>
          </button>

          {/* Breadcrumb Indicator */}
          <div className={`hidden sm:flex items-center gap-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium font-mono`}>
            <span>Services</span>
            <span>/</span>
            <span className="text-[#00A9B9] font-bold truncate max-w-[220px]">{service.displayTitle || service.title}</span>
          </div>
        </motion.div>

        {/* HERO SECTION - 2 COLUMNS BALANCED FOR MACBOOK & WIDESCREEN */}
        <header className={`relative mb-14 sm:mb-18 lg:mb-24 pb-12 sm:pb-16 border-b ${
          isDark ? 'border-white/10' : 'border-black/5'
        }`}>
          
          {/* Huge Ambient Background Stroke Number */}
          <span 
            className={`absolute -top-6 sm:-top-10 left-0 text-7xl sm:text-9xl lg:text-[10rem] xl:text-[11.5rem] font-bold font-sans tracking-tight leading-none pointer-events-none select-none -z-10 ${
              isDark ? 'opacity-15 text-transparent [-webkit-text-stroke:2px_#ffffff]' : 'opacity-10 text-transparent [-webkit-text-stroke:2px_#00A9B9]'
            }`}
          >
            {service.num}
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Hero Content (Col Span 7) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 sm:space-y-5 lg:col-span-7"
            >
              {/* Category Tag & Live Status Indicator */}
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                {service.badge && (
                  <span className={`text-[11px] sm:text-xs font-bold text-[#00A9B9] uppercase tracking-wider ${
                    isDark ? 'bg-[#00A9B9]/15 border-[#00A9B9]/30' : 'bg-[#00A9B9]/10 border-[#00A9B9]/30'
                  } px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border shadow-sm flex items-center gap-2`}>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#00A9B9] animate-pulse" />
                    {service.badge}
                  </span>
                )}
                <span className={`text-[11px] sm:text-xs font-mono font-semibold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Service {service.num} of 06
                </span>
              </div>

              {/* Service Main Title */}
              <div className="flex items-center justify-between gap-4">
                <h1 className={`text-2.5xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold ${
                  isDark ? 'text-white' : 'text-[#003E4D]'
                } tracking-tight leading-[1.15] capitalize`}>
                  {service.title}
                </h1>
              </div>

              {/* Lede Paragraph */}
              <p className={`text-sm sm:text-base lg:text-base xl:text-lg font-normal ${
                isDark ? 'text-white/85' : 'text-[#003E4D]/85'
              } leading-relaxed max-w-2xl`}>
                {service.lede}
              </p>

              {/* Stats Highlight Pills Strip */}
              {service.stats && (
                <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-lg pt-1">
                  {service.stats.map((stat, sIdx) => (
                    <div 
                      key={sIdx}
                      className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-white/70 border-black/5'
                      } border backdrop-blur-sm flex flex-col min-w-0`}
                    >
                      <span className="text-xs sm:text-base lg:text-base xl:text-lg font-bold text-[#00A9B9] truncate">
                        {stat.value}
                      </span>
                      <span className={`text-[9px] sm:text-[11px] font-normal ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      } mt-0.5 truncate`}>
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenContact(service.displayTitle || service.title)}
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#00afc8] hover:bg-[#003E4D] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-xl hover:scale-105 flex items-center gap-2 cursor-pointer"
                >
                  <span>Start a project</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  onClick={scrollToCapabilities}
                  className={`px-5 sm:px-6 py-3 sm:py-3.5 rounded-full ${
                    isDark 
                      ? 'bg-white/5 hover:bg-white/10 text-white border-white/20' 
                      : 'bg-white hover:bg-black/5 text-[#003E4D] border-black/10'
                  } border font-semibold text-[11px] sm:text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-sm`}
                >
                  <span>What's included</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </motion.div>

            {/* Right Hero Visual Card (Col Span 5) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 w-full flex items-center justify-center pt-2 lg:pt-0"
            >
              <ServiceHeroVisual service={service} isDark={isDark} />
            </motion.div>

          </div>
        </header>


        {/* SECTION 1: WHAT'S INCLUDED / CAPABILITIES */}
        <section className="mb-14 sm:mb-20 lg:mb-24" id="capabilities">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#00A9B9] block mb-1">
                WHAT'S INCLUDED
              </span>
              <h2 className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold ${
                isDark ? 'text-white' : 'text-[#003E4D]'
              } tracking-tight`}>
                How we approach {service.title.toLowerCase()}
              </h2>
            </div>
            <p className={`text-[11px] sm:text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xs sm:max-w-sm font-normal`}>
              4 dedicated modules designed to cover the entire lifecycle from blueprint to live delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {service.capabilities.map((cap, idx) => {
              const CapIcon = cap.icon || Sparkles;
              const moduleNum = `0${idx + 1}`;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  whileHover={{ y: -3 }}
                  className={`rounded-2xl p-5 sm:p-6 lg:p-7 border ${
                    isDark 
                      ? 'bg-[#0a0f19] border-white/10 hover:border-[#00A9B9]/60 shadow-lg shadow-black/20' 
                      : 'bg-white border-black/5 hover:border-[#00A9B9]/50 shadow-sm hover:shadow-xl'
                  } transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
                >
                  {/* Subtle Corner Glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${
                    isDark ? 'bg-[#00A9B9]/10 group-hover:bg-[#00A9B9]/20' : 'bg-[#00A9B9]/5 group-hover:bg-[#00A9B9]/15'
                  } rounded-full filter blur-2xl transition-all pointer-events-none`} />

                  <div>
                    {/* Header Row: Icon + Module Index */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${
                        isDark ? 'bg-white/5 border-white/10' : 'bg-[#00A9B9]/10 border-[#00A9B9]/20'
                      } border text-[#00A9B9] flex items-center justify-center group-hover:bg-[#00A9B9] group-hover:text-white transition-colors duration-300 shadow-sm`}>
                        <CapIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-[#00A9B9]/80 group-hover:text-[#00A9B9] transition-colors">
                        MODULE {moduleNum}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-base sm:text-lg lg:text-xl font-semibold ${
                      isDark ? 'text-white group-hover:text-[#00afc8]' : 'text-[#003E4D] group-hover:text-[#00A9B9]'
                    } mb-2 transition-colors leading-snug`}>
                      {cap.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-xs sm:text-sm ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    } leading-relaxed font-normal mb-4`}>
                      {cap.desc}
                    </p>
                  </div>

                  {/* Deliverables Tags Pill Strip */}
                  {cap.tags && (
                    <div className={`pt-3 border-t ${isDark ? 'border-white/10' : 'border-black/5'} flex flex-wrap gap-1.5`}>
                      {cap.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className={`text-[10px] sm:text-[11px] font-medium ${
                            isDark ? 'text-slate-300 bg-white/5' : 'text-[#003E4D]/80 bg-black/5'
                          } px-2 py-0.5 rounded-md`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: PROCESS / HOW IT RUNS */}
        <section className="mb-14 sm:mb-20 lg:mb-24" id="process">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#00A9B9] block mb-1">
                HOW IT RUNS
              </span>
              <h2 className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold ${
                isDark ? 'text-white' : 'text-[#003E4D]'
              } tracking-tight`}>
                Our 4-step execution process
              </h2>
            </div>
            <p className={`text-[11px] sm:text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xs sm:max-w-sm font-normal`}>
              Structured agile sprints with transparent deliverables at every milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-4 xl:gap-5">
            {service.process.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                whileHover={{ y: -3 }}
                className={`rounded-2xl p-4.5 sm:p-5 lg:p-5.5 border ${
                  isDark 
                    ? 'bg-[#0a0f19] border-white/10 hover:border-[#00A9B9]/50 shadow-md' 
                    : 'bg-white border-black/5 hover:border-[#00A9B9]/40 shadow-sm hover:shadow-lg'
                } transition-all flex flex-col justify-between relative group h-full`}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-end mb-3">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#00A9B9] font-bold bg-[#00A9B9]/10 border border-[#00A9B9]/20 px-2.5 py-0.5 rounded-full">
                      Step {step.num}
                    </span>
                  </div>

                  {/* Step Name */}
                  <h4 className={`text-sm sm:text-base lg:text-lg font-semibold ${
                    isDark ? 'text-white' : 'text-[#003E4D]'
                  } mb-1.5`}>
                    {step.name}
                  </h4>

                  {/* Step Description */}
                  <p className={`text-xs ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  } leading-relaxed mb-3 font-normal`}>
                    {step.desc}
                  </p>
                </div>

                {/* Key Deliverable Box */}
                {step.deliverable && (
                  <div className={`pt-2.5 border-t ${isDark ? 'border-white/10' : 'border-black/5'} mt-2`}>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#00A9B9] block mb-0.5">
                      Key Milestone
                    </span>
                    <p className={`text-[11px] sm:text-xs font-medium ${
                      isDark ? 'text-white/90' : 'text-[#003E4D]'
                    } leading-tight`}>
                      {step.deliverable}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: WHY PRITTAL VALUE STRIP */}
        <section className={`mb-14 sm:mb-20 lg:mb-24 p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl border backdrop-blur-md ${
          isDark ? 'bg-[#0a0f19]/90 border-white/10' : 'bg-white/60 border-black/5'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {whyChoosePrittal.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#00A9B9]/10 text-[#00A9B9] flex items-center justify-center shrink-0 mt-0.5">
                    <ItemIcon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-xs sm:text-sm ${
                      isDark ? 'text-white' : 'text-[#003E4D]'
                    } mb-0.5`}>
                      {item.title}
                    </h4>
                    <p className={`text-[11px] sm:text-xs ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    } leading-relaxed font-normal`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: STRATEGY CALL CLOSING BANNER */}
        <section className="mb-14 sm:mb-20 lg:mb-24">
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-[#003E4D] via-[#002832] to-[#041b22] border border-[#00A9B9]/30 text-white flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl relative overflow-hidden">
            {/* Background Light Orb */}
            <div className="absolute -top-10 -right-10 w-80 lg:w-96 h-80 lg:h-96 bg-[#00afc8]/25 rounded-full filter blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl space-y-2.5 text-center lg:text-left">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#00A9B9] block">
                LET'S TALK YOUR GROWTH
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                {service.closing?.heading || `Ready to talk ${service.title.toLowerCase()}?`}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
                {service.closing?.desc || "Tell us where you're stuck and we'll tell you honestly if this is the right service to start with."}
              </p>

              {/* Assurance Checkpoints */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap pt-1.5 justify-center lg:justify-start text-[11px] sm:text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00A9B9] shrink-0" /> Free 30-min strategy audit
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00A9B9] shrink-0" /> No cookie-cutter packages
                </span>
              </div>
            </div>

            <div className="relative z-10 shrink-0">
              <button
                onClick={() => onOpenContact(service.displayTitle || service.title)}
                className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#00A9B9] hover:bg-white hover:text-[#003E4D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <span>Start a project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 5: EXPLORE OTHER SERVICES */}
        <section className={`pt-8 sm:pt-10 border-t ${isDark ? 'border-white/10' : 'border-black/5'}`}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#00A9B9] block mb-1">
                EXPLORE MORE
              </span>
              <h2 className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold ${
                isDark ? 'text-white' : 'text-[#003E4D]'
              } tracking-tight`}>
                Explore other services
              </h2>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-bold text-[#00A9B9] hover:underline uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <span>View All 6 Services</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-3.5 xl:gap-4">
            {otherServices.map((other) => {
              const OtherIcon = other.icon || Sparkles;
              return (
                <motion.div
                  key={other.id}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => onSelectService(other)}
                  className={`rounded-2xl p-4 sm:p-4.5 border ${
                    isDark 
                      ? 'bg-[#0a0f19] border-white/10 hover:border-[#00A9B9]/50 shadow-md' 
                      : 'bg-white border-black/5 hover:border-[#00A9B9]/50 shadow-sm hover:shadow-md'
                  } transition-all cursor-pointer flex flex-col justify-between group h-full`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#00A9B9]/10 text-[#00A9B9] flex items-center justify-center group-hover:bg-[#00A9B9] group-hover:text-white transition-colors">
                        <OtherIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#00A9B9]">
                        {other.num}
                      </span>
                    </div>

                    <h4 className={`font-semibold text-xs sm:text-sm ${
                      isDark ? 'text-white group-hover:text-[#00afc8]' : 'text-[#003E4D] group-hover:text-[#00A9B9]'
                    } transition-colors mb-1 leading-snug`}>
                      {other.displayTitle || other.title}
                    </h4>
                    <p className={`text-[11px] ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    } line-clamp-2 mb-3 font-normal`}>
                      {other.desc}
                    </p>
                  </div>

                  <div className={`flex items-center justify-between pt-2.5 border-t ${
                    isDark ? 'border-white/10' : 'border-black/5'
                  } text-[10px] font-bold text-[#00A9B9]`}>
                    <span className="uppercase tracking-wider">Learn More</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer
        onOpenContact={() => onOpenContact(service.displayTitle || service.title)}
      />

    </div>
  );
}
