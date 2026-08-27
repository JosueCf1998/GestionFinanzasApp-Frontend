import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  LearningFeaturedCourse,
  LearningHomeCategory,
  LearningHomePath,
  LearningHomeResponse,
  LearningUserProgress
} from 'src/app/core/models/learning/learning.model';
import { GetLearningHomeUseCase } from 'src/app/core/use-cases/learning/get-learning-home.usecase';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { ItemImageComponent } from 'src/app/shared/components/item-image/item-image.component';

import 'src/app/core/utils/observable-extensions';

interface LearningCategoryView {
  id: number;
  value: string;
  label: string;
  icon: string;
}

interface FeaturedCourseView {
  id: number;
  title: string;
  description: string;
  image: string;
  progress: number;
}

interface LearningPath {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  lessons: number;
  progress: number;
  icon: string;
  color: string;
}

const PATH_COLORS = ['#20b26b', '#6d43e5', '#4b8df8'];

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ItemIconComponent,
    ItemImageComponent,
    ButtonComponent,
    EmptyStateComponent
  ],
  templateUrl: './learning.page.html',
  styleUrls: ['./learning.page.scss']
})
export class LearningPage implements OnInit {

  // MARK: - ESTADO DE LA VISTA

  errorMessage = '';
  selectedCategory = '';
  featuredCourse: FeaturedCourseView | null = null;
  financialLevel = 'Sin nivel';
  currentXp = 0;
  nextLevelXp = 1000;
  streakDays = 0;
  categories: LearningCategoryView[] = [];
  allPaths: LearningPath[] = [];
  paths: LearningPath[] = [];

  constructor(
    private readonly getLearningHomeUseCase: GetLearningHomeUseCase,
    private readonly navigationService: NavigationService,
    public readonly loadingService: SpinnerService
  ) {}

  // MARK: - ACCIONES Y CICLO DE VIDA

  ngOnInit(): void {
    this.loadHome();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterPaths();
  }

  retry(): void {
    this.loadHome();
  }

  openQuestions(): void {
    void this.navigationService.push('/learning/questions');
  }

  openCourse(courseId: number): void {
    void this.navigationService.push(`/learning/courses/${courseId}`);
  }

  get xpPercentage(): number {
    return this.clamp((this.currentXp / Math.max(this.nextLevelXp, 1)) * 100);
  }

  // MARK: - SERVICIOS

  private loadHome(): void {
    this.loadingService.show();
    this.errorMessage = '';
    this.getLearningHomeUseCase.execute()
      .service({
        success: data => {
          this.loadingService.hide();
          if (!data) {
            this.errorMessage = 'No pudimos cargar tu contenido de aprendizaje.';
            return;
          }
          this.mapHomeResponse(data);
        },
        failure: error => {
          this.loadingService.hide();
          this.errorMessage = error?.message
            || 'No pudimos cargar tu contenido de aprendizaje.';
        }
      });
  }

  // MARK: - MAPEO Y UTILIDADES

  private mapHomeResponse(data: LearningHomeResponse): void {
    this.mapProgress(data.user_progress);
    this.featuredCourse = this.mapFeaturedCourse(data.featured_course);
    this.categories = this.mapCategories(data.categories);
    this.selectedCategory = this.categories[0]?.value ?? '';
    this.allPaths = this.mapLearningPaths(data.learning_paths);
    this.filterPaths();
  }

  private mapFeaturedCourse(course: LearningFeaturedCourse | null): FeaturedCourseView | null {
    if (!course) return null;

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      image: course.image_url.split('/').pop()?.split('.')[0] ?? '',
      progress: this.clamp(course.progress)
    };
  }

  private mapProgress(progress: LearningUserProgress): void {
    this.financialLevel = progress.level;
    this.currentXp = progress.xp;
    this.nextLevelXp = progress.next_level_xp;
    this.streakDays = progress.streak;
  }

  private mapCategories(categories: LearningHomeCategory[]): LearningCategoryView[] {
    return [
      {
        id: 0,
        value: 'all',
        label: 'Todo',
        icon: 'category'
      },
      ...categories.map(category => ({
        id: category.id,
        value: String(category.id),
        label: category.name,
        icon: category.icon
      }))
    ];
  }

  private mapLearningPaths(paths: LearningHomePath[]): LearningPath[] {
    return paths.map((path, index) => ({
      id: path.id,
      categoryId: path.id_categories,
      title: path.title,
      description: path.description,
      lessons: path.lessons,
      progress: this.clamp(path.progress),
      icon: this.resolveCourseIcon(path.title),
      color: PATH_COLORS[index % PATH_COLORS.length]
    }));
  }

  private filterPaths(): void {
    if (this.selectedCategory === 'all') {
      this.paths = [...this.allPaths];
      return;
    }

    const categoryId = Number(this.selectedCategory);
    this.paths = this.allPaths.filter(path => path.categoryId === categoryId);
  }

  private clamp(value: number): number {
    return Math.min(100, Math.max(0, value));
  }

  private resolveCourseIcon(title: string): string {
    const value = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (value.includes('presupuesto') || value.includes('50/30/20')) return 'chart-pie';
    if (value.includes('ahorro') || value.includes('fondo')) return 'pig-piggy-bank';
    if (value.includes('deuda')) return 'bills';
    if (value.includes('invertir') || value.includes('inversion')) return 'up-trend';
    return 'study';
  }

}
