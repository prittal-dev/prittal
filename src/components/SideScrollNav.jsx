import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded section ticks matching the fine vertical line stack in screenshot
const sections = [
  { id: 'hero', name: 'Home' },
  { id: 'hero-sub', name: 'Intro Overview' },
  { id: 'who-for', name: "Who It's For" },
  { id: 'stages', name: 'Brand Stages' },
  { id: 'services', name: 'Services Overview' },
  { id: 'services-list', name: 'Capabilities' },
  { id: 'work', name: 'Proven Results' },
  { id: 'case-studies', name: 'Case Studies' },
  { id: 'about-us', name: 'About Us' },
  { id: 'testimonials', name: 'Client Feedback' },
  { id: 'final-cta', name: 'Get Started' }
];

export default function SideScrollNav({ onOpenContact }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only show side navigation rail after scrolling past Hero section (~420px)
      setIsVisible(window.scrollY > 420);

      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const targetId = sections[i].id === 'hero-sub' ? 'hero' : sections[i].id === 'stages' ? 'who-for' : sections[i].id === 'services-list' ? 'services' : sections[i].id === 'case-studies' ? 'work' : sections[i].id === 'testimonials' ? 'why-prittal' : sections[i].id;
        const el = document.getElementById(targetId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (id === 'final-cta' && onOpenContact) {
      onOpenContact();
      return;
    }

    const targetId = id === 'hero-sub' ? 'hero' : id === 'stages' ? 'who-for' : id === 'services-list' ? 'services' : id === 'case-studies' ? 'work' : id === 'testimonials' ? 'why-prittal' : id;

    if (targetId === 'hero' || !targetId) {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: 0, duration: 1.0 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-3 sm:right-5 top-[40%] -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-2.5 select-none pointer-events-auto"
        >
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            const isHovered = hoveredSection === sec.id;

            return (
              <div
                key={sec.id}
                className="relative flex items-center justify-end cursor-pointer group py-0.5"
                onMouseEnter={() => setHoveredSection(sec.id)}
                onMouseLeave={() => setHoveredSection(null)}
                onClick={() => scrollToSection(sec.id)}
              >
                {/* Tooltip Label on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 8, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-8 whitespace-nowrap bg-black/90 text-white px-3 py-1 rounded-md text-xs font-mono tracking-wider font-semibold border border-white/20 shadow-xl flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A9B9] animate-pulse" />
                      <span>{sec.name}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Horizontal Dash Line Tick matching screenshot */}
                <motion.div
                  animate={{
                    width: isActive ? 22 : isHovered ? 18 : 14,
                    height: isActive ? 2.5 : 2,
                    backgroundColor: isActive ? '#ffffff' : isHovered ? '#00A9B9' : 'rgba(100, 100, 100, 0.75)',
                    boxShadow: isActive ? '0 0 10px rgba(255, 255, 255, 0.9), 0 0 4px #00A9B9' : 'none'
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="rounded-sm transition-colors"
                />
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
