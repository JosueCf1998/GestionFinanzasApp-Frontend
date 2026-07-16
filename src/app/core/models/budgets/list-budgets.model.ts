import { CurrencyCode } from 'src/app/shared/models/currency.model';

export type BudgetStatus = 'ON_TRACK' | 'WARNING' | 'EXCEEDED';
export type BudgetPeriod = 'weekly' | 'monthly' | 'annual' | 'custom';

export interface ListBudgetsRequest {
  period: BudgetPeriod;
  startDate: string;
  endDate: string;
}

export interface BudgetListItem {
  id: number;
  name: string;
  icon: string;
  color: string;
  currencyCode: CurrencyCode;
  budgeted: number;
  used: number;
  percentage: number;
  status: BudgetStatus;
  statusLabel: string;
}

export interface BudgetSummary {
  dateLabel: string;
  budgeted: number;
  used: number;
  percentage: number;
}

export interface ListBudgetsResponse {
  items: BudgetListItem[];
  summary: BudgetSummary;
  dateRangeLabel: string;
}
