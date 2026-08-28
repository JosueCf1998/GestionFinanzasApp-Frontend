export type LearningLevel = 'BASICO' | 'INTERMEDIO' | 'AVANZADO';

export interface CoursesByCategoryRequest {
  categoryId: number;
}

export interface CoursesByLevelRequest {
  level: LearningLevel;
}

export interface CourseDetailRequest {
  courseId: number;
}

export interface LessonRequest {
  lessonId: number;
}

export type QuizDetailRequest = CourseDetailRequest;
export type CompleteCourseRequest = CourseDetailRequest;

export interface QuizAnswerRequest {
  quizId: number;
  optionId: number;
}

export interface SubmitQuizRequest extends CourseDetailRequest {
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

export type LearningLessonStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface LearningCourseProgress {
  completed: number;
  total: number;
  percentage: number;
}

export interface LearningCourseLesson {
  id: number;
  number: number;
  title: string;
  minutes: number;
  status: LearningLessonStatus;
}

export interface LearningCourseDetail {
  id: number;
  title: string;
  description: string;
  image_url: string;
  level: LearningLevel;
  estimated_minutes: number;
  progress: LearningCourseProgress;
  lessons: LearningCourseLesson[];
}

export interface LearningCategory extends LearningEntity {
  nombre?: string;
  name?: string;
}

export interface LearningCourse extends LearningEntity {
  nivel?: LearningLevel;
  level?: LearningLevel;
}

export type LearningContentType = 'TITLE' | 'TEXT' | 'INFO' | 'TIP' | 'WARNING' | 'IMAGE' | 'EXAMPLE';

export interface LearningLessonContent {
  id: number;
  type: LearningContentType;
  title: string | null;
  content: string | null;
  image_url: string | null;
  sort_order: number;
}

export type LearningLessonSectionType = LearningContentType | 'INFO_GROUP' | 'WARNING_GROUP';

export interface LearningLessonContentSection {
  id: number;
  type: LearningLessonSectionType;
  item?: LearningLessonContent;
  items?: LearningLessonContent[];
}

export interface LearningLessonLink {
  id: number;
}

export interface LearningLessonQuiz {
  available: boolean;
  passed: boolean;
  passing_score: number;
}

export interface LearningLesson {
  id: number;
  course_id: number;
  number: number;
  total_lessons: number;
  title: string;
  minutes: number;
  level: LearningLevel;
  status: LearningLessonStatus;
  contents: LearningLessonContent[];
  quiz: LearningLessonQuiz;
  previous_lesson: LearningLessonLink | null;
  next_lesson: LearningLessonLink | null;
}

export interface LessonProgressResponse {
  lesson_id?: number;
  completion_blocked?: 'QUIZ_NOT_PASSED';
  passing_score?: number;
  [key: string]: unknown;
}

export interface QuizDetailResponse {
  courseId: number;
  passingScore: number;
  requiredCorrectAnswers: number;
  totalQuestions: number;
  passed: boolean;
  hasQuiz: boolean;
  questions: LearningQuizQuestion[];
}

export interface SubmitQuizResponse {
  passed: boolean;
  score?: number;
  correct_answers?: number;
  total_questions?: number;
  [key: string]: unknown;
}

export interface LearningQuizOption {
  id: number;
  text: string;
}

export interface LearningQuizQuestion {
  id: number;
  question: string;
  options: LearningQuizOption[];
}

export interface QuizDetailApiResponse {
  course_id: number;
  passing_score: number;
  required_correct_answers: number;
  total_questions: number;
  passed: boolean;
  has_quiz: boolean;
  questions: Array<{
    quiz_id: number;
    question: string;
    options: Array<{
      option_id: number;
      text: string;
    }>;
  }>;
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
