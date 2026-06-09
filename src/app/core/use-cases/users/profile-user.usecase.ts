import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';

export interface ProfileUserRequest {
  id?: string;
  nombre: string;
  correo: string;
  imagen: string;
}

export interface ProfileUserResponse {
}

@Injectable({
  providedIn: 'root',
})
export class ProfileUserUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  updateProfile(): Observable<Result<ProfileUserResponse>> {
    const endpoint = 'users/profile';
    return this.apiService.post<ProfileUserResponse>(endpoint, {});
  }

}