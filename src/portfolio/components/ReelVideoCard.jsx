import React, { useRef, useState } from 'react';

export default function ReelVideoCard({ p, onClick }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const videoSrc = p.video || p.videoUrl || '/videos/ai-reels/reel-01.mp4';

  // Hover preview (muted)
  const handleMouseEnter = () => {
    if (videoRef.current && isMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

  // Pause hover preview on mouse leave only if still muted
  const handleMouseLeave = () => {
    if (videoRef.current && isMuted && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
      return;
    }
  };

  return (
    <div 
      className="archive-reel-card" 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      <div 
        className="view-project-indicator" 
        style={{ 
          backgroundColor: isMuted ? 'rgba(0, 0, 0, 0.75)' : 'var(--cyan-accent)', 
          color: '#ffffff',
          fontWeight: '700'
        }}
      >
        {isMuted ? 'Click for Sound 🔊' : 'Playing 🔊'}
      </div>
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        controls={false}
        muted={isMuted}
        loop
        preload="auto"
        className="archive-reel-img"
        style={{ pointerEvents: 'none', objectFit: 'contain', backgroundColor: '#000' }}
      />
      <div className="archive-reel-overlay">
        <div className="archive-reel-play" style={{ backgroundColor: isMuted ? '#FFFFFF' : 'var(--cyan-accent)' }}>
          {isMuted ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#004B59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </div>
        <span className="archive-reel-title">{p.title}</span>
      </div>
    </div>
  );
}

