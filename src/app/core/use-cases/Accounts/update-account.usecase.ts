import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { tap } from 'rxjs/operators';
import { encryptFields } from '../../utils/encryption.util';

export interface UpdateAccountRequest {
  email: string;
}

export interface UpdateAccountResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateAccountUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  updateAccount(body: UpdateAccountRequest): Observable<Result<UpdateAccountResponse>> {
    const endpoint = 'update-account';
    const encryptedBody = encryptFields(body, this.encryptionService);
    return this.apiService.post<UpdateAccountResponse>(endpoint, encryptedBody).pipe(
      tap(result => {
        if (result.success && result.data) {
          // No es necesario guardar nada
        }
      })
    );
  }

}