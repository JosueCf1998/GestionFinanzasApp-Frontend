import { Observable } from 'rxjs';
import { service } from './subscribe-result.util';
// Implementación en el prototype para que esté disponible en tiempo de ejecución.
Observable.prototype.service = function (handlers) {
    return service(this, handlers);
};
//# sourceMappingURL=observable-extensions.js.map