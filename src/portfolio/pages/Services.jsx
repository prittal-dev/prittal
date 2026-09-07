import React, { useState } from 'react'
import Footer from '../components/Footer'

export default function Services({ setActiveTab, navigateTo, activeAccordion, setActiveAccordion, onOpenProjectModal }) {
  const toggleService = (id) => {
    setActiveAccordion(prev => prev === id ? '' : id);
  };

  return (
    <main className="main-content">
      {/* HERO SECTION */}
      <section className="services-hero-section">
        <div className="section-container grid-2col">
          <div className="featured-left">
            <span className="featured-tag">OUR SERVICES</span>
            <h1 className="home-hero-heading" style={{ fontSize: '3.5rem' }}>
              We build what makes <br />
              <span className="highlight-cyan">brands move.</span>
            </h1>
            <p className="home-hero-description">
              From strategy and branding to websites, AI-powered content, and growth, we bring everything together to create digital experiences that make a measurable difference.
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
              <button className="explore-work-btn" onClick={() => { setActiveTab('work'); navigateTo('portfolio-archive'); }}>
                View Our Work
              </button>
            </div>
          </div>

          <div className="featured-right">
            <div className="capabilities-collage capabilities-collage-services">
              <div className="collage-card card-web-services">
                <img src="/project_card1.jpg" alt="Website UI" />
              </div>
              <div className="collage-card card-brand-services">
                <img src="/featured.jpg" alt="Brand Identity Board" />
              </div>
              <div className="collage-card card-ai-services">
                <img src="/synthetic_horizons.jpg" alt="AI Visual" />
              </div>
              <div className="collage-card card-social-services">
                <img src="/poster1.jpg" alt="Social Creative" />
              </div>
              <div className="collage-card card-video-services">
                <img src="/reel1.jpg" alt="Video Frame" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO (Core Services Index) */}
      <section className="core-services-section">
        <div className="section-container">
          <span className="featured-tag">WHAT WE DO</span>
          <h2 className="section-heading">One agency. Every digital capability.</h2>
          <p className="section-description">
            We combine strategy, creativity, technology, and growth into one connected system &mdash; so every part of your digital presence works together.
          </p>

          <div className="services-index-container">
            {/* 01 - BRANDING */}
            <div className={`service-index-block ${activeAccordion === '01' ? 'active' : ''}`} onClick={() => toggleService('01')} style={{ cursor: 'pointer' }}>
              <div className="service-index-header">
                <span className="service-index-num">01</span>
                <div className="service-index-main">
                  <h3 className="service-index-name">BRANDING</h3>
                  {activeAccordion === '01' && (
                    <>
                      <p className="service-index-tagline">Turn ideas into distinctive creative that connects.</p>
                      <div className="service-index-tags">
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-branding'); }}>Creative Direction</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-branding'); }}>Visual Concepts</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-branding'); }}>Campaign Design</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-branding'); }}>Social Creatives</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-branding'); }}>Art Direction</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="service-index-arrow" style={{ transform: activeAccordion === '01' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 02 - WEBSITES */}
            <div className={`service-index-block ${activeAccordion === '02' ? 'active' : ''}`} onClick={() => toggleService('02')} style={{ cursor: 'pointer' }}>
              <div className="service-index-header">
                <span className="service-index-num">02</span>
                <div className="service-index-main">
                  <h3 className="service-index-name">WEBSITES</h3>
                  {activeAccordion === '02' && (
                    <>
                      <p className="service-index-tagline">Combine strategy, interaction and performance into memorable digital experiences.</p>
                      <div className="service-index-tags">
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-websites'); }}>Website Strategy</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-websites'); }}>UI/UX Design</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-websites'); }}>Interactive Experiences</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-websites'); }}>Responsive Development</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-websites'); }}>Conversion-Focused Design</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="service-index-arrow" style={{ transform: activeAccordion === '02' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 03 - CREATIVE */}
            <div className={`service-index-block ${activeAccordion === '03' ? 'active' : ''}`} onClick={() => toggleService('03')} style={{ cursor: 'pointer' }}>
              <div className="service-index-header">
                <span className="service-index-num">03</span>
                <div className="service-index-main">
                  <h3 className="service-index-name">CREATIVE</h3>
                  {activeAccordion === '03' && (
                    <>
                      <p className="service-index-tagline">Scroll-stopping AI video and visual experimentation.</p>
                      <div className="service-index-tags">
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-ai-creative'); }}>AI Video Production</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-ai-creative'); }}>Generative Visuals</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-ai-creative'); }}>Motion Experiments</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-ai-creative'); }}>Social-First Content</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-ai-creative'); }}>Creative Automation</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="service-index-arrow" style={{ transform: activeAccordion === '03' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 04 - CONTENT */}
            <div className={`service-index-block ${activeAccordion === '04' ? 'active' : ''}`} onClick={() => toggleService('04')} style={{ cursor: 'pointer' }}>
              <div className="service-index-header">
                <span className="service-index-num">04</span>
                <div className="service-index-main">
                  <h3 className="service-index-name">CONTENT</h3>
                  {activeAccordion === '04' && (
                    <>
                      <p className="service-index-tagline">Strategic content that gives brands something meaningful to say.</p>
                      <div className="service-index-tags">
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-content'); }}>Content Strategy</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-content'); }}>Social Content</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-content'); }}>Copywriting</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-content'); }}>Campaign Content</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-content'); }}>Brand Storytelling</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="service-index-arrow" style={{ transform: activeAccordion === '04' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 05 - GROWTH */}
            <div className={`service-index-block ${activeAccordion === '05' ? 'active' : ''}`} onClick={() => toggleService('05')} style={{ cursor: 'pointer' }}>
              <div className="service-index-header">
                <span className="service-index-num">05</span>
                <div className="service-index-main">
                  <h3 className="service-index-name">GROWTH &amp; BLOGS</h3>
                  {activeAccordion === '05' && (
                    <>
                      <p className="service-index-tagline">Explore thinking, creative perspectives, insights and ideas.</p>
                      <div className="service-index-tags">
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-growth'); }}>Industry Insights</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-growth'); }}>Creative Thinking</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-growth'); }}>Brand Stories</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-growth'); }}>Digital Trends</span>
                        <span style={{ cursor: 'pointer' }} onClick={() => { setActiveTab('services'); navigateTo('service-growth'); }}>Growth Ideas</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="service-index-arrow" style={{ transform: activeAccordion === '05' ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE DETAIL SHOWCASE (How We Create) */}
      <section className="service-detail-showcase-section">
        <div className="section-container">
          <span className="featured-tag">HOW WE CREATE</span>
          <h2 className="section-heading">Strategy gives the work direction. <br />Creativity gives it impact.</h2>

          <div className="features-alternating-container">
            {/* Feature 01 - Strategy + Brand */}
            <div className="feature-row">
              <div className="feature-visual-wrapper">
                <img src="/featured.jpg" alt="Strategy + Brand Design moodboard" loading="lazy" />
              </div>
              <div className="feature-text-block">
                <span className="feature-eyebrow">01 / STRATEGY + BRAND</span>
                <h3 className="feature-heading">Build a brand people can recognize instantly.</h3>
                <p className="feature-description-text">
                  We define your positioning, voice, identity, and visual system so your brand feels consistent everywhere it appears.
                </p>
                <div className="feature-bullets">
                  <span>Brand Strategy</span>
                  <span>Visual Identity</span>
                  <span>Art Direction</span>
                  <span>Brand Systems</span>
                </div>
                <span className="feature-explore-link" style={{ cursor: 'pointer' }} onClick={() => navigateTo('service-branding')}>
                  Explore Branding <span className="arrow">&rarr;</span>
                </span>
              </div>
            </div>

            {/* Feature 02 - Digital Experiences (Reversed Layout) */}
            <div className="feature-row row-reverse">
              <div className="feature-visual-wrapper">
                <img src="/project_card1.jpg" alt="Digital Experience screens" loading="lazy" />
              </div>
              <div className="feature-text-block">
                <span className="feature-eyebrow">02 / DIGITAL EXPERIENCES</span>
                <h3 className="feature-heading">Websites designed to be experienced, not just viewed.</h3>
                <p className="feature-description-text">
                  We combine UX, visual design, interaction, and development to create digital experiences that are fast, intuitive, and memorable.
                </p>
                <div className="feature-bullets">
                  <span>UI/UX</span>
                  <span>Web Design</span>
                  <span>Development</span>
                  <span>Interactive Experiences</span>
                </div>
                <span className="feature-explore-link" style={{ cursor: 'pointer' }} onClick={() => navigateTo('service-websites')}>
                  Explore Websites <span className="arrow">&rarr;</span>
                </span>
              </div>
            </div>

            {/* Feature 03 - AI + Content */}
            <div className="feature-row">
              <div className="feature-visual-wrapper">
                <img src="/synthetic_horizons.jpg" alt="AI + Content design frames" loading="lazy" />
              </div>
              <div className="feature-text-block">
                <span className="feature-eyebrow">03 / CREATIVE + CONTENT</span>
                <h3 className="feature-heading">More creative possibilities. Less production friction.</h3>
                <p className="feature-description-text">
                  We use modern creative workflows to explore more ideas, produce faster, and push creative possibilities further.
                </p>
                <div className="feature-bullets">
                  <span>AI Visuals</span>
                  <span>Reels</span>
                  <span>Social Content</span>
                  <span>Campaign Creative</span>
                </div>
                <span className="feature-explore-link" style={{ cursor: 'pointer' }} onClick={() => navigateTo('service-ai-creative')}>
                  Explore Creative <span className="arrow">&rarr;</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer setActiveTab={setActiveTab} navigateTo={navigateTo} />
    </main>
  )
}
