import type { ReactNode } from 'react';
import styles from './DataTable.module.css';

type Props = {
  header: ReactNode;
  children: ReactNode;
};

export function DataTable({ header, children }: Props) {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>{header}</thead>
      <tbody>{children}</tbody>
    </table>
  );
}

