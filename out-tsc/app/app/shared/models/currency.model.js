export const CURRENCIES = {
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
export function getCurrency(code) {
    return CURRENCIES[code];
}
//# sourceMappingURL=currency.model.js.map