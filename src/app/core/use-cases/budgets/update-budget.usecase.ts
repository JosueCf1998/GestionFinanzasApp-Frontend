import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from 'src/app/core/constants/endpoints';
import { Result } from 'src/app/core/models/result.model';
import { ApiService } from 'src/app/core/services/api.service';
import { CreateBudgetRequest } from './create-budget.usecase';

export interface UpdateBudgetRequest extends CreateBudgetRequest {
  id: number;
}

export interface UpdateBudgetResponse {
  id?: number;
}

@Injectable({ providedIn: 'root' })
export class UpdateBudgetUseCase {
  constructor(private readonly apiService: ApiService) {}

  execute(request: UpdateBudgetRequest): Observable<Result<UpdateBudgetResponse>> {
    return this.apiService.post<UpdateBudgetResponse>(
      ENDPOINTS.BUDGETS.UPDATE,
      request
    );
  }
}
