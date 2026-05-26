import { parseDeal } from '../utils/parseDeal';
import { Deal, WON_STAGES, LOST_STAGES } from '../types';

const PAGE_SIZE = 50;

function getEndpoint(): { url: string; headers: Record<string, string> } {
  if (import.meta.env.DEV) {
    return {
      url: '/api/attio/v2/objects/deals/records/query',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ATTIO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    };
  }
  return {
    url: '/api/attio/v2/objects/deals/records/query',
    headers: { 'Content-Type': 'application/json' },
  };
}

function getHistoryUrl(recordId: string): string {
  return `/api/attio/v2/objects/deals/records/${recordId}/attributes/stage/values?show_historic=true&limit=50`;
}

function getHistoryHeaders(): Record<string, string> {
  if (import.meta.env.DEV) {
    return { Authorization: `Bearer ${import.meta.env.VITE_ATTIO_API_KEY}` };
  }
  return {};
}

interface StageHistoryEntry {
  active_from: string;
  active_until: string | null;
  status?: { title?: string };
}

async function fetchStageHistory(recordId: string): Promise<StageHistoryEntry[]> {
  const res = await fetch(getHistoryUrl(recordId), { headers: getHistoryHeaders() });
  if (!res.ok) return [];
  const payload = await res.json();
  return Array.isArray(payload?.data) ? payload.data : [];
}

/**
 * Pick the date a deal first entered a target stage (Confirmed for won, Fail for lost).
 * Returns null if never matched.
 */
function firstEntryDate(history: StageHistoryEntry[], stages: string[]): Date | null {
  let earliest: Date | null = null;
  for (const entry of history) {
    const title = entry.status?.title;
    if (!title || !stages.includes(title)) continue;
    const d = new Date(entry.active_from);
    if (isNaN(d.getTime())) continue;
    if (!earliest || d < earliest) earliest = d;
  }
  return earliest;
}

async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (true) {
      const i = cursor++;
      if (i >= items.length) return;
      results[i] = await fn(items[i]);
    }
  }
  const workers = Array.from({ length: Math.min(limit, items.length) }, worker);
  await Promise.all(workers);
  return results;
}

export async function fetchAllDeals(): Promise<Deal[]> {
  const { url, headers } = getEndpoint();
  const out: Deal[] = [];
  let offset = 0;

  while (true) {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ limit: PAGE_SIZE, offset }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Attio API error ${res.status}: ${text || res.statusText}`);
    }
    const payload = await res.json();
    const records: any[] = Array.isArray(payload?.data) ? payload.data : [];
    for (const r of records) {
      const parsed = parseDeal(r);
      if (parsed) out.push(parsed);
    }
    if (records.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
    if (offset > 10_000) break;
  }

  // For deals where current stage isn't the "first transition" stage we want to bucket on,
  // fetch history and use the earliest matching transition.
  // - Invoiced / Paid: we want the first time they entered Confirmed.
  // - Confirmed / Fail / pipeline: their current active_from already represents the right
  //   transition, no history needed.
  const needsHistory = out.filter(
    (d) => d.stage === 'Invoiced' || d.stage === 'Paid'
  );

  if (needsHistory.length > 0) {
    const histories = await runWithConcurrency(needsHistory, 8, (d) => fetchStageHistory(d.id));
    needsHistory.forEach((deal, i) => {
      const first = firstEntryDate(histories[i], WON_STAGES);
      if (first) deal.stageChangedAt = first;
    });
  }

  // (Sanity) Lost deals: active_from on current stage = when they became Fail.
  // We could also re-derive in case of corrections, but current value is already correct.
  void LOST_STAGES;

  return out;
}
