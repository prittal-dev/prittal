import React, { useState, useEffect } from 'react';
import './portfolio.css';
import Header from './components/Header';
import Home from './pages/Home';
import Services from './pages/Services';
import PortfolioArchive from './pages/PortfolioArchive';

import ServiceBranding from './pages/ServiceBranding';
import ServiceWebsites from './pages/ServiceWebsites';
import ServiceAiCreative from './pages/ServiceAiCreative';
import ServiceContent from './pages/ServiceContent';
import ServiceGrowth from './pages/ServiceGrowth';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import ProjectInquiryModal from './components/ProjectInquiryModal';
import { createAnimation, updateTransitionStyles } from '../components/v1/skiper26';

const VALID_PORTFOLIO_PAGES = [
  'home',
  '',
  'services-page',
  'portfolio-archive',
  'service-branding',
  'service-websites',
  'service-ai-creative',
  'service-content',
  'service-growth'
];

export default function PortfolioApp({ onNavigateHome, onNavigate, isDarkTheme = true }) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      return VALID_PORTFOLIO_PAGES.includes(hash) ? (hash || 'home') : 'home';
    }
    return 'home';
  });
  const [activeTab, setActiveTab] = useState('home');
  const [activeAccordion, setActiveAccordion] = useState('01');
  const [portfolioFilter, setPortfolioFilter] = useState('AI Video');

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const version = localStorage.getItem('prittal-theme-default-v4');
      if (!version) {
        localStorage.setItem('portfolio-theme', 'dark');
        localStorage.setItem('prittal-theme', 'dark');
        localStorage.setItem('prittal-theme-default-v4', 'true');
        return 'dark';
      }
      const saved = localStorage.getItem('portfolio-theme') || localStorage.getItem('prittal-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return isDarkTheme ? 'dark' : 'light';
  });

  useEffect(() => {
    if (isDarkTheme !== undefined) {
      setTheme(isDarkTheme ? 'dark' : 'light');
    }
  }, [isDarkTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('prittal-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const page = hash || 'home';
      if (!VALID_PORTFOLIO_PAGES.includes(page)) {
        if (onNavigate) {
          onNavigate('/404');
        }
        return;
      }
      setCurrentPage(page);
      if (page === 'services-page' || page.startsWith('service-')) {
        setActiveTab('services');
      } else if (page === 'portfolio-archive') {
        setActiveTab('work');
      } else if (page === 'home') {
        setActiveTab('home');
      } else {
        setActiveTab('');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [onNavigate]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const anim = createAnimation("polygon", "top-left", true);
    updateTransitionStyles(anim.css);

    const applySwitch = () => {
      setTheme(nextTheme);
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', nextTheme);
        if (nextTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    if (typeof document !== 'undefined' && document.startViewTransition) {
      document.startViewTransition(applySwitch);
    } else {
      applySwitch();
    }
  };

  const navigateTo = (pageName, filter = null) => {
    if (pageName.startsWith('http')) {
      window.open(pageName, '_blank', 'noopener,noreferrer');
      return;
    }
    if (filter) {
      setPortfolioFilter(filter);
    }
    setCurrentPage(pageName);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/portfolio#/${pageName}`);
    }
    if (pageName === 'services-page' || pageName.startsWith('service-')) {
      setActiveTab('services');
    } else if (pageName === 'portfolio-archive') {
      setActiveTab('work');
    } else if (pageName === 'home') {
      setActiveTab('home');
    } else {
      setActiveTab('');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  };

  return (
    <div className="page-container portfolio-root-container" data-theme={theme}>
      {/* HEADER */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigateTo={navigateTo}
        theme={theme}
        toggleTheme={toggleTheme}
        currentPage={currentPage}
        activeAccordion={activeAccordion}
        onOpenProjectModal={() => setIsProjectModalOpen(true)}
        onNavigateHome={onNavigateHome}
      />

      {currentPage === 'home' && (
        <Home
          setActiveTab={setActiveTab}
          navigateTo={navigateTo}
          onOpenProjectModal={() => setIsProjectModalOpen(true)}
        />
      )}

      {currentPage === 'services-page' && (
        <Services
          setActiveTab={setActiveTab}
          navigateTo={navigateTo}
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
          onOpenProjectModal={() => setIsProjectModalOpen(true)}
        />
      )}

      {currentPage === 'portfolio-archive' && (
        <PortfolioArchive
          setActiveTab={setActiveTab}
          navigateTo={navigateTo}
          activeFilter={portfolioFilter}
          setActiveFilter={setPortfolioFilter}
          onOpenProjectModal={() => setIsProjectModalOpen(true)}
        />
      )}

      {currentPage === 'service-branding' && (
        <ServiceBranding
          setActiveTab={setActiveTab}
          navigateTo={navigateTo}
          onOpenProjectModal={() => setIsProjectModalOpen(true)}
        />
      )}

      {currentPage === 'service-websites' && (
        <ServiceWebsites
          setActiveTab={setActiveTab}
          navigateTo={navigateTo}
          onOpenProjectModal={() => setIsProjectModalOpen(true)}
        />
      )}

      {currentPage === 'service-ai-creative' && (
        <ServiceAiCreative
          setActiveTab={setActiveTab}
          navigateTo={navigateTo}
          onOpenProjectModal={() => setIsProjectModalOpen(true)}
        />
      )}

      {currentPage === 'service-content' && (
        <ServiceContent
          setActiveTab={setActiveTab}
          navigateTo={navigateTo}
          onOpenProjectModal={() => setIsProjectModalOpen(true)}
        />
      )}

      {currentPage === 'service-growth' && (
        <ServiceGrowth
          setActiveTab={setActiveTab}
          navigateTo={navigateTo}
          onOpenProjectModal={() => setIsProjectModalOpen(true)}
        />
      )}

      {/* FLOATING WHATSAPP / QUICK CONNECT WIDGET */}
      <FloatingWhatsApp
        onOpenContact={() => setIsProjectModalOpen(true)}
      />

      {/* START A PROJECT INQUIRY MODAL */}
      <ProjectInquiryModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        isDark={theme === 'dark'}
        onNavigate={onNavigate}
      />
    </div>
  );
}
