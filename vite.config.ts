import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    sitemap({
      hostname: 'https://osmoz-space.com',
      dynamicRoutes: [
        '/spaces',
        '/spaces/loft-osmoz',
        '/spaces/duplex-osmoz',
        '/spaces/penthouse-osmoz',
        '/experience',
        '/rse',
        '/contact',
        '/questions-frequentes',
        '/mentions-legales',
        '/politique-de-confidentialite',
      ],
      // public/robots.txt est la source de vérité : par défaut le plugin
      // écrase dist/robots.txt avec son propre fichier (Allow: / seulement),
      // ce qui faisait disparaître nos Disallow en production.
      generateRobotsTxt: false,
      changefreq: 'weekly',
      priority: {
        '/': 1.0,
        '/spaces': 0.9,
        '/spaces/loft-osmoz': 0.9,
        '/spaces/duplex-osmoz': 0.9,
        '/spaces/penthouse-osmoz': 0.9,
        '/experience': 0.8,
        '/contact': 0.8,
        '/questions-frequentes': 0.7,
        '/rse': 0.6,
        '/mentions-legales': 0.3,
        '/politique-de-confidentialite': 0.3,
      },
      lastmod: new Date(),
    }),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons': ['lucide-react'],
          'supabase': ['@supabase/supabase-js']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: []
  },
  server: {
    port: 5173,
    host: true
  }
});