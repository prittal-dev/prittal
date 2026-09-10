/**
 * Proforma Invoice (PI) & Quotation Utilities for Prittal Creative Agency
 * Replicated from CRM Sales Document Specification
 */

import { packagesData } from '../data/packagesData';

export const AGENCY_DETAILS = {
  name: 'PRITTAL CREATIVE AGENCY PRIVATE LIMITED',
  brand: 'Prittal',
  gstin: '07AAJCP9381M1ZL',
  address: 'Plot No - 2, 3rd Floor, PSV-IV, Sector-11, Rohini, Delhi - 110085',
  website: 'www.prittal.com',
  email: 'sale@prittal.com',
  phone: '011 47035184',
  bank: {
    beneficiary: 'PRITTAL CREATIVE AGENCY PVT LTD',
    accountNo: '036705501472',
    ifsc: 'ICIC0000367',
    bankName: 'ICICI Bank',
    branch: 'Rohini sec 11',
  },
};

export const SERVICE_COLUMNS = [
  {
    title: 'Digital Marketing\nSolution',
    bullets: ['Digital Marketing Solution', 'Influencer Marketing Solution'],
  },
  {
    title: 'Social media\nMarketing',
    bullets: [
      'Facebook Marketing',
      'Instagram Marketing',
      'Linkdin Marketing',
      'Youtube Marketing',
      'X Marketing',
    ],
  },
  {
    title: 'Paid Advertising &\nPerformanceMarketing',
    bullets: [
      'Meta Ads Management',
      'Google Ads Management',
      'Social Media Ads',
    ],
  },
  {
    title: 'SEO & AI Search\nOptimization',
    bullets: [
      'Search Engine Optimization (SEO)',
      'International SEO',
      'GEO (Generative Engine Optimization)',
      'AI SEO Service',
      'AEO (Answer Engine Optimization)',
      'E-Commerce SEO',
    ],
  },
  {
    title: 'Web & E-Commerce\nsolution',
    bullets: [
      'Website Design & Development',
      'E-Commerce Website Development',
      'Marketplace Management',
    ],
  },
  {
    title: 'Brand, Media &\nReputation\nManagement',
    bullets: [
      'Corporate Films & Video Production',
      'Event Management',
      'PR Management',
    ],
  },
];

export const TERMS_AND_CONDITIONS = [
  {
    num: 1,
    title: 'Definitions',
    items: [
      '"Company" refers to Prittal.',
      '"Advertiser" refers to the person, company, or entity named on this invoice who is purchasing advertising services.',
    ],
  },
  {
    num: 2,
    title: 'Pricing',
    items: [
      'Rates quoted in this invoice apply only to this specific transaction. The Company may revise its rates at any time for future transactions.',
    ],
  },
  {
    num: 3,
    title: "Advertiser's Content Obligations",
    items: [
      'All materials submitted for advertising must be owned by the Advertiser or used with proper legal authorization.',
      'Content must not be obscene, offensive, unlawful, or in violation of any applicable law or regulation.',
      'The Advertiser confirms they either own the products/services being advertised or are duly authorized to use related copy, images, and trademarks.',
    ],
  },
  {
    num: 4,
    title: "Company's Rights",
    items: [
      'The Company may decline to publish any advertisement at its sole discretion and does not guarantee any particular placement or position.',
      'The Company may modify an advertisement if it considers this necessary.',
      'While reasonable care will be taken in publishing submitted information, the Company is not liable for errors or omissions.',
    ],
  },
  {
    num: 5,
    title: 'Ownership of Creative Work',
    items: [
      "Unless agreed otherwise in writing, any artwork or advertisement created by the Company during production remains the Company's exclusive property (excluding the Advertiser's own trademarks/trade name). This artwork may not be reused or reassigned without the Company's prior written consent.",
    ],
  },
  {
    num: 6,
    title: 'Advertising Agencies & Third-Party Clients',
    items: [
      'If an agency places an advertisement on behalf of a client ("Ultimate Customer"), the agency confirms it has authority to act on that client\'s behalf and agrees to indemnify the Company against any claims the client may raise.',
    ],
  },
  {
    num: 7,
    title: 'Changes in Ownership or Authorization',
    items: [
      'The Advertiser must notify the Company in writing of any change in ownership or authorization. If payment is not made in full, the Company may suspend or discontinue services at any time.',
    ],
  },
  {
    num: 8,
    title: 'Indemnification',
    items: [
      'The Advertiser agrees to defend and compensate the Company for any claims, losses, or legal costs (including attorney fees) arising from the advertisement content, including third-party intellectual property claims.',
    ],
  },
  {
    num: 9,
    title: 'Liability',
    items: [
      'The Advertiser is solely responsible for protecting the intellectual property rights in any content they submit.',
      'The Company is not liable for indirect, incidental, or consequential damages (e.g., loss of profit, goodwill, or data) resulting from its services.',
      "The Company's total liability is limited to the amount actually paid by the Advertiser.",
    ],
  },
  {
    num: 10,
    title: 'Cancellations & Refunds',
    isTable: true,
    tableRows: [
      {
        service: 'General advertising',
        policy:
          '45% of the amount paid is forfeited as a cancellation fee. Further deductions apply proportionally based on advertisement duration already used.',
      },
      {
        service: 'Film production',
        policy:
          '70% advance required before shooting; 30% due on delivery. No refunds on cancellation.',
      },
      {
        service: 'Event, Travel & Celebrity',
        policy:
          '100% advance payment required. No refunds or cancellations, including for sponsorships, delegates, exhibitors, visitors, or other event participation.',
      },
    ],
  },
  {
    num: 11,
    title: 'Governing Law & Jurisdiction',
    items: [
      'This agreement is governed by the laws of India. Any disputes will be resolved exclusively in the courts of Delhi. Verbal commitments made by Company staff are not considered part of this contract.',
    ],
  },
  {
    num: 12,
    title: 'Relationship to Other Agreements',
    items: [
      "Where a matter is not addressed in this invoice, the Company's standard User Agreement/Terms & Conditions will apply. In case of conflict, this proforma invoice takes precedence.",
    ],
  },
  {
    num: 13,
    title: 'Correspondence',
    items: [
      'All communication to the Advertiser will be sent to the address listed on the invoice. Communication to the Company should be directed to its registered office.',
    ],
  },
  {
    num: 14,
    title: 'Scope of Film Production Services',
    items: [
      '"Film Production" includes TV commercials, corporate films, web series, TV serials, product/service anchoring, radio jingles, feature films, and photoshoots.',
    ],
  },
  {
    num: 15,
    title: "Use of Advertiser's Work",
    items: [
      "The Company is authorized to upload and share the Advertiser's work across the Prittal network.",
    ],
  },
  {
    num: 16,
    title: 'Video Catalog',
    items: [
      "Prittal's video catalog entries are short introductory videos made to a fixed format. Customization is not offered. Filming at more than one location for a video bio incurs an additional charge.",
    ],
  },
];

/**
 * Formats a number with Indian comma grouping (e.g. 1,50,000)
 */
export const formatINR = (amt) => {
  const num = Math.round(Number(amt || 0));
  return num.toLocaleString('en-IN');
};

/**
 * Generates a unique Proforma Invoice number matching the CRM standard
 */
export const generateDocCode = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `PI-PRITTAL-${year}${month}${day}-${random}`;
};

/**
 * Determines whether a service item should be checked based on selected package, tier, and custom features
 */
/**
 * Determines whether a service item should be checked based on selected package, tier, and custom features
 */
export const isServiceIncluded = (bullet, colTitle, packageInfo) => {
  const categoryId = (packageInfo?.categoryId || '').toLowerCase();
  const tierId = (packageInfo?.tierId || '').toLowerCase();
  const customSummary = (packageInfo?.customSummary || '').toLowerCase();
  const rawTitle = (packageInfo?.categoryTitle || packageInfo?.primaryService || '').toLowerCase();
  const tierName = (packageInfo?.tierName || '').toLowerCase();

  const isWeb =
    categoryId === 'websites' ||
    rawTitle.includes('web') ||
    customSummary.includes('website') ||
    customSummary.includes('wordpress');

  const isSocial =
    categoryId === 'social-media' ||
    categoryId === 'social_media' ||
    rawTitle.includes('social') ||
    customSummary.includes('social media') ||
    customSummary.includes('reels') ||
    customSummary.includes('instagram');

  const isPaid =
    categoryId === 'paid-campaigns' ||
    categoryId === 'paid_campaigns' ||
    rawTitle.includes('paid') ||
    rawTitle.includes('ppc') ||
    customSummary.includes('ppc') ||
    customSummary.includes('meta ads') ||
    customSummary.includes('google ads');

  const isSeo =
    categoryId === 'seo' ||
    rawTitle.includes('seo') ||
    rawTitle.includes('search engine') ||
    customSummary.includes('seo') ||
    customSummary.includes('keyword');

  const isShoot =
    categoryId === 'product-shoots' ||
    categoryId === 'product_shoot' ||
    rawTitle.includes('shoot') ||
    rawTitle.includes('product photo') ||
    customSummary.includes('photo') ||
    customSummary.includes('video');

  const isGmb =
    categoryId === 'google-my-business' ||
    categoryId === 'google_my_business' ||
    rawTitle.includes('google my business') ||
    rawTitle.includes('gmb') ||
    rawTitle.includes('maps');

  const isPremiumOrBusiness = 
    tierId === 'premium' || 
    tierId === 'business' || 
    tierId === 'pc-business' ||
    tierName.includes('premium') || 
    tierName.includes('business');

  const isStandardOrAbove = 
    isPremiumOrBusiness || 
    tierId === 'standard' || 
    tierId === 'pc-standard' || 
    tierName.includes('standard');

  const b = bullet.toLowerCase().trim();
  const col = colTitle.toLowerCase().trim();

  // 1. Digital Marketing Solution Column
  if (col.includes('digital marketing')) {
    if (b.includes('influencer')) {
      return (isSocial && isPremiumOrBusiness) || customSummary.includes('influencer');
    }
    if (b.includes('digital marketing solution')) {
      return isSocial || isPaid || isSeo || isGmb || (isWeb && isStandardOrAbove) || customSummary.includes('digital marketing');
    }
    return false;
  }

  // 2. Social Media Marketing Column
  if (col.includes('social media')) {
    if (isSocial) {
      if (b.includes('facebook') || b.includes('instagram')) return true;
      if (b.includes('linkdin') || b.includes('linkedin')) return isStandardOrAbove;
      if (b.includes('x marketing') || b.includes('twitter')) return isStandardOrAbove;
      if (b.includes('youtube')) return isPremiumOrBusiness;
    }
    if (isPaid) {
      if (b.includes('facebook') || b.includes('instagram')) return true;
      if (b.includes('linkdin') || b.includes('linkedin')) return isStandardOrAbove;
      if (b.includes('youtube')) return isPremiumOrBusiness;
    }
    if (customSummary.includes('facebook') && b.includes('facebook')) return true;
    if (customSummary.includes('instagram') && b.includes('instagram')) return true;
    if (customSummary.includes('linkedin') && (b.includes('linkdin') || b.includes('linkedin'))) return true;
    if (customSummary.includes('youtube') && b.includes('youtube')) return true;
    if ((customSummary.includes('twitter') || customSummary.includes('x')) && b.includes('x marketing')) return true;
    return false;
  }

  // 3. Paid Advertising & Performance Marketing Column
  if (col.includes('paid advertising') || col.includes('performancemarketing')) {
    if (isPaid) {
      if (b.includes('meta ads')) return true;
      if (b.includes('google ads')) return true;
      if (b.includes('social media ads')) return true;
    }
    if (isSocial && isStandardOrAbove) {
      if (b.includes('meta ads') || b.includes('social media ads')) return true;
    }
    if (isGmb && isStandardOrAbove) {
      if (b.includes('social media ads') || b.includes('meta ads')) return true;
    }
    if (customSummary.includes('meta ad') && b.includes('meta ads')) return true;
    if (customSummary.includes('google ad') && b.includes('google ads')) return true;
    if (customSummary.includes('ad') && b.includes('social media ads')) return true;
    return false;
  }

  // 4. SEO & AI Search Optimization Column
  if (col.includes('seo') || col.includes('search')) {
    if (isSeo) {
      if (b.includes('search engine optimization') || b === 'seo') return true;
      if (b.includes('geo')) return isStandardOrAbove;
      if (b.includes('international seo')) return isPremiumOrBusiness;
      if (b.includes('ai seo')) return isPremiumOrBusiness;
      if (b.includes('aeo')) return isPremiumOrBusiness;
      if (b.includes('e-commerce seo')) return isPremiumOrBusiness || customSummary.includes('ecommerce');
    }
    if (isGmb) {
      if (b.includes('search engine optimization') || b === 'seo') return true;
      if (b.includes('geo')) return isStandardOrAbove;
    }
    if (isWeb && isStandardOrAbove) {
      if (b.includes('search engine optimization') || b === 'seo') return true;
    }
    if (customSummary.includes('keyword') || customSummary.includes('seo')) {
      if (b.includes('search engine optimization') || b === 'seo') return true;
    }
    return false;
  }

  // 5. Web & E-Commerce Solution Column
  if (col.includes('web') || col.includes('commerce')) {
    if (isWeb) {
      if (b.includes('website design')) return true;
      if (b.includes('e-commerce website')) return isPremiumOrBusiness || customSummary.includes('ecommerce') || customSummary.includes('product');
      if (b.includes('marketplace')) return customSummary.includes('marketplace');
    }
    if (isShoot && isStandardOrAbove) {
      if (b.includes('e-commerce website')) return true;
    }
    if (customSummary.includes('website') && b.includes('website design')) return true;
    if (customSummary.includes('ecommerce') && b.includes('e-commerce website')) return true;
    return false;
  }

  // 6. Brand, Media & Reputation Management Column
  if (col.includes('brand') || col.includes('reputation') || col.includes('media')) {
    if (isShoot) {
      if (b.includes('corporate films') || b.includes('video production')) return true;
    }
    if (customSummary.includes('video') || customSummary.includes('shoot') || customSummary.includes('film')) {
      if (b.includes('corporate films') || b.includes('video production')) return true;
    }
    if (customSummary.includes('event') && b.includes('event')) return true;
    if (customSummary.includes('pr') && b.includes('pr management')) return true;
    return false;
  }

  return false;
};

/**
 * Returns an initial boolean map of all services in the 6 columns
 */
export const getInitialCheckedServices = (packageInfo) => {
  const map = {};
  SERVICE_COLUMNS.forEach((col) => {
    col.bullets.forEach((bullet) => {
      map[bullet] = isServiceIncluded(bullet, col.title, packageInfo);
    });
  });
  return map;
};

/**
 * Returns a concise, professional deliverables summary based on package category and tier
 */
export const getDeliverablesSummary = (packageInfo) => {
  if (!packageInfo) {
    return 'Official full-suite creative deliverables and strategic direction as per agreed retainer specifications.';
  }

  if (packageInfo.isCustom || packageInfo.tierId === 'custom') {
    if (packageInfo.customSummary) {
      return `Custom Scope (${packageInfo.activeCount || 'Multiple'} Deliverables): ${packageInfo.customSummary}`;
    }
    return 'Tailor-made customized scope built to client commercial specifications and deliverables quota.';
  }

  const cat = (packageInfo.categoryId || packageInfo.categoryTitle || '').toLowerCase();
  const tier = (packageInfo.tierId || packageInfo.tierName || '').toLowerCase();

  if (cat.includes('web')) {
    if (tier.includes('basic')) {
      return 'Essential 5-Page Responsive Web Architecture, Modern CMS Integration, SEO Friendly Structure, Meta Links & Sitemaps (Additional services available on request).';
    }
    if (tier.includes('standard')) {
      return '10-Page Dynamic Business Portal, SSL Security Certificate, Responsive Mobile/Tablet Architecture, CMS, Annual Maintenance, Blog, WhatsApp Chat, Catalogue Download, Language Converter & Live Chat Integration included.';
    }
    if (tier.includes('premium')) {
      return 'Full-Fledged E-Commerce Storefront, 50 Products Catalog Upload, 1 Domain, Annual Hosting, Maintenance, Blog, WhatsApp, Catalogue, Email, Reviews, Language Converter & Live Chat — All Services Included.';
    }
    return 'End-to-end modern web design, responsive development, CMS configuration, and performance optimization.';
  }

  if (cat.includes('social')) {
    if (tier.includes('basic')) {
      return '8 Creative Graphics/mo, 4 Engagement Reels, Content Strategy, Hashtag Research, Facebook & Instagram Account Management.';
    }
    if (tier.includes('standard')) {
      return '12 Creative Graphics/mo, 8 High-Impact Reels, LinkedIn & X Marketing, Meta Ads Setup, Bi-Weekly Analytics & Strategy.';
    }
    if (tier.includes('premium')) {
      return '20 Premium Creatives/mo, 12 Studio Reels, YouTube Marketing, Influencer Collaboration Management, Dedicated Brand Manager.';
    }
    return 'Monthly social media content creation, viral reels production, multi-platform publishing, and community engagement.';
  }

  if (cat.includes('paid') || cat.includes('campaign') || cat.includes('performance')) {
    if (tier.includes('starter')) {
      return 'Meta Ads Setup, Audience Targeting, 2 Campaign Funnels, Pixel Tracking, Creative Testing & Bi-Weekly Optimization.';
    }
    if (tier.includes('standard')) {
      return 'Meta & Google Search Ads Management, Retargeting Funnels, A/B Ad Creative Testing, Weekly ROI & Cost Per Lead Reports.';
    }
    if (tier.includes('business')) {
      return 'Enterprise Multi-Channel Paid Ads (Meta, Google, YouTube, LinkedIn), Dedicated Performance Team, Daily Budget Scaling.';
    }
    return 'End-to-end performance marketing, paid campaigns architecture, conversion optimization, and weekly reporting.';
  }

  if (cat.includes('seo') || cat.includes('search')) {
    if (tier.includes('starter')) {
      return '10 Target Keywords, On-Page SEO Optimization, Google Search Console Setup, Sitemaps & Monthly Ranking Audit.';
    }
    if (tier.includes('standard')) {
      return '25 Target Keywords, GEO (Generative Engine Optimization), Technical SEO Audit, Quality Backlink Strategy & Monthly Growth Report.';
    }
    if (tier.includes('business')) {
      return '50+ Keywords, International SEO, AI Search Engine Optimization (AEO), E-Commerce SEO, Competitor Analysis & Guaranteed Growth.';
    }
    return 'Organic search visibility, keyword ranking optimization, generative AI search alignment, and technical indexation.';
  }

  if (cat.includes('shoot') || cat.includes('product')) {
    if (tier.includes('basic')) {
      return 'Up to 5 Products Studio Photos (3 Photos/Product), White Background Shots, Basic Retouching, High-Res Delivery.';
    }
    if (tier.includes('standard')) {
      return 'Up to 10 Products Studio Photos (5 Photos/Product), 1 Short Product Video, Advanced Editing & Compositing, High-Res Delivery.';
    }
    if (tier.includes('premium')) {
      return 'Up to 25 Products Multi-Angle Photos (8 Photos/Product), 3 Product Videos, 360° View, Lifestyle Shots & Model Add-on.';
    }
    return 'Professional product photography, lifestyle commercial shoots, high-definition post-processing, and video production.';
  }

  if (cat.includes('google') || cat.includes('gmb') || cat.includes('business')) {
    if (tier.includes('starter')) {
      return 'Google Business Profile Verification, Local Keyword Optimization, NAP Consistency, 10 High-Res Geo-Tagged Photos.';
    }
    if (tier.includes('business')) {
      return 'Complete 3-Pack Map Domination, GEO Optimization, Review Generation Strategy, Weekly Geo-Tagged Posts & Citation Building.';
    }
    return 'Google Business Profile optimization, local search dominance, map ranking, and localized customer engagement.';
  }

  return 'Official full-suite creative deliverables, commercial production, and strategic execution as agreed.';
};

/**
 * Builds the comprehensive formatted email text matching the CRM Gmail body format
 */
export const buildInvoiceEmailText = ({ clientData, packageInfo, financialData, docCode, checkedServices = {} }) => {
  const companyName = clientData.companyName || clientData.name || 'Valued Client';
  const docTitle = `Proforma Invoice — Official Scope & Agreement`;
  const deliverablesLine = getDeliverablesSummary(packageInfo);

  // Extract checked services list
  const activeServices = Object.entries(checkedServices)
    .filter(([_, isChecked]) => isChecked)
    .map(([serviceName]) => serviceName);

  const servicesSoldList = activeServices.length > 0
    ? activeServices.map((s) => `  • [✓] ${s}`).join('\n')
    : '  • [✓] Full Digital Marketing Solution Retainer Scope';

  return `Dear ${companyName},

Please find below the official details and commercial specifications for your Proforma Invoice (${docCode}) from Prittal Creative Agency Pvt Ltd.

============================================================
DOCUMENT SUMMARY & REFERENCE
============================================================
• Document Type: ${docTitle}
• Reference Code: ${docCode}
• Date: ${new Date().toLocaleDateString('en-GB')}
• Service Domain: ${packageInfo?.categoryTitle || 'Creative & Digital Retainer'}
• Package Scope: ${packageInfo?.tierName || 'Custom Scope'} (${packageInfo?.billingCycle === 'annual' ? 'Annual Plan' : 'Monthly / Package'})

============================================================
BILLED TO (ADVERTISER'S DETAILS)
============================================================
• Company / Advertiser: ${companyName}
• Contact Person: ${clientData.name || 'On Record'}${clientData.designation ? ` (${clientData.designation})` : ''}
• Email Address: ${clientData.email || 'On Record'}
• Mobile Number: ${clientData.phone || 'On Record'}
• Billing Address: ${[clientData.address, clientData.city, clientData.state, clientData.pinCode].filter(Boolean).join(', ') || 'On Record'}
${clientData.gstin ? `• GSTIN NO: ${clientData.gstin}\n` : ''}${clientData.tanNo ? `• TAN NO: ${clientData.tanNo}\n` : ''}${clientData.clientRemark ? `• Client Remark: ${clientData.clientRemark}\n` : ''}
============================================================
SERVICES SOLD & SCOPE SPECIFICATIONS
============================================================
Services Active in Plan:
${servicesSoldList}

Deliverables Quota & Strategy:
${deliverablesLine}

============================================================
COMMERCIAL BREAKDOWN & TAX SPECIFICATIONS
============================================================
• Payment Status: ${clientData.paymentStatus || 'Full Payment Pending'}
${financialData.discountAmount > 0 ? `• Package Standard Price: ₹${formatINR(financialData.originalBaseAmount || (financialData.baseAmount + financialData.discountAmount))}\n• Special Discount / Offer: - ₹${formatINR(financialData.discountAmount)}\n• Net Taxable Amount: ₹${formatINR(financialData.baseAmount)}` : `• Base Taxable Amount: ₹${formatINR(financialData.baseAmount)}`}
• GST (18% Applicable): + ₹${formatINR(financialData.gstAmount)}
------------------------------------------------------------
• GRAND TOTAL (Incl. 18% GST): ₹${formatINR(financialData.totalAmount)}
• Advance / Received Amount: ₹${formatINR(financialData.receivedAmount || 0)}
• Balance Outstanding: ₹${formatINR(financialData.balanceAmount !== undefined ? financialData.balanceAmount : financialData.totalAmount)}
------------------------------------------------------------
• Preferred Payment Mode: ${clientData.paymentMode || 'Bank Transfer / RTGS / NEFT'}

============================================================
OFFICIAL BANK DETAILS (BENEFICIARY)
============================================================
• Name of Beneficiary: ${AGENCY_DETAILS.bank.beneficiary}
• Account Number: ${AGENCY_DETAILS.bank.accountNo}
• IFSC Code: ${AGENCY_DETAILS.bank.ifsc}
• Bank: ${AGENCY_DETAILS.bank.bankName}
• Branch: ${AGENCY_DETAILS.bank.branch}

============================================================
PRITTAL DIGITAL AGENCY • CONTACT & REGISTERED OFFICE
============================================================
Registered Office: ${AGENCY_DETAILS.address}
Website: ${AGENCY_DETAILS.website} | Sales Desk: ${AGENCY_DETAILS.email} | Phone: ${AGENCY_DETAILS.phone}

Please find the official printable Proforma Invoice attached. If you have any questions or require modifications, reply directly to this email or contact us at ${AGENCY_DETAILS.email}.

Warm regards,
Prittal Creative Agency Team
${AGENCY_DETAILS.website}`;
};

/**
 * Returns only the service columns that contain currently checked/active services
 */
export const getActiveCategoriesWithServices = (checkedServices) => {
  if (!checkedServices) return [];
  return SERVICE_COLUMNS.map((col) => {
    const activeBullets = col.bullets.filter((bullet) => !!checkedServices[bullet]);
    return {
      title: col.title,
      rawTitle: col.title.replace('\n', ' '),
      activeBullets,
    };
  }).filter((col) => col.activeBullets.length > 0);
};

/**
 * Extracts all specific service deliverables and features specified on this plan tier
 */
export const getPlanFeaturesList = (packageInfo, dataList = packagesData) => {
  if (!packageInfo) return [];

  // Custom Scope Deliverables
  if (packageInfo.isCustom || packageInfo.tierId === 'custom') {
    if (Array.isArray(packageInfo.customDeliverables) && packageInfo.customDeliverables.length > 0) {
      return packageInfo.customDeliverables.map((d) => `${d.name}: ${d.quantity}`);
    }
    if (packageInfo.customSummary) {
      return packageInfo.customSummary.split('·').map((s) => s.trim()).filter(Boolean);
    }
    return ['Custom Scope Specification as agreed with client'];
  }

  const categoryId = (packageInfo.categoryId || '').toLowerCase();
  const tierId = (packageInfo.tierId || '').toLowerCase();

  // Find matching category
  const cat = (dataList || []).find((c) => 
    c.id.toLowerCase() === categoryId ||
    c.title.toLowerCase().includes(categoryId) ||
    categoryId.includes(c.id.toLowerCase())
  );

  if (!cat || !cat.featureGroups) {
    return [];
  }

  const includedFeatures = [];
  cat.featureGroups.forEach((group) => {
    group.features.forEach((feat) => {
      const val = feat.values ? feat.values[tierId] : undefined;
      // Only include features that are ACTUALLY INCLUDED in this plan tier (val === true or non-price quantitative strings)
      if (val === true) {
        includedFeatures.push(feat.name);
      } else if (
        typeof val === 'string' &&
        !val.startsWith('₹') &&
        group.groupName !== 'ADDITIONAL SERVICES' &&
        val.trim() !== '-' &&
        val.trim() !== '' &&
        val !== 'false'
      ) {
        includedFeatures.push(`${feat.name}: ${val}`);
      }
    });
  });

  return includedFeatures;
};

/**
 * Extracts optional additional services available for this plan tier with their pricing
 */
export const getAdditionalServicesList = (packageInfo, dataList = packagesData) => {
  if (!packageInfo) return [];
  const categoryId = (packageInfo.categoryId || '').toLowerCase();
  const tierId = (packageInfo.tierId || '').toLowerCase();

  const cat = (dataList || []).find((c) => 
    c.id.toLowerCase() === categoryId ||
    c.title.toLowerCase().includes(categoryId) ||
    categoryId.includes(c.id.toLowerCase())
  );

  if (!cat || !cat.featureGroups) return [];

  const addServices = [];
  cat.featureGroups.forEach((group) => {
    group.features.forEach((feat) => {
      const val = feat.values ? feat.values[tierId] : undefined;
      if (typeof val === 'string' && val.startsWith('₹')) {
        addServices.push(`${feat.name} (${val})`);
      }
    });
  });

  return addServices;
};
