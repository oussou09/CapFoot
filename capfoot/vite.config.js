import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Continue using SWC for React

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // Change this from 'localhost' to '127.0.0.1'
    port: 3000, // Ensure this is the port you want to use
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Laravel backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
