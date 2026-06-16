
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
