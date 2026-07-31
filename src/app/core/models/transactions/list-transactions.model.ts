
export interface ListTransactionsResponse {
  items: TransactionResponse[]
}

export interface TransactionResponse {
  id: number;
  color: string;
  icono: string;
  usuario_id: number | null;
  nombre: string;
  tipo: string;
}

export interface TransactionFilterEntity {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export interface FilteredTransaction {
  id: number;
  account: TransactionFilterEntity;
  category: TransactionFilterEntity;
  amount: number;
  type: 'expense' | 'income';
  date: string;
  createdAt: string;
  description: string | null;
}

export interface FilterTransactionsRequest {
  category_ids?: number[];
  account_ids?: number[];
  start_date?: string;
  end_date?: string;
  type?: 'gasto' | 'ingreso';
}

export interface FilteredTransactionResponse extends Omit<FilteredTransaction, 'amount'> {
  amount: string;
}

export interface FilterTransactionsResponse {
  transactionList: {
    expensesList: FilteredTransactionResponse[];
    incomeList: FilteredTransactionResponse[];
  };
  totalAmount: string;
  message: string;
}
