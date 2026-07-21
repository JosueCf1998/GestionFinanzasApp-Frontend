export interface IconOption {
  readonly label: string;
  readonly icon: string;
}

export const CATEGORY_ICONS = [
  { label: 'Cartera', icon: 'wallet' },
  { label: 'Corazón', icon: 'heart' },
  { label: 'Estudio', icon: 'study' },
  { label: 'Regalo', icon: 'gift' },
  { label: 'Autobús', icon: 'bus' },
  { label: 'Restaurante', icon: 'restaurant' },
  { label: 'Pregunta', icon: 'question' },
  { label: 'Salario', icon: 'salary' },
  { label: 'Banco', icon: 'bank' }
] as const satisfies readonly IconOption[];

export const ACCOUNT_ICONS = [
  { label: 'Billetes', icon: 'bills' },
  { label: 'Banco', icon: 'bank' },
  { label: 'Dólares', icon: 'dolar' },
  { label: 'Bolsa de dinero', icon: 'money-bag' },
  { label: 'Estudio', icon: 'study' },
  { label: 'Cartera', icon: 'wallet' },
  { label: 'Autobús', icon: 'bus' },
  { label: 'Alcancía', icon: 'pig-piggy-bank' },
  { label: 'Salario', icon: 'salary' },
  { label: 'Pregunta', icon: 'question' }
] as const satisfies readonly IconOption[];
