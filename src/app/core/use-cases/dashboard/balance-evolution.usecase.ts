import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DashboardBalanceResponse,
  DashboardRequest
} from 'src/app/core/models/dashboard/dashboard.model';
import { Result } from 'src/app/core/models/result.model';
import { DashboardRepository } from 'src/app/core/repositories/dashboard.repository';

@Injectable({ providedIn: 'root' })
export class BalanceEvolutionUseCase {
  constructor(private readonly repository: DashboardRepository) {}

  execute(
    request: DashboardRequest
  ): Observable<Result<DashboardBalanceResponse>> {
    return this.repository.getBalanceEvolution(request);
  }
}
