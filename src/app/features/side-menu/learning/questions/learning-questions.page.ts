import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { LearningQuestion } from 'src/app/core/models/learning/learning.model';
import { ListLearningQuestionsUseCase } from 'src/app/core/use-cases/learning/list-learning-questions.usecase';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { ListSkeletonComponent } from 'src/app/shared/components/list-skeleton/list-skeleton.component';
import 'src/app/core/utils/observable-extensions';

interface QuestionCategory {
  value: string;
  label: string;
  icon: string;
}

// Datos temporales mientras el endpoint de preguntas no esté disponible.
const TEMPORARY_QUESTIONS: LearningQuestion[] = [
  {
    id: 1,
    category: 'budget',
    question: '¿Qué es la regla 50/30/20?',
    answer: 'Divide tus ingresos: 50% para necesidades, 30% para deseos y 20% para ahorro o pago de deudas.',
    icon: 'chart-pie',
    color: '#6d43e5'
  },
  {
    id: 2,
    category: 'saving',
    question: '¿Cuánto debe tener mi fondo de emergencia?',
    answer: 'Procura reunir entre tres y seis meses de tus gastos esenciales y mantenlos en una cuenta de fácil acceso.',
    icon: 'pig-piggy-bank',
    color: '#20b26b'
  },
  {
    id: 3,
    category: 'debt',
    question: '¿Qué deuda debería pagar primero?',
    answer: 'Prioriza las deudas con mayor tasa de interés, sin dejar de cubrir los pagos mínimos de las demás.',
    icon: 'card-credit',
    color: '#f28b22'
  },
  {
    id: 4,
    category: 'investment',
    question: '¿Es mejor ahorrar o invertir?',
    answer: 'Primero crea un fondo de emergencia. Después puedes invertir el dinero destinado a objetivos de mediano y largo plazo.',
    icon: 'up-trend',
    color: '#4b8df8'
  }
];

@Component({
  selector: 'app-learning-questions',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, ButtonComponent, ItemIconComponent, ListSkeletonComponent, PageLayoutComponent],
  templateUrl: './learning-questions.page.html',
  styleUrls: ['./learning-questions.page.scss']
})
export class LearningQuestionsPage implements OnInit {
  search = '';
  selectedCategory = 'all';
  expandedQuestionId: number | null = null;
  loading = false;
  errorMessage = '';

  readonly categories: QuestionCategory[] = [
    { value: 'all', label: 'Todas', icon: 'category' },
    { value: 'budget', label: 'Presupuesto', icon: 'chart-pie' },
    { value: 'saving', label: 'Ahorro', icon: 'pig-piggy-bank' },
    { value: 'debt', label: 'Deudas', icon: 'card-credit' },
    { value: 'investment', label: 'Inversión', icon: 'up-trend' }
  ];

  questions: LearningQuestion[] = [];

  constructor(
    private readonly navigationService: NavigationService,
    private readonly listLearningQuestionsUseCase: ListLearningQuestionsUseCase
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  get filteredQuestions(): LearningQuestion[] {
    const term = this.search.trim().toLowerCase();
    return this.questions.filter(question =>
      (this.selectedCategory === 'all' || question.category === this.selectedCategory)
      && (!term || `${question.question} ${question.answer}`.toLowerCase().includes(term))
    );
  }

  back(): void {
    void this.navigationService.back();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  toggleQuestion(id: number): void {
    this.expandedQuestionId = this.expandedQuestionId === id ? null : id;
  }

  retry(): void {
    this.loadQuestions();
  }

  questionIcon(question: LearningQuestion): string {
    if (question.icon) return question.icon;
    return this.categories.find(category => category.value === question.category)?.icon ?? 'question';
  }

  questionColor(question: LearningQuestion): string {
    if (question.color) return question.color;
    return { budget: '#6d43e5', saving: '#20b26b', debt: '#f28b22', investment: '#4b8df8' }[question.category] ?? '#6d43e5';
  }

  private loadQuestions(): void {
    this.loading = true;
    this.errorMessage = '';

    this.listLearningQuestionsUseCase.execute().service({
      success: questions => {
        this.loading = false;
        this.questions = questions ?? [];
      },
      failure: () => {
        this.loading = false;
        this.questions = [...TEMPORARY_QUESTIONS];
        this.errorMessage = '';
      }
    });
  }
}
