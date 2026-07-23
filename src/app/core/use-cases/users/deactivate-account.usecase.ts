import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { ENDPOINTS } from '../../constants/endpoints';

export interface DeactivateAccountRequest {
  userId: string;
}

export interface DeactivateAccountResponse {}

@Injectable({
  providedIn: 'root',
})
export class DeactivateAccountUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  execute(body: DeactivateAccountRequest): Observable<Result<DeactivateAccountResponse>> {
    const encryptedBody = encryptBody(body, this.encryptionService);
    return this.apiService.post<DeactivateAccountResponse>(ENDPOINTS.USERS.DEACTIVATE, encryptedBody);
  }

}
