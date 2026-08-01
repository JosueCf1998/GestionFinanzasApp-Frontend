import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../../models/result.model';
import { TransactionRepository } from '../../repositories/transactions.repository';

@Injectable({ providedIn: 'root' })
export class DeleteTransactionUseCase {
  constructor(private readonly repository: TransactionRepository) {}

  execute(id: number): Observable<Result<{ mensaje?: string; info?: { id: number } }>> {
    return this.repository.deleteTransaction(id);
  }
}
