import React from 'react'
import Footer from '../components/Footer'
import { PROJECTS_DATA } from '../data/projectsData'

export default function ServiceWebsites({ setActiveTab, navigateTo }) {
  const points = [
    'Website Strategy',
    'UI/UX Design',
    'Interactive Experiences',
    'Responsive Development',
    'Conversion-Focused Design'
  ]

  return (
    <main className="main-content">
      <section className="detail-hero-section" style={{ padding: '80px 24px', backgroundColor: 'var(--bg-color)' }}>
        <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="featured-tag" style={{ border: '1px solid var(--border-color)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>✦ WEBSITES</span>
            <h1 className="featured-heading" style={{ marginTop: '24px', fontSize: '3rem', fontWeight: '800', color: 'var(--text-dark)', textTransform: 'uppercase' }}>
              DIGITAL <br />
              <span style={{ color: 'var(--cyan-accent)' }}>EXPERIENCES</span>
            </h1>
            <p className="featured-description" style={{ margin: '24px auto 0 auto', maxWidth: '650px', fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              We design and build distinctive websites that combine strategy, visual identity, interaction and performance into memorable digital experiences.
            </p>
          </div>

          {/* Websites Showcase Grid */}
          <div style={{ marginBottom: '60px' }}>
            <div className="archive-platforms-grid-2col">
              {PROJECTS_DATA.filter(p => p.type === 'websites').map(p => (
                <div key={p.id} className="archive-platform-card" onClick={p.link && p.link.startsWith('http') ? () => window.open(p.link, '_blank') : undefined} style={{ cursor: 'pointer' }}>
                  <div className="view-project-indicator">View Project →</div>
                  <div className="archive-platform-img-wrapper" style={{ width: '100%', aspectRatio: '1.78', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                    <img src={p.image} alt={p.title} className="archive-platform-img" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                  </div>
                  <div className="archive-platform-info" style={{ padding: '16px' }}>
                    <h4 className="archive-platform-title" style={{ fontSize: '1.2rem', fontWeight: '700' }}>{p.title}</h4>
                    <p className="archive-platform-subtitle" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{p.category}</p>
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
