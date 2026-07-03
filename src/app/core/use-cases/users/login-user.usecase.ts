import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { tap } from 'rxjs/operators';
import { KEY_MANAGEMENT } from '../../constants/key-management.constants';
import { LocalManagementService } from '../../services/localManagementService.service';

export interface LoginUserRequest {
  email: string;
  password: string;
}
export interface LoginUserResponse {
  token: string;
  isFirstTime: boolean;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginUserUseCase {
  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService,
    private localManagementService: LocalManagementService
  ) {}

  execute(body: LoginUserRequest): Observable<Result<LoginUserResponse>> {
    const endpoint = 'users/login';
    const encryptedBody = encryptBody(body, this.encryptionService);
    return this.apiService.post<LoginUserResponse>(endpoint, encryptedBody).pipe(
      tap(result => {
        if (result.success && result.data) {
          this.saveUserData(result.data, body.email);
        }
      })
    );
  }

  private saveUserData(userData: LoginUserResponse, email: string): void {
    this.localManagementService.setVariable(KEY_MANAGEMENT.TOKEN, `Bearer ${userData.token}`);
    this.localManagementService.setVariable(KEY_MANAGEMENT.EMAIL, email);
    this.localManagementService.setVariable(KEY_MANAGEMENT.NAME, userData.nombre);
    this.localManagementService.setVariable(KEY_MANAGEMENT.IS_FIRST_TIME, userData.isFirstTime);
  }

}
