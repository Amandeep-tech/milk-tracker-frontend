import {
  AddEntryAPIResponse,
  DeleteEntryAPIResponse,
  GetAllMilkEntriesResponse,
  GetEntryByIdResponse,
  GetSummaryForYearMonthResponse,
  MarkAsPaidAPIResponse,
  MilkDefaultsAPIResponse,
  UpdateEntryAPIResponse,
  VacationModeAPIResponse,
} from "@/types/apiResponseTypes";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SUFFIX = "/api/milk";

export async function getAllMilkEntries(
  yearMonth: string
): Promise<GetAllMilkEntriesResponse> {
  return await apiFetch<GetAllMilkEntriesResponse>(
    `${BASE_URL}${SUFFIX}?yearMonth=${yearMonth}`
  );
}

export async function getEntryById(id: string): Promise<GetEntryByIdResponse> {
  return await apiFetch<GetEntryByIdResponse>(`${BASE_URL}${SUFFIX}/${id}`);
}

export async function addEntry(entry: {
  date: number;
  quantity: number;
  rate: number;
  notes?: string;
}): Promise<AddEntryAPIResponse> {
  return await apiFetch(`${BASE_URL}${SUFFIX}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
}

export async function updateEntry(
  id: string,
  entry: { date: number; quantity: number; rate: number; notes?: string }
): Promise<UpdateEntryAPIResponse> {
  return await apiFetch(`${BASE_URL}${SUFFIX}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
}

export async function deleteEntry(id: string): Promise<DeleteEntryAPIResponse> {
  return await apiFetch<DeleteEntryAPIResponse>(`${BASE_URL}${SUFFIX}/${id}`, {
    method: "DELETE",
  });
}

export async function getSummaryForYearMonth(
  yearMonth: string
): Promise<GetSummaryForYearMonthResponse> {
  return await apiFetch<GetSummaryForYearMonthResponse>(
    `${BASE_URL}${SUFFIX}/summary/${yearMonth}`
  );
}

export async function markAsPaid(
  monthYear: string,
  amountPaid: number,
  notes: string
): Promise<MarkAsPaidAPIResponse> {
  return await apiFetch(`${BASE_URL}/api/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ monthYear, amountPaid, notes }),
  });
}

export const getMilkDefaults = async (): Promise<MilkDefaultsAPIResponse> => {
  try {
    return await apiFetch<MilkDefaultsAPIResponse>(
      `${BASE_URL}${SUFFIX}/defaults`,
      {
        method: "GET",
      }
    );
  } catch (error) {
    console.error("Error fetching milk defaults:", error);
    throw error;
  }
};

export const updateAutoMilkEntrySetting = async (payload: {
  autoMilkEntryEnabled: boolean;
}): Promise<MilkDefaultsAPIResponse> => {
  try {
    return await apiFetch<MilkDefaultsAPIResponse>(
      `${BASE_URL}${SUFFIX}/defaults`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
  } catch (error) {
    console.error("Error updating auto milk entry setting:", error);
    throw error;
  }
};

export const saveVacationDates = async (
  startDate: string | null,
  endDate: string | null
): Promise<VacationModeAPIResponse> => {
  try {
    return await apiFetch<VacationModeAPIResponse>(
      `${BASE_URL}/api/settings/vacation`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate }),
      }
    );
  } catch (error) {
    console.error("Error saving vacation dates:", error);
    throw error;
  }
};

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const pin = localStorage.getItem("x-app-pin");
  if (!pin) return Promise.reject(new Error("Provide PIN"));

  const headers = {
    "x-app-pin": pin,
    ...(options?.headers || {}),
  };

  options = {
    ...options,
    headers,
  };
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
