const FR_MONTHS_SHORT = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

export function formatCurrency(n: number): string {
  const rounded = Math.round(n);
  const sign = rounded < 0 ? '-' : '';
  const abs = Math.abs(rounded).toString();
  const withSep = abs.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${sign}${withSep} €`;
}

export function formatCurrencyShort(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? '-' : '';
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1).replace('.0', '')} M€`;
  if (abs >= 1000) return `${sign}${(abs / 1000).toFixed(1).replace('.0', '')} k€`;
  return `${sign}${Math.round(abs)} €`;
}

export function formatMonth(date: Date): string {
  const m = FR_MONTHS_SHORT[date.getMonth()];
  const y = String(date.getFullYear()).slice(-2);
  return `${m} ${y}`;
}

export function formatMonthLong(date: Date): string {
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function formatPercent(n: number, digits = 0): string {
  if (!isFinite(n)) return '—';
  return `${n.toFixed(digits)}%`;
}

export function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function monthKeyToLabel(key: string): string {
  const [y, m] = key.split('-').map(Number);
  return formatMonth(new Date(y, m - 1, 1));
}
