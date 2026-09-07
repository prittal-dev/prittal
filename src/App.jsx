import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import LogoSplitIntro from './components/LogoSplitIntro';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhoIsThisForSection from './components/WhoIsThisForSection';
import ServicesSection from './components/ServicesSection';
import WorkSection, { blogPosts } from './components/WorkSection';
import WhyPrittalTestimonials from './components/WhyPrittalTestimonials';
import ContactDrawer from './components/ContactDrawer';
import Footer from './components/Footer';
import SideScrollNav from './components/SideScrollNav';
import BlogPostPage from './components/BlogPostPage';
import ServiceDetailPage from './components/ServiceDetailPage';
import AboutUsPage from './components/AboutUsPage';
import PortfolioApp from './portfolio/PortfolioApp';
import PackageApp from './package/PackageApp';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { servicesData, getServiceById } from './data/servicesData';
import { updateSEOTags, slugify } from './utils/seo';

import { createAnimation, updateTransitionStyles } from './components/v1/skiper26';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState(null);
  const [skipIntro, setSkipIntro] = useState(false);
  const [introKey, setIntroKey] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const version = localStorage.getItem('prittal-theme-default-v2');
      if (!version) {
        localStorage.setItem('prittal-theme', 'dark');
        localStorage.setItem('portfolio-theme', 'dark');
        localStorage.setItem('prittal-theme-default-v2', 'true');
        return true;
      }
      const saved = localStorage.getItem('prittal-theme');
      if (saved === 'light') return false;
      if (saved === 'dark') return true;
    }
    return true;
  });
  const [selectedBlogArticle, setSelectedBlogArticle] = useState(null);
  const [selectedServicePage, setSelectedServicePage] = useState(null);
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [isPortfolioPage, setIsPortfolioPage] = useState(false);
  const [isPackagePage, setIsPackagePage] = useState(false);

  // Ensure dark class is applied to document root on mount & update
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('prittal-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleOpenContact = (serviceName) => {
    if (typeof serviceName === 'string') {
      setSelectedServiceForContact(serviceName);
    } else {
      setSelectedServiceForContact(null);
    }
    setIsContactOpen(true);
  };

  // Detect Mac devices and apply 110% zoom class
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMac = /Mac|Macintosh|MacIntel|MacPPC|Mac68K/i.test(navigator.userAgent) ||
                    (navigator.platform && navigator.platform.indexOf('Mac') >= 0);
      if (isMac) {
        document.documentElement.classList.add('mac-device');
      }
    }
  }, []);

  // Initialize Fast & Ultra-Smooth Lenis Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2.0,
      lerp: 0.12,
    });

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);
    window.lenis = lenis;

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // SEO Route Handlers & Navigation
  const navigateToPackage = (push = true) => {
    setSkipIntro(true);
    setSelectedServicePage(null);
    setSelectedBlogArticle(null);
    setIsAboutPage(false);
    setIsPortfolioPage(false);
    setIsPackagePage(true);
    const path = '/package';

    if (push && typeof window !== 'undefined' && !window.location.pathname.startsWith('/package')) {
      window.history.pushState({ type: 'package' }, '', path);
    }

    updateSEOTags({
      title: 'Packages & Pricing | Prittal Creative Agency',
      description: 'Explore tailored packages for Website Development, SEO, Social Media Marketing, Paid Campaigns, Product Shoots, and Google My Business.',
      path: path,
      type: 'website',
      noIndex: true
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lenis) window.lenis.scrollTo(0, { duration: 0.8 });
  };

  const navigateToPortfolio = (push = true) => {
    setSkipIntro(true);
    setSelectedServicePage(null);
    setSelectedBlogArticle(null);
    setIsAboutPage(false);
    setIsPackagePage(false);
    setIsPortfolioPage(true);
    const path = '/portfolio';

    if (push && typeof window !== 'undefined' && !window.location.pathname.startsWith('/portfolio')) {
      window.history.pushState({ type: 'portfolio' }, '', path);
    }

    updateSEOTags({
      title: 'Our Work & Portfolio | Prittal Creative Agency',
      description: 'Explore our comprehensive portfolio of branding, performance campaigns, video productions, websites, and AI creative solutions for leading brands.',
      path: path,
      type: 'website'
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lenis) window.lenis.scrollTo(0, { duration: 0.8 });
  };

  const navigateToAbout = (push = true) => {
    setSkipIntro(true);
    setSelectedServicePage(null);
    setSelectedBlogArticle(null);
    setIsPortfolioPage(false);
    setIsPackagePage(false);
    setIsAboutPage(true);
    const path = '/about-us';

    if (push && typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({ type: 'about' }, '', path);
    }

    updateSEOTags({
      title: 'Digital Marketing & Brand Growth Solutions in India',
      description: 'Prittal is a brand growth partner delivering strategic branding, and digital marketing solutions for ambitious brands, including Nokia, OYO, Cambridge & Oxford.',
      path: path,
      type: 'website'
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.lenis) window.lenis.scrollTo(0, { duration: 0.8 });
  };

  const navigateToService = (service, push = true) => {
    setSkipIntro(true);
    setSelectedBlogArticle(null);
    setIsAboutPage(false);
    setIsPortfolioPage(false);
    setIsPackagePage(false);
    setSelectedServicePage(service);
    const path = `/services/${service.slug || service.id}`;
    
    if (push && typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({ type: 'service', id: service.id }, '', path);
    } else if (!push && typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.replaceState({ type: 'service', id: service.id }, '', path);
    }

    updateSEOTags({
      title: service.metaTitle || `${service.displayTitle || service.title} Services — Prittal`,
      description: service.metaDescription || service.lede || service.desc,
      path: path,
      type: 'website',
      schemaData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.displayTitle || service.title,
        serviceType: service.badge || service.title,
        provider: {
          '@type': 'Organization',
          name: 'Prittal Creative Agency',
          url: typeof window !== 'undefined' ? window.location.origin : 'https://prittal.com'
        },
        description: service.lede,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Core Capabilities',
          itemListElement: service.capabilities.map(c => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: c.title,
              description: c.desc
            }
          }))
        }
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArticle = (article, push = true) => {
    setSkipIntro(true);
    setSelectedServicePage(null);
    setIsAboutPage(false);
    setIsPortfolioPage(false);
    setIsPackagePage(false);
    setSelectedBlogArticle(article);
    const slug = article.slug || slugify(article.title);
    const path = `/insights/${slug}`;

    if (push && typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState({ type: 'article', id: article.id, slug: slug }, '', path);
    }

    updateSEOTags({
      title: `${article.title} — Prittal Insights`,
      description: article.teaser || article.title,
      path: path,
      type: 'article',
      schemaData: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.teaser,
        author: {
          '@type': 'Organization',
          name: article.author || 'Prittal Strategy Team'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Prittal Creative Agency',
          url: typeof window !== 'undefined' ? window.location.origin : 'https://prittal.com'
        },
        datePublished: '2026-08-01'
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = (href = '#', push = true) => {
    setSkipIntro(true);
    setSelectedServicePage(null);
    setSelectedBlogArticle(null);
    setIsAboutPage(false);
    setIsPortfolioPage(false);
    setIsPackagePage(false);

    if (push && typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.history.pushState(null, '', '/' + (href && href !== '#' && !href.startsWith('/') ? href : ''));
    }

    updateSEOTags({
      title: 'Best Branding Agency in Delhi | Prittal Creative',
      description: 'Looking for the Brand Growth Partner? We craft powerful brand identities & strategies that drive growth. For Nokia, OYO, CAMBRIDGE OXFORD',
      path: '/'
    });

    setTimeout(() => {
      if (!href || href === '#' || href === '#hero') {
        if (window.lenis) window.lenis.scrollTo(0, { duration: 0.8 });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetId = href.startsWith('#') ? href.substring(1) : href;
      const el = document.getElementById(targetId);
      if (el) {
        if (window.lenis) window.lenis.scrollTo(el, { offset: 0, duration: 0.8 });
        else el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
  };

  const handleGlobalNavigation = (href) => {
    if (
      href === '/portfolio' ||
      href === '/portfolio/' ||
      href === '#portfolio' ||
      href === 'portfolio' ||
      href.startsWith('/portfolio')
    ) {
      navigateToPortfolio(true);
      return;
    }
    if (
      href === '/about-us' ||
      href === '/about' ||
      href === '#about-us' ||
      href === '#about' ||
      href === 'about-us' ||
      href === 'about' ||
      href === 'who-we-are' ||
      href === '/who-we-are' ||
      href === 'why-prittal' ||
      href === '/why-prittal' ||
      href === '#why-prittal'
    ) {
      navigateToAbout(true);
      return;
    }
    if (
      href === '/package' ||
      href === '/packages' ||
      href === '/package/' ||
      href === '/packages/' ||
      href === 'package' ||
      href === 'packages' ||
      href === '#package' ||
      href === '#packages' ||
      href.startsWith('/package')
    ) {
      navigateToPackage(true);
      return;
    }
    navigateToHome(href, true);
  };

  // Synchronize router state with browser URL & handle Back/Forward buttons
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const syncRoute = (isInitial = false) => {
      // 1. Sanitize query parameters (Prittal uses clean REST paths only)
      const hasQuery = Boolean(typeof window !== 'undefined' && window.location.search);
      if (hasQuery) {
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState(window.history.state, '', cleanUrl);
      }

      const pathname = window.location.pathname.replace(/\/+/g, '/');
      const hash = window.location.hash;

      // Handle /portfolio route
      if (
        pathname === '/portfolio' ||
        pathname.startsWith('/portfolio/') ||
        pathname.startsWith('/portfolio')
      ) {
        navigateToPortfolio(false);
        return;
      }

      // Handle /package or /packages route
      if (
        pathname === '/package' ||
        pathname === '/packages' ||
        pathname.startsWith('/package/') ||
        pathname.startsWith('/packages/') ||
        pathname.startsWith('/package')
      ) {
        navigateToPackage(false);
        return;
      }

      // Handle /about-us, /about, /why-prittal or /who-we-are route
      if (
        pathname === '/about-us' ||
        pathname === '/about' ||
        pathname === '/why-prittal' ||
        pathname === '/who-we-are' ||
        pathname.startsWith('/about-us/') ||
        pathname.startsWith('/about/')
      ) {
        navigateToAbout(false);
        return;
      }

      // Handle /services/:slug route
      if (pathname.startsWith('/services/')) {
        const slug = pathname.replace('/services/', '').replace(/\/$/, '');
        const found = getServiceById(slug);
        if (found) {
          navigateToService(found, false);
          return;
        }
      }

      // Handle /insights/:slug or /blog/:slug route (matches heading slug or legacy id)
      if (pathname.startsWith('/insights/') || pathname.startsWith('/blog/')) {
        const identifier = pathname.replace('/insights/', '').replace('/blog/', '').replace(/\/$/, '');
        const found = blogPosts.find(
          b => (b.slug && b.slug.toLowerCase() === identifier.toLowerCase()) ||
               (b.title && slugify(b.title) === identifier.toLowerCase()) ||
               b.id.toLowerCase() === identifier.toLowerCase()
        );
        if (found) {
          navigateToArticle(found, false);
          return;
        }
      }

      // Unrecognized path (e.g. /hiroshi or /item) -> normalize URL to clean root
      const isUnrecognized = (pathname !== '/' && pathname !== '');
      if (isUnrecognized) {
        window.history.replaceState(null, '', '/');
      }

      // Default to Home
      setSelectedServicePage(null);
      setSelectedBlogArticle(null);
      setIsAboutPage(false);
      setIsPortfolioPage(false);
      setIsPackagePage(false);

      updateSEOTags({
        title: 'Best Branding Agency in Delhi | Prittal Creative',
        description: 'Looking for the Brand Growth Partner? We craft powerful brand identities & strategies that drive growth. For Nokia, OYO, CAMBRIDGE OXFORD',
        path: '/',
        noIndex: isUnrecognized || hasQuery
      });

      if (isInitial && hash) {
        setTimeout(() => {
          const el = document.getElementById(hash.substring(1));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      }
    };

    syncRoute(true);

    const onPopState = () => syncRoute(false);
    window.addEventListener('popstate', onPopState);

    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    try {
      const anim = createAnimation("polygon", "top-left", true);
      updateTransitionStyles(anim.css);
    } catch (e) {
      // Graceful fallback if animations are unavailable
    }

    const applySwitch = () => {
      setIsDark(nextDark);
      const root = document.documentElement;
      if (nextDark) {
        root.classList.add('dark');
        root.classList.remove('light');
        root.setAttribute('data-theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.setAttribute('data-theme', 'light');
      }
      localStorage.setItem('prittal-theme', nextDark ? 'dark' : 'light');
      localStorage.setItem('portfolio-theme', nextDark ? 'dark' : 'light');
    };

    if (typeof document !== 'undefined' && document.startViewTransition) {
      try {
        document.startViewTransition(applySwitch);
      } catch (e) {
        applySwitch();
      }
    } else {
      applySwitch();
    }
  };

  const handleReplayIntro = () => {
    setSelectedBlogArticle(null);
    setSelectedServicePage(null);
    setIsAboutPage(false);
    setIsPortfolioPage(false);
    setIsPackagePage(false);
    setSkipIntro(false);
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIntroKey(prev => prev + 1);
  };

  const handleSkipIntro = () => {
    setSkipIntro(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // If Package page is selected, show full page Package view
  if (isPackagePage) {
    return (
      <PackageApp
        onNavigateHome={() => navigateToHome('#', true)}
        onNavigate={handleGlobalNavigation}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
    );
  }

  // If Portfolio page is selected, show full page Portfolio view
  if (isPortfolioPage) {
    return (
      <PortfolioApp
        onNavigateHome={() => navigateToHome('#', true)}
        isDarkTheme={isDark}
      />
    );
  }

  // If About Us page is selected, show full page About Us view
  if (isAboutPage) {
    return (
      <>
        <AboutUsPage
          onBack={() => navigateToHome('#', true)}
          onNavigate={handleGlobalNavigation}
          onOpenContact={(serviceName) => handleOpenContact(serviceName)}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
        <ContactDrawer
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          initialService={selectedServiceForContact}
          isDark={isDark}
        />
        <FloatingWhatsApp onOpenContact={handleOpenContact} />
      </>
    );
  }

  // If a dedicated service page is selected, show full page service view with clean URL
  if (selectedServicePage) {
    return (
      <>
        <ServiceDetailPage
          service={selectedServicePage}
          onSelectService={(newService) => navigateToService(newService, true)}
          onNavigate={handleGlobalNavigation}
          onBack={() => navigateToHome('#services', true)}
          onOpenContact={(serviceName) => handleOpenContact(serviceName)}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
        <ContactDrawer
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          initialService={selectedServiceForContact}
          isDark={isDark}
        />
        <FloatingWhatsApp onOpenContact={handleOpenContact} />
      </>
    );
  }

  // If a blog article is selected, show full page blog article view with clean URL
  if (selectedBlogArticle) {
    return (
      <>
        <BlogPostPage
          article={selectedBlogArticle}
          allArticles={blogPosts}
          onSelectArticle={(newArticle) => navigateToArticle(newArticle, true)}
          onNavigate={handleGlobalNavigation}
          onBack={() => navigateToHome('#work', true)}
          onOpenContact={() => setIsContactOpen(true)}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
        <ContactDrawer
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          initialService={selectedServiceForContact}
          isDark={isDark}
        />
        <FloatingWhatsApp onOpenContact={handleOpenContact} />
      </>
    );
  }

  const AgencyWebsiteContent = (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-[#00afc8] selection:text-[#fff6f1] font-montserrat relative transition-colors duration-300 ${
      isDark ? 'bg-black text-[#fff6f1]' : 'bg-[#F8F8F6] text-[#003E4D]'
    }`}>
      <Navbar
        onOpenContact={(serviceName) => handleOpenContact(serviceName)}
        onReplayIntro={handleReplayIntro}
        onNavigate={handleGlobalNavigation}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Floating Right-Side Navigation Rail */}
      <SideScrollNav onOpenContact={(serviceName) => handleOpenContact(serviceName)} />

      <main className="flex-1 relative lg:snap-container">
        {/* FOLD 1: Editorial Hero Section */}
        <HeroSection
          onOpenContact={(serviceName) => handleOpenContact(serviceName)}
          onExploreWork={() => {
            const el = document.getElementById('work');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* FOLD 2: Social Proof + "Who Is This For" Situation Cards */}
        <WhoIsThisForSection
          onOpenContact={(serviceName) => handleOpenContact(serviceName)}
          onExploreWork={() => {
            const el = document.getElementById('work');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* FOLD 3: Services Overview (6 Service Cards) */}
        <ServicesSection
          onOpenContact={(serviceName) => handleOpenContact(serviceName)}
          onSelectService={(service) => navigateToService(service, true)}
        />

        {/* FOLD 4: Impact Numbers + Blog & Insights Showcase */}
        <WorkSection
          onOpenContact={(serviceName) => handleOpenContact(serviceName)}
          onSelectArticle={(article) => navigateToArticle(article, true)}
        />

        {/* FOLD 5: Why Prittal */}
        <WhyPrittalTestimonials
          onOpenContact={(serviceName) => handleOpenContact(serviceName)}
        />

      </main>

      <Footer
        onOpenContact={(serviceName) => handleOpenContact(serviceName)}
        onReplayIntro={handleReplayIntro}
        onNavigate={handleGlobalNavigation}
      />

      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialService={selectedServiceForContact}
        isDark={isDark}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp onOpenContact={handleOpenContact} />
    </div>
  );

  if (skipIntro) {
    return AgencyWebsiteContent;
  }

  return (
    <LogoSplitIntro
      key={introKey}
      onSkipIntro={handleSkipIntro}
    >
      {AgencyWebsiteContent}
    </LogoSplitIntro>
  );
}
