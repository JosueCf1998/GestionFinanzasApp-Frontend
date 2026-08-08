import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { mapDashboardCategory } from 'src/app/core/models/dashboard/dashboard.mapper';
import {
  DashboardCategory,
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
  ): Observable<Result<DashboardItemsResponse<DashboardCategory>>> {
    return this.repository.getExpensesByCategory(request).pipe(
      map(result => ({
        ...result,
        data: result.data
          ? { items: (result.data.items ?? []).map(mapDashboardCategory) }
          : null
      }))
    );
  }
}
