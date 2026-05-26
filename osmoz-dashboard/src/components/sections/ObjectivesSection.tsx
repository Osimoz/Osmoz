import { useEffect, useMemo, useState } from 'react';
import { Pencil, Check } from 'lucide-react';
import { Deal, Filters } from '../../types';
import { isWon, isLost, sumValue, calcWinRate, groupByMonth } from '../../utils/aggregations';
import { applyOwnerFilter, dateFieldForView, startOfMonth, endOfMonth } from '../../hooks/useFilters';
import { formatCurrency, formatMonthLong, formatPercent, monthKey } from '../../utils/formatters';

interface Targets {
  revenue: number;
  deals: number;
  winRate: number;
}

const DEFAULTS: Targets = { revenue: 20000, deals: 15, winRate: 30 };
const LS_KEY = 'osmoz_targets_v2';

function loadTargets(): Targets {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function saveTargets(t: Targets) {
  localStorage.setItem(LS_KEY, JSON.stringify(t));
}

interface Props {
  deals: Deal[];
  filters: Filters;
}

export function ObjectivesSection({ deals, filters }: Props) {
  const [targets, setTargets] = useState<Targets>(loadTargets());
  useEffect(() => saveTargets(targets), [targets]);

  const scoped = useMemo(() => applyOwnerFilter(deals, filters), [deals, filters]);
  const dateField = dateFieldForView(filters.view);

  const wonByMonth = useMemo(() => groupByMonth(scoped.filter(isWon), dateField), [scoped, dateField]);
  const lostByMonth = useMemo(() => groupByMonth(scoped.filter(isLost), dateField), [scoped, dateField]);

  // Default focus = current month (system date) unless the user picks a month via dropdown
  const today = new Date();
  const [pickedMonth, setPickedMonth] = useState<string>(monthKey(today));
  const [pY, pM] = pickedMonth.split('-').map(Number);
  const leftDate = new Date(pY, pM - 1, 1);
  const rightDate = new Date(pY, pM, 1);

  const availableMonths: string[] = useMemo(() => {
    const out: string[] = [];
    const cursor = new Date(2026, 0, 1);
    const last = new Date(today.getFullYear(), today.getMonth() + 6, 1);
    while (cursor <= last) {
      out.push(monthKey(cursor));
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return out;
  }, [today]);

  return (
    <section className="card p-5">
      <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
        <h2 className="font-display text-xl">Objectifs</h2>
        <div className="flex items-center gap-2">
          <span className="label-muted">Mois</span>
          <select
            className="input py-1 text-sm w-auto"
            value={pickedMonth}
            onChange={(e) => setPickedMonth(e.target.value)}
          >
            {availableMonths.map((mk) => {
              const [y, m] = mk.split('-').map(Number);
              return (
                <option key={mk} value={mk}>
                  {formatMonthLong(new Date(y, m - 1, 1))}
                </option>
              );
            })}
          </select>
          <button
            className="pill pill-inactive"
            onClick={() => setPickedMonth(monthKey(today))}
            title="Revenir au mois en cours"
          >
            Ce mois
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[leftDate, rightDate].map((date, idx) => {
          const key = monthKey(date);
          const won = wonByMonth.get(key) ?? [];
          const lost = lostByMonth.get(key) ?? [];
          const revenue = sumValue(won);
          const dealCount = won.length;
          const winRate = calcWinRate([...won, ...lost]);
          // Pro-rate the revenue/deals targets for in-progress months only on the picked one
          const isPicked = idx === 0;
          const isCurrentMonth =
            date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth();
          return (
            <div key={key} className="rounded-lg border border-border p-4">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="font-display text-lg">{formatMonthLong(date)}</div>
                  <div className="text-[11px] uppercase tracking-wider text-muted mt-0.5">
                    {isCurrentMonth ? 'Mois en cours' : isPicked ? 'Mois sélectionné' : 'Mois suivant'}
                  </div>
                </div>
                <div className="text-xs text-muted">
                  <span className="text-success font-medium">{won.length}</span> gagnés ·{' '}
                  <span className="text-bordeaux font-medium">{lost.length}</span> perdus
                </div>
              </div>
              <div className="space-y-4">
                <ProgressLine
                  label="CA confirmé"
                  current={revenue}
                  target={targets.revenue}
                  formatter={formatCurrency}
                  onUpdate={(v) => setTargets({ ...targets, revenue: v })}
                  showEdit={idx === 0}
                />
                <ProgressLine
                  label="Deals confirmés"
                  current={dealCount}
                  target={targets.deals}
                  formatter={(v) => String(v)}
                  onUpdate={(v) => setTargets({ ...targets, deals: v })}
                  showEdit={idx === 0}
                />
                <ProgressLine
                  label="Taux de conversion"
                  current={winRate}
                  target={targets.winRate}
                  formatter={(v) => formatPercent(v, v % 1 === 0 ? 0 : 1)}
                  onUpdate={(v) => setTargets({ ...targets, winRate: v })}
                  showEdit={idx === 0}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted mt-3">
        Les objectifs sont communs aux deux colonnes et persistés localement (navigateur).
      </p>
    </section>
  );
}

function ProgressLine({
  label,
  current,
  target,
  formatter,
  onUpdate,
  showEdit,
}: {
  label: string;
  current: number;
  target: number;
  formatter: (n: number) => string;
  onUpdate: (n: number) => void;
  showEdit: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(target));
  useEffect(() => setDraft(String(target)), [target]);

  const pct = target > 0 ? (current / target) * 100 : 0;
  const reached = current >= target;
  const remaining = Math.max(0, target - current);
  const widthPct = Math.min(100, Math.max(2, pct));
  const barColor = reached ? '#2D6A4F' : '#6B1228';

  const commit = () => {
    const n = parseFloat(draft.replace(',', '.'));
    if (!isNaN(n) && n >= 0) onUpdate(n);
    setEditing(false);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="label-muted">{label}</span>
        {editing && showEdit ? (
          <div className="flex items-center gap-1">
            <input
              type="number"
              className="input w-24 py-1 text-xs"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') commit();
                if (e.key === 'Escape') setEditing(false);
              }}
            />
            <button onClick={commit} className="p-1 rounded hover:bg-cream text-success">
              <Check size={12} />
            </button>
          </div>
        ) : (
          <span className="text-xs text-muted inline-flex items-center gap-1">
            cible {formatter(target)}
            {showEdit && (
              <button onClick={() => setEditing(true)} className="text-muted hover:text-bordeaux">
                <Pencil size={11} />
              </button>
            )}
          </span>
        )}
      </div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="font-display text-xl">{formatter(current)}</span>
        <span className={`text-xs font-medium ${reached ? 'text-success' : 'text-muted'}`}>
          {reached ? `Atteint (${formatPercent(pct)})` : `${formatter(remaining)} restants`}
        </span>
      </div>
      <div className="h-2 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${widthPct}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}

void startOfMonth;
void endOfMonth;
