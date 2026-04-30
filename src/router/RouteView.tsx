import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { CustomerPage } from '../pages/CustomerPage';
import { HomePage } from '../pages/HomePage';
import { StorePage } from '../pages/StorePage';
import { getLocationSnapshot, readSearchParam, subscribeToLocationChanges } from './navigation';
import { PasswordGate } from './PasswordGate';

const UNLOCK_KEY = 'invoiceB2bEanbled';
const UNLOCK_TTL_MS = 10 * 60 * 1000;

export function RouteView() {
  const loc = useSyncExternalStore(subscribeToLocationChanges, getLocationSnapshot, getLocationSnapshot);
  const [unlocked, setUnlocked] = useState(() => {
    const raw = window.localStorage.getItem(UNLOCK_KEY);
    const expiresAt = raw ? Number(raw) : NaN;
    if (!Number.isFinite(expiresAt)) return false;
    if (Date.now() >= expiresAt) {
      window.localStorage.removeItem(UNLOCK_KEY);
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (!unlocked) return;
    const raw = window.localStorage.getItem(UNLOCK_KEY);
    const expiresAt = raw ? Number(raw) : NaN;
    if (!Number.isFinite(expiresAt)) return;
    const msLeft = expiresAt - Date.now();
    if (msLeft <= 0) {
      window.localStorage.removeItem(UNLOCK_KEY);
      setUnlocked(false);
      return;
    }
    const t = window.setTimeout(() => {
      window.localStorage.removeItem(UNLOCK_KEY);
      setUnlocked(false);
    }, msLeft);
    return () => window.clearTimeout(t);
  }, [unlocked]);

  const params = useMemo(() => {
    const store = readSearchParam(loc.search, 'store');
    const customerIdRaw = readSearchParam(loc.search, 'customerId');
    const customerId = customerIdRaw ? Number(customerIdRaw) : null;
    const pageRaw = readSearchParam(loc.search, 'page');
    const limitRaw = readSearchParam(loc.search, 'limit');
    const page = pageRaw ? Number(pageRaw) : 1;
    const limit = limitRaw ? Number(limitRaw) : 25;
    return {
      store,
      customerId: Number.isFinite(customerId) ? customerId : null,
      page: Number.isFinite(page) && page > 0 ? page : 1,
      limit: Number.isFinite(limit) && limit > 0 ? limit : 25,
    };
  }, [loc.search]);

  if (!unlocked) {
    return (
      <PasswordGate
        onUnlock={() => {
          window.localStorage.setItem(UNLOCK_KEY, String(Date.now() + UNLOCK_TTL_MS));
          setUnlocked(true);
        }}
      />
    );
  }

  if (loc.pathname === '/') return <HomePage />;
  if (loc.pathname === '/store') return <StorePage store={params.store} page={params.page} limit={params.limit} />;
  if (loc.pathname === '/store/customer')
    return (
      <CustomerPage
        store={params.store}
        customerId={params.customerId}
        page={params.page}
        limit={params.limit}
      />
    );

  return (
    <div className="appShell">
      <div className="card">
        <h1 className="title">404</h1>
        <p className="muted">Page not found: {loc.pathname}</p>
      </div>
    </div>
  );
}
