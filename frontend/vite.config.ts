import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    // The current application bundle is intentionally above Vite's default
    // 500 kB advisory threshold; keep this informational warning out of CI.
    chunkSizeWarningLimit: 800,
  },
})
