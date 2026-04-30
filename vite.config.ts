import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiBase = env.VITE_API_ENDPOINT || env.REACT_APP_API_ENDPOINT || '';

  return {
    plugins: [react()],
    // Ensures deep links like /store reload to index.html
    appType: 'spa',
    // Expose CRA-style env var to client code
    define: {
      'import.meta.env.VITE_API_ENDPOINT': JSON.stringify(apiBase),
      'import.meta.env.REACT_APP_API_ENDPOINT': JSON.stringify(env.REACT_APP_API_ENDPOINT || ''),
    },
  };
});
