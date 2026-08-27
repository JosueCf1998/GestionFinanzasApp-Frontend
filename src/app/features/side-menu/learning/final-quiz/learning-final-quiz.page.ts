import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { LearningQuizOption, LearningQuizQuestion, QuizDetailResponse, SubmitQuizResponse } from 'src/app/core/models/learning/learning.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { CompleteLessonUseCase } from 'src/app/core/use-cases/learning/complete-lesson.usecase';
import { GetQuizDetailUseCase } from 'src/app/core/use-cases/learning/get-quiz-detail.usecase';
import { SubmitQuizUseCase } from 'src/app/core/use-cases/learning/submit-quiz.usecase';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import 'src/app/core/utils/observable-extensions';

@Component({
  selector: 'app-learning-final-quiz', standalone: true,
  imports: [CommonModule, IonContent, IonHeader, PageLayoutComponent, ItemIconComponent, ButtonComponent],
  templateUrl: './learning-final-quiz.page.html', styleUrls: ['./learning-final-quiz.page.scss']
})
export class LearningFinalQuizPage implements OnInit, OnDestroy {
  questions: LearningQuizQuestion[] = [];
  selectedAnswers: Record<number, number> = {};
  currentIndex = 0;
  loading = true;
  submitting = false;
  errorMessage = '';
  result: SubmitQuizResponse | null = null;
  courseCompleted = false;
  passingScore = 70;
  private lessonId = 0;
  private courseId = 0;
  private temporary = false;
  private quizRequest?: Subscription;
  private submitRequest?: Subscription;
  private completeRequest?: Subscription;

  constructor(private readonly route: ActivatedRoute, private readonly navigationService: NavigationService,
    private readonly getQuizDetailUseCase: GetQuizDetailUseCase, private readonly submitQuizUseCase: SubmitQuizUseCase,
    private readonly completeLessonUseCase: CompleteLessonUseCase, private readonly alertService: AlertService) {}

  ngOnInit(): void {
    this.lessonId = Number(this.route.snapshot.paramMap.get('id'));
    this.courseId = Number(this.route.snapshot.queryParamMap.get('courseId')) || 0;
    this.passingScore = Number(this.route.snapshot.queryParamMap.get('passingScore')) || 70;
    if (!Number.isInteger(this.lessonId) || this.lessonId <= 0) { this.loading = false; this.errorMessage = 'El reto seleccionado no es válido.'; return; }
    this.loadQuiz();
  }
  ngOnDestroy(): void { this.quizRequest?.unsubscribe(); this.submitRequest?.unsubscribe(); this.completeRequest?.unsubscribe(); }
  get currentQuestion(): LearningQuizQuestion | null { return this.questions[this.currentIndex] ?? null; }
  get selectedOptionId(): number | null { return this.currentQuestion ? this.selectedAnswers[this.currentQuestion.id] ?? null : null; }
  get progress(): number { return this.questions.length ? (this.currentIndex + 1) / this.questions.length * 100 : 0; }

  back(): void { void this.navigationService.replace(`/learning/lessons/${this.lessonId}`); }
  retry(): void { this.loadQuiz(); }
  selectOption(id: number): void { if (this.currentQuestion && !this.submitting) this.selectedAnswers = { ...this.selectedAnswers, [this.currentQuestion.id]: id }; }
  previous(): void { if (this.currentIndex > 0 && !this.submitting) this.currentIndex -= 1; }
  continue(): void { if (!this.selectedOptionId) return; if (this.currentIndex < this.questions.length - 1) this.currentIndex += 1; else this.submit(); }
  retryQuiz(): void { this.currentIndex = 0; this.selectedAnswers = {}; this.result = null; }
  returnToCourse(): void { if (this.courseId) void this.navigationService.replace(`/learning/courses/${this.courseId}`); else this.back(); }
  optionText(option: LearningQuizOption): string { return option.text || option.option || option.label || option.content || `Opción ${option.id}`; }

  private loadQuiz(): void {
    this.quizRequest?.unsubscribe(); this.loading = true; this.errorMessage = ''; this.temporary = false;
    this.quizRequest = this.getQuizDetailUseCase.execute({ lesson_id: this.lessonId }).service({
      success: response => { this.loading = false; this.questions = this.normalize(response); if (!this.questions.length) void this.loadTemporaryQuiz(); },
      failure: () => { void this.loadTemporaryQuiz(); }
    });
  }
  private async loadTemporaryQuiz(): Promise<void> {
    try {
      const request = await fetch('assets/mocks/learning-final-quiz.json'); if (!request.ok) throw new Error();
      const response = await request.json() as QuizDetailResponse; this.questions = this.normalize(response); this.temporary = true;
      this.loading = false; this.errorMessage = this.questions.length ? '' : 'El cuestionario temporal no contiene preguntas.';
    } catch { this.loading = false; this.errorMessage = 'No pudimos cargar el reto final.'; }
  }
  private normalize(response: QuizDetailResponse | null): LearningQuizQuestion[] {
    if (!response?.has_quiz) return [];
    this.passingScore = response.passing_score || this.passingScore;
    const source = response.questions ?? response.quizzes ?? response.items ?? (response.quiz ? [response.quiz] : []);
    return source.map(question => ({ ...question, id: Number(question.id), options: (question.options ?? []).map(option => ({ ...option, id: Number(option.id) })) })).filter(question => question.id > 0 && question.options.length > 0);
  }
  private submit(): void {
    if (this.submitting || !this.questions.length) return;
    if (this.temporary) {
      const correct = this.questions.filter(question => this.selectedAnswers[question.id] === question.correct_option_id).length;
      const score = Math.round(correct / this.questions.length * 100); const passed = score >= this.passingScore;
      this.result = { passed, score, correct_answers: correct, total_questions: this.questions.length }; this.courseCompleted = passed; return;
    }
    this.submitting = true; this.submitRequest?.unsubscribe();
    this.submitRequest = this.submitQuizUseCase.execute({ lesson_id: this.lessonId, answers: this.questions.map(question => ({ quiz_id: question.id, option_id: this.selectedAnswers[question.id] })) }).service({
      success: result => { this.submitting = false; if (!result) return; this.result = result; if (result.passed) this.completeCourse(); },
      failure: error => { this.submitting = false; void this.alertService.showAlert('No pudimos revisar tus respuestas', error?.message || 'Inténtalo nuevamente.', 'Entendido'); }
    });
  }
  private completeCourse(): void {
    this.submitting = true; this.completeRequest?.unsubscribe();
    this.completeRequest = this.completeLessonUseCase.execute({ lesson_id: this.lessonId }).service({
      success: () => { this.submitting = false; this.courseCompleted = true; },
      failure: error => { this.submitting = false; void this.alertService.showAlert('Quiz aprobado', error?.message || 'No pudimos actualizar el curso.', 'Entendido'); }
    });
  }
}
