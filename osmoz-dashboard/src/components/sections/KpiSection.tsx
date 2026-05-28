import { Deal, Filters } from '../../types';
import {
  isWon,
  isLost,
  isPipeline,
  sumValue,
  calcWinRate,
  calcLostRate,
  calcWinRateValue,
  calcLostRateValue,
} from '../../utils/aggregations';
import { applyOwnerFilter, dateFieldForView } from '../../hooks/useFilters';
import { formatCurrency, formatPercent } from '../../utils/formatters';

interface Props {
  deals: Deal[];
  filters: Filters;
}

export function KpiSection({ deals, filters }: Props) {
  const scoped = applyOwnerFilter(deals, filters);
  const dateField = dateFieldForView(filters.view);
  const period = filters.period;

  const inPeriod = (d: Deal): boolean => {
    const ref = d[dateField];
    if (!ref) return false;
    if (period.mode === 'all' || !period.start || !period.end) return true;
    const t = (ref as Date).getTime();
    return t >= period.start.getTime() && t <= period.end.getTime();
  };

  // Pipeline (Inbound Lead + Decision Pending)
  const allPipeline = scoped.filter(isPipeline);
  const pipeline =
    filters.view === 'comptable'
      ? allPipeline.filter((d) => {
          const ref = d.endBookingDate;
          if (!ref) return false;
          if (period.mode === 'all' || !period.start || !period.end) return true;
          const t = ref.getTime();
          return t >= period.start.getTime() && t <= period.end.getTime();
        })
      : allPipeline;

  const won = scoped.filter((d) => isWon(d) && inPeriod(d));
  const lost = scoped.filter((d) => isLost(d) && inPeriod(d));

  const combined = [...won, ...lost];
  const winRateVol = calcWinRate(combined);
  const winRateVal = calcWinRateValue(combined);
  const lostRateVol = calcLostRate(combined);
  const lostRateVal = calcLostRateValue(combined);

  const isValueMode = filters.metric === 'value';

  const pipelineHint =
    filters.view === 'comptable'
      ? 'Restant à confirmer sur la période'
      : 'Snapshot global · tous les leads ouverts';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <KPICard
        label="Pipeline"
        primary={String(pipeline.length)}
        primarySuffix="deals"
        secondary={formatCurrency(sumValue(pipeline))}
        footer={pipelineHint}
        tone="navy"
      />
      <KPICard
        label="Confirmés"
        primary={String(won.length)}
        primarySuffix="deals"
        secondary={formatCurrency(sumValue(won))}
        footer={
          <DualRate
            primary={isValueMode ? winRateVal : winRateVol}
            primaryLabel={isValueMode ? 'Conv. valeur' : 'Conv. volume'}
            secondary={isValueMode ? winRateVol : winRateVal}
            secondaryLabel={isValueMode ? 'Conv. volume' : 'Conv. valeur'}
          />
        }
        tone="success"
      />
      <KPICard
        label="Perdus"
        primary={String(lost.length)}
        primarySuffix="deals"
        secondary={formatCurrency(sumValue(lost))}
        footer={
          <DualRate
            primary={isValueMode ? lostRateVal : lostRateVol}
            primaryLabel={isValueMode ? 'Perte valeur' : 'Perte volume'}
            secondary={isValueMode ? lostRateVol : lostRateVal}
            secondaryLabel={isValueMode ? 'Perte volume' : 'Perte valeur'}
          />
        }
        tone="danger"
      />
    </div>
  );
}

function DualRate({
  primary,
  primaryLabel,
  secondary,
  secondaryLabel,
}: {
  primary: number;
  primaryLabel: string;
  secondary: number;
  secondaryLabel: string;
}) {
  return (
    <div className="flex items-baseline gap-3 flex-wrap">
      <span>
        {primaryLabel} ·{' '}
        <span className="text-ink font-semibold text-sm">{formatPercent(primary)}</span>
      </span>
      <span className="text-[11px] text-muted/80">
        {secondaryLabel} ·{' '}
        <span className="text-muted font-medium">{formatPercent(secondary)}</span>
      </span>
    </div>
  );
}

function KPICard({
  label,
  primary,
  primarySuffix,
  secondary,
  footer,
  tone = 'default',
}: {
  label: string;
  primary: string;
  primarySuffix?: string;
  secondary: string;
  footer?: React.ReactNode;
  tone?: 'default' | 'success' | 'danger' | 'navy';
}) {
  const primaryColor =
    tone === 'success'
      ? 'text-success'
      : tone === 'danger'
        ? 'text-bordeaux'
        : tone === 'navy'
          ? 'text-navy'
          : 'text-ink';
  return (
    <div className="card p-5">
      <div className="label-muted">{label}</div>
      <div className="flex items-baseline gap-2 mt-2">
        <span className={`font-display text-3xl ${primaryColor}`}>{primary}</span>
        {primarySuffix && <span className="text-xs text-muted">{primarySuffix}</span>}
      </div>
      <div className="font-medium text-ink mt-1">{secondary}</div>
      {footer && <div className="text-xs text-muted mt-2">{footer}</div>}
    </div>
  );
}
