import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { tap } from 'rxjs/operators';

export interface EncryptionCryptoRequest {
}

export interface EncryptionCryptoResponse {
    encrypted: String,
    original: String
}

@Injectable({
  providedIn: 'root',
})
export class EncryptionCryptoUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  execute(): Observable<Result<EncryptionCryptoResponse>> {
    const body: EncryptionCryptoRequest = {"email":"josue@gmail.com","password":"Contra123$"};
    const endpoint = 'crypto/encryption';
    return this.apiService.post<EncryptionCryptoResponse>(endpoint, body).pipe(
      tap((result: Result<EncryptionCryptoResponse>) => {
        if (result.success && result.data) {
          console.log('EncryptionCryptoUseCase - response:', result.data);
          console.log('valor encriptado:', result.data.encrypted);
          console.log('valor original:', result.data.original);
        }
      })
    );
  }

}