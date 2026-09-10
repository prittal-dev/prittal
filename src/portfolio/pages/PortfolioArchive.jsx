import React, { useState } from 'react'
import Footer from '../components/Footer'
import { PROJECTS_DATA } from '../data/projectsData'
import ReelVideoCard from '../components/ReelVideoCard'
import MediaLightboxModal from '../components/MediaLightboxModal'
import BlogFeaturedGallery from '../components/BlogFeaturedGallery'

export default function PortfolioArchive({ setActiveTab, navigateTo, activeFilter: propFilter, setActiveFilter: propSetFilter }) {
  const [localFilter, setLocalFilter] = useState('Archive')
  const activeFilter = propFilter || localFilter
  const setActiveFilter = propSetFilter || setLocalFilter

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

  // 8 Selected Pieces for Archive curated wall
  const selectedWorkItems = [
    PROJECTS_DATA.find(p => p.id === 'ai-8') || PROJECTS_DATA.find(p => p.type === 'ai-video'),
    PROJECTS_DATA.find(p => p.id === 'creative-3') || PROJECTS_DATA.find(p => p.type === 'creative'),
    PROJECTS_DATA.find(p => p.id === 'web-1') || PROJECTS_DATA.find(p => p.type === 'websites'),
    PROJECTS_DATA.find(p => p.id === 'creative-7') || PROJECTS_DATA.filter(p => p.type === 'creative')[1],
    PROJECTS_DATA.find(p => p.id === 'blog-3') || PROJECTS_DATA.find(p => p.type === 'blogs'),
    PROJECTS_DATA.find(p => p.id === 'ai-11') || PROJECTS_DATA.filter(p => p.type === 'ai-video')[1],
    PROJECTS_DATA.find(p => p.id === 'creative-5') || PROJECTS_DATA.filter(p => p.type === 'creative')[2],
    PROJECTS_DATA.find(p => p.id === 'web-4') || PROJECTS_DATA.filter(p => p.type === 'websites')[1]
  ].filter(Boolean)

  return (
    <main className="main-content">
      {/* PORTFOLIO ARCHIVE INTRO SECTION */}
      <section className="archive-intro-section">
        <div className="section-container">
          <div className="archive-intro-content">
            <h2 className="archive-heading">Portfolio Archive</h2>
            <p className="archive-description">
              A condensed view of our capabilities across all digital mediums.
            </p>
          </div>

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
        </div>
      </section>

      {/* TWO-COLUMN ARCHIVE GRID */}
      <section className="archive-grid-section">
        <div className="section-container">
          {activeFilter === 'Archive' ? (
            <div className="selected-work-wall">
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
                  <img src={selectedWorkItems[2].image} alt={selectedWorkItems[2].title || 'Website'} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#ffffff' }} />
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
                    <img src={selectedWorkItems[4].image} alt={selectedWorkItems[4].title || 'Blog Post'} style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: 'var(--card-bg)' }} />
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
                    <img src={selectedWorkItems[7].image} alt={selectedWorkItems[7].title || 'Website'} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#ffffff' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px', background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
                      <h3 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: '700', margin: 0 }}>{selectedWorkItems[7].title}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', margin: '4px 0 0 0' }}>{selectedWorkItems[7].category}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : activeFilter === 'AI Video' ? (
            <div className="ai-video-grid">
              {PROJECTS_DATA.filter(p => p.type === 'ai-video').map((p, idx, arr) => (
                <ReelVideoCard key={p.id} p={p} onClick={() => openLightbox(arr, idx)} />
              ))}
            </div>
          ) : (
            /* FILTERED SINGLE-CATEGORY GRID VIEW */
            <div className="filtered-projects-view fade-in-grid">
              <h3 className="archive-group-heading" style={{ textTransform: 'capitalize' }}>
                {activeFilter}
              </h3>


              {activeFilter === 'Websites' && (
                <div className="archive-platforms-grid">
                  {PROJECTS_DATA.filter(p => p.type === 'websites').map(p => (
                    <div key={p.id} className="archive-platform-card" onClick={p.link && p.link.startsWith('http') ? () => window.open(p.link, '_blank') : undefined}>
                      <div className="view-project-indicator">View Project →</div>
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
              )}

              {activeFilter === 'Creative' && (
                <div className="archive-posters-grid">
                  {PROJECTS_DATA.filter(p => p.type === 'creative').map((p, idx, arr) => (
                    <div key={p.id} className="archive-poster-card" onClick={() => openLightbox(arr, idx)}>
                      <div className="archive-poster-img-wrapper">
                        <img src={p.image} alt={p.title} className="archive-poster-img" loading="lazy" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeFilter === 'Blogs' && (
                <BlogFeaturedGallery 
                  blogs={PROJECTS_DATA.filter(p => p.type === 'blogs')}
                  onSelectBlog={(item, index) => {
                    const blogList = PROJECTS_DATA.filter(p => p.type === 'blogs');
                    openLightbox(blogList, index);
                  }}
                />
              )}

              {(activeFilter === 'Reels' || activeFilter === 'Content') && (
                <div className="archive-reels-grid">
                  {PROJECTS_DATA.filter(p => p.type === 'reels' || p.category === 'Content').map((p, idx, arr) => (
                    <div key={p.id} className="archive-reel-card" onClick={() => openLightbox(arr, idx)} style={{ cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}>
                      <div className="view-project-indicator">View Project →</div>
                      <img src={p.image} alt={p.title} className="archive-reel-img" loading="lazy" style={{ width: '100%', aspectRatio: '9/16', objectFit: 'cover' }} />
                      <div className="archive-reel-overlay" style={{ padding: '16px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                        <div className="archive-reel-play">
                          <svg width="10" height="12" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 2.66699V25.3337C4 2.66699 5.0117 26.7554 5.74103 26.2307L21.491 14.8974C22.0911 14.4654 22.0911 13.5352 21.491 13.1032L5.74103 1.76991C5.0117 1.24522 4 1.77033 4 2.66699Z" fill="#004B59" />
                          </svg>
                        </div>
                        <span className="archive-reel-title" style={{ color: '#ffffff', fontWeight: '600' }}>{p.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
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
