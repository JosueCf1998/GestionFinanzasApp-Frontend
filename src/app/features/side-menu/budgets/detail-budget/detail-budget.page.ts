import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import {
  BUDGET_STATUS_LABELS,
  BudgetListItem,
  BudgetStatus
} from 'src/app/core/models/budgets/list-budgets.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { DetailBudgetUseCase } from 'src/app/core/use-cases/budgets/detail-budget.usecase';
import { InfoBannerComponent } from 'src/app/shared/components/info-banner/info-banner.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { WarningMessageComponent } from 'src/app/shared/components/warning-message/warning-message.component';
import { BudgetSummaryCardComponent } from 'src/app/shared/components/budget-summary-card/budget-summary-card.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import 'src/app/core/utils/observable-extensions';

interface BudgetAccount {
  id: number;
  name: string;
  typeLabel: string;
  icon: string;
  color: string;
}

interface CategoryBudget {
  id: number;
  name: string;
  icon: string;
  color: string;
  budgeted: number;
  used: number;
  percentage: number;
  status: BudgetStatus;
}

interface DetailBudgetNavigationState {
  budget?: BudgetListItem;
  currency?: string;
  dateRangeLabel?: string;
}

@Component({
  selector: 'app-detail-budget',
  templateUrl: './detail-budget.page.html',
  styleUrls: ['./detail-budget.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    InfoBannerComponent,
    ItemIconComponent,
    PageLayoutComponent,
    WarningMessageComponent,
    BudgetSummaryCardComponent,
    SectionCardComponent
  ]
})
export class DetailBudgetPage implements OnInit {
  budget: BudgetListItem = {
    id: 0,
    name: 'Presupuesto',
    icon: 'wallet',
    color: '#283593',
    budgeted: 0,
    used: 0,
    percentage: 0,
    status: 'ON_TRACK'
  };

  currency = 'PEN';
  dateRangeLabel = 'Periodo seleccionado';

  // Datos temporales hasta integrar el endpoint de detalle del presupuesto.
  readonly budgetAccounts: BudgetAccount[] = [
    { id: 1, name: 'Cuenta principal', typeLabel: 'Cuenta de ahorros', icon: 'bank', color: '#4361ee' },
    { id: 2, name: 'Efectivo', typeLabel: 'Dinero en efectivo', icon: 'wallet', color: '#8b5cf6' }
  ];

  readonly categoryBudgets: CategoryBudget[] = [
    { id: 1, name: 'Alimentación', icon: 'restaurant', color: '#f59e0b', budgeted: 800, used: 640, percentage: 80, status: 'ON_TRACK' },
    { id: 2, name: 'Transporte', icon: 'bus', color: '#8b5cf6', budgeted: 400, used: 380, percentage: 95, status: 'WARNING' },
    { id: 3, name: 'Vivienda', icon: 'home', color: '#4361ee', budgeted: 700, used: 700, percentage: 100, status: 'WARNING' },
    { id: 4, name: 'Entretenimiento', icon: 'gym', color: '#ec4899', budgeted: 250, used: 340, percentage: 136, status: 'EXCEEDED' }
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly navService: NavigationService,
    private readonly detailBudgetUseCase: DetailBudgetUseCase,
    private readonly loadingService: SpinnerService
  ) {}

  // MARK: - CICLO DE VIDA

  ngOnInit(): void {
    const state = window.history.state as DetailBudgetNavigationState;
    if (state.budget) this.budget = { ...state.budget };
    this.budget.id = Number(this.route.snapshot.paramMap.get('id')) || this.budget.id;
    if (state.currency) this.currency = state.currency;
    if (state.dateRangeLabel) this.dateRangeLabel = state.dateRangeLabel;
    this.loadBudgetDetail();
  }

  // MARK: - SERVICIOS

  private loadBudgetDetail(): void {
    if (this.budget.id <= 0) {
      console.error('No se puede consultar el detalle: ID de presupuesto inválido.');
      return;
    }

    const request = { id: String(this.budget.id) };
    console.log('Datos enviados al detalle del presupuesto:', request);
    this.loadingService.show();

    this.detailBudgetUseCase.execute(request).service({
      success: data => {
        this.loadingService.hide();
        console.log('Data del detalle del presupuesto:', data);
      },
      failure: error => {
        this.loadingService.hide();
        console.error('Error al consultar el detalle del presupuesto:', error);
      }
    });
  }

  // MARK: - PRESENTACIÓN

  get statusLabel(): string {
    return BUDGET_STATUS_LABELS[this.budget.status];
  }

  get availableAmount(): number {
    return Math.max(this.budget.budgeted - this.budget.used, 0);
  }

  get exceededAmount(): number {
    return Math.max(this.budget.used - this.budget.budgeted, 0);
  }

  get isExceeded(): boolean {
    return this.budget.status === 'EXCEEDED';
  }

  get adviceMessage(): string {
    if (this.isExceeded) {
      return 'Revisa las categorías con mayor consumo y ajusta su distribución para el siguiente periodo.';
    }

    if (this.budget.status === 'WARNING') {
      return 'Estás cerca del límite. Revisa tus movimientos antes de realizar nuevos gastos.';
    }

    return 'Tu presupuesto se mantiene dentro de lo planificado para este periodo.';
  }

  categoryStatusLabel(status: BudgetStatus): string {
    return BUDGET_STATUS_LABELS[status];
  }

  // MARK: - NAVEGACIÓN

  backToBudgets(): void {
    void this.navService.back();
  }

  // MARK: - TRACKING

  trackByAccount(_: number, account: BudgetAccount): number {
    return account.id;
  }

  trackByCategory(_: number, category: CategoryBudget): number {
    return category.id;
  }
}
