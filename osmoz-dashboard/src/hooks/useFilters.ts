import { useState } from 'react';
import { Deal, Filters, Period } from '../types';

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1, 0, 0, 0, 0);
}
export function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function monthPeriod(d: Date): Period {
  return { mode: 'month', start: startOfMonth(d), end: endOfMonth(d) };
}

export function allPeriod(): Period {
  return { mode: 'all', start: null, end: null };
}

export function defaultFilters(): Filters {
  return {
    view: 'comptable',
    metric: 'value',
    owner: 'all',
    period: monthPeriod(new Date()),
  };
}

export function useFilters() {
  const [filters, setFilters] = useState<Filters>(defaultFilters());
  return { filters, setFilters };
}

export function applyOwnerFilter(deals: Deal[], filters: Filters): Deal[] {
  if (filters.owner === 'all') return deals;
  return deals.filter((d) => d.owner === filters.owner);
}

export function dateFieldForView(view: Filters['view']): 'endBookingDate' | 'stageChangedAt' {
  return view === 'comptable' ? 'endBookingDate' : 'stageChangedAt';
}

/**
 * True if the deal's reference date for the current view falls in the selected period.
 * Deals without a reference date are excluded.
 */
export function inPeriod(deal: Deal, filters: Filters): boolean {
  const ref = deal[dateFieldForView(filters.view)];
  if (!ref) return false;
  const { period } = filters;
  if (period.mode === 'all' || !period.start || !period.end) return true;
  const t = (ref as Date).getTime();
  return t >= period.start.getTime() && t <= period.end.getTime();
}

export function applyPeriodAndOwner(deals: Deal[], filters: Filters): Deal[] {
  return applyOwnerFilter(deals, filters).filter((d) => inPeriod(d, filters));
}
