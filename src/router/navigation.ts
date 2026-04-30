export type LocationSnapshot = {
  pathname: string;
  search: string;
};

const NAV_EVENT = 'app:navigate';

let cachedSnapshot: LocationSnapshot | null = null;
function computeSnapshot(): LocationSnapshot {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
  };
}

function refreshSnapshot(): boolean {
  const next = computeSnapshot();
  const prev = cachedSnapshot;
  if (prev && prev.pathname === next.pathname && prev.search === next.search) return false;
  cachedSnapshot = next;
  return true;
}

function notify() {
  window.dispatchEvent(new Event(NAV_EVENT));
}

export function navigate(to: string) {
  if (!to.startsWith('/')) to = `/${to}`;
  if (`${window.location.pathname}${window.location.search}` === to) return;
  window.history.pushState({}, '', to);
  notify();
}

export function subscribeToLocationChanges(onChange: () => void) {
  const handler = () => {
    const changed = refreshSnapshot();
    if (changed) onChange();
  };
  window.addEventListener('popstate', handler);
  window.addEventListener(NAV_EVENT, handler);
  return () => {
    window.removeEventListener('popstate', handler);
    window.removeEventListener(NAV_EVENT, handler);
  };
}

export function getLocationSnapshot(): LocationSnapshot {
  if (cachedSnapshot === null) cachedSnapshot = computeSnapshot();
  return cachedSnapshot;
}

export function readSearchParam(search: string, key: string) {
  const v = new URLSearchParams(search).get(key);
  return v === null ? null : v;
}

export function buildUrlWithQuery(next: Record<string, string | number | null | undefined>) {
  const url = new URL(window.location.href);
  Object.entries(next).forEach(([k, v]) => {
    if (v === null || v === undefined || v === '') url.searchParams.delete(k);
    else url.searchParams.set(k, String(v));
  });
  return `${url.pathname}?${url.searchParams.toString()}`;
}

