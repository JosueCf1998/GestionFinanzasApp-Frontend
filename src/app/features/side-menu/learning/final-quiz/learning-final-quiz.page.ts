import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { LearningQuizOption, LearningQuizQuestion, QuizDetailResponse, SubmitQuizResponse } from 'src/app/core/models/learning/learning.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { CompleteCourseUseCase } from 'src/app/core/use-cases/learning/complete-course.usecase';
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
  private quizRequest?: Subscription;
  private submitRequest?: Subscription;
  private completeRequest?: Subscription;
  private spinnerVisible = false;

  constructor(private readonly route: ActivatedRoute, private readonly navigationService: NavigationService,
    private readonly getQuizDetailUseCase: GetQuizDetailUseCase, private readonly submitQuizUseCase: SubmitQuizUseCase,
    private readonly completeCourseUseCase: CompleteCourseUseCase, private readonly alertService: AlertService,
    private readonly loadingService: SpinnerService) {}

  ngOnInit(): void {
    this.lessonId = Number(this.route.snapshot.paramMap.get('id'));
    this.courseId = Number(this.route.snapshot.queryParamMap.get('courseId')) || 0;
    this.passingScore = Number(this.route.snapshot.queryParamMap.get('passingScore')) || 70;
    if (!Number.isInteger(this.lessonId) || this.lessonId <= 0 || !Number.isInteger(this.courseId) || this.courseId <= 0) {
      this.loading = false;
      this.errorMessage = 'El reto o el curso seleccionado no es válido.';
      return;
    }
    this.loadQuiz();
  }
  ngOnDestroy(): void { this.quizRequest?.unsubscribe(); this.submitRequest?.unsubscribe(); this.completeRequest?.unsubscribe(); this.hideSpinner(); }
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
  optionText(option: LearningQuizOption): string { return option.text || `Opción ${option.id}`; }

  private loadQuiz(): void {
    this.quizRequest?.unsubscribe(); this.loading = true; this.errorMessage = '';
    this.showSpinner();
    this.quizRequest = this.getQuizDetailUseCase.execute({ courseId: this.courseId }).service({
      success: response => {
        this.hideSpinner();
        this.loading = false;
        this.questions = this.normalize(response);
        if (!this.questions.length) {
          this.errorMessage = response?.hasQuiz
            ? 'El reto final no contiene preguntas disponibles.'
            : 'Este curso no tiene un reto final activo.';
        }
      },
      failure: error => {
        this.hideSpinner();
        this.loading = false;
        this.questions = [];
        this.errorMessage = error?.message || 'No pudimos cargar el reto final.';
      }
    });
  }
  private normalize(response: QuizDetailResponse | null): LearningQuizQuestion[] {
    if (!response?.hasQuiz) return [];
    this.passingScore = response.passingScore || this.passingScore;
    return response.questions.filter(question => question.id > 0 && question.options.length > 0);
  }
  private submit(): void {
    if (this.submitting || !this.questions.length) return;
    this.submitting = true; this.submitRequest?.unsubscribe();
    this.showSpinner();
    this.submitRequest = this.submitQuizUseCase.execute({ courseId: this.courseId, answers: this.questions.map(question => ({ quizId: question.id, optionId: this.selectedAnswers[question.id] })) }).service({
      success: result => { this.submitting = false; if (!result) { this.hideSpinner(); return; } this.result = result; if (result.passed) this.completeCourse(); else this.hideSpinner(); },
      failure: error => { this.hideSpinner(); this.submitting = false; void this.alertService.showAlert('No pudimos revisar tus respuestas', error?.message || 'Inténtalo nuevamente.', 'Entendido'); }
    });
  }
  private completeCourse(): void {
    this.submitting = true; this.completeRequest?.unsubscribe();
    this.completeRequest = this.completeCourseUseCase.execute({ courseId: this.courseId }).service({
      success: () => { this.hideSpinner(); this.submitting = false; this.courseCompleted = true; },
      failure: error => { this.hideSpinner(); this.submitting = false; void this.alertService.showAlert('Quiz aprobado', error?.message || 'No pudimos actualizar el curso.', 'Entendido'); }
    });
  }

  private showSpinner(): void { if (!this.spinnerVisible) { this.spinnerVisible = true; this.loadingService.show(); } }
  private hideSpinner(): void { if (this.spinnerVisible) { this.spinnerVisible = false; this.loadingService.hide(); } }
}
