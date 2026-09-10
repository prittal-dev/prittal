import React, { useState, useRef } from 'react';

export default function BlogFeaturedGallery({ blogs = [], onSelectBlog }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const hoverTimer = useRef(null);
  const scrollRef = useRef(null);

  if (!blogs || blogs.length === 0) return null;

  const displayBlogs = blogs;

  const handleDotClick = (index) => {
    setActiveIdx(index);
    if (scrollRef.current && window.innerWidth <= 768) {
      const container = scrollRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current && window.innerWidth <= 768) {
      const container = scrollRef.current;
      const cardWidth = container.offsetWidth;
      if (cardWidth > 0) {
        const newIdx = Math.round(container.scrollLeft / cardWidth);
        if (newIdx !== activeIdx && newIdx >= 0 && newIdx < displayBlogs.length) {
          setActiveIdx(newIdx);
        }
      }
    }
  };

  const handleMouseEnter = (index) => {
    if (window.innerWidth > 768) {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => {
        setActiveIdx(index);
      }, 180);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  const handleClick = (index, item) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setActiveIdx(index);
    if (onSelectBlog) {
      onSelectBlog(item, index);
    }
  };

  return (
    <div className="blog-featured-gallery-container">
      {/* DESKTOP & MOBILE FLEX / SCROLL SHOWCASE */}
      <div 
        ref={scrollRef} 
        className="blog-gallery-flex"
        onScroll={handleScroll}
      >
        {displayBlogs.map((item, index) => {
          const isFeatured = index === activeIdx;

          // Excerpt snippet
          const snippet = item.excerpt || (item.content ? item.content.replace(/[\r\n]+/g, ' ').slice(0, 135) + '...' : 'Explore our latest strategic packaging and branding insights.');
          const readTime = item.readTime || '5 MIN READ';
          const category = item.category || 'INSIGHTS';

          return (
            <div
              key={item.id || index}
              className={`blog-panel-card ${isFeatured ? 'is-featured' : 'is-narrow'}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index, item)}
            >
              {/* Background Image */}
              <div className="blog-panel-bg-wrapper">
                <img
                  src={item.image}
                  alt={item.title || 'Blog article'}
                  className="blog-panel-bg-img"
                  loading="lazy"
                />
                <div className="blog-panel-overlay" />
              </div>

              {/* Index Number Badge */}
              <div className="blog-panel-number">
                0{index + 1}
              </div>

              {/* CONTENT DISPLAY: FEATURED vs NARROW */}
              <div className={`blog-featured-content ${isFeatured ? 'fade-in-up' : ''}`}>
                <div className="blog-meta-tags">
                  <span className="blog-category-pill">✦ {category}</span>
                  <span className="blog-read-time">{readTime}</span>
                </div>

                <h3 className="blog-featured-title">
                  {item.title}
                </h3>

                <p className="blog-featured-snippet">
                  {snippet}
                </p>

                <div className="blog-featured-cta">
                  <button 
                    className="blog-cta-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectBlog) onSelectBlog(item, index);
                    }}
                  >
                    <span>READ FULL ARTICLE</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="blog-narrow-content">
                <div className="blog-narrow-vertical-title">
                  {item.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE CAROUSEL / DOT SELECTOR */}
      <div className="blog-gallery-mobile-nav">
        {displayBlogs.map((item, index) => (
          <button
            key={item.id || index}
            className={`blog-mobile-dot ${index === activeIdx ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Select blog ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
