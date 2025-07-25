import { GetAllMilkEntriesResponse, GetEntryByIdResponse, GetSummaryForYearMonthResponse } from "@/types/apiResponseTypes";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SUFFIX = '/api/milk';

export async function getAllMilkEntries(yearMonth: string) : Promise<GetAllMilkEntriesResponse> {
  const res = await fetch(BASE_URL + SUFFIX + `/entries/${yearMonth}`);
  return await res.json();
}

export async function getEntryById(id: string) : Promise<GetEntryByIdResponse> {
  const res = await fetch(`${BASE_URL}${SUFFIX}/${id}`);
  return await res.json();
}

export async function addEntry(entry: { date: number; quantity: number; rate: number }) {
  const res = await fetch(BASE_URL + SUFFIX, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  return await res.json();
}

export async function updateEntry(id: string, entry: { date: number; quantity: number; rate: number }) {
  const res = await fetch(`${BASE_URL}${SUFFIX}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  return await res.json();
}

export async function deleteEntry(id: string) {
  await fetch(`${BASE_URL}${SUFFIX}/${id}`, { method: 'DELETE' });
}

export async function getSummaryForYearMonth(yearMonth: string) : Promise<GetSummaryForYearMonthResponse> {
  const res = await fetch(`${BASE_URL}${SUFFIX}/summary/${yearMonth}`);
  return await res.json();  
}

export async function markAsPaid(monthYear: string, amountPaid: number, notes: string) {
  const res = await fetch(`${BASE_URL}/api/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ monthYear, amountPaid, notes }),
  });
  return await res.json();
}