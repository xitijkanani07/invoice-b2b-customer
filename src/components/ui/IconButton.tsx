import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.css';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  active?: boolean;
  children: ReactNode;
};

export function IconButton({ active, className, ...rest }: Props) {
  return (
    <button
      type="button"
      {...rest}
      className={[styles.button, active ? styles.active : '', className].filter(Boolean).join(' ')}
    />
  );
}

