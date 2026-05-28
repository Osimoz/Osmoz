import { useMemo } from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { Deal, Filters } from '../../types';
import { isWon, sumValue, groupByMonth, monthKeysForPeriod, prevMonthKey, prevYearKey } from '../../utils/aggregations';
import { applyOwnerFilter, dateFieldForView } from '../../hooks/useFilters';
import { formatCurrency, formatPercent, monthKeyToLabel } from '../../utils/formatters';

interface Props {
  deals: Deal[];
  filters: Filters;
}

export function MonthlyComparison({ deals, filters }: Props) {
  const scoped = useMemo(() => applyOwnerFilter(deals, filters), [deals, filters]);
  const dateField = dateFieldForView(filters.view);
  const mode = filters.metric;
  const period = filters.period;

  const byMonth = useMemo(() => groupByMonth(scoped.filter(isWon), dateField), [scoped, dateField]);

  const months = useMemo(() => monthKeysForPeriod(period), [period]);

  const valueOf = (key: string) => {
    const arr = byMonth.get(key) ?? [];
    return mode === 'value' ? sumValue(arr) : arr.length;
  };
  const fmt = (n: number) => (mode === 'value' ? formatCurrency(n) : String(n));

  const rows = months
    .slice()
    .reverse()
    .map((mKey) => {
      const current = valueOf(mKey);
      const prev = valueOf(prevMonthKey(mKey));
      const prevYear = valueOf(prevYearKey(mKey));
      return {
        key: mKey,
        label: monthKeyToLabel(mKey),
        current,
        prev,
        prevYear,
        varM: prev === 0 ? null : ((current - prev) / prev) * 100,
        varY: prevYear === 0 ? null : ((current - prevYear) / prevYear) * 100,
      };
    });

  return (
    <section className="card p-5 overflow-x-auto">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-display text-xl">Comparaison mensuelle</h2>
        <span className="text-xs text-muted">
          {mode === 'value' ? 'CA confirmé' : 'Nombre de réservations confirmées'} ·{' '}
          {filters.view === 'comptable' ? 'Comptable' : 'Commerciale'}
        </span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted">
            <th className="py-2 font-medium">Mois</th>
            <th className="py-2 font-medium text-right">Actuel</th>
            <th className="py-2 font-medium text-right">M-1</th>
            <th className="py-2 font-medium text-right">Var M-1</th>
            <th className="py-2 font-medium text-right">N-1</th>
            <th className="py-2 font-medium text-right">Var N-1</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-t border-border">
              <td className="py-2.5 font-medium">{r.label}</td>
              <td className="py-2.5 text-right tabular-nums">{fmt(r.current)}</td>
              <td className="py-2.5 text-right tabular-nums text-muted">{fmt(r.prev)}</td>
              <td className="py-2.5 text-right tabular-nums"><Variation v={r.varM} /></td>
              <td className="py-2.5 text-right tabular-nums text-muted">
                {r.prevYear === 0 ? <span className="text-muted/60">N/A</span> : fmt(r.prevYear)}
              </td>
              <td className="py-2.5 text-right tabular-nums">
                {r.prevYear === 0 ? <span className="text-muted/60">N/A</span> : <Variation v={r.varY} />}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className="py-6 text-center text-muted">
                Aucune donnée sur la période
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

function Variation({ v }: { v: number | null }) {
  if (v == null) return <span className="text-muted/60">—</span>;
  if (v === 0)
    return (
      <span className="inline-flex items-center gap-1 text-muted">
        <Minus size={12} />
        0%
      </span>
    );
  if (v > 0) {
    return (
      <span className="inline-flex items-center gap-1 text-success font-medium">
        <ArrowUp size={12} />
        {formatPercent(v, v > 999 ? 0 : 1)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-bordeaux font-medium">
      <ArrowDown size={12} />
      {formatPercent(Math.abs(v), Math.abs(v) > 999 ? 0 : 1)}
    </span>
  );
}

