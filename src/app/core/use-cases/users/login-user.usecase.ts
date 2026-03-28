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
  user?: {
    id?: string;
    nombre: string;
    correo: string;
    imagen?: string;
  };
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
    const endpoint = 'login-user';
    const encryptedBody = encryptBody(body, this.encryptionService);
    return this.apiService.post<LoginUserResponse>(endpoint, encryptedBody).pipe(
      tap(result => {
        if (result.success && result.data) {
          this.saveUserData(result.data);
        }
      })
    );
  }

  private saveUserData(userData: LoginUserResponse): void {
    this.localManagementService.setVariable(KEY_MANAGEMENT.TOKEN, `Bearer ${userData.token}`);
    if (userData.user) {
      const user = {
        id: userData.user.id,
        nombre: userData.user.nombre,
        correo: userData.user.correo,
        imagen: userData.user.imagen || 'https://gravatar.com/avatar/placeholder?s=200&d=mp'
      };
      this.localManagementService.setVariable('user', JSON.stringify(user));
    }
  }
  
}