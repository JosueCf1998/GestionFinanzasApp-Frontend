import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';

export interface UpdateCategoryRequest {
  id: number;
  name: string;
  type: string;
  icon: string;
  color: string;
}

// Mapeo de propiedades
const REQUEST_KEY_MAP = {
  id: 'categoria_id',
  name: 'nombre',
  type: 'tipo',
  icon: 'icono',
  color: 'color'
} as const;

export interface UpdateCategoryResponse {
}

@Injectable({
  providedIn: 'root',
})
export class UpdateCategoryUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  updateCategory(body: UpdateCategoryRequest): Observable<Result<UpdateCategoryResponse>> {
    const endpoint = 'update-category';
    const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
    const encryptedBody = encryptBody(mappedBody, this.encryptionService);
    return this.apiService.post<UpdateCategoryResponse>(endpoint, encryptedBody);
  }

}