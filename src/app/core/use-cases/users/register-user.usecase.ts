import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';

export interface RegisterUserRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

// Mapeo de propiedades
const REQUEST_KEY_MAP = {
  name: 'nombre',
  lastName: 'apellidos',
  email: 'email',
  password: 'password'
} as const;

export interface RegisterUserResponse {
}

@Injectable({
  providedIn: 'root',
})
export class RegisterUserUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  createUser(body: RegisterUserRequest): Observable<Result<RegisterUserResponse>> {
    const endpoint = 'users/register';
    const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
    const encryptedBody = encryptBody(mappedBody, this.encryptionService);
    return this.apiService.post<RegisterUserResponse>(endpoint, encryptedBody);
  }

}