import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Result } from '../models/result.model';
import { EncryptionService } from '../services/encryption.service';
import { tap } from 'rxjs/operators';
import { LocalManagementService } from '../services/localManagementService.service';
import { KEY_MANAGEMENT } from '../constants/key-management.constants';

export interface LoginRequest {
  email: string;
  password: string;
}

// Modelo de respuesta para login
export interface LoginResponse {
  token: string;
  id: number;
  name: string;
  email: string;
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
    const endpoint = 'login-usuario';
    const encryptedBody: LoginRequest = {
      email: this.encryptionService.encrypt(body.email),
      password: this.encryptionService.encrypt(body.password),
    };
    console.log(encryptedBody)
    return this.apiService.post<LoginResponse>(endpoint, encryptedBody).pipe(
      tap(result => {
        if (result.success && result.data) {
          this.localManagementService.setVariable(KEY_MANAGEMENT.TOKEN, result.data.token);
          this.localManagementService.setVariable(KEY_MANAGEMENT.NAME, result.data.name);
        }
      })
    );
  }

}