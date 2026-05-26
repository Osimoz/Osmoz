import { Deal, Filters } from '../../types';
import { isWon, isLost, isLead, isPipeline, sumValue, calcWinRate, calcLostRate } from '../../utils/aggregations';
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

  // Snapshot stages (current status) — leads + pipeline (NOT period-filtered;
  // these represent the current state of the funnel)
  const leads = scoped.filter(isLead);
  const pipeline = scoped.filter(isPipeline);

  // Period-based — won/lost referenced by view's date field, filtered to period
  const won = scoped.filter((d) => isWon(d) && inPeriod(d));
  const lost = scoped.filter((d) => isLost(d) && inPeriod(d));

  const winRate = calcWinRate([...won, ...lost]);
  const lostRate = calcLostRate([...won, ...lost]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <KPICard
        label="Leads entrants"
        primary={String(leads.length)}
        primarySuffix="deals"
        secondary={formatCurrency(sumValue(leads))}
        tone="navy"
      />
      <KPICard
        label="Confirmés"
        primary={String(won.length)}
        primarySuffix="deals"
        secondary={formatCurrency(sumValue(won))}
        footer={<>Taux conversion · <span className="text-ink font-medium">{formatPercent(winRate)}</span></>}
        tone="success"
      />
      <KPICard
        label="Perdus"
        primary={String(lost.length)}
        primarySuffix="deals"
        secondary={formatCurrency(sumValue(lost))}
        footer={<>Taux perte · <span className="text-ink font-medium">{formatPercent(lostRate)}</span></>}
        tone="danger"
      />
      <KPICard
        label="Pipeline actif"
        primary={String(pipeline.length)}
        primarySuffix="deals"
        secondary={formatCurrency(sumValue(pipeline))}
      />
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
