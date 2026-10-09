import { Observable, Subscription } from 'rxjs';
import { Result } from '../models/result.model';
import { AppErrorDetail } from '../models/app-error.model';
import { AppErrorMapper } from './error-mapper.util';

/**
 * Handlers para el flujo de `Result<T>`.
 * - `success` recibe únicamente la `data` (T | null).
 * - `failure` recibe el modelo estandarizado `AppErrorDetail` garantizando uno de los 3 errores:
 *    - Timeout
 *    - ConectionError
 *    - GenericError
 */
export type ServiceHandlers<T> = {
  success: (data: T | null) => void;
  failure: (error: AppErrorDetail) => void;
};

/**
 * helper para suscribirse a `Observable<Result<T>>`.
 * Devuelve la `Subscription` para que el consumidor pueda cancelar si lo desea.
 *
 * Filtro de seguridad:
 * Si la respuesta no es exitosa o llega cualquier error no mapeado,
 * pasa obligatoriamente por los filtros estandarizados (Timeout, ConectionError, GenericError).
 *
 * Uso:
 * const sub = service(obs, { success, failure });
 * sub.unsubscribe();
 */
export function service<T>(
  obs: Observable<Result<T>>,
  handlers: ServiceHandlers<T>
): Subscription {
  return obs.subscribe({
    next: (res) => {
      if (res?.success) {
        handlers.success(res.data);
        return;
      }
      // Pasa obligatoriamente por el filtro de mapeo estandarizado
      const appError: AppErrorDetail = AppErrorMapper.map(res?.error ?? res);
      handlers.failure(appError);
    },
    error: (err) => {
      // Cualquier excepción arrojada en el flujo pasa por el filtro
      const appError: AppErrorDetail = AppErrorMapper.map(err);
      handlers.failure(appError);
    },
  });
}