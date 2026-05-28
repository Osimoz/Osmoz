export type DealStage =
  | 'Prospect'
  | 'Inbound Lead'
  | 'Decision Pending'
  | 'Fail'
  | 'Confirmed'
  | 'Invoiced'
  | 'Paid'
  | string;

export interface Deal {
  id: string;
  name: string;
  stage: DealStage;
  value: number;
  space: string | null;
  category: string | null;
  bookingSource: string | null;
  owner: string;
  bookingStart: Date | null;
  endBookingDate: Date | null;
  createdAt: Date;
  stageChangedAt: Date | null;
  numberOfGuests: number | null;
  lostReason: string | null;
  services: string[];
}

export type View = 'comptable' | 'commerciale';
export type Metric = 'value' | 'count';
export type OwnerFilter = 'all' | 'Edouard' | 'Emma';
export type SpaceFilter = 'all' | string; // 'all' or a specific space name

export type PeriodMode = 'month' | 'all' | 'custom';
export interface Period {
  mode: PeriodMode;
  start: Date | null;
  end: Date | null;
}

export interface Filters {
  view: View;
  metric: Metric;
  owner: OwnerFilter;
  space: SpaceFilter;
  period: Period;
}

export const OWNERS: Record<string, string> = {
  '0509ce30-00f5-48be-bef8-08de8e83a289': 'Edouard',
  '5dd20870-8245-4b69-a560-2848ebb57a6f': 'Emma',
};

export const WON_STAGES = ['Confirmed', 'Invoiced', 'Paid'];
export const LOST_STAGES = ['Fail'];
// "Pipeline" = leads entrants en attente d'action commerciale (le sommet du funnel).
// Volontairement, Prospect n'est pas inclus ici : si tu veux le réintroduire un jour,
// ajoute-le simplement à ce tableau.
export const PIPELINE_STAGES = ['Inbound Lead', 'Decision Pending'];

export const SPACE_COLORS: Record<string, string> = {
  Loft: '#6B1228',
  Duplex: '#01142A',
  Penthouse: '#C8C2B8',
};
export const DEFAULT_SPACE_COLOR = '#777065';

export function spaceColor(space: string): string {
  return SPACE_COLORS[space] ?? DEFAULT_SPACE_COLOR;
}

export const NON_RENSEIGNE = 'Non renseigné';

export const DATA_START = new Date('2026-01-01T00:00:00Z');
