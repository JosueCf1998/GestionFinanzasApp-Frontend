/**
 * Modelo genérico para encapsular el resultado de una operación.
 * @template T Tipo de los datos en caso de éxito.
 */

export interface Result<T> {
  success: boolean;           // Indica si la operación fue exitosa
  message: string;            // Mensaje descriptivo del resultado
  data: T | null;             // Datos principales devueltos en caso de éxito o null en caso de error
  timestamp?: string;         // Marca de tiempo de la operación (opcional)
  statusCode?: number;        // Código de estado HTTP o interno (opcional)
  error?: ErrorDetail;        // Detalles del error en caso de fallo (opcional)
  meta?: MetaData;            // Metadatos adicionales (opcional)
}

/**
 * Detalles del error en caso de fallo.
 */
export interface ErrorDetail {
  code: string;             // Código del error (ej. "NETWORK_ERROR")
  message: string;          // Mensaje del error
  description?: string;     // Descripción detallada (opcional)
  details?: any;            // Información adicional sobre el error (opcional)
}

/**
 * Metadatos adicionales para el resultado.
 */
export interface MetaData {
  [key: string]: any;       // Información adicional (ej. paginación, etc.)
}