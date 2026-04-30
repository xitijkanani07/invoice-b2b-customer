import styles from './Loader.module.css';

export function Loader({
  label = 'Loading…',
  size = 14,
  center = false,
}: {
  label?: string | null;
  size?: number;
  center?: boolean;
}) {
  return (
    <div className={[styles.wrap, center ? styles.center : ''].join(' ')} role="status" aria-live="polite">
      <div className={styles.spinner} style={{ ['--loader-size' as never]: `${size}px` }} aria-hidden="true" />
      {label ? <div className={styles.label}>{label}</div> : null}
    </div>
  );
}

