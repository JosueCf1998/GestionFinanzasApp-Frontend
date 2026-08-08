import {
  DashboardSummary,
  DashboardSummaryApi
} from './dashboard.model';

export function mapDashboardSummary(summary: DashboardSummaryApi): DashboardSummary {
  return {
    totalIncome: numberValue(summary, 'total_income', 'totalIncome', 'income'),
    totalExpenses: numberValue(summary, 'total_expenses', 'totalExpenses', 'expenses'),
    periodBalance: numberValue(summary, 'period_balance', 'periodBalance', 'balance'),
    currentBalance: numberValue(summary, 'current_balance', 'currentBalance'),
    totalBudget: numberValue(summary, 'total_budget', 'totalBudget', 'budget_total'),
    spentBudget: numberValue(summary, 'spent_budget', 'spentBudget', 'budget_spent'),
    remainingBudget: numberValue(
      summary,
      'remaining_budget',
      'remainingBudget',
      'budget_remaining'
    ),
    savingsPercentage: numberValue(
      summary,
      'savings_percentage',
      'savingsPercentage',
      'saving_percentage'
    )
  };
}

function numberValue(source: DashboardSummaryApi, ...keys: string[]): number {
  for (const key of keys) {
    const value = Number(source[key]);
    if (Number.isFinite(value)) return value;
  }
  return 0;
}
