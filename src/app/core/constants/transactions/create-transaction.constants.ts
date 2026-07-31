export const CREATE_TRANSACTION_REQUEST_MAP = {

  categoryId: 'categoria_id',

  accountId: 'cuenta_id',

  date: 'fecha',

  amount: 'monto',

  type: 'tipo',

  description: 'descripcion'

} as const;

export const UPDATE_TRANSACTION_REQUEST_MAP = {
  ...CREATE_TRANSACTION_REQUEST_MAP,
  transactionId: 'transac_id'
} as const;
