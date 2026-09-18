import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  X, 
  Check, 
  ShoppingBag, 
  ArrowUpRight
} from 'lucide-react';

const A_LA_CARTE_SERVICES = [
  { id: 'logo-design', name: 'Logo Design', desc: 'Custom logo design with 2-3 concepts, source files (AI, EPS, PNG, PDF) & revisions.' },
  { id: 'brand-guideline', name: 'Brand Guideline', desc: 'Complete brand identity guide covering logo usage, typography & core color palette.' },
  { id: 'company-profile', name: 'Company Profile', desc: 'Up to 10-page corporate profile brochure tailored for pitch decks & clients.' },
  { id: 'catalogue-design', name: 'Product/Service Catalogue', desc: 'Up to 8-page high-res product or service catalogue layout.' },
  { id: 'business-card', name: 'Business Card Design', desc: 'Print-ready front & back business card design in vector formats.' },
  { id: 'letterhead', name: 'Letterhead Design', desc: 'Official corporate letterhead design for digital & print use.' },
  { id: 'envelope', name: 'Envelope Design', desc: 'Standard business envelope artwork layout.' },
  { id: 'social-media-kit', name: 'Social Media Kit', desc: 'Social media profile kit including avatars, cover banners & grid templates.' },
  { id: 'email-signature', name: 'Email Signature Design', desc: 'Professional HTML & image email signature for company teams.' },
  { id: 'packaging-label', name: 'Packaging / Label Design', desc: '3D packaging or box label layout for retail and e-commerce products.' },
  { id: 'signage-design', name: 'Signage Design', desc: 'Indoor & outdoor store signage, hoardings, or flex banner layout.' }
];

export const ALaCarteDrawer = ({
  isOpen,
  onClose,
  category,
  onSelectTier
}) => {
  const { isDark } = useTheme();

  // Single selected service ID (default null)
  const [selectedId, setSelectedId] = useState(null);

  // Manual Budget & GST State
  const [userBudget, setUserBudget] = useState('');
  const [clientRemark, setClientRemark] = useState('');
  const [gstRate, setGstRate] = useState(18);

  // Indian currency formatting helper
  const formatIndianNumber = (num) => {
    const raw = Number(num);
    if (isNaN(raw)) return '0';
    return raw.toLocaleString('en-IN');
  };

  // Scroll lock & reset selection on open
  useEffect(() => {
    if (isOpen) {
      setSelectedId(null);
      setUserBudget('');
      setClientRemark('');
      setGstRate(18);
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

  const selectSingleService = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const selectedService = A_LA_CARTE_SERVICES.find((s) => s.id === selectedId);

  const handleProceed = () => {
    if (!selectedService) return;

    const budgetNum = Number(userBudget);
    const baseAmount = budgetNum > 0 ? budgetNum : 25000;
    const totalAmount = baseAmount + Math.round(baseAmount * (gstRate / 100));

    const tierName = `À LA CARTE — ${selectedService.name}`;
    const budgetSummary = budgetNum > 0
      ? ` | Budget: ₹${formatIndianNumber(budgetNum)} + ${gstRate}% GST = Total ₹${formatIndianNumber(totalAmount)}`
      : '';
    const remarkSummary = clientRemark.trim() ? ` | Remark: ${clientRemark.trim()}` : '';

    onSelectTier(category.title, tierName, {
      categoryId: category.id,
      categoryTitle: category.title,
      categorySubtitle: 'À La Carte Single Service Selection',
      tierId: 'a-la-carte',
      tierName: tierName,
      billingCycle: 'one-time',
      priceText: `₹${formatIndianNumber(baseAmount)}`,
      userBudget: baseAmount,
      totalWithGst: totalAmount,
      isCustom: true,
      selectedALaCarteItems: [selectedService.name],
      activeDetails: [selectedService.name],
      activeCount: 1,
      clientRemark: `${budgetSummary}${remarkSummary}`.trim(),
      notes: clientRemark.trim(),
      customSummary: `À La Carte Selection (1 Service: ${selectedService.name})${budgetSummary}${remarkSummary}`,
      gstRate
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`w-screen max-w-2xl h-full flex flex-col shadow-2xl relative z-10 border-l ${
                isDark ? 'bg-[#0c121e] border-[#11b1d0]/25 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Header */}
              <div className={`p-4 sm:p-6 border-b flex items-start justify-between flex-shrink-0 ${
                isDark ? 'border-slate-800 bg-[#090d16]' : 'border-slate-100 bg-slate-50/80'
              }`}>
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30 mb-1.5">
                    <ShoppingBag className="w-3 h-3" />
                    <span>À La Carte Branding</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    Select 1 Service
                  </h3>
                  <p className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Click to pick a single standalone branding service to buy independently.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className={`p-2 rounded-full transition-colors ${
                    isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Service Cards List - Fully Scrollable */}
              <div 
                data-lenis-prevent="true"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 space-y-2.5"
              >
                {A_LA_CARTE_SERVICES.map((service) => {
                  const isSelected = selectedId === service.id;
                  return (
                    <motion.div
                      key={service.id}
                      whileHover={{ scale: 1.005 }}
                      whileTap={{ scale: 0.995 }}
                      onClick={() => selectSingleService(service.id)}
                      className={`p-3 sm:p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-start justify-between gap-3 ${
                        isSelected
                          ? isDark
                            ? 'bg-[#11b1d0]/10 border-[#11b1d0] ring-1 ring-[#11b1d0]/50 shadow-md'
                            : 'bg-[#11b1d0]/5 border-[#11b1d0] ring-1 ring-[#11b1d0]/40 shadow-sm'
                          : isDark
                            ? 'bg-[#131b2c]/60 border-slate-800 hover:border-slate-700'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                          isSelected
                            ? 'bg-[#11b1d0] text-white shadow-sm ring-2 ring-[#11b1d0]/30'
                            : isDark ? 'border border-slate-700 bg-slate-900' : 'border border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className={`text-xs sm:text-sm font-bold tracking-tight ${isSelected ? 'text-[#11b1d0]' : ''}`}>
                              {service.name}
                            </h4>
                          </div>
                          <p className={`text-[11px] sm:text-xs font-medium mt-0.5 leading-snug ${
                            isDark ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {service.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer CTA & Manual Budget Entry Area */}
              <div className={`p-3.5 sm:p-4 border-t flex-shrink-0 z-20 ${
                isDark ? 'border-slate-800 bg-[#0c121e]' : 'border-slate-200 bg-white'
              }`}>
                {/* Compact 2-Column Grid for Budget & Remarks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2.5">
                  {/* Estimated Budget (Optional) */}
                  <div className={`p-2.5 rounded-xl border transition-colors ${
                    isDark ? 'bg-[#131b2c] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Estimated Budget
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-bold text-rose-400 uppercase">+</span>
                        <select
                          value={gstRate}
                          onChange={(e) => setGstRate(Number(e.target.value))}
                          className="bg-transparent text-[9px] font-bold text-rose-400 uppercase border-none outline-none cursor-pointer p-0 m-0"
                        >
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="18">18%</option>
                          <option value="40">40%</option>
                        </select>
                        <span className="text-[9px] font-bold text-rose-400 uppercase">GST</span>
                      </div>
                    </div>

                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-xs">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        placeholder="Budget (e.g. 25000)"
                        value={userBudget}
                        onChange={(e) => setUserBudget(e.target.value)}
                        className={`w-full pl-6 pr-2 py-1 rounded-lg font-bold text-xs border focus:outline-none focus:ring-1 focus:ring-[#11b1d0] ${
                          isDark ? 'bg-[#0c121e] text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'
                        }`}
                      />
                    </div>

                    {userBudget && Number(userBudget) > 0 && (
                      <div className="mt-1 text-[10px] font-bold text-[#11b1d0] flex justify-between">
                        <span>Incl. GST:</span>
                        <span>₹{formatIndianNumber(Number(userBudget) + Math.round(Number(userBudget) * (gstRate / 100)))}</span>
                      </div>
                    )}
                  </div>

                  {/* Remark / Special Instructions (Optional) */}
                  <div className={`p-2.5 rounded-xl border transition-colors ${
                    isDark ? 'bg-[#131b2c] border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[11px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Remark / Instructions
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">
                        Optional
                      </span>
                    </div>

                    <input
                      type="text"
                      placeholder="Add specific requirements..."
                      value={clientRemark}
                      onChange={(e) => setClientRemark(e.target.value)}
                      className={`w-full px-2.5 py-1 rounded-lg text-xs font-medium border focus:outline-none focus:ring-1 focus:ring-[#11b1d0] ${
                        isDark ? 'bg-[#0c121e] text-white border-slate-700 placeholder-slate-500' : 'bg-white text-slate-900 border-slate-300 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Real-Time Scope & CTA Row */}
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="min-w-0">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">
                      SELECTED SERVICE
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-[#11b1d0] truncate block">
                      {selectedService ? selectedService.name : 'No Service Selected'}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#11b1d0]/20 text-[#11b1d0] flex-shrink-0">
                    {selectedService ? '1 Service Included' : '0 Services Included'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleProceed}
                  disabled={!selectedService}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 ${
                    selectedService
                      ? 'bg-[#11b1d0] hover:bg-[#0fa1be] text-white shadow-md shadow-[#11b1d0]/25 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                  }`}
                >
                  <span>
                    {userBudget && Number(userBudget) > 0 
                      ? `REQUEST QUOTE (₹${formatIndianNumber(Number(userBudget) + Math.round(Number(userBudget) * (gstRate / 100)))} INCL. GST)`
                      : 'REQUEST QUOTE'}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
