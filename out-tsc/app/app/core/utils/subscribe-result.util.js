/**
 * service: helper para suscribirse a `Observable<Result<T>>`.
 * Devuelve la `Subscription` para que el consumidor pueda cancelar si lo desea.
 *
 * Uso:
 * const sub = service(obs, { success, failure });
 * sub.unsubscribe();
 */
export function service(obs, handlers) {
    return obs.subscribe({
        next: (res) => {
            if (res.success) {
                handlers.success(res.data);
                return;
            }
            // Construir ErrorDetail preferente a partir de `res.error`
            let error = {
                code: String(res.statusCode) ?? "500",
                message: res.error?.description ?? "Error desconocido",
                description: res.error?.message ?? "No se proporcionó información adicional",
            };
            handlers.failure(error);
        },
        error: (err) => {
            const errDetail = {
                code: err.code ?? "500",
                message: err?.message ?? String(err),
                description: typeof err === 'string' ? err : (err?.stack ?? String(err)),
            };
            handlers.failure(errDetail);
        },
    });
}
//# sourceMappingURL=subscribe-result.util.js.map