import styles from './SearchRow.module.css';
import { IconButton } from '../ui/IconButton';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onCancel?: () => void;
  placeholder: string;
  ariaLabel: string;
  autoFocus?: boolean;
};

export function SearchRow({ value, onChange, onCancel, placeholder, ariaLabel, autoFocus }: Props) {
  return (
    <div className={styles.row}>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        autoFocus={autoFocus}
      />
      {onCancel ? (
        <IconButton aria-label="Cancel search" onClick={onCancel}>
          <XIcon />
        </IconButton>
      ) : null}
    </div>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6 18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

