import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchAllDeals } from '../api/attio';
import { Deal } from '../types';

interface State {
  deals: Deal[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

const FRESHNESS_MS = 5 * 60 * 1000; // 5 minutes
const MIN_MANUAL_REFRESH_MS = 60 * 1000; // 1 minute floor on manual refresh

// Module-scope cache: survives component remounts within the SPA session.
let cachedDeals: Deal[] | null = null;
let cachedAt: Date | null = null;

export function useAttioDeals() {
  const [state, setState] = useState<State>({
    deals: cachedDeals ?? [],
    isLoading: cachedDeals === null,
    error: null,
    lastUpdated: cachedAt,
  });
  const inFlight = useRef(false);

  const load = useCallback(async (force: boolean) => {
    if (inFlight.current) return;
    if (!force && cachedDeals && cachedAt && Date.now() - cachedAt.getTime() < FRESHNESS_MS) {
      setState({ deals: cachedDeals, isLoading: false, error: null, lastUpdated: cachedAt });
      return;
    }
    inFlight.current = true;
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const deals = await fetchAllDeals();
      cachedDeals = deals;
      cachedAt = new Date();
      setState({ deals, isLoading: false, error: null, lastUpdated: cachedAt });
    } catch (err: any) {
      setState((s) => ({ ...s, isLoading: false, error: err?.message ?? 'Erreur inconnue' }));
    } finally {
      inFlight.current = false;
    }
  }, []);

  useEffect(() => {
    load(false);
  }, [load]);

  // Manual refresh: bypass cache, but only if the cache is older than 1 min to
  // protect against accidental hammering of the API (Attio rate-limits hard).
  const refresh = useCallback(() => {
    if (cachedAt && Date.now() - cachedAt.getTime() < MIN_MANUAL_REFRESH_MS) {
      if (cachedDeals) {
        setState({ deals: cachedDeals, isLoading: false, error: null, lastUpdated: cachedAt });
      }
      return;
    }
    load(true);
  }, [load]);

  return { ...state, refresh };
}
