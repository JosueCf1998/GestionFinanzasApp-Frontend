import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from 'src/app/core/constants/endpoints';
import {
  DashboardBalanceResponse,
  DashboardBudgetResponse,
  DashboardCategoryApi,
  DashboardItemsResponse,
  DashboardPeriodApi,
  DashboardRequest,
  DashboardSummaryApiResponse
} from 'src/app/core/models/dashboard/dashboard.model';
import { Result } from 'src/app/core/models/result.model';
import { ApiService } from 'src/app/core/services/api.service';
import { EncryptionService } from 'src/app/core/services/encryption.service';
import { encryptBody } from 'src/app/core/utils/encryption.util';

@Injectable({ providedIn: 'root' })
export class DashboardRepository {
  constructor(
    private readonly apiService: ApiService,
    private readonly encryptionService: EncryptionService
  ) {}

  getSummary(request: DashboardRequest): Observable<Result<DashboardSummaryApiResponse>> {
    return this.post(ENDPOINTS.DASHBOARD.SUMMARY, request);
  }

  getExpensesByCategory(
    request: DashboardRequest
  ): Observable<Result<DashboardItemsResponse<DashboardCategoryApi>>> {
    return this.post(ENDPOINTS.DASHBOARD.EXPENSES_BY_CATEGORY, request);
  }

  getIncomeVsExpenses(
    request: DashboardRequest
  ): Observable<Result<DashboardItemsResponse<DashboardPeriodApi>>> {
    return this.post(ENDPOINTS.DASHBOARD.INCOME_VS_EXPENSES, request);
  }

  getBalanceEvolution(
    request: DashboardRequest
  ): Observable<Result<DashboardBalanceResponse>> {
    return this.post(ENDPOINTS.DASHBOARD.BALANCE_EVOLUTION, request);
  }

  getBudgetProgress(
    request: DashboardRequest
  ): Observable<Result<DashboardBudgetResponse>> {
    return this.post(ENDPOINTS.DASHBOARD.BUDGET_PROGRESS, request);
  }

  getTopExpenseCategories(
    request: DashboardRequest
  ): Observable<Result<DashboardItemsResponse<DashboardCategoryApi>>> {
    return this.post(ENDPOINTS.DASHBOARD.TOP_EXPENSE_CATEGORIES, request);
  }

  private post<T>(endpoint: string, request: DashboardRequest): Observable<Result<T>> {
    return this.apiService.post<T>(
      endpoint,
      encryptBody(request, this.encryptionService)
    );
  }
}
