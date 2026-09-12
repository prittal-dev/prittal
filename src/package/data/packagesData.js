export const packagesData = [
  {
    id: 'websites',
    title: 'WEBSITE',
    shortTitle: 'WEBSITE',
    subtitle: 'Static · Dynamic · Customized · E-Commerce',
    tagline: 'High-performance web solutions built with modern CMS, custom design, and robust security.',
    basePrice: 25000,
    tiers: [
      { id: 'basic', name: 'BASIC', tagline: 'Essential website for small businesses & portfolios', price: 25000 },
      { id: 'standard', name: 'STANDARD', isPopular: true, tagline: 'Comprehensive setup with SSL & responsive design', price: 50000 },
      { id: 'premium', name: 'PREMIUM', tagline: 'Full-fledged E-Commerce & Custom Enterprise Solution', price: 100000 },
      { id: 'custom', name: 'CUSTOM OFFER', tagline: 'Tailor-made solution built to your exact specifications' }
    ],
    featureGroups: [
      {
        groupName: 'FEATURES',
        features: [
          { name: 'WordPress/Replit CMS', values: { basic: true, standard: true, premium: true } },
          { name: 'Templated/Custom Design', values: { basic: true, standard: true, premium: true } },
          { name: 'Site Map & Meta Links', values: { basic: true, standard: true, premium: true } },
          { name: 'SEO Friendly', values: { basic: true, standard: true, premium: true } },
          { name: 'Favicon', values: { basic: true, standard: true, premium: true } },
          { name: 'SSL Certificate', values: { basic: false, standard: true, premium: true } },
          { name: 'Responsive Design', values: { basic: false, standard: true, premium: true } },
          { name: 'Products Upload', values: { basic: 'Upto 50', standard: '200', premium: 'Upto 500' }, isHighlight: true }
        ]
      },
      {
        groupName: 'ADDITIONAL SERVICES',
        features: [
          { name: '1 Domain', values: { basic: '₹1,000', standard: '₹1,000', premium: true } },
          { name: 'Annual Hosting', values: { basic: '₹3,000', standard: '₹3,000', premium: true } },
          { name: 'Annual Maintenance', values: { basic: '₹3,000', standard: true, premium: true } },
          { name: 'Catalogue Download', values: { basic: '₹3,000', standard: true, premium: true } },
          { name: 'Email', values: { basic: '₹3,000', standard: '₹2,000', premium: true } },
          { name: 'Blog', values: { basic: '₹3,000', standard: true, premium: true } },
          { name: 'Google Review Integration', values: { basic: '₹3,000', standard: '₹2,000', premium: true } },
          { name: 'Whatsapp Chat Integration', values: { basic: '₹3,000', standard: true, premium: true } },
          { name: 'Language Converter', values: { basic: '₹5,000', standard: true, premium: true } },
          { name: 'Live Chat Integration', values: { basic: '₹10,000', standard: true, premium: true } }
        ]
      }
    ]
  },
  {
    id: 'seo',
    title: 'SEO (Search Engine Optimization) · Google Ranking',
    shortTitle: 'SEO',
    subtitle: 'Rank in 3–5 Months on Page 1–2',
    tagline: 'Data-backed search engine optimization strategies to rank in 3–5 months on Page 1–2.',
    basePrice: 10000,
    tiers: [
      { id: 'starter', name: 'STARTER', tagline: 'Single location businesses starting search optimization', price: 10000 },
      { id: 'standard', name: 'STANDARD', isPopular: true, tagline: 'Growing brands needing strong organic search ranking', price: 20000 },
      { id: 'business', name: 'BUSINESS', tagline: 'Maximum search coverage with full technical SEO setup', price: 40000 },
      { id: 'custom', name: 'CUSTOM OFFER', tagline: 'Tailor-made SEO package for enterprise & multi-region' }
    ],
    featureGroups: [
      {
        groupName: 'KEYWORDS COVERAGE',
        features: [
          { name: 'Keywords Covered', values: { starter: '10 Keywords', standard: '25 Keywords', business: '50 Keywords' }, isHighlight: true }
        ]
      },
      {
        groupName: 'STANDARD FEATURES',
        features: [
          { name: 'Off Page Optimization', values: { starter: true, standard: true, business: true } },
          { name: 'On Page Optimization', values: { starter: true, standard: true, business: true } },
          { name: 'Article Submission', values: { starter: true, standard: true, business: true } },
          { name: 'Blog Submission', values: { starter: true, standard: true, business: true } },
          { name: 'Profile Creation', values: { starter: true, standard: true, business: true } },
          { name: 'Backlink Building', values: { starter: true, standard: true, business: true } },
          { name: 'PDF Submission', values: { starter: true, standard: true, business: true } },
          { name: 'Social Bookmarking', values: { starter: true, standard: true, business: true } },
          { name: 'Country Targeting', values: { starter: '1', standard: '1', business: '1' } },
          { name: 'Monthly Report', values: { starter: true, standard: true, business: true } }
        ]
      },
      {
        groupName: 'STANDARD & ABOVE',
        features: [
          { name: 'Title Tag Optimization', values: { starter: false, standard: true, business: true } },
          { name: 'Meta Tag Optimization', values: { starter: false, standard: true, business: true } },
          { name: 'Site Map Creation', values: { starter: false, standard: true, business: true } },
          { name: 'Page Rank Sculpting', values: { starter: false, standard: true, business: true } }
        ]
      },
      {
        groupName: 'BUSINESS ONLY',
        features: [
          { name: 'Google Analytics Setup', values: { starter: false, standard: false, business: true } },
          { name: 'PPT Presentation Submission', values: { starter: false, standard: false, business: true } },
          { name: 'Robot.txt Optimization', values: { starter: false, standard: false, business: true } },
          { name: 'Image Optimization', values: { starter: false, standard: false, business: true } },
          { name: 'Content Optimization', values: { starter: false, standard: false, business: true } },
          { name: 'Keyword Density Analysis', values: { starter: false, standard: false, business: true } },
          { name: 'Hyperlink Optimization', values: { starter: false, standard: false, business: true } }
        ]
      }
    ]
  },
  {
    id: 'social-media',
    title: 'SOCIAL MEDIA PROMOTION PLANS',
    shortTitle: 'SOCIAL MEDIA',
    subtitle: 'Facebook · Instagram · LinkedIn · X · YouTube | Package Comparison & Custom Pricing',
    tagline: 'End-to-end creative social media management, organic growth, and content publishing.',
    basePrice: 10000,
    tiers: [
      { id: 'basic', name: 'BASIC', tagline: 'Essential multi-channel social presence', price: 10000 },
      { id: 'standard', name: 'STANDARD', isPopular: true, tagline: 'Active engagement & AI-assisted strategy', price: 20000 },
      { id: 'premium', name: 'PREMIUM', tagline: 'Complete brand takeover with Meta Ads & community care', price: 40000 },
      { id: 'custom', name: 'CUSTOM OFFER', tagline: 'Bespoke social media strategy tailored to your business' }
    ],
    featureGroups: [
      {
        groupName: 'CONTENT & POSTING',
        features: [
          { name: 'Weekly Engagement Days', values: { basic: '2 Days', standard: '4 Days', premium: '6 Days' } },
          { name: 'Platforms', values: { basic: '2', standard: '4', premium: '5' }, tooltip: 'Facebook, Instagram, LinkedIn, X, YouTube', isHighlight: true },
          { name: 'Creative Posts Per Week', values: { basic: '1', standard: '2', premium: '6' } },
          { name: 'AI Reels', values: { basic: '1', standard: '2', premium: '6' } },
          { name: 'Stories Per Week', values: { basic: '-', standard: '2', premium: '4' } },
          { name: 'Carousel Per Month', values: { basic: '-', standard: '2', premium: '4' } },
          { name: 'Highlight Designs', values: { basic: '-', standard: '2', premium: '8' } },
          { name: 'Festival & Occasion Creatives', values: { basic: true, standard: true, premium: true } },
          { name: 'Custom Reel Thumbnails', values: { basic: true, standard: true, premium: true } },
          { name: 'Professionally Written Captions', values: { basic: true, standard: true, premium: true } },
          { name: 'Trending Hashtag Research', values: { basic: true, standard: true, premium: true } }
        ]
      },
      {
        groupName: 'SETUP & PROFILE',
        features: [
          { name: 'Bio Crafting with #Hashtags', values: { basic: false, standard: true, premium: true } },
          { name: 'Highlight Design & Optimization', values: { basic: false, standard: true, premium: true } }
        ]
      },
      {
        groupName: 'ORGANIC GROWTH',
        features: [
          { name: 'Keyword Mapping & Content Plan', values: { basic: true, standard: true, premium: true } },
          { name: 'AI-Powered Content Strategy', values: { basic: false, standard: true, premium: true } },
          { name: 'Organic Reach Enhancement', values: { basic: true, standard: true, premium: true } },
          { name: 'Relevant Group Sharing', values: { basic: true, standard: true, premium: true } },
          { name: 'Audience Engagement', values: { basic: false, standard: false, premium: true } },
          { name: 'Community Management', values: { basic: false, standard: false, premium: true } },
          { name: 'Respond to Comments', values: { basic: false, standard: false, premium: true } },
          { name: 'Respond to Messages', values: { basic: false, standard: false, premium: true } },
          { name: 'Blog Per Month', values: { basic: '-', standard: '1', premium: '4' } }
        ]
      },
      {
        groupName: 'META ADS',
        features: [
          { name: 'Meta Ads Management', values: { basic: false, standard: false, premium: true } },
          { name: 'Ad Campaign Setup', values: { basic: false, standard: true, premium: true } },
          { name: 'Audience Targeting Config', values: { basic: false, standard: true, premium: true } },
          { name: 'Meta Keywords', values: { basic: true, standard: true, premium: true } }
        ]
      },
      {
        groupName: 'REPORTING',
        features: [
          { name: 'Monthly Performance Report', values: { basic: true, standard: true, premium: true } },
          { name: 'Reach & Engagement Insights', values: { basic: false, standard: true, premium: true } },
          { name: 'Strategic Recommendations', values: { basic: false, standard: true, premium: true } }
        ]
      },
      {
        groupName: 'ADDITIONAL SERVICES',
        features: [
          { 
            name: 'Account Setup & Management', 
            values: { 
              basic: (billing) => billing === 'annual' ? true : '₹5,000', 
              standard: (billing) => billing === 'annual' ? true : '₹5,000', 
              premium: (billing) => billing === 'annual' ? true : '₹5,000' 
            } 
          }
        ]
      }
    ]
  },
  {
    id: 'paid-campaigns',
    title: 'PAID CAMPAIGNS',
    shortTitle: 'PAID CAMPAIGNS',
    subtitle: 'Facebook · Instagram · Google · LinkedIn | PPC & Meta Ads Management',
    tagline: 'High-ROI pay-per-click and Meta ads management for lead generation & customer acquisition.',
    basePrice: 10000,
    tiers: [
      { id: 'pc-starter', name: 'PC STARTER', tagline: 'Targeted PPC campaigns for emerging businesses', price: 10000 },
      { id: 'pc-standard', name: 'PC STANDARD', isPopular: true, tagline: 'Multi-ad type targeting with A/B testing & interest strategy', price: 20000 },
      { id: 'pc-business', name: 'PC BUSINESS', tagline: 'Full performance marketing suite with custom lookalike audiences & bi-monthly reports', price: 40000 },
      { id: 'custom', name: 'CUSTOM OFFER', tagline: 'Enterprise ad campaigns with dedicated media buying team' }
    ],
    featureGroups: [
      {
        groupName: 'BILLING LIMIT',
        features: [
          { name: 'Billing Limit (Ad Spend)', values: { 'pc-starter': 'Upto ₹75,000 p.m.', 'pc-standard': 'Upto ₹20,00,000 p.m.', 'pc-business': 'Upto ₹1,00,00,000 p.m.' }, isHighlight: true }
        ]
      },
      {
        groupName: 'PLATFORMS & AD TYPES',
        features: [
          { name: 'Platforms', values: { 'pc-starter': 'FB/IG/Google/LI', 'pc-standard': 'FB/IG/Google/LI', 'pc-business': 'FB/IG/Google/LI' } },
          { name: 'Ad Types', values: { 'pc-starter': '2 Ad Types', 'pc-standard': '4 Ad Types', 'pc-business': '4–7 Ad Types' } }
        ]
      },
      {
        groupName: 'CORE SERVICES',
        features: [
          { name: 'Campaign Setup', values: { 'pc-starter': true, 'pc-standard': true, 'pc-business': true } },
          { name: 'Ad Creation', values: { 'pc-starter': true, 'pc-standard': true, 'pc-business': true } },
          { name: 'Competitor Research', values: { 'pc-starter': true, 'pc-standard': true, 'pc-business': true } },
          { name: 'Targeting Demographics', values: { 'pc-starter': true, 'pc-standard': true, 'pc-business': true } },
          { name: 'Monitoring & Optimization', values: { 'pc-starter': true, 'pc-standard': true, 'pc-business': true } }
        ]
      },
      {
        groupName: 'ADVANCED FEATURES',
        features: [
          { name: 'Detailed Targeting', values: { 'pc-starter': '-', 'pc-standard': 'Interest & Behaviour', 'pc-business': 'Custom + Lookalike' }, isHighlight: true },
          { name: 'A/B Testing', values: { 'pc-starter': false, 'pc-standard': true, 'pc-business': true } },
          { name: 'Budget Management', values: { 'pc-starter': false, 'pc-standard': true, 'pc-business': true } }
        ]
      },
      {
        groupName: 'REPORTING & SUPPORT',
        features: [
          { name: 'Reporting Frequency', values: { 'pc-starter': 'Monthly', 'pc-standard': 'Monthly', 'pc-business': 'Bi-Monthly' } },
          { name: 'Dedicated Account Support', values: { 'pc-starter': false, 'pc-standard': true, 'pc-business': true } },
          { name: 'Dedicated Account Manager', values: { 'pc-starter': false, 'pc-standard': false, 'pc-business': true } }
        ]
      }
    ]
  },
  {
    id: 'product-shoots',
    title: 'PRODUCT SHOOTS',
    shortTitle: 'PRODUCT SHOOTS',
    subtitle: 'Product Photos · Product Videos · Editing',
    tagline: 'Studio-grade e-commerce product photography, 360° views, styled lifestyle shots & reels.',
    basePrice: 10000,
    tiers: [
      { id: 'basic', name: 'BASIC', tagline: 'Essential white-background studio shots for cataloguing', price: 10000 },
      { id: 'standard', name: 'STANDARD', isPopular: true, tagline: 'Advanced compositing with product reel video included', price: 20000 },
      { id: 'premium', name: 'PREMIUM', tagline: 'Complete production including 360° view, lifestyle shots & model add-ons', price: 40000 },
      { id: 'custom', name: 'CUSTOM OFFER', tagline: 'Large catalog & specialized studio production' }
    ],
    featureGroups: [
      {
        groupName: 'PACKAGE OVERVIEW',
        features: [
          { name: 'Products Covered', values: { basic: 'Up to 5', standard: 'Up to 10', premium: 'Up to 25' }, isHighlight: true }
        ]
      },
      {
        groupName: 'SHOOT DETAILS',
        features: [
          { name: 'Photos Per Product', values: { basic: '3', standard: '5', premium: '8' } },
          { name: 'White Background Shots', values: { basic: true, standard: true, premium: true } },
          { name: 'Lifestyle / Styled Shots', values: { basic: false, standard: false, premium: true } },
          { name: '360° Product View', values: { basic: false, standard: false, premium: true } },
          { name: 'Basic Retouching', values: { basic: true, standard: true, premium: true } },
          { name: 'Advanced Editing / Compositing', values: { basic: false, standard: true, premium: true } },
          { name: 'Background Removal', values: { basic: true, standard: true, premium: true } }
        ]
      },
      {
        groupName: 'VIDEO & EXTRAS',
        features: [
          { name: 'Short Product Video', values: { basic: '-', standard: '1 Video', premium: '3 Videos' }, isHighlight: true },
          { name: 'Model / Hand Shot Add-on', values: { basic: false, standard: false, premium: true } }
        ]
      },
      {
        groupName: 'DELIVERY',
        features: [
          { name: 'Turnaround Time', values: { basic: '7 Days', standard: '5 Days', premium: '3 Days' } },
          { name: 'High-Res Files for E-commerce', values: { basic: true, standard: true, premium: true } },
          { name: 'Usage Rights Included', values: { basic: true, standard: true, premium: true } }
        ]
      }
    ]
  },
  {
    id: 'google-my-business',
    title: 'GOOGLE MY BUSINESS',
    shortTitle: 'GOOGLE MY BUSINESS',
    subtitle: 'Google My Business — Setup, Optimization & Ongoing Management',
    tagline: 'Dominate local Google Maps search results, drive walk-ins, and optimize GMB listings.',
    basePrice: 10000,
    tiers: [
      { id: 'starter', name: 'STARTER', tagline: 'Essential location verification and business setup', price: 10000 },
      { id: 'business', name: 'BUSINESS', isPopular: true, tagline: 'Full optimization with monthly ad designs, analytics & performance reporting', price: 20000 }
    ],
    featureGroups: [
      {
        groupName: 'GMB LISTING & OPTIMIZATION',
        features: [
          { name: 'Location Setup & Verification', values: { starter: true, business: true } },
          { name: 'Verify Listing', values: { starter: '1 Attempt', business: '1 Attempt' } },
          { name: 'Optimize Business Info', values: { starter: true, business: true } },
          { name: 'Google Maps Integration', values: { starter: true, business: true } },
          { name: 'Product & Services Setup', values: { starter: true, business: true } },
          { name: 'Management Guidance', values: { starter: true, business: true } },
          { name: 'Keyword Research', values: { starter: false, business: true } },
          { name: 'Ad Designs Per Month', values: { starter: '-', business: '8 Designs' }, isHighlight: true },
          { name: 'Q&A Creation & Response', values: { starter: false, business: true } },
          { name: 'Google Analytics Integration', values: { starter: false, business: true } },
          { name: 'Reporting', values: { starter: '-', business: 'Monthly Performance' } }
        ]
      }
    ],
    footerNote: 'GST applicable as per norms'
  }
];
