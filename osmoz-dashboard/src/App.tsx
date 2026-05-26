import { useState } from 'react';
import { RefreshCw, Download } from 'lucide-react';
import { PasswordGate, checkAuth } from './components/PasswordGate';
import { Toggles } from './components/Toggles';
import { PeriodSelector } from './components/PeriodSelector';
import { useAttioDeals } from './hooks/useAttioDeals';
import { useFilters } from './hooks/useFilters';
import { KpiSection } from './components/sections/KpiSection';
import { StackedBarSection } from './components/sections/StackedBarSection';
import { MonthlyComparison } from './components/sections/MonthlyComparison';
import { SourcesSection } from './components/sections/SourcesSection';
import { LostSection } from './components/sections/LostSection';
import { ObjectivesSection } from './components/sections/ObjectivesSection';
import { exportDealsCSV } from './utils/csv';

export default function App() {
  const [authed, setAuthed] = useState(checkAuth());
  const { deals, isLoading, error, lastUpdated, refresh } = useAttioDeals();
  const { filters, setFilters } = useFilters();

  if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-20 bg-cream/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 space-y-3">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex-shrink-0">
              <div className="font-display text-2xl text-bordeaux leading-none">OSMOZ</div>
              <div className="text-[10px] uppercase tracking-widest text-muted mt-0.5">
                Dashboard commercial
              </div>
            </div>
            <PeriodSelector
              period={filters.period}
              onChange={(p) => setFilters({ ...filters, period: p })}
            />
            <div className="ml-auto flex items-center gap-2 text-xs text-muted">
              {lastUpdated && (
                <span className="hidden md:inline">
                  MàJ {lastUpdated.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
              <button
                onClick={refresh}
                disabled={isLoading}
                className="btn btn-ghost"
                title="Rafraîchir"
              >
                <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
              </button>
              <button
                onClick={() => exportDealsCSV(deals)}
                className="btn btn-ghost"
                title="Exporter CSV"
              >
                <Download size={14} />
                <span className="hidden md:inline">CSV</span>
              </button>
            </div>
          </div>
          <Toggles filters={filters} onChange={setFilters} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
        {error ? (
          <div className="card p-8 text-center max-w-xl mx-auto">
            <div className="font-display text-xl text-bordeaux mb-2">Erreur de chargement</div>
            <div className="text-sm text-muted mb-4">{error}</div>
            <button onClick={refresh} className="btn btn-primary">
              Réessayer
            </button>
          </div>
        ) : isLoading && deals.length === 0 ? (
          <LoadingSkeleton />
        ) : (
          <>
            <KpiSection deals={deals} filters={filters} />
            <StackedBarSection deals={deals} filters={filters} />
            <MonthlyComparison deals={deals} filters={filters} />
            <SourcesSection deals={deals} filters={filters} />
            <LostSection deals={deals} filters={filters} />
            <ObjectivesSection deals={deals} filters={filters} />
          </>
        )}
      </main>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="card p-5 h-32 animate-pulse" />
        ))}
      </div>
      <div className="card p-5 h-96 animate-pulse" />
      <div className="card p-5 h-64 animate-pulse" />
    </div>
  );
}
