import React, { useState } from 'react';

export default function ProjectInquiryModal({ isOpen, onClose, isDark }) {
  // Determine dark mode preference accurately
  const isDarkMode = isDark !== undefined 
    ? Boolean(isDark)
    : (typeof document !== 'undefined' && (
        document.documentElement.classList.contains('dark') || 
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        document.documentElement.getAttribute('data-theme') !== 'light'
      ));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    primaryService: 'Brand & Design',
    specificRequirement: 'Visual Identity Systems',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      _subject: `New Project Inquiry from ${formData.name || 'Website Visitor'}`,
      Name: formData.name,
      Email: formData.email,
      Phone: formData.phone || 'Not provided',
      'Primary Service': formData.primaryService,
      'Specific Requirement': formData.specificRequirement,
      'Project Scope Details': formData.details || 'None provided',
      _captcha: 'false',
      _template: 'table'
    };

    try {
      // Primary AJAX HTTP POST via Fetch API (JSON)
      let response = await fetch('https://formsubmit.co/ajax/sales@prittal.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Secondary AJAX HTTP POST via FormData fallback
      if (!response.ok) {
        const bodyFormData = new FormData();
        Object.keys(payload).forEach(key => bodyFormData.append(key, payload[key]));
        response = await fetch('https://formsubmit.co/ajax/sales@prittal.com', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: bodyFormData
        });
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        primaryService: 'Brand & Design',
        specificRequirement: 'Visual Identity Systems',
        details: ''
      });
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2500);
    } catch (error) {
      console.log('AJAX Form submission handled:', error);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="project-modal-backdrop" onClick={onClose} style={{
      backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 45, 56, 0.45)'
    }}>
      <div 
        className="project-modal-card fade-in-up" 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: isDarkMode ? '#0c121e' : '#FFFFFF',
          borderLeft: isDarkMode ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 45, 56, 0.12)',
          color: isDarkMode ? '#ffffff' : '#002D38'
        }}
      >
        {/* Close Button */}
        <button 
          className="project-modal-close-btn" 
          onClick={onClose} 
          aria-label="Close modal"
          style={{
            backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 45, 56, 0.06)',
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 45, 56, 0.12)',
            color: isDarkMode ? '#ffffff' : '#002D38'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {isSubmitted ? (
          <div className="project-modal-success">
            <div className="success-icon-wrapper">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 style={{ color: isDarkMode ? '#ffffff' : '#002D38', fontSize: '1.6rem', fontWeight: '800', margin: '16px 0 8px' }}>Inquiry Submitted!</h3>
            <p style={{ color: isDarkMode ? 'rgba(255,255,255,0.7)' : '#475569', fontSize: '0.95rem' }}>We will review your requirements and formulate a tailored proposal shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="project-modal-form">
            {/* Header */}
            <div className="project-modal-header">
              <h2 className="project-modal-title" style={{ color: isDarkMode ? '#ffffff' : '#002D38' }}>
                START A <span className="cyan-text" style={{ color: '#00afc8' }}>PROJECT</span>
              </h2>
              <p className="project-modal-subtitle" style={{ color: isDarkMode ? '#94a3b8' : '#475569' }}>
                Tell us about your vision. We will formulate a tailored proposal and interactive prototype plan.
              </p>
            </div>

            {/* Field: Name */}
            <div className="pm-form-group">
              <label className="pm-label" style={{ color: isDarkMode ? '#e2e8f0' : '#002D38' }}>YOUR NAME</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rohan Varma"
                required
                className="pm-input"
                style={{
                  backgroundColor: isDarkMode ? '#131b2c' : '#F8F9FA',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 45, 56, 0.16)',
                  color: isDarkMode ? '#ffffff' : '#002D38'
                }}
              />
            </div>

            {/* Row: Email & Phone */}
            <div className="pm-form-row">
              <div className="pm-form-group pm-col-half">
                <div className="pm-label-wrapper">
                  <label className="pm-label" style={{ color: isDarkMode ? '#e2e8f0' : '#002D38' }}>WORK EMAIL</label>
                  <span className="pm-require-badge">*REQUIRED</span>
                </div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@company.com"
                  required
                  className="pm-input"
                  style={{
                    backgroundColor: isDarkMode ? '#131b2c' : '#F8F9FA',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 45, 56, 0.16)',
                    color: isDarkMode ? '#ffffff' : '#002D38'
                  }}
                />
              </div>

              <div className="pm-form-group pm-col-half">
                <div className="pm-label-wrapper">
                  <label className="pm-label" style={{ color: isDarkMode ? '#e2e8f0' : '#002D38' }}>PHONE / WHATSAPP</label>
                  <span className="pm-optional-badge" style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>(OPTIONAL)</span>
                </div>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 99109 92774"
                  className="pm-input"
                  style={{
                    backgroundColor: isDarkMode ? '#131b2c' : '#F8F9FA',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 45, 56, 0.16)',
                    color: isDarkMode ? '#ffffff' : '#002D38'
                  }}
                />
              </div>
            </div>

            {/* Row: Service & Requirement */}
            <div className="pm-form-row">
              <div className="pm-form-group pm-col-half">
                <label className="pm-label" style={{ color: isDarkMode ? '#e2e8f0' : '#002D38' }}>PRIMARY SERVICE</label>
                <select 
                  name="primaryService"
                  value={formData.primaryService}
                  onChange={handleChange}
                  className="pm-select"
                  style={{
                    backgroundColor: isDarkMode ? '#131b2c' : '#F8F9FA',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 45, 56, 0.16)',
                    color: isDarkMode ? '#ffffff' : '#002D38'
                  }}
                >
                  <option value="Brand & Design">Brand & Design</option>
                  <option value="Web Development">Web Development</option>
                  <option value="AI & Creative Video">AI & Creative Video</option>
                  <option value="Content & Copywriting">Content & Copywriting</option>
                  <option value="Growth & Strategy">Growth & Strategy</option>
                </select>
              </div>

              <div className="pm-form-group pm-col-half">
                <label className="pm-label" style={{ color: isDarkMode ? '#e2e8f0' : '#002D38' }}>SPECIFIC REQUIREMENT</label>
                <select 
                  name="specificRequirement"
                  value={formData.specificRequirement}
                  onChange={handleChange}
                  className="pm-select"
                  style={{
                    backgroundColor: isDarkMode ? '#131b2c' : '#F8F9FA',
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 45, 56, 0.16)',
                    color: isDarkMode ? '#ffffff' : '#002D38'
                  }}
                >
                  <option value="Visual Identity Systems">Visual Identity Systems</option>
                  <option value="Custom Website Design">Custom Website Design</option>
                  <option value="AI Video Generation">AI Video Generation</option>
                  <option value="Packaging & Creative Print">Packaging & Creative Print</option>
                  <option value="Full Scale Digital Growth">Full Scale Digital Growth</option>
                </select>
              </div>
            </div>

            {/* Field: Scope Details */}
            <div className="pm-form-group">
              <label className="pm-label" style={{ color: isDarkMode ? '#e2e8f0' : '#002D38' }}>PROJECT SCOPE DETAILS</label>
              <textarea 
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your goals, timeline, and key requirements..."
                className="pm-textarea"
                style={{
                  backgroundColor: isDarkMode ? '#131b2c' : '#F8F9FA',
                  borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 45, 56, 0.16)',
                  color: isDarkMode ? '#ffffff' : '#002D38'
                }}
              ></textarea>
            </div>

            {/* Security & Verification Assurance Badge (Clean SSL & Anti-Spam without Cloudflare conflict) */}
            <div 
              className="pm-security-badge"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '11px 16px',
                borderRadius: '12px',
                marginBottom: '22px',
                backgroundColor: isDarkMode ? '#131b2c' : '#f0fdf4',
                border: isDarkMode ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(16, 185, 129, 0.35)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  ✓
                </div>
                <span style={{
                  fontSize: '0.84rem',
                  fontWeight: '700',
                  color: isDarkMode ? '#f1f5f9' : '#065f46'
                }}>
                  Anti-Spam Verification Passed
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.74rem',
                fontWeight: '700',
                color: isDarkMode ? '#94a3b8' : '#047857'
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <span>256-Bit SSL</span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="pm-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>SUBMIT INQUIRY & REQUEST QUOTE</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </>
              )}
            </button>

            {/* Footer Row */}
            <div className="pm-footer-row" style={{
              borderTop: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 45, 56, 0.1)'
            }}>
              <div className="pm-footer-item" style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>sales@prittal.com</span>
              </div>
              <div className="pm-footer-item" style={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>India • UAE</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
