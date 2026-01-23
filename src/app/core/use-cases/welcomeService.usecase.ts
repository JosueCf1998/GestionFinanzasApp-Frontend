import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Result } from '../models/result.model';
import { EncryptionService } from '../services/encryption.service';
import { tap } from 'rxjs/operators';
import { LocalManagementService } from '../services/localManagementService.service';
import { KEY_MANAGEMENT } from '../constants/key-management.constants';

export interface WelcomeRequest {
  nombre: string;
  saldo: number;
  icon: string;
  color: string;
}

export interface WelcomeResponse {
  token: string;
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class WelcomeServiceUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService,
    private localManagementService: LocalManagementService
  ) {}

  createAccount(body:WelcomeRequest): Observable<Result<WelcomeResponse>> {
    const endpoint = 'create-account';
    const request: WelcomeRequest = {
      nombre: body.nombre,
      saldo:  body.saldo,
      icon: body.icon,
      color:  body.color
    };
    return this.apiService.post<WelcomeResponse>(endpoint, request).pipe(
      tap(result => {
        if (result.success && result.data) {
        }
      })
    );
  }

}