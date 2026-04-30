import { STORES } from '../data/staticData';
import { Link } from '../router/Link';
import { useMemo, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { Title } from '../components/ui/Typography';
import { IconButton } from '../components/ui/IconButton';
import { SearchIcon } from '../components/icons/SearchIcon';
import { SearchRow } from '../components/search/SearchRow';
import { DataTable } from '../components/table/DataTable';
import linkStyles from '../components/ui/LinkText.module.css';
import { Pagination } from '../components/pagination/Pagination';

type Props = { page: number; limit: number };

export function HomePage({ page, limit }: Props) {
  const [q, setQ] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [...STORES];
    return STORES.filter((s) => s.toLowerCase().includes(query));
  }, [q]);

  const totalCount = filtered.length;
  const prev = page > 1 ? page - 1 : null;
  const next = page * limit < totalCount ? page + 1 : null;
  const pagedStores = filtered.slice((page - 1) * limit, page * limit);

  return (
    <PageShell
      breadcrumbs={<span>Home</span>}
      actions={
        <IconButton
          active={showSearch}
          aria-label={showSearch ? 'Hide search' : 'Show search'}
          onClick={() => setShowSearch((v) => !v)}
        >
          <SearchIcon />
        </IconButton>
      }
    >
      <Card header={<Title>Store list</Title>}>
        {showSearch ? (
          <SearchRow
            value={q}
            onChange={setQ}
            placeholder="Search store…"
            ariaLabel="Search store"
            autoFocus
          />
        ) : null}

        <DataTable
          header={
            <tr>
              <th>Store</th>
              <th style={{ width: 140 }}>Action</th>
            </tr>
          }
        >
          {pagedStores.map((store) => (
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
          ))}
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={2} style={{ padding: 14, color: 'var(--text)' }}>
                No stores found.
              </td>
            </tr>
          ) : null}
        </DataTable>

        <Pagination page={page} limit={limit} totalCount={totalCount} prev={prev} next={next} />
      </Card>
    </PageShell>
  );
}

