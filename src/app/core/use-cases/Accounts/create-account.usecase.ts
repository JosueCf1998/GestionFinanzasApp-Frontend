import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';

export interface CreateAccountRequest {
  name: string;
  amount: number;
  icon: string;
  color: string;
}

// Mapeo de propiedades
const REQUEST_KEY_MAP = {
  name: 'nombre',
  amount: 'saldo',
  icon: 'icon',
  color: 'color'
} as const;

export interface CreateAccountResponse {
}

@Injectable({
  providedIn: 'root',
})
export class CreateAccountUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  createAccount(body: CreateAccountRequest): Observable<Result<CreateAccountResponse>> {
    const endpoint = 'create-account';
    const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
    const encryptedBody = encryptBody(mappedBody, this.encryptionService);
    return this.apiService.post<CreateAccountResponse>(endpoint, encryptedBody);
  }

}