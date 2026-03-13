import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages project sites: set base to '/repo-name/' (e.g. base: '/portfolio/')
// For user/org sites (username.github.io): use base: '/'
// Can override via: VITE_BASE_PATH=/my-repo/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
