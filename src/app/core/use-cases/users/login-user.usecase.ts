import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';
import { tap } from 'rxjs/operators';
import { KEY_MANAGEMENT } from '../../constants/key-management.constants';

export interface LoginUserRequest {
  email: string;
  password: string;
}

// Mapeo de propiedades
const REQUEST_KEY_MAP = {
  email: 'correo',
  password: 'contrasena'
} as const;

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
  localManagementService: any;

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  execute(body: LoginUserRequest): Observable<Result<LoginUserResponse>> {
    const endpoint = 'login-user';
    console.log('LoginUserUseCase - Request Body:', body);
    // const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
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
    // Guardar el token
    this.localManagementService.setVariable(KEY_MANAGEMENT.TOKEN, `Bearer ${userData.token}`);
    
    // Guardar los datos del usuario si vienen en la respuesta
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