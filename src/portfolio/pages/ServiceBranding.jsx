import React, { useState } from 'react'
import Footer from '../components/Footer'
import { PROJECTS_DATA } from '../data/projectsData'
import MediaLightboxModal from '../components/MediaLightboxModal'

export default function ServiceBranding({ setActiveTab, navigateTo }) {
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

  const points = [
    'Creative Direction',
    'Visual Concepts',
    'Campaign Design',
    'Social Creatives',
    'Art Direction'
  ]

  const creativeItems = PROJECTS_DATA.filter(p => p.type === 'creative')

  return (
    <main className="main-content">
      <section className="detail-hero-section" style={{ padding: '80px 24px', backgroundColor: 'var(--bg-color)' }}>
        <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="featured-tag" style={{ border: '1px solid var(--border-color)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>✦ CREATIVE</span>
            <h1 className="featured-heading" style={{ marginTop: '24px', fontSize: '3rem', fontWeight: '800', color: 'var(--text-dark)', textTransform: 'uppercase' }}>
              CREATIVE <br />
              <span style={{ color: 'var(--cyan-accent)' }}>PROJECTS</span>
            </h1>
            <p className="featured-description" style={{ margin: '24px auto 0 auto', maxWidth: '650px', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              From visual concepts to campaign systems, we turn ideas into distinctive creative projects and visual artwork that gives brands a memorable presence.
            </p>
          </div>

          {/* Visual Showcase Feature / Grid */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {creativeItems.map((p, idx) => (
                <div key={p.id} className="archive-poster-card" onClick={() => openLightbox(creativeItems, idx)} style={{ cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <div className="archive-poster-img-wrapper" style={{ aspectRatio: '1', overflow: 'hidden' }}>
                    <img src={p.image} alt={p.title || 'Creative Poster'} className="archive-poster-img" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* OTHER CAPABILITIES SECTION */}
      <section className="home-capabilities-section bg-light-warm" style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 40px' }}>
          <span className="featured-tag" style={{ border: '1px solid var(--border-color)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>✦ OTHER CAPABILITIES</span>
          <h2 className="section-heading" style={{ marginTop: '20px', marginBottom: '40px', fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-dark)' }}>Everything your brand needs to move forward.</h2>

          <div className="capability-rows-container">
            {/* WEBSITES */}
            <div className="editorial-service-row" onClick={() => navigateTo('service-websites')} style={{ cursor: 'pointer' }}>
              <div className="editorial-service-row-left">
                <span className="editorial-service-number">01</span>
                <h4 className="editorial-service-name">Websites</h4>
              </div>
              <p className="editorial-service-details">Website Strategy &middot; UI/UX Design &middot; Interactive Experiences</p>
              <span className="editorial-service-arrow">&rarr;</span>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="editorial-service-row" onClick={() => navigateTo('service-ai-creative')} style={{ cursor: 'pointer' }}>
              <div className="editorial-service-row-left">
                <span className="editorial-service-number">03</span>
                <h4 className="editorial-service-name">Social Media</h4>
              </div>
              <p className="editorial-service-details">AI Video Production &middot; Generative Reels &middot; Motion Experiments</p>
              <span className="editorial-service-arrow">&rarr;</span>
            </div>

            {/* GROWTH */}
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

      <Footer setActiveTab={setActiveTab} navigateTo={navigateTo} />

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
