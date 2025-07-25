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

export interface SummaryForYearMonth {
  totalQuantity: number;
  totalAmount: number;
  entryCount: number;
  month: string;
  paymentDone: boolean;
  paymentDetails: {
    amount_paid: number;
    paid_on: string;
    notes: string;
  };
  summary: {
    [key: string]: string;
    // '1 L': '2 days',
  };
}

export interface GetSummaryForYearMonthResponse {
  error: 0;
  data: SummaryForYearMonth;
  message: string;
}

