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
export function mapObjectKeys<T extends Record<string, any>>(
  obj: T,
  keyMap: Record<string, string>
): Record<string, any> {
  return Object.keys(obj).reduce((acc, key) => {
    const mappedKey = keyMap[key] || key;
    acc[mappedKey] = obj[key];
    return acc;
  }, {} as Record<string, any>);
}
