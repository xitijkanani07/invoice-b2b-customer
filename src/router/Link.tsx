import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { navigate } from './navigation';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

export function Link({ to, onClick, ...rest }: Props) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    navigate(to);
  };

  return <a {...rest} href={to} onClick={handleClick} />;
}
