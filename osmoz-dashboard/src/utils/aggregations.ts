import { Deal, WON_STAGES, LOST_STAGES, PIPELINE_STAGES, LEAD_STAGES, NON_RENSEIGNE, DATA_START } from '../types';
import { monthKey } from './formatters';

export const isWon = (d: Deal) => WON_STAGES.includes(d.stage);
export const isLost = (d: Deal) => LOST_STAGES.includes(d.stage);
export const isPipeline = (d: Deal) => PIPELINE_STAGES.includes(d.stage);
export const isLead = (d: Deal) => LEAD_STAGES.includes(d.stage);

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
 * Build month keys from January 2026 through the current month.
 */
export function monthKeysFromStart(now = new Date()): string[] {
  const keys: string[] = [];
  const cursor = new Date(DATA_START.getFullYear(), DATA_START.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 1);
  while (cursor <= end) {
    keys.push(monthKey(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return keys;
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
