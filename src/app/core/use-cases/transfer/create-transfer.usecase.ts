import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';

export interface CreateTransferRequest {
  originAccountId: string;
  destinationAccountId: string;
  amount: number;
  date: string;
  comment?: string;
}

// Mapeo de propiedades
const REQUEST_KEY_MAP = {
  originAccountId: 'cuenta_id_origen',
  destinationAccountId: 'cuenta_id_destino',
  amount: 'monto',
  date: 'fecha',
  comment: 'comentario'
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