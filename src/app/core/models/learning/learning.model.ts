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

export interface LearningEntity {
  id?: number;
  [key: string]: unknown;
}

export interface LearningItemsResponse<T = LearningEntity> {
  items: T[];
  [key: string]: unknown;
}

export interface LearningUserProgress {
  level: string;
  xp: number;
  next_level_xp: number;
  streak: number;
}

export interface LearningFeaturedCourse {
  id: number;
  title: string;
  description: string;
  image_url: string;
  progress: number;
}

export interface LearningHomeCategory {
  id: number;
  name: string;
  description?: string;
  icon: string;
}

export interface LearningHomePath {
  id: number;
  id_categories: number;
  title: string;
  description: string;
  lessons: number;
  progress: number;
}

export interface LearningRecommendedLesson {
  id: number;
  course_id: number;
  course_title: string;
  title: string;
  number: number;
  minutes: number;
  level: LearningLevel;
}

export interface LearningHomeResponse {
  user_progress: LearningUserProgress;
  featured_course: LearningFeaturedCourse | null;
  categories: LearningHomeCategory[];
  learning_paths: LearningHomePath[];
  recommended_lessons: LearningRecommendedLesson[];
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

export interface LearningQuestion {
  id: number;
  category: string;
  question: string;
  answer: string;
  icon?: string;
  color?: string;
}
