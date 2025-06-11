/**
 * Modelo que representa una publicación.
 */
export interface Post {
  id: number;       // Identificador único de la publicación
  userId: number;   // Identificador del usuario que creó la publicación
  title: string;    // Título de la publicación
  body: string;     // Contenido de la publicación
}