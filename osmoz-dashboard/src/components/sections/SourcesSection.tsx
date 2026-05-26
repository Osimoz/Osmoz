import { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';
import { Deal, Filters, NON_RENSEIGNE } from '../../types';
import { isWon, isLost, sumValue, calcWinRate, fieldLabel } from '../../utils/aggregations';
import { applyOwnerFilter, dateFieldForView } from '../../hooks/useFilters';
import { formatCurrency, formatCurrencyShort, formatPercent } from '../../utils/formatters';

const KNOWN_SOURCES = [
  'Kactus',
  'OfficeRiders',
  'Rejolt',
  'Peerspace',
  'Naboo',
  'Linkedin',
  'Organic',
  'Alfred',
  'wearescene',
  'ABC',
  'ABC Salle',
  'Other',
];

interface Props {
  deals: Deal[];
  filters: Filters;
}

export function SourcesSection({ deals, filters }: Props) {
  const scoped = useMemo(() => applyOwnerFilter(deals, filters), [deals, filters]);
  const dateField = dateFieldForView(filters.view);
  const mode = filters.metric;

  const period = filters.period;
  const rows = useMemo(() => {
    const sources = new Set<string>(KNOWN_SOURCES);
    for (const d of scoped) sources.add(fieldLabel(d, 'bookingSource'));

    const inPeriod = (d: Deal): boolean => {
      const ref = d[dateField];
      if (!ref) return false;
      if (period.mode === 'all' || !period.start || !period.end) return true;
      const t = (ref as Date).getTime();
      return t >= period.start.getTime() && t <= period.end.getTime();
    };

    const acc: Array<{
      source: string;
      count: number;
      won: number;
      lost: number;
      wonCount: number;
      winRate: number;
      metricValue: number;
    }> = [];
    for (const source of sources) {
      const inSource = scoped.filter((d) => {
        const v = d.bookingSource ?? NON_RENSEIGNE;
        return v === source && inPeriod(d);
      });
      if (inSource.length === 0) continue;
      const wonDeals = inSource.filter(isWon);
      const lostDeals = inSource.filter(isLost);
      const wonV = sumValue(wonDeals);
      const lostV = sumValue(lostDeals);
      acc.push({
        source,
        count: inSource.length,
        won: wonV,
        lost: lostV,
        wonCount: wonDeals.length,
        winRate: calcWinRate(inSource),
        metricValue: mode === 'value' ? wonV : wonDeals.length,
      });
    }
    return acc.sort((a, b) => b.metricValue - a.metricValue);
  }, [scoped, dateField, mode, period]);

  const topSource = rows[0]?.source;

  return (
    <section className="card p-5">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-display text-xl">Sources</h2>
        <span className="text-xs text-muted">
          {mode === 'value' ? 'CA gagné' : 'Volume gagné'} par canal
        </span>
      </div>

      <div style={{ width: '100%', height: Math.max(220, rows.length * 28 + 40) }}>
        <ResponsiveContainer>
          <BarChart data={rows} layout="vertical" margin={{ top: 5, right: 16, bottom: 5, left: 8 }}>
            <CartesianGrid stroke="#E8E4DC" strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              stroke="#777065"
              fontSize={12}
              tickFormatter={(v) => (mode === 'value' ? formatCurrencyShort(v) : String(v))}
            />
            <YAxis type="category" dataKey="source" stroke="#777065" fontSize={12} width={110} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #E8E4DC', borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => (mode === 'value' ? formatCurrency(v) : `${v} deals`)}
            />
            <Bar dataKey="metricValue" radius={[0, 3, 3, 0]}>
              {rows.map((_, i) => (
                <Cell key={i} fill={i === 0 ? '#6B1228' : '#6B1228CC'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted">
              <th className="py-2 font-medium">Source</th>
              <th className="py-2 font-medium text-right">Deals</th>
              <th className="py-2 font-medium text-right">CA gagné</th>
              <th className="py-2 font-medium text-right">CA perdu</th>
              <th className="py-2 font-medium text-right">Conv.</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.source} className="border-t border-border">
                <td className="py-2.5">
                  <span className="inline-flex items-center gap-2">
                    {r.source}
                    {r.source === topSource && r.metricValue > 0 && (
                      <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-success/10 text-success font-medium">
                        Top
                      </span>
                    )}
                  </span>
                </td>
                <td className="py-2.5 text-right tabular-nums">{r.count}</td>
                <td className="py-2.5 text-right tabular-nums text-success">{formatCurrency(r.won)}</td>
                <td className="py-2.5 text-right tabular-nums text-bordeaux">{formatCurrency(r.lost)}</td>
                <td className="py-2.5 text-right tabular-nums">{formatPercent(r.winRate)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-muted">
                  Aucune donnée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
