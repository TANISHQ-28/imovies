import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// requests to /api go to the Express server
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:5000' } },
});
