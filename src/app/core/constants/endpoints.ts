export const ENDPOINTS = {

  TRANSACTIONS: {

    LIST: 'transactions/list',

    FILTER: 'transactions/filter',

    CREATE: 'transactions/register',

    UPDATE: 'transactions/update',

    DELETE: 'transactions/delete'

  },

  ACCOUNTS: {

    LIST: 'accounts/list',

    CREATE: 'accounts/create'

  },

  BUDGETS: {

    LIST: 'budgets/filter',

    CREATE: 'budgets/register',

    DETAIL: 'budgets/detail',

    UPDATE: 'budgets/update',

    DELETE: 'budgets/delete'

  },

  TRANSFERS: {

    LIST: 'transfers/list',

    CREATE: 'transfers/register',

    UPDATE: 'transfers/update',

    DELETE: 'transfers/delete'

  },

  DASHBOARD: {

    SUMMARY: 'dashboard/summary',

    EXPENSES_BY_CATEGORY: 'dashboard/expenses-by-category',

    INCOME_VS_EXPENSES: 'dashboard/income-vs-expenses',

    BALANCE_EVOLUTION: 'dashboard/balance-evolution',

    BUDGET_PROGRESS: 'dashboard/budget-progress',

    TOP_EXPENSE_CATEGORIES: 'dashboard/top-expense-categories'

  },

  LEARNING: {

    HOME: 'learning/home',

    CATEGORIES: 'learning/categories',

    COURSES_BY_CATEGORY: 'learning/courses/category',

    COURSES_BY_LEVEL: 'learning/courses/level',

    COURSE_DETAIL: 'learning/courses/detail',

    COMPLETE_COURSE: 'learning/courses/complete',

    LESSON_DETAIL: 'learning/lessons/detail',

    COMPLETE_LESSON: 'learning/lessons/complete',

    QUIZ_DETAIL: 'learning/quiz/detail',

    SUBMIT_QUIZ: 'learning/quiz/submit',

    RECOMMENDATIONS: 'learning/recommendations',

    STATS: 'learning/stats',

    FAQ: 'learning/faq'

  }

};
