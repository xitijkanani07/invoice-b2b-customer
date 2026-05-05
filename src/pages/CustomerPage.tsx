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
import alertStyles from '../components/ui/Alert.module.css';
import styles from './CustomerPage.module.css';
import { Pagination } from '../components/pagination/Pagination';
import { Loader } from '../components/ui/Loader';
import { fetchCustomerOrders, type OrdersApiResponse } from '../api/b2bApi';

type Props = {
  store: string | null;
  customerId: number | null;
  page: number;
  limit: number;
};

export function CustomerPage({ store, customerId, page, limit }: Props) {
  const [q, setQ] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [data, setData] = useState<OrdersApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storeName = store ?? '';
  const hasParams = Boolean(storeName) && customerId !== null;

  useEffect(() => {
    if (!storeName || customerId === null) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setLoading(true);
      setError(null);
    });
    fetchCustomerOrders(storeName, {
      customerId: String(customerId),
      page,
      limit,
      ...(q.trim() ? { searchText: q.trim() } : {}),
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
  }, [storeName, customerId, page, limit, q]);

  const customerName = data ? `${data.customer.first_name} ${data.customer.last_name}` : '-';
  const email = data?.customer.email ?? '-';
  const address = data
    ? `${data.customer.address.city}, ${data.customer.address.province}, ${data.customer.address.country}`
    : '-';
  const orders = useMemo(() => data?.orders ?? [], [data]);
  const detailsLoading = hasParams && loading && !data && !error;

  return (
    <PageShell
      breadcrumbs={
        <>
          <Link to="/">Home</Link>
          <span style={{ color: 'var(--text)' }}>/</span>
          <Link to={`/store?store=${encodeURIComponent(storeName)}`}>Customers</Link>
          <span style={{ color: 'var(--text)' }}>/</span>
          <span>Orders</span>
        </>
      }
    >
      <div className={styles.cards}>
        <Card
          header={
            <>
              <div>
                <Title>Customer details</Title>
                <Subtitle>Store: {storeName || '-'}</Subtitle>
              </div>
            </>
          }
        >
          {!hasParams ? (
            <div className={alertStyles.error}>
              Missing store/customer. Please go back and select a customer.
            </div>
          ) : null}

          {detailsLoading ? (
            <Loader label={null} center size={20} />
          ) : hasParams ? (
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Customer Name:</span>
                <span>{customerName}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email:</span>
                <span>{email}</span>
              </div>
              <div className={styles.detailItem} style={{ gridColumn: '1 / -1' }}>
                <span className={styles.detailLabel}>Address:</span>
                <span>{address}</span>
              </div>
            </div>
          ) : null}
        </Card>

        <Card
          header={
            <>
              <div>
                <Title>Orders</Title>
                <Subtitle>Customer orders</Subtitle>
              </div>
              <div className={styles.headerRight}>
                <div className={styles.count}>{data ? `${data.totalCount} orders` : ''}</div>
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
          {hasParams && showSearch ? (
            <SearchRow
              value={q}
              onChange={setQ}
              onCancel={() => {
                setQ('');
                setShowSearch(false);
              }}
              placeholder="Search orders…"
              ariaLabel="Search orders"
              autoFocus
            />
          ) : null}

          {error ? <div className={alertStyles.error}>{error}</div> : null}

          {hasParams ? (
            <>
              <DataTable
                header={
                  <tr>
                    <th>Order</th>
                    <th>Invoice date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Probability</th>
                  </tr>
                }
              >
                {loading ? <TableLoadingBody columns={6} rows={7} /> : null}

                {!loading
                  ? orders.map((o) => (
                      <tr key={o.orderId}>
                        <td>{o.orderNum}</td>
                        <td>{new Date(o.invoiceDate).toLocaleString()}</td>
                        <td>{o.totalAmount}</td>
                        <td>
                          {o.status}
                          {o.isOrderCancelled ? (
                            <span style={{ marginLeft: 8 }}>(Cancelled)</span>
                          ) : null}
                        </td>
                        <td>{o.paymentStatus}</td>
                        <td>
                          {o.paymentsProbability === null
                            ? 'null'
                            : o.paymentsProbability === undefined
                              ? 'undefined'
                              : typeof o.paymentsProbability === 'number' &&
                                  Number.isFinite(o.paymentsProbability) &&
                                  o.paymentsProbability >= 1 &&
                                  o.paymentsProbability <= 100
                                ? `${o.paymentsProbability}%`
                                : String(o.paymentsProbability)}
                        </td>
                      </tr>
                    ))
                  : null}

                {!loading && orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 14, color: 'var(--text)' }}>
                      No orders to display.
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
            </>
          ) : null}
        </Card>
      </div>
    </PageShell>
  );
}

