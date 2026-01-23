import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { tap } from 'rxjs/operators';
import { encryptFields } from '../../utils/encryption.util';

export interface DeleteAccountRequest {
  email: string;
}

export interface DeleteAccountResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteAccountUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  deleteAccount(body: DeleteAccountRequest): Observable<Result<DeleteAccountResponse>> {
    const endpoint = 'delete-account';
    const encryptedBody = encryptFields(body, this.encryptionService);
    return this.apiService.post<DeleteAccountResponse>(endpoint, encryptedBody).pipe(
      tap(result => {
        if (result.success && result.data) {
          // No es necesario guardar nada
        }
      })
    );
  }

}