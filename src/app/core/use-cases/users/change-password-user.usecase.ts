import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';

export interface ChangePasswordUserRequest {
  id: string;
  current_password: string;
  new_password: string;
}

export interface ChangePasswordUserResponse {}

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordUserUseCase {
  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService,
  ) {}

  execute(body: ChangePasswordUserRequest): Observable<Result<ChangePasswordUserResponse>> {
    const endpoint = 'users/change-password';
    const encryptedBody = encryptBody(body, this.encryptionService);
    return this.apiService.post<ChangePasswordUserResponse>(endpoint, encryptedBody);
  }
}
