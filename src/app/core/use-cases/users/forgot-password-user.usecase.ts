import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetRequestResponse {
  message?: string;
}

export interface PasswordResetConfirmRequest {
  email: string;
  reset_token: string;
  otp_code: string;
  new_password: string;
}

export interface PasswordResetConfirmResponse {
  message?: string;
}

/** @deprecated Usa PasswordResetRequest o PasswordResetConfirmRequest */
export interface ForgotPassworUserdRequest {
  email: string;
  new_password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordUserUseCase {
  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  /**
   * Paso 1 — Solicita un token de reseteo de contraseña.
   * El backend lo envía por email si el usuario tiene OTP habilitado.
   * Endpoint: POST /users/password-reset-request
   */
  passwordResetRequest(body: PasswordResetRequest): Observable<Result<PasswordResetRequestResponse>> {
    const endpoint = 'users/password-reset/request';
    const encryptedBody = encryptBody(body, this.encryptionService);
    return this.apiService.post<PasswordResetRequestResponse>(endpoint, encryptedBody);
  }

  /**
   * Paso 2 — Confirma el reseteo con token + OTP + nueva contraseña.
   * Endpoint: POST /users/password-reset-confirm
   */
  passwordResetConfirm(body: PasswordResetConfirmRequest): Observable<Result<PasswordResetConfirmResponse>> {
    const endpoint = 'users/password-reset/confirm';
    const encryptedBody = encryptBody(body, this.encryptionService);
    return this.apiService.post<PasswordResetConfirmResponse>(endpoint, encryptedBody);
  }

  /** @deprecated Usa passwordResetRequest() en su lugar */
  forgotPassword(body: ForgotPassworUserdRequest): Observable<Result<PasswordResetRequestResponse>> {
    return this.passwordResetRequest({ email: body.email });
  }
}

