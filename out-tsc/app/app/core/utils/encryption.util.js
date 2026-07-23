import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
/**
 * Operador RxJS personalizado para desencriptar automáticamente las respuestas
 * @param encryptionService - Servicio de encriptación
 * @returns Observable con los datos desencriptados
 */
export function decryptData(encryptionService) {
    return pipe(map((result) => {
        if (result.success && result.data) {
            const decryptedData = encryptionService.decryptResponse(result.data);
            return {
                ...result,
                data: decryptedData
            };
        }
        return result;
    }));
}
/**
 * Función helper para encriptar múltiples campos de un objeto
 * @param obj - Objeto con los campos a encriptar
 * @param encryptionService - Servicio de encriptación
 * @param excludeKeys - Array de claves que NO deben ser encriptadas (opcional)
 * @returns Objeto con los campos encriptados (excepto los excluidos)
 */
export function encryptFields(obj, encryptionService, excludeKeys = []) {
    const encrypted = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Si la clave está en la lista de exclusión o es un número, no encriptar
            if (excludeKeys.includes(key) || typeof obj[key] === 'number') {
                encrypted[key] = obj[key];
            }
            else {
                encrypted[key] = encryptionService.encrypt(String(obj[key]));
            }
        }
    }
    return encrypted;
}
/**
 * Encripta todo el objeto como un único string JSON encriptado
 * Este es el método recomendado para mayor seguridad
 * @param obj - Objeto a encriptar
 * @param encryptionService - Servicio de encriptación
 * @returns Objeto con una propiedad 'data' que contiene todo el JSON encriptado
 */
export function encryptBody(obj, encryptionService) {
    const jsonString = JSON.stringify(obj);
    const encrypted = encryptionService.encrypt(jsonString);
    return { data: encrypted };
}
//# sourceMappingURL=encryption.util.js.map