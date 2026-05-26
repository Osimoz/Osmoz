import { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { AlertTriangle } from 'lucide-react';
import { Deal, Filters } from '../../types';
import { isLost } from '../../utils/aggregations';
import { applyOwnerFilter, dateFieldForView } from '../../hooks/useFilters';
import { formatCurrency, formatDate } from '../../utils/formatters';

const LOST_COLORS = ['#6B1228', '#8C1A38', '#01142A', '#777065', '#C8C2B8', '#B8964F', '#2D6A4F'];

interface Props {
  deals: Deal[];
  filters: Filters;
}

export function LostSection({ deals, filters }: Props) {
  const scoped = useMemo(() => applyOwnerFilter(deals, filters), [deals, filters]);
  const dateField = dateFieldForView(filters.view);
  const period = filters.period;
  const lost = useMemo(
    () =>
      scoped.filter((d) => {
        if (!isLost(d) || !d[dateField]) return false;
        if (period.mode === 'all' || !period.start || !period.end) return true;
        const t = (d[dateField] as Date).getTime();
        return t >= period.start.getTime() && t <= period.end.getTime();
      }),
    [scoped, dateField, period]
  );

  const reasonData = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of lost) {
      if (!d.lostReason) continue;
      map.set(d.lostReason, (map.get(d.lostReason) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .map(([reason, count]) => ({ reason, count }))
      .sort((a, b) => b.count - a.count);
  }, [lost]);

  const totalWithReason = reasonData.reduce((s, r) => s + r.count, 0);
  const noReason = lost.filter((d) => !d.lostReason);

  return (
    <section className="card p-5">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-display text-xl">Analyse des pertes</h2>
        <span className="text-xs text-muted">{lost.length} deals perdus</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="label-muted mb-2">Répartition par raison</div>
          {reasonData.length === 0 ? (
            <div className="h-[280px] flex items-center justify-center text-muted text-sm">
              Aucune raison renseignée
            </div>
          ) : (
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={reasonData}
                    dataKey="count"
                    nameKey="reason"
                    innerRadius={55}
                    outerRadius={100}
                    paddingAngle={2}
                    label={(props: any) => renderSliceLabel(props, totalWithReason)}
                    labelLine={false}
                  >
                    {reasonData.map((_, i) => (
                      <Cell key={i} fill={LOST_COLORS[i % LOST_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: '#fff',
                      border: '1px solid #E8E4DC',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(v: number, n: string) => {
                      const pct = totalWithReason > 0 ? ((v / totalWithReason) * 100).toFixed(1) : '0';
                      return [`${v} deals (${pct}%)`, n];
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 11 }}
                    formatter={(name: string, _entry: any, i: number) => {
                      const item = reasonData[i];
                      const pct =
                        item && totalWithReason > 0
                          ? ` (${((item.count / totalWithReason) * 100).toFixed(0)}%)`
                          : '';
                      return (
                        <span style={{ color: '#1A1A1A' }}>
                          {name}
                          {pct}
                        </span>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className={noReason.length > 0 ? 'rounded-lg border border-bordeaux/30 bg-bordeaux/[0.03] p-4' : ''}>
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle size={20} className="text-bordeaux flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-ink">
                {noReason.length} deal{noReason.length > 1 ? 's' : ''} sans raison renseignée
              </div>
              <div className="text-xs text-muted mt-0.5">
                Documenter la raison améliore l'analyse
              </div>
            </div>
          </div>
          {noReason.length > 0 && (
            <div className="overflow-x-auto max-h-[240px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-left text-muted">
                    <th className="py-2 font-medium">Deal</th>
                    <th className="py-2 font-medium text-right">Montant</th>
                    <th className="py-2 font-medium text-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {noReason.map((d) => {
                    const refDate = d[dateField] ?? d.createdAt;
                    return (
                      <tr key={d.id} className="border-t border-border">
                        <td className="py-2 max-w-[220px] truncate" title={d.name}>
                          {d.name}
                        </td>
                        <td className="py-2 text-right tabular-nums">{formatCurrency(d.value)}</td>
                        <td className="py-2 text-right tabular-nums text-muted">
                          {formatDate(refDate as Date)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function renderSliceLabel({ cx, cy, midAngle, innerRadius, outerRadius, value }: any, total: number) {
  if (!total) return null;
  const pct = (value / total) * 100;
  if (pct < 4) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {pct.toFixed(0)}%
    </text>
  );
}
