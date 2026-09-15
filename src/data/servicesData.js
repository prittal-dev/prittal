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
    },
    faqs: [
      {
        id: 'bd-1',
        question: 'What does your Brand & Design service include?',
        answer: 'We create complete brand systems including logo design, visual identity, typography, color palettes, UI design, packaging, and brand guidelines.'
      },
      {
        id: 'bd-2',
        question: 'Can you redesign an existing brand identity?',
        answer: 'Yes. We can refresh or completely rework an existing identity while keeping the elements that already have value for your business.'
      },
      {
        id: 'bd-3',
        question: 'Do you provide a complete brand identity system or just a logo?',
        answer: 'We focus on building a complete, connected brand system—not just a standalone logo—so your brand stays consistent across every touchpoint.'
      },
      {
        id: 'bd-4',
        question: 'What will I receive at the end of the project?',
        answer: 'You receive a complete brand kit with final design assets, guidelines, editable/source files, and the formats needed for digital and print use.'
      },
      {
        id: 'bd-5',
        question: 'How long does a Brand & Design project take?',
        answer: 'Most projects take around 2–4 weeks, depending on the scope, number of deliverables, and feedback rounds.'
      },
      {
        id: 'bd-6',
        question: 'Can the branding be customized for my industry and audience?',
        answer: 'Absolutely. Every identity is developed around your business, target audience, positioning, and industry rather than using a one-size-fits-all template.'
      },
      {
        id: 'bd-7',
        question: 'Will I have full ownership of the final brand assets?',
        answer: 'Yes. Once the project is completed according to the agreed terms, we provide the final assets and applicable intellectual-property handover.'
      },
      {
        id: 'bd-8',
        question: 'Can you design branding for both digital and physical applications?',
        answer: 'Yes. We can create a system that works across websites, social media, apps, packaging, print materials, presentations, and other brand touchpoints.'
      }
    ]
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    metaTitle: 'Best Digital Marketing Company | Strategy, Performance & Growth',
    metaDescription: 'Prittal is a professional digital marketing company offering data-driven performance marketing, strategy and growth solutions for brands.',
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
        title: 'Copywriting and messaging',
        desc: 'Clear, direct writing for landing pages, emails, and ads that turns interest into action.',
        tags: ['Landing Page Copy', 'Email Sequences', 'Ad Copy Matrix']
      }
    ],
    process: [
      {
        num: '01',
        name: 'Audit',
        desc: 'Review your current channels, content performance, search rankings and competitor presence.',
        deliverable: 'Digital Presence Audit & Keyword Gap Matrix'
      },
      {
        num: '02',
        name: 'Plan',
        desc: 'Build a channel strategy, content themes, keyword priority list and posting cadence.',
        deliverable: 'Content Strategy Deck & 90-Day SEO Roadmap'
      },
      {
        num: '03',
        name: 'Produce',
        desc: 'Create on-brand posts, SEO articles, carousels, reels and copy every week.',
        deliverable: 'Monthly Content Calendar & Production Assets'
      },
      {
        num: '04',
        name: 'Optimize',
        desc: 'Track what ranks and converts, doubling down on winning topics and adjusting channel mix.',
        deliverable: 'Monthly Performance Analytics & Rank Report'
      }
    ],
    closing: {
      heading: 'Ready to talk digital marketing?',
      desc: 'Tell us where you\'re stuck and we\'ll tell you honestly if this is the right service to start with.'
    },
    faqs: [
      {
        id: 'dm-1',
        question: 'What does your Digital Marketing service include?',
        answer: 'Our digital marketing services include search engine optimization (SEO), social media strategy, content creation, brand copy, email marketing, and ongoing presence management.'
      },
      {
        id: 'dm-2',
        question: 'How quickly can I expect results from SEO and digital marketing?',
        answer: 'While paid ads bring fast traffic, organic digital marketing and SEO usually start showing noticeable growth in visibility and traffic within 3 to 6 months.'
      },
      {
        id: 'dm-3',
        question: 'Which social media platforms do you manage?',
        answer: 'We focus on the channels where your target audience is most active, including Instagram, LinkedIn, YouTube, Facebook, and emerging platforms.'
      },
      {
        id: 'dm-4',
        question: 'Do you create original content or just handle strategy?',
        answer: 'We handle both. Our team creates original copy, graphics, articles, carousels, and video concepts in addition to developing the overall growth strategy.'
      },
      {
        id: 'dm-5',
        question: 'Will I receive regular performance reports?',
        answer: 'Yes. We provide clear, straightforward monthly reports tracking key metrics such as organic search rankings, reach, engagement, website traffic, and leads.'
      },
      {
        id: 'dm-6',
        question: 'Can you improve the rankings of my existing website?',
        answer: 'Yes. We can audit your existing website, identify SEO opportunities, and develop an optimization strategy to improve its search visibility and organic performance.'
      }
    ]
  },
  {
    id: 'performance-marketing',
    slug: 'performance-marketing',
    metaTitle: 'Performance Marketing Agency | ROI-Driven Growth',
    metaDescription: 'Prittal is a leading performance marketing agency, delivering Google Ads, paid media and ROI-driven strategies that drive measurable business growth.',
    num: '03',
    eyebrow: 'Service 03',
    badge: 'Paid Ads & High ROAS',
    icon: Target,
    title: 'Performance marketing',
    displayTitle: 'Performance Marketing',
    desc: 'Google Ads, Meta Ads, funnel optimization — turned into actual revenue.',
    lede: 'Google Ads, Meta Ads, funnel optimization — turned into actual revenue. We manage paid budgets with the discipline of a financial portfolio.',
    stats: [
      { label: 'Avg ROAS', value: '4.2x+' },
      { label: 'Ad Spend Managed', value: '₹10Cr+' },
      { label: 'Conversion Lift', value: '+35%' }
    ],
    deliverables: [
      'Google & Meta Ad Campaigns',
      'Funnel & Conversion Audit',
      'Creative Ad Testing'
    ],
    capabilities: [
      {
        icon: Megaphone,
        title: 'Paid search (Google Ads)',
        desc: 'Search, Shopping, and Performance Max campaigns targeting buyers at the moment of intent.',
        tags: ['Search & Shopping Ads', 'PMax Campaign Structure', 'Negative Keyword Lists']
      },
      {
        icon: BarChart3,
        title: 'Paid social (Meta & LinkedIn)',
        desc: 'Full-funnel ad campaigns designed around testing angles, audiences, and creatives continuously.',
        tags: ['Creative Testing Matrix', 'Audience Retargeting', 'Scale-up Campaign Builds']
      },
      {
        icon: Filter,
        title: 'Funnel and landing page optimization',
        desc: 'Fixing leaky conversion paths so every dollar of ad spend yields higher returns.',
        tags: ['CRO Audit', 'Landing Page Tweaks', 'Checkout Optimization']
      },
      {
        icon: Activity,
        title: 'Analytics and attribution',
        desc: 'Clear tracking setups so you know which campaign, creative, and channel actually drove the revenue.',
        tags: ['GA4 & Pixel Setup', 'Custom Dashboard', 'Blended ROAS Tracking']
      }
    ],
    process: [
      {
        num: '01',
        name: 'Audit',
        desc: 'Deep-dive into existing ad accounts, conversion tracking, analytics and unit economics.',
        deliverable: 'Ad Account & Conversion Tracking Audit'
      },
      {
        num: '02',
        name: 'Build',
        desc: 'Structure new campaign frameworks, conversion tracking, ad copy and creative direction.',
        deliverable: 'Campaign Architecture & Ad Creative Suite'
      },
      {
        num: '03',
        name: 'Test',
        desc: 'Run controlled tests across creatives, hooks, landing pages and target audiences.',
        deliverable: 'Weekly Testing Matrix & ROAS Logs'
      },
      {
        num: '04',
        name: 'Scale',
        desc: 'Shift budget into winning ad angles and scale profitable campaigns systematically.',
        deliverable: 'Scaling Playbook & ROAS Attribution Dashboard'
      }
    ],
    closing: {
      heading: 'Ready to talk performance marketing?',
      desc: 'Tell us where you\'re stuck and we\'ll tell you honestly if this is the right service to start with.'
    },
    faqs: [
      {
        id: 'pm-1',
        question: 'What does your Performance Marketing service include?',
        answer: 'We manage paid advertising across Google Ads, Meta Ads (Instagram & Facebook), LinkedIn Ads, conversion rate optimization, creative testing, and attribution tracking.'
      },
      {
        id: 'pm-2',
        question: 'Which ad platforms do you specialize in?',
        answer: 'We specialize in Google Search, Shopping, Performance Max, Meta Ads, and LinkedIn Ads, choosing the right mix based on your audience and business goals.'
      },
      {
        id: 'pm-3',
        question: 'How do you measure campaign performance and ROAS?',
        answer: 'We focus on metrics that directly impact your bottom line—such as cost per acquisition (CPA), return on ad spend (ROAS), conversion rate, and customer lifetime value (LTV).'
      },
      {
        id: 'pm-4',
        question: 'Do you create the ad copy and visual creatives?',
        answer: 'Yes. Our team develops the ad copy, visual assets, video hooks, and landing page messaging to ensure campaigns perform effectively.'
      },
      {
        id: 'pm-5',
        question: 'What budget size do I need to start performance marketing?',
        answer: 'We work with a variety of budget levels. During our initial discovery conversation, we help determine a recommended starting ad spend based on your goals and category competition.'
      },
      {
        id: 'pm-6',
        question: 'How often will I get campaign updates and performance reports?',
        answer: 'You receive clear performance dashboards and regular updates tracking spend, conversions, cost per lead/sale, and ROAS improvements.'
      }
    ]
  },
  {
    id: 'video-production',
    slug: 'video-production-and-shoots',
    metaTitle: 'AI Video Production Company | Creative Video Solutions',
    metaDescription: 'Prittal is a leading AI video production agency, creating AI-powered videos, UGC content and creative visual solutions that help brands engage and grow.',
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
    },
    faqs: [
      {
        id: 'vp-1',
        question: 'What types of videos do you produce?',
        answer: 'We create brand films, social media reels, UGC content, product videos, advertisements, and short-form or long-form video content.'
      },
      {
        id: 'vp-2',
        question: 'Do you provide complete video production from concept to final edit?',
        answer: 'Yes. We can handle the complete production process, including concept development, scripting, shooting, editing, color grading, sound, and final delivery.'
      },
      {
        id: 'vp-3',
        question: 'Can you create videos specifically for Instagram and social media?',
        answer: 'Absolutely. We create platform-ready content in formats such as 9:16 vertical reels and 16:9 videos, optimized for social media viewing and retention.'
      },
      {
        id: 'vp-4',
        question: 'What video quality and formats do you deliver?',
        answer: 'We can deliver high-quality 4K video with professional editing and exports in the formats required for your website, social media, advertising, or other platforms.'
      },
      {
        id: 'vp-5',
        question: 'Can you create both UGC-style and cinematic videos?',
        answer: 'Yes. We produce both authentic, creator-style UGC content and polished cinematic productions depending on your brand and campaign goals.'
      },
      {
        id: 'vp-6',
        question: 'How long does a video production project take?',
        answer: 'Turnaround depends on the type and complexity of the project. Short-form content can have a faster turnaround, while larger brand films may require more production and editing time.'
      },
      {
        id: 'vp-7',
        question: 'Do you help with the script and creative concept?',
        answer: 'Yes. Our team can help develop the concept, storyline, script, hooks, and creative direction before production begins.'
      },
      {
        id: 'vp-8',
        question: 'How do you make videos that keep viewers watching?',
        answer: 'We design videos around strong hooks, pacing, storytelling, visuals, and editing techniques that are built specifically to capture attention and improve viewer retention.'
      }
    ]
  },
  {
    id: 'events-activations',
    slug: 'events-and-activations',
    metaTitle: 'Top Event Management Company | Experiential & Brand Activation',
    metaDescription: 'Prittal is a professional event management and experiential marketing company, delivering strategic brand activations, corporate events and BTL experiences.',
    num: '05',
    eyebrow: 'Service 05',
    badge: 'Experiential & PR Events',
    icon: Calendar,
    title: 'Events and activations',
    displayTitle: 'Events & Activations',
    desc: 'From brand launches to expos — we make your brand felt in a room.',
    lede: 'From brand launches to expos — we make your brand felt in a room. Experiential marketing, influencer PR campaigns, and on-ground activations that connect people to your brand in the real world.',
    stats: [
      { label: 'Event Scale', value: 'Global Scale' },
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
    },
    faqs: [
      {
        id: 'ea-1',
        question: 'What types of events and activations do you manage?',
        answer: 'We manage brand launches, exhibitions, expos, pop-ups, experiential campaigns, PR events, and other on-ground brand activations.'
      },
      {
        id: 'ea-2',
        question: 'Do you provide end-to-end event management?',
        answer: 'Yes. We can manage the complete experience, from concept and planning to production, execution, coordination, and post-event content.'
      },
      {
        id: 'ea-3',
        question: 'Can you manage multi-city events?',
        answer: 'Yes. Our event solutions can be executed at scale, depending on the location, event size, and requirements.'
      },
      {
        id: 'ea-4',
        question: 'Do you handle booth and stage design?',
        answer: 'Yes. We can manage spatial design, booth architecture, stage setups, AV requirements, lighting, and other physical brand experiences.'
      },
      {
        id: 'ea-5',
        question: 'Can you arrange influencers and creators for our event?',
        answer: 'Yes. We can support creator and influencer outreach, PR curation, guest management, and event-focused creator campaigns.'
      },
      {
        id: 'ea-6',
        question: 'Do you create content during the event?',
        answer: 'Yes. We can produce real-time social content, event coverage, reels, aftermovies, and other content designed to extend the event\'s reach online.'
      },
      {
        id: 'ea-7',
        question: 'Can you organize VIP and media experiences?',
        answer: 'Yes. We can plan and coordinate VIP guests, creators, media, and other key attendees to create a more curated brand experience.'
      },
      {
        id: 'ea-8',
        question: 'How do you measure the success of an event activation?',
        answer: 'We can measure factors such as attendance, creator and media reach, audience engagement, content performance, brand visibility, and overall campaign impact.'
      }
    ]
  },
  {
    id: 'marketplace-growth',
    slug: 'marketplace-growth',
    metaTitle: 'Best Marketplace Growth Agency | Ecommerce Growth Consulting',
    metaDescription: 'Prittal is a leading marketplace growth agency offering Amazon & Flipkart management, listing optimization, seller growth and ecommerce solutions.',
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
    },
    faqs: [
      {
        id: 'mg-1',
        question: 'What does your Marketplace Growth service include?',
        answer: 'We manage your marketplace presence across platforms like Amazon, Flipkart, Meesho, and quick-commerce channels, covering listings, content, advertising, pricing, and optimization.'
      },
      {
        id: 'mg-2',
        question: 'Which marketplaces do you manage?',
        answer: 'We work across major marketplaces including Amazon, Flipkart, Meesho, and quick-commerce platforms such as Blinkit, Zepto, and Instamart.'
      },
      {
        id: 'mg-3',
        question: 'Can you optimize my existing product listings?',
        answer: 'Yes. We optimize product titles, descriptions, images, keywords, enhanced content, and other listing elements to improve visibility and conversions.'
      },
      {
        id: 'mg-4',
        question: 'Do you manage Amazon and Flipkart advertising?',
        answer: 'Yes. We can manage marketplace advertising and PPC campaigns, including campaign strategy, keyword targeting, budget optimization, and performance tracking.'
      },
      {
        id: 'mg-5',
        question: 'Can you help improve my product\'s marketplace ranking?',
        answer: 'Yes. We use a combination of listing optimization, keyword strategy, advertising, pricing, inventory management, and performance analysis to improve marketplace visibility.'
      },
      {
        id: 'mg-6',
        question: 'Do you manage pricing and inventory across marketplaces?',
        answer: 'Yes. We help monitor pricing, stock levels, and product availability to support sales performance and reduce missed opportunities.'
      },
      {
        id: 'mg-7',
        question: 'Do you provide quick-commerce marketplace support?',
        answer: 'Yes. We can help brands establish and optimize their presence across platforms such as Blinkit, Zepto, and Instamart, including product visibility and promotional placements.'
      },
      {
        id: 'mg-8',
        question: 'How do you measure Marketplace Growth?',
        answer: 'We track metrics such as sales, conversion rate, marketplace visibility, advertising performance, product rankings, customer reviews, and overall revenue growth.'
      }
    ]
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
