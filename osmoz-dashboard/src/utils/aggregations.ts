import { Deal, WON_STAGES, LOST_STAGES, PIPELINE_STAGES, NON_RENSEIGNE, DATA_START } from '../types';
import { monthKey } from './formatters';

export const isWon = (d: Deal) => WON_STAGES.includes(d.stage);
export const isLost = (d: Deal) => LOST_STAGES.includes(d.stage);
export const isPipeline = (d: Deal) => PIPELINE_STAGES.includes(d.stage);

export const sumValue = (deals: Deal[]): number =>
  deals.reduce((s, d) => s + (d.value || 0), 0);

export const avgValue = (deals: Deal[]): number =>
  deals.length === 0 ? 0 : sumValue(deals) / deals.length;

export function calcWinRate(deals: Deal[]): number {
  const won = deals.filter(isWon).length;
  const lost = deals.filter(isLost).length;
  if (won + lost === 0) return 0;
  return (won / (won + lost)) * 100;
}

export function calcLostRate(deals: Deal[]): number {
  const won = deals.filter(isWon).length;
  const lost = deals.filter(isLost).length;
  if (won + lost === 0) return 0;
  return (lost / (won + lost)) * 100;
}

export function fieldLabel(deal: Deal, field: 'space' | 'category' | 'bookingSource'): string {
  const v = deal[field];
  return v == null || v === '' ? NON_RENSEIGNE : v;
}

export function uniqueSpaces(deals: Deal[]): string[] {
  const set = new Set<string>();
  for (const d of deals) {
    if (d.space) set.add(d.space);
  }
  return Array.from(set).sort();
}

export function groupByMonth(
  deals: Deal[],
  dateField: 'createdAt' | 'endBookingDate' | 'bookingStart' | 'stageChangedAt'
): Map<string, Deal[]> {
  const map = new Map<string, Deal[]>();
  for (const d of deals) {
    const date = d[dateField];
    if (!date) continue;
    const key = monthKey(date as Date);
    const arr = map.get(key) ?? [];
    arr.push(d);
    map.set(key, arr);
  }
  return map;
}

/**
 * Build month keys from January 2026 through the given end date (inclusive on month).
 */
export function monthKeysFromStart(through = new Date()): string[] {
  const keys: string[] = [];
  const cursor = new Date(DATA_START.getFullYear(), DATA_START.getMonth(), 1);
  const end = new Date(through.getFullYear(), through.getMonth(), 1);
  while (cursor <= end) {
    keys.push(monthKey(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return keys;
}

/**
 * Build month keys covering a period (start..end inclusive), defaulting to the
 * full data range when the period is "all" or unbounded. This is the function
 * to call when you need the X-axis range for the bar chart.
 */
export function monthKeysForPeriod(period: {
  mode: 'month' | 'all' | 'custom';
  start: Date | null;
  end: Date | null;
}): string[] {
  if (period.mode === 'all' || !period.start || !period.end) {
    return monthKeysFromStart();
  }
  const through = period.end >= new Date() ? period.end : new Date();
  // Bound the lower end at DATA_START so we never produce pre-2026 keys.
  const startSource = period.start < DATA_START ? DATA_START : period.start;
  const keys: string[] = [];
  const cursor = new Date(startSource.getFullYear(), startSource.getMonth(), 1);
  const last = new Date(through.getFullYear(), through.getMonth(), 1);
  while (cursor <= last) {
    keys.push(monthKey(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }
  // Also clip to the period's own month range (in case `through` extended past
  // period.end because today > period.end).
  return keys.filter((k) => {
    const [y, m] = k.split('-').map(Number);
    const monthStart = new Date(y, m - 1, 1);
    const monthEnd = new Date(y, m, 0);
    return monthEnd >= (period.start as Date) && monthStart <= (period.end as Date);
  });
}

export function prevMonthKey(key: string): string {
  const [y, m] = key.split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  return monthKey(d);
}

export function prevYearKey(key: string): string {
  const [y, m] = key.split('-').map(Number);
  return monthKey(new Date(y - 1, m - 1, 1));
}
