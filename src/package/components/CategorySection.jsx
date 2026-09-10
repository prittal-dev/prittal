import React, { useState, useEffect } from 'react';
import { FeatureCheck } from './FeatureCheck';
import { CustomBuilderDrawer } from './CustomBuilderDrawer';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowUpRight, 
  Table, 
  LayoutGrid, 
  HelpCircle, 
  Check, 
  X, 
  Sparkles, 
  Sliders, 
  Plus, 
  Minus,
  Settings,
  Wrench
} from 'lucide-react';

export const CategorySection = ({
  category,
  onSelectTier,
  onOpenConsultation,
}) => {
  const { isDark } = useTheme();
  // Use 3 primary tiers for standard cards (exclude generic 'custom' tier to avoid duplication with Card 4)
  const primaryTiers = category.tiers.filter((t) => t.id !== 'custom').slice(0, 3);
  
  const [selectedTierId, setSelectedTierId] = useState(
    primaryTiers.find((t) => t.isPopular)?.id || primaryTiers[0].id
  );
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'comparison'
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Manage background scroll lock and Lenis lifecycle when Custom Builder drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Track open state of accordion feature groups in comparison table
  const [openGroups, setOpenGroups] = useState(() => {
    const initialState = {};
    category.featureGroups.forEach((g) => {
      initialState[g.groupName] = true;
    });
    return initialState;
  });

  // Track custom feature toggles (default ALL UNSELECTED)
  const [customToggles, setCustomToggles] = useState(() => {
    const initial = {};
    category.featureGroups.forEach((group) => {
      group.features.forEach((feat, idx) => {
        initial[`${group.groupName}-${idx}`] = false;
      });
    });
    return initial;
  });

  // Helper to detect if a feature is truly quantitative (e.g. Products, Keywords, Posts, Photos, Videos, etc.)
  const isQuantityFeature = (nameInput) => {
    const lower = (typeof nameInput === 'string' ? nameInput : nameInput?.name || '').toLowerCase();
    
    // Explicitly exclude binary setup / verification / integration / guidance / maintenance features
    if (
      lower.includes('setup') ||
      lower.includes('verification') ||
      lower.includes('verify') ||
      lower.includes('info') ||
      lower.includes('integration') ||
      lower.includes('guidance') ||
      lower.includes('research') ||
      lower.includes('management') ||
      lower.includes('optim') ||
      lower.includes('submiss') ||
      lower.includes('creation') ||
      lower.includes('building') ||
      lower.includes('retouch') ||
      lower.includes('editing') ||
      lower.includes('removal') ||
      lower.includes('rights') ||
      lower.includes('files') ||
      lower.includes('time')
    ) {
      return false;
    }

    return (
      lower.includes('keywords covered') ||
      lower.includes('photos per product') ||
      lower.includes('creative posts') ||
      lower.includes('ai reels') ||
      lower.includes('stories per week') ||
      lower.includes('carousel per month') ||
      lower.includes('highlight designs') ||
      lower.includes('ad designs per month') ||
      lower.includes('products upload') ||
      lower.includes('short product video') ||
      lower.includes('blog per month') ||
      lower.includes('ad types')
    );
  };

  const isFrequencyFeature = (nameInput) => {
    const lower = (typeof nameInput === 'string' ? nameInput : nameInput?.name || '').toLowerCase();
    return lower.includes('report') || lower.includes('frequency') || lower.includes('turnaround');
  };

  const isPlatformFeature = (nameInput) => {
    const lower = (typeof nameInput === 'string' ? nameInput : nameInput?.name || '').toLowerCase();
    return lower.includes('platform');
  };

  const [selectedPlatforms, setSelectedPlatforms] = useState(() => {
    const initial = {};
    category.featureGroups.forEach((group) => {
      group.features.forEach((feat, idx) => {
        const key = `${group.groupName}-${idx}`;
        initial[key] = ['Facebook', 'Instagram', 'LinkedIn'];
      });
    });
    return initial;
  });

  const togglePlatform = (key, platformName) => {
    setSelectedPlatforms((prev) => {
      const current = prev[key] || ['Facebook', 'Instagram', 'LinkedIn'];
      const updated = current.includes(platformName)
        ? current.filter((p) => p !== platformName)
        : [...current, platformName];
      return { ...prev, [key]: updated };
    });
  };

  const [featureFrequencies, setFeatureFrequencies] = useState(() => {
    const initial = {};
    category.featureGroups.forEach((group) => {
      group.features.forEach((feat, idx) => {
        const key = `${group.groupName}-${idx}`;
        initial[key] = 'Monthly';
      });
    });
    return initial;
  });

  // Helper to extract initial default count (1 to 25) from feature definition
  const getInitialQuantity = (feature) => {
    for (const val of Object.values(feature.values)) {
      if (typeof val === 'string') {
        const match = val.match(/\d+/);
        if (match) {
          const parsed = parseInt(match[0], 10);
          return Math.min(25, Math.max(1, parsed));
        }
      }
    }
    return 5;
  };

  // Track custom quantities (1 to 25) for each feature
  const [featureQuantities, setFeatureQuantities] = useState(() => {
    const initial = {};
    category.featureGroups.forEach((group) => {
      group.features.forEach((feat, idx) => {
        const key = `${group.groupName}-${idx}`;
        initial[key] = getInitialQuantity(feat);
      });
    });
    return initial;
  });

  const handleFeatureQuantityChange = (featureKey, val) => {
    if (val === '') {
      setFeatureQuantities((prev) => ({ ...prev, [featureKey]: '' }));
      return;
    }
    const num = Math.min(999, Math.max(1, Number(val) || 1));
    setFeatureQuantities((prev) => ({ ...prev, [featureKey]: num }));
  };

  const handleToggleFeature = (key) => {
    setCustomToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleGroup = (groupName) => {
    setOpenGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }));
  };

  const filteredGroups = category.featureGroups;

  const [userBudget, setUserBudget] = useState('');
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' or 'annual' (default to annual)

  // Helper to ensure any price or currency string follows the Indian Numbering System (e.g. ₹1,80,000 instead of ₹180,000)
  const formatIndianPrice = (text) => {
    if (!text || typeof text !== 'string') return text;
    return text.replace(/₹\s*([0-9,]+)/g, (match, numStr) => {
      const rawNumber = Number(numStr.replace(/,/g, ''));
      if (!isNaN(rawNumber)) {
        return `₹${rawNumber.toLocaleString('en-IN')}`;
      }
      return match;
    });
  };

  // Helper for dynamic category-specific annual discount badges (Percentage format: SAVE 20%)
  const getCategoryMaxSavings = (categoryId) => {
    return 'SAVE 20%';
  };

  // Helper to determine pricing display per tier (Monthly vs Annual)
  const getTierPriceInfo = (tier, categoryId) => {
    if (tier.id === 'custom') {
      return { isCustom: true, priceText: 'Custom quote', subtitle: 'TAILORED TO YOUR SCOPE', period: '', originalPriceText: null, savingsText: null };
    }
    
    // Monthly prices map (Indian Standard Numbering)
    const monthlyPrices = {
      websites: { basic: '₹25,000', standard: '₹50,000', premium: '₹1,00,000' },
      seo: { starter: '₹15,000', standard: '₹30,000', business: '₹50,000' },
      'paid-campaigns': { 'pc-starter': '₹10,000', 'pc-standard': '₹25,000', 'pc-business': '₹1,00,000' },
      paid_campaigns: { 'pc-starter': '₹10,000', 'pc-standard': '₹25,000', 'pc-business': '₹1,00,000' },
      'social-media': { basic: '₹20,000', standard: '₹40,000', premium: '₹50,000' },
      social_media: { basic: '₹20,000', standard: '₹40,000', premium: '₹50,000' },
      'product-shoots': { basic: '₹10,000', standard: '₹20,000', premium: '₹50,000' },
      product_shoot: { basic: '₹10,000', standard: '₹20,000', premium: '₹50,000' },
      'google-my-business': { starter: '₹10,000', business: '₹25,000' },
      google_my_business: { starter: '₹10,000', business: '₹25,000' }
    };

    // Annual prices map (with discount, original strikethrough & green savings offer in percentage)
    const annualPricesInfo = {
      seo: {
        starter: { price: '₹1,50,000', original: '₹1,80,000', savings: 'Save 20% with offer' },
        standard: { price: '₹3,00,000', original: '₹3,60,000', savings: 'Save 20% with offer' },
        business: { price: '₹5,00,000', original: '₹6,00,000', savings: 'Save 20% with offer' },
      },
      'social-media': {
        basic: { price: '₹1,80,000', original: '₹2,40,000', savings: 'Save 25% with offer' },
        standard: { price: '₹3,20,000', original: '₹4,80,000', savings: 'Save 33% with offer' },
        premium: { price: '₹4,99,000', original: '₹6,00,000', savings: 'Save 20% with offer' },
      },
      social_media: {
        basic: { price: '₹1,80,000', original: '₹2,40,000', savings: 'Save 25% with offer' },
        standard: { price: '₹3,20,000', original: '₹4,80,000', savings: 'Save 33% with offer' },
        premium: { price: '₹4,99,000', original: '₹6,00,000', savings: 'Save 20% with offer' },
      },
      'paid-campaigns': {
        'pc-starter': { price: '₹1,00,000', original: '₹1,20,000', savings: 'Save 20% with offer' },
        'pc-standard': { price: '₹2,50,000', original: '₹3,00,000', savings: 'Save 20% with offer' },
        'pc-business': { price: '₹10,00,000', original: '₹12,00,000', savings: 'Save 20% with offer' },
      },
      paid_campaigns: {
        'pc-starter': { price: '₹1,00,000', original: '₹1,20,000', savings: 'Save 20% with offer' },
        'pc-standard': { price: '₹2,50,000', original: '₹3,00,000', savings: 'Save 20% with offer' },
        'pc-business': { price: '₹10,00,000', original: '₹12,00,000', savings: 'Save 20% with offer' },
      }
    };

    const isOneTime = categoryId === 'websites' || categoryId === 'product-shoots' || categoryId === 'product_shoot' || categoryId === 'google-my-business' || categoryId === 'google_my_business';

    if (isOneTime) {
      const catPrices = monthlyPrices[categoryId] || { basic: '₹10,000', standard: '₹20,000', premium: '₹50,000', starter: '₹10,000', business: '₹25,000' };
      const rawPrice = catPrices[tier.id] || (tier.id === 'business' ? '₹25,000' : '₹10,000');
      return { 
        isCustom: false, 
        priceText: formatIndianPrice(rawPrice), 
        originalPriceText: null, 
        subtitle: categoryId === 'websites' ? 'ONE-TIME PRICE (+ GST)' : 'PACKAGE PRICE (+ GST)', 
        period: '', 
        savingsText: null 
      };
    }

    if (billingCycle === 'annual') {
      const catAnnual = annualPricesInfo[categoryId] || {};
      const info = catAnnual[tier.id] || { price: '₹1,50,000', original: '₹1,80,000', savings: 'Save up to ₹30,000 with offer' };
      return {
        isCustom: false,
        priceText: formatIndianPrice(info.price),
        originalPriceText: formatIndianPrice(info.original),
        subtitle: 'for one year',
        period: '/yr',
        savingsText: formatIndianPrice(info.savings)
      };
    } else {
      const catPrices = monthlyPrices[categoryId] || { basic: '₹15,000', standard: '₹30,000', business: '₹50,000' };
      const rawPrice = catPrices[tier.id] || '₹15,000';
      return {
        isCustom: false,
        priceText: formatIndianPrice(rawPrice),
        originalPriceText: null,
        subtitle: 'MONTHLY PRICE (+ GST)',
        period: '/month',
        savingsText: null
      };
    }
  };

  const activeTogglesCount = Object.values(customToggles).filter(Boolean).length;

  const handleSelectTier = (tier) => {
    const priceInfo = getTierPriceInfo(tier, category.id);
    onSelectTier(category.title, tier.name, {
      categoryId: category.id,
      categoryTitle: category.title,
      categorySubtitle: category.subtitle,
      tierId: tier.id,
      tierName: tier.name,
      billingCycle: billingCycle,
      priceInfo: priceInfo,
      priceText: priceInfo.priceText,
      isCustom: false
    });
  };

  return (
    <section
      id={category.id}
      className={`pt-16 sm:pt-20 pb-28 sm:pb-36 border-b scroll-mt-36 sm:scroll-mt-44 relative overflow-visible transition-colors ${
        isDark ? 'bg-black text-white border-slate-800' : 'bg-white text-slate-900 border-slate-200'
      }`}
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 relative z-10">
        {/* Category Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto"
        >
          <h2 className={`text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {category.title}
          </h2>

          <p className="text-xs sm:text-base font-bold text-[#11b1d0] mb-2">
            {category.subtitle}
          </p>

          <p className={`text-xs sm:text-sm font-medium px-2 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {category.tagline}
          </p>

          {/* Monthly / Annual Billing Toggle Switch with Framer Motion Spring Pill */}
          {!(category.id === 'websites' || category.id === 'product-shoots' || category.id === 'product_shoot' || category.id === 'google-my-business' || category.id === 'google_my_business') && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 select-none">
              {/* Left Label: Monthly Pricing */}
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`text-xs sm:text-sm font-extrabold transition-colors cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'text-[#11b1d0]'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Monthly Pricing
              </button>

              {/* Center Track: [ Monthly | Annual ] with Framer Motion layoutId pill */}
              <div className={`relative inline-flex items-center p-1 rounded-full border shadow-inner ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200/80 border-slate-300/60'
              }`}>
                {/* Monthly Button */}
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`relative z-10 px-4 sm:px-5 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 ${
                    billingCycle === 'monthly'
                      ? (isDark ? 'text-[#11b1d0]' : 'text-[#0f8da7]')
                      : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                  }`}
                >
                  {billingCycle === 'monthly' && (
                    <motion.div
                      layoutId={`billingCyclePill-${category.id}`}
                      className={`absolute inset-0 rounded-full shadow-md ${
                        isDark ? 'bg-[#0c121e] border border-[#11b1d0]/30' : 'bg-white border border-slate-200'
                      }`}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">Monthly</span>
                </button>

                {/* Annual Button */}
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`relative z-10 px-4 sm:px-5 py-1.5 rounded-full text-xs font-bold transition-colors duration-200 ${
                    billingCycle === 'annual'
                      ? (isDark ? 'text-[#11b1d0]' : 'text-[#0f8da7]')
                      : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                  }`}
                >
                  {billingCycle === 'annual' && (
                    <motion.div
                      layoutId={`billingCyclePill-${category.id}`}
                      className={`absolute inset-0 rounded-full shadow-md ${
                        isDark ? 'bg-[#0c121e] border border-[#11b1d0]/30' : 'bg-white border border-slate-200'
                      }`}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">Annual</span>
                </button>
              </div>

              {/* Right Label: Annual Pricing & Dynamic Savings Badge ("SAVE UP TO ₹1,60,000") */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`text-xs sm:text-sm font-extrabold transition-colors cursor-pointer ${
                    billingCycle === 'annual'
                      ? 'text-[#11b1d0]'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  Annual Pricing
                </button>

                {/* Dynamic Category Savings Badge */}
                {billingCycle === 'annual' && (
                  <motion.button
                    type="button"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    onClick={() => setBillingCycle('annual')}
                    className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase bg-emerald-500/15 text-emerald-400 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-500/30 shadow-sm cursor-pointer hover:scale-105 transition-all duration-300 flex items-center gap-1.5"
                  >
                    <span>{getCategoryMaxSavings(category.id)}</span>
                  </motion.button>
                )}
              </div>
            </div>
          )}

          {/* Mobile Only: Custom Builder Launcher Button */}
          <div className="md:hidden mt-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-[#11b1d0] text-white shadow-md shadow-[#11b1d0]/20"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>CUSTOM BUILDER </span>
            </button>
          </div>
        </motion.div>

        {/* Tier Selector Bar & Controls (Desktop Only) */}
        <div className={`hidden md:flex mb-12 sm:mb-16 flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 p-2 sm:p-3 rounded-2xl border shadow-sm w-full mx-auto overflow-hidden ${
          isDark ? 'bg-[#0c121e]/90 border-[#11b1d0]/20' : 'bg-white border-slate-200'
        }`}>
          {/* Interactive Package Selector Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar w-full md:w-auto px-2 py-1 flex-nowrap">
            {primaryTiers.map((tier) => {
              const isSelected = tier.id === selectedTierId && viewMode === 'cards';
              return (
                <button
                  key={tier.id}
                  onClick={() => {
                    setSelectedTierId(tier.id);
                    setViewMode('cards');
                  }}
                  className={`relative flex-shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#11b1d0] text-white shadow-md shadow-[#11b1d0]/20'
                      : isDark
                        ? 'text-slate-400 hover:text-white hover:bg-white/5 bg-slate-900/50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-slate-50'
                  }`}
                >
                  <span>{tier.name}</span>
                  {tier.isPopular && !isSelected && (
                    <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-[#11b1d0] inline-block animate-pulse"></span>
                  )}
                </button>
              );
            })}
            
            {/* 4th Chip: CUSTOM BUILDER (Triggers Drawer) */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex-shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-extrabold uppercase tracking-wider bg-[#11b1d0]/15 dark:bg-[#11b1d0]/20 text-[#11b1d0] border border-[#11b1d0]/40 hover:bg-[#11b1d0] hover:text-white transition-all duration-300 flex items-center space-x-1.5 shadow-sm"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>CUSTOM BUILDER </span>
            </button>
          </div>

          {/* View Toggle (Cards vs Comparison Matrix) */}
          <div className={`flex items-center space-x-3 w-full md:w-auto justify-center md:justify-end border-t md:border-t-0 pt-2.5 md:pt-0 ${
            isDark ? 'border-slate-800/60' : 'border-slate-200/50'
          }`}>
            <div className={`inline-flex p-1 rounded-xl border ${
              isDark ? 'bg-[#131b2c] border-[#11b1d0]/20' : 'bg-slate-50 border-slate-200'
            }`}>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  viewMode === 'cards'
                    ? 'bg-[#11b1d0] text-white shadow-sm'
                    : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Cards</span>
              </button>

              <button
                onClick={() => setViewMode('comparison')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  viewMode === 'comparison'
                    ? 'bg-[#11b1d0] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Comparison</span>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE RESPONSIVE: 3 Stacked Horizontal "Sleeping Rectangle" Cards Per Section */}
        {viewMode === 'cards' && (
          <div className="md:hidden flex flex-col gap-5 w-full mx-auto [perspective:1200px]">
            {primaryTiers.map((tier, idx) => {
            const priceInfo = getTierPriceInfo(tier, category.id);
            return (
              <motion.div
                key={`${tier.id}-${billingCycle}`}
                initial={{ rotateY: billingCycle === 'annual' ? -90 : 90, opacity: 0.5 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.35, 
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: idx * 0.04
                }}
                onClick={() => setSelectedTierId(tier.id)}
                className={`rounded-2xl p-5 sm:p-6 flex flex-col justify-between relative transition-shadow border [backface-visibility:hidden] [transform-style:preserve-3d] ${
                  isDark
                    ? tier.isPopular
                      ? 'bg-[#0c121e] border-2 border-[#11b1d0] ring-1 ring-[#11b1d0]/50 shadow-xl'
                      : 'bg-[#0c121e] border-slate-800/80 shadow-md'
                    : tier.isPopular
                      ? 'bg-white border-2 border-[#11b1d0] ring-1 ring-[#11b1d0]/50 shadow-xl'
                      : 'bg-white border-slate-200 shadow-md'
                }`}
                style={{ backgroundColor: isDark ? '#0c121e' : '#ffffff' }}
              >
                {/* Most Popular Badge */}
                {tier.isPopular && (
                  <div className="absolute -top-3.5 right-4 px-3.5 py-1 rounded-full text-[10px] font-black tracking-widest bg-[#11b1d0] text-white uppercase shadow-md flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>MOST POPULAR</span>
                  </div>
                )}

                {/* Top Header Row: Name & Tagline */}
                <div className="mb-3">
                  <h3 className={`text-2xl font-black tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {tier.name}
                  </h3>
                  <p className={`text-xs font-medium mt-0.5 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {tier.tagline}
                  </p>
                </div>

                {/* Price Section Block */}
                <div className={`p-3.5 rounded-xl mb-3 flex flex-wrap items-center justify-between gap-2 ${
                  isDark ? 'bg-[#131b2c] border border-slate-800' : 'bg-slate-50 border border-slate-200'
                }`}>
                  <div>
                    <div className="flex items-baseline space-x-1.5 flex-wrap">
                      {priceInfo.originalPriceText && (
                        <span className="text-xs font-bold text-slate-400 line-through">
                          {priceInfo.originalPriceText}
                        </span>
                      )}
                      <span className="text-xl sm:text-2xl font-black text-[#11b1d0]">
                        {priceInfo.priceText}
                      </span>
                      {priceInfo.period && (
                        <span className="text-xs font-bold text-[#11b1d0]">{priceInfo.period}</span>
                      )}
                    </div>
                    <div className={`text-[10px] font-bold ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {priceInfo.subtitle}
                    </div>
                  </div>

                  {priceInfo.savingsText && (
                    <div className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                      isDark ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                    }`}>
                      {priceInfo.savingsText}
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className={`my-3 pt-3 border-t ${
                  isDark ? 'border-slate-800/80' : 'border-slate-100'
                }`}>
                  {(() => {
                    const includedList = [];
                    const additionalList = [];

                    category.featureGroups.forEach((group) => {
                      group.features.forEach((feature) => {
                        const val = feature.values[tier.id];
                        if (val === false || val === '-' || val === undefined) return;
                        if (typeof val === 'string' && val.startsWith('₹')) {
                          additionalList.push({ name: feature.name, price: val });
                        } else {
                          includedList.push({ name: feature.name, val });
                        }
                      });
                    });

                    return (
                      <div className="space-y-3">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                            Included in Plan:
                          </div>
                          <ul className="space-y-2 text-xs">
                            {includedList.map((item, idx) => (
                              <li key={idx} className={`flex items-center space-x-2 font-semibold ${
                                isDark ? 'text-slate-200' : 'text-slate-800'
                              }`}>
                                <Check className="w-4 h-4 text-[#11b1d0] flex-shrink-0" />
                                <span>
                                  {item.name}
                                  {typeof item.val === 'string' && item.val !== 'true' && (
                                    <span className={`ml-1 font-extrabold ${
                                      isDark ? 'text-white' : 'text-slate-900'
                                    }`}>({item.val})</span>
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {additionalList.length > 0 ? (
                          <div className={`pt-2.5 mt-2.5 border-t border-dashed ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                            <div className="text-[10px] font-black uppercase tracking-wider text-[#11b1d0] mb-1.5 flex items-center gap-1">
                              <Plus className="w-3 h-3 stroke-[2.5]" />
                              <span>Additional Services (Add-ons):</span>
                            </div>
                            <ul className="space-y-1.5 text-xs">
                              {additionalList.map((item, idx) => (
                                <li key={idx} className="flex items-center justify-between">
                                  <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#11b1d0]/60 flex-shrink-0" />
                                    {item.name}
                                  </span>
                                  <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] font-mono ${
                                    isDark ? 'bg-[#11b1d0]/10 text-[#11b1d0]' : 'bg-slate-100 text-[#0f8da7]'
                                  }`}>
                                    {item.price}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="pt-2 mt-2 border-t border-emerald-500/20 flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>All Services Included</span>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* CTA Quote Button */}
                <div className="pt-2 mt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTier(tier);
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-black tracking-wide uppercase transition-all flex items-center justify-center space-x-1.5 ${
                      tier.isPopular
                        ? 'bg-[#11b1d0] text-white shadow-md'
                        : isDark
                          ? 'bg-white/10 hover:bg-[#11b1d0] text-white border border-white/10 hover:border-[#11b1d0]'
                          : 'bg-slate-900 hover:bg-[#11b1d0] text-white border border-slate-900 hover:border-[#11b1d0]'
                    }`}
                  >
                    <span>Get Started</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
        )}

        {/* 3 CARDS GRID (Desktop Only: BASIC | STANDARD | PREMIUM) */}
        {viewMode === 'cards' && (
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 w-full mx-auto gap-6 sm:gap-8 [perspective:1200px]">
            {/* Standard Tier Cards (BASIC, STANDARD, PREMIUM) */}
            {primaryTiers.map((tier, idx) => {
              const priceInfo = getTierPriceInfo(tier, category.id);

              return (
                <motion.div
                  key={`${tier.id}-${billingCycle}`}
                  initial={{ rotateY: billingCycle === 'annual' ? -90 : 90, opacity: 0.5 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.35, 
                    ease: [0.2, 0.8, 0.2, 1],
                    delay: idx * 0.04
                  }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`cursor-pointer rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 flex flex-col justify-between relative transition-all duration-300 [backface-visibility:hidden] [transform-style:preserve-3d] ${
                    isDark
                      ? tier.isPopular
                        ? 'bg-[#0c121e] border-2 border-[#11b1d0] ring-1 ring-[#11b1d0]/50 shadow-2xl shadow-[#11b1d0]/20 sm:scale-[1.02] z-10'
                        : 'bg-[#0c121e] border border-[#11b1d0]/25 hover:border-[#11b1d0]/60 shadow-lg hover:shadow-xl'
                      : tier.isPopular
                        ? 'bg-white border-2 border-[#11b1d0] ring-1 ring-[#11b1d0]/50 shadow-2xl shadow-[#11b1d0]/15 sm:scale-[1.02] z-10'
                        : 'bg-white border border-slate-200 hover:border-[#11b1d0] shadow-lg hover:shadow-xl'
                  }`}
                  style={{ backgroundColor: isDark ? '#0c121e' : '#ffffff' }}
                >
                  {/* Most Popular Top Pill Badge */}
                  {tier.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-black tracking-widest bg-[#11b1d0] text-white uppercase shadow-lg flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>MOST POPULAR</span>
                    </div>
                  )}

                  <div>
                    {/* Tier Name */}
                    <h3 className={`text-3xl sm:text-4xl font-black tracking-tight mb-2 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {tier.name}
                    </h3>
                    
                    {/* Tagline / Subtitle */}
                    <p className={`text-sm font-medium leading-relaxed mb-6 min-h-[40px] ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {tier.tagline}
                    </p>

                    {/* Price Section matching screenshot */}
                    <div className="mb-6 min-h-[76px] flex flex-col justify-center text-center sm:text-left">
                      {priceInfo.isCustom ? (
                        <div>
                          <div className="text-2xl sm:text-3xl font-extrabold text-[#11b1d0]">
                            {priceInfo.priceText}
                          </div>
                          <div className="text-xs uppercase tracking-wider font-bold text-[#11b1d0]/90 mt-1">
                            {priceInfo.subtitle}
                          </div>
                        </div>
                      ) : (
                        <div>
                          {/* Price row with strikethrough original price if available */}
                          <div className="flex items-baseline space-x-2 justify-center sm:justify-start">
                            {priceInfo.originalPriceText && (
                              <span className="text-lg sm:text-xl font-bold text-slate-400 line-through tracking-tight">
                                {priceInfo.originalPriceText}
                              </span>
                            )}
                            <span className={`text-2xl sm:text-4xl font-black tracking-tight ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}>
                              {priceInfo.priceText}
                            </span>
                            {priceInfo.period && (
                              <span className={`text-sm font-extrabold ${
                                isDark ? 'text-slate-300' : 'text-slate-600'
                              }`}>
                                {priceInfo.period}
                              </span>
                            )}
                          </div>

                          {/* Subtitle ("for one year" / "MONTHLY PRICE (+ GST)") */}
                          <div className={`text-xs font-bold mt-0.5 ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {priceInfo.subtitle}
                          </div>

                          {/* Green Savings Offer ("Save up to ₹30,000 with offer") */}
                          {priceInfo.savingsText && (
                            <div className={`text-xs sm:text-sm font-bold mt-1 flex items-center justify-center sm:justify-start space-x-1 ${
                              isDark ? 'text-emerald-400' : 'text-emerald-600'
                            }`}>
                              <span>{priceInfo.savingsText}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Inclusions & Additional Services */}
                    {(() => {
                      const includedList = [];
                      const additionalList = [];

                      category.featureGroups.forEach((group) => {
                        group.features.forEach((feature) => {
                          const val = feature.values[tier.id];
                          if (val === false || val === '-' || val === undefined) return;
                          if (typeof val === 'string' && val.startsWith('₹')) {
                            additionalList.push({ name: feature.name, price: val });
                          } else {
                            includedList.push({ name: feature.name, val });
                          }
                        });
                      });

                      return (
                        <div className="space-y-4 mb-8">
                          {/* Included In Plan */}
                          <div className="space-y-2.5">
                            <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400">
                              Included in Plan:
                            </div>
                            <ul className="space-y-3 text-sm">
                              {includedList.map((item, idx) => (
                                <li key={idx} className="flex items-start space-x-2.5">
                                  <Check className="w-5 h-5 text-[#11b1d0] flex-shrink-0 mt-0.5" />
                                  <span className={`font-semibold leading-relaxed ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                                    {item.name}
                                    {typeof item.val === 'string' && item.val !== 'true' && (
                                      <span className={`ml-1 font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        ({item.val})
                                      </span>
                                    )}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Additional Services (Optional Add-ons) */}
                          {additionalList.length > 0 ? (
                            <div className={`pt-3.5 mt-3.5 border-t border-dashed ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                              <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#11b1d0] mb-2.5 flex items-center gap-1.5">
                                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Additional Services (Add-ons):</span>
                              </div>
                              <ul className="space-y-2 text-xs sm:text-sm">
                                {additionalList.map((item, idx) => (
                                  <li key={idx} className="flex items-center justify-between gap-2">
                                    <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#11b1d0]/60 flex-shrink-0" />
                                      {item.name}
                                    </span>
                                    <span className={`font-bold px-2 py-0.5 rounded text-[11px] font-mono whitespace-nowrap ${
                                      isDark ? 'bg-[#11b1d0]/10 text-[#11b1d0]' : 'bg-slate-100 text-[#0f8da7]'
                                    }`}>
                                      {item.price}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <div className={`pt-3 mt-3 border-t ${isDark ? 'border-emerald-500/20' : 'border-emerald-500/30'} flex items-center gap-2 text-emerald-500 dark:text-emerald-400 text-xs font-extrabold`}>
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>All Services Included in Plan</span>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTier(tier);
                      }}
                      className={`w-full py-4 px-6 rounded-2xl text-sm font-black tracking-wide uppercase transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                        tier.isPopular
                          ? 'bg-[#11b1d0] hover:bg-[#0fa1be] text-white shadow-xl shadow-[#11b1d0]/25'
                          : isDark
                            ? 'bg-white/10 hover:bg-[#11b1d0] text-white border border-white/10 hover:border-[#11b1d0]'
                            : 'bg-slate-900 hover:bg-[#11b1d0] text-white border border-slate-900 hover:border-[#11b1d0]'
                      }`}
                    >
                      <span>Get Started</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* COMPARISON MATRIX (Responsive Toggleable) */}
        {viewMode === 'comparison' && (
          <div 
            className={`overflow-hidden rounded-2xl sm:rounded-3xl border backdrop-blur-xl shadow-2xl transition-all w-full mx-auto ${
              isDark ? 'border-[#11b1d0]/20 bg-[#0c121e]/95' : 'border-slate-200 bg-white/90'
            }`}
            style={{ backgroundColor: isDark ? '#0c121e' : '#ffffff' }}
          >
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse min-w-[760px] sm:min-w-[920px]">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-white/10 bg-[#111927]' : 'border-slate-200 bg-slate-100/90'}`}>
                    <th className={`py-4 sm:py-5 px-4 sm:px-6 font-extrabold text-xs uppercase tracking-widest w-1/3 ${
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      Service Features
                    </th>
                    {primaryTiers.map((tier) => {
                      const isSelected = tier.id === selectedTierId;
                      const priceInfo = getTierPriceInfo(tier, category.id);
                      return (
                        <th
                          key={tier.id}
                          className={`py-4 sm:py-5 px-3 sm:px-4 text-center transition-all ${
                            isSelected
                              ? 'bg-[#11b1d0]/10 text-[#11b1d0] border-x border-[#11b1d0]/30'
                              : isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          <div className="text-xs sm:text-sm font-extrabold tracking-wider">{tier.name}</div>

                          {/* Price Display in Comparison Mode */}
                          <div className="mt-2 min-h-[58px] flex flex-col items-center justify-center">
                            {priceInfo.isCustom ? (
                              <div className="text-sm sm:text-base font-extrabold text-[#11b1d0]">
                                {priceInfo.priceText}
                              </div>
                            ) : (
                              <>
                                {priceInfo.originalPriceText && (
                                  <span className="text-[11px] font-semibold text-slate-400 line-through">
                                    {priceInfo.originalPriceText}
                                  </span>
                                )}
                                <div className="flex items-baseline justify-center space-x-1">
                                  <span className={`text-base sm:text-xl font-black tracking-tight ${
                                    isDark ? 'text-white' : 'text-slate-900'
                                  }`}>
                                    {priceInfo.priceText}
                                  </span>
                                  {priceInfo.period && (
                                    <span className={`text-[11px] font-bold ${
                                      isDark ? 'text-slate-300' : 'text-slate-600'
                                    }`}>
                                      {priceInfo.period}
                                    </span>
                                  )}
                                </div>
                                {priceInfo.subtitle && (
                                  <div className={`text-[10px] font-bold mt-0.5 ${
                                    isDark ? 'text-slate-400' : 'text-slate-500'
                                  }`}>
                                    {priceInfo.subtitle}
                                  </div>
                                )}
                                {priceInfo.savingsText && (
                                  <div className={`text-[10px] font-bold mt-0.5 ${
                                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                                  }`}>
                                    {priceInfo.savingsText}
                                  </div>
                                )}
                              </>
                            )}
                          </div>

                          <button
                            onClick={() => handleSelectTier(tier)}
                            className={`mt-2.5 inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider transition-all duration-200 ${
                              isSelected
                                ? 'bg-[#11b1d0] text-white shadow-md'
                                : isDark
                                  ? 'bg-white/10 text-white hover:bg-[#11b1d0] hover:text-white border border-white/10'
                                  : 'bg-slate-900 text-white hover:bg-[#11b1d0] hover:text-white'
                            }`}
                          >
                            Select
                          </button>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody className={`divide-y text-xs sm:text-sm font-medium ${isDark ? 'divide-white/10' : 'divide-slate-200/60'}`}>
                  {filteredGroups.map((group) => {
                    const isOpen = openGroups[group.groupName] ?? true;
                    return (
                      <React.Fragment key={group.groupName}>
                        <tr
                          onClick={() => toggleGroup(group.groupName)}
                          className={`cursor-pointer transition-colors select-none ${
                            isDark ? 'bg-[#111927] hover:bg-[#152032]' : 'bg-slate-100/90 hover:bg-slate-200/70'
                          }`}
                        >
                          <td
                            colSpan={primaryTiers.length + 1}
                            className="py-3 px-4 sm:px-6"
                          >
                            <div className="flex items-center justify-between">
                              <span className={`font-extrabold text-[11px] sm:text-xs tracking-widest uppercase flex items-center space-x-2 ${
                                isDark ? 'text-white' : 'text-slate-900'
                              }`}>
                                <span>{group.groupName}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#11b1d0]/20 text-[#11b1d0] font-bold">
                                  {group.features.length} items
                                </span>
                              </span>
                              <div className="text-slate-400">
                                {isOpen ? <ChevronUp className="w-4 h-4 text-[#11b1d0]" /> : <ChevronDown className="w-4 h-4 text-[#11b1d0]" />}
                              </div>
                            </div>
                          </td>
                        </tr>

                        {isOpen &&
                          group.features.map((feature, featureIdx) => {
                            return (
                              <tr
                                key={featureIdx}
                                className={`transition-colors ${
                                  isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50/80'
                                } ${
                                  feature.isHighlight ? 'bg-[#11b1d0]/5' : ''
                                }`}
                              >
                                <td className={`py-3.5 px-4 sm:px-6 font-semibold ${
                                  isDark ? 'text-slate-200' : 'text-slate-800'
                                }`}>
                                  <div className="flex items-center space-x-2">
                                    <span>{feature.name}</span>
                                    {feature.tooltip && (
                                      <span className="text-slate-400 hover:text-[#11b1d0] transition-colors" title={feature.tooltip}>
                                        <HelpCircle className="w-3.5 h-3.5" />
                                      </span>
                                    )}
                                  </div>
                                </td>
                                {primaryTiers.map((tier) => {
                                  const val = feature.values[tier.id];
                                  const isSelectedCol = tier.id === selectedTierId;
                                  return (
                                    <td
                                      key={tier.id}
                                      className={`py-3.5 px-3 sm:px-4 text-center transition-colors ${
                                        isSelectedCol
                                          ? 'bg-[#11b1d0]/10 border-x border-[#11b1d0]/20'
                                          : ''
                                      }`}
                                    >
                                      <FeatureCheck val={val} accent={isSelectedCol} />
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                      </React.Fragment>
                    );
                  })}
                </tbody>

                <tfoot>
                  <tr className={`border-t ${isDark ? 'border-white/10 bg-[#111927]' : 'border-slate-200 bg-slate-100/90'}`}>
                    <td className="py-4 px-4 sm:px-6 font-extrabold text-xs uppercase tracking-wider">
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Price</span>
                    </td>
                    {primaryTiers.map((tier) => {
                      const isSelected = tier.id === selectedTierId;
                      const priceInfo = getTierPriceInfo(tier, category.id);
                      return (
                        <td
                          key={tier.id}
                          className={`py-4 px-3 sm:px-4 text-center transition-all ${
                            isSelected
                              ? 'bg-[#11b1d0]/10 border-x border-[#11b1d0]/30'
                              : ''
                          }`}
                        >
                          <div className="flex flex-col items-center justify-center">
                            {priceInfo.originalPriceText && (
                              <span className="text-[10px] text-slate-400 line-through">
                                {priceInfo.originalPriceText}
                              </span>
                            )}
                            <div className="flex items-baseline space-x-1">
                              <span className={`text-base font-black ${
                                isDark ? 'text-white' : 'text-slate-900'
                              }`}>
                                {priceInfo.priceText}
                              </span>
                              {priceInfo.period && (
                                <span className={`text-[10px] font-bold ${
                                  isDark ? 'text-slate-400' : 'text-slate-500'
                                }`}>
                                  {priceInfo.period}
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => handleSelectTier(tier)}
                              className={`mt-2 inline-flex items-center justify-center px-3.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider transition-all duration-200 ${
                                isSelected
                                  ? 'bg-[#11b1d0] text-white shadow-md'
                                  : isDark
                                    ? 'bg-white/10 text-white hover:bg-[#11b1d0] hover:text-white border border-white/10'
                                    : 'bg-slate-900 text-white hover:bg-[#11b1d0] hover:text-white'
                              }`}
                            >
                              Select
                            </button>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* INTERACTIVE SLIDE-OUT CUSTOM BUILDER DRAWER */}
      <CustomBuilderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        category={category}
        billingCycle={billingCycle}
        onSelectTier={onSelectTier}
      />
    </section>
  );
};
