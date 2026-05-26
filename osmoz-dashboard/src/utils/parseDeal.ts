import { Deal, OWNERS, DATA_START } from '../types';

type Raw = Record<string, any>;

const firstSelect = (arr: any[] | undefined): string | null => {
  if (!arr || arr.length === 0) return null;
  return arr[0]?.option?.title ?? null;
};

const firstStatus = (arr: any[] | undefined): string => {
  if (!arr || arr.length === 0) return '';
  return arr[0]?.status?.title ?? '';
};

const firstText = (arr: any[] | undefined): string => {
  if (!arr || arr.length === 0) return '';
  return arr[0]?.value ?? '';
};

const firstNumber = (arr: any[] | undefined): number | null => {
  if (!arr || arr.length === 0) return null;
  const v = arr[0]?.value;
  return typeof v === 'number' ? v : null;
};

const firstCurrency = (arr: any[] | undefined): number => {
  if (!arr || arr.length === 0) return 0;
  const v = arr[0]?.currency_value;
  return typeof v === 'number' ? v : 0;
};

const firstDate = (arr: any[] | undefined): Date | null => {
  if (!arr || arr.length === 0) return null;
  const v = arr[0]?.value;
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};

const firstOwner = (arr: any[] | undefined): string => {
  if (!arr || arr.length === 0) return 'Unknown';
  const id = arr[0]?.referenced_actor_id;
  return OWNERS[id] ?? 'Unknown';
};

const multiSelect = (arr: any[] | undefined): string[] => {
  if (!arr || arr.length === 0) return [];
  return arr.map((entry) => entry?.option?.title).filter(Boolean);
};

const stageActiveFrom = (arr: any[] | undefined): Date | null => {
  if (!arr || arr.length === 0) return null;
  const v = arr[0]?.active_from;
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};

export function parseDeal(raw: Raw): Deal | null {
  if (!raw?.id?.record_id) return null;
  const createdAt = raw.created_at ? new Date(raw.created_at) : new Date();
  if (createdAt < DATA_START) return null;

  const v = raw.values ?? {};
  return {
    id: raw.id.record_id,
    name: firstText(v.name) || '(Sans titre)',
    stage: firstStatus(v.stage),
    value: firstCurrency(v.value),
    space: firstSelect(v.space_2),
    category: firstSelect(v.category),
    bookingSource: firstSelect(v.booking_source),
    owner: firstOwner(v.owner),
    bookingStart: firstDate(v.booking_start_timestamp),
    endBookingDate: firstDate(v.end_booking_date),
    createdAt,
    stageChangedAt: stageActiveFrom(v.stage),
    numberOfGuests: firstNumber(v.number_of_guests),
    lostReason: firstSelect(v.lost_reason),
    services: multiSelect(v.service),
  };
}
