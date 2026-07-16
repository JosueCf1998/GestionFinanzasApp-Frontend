import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ENDPOINTS } from 'src/app/core/constants/endpoints';
import { BUDGETS_MOCK } from 'src/app/core/mocks/budgets.mock';
import {
  ListBudgetsApiResponse,
  ListBudgetsRequest
} from 'src/app/core/models/budgets/list-budgets.model';
import { Result } from 'src/app/core/models/result.model';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BudgetsRepository {
  constructor(private readonly apiService: ApiService) {}

  listBudgets(
    request: ListBudgetsRequest
  ): Observable<Result<ListBudgetsApiResponse>> {
    if (environment.useBudgetMocks) {
      return of<Result<ListBudgetsApiResponse>>({
        success: true,
        message: 'Mock Data',
        data: BUDGETS_MOCK,
        statusCode: 200,
        timestamp: new Date().toISOString()
      }).pipe(delay(250));
    }

    return this.apiService.post<ListBudgetsApiResponse>(
      ENDPOINTS.BUDGETS.LIST,
      request
    );
  }
}
