import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DashboardCategoryApi,
  DashboardItemsResponse,
  DashboardRequest
} from 'src/app/core/models/dashboard/dashboard.model';
import { Result } from 'src/app/core/models/result.model';
import { DashboardRepository } from 'src/app/core/repositories/dashboard.repository';

@Injectable({ providedIn: 'root' })
export class ExpensesByCategoryUseCase {
  constructor(private readonly repository: DashboardRepository) {}

  execute(
    request: DashboardRequest
  ): Observable<Result<DashboardItemsResponse<DashboardCategoryApi>>> {
    return this.repository.getExpensesByCategory(request);
  }
}
