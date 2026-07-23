import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FilterTransactionsRequest,
  FilterTransactionsResponse
} from 'src/app/core/models/transactions/list-transactions.model';
import { Result } from 'src/app/core/models/result.model';
import { TransactionRepository } from 'src/app/core/repositories/transactions.repository';

@Injectable({ providedIn: 'root' })
export class FilterTransactionsUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  execute(
    request: FilterTransactionsRequest
  ): Observable<Result<FilterTransactionsResponse>> {
    return this.repository.filterTransactions(request);
  }
}
