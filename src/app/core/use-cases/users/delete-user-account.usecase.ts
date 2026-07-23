import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { ENDPOINTS } from '../../constants/endpoints';

export interface DeleteUserAccountRequest {
  userId: string;
}

export interface DeleteUserAccountResponse {}

@Injectable({
  providedIn: 'root',
})
export class DeleteUserAccountUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  execute(body: DeleteUserAccountRequest): Observable<Result<DeleteUserAccountResponse>> {
    const encryptedBody = encryptBody(body, this.encryptionService);
    return this.apiService.post<DeleteUserAccountResponse>(ENDPOINTS.USERS.DELETE, encryptedBody);
  }

}
