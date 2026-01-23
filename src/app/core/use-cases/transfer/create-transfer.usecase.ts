import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';

export interface CreateTransferRequest {
  name: string;
  amount: number;
  icon: string;
  color: string;
}

// Mapeo de propiedades
const REQUEST_KEY_MAP = {
  name: 'nombre',
  amount: 'saldo',
  icon: 'icon',
  color: 'color'
} as const;

export interface CreateTransferResponse {
}

@Injectable({
  providedIn: 'root',
})
export class CreateTransferUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  createTransfer(body: CreateTransferRequest): Observable<Result<CreateTransferResponse>> {
    const endpoint = 'create-transfers';
    const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
    const encryptedBody = encryptBody(mappedBody, this.encryptionService);
    return this.apiService.post<CreateTransferResponse>(endpoint, encryptedBody);
  }

}