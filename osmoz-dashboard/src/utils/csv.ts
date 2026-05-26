import { Deal } from '../types';
import { formatDate } from './formatters';

const COLUMNS: { key: keyof Deal | 'createdAtStr' | 'endStr' | 'startStr'; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nom' },
  { key: 'stage', label: 'Stage' },
  { key: 'value', label: 'Montant (EUR)' },
  { key: 'space', label: 'Espace' },
  { key: 'category', label: 'Catégorie' },
  { key: 'bookingSource', label: 'Source' },
  { key: 'owner', label: 'Owner' },
  { key: 'createdAtStr', label: 'Créé le' },
  { key: 'startStr', label: 'Début événement' },
  { key: 'endStr', label: 'Fin événement' },
  { key: 'numberOfGuests', label: 'Invités' },
  { key: 'lostReason', label: 'Raison perte' },
];

function csvEscape(v: unknown): string {
  if (v == null) return '';
  const s = String(v);
  if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function exportDealsCSV(deals: Deal[]) {
  const header = COLUMNS.map((c) => c.label).join(';');
  const lines = deals.map((d) => {
    const row: Record<string, unknown> = {
      ...d,
      createdAtStr: d.createdAt ? formatDate(d.createdAt) : '',
      startStr: d.bookingStart ? formatDate(d.bookingStart) : '',
      endStr: d.endBookingDate ? formatDate(d.endBookingDate) : '',
    };
    return COLUMNS.map((c) => csvEscape(row[c.key as string])).join(';');
  });
  const csv = '﻿' + [header, ...lines].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `osmoz-deals-${stamp}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
