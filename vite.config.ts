import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    sitemap({
      hostname: 'https://osmoz.work',
      dynamicRoutes: [
        '/spaces/loft-osmoz',
        '/spaces/duplex-osmoz',
        '/spaces/penthouse-osmoz',
        '/contact',
        '/Questions-Frequentes',
        '/legal/privacy',
      ],
      changefreq: 'weekly',
      priority: {
        '/': 1.0,
        '/spaces/loft-osmoz': 0.9,
        '/spaces/duplex-osmoz': 0.9,
        '/spaces/penthouse-osmoz': 0.9,
        '/contact': 0.8,
        '/Questions-Frequentes': 0.7,
        '/legal/privacy': 0.3,
      },
      lastmod: new Date().toISOString(),
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