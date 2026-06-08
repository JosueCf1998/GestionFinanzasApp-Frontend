import { Observable, Subscription } from 'rxjs';
import { Result } from '../models/result.model';

/**
 * Handlers para el flujo de `Result<T>`.
 * - `success` se ejecuta cuando `res.success === true`.
 * - `failure` se ejecuta cuando `res.success === false` o hay un error de transporte.
 */
export type ServiceHandlers<T> = {
  success: (result: Result<T>) => void;
  failure: (error: string | null, result?: Result<T>) => void;
};

/**
 * service: helper profesional para suscribirse a `Observable<Result<T>>`.
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
        handlers.success(res);
      } else {
        // prefer description if available
        const errStr = (res as any).error?.description ?? res.message ?? null;
        handlers.failure(errStr, res);
      }
    },
    error: (err) => {
      handlers.failure(err?.message ?? String(err));
    },
  });
}
