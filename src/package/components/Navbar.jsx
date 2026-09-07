import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logoBlack from '../../../assets/Prittal_logo_blac.png';
import logoWhite from '../../../assets/Prittal_logo.png';
import { Skiper26ThemeToggleButton } from '../../components/v1/skiper26';

export const Navbar = ({ onStartProject, onNavigateHome, onOpenContact }) => {
  const { isDark, toggleTheme } = useTheme();

  const handleAction = () => {
    if (onStartProject) {
      onStartProject();
    } else if (onOpenContact) {
      onOpenContact();
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const headerBg = isDark ? 'bg-[#0b0e14]' : 'bg-[#F8F8F6]';
  const headerText = isDark ? 'text-[#fff6f1]' : 'text-[#003E4D]';
  const logo = isDark ? logoWhite : logoBlack;

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 py-4 transition-all duration-300 ease-in-out ${headerBg} ${headerText} border-b ${
        isDark ? 'border-white/10' : 'border-black/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <img
                src={logo}
                alt="Prittal Logo"
                className="h-7 object-contain transition-opacity duration-300 group-hover:opacity-90"
              />
            </a>
          </div>

          {/* Right Action Controls: Skiper26 Theme Lightbulb Toggle & Book Free Audit CTA (No center navigation links) */}
          <div className="flex items-center gap-3">
            {/* Skiper26 Theme Toggle Button with animated lightbulb */}
            <Skiper26ThemeToggleButton
              isDark={isDark}
              isDarkNavText={isDark}
              onToggle={toggleTheme}
            />

            {/* Book Free Audit CTA Button */}
            <button
              onClick={handleAction}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-1.5 cursor-pointer bg-[#00afc8] text-white hover:bg-[#003E4D] hover:text-[#fff6f1]"
            >
              <span>Book Free Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
