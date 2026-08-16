/**
 * Convierte una fecha ISO string al formato YYYY-MM-DD requerido por MySQL
 * @param isoDate - String de fecha en formato ISO (ej: '2026-01-25T07:15:40.385Z')
 * @returns String con formato YYYY-MM-DD (ej: '2026-01-25')
 */
export function convertISODateToSQL(isoDate: string): string {
  if (!isoDate) return '';

  // En los formularios la fecha representa un día calendario, no un instante.
  // Conservamos YYYY-MM-DD para evitar cambios de día por zona horaria.
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(isoDate.trim());
  if (!match) return '';

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const candidate = new Date(Date.UTC(year, month - 1, day));

  if (
    candidate.getUTCFullYear() !== year ||
    candidate.getUTCMonth() !== month - 1 ||
    candidate.getUTCDate() !== day
  ) return '';

  return `${match[1]}-${match[2]}-${match[3]}`;
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

/** Día calendario actual según la zona horaria local del dispositivo. */
export function getLocalToday(): string {
  return formatDateToSQL(new Date());
}
