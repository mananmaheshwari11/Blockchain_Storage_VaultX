import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory
    sourcemap: false, 
    target:"esnext",
    rollupOptions:{
      output:{
        manualChunks(id){
          if (id.includes('node_modules/pdfjs-dist')) {
            return 'pdfjs';
          }
        }
      }
    }
  },
  server:{
    proxy:{
      '/api':{
        target:"http://localhost:8081",
        changeOrigin:true
      }
    }
  }
})
