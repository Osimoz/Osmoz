import { Filters } from '../types';

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  availableSpaces: string[];
}

export function Toggles({ filters, onChange, availableSpaces }: Props) {
  const spaceOptions = [
    { value: 'all', label: 'Tout' },
    ...availableSpaces.map((s) => ({ value: s, label: s })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-5">
      <ToggleGroup
        label="Vue"
        value={filters.view}
        onChange={(v) => onChange({ ...filters, view: v as Filters['view'] })}
        options={[
          { value: 'comptable', label: 'Comptable' },
          { value: 'commerciale', label: 'Commerciale' },
        ]}
      />
      <ToggleGroup
        label="Métrique"
        value={filters.metric}
        onChange={(v) => onChange({ ...filters, metric: v as Filters['metric'] })}
        options={[
          { value: 'value', label: 'Valeur (€)' },
          { value: 'count', label: 'Volume (#)' },
        ]}
      />
      <ToggleGroup
        label="Owner"
        value={filters.owner}
        onChange={(v) => onChange({ ...filters, owner: v as Filters['owner'] })}
        options={[
          { value: 'all', label: 'Tout' },
          { value: 'Edouard', label: 'Edouard' },
          { value: 'Emma', label: 'Emma' },
        ]}
      />
      <ToggleGroup
        label="Espace"
        value={filters.space}
        onChange={(v) => onChange({ ...filters, space: v })}
        options={spaceOptions}
      />
    </div>
  );
}

function ToggleGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="label-muted">{label}</span>
      <div className="inline-flex items-center bg-white rounded-full border border-border p-0.5">
        {options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors font-medium ${
                isActive ? 'bg-bordeaux text-white' : 'text-muted hover:text-ink'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
