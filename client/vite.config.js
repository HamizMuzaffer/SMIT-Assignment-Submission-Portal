import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['smit.png'],
      manifest: {
        name: 'SMIT Student Portal',
        short_name: 'SMIT',
        description: 'SMIT Student Portal App',
        icons: [
          {
            src: './smit.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: './smit.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: './smit.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: './smit.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ],
        theme_color: '#0b73b7',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait'
      }
    })
  ],
  optimizeDeps: {
    include: ['@mui/material/Tooltip', '@emotion/styled'],
  },
});
