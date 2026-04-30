import type { ReactNode } from 'react';
import styles from './Typography.module.css';

export function Title({ children }: { children: ReactNode }) {
  return <h1 className={styles.title}>{children}</h1>;
}

export function Subtitle({ children }: { children: ReactNode }) {
  return <p className={styles.subtitle}>{children}</p>;
}

export function Muted({ children }: { children: ReactNode }) {
  return <span className={styles.muted}>{children}</span>;
}

export function MutedBlock({ children }: { children: ReactNode }) {
  return <div className={styles.muted}>{children}</div>;
}

