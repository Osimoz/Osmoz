import { FormEvent, useState } from 'react';

interface Props {
  onUnlock: () => void;
}

const SESSION_KEY = 'osmoz_dashboard_authed';

export function checkAuth(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export function PasswordGate({ onUnlock }: Props) {
  const [value, setValue] = useState('');
  const [shake, setShake] = useState(false);
  const expected = import.meta.env.VITE_DASHBOARD_PASSWORD;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value === expected) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onUnlock();
    } else {
      setShake(false);
      requestAnimationFrame(() => setShake(true));
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-cream">
      <div className={`w-full max-w-sm ${shake ? 'shake' : ''}`}>
        <div className="text-center mb-10">
          <div className="font-display text-bordeaux text-4xl tracking-tight mb-2">OSMOZ</div>
          <div className="label-muted">Tableau de bord commercial</div>
        </div>
        <form onSubmit={onSubmit} className="card p-6 space-y-4">
          <label className="block">
            <span className="label-muted block mb-2">Mot de passe</span>
            <input
              type="password"
              className="input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
            />
          </label>
          <button type="submit" className="btn btn-primary w-full justify-center">
            Accéder
          </button>
        </form>
      </div>
    </div>
  );
}
