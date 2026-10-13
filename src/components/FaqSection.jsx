import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const faqs = [
  {
    id: 'faq-branding-agency',
    question: 'Why choose Prittal as your Branding Agency and Brand Strategy Agency?',
    answer: 'Prittal operates as a full-service branding agency and brand strategy agency. We do not just design logos; we build strategic positioning, visual identity systems, messaging frameworks, and brand guidelines that scale your business and establish market authority.'
  },
  {
    id: 'faq-creative-agency',
    question: 'What core services does Prittal offer as a Creative Agency?',
    answer: 'As a multidisciplinary creative agency, Prittal delivers 6 connected capabilities: Brand Strategy & Identity Design, Digital Growth & Marketing, High-ROAS Performance Marketing, Video Production & Shoots, Events & Activations, and Marketplace Growth.'
  },
  {
    id: 'faq-brand-identity',
    question: 'How does a dedicated Brand Identity Agency impact your business?',
    answer: 'A specialized brand identity agency creates visual consistency across all touchpoints—logos, typography, color palettes, packaging, UI/UX, and marketing collateral—establishing immediate trust and premium brand perception.'
  },
  {
    id: 'faq-digital-growth',
    question: 'How does Prittal drive growth as a Digital Growth Agency and Business Growth Agency?',
    answer: 'As a digital growth agency and business growth agency partner, we focus on measurable revenue. We combine search engine positioning (SEO/AEO), high-conversion paid ads, funnel optimization, and data-driven creative execution to scale your business online.'
  },
  {
    id: 'faq-turnaround',
    question: 'What is the typical timeline for a brand identity or strategy project?',
    answer: 'Comprehensive brand strategy and identity projects typically take 3 to 6 weeks depending on scope. Our structured agency roadmap ensures transparent milestones and fast execution without compromising creative quality.'
  },
  {
    id: 'faq-global-clients',
    question: 'Does Prittal serve clients across India, UAE, and USA?',
    answer: 'Yes! Prittal is a premier global creative agency and digital growth agency supporting high-growth brands and enterprises across India, UAE, and the USA since 2018.'
  }
];

export default function FaqSection({ faqs: customFaqs, title, subtitle, onOpenContact }) {
  const activeFaqs = (customFaqs && customFaqs.length > 0) ? customFaqs : faqs;

  // Set the first item expanded by default
  const [openItems, setOpenItems] = useState([activeFaqs[0]?.id || 'bd-1']);

  const toggleItem = (id) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const halfLength = Math.ceil(activeFaqs.length / 2);
  const leftColumnFaqs = activeFaqs.slice(0, halfLength);
  const rightColumnFaqs = activeFaqs.slice(halfLength);

  const renderFaqItem = (faq) => {
    const isOpen = openItems.includes(faq.id);

    return (
      <div 
        key={faq.id} 
        className="border-b border-slate-300/80 dark:border-white/10 pb-5 mb-5 transition-colors"
      >
        <button
          onClick={() => toggleItem(faq.id)}
          className="w-full flex items-center justify-between gap-4 text-left group py-1 cursor-pointer focus:outline-none"
          aria-expanded={isOpen}
        >
          <span className={`font-montserrat text-base sm:text-lg font-bold tracking-tight transition-colors ${
            isOpen
              ? 'text-[#003E4D] dark:text-white'
              : 'text-slate-800 dark:text-slate-200 group-hover:text-[#00A9B9] dark:group-hover:text-[#00A9B9]'
          }`}>
            {faq.question}
          </span>
          <div className="shrink-0 flex items-center justify-center">
            {isOpen ? (
              <X className="w-5 h-5 text-[#00A9B9] transition-transform duration-200" />
            ) : (
              <Plus className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-[#00A9B9] transition-colors" />
            )}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="font-montserrat text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed pt-3 pr-6">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section 
      id="faq" 
      className="py-12 sm:py-16 md:py-20 lg:py-16 flex flex-col justify-center bg-transparent text-slate-900 dark:text-white relative z-10 overflow-hidden border-t border-black/10 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#003E4D] dark:text-white mb-3 sm:mb-4">
            {title || "Questions & answers"}
          </h2>
          <p className="font-montserrat text-slate-600 dark:text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            {subtitle || "Everything you need to know about our services and execution process"}
          </p>
        </div>

        {/* 2-Column FAQ Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 sm:gap-x-16">
          <div className="flex flex-col">
            {leftColumnFaqs.map(renderFaqItem)}
          </div>
          <div className="flex flex-col">
            {rightColumnFaqs.map(renderFaqItem)}
          </div>
        </div>

      </div>
    </section>
  );
}
