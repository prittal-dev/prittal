import {
  Palette,
  Fingerprint,
  BookOpen,
  Monitor,
  Package,
  Share2,
  Search,
  Instagram,
  PenTool,
  MessageCircle,
  Target,
  Megaphone,
  BarChart3,
  Filter,
  Activity,
  Video,
  Film,
  Users,
  Play,
  Camera,
  Calendar,
  Sparkles,
  MapPin,
  Building2,
  ShoppingBag,
  ShoppingCart,
  FileText,
  Zap,
  Star,
  ShieldCheck,
  TrendingUp,
  Layers,
  Award
} from 'lucide-react';

export const servicesData = [
  {
    id: 'brand-design',
    slug: 'brand-design',
    num: '01',
    eyebrow: 'Service 01',
    badge: 'Brand Identity & Systems',
    icon: Palette,
    title: 'Brand and design',
    displayTitle: 'Brand & Design',
    desc: 'Logo, identity, UI, packaging — we make you look like you mean business.',
    lede: 'Logo, identity, UI, packaging — we make you look like you mean business. Everything a brand touches, designed as one connected system instead of six disconnected assets.',
    stats: [
      { label: 'Asset Cohesion', value: '100%' },
      { label: 'Avg Delivery', value: '2–4 wks' },
      { label: 'Full IP Handover', value: 'Included' }
    ],
    deliverables: [
      'Visual Identity Systems',
      'Brand Guidelines',
      'Web & App UI/UX'
    ],
    capabilities: [
      {
        icon: Fingerprint,
        title: 'Visual identity systems',
        desc: 'Logo suites, color palettes and type systems built to hold up across packaging, ads, apps and everything in between.',
        tags: ['Primary & Secondary Logos', 'Typography Pairing', 'Palette System']
      },
      {
        icon: BookOpen,
        title: 'Brand guidelines',
        desc: 'A single reference document so every designer, vendor and freelancer you work with stays consistently on-brand.',
        tags: ['Voice & Tone Docs', 'Asset Usage Rules', 'Export Presets']
      },
      {
        icon: Monitor,
        title: 'Web and app UI/UX',
        desc: 'Interfaces designed around how people actually use your product, not just how it looks in a mockup.',
        tags: ['Figma Design Systems', 'Interactive Prototypes', 'Responsive Layouts']
      },
      {
        icon: Package,
        title: 'Packaging and print',
        desc: 'Shelf-ready packaging and collateral that carry the brand story into someone\'s hands.',
        tags: ['Dielines & 3D Renders', 'Print Collateral', 'Retail Unboxing']
      }
    ],
    process: [
      {
        num: '01',
        name: 'Discover',
        desc: 'Audit your current brand, category and competitors to find the real gap.',
        deliverable: 'Audit Deck & Category Positioning Matrix'
      },
      {
        num: '02',
        name: 'Define',
        desc: 'Lock the strategy — positioning, voice and visual direction — before any design starts.',
        deliverable: 'Moodboard, Style Directions & Creative Brief'
      },
      {
        num: '03',
        name: 'Design',
        desc: 'Build the identity system: logo, color, type, UI components and guidelines.',
        deliverable: 'Core Assets, Screen Designs & Identity Kit'
      },
      {
        num: '04',
        name: 'Deploy',
        desc: 'Roll the system out across every touchpoint, with docs your team can self-serve.',
        deliverable: 'Complete Vector Exports & Brand Bible'
      }
    ],
    closing: {
      heading: 'Ready to talk brand and design?',
      desc: 'Tell us where you\'re stuck and we\'ll tell you honestly if this is the right service to start with.'
    }
  },
  {
    id: 'digital-marketing',
    slug: 'best-digital-marketing-company-in-delhi',
    metaTitle: 'Best Digital Marketing Company in Delhi | Strategy, Performance & Growth',
    metaDescription: 'Prittal is a professional digital marketing company in India offering data-driven performance marketing, strategy and growth solutions for brands.',
    num: '02',
    eyebrow: 'Service 02',
    badge: 'Organic Engine & Presence',
    icon: Share2,
    title: 'Digital marketing',
    displayTitle: 'Digital Marketing',
    desc: 'Social media, SEO, content — showing up where your audience actually scrolls.',
    lede: 'Social media, SEO, content — showing up where your audience actually scrolls. We build the organic engine that keeps your brand visible between campaigns.',
    stats: [
      { label: 'Organic Reach', value: '3.5x+' },
      { label: 'Keyword Rankings', value: 'Top 10' },
      { label: 'Content Cadence', value: 'Weekly' }
    ],
    deliverables: [
      'SEO & Search Positioning',
      'Social Media Strategy',
      'Content Engine'
    ],
    capabilities: [
      {
        icon: Search,
        title: 'SEO and search positioning',
        desc: 'Technical fixes, content structure and link building aimed at ranking for the searches that actually convert.',
        tags: ['Technical Audit', 'On-Page SEO', 'High-Intent Keywords']
      },
      {
        icon: Instagram,
        title: 'Social media strategy',
        desc: 'A content calendar and channel plan built around where your specific audience spends time.',
        tags: ['Channel Strategy', 'Monthly Content Calendar', 'Reel Concepts']
      },
      {
        icon: PenTool,
        title: 'Content engine',
        desc: 'A repeatable system for producing posts, articles and assets without starting from zero every week.',
        tags: ['Editorial Articles', 'Visual Carousels', 'Asset Repurposing']
      },
      {
        icon: MessageCircle,
        title: 'Community management',
        desc: 'Real responses to real comments and DMs, so your channels feel active, not automated.',
        tags: ['DM Responses', 'Comment Moderation', 'Audience Nurturing']
      }
    ],
    process: [
      {
        num: '01',
        name: 'Audit',
        desc: 'Review current channels, rankings and content performance to find quick wins.',
        deliverable: 'Full Channel & Keyword Baseline Report'
      },
      {
        num: '02',
        name: 'Plan',
        desc: 'Set a content and SEO calendar tied to real business goals, not vanity metrics.',
        deliverable: '90-Day Content Roadmap & SEO Strategy'
      },
      {
        num: '03',
        name: 'Produce',
        desc: 'Write, design and publish on a consistent cadence across every channel.',
        deliverable: 'Weekly Batch Production & Publishing'
      },
      {
        num: '04',
        name: 'Report',
        desc: 'Monthly reporting on traffic, rankings and engagement, in plain language.',
        deliverable: 'Executive Dashboard & Iteration Plan'
      }
    ],
    closing: {
      heading: 'Ready to talk digital marketing?',
      desc: 'Tell us where you\'re stuck and we\'ll tell you honestly if this is the right service to start with.'
    }
  },
  {
    id: 'performance-marketing',
    slug: 'performance-marketing-agency-in-india',
    metaTitle: 'Performance Marketing Agency India | ROI-Driven Growth',
    metaDescription: 'Prittal is a leading performance marketing agency in India, delivering Google Ads, paid media and ROI-driven strategies that drive measurable business growth.',
    num: '03',
    eyebrow: 'Service 03',
    badge: 'Paid Ads & High ROAS',
    icon: Target,
    title: 'Performance marketing',
    displayTitle: 'Performance Marketing',
    desc: 'Paid ads that don\'t just run — they return. Every rupee tracked.',
    lede: 'Paid ads that don\'t just run — they return. Every rupee tracked, every campaign built around a number you actually care about.',
    stats: [
      { label: 'Average ROAS', value: '3.8x+' },
      { label: 'Attribution Tracking', value: '100%' },
      { label: 'Weekly Iterations', value: 'Active' }
    ],
    deliverables: [
      'Meta & Google Paid Ads',
      'High-ROAS Media Buying',
      'Conversion Funnel Opt.'
    ],
    capabilities: [
      {
        icon: Megaphone,
        title: 'Meta and Google paid ads',
        desc: 'Campaign structures built for your funnel stage, not a generic template copied across every client.',
        tags: ['Meta Ads (FB/IG)', 'Google Search & PMax', 'Creative Testing Matrix']
      },
      {
        icon: BarChart3,
        title: 'High-ROAS media buying',
        desc: 'Budget allocated toward what\'s actually converting, reviewed and shifted weekly rather than set and forgotten.',
        tags: ['Budget Optimization', 'Audience Retargeting', 'Scale Management']
      },
      {
        icon: Filter,
        title: 'Conversion funnel optimization',
        desc: 'Landing pages, offers and checkout flows tightened to close the gap between click and purchase.',
        tags: ['Landing Page CRO', 'Offer Structuring', 'Drop-off Reduction']
      },
      {
        icon: Activity,
        title: 'Attribution and tracking',
        desc: 'Clean pixel and analytics setup so you know exactly which ad, not just which platform, drove the sale.',
        tags: ['GA4 & CAPI Setup', 'Server-Side Pixels', 'Multi-Touch Tracking']
      }
    ],
    process: [
      {
        num: '01',
        name: 'Baseline',
        desc: 'Audit existing ad accounts, tracking and past performance.',
        deliverable: 'Ad Account Audit & Pixel Health Check'
      },
      {
        num: '02',
        name: 'Build',
        desc: 'Structure campaigns around funnel stage, audience and creative angle.',
        deliverable: 'Campaign Architecture & Creative Angles'
      },
      {
        num: '03',
        name: 'Launch',
        desc: 'Go live with clear testing plans for creative, copy and audiences.',
        deliverable: 'Live Campaigns & A/B Testing Grid'
      },
      {
        num: '04',
        name: 'Scale',
        desc: 'Double down on what\'s working, cut what isn\'t, weekly.',
        deliverable: 'Weekly Optimization & Scaling Blueprint'
      }
    ],
    closing: {
      heading: 'Ready to talk performance marketing?',
      desc: 'Tell us where you\'re stuck and we\'ll tell you honestly if this is the right service to start with.'
    }
  },
  {
    id: 'video-production',
    slug: 'ai-video-production-company-in-india',
    metaTitle: 'AI Video Production Company in India | Creative Video Solutions',
    metaDescription: 'Prittal is a leading AI video production agency in India, creating AI-powered videos, UGC content and creative visual solutions that help brands engage and grow.',
    num: '04',
    eyebrow: 'Service 04',
    badge: 'Cinematic & High-Retention',
    icon: Video,
    title: 'Video production',
    displayTitle: 'Video Production',
    desc: 'Brand films, reels, ad shoots — stories that stop the scroll.',
    lede: 'Brand films, reels, ad shoots — stories that stop the scroll. Video built for how it will actually be watched, from a 15-second reel to a full brand film.',
    stats: [
      { label: 'Video Quality', value: '4K Cinema' },
      { label: 'Hook Rate', value: '65%+' },
      { label: 'Turnaround', value: 'Fast Cut' }
    ],
    deliverables: [
      'Cinematic Brand Films',
      'UGC Performance Videos',
      'Short-Form Reels'
    ],
    capabilities: [
      {
        icon: Film,
        title: 'Cinematic brand films',
        desc: 'Hero videos built to carry your brand story on your homepage, pitch decks and paid campaigns.',
        tags: ['Hero Brand Film', 'Director & Cinema Gear', 'Color Grade & SFX']
      },
      {
        icon: Users,
        title: 'UGC performance videos',
        desc: 'Creator-style content built to perform in ad placements, not just look good on a reel.',
        tags: ['Authentic Creator Hooks', 'Direct-Response Cut', 'A/B Hook Variations']
      },
      {
        icon: Play,
        title: 'Short-form reels',
        desc: 'Fast-turnaround vertical video for Instagram and YouTube Shorts, shot and cut for retention.',
        tags: ['Vertical 9:16 Format', 'Dynamic Captions', 'Sound Design']
      },
      {
        icon: Camera,
        title: 'Product and ad shoots',
        desc: 'Studio and on-location shoots for catalog, ad creative and social content in one session.',
        tags: ['Studio Lighting', 'Model & Prop Sourcing', 'High-Res E-Comm Packs']
      }
    ],
    process: [
      {
        num: '01',
        name: 'Concept',
        desc: 'Script and storyboard built around the platform it will run on.',
        deliverable: 'Script, Storyboard & Shot List'
      },
      {
        num: '02',
        name: 'Shoot',
        desc: 'Production day handled end to end — crew, gear, direction.',
        deliverable: 'Raw Footage & On-Set Direction'
      },
      {
        num: '03',
        name: 'Edit',
        desc: 'Cut, grade and sound-design multiple versions for different placements.',
        deliverable: 'Rough Cut, Color Grade & Sound Mix'
      },
      {
        num: '04',
        name: 'Deliver',
        desc: 'Export formats ready for every platform you\'re posting to.',
        deliverable: 'Platform-Ready Video Master Suite'
      }
    ],
    closing: {
      heading: 'Ready to talk video production?',
      desc: 'Tell us where you\'re stuck and we\'ll tell you honestly if this is the right service to start with.'
    }
  },
  {
    id: 'events-activations',
    slug: 'event-management-company-india',
    metaTitle: 'Top Event Management Company India | Experiential & Brand Activation',
    metaDescription: 'Prittal is a professional event management and experiential marketing company in India, delivering strategic brand activations, corporate events and BTL experiences.',
    num: '05',
    eyebrow: 'Service 05',
    badge: 'Experiential & PR Events',
    icon: Calendar,
    title: 'Events and activations',
    displayTitle: 'Events & Activations',
    desc: 'From brand launches to expos — we make your brand felt in a room.',
    lede: 'From brand launches to expos — we make your brand felt in a room. Experiential marketing, influencer PR campaigns, and on-ground activations that connect people to your brand in the real world.',
    stats: [
      { label: 'Event Scale', value: 'Pan-India' },
      { label: 'Creator Network', value: '500+ VIPs' },
      { label: 'Live Footprint', value: 'Turnkey' }
    ],
    deliverables: [
      'Product Launch Events',
      'Influencer PR Campaigns',
      'On-Ground Experiential'
    ],
    capabilities: [
      {
        icon: Sparkles,
        title: 'Product launch events',
        desc: 'Unforgettable launch experiences designed to turn heads, capture press attention, and ignite genuine momentum.',
        tags: ['Concept & Theme', 'VIP Guest Journey', 'Live Stage Production']
      },
      {
        icon: Users,
        title: 'Influencer PR campaigns',
        desc: 'Curated VIP guest lists, custom gifting kits, and high-impact live activations with creator coverage that multiplies reach.',
        tags: ['Gifting Kits', 'VIP Attendance', 'Real-Time Story Drops']
      },
      {
        icon: MapPin,
        title: 'On-ground experiential',
        desc: 'High-touch pop-ups, immersive brand zones, and interactive retail activations that turn foot traffic into loyal customers.',
        tags: ['Pop-Up Architecture', 'Interactive Installations', 'Sampling Stations']
      },
      {
        icon: Building2,
        title: 'Expos & trade booths',
        desc: 'Turnkey booth architecture, attendee engagement funnels, and seamless technical production for international expos.',
        tags: ['Booth Fabrication', 'AV & Lighting', 'Lead Capture Funnels']
      }
    ],
    process: [
      {
        num: '01',
        name: 'Ideate',
        desc: 'Concept, theme, guest journey, and venue selection tailored to your brand goals.',
        deliverable: 'Experience Deck, Venue Options & Budget Plan'
      },
      {
        num: '02',
        name: 'Produce',
        desc: 'Full vendor management, fabrication, lighting, AV, and guest list logistics.',
        deliverable: 'Fabrication Drawings & RSVP Guest List'
      },
      {
        num: '03',
        name: 'Execute',
        desc: 'Flawless on-ground coordination, stage direction, and live experience flow.',
        deliverable: 'Live Event Show-Run & Stage Direction'
      },
      {
        num: '04',
        name: 'Amplify',
        desc: 'High-resolution photo/video capture, instant PR/social reels, and post-event impact review.',
        deliverable: 'After-Movie, PR Coverage & Impact Report'
      }
    ],
    closing: {
      heading: 'Ready to talk events and activations?',
      desc: 'Tell us where you\'re stuck and we\'ll tell you honestly if this is the right service to start with.'
    }
  },
  {
    id: 'marketplace-growth',
    slug: 'marketplace-growth-agency-in-india',
    metaTitle: 'Best Marketplace Growth Agency in India I Ecommerce Growth Consulting',
    metaDescription: 'Prittal is a leading marketplace growth agency in India offering Amazon & Flipkart management, listing optimization, seller growth and ecommerce solutions.',
    num: '06',
    eyebrow: 'Service 06',
    badge: 'E-Commerce & Q-Commerce',
    icon: ShoppingBag,
    title: 'Marketplace growth',
    displayTitle: 'Marketplace Growth',
    desc: 'Amazon, Flipkart, Meesho — we get your products found and bought.',
    lede: 'Amazon, Flipkart, Meesho — we get your products found and bought. Marketplace presence managed like its own channel, not an afterthought.',
    stats: [
      { label: 'Listing Conversion', value: '+45%' },
      { label: 'Channel Coverage', value: 'Top 5 E-Com' },
      { label: 'Q-Commerce Live', value: 'Blinkit/Zepto' }
    ],
    deliverables: [
      'Amazon & Flipkart Scaling',
      'Listing & A+ Content Opt.',
      'Quick-Commerce Setup'
    ],
    capabilities: [
      {
        icon: ShoppingCart,
        title: 'Amazon and Flipkart scaling',
        desc: 'Catalog, ads and inventory strategy built to grow share on the marketplaces that matter most to you.',
        tags: ['Sponsored Brand & Product Ads', 'Buy Box Defense', 'Inventory Forecasting']
      },
      {
        icon: FileText,
        title: 'Listing and A+ content optimization',
        desc: 'Titles, images and A+ content rebuilt around what actually drives clicks and conversion in search.',
        tags: ['A+ Brand Story Modules', 'Infographic Gallery', 'Keyword Indexed Titles']
      },
      {
        icon: Zap,
        title: 'Quick-commerce setup',
        desc: 'Onboarding and listing management for Blinkit, Zepto, Instamart and other quick-commerce platforms.',
        tags: ['Fast Onboarding', 'City Dark-Store Fill', 'Banner Placements']
      },
      {
        icon: Star,
        title: 'Reviews and ratings management',
        desc: 'Systems to build review volume and respond to feedback before it affects your buy box.',
        tags: ['Review Ingestion', 'Customer Resolution', 'Rating Protection']
      }
    ],
    process: [
      {
        num: '01',
        name: 'Audit',
        desc: 'Review current listings, pricing and marketplace performance.',
        deliverable: 'Listing Health & Competitor Gap Analysis'
      },
      {
        num: '02',
        name: 'Optimize',
        desc: 'Rebuild listings, content and keyword targeting.',
        deliverable: 'Rebuilt Titles, Images & A+ Modules'
      },
      {
        num: '03',
        name: 'Advertise',
        desc: 'Run marketplace ad campaigns tied to margin, not just visibility.',
        deliverable: 'Targeted PPC Ads & Keyword Bid Matrix'
      },
      {
        num: '04',
        name: 'Expand',
        desc: 'Add new marketplaces and quick-commerce platforms as volume proves out.',
        deliverable: 'Multi-Channel Scaling & Q-Comm Rollout'
      }
    ],
    closing: {
      heading: 'Ready to talk marketplace growth?',
      desc: 'Tell us where you\'re stuck and we\'ll tell you honestly if this is the right service to start with.'
    }
  }
];

export const getServiceById = (idOrSlug) => {
  if (!idOrSlug) return null;
  const normalized = idOrSlug.toLowerCase().trim().replace(/&/g, 'and').replace(/\s+/g, '-');
  return servicesData.find(
    s => s.id === idOrSlug ||
         s.slug === idOrSlug ||
         s.id === normalized ||
         s.title.toLowerCase() === idOrSlug.toLowerCase() ||
         s.displayTitle.toLowerCase() === idOrSlug.toLowerCase()
  ) || null;
};
