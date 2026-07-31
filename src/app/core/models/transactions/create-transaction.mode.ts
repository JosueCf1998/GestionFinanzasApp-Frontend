export interface CreateTransactionsRequest {
  categoryId: string;
  accountId: string;
  amount: number;
  date: string;
  type: string;
  description: string;
}

export interface UpdateTransactionRequest extends CreateTransactionsRequest {
  transactionId: number;
}

export interface CreateTransactionsResponse {
  mensaje?: string;
  info?: {
    id: number;
  };
}
