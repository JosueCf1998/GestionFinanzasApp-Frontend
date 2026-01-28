import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';

export interface DeleteTransferRequest {
  id: number;
}

// Mapeo de propiedades
const REQUEST_KEY_MAP = {
  id: 'transf_id'
} as const;

export interface DeleteTransferResponse {
}

@Injectable({
  providedIn: 'root',
})
export class DeleteTransferUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  deleteTransfer(body: DeleteTransferRequest): Observable<Result<DeleteTransferResponse>> {
    const endpoint = 'delete-transfers';
    const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
    const encryptedBody = encryptBody(mappedBody, this.encryptionService);
    return this.apiService.post<DeleteTransferResponse>(endpoint, encryptedBody);
  }

}