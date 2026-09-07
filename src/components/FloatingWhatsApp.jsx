import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, ArrowUpRight, MessageSquareText, FileText, Sparkles } from 'lucide-react';

function WhatsAppIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.84 0-3.566-.496-5.06-1.364l-.363-.21-3.761.986.999-3.663-.231-.368c-.955-1.523-1.46-3.284-1.46-5.093 0-5.187 4.22-9.407 9.412-9.407 2.513 0 4.876.98 6.654 2.76 1.777 1.778 2.756 4.142 2.755 6.656 0 5.188-4.22 9.407-9.406 9.407m0-20.672c-6.208 0-11.26 5.05-11.26 11.26 0 1.983.518 3.92 1.503 5.626l-1.597 5.845 5.981-1.569c1.646.898 3.51 1.371 5.373 1.371 6.209 0 11.26-5.051 11.26-11.26 0-3.01-1.172-5.839-3.301-7.969-2.13-2.13-4.96-3.304-7.959-3.304z" />
    </svg>
  );
}

export default function FloatingWhatsApp({
  onOpenContact,
  phoneNumber = '919910992774',
  email = 'sales@prittal.com',  
  whatsappMessage = 'Hi Prittal Team, I would like to know more about your services.',
  emailSubject = 'Brand Growth Inquiry - Prittal',
  emailBody = 'Hi Prittal Team,\n\nI would like to discuss a project for my brand.'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleEmailClick = () => {
    setIsOpen(false);
  };

  const handleFormClick = () => {
    setIsOpen(false);
    if (onOpenContact) {
      onOpenContact();
    }
  };

  // 100% Robust auto-close on click outside, touch outside, or escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideInteraction = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    // Capture phase listeners ensure it triggers immediately before any event stoppage
    document.addEventListener('pointerdown', handleOutsideInteraction, true);
    document.addEventListener('touchstart', handleOutsideInteraction, true);
    document.addEventListener('click', handleOutsideInteraction, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handleOutsideInteraction, true);
      document.removeEventListener('touchstart', handleOutsideInteraction, true);
      document.removeEventListener('click', handleOutsideInteraction, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Invisible Fullscreen Backdrop Click Dismissal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            onTouchStart={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/10 dark:bg-black/25 backdrop-blur-[1px] cursor-default"
          />
        )}
      </AnimatePresence>

      <div ref={containerRef} className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none font-outfit">
        
        {/* Options Popup Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.92 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3.5 w-[295px] sm:w-[325px] rounded-3xl bg-white/95 dark:bg-[#070e14]/95 backdrop-blur-2xl p-4 border border-black/10 dark:border-white/15 shadow-2xl shadow-black/25 text-[#003E4D] dark:text-white relative overflow-hidden"
            >
              {/* Ambient Corner Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00afc8]/20 rounded-full filter blur-2xl pointer-events-none" />

              {/* Popup Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5 dark:border-white/10 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                    Quick Connect
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold text-[#00afc8] bg-[#00afc8]/10 px-2 py-0.5 rounded-full border border-[#00afc8]/20">
                  Online
                </span>
              </div>

              {/* Contact Options List */}
              <div className="space-y-2 relative z-10">
                {/* Option 1: WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-[#25D366]/10 dark:hover:bg-[#25D366]/15 border border-transparent hover:border-[#25D366]/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-[#25D366]/30 group-hover:scale-105 transition-transform shrink-0">
                      <WhatsAppIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#25D366] transition-colors">
                        WhatsApp Chat
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                        Instant message & strategy
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#25D366] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>

                {/* Option 2: Email (Gmail) */}
                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleEmailClick}
                  className="group flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-[#00afc8]/10 dark:hover:bg-[#00afc8]/15 border border-transparent hover:border-[#00afc8]/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00afc8] text-white flex items-center justify-center shadow-md shadow-[#00afc8]/30 group-hover:scale-105 transition-transform shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#00afc8] transition-colors">
                        Send via Gmail
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal truncate max-w-[150px] sm:max-w-[170px]">
                        {email}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#00afc8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </a>

                {/* Option 3: Contact Form Drawer */}
                <button
                  type="button"
                  onClick={handleFormClick}
                  className="w-full text-left group flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-[#003E4D]/15 dark:hover:bg-[#00afc8]/15 border border-transparent hover:border-[#00afc8]/30 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#003E4D] to-[#00afc8] text-white flex items-center justify-center shadow-md shadow-[#003E4D]/30 group-hover:scale-105 transition-transform shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#00afc8] transition-colors">
                        Project Inquiry Form
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                        Book free audit & custom quote
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#00afc8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </button>
              </div>

              {/* Footer note */}
              <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-3 font-medium">
                Typically responds within minutes
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Trigger Button & Tooltip */}
        <div className="flex items-center">
          {/* Tooltip on Hover (only when closed) */}
          <AnimatePresence>
            {isHovered && !isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="hidden sm:flex items-center gap-2 mr-3 px-3.5 py-1.5 rounded-full bg-[#003E4D] text-[#F8F8F6] text-xs font-semibold shadow-lg shadow-black/20 border border-[#00afc8]/40 pointer-events-none whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-[#00afc8] animate-pulse" />
                <span>Quick Connect</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Trigger Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            aria-label={isOpen ? "Close contact options" : "Open contact options"}
            className="relative group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#00afc8] text-white shadow-lg shadow-[#00afc8]/35 hover:shadow-xl hover:shadow-[#00afc8]/50 transition-all duration-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#00afc8] focus:ring-offset-2 cursor-pointer"
          >
            {/* Subtle breathing ripple glow ring when closed */}
            {!isOpen && (
              <span className="absolute -inset-1 rounded-full bg-[#00afc8] opacity-30 group-hover:opacity-60 animate-ping pointer-events-none" />
            )}

            {/* Inner background gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#009cb3] to-[#00c5e0] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Animated Icon: Connect (MessageCircle) morphs to Close (X) */}
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <X className="w-6 h-6 sm:w-7 sm:h-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="connect"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <MessageSquareText className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-sm transition-transform duration-300 group-hover:scale-105" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

      </div>
    </>
  );
}
