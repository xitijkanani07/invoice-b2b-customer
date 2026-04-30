import type { ReactNode } from 'react';
import styles from './PageShell.module.css';

type Props = {
  breadcrumbs: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
};

export function PageShell({ breadcrumbs, actions, children }: Props) {
  return (
    <div className={styles.shell}>
      <div className={styles.topBar}>
        <div className={styles.crumbs}>{breadcrumbs}</div>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}

