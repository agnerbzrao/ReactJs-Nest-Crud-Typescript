import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const port: number = process.env.REACT_PORT;
export default defineConfig({

  plugins: [react()],
  server: {
    host: true,
    port: port
  }
 })