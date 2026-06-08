import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { tap } from 'rxjs/operators';

export interface DecryptionCryptoRequest {
}

export interface DecryptionCryptoResponse {
  encrypted: String,
  decrypted: String
}

@Injectable({
  providedIn: 'root',
})
export class DecryptionCryptoUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  execute(): Observable<Result<DecryptionCryptoResponse>> {
    const endpoint = 'crypto/decryption';
    const body: DecryptionCryptoRequest = {"value": "K0ofJ0XLXmVyU6Xtd705dxrXwHIF4JsgNb25MNHQsL+gOeYm18Cqpwif5jnFIfa7vmVGViu8OCrkxZBm+Dd2RQ=="};
    return this.apiService.post<DecryptionCryptoResponse>(endpoint, body).pipe(
      tap((result: Result<DecryptionCryptoResponse>) => {
        if (result.success && result.data) {
          console.log('DecryptionCryptoUseCase - response:', result.data);
          console.log('valor desencriptado:', result.data.encrypted);
          console.log('valor original:', result.data.decrypted);
        }
      })
    );
  }

}