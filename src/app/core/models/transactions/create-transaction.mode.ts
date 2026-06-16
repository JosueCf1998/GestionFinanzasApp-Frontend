export interface CreateTransactionsRequest {
  categoryId: string;
  accountId: string;
  amount: number;
  date: string;
  type: string;
  description?: string;
}

export interface CreateTransactionsResponse {
}
