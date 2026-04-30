import type { ReactNode } from 'react';
import styles from './Card.module.css';

type Props = {
  header?: ReactNode;
  children: ReactNode;
};

export function Card({ header, children }: Props) {
  return (
    <div className={styles.card}>
      {header ? <div className={styles.header}>{header}</div> : null}
      {children}
    </div>
  );
}

