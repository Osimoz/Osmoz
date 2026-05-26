import { useCallback, useEffect, useState } from 'react';
import { fetchAllDeals } from '../api/attio';
import { Deal } from '../types';

interface State {
  deals: Deal[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useAttioDeals() {
  const [state, setState] = useState<State>({
    deals: [],
    isLoading: true,
    error: null,
    lastUpdated: null,
  });

  const refresh = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const deals = await fetchAllDeals();
      setState({ deals, isLoading: false, error: null, lastUpdated: new Date() });
    } catch (err: any) {
      setState((s) => ({ ...s, isLoading: false, error: err?.message ?? 'Erreur inconnue' }));
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...state, refresh };
}
