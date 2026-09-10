import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Skiper26ThemeToggleButton } from '../../components/v1/skiper26';
import logoBlack from '../../../assets/Prittal_logo_blac.png';
import logoWhite from '../../../assets/Prittal_logo.png';

export default function Header({
  activeTab,
  setActiveTab,
  navigateTo,
  theme,
  toggleTheme,
  currentPage,
  activeAccordion,
  onOpenProjectModal,
  onNavigateHome
}) {
  const isLight = theme === 'light';

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (setActiveTab) setActiveTab('home');
    if (navigateTo) {
      navigateTo('home');
    } else if (onNavigateHome) {
      onNavigateHome();
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 py-3 sm:py-3.5 transition-all duration-300 ease-in-out font-montserrat ${
      isLight 
        ? 'bg-[#F8F8F6]/90 text-[#003E4D] border-b border-black/5 backdrop-blur-md' 
        : 'bg-[#0b0e14]/90 text-[#fff6f1] border-b border-white/10 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-2">
          
          {/* Portfolio Brand Logo */}
          <div className="flex items-center">
            <a 
              href="#"
              onClick={handleLogoClick} 
              className="flex items-center cursor-pointer"
            >
              <img 
                src={isLight ? logoBlack : logoWhite} 
                alt="Prittal Portfolio" 
                className="h-7 sm:h-8 w-auto object-contain transition-all duration-300" 
              />
            </a>
          </div>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">
            {/* Return to Main Website Link */}
            <a
              href="/"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
              className={`hidden md:flex text-xs font-bold font-montserrat tracking-wider items-center gap-1 transition-colors ${
                isLight ? 'text-slate-600 hover:text-[#00afc8]' : 'text-slate-300 hover:text-[#00afc8]'
              }`}
            >
              <span>Prittal.com</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Theme Toggle Button matching main website navbar */}
            <div className="shrink-0">
              <Skiper26ThemeToggleButton
                isDark={!isLight}
                isDarkNavText={false}
                onToggle={toggleTheme}
              />
            </div>

            {/* Start Project CTA Button */}
            <button
              onClick={() => {
                if (onOpenProjectModal) onOpenProjectModal();
              }}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold font-montserrat uppercase tracking-wider bg-[#00afc8] text-white hover:bg-[#003E4D] hover:text-[#fff6f1] transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-1 sm:gap-1.5 shrink-0"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </nav>
      </div>
    </header>
  );
}


