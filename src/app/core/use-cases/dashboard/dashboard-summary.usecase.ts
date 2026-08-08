import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { mapDashboardSummary } from 'src/app/core/models/dashboard/dashboard.mapper';
import {
  DashboardRequest,
  DashboardSummaryResponse
} from 'src/app/core/models/dashboard/dashboard.model';
import { Result } from 'src/app/core/models/result.model';
import { DashboardRepository } from 'src/app/core/repositories/dashboard.repository';

@Injectable({ providedIn: 'root' })
export class DashboardSummaryUseCase {
  constructor(private readonly repository: DashboardRepository) {}

  execute(request: DashboardRequest): Observable<Result<DashboardSummaryResponse>> {
    return this.repository.getSummary(request).pipe(
      map(result => ({
        ...result,
        data: result.data
          ? { summary: mapDashboardSummary(result.data.summary ?? {}) }
          : null
      }))
    );
  }
}
