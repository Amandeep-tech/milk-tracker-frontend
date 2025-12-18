import { DeleteEntryAPIResponse, GetAllMilkEntriesResponse, GetEntryByIdResponse, GetSummaryForYearMonthResponse } from "@/types/apiResponseTypes";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SUFFIX = '/api/milk';

export async function getAllMilkEntries(yearMonth: string) : Promise<GetAllMilkEntriesResponse> {
  return await apiFetch<GetAllMilkEntriesResponse>(`${BASE_URL}${SUFFIX}?yearMonth=${yearMonth}`);
}

export async function getEntryById(id: string) : Promise<GetEntryByIdResponse> {
  return await apiFetch<GetEntryByIdResponse>(`${BASE_URL}${SUFFIX}/${id}`);
}

export async function addEntry(entry: { date: number; quantity: number; rate: number }) {
  return await apiFetch(`${BASE_URL}${SUFFIX}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });

}

export async function updateEntry(id: string, entry: { date: number; quantity: number; rate: number }) {
  return await apiFetch(`${BASE_URL}${SUFFIX}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
}

export async function deleteEntry(id: string) : Promise<DeleteEntryAPIResponse> {
  return await apiFetch<DeleteEntryAPIResponse>(`${BASE_URL}${SUFFIX}/${id}`, {
    method: 'DELETE',
  });
}

export async function getSummaryForYearMonth(yearMonth: string) : Promise<GetSummaryForYearMonthResponse> {
  return await apiFetch<GetSummaryForYearMonthResponse>(`${BASE_URL}${SUFFIX}/summary/${yearMonth}`);
}

export async function markAsPaid(monthYear: string, amountPaid: number, notes: string) {
  return await apiFetch(`${BASE_URL}${SUFFIX}/summary/markPaid`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ monthYear, amountPaid, notes }),
  });
}


async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      message = body?.message || message;
    } catch {}
    throw new Error(message);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : ({} as T);
}
