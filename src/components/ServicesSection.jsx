import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function ServicesSection({ onOpenContact, onSelectService }) {
  const sectionRef = useRef(null);

  const handleCardClick = (card) => {
    if (onSelectService) {
      onSelectService(card);
    } else if (onOpenContact) {
      onOpenContact(card.displayTitle || card.title);
    }
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="snap-section py-6 lg:py-6 lg:h-screen lg:max-h-screen flex flex-col justify-center bg-transparent dark:bg-black text-[#1B1B1B] dark:text-white relative z-10 overflow-hidden border-t border-black/5 dark:border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Compact Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-3 lg:mb-4">
          <h2 className="font-montserrat text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1B1B1B] dark:text-white tracking-tight leading-snug mb-1">
            Everything your brand needs. <br className="hidden sm:inline" />
            <span className="text-[#00A9B9]">Nothing it doesn't.</span>
          </h2>

          <p className="text-[#1B1B1B]/70 dark:text-white/70 text-[11px] sm:text-xs font-light">
            One agency. 6 core services. Zero chaos.
          </p>
        </div>

        {/* 6 Service Cards Grid (3 Columns x 2 Rows) - Compact Fold Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-3.5 mb-3 lg:mb-4">
          {servicesData.map((card) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleCardClick(card)}
                className="bg-[#F8F8F6] dark:bg-black hover:bg-[#00afc8] dark:hover:bg-[#00afc8] rounded-xl p-3.5 lg:p-3.5 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between relative overflow-hidden cursor-pointer"
              >
                {/* Large Stroke Number Partially Clipped Off Right/Bottom Edge */}
                <span 
                  className="absolute -bottom-4 -right-4 lg:-bottom-5 lg:-right-5 text-6xl sm:text-7xl lg:text-[5.5rem] font-black font-sans tracking-tight leading-none pointer-events-none select-none z-0 transition-all duration-300 whitespace-nowrap opacity-20 dark:opacity-30 group-hover:opacity-75 text-transparent [-webkit-text-stroke:2px_#00A9B9] dark:[-webkit-text-stroke:2px_#ffffff] group-hover:[-webkit-text-stroke:2px_#ffffff]"
                >
                  {card.num}
                </span>

                <div className="relative z-10">
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-lg bg-[#00A9B9]/10 dark:bg-slate-800 border border-[#00A9B9]/20 text-[#00A9B9] flex items-center justify-center shadow-sm group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 transition-all duration-300 shrink-0">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>

                    <span className="text-[9px] font-mono font-extrabold text-[#00A9B9] group-hover:text-white/80 transition-colors">
                      {card.num}
                    </span>
                  </div>

                  <h3 className="font-montserrat text-sm sm:text-base lg:text-lg font-bold text-[#1B1B1B] dark:text-white group-hover:text-white transition-colors duration-300 leading-snug mb-1">
                    {card.displayTitle || card.title}
                  </h3>

                  <p className="text-[#1B1B1B]/75 dark:text-white/75 group-hover:text-white/90 text-xs sm:text-[13px] font-normal leading-relaxed mb-2 transition-colors duration-300 line-clamp-2">
                    {card.desc}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-1 border-t border-black/5 dark:border-white/10 group-hover:border-white/20 pt-1.5 mb-2 transition-colors duration-300">
                    {card.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs sm:text-[12px] font-montserrat font-medium text-[#1B1B1B]/85 dark:text-white/85 group-hover:text-white transition-colors duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00A9B9] group-hover:bg-white flex-shrink-0 transition-colors duration-300" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(card);
                  }}
                  className="inline-flex items-center gap-1 text-[9px] font-montserrat font-bold text-[#00A9B9] group-hover:text-white tracking-wider uppercase group/link cursor-pointer pt-0.5 relative z-10 transition-colors duration-300"
                >
                  <span>LEARN MORE</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover/link:translate-x-1 transition-transform" />
                </button>

              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
}

