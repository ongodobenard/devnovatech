import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-helmet-async')) return 'helmet'
          if (id.includes('react-router-dom') || id.includes('react-router')) return 'router'
        },
      },
    },
  },
})
