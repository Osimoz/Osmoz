import { useEffect } from 'react';

interface KeyPressOptions {
  key: string;
  callback: () => void;
  enabled?: boolean;
}

export function useKeyPress({ key, callback, enabled = true }: KeyPressOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) callback();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [key, callback, enabled]);
}