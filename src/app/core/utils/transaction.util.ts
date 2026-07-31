import {
  FilteredTransaction,
  FilteredTransactionResponse
} from '../models/transactions/list-transactions.model';

export function normalizeFilteredTransaction(
  transaction: FilteredTransactionResponse
): FilteredTransaction {
  const amount = Number(transaction.amount);

  return {
    ...transaction,
    amount: Number.isFinite(amount) ? amount : 0
  };
}
