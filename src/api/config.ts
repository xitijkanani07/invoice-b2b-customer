export function getApiBaseUrl() {
  // In Vite, runtime code must use import.meta.env (process.env is not available in browser).
  // Netlify injects env vars at build time.
  const env = import.meta.env as unknown as Record<string, string | undefined>;
  const raw = env.REACT_APP_API_ENDPOINT;
  if (!raw) return '';
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

