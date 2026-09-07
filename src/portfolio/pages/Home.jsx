import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import { PROJECTS_DATA } from '../data/projectsData'
import ReelVideoCard from '../components/ReelVideoCard'
import MediaLightboxModal from '../components/MediaLightboxModal'
import BlogFeaturedGallery from '../components/BlogFeaturedGallery'

export default function Home({ setActiveTab, navigateTo }) {
  const [metrics, setMetrics] = useState({ years: 0, projects: 0, clients: 0, revenue: 0 })
  const [hasAnimatedMetrics, setHasAnimatedMetrics] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Archive')
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    currentIndex: 0,
    items: []
  })

  const openLightbox = (itemsList, index) => {
    setLightboxState({
      isOpen: true,
      currentIndex: index,
      items: itemsList
    })
  }

  const closeLightbox = () => {
    setLightboxState(prev => ({ ...prev, isOpen: false }))
  }

  // 8 Selected Pieces for SELECTED WORK curated creative wall
  const selectedWorkItems = [
    PROJECTS_DATA.find(p => p.id === 'ai-8') || PROJECTS_DATA.find(p => p.type === 'ai-video'),
    PROJECTS_DATA.find(p => p.id === 'creative-3') || PROJECTS_DATA.find(p => p.type === 'creative'),
    PROJECTS_DATA.find(p => p.id === 'web-1') || PROJECTS_DATA.find(p => p.type === 'websites'),
    PROJECTS_DATA.find(p => p.id === 'creative-7') || PROJECTS_DATA.filter(p => p.type === 'creative')[1],
    PROJECTS_DATA.find(p => p.id === 'blog-2') || PROJECTS_DATA.find(p => p.type === 'blogs'),
    PROJECTS_DATA.find(p => p.id === 'ai-11') || PROJECTS_DATA.filter(p => p.type === 'ai-video')[1],
    PROJECTS_DATA.find(p => p.id === 'creative-5') || PROJECTS_DATA.filter(p => p.type === 'creative')[2],
    PROJECTS_DATA.find(p => p.id === 'web-4') || PROJECTS_DATA.filter(p => p.type === 'websites')[1]
  ].filter(Boolean)

  const handleCapabilityClick = (category) => {
    setActiveFilter(category)
    const target = document.getElementById('portfolio-section')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const animateNumbers = () => {
    const duration = 1500 // ms
    const stepTime = 30 // ms
    const steps = duration / stepTime

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = Math.min(currentStep / steps, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setMetrics({
        years: Math.round(easedProgress * 8),
        projects: Math.round(easedProgress * 5000),
        clients: Math.round(easedProgress * 250),
        revenue: Math.round(easedProgress * 50)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, stepTime)
  }

  useEffect(() => {
    if (hasAnimatedMetrics) return

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        setHasAnimatedMetrics(true)
        animateNumbers()
      }
    }, { threshold: 0.1 })

    const target = document.getElementById('metrics-section')
    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
    }
  }, [hasAnimatedMetrics])

  return (
    <main className="main-content">
      {/* HERO SECTION */}
      <section className="home-hero-section bg-light-warm">
        <div className="section-container grid-2col">
          <div className="featured-left">
            <span className="featured-tag">DIGITAL AGENCY</span>
            <h1 className="home-hero-heading">
              We Build Brands <br />
              <span className="highlight-cyan">That Move Forward.</span>
            </h1>
            <p className="home-hero-description">
              We combine strategy, creative content, technology, and digital experiences to help ambitious brands grow, connect, and stay ahead.
            </p>
            <div className="home-hero-buttons">
              <button
                className="start-project-btn-large"
                onClick={() => {
                  if (onOpenProjectModal) {
                    onOpenProjectModal();
                  }
                }}
              >
                Start a Project <span className="arrow">&rarr;</span>
              </button>
              <button
                className="explore-work-btn"
                onClick={() => {
                  const target = document.getElementById('portfolio-section');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Our Work <span className="arrow">&rarr;</span>
              </button>
            </div>
          </div>

          <div className="featured-right">
            <div className="hero-single-image-wrapper">
              <img src="/neural_pathways.jpg" alt="Neural Pathways AI Scanning Eye" className="hero-single-image" />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO (Capabilities rows) */}
      <section className="home-capabilities-section bg-light-warm">
        <div className="section-container">
          <span className="featured-tag">WHAT WE DO</span>
          <h2 className="section-heading">Everything your brand needs to move forward.</h2>

          <div className="capability-rows-container">
            {/* 01 — WEBSITES */}
            <div className="editorial-service-row" onClick={() => navigateTo('service-websites')} style={{ cursor: 'pointer' }}>
              <div className="editorial-service-row-left">
                <span className="editorial-service-number">01</span>
                <h4 className="editorial-service-name">Websites</h4>
              </div>
              <p className="editorial-service-details">Website Strategy &middot; UI/UX Design &middot; Interactive Experiences</p>
              <span className="editorial-service-arrow">&rarr;</span>
            </div>

            {/* 02 — CREATIVE */}
            <div className="editorial-service-row" onClick={() => navigateTo('service-branding')} style={{ cursor: 'pointer' }}>
              <div className="editorial-service-row-left">
                <span className="editorial-service-number">02</span>
                <h4 className="editorial-service-name">Creative</h4>
              </div>
              <p className="editorial-service-details">Creative Direction &middot; Visual Concepts &middot; Posters &amp; Visual Design</p>
              <span className="editorial-service-arrow">&rarr;</span>
            </div>

            {/* 03 — SOCIAL MEDIA */}
            <div className="editorial-service-row" onClick={() => navigateTo('service-ai-creative')} style={{ cursor: 'pointer' }}>
              <div className="editorial-service-row-left">
                <span className="editorial-service-number">03</span>
                <h4 className="editorial-service-name">Social Media</h4>
              </div>
              <p className="editorial-service-details">AI Video Production &middot; Generative Reels &middot; Motion Experiments</p>
              <span className="editorial-service-arrow">&rarr;</span>
            </div>

            {/* 04 — GROWTH */}
            <div className="editorial-service-row" onClick={() => navigateTo('service-growth')} style={{ cursor: 'pointer' }}>
              <div className="editorial-service-row-left">
                <span className="editorial-service-number">04</span>
                <h4 className="editorial-service-name">Growth</h4>
              </div>
              <p className="editorial-service-details">Industry Insights &middot; Creative Thinking &middot; Brand Stories &middot; Blogs</p>
              <span className="editorial-service-arrow">&rarr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO ARCHIVE & FILTERS */}
      <section id="portfolio-section" className="home-work-section bg-light-warm">
        <div className="section-container">
          <span className="featured-tag">✦ FEATURED WORK</span>
          <h2 className="section-heading">Selected projects built with precision and purpose.</h2>
          <p className="section-subheading">
            Browse our work across digital platforms, brand identity systems, generative visual design, and strategic content.
          </p>

          {/* Category Filter */}
          <div className="category-filter-nav">
            {['Archive', 'Websites', 'Creative', 'AI Video', 'Blogs'].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          {activeFilter === 'Archive' ? (
            <div className="selected-work-wall" style={{ marginTop: '32px' }}>
              {/* ROW 1: Reel 1 (5 cols, 5/7 ratio) + Creative 3 (7 cols, 1/1 ratio) -> Height matches perfectly */}
              <div className="selected-work-row">
                {/* Item 1: Reel 1 */}
                {selectedWorkItems[0] && (
                  <div className="col-span-5" style={{ aspectRatio: '5/7' }}>
                    <ReelVideoCard p={selectedWorkItems[0]} onClick={() => openLightbox(selectedWorkItems, 0)} />
                  </div>
                )}

                {/* Item 2: Creative 3 */}
                {selectedWorkItems[1] && (
                  <div 
                    className="selected-work-card col-span-7" 
                    onClick={() => openLightbox(selectedWorkItems, 1)}
                    style={{ aspectRatio: '1/1' }}
                  >
                    <div className="selected-work-tag">🎨 Creative</div>
                    <div className="view-project-indicator">View Art &rarr;</div>
                    <img src={selectedWorkItems[1].image} alt={selectedWorkItems[1].title || 'Creative Poster'} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'var(--card-bg)' }} />
                  </div>
                )}
              </div>

              {/* Item 3: Youngwheels Website (12 cols, wide horizontal banner) */}
              {selectedWorkItems[2] && (
                <div 
                  className="selected-work-card col-span-12" 
                  onClick={() => selectedWorkItems[2].link && selectedWorkItems[2].link.startsWith('http') ? window.open(selectedWorkItems[2].link, '_blank') : openLightbox(selectedWorkItems, 2)}
                  style={{ aspectRatio: '21/9' }}
                >
                  <div className="selected-work-tag">🌐 Website</div>
                  <div className="view-project-indicator">View Website &rarr;</div>
                  <img src={selectedWorkItems[2].image} alt={selectedWorkItems[2].title || 'Website'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
                    <h3 style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: '700', margin: 0 }}>{selectedWorkItems[2].title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', margin: '4px 0 0 0' }}>{selectedWorkItems[2].category}</p>
                  </div>
                </div>
              )}

              {/* ROW 2: Creative 7 (5 cols, 1/1) + Blog 3 (7 cols, 7/5) -> Height matches perfectly */}
              <div className="selected-work-row">
                {/* Item 4: Creative 7 */}
                {selectedWorkItems[3] && (
                  <div 
                    className="selected-work-card col-span-5" 
                    onClick={() => openLightbox(selectedWorkItems, 3)}
                    style={{ aspectRatio: '1/1' }}
                  >
                    <div className="selected-work-tag">🎨 Creative</div>
                    <div className="view-project-indicator">View Art &rarr;</div>
                    <img src={selectedWorkItems[3].image} alt={selectedWorkItems[3].title || 'Creative Poster'} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'var(--card-bg)' }} />
                  </div>
                )}

                {/* Item 5: Blog 3 */}
                {selectedWorkItems[4] && (
                  <div 
                    className="selected-work-card col-span-7" 
                    onClick={() => openLightbox(selectedWorkItems, 4)}
                    style={{ aspectRatio: '7/5' }}
                  >
                    <div className="selected-work-tag">📝 Blog</div>
                    <div className="view-project-indicator">Read Article &rarr;</div>
                    <img src={selectedWorkItems[4].image} alt={selectedWorkItems[4].title || 'Blog Post'} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#ffffff' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
                      <h3 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: '700', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{selectedWorkItems[4].title}</h3>
                    </div>
                  </div>
                )}
              </div>

              {/* ROW 3: Creative 5 (5 cols, 1/1) + XSEED Education (7 cols, 7/5) -> Height matches perfectly */}
              <div className="selected-work-row">
                {/* Item 7: Creative 5 */}
                {selectedWorkItems[6] && (
                  <div 
                    className="selected-work-card col-span-5" 
                    onClick={() => openLightbox(selectedWorkItems, 6)}
                    style={{ aspectRatio: '1/1' }}
                  >
                    <div className="selected-work-tag">🎨 Creative</div>
                    <div className="view-project-indicator">View Art &rarr;</div>
                    <img src={selectedWorkItems[6].image} alt={selectedWorkItems[6].title || 'Creative Poster'} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: 'var(--card-bg)' }} />
                  </div>
                )}

                {/* Item 8: XSEED Education */}
                {selectedWorkItems[7] && (
                  <div 
                    className="selected-work-card col-span-7" 
                    onClick={() => selectedWorkItems[7].link && selectedWorkItems[7].link.startsWith('http') ? window.open(selectedWorkItems[7].link, '_blank') : openLightbox(selectedWorkItems, 7)}
                    style={{ aspectRatio: '7/5' }}
                  >
                    <div className="selected-work-tag">🌐 Website</div>
                    <div className="view-project-indicator">View Website &rarr;</div>
                    <img src={selectedWorkItems[7].image} alt={selectedWorkItems[7].title || 'Website'} style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: 'var(--card-bg)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
                      <h3 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '700', margin: 0 }}>{selectedWorkItems[7].title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', margin: '4px 0 0 0' }}>{selectedWorkItems[7].category}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : activeFilter === 'Websites' ? (
            <div className="archive-platforms-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '32px' }}>
              {PROJECTS_DATA.filter(p => p.type === 'websites').map(p => (
                <div key={p.id} className="archive-platform-card" onClick={p.link && p.link.startsWith('http') ? () => window.open(p.link, '_blank') : undefined} style={{ cursor: 'pointer' }}>
                  <div className="view-project-indicator">View Project &rarr;</div>
                  <div className="archive-platform-img-wrapper">
                    <img src={p.image} alt={p.title} className="archive-platform-img" loading="lazy" />
                  </div>
                  <div className="archive-platform-info">
                    <h4 className="archive-platform-title">{p.title}</h4>
                    <p className="archive-platform-subtitle">{p.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : activeFilter === 'Creative' ? (
            <div className="archive-posters-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '32px' }}>
              {PROJECTS_DATA.filter(p => p.type === 'creative').map((p, idx, arr) => (
                <div key={p.id} className="archive-poster-card" onClick={() => openLightbox(arr, idx)} style={{ cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', height: 'fit-content' }}>
                  <div className="archive-poster-img-wrapper" style={{ aspectRatio: '1', overflow: 'hidden', borderBottom: 'none' }}>
                    <img src={p.image} alt={p.title || 'Creative Poster'} className="archive-poster-img" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : activeFilter === 'AI Video' ? (
            <div className="ai-video-grid" style={{ marginTop: '32px' }}>
              {PROJECTS_DATA.filter(p => p.type === 'ai-video').map((p, idx, arr) => (
                <ReelVideoCard key={p.id} p={p} onClick={() => openLightbox(arr, idx)} />
              ))}
            </div>
          ) : activeFilter === 'Blogs' ? (
            <BlogFeaturedGallery 
              blogs={PROJECTS_DATA.filter(p => p.type === 'blogs')}
              onSelectBlog={(item, index) => {
                const blogList = PROJECTS_DATA.filter(p => p.type === 'blogs');
                openLightbox(blogList, index);
              }}
            />
          ) : null}

        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="home-process-section">
        <div className="section-container">
          <span className="featured-tag">HOW WE WORK</span>
          <h2 className="section-heading">Simple process. Serious outcomes.</h2>

          <div className="process-steps-container">
            <div className="process-step">
              <span className="process-number">01</span>
              <h4 className="process-name">Discover</h4>
              <p className="process-desc">Understand the brand, audience, problem, and opportunity.</p>
            </div>

            <div className="process-step">
              <span className="process-number">02</span>
              <h4 className="process-name">Define</h4>
              <p className="process-desc">Build the strategy, direction, and creative system.</p>
            </div>

            <div className="process-step">
              <span className="process-number">03</span>
              <h4 className="process-name">Create</h4>
              <p className="process-desc">Design, develop, produce, and refine the experience.</p>
            </div>

            <div className="process-step">
              <span className="process-number">04</span>
              <h4 className="process-name">Launch</h4>
              <p className="process-desc">Ship, measure, optimize, and keep improving.</p>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section id="metrics-section" className="home-metrics-section">
        <div className="section-container">
          <div className="editorial-impact-card">
            <span className="featured-tag" style={{ color: 'var(--cyan-accent)', borderColor: 'rgba(255, 255, 255, 0.2)', marginBottom: '24px' }}>BUILT FOR IMPACT</span>
            <h2 className="section-heading" style={{ color: '#FFFFFF', marginBottom: '48px' }}>Creative is only valuable when it moves the business forward.</h2>

            <div className="metrics-grid">
              <div className="metric-item">
                <span className="metric-val">{metrics.years}+ Years</span>
                <span className="metric-label">Industry Experience</span>
              </div>
              <div className="metric-item">
                <span className="metric-val">{metrics.projects > 0 ? metrics.projects + '+' : '0+'}</span>
                <span className="metric-label">Projects Delivered</span>
              </div>
              <div className="metric-item">
                <span className="metric-val">{metrics.clients}+</span>
                <span className="metric-label">Global Clients</span>
              </div>
              <div className="metric-item">
                <span className="metric-val">₹{metrics.revenue}Cr+</span>
                <span className="metric-label">Client Revenue Generated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer setActiveTab={setActiveTab} navigateTo={navigateTo} />

      {/* Media Lightbox Modal for Full-Screen Preview */}
      <MediaLightboxModal
        isOpen={lightboxState.isOpen}
        items={lightboxState.items}
        currentIndex={lightboxState.currentIndex}
        onClose={closeLightbox}
        onNavigate={(idx) => setLightboxState(prev => ({ ...prev, currentIndex: idx }))}
      />
    </main>
  )
}
