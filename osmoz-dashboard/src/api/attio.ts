import { parseDeal } from '../utils/parseDeal';
import { Deal, WON_STAGES } from '../types';

const PAGE_SIZE = 50;
const PAGE_DELAY_MS = 500;
const HISTORY_DELAY_MS = 200;
const HISTORY_CONCURRENCY = 3;
const MAX_RETRIES = 5;

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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Fetch with automatic retry on HTTP 429 (rate limit) using exponential backoff.
 * Waits 2s, then 4s, 8s, 16s, 32s.
 */
async function fetchWithRetry(input: RequestInfo, init?: RequestInit): Promise<Response> {
  let attempt = 0;
  while (true) {
    const res = await fetch(input, init);
    if (res.status !== 429) return res;
    if (attempt >= MAX_RETRIES) return res;
    const wait = Math.pow(2, attempt + 1) * 1000; // 2s, 4s, 8s, 16s, 32s
    await sleep(wait);
    attempt++;
  }
}

interface StageHistoryEntry {
  active_from: string;
  active_until: string | null;
  status?: { title?: string };
}

async function fetchStageHistory(recordId: string): Promise<StageHistoryEntry[]> {
  const res = await fetchWithRetry(getHistoryUrl(recordId), { headers: getHistoryHeaders() });
  if (!res.ok) return [];
  const payload = await res.json();
  return Array.isArray(payload?.data) ? payload.data : [];
}

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

/**
 * Run an async function across N items, with at most `limit` in flight and an
 * optional inter-task delay to avoid hammering the API.
 */
async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  delayMs: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (true) {
      const i = cursor++;
      if (i >= items.length) return;
      results[i] = await fn(items[i]);
      if (delayMs > 0) await sleep(delayMs);
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
  let pageIndex = 0;

  while (true) {
    const res = await fetchWithRetry(url, {
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
    pageIndex++;
    if (offset > 10_000) break;
    // Throttle paginated calls — Attio's complexity rate limit hits us otherwise.
    await sleep(PAGE_DELAY_MS);
  }
  void pageIndex;

  // For Invoiced / Paid deals, fetch stage history to find the original Confirmed date.
  const needsHistory = out.filter((d) => d.stage === 'Invoiced' || d.stage === 'Paid');
  if (needsHistory.length > 0) {
    const histories = await runWithConcurrency(
      needsHistory,
      HISTORY_CONCURRENCY,
      HISTORY_DELAY_MS,
      (d) => fetchStageHistory(d.id)
    );
    needsHistory.forEach((deal, i) => {
      const first = firstEntryDate(histories[i], WON_STAGES);
      if (first) deal.stageChangedAt = first;
    });
  }

  return out;
}
