import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const faqs = [
  {
    id: 'safe-linkedin',
    question: 'Is SalesTrigger safe to use with LinkedIn?',
    answer: 'Yes, 100%. We use human-mimicking behavior, randomized delays, and strict safety thresholds to ensure your LinkedIn account remains completely safe and compliant at all times.'
  },
  {
    id: 'ai-personalization',
    question: 'How does AI personalize messages?',
    answer: 'Our AI researches prospect profiles, recent activity, company updates, and industry news to craft hyper-personalized outreach messages that read like handwritten emails.'
  },
  {
    id: 'lead-lists',
    question: 'Can I upload my own lead lists?',
    answer: 'Yes, you can easily upload CSV files or sync your lead lists directly from your CRM. Our system will automatically enrich and verify every prospect contact.'
  },
  {
    id: 'what-is-prittal',
    question: 'What is SalesTrigger?',
    answer: 'AI researches prospects, analyzes profiles, and builds your ideal customer list automatically. Analyzes profiles, and builds your ideal customer list automatically'
  },
  {
    id: 'own-tone',
    question: 'Can I use my own tone or style in messages?',
    answer: 'Absolutely. You can define custom brand guidelines, tone presets (formal, casual, persuasive), and provide sample messages to ensure the AI speaks in your exact voice.'
  },
  {
    id: 'integrations',
    question: 'What integrations do you support?',
    answer: 'We seamlessly integrate with HubSpot, Salesforce, Zoho, Zapier, Make, Slack, Gmail, Outlook, and popular webhooks to sync leads and campaign performance.'
  },
  {
    id: 'ai-sdr',
    question: 'What does AI SDR mean?',
    answer: 'An AI SDR (Sales Development Representative) automates prospect research, personalized outreach, objection handling, and meeting scheduling 24/7 without manual effort.'
  },
  {
    id: 'how-soon',
    question: 'How soon can I start?',
    answer: 'You can get started immediately! Setup takes less than 5 minutes, and your first automated outreach campaign can be live and sending within 24 hours.'
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
