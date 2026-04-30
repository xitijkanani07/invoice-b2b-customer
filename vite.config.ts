import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // Ensures deep links like /store reload to index.html
    appType: 'spa',
    // Expose REACT_APP_* env vars to client via import.meta.env
    envPrefix: ['VITE_', 'REACT_APP_'],
  };
});
