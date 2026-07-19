import { ListBudgetsApiResponse } from 'src/app/core/models/budgets/list-budgets.model';

/** Respuesta simulada con el mismo contrato que utilizará el backend. */
export const BUDGETS_MOCK: ListBudgetsApiResponse = {
  totalBudget: 3800,
  totalSpent: 3120,
  usagePercentage: 82,
  budgetList: [
    {
      id: 1,
      name: 'Presupuesto Hogar',
      icon: 'home',
      color: '#4361ee',
      status: 'ON_TRACK',
      percentage: 75,
      spentAmount: 900,
      budgetAmount: 1200
    },
    {
      id: 2,
      name: 'Presupuesto Personal',
      icon: 'user',
      color: '#8b5cf6',
      status: 'WARNING',
      percentage: 92,
      spentAmount: 920,
      budgetAmount: 1000
    },
    {
      id: 3,
      name: 'Viaje a Cusco',
      icon: 'bus',
      color: '#ec4899',
      status: 'EXCEEDED',
      percentage: 105,
      spentAmount: 630,
      budgetAmount: 600
    },
    {
      id: 4,
      name: 'EIKON Operativo',
      icon: 'account',
      color: '#3a0ca3',
      status: 'ON_TRACK',
      percentage: 67,
      spentAmount: 670,
      budgetAmount: 1000
    }
  ]
};
