import React, { useState } from 'react';
import prittalLogo from '../../../assets/Prittal_logo.png';
import { 
  Facebook, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  Check,
  Loader2
} from 'lucide-react';

export default function Footer({ onOpenContact, onReplayIntro, onNavigate, onStartProject, onNavigateHome }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { name: 'LinkedIn Page', icon: Linkedin, href: 'https://in.linkedin.com/company/prittalcreative', label: 'LinkedIn Page' },
    { name: 'Instagram Profile', icon: Instagram, href: 'https://www.instagram.com/prittalcreative/', label: 'Instagram Profile' },
    { name: 'Facebook Group', icon: Facebook, href: 'https://www.facebook.com/prittalcreative/', label: 'Facebook Page' },
    { name: 'Twitter Feed', icon: Twitter, href: 'https://twitter.com', label: 'Twitter Feed' },
    { name: 'YouTube Channel', icon: Youtube, href: 'https://www.youtube.com/@prittalcreativeagency5363', label: 'YouTube Channel' },
  ];

  // Quick Links taken from the Package page
  const quickLinks = [
    { name: 'Websites', href: '#websites' },
    { name: 'SEO Optimization', href: '#seo' },
    { name: 'Social Media', href: '#social-media' },
    { name: 'Paid Campaigns', href: '#paid-campaigns' },
    { name: 'Product Shoots', href: '#product-shoots' },
    { name: 'Google My Business', href: '#google-my-business' },
  ];

  const offices = [
    { title: 'INDIA', detail: 'New Delhi, INDIA' },
    { title: 'UAE', detail: 'Dubai, UAE' },
    { title: 'USA', detail: 'California, USA' },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    const submittedEmail = email;
    setEmail('');

    try {
      await fetch('https://formsubmit.co/ajax/sales@prittal.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          subscriber_email: submittedEmail,
          _subject: `New Newsletter Subscriber: ${submittedEmail}`,
          _template: 'table'
        })
      });
    } catch (err) {
      console.error('Subscription submission error:', err);
    } finally {
      setIsSubmitting(false);
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleScrollTo = (href) => {
    if (href === '/' || href === '#' || href === '#hero') {
      if (onNavigateHome) {
        onNavigateHome();
        return;
      }
    }
    if (onNavigate && !href.startsWith('#')) {
      onNavigate(href);
      return;
    }
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const el = document.getElementById(targetId);
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -70, duration: 0.8 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <footer className="w-full bg-black dark:bg-black text-white pt-10 sm:pt-12 pb-8 border-t border-white/10 font-montserrat relative overflow-hidden">
      {/* Subtle Ambient Background Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00afc8]/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section Grid (Brand/Newsletter + 3 Link Columns) */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-10 border-b border-white/15">
          
          {/* Column 1: Brand & Newsletter & Social Icons (col-span-2 lg:col-span-5) */}
          <div className="col-span-2 lg:col-span-5 space-y-4">
            <div className="flex items-center">
              <img
                src={prittalLogo}
                alt="Prittal Logo"
                className="h-6 sm:h-7 w-auto object-contain cursor-pointer"
                onClick={() => onNavigateHome ? onNavigateHome() : handleScrollTo('#hero')}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/Prittal_logo.png';
                }}
              />
            </div>

            {/* Agency Summary Paragraph */}
            <p className="text-[11px] text-white/65 font-light leading-relaxed max-w-xs">
              Your brand growth digital agency scaling brands across India, UAE & USA since 2018.
            </p>

            <p className="font-montserrat text-[11px] sm:text-xs font-normal text-white/60 leading-tight whitespace-nowrap">
              Subscribe to our strategy insights
            </p>

            {/* Compact Email Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-sm">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/[0.14] text-white placeholder-white/40 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#00afc8] focus:bg-white/15 border border-white/15 transition-all shadow-inner"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl bg-[#00afc8] hover:bg-white hover:text-[#003e4d] text-white font-montserrat font-bold text-xs tracking-wide transition-all shadow-md shrink-0 cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-[#00afc8] font-semibold animate-fade-in">
                Thank you! You're subscribed to Prittal Insights.
              </p>
            )}

            {/* Social Icons Directly Below Newsletter Form */}
            <div className="flex items-center gap-2 pt-1 pb-2 lg:pb-0">
              {socialLinks.map((social) => {
                const IconComp = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-[#00afc8] hover:bg-white/10 hover:backdrop-blur-md text-white flex items-center justify-center border border-[#00afc8] hover:border-white/20 hover:text-[#00afc8] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00afc8]/20 group"
                    title={social.label}
                  >
                    <IconComp className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links (col-span-1 lg:col-span-2) */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h4 className="font-montserrat font-extrabold text-xs sm:text-sm text-white tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium text-white/75">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleScrollTo(link.href)}
                    className="hover:text-[#00afc8] transition-colors cursor-pointer text-left inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Address & Contact Details (col-span-1 lg:col-span-2) */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h4 className="font-montserrat font-extrabold text-xs sm:text-sm text-white tracking-wider">
              Locations
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {offices.map((office, idx) => (
                <li key={idx}>
                  <p className="font-bold text-white text-[11px] sm:text-xs">{office.title}</p>
                  <p className="text-white/60 text-[10px] sm:text-[11px]">{office.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get In Touch (col-span-2 lg:col-span-3) */}
          <div className="col-span-2 lg:col-span-3 space-y-3 pt-4 lg:pt-0">
            <div>
              <span className="text-[9px] font-montserrat font-extrabold uppercase tracking-[0.2em] text-[#00afc8] block mb-0.5">
                GET IN TOUCH
              </span>
              <h4 className="font-montserrat font-extrabold text-xs sm:text-sm text-white tracking-tight leading-tight">
                Begin a <span className="text-[#00afc8]">conversation.</span>
              </h4>
            </div>

            <div className="space-y-1.5 pt-1 border-t border-white/15 text-xs font-montserrat">
              <div className="flex items-center justify-between py-1 border-b border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">CALL</span>
                <a href="tel:+919910992774" className="text-[11px] font-semibold text-white hover:text-[#00afc8] transition-colors">
                  +91 99109 92774
                </a>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">EMAIL</span>
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=sales@prittal.com&su=Inquiry%20from%20Website%20-%20Prittal&body=Hi%20Prittal%20Team%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20services." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[11px] font-semibold text-[#00afc8] hover:text-white transition-colors"
                >
                  sales@prittal.com
                </a>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">WHATSAPP</span>
                <a 
                  href="https://wa.me/919910992774?text=Hi%20Prittal%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[11px] font-semibold text-white hover:text-[#00afc8] transition-colors"
                >
                  +91 99109 92774
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar (Copyright Notice) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-start gap-4 text-xs font-montserrat text-white/70">
          <div className="text-left text-[11px] font-medium text-white/60">
            © 2018–2026 Prittal Creative Agency. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}

export { Footer };
