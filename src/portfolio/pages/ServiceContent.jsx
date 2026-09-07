import React from 'react'
import Footer from '../components/Footer'
import { PROJECTS_DATA } from '../data/projectsData'
import ReelVideoCard from '../components/ReelVideoCard'

export default function ServiceContent({ setActiveTab, navigateTo }) {
  const points = [
    'Content Strategy',
    'Social Content',
    'Copywriting',
    'Campaign Content',
    'Brand Storytelling'
  ]

  const reelsList = PROJECTS_DATA.filter(p => p.type === 'reels')

  return (
    <main className="main-content">
      <section className="detail-hero-section" style={{ padding: '80px 24px', backgroundColor: 'var(--bg-color)' }}>
        <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="featured-tag" style={{ border: '1px solid var(--border-color)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>✦ CONTENT</span>
            <h1 className="featured-heading" style={{ marginTop: '24px', fontSize: '3rem', fontWeight: '800', color: 'var(--text-dark)', textTransform: 'uppercase' }}>
              CONTENT <br />
              <span style={{ color: 'var(--cyan-accent)' }}>WITH PURPOSE</span>
            </h1>
            <p className="featured-description" style={{ margin: '24px auto 0 auto', maxWidth: '650px', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              We create strategic, engaging content that gives brands something meaningful to say and makes every communication feel intentional.
            </p>
          </div>

          {/* Content Reels & Video Grid Showcase */}
          <div style={{ marginBottom: '60px' }}>
            <div className="archive-reels-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {reelsList.map(p => (
                <div key={p.id} className="archive-reel-card" onClick={p.link && p.link.startsWith('http') ? () => window.open(p.link, '_blank') : undefined} style={{ cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}>
                  <div className="view-project-indicator">View Project →</div>
                  <img src={p.image} alt={p.title} className="archive-reel-img" loading="lazy" style={{ width: '100%', aspectRatio: '9/16', objectFit: 'cover' }} />
                  <div className="archive-reel-overlay" style={{ padding: '16px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                    <span className="archive-reel-title" style={{ color: '#ffffff', fontWeight: '600' }}>{p.title}</span>
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

            {/* CREATIVE */}
            <div className="editorial-service-row" onClick={() => navigateTo('service-branding')} style={{ cursor: 'pointer' }}>
              <div className="editorial-service-row-left">
                <span className="editorial-service-number">02</span>
                <h4 className="editorial-service-name">Creative</h4>
              </div>
              <p className="editorial-service-details">Creative Direction &middot; Visual Concepts &middot; Posters &amp; Visual Design</p>
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
    </main>
  )
}
