import { GetAllMilkEntriesResponse, GetEntryByIdResponse } from "@/types/apiResponseTypes";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SUFFIX = '/api/milk';

export async function getAllMilkEntries() : Promise<GetAllMilkEntriesResponse> {
  const res = await fetch(BASE_URL + SUFFIX);
  return await res.json();
}

export async function getEntryById(id: string) : Promise<GetEntryByIdResponse> {
  const res = await fetch(`${BASE_URL}${SUFFIX}/${id}`);
  return await res.json();
}

export async function addEntry(entry: any) {
  const res = await fetch(BASE_URL + SUFFIX, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  return await res.json();
}

export async function updateEntry(id: string, entry: any) {
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