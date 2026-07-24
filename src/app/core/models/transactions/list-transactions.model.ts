
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
  type: 'gasto' | 'ingreso';
  date: string;
  createdAt: string;
  description: string | null;
}

export interface FilterTransactionsRequest {
  category_ids?: number[];
  type?: 'gasto' | 'ingreso';
}

export interface FilterTransactionsResponse {
  items: FilteredTransaction[];
  total: number;
  totalAmount: number;
  message: string;
}
