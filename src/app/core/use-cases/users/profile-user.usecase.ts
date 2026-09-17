import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';

/**
 * Respuesta del endpoint GET /users/profile (autenticado con Bearer token).
 * El email viene desencriptado por el backend antes de enviarlo al frontend.
 */
export interface ProfileUserResponse {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  email_verificado: number;   // 0 = no verificado, 1 = verificado
  otp_enabled: number;        // 0 = desactivado, 1 = activado
  fecha_registro: string;
  updated_at: string;
  correo?: string;
  imagen?: string;
}

export interface UpdateProfileRequest {
  nombre?: string;
  apellidos?: string;
  password?: string;
}

export interface UpdateProfileResponse {
  id: number;
}

export interface DeleteUserResponse {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileUserUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  /**
   * Obtiene el perfil del usuario autenticado.
   * El token Bearer se adjunta automáticamente en ApiService.
   * Endpoint: GET /users/profile
   */
  getProfile(): Observable<Result<{ user: ProfileUserResponse }>> {
    const endpoint = 'users/profile';
    return this.apiService.get<{ user: ProfileUserResponse }>(endpoint);
  }

  /**
   * Actualiza los datos del usuario autenticado (nombre, apellidos o contraseña).
   * Endpoint: POST /users/update/:userId o POST /users/update
   */
  updateProfile(userId: number, body: UpdateProfileRequest): Observable<Result<UpdateProfileResponse>> {
    const endpoint = 'users/update';
    const payload = { id: userId, ...body };
    const encryptedBody = encryptBody(payload, this.encryptionService);
    return this.apiService.post<UpdateProfileResponse>(endpoint, encryptedBody);
  }

  /**
   * Elimina la cuenta del usuario de forma permanente.
   * Endpoint: POST /users/delete
   */
  deleteAccount(userId: number): Observable<Result<DeleteUserResponse>> {
    const endpoint = 'users/delete';
    const encryptedBody = encryptBody({ id: userId }, this.encryptionService);
    return this.apiService.post<DeleteUserResponse>(endpoint, encryptedBody);
  }

}
