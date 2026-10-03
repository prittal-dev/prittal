import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const routes = [
  {
    path: '/about-us',
    title: 'Best Branding Firm & Creative Agency | Prittal',
    description: 'Prittal is a premier branding firm in USA, UAE & India. Recognized among the best creative agencies for strategic brand identity design & business growth.'
  },
  {
    path: '/services',
    title: 'Digital Growth Solutions & Strategy | Scale Online | Prittal',
    description: 'Discover how to scale a business online with Prittal. We deliver custom business growth strategy and digital growth solutions to transform clicks into revenue.'
  },
  {
    path: '/portfolio',
    title: 'Our Work & Portfolio | Prittal Creative Agency',
    description: 'Explore our comprehensive portfolio of branding, performance campaigns, video productions, websites, and AI creative solutions for leading brands.'
  },
  {
    path: '/package',
    title: 'Packages & Pricing | Prittal Creative Agency',
    description: 'Explore tailored packages for Website Development, SEO, Social Media Marketing, Paid Campaigns, Product Shoots, and Google My Business.'
  },
  {
    path: '/thank-you',
    title: 'Thank You — Inquiry Received | Prittal Creative Agency',
    description: 'Thank you for reaching out to Prittal. Our senior strategy team will review your project brief and respond shortly.'
  }
];

// Service pages from servicesData
const serviceSubpages = [
  {
    slug: 'brand-design',
    title: 'Brand & Design Services — Prittal',
    description: 'Logo, identity, UI, packaging — we make you look like you mean business. Visual Identity Systems, Brand Guidelines, Web & App UI/UX.'
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing & Social Media Services — Prittal',
    description: 'Strategic social media management, organic content creation, and search engine optimization built to expand audience reach.'
  },
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing & Paid Ads Services — Prittal',
    description: 'High-ROI Google Ads, Meta Ads, and Conversion Rate Optimization designed to scale customer acquisition.'
  },
  {
    slug: 'video-production',
    title: 'Video Production & Commercial Shoot Services — Prittal',
    description: 'High-impact commercial video production, brand films, product shoots, and social-first video content.'
  },
  {
    slug: 'events-activations',
    title: 'Events & On-Ground Activations — Prittal',
    description: 'Immersive corporate events, experiential brand activations, and trade show booth design.'
  },
  {
    slug: 'marketplace-growth',
    title: 'Marketplace Growth & E-commerce Services — Prittal',
    description: 'Amazon, Flipkart, and Shopify store optimization, listing design, and sponsored ad management.'
  }
];

serviceSubpages.forEach(s => {
  routes.push({
    path: `/services/${s.slug}`,
    title: s.title,
    description: s.description
  });
});

async function generatePrerenderedHTML() {
  const baseHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(baseHtmlPath)) {
    console.error('dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

  routes.forEach(route => {
    const routeDir = path.join(distDir, route.path);
    fs.mkdirSync(routeDir, { recursive: true });

    let updatedHtml = baseHtml;

    // Replace <title>
    updatedHtml = updatedHtml.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${route.title}</title>`
    );

    // Replace <meta name="description">
    updatedHtml = updatedHtml.replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta name="description" content="${route.description}" />`
    );

    // Replace canonical URL
    const canonicalUrl = `https://www.prittal.com${route.path}`;
    updatedHtml = updatedHtml.replace(
      /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // Replace OpenGraph title & description if present or inject them
    updatedHtml = updatedHtml.replace(
      /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    updatedHtml = updatedHtml.replace(
      /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:description" content="${route.description}" />`
    );

    fs.writeFileSync(path.join(routeDir, 'index.html'), updatedHtml, 'utf8');
    console.log(`[prerender] Generated static HTML for: ${route.path}`);
  });
}

generatePrerenderedHTML();
