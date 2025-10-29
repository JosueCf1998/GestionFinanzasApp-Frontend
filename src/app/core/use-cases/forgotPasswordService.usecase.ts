import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Result } from '../models/result.model';
import { EncryptionService } from '../services/encryption.service';
import { tap } from 'rxjs/operators';
import { LocalManagementService } from '../services/localManagementService.service';
import { KEY_MANAGEMENT } from '../constants/key-management.constants';

export interface ForgotPasswordRequest {
  email: string;
  new_password: string;
}

export interface ForgotPasswordResponse {
}

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordServiceUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService,
    private localManagementService: LocalManagementService
  ) {}

  forgotPassword(body: ForgotPasswordRequest): Observable<Result<ForgotPasswordResponse>> {
    const endpoint = 'forgot-password';
    const encryptedBody: ForgotPasswordRequest = {
      email: this.encryptionService.encrypt(body.email),
      new_password: this.encryptionService.encrypt(body.new_password),
    };
    return this.apiService.post<ForgotPasswordResponse>(endpoint, encryptedBody).pipe(
      tap(result => {
        if (result.success && result.data) {
          // TODO: NO SE USARA
        }
      })
    );
  }

}