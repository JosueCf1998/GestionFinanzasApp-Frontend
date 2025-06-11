/**
 * Protocolo genérico para casos de uso.
 * @template Input Tipo de entrada del caso de uso.
 * @template Output Tipo de salida del caso de uso.
 */
export interface UseCase<Input = void, Output = void> {
    /**
     * Ejecuta el caso de uso con los datos de entrada especificados.
     * @param input Datos de entrada para el caso de uso.
     * @returns Resultado del caso de uso.
     */
    executeGet(input: Input): Output;
    executePost(input: Input): Output;
}