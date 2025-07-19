export interface MilkEntry {
  id: 1;
  date: string;
  quantity: number;
  rate: number;
  total: number;
  created_at: string;
}

export interface GetAllMilkEntriesResponse {
  error: 0;
  data: MilkEntry[];
  message: string;
}

export interface GetEntryByIdResponse {
  error: 0;
  data: MilkEntry;
  message: string;
}
