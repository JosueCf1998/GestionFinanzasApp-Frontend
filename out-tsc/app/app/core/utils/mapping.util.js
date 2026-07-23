/**
 * Mapea las propiedades de un objeto usando un diccionario de traducción
 * @param obj - Objeto a mapear
 * @param keyMap - Diccionario con el mapeo de claves (origen -> destino)
 * @returns Objeto con las claves mapeadas
 *
 * @example
 * const user = { name: 'John', age: 30 };
 * const keyMap = { name: 'nombre', age: 'edad' };
 * const result = mapObjectKeys(user, keyMap);
 * // result: { nombre: 'John', edad: 30 }
 */
export function mapObjectKeys(obj, keyMap) {
    return Object.keys(obj).reduce((acc, key) => {
        const mappedKey = keyMap[key] || key;
        acc[mappedKey] = obj[key];
        return acc;
    }, {});
}
/**
 * Mapea las propiedades de un objeto usando un diccionario invertido
 * Invierte el mapeo: los valores del keyMap se convierten en claves
 * @param obj - Objeto a mapear
 * @param keyMap - Diccionario con el mapeo inverso (destino -> origen)
 * @returns Objeto con las claves mapeadas inversamente
 *
 * @example
 * const user = { nombre: 'John', edad: 30 };
 * const keyMap = { name: 'nombre', age: 'edad' };
 * const result = mapObjectKeysReverse(user, keyMap);
 * // result: { name: 'John', age: 30 }
 */
export function mapObjectKeysReverse(obj, keyMap) {
    // Invertir el mapa: { name: 'nombre' } -> { nombre: 'name' }
    const invertedMap = Object.entries(keyMap).reduce((acc, [key, value]) => {
        acc[value] = key;
        return acc;
    }, {});
    return Object.keys(obj).reduce((acc, key) => {
        const mappedKey = invertedMap[key] || key;
        acc[mappedKey] = obj[key];
        return acc;
    }, {});
}
//# sourceMappingURL=mapping.util.js.map