import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:7000
  }
  server: {
    open: 'brave' // Or provide the full path to the Brave browser executable
  }
})
