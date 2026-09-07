/**
 * SEO & Meta Tag Management Helper
 * Dynamically updates document title, meta descriptions, canonical URLs, robots directives, and structured JSON-LD data
 */

export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function updateSEOTags({
  title = 'Best Branding Agency in Delhi | Prittal Creative',
  description = 'Looking for the Brand Growth Partner? We craft powerful brand identities & strategies that drive growth. For Nokia, OYO, CAMBRIDGE OXFORD',
  path = '/',
  type = 'website',
  schemaData = null,
  noIndex = false
}) {
  if (typeof document === 'undefined') return;

  // 1. Update Document Title
  document.title = title;

  // Helper to get or create meta tag
  const setMetaTag = (nameOrProperty, key, content) => {
    let el = document.querySelector(`meta[${nameOrProperty}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameOrProperty, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 2. Standard Meta Tags & Crawler Robots Directive
  setMetaTag('name', 'description', description);
  if (noIndex) {
    setMetaTag('name', 'robots', 'noindex, nofollow');
  } else {
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  }

  // 3. Compute Clean Canonical URL (strips all spam query parameters and hashes)
  const isProduction = typeof window !== 'undefined' && window.location.hostname.includes('prittal.com');
  const baseUrl = isProduction ? 'https://www.prittal.com' : (typeof window !== 'undefined' ? window.location.origin : 'https://www.prittal.com');
  
  const cleanPath = (path.split('?')[0].split('#')[0] || '/').replace(/\/+/g, '/');
  const canonicalUrl = cleanPath === '/' ? `${baseUrl}/` : `${baseUrl}${cleanPath}`;

  // 4. OpenGraph Social Tags
  setMetaTag('property', 'og:title', title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:type', type);
  setMetaTag('property', 'og:site_name', 'Prittal Creative Agency');

  // 5. Twitter Card Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', title);
  setMetaTag('name', 'twitter:description', description);

  // 6. Canonical Link (crucial for de-indexing spam parameters like ?x=, ?n=, ?c=)
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // 7. JSON-LD Structured Data Schema for Search Engines & AEO
  let schemaScript = document.getElementById('prittal-jsonld-schema');
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'prittal-jsonld-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Prittal Creative Agency',
    url: 'https://www.prittal.com',
    description: description,
    founder: 'Prittal Creative Team',
    areaServed: ['India', 'UAE', 'USA'],
    serviceType: [
      'Brand & Design',
      'Digital Marketing',
      'Performance Marketing',
      'Video Production',
      'Events & Activations',
      'Marketplace Growth'
    ]
  };

  schemaScript.textContent = JSON.stringify(schemaData || defaultSchema);
}
