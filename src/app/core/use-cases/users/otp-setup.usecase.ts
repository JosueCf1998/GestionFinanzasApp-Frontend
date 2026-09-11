import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';

// ── Paso 1: iniciar configuración OTP ───────────────────────────────────────
/**
 * Respuesta del backend al iniciar OTP setup.
 * - secret: clave secreta TOTP (para apps como Google Authenticator)
 * - otpauth_url: URL en formato otpauth:// para generar el QR code
 */
export interface OtpSetupInitResponse {
  secret: string;
  otpauth_url: string;
}

// ── Paso 2: confirmar configuración OTP ─────────────────────────────────────
export interface OtpSetupConfirmRequest {
  otp_code: string;
}

export interface OtpSetupConfirmResponse {}

@Injectable({
  providedIn: 'root',
})
export class OtpSetupUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  /**
   * Paso 1 — Genera un nuevo secret OTP y lo guarda en el usuario (otp_enabled = 0).
   * Devuelve el secret y la URL otpauth para mostrar el QR al usuario.
   * Requiere: Bearer token en el header (usuario autenticado).
   * Endpoint: POST /users/otp-setup-init
   */
  initSetup(): Observable<Result<OtpSetupInitResponse>> {
    const endpoint = 'users/otp/setup/init';
    return this.apiService.post<OtpSetupInitResponse>(endpoint, {});
  }

  /**
   * Paso 2 — Valida el código OTP generado por el autenticador y activa 2FA (otp_enabled = 1).
   * Requiere: Bearer token en el header (usuario autenticado).
   * Endpoint: POST /users/otp-setup-confirm
   */
  confirmSetup(body: OtpSetupConfirmRequest): Observable<Result<OtpSetupConfirmResponse>> {
    const endpoint = 'users/otp/setup/confirm';
    const encryptedBody = encryptBody(body, this.encryptionService);
    return this.apiService.post<OtpSetupConfirmResponse>(endpoint, encryptedBody);
  }

}
