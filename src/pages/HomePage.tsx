import { Link } from '../router/Link';
import { useEffect, useMemo, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Title } from '../components/ui/Typography';
import { IconButton } from '../components/ui/IconButton';
import { SearchIcon } from '../components/icons/SearchIcon';
import { SearchRow } from '../components/search/SearchRow';
import { DataTable } from '../components/table/DataTable';
import { TableLoadingBody } from '../components/table/TableLoadingBody';
import linkStyles from '../components/ui/LinkText.module.css';
import alertStyles from '../components/ui/Alert.module.css';
import { fetchB2BStores } from '../api/b2bApi';
import styles from './HomePage.module.css';

export function HomePage() {
  const [q, setQ] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [stores, setStores] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setLoading(true);
      setError(null);
    });
    fetchB2BStores()
      .then((rows) => {
        if (cancelled) return;
        const names = rows.map((r) => r.storeName).filter(Boolean);
        names.sort((a, b) => a.localeCompare(b));
        setStores(names);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
        setStores([]);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [...stores];
    return stores.filter((s) => s.toLowerCase().includes(query));
  }, [q, stores]);

  const visibleStores = filtered;

  return (
    <PageShell breadcrumbs={<span>Home</span>}>
      <Card
        header={
          <>
            <div>
              <Title>Store list</Title>
            </div>
            <div className={styles.headerRight}>
              <IconButton
                active={showSearch}
                aria-label={showSearch ? 'Hide search' : 'Show search'}
                onClick={() => setShowSearch((v) => !v)}
              >
                <SearchIcon />
              </IconButton>
            </div>
          </>
        }
      >
        {showSearch ? (
          <SearchRow
            value={q}
            onChange={setQ}
            onCancel={() => {
              setQ('');
              setShowSearch(false);
            }}
            placeholder="Search store…"
            ariaLabel="Search store"
            autoFocus
          />
        ) : null}

        {error ? <div className={alertStyles.error}>{error}</div> : null}

        <DataTable
          header={
            <tr>
              <th>Store</th>
              <th style={{ width: 140 }}>Action</th>
            </tr>
          }
        >
          {loading ? <TableLoadingBody columns={2} rows={8} /> : null}

          {!loading
            ? visibleStores.map((store) => (
                <tr key={store}>
                  <td>
                    <Link className={linkStyles.rowLink} to={`/store?store=${encodeURIComponent(store)}`}>
                      {store}
                    </Link>
                  </td>
                  <td>
                    <Link
                      className={[linkStyles.rowLink, linkStyles.nowrap].join(' ')}
                      to={`/store?store=${encodeURIComponent(store)}`}
                    >
                      View customers <span aria-hidden>→</span>
                    </Link>
                  </td>
                </tr>
              ))
            : null}
          {!loading && filtered.length === 0 ? (
            <tr>
              <td colSpan={2} style={{ padding: 14, color: 'var(--text)' }}>
                No stores found.
              </td>
            </tr>
          ) : null}
        </DataTable>
      </Card>
    </PageShell>
  );
}

