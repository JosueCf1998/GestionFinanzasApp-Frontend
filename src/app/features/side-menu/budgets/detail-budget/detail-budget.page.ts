import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import {
  BUDGET_STATUS_LABELS,
  BudgetListItem,
  BudgetStatus
} from 'src/app/core/models/budgets/list-budgets.model';
import {
  BudgetAlert,
  BudgetAvailableActions,
  DetailBudgetApiResponse
} from 'src/app/core/models/budgets/detail-budget.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { DetailBudgetUseCase } from 'src/app/core/use-cases/budgets/detail-budget.usecase';
import {
  SelectionSummaryComponent,
  SelectionSummaryItem
} from 'src/app/shared/components/selection-summary/selection-summary.component';
import {
  AccountDetailsItem,
  AccountDetailsModalComponent
} from 'src/app/shared/components/account-details-modal/account-details-modal.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { WarningMessageComponent } from 'src/app/shared/components/warning-message/warning-message.component';
import { BudgetSummaryCardComponent } from 'src/app/shared/components/budget-summary-card/budget-summary-card.component';
import { ProgressListItemComponent } from 'src/app/shared/components/progress-list-item/progress-list-item.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { CURRENCIES, CurrencyCode } from 'src/app/shared/models/currency.model';
import 'src/app/core/utils/observable-extensions';

export interface CategoryBudget {
  id: number;
  name: string;
  icon: string;
  color: string;
  budgeted: number;
  used: number;
  remaining: number;
  percentage: number;
  status: BudgetStatus;
}

interface BudgetAccount extends SelectionSummaryItem, AccountDetailsItem {}

interface DetailBudgetNavigationState {
  budget?: BudgetListItem;
  currency?: CurrencyCode;
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
    SelectionSummaryComponent,
    AccountDetailsModalComponent,
    PageLayoutComponent,
    WarningMessageComponent,
    BudgetSummaryCardComponent,
    ProgressListItemComponent,
    SectionCardComponent,
    ItemIconComponent
  ]
})
export class DetailBudgetPage implements OnInit, OnDestroy {
  private budgetDetailRequest?: Subscription;

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

  currency: CurrencyCode = 'PEN';
  dateRangeLabel = 'Periodo seleccionado';
  startDate = '';
  endDate = '';
  budgetAccounts: BudgetAccount[] = [];
  isAccountDetailsModalOpen = false;
  categoryBudgets: CategoryBudget[] = [];
  alert: BudgetAlert | null = null;
  suggestion = '';
  notes = '';
  availableActions: BudgetAvailableActions | null = null;

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
  }

  ionViewWillEnter(): void {
    this.loadBudgetDetail();
  }

  ngOnDestroy(): void {
    this.budgetDetailRequest?.unsubscribe();
    this.loadingService.hide();
  }

  // MARK: - SERVICIOS

  private loadBudgetDetail(): void {
    if (this.budget.id <= 0) {
      return;
    }

    const request = { id: String(this.budget.id) };
    this.budgetDetailRequest?.unsubscribe();
    this.loadingService.show();

    this.budgetDetailRequest = this.detailBudgetUseCase.execute(request).service({
      success: data => {
        this.loadingService.hide();
        if (data) this.applyBudgetDetail(data);
      },
      failure: () => {
        this.loadingService.hide();
      }
    });
  }

  private applyBudgetDetail(data: DetailBudgetApiResponse): void {
    const detail = data.generalDetail;

    this.budget = {
      id: data.id,
      name: data.name,
      icon: data.icon,
      color: data.color,
      budgeted: detail.totalBudget,
      used: detail.totalSpent,
      percentage: detail.usagePercentage,
      status: detail.status
    };
    this.dateRangeLabel = `${this.formatDate(detail.startDate)} - ${this.formatDate(detail.endDate)}`;
    this.startDate = detail.startDate;
    this.endDate = detail.endDate;
    this.alert = data.alert;
    this.suggestion = data.suggestion;
    this.notes = detail.notes;
    this.availableActions = data.availableActions;
    this.budgetAccounts = data.linkedAccounts.map(account => ({
      id: account.id,
      name: account.name,
      amount: account.amount,
      icon: account.icon,
      color: account.color
    }));
    this.categoryBudgets = data.linkedCategories.map(category => ({
      id: category.id,
      name: category.name,
      icon: category.icon,
      color: category.color,
      budgeted: category.budgetAmount,
      used: category.spentAmount,
      remaining: category.remainingAmount,
      percentage: category.percentage,
      status: category.status
    }));
  }

  private formatDate(value: string): string {
    const [year, month, day] = value.split('-');
    return year && month && day ? `${day}/${month}/${year}` : value;
  }

  // MARK: - PRESENTACIÓN

  get statusLabel(): string {
    return BUDGET_STATUS_LABELS[this.budget.status];
  }

  get currencySymbol(): string {
    return CURRENCIES[this.currency].symbol;
  }

  get linkedAccountsTitle(): string {
    const count = this.budgetAccounts.length;
    return count === 1 ? '1 cuenta' : `${count} cuentas`;
  }

  get linkedAccountsLabel(): string {
    if (!this.budgetAccounts.length) return 'No hay cuentas vinculadas';

    const names = this.budgetAccounts.map(account => account.name);
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} y ${names[1]}`;

    return `${names[0]}, ${names[1]} y ${names.length - 2} más`;
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
    return this.suggestion || 'No hay sugerencias disponibles para este presupuesto.';
  }

  openAccountDetails(): void {
    if (this.budgetAccounts.length) this.isAccountDetailsModalOpen = true;
  }

  closeAccountDetails(): void {
    this.isAccountDetailsModalOpen = false;
  }

  openCategoryDetail(category: CategoryBudget): void {
    void this.navService.forward('/budgets/category/detail', {
      category,
      budgetName: this.budget.name,
      currency: this.currency,
      dateRangeLabel: this.dateRangeLabel,
      startDate: this.startDate,
      endDate: this.endDate
    });
  }

  // MARK: - NAVEGACIÓN

  backToBudgets(): void {
    void this.navService.back();
  }

  editBudget(): void {
    if (this.availableActions?.canEdit === false || this.budget.id <= 0) return;

    void this.navService.forward(`/budgets/${this.budget.id}/edit`);
  }

  // MARK: - TRACKING

  trackByCategory(_: number, category: CategoryBudget): number {
    return category.id;
  }
}
