import styles from './SearchRow.module.css';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  ariaLabel: string;
  autoFocus?: boolean;
};

export function SearchRow({ value, onChange, placeholder, ariaLabel, autoFocus }: Props) {
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
    </div>
  );
}

