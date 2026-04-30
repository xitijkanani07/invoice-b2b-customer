import { useMemo, useSyncExternalStore } from 'react';
import { CustomerPage } from '../pages/CustomerPage';
import { HomePage } from '../pages/HomePage';
import { StorePage } from '../pages/StorePage';
import { getLocationSnapshot, readSearchParam, subscribeToLocationChanges } from './navigation';

export function RouteView() {
  const loc = useSyncExternalStore(subscribeToLocationChanges, getLocationSnapshot, getLocationSnapshot);

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

  if (loc.pathname === '/') return <HomePage page={params.page} limit={params.limit} />;
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
