/**
 * Modelo genérico para encapsular el resultado de una operación.
 * @template T Tipo de los datos en caso de éxito.
 */
export interface Result<T> {
  statusCode: number;       // Código de estado HTTP o interno
  success: boolean;         // Indica si la operación fue exitosa
  message: string;          // Mensaje descriptivo del resultado
  data?: T;                 // Datos devueltos en caso de éxito
  error?: ErrorDetail;      // Detalles del error en caso de fallo
  meta?: MetaData;          // Metadatos adicionales (opcional)
}

/**
 * Detalles del error en caso de fallo.
 */
export interface ErrorDetail {
  code: string;             // Código del error (ej. "NETWORK_ERROR")
  description: string;      // Descripción del error
  details?: any;            // Información adicional sobre el error (opcional)
}

/**
 * Metadatos adicionales para el resultado.
 */
export interface MetaData {
  [key: string]: any;       // Información adicional (ej. paginación, etc.)
}