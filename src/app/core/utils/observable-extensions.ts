import { Observable, Subscription } from 'rxjs';
import { Result } from '../models/result.model';
import { ServiceHandlers, service } from './subscribe-result.util';

declare module 'rxjs' {
  interface Observable<T> {
    /**
     * service: extensión para `Observable<Result<T>>`.
     * Permite llamar `obs.service({ success, failure })`.
     * Solo maneja `success` y `failure`.
     */
    service<R>(this: Observable<Result<R>>, handlers: ServiceHandlers<R>): Subscription;
  }
}

// Implementación en el prototype para que esté disponible en tiempo de ejecución.
(Observable.prototype as any).service = function <R>(this: Observable<Result<R>>, handlers: ServiceHandlers<R>): Subscription {
  return service<R>(this as Observable<Result<R>>, handlers);
};
