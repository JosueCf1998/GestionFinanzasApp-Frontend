import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { LearningLesson, LearningLessonContent, LearningLessonContentSection } from 'src/app/core/models/learning/learning.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
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
  private lessonId: number | null = null;
  private request?: Subscription;

  constructor(private readonly route: ActivatedRoute, private readonly navigationService: NavigationService,
    private readonly getLessonDetailUseCase: GetLessonDetailUseCase,
    public readonly loadingService: SpinnerService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!Number.isInteger(id) || id <= 0) { this.errorMessage = 'La lección seleccionada no es válida.'; return; }
      this.lessonId = id; this.loadLesson(id);
    });
  }
  ngOnDestroy(): void { this.request?.unsubscribe(); this.loadingService.hide(); }
  get progressPercentage(): number { return this.lesson?.total_lessons ? Math.min(100, Math.max(0, this.lesson.number / this.lesson.total_lessons * 100)) : 0; }
  back(): void { if (this.lesson?.course_id) void this.navigationService.replace(`/learning/courses/${this.lesson.course_id}`); else void this.navigationService.back(); }
  retry(): void { if (this.lessonId) this.loadLesson(this.lessonId); }
  goToLesson(id?: number): void { if (id) void this.navigationService.push(`/learning/lessons/${id}`); }

  goToNextLesson(): void {
    if (!this.lesson) return;
    const nextId = this.lesson.next_lesson?.id;
    if (!nextId) {
      if (this.lesson.quiz.available) {
        const query = `courseId=${this.lesson.course_id}&totalLessons=${this.lesson.total_lessons}&passingScore=${this.lesson.quiz.passing_score}`;
        void this.navigationService.push(`/learning/quiz/${this.lesson.id}?${query}`);
      }
      return;
    }
    void this.navigationService.push(`/learning/lessons/${nextId}`);
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
