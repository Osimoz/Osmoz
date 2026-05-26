import { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  LabelList,
} from 'recharts';
import { Deal, Filters, NON_RENSEIGNE, spaceColor } from '../../types';
import {
  isWon,
  isLost,
  sumValue,
  groupByMonth,
  monthKeysFromStart,
  uniqueSpaces,
} from '../../utils/aggregations';
import { applyOwnerFilter, dateFieldForView } from '../../hooks/useFilters';
import { formatCurrency, formatCurrencyShort, monthKeyToLabel } from '../../utils/formatters';

interface Props {
  deals: Deal[];
  filters: Filters;
}

export function StackedBarSection({ deals, filters }: Props) {
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  const scoped = useMemo(() => applyOwnerFilter(deals, filters), [deals, filters]);
  const dateField = dateFieldForView(filters.view);
  const mode = filters.metric;
  const period = filters.period;

  const spaces = useMemo(() => {
    const set = new Set<string>(uniqueSpaces(scoped));
    if (scoped.some((d) => !d.space)) set.add(NON_RENSEIGNE);
    return Array.from(set).sort();
  }, [scoped]);

  const visibleSpaces = spaces.filter((s) => !hidden.has(s));

  // Restrict month axis to the selected period (or to all months since 2026 when period.mode === 'all').
  const months = useMemo(() => {
    const all = monthKeysFromStart();
    if (period.mode === 'all' || !period.start || !period.end) return all;
    return all.filter((k) => {
      const [y, m] = k.split('-').map(Number);
      const monthStart = new Date(y, m - 1, 1);
      const monthEnd = new Date(y, m, 0);
      return monthEnd >= (period.start as Date) && monthStart <= (period.end as Date);
    });
  }, [period]);

  const wonByMonth = useMemo(() => groupByMonth(scoped.filter(isWon), dateField), [scoped, dateField]);
  const lostByMonth = useMemo(() => groupByMonth(scoped.filter(isLost), dateField), [scoped, dateField]);

  const data = useMemo(() => {
    return months.map((mKey) => {
      const row: Record<string, any> = { key: mKey, label: monthKeyToLabel(mKey) };
      const wonDeals = wonByMonth.get(mKey) ?? [];
      const lostDeals = lostByMonth.get(mKey) ?? [];

      let totalWonValue = 0;
      let totalLostValue = 0;
      let totalWonCount = 0;
      let totalLostCount = 0;

      for (const sp of spaces) {
        const wonForSp = wonDeals.filter((d) => (d.space ?? NON_RENSEIGNE) === sp);
        const lostForSp = lostDeals.filter((d) => (d.space ?? NON_RENSEIGNE) === sp);
        const wonValSp = sumValue(wonForSp);
        const lostValSp = sumValue(lostForSp);
        row[`won_${sp}`] = mode === 'value' ? wonValSp : wonForSp.length;
        row[`lost_${sp}`] = mode === 'value' ? -lostValSp : -lostForSp.length;
        row[`wonCount_${sp}`] = wonForSp.length;
        row[`lostCount_${sp}`] = lostForSp.length;
        row[`wonVal_${sp}`] = wonValSp;
        row[`lostVal_${sp}`] = lostValSp;
        if (visibleSpaces.includes(sp)) {
          totalWonValue += wonValSp;
          totalLostValue += lostValSp;
          totalWonCount += wonForSp.length;
          totalLostCount += lostForSp.length;
        }
      }

      row.totalWonValue = totalWonValue;
      row.totalLostValue = totalLostValue;
      row.totalWonCount = totalWonCount;
      row.totalLostCount = totalLostCount;
      // Bar uses the active metric; overlay line uses the other metric (won-side).
      row.totalWonBar = mode === 'value' ? totalWonValue : totalWonCount;
      row.totalLostBar = mode === 'value' ? -totalLostValue : -totalLostCount;
      row.overlay = mode === 'value' ? totalWonCount : totalWonValue;
      return row;
    });
  }, [months, wonByMonth, lostByMonth, spaces, visibleSpaces, mode]);

  const toggle = (sp: string) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(sp)) next.delete(sp);
      else next.add(sp);
      return next;
    });
  };

  const subtitle =
    filters.view === 'comptable'
      ? `Par date de l'événement (end_booking_date) — ${mode === 'value' ? 'en €' : 'volume'}`
      : `Par date de confirmation/perte du deal — ${mode === 'value' ? 'en €' : 'volume'}`;

  const overlayLabel = mode === 'value' ? 'Nb réservations confirmées' : 'CA confirmé';

  return (
    <section className="card p-5">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
        <div>
          <h2 className="font-display text-xl">
            {filters.view === 'comptable' ? 'Vision Comptable' : 'Vision Commerciale'}
          </h2>
          <p className="text-sm text-muted mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {spaces.map((sp) => (
            <button
              key={sp}
              onClick={() => toggle(sp)}
              className={`flex items-center gap-2 text-sm transition-opacity ${
                hidden.has(sp) ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: spaceColor(sp) }} />
              <span>{sp}</span>
            </button>
          ))}
          <span className="flex items-center gap-2 text-sm text-muted">
            <span
              className="inline-block w-3 h-0.5 rounded-full"
              style={{ backgroundColor: '#2D6A4F' }}
            />
            {overlayLabel}
          </span>
        </div>
      </div>

      <div className="text-xs text-muted mb-2">Gagné au-dessus de 0 · Perdu en dessous</div>

      <div style={{ width: '100%', height: 440 }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ top: 24, right: 24, bottom: 20, left: 8 }}>
            <CartesianGrid stroke="#E8E4DC" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" stroke="#777065" fontSize={12} />
            <YAxis
              yAxisId="left"
              stroke="#777065"
              fontSize={12}
              tickFormatter={(v) => (mode === 'value' ? formatCurrencyShort(v) : String(v))}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#2D6A4F"
              fontSize={12}
              tickFormatter={(v) => (mode === 'value' ? String(v) : formatCurrencyShort(v))}
            />
            <ReferenceLine yAxisId="left" y={0} stroke="#777065" strokeWidth={1} />
            <Tooltip
              content={<CustomTooltip mode={mode} spaces={spaces} overlayLabel={overlayLabel} />}
              cursor={{ fill: 'rgba(0,0,0,0.03)' }}
            />
            {visibleSpaces.map((sp, i) => (
              <Bar
                key={`won_${sp}`}
                yAxisId="left"
                dataKey={`won_${sp}`}
                stackId="won"
                fill={spaceColor(sp)}
                radius={[2, 2, 0, 0]}
              >
                {i === visibleSpaces.length - 1 && (
                  <LabelList
                    dataKey="totalWonBar"
                    position="top"
                    content={(props: any) => <TotalLabel {...props} mode={mode} side="top" />}
                  />
                )}
              </Bar>
            ))}
            {visibleSpaces.map((sp, i) => (
              <Bar
                key={`lost_${sp}`}
                yAxisId="left"
                dataKey={`lost_${sp}`}
                stackId="lost"
                fill={spaceColor(sp)}
                fillOpacity={0.5}
                radius={[0, 0, 2, 2]}
              >
                {i === visibleSpaces.length - 1 && (
                  <LabelList
                    dataKey="totalLostBar"
                    position="bottom"
                    content={(props: any) => <TotalLabel {...props} mode={mode} side="bottom" />}
                  />
                )}
              </Bar>
            ))}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="overlay"
              stroke="#2D6A4F"
              strokeWidth={1.75}
              dot={{ r: 3, fill: '#2D6A4F' }}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function CustomTooltip({ active, payload, label, mode, spaces, overlayLabel }: any) {
  if (!active || !payload || payload.length === 0) return null;
  const row = payload[0]?.payload ?? {};
  const overlay = row.overlay ?? 0;
  return (
    <div className="bg-white border border-border rounded-lg shadow-card p-3 text-xs">
      <div className="font-medium text-ink mb-2">{label}</div>
      {spaces.map((sp: string) => {
        const wonVal = row[`wonVal_${sp}`] ?? 0;
        const lostVal = row[`lostVal_${sp}`] ?? 0;
        const wonCount = row[`wonCount_${sp}`] ?? 0;
        const lostCount = row[`lostCount_${sp}`] ?? 0;
        if (wonCount === 0 && lostCount === 0) return null;
        return (
          <div key={sp} className="flex items-center gap-2 mb-1 last:mb-0">
            <span className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: spaceColor(sp) }} />
            <span className="font-medium min-w-[80px]">{sp}</span>
            <span className="text-muted">
              {mode === 'value'
                ? `${formatCurrency(wonVal)} · -${formatCurrency(lostVal)} (${wonCount}/${lostCount})`
                : `${wonCount} gagnés · ${lostCount} perdus`}
            </span>
          </div>
        );
      })}
      <div className="mt-2 pt-2 border-t border-border space-y-1">
        <div className="flex items-center justify-between gap-3">
          <span className="text-success font-medium">
            {mode === 'value' ? formatCurrency(row.totalWonValue ?? 0) : `${row.totalWonCount ?? 0} gagnés`}
          </span>
          <span className="text-bordeaux font-medium">
            {mode === 'value' ? `-${formatCurrency(row.totalLostValue ?? 0)}` : `${row.totalLostCount ?? 0} perdus`}
          </span>
        </div>
        <div className="flex items-center gap-2 text-success">
          <span className="inline-block w-2.5 h-0.5 rounded-full" style={{ backgroundColor: '#2D6A4F' }} />
          <span className="text-muted">{overlayLabel}</span>
          <span className="ml-auto font-medium">
            {mode === 'value' ? `${overlay} deals` : formatCurrency(overlay)}
          </span>
        </div>
      </div>
    </div>
  );
}

function TotalLabel({ x, y, width, height, value, mode, side }: any) {
  if (!value || value === 0) return null;
  const cx = (x ?? 0) + (width ?? 0) / 2;
  const cy = side === 'top' ? (y ?? 0) - 6 : (y ?? 0) + (height ?? 0) + 14;
  const color = side === 'top' ? '#2D6A4F' : '#6B1228';
  const text = mode === 'value' ? formatCurrencyShort(Math.abs(value)) : `${Math.round(Math.abs(value))}`;
  const prefix = side === 'bottom' ? '-' : '';
  return (
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      fontSize={11}
      fontWeight={600}
      fill={color}
      style={{ fontFamily: 'DM Sans, sans-serif' }}
    >
      {prefix}{text}
    </text>
  );
}

