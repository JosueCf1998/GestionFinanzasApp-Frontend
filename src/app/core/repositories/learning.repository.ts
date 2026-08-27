import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from 'src/app/core/constants/endpoints';
import {
  CourseDetailRequest,
  CoursesByCategoryRequest,
  CoursesByLevelRequest,
  LearningCategory,
  LearningCourse,
  LearningCourseDetail,
  LearningHomeResponse,
  LearningItemsResponse,
  LearningLesson,
  LearningQuestion,
  LearningRecommendationsResponse,
  LearningStatsResponse,
  LessonProgressResponse,
  LessonRequest,
  QuizDetailResponse,
  SubmitQuizRequest,
  SubmitQuizResponse
} from 'src/app/core/models/learning/learning.model';
import { Result } from 'src/app/core/models/result.model';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({ providedIn: 'root' })
export class LearningRepository {
  constructor(private readonly apiService: ApiService) {}

  getHome(): Observable<Result<LearningHomeResponse>> {
    return this.apiService.get(ENDPOINTS.LEARNING.HOME);
  }

  getCategories(): Observable<Result<LearningItemsResponse<LearningCategory>>> {
    return this.apiService.get(ENDPOINTS.LEARNING.CATEGORIES);
  }

  getCoursesByCategory(
    request: CoursesByCategoryRequest
  ): Observable<Result<LearningItemsResponse<LearningCourse>>> {
    return this.apiService.post(ENDPOINTS.LEARNING.COURSES_BY_CATEGORY, request);
  }

  getCoursesByLevel(
    request: CoursesByLevelRequest
  ): Observable<Result<LearningItemsResponse<LearningCourse>>> {
    return this.apiService.post(ENDPOINTS.LEARNING.COURSES_BY_LEVEL, request);
  }

  getCourseDetail(request: CourseDetailRequest): Observable<Result<LearningCourseDetail>> {
    return this.apiService.post(ENDPOINTS.LEARNING.COURSE_DETAIL, request);
  }

  getLessonDetail(request: LessonRequest): Observable<Result<LearningLesson>> {
    return this.apiService.post(ENDPOINTS.LEARNING.LESSON_DETAIL, request);
  }

  startLesson(request: LessonRequest): Observable<Result<LessonProgressResponse>> {
    return this.apiService.post(ENDPOINTS.LEARNING.START_LESSON, request);
  }

  completeLesson(request: LessonRequest): Observable<Result<LessonProgressResponse>> {
    return this.apiService.post(ENDPOINTS.LEARNING.COMPLETE_LESSON, request);
  }

  getQuizDetail(request: LessonRequest): Observable<Result<QuizDetailResponse>> {
    return this.apiService.post(ENDPOINTS.LEARNING.QUIZ_DETAIL, request);
  }

  submitQuiz(request: SubmitQuizRequest): Observable<Result<SubmitQuizResponse>> {
    return this.apiService.post(ENDPOINTS.LEARNING.SUBMIT_QUIZ, request);
  }

  getRecommendations(): Observable<Result<LearningRecommendationsResponse>> {
    return this.apiService.get(ENDPOINTS.LEARNING.RECOMMENDATIONS);
  }

  getStats(): Observable<Result<LearningStatsResponse>> {
    return this.apiService.get(ENDPOINTS.LEARNING.STATS);
  }

  getQuestions(): Observable<Result<LearningQuestion[]>> {
    return this.apiService.get(ENDPOINTS.LEARNING.QUESTIONS);
  }
}
