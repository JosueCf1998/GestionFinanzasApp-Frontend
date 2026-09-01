import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { LearningLesson, LearningLessonContent, LearningLessonContentSection } from 'src/app/core/models/learning/learning.model';
import { AlertService } from 'src/app/core/services/alert.service';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { CompleteCourseUseCase } from 'src/app/core/use-cases/learning/complete-course.usecase';
import { GetLessonDetailUseCase } from 'src/app/core/use-cases/learning/get-lesson-detail.usecase';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { LessonContentRendererComponent } from 'src/app/shared/components/lesson-content/lesson-content-renderer.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import 'src/app/core/utils/observable-extensions';

@Component({
  selector: 'app-learning-lesson-detail', standalone: true,
  imports: [CommonModule, IonContent, IonHeader, PageLayoutComponent, ItemIconComponent, ButtonComponent, EmptyStateComponent, LessonContentRendererComponent],
  templateUrl: './learning-lesson-detail.page.html', styleUrls: ['./learning-lesson-detail.page.scss']
})
export class LearningLessonDetailPage implements OnInit, OnDestroy {
  lesson: LearningLesson | null = null;
  contentSections: LearningLessonContentSection[] = [];
  errorMessage = '';
  completingLesson = false;
  private lessonId: number | null = null;
  private request?: Subscription;
  private completeRequest?: Subscription;

  constructor(private readonly route: ActivatedRoute, private readonly navigationService: NavigationService,
    private readonly getLessonDetailUseCase: GetLessonDetailUseCase,
    private readonly completeCourseUseCase: CompleteCourseUseCase,
    private readonly alertService: AlertService,
    public readonly loadingService: SpinnerService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!Number.isInteger(id) || id <= 0) { this.errorMessage = 'La lección seleccionada no es válida.'; return; }
      this.lessonId = id; this.loadLesson(id);
    });
  }
  ngOnDestroy(): void { this.request?.unsubscribe(); this.completeRequest?.unsubscribe(); this.loadingService.hide(); }
  get progressPercentage(): number { return this.lesson?.total_lessons ? Math.min(100, Math.max(0, this.lesson.number / this.lesson.total_lessons * 100)) : 0; }
  back(): void { if (this.lesson?.course_id) void this.navigationService.replace(`/learning/courses/${this.lesson.course_id}`); else void this.navigationService.back(); }
  retry(): void { if (this.lessonId) this.loadLesson(this.lessonId); }
  goToLesson(id?: number): void { if (id) void this.navigationService.push(`/learning/lessons/${id}`); }

  goToNextLesson(): void {
    if (!this.lesson || this.completingLesson) return;

    const currentLesson = this.lesson;
    this.completingLesson = true;
    this.loadingService.show();
    this.completeRequest?.unsubscribe();
    this.completeRequest = this.completeCourseUseCase.execute({ courseId: currentLesson.course_id }).service({
      success: () => {
        this.completingLesson = false;
        this.loadingService.hide();
        this.openFollowingContent(currentLesson);
      },
      failure: error => {
        this.completingLesson = false;
        this.loadingService.hide();
        void this.alertService.showAlert(
          'No pudimos completar la lección',
          error?.message || 'Inténtalo nuevamente.',
          'Entendido'
        );
      }
    });
  }

  private openFollowingContent(lesson: LearningLesson): void {
    const nextId = lesson.next_lesson?.id;
    if (nextId) {
      // El cambio de parámetro vuelve a ejecutar loadLesson y consulta lessons/detail.
      void this.navigationService.replace(`/learning/lessons/${nextId}`);
      return;
    }

    if (lesson.quiz.available) {
      const query = `courseId=${lesson.course_id}&totalLessons=${lesson.total_lessons}&passingScore=${lesson.quiz.passing_score}`;
      void this.navigationService.replace(`/learning/quiz/${lesson.id}?${query}`);
    }
  }

  private loadLesson(id: number): void {
    this.request?.unsubscribe(); this.loadingService.show(); this.errorMessage = ''; this.lesson = null;
    this.request = this.getLessonDetailUseCase.execute({ lessonId: id }).service({
      success: lesson => {
        this.loadingService.hide();
        if (!lesson) { this.errorMessage = 'No pudimos encontrar la lección solicitada.'; return; }
        this.lesson = { ...lesson, contents: [...(lesson.contents ?? [])].sort((a, b) => a.sort_order - b.sort_order) };
        this.contentSections = this.buildSections(this.lesson.contents);
      },
      failure: error => { this.loadingService.hide(); this.errorMessage = error?.message || 'No pudimos cargar la lección.'; }
    });
  }
  private buildSections(contents: LearningLessonContent[]): LearningLessonContentSection[] {
    const sections: LearningLessonContentSection[] = [];
    for (const item of contents) {
      if (item.type === 'INFO' || item.type === 'WARNING') {
        const type = item.type === 'INFO' ? 'INFO_GROUP' : 'WARNING_GROUP'; const previous = sections[sections.length - 1];
        if (previous?.type === type) previous.items?.push(item); else sections.push({ id: item.id, type, items: [item] });
      } else sections.push({ id: item.id, type: item.type, item });
    }
    return sections;
  }
}
