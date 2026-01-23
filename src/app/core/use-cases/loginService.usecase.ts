import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Result } from '../models/result.model';
import { EncryptionService } from '../services/encryption.service';
import { tap } from 'rxjs/operators';
import { LocalManagementService } from '../services/localManagementService.service';
import { KEY_MANAGEMENT } from '../constants/key-management.constants';
import { decryptData, encryptFields } from '../utils/encryption.util';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginServiceUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService,
    private localManagementService: LocalManagementService
  ) {}

  login(body: LoginRequest): Observable<Result<LoginResponse>> {
    const endpoint = 'login-user';
    const encryptedBody = encryptFields(body, this.encryptionService);
    return this.apiService.post<LoginResponse>(endpoint, encryptedBody).pipe(
      // TODO: MEJORA PLANTEADA
      // decryptData<LoginResponse>(this.encryptionService),
      tap(result => {
        if (result.success && result.data) {
          this.saveUserData(result.data);
        }
      })
    );
  }

  private saveUserData(userData: LoginResponse): void {
    this.localManagementService.setVariable(KEY_MANAGEMENT.TOKEN, `Bearer ${userData.token}`);
  }

}