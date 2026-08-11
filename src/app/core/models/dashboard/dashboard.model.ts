export interface DashboardRequest {
  fecha_inicio: string;
  fecha_fin: string;
  cuentas: number[];
  limit?: number;
}

export interface DashboardFiltersApi {
  year: number;
  month: number | null;
  start_date: string | null;
  end_date: string | null;
}

export interface DashboardSummaryApi {
  total_income?: number;
  total_expenses?: number;
  period_balance?: number;
  current_balance?: number;
  total_budget?: number;
  spent_budget?: number;
  remaining_budget?: number;
  savings_percentage?: number;
  [key: string]: number | string | null | undefined;
}

export interface DashboardCategoryApi {
  category_id?: number;
  category_name?: string;
  categoria_id?: number;
  categoria_nombre?: string;
  nombre?: string;
  icon?: string;
  icono?: string;
  color?: string;
  category_color?: string;
  color_categoria?: string;
  amount?: number;
  monto?: number;
  percentage?: number;
  porcentaje?: number;
  [key: string]: number | string | null | undefined;
}

export interface DashboardCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
  amount: number;
  percentage: number;
}

export interface DashboardPeriodApi {
  date?: string;
  fecha?: string;
  period?: string;
  month?: number;
  income?: number;
  expenses?: number;
  balance?: number;
  [key: string]: number | string | null | undefined;
}

export interface DashboardBalanceResponse {
  initial_balance: number;
  items: DashboardPeriodApi[];
}

export interface DashboardBudgetApi {
  budget_id?: number;
  budget_name?: string;
  budget_amount?: number;
  spent_amount?: number;
  percentage?: number;
  [key: string]: number | string | null | undefined;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpenses: number;
  periodBalance: number;
  currentBalance: number;
  totalBudget: number;
  spentBudget: number;
  remainingBudget: number;
  savingsPercentage: number;
}

export interface DashboardSummaryResponse {
  summary: DashboardSummary;
}

export interface DashboardSummaryApiResponse {
  summary: DashboardSummaryApi;
}

export interface DashboardItemsResponse<T> {
  items: T[];
}

export interface DashboardBudgetTotalsApi {
  total_budget?: number;
  spent_amount?: number;
  remaining_amount?: number;
  percentage?: number;
  [key: string]: number | string | null | undefined;
}

export interface DashboardBudgetResponse extends DashboardItemsResponse<DashboardBudgetApi> {
  totals: DashboardBudgetTotalsApi;
}
