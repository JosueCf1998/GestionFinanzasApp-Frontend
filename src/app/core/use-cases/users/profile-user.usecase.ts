import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';

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

@Injectable({
  providedIn: 'root',
})
export class ProfileUserUseCase {

  constructor(
    private apiService: ApiService
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

}
