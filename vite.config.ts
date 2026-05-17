// @ts-ignore
import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
// @ts-ignore
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
  plugins: [
    RubyPlugin(),
    react(),
  ],
})