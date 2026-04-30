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
    const contentType = res.headers.get('content-type') ?? '';
    const text = await res.text().catch(() => '');
    const detail = formatErrorDetail(text, contentType) || res.statusText;
    throw new Error(`GET ${path} failed (${res.status}): ${detail}`.trimEnd());
  }
  return (await res.json()) as T;
}

function formatErrorDetail(bodyText: string, contentType: string) {
  const raw = (bodyText ?? '').trim();
  if (!raw) return '';

  // If server returns an HTML error page, don't dump it into the UI.
  const looksHtml =
    contentType.toLowerCase().includes('text/html') ||
    raw.toLowerCase().startsWith('<!doctype html') ||
    raw.toLowerCase().startsWith('<html');
  if (looksHtml) return '';

  // Keep it short + single-line for UI.
  const singleLine = raw.replace(/\s+/g, ' ');
  return singleLine.length > 180 ? `${singleLine.slice(0, 177)}...` : singleLine;
}

