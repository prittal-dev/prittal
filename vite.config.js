import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-package-route-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const rawUrl = req.url || '';
          const pathOnly = rawUrl.split('?')[0].split('#')[0];
          // When navigating to /package in browser, route to index.html instead of resolving root package.json
          if (
            (pathOnly === '/package' || pathOnly === '/package/' || pathOnly === '/packages' || pathOnly === '/packages/') &&
            (req.headers.accept?.includes('text/html') || !req.headers.accept || req.headers.accept.includes('*/*'))
          ) {
            req.url = '/index.html';
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    open: true
  }
});
