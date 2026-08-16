import {
  DashboardCategory,
  DashboardCategoryApi,
  DashboardSummary,
  DashboardSummaryApi
} from './dashboard.model';

export function mapDashboardCategory(item: DashboardCategoryApi): DashboardCategory {
  return {
    id: numberValue(item, 'category_id', 'categoryId', 'categoria_id', 'id'),
    name: stringValue(
      item,
      'category_name',
      'categoryName',
      'categoria_nombre',
      'nombre',
      'name'
    ) || 'Sin categoría',
    icon: stringValue(item, 'icon', 'icono') || 'category',
    color: normalizeColor(stringValue(item, 'color', 'category_color', 'color_categoria')),
    amount: numberValue(item, 'amount', 'monto', 'total', 'total_amount'),
    percentage: numberValue(item, 'percentage', 'porcentaje', 'percent')
  };
}

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

function numberValue(
  source: Record<string, number | string | null | undefined>,
  ...keys: string[]
): number {
  for (const key of keys) {
    const value = Number(source[key]);
    if (Number.isFinite(value)) return value;
  }
  return 0;
}

function stringValue(
  source: Record<string, number | string | null | undefined>,
  ...keys: string[]
): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function normalizeColor(value: string): string {
  if (/^[\da-f]{6}$/i.test(value)) return `#${value}`;
  if (/^#[\da-f]{3}([\da-f]{3})?$/i.test(value)) return value;
  return 'var(--fv-primary)';
}
