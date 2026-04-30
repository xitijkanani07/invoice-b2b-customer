import { navigate, buildUrlWithQuery } from '../../router/navigation';
import styles from './Pagination.module.css';

type Props = {
  page: number;
  limit: number;
  totalCount: number;
  prev: number | null;
  next: number | null;
};

const LIMITS = [25, 50, 75, 100] as const;

export function Pagination({ page, limit, totalCount, prev, next }: Props) {
  const from = totalCount === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalCount);

  return (
    <div className={styles.wrap}>
      <div className={styles.summary}>
        Showing {from}-{to} of {totalCount}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          disabled={prev === null}
          aria-label="Previous page"
          onClick={() => navigate(buildUrlWithQuery({ page: prev }))}
        >
          ←
        </button>
        <div className={styles.page}>Page {page}</div>
        <button
          type="button"
          className={styles.arrow}
          disabled={next === null}
          aria-label="Next page"
          onClick={() => navigate(buildUrlWithQuery({ page: next }))}
        >
          →
        </button>

        <div className={styles.divider} />

        <label className={styles.limit}>
          Limit
          <select
            className={styles.select}
            value={limit}
            onChange={(e) => {
              const nextLimit = Number(e.target.value);
              navigate(buildUrlWithQuery({ limit: nextLimit, page: 1 }));
            }}
          >
            {LIMITS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

