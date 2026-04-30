import { useMemo, useRef, useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Card } from '../components/ui/Card';
import { IconButton } from '../components/ui/IconButton';
import { Title, Subtitle } from '../components/ui/Typography';
import styles from './PasswordGate.module.css';

type Props = {
  onUnlock: () => void;
};

export function PasswordGate({ onUnlock }: Props) {
  const [pw, setPw] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const toastTimer = useRef<number | null>(null);

  const disabled = useMemo(() => pw.trim().length === 0, [pw]);
  const expectedPassword =
    (import.meta.env.REACT_APP_PASSWORD as string | undefined) ??
    (import.meta.env.REACT_API_PASSWORD as string | undefined) ??
    'helloxitij';

  return (
    <PageShell>
      {toast ? (
        <div className={styles.toastWrap} role="status" aria-live="polite">
          <div className={styles.toast}>{toast}</div>
        </div>
      ) : null}
      <div className={styles.center}>
        <div className={styles.wrap}>
          <Card
            header={
              <div>
                <Title>Password required</Title>
                <Subtitle>Please enter the password to continue.</Subtitle>
              </div>
            }
          >
            <form
              className={styles.form}
              onSubmit={async (e) => {
                e.preventDefault();
                if (verifying) return;
                setToast(null);
                setVerifying(true);
                await sleep(1000);

                if (pw === expectedPassword) {
                  onUnlock();
                } else {
                  setToast('Wrong password.');
                  setVerifying(false);
                }
                if (toastTimer.current) window.clearTimeout(toastTimer.current);
                toastTimer.current = window.setTimeout(() => setToast(null), 2200);
              }}
            >
              <input
                className={styles.input}
                type={showPw ? 'text' : 'password'}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter password…"
                aria-label="Enter password"
                autoFocus
                disabled={verifying}
              />
              <IconButton
                className={styles.eyeButton}
                active={showPw}
                aria-label={showPw ? 'Hide password' : 'Show password'}
                onClick={() => setShowPw((v) => !v)}
                disabled={verifying}
              >
                {showPw ? <EyeOffIcon /> : <EyeIcon />}
              </IconButton>
              <button className={styles.button} type="submit" disabled={disabled || verifying}>
                <span className={styles.buttonInner}>
                  {verifying ? <span className={styles.spinner} aria-hidden="true" /> : null}
                  <span>{verifying ? 'Verifying…' : 'Unlock'}</span>
                </span>
              </button>
            </form>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.2 12s3.6-7 9.8-7 9.8 7 9.8 7-3.6 7-9.8 7S2.2 12 2.2 12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.2 12s3.6-7 9.8-7c2.1 0 3.9.6 5.4 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M21.8 12s-3.6 7-9.8 7c-2.1 0-3.9-.6-5.4-1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M4 20 20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

