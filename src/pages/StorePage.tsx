import { Link } from '../router/Link';
import { useEffect, useMemo, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Title, Subtitle } from '../components/ui/Typography';
import { IconButton } from '../components/ui/IconButton';
import { SearchIcon } from '../components/icons/SearchIcon';
import { SearchRow } from '../components/search/SearchRow';
import { DataTable } from '../components/table/DataTable';
import { TableLoadingBody } from '../components/table/TableLoadingBody';
import linkStyles from '../components/ui/LinkText.module.css';
import styles from './StorePage.module.css';
import { Pagination } from '../components/pagination/Pagination';
import alertStyles from '../components/ui/Alert.module.css';
import { fetchB2BCustomersData, type CustomersApiResponse } from '../api/b2bApi';

type Props = {
  store: string | null;
  page: number;
  limit: number;
};

export function StorePage({ store, page, limit }: Props) {
  const [q, setQ] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [data, setData] = useState<CustomersApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!store) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setLoading(true);
      setError(null);
    });
    fetchB2BCustomersData(store, {
      page,
      limit,
      sortBy: 'first_name',
      orderBy: 'asc',
      ...(q.trim() ? { searchEmail: q.trim() } : {}),
    })
      .then((res) => {
        if (cancelled) return;
        setData(res);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
        setData(null);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [store, page, limit, q]);

  const customers = useMemo(() => data?.data ?? [], [data]);

  return (
    <PageShell
      breadcrumbs={
        <>
          <Link to="/">Home</Link>
          {/* <span style={{ color: 'var(--text)' }}>/</span>
          <span>Store</span> */}
          {store ? (
            <>
              <span style={{ color: 'var(--text)' }}>/</span>
              <span>{store}</span>
            </>
          ) : null}
        </>
      }
    >
      <Card
        header={
          <>
            <div>
              <Title>Customers</Title>
              <Subtitle>
                {store ? `Showing customers for ${store}.` : 'Pick a store to filter customers.'}
              </Subtitle>
            </div>
            <div className={styles.headerRight}>
              <div className={styles.count}>{data ? `${data.totalCount} customers` : ''}</div>
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
        {!store ? (
          <div className={alertStyles.error}>Please select a store from Home.</div>
        ) : null}

        {showSearch ? (
          <SearchRow
            value={q}
            onChange={setQ}
            onCancel={() => {
              setQ('');
              setShowSearch(false);
            }}
            placeholder="Search by email…"
            ariaLabel="Search customers by email"
            autoFocus
          />
        ) : null}

        {error ? <div className={alertStyles.error}>{error}</div> : null}

        <DataTable
          header={
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created</th>
              <th style={{ width: 140 }}>Action</th>
            </tr>
          }
        >
          {loading ? <TableLoadingBody columns={5} rows={6} /> : null}

          {!loading
            ? customers.map((c) => {
                const to = `/store/customer?store=${encodeURIComponent(
                  c.storeName,
                )}&customerId=${encodeURIComponent(String(c.customerId))}`;
                return (
                  <tr key={c._id}>
                    <td>
                      <Link className={linkStyles.rowLink} to={to}>
                        {c.customerId}
                      </Link>
                    </td>
                    <td>
                      <Link className={linkStyles.rowLink} to={to}>
                        {c.first_name} {c.last_name}
                      </Link>
                    </td>
                    <td>{c.email}</td>
                    <td>{new Date(c.createdAt).toLocaleString()}</td>
                    <td>
                      <Link className={[linkStyles.rowLink, linkStyles.nowrap].join(' ')} to={to}>
                        View orders <span aria-hidden>→</span>
                      </Link>
                    </td>
                  </tr>
                );
              })
            : null}
          {!loading && customers.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ padding: 14, color: 'var(--text)' }}>
                No customers found for this store.
              </td>
            </tr>
          ) : null}
        </DataTable>

        {data ? (
          <Pagination
            page={data.page}
            limit={data.limit}
            totalCount={data.totalCount}
            prev={data.prev}
            next={data.next}
          />
        ) : null}
      </Card>
    </PageShell>
  );
}

