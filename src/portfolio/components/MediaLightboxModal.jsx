import React, { useEffect, useRef, useState } from 'react'

export default function MediaLightboxModal({ isOpen, items = [], currentIndex = 0, onClose, onNavigate }) {
  const [activeIdx, setActiveIdx] = useState(currentIndex)
  const [isLight, setIsLight] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    setActiveIdx(currentIndex)
  }, [currentIndex])

  useEffect(() => {
    const checkTheme = () => {
      if (typeof document !== 'undefined') {
        const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light' ||
                             document.documentElement.classList.contains('light') ||
                             localStorage.getItem('portfolio-theme') === 'light';
        setIsLight(isLightTheme);
      }
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    return () => observer.disconnect();
  }, [isOpen])

  const currentItem = items[activeIdx] || null

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [isOpen, activeIdx])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      if (window.lenis) window.lenis.stop()
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (window.lenis) window.lenis.start()
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (window.lenis) window.lenis.start()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, activeIdx, items])

  if (!isOpen || !currentItem) return null

  const handleNext = () => {
    if (!items.length) return
    const nextIdx = (activeIdx + 1) % items.length
    setActiveIdx(nextIdx)
    if (onNavigate) onNavigate(nextIdx)
  }

  const handlePrev = () => {
    if (!items.length) return
    const prevIdx = (activeIdx - 1 + items.length) % items.length
    setActiveIdx(prevIdx)
    if (onNavigate) onNavigate(prevIdx)
  }

  const isVideo = currentItem.type === 'ai-video' || currentItem.type === 'reels' || Boolean(currentItem.video)
  const isBlog = currentItem.type === 'blogs'
  const isCreative = currentItem.type === 'creative'

  return (
    <div
      className="media-lightbox-overlay"
      data-lenis-prevent="true"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: isLight ? 'rgba(0, 0, 0, 0.55)' : 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'lightboxFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      {/* Top-Right Close Button */}
      <button
        onClick={onClose}
        aria-label="Close modal"
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 10001,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: isLight ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.12)',
          border: isLight ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.25)',
          color: '#FFFFFF',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isLight ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.25)'
          e.currentTarget.style.transform = 'scale(1.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isLight ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.12)'
          e.currentTarget.style.transform = 'scale(1)'
        }}
      >
        ✕
      </button>

      {/* Right Side Floating Next Button */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          aria-label="Next item"
          style={{
            position: 'fixed',
            right: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10001,
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: '#00afc8',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#FFFFFF',
            fontSize: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0, 175, 200, 0.4)',
            transition: 'all 0.25s ease',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#008fa3'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#00afc8'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
          }}
        >
          →
        </button>
      )}

      {/* Left Side Optional Prev Button for Desktop Navigation */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handlePrev()
          }}
          aria-label="Previous item"
          style={{
            position: 'fixed',
            left: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10001,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: isLight ? 'rgba(0, 0, 0, 0.55)' : 'rgba(255, 255, 255, 0.1)',
            border: isLight ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isLight ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isLight ? 'rgba(0, 0, 0, 0.55)' : 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
          }}
        >
          ←
        </button>
      )}

      {/* Main Modal Card Container */}
      <div
        className="media-lightbox-card"
        data-lenis-prevent="true"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: isBlog ? '840px' : isVideo ? '540px' : '90vw',
          maxHeight: '88vh',
          width: '100%',
          backgroundColor: isBlog ? (isLight ? '#FFFFFF' : '#121619') : 'transparent',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: isLight ? '0 24px 64px rgba(0, 45, 56, 0.2)' : '0 24px 64px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isBlog ? 'stretch' : 'center',
          justifyContent: isBlog ? 'flex-start' : 'center',
          animation: 'lightboxPopIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          border: isBlog ? (isLight ? '1px solid rgba(0, 45, 56, 0.12)' : '1px solid rgba(255, 255, 255, 0.12)') : 'none'
        }}
      >
        {/* VIDEO DISPLAY */}
        {isVideo && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#000000' }}>
            {currentItem.video ? (
              <video
                ref={videoRef}
                src={currentItem.video}
                autoPlay
                loop
                controls
                playsInline
                onCanPlay={(e) => {
                  e.target.muted = false;
                  e.target.play().catch(() => {});
                }}
                style={{
                  width: '100%',
                  maxHeight: '82vh',
                  aspectRatio: currentItem.isVerticalVideo ? '9/16' : '16/9',
                  objectFit: 'contain',
                  borderRadius: '20px',
                  display: 'block'
                }}
              />
            ) : currentItem.image ? (
              <div style={{ position: 'relative', width: '100%' }}>
                <img
                  src={currentItem.image}
                  alt={currentItem.title || 'Video'}
                  style={{ width: '100%', maxHeight: '82vh', objectFit: 'contain', borderRadius: '20px' }}
                />
              </div>
            ) : null}
          </div>
        )}

        {/* CREATIVE POSTER DISPLAY */}
        {isCreative && (
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={currentItem.image}
              alt={currentItem.title || 'Creative Poster'}
              style={{
                maxWidth: '90vw',
                maxHeight: '84vh',
                objectFit: 'contain',
                borderRadius: '20px',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)'
              }}
            />
          </div>
        )}

        {/* BLOG CONTENT DISPLAY */}
        {isBlog && (
          <div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '88vh',
              overflowY: 'auto',
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
              padding: '0 0 32px 0',
              color: isLight ? '#002D38' : '#FFFFFF'
            }}
          >
            <div style={{ width: '100%', aspectRatio: '1.78', overflow: 'hidden', backgroundColor: isLight ? '#F8F9FA' : '#000' }}>
              <img
                src={currentItem.image}
                alt={currentItem.title || 'Blog Banner'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '32px 36px 8px 36px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#00afc8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {currentItem.category || 'INDUSTRY INSIGHTS'}
                </span>
                {currentItem.readTime && (
                  <span style={{ fontSize: '0.8rem', color: isLight ? '#64748B' : 'rgba(255, 255, 255, 0.6)', fontWeight: '500' }}>
                    • {currentItem.readTime}
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginTop: '4px', marginBottom: '20px', lineHeight: '1.3', color: isLight ? '#002D38' : '#FFFFFF' }}>
                {currentItem.title}
              </h2>
              <div style={{ width: '40px', height: '3px', backgroundColor: '#00afc8', marginBottom: '24px', borderRadius: '2px' }}></div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: isLight ? '#334155' : 'rgba(255, 255, 255, 0.88)', whiteSpace: 'pre-line', fontWeight: '300' }}>
                {currentItem.content || currentItem.excerpt || `Artificial intelligence and generative workflows are redefining creative strategy across globally scaling brands. By pairing deep human narrative architecture with machine velocity, forward-thinking organizations capture outsized organic attention and drive measurable business impact.

Key Takeaways:
• Rapid exploration of dynamic campaign narratives.
• Consistent visual identity across multi-platform touchpoints.
• Higher conversion through data-informed creative iterations.`}
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lightboxPopIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .media-lightbox-card ::-webkit-scrollbar,
        div[data-lenis-prevent] ::-webkit-scrollbar {
          width: 6px;
          display: block !important;
        }
        .media-lightbox-card ::-webkit-scrollbar-track,
        div[data-lenis-prevent] ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        .media-lightbox-card ::-webkit-scrollbar-thumb,
        div[data-lenis-prevent] ::-webkit-scrollbar-thumb {
          background: rgba(0, 175, 200, 0.6);
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}
