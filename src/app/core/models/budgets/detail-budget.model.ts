import { BudgetStatus } from './list-budgets.model';

export interface DetailBudgetRequest {
  id: string;
}

export type BudgetAlertType = 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';

export interface BudgetAlert {
  type: BudgetAlertType;
  title: string;
  message: string;
}

export interface BudgetGeneralDetail {
  status: BudgetStatus;
  recordStatus: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  totalSpent: number;
  remainingAmount: number;
  usagePercentage: number;
  notes: string;
}

export interface LinkedBudgetAccount {
  id: number;
  name: string;
  amount: number;
  icon: string;
  color: string;
}

export interface LinkedBudgetCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
  status: BudgetStatus;
  percentage: number;
  spentAmount: number;
  budgetAmount: number;
  remainingAmount: number;
}

export interface BudgetAvailableActions {
  canEdit: boolean;
  canArchive: boolean;
  canDelete: boolean;
}

/** Datos contenidos en `data` por el endpoint de detalle. */
export interface DetailBudgetApiResponse {
  id: number;
  name: string;
  icon: string;
  color: string;
  alert: BudgetAlert;
  generalDetail: BudgetGeneralDetail;
  linkedAccounts: LinkedBudgetAccount[];
  linkedCategories: LinkedBudgetCategory[];
  suggestion: string;
  availableActions: BudgetAvailableActions;
}
