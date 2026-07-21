import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  DetailBudgetApiResponse,
  DetailBudgetRequest
} from 'src/app/core/models/budgets/detail-budget.model';
import { Result } from 'src/app/core/models/result.model';
import { BudgetsRepository } from 'src/app/core/repositories/budgets.repository';

@Injectable({ providedIn: 'root' })
export class DetailBudgetUseCase {
  constructor(private readonly repository: BudgetsRepository) {}

  execute(request: DetailBudgetRequest): Observable<Result<DetailBudgetApiResponse>> {
    return this.repository.getBudgetDetail(request).pipe(
      tap(response => console.log('Respuesta completa del detalle del presupuesto:', response))
    );
  }
}
