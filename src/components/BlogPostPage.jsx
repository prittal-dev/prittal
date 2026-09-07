import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, Sparkles, CheckCircle2, ArrowRight, Share2 } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function BlogPostPage({ article, allArticles = [], onSelectArticle, onBack, onNavigate, onOpenContact, isDark, onToggleTheme }) {
  // Scroll to top when blog post page mounts or article changes
  useEffect(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (window.lenis) {
      window.lenis.start();
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [article]);

  if (!article) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  // Get up to 3 related articles excluding current one
  const relatedArticles = allArticles
    .filter(item => item.id !== article.id)
    .slice(0, 3);

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-[#00afc8] selection:text-[#fff6f1] font-montserrat transition-colors duration-300 ${
      isDark ? 'bg-[#0b0e14] text-[#fff6f1]' : 'bg-[#F8F8F6] text-[#003E4D]'
    }`}>
      
      {/* Top Navbar */}
      <Navbar
        onOpenContact={onOpenContact}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        onNavigate={onNavigate}
        forcedActiveSection="work"
      />

      {/* Main Blog Post Content Area */}
      <main className="flex-1 pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        
        {/* Back Navigation Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-montserrat font-bold text-[#00A9B9] hover:text-[#003E4D] dark:hover:text-white uppercase tracking-wider mb-8 cursor-pointer group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to all articles</span>
        </motion.button>

        {/* Article Header Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4 mb-8"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-montserrat font-extrabold text-[#00A9B9] uppercase tracking-widest bg-[#00A9B9]/10 px-3.5 py-1 rounded-full border border-[#00A9B9]/20">
              {article.category}
            </span>
            <span className="text-xs font-montserrat text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#00A9B9]" />
              {article.readTime}
            </span>
            <span className="text-xs font-montserrat text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#00A9B9]" />
              {article.date}
            </span>
          </div>

          <h1 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black text-[#003E4D] dark:text-white tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          <div className="flex items-center justify-between border-y border-slate-200 dark:border-slate-800 py-4 text-xs font-montserrat text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#00A9B9]" />
              <span>Written by <strong className="text-[#003E4D] dark:text-white">{article.author}</strong></span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A9B9] hover:text-[#003E4D] dark:hover:text-white transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Article</span>
            </button>
          </div>
        </motion.div>

        {/* Featured Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl overflow-hidden mb-10 h-72 sm:h-96 w-full shadow-xl border border-black/5 dark:border-white/10"
        >
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Executive Key Takeaways Box */}
        {article.takeaways && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#00A9B9]/10 border border-[#00A9B9]/25 mb-10 shadow-sm"
          >
            <p className="font-montserrat font-extrabold text-sm text-[#00A9B9] flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 shrink-0" />
              Executive Key Takeaways:
            </p>
            <div className="space-y-3">
              {article.takeaways.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm font-montserrat text-[#003E4D] dark:text-white/90">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#00A9B9] shrink-0 mt-0.5" />
                  <span className="leading-normal">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Article Body Content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8 text-[#003E4D]/90 dark:text-white/90 text-base sm:text-lg leading-relaxed font-normal font-sans"
        >
          {article.sections ? (
            article.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-4">
                {section.heading && (
                  <h2 className="font-montserrat text-xl sm:text-2xl font-extrabold text-[#003E4D] dark:text-[#00afc8] pt-4 tracking-tight">
                    {section.heading}
                  </h2>
                )}

                {section.text && (
                  <div className="space-y-4 whitespace-pre-line text-[#003E4D]/85 dark:text-white/85 text-sm sm:text-base leading-relaxed">
                    {section.text}
                  </div>
                )}

                {section.bullets && (
                  <div className="space-y-4 pt-2">
                    {section.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="bg-slate-100 dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm transition-colors">
                        {b.title && (
                          <h3 className="font-montserrat font-extrabold text-base text-[#003E4D] dark:text-[#00afc8] mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#00afc8] shrink-0 inline-block" />
                            <span>{b.title}</span>
                          </h3>
                        )}
                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                          {b.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {section.list && (
                  <ul className="space-y-3 pt-2 list-none">
                    {section.list.map((lItem, lIdx) => (
                      <li key={lIdx} className="flex items-start gap-3 text-sm sm:text-base text-[#003E4D]/85 dark:text-white/85">
                        <span className="w-2 h-2 rounded-full bg-[#00afc8] mt-2 shrink-0" />
                        <span>{lItem}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            article.content.map((paragraph, idx) => (
              <p key={idx} className="text-sm sm:text-base">{paragraph}</p>
            ))
          )}
        </motion.div>

        {/* Bottom CTA Box */}
        <div className="mt-14 p-8 rounded-3xl bg-[#003E4D] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl mb-16">
          <div>
            <h3 className="font-montserrat text-xl font-bold mb-1">Ready to future-proof your brand strategy?</h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light">Book a free 30-min brand audit with our strategy leads.</p>
          </div>
          <button
            onClick={onOpenContact}
            className="px-6 py-3.5 rounded-full bg-[#00A9B9] hover:bg-[#002B36] text-white font-montserrat font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Related Articles Grid at the End of Blog Page */}
        {relatedArticles.length > 0 && (
          <div className={`pt-10 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-montserrat font-extrabold text-[#00A9B9] uppercase tracking-[0.2em]">MORE INSIDE STORIES</span>
                <h3 className={`text-xl sm:text-2xl font-extrabold ${isDark ? 'text-white' : 'text-[#003E4D]'} font-montserrat tracking-tight mt-1`}>
                  More articles to explore
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((relPost) => (
                <motion.div
                  key={relPost.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    if (onSelectArticle) {
                      onSelectArticle(relPost);
                    }
                  }}
                  className={`${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 shadow-lg' 
                      : 'bg-white border-slate-200 shadow-md hover:shadow-xl'
                  } rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between group`}
                >
                  <div className="h-44 w-full overflow-hidden relative">
                    <img
                      src={relPost.image}
                      alt={relPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-mono text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md font-bold uppercase border border-white/20">
                      {relPost.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <h4 className={`font-montserrat font-extrabold text-sm ${
                      isDark ? 'text-white group-hover:text-[#00afc8]' : 'text-[#003E4D] group-hover:text-[#00A9B9]'
                    } line-clamp-2 mb-3 transition-colors leading-snug`}>
                      {relPost.title}
                    </h4>

                    <div className={`flex items-center justify-between pt-3 border-t ${
                      isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                    } text-[11px] font-montserrat`}>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#00A9B9]" />
                        {relPost.readTime}
                      </span>
                      <span className="text-[#00A9B9] font-bold uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        onOpenContact={onOpenContact}
      />

    </div>
  );
}
