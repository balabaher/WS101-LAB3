import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/WS101-LAB3/',
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
})
