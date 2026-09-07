import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import logoBlack from '../../assets/Prittal_logo_blac.png';
import logoWhite from '../../assets/Prittal_logo.png';


import { Skiper26ThemeToggleButton } from './v1/skiper26';

export default function Navbar({ onOpenContact, onReplayIntro, isDark, onToggleTheme, onNavigate, forcedActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [currentSectionId, setCurrentSectionId] = useState('hero');

  const navLinks = [
    { id: 'hero', name: 'Home', href: '#' },
    { id: 'who-for', name: "Choose Your Stage", href: '#who-for' },
    { id: 'services', name: 'Services', href: '#services' },
    { id: 'work', name: 'Insights', href: '#work' },
    { id: 'about-us', name: 'About Us', href: '/about-us' },
  ];

  const scrollToTarget = (href) => {
    if (href === '/package' || href === '/packages' || href === 'package' || href === 'packages' || href === '#package' || href === '#packages') {
      if (onNavigate) {
        onNavigate('/package');
        return;
      }
      window.history.pushState({ type: 'package' }, '', '/package');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    if (href === '/portfolio' || href === '/portfolio/' || href === 'portfolio' || href === '#portfolio') {
      if (onNavigate) {
        onNavigate('/portfolio');
        return;
      }
      window.history.pushState({ type: 'portfolio' }, '', '/portfolio');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    if (href === '/about-us' || href === '/about' || href === '#about-us' || href === '#about' || href === 'about-us' || href === 'about' || href === '/why-prittal' || href === '#why-prittal' || href === 'why-prittal' || href === 'who-we-are' || href === '/who-we-are') {
      if (onNavigate) {
        onNavigate('/about-us');
        return;
      }
      window.history.pushState({ type: 'about' }, '', '/about-us');
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    if (onNavigate) {
      onNavigate(href);
      return;
    }

    if (!href || href === '#') {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const targetId = href.startsWith('#') ? href.substring(1) : href;
    const el = document.getElementById(targetId);

    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: 0, duration: 1.0 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionTargets = [
        { id: 'hero', navId: 'hero' },
        { id: 'who-for', navId: 'who-for' },
        { id: 'services', navId: 'services' },
        { id: 'work', navId: 'work' },
        { id: 'testimonials', navId: 'about-us' },
        { id: 'final-cta', navId: 'final-cta' },
        { id: 'footer', navId: 'footer' },
      ];

      const navbarY = 80;
      let activeNav = 'hero';
      let currentSec = 'hero';

      for (let i = 0; i < sectionTargets.length; i++) {
        const el = document.getElementById(sectionTargets[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navbarY && rect.bottom >= navbarY) {
            activeNav = sectionTargets[i].navId;
            currentSec = sectionTargets[i].id;
            break;
          }
        }
      }

      setActiveSection(activeNav);
      setCurrentSectionId(currentSec);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    if (window.lenis) {
      window.lenis.on('scroll', handleScroll);
    }

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.lenis && window.lenis.off) {
        window.lenis.off('scroll', handleScroll);
      }
    };
  }, []);

  // Dynamic Navbar Background & Text styles adapting to whichever section is currently under the navbar
  const getHeaderStyles = () => {
    if (currentSectionId === 'final-cta') {
      return {
        bg: 'bg-[#003E4D]',
        text: 'text-[#fff6f1]',
        logo: logoWhite,
        isDarkNavText: true,
      };
    }

    if (currentSectionId === 'footer') {
      return {
        bg: 'bg-[#00afc8]',
        text: 'text-[#fff6f1]',
        logo: logoWhite,
        isDarkNavText: true,
      };
    }

    if (isDark) {
      return {
        bg: 'bg-[#0b0e14]',
        text: 'text-[#fff6f1]',
        logo: logoWhite,
        isDarkNavText: true,
      };
    }

    if (currentSectionId === 'hero') {
      return {
        bg: 'bg-[#f4f4f6]',
        text: 'text-[#003E4D]',
        logo: logoBlack,
        isDarkNavText: false,
      };
    }

    // Default Light Mode Sections (who-for, services, work, testimonials)
    return {
      bg: 'bg-[#F8F8F6]',
      text: 'text-[#003E4D]',
      logo: logoBlack,
      isDarkNavText: false,
    };
  };

  const headerStyle = getHeaderStyles();

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 py-4 transition-all duration-300 ease-in-out ${headerStyle.bg} ${headerStyle.text}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToTarget('#'); }} className="flex items-center gap-2.5 group">
              <img src={headerStyle.logo} alt="Prittal Logo" className="h-7 object-contain transition-opacity duration-300" />
            </a>
          </div>

          {/* Center Navigation Links */}
          <div className={`hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider font-montserrat ${
            headerStyle.isDarkNavText ? 'text-white/80' : 'text-[#1B1B1B]/80'
          }`}>
            {navLinks.map((link) => {
              const currentActive = forcedActiveSection || activeSection;
              const isActive = currentActive === link.id;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget(link.href);
                  }}
                  className={`group relative overflow-hidden inline-block py-1 whitespace-nowrap transition-colors ${
                    isActive
                      ? (headerStyle.isDarkNavText ? 'text-[#fff6f1] font-bold border-b-2 border-[#00afc8]' : 'text-[#003E4D] font-bold border-b-2 border-[#00afc8]')
                      : 'hover:text-[#00afc8]'
                  }`}
                >
                  <span className="block whitespace-nowrap leading-normal transition-transform duration-300 group-hover:-translate-y-[125%]">
                    {link.name}
                  </span>
                  <span className="absolute inset-0 flex items-center whitespace-nowrap leading-normal transition-transform duration-300 translate-y-[125%] group-hover:translate-y-0 text-[#00afc8] font-bold pointer-events-none">
                    {link.name}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Right Action Icons & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Skiper26 Theme Toggle Button with View Transition */}
            <Skiper26ThemeToggleButton isDark={isDark} isDarkNavText={headerStyle.isDarkNavText} onToggle={onToggleTheme} />

            <button
              onClick={onOpenContact}
              className={`px-5 py-2.5 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-1.5 cursor-pointer ${
                currentSectionId === 'footer'
                  ? 'bg-[#fff6f1] text-[#00afc8] hover:bg-[#003E4D] hover:text-[#fff6f1]'
                  : 'bg-[#00afc8] text-white hover:bg-[#003E4D] hover:text-[#fff6f1]'
              }`}
            >
              <span>Book Free Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle & Theme Bulb Button */}
          <div className="md:hidden flex items-center gap-2">
            <Skiper26ThemeToggleButton isDark={isDark} isDarkNavText={headerStyle.isDarkNavText} onToggle={onToggleTheme} />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`p-2 focus:outline-none ${headerStyle.text}`}
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </nav>
      </div>

      {/* Full Screen Mobile Navigation Overlay (#00A9B9 background) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 w-full h-full min-h-screen bg-[#003E4D] text-[#fff6f1] flex flex-col justify-between p-6 sm:p-8 md:hidden overflow-y-auto"
          >
            {/* Top Bar inside Mobile Fullscreen Drawer */}
            <div className="flex items-center justify-between border-b border-[#fff6f1]/20 pb-5">
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                <img src={logoWhite} alt="Prittal Logo" className="h-7 object-contain" />
              </a>

              <div className="flex items-center gap-3">
                <Skiper26ThemeToggleButton isDark={isDark} onToggle={onToggleTheme} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-full bg-[#fff6f1]/10 text-[#fff6f1] hover:bg-[#00afc8] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Middle Nav Links */}
            <div className="py-8 flex flex-col space-y-5">
              {navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    scrollToTarget(link.href);
                  }}
                  className="text-2xl sm:text-3xl font-bold font-montserrat tracking-tight text-[#fff6f1] hover:text-[#00afc8] transition-all flex items-center justify-between group"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>

            {/* Bottom Actions & Call to Action Button */}
            <div className="pt-6 border-t border-[#fff6f1]/20 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-4 rounded-2xl bg-[#00afc8] text-white font-bold text-xs sm:text-sm uppercase tracking-wider font-montserrat shadow-xl hover:bg-[#003E4D] hover:text-[#fff6f1] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>BOOK FREE BRAND AUDIT CALL</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
