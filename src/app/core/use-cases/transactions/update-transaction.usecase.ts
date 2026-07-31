import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTransactionsResponse, UpdateTransactionRequest } from '../../models/transactions/create-transaction.mode';
import { Result } from '../../models/result.model';
import { TransactionRepository } from '../../repositories/transactions.repository';

@Injectable({ providedIn: 'root' })
export class UpdateTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  execute(request: UpdateTransactionRequest): Observable<Result<CreateTransactionsResponse>> {
    return this.repository.updateTransaction(request);
  }
}
