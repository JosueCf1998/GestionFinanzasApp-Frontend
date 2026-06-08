import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';

export interface CreateTransactionsRequest {
  categoryId: string;
  accountId: string;
  amount: number;
  date: string;
  type: string;
  description?: string;
}

// Mapeo de propiedades
const REQUEST_KEY_MAP = {
  categoryId: 'categoria_id',
  accountId: 'cuenta_id',
  date: 'fecha',
  amount: 'monto',
  type: 'tipo',
  description: 'descripcion'
} as const;

export interface CreateTransactionsResponse {
}

@Injectable({
  providedIn: 'root',
})
export class CreateTransactionsUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  execute(body: CreateTransactionsRequest): Observable<Result<CreateTransactionsResponse>> {
    const endpoint = 'transactions/create';
    const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
    const encryptedBody = encryptBody(mappedBody, this.encryptionService);
    return this.apiService.post<CreateTransactionsResponse>(endpoint, encryptedBody);
  }

}