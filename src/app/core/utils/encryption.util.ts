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
 * @param excludeKeys - Array de claves que NO deben ser encriptadas (opcional)
 * @returns Objeto con los campos encriptados (excepto los excluidos)
 */
export function encryptFields<T extends Record<string, any>>(
  obj: T,
  encryptionService: EncryptionService,
  excludeKeys: string[] = []
): T {
  const encrypted: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Si la clave está en la lista de exclusión o es un número, no encriptar
      if (excludeKeys.includes(key) || typeof obj[key] === 'number') {
        encrypted[key] = obj[key];
      } else {
        encrypted[key] = encryptionService.encrypt(String(obj[key]));
      }
    }
  }
  return encrypted as T;
}

/**
 * Encripta todo el objeto como un único string JSON encriptado
 * Este es el método recomendado para mayor seguridad
 * @param obj - Objeto a encriptar
 * @param encryptionService - Servicio de encriptación
 * @returns Objeto con una propiedad 'data' que contiene todo el JSON encriptado
 */
export function encryptBody<T extends Record<string, any>>(
  obj: T,
  encryptionService: EncryptionService
): { data: string } {
  const jsonString = JSON.stringify(obj);
  const encrypted = encryptionService.encrypt(jsonString);
  return { data: encrypted };
}

