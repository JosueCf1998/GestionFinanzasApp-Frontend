export type LearningLevel = 'BASICO' | 'INTERMEDIO' | 'AVANZADO';

export interface CoursesByCategoryRequest {
  category_id: number;
}

export interface CoursesByLevelRequest {
  level: LearningLevel;
}

export interface CourseDetailRequest {
  course_id: number;
}

export interface LessonRequest {
  lesson_id: number;
}

export interface QuizAnswerRequest {
  quiz_id: number;
  option_id: number;
}

export interface SubmitQuizRequest extends LessonRequest {
  answers: QuizAnswerRequest[];
}

/**
 * El backend todavía no define un contrato cerrado para las respuestas de
 * aprendizaje. Estos tipos conservan los campos conocidos y permiten recibir
 * campos adicionales sin perder el tipado de las peticiones.
 */
export interface LearningEntity {
  id?: number;
  [key: string]: unknown;
}

export interface LearningItemsResponse<T = LearningEntity> {
  items: T[];
  [key: string]: unknown;
}

export interface LearningHomeResponse {
  [key: string]: unknown;
}

export interface LearningCategory extends LearningEntity {
  nombre?: string;
  name?: string;
}

export interface LearningCourse extends LearningEntity {
  nivel?: LearningLevel;
  level?: LearningLevel;
}

export interface LearningLesson extends LearningEntity {
  course_id?: number;
}

export interface LessonProgressResponse {
  lesson_id?: number;
  completion_blocked?: 'QUIZ_NOT_PASSED';
  passing_score?: number;
  [key: string]: unknown;
}

export interface QuizDetailResponse {
  has_quiz: boolean;
  [key: string]: unknown;
}

export interface SubmitQuizResponse {
  passed: boolean;
  score?: number;
  [key: string]: unknown;
}

export interface LearningRecommendationsResponse {
  [key: string]: unknown;
}

export interface LearningStatsResponse {
  [key: string]: unknown;
}
