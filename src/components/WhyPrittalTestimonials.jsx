import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Layers, Compass, Eye, Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { CrowdCanvas } from './v1/skiper39';

export default function WhyPrittalTestimonials({ onOpenContact }) {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const testimonialsScrollRef = useRef(null);

  const scrollTestimonials = (direction) => {
    if (testimonialsScrollRef.current) {
      const scrollAmount = 300;
      testimonialsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const testimonials = [
    {
      id: 1,
      quote: "Prittal consistently delivered high-quality K-12 book designs with exceptional typography and illustrations. Their team's attention to educational standards, accuracy, and tight deadlines made them a dependable creative partner throughout our publishing projects.",
      name: "Brajesh Singh",
      title: "Sr. Project Manager",
      company: "XSEED Education",
      category: "K-12 Book Design & Publishing",
      rating: 5
    },
    {
      id: 2,
      quote: "Prittal became an extension of our marketing team. Their creative campaigns, social media execution, and strategic approach consistently strengthened our brand presence and delivered impactful engagement across multiple digital platforms.",
      name: "Anupama",
      title: "Sr. Marketing Manager",
      company: "Sage",
      category: "Brand Campaigns & Social Media",
      rating: 5
    },
    {
      id: 3,
      quote: "Prittal elevated our brand communication with outstanding presentation designs, marketing collateral, and corporate branding. Their creativity, quick turnaround, and deep understanding of our business made every project smooth and impactful.",
      name: "Rakesh Singh",
      title: "Sr. Marketing Manager",
      company: "UAE Exchange",
      category: "Corporate Branding & Collateral",
      rating: 5
    },
    {
      id: 4,
      quote: "Prittal proved to be a reliable outsourcing partner for artwork production and creative execution. Their commitment to quality, process efficiency, and on-time delivery enabled us to manage high-volume projects with complete confidence.",
      name: "Sandeep",
      title: "Manager",
      company: "SPi Global",
      category: "Artwork Production & Execution",
      rating: 5
    },
    {
      id: 5,
      quote: "Working with Prittal was a seamless experience. Their expertise in K-12 book design, typography, and illustration helped us produce engaging learning materials while maintaining the quality, consistency, and precision expected from Cambridge publications.",
      name: "Sanjay",
      title: "Sr. Project Manager",
      company: "University of Cambridge",
      category: "K-12 Learning & Typography",
      rating: 5
    }
  ];

  return (
    <>
      {/* FOLD 5B: Testimonials Section with Full-Width Animated Crowd Background */}
      <section id="testimonials" className="snap-section py-5 sm:py-8 md:py-10 lg:py-6 lg:h-screen lg:max-h-screen flex flex-col justify-center bg-transparent dark:bg-black text-[#1B1B1B] dark:text-white relative z-10 overflow-visible lg:overflow-hidden border-t border-black/5 dark:border-white/10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-6 lg:mb-4 relative z-20 px-4">
          <h3 className="font-montserrat text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#1B1B1B] dark:text-white tracking-tight">
            Real Stories from High-Growth Brands
          </h3>
        </div>

        {/* Relative Container for Background CrowdCanvas + Horizontal Marquee Cards */}
        <div className="relative flex flex-col justify-center items-center overflow-hidden py-1 sm:py-4">
          
          {/* Full-Width Animated Crowd Canvas Background - De-emphasized so attention stays on reviews */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <CrowdCanvas
              src="/images/peeps/all-peeps.png"
              rows={15}
              cols={7}
              className="h-full w-full opacity-[0.07] dark:opacity-[0.12] dark:invert transition-opacity duration-300 blur-[0.5px]"
              isPaused={isCardHovered}
            />
          </div>

          {/* Left & Right Smooth White/Dark Gradient Fade Masks */}
          <div className="absolute inset-y-0 left-0 w-8 sm:w-40 bg-gradient-to-r from-[#F8F8F6] dark:from-black via-[#F8F8F6]/90 dark:via-black/90 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 sm:w-40 bg-gradient-to-l from-[#F8F8F6] dark:from-black via-[#F8F8F6]/90 dark:via-black/90 to-transparent z-20 pointer-events-none" />

          {/* Mobile Swipeable Testimonial Cards Overlaying Crowd (< lg) */}
          <div className="lg:hidden relative z-20 w-full px-4 pt-2 pb-1 max-w-full overflow-hidden">
            <div 
              ref={testimonialsScrollRef}
              className="flex overflow-x-auto scrollbar-none py-1 w-full max-w-full"
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
              onTouchStart={() => setIsCardHovered(true)}
              onTouchEnd={() => setIsCardHovered(false)}
            >
              <div className="animate-marquee-smooth flex items-center gap-3.5 whitespace-normal">
                {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => {
                  const initials = t.name.split(' ').map(n => n[0]).join('');
                  return (
                    <div
                      key={`mob-test-${t.id}-${idx}`}
                      className="shrink-0 w-[82vw] max-w-[300px] sm:max-w-[340px] min-h-[210px] sm:min-h-[230px] bg-white/95 dark:bg-black backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-white/10 shadow-lg flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Left Accent Bar */}
                      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#00A9B9]" />

                      <div className="pl-2">
                        {/* Top Bar: Category Tag & Star Rating */}
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <span className="text-[9px] font-montserrat font-bold uppercase bg-[#00A9B9]/10 text-[#00A9B9] px-2 py-0.5 rounded-full border border-[#00A9B9]/20 tracking-wider truncate max-w-[160px]">
                            {t.category}
                          </span>
                          <div className="flex items-center gap-0.5 sm:gap-1 text-amber-400 shrink-0">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>

                        {/* Quote Content */}
                        <p className="text-slate-800 dark:text-slate-100 font-montserrat text-[11px] font-medium leading-relaxed italic line-clamp-4">
                          "{t.quote}"
                        </p>
                      </div>

                      {/* Author Details */}
                      <div className="pl-2 pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2.5">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00A9B9]/10 text-[#00A9B9] font-montserrat font-extrabold text-[10px] flex items-center justify-center border border-[#00A9B9]/30 shrink-0 shadow-sm">
                          {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-montserrat font-extrabold text-xs text-slate-900 dark:text-white truncate leading-tight">
                            {t.name}
                          </h4>
                          <p className="text-[10px] font-montserrat text-slate-500 dark:text-slate-400 truncate mt-0.5 leading-tight">
                            {t.title}, <span className="font-semibold text-slate-700 dark:text-slate-300">{t.company}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Carousel Left/Right Arrow Controls */}
            <div className="flex items-center justify-center gap-3 mt-2 sm:mt-3">
              <button
                onClick={() => scrollTestimonials('left')}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-[#00A9B9] hover:text-white dark:hover:bg-[#00A9B9] dark:hover:text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTestimonials('right')}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-[#00A9B9] hover:text-white dark:hover:bg-[#00A9B9] dark:hover:text-white transition-all active:scale-95 cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Horizontal Scrolling Marquee Testimonial Cards Overlaying Crowd (lg only) */}
          <div 
            className="hidden lg:block relative z-20 w-full overflow-hidden pt-8 pb-4"
            onMouseEnter={() => setIsCardHovered(true)}
            onMouseLeave={() => setIsCardHovered(false)}
          >
            <div className="animate-marquee-smooth flex items-center gap-4 sm:gap-6 whitespace-normal">
              {[...testimonials, ...testimonials, ...testimonials].map((t, idx) => {
                const initials = t.name.split(' ').map(n => n[0]).join('');
                return (
                  <div
                    key={idx}
                    className="w-[285px] sm:w-[410px] h-[240px] sm:h-[250px] bg-white/95 dark:bg-black backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/90 dark:border-white/10 shadow-xl hover:shadow-2xl hover:shadow-[#00A9B9]/15 hover:border-[#00A9B9] hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between shrink-0 group cursor-pointer relative overflow-hidden"
                  >
                    {/* Left Accent Bar */}
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#00A9B9] group-hover:w-2 transition-all duration-300" />

                    <div className="pl-2">
                      {/* Top Bar: Category Tag & Star Rating */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] sm:text-[10px] font-montserrat font-bold uppercase bg-[#00A9B9]/10 text-[#00A9B9] px-2.5 py-0.5 rounded-full border border-[#00A9B9]/20 tracking-wider">
                          {t.category}
                        </span>
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      {/* Quote Content */}
                      <p className="text-slate-800 dark:text-slate-100 font-montserrat text-[11px] sm:text-sm font-medium leading-relaxed italic line-clamp-5 sm:line-clamp-4">
                        "{t.quote}"
                      </p>
                    </div>

                    {/* Author Details with Avatar Initials Badge */}
                    <div className="pl-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#00A9B9]/10 text-[#00A9B9] font-montserrat font-extrabold text-[10px] sm:text-xs flex items-center justify-center border border-[#00A9B9]/30 shrink-0 shadow-sm group-hover:bg-[#00A9B9] group-hover:text-white transition-colors">
                        {initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-montserrat font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                          {t.name}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] font-montserrat text-slate-500 dark:text-slate-400 truncate mt-0.5 sm:mt-0">
                          {t.title}, <span className="font-semibold text-slate-700 dark:text-slate-300">{t.company}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </section>
    </>
  );
}
