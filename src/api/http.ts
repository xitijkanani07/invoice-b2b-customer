import { getApiBaseUrl } from './config';

export async function httpGet<T>(
  path: string,
  params: Record<string, string | number | boolean | null | undefined>,
  headers?: Record<string, string>,
): Promise<T> {
  const base = getApiBaseUrl();
  const baseForUrl = base || window.location.origin;
  let url: URL;
  try {
    url = new URL(path, baseForUrl);
  } catch {
    throw new Error(
      `Invalid API base URL. Set VITE_API_ENDPOINT in .env (current: ${JSON.stringify(base)}).`,
    );
  }
  Object.entries(params).forEach(([k, v]) => {
    if (v === null || v === undefined || v === '') return;
    url.searchParams.set(k, String(v));
  });

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GET ${path} failed (${res.status}): ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

