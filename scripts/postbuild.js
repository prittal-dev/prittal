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
  },
  {
    path: '/404',
    title: '404 — Page Not Found | Prittal Creative Agency',
    description: 'The page you are looking for does not exist or has been moved.'
  }
];

// Service pages from servicesData
const serviceSubpages = [
  {
    slug: 'brand-design',
    title: 'Brand Identity & Design Agency | Branding Solutions - Prittal',
    description: 'Prittal is a global brand design agency providing identity design, logo creation, and strategic positioning to build memorable brands. Get started today.'
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing & SEO Agency | Growth Solutions - Prittal',
    description: 'Prittal drives global business growth through strategic SEO, content marketing, and performance-driven digital campaigns. Scale your brand presence now.'
  },
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing & Paid Media Agency | Growth - Prittal',
    description: 'Prittal delivers data-driven performance marketing, paid media, and growth advertising to maximize ROI and scale global businesses. Request a consultation.'
  },
  {
    slug: 'video-production',
    title: 'Video Production & Commercial Shoot Services — Prittal',
    description: 'High-impact commercial video production, brand films, product shoots, and social-first video content.'
  },
  {
    slug: 'events-activations',
    title: 'Event Marketing & Brand Activation Agency | Prittal',
    description: 'Prittal creates immersive corporate event experiences and brand activations that engage audiences and build brand equity worldwide. Partner with us today.'
  },
  {
    slug: 'events-and-activations',
    title: 'Event Marketing & Brand Activation Agency | Prittal',
    description: 'Prittal creates immersive corporate event experiences and brand activations that engage audiences and build brand equity worldwide. Partner with us today.'
  },
  {
    slug: 'marketplace-growth',
    title: 'E-commerce & Marketplace Growth Agency | Prittal',
    description: 'Prittal specializes in e-commerce branding, website design, and marketplace optimization to boost sales and listing performance worldwide. Explore solutions.'
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
    if (route.path === '/404') {
      fs.writeFileSync(path.join(distDir, '404.html'), updatedHtml, 'utf8');
    }
    console.log(`[prerender] Generated static HTML for: ${route.path}`);
  });
}

generatePrerenderedHTML();
