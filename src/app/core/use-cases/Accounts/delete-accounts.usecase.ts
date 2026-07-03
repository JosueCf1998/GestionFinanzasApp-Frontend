import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';

export interface DeleteAccountRequest {
  accountId: string;
}

export interface DeleteAccountResponse {
  token: string;
}

const REQUEST_KEY_MAP = {
  accountId: 'cuenta_id',
} as const;

@Injectable({
  providedIn: 'root',
})
export class DeleteAccountUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  execute(body: DeleteAccountRequest): Observable<Result<DeleteAccountResponse>> {
    const endpoint = 'accounts/delete';
    const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
    const encryptedBody = encryptBody(mappedBody, this.encryptionService);
    return this.apiService.post<DeleteAccountResponse>(endpoint, encryptedBody)
  }

}
