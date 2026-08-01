import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from 'src/app/core/constants/endpoints';
import { Result } from 'src/app/core/models/result.model';
import { ApiService } from 'src/app/core/services/api.service';

export interface DeleteBudgetRequest {
  id: number;
}

export interface DeleteBudgetResponse {
  id?: number;
}

@Injectable({ providedIn: 'root' })
export class DeleteBudgetUseCase {
  constructor(private readonly apiService: ApiService) {}

  execute(request: DeleteBudgetRequest): Observable<Result<DeleteBudgetResponse>> {
    return this.apiService.post<DeleteBudgetResponse>(
      ENDPOINTS.BUDGETS.DELETE,
      request
    );
  }
}
