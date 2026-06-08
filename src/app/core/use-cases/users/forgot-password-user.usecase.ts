import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { tap } from 'rxjs/operators';
import { LocalManagementService } from '../../services/localManagementService.service';
import { KEY_MANAGEMENT } from '../../constants/key-management.constants';
import { encryptBody } from '../../utils/encryption.util';

export interface ForgotPassworUserdRequest {
  email: string;
  new_password: string;
}

export interface ForgotPasswordUserResponse {
}

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordUserUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService,
    private localManagementService: LocalManagementService
  ) {}

  forgotPassword(body: ForgotPassworUserdRequest): Observable<Result<ForgotPasswordUserResponse>> {
    const endpoint = 'users/forgot-password';
    const encryptedBody = encryptBody(body, this.encryptionService);
    return this.apiService.post<ForgotPasswordUserResponse>(endpoint, encryptedBody)
  }

}