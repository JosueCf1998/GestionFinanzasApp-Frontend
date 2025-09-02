import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Result } from '../models/result.model';
import { EncryptionService } from '../services/encryption.service';
import { tap } from 'rxjs/operators';
import { LocalManagementService } from '../services/localManagementService.service';
import { KEY_MANAGEMENT } from '../constants/key-management.constants';

export interface RegisterRequest {
  name: string,
  lastName: string,
  email: string;
  password: string;
}

export interface RegisterResponse {
  token: string;
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterServiceUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService,
    private localManagementService: LocalManagementService
  ) {}

  register(body: RegisterRequest): Observable<Result<RegisterResponse>> {
    const endpoint = 'register-user';
    const encryptedBody: RegisterRequest = {
      name: body.name,
      lastName: body.lastName,
      email: this.encryptionService.encrypt(body.email),
      password: this.encryptionService.encrypt(body.password),
    };
    return this.apiService.post<RegisterResponse>(endpoint, encryptedBody).pipe(
      tap(result => {
        if (result.success && result.data) {
          this.localManagementService.setVariable(KEY_MANAGEMENT.TOKEN, result.data.token);
          this.localManagementService.setVariable(KEY_MANAGEMENT.NAME, result.data.name);
          this.localManagementService.setVariable(KEY_MANAGEMENT.EMAIL, result.data.email);
        }
      })
    );
  }

}