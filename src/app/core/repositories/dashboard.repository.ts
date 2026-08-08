import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from 'src/app/core/constants/endpoints';
import {
  DashboardBudgetApi,
  DashboardCategoryApi,
  DashboardItemsResponse,
  DashboardPeriodApi,
  DashboardRequest,
  DashboardSummaryApiResponse
} from 'src/app/core/models/dashboard/dashboard.model';
import { Result } from 'src/app/core/models/result.model';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({ providedIn: 'root' })
export class DashboardRepository {
  constructor(private readonly apiService: ApiService) {}

  getSummary(request: DashboardRequest): Observable<Result<DashboardSummaryApiResponse>> {
    return this.get(ENDPOINTS.DASHBOARD.SUMMARY, request, true);
  }

  getExpensesByCategory(
    request: DashboardRequest
  ): Observable<Result<DashboardItemsResponse<DashboardCategoryApi>>> {
    return this.get(ENDPOINTS.DASHBOARD.EXPENSES_BY_CATEGORY, request, true);
  }

  getIncomeVsExpenses(
    request: DashboardRequest
  ): Observable<Result<DashboardItemsResponse<DashboardPeriodApi>>> {
    return this.get(ENDPOINTS.DASHBOARD.INCOME_VS_EXPENSES, request);
  }

  getBalanceEvolution(
    request: DashboardRequest
  ): Observable<Result<DashboardItemsResponse<DashboardPeriodApi>>> {
    return this.get(ENDPOINTS.DASHBOARD.BALANCE_EVOLUTION, request);
  }

  getBudgetProgress(
    request: DashboardRequest
  ): Observable<Result<DashboardItemsResponse<DashboardBudgetApi>>> {
    return this.get(ENDPOINTS.DASHBOARD.BUDGET_PROGRESS, request, true);
  }

  getTopExpenseCategories(
    request: DashboardRequest
  ): Observable<Result<DashboardItemsResponse<DashboardCategoryApi>>> {
    return this.get(ENDPOINTS.DASHBOARD.TOP_EXPENSE_CATEGORIES, request, true, true);
  }

  private get<T>(
    endpoint: string,
    request: DashboardRequest,
    withMonth = false,
    withLimit = false
  ): Observable<Result<T>> {
    const query = new URLSearchParams({ year: String(request.year) });

    if (withMonth && request.month !== undefined) {
      query.set('month', String(request.month));
    }
    if (withLimit && request.limit !== undefined) {
      query.set('limit', String(request.limit));
    }

    return this.apiService.get<T>(`${endpoint}?${query.toString()}`);
  }
}
