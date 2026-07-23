export const BUDGET_STATUS_LABELS = {
    ON_TRACK: 'En objetivo',
    WARNING: 'Tendencia al exceso',
    EXCEEDED: 'Excedido'
};
export function isBudgetStatus(value) {
    return value === 'ON_TRACK' || value === 'WARNING' || value === 'EXCEEDED';
}
//# sourceMappingURL=list-budgets.model.js.map