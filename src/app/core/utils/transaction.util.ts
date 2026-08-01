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

export function formatTransactionDate(value?: string): string {
  return formatDate(value, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

export function formatTransactionRegistrationDate(value?: string): string {
  return formatDate(value, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  }).replace(/\./g, '');
}

function formatDate(value: string | undefined, options: Intl.DateTimeFormatOptions): string {
  if (!value) return 'No disponible';

  const normalizedValue = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)
    ? `${value.replace(' ', 'T')}Z`
    : value;
  const date = new Date(normalizedValue);

  return Number.isNaN(date.getTime())
    ? 'No disponible'
    : new Intl.DateTimeFormat('es-PE', options).format(date);
}
