import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { tap } from 'rxjs/operators';
import { encryptBody, encryptFields } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';
export interface UpdateAccountRequest {
  id: number;
  name: string;
  amount: number;
  icon: string;
  color: string;
}

// Mapeo de propiedades
const REQUEST_KEY_MAP = {
  id: 'cuenta_id',
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
export class UpdateAccountUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  updateAccount(body: UpdateAccountRequest): Observable<Result<UpdateAccountRequest>> {
    const endpoint = 'accounts/update';
    const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
    const encryptedBody = encryptBody(mappedBody, this.encryptionService);
    return this.apiService.post<UpdateAccountRequest>(endpoint, encryptedBody);
  }

}