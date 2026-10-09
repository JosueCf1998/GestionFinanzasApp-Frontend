import { AppErrorDetail, AppErrorType, APP_ERROR_CODES } from '../models/app-error.model';

/**
 * Utilidad centralizada para mapear y normalizar cualquier error
 * de la aplicación en 3 categorías estándar requeridas:
 * 1. Timeout: Cuando la operación o tiempo de respuesta excede el límite permitido.
 * 2. ConectionError: Cuando el dispositivo está sin internet o la red no responde.
 * 3. GenericError: Cuando el servicio devuelve un error desconocido o no controlado.
 */
export class AppErrorMapper {
  private static readonly MSG_TIMEOUT_TITLE = 'Tiempo de espera agotado';
  private static readonly MSG_TIMEOUT_DESC =
    'La solicitud tardó demasiado tiempo en responder. Por favor, verifica tu conexión e intenta nuevamente.';

  private static readonly MSG_CONNECTION_TITLE = 'Sin conexión a internet';
  private static readonly MSG_CONNECTION_DESC =
    'No se pudo conectar con el servidor. Por favor, comprueba tu conexión a internet e intenta de nuevo.';

  private static readonly MSG_GENERIC_TITLE = 'Error en el servicio';
  private static readonly MSG_GENERIC_DESC =
    'Ha ocurrido un error inesperado al procesar la solicitud. Por favor, intenta más tarde.';

  /**
   * Mapea cualquier objeto o excepción de error a la estructura estandarizada AppErrorDetail.
   * Si el error ya fue mapeado previamente, lo devuelve directamente sin alterar.
   */
  static map(rawError: any): AppErrorDetail {
    // Si ya está mapeado con la estructura correcta, se retorna tal cual
    if (this.isAlreadyMapped(rawError)) {
      return rawError as AppErrorDetail;
    }

    // Desenvolver si el error viene dentro de un contenedor (ej. Result<T> con error)
    const targetError = (rawError && typeof rawError === 'object' && 'error' in rawError && rawError.error)
      ? rawError.error
      : rawError;

    if (this.isAlreadyMapped(targetError)) {
      return targetError as AppErrorDetail;
    }

    const errorType = this.detectErrorType(targetError);

    switch (errorType) {
      case APP_ERROR_CODES.TIMEOUT:
        return {
          code: APP_ERROR_CODES.TIMEOUT,
          type: APP_ERROR_CODES.TIMEOUT,
          title: this.MSG_TIMEOUT_TITLE,
          message: 'Timeout: La operación ha superado el tiempo límite permitido.',
          description: this.MSG_TIMEOUT_DESC,
          details: rawError,
        };

      case APP_ERROR_CODES.CONNECTION_ERROR:
        return {
          code: APP_ERROR_CODES.CONNECTION_ERROR,
          type: APP_ERROR_CODES.CONNECTION_ERROR,
          title: this.MSG_CONNECTION_TITLE,
          message: 'ConectionError: No hay conexión a internet disponible.',
          description: this.MSG_CONNECTION_DESC,
          details: rawError,
        };

      case APP_ERROR_CODES.GENERIC_ERROR:
      default: {
        const extractedMessage = this.extractMessage(targetError);
        const extractedDescription = this.extractDescription(targetError, extractedMessage);

        return {
          code: APP_ERROR_CODES.GENERIC_ERROR,
          type: APP_ERROR_CODES.GENERIC_ERROR,
          title: this.MSG_GENERIC_TITLE,
          message: extractedMessage.startsWith('GenericError')
            ? extractedMessage
            : `GenericError: ${extractedMessage}`,
          description: extractedDescription,
          details: rawError,
        };
      }
    }
  }

  /**
   * Determina si el error ya fue procesado y cumple con el contrato AppErrorDetail.
   */
  private static isAlreadyMapped(error: any): boolean {
    return (
      !!error &&
      typeof error === 'object' &&
      (error.code === APP_ERROR_CODES.TIMEOUT ||
        error.code === APP_ERROR_CODES.CONNECTION_ERROR ||
        error.code === APP_ERROR_CODES.GENERIC_ERROR) &&
      (error.type === APP_ERROR_CODES.TIMEOUT ||
        error.type === APP_ERROR_CODES.CONNECTION_ERROR ||
        error.type === APP_ERROR_CODES.GENERIC_ERROR) &&
      typeof error.title === 'string' &&
      typeof error.message === 'string'
    );
  }

  /**
   * Detecta la categoría del error según sus propiedades y el entorno del dispositivo.
   */
  private static detectErrorType(error: any): AppErrorType {
    // 1. Detección de Timeout:
    // - RxJS TimeoutError
    // - HTTP status 408 (Request Timeout) o 504 (Gateway Timeout)
    // - Códigos de error de red conocidos de timeout
    // - Textos que contengan 'timeout', 'timed out', 'tiempo de espera'
    const isTimeout =
      error?.name === 'TimeoutError' ||
      error?.code === 'TIMEOUT' ||
      error?.code === 'ETIMEDOUT' ||
      error?.code === 'ECONNABORTED' ||
      error?.code === APP_ERROR_CODES.TIMEOUT ||
      error?.status === 408 ||
      error?.status === 504 ||
      this.containsText(error, ['timeout', 'timed out', 'tiempo de espera', 'tiempo agotado']);

    if (isTimeout) {
      return APP_ERROR_CODES.TIMEOUT;
    }

    // 2. Detección de ConectionError:
    // - Dispositivo sin conectividad (navigator.onLine === false)
    // - HttpErrorResponse con status 0 (bloqueo por falta de red, DNS o socket cerrado)
    // - ProgressEvent de error en peticiones XMLHttpRequest
    // - Códigos de red de socket cerrado o desconexión
    // - Textos que refieran a red, internet o conexión
    const isOffline = typeof navigator !== 'undefined' && navigator.onLine === false;
    const isConnectionError =
      isOffline ||
      error?.status === 0 ||
      error?.code === 'NETWORK_ERROR' ||
      error?.code === 'ERR_NETWORK' ||
      error?.code === 'ENOTFOUND' ||
      error?.code === 'ECONNREFUSED' ||
      error?.code === APP_ERROR_CODES.CONNECTION_ERROR ||
      (typeof ProgressEvent !== 'undefined' && error instanceof ProgressEvent && error.type === 'error') ||
      this.containsText(error, [
        'network',
        'internet',
        'failed to fetch',
        'conexion',
        'conexión',
        'connection',
        'offline',
        'sin red',
        'unknown error'
      ]);

    if (isConnectionError) {
      return APP_ERROR_CODES.CONNECTION_ERROR;
    }

    // 3. GenericError:
    // Cualquier otro error devuelto por el servicio o excepción no clasificada
    return APP_ERROR_CODES.GENERIC_ERROR;
  }

  /**
   * Verifica si los mensajes, descripciones o representaciones en texto del error
   * contienen alguna de las palabras clave especificadas.
   */
  private static containsText(error: any, keywords: string[]): boolean {
    if (!error) return false;

    const sources: (string | undefined)[] = [
      typeof error === 'string' ? error : undefined,
      typeof error?.message === 'string' ? error.message : undefined,
      typeof error?.error?.message === 'string' ? error.error.message : undefined,
      typeof error?.description === 'string' ? error.description : undefined,
      typeof error?.error?.description === 'string' ? error.error.description : undefined,
      typeof error?.statusText === 'string' ? error.statusText : undefined,
    ];

    const aggregated = sources.filter(Boolean).join(' ').toLowerCase();
    if (!aggregated) return false;

    return keywords.some((kw) => aggregated.includes(kw.toLowerCase()));
  }

  /**
   * Extrae el mensaje más legible del error para mostrar al usuario.
   */
  private static extractMessage(error: any): string {
    if (!error) return 'Error desconocido del servicio';

    if (typeof error === 'string') return error;

    if (typeof error?.error?.message === 'string' && error.error.message.trim().length > 0) {
      return error.error.message;
    }

    if (typeof error?.message === 'string' && error.message.trim().length > 0) {
      return error.message;
    }

    if (typeof error?.error === 'string' && error.error.trim().length > 0) {
      return error.error;
    }

    return 'Error desconocido del servicio';
  }

  /**
   * Extrae o genera una descripción amigable del error.
   */
  private static extractDescription(error: any, fallbackMessage: string): string {
    if (!error) return this.MSG_GENERIC_DESC;

    if (typeof error?.error?.description === 'string' && error.error.description.trim().length > 0) {
      return error.error.description;
    }

    if (typeof error?.description === 'string' && error.description.trim().length > 0) {
      return error.description;
    }

    if (
      typeof error?.statusText === 'string' &&
      error.statusText !== 'OK' &&
      error.statusText !== 'Unknown Error' &&
      error.statusText.trim().length > 0
    ) {
      return error.statusText;
    }

    return fallbackMessage && fallbackMessage !== 'Error desconocido del servicio'
      ? fallbackMessage
      : this.MSG_GENERIC_DESC;
  }

  /** Helpers para validaciones booleanas directas en cualquier controlador */
  static isTimeout(error: any): boolean {
    return this.map(error).code === APP_ERROR_CODES.TIMEOUT;
  }

  static isConnectionError(error: any): boolean {
    return this.map(error).code === APP_ERROR_CODES.CONNECTION_ERROR;
  }

  static isGenericError(error: any): boolean {
    return this.map(error).code === APP_ERROR_CODES.GENERIC_ERROR;
  }
}
