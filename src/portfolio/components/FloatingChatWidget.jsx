import React, { useState } from 'react';

export default function FloatingChatWidget({ navigateTo, onOpenProjectModal }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleWidgetClick = () => {
    setIsOpen(prev => !prev);
  };

  const handleOptionClick = (type) => {
    setIsOpen(false);
    if (type === 'whatsapp') {
      window.open('https://wa.me/919728845005', '_blank', 'noopener,noreferrer');
    } else if (type === 'email') {
      window.location.href = 'mailto:sales@prittal.com';
    } else if (type === 'form') {
      if (onOpenProjectModal) {
        onOpenProjectModal();
      }
    }
  };

  return (
    <div className="floating-chat-container">
      {/* Quick Connect Click Popover Modal */}
      {isOpen && (
        <div className="quick-connect-popover fade-in-up">
          {/* Header */}
          <div className="qc-header">
            <div className="qc-header-title">
              <span className="qc-green-dot">●</span>
              <span className="qc-title-text">QUICK CONNECT</span>
            </div>
            <div className="qc-online-badge">Online</div>
          </div>

          <div className="qc-divider"></div>

          {/* Action Cards */}
          <div className="qc-cards-list">
            {/* Card 1: WhatsApp */}
            <div className="qc-card" onClick={() => handleOptionClick('whatsapp')}>
              <div className="qc-icon-box whatsapp-bg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 2.137.672 4.116 1.82 5.74L2 22l4.37-1.77A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.295-1.246l-.308-.184-2.585 1.047 1.047-2.585-.184-.308A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
              </div>
              <div className="qc-card-info">
                <div className="qc-card-title">WhatsApp Chat</div>
                <div className="qc-card-subtitle">Instant message & strategy</div>
              </div>
              <div className="qc-card-arrow">↗</div>
            </div>

            {/* Card 2: Send via Gmail */}
            <div className="qc-card" onClick={() => handleOptionClick('email')}>
              <div className="qc-icon-box email-bg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="qc-card-info">
                <div className="qc-card-title">Send via Gmail</div>
                <div className="qc-card-subtitle">sales@prittal.com</div>
              </div>
              <div className="qc-card-arrow">↗</div>
            </div>

            {/* Card 3: Project Inquiry Form */}
            <div className="qc-card" onClick={() => handleOptionClick('form')}>
              <div className="qc-icon-box form-bg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div className="qc-card-info">
                <div className="qc-card-title">Project Inquiry Form</div>
                <div className="qc-card-subtitle">Book free audit & custom quote</div>
              </div>
              <div className="qc-card-arrow">↗</div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="qc-footer-note">
            Typically responds within minutes
          </div>
        </div>
      )}

      <div className="floating-chat-wrapper">
        {/* Quick Connect Pill Tooltip (Appears on Hover when closed) */}
        {!isOpen && (
          <div className="quick-connect-pill">
            <span className="quick-connect-dot">●</span>
            <span className="quick-connect-text">Quick Connect</span>
          </div>
        )}

        {/* Floating Circular Button */}
        <button 
          className={`floating-chat-btn ${isOpen ? 'is-active' : ''}`}
          onClick={handleWidgetClick}
          aria-label="Open Chat"
        >
          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="#ffffff"/>
              <path d="M7 7H17V9H7V7ZM7 11H14V13H7V11Z" fill="#ffffff"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
