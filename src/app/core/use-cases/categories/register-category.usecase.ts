import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Result } from '../../models/result.model';
import { EncryptionService } from '../../services/encryption.service';
import { encryptBody } from '../../utils/encryption.util';
import { mapObjectKeys } from '../../utils/mapping.util';

export interface RegisterCategoryRequest {
  name: string;
  type: string;
  icon: string;
  color: string;
}

// Mapeo de propiedades
const REQUEST_KEY_MAP = {
  name: 'nombre',
  type: 'tipo',
  icon: 'icono',
  color: 'color'
} as const;

export interface RegisterCategoryResponse {
}

@Injectable({
  providedIn: 'root',
})
export class CreateCategoryUseCase {

  constructor(
    private apiService: ApiService,
    private encryptionService: EncryptionService
  ) {}

  registerCategory(body: RegisterCategoryRequest): Observable<Result<RegisterCategoryResponse>> {
    const endpoint = 'categories/register';
    const mappedBody = mapObjectKeys(body, REQUEST_KEY_MAP);
    const encryptedBody = encryptBody(mappedBody, this.encryptionService);
    return this.apiService.post<RegisterCategoryResponse>(endpoint, encryptedBody);
  }

}
