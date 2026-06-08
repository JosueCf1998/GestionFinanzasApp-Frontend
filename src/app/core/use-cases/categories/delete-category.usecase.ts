import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';

export interface DeleteCategoryRequest {
  id: number;
}

// Mapeo de propiedades
const REQUEST_KEY_MAP = {
  id: 'categoria_id'
} as const;

export interface DeleteCategoryResponse {
}

@Injectable({
  providedIn: 'root',
})
export class DeleteCategoryUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  deleteCategory(body: DeleteCategoryRequest): Observable<Result<DeleteCategoryResponse>> {
    const endpoint = 'categories/delete';
    const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
    const encryptedBody = encryptBody(mappedBody, this.encryptionService);
    return this.apiService.post<DeleteCategoryResponse>(endpoint, encryptedBody);
  }

}