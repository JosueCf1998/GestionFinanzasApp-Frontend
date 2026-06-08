import { Observable, Subscription } from 'rxjs';
import { Result, ErrorDetail } from '../models/result.model';

/**
 * Handlers para el flujo de `Result<T>`.
 * - `success` recibe únicamente la `data` (T|null).
 * - `failure` recibe el modelo `ErrorDetail` o `null` si no hay info.
 */
export type ServiceHandlers<T> = {
  success: (data: T | null) => void;
  failure: (error: ErrorDetail | null) => void;
};

/**
 * service: helper para suscribirse a `Observable<Result<T>>`.
 * Devuelve la `Subscription` para que el consumidor pueda cancelar si lo desea.
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
      if (res.success) {
        handlers.success(res.data);
        return;
      }
      // Construir ErrorDetail preferente a partir de `res.error`
      let error: ErrorDetail = {
        code: String(res.statusCode) ?? "500",
        message: res.error?.description ?? "Error desconocido",
        description: res.error?.message ?? "No se proporcionó información adicional",
      };
      handlers.failure(error);
    },
    error: (err) => {
      const errDetail: ErrorDetail = {
        code: err.code ?? "500",
        message: err?.message ?? String(err),
        description: typeof err === 'string' ? err : (err?.stack ?? String(err)),
      };
      handlers.failure(errDetail);
    },
  });
}