import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  X, 
  Check, 
  Plus, 
  Minus, 
  Wrench, 
  ArrowUpRight, 
  Sparkles,
  Sliders
} from 'lucide-react';

export const CustomBuilderDrawer = ({
  isOpen,
  onClose,
  category,
  billingCycle = 'monthly',
  onSelectTier,
  onSubmitCustomScope,
}) => {
  const { isDark } = useTheme();

  // Scroll Lock & Lenis Lifecycle Management
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  // Track custom feature toggles (default ALL UNSELECTED or initialized per category)
  const [customToggles, setCustomToggles] = useState(() => {
    const initial = {};
    if (category?.featureGroups) {
      category.featureGroups.forEach((group) => {
        group.features.forEach((feat, idx) => {
          initial[`${group.groupName}-${idx}`] = false;
        });
      });
    }
    return initial;
  });

  // Re-sync toggles if category changes
  useEffect(() => {
    if (category?.featureGroups) {
      setCustomToggles((prev) => {
        const next = { ...prev };
        category.featureGroups.forEach((group) => {
          group.features.forEach((feat, idx) => {
            const key = `${group.groupName}-${idx}`;
            if (next[key] === undefined) {
              next[key] = false;
            }
          });
        });
        return next;
      });
    }
  }, [category]);

  // Detect if feature is quantitative
  const isQuantityFeature = (nameInput) => {
    const lower = (typeof nameInput === 'string' ? nameInput : nameInput?.name || '').toLowerCase();
    
    // Exclude binary setup/verification/integration/retouching
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
      lower.includes('products covered') ||
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

  // Helper to extract initial default count
  const getInitialQuantity = (feature) => {
    if (!feature?.values) return 5;
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

  // Quantitative numbers map
  const [featureQuantities, setFeatureQuantities] = useState({});

  const handleFeatureQuantityChange = (featureKey, val) => {
    if (val === '') {
      setFeatureQuantities((prev) => ({ ...prev, [featureKey]: '' }));
      return;
    }
    const num = Math.min(999, Math.max(1, Number(val) || 1));
    setFeatureQuantities((prev) => ({ ...prev, [featureKey]: num }));
  };

  // Frequency cadence map
  const [featureFrequencies, setFeatureFrequencies] = useState({});

  const getDefaultPlatformsForPreset = (tierScope) => {
    if (tierScope === 'basic') {
      return ['Facebook', 'Instagram'];
    }
    if (tierScope === 'premium') {
      return ['Facebook', 'Instagram', 'LinkedIn', 'X (Twitter)', 'YouTube'];
    }
    return ['Facebook', 'Instagram', 'LinkedIn', 'X (Twitter)'];
  };

  // Target platforms map
  const [selectedPlatforms, setSelectedPlatforms] = useState({});

  const togglePlatform = (key, platformName) => {
    setSelectedPlatforms((prev) => {
      const current = prev[key] || getDefaultPlatformsForPreset(activePreset);
      const updated = current.includes(platformName)
        ? current.filter((p) => p !== platformName)
        : [...current, platformName];
      return { ...prev, [key]: updated };
    });
  };

  const handleToggleFeature = (key) => {
    setCustomToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [activePreset, setActivePreset] = useState('standard');

  const getPresetPrice = (cat, tierScope, cycle) => {
    const catId = (cat?.id || '').toLowerCase();
    const isOneTime = catId === 'websites' || catId === 'product-shoots' || catId === 'product_shoot' || catId === 'google-my-business' || catId === 'google_my_business';

    const monthlyPrices = {
      websites: { basic: 25000, standard: 50000, premium: 100000 },
      seo: { basic: 15000, standard: 30000, premium: 50000 },
      'paid-campaigns': { basic: 10000, standard: 25000, premium: 100000 },
      paid_campaigns: { basic: 10000, standard: 25000, premium: 100000 },
      'social-media': { basic: 20000, standard: 40000, premium: 50000 },
      social_media: { basic: 20000, standard: 40000, premium: 50000 },
      'product-shoots': { basic: 10000, standard: 20000, premium: 50000 },
      product_shoot: { basic: 10000, standard: 20000, premium: 50000 },
      'google-my-business': { basic: 10000, standard: 25000, premium: 25000 },
      google_my_business: { basic: 10000, standard: 25000, premium: 25000 }
    };

    const annualPrices = {
      seo: { basic: 150000, standard: 300000, premium: 500000 },
      'social-media': { basic: 180000, standard: 320000, premium: 499000 },
      social_media: { basic: 180000, standard: 320000, premium: 499000 },
      'paid-campaigns': { basic: 100000, standard: 250000, premium: 1000000 },
      paid_campaigns: { basic: 100000, standard: 250000, premium: 1000000 }
    };

    if (isOneTime || cycle !== 'annual') {
      const prices = monthlyPrices[catId] || {};
      return prices[tierScope] || (tierScope === 'basic' ? 20000 : tierScope === 'premium' ? 50000 : 40000);
    } else {
      const prices = annualPrices[catId] || {};
      return prices[tierScope] || (tierScope === 'basic' ? 180000 : tierScope === 'premium' ? 499000 : 320000);
    }
  };

  const getTierValue = (feature, tierScope) => {
    if (!feature?.values) return undefined;
    const v = feature.values;
    if (tierScope === 'basic') {
      return v['basic'] !== undefined ? v['basic'] : v['starter'] !== undefined ? v['starter'] : v['pc-starter'];
    }
    if (tierScope === 'standard') {
      return v['standard'] !== undefined ? v['standard'] : v['pc-standard'];
    }
    if (tierScope === 'premium') {
      return v['premium'] !== undefined ? v['premium'] : v['business'] !== undefined ? v['business'] : v['pc-business'];
    }
    return undefined;
  };

  // Preset Scope Handlers
  const handleApplyPresetScope = (tierScope) => {
    if (!category?.featureGroups) return;
    setActivePreset(tierScope);

    const newToggles = {};
    const newQuantities = {};
    const newPlatforms = {};

    const defaultPlats = getDefaultPlatformsForPreset(tierScope);

    category.featureGroups.forEach((group) => {
      group.features.forEach((feat, idx) => {
        const key = `${group.groupName}-${idx}`;
        const val = getTierValue(feat, tierScope);
        const isIncluded = Boolean(val && val !== '-' && val !== false && val !== 'false');
        newToggles[key] = isIncluded;

        if (isIncluded) {
          if (isPlatformFeature(feat.name)) {
            newPlatforms[key] = defaultPlats;
          }
          if (typeof val === 'string') {
            const match = val.match(/\d+/);
            if (match) {
              newQuantities[key] = parseInt(match[0], 10);
            }
            if (val === '2') {
              newPlatforms[key] = ['Facebook', 'Instagram'];
            } else if (val === '4') {
              newPlatforms[key] = ['Facebook', 'Instagram', 'LinkedIn', 'X (Twitter)'];
            } else if (val === '5') {
              newPlatforms[key] = ['Facebook', 'Instagram', 'LinkedIn', 'X (Twitter)', 'YouTube'];
            }
          }
        }
      });
    });

    setCustomToggles(newToggles);
    setFeatureQuantities((prev) => ({ ...prev, ...newQuantities }));
    setSelectedPlatforms(newPlatforms);

    const price = getPresetPrice(category, tierScope, billingCycle);
    setUserBudget(String(price));
  };

  // Auto-initialize preset scope when drawer is opened or category changes
  useEffect(() => {
    if (isOpen && category?.featureGroups) {
      handleApplyPresetScope(activePreset);
    }
  }, [isOpen, category]);

  // Budget & GST State
  const [userBudget, setUserBudget] = useState('');

  // Indian currency formatting
  const formatIndianNumber = (num) => {
    const raw = Number(num);
    if (isNaN(raw)) return '0';
    return raw.toLocaleString('en-IN');
  };

  const activeTogglesCount = useMemo(() => {
    return Object.values(customToggles).filter(Boolean).length;
  }, [customToggles]);

  // Submission handler
  const handleHandoff = () => {
    onClose();

    // Compile active deliverables
    const activeDetails = [];
    if (category?.featureGroups) {
      category.featureGroups.forEach((group) => {
        group.features.forEach((feat, idx) => {
          const featKey = `${group.groupName}-${idx}`;
          if (customToggles[featKey]) {
            let detail = feat.name;
            if (isQuantityFeature(feat.name)) {
              const qty = featureQuantities[featKey] || getInitialQuantity(feat);
              detail += ` (${qty})`;
            }
            if (isFrequencyFeature(feat.name)) {
              const freq = featureFrequencies[featKey] || 'Monthly';
              detail += ` [${freq}]`;
            }
            if (isPlatformFeature(feat.name)) {
              const plats = selectedPlatforms[featKey] || ['Facebook', 'Instagram'];
              detail += ` {${plats.join(', ')}}`;
            }
            activeDetails.push(detail);
          }
        });
      });
    }

    const budgetNum = Number(userBudget);
    const defaultBase = billingCycle === 'annual' ? 150000 : 25000;
    const baseAmount = budgetNum > 0 ? budgetNum : defaultBase;
    const totalAmount = baseAmount + Math.round(baseAmount * 0.18);

    const budgetSummary = budgetNum > 0
      ? ` | Budget: ₹${formatIndianNumber(budgetNum)} + 18% GST = Total ₹${formatIndianNumber(totalAmount)}`
      : '';

    const compiledScopeString = `CUSTOM BUILD (${activeTogglesCount} Services Included: ${activeDetails.join(', ')}${budgetSummary})`;

    if (onSubmitCustomScope) {
      onSubmitCustomScope({
        categoryTitle: category?.title,
        activeCount: activeTogglesCount,
        activeDetails,
        userBudget: budgetNum > 0 ? budgetNum : null,
        totalWithGst: totalAmount,
        billingCycle: billingCycle,
        summaryString: compiledScopeString
      });
    } else if (onSelectTier) {
      onSelectTier(category?.title, compiledScopeString, {
        categoryId: category?.id,
        categoryTitle: category?.title,
        categorySubtitle: category?.subtitle,
        tierId: 'custom',
        tierName: 'CUSTOM BUILD',
        billingCycle: billingCycle,
        priceText: `₹${formatIndianNumber(baseAmount)}`,
        activeDetails,
        activeCount: activeTogglesCount,
        userBudget: budgetNum > 0 ? budgetNum : null,
        totalWithGst: totalAmount,
        isCustom: true,
        customSummary: activeDetails.join(', ')
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-end ${isDark ? 'dark' : ''}`}
        >
          {/* Overlay backdrop click to close */}
          <div
            className="fixed inset-0 cursor-pointer"
            onClick={onClose}
          />

          {/* Slide-out Panel container */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className={`relative z-10 w-full max-w-xl h-full shadow-2xl flex flex-col border-l font-sans transition-colors overflow-hidden ${
              isDark ? 'bg-[#0c121e] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            style={{ backgroundColor: isDark ? '#0c121e' : '#ffffff' }}
          >
            {/* 1. Drawer Header (Fixed at top) */}
            <div className="flex-shrink-0 p-5 sm:p-7 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest bg-[#11b1d0] text-white uppercase shadow-sm mb-1.5">
                    <Wrench className="w-3 h-3" />
                    <span>CUSTOM PACKAGE BUILDER</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {category?.title || 'Service'} Customizer
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Select exact quantities and toggle deliverables on/off to design your tailored scope.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  style={{ backgroundColor: isDark ? '#1e293b' : '#f1f5f9' }}
                  aria-label="Close custom builder drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 2. Preset Quick Selectors */}
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 w-full sm:w-auto mr-1">
                  Preset Scope:
                </span>
                <button
                  type="button"
                  onClick={() => handleApplyPresetScope('basic')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                    activePreset === 'basic'
                      ? 'bg-[#11b1d0] text-white border-[#11b1d0] shadow-md'
                      : isDark
                        ? 'border-slate-700 text-slate-200 hover:bg-[#11b1d0] hover:text-white'
                        : 'border-slate-200 text-slate-700 hover:bg-[#11b1d0] hover:text-white'
                  }`}
                  style={activePreset !== 'basic' ? { backgroundColor: isDark ? '#1e293b' : '#f1f5f9' } : {}}
                >
                  Basic Scope
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyPresetScope('standard')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                    activePreset === 'standard'
                      ? 'bg-[#11b1d0] text-white border-[#11b1d0] shadow-md'
                      : isDark
                        ? 'border-slate-700 text-slate-200 hover:bg-[#11b1d0] hover:text-white'
                        : 'border-slate-200 text-slate-700 hover:bg-[#11b1d0] hover:text-white'
                  }`}
                  style={activePreset !== 'standard' ? { backgroundColor: isDark ? '#1e293b' : '#f1f5f9' } : {}}
                >
                  Standard Scope
                </button>

                <button
                  type="button"
                  onClick={() => handleApplyPresetScope('premium')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                    activePreset === 'premium'
                      ? 'bg-[#11b1d0] text-white border-[#11b1d0] shadow-md'
                      : isDark
                        ? 'border-slate-700 text-slate-200 hover:bg-[#11b1d0] hover:text-white'
                        : 'border-slate-200 text-slate-700 hover:bg-[#11b1d0] hover:text-white'
                  }`}
                  style={activePreset !== 'premium' ? { backgroundColor: isDark ? '#1e293b' : '#f1f5f9' } : {}}
                >
                  Premium Scope
                </button>
              </div>
            </div>

            {/* 3. Scrollable Middle Content Area (Features List) */}
            <div 
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto p-5 sm:p-7 overscroll-contain space-y-4"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="space-y-4">
                {category?.featureGroups?.map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-2">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#11b1d0]">
                      {group.groupName}
                    </div>

                    <div className="space-y-2">
                      {group.features.map((feature, featureIdx) => {
                        const featKey = `${group.groupName}-${featureIdx}`;
                        const isChecked = customToggles[featKey] ?? false;
                        const isQty = isQuantityFeature(feature.name);
                        const isFreq = isFrequencyFeature(feature.name);
                        const isPlatform = isPlatformFeature(feature.name);
                        const qtyVal = featureQuantities[featKey] !== undefined ? featureQuantities[featKey] : getInitialQuantity(feature);
                        const freqVal = featureFrequencies[featKey] || 'Monthly';
                        const currentPlatforms = selectedPlatforms[featKey] || getDefaultPlatformsForPreset(activePreset);
                        
                        return (
                          <div
                            key={featureIdx}
                            className={`p-3 rounded-xl border flex flex-col transition-all duration-200 ${
                              isChecked
                                ? (isDark 
                                    ? 'bg-[#131b2c] border-slate-700/80 text-white shadow-md' 
                                    : 'bg-white border-slate-200 text-slate-900 shadow-sm')
                                : (isDark 
                                    ? 'bg-rose-950/20 border-rose-900/40 text-slate-400 line-through opacity-70' 
                                    : 'bg-rose-50 border-rose-200 text-slate-400 line-through opacity-70')
                            }`}
                            style={{
                              backgroundColor: isChecked 
                                ? (isDark ? '#131b2c' : '#ffffff') 
                                : (isDark ? 'rgba(76, 5, 25, 0.25)' : '#fff1f2'),
                              borderColor: isChecked 
                                ? (isDark ? '#1e293b' : '#e2e8f0') 
                                : (isDark ? 'rgba(159, 18, 57, 0.4)' : '#fecdd3')
                            }}
                          >
                            <div className="flex items-center justify-between w-full">
                              {/* Left: Interactive Check/Cross Icon & Name */}
                              <div
                                onClick={() => handleToggleFeature(featKey)}
                                className="flex items-center space-x-2.5 cursor-pointer flex-1 mr-2"
                              >
                                <div
                                  className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs flex-shrink-0 transition-transform hover:scale-110 ${
                                    isChecked
                                      ? 'bg-[#11b1d0] text-white shadow-sm'
                                      : 'bg-rose-500 text-white shadow-sm'
                                  }`}
                                >
                                  {isChecked ? (
                                    <Check className="w-4 h-4 stroke-[3]" />
                                  ) : (
                                    <X className="w-4 h-4 stroke-[3]" />
                                  )}
                                </div>
                                <span className={`text-xs font-bold leading-tight ${
                                  isChecked 
                                    ? (isDark ? 'text-white' : 'text-slate-900') 
                                    : (isDark ? 'text-slate-400' : 'text-slate-500')
                                }`}>
                                  {feature.name}
                                </span>
                              </div>

                              {/* Right: Frequency Selector Dropdown */}
                              {isFreq && isChecked && (
                                <div className="flex items-center flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                                  <select
                                    value={freqVal}
                                    onChange={(e) => setFeatureFrequencies((prev) => ({ ...prev, [featKey]: e.target.value }))}
                                    className={`font-extrabold text-xs px-2.5 py-1 rounded-lg border focus:outline-none focus:ring-1 focus:ring-[#11b1d0] cursor-pointer ${
                                      isDark ? 'border-slate-700 text-[#11b1d0]' : 'border-slate-300 text-[#00afc8]'
                                    }`}
                                    style={{ backgroundColor: isDark ? '#0c121e' : '#ffffff', color: isDark ? '#11b1d0' : '#003E4D' }}
                                  >
                                    <option value="Weekly">Weekly</option>
                                    <option value="Bi-Weekly">Bi-Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Bi-Monthly">Bi-Monthly</option>
                                    <option value="Quarterly (3 Months)">Quarterly (3 Months)</option>
                                    <option value="Half-Yearly (6 Months)">Half-Yearly (6 Months)</option>
                                    <option value="Yearly">Yearly</option>
                                  </select>
                                </div>
                              )}

                              {/* Right: Editable Quantity Input & Stepper */}
                              {isQty && isChecked && (
                                <div className="flex items-center space-x-1.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                                  <button
                                    type="button"
                                    onClick={() => handleFeatureQuantityChange(featKey, Number(qtyVal || 1) - 1)}
                                    className={`w-6 h-6 rounded border hover:bg-[#11b1d0] hover:text-white flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                                      isDark ? 'border-slate-700 text-slate-200' : 'border-slate-300 text-slate-700'
                                    }`}
                                    style={{ backgroundColor: isDark ? '#1e293b' : '#f1f5f9' }}
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <input
                                    type="number"
                                    min="1"
                                    max="999"
                                    value={qtyVal}
                                    onChange={(e) => handleFeatureQuantityChange(featKey, e.target.value)}
                                    className={`w-12 font-extrabold text-xs text-center px-1 py-1 rounded border focus:outline-none focus:ring-1 focus:ring-[#11b1d0] shadow-inner ${
                                      isDark ? 'border-slate-700 text-[#11b1d0]' : 'border-slate-300 text-slate-900'
                                    }`}
                                    style={{ backgroundColor: isDark ? '#0c121e' : '#ffffff', color: isDark ? '#11b1d0' : '#0f172a' }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleFeatureQuantityChange(featKey, Number(qtyVal || 1) + 1)}
                                    className={`w-6 h-6 rounded border hover:bg-[#11b1d0] hover:text-white flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                                      isDark ? 'border-slate-700 text-slate-200' : 'border-slate-300 text-slate-700'
                                    }`}
                                    style={{ backgroundColor: isDark ? '#1e293b' : '#f1f5f9' }}
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Platform Selectors Grid */}
                            {isPlatform && isChecked && (
                              <div className="mt-2.5 pt-2 border-t border-slate-200/40 dark:border-slate-800/80 w-full" onClick={(e) => e.stopPropagation()}>
                                <div className={`text-[10px] font-extrabold uppercase tracking-wider mb-1.5 ${
                                  isDark ? 'text-slate-400' : 'text-slate-500'
                                }`}>
                                  Select Target Platforms:
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {['Facebook', 'Instagram', 'LinkedIn', 'YouTube', 'X (Twitter)'].map((plat) => {
                                    const isPlatActive = currentPlatforms.includes(plat);
                                    return (
                                      <button
                                        key={plat}
                                        type="button"
                                        onClick={() => togglePlatform(featKey, plat)}
                                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all duration-200 border cursor-pointer ${
                                          isPlatActive
                                            ? 'bg-[#11b1d0] text-white border-[#11b1d0] shadow-sm scale-[1.02]'
                                            : (isDark 
                                                ? 'text-slate-300 border-slate-700 hover:border-[#11b1d0]' 
                                                : 'text-slate-600 border-slate-200 hover:border-[#11b1d0]')
                                        }`}
                                        style={!isPlatActive ? { backgroundColor: isDark ? '#1e293b' : '#f1f5f9' } : {}}
                                      >
                                        {isPlatActive ? `✓ ${plat}` : `+ ${plat}`}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Drawer Fixed Footer with Budget & 18% GST Calculator */}
            <div 
              className={`flex-shrink-0 p-4 sm:p-5 border-t z-20 transition-colors shadow-2xl ${
                isDark ? 'border-slate-800 bg-[#0c121e]' : 'border-slate-200 bg-white'
              }`}
              style={{ backgroundColor: isDark ? '#0c121e' : '#ffffff' }}
            >
              {/* Custom Budget Entry & 18% GST Calculation Box */}
              <div 
                className={`p-3.5 sm:p-4 rounded-2xl border mb-4 space-y-2.5 transition-colors ${
                  isDark ? 'bg-[#131b2c] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
                style={{ backgroundColor: isDark ? '#131b2c' : '#f8fafc' }}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Estimated Budget (Optional):
                  </span>
                  <span className="text-[10px] font-black text-rose-500 uppercase tracking-wider">
                    + 18% GST Additional
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-xs sm:text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter your target budget (e.g. 50,000)"
                    value={userBudget}
                    onChange={(e) => setUserBudget(e.target.value)}
                    className={`w-full pl-8 pr-3 py-2 rounded-xl font-extrabold text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-[#11b1d0] ${
                      isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                    }`}
                    style={{ backgroundColor: isDark ? '#0c121e' : '#ffffff' }}
                  />
                </div>

                {/* Real-time 18% GST breakdown when budget is entered */}
                {userBudget && Number(userBudget) > 0 ? (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-1.5 text-xs">
                    <div className="flex justify-between font-semibold text-slate-600 dark:text-slate-400">
                      <span>Base Amount:</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ₹{formatIndianNumber(userBudget)}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-rose-500">
                      <span>+ 18% GST (Additional):</span>
                      <span className="font-bold">
                        + ₹{formatIndianNumber(Math.round(Number(userBudget) * 0.18))}
                      </span>
                    </div>
                    <div className="flex justify-between font-extrabold text-[#11b1d0] text-sm pt-1 border-t border-slate-200 dark:border-slate-700">
                      <span>Total (Incl. 18% GST):</span>
                      <span>
                        ₹{formatIndianNumber(Number(userBudget) + Math.round(Number(userBudget) * 0.18))}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center justify-between pt-0.5">
                    <span>* GST @ 18% additional on all quotes</span>
                    <span className="text-[#11b1d0] font-extrabold">18% GST Applicable</span>
                  </div>
                )}
              </div>

              {/* 5. Real-Time Counter & CTA Handoff */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    CUSTOM SCOPE
                  </span>
                  <span className="text-lg font-extrabold text-[#11b1d0]">
                    Bespoke Custom Proposal
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#11b1d0]/20 text-[#11b1d0]">
                  {activeTogglesCount} Services Included
                </span>
              </div>

              <button
                type="button"
                onClick={handleHandoff}
                className="w-full py-4 px-6 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider bg-[#11b1d0] hover:bg-[#0fa1be] text-white shadow-xl shadow-[#11b1d0]/25 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>
                  {userBudget && Number(userBudget) > 0 
                    ? `Request Quote (₹${formatIndianNumber(Number(userBudget) + Math.round(Number(userBudget) * 0.18))} incl. GST)`
                    : 'Request Custom Quote'}
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
