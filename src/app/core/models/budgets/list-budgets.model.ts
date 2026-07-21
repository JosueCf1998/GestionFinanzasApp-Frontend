export type BudgetStatus = 'ON_TRACK' | 'WARNING' | 'EXCEEDED';
/** Preset exclusivo de interfaz para construir un rango de fechas. */
export type PeriodPreset = 'weekly' | 'monthly' | 'annual' | 'custom';

export const BUDGET_STATUS_LABELS: Record<BudgetStatus, string> = {
  ON_TRACK: 'En objetivo',
  WARNING: 'Tendencia al exceso',
  EXCEEDED: 'Excedido'
};

export function isBudgetStatus(value: string): value is BudgetStatus {
  return value === 'ON_TRACK' || value === 'WARNING' || value === 'EXCEEDED';
}

export interface ListBudgetsRequest {
  startDate: string;
  endDate: string;
}

/** Estructura recibida desde el backend. */
export interface BudgetApiItem {
  id: number;
  name: string;
  icon: string;
  color: string;
  status: BudgetStatus;
  percentage: number;
  spentAmount: number;
  budgetAmount: number;
}

/** Respuesta de datos del endpoint de presupuestos. */
export interface ListBudgetsApiResponse {
  totalBudget: number;
  totalSpent: number;
  usagePercentage: number;
  budgetList: BudgetApiItem[];
}

/** Modelo interno utilizado por los componentes. */
export interface BudgetListItem {
  id: number;
  name: string;
  icon: string;
  color: string;
  budgeted: number;
  used: number;
  percentage: number;
  status: BudgetStatus;
}

export interface BudgetSummary {
  budgeted: number;
  used: number;
  percentage: number;
}

export interface ListBudgetsResponse {
  items: BudgetListItem[];
  summary: BudgetSummary;
  dateRangeLabel: string;
}
