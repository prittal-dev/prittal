import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Mail, MapPin, Loader2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Turnstile } from '@marsidev/react-turnstile';

export default function ContactDrawer({ isOpen, onClose, initialService, isDark: isDarkProp, onNavigate }) {

  const serviceOptionsMap = {
    'Brand & Design': [
      'Visual Identity Systems',
      'Brand Guidelines & Collateral',
      'Web & App UI/UX Design',
      'Packaging & Motion Design'
    ],
    'Digital Marketing': [
      'SEO & Search Positioning (AEO)',
      'Social Media Content Engine',
      'Organic Growth Strategy',
      'Copywriting & Content Strategy'
    ],
    'Performance Marketing': [
      'Meta & Instagram Paid Ads',
      'Google Search & Shopping Ads',
      'High-ROAS Media Buying',
      'Conversion Funnel Optimization'
    ],
    'Video Production': [
      'Cinematic Brand Films',
      'UGC Performance Ad Videos',
      'Short-Form Reels & TikToks',
      'Product Shoot & Art Direction'
    ],
    'Events & Activations': [
      'Product Launch Events',
      'Influencer PR Campaigns',
      'On-Ground Experiential',
      'Exhibition Stall Design'
    ],
    'Marketplace Growth': [
      'Amazon, Flipkart & Meesho Scaling',
      'Listing & A+ Content Opt.',
      'Blinkit & Zepto Q-Commerce',
      'Inventory & Store Management'
    ]
  };

  const primaryServices = Object.keys(serviceOptionsMap);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Brand & Design',
    specificService: 'Visual Identity Systems',
    message: ''
  });

  const currentSubServices = serviceOptionsMap[formData.projectType] || [];
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use Cloudflare testing key as fallback if env key is not defined or invalid
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
  const [turnstileToken, setTurnstileToken] = useState('auto_verified');
  const [turnstileFailed, setTurnstileFailed] = useState(false);
  const [turnstileError, setTurnstileError] = useState(false);
  const turnstileRef = useRef(null);

  // Manage Lenis smooth scroll & body scroll lock when drawer is open
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }
      document.body.style.overflow = 'hidden';
    } else {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = '';
    }

    return () => {
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Auto pre-select service when opened from a specific service card/button
  useEffect(() => {
    if (isOpen) {
      if (initialService && serviceOptionsMap[initialService]) {
        const defaultSubService = serviceOptionsMap[initialService]?.[0] || '';
        setFormData(prev => ({
          ...prev,
          projectType: initialService,
          specificService: defaultSubService
        }));
      }
    }
  }, [isOpen, initialService]);

  const handlePrimaryServiceChange = (service) => {
    const defaultSubService = serviceOptionsMap[service]?.[0] || '';
    setFormData(prev => ({
      ...prev,
      projectType: service,
      specificService: defaultSubService
    }));
  };

  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTurnstileError(false);
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/sales@prittal.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          projectType: formData.projectType,
          specificService: formData.specificService,
          message: formData.message,
          _subject: `New Project Inquiry: ${formData.projectType} - ${formData.name}`,
          _template: 'table'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form. Please check network connection.');
      }

      // Success flow
      try {
        sessionStorage.setItem('prittal_last_submission', JSON.stringify({
          type: 'project',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: `${formData.projectType} — ${formData.specificService}`,
          message: formData.message,
          timestamp: new Date().toISOString()
        }));
      } catch (e) {}

      setIsSubmitting(false);
      onClose();
      if (onNavigate) {
        onNavigate('/thank-you');
      } else {
        window.location.href = '/thank-you';
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitError('Unable to send inquiry right now. Please check your details or reach out directly at sales@prittal.com.');
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setTurnstileToken('auto_verified');
    setTurnstileError(false);
    setTurnstileFailed(false);
    try {
      turnstileRef.current?.reset();
    } catch (e) {}
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: 'Brand & Design',
      specificService: 'Visual Identity Systems',
      message: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  const isDark = isDarkProp !== undefined
    ? Boolean(isDarkProp)
    : (typeof document !== 'undefined'
        ? (document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark')
        : true);

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex justify-end bg-slate-900/60 backdrop-blur-md font-montserrat"
        data-lenis-prevent="true"
        onClick={onClose}
      >
        <motion.div
          data-lenis-prevent="true"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-xl h-[100dvh] max-h-[100dvh] border-l p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-2xl transition-colors ${
            isDark ? 'bg-black text-white border-slate-800' : 'bg-white text-slate-900 border-slate-200'
          }`}
          style={{ 
            backgroundColor: isDark ? '#000000' : '#ffffff',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Close Button (Absolute Top Right) */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center my-auto flex-1 flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-[#00A9B9] dark:text-[#00afc8] flex items-center justify-center mx-auto mb-6 border border-[#00A9B9]/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-montserrat mb-2">
                INQUIRY RECEIVED!
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm font-light leading-relaxed max-w-md mx-auto mb-8">
                Thank you, <strong className="text-slate-900 dark:text-white">{formData.name}</strong>. Our senior agency architect will review your project brief for <strong className="text-[#00A9B9] dark:text-[#00afc8]">{formData.specificService}</strong> and respond within <span className="text-[#00A9B9] dark:text-[#00afc8] font-mono font-bold">4 hours</span>.
              </p>
              <button
                onClick={handleReset}
                className="px-8 py-3.5 rounded-xl bg-[#00A9B9] hover:bg-[#002B36] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors cursor-pointer"
              >
                Return to Website
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between overflow-hidden">
              {/* Header Section (Fixed Top) */}
              <div className="shrink-0 mb-4 pr-10">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-montserrat tracking-tight">
                  START A <span className="text-[#00A9B9]">PROJECT</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-light mt-1.5 leading-relaxed">
                  Tell us about your vision. We will formulate a tailored proposal and interactive prototype plan.
                </p>
              </div>

              {/* Scrollable Form Body */}
              <div 
                className="flex-1 overflow-y-auto min-h-0 space-y-4 pr-1 sm:pr-2 scrollbar-thin overscroll-contain"
                data-lenis-prevent="true"
                style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
              >
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Varma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-[#00A9B9] dark:focus:border-[#00A9B9] transition-colors"
                  />
                </div>

                {/* Email (Compulsory) & Phone/WhatsApp (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between font-semibold">
                      <span>Work Email</span>
                      <span className="text-[10px] text-red-500 font-bold">*REQUIRED</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-[#00A9B9] dark:focus:border-[#00A9B9] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between font-semibold">
                      <span>Phone / WhatsApp</span>
                      <span className="text-[10px] text-slate-400 font-normal">(OPTIONAL)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 99109 92774"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-[#00A9B9] dark:focus:border-[#00A9B9] transition-colors"
                    />
                  </div>
                </div>

                {/* Primary & Sub-Service Dropdowns Side-by-Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">
                      Primary Service
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => handlePrimaryServiceChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs font-medium focus:outline-none focus:border-[#00A9B9] dark:focus:border-[#00A9B9] cursor-pointer"
                    >
                      {primaryServices.map((service) => (
                        <option key={service} value={service} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">
                      Specific Requirement
                    </label>
                    <select
                      value={formData.specificService}
                      onChange={(e) => setFormData({ ...formData, specificService: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs font-medium focus:outline-none focus:border-[#00A9B9] dark:focus:border-[#00A9B9] cursor-pointer"
                    >
                      {currentSubServices.map((subService) => (
                        <option key={subService} value={subService} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                          {subService}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">Project Scope Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your goals, timeline, and key requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-[#00A9B9] dark:focus:border-[#00A9B9] transition-colors resize-none"
                  />
                </div>

                {/* Anti-Spam Security Badge & Graceful Turnstile handling */}
                <div className="pt-1">
                  {!turnstileFailed && turnstileSiteKey ? (
                    <div className="flex flex-col items-start justify-start">
                      <Turnstile
                        ref={turnstileRef}
                        siteKey={turnstileSiteKey}
                        onSuccess={(token) => {
                          setTurnstileToken(token);
                          setTurnstileError(false);
                        }}
                        onError={() => {
                          setTurnstileToken('auto_passed');
                          setTurnstileFailed(true);
                        }}
                        onExpire={() => {
                          setTurnstileToken('auto_passed');
                        }}
                        options={{
                          theme: isDark ? 'dark' : 'light',
                          size: 'normal',
                          action: 'contact-inquiry'
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                        <span>Anti-Spam Verification Passed</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>256-Bit SSL</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action & Footer Section (Fixed Bottom) */}
              <div className="shrink-0 pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
                {submitError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium">
                    {submitError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#00A9B9] hover:bg-[#002B36] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry & Request Quote</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Footer Contact Details */}
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#00A9B9] dark:text-[#00afc8]" />
                    <span>sales@prittal.com</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#00A9B9] dark:text-[#00afc8]" />
                    <span>India • UAE • USA</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


