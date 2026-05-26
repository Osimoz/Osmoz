import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Period } from '../types';
import { allPeriod, monthPeriod, startOfMonth } from '../hooks/useFilters';
import { formatDate, formatMonthLong } from '../utils/formatters';

interface Props {
  period: Period;
  onChange: (p: Period) => void;
}

function toInputDate(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function PeriodSelector({ period, onChange }: Props) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pickerOpen) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [pickerOpen]);

  const shift = (delta: number) => {
    const base = period.start ?? new Date();
    const next = new Date(base.getFullYear(), base.getMonth() + delta, 1);
    onChange(monthPeriod(next));
  };

  let label: string;
  if (period.mode === 'all') {
    label = 'Toutes les données';
  } else if (period.mode === 'month' && period.start) {
    label = formatMonthLong(period.start);
  } else if (period.start && period.end) {
    label = `${formatDate(period.start)} → ${formatDate(period.end)}`;
  } else {
    label = '—';
  }

  const isMonthMode = period.mode === 'month';
  const isAll = period.mode === 'all';

  return (
    <div className="flex items-center gap-2" ref={ref}>
      <div className="relative flex items-center bg-white rounded-full border border-border">
        <button
          onClick={() => shift(-1)}
          disabled={!isMonthMode}
          className="p-2 text-muted hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Mois précédent"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => setPickerOpen((v) => !v)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium hover:text-bordeaux min-w-[180px] justify-center"
        >
          <Calendar size={14} className="text-muted" />
          <span>{label}</span>
        </button>
        <button
          onClick={() => shift(1)}
          disabled={!isMonthMode}
          className="p-2 text-muted hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Mois suivant"
        >
          <ChevronRight size={16} />
        </button>

        {pickerOpen && (
          <DateRangePopover
            period={period}
            onApply={(p) => {
              onChange(p);
              setPickerOpen(false);
            }}
            onClose={() => setPickerOpen(false)}
          />
        )}
      </div>

      <button
        onClick={() => onChange(monthPeriod(new Date()))}
        className={`pill ${isMonthMode && isCurrentMonth(period) ? 'pill-active' : 'pill-inactive'}`}
      >
        Ce mois
      </button>
      <button
        onClick={() => onChange(allPeriod())}
        className={`pill ${isAll ? 'pill-active' : 'pill-inactive'}`}
      >
        Tout
      </button>
    </div>
  );
}

function isCurrentMonth(period: Period): boolean {
  if (period.mode !== 'month' || !period.start) return false;
  const now = new Date();
  return (
    period.start.getFullYear() === now.getFullYear() &&
    period.start.getMonth() === now.getMonth()
  );
}

function DateRangePopover({
  period,
  onApply,
  onClose,
}: {
  period: Period;
  onApply: (p: Period) => void;
  onClose: () => void;
}) {
  const [startStr, setStartStr] = useState(
    period.start ? toInputDate(period.start) : toInputDate(new Date())
  );
  const [endStr, setEndStr] = useState(
    period.end ? toInputDate(period.end) : toInputDate(new Date())
  );

  const apply = () => {
    const s = new Date(startStr);
    const e = new Date(endStr);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return;
    const start = startOfMonth(s).getTime() === s.getTime() ? s : new Date(s.setHours(0, 0, 0, 0));
    const end = new Date(e.setHours(23, 59, 59, 999));
    if (start > end) return;
    onApply({ mode: 'custom', start, end });
  };

  const applyMonth = (d: Date) => onApply(monthPeriod(d));

  // Generate quick-pick months: from January 2026 to current month
  const now = new Date();
  const quickMonths: Date[] = [];
  const cursor = new Date(2026, 0, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 1);
  while (cursor <= end) {
    quickMonths.push(new Date(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return (
    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-30 bg-white border border-border rounded-lg shadow-card p-4 w-[320px]">
      <div className="label-muted mb-2">Mois</div>
      <div className="grid grid-cols-3 gap-1 mb-4">
        {quickMonths.map((m) => {
          const sel =
            period.mode === 'month' &&
            period.start &&
            period.start.getFullYear() === m.getFullYear() &&
            period.start.getMonth() === m.getMonth();
          return (
            <button
              key={m.toISOString()}
              onClick={() => applyMonth(m)}
              className={`text-xs py-1.5 rounded transition-colors ${
                sel ? 'bg-bordeaux text-white' : 'text-muted hover:bg-cream hover:text-ink'
              }`}
            >
              {formatMonthLong(m).replace(' 20', ' ')}
            </button>
          );
        })}
      </div>
      <div className="label-muted mb-2">Plage personnalisée</div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <label className="text-xs">
          <span className="block text-muted mb-1">Du</span>
          <input
            type="date"
            className="input py-1.5 text-sm"
            value={startStr}
            onChange={(e) => setStartStr(e.target.value)}
          />
        </label>
        <label className="text-xs">
          <span className="block text-muted mb-1">Au</span>
          <input
            type="date"
            className="input py-1.5 text-sm"
            value={endStr}
            onChange={(e) => setEndStr(e.target.value)}
          />
        </label>
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="btn btn-ghost">
          Annuler
        </button>
        <button onClick={apply} className="btn btn-primary">
          Appliquer
        </button>
      </div>
    </div>
  );
}
