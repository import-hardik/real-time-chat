import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '0.0.0.0', // Allows access from any device in the network
  //   port: 5173       // Optional: Set the desired port (default is 5173 for Vite)
  // }
})
