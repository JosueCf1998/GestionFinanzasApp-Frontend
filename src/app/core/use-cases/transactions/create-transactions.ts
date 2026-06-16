import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../../models/result.model';
import { CreateTransactionsRequest, CreateTransactionsResponse } from '../../models/transactions/create-transaction.mode';
import { TransactionRepository } from '../../repositories/transactions.repository';


@Injectable({
  providedIn: 'root',
})
export class CreateTransactionsUseCase {

  constructor(
      private repository: TransactionRepository
  ) {}

  execute(body: CreateTransactionsRequest): Observable<Result<CreateTransactionsResponse>> {
    return this.repository.createTransactions(body);
  }

}
