import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from 'src/app/core/constants/endpoints';
import { Result } from 'src/app/core/models/result.model';
import { ApiService } from 'src/app/core/services/api.service';

export interface CreateBudgetRequest {
  name: string;
  budgetAmount: number;
  startDate: string;
  endDate: string;
  icon: string;
  color: string;
  accountIds: number[];
  categoryIds: number[];
}

export interface CreateBudgetResponse {
  id?: number;
}

@Injectable({ providedIn: 'root' })
export class CreateBudgetUseCase {
  constructor(private readonly apiService: ApiService) {}

  execute(request: CreateBudgetRequest): Observable<Result<CreateBudgetResponse>> {
    return this.apiService.post<CreateBudgetResponse>(
      ENDPOINTS.BUDGETS.CREATE,
      request
    );
  }
}
