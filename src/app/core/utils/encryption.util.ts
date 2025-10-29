import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Result } from '../models/result.model';
import { EncryptionService } from '../services/encryption.service';

/**
 * Operador RxJS personalizado para desencriptar automáticamente las respuestas
 * @param encryptionService - Servicio de encriptación
 * @returns Observable con los datos desencriptados
 */
export function decryptData<T>(encryptionService: EncryptionService) {
  return pipe(
    map((result: Result<any>) => {
      if (result.success && result.data) {
        const decryptedData = encryptionService.decryptResponse<T>(result.data);
        return {
          ...result,
          data: decryptedData
        } as Result<T>;
      }
      return result as Result<T>;
    })
  );
}

/**
 * Función helper para encriptar múltiples campos de un objeto
 * @param obj - Objeto con los campos a encriptar
 * @param encryptionService - Servicio de encriptación
 * @returns Objeto con todos los campos encriptados
 */
export function encryptFields<T extends Record<string, any>>(
  obj: T,
  encryptionService: EncryptionService
): T {
  const encrypted: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      encrypted[key] = encryptionService.encrypt(String(obj[key]));
    }
  }
  return encrypted as T;
}
