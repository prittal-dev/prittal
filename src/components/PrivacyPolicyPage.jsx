import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft, Mail, Phone, Globe, Lock } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { updateSEOTags } from '../utils/seo';

const POLICY_SECTIONS = [
  {
    id: 'overview',
    title: '1. Overview & Scope',
    paragraphs: [
      'Prittal Creative Agency ("Prittal", "we", "us", or "our") respects your privacy and is committed to protecting the personal data you share with us when visiting https://www.prittal.com (the "Site") or engaging with our branding, creative, digital marketing, and technology services.',
      'This Privacy Policy explains what information we collect, how we use and safeguard it, when it may be shared, and what rights you have regarding your personal data.'
    ]
  },
  {
    id: 'information-collected',
    title: '2. Information We Collect',
    paragraphs: [
      'We collect information that you voluntarily provide to us as well as limited technical information generated automatically when you use our Site:'
    ],
    bullets: [
      'Contact & Inquiry Data: Name, business email address, phone number, company name, project scope, and message details submitted through our contact drawer, consultation forms, or email/WhatsApp links.',
      'Newsletter & Marketing Data: Email address provided when you subscribe to Prittal strategy insights or updates.',
      'Technical & Usage Data: Browser type, device type, operating system, referring URLs, pages visited, and approximate region collected through standard server logs and analytics tools.',
      'Security & Verification Data: Anti-bot verification tokens processed by Cloudflare Turnstile to protect our forms from spam and automated abuse.'
    ]
  },
  {
    id: 'how-we-use',
    title: '3. How We Use Your Information',
    paragraphs: [
      'We use the information we collect strictly for legitimate business and service purposes, including:'
    ],
    bullets: [
      'Responding to project inquiries, preparing proposals, and delivering requested creative, branding, or marketing services.',
      'Sending strategy insights or newsletters when you have explicitly subscribed (you may opt out at any time).',
      'Operating, maintaining, and improving the performance, security, and user experience of https://www.prittal.com.',
      'Preventing fraud, spam, and unauthorized access to our systems.',
      'Complying with applicable legal, regulatory, and contractual obligations.'
    ]
  },
  {
    id: 'google-api-policy',
    title: '4. Google Services & API User Data Policy',
    paragraphs: [
      'We use Google Tag Manager on our Site to manage analytics and performance tags. Additionally, if you interact with any Prittal web application, dashboard, or integration that uses Google OAuth or Google APIs, our use and transfer of information received from Google APIs will adhere strictly to the Google API Services User Data Policy, including the Limited Use requirements.',
      'We do not sell Google user data, we do not use Google user data for serving third-party advertisements, and we only request the minimum permissions necessary to provide the user-facing feature you explicitly authorize.'
    ]
  },
  {
    id: 'cookies',
    title: '5. Cookies & Local Storage',
    paragraphs: [
      'Our Site uses essential browser storage (such as localStorage and sessionStorage) to remember your theme preference (dark or light mode) and session state, as well as analytics cookies managed via Google Tag Manager to understand aggregate traffic patterns.',
      'You can control or disable cookies through your browser settings at any time. Disabling certain storage or cookies may affect minor site preferences such as theme persistence.'
    ]
  },
  {
    id: 'sharing-and-processors',
    title: '6. Sharing of Information & Third-Party Processors',
    paragraphs: [
      'We do not sell, rent, or trade your personal information to third parties. We may share limited data only with trusted service providers who assist us in operating our business under confidentiality obligations:'
    ],
    bullets: [
      'Hosting, infrastructure, and security providers (such as Vercel and Cloudflare Turnstile).',
      'Form delivery and CRM communication tools used to receive and respond to your inquiries.',
      'Analytics providers (such as Google Tag Manager / Google Analytics) to measure aggregate site performance.',
      'Legal or regulatory authorities when required by applicable law or to protect our legal rights.'
    ]
  },
  {
    id: 'retention-security',
    title: '7. Data Retention & Security',
    paragraphs: [
      'We retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, maintain ongoing client relationships, or satisfy legal, accounting, and reporting requirements.',
      'We implement industry-standard technical and organizational safeguards—including HTTPS/TLS encryption in transit, security headers, and access controls—to protect your information against unauthorized access, alteration, or disclosure.'
    ]
  },
  {
    id: 'your-rights',
    title: '8. Your Privacy Rights',
    paragraphs: [
      'Depending on your jurisdiction (including India under the DPDP Act, the European Economic Area/UK under GDPR, California under CCPA, or the UAE), you may have the right to:'
    ],
    bullets: [
      'Request access to the personal data we hold about you.',
      'Request correction of inaccurate or incomplete personal data.',
      'Request deletion of your personal data, subject to legal retention obligations.',
      'Withdraw consent or unsubscribe from marketing communications at any time.',
      'Object to or restrict certain processing activities.'
    ]
  },
  {
    id: 'international-transfers',
    title: '9. International Operations',
    paragraphs: [
      'Prittal operates across India, the United Arab Emirates (UAE), and the United States (USA). Your information may be processed in jurisdictions where our team or trusted service providers operate, with appropriate safeguards in place to protect your privacy.'
    ]
  },
  {
    id: 'children',
    title: "10. Children's Privacy",
    paragraphs: [
      'Our Site and services are intended for businesses and adults and are not directed to individuals under the age of 16. We do not knowingly collect personal data from children.'
    ]
  },
  {
    id: 'updates',
    title: '11. Changes to This Privacy Policy',
    paragraphs: [
      'We may update this Privacy Policy periodically to reflect changes in our practices, technologies, or legal requirements. Any updates will be posted on this page at https://www.prittal.com/privacy-policy with an updated effective date.'
    ]
  }
];

export default function PrivacyPolicyPage({
  onBack,
  onNavigate,
  onOpenContact,
  onReplayIntro,
  isDark,
  onToggleTheme
}) {
  useEffect(() => {
    updateSEOTags({
      title: 'Privacy Policy | Prittal Creative Agency',
      description:
        'Read the Privacy Policy for Prittal Creative Agency (https://www.prittal.com). Learn how we collect, use, protect, and respect your personal data.',
      path: '/privacy-policy',
      type: 'website',
      noIndex: false
    });

    window.scrollTo({ top: 0, behavior: 'auto' });
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col justify-between selection:bg-[#00afc8] selection:text-[#fff6f1] font-montserrat relative transition-colors duration-300 ${
        isDark ? 'bg-black text-[#fff6f1]' : 'bg-[#F8F8F6] text-[#003E4D]'
      }`}
    >
      <Navbar
        onOpenContact={onOpenContact}
        onReplayIntro={onReplayIntro}
        onNavigate={onNavigate}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />

      <main className="flex-1 pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full relative z-10">
        {/* Back Link */}
        <button
          type="button"
          onClick={onBack}
          className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-8 transition-colors cursor-pointer ${
            isDark ? 'text-white/60 hover:text-[#00afc8]' : 'text-[#003E4D]/70 hover:text-[#00afc8]'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={`pb-8 mb-10 border-b ${isDark ? 'border-white/10' : 'border-[#003E4D]/15'}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00afc8]/15 border border-[#00afc8]/30 text-[#00afc8] text-[11px] font-bold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Legal &amp; Privacy</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Privacy Policy
          </h1>

          <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm ${isDark ? 'text-white/65' : 'text-[#003E4D]/75'}`}>
            <span>
              <strong className={isDark ? 'text-white' : 'text-[#003E4D]'}>Brand:</strong> Prittal Creative Agency
            </span>
            <span>
              <strong className={isDark ? 'text-white' : 'text-[#003E4D]'}>Website:</strong> https://www.prittal.com
            </span>
            <span>
              <strong className={isDark ? 'text-white' : 'text-[#003E4D]'}>Last Updated:</strong> November 26, 2026
            </span>
          </div>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {POLICY_SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className={`rounded-2xl p-6 sm:p-8 border transition-colors ${
                isDark
                  ? 'bg-white/[0.03] border-white/10'
                  : 'bg-white border-[#003E4D]/10 shadow-sm'
              }`}
            >
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight mb-3 text-[#00afc8]">
                {section.title}
              </h2>

              <div className={`space-y-3 text-sm sm:text-[15px] leading-relaxed ${isDark ? 'text-white/80' : 'text-[#003E4D]/85'}`}>
                {section.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {section.bullets && (
                <ul className={`mt-4 space-y-2.5 text-sm sm:text-[15px] leading-relaxed list-disc pl-5 ${isDark ? 'text-white/75' : 'text-[#003E4D]/80'}`}>
                  {section.bullets.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Contact Section */}
          <section
            id="contact-us"
            className={`rounded-2xl p-6 sm:p-8 border ${
              isDark
                ? 'bg-[#00afc8]/10 border-[#00afc8]/30'
                : 'bg-[#00afc8]/5 border-[#00afc8]/25'
            }`}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <Lock className="w-5 h-5 text-[#00afc8]" />
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#00afc8]">
                12. Contact Us Regarding Privacy
              </h2>
            </div>

            <p className={`text-sm sm:text-[15px] leading-relaxed mb-5 ${isDark ? 'text-white/85' : 'text-[#003E4D]/85'}`}>
              If you have any questions about this Privacy Policy, wish to exercise your data privacy rights, or need to request deletion of your data, please contact Prittal Creative Agency:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <a
                href="mailto:sales@prittal.com"
                className={`flex items-center gap-2.5 p-3.5 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-black/40 border-white/10 hover:border-[#00afc8] text-white'
                    : 'bg-white border-[#003E4D]/15 hover:border-[#00afc8] text-[#003E4D]'
                }`}
              >
                <Mail className="w-4 h-4 text-[#00afc8] shrink-0" />
                <span className="font-semibold">sales@prittal.com</span>
              </a>

              <a
                href="tel:+919910992774"
                className={`flex items-center gap-2.5 p-3.5 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-black/40 border-white/10 hover:border-[#00afc8] text-white'
                    : 'bg-white border-[#003E4D]/15 hover:border-[#00afc8] text-[#003E4D]'
                }`}
              >
                <Phone className="w-4 h-4 text-[#00afc8] shrink-0" />
                <span className="font-semibold">+91 99109 92774</span>
              </a>

              <a
                href="https://www.prittal.com"
                className={`flex items-center gap-2.5 p-3.5 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-black/40 border-white/10 hover:border-[#00afc8] text-white'
                    : 'bg-white border-[#003E4D]/15 hover:border-[#00afc8] text-[#003E4D]'
                }`}
              >
                <Globe className="w-4 h-4 text-[#00afc8] shrink-0" />
                <span className="font-semibold">www.prittal.com</span>
              </a>
            </div>

            <div className={`mt-5 pt-4 border-t text-xs space-y-1 ${isDark ? 'border-white/10 text-white/65' : 'border-[#003E4D]/10 text-[#003E4D]/70'}`}>
              <p><strong>India:</strong> Okhla Phase III, New Delhi 110020, India</p>
              <p><strong>UAE:</strong> Business Bay, Downtown Dubai, UAE</p>
              <p><strong>USA:</strong> Market St, San Francisco, CA 94105, USA</p>
            </div>
          </section>
        </div>
      </main>

      <Footer
        onOpenContact={onOpenContact}
        onReplayIntro={onReplayIntro}
        onNavigate={onNavigate}
      />
    </div>
  );
}

