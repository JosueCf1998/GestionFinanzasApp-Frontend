import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ENDPOINTS } from 'src/app/core/constants/endpoints';
import {
  CourseDetailRequest,
  CompleteCourseRequest,
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
  QuizDetailRequest,
  QuizDetailApiResponse,
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
    return this.apiService.post(ENDPOINTS.LEARNING.COURSES_BY_CATEGORY, {
      category_id: request.categoryId
    });
  }

  getCoursesByLevel(
    request: CoursesByLevelRequest
  ): Observable<Result<LearningItemsResponse<LearningCourse>>> {
    return this.apiService.post(ENDPOINTS.LEARNING.COURSES_BY_LEVEL, request);
  }

  getCourseDetail(request: CourseDetailRequest): Observable<Result<LearningCourseDetail>> {
    return this.apiService.post(ENDPOINTS.LEARNING.COURSE_DETAIL, {
      course_id: request.courseId
    });
  }

  getLessonDetail(request: LessonRequest): Observable<Result<LearningLesson>> {
    return this.apiService.post(ENDPOINTS.LEARNING.LESSON_DETAIL, {
      lesson_id: request.lessonId
    });
  }

  completeCourse(request: CompleteCourseRequest): Observable<Result<LessonProgressResponse>> {
    return this.apiService.post(ENDPOINTS.LEARNING.COMPLETE_COURSE, {
      course_id: request.courseId
    });
  }

  getQuizDetail(request: QuizDetailRequest): Observable<Result<QuizDetailResponse>> {
    return this.apiService
      .post<QuizDetailApiResponse>(ENDPOINTS.LEARNING.QUIZ_DETAIL, {
        course_id: request.courseId
      })
      .pipe(map(result => ({
        ...result,
        data: result.data ? this.mapQuizDetail(result.data) : null
      })));
  }

  submitQuiz(request: SubmitQuizRequest): Observable<Result<SubmitQuizResponse>> {
    return this.apiService.post(ENDPOINTS.LEARNING.SUBMIT_QUIZ, {
      course_id: request.courseId,
      answers: request.answers.map(answer => ({
        quiz_id: answer.quizId,
        option_id: answer.optionId
      }))
    });
  }

  getRecommendations(): Observable<Result<LearningRecommendationsResponse>> {
    return this.apiService.get(ENDPOINTS.LEARNING.RECOMMENDATIONS);
  }

  getStats(): Observable<Result<LearningStatsResponse>> {
    return this.apiService.get(ENDPOINTS.LEARNING.STATS);
  }

  getQuestions(): Observable<Result<LearningQuestion[]>> {
    return this.apiService.get(ENDPOINTS.LEARNING.FAQ);
  }

  private mapQuizDetail(response: QuizDetailApiResponse): QuizDetailResponse {
    const questions = (response.questions ?? []).map(question => ({
      id: Number(question.quiz_id),
      question: question.question,
      options: (question.options ?? []).map(option => ({
        id: Number(option.option_id),
        text: option.text
      }))
    }));

    return {
      courseId: Number(response.course_id),
      passingScore: Number(response.passing_score),
      requiredCorrectAnswers: Number(response.required_correct_answers),
      totalQuestions: Number(response.total_questions),
      passed: Boolean(response.passed),
      hasQuiz: Boolean(response.has_quiz),
      questions
    };
  }
}
