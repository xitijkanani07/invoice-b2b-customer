export function getApiBaseUrl() {
  const raw =
    (import.meta.env.VITE_API_ENDPOINT as string | undefined) ||
    // Support CRA-style env var name too (some setups still inject it).
    ((import.meta.env as unknown as Record<string, string | undefined>).REACT_APP_API_ENDPOINT as
      | string
      | undefined);
  if (!raw) return '';
  return raw.endsWith('/') ? raw.slice(0, -1) : raw;
}

