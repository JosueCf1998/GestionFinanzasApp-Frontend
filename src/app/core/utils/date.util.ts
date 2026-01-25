/**
 * Convierte una fecha ISO string al formato YYYY-MM-DD requerido por MySQL
 * @param isoDate - String de fecha en formato ISO (ej: '2026-01-25T07:15:40.385Z')
 * @returns String con formato YYYY-MM-DD (ej: '2026-01-25')
 */
export function convertISODateToSQL(isoDate: string): string {
  if (!isoDate) return '';
  
  // Si ya está en formato YYYY-MM-DD, devolverlo tal cual
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return isoDate;
  }
  
  // Convertir de ISO a YYYY-MM-DD
  const datePart = isoDate.split('T')[0];
  return datePart;
}

/**
 * Convierte un objeto Date al formato YYYY-MM-DD
 * @param date - Objeto Date
 * @returns String con formato YYYY-MM-DD
 */
export function formatDateToSQL(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
