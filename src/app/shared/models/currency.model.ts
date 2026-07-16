export type CurrencyCode = 'PEN' | 'USD';

export interface Currency {
  code: CurrencyCode;
  name: string;
  pluralName: string;
  symbol: string;
  locale: string;
  decimalDigits: number;
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  PEN: {
    code: 'PEN',
    name: 'Sol peruano',
    pluralName: 'soles',
    symbol: 'S/',
    locale: 'es-PE',
    decimalDigits: 2
  },
  USD: {
    code: 'USD',
    name: 'Dólar estadounidense',
    pluralName: 'dólares',
    symbol: '$',
    locale: 'en-US',
    decimalDigits: 2
  }
};

export function getCurrency(code: CurrencyCode): Currency {
  return CURRENCIES[code];
}
