import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import {
  LearningCourseDetail,
  LearningCourseLesson,
  LearningLessonStatus
} from 'src/app/core/models/learning/learning.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { GetCourseDetailUseCase } from 'src/app/core/use-cases/learning/get-course-detail.usecase';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { ItemImageComponent } from 'src/app/shared/components/item-image/item-image.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import 'src/app/core/utils/observable-extensions';

const STATUS_LABELS: Record<LearningLessonStatus, string> = {
  NOT_STARTED: 'No iniciada',
  IN_PROGRESS: 'En progreso',
  COMPLETED: 'Completada'
};

@Component({
  selector: 'app-learning-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    PageLayoutComponent,
    ItemIconComponent,
    ItemImageComponent,
    ButtonComponent,
    EmptyStateComponent
  ],
  templateUrl: './learning-course-detail.page.html',
  styleUrls: ['./learning-course-detail.page.scss']
})
export class LearningCourseDetailPage implements OnInit, OnDestroy {
  course: LearningCourseDetail | null = null;
  activeLesson: LearningCourseLesson | null = null;
  errorMessage = '';
  courseImage = '';
  levelLabel = '';

  private courseId: number | null = null;
  private courseRequest?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly getCourseDetailUseCase: GetCourseDetailUseCase,
    public readonly loadingService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(this.courseId) || this.courseId <= 0) {
      this.errorMessage = 'El curso seleccionado no es válido.';
      return;
    }
    this.loadCourse(this.courseId);
  }

  ngOnDestroy(): void {
    this.courseRequest?.unsubscribe();
    this.loadingService.hide();
  }

  back(): void {
    void this.navigationService.back();
  }

  retry(): void {
    if (this.courseId) this.loadCourse(this.courseId);
  }

  selectLesson(lesson: LearningCourseLesson): void {
    if (!this.canOpenLesson(lesson)) return;
    void this.navigationService.push(`/learning/lessons/${lesson.id}`);
  }

  canOpenLesson(lesson: LearningCourseLesson): boolean {
    return lesson.status === 'COMPLETED' || this.activeLesson?.id === lesson.id;
  }

  lessonStatusLabel(status: LearningLessonStatus): string {
    return STATUS_LABELS[status];
  }

  lessonActionLabel(lesson: LearningCourseLesson): string {
    return lesson.status === 'IN_PROGRESS' ? 'Continuar' : 'Empezar';
  }

  private loadCourse(courseId: number): void {
    this.courseRequest?.unsubscribe();
    this.loadingService.show();
    this.errorMessage = '';
    this.course = null;
    this.activeLesson = null;
    this.courseRequest = this.getCourseDetailUseCase.execute({ courseId }).service({
      success: course => {
        this.loadingService.hide();
        if (!course) {
          this.errorMessage = 'No pudimos encontrar el curso solicitado.';
          return;
        }
        const normalizedCourse: LearningCourseDetail = {
          ...course,
          progress: {
            ...course.progress,
            percentage: this.clamp(course.progress.percentage)
          },
          lessons: [...course.lessons].sort((a, b) => a.number - b.number)
        };
        this.course = normalizedCourse;
        this.courseImage = this.resolveImageName(normalizedCourse.image_url);
        this.levelLabel = this.formatLevel(normalizedCourse.level);
        this.activeLesson = normalizedCourse.lessons.find(lesson => lesson.status === 'IN_PROGRESS')
          ?? normalizedCourse.lessons.find(lesson => lesson.status === 'NOT_STARTED')
          ?? null;
      },
      failure: error => {
        this.loadingService.hide();
        this.errorMessage = error?.message || 'No pudimos cargar el detalle del curso.';
      }
    });
  }

  private clamp(value: number): number {
    return Math.min(100, Math.max(0, value));
  }

  private resolveImageName(imageUrl: string): string {
    return imageUrl.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
  }

  private formatLevel(level: string): string {
    return level ? level.charAt(0) + level.slice(1).toLowerCase() : '';
  }
}
