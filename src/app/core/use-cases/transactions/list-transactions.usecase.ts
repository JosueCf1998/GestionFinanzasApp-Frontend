import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../../models/result.model';
import { TransactionRepository } from '../../repositories/transactions.repository';
import { ListTransactionsResponse } from '../../models/transactions/list-transactions.model';

@Injectable({
  providedIn: 'root',
})
export class ListTransactionsUseCase {

  constructor(
    private repository: TransactionRepository
  ) {}

  execute(): Observable<Result<ListTransactionsResponse>> {
    return this.repository.listTransactions();
  }

}
