export type BudgetStatus = 'ON_TRACK' | 'WARNING' | 'EXCEEDED';
export type BudgetPeriod = 'weekly' | 'monthly' | 'annual' | 'custom';

export const BUDGET_STATUS_LABELS: Record<BudgetStatus, string> = {
  ON_TRACK: 'En objetivo',
  WARNING: 'Tendencia al exceso',
  EXCEEDED: 'Excedido'
};

export function isBudgetStatus(value: string): value is BudgetStatus {
  return value === 'ON_TRACK' || value === 'WARNING' || value === 'EXCEEDED';
}

export interface ListBudgetsRequest {
  period: BudgetPeriod;
  startDate: string;
  endDate: string;
}

/** Estructura recibida desde el backend. */
export interface BudgetApiItem {
  id: number;
  nombre: string;
  icono: string;
  color: string;
  estado: BudgetStatus;
  porcentaje: number;
  montoUtilizado: number;
  montoPresupuestado: number;
}

/** Respuesta de datos del endpoint de presupuestos. */
export interface ListBudgetsApiResponse {
  presupuestoTotal: number;
  montoUtilizado: number;
  porcentajeUtilizado: number;
  presupuestos: BudgetApiItem[];
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
