import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: ["creatorlensstudio.com", "www.creatorlensstudio.com", "creatorlens-studio-live.vercel.app"],
  }
})
