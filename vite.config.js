import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/gentle-mind-reflections/', // This is important for GitHub Pages
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}) 