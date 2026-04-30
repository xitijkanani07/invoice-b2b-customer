import { Loader } from '../ui/Loader';
import styles from './TableLoadingBody.module.css';

type Props = {
  columns: number;
  rows?: number;
  label?: string | null;
};

export function TableLoadingBody({ columns, rows = 6, label = 'Loading…' }: Props) {
  const skeletonRows = Math.max(0, rows - 1);

  return (
    <>
      <tr>
        <td colSpan={columns} className={styles.loaderCell}>
          <Loader label={label} center size={18} />
        </td>
      </tr>
      {Array.from({ length: skeletonRows }).map((_, rowIdx) => (
        <tr key={rowIdx} className={styles.skeletonRow} aria-hidden="true">
          {Array.from({ length: columns }).map((__, colIdx) => {
            const width = SKELETON_WIDTHS[colIdx % SKELETON_WIDTHS.length];
            return (
              <td key={colIdx}>
                <div className={styles.skeletonBar} style={{ width }} />
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

const SKELETON_WIDTHS = ['55%', '70%', '45%', '60%', '40%', '50%'];

