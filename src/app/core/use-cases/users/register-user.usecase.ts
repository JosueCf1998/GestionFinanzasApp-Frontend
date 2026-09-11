import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';

export interface RegisterUserRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const REGISTER_KEY_MAP = {
  name: 'nombre',
  lastName: 'apellidos',
  email: 'email',
  password: 'password'
} as const;

export interface RegisterUserResponse {
  message?: string;
}

export interface RegisterVerifyRequest {
  email: string;
  code: string;
}

export interface RegisterVerifyResponse {
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterUserUseCase {
  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  /**
   * Paso 1 — Envía los datos de registro al backend.
   * El backend crea un registro pendiente y envía un código de 6 dígitos al email.
   * Endpoint: POST /users/register
   */
  requestRegistration(body: RegisterUserRequest): Observable<Result<RegisterUserResponse>> {
    const endpoint = 'users/register';
    const mappedBody = mapObjectKeys(body, REGISTER_KEY_MAP);
    const encryptedBody = encryptBody(mappedBody, this.encryptionService);
    return this.apiService.post<RegisterUserResponse>(endpoint, encryptedBody);
  }

  /**
   * Paso 2 — Verifica el código de 6 dígitos enviado al email.
   * Si el código es válido, el backend crea el usuario definitivamente.
   * Endpoint: POST /users/register-verify
   */
  verifyRegistration(body: RegisterVerifyRequest): Observable<Result<RegisterVerifyResponse>> {
    const endpoint = 'users/register/verify';
    const encryptedBody = encryptBody(body, this.encryptionService);
    return this.apiService.post<RegisterVerifyResponse>(endpoint, encryptedBody);
  }

  /** @deprecated Usa requestRegistration() en su lugar */
  createUser(body: RegisterUserRequest): Observable<Result<RegisterUserResponse>> {
    return this.requestRegistration(body);
  }
}

