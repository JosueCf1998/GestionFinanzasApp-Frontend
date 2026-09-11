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

/**
 * Respuesta del endpoint POST /users/login
 * - token: JWT de sesión
 * - isFirstTime: true si el usuario no tiene cuentas creadas aún
 * - name: nombre del usuario (campo devuelto por el backend)
 * - otpEnabled: true si el usuario tiene 2FA (OTP) activado
 */
export interface LoginUserResponse {
  token: string;
  isFirstTime: boolean;
  name?: string;
  otpEnabled: boolean;
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
    const name = (userData.name ?? '').trim();

    this.localManagementService.setVariable(KEY_MANAGEMENT.TOKEN, `Bearer ${userData.token}`);
    this.localManagementService.setVariable(KEY_MANAGEMENT.EMAIL, email);
    this.localManagementService.setVariable(KEY_MANAGEMENT.OTP_ENABLED, Boolean(userData.otpEnabled));
    this.localManagementService.setVariable(KEY_MANAGEMENT.IS_FIRST_TIME, Boolean(userData.isFirstTime));

    if (name) {
      this.localManagementService.setVariable(KEY_MANAGEMENT.NAME, name);
    } else {
      this.localManagementService.removeVariable(KEY_MANAGEMENT.NAME);
    }
  }

}
