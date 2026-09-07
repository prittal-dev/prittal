import React, { useState } from 'react'
import Footer from '../components/Footer'
import { PROJECTS_DATA } from '../data/projectsData'
import ReelVideoCard from '../components/ReelVideoCard'
import MediaLightboxModal from '../components/MediaLightboxModal'

export default function ServiceAiCreative({ setActiveTab, navigateTo }) {
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
    'AI Video Production',
    'Generative Motion Graphics',
    'Creative Direction',
    'Social-First Visual Content',
    'Brand Motion Experiments'
  ]

  return (
    <main className="main-content">
      <section className="detail-hero-section" style={{ padding: '80px 24px', backgroundColor: 'var(--bg-color)' }}>
        <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="featured-tag" style={{ border: '1px solid var(--border-color)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>✦ CREATIVE</span>
            <h1 className="featured-heading" style={{ marginTop: '24px', fontSize: '3rem', fontWeight: '800', color: 'var(--text-dark)', textTransform: 'uppercase' }}>
              GENERATIVE <br />
              <span style={{ color: 'var(--cyan-accent)' }}>STORYTELLING</span>
            </h1>
            <p className="featured-description" style={{ margin: '24px auto 0 auto', maxWidth: '650px', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              We harness generative AI and creative direction to produce cinematic vertical videos, motion experiments, and social campaigns that captivate digital audiences.
            </p>
          </div>

          {/* AI Reels Video Grid Showcase */}
          <div className="ai-video-grid" style={{ marginBottom: '60px' }}>
            {PROJECTS_DATA.filter(p => p.type === 'ai-video').map((p, idx, arr) => (
              <ReelVideoCard key={p.id} p={p} onClick={() => openLightbox(arr, idx)} />
            ))}
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

            {/* CREATIVE */}
            <div className="editorial-service-row" onClick={() => navigateTo('service-branding')} style={{ cursor: 'pointer' }}>
              <div className="editorial-service-row-left">
                <span className="editorial-service-number">02</span>
                <h4 className="editorial-service-name">Creative</h4>
              </div>
              <p className="editorial-service-details">Creative Direction &middot; Visual Concepts &middot; Posters &amp; Visual Design</p>
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
