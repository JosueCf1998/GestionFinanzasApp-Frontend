export interface Categoria {
  id?: number;
  usuario_id?: number | null;
  nombre: string;
  icono: string;
  color: string;
  tipo?: string;
}