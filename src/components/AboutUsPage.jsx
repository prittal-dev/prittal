import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  Award, 
  Compass, 
  BarChart3, 
  Eye, 
  Check, 
  Calendar, 
  Globe2, 
  Users, 
  Briefcase, 
  Layers, 
  Target,
  ChevronRight,
  Star
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { CrowdCanvas } from './v1/skiper39';

// Client Logos from assets
import xseedLogo from '../../assets/xseed.png';
import sageLogo from '../../assets/sage.png';
import oxfordLogo from '../../assets/oxford.png';
import cambridgeLogo from '../../assets/cambridge.png';
import nokiaLogo from '../../assets/nokia.png';
import uaeLogo from '../../assets/uae.png';
import oyoLogo from '../../assets/oyo.png';
import aptaraLogo from '../../assets/aptara.png';

export default function AboutUsPage({
  onBack,
  onNavigate,
  onOpenContact,
  isDark,
  onToggleTheme
}) {
  const [activeTab, setActiveTab] = useState('design');
  const [isCardHovered, setIsCardHovered] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  const stats = [
    {
      value: '8+ Years',
      label: 'Industry Experience',
      sublabel: 'Proven brand scaling & digital execution',
      icon: Calendar,
      color: '#00afc8'
    },
    {
      value: '5000+',
      label: 'Projects Delivered',
      sublabel: 'Delivered across enterprise & startup markets',
      icon: Briefcase,
      color: '#38bdf8'
    },
    {
      value: '250+',
      label: 'Global Clients',
      sublabel: 'Global brands trusting our full-service team',
      icon: Globe2,
      color: '#2dd4bf'
    },
    {
      value: '₹50 Cr+',
      secondaryVal: '$60M+ Generated',
      label: 'Client Revenue Generated',
      sublabel: 'Verified revenue impact delivered for clients',
      icon: TrendingUp,
      color: '#00afc8',
      highlight: true
    }
  ];

  const values = [
    {
      id: 'transparency',
      title: 'Transparency',
      icon: Eye,
      tag: '01 / HONESTY FIRST',
      desc: "No gimmicks or false promises. We believe in transparency and honesty with all our clients. We'll promise only what we can deliver, and we'll always follow through.",
      pill: 'Clear Deliverables',
      bgGlow: 'from-[#00afc8]/15 via-transparent to-transparent'
    },
    {
      id: 'integrity',
      title: 'Integrity',
      icon: Award,
      tag: '02 / LONG-TERM TRUST',
      desc: "We value honesty and integrity, working to foster relationships based on trust. We know that trust is earned by consistently meeting our high standards.",
      pill: 'High Standards',
      bgGlow: 'from-sky-500/15 via-transparent to-transparent'
    },
    {
      id: 'simplicity',
      title: 'Simplicity',
      icon: Compass,
      tag: '03 / ZERO JARGON',
      desc: "We believe expertise should be clear, not complicated. Our approach is straightforward, focused on simplifying what might seem complex.",
      pill: 'Straightforward Ops',
      bgGlow: 'from-teal-500/15 via-transparent to-transparent'
    },
    {
      id: 'performance',
      title: 'Performance',
      icon: BarChart3,
      tag: '04 / MEASURABLE ROI',
      desc: "In marketing, data is essential. But it's not just about having reports on metrics. We make sure every campaign drives real business growth.",
      pill: 'Revenue Driven',
      bgGlow: 'from-cyan-500/15 via-transparent to-transparent'
    }
  ];

  const clientLogos = [
    { name: 'APTARA', logo: aptaraLogo },
    { name: 'NOKIA', logo: nokiaLogo },
    { name: 'SAGE', logo: sageLogo },
    { name: 'XSEED', logo: xseedLogo },
    { name: 'OXFORD', logo: oxfordLogo },
    { name: 'CAMBRIDGE', logo: cambridgeLogo },
    { name: 'UAE', logo: uaeLogo },
    { name: 'OYO', logo: oyoLogo },
  ];

  const pillars = [
    {
      id: 'design',
      title: 'Design',
      headline: 'Distinctive Identity & High-Converting Experiences',
      desc: 'We shape brands that command attention and stay remembered. From cohesive visual identities to frictionless user interfaces, every pixel serves a business purpose.',
      deliverables: ['Brand Architecture & Guidelines', 'UI/UX & Web Applications', 'Packaging & Publication Design', 'Motion & Visual Systems']
    },
    {
      id: 'promote',
      title: 'Promote',
      headline: 'Multi-Channel Acquisition & Authority Building',
      desc: 'Reaching the right audience with the right narrative. We combine hyper-targeted performance marketing with organic storytelling to generate predictable pipeline.',
      deliverables: ['Performance Paid Media (Meta & Google)', 'Organic Search & Technical SEO', 'High-Converting Video Animation', 'Content & Inbound Engines']
    },
    {
      id: 'succeed',
      title: 'Succeed',
      headline: 'Scalable Growth & Revenue Acceleration',
      desc: 'We optimize every step of your commercial engine to turn traffic into compounding revenue, retention, and enterprise market value.',
      deliverables: ['E-Commerce & Marketplace Scaling', 'Conversion Rate Optimization (CRO)', 'Global Market Expansion', 'Full-Funnel Analytics & Attribution']
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Prittal consistently delivered high-quality K-12 book designs with exceptional typography and illustrations. Their team's attention to educational standards, accuracy, and tight deadlines made them a dependable creative partner throughout our publishing projects.",
      name: "Brajesh Singh",
      title: "Sr. Project Manager",
      company: "XSEED Education",
      category: "K-12 Book Design & Publishing",
      rating: 5
    },
    {
      id: 2,
      quote: "Prittal became an extension of our marketing team. Their creative campaigns, social media execution, and strategic approach consistently strengthened our brand presence and delivered impactful engagement across multiple digital platforms.",
      name: "Anupama",
      title: "Sr. Marketing Manager",
      company: "Sage",
      category: "Brand Campaigns & Social Media",
      rating: 5
    },
    {
      id: 3,
      quote: "Prittal elevated our brand communication with outstanding presentation designs, marketing collateral, and corporate branding. Their creativity, quick turnaround, and deep understanding of our business made every project smooth and impactful.",
      name: "Rakesh Singh",
      title: "Sr. Marketing Manager",
      company: "UAE Exchange",
      category: "Corporate Branding & Collateral",
      rating: 5
    },
    {
      id: 4,
      quote: "Prittal proved to be a reliable outsourcing partner for artwork production and creative execution. Their commitment to quality, process efficiency, and on-time delivery enabled us to manage high-volume projects with complete confidence.",
      name: "Sandeep",
      title: "Manager",
      company: "SPi Global",
      category: "Artwork Production & Execution",
      rating: 5
    },
    {
      id: 5,
      quote: "Working with Prittal was a seamless experience. Their expertise in K-12 book design, typography, and illustration helped us produce engaging learning materials while maintaining the quality, consistency, and precision expected from Cambridge publications.",
      name: "Sanjay",
      title: "Sr. Project Manager",
      company: "University of Cambridge",
      category: "K-12 Learning & Typography",
      rating: 5
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-[#00afc8] selection:text-[#fff6f1] font-outfit transition-colors duration-300 ${
      isDark ? 'bg-black text-[#fff6f1]' : 'bg-[#F8F8F6] text-[#003E4D]'
    }`}>
      {/* Top Navbar */}
      <Navbar
        onOpenContact={onOpenContact}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        onNavigate={onNavigate}
        forcedActiveSection="about-us"
      />

      <main className="flex-1 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto w-full relative">
        
        {/* Subtle Ambient Lighting Accents */}
        <div className="absolute top-12 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-[#00afc8]/10 dark:bg-[#00afc8]/15 rounded-full filter blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-80 right-10 w-[450px] h-[280px] bg-sky-500/10 rounded-full filter blur-[140px] pointer-events-none -z-10" />

        {/* Back Link Bar & Breadcrumbs */}
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12">
          <button
            onClick={() => onNavigate ? onNavigate('#') : window.history.back()}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00afc8] hover:text-[#003E4D] dark:hover:text-white uppercase tracking-wider cursor-pointer group transition-all px-3 py-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-black/5 dark:hover:border-white/10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium font-mono">
            <span>Prittal</span>
            <span>/</span>
            <span className="text-[#00afc8] font-bold">About Us</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: HERO & MISSION STATEMENT */}
        {/* ========================================================================= */}
        <section className="relative mb-20 sm:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-4"
            >

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5.5xl font-bold tracking-tight leading-[1.15]">
                Your one-stop solution for{' '}
                <span className="text-[#00afc8]">
                  brand growth
                </span>{'. '}
              </h1>

              {/* Lead Paragraph from PDF */}
              <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-slate-600 dark:text-slate-300">
                Prittal was established <strong className="font-semibold text-[#003E4D] dark:text-white">8+ years ago</strong> with a mission to empower businesses through innovative design, marketing, and growth strategies. Over the years, we have built a strong foundation of global clients and delivered outstanding results.
              </p>

              <p className="text-sm sm:text-base font-normal leading-relaxed text-slate-500 dark:text-slate-400">
                Our portfolio includes a diverse range of industries across India, the UAE, and the USA—all benefiting from our tailored, results-driven approach.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenContact && onOpenContact('General Consultation')}
                  className="px-6 py-3.5 rounded-full bg-[#00afc8] hover:bg-[#003E4D] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#00afc8]/25 hover:shadow-xl hover:scale-105 flex items-center gap-2 cursor-pointer"
                >
                  <span>Work With Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('our-values');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-[#003E4D] dark:text-white font-semibold text-xs uppercase tracking-wider transition-all border border-black/10 dark:border-white/10 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Our Values</span>
                </button>
              </div>
            </motion.div>

            {/* Right Hero Graphic Showcase / Photo Card Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-[#00afc8]/40 via-sky-500/20 to-transparent shadow-2xl">
                <div className={`rounded-[22px] p-6 sm:p-8 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'} border border-black/5 dark:border-white/10 relative overflow-hidden`}>
                  
                  {/* Subtle Background Radial */}
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#00afc8]/20 rounded-full filter blur-2xl" />

                  <div className="space-y-5 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#00afc8] font-bold">
                        Global Studio Presence
                      </span>
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00afc8] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00afc8]"></span>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold leading-tight text-[#003E4D] dark:text-white">
                      Scaling brands across 3 continents with relentless focus on ROI.
                    </h3>

                    {/* Quick Studio Highlights */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-[#00afc8]/15 text-[#00afc8] flex items-center justify-center shrink-0">
                          <Globe2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#003E4D] dark:text-white">India • UAE • USA</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">Headquartered in New Delhi, expanding globally</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#003E4D] dark:text-white">Dedicated Multi-Disciplinary Team</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">Strategists, art directors, performance engineers</div>
                        </div>
                      </div>
                    </div>

                    {/* Mini quote pill */}
                    <div className="pt-2 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>ESTABLISHED 2018</span>
                      <span className="text-[#00afc8] font-semibold">100% INDEPENDENT</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: NUMBERS THAT SPEAK FOR THEMSELVES */}
        {/* ========================================================================= */}
        <section className="mb-24 sm:mb-32">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00afc8] block mb-2">
              PROVEN TRACK RECORD
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Numbers that speak for themselves
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 font-normal">
              Measurable milestones accumulated through systematic execution and deep client partnerships.
            </p>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`relative p-6 sm:p-7 rounded-2xl transition-all duration-300 group hover:-translate-y-1.5 border ${
                    stat.highlight
                      ? 'bg-gradient-to-br from-[#00afc8]/15 via-sky-500/10 to-transparent border-[#00afc8]/40 shadow-xl shadow-[#00afc8]/10'
                      : isDark
                        ? 'bg-[#0a0a0a] border-white/10 hover:border-[#00afc8]/40 hover:bg-[#111111]'
                        : 'bg-white border-black/5 hover:border-[#00afc8]/40 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00afc8]/15 text-[#00afc8] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComp className="w-5 h-5" />
                    </div>
                    {stat.highlight && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00afc8] text-white">
                        Impact
                      </span>
                    )}
                  </div>

                  <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#003E4D] dark:text-white mb-1">
                    {stat.value}
                  </div>

                  {stat.secondaryVal && (
                    <div className="text-xs font-semibold text-[#00afc8] mb-2 font-mono">
                      {stat.secondaryVal}
                    </div>
                  )}

                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-1">
                    {stat.label}
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    {stat.sublabel}
                  </p>

                  {stat.highlight && (
                    <div className="mt-5 pt-4 border-t border-[#00afc8]/20">
                      <button
                        onClick={() => onOpenContact && onOpenContact('Revenue Growth')}
                        className="w-full py-2 px-3 rounded-lg bg-[#00afc8] hover:bg-[#003E4D] text-white text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Contact Us</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: OUR VALUES */}
        {/* ========================================================================= */}
        <section id="our-values" className="mb-24 sm:mb-32 relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00afc8] block mb-2">
              FOUNDATIONAL PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Our values
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3 font-normal">
              The four unshakeable standards guiding every strategy, interaction, and campaign we build.
            </p>
          </div>

          {/* 4 Values Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <motion.div
                  key={val.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`p-7 rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-2 border flex flex-col justify-between ${
                    isDark
                      ? 'bg-[#0a0a0a] border-white/10 hover:border-[#00afc8]/50 hover:shadow-2xl hover:shadow-[#00afc8]/10 hover:bg-[#111111]'
                      : 'bg-white border-black/5 hover:border-[#00afc8]/50 shadow-md hover:shadow-xl'
                  }`}
                >
                  {/* Subtle Top-Corner Accent Light */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${val.bgGlow} rounded-full filter blur-xl pointer-events-none`} />

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#00afc8]/15 text-[#00afc8] flex items-center justify-center">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                        {val.tag.split('/')[0]}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#003E4D] dark:text-white">
                      {val.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
                      {val.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 relative z-10 flex items-center justify-between text-[11px] font-semibold text-[#00afc8]">
                    <span>{val.pill}</span>
                    <Check className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: YOUR SOLUTIONS PROVIDER (DESIGN, PROMOTE, SUCCEED) */}
        {/* ========================================================================= */}
        <section className="mb-24 sm:mb-32">
          <div className={`rounded-3xl p-8 sm:p-12 lg:p-14 border relative overflow-hidden ${
            isDark 
              ? 'bg-[#0a0a0a] border-white/10' 
              : 'bg-gradient-to-br from-white via-[#f0f9fa] to-white border-black/5 shadow-xl'
          }`}>
            
            {/* Ambient Background Gradient Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00afc8]/15 rounded-full filter blur-3xl pointer-events-none" />

            <div className="max-w-3xl mb-10 relative z-10">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00afc8] block mb-2">
                YOUR SOLUTIONS PROVIDER
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                Driving a better way to{' '}
                <span className="text-[#00afc8]">Design, Promote, Succeed.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-4 leading-relaxed font-normal">
                With years of experience, we've learned that each marketing channel offers distinct advantages; but their true potential is unlocked when combined strategically. At Prittal, we offer full-service strategies that leverage a diverse mix of digital channels to improve visibility, increase conversions, and drive revenue.
              </p>
            </div>

            {/* Interactive 3-Pillar Tab Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 relative z-10">
              {pillars.map((pillar) => {
                const isSelected = activeTab === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActiveTab(pillar.id)}
                    className={`p-5 rounded-2xl text-left transition-all duration-300 border cursor-pointer ${
                      isSelected
                        ? 'bg-[#00afc8] text-white border-[#00afc8] shadow-lg shadow-[#00afc8]/25 scale-[1.02]'
                        : isDark
                          ? 'bg-[#111111] text-slate-300 border-white/10 hover:border-white/20 hover:bg-[#161616]'
                          : 'bg-white text-slate-700 border-black/5 hover:border-black/15 shadow-sm'
                    }`}
                  >
                    <div className="text-xs font-mono uppercase tracking-widest opacity-80 mb-1">
                      Pillar {pillar.id === 'design' ? '01' : pillar.id === 'promote' ? '02' : '03'}
                    </div>
                    <div className="text-lg font-bold">
                      {pillar.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Pillar Content Box */}
            {pillars.map((pillar) => {
              if (pillar.id !== activeTab) return null;
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 sm:p-8 rounded-2xl border ${
                    isDark ? 'bg-[#111111] border-white/10' : 'bg-white border-black/5 shadow-sm'
                  } relative z-10`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 space-y-3">
                      <h4 className="text-xl font-bold text-[#003E4D] dark:text-white">
                        {pillar.headline}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="lg:col-span-5 space-y-2 border-t lg:border-t-0 lg:border-l border-black/10 dark:border-white/10 pt-4 lg:pt-0 lg:pl-6">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00afc8]">
                        Core Deliverables:
                      </div>
                      <div className="space-y-1.5">
                        {pillar.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-normal text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00afc8] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: OUR CLIENTS */}
        {/* ========================================================================= */}
        <section className="mb-20 sm:mb-28">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-[#1B1B1B]/50 dark:text-white/60 mb-3 lg:mb-4">
            Trusted by Leading Brands
          </p>

          <div className="relative overflow-hidden w-full py-4 border-y border-black/5 dark:border-white/10">
            <div className="animate-marquee flex items-center gap-8 sm:gap-12 whitespace-nowrap" style={{ width: 'max-content' }}>
              {clientLogos.concat(clientLogos).map((client, idx) => (
                <div
                  key={idx}
                  className="h-10 flex items-center justify-center shrink-0 px-2 cursor-pointer group"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-6 sm:h-7 max-w-[110px] sm:max-w-[125px] w-auto object-contain transition-all duration-300 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 dark:brightness-0 dark:invert dark:opacity-70 dark:group-hover:brightness-0 dark:group-hover:invert dark:group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: CLIENT TESTIMONIALS */}
        {/* ========================================================================= */}
        <section className="mb-20 sm:mb-28 relative">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-4 relative z-20 px-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00afc8] block mb-2">
              CLIENT SUCCESS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B1B1B] dark:text-white tracking-tight">
              Real Stories from High-Growth Brands
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-normal">
              Hear directly from partners who built, scaled, and transformed their brands with Prittal.
            </p>
          </div>

          {/* Relative Container for Background CrowdCanvas + Horizontal Marquee Cards */}
          <div className="relative min-h-[360px] sm:min-h-[420px] flex flex-col justify-center items-center overflow-hidden py-2">
            
            {/* Full-Width Animated Crowd Canvas Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <CrowdCanvas
                src="/images/peeps/all-peeps.png"
                rows={15}
                cols={7}
                className="h-full w-full opacity-[0.07] dark:opacity-[0.12] dark:invert transition-opacity duration-300 blur-[0.5px]"
                isPaused={isCardHovered}
              />
            </div>

            {/* Left & Right Smooth White/Dark Gradient Fade Masks */}
            <div className="absolute inset-y-0 left-0 w-8 sm:w-40 bg-gradient-to-r from-[#F8F8F6] dark:from-black via-[#F8F8F6]/90 dark:via-black/90 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 sm:w-40 bg-gradient-to-l from-[#F8F8F6] dark:from-black via-[#F8F8F6]/90 dark:via-black/90 to-transparent z-20 pointer-events-none" />

            {/* Horizontal Scrolling Marquee Testimonial Cards Overlaying Crowd */}
            <div 
              className="relative z-20 w-full overflow-hidden pt-6 pb-2"
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
              onTouchStart={() => setIsCardHovered(true)}
              onTouchEnd={() => setIsCardHovered(false)}
            >
              <div className="animate-marquee-smooth flex items-center gap-4 sm:gap-6 whitespace-normal">
                {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => {
                  const initials = t.name.split(' ').map(n => n[0]).join('');
                  return (
                    <div
                      key={idx}
                      className="w-[285px] sm:w-[410px] h-[240px] sm:h-[250px] bg-white/95 dark:bg-[#0a0a0a] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-white/10 shadow-xl hover:shadow-2xl hover:shadow-[#00afc8]/15 hover:border-[#00afc8] hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between shrink-0 group cursor-pointer relative overflow-hidden"
                    >
                      {/* Left Accent Bar */}
                      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#00afc8] group-hover:w-2 transition-all duration-300" />

                      <div className="pl-2">
                        {/* Top Bar: Category Tag & Star Rating */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[9px] sm:text-[10px] font-bold uppercase bg-[#00afc8]/10 text-[#00afc8] px-2.5 py-0.5 rounded-full border border-[#00afc8]/20 tracking-wider">
                            {t.category}
                          </span>
                          <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>

                        {/* Quote Content */}
                        <p className="text-slate-800 dark:text-slate-100 text-[11px] sm:text-sm font-normal leading-relaxed italic line-clamp-5 sm:line-clamp-4">
                          "{t.quote}"
                        </p>
                      </div>

                      {/* Author Details with Avatar Initials Badge */}
                      <div className="pl-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#00afc8]/10 text-[#00afc8] font-extrabold text-[10px] sm:text-xs flex items-center justify-center border border-[#00afc8]/30 shrink-0 shadow-sm group-hover:bg-[#00afc8] group-hover:text-white transition-colors">
                          {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {t.name}
                          </h4>
                          <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 sm:mt-0 font-normal">
                            {t.title}, <span className="font-semibold text-slate-700 dark:text-slate-300">{t.company}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: SLIM CALL TO ACTION BANNER */}
        {/* ========================================================================= */}
        <section className="mb-8">
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-[#003E4D] via-[#002832] to-[#041b22] border border-[#00A9B9]/30 text-white flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl relative overflow-hidden">
            {/* Background Light Orb */}
            <div className="absolute -top-10 -right-10 w-80 lg:w-96 h-80 lg:h-96 bg-[#00afc8]/25 rounded-full filter blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl space-y-2.5 text-center lg:text-left">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#00A9B9] block">
                NEXT STEP
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                See how we can help your business grow with <span className="text-[#00afc8]">tailored services.</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
                Ready to speak with our strategy experts? Let's discuss your brand objectives and map out a custom growth blueprint.
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

            <div className="relative z-10 shrink-0 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenContact && onOpenContact('Book a Meeting')}
                className="px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#00A9B9] hover:bg-white hover:text-[#003E4D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:scale-105 flex items-center gap-2 cursor-pointer"
              >
                <span>Book a Meeting</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenContact && onOpenContact('General Project')}
                className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Start a Project</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenContact={onOpenContact}
        onReplayIntro={() => onNavigate ? onNavigate('#') : null}
      />
    </div>
  );
}
