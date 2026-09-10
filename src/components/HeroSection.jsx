import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ShoppingBag, Eye } from 'lucide-react';
import floatingGirl from '../../assets/floating_girl.png';
import crow1 from '../../assets/crow1.png';
import crow2 from '../../assets/crow2.png';
import crow3 from '../../assets/crow3.png';
import crow4 from '../../assets/crow4.png';

const STAGGER = 0.03;

function RotatingSubtitle() {
  const words = ["build", "grow", "scale"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <p className="font-montserrat text-base sm:text-lg text-[#003E4D] dark:text-[#fff6f1] mb-1.5 font-normal flex items-center gap-1">
      <span>We</span>
      <span className="relative inline-flex items-center justify-center min-w-[50px] sm:min-w-[58px] h-7 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ y: 16, opacity: 0, rotateX: 90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -16, opacity: 0, rotateX: -90 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute inset-0 flex items-center justify-center text-[#00afc8] font-bold not-italic font-montserrat tracking-tight"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span>it.</span>
    </p>
  );
}

function TextRoll({ children, className = "", center = false }) {
  if (!children) return null;
  const letters = children.split("");

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={`relative inline-block overflow-hidden py-1 pr-4 leading-none cursor-pointer select-none ${className}`}
    >
      {/* Top Text Layer */}
      <span className="flex items-center pr-4">
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i}
              variants={{
                initial: { y: "0%" },
                hovered: { y: "-120%" },
              }}
              transition={{
                ease: [0.33, 1, 0.68, 1],
                delay,
                duration: 0.4,
              }}
              className="inline-block"
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </span>

      {/* Bottom Text Layer */}
      <span className="absolute inset-0 flex items-center pt-1 pr-4 pointer-events-none">
        {letters.map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i}
              variants={{
                initial: { y: "120%" },
                hovered: { y: "0%" },
              }}
              transition={{
                ease: [0.33, 1, 0.68, 1],
                delay,
                duration: 0.4,
              }}
              className="inline-block"
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          );
        })}
      </span>
    </motion.span>
  );
}

export default function HeroSection({ onOpenContact, onExploreWork }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const pathLengthProgress = useTransform(scrollYProgress, [0, 0.75], [0.15, 1]);

  const slides = [
    {
      subtitle: "We build it. We grow it. We scale it.",
      titleLine1: "NOT JUST AN AGENCY.",
      titleLine2: "YOUR BRAND",
      titleLine3: "GROWTH PARTNER.",
      desc: "No matter where you are in your journey, we're here to help. From building your brand identity and online presence to marketing, launches, and growth, Prittal works alongside you every step of the way."
    },
    {
      subtitle: "Your Full-Service Growth Engine",
      titleLine1: "ARCHITECTING DIGITAL PORTALS",
      titleLine2: "THAT SCALE YOUR BRAND",
      titleLine3: "FASTER & SMARTER.",
      desc: "We turn complex ideas into seamless interactive experiences, bespoke AI systems, and high-conversion editorial portals."
    }
  ];

  const slide = slides[currentSlide];

  const handlePrev = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      id="hero" 
      ref={sectionRef}
      className="snap-section relative min-h-screen min-h-[100dvh] lg:h-screen lg:max-h-screen bg-[#F8F8F6] dark:bg-[#05070a] text-[#003E4D] dark:text-[#fff6f1] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 lg:pt-20 xl:pt-24 pb-0 transition-colors duration-300"
    >
      


      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        
        {/* LEFT COLUMN: Floating Girl & Crow Image Assets */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative flex justify-center items-center h-[340px] sm:h-[380px]"
        >
          <div className="relative w-full max-w-[340px] h-full flex items-center justify-center">
            
            {/* CROW 1 */}
            <div className="absolute top-[-0%] left-[27%] z-19">
              <motion.img 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                src={crow1} 
                alt="Crow 1" 
                className="w-14 sm:w-16 h-auto object-contain filter drop-shadow-md dark:invert dark:brightness-125" 
              />
            </div>

            {/* CROW 2 */}
            <div className="absolute top-[3%] left-[88%] z-19">
              <motion.img 
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                src={crow2} 
                alt="Crow 2" 
                className="w-14 sm:w-15 h-auto object-contain filter drop-shadow-md dark:invert dark:brightness-125" 
              />
            </div>

            {/* CROW 3 */}
            <div className="absolute top-[14%] left-[44%] z-20">
              <motion.img 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                src={crow3} 
                alt="Crow 3" 
                className="w-14 sm:w-18 h-auto object-contain filter drop-shadow-md dark:invert dark:brightness-125" 
              />
            </div>

            {/* CROW 4 */}
            <div className="absolute top-[15%] left-[83%] z-19">
              <motion.img 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                src={crow4} 
                alt="Crow 4" 
                className="w-16 sm:w-20 h-auto object-contain filter drop-shadow-md dark:invert dark:brightness-125" 
              />
            </div>

            {/* FLOATING GIRL MAIN ILLUSTRATION */}
            <div className="relative z-10 w-full mt-16 h-full flex items-center justify-center">
              <motion.img 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                src={floatingGirl} 
                alt="Floating Girl Illustration" 
                className="w-full h-auto object-contain filter drop-shadow-xl max-h-[300px] dark:invert dark:brightness-125"
              />
            </div>

            {/* Floating White Geometric Circles */}
            <div className="absolute bottom-[10%] left-[32%] w-8 h-8 rounded-full bg-[#fff6f1] dark:bg-[#003E4D] shadow-md border border-[#003E4D]/10 dark:border-[#fff6f1]/10 z-10" />
            <div className="absolute bottom-[22%] right-[4%] w-16 h-16 rounded-full bg-[#fff6f1] dark:bg-[#003E4D] shadow-lg border border-[#003E4D]/10 dark:border-[#fff6f1]/10 z-0" />
            <div className="absolute bottom-[5%] right-[20%] w-5 h-5 rounded-full bg-[#fff6f1] dark:bg-[#003E4D] shadow-sm border border-[#003E4D]/10 dark:border-[#fff6f1]/10 z-10" />

          </div>
        </motion.div>

        {/* RIGHT COLUMN: Right-Shifted Text & Content Area */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 relative pt-2 lg:pl-12 lg:ml-auto"
        >
          {/* Floating Golden Yellow Accent Circle */}
          <div className="absolute -top-4 left-24 sm:left-36 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#00afc820] -z-10 shadow-lg" />

          {/* Script Italic Serif Subtitle with Automatic Rotating Brand Actions */}
          {currentSlide === 0 ? (
            <RotatingSubtitle />
          ) : (
            <p className="font-montserrat text-base sm:text-lg text-[#003E4D] dark:text-[#fff6f1] mb-1.5 font-normal">
              {slide.subtitle}
            </p>
          )}

          {/* 3-Line Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-5xl font-bold text-[#003E4D] dark:text-[#fff6f1] font-montserrat tracking-tight leading-[1.05] sm:leading-[0.98] mb-4 flex flex-col items-start gap-0.5">
            <span className="text-xl sm:text-3xl lg:text-4xl xl:text-4xl text-[#003E4D] dark:text-[#fff6f1]">
              {slide.titleLine1}
            </span>

            <span className="italic text-[#00afc8] flex flex-col items-start gap-0.5">
              <span>
                {slide.titleLine2}
              </span>
              <span>
                {slide.titleLine3}
              </span>
            </span>
          </h1>

          {/* White underline bar */}
          <div className="w-16 h-1 bg-[#00afc8] dark:bg-[#00afc8] border border-[#00afc8]/20 dark:border-[#00afc8]/20 rounded-full mb-4 shadow-sm" />

          <p className="text-[#003E4D]/80 dark:text-[#fff6f1]/80 text-xs sm:text-sm font-normal leading-relaxed max-w-lg mb-6">
            {slide.desc}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenContact}
              className="px-6 py-3 rounded-lg bg-[#00afc8] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#003E4D] transition-colors shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>See How It Works</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>

      </div>

    </section>
  );
}
