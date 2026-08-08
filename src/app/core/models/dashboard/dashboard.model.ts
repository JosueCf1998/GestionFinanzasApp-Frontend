export interface DashboardRequest {
  year: number;
  month?: number;
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
  icon?: string;
  color?: string;
  amount?: number;
  percentage?: number;
  [key: string]: number | string | null | undefined;
}

export interface DashboardPeriodApi {
  period?: string;
  month?: number;
  income?: number;
  expenses?: number;
  balance?: number;
  [key: string]: number | string | null | undefined;
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
