import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  CreateBudgetRequest,
  CreateBudgetUseCase
} from 'src/app/core/use-cases/budgets/create-budget.usecase';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { TextFieldComponent } from 'src/app/shared/components/text-field/text-field.component';
import {
  AccountSelectionMode,
  AccountSelectorModalComponent
} from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import {
  CategoryBudgetAllocation,
  CategorySelectorModalComponent
} from 'src/app/shared/components/category-selector-modal/category-selector-modal.component';
import {
  PersonalizationModalComponent,
  PersonalizationValue
} from 'src/app/shared/components/personalization-modal/personalization-modal.component';
import {
  SelectionSummaryComponent,
  SelectionSummaryItem
} from 'src/app/shared/components/selection-summary/selection-summary.component';
import { Accounts, ListAccountsUseCase } from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import {
  CategoryResponse,
  ListCategoriesUseCase
} from 'src/app/core/use-cases/categories/list-categories.usecase';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { BudgetPreviewCardComponent } from 'src/app/shared/components/budget-preview-card/budget-preview-card.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { InfoBannerComponent } from 'src/app/shared/components/info-banner/info-banner.component';
import { WarningMessageComponent } from 'src/app/shared/components/warning-message/warning-message.component';
import { BudgetSuccessModalComponent } from 'src/app/shared/components/budget-success-modal/budget-success-modal.component';
import {
  FilterModalComponent,
  FilterSelection
} from 'src/app/shared/components/filter-modal/filter-modal.component';
import { CATEGORY_ICONS } from 'src/app/shared/constants/category-options';
import { PERSONALIZATION_COLORS } from 'src/app/shared/constants/personalization-options';
import 'src/app/core/utils/observable-extensions';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.page.html',
  styleUrls: ['./create-budget.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextFieldComponent,
    AccountSelectorModalComponent,
    CategorySelectorModalComponent,
    PersonalizationModalComponent,
    SelectionSummaryComponent,
    ButtonComponent,
    CustomAlertComponent,
    BudgetPreviewCardComponent,
    PageLayoutComponent,
    FilterModalComponent,
    SectionCardComponent,
    InfoBannerComponent,
    WarningMessageComponent,
    BudgetSuccessModalComponent
  ]
})
export class CreateBudgetPage implements OnInit {
  // MARK: - CONFIGURACIÓN

  readonly icons = CATEGORY_ICONS;
  readonly colors = PERSONALIZATION_COLORS;
  readonly AccountSelectionMode = AccountSelectionMode;

  private readonly initialIcon = 'wallet';
  private readonly initialColor = '#283593';
  private initialPeriod = this.currentMonthSelection();

  // MARK: - FORMULARIO Y DATOS

  name = '';
  notes = '';
  selectedIcon = this.initialIcon;
  selectedColor = this.initialColor;
  periodSelection = { ...this.initialPeriod };
  accounts: Accounts[] = [];
  categories: CategoryResponse[] = [];
  selectedAccounts: Accounts[] = [];
  selectedCategoryAllocations: CategoryBudgetAllocation[] = [];

  // MARK: - ESTADO

  showUnsavedAlert = false;
  showErrorAlert = false;
  isPeriodModalOpen = false;
  isAccountModalOpen = false;
  isCategoryModalOpen = false;
  isPersonalizationModalOpen = false;
  isSaving = false;
  isSuccessModalOpen = false;
  showDataError = false;
  showAccountBalanceRequiredAlert = false;

  private pendingOptionRequests = 0;

  constructor(
    private readonly createBudgetUseCase: CreateBudgetUseCase,
    private readonly navService: NavigationService,
    private readonly loadingService: SpinnerService,
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase
  ) {}

  // MARK: - CICLO DE VIDA

  ngOnInit(): void {
    this.loadSelectableData();
  }

  ionViewWillEnter(): void {
    this.resetForm();
  }

  // MARK: - SERVICIOS

  saveBudget(): void {
    if (!this.canSave) return;

    const request: CreateBudgetRequest = {
      name: this.name.trim(),
      budgetAmount: Number(this.categoryAllocationTotal.toFixed(2)),
      startDate: this.periodSelection.startDate,
      endDate: this.periodSelection.endDate,
      icon: this.selectedIcon,
      color: this.selectedColor,
      account_ids: this.selectedAccounts.map(account => account.id),
      categories: this.selectedCategoryAllocations.map(item => ({
        category_id: item.category.id,
        amount: Number(item.amount.toFixed(2))
      })),
      notes: this.notes.trim()
    };

    this.isSaving = true;
    this.loadingService.show();
    this.createBudgetUseCase.execute(request).service({
      success: () => {
        this.loadingService.hide();
        this.isSaving = false;
        this.isSuccessModalOpen = true;
      },
      failure: () => {
        this.loadingService.hide();
        this.isSaving = false;
        this.showErrorAlert = true;
      }
    });
  }

  private loadSelectableData(): void {
    this.pendingOptionRequests = 2;
    this.loadingService.show();

    this.listAccountsUseCase.listAccounts().service({
      success: data => {
        this.accounts = data?.items ?? [];
        this.finishOptionRequest();
      },
      failure: () => {
        this.showDataError = true;
        this.finishOptionRequest();
      }
    });

    this.listCategoriesUseCase.execute().service({
      success: data => {
        this.categories = (data?.items ?? []).filter(category => category.tipo === 'gasto');
        this.finishOptionRequest();
      },
      failure: () => {
        this.showDataError = true;
        this.finishOptionRequest();
      }
    });
  }

  // MARK: - VALIDACIÓN

  get canSave(): boolean {
    return !this.isSaving && Boolean(
      this.name.trim() &&
      this.selectedIcon &&
      this.selectedColor &&
      this.selectedAccounts.length > 0 &&
      this.selectedAccountBalanceTotal > 0 &&
      this.selectedCategoryAllocations.length > 0 &&
      this.selectedCategoryAllocations.every(item => item.amount > 0) &&
      this.categoryAllocationTotal > 0 &&
      this.periodSelection.startDate &&
      this.periodSelection.endDate &&
      this.periodSelection.startDate <= this.periodSelection.endDate
    );
  }

  get hasChanges(): boolean {
    return Boolean(
      this.name.trim() ||
      this.notes.trim() ||
      this.selectedIcon !== this.initialIcon ||
      this.selectedColor !== this.initialColor ||
      this.selectedAccounts.length > 0 ||
      this.selectedCategoryAllocations.length > 0 ||
      this.periodSelection.period !== this.initialPeriod.period ||
      this.periodSelection.startDate !== this.initialPeriod.startDate ||
      this.periodSelection.endDate !== this.initialPeriod.endDate
    );
  }

  // MARK: - PRESENTACIÓN

  get periodLabel(): string {
    const labels: Record<FilterSelection['period'], string> = {
      weekly: 'Semanal',
      monthly: 'Mensual',
      annual: 'Anual',
      custom: 'Personalizado'
    };
    return labels[this.periodSelection.period];
  }

  get formattedDateRange(): string {
    if (!this.periodSelection.startDate || !this.periodSelection.endDate) {
      return 'Selecciona las fechas';
    }

    const formatter = new Intl.DateTimeFormat('es-PE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC'
    });
    const start = new Date(`${this.periodSelection.startDate}T00:00:00Z`);
    const end = new Date(`${this.periodSelection.endDate}T00:00:00Z`);
    return `${formatter.format(start)} — ${formatter.format(end)}`;
  }


  get selectedAccountsLabel(): string {
    return this.selectionLabel(this.selectedAccounts.map(account => account.name), 'Selecciona una o más cuentas');
  }

  get selectedAccountsTitle(): string {
    const count = this.selectedAccounts.length;
    if (count === 0) return 'Seleccionar cuentas';
    return count === 1 ? '1 cuenta vinculada' : `${count} cuentas vinculadas`;
  }

  get accountSummaryItems(): SelectionSummaryItem[] {
    return this.selectedAccounts.map(account => ({
      id: account.id,
      name: account.name,
      icon: account.icon,
      color: account.color
    }));
  }

  get selectedCategoriesLabel(): string {
    return this.selectionLabel(this.selectedCategories.map(category => category.nombre), 'Selecciona una o más categorías');
  }

  get selectedCategories(): CategoryResponse[] {
    return this.selectedCategoryAllocations.map(item => item.category);
  }

  get categoryAllocationTotal(): number {
    return this.selectedCategoryAllocations.reduce((total, item) => total + item.amount, 0);
  }

  get selectedAccountBalanceTotal(): number {
    return this.selectedAccounts.reduce(
      (total, account) => total + (Number(account.amount) || 0),
      0
    );
  }

  get hasInsufficientAccountBalance(): boolean {
    return this.selectedAccounts.length > 0 &&
      this.categoryAllocationTotal > this.selectedAccountBalanceTotal;
  }

  get accountBalanceWarningMessage(): string {
    const difference = this.categoryAllocationTotal - this.selectedAccountBalanceTotal;
    const formattedDifference = new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.max(difference, 0));

    return `Tu presupuesto supera el saldo actual de las cuentas vinculadas por ${formattedDifference}. Puedes continuar, pero revisa tu disponibilidad.`;
  }

  get budgetAdviceMessage(): string {
    if (this.selectedCategoryAllocations.length === 0) {
      return 'Asigna un monto a cada categoría. La suma se calculará automáticamente como tu presupuesto total.';
    }

    return 'El presupuesto total se calcula con los montos de tus categorías y se controlará durante las fechas seleccionadas.';
  }

  get selectedCategoriesTitle(): string {
    const count = this.selectedCategories.length;
    if (count === 0) return 'Seleccionar categorías';
    return count === 1 ? '1 categoría incluida' : `${count} categorías incluidas`;
  }

  get categorySummaryItems(): SelectionSummaryItem[] {
    return this.selectedCategories.map(category => ({
      id: category.id,
      name: category.nombre,
      icon: category.icono,
      color: category.color
    }));
  }

  // MARK: - MODALES

  openAccountModal(): void {
    this.isAccountModalOpen = true;
  }

  closeAccountModal(): void {
    this.isAccountModalOpen = false;
  }

  applyAccounts(accounts: Accounts[]): void {
    this.selectedAccounts = accounts;
    this.closeAccountModal();
  }

  openCategoryModal(): void {
    if (this.selectedAccounts.length === 0 || this.selectedAccountBalanceTotal <= 0) {
      this.showAccountBalanceRequiredAlert = true;
      return;
    }

    this.isCategoryModalOpen = true;
  }

  closeCategoryModal(): void {
    this.isCategoryModalOpen = false;
  }

  applyCategoryAllocations(allocations: CategoryBudgetAllocation[]): void {
    this.selectedCategoryAllocations = allocations;
    this.closeCategoryModal();
  }

  openPersonalizationModal(): void {
    this.isPersonalizationModalOpen = true;
  }

  closePersonalizationModal(): void {
    this.isPersonalizationModalOpen = false;
  }

  applyPersonalization(value: PersonalizationValue): void {
    this.selectedIcon = value.icon;
    this.selectedColor = value.color;
    this.closePersonalizationModal();
  }

  openPeriodModal(): void {
    this.isPeriodModalOpen = true;
  }

  closePeriodModal(): void {
    this.isPeriodModalOpen = false;
  }

  applyPeriod(selection: FilterSelection): void {
    this.periodSelection = selection;
    this.closePeriodModal();
  }

  // MARK: - NAVEGACIÓN

  backToBudgets(): void {
    if (this.isSaving) return;

    if (this.hasChanges) {
      this.showUnsavedAlert = true;
      return;
    }

    this.navService.back();
  }

  leaveWithoutSaving(): void {
    this.showUnsavedAlert = false;
    this.navService.back();
  }

  viewBudgets(): void {
    this.isSuccessModalOpen = false;
    void this.navService.replace('/main/budgets');
  }

  // MARK: - FUNCIONES PRIVADAS

  private currentMonthSelection(): FilterSelection {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const lastDay = new Date(year, today.getMonth() + 1, 0).getDate();

    return {
      period: 'monthly',
      periodValue: `${year}-${month}`,
      startDate: `${year}-${month}-01`,
      endDate: `${year}-${month}-${String(lastDay).padStart(2, '0')}`
    };
  }

  private finishOptionRequest(): void {
    this.pendingOptionRequests -= 1;
    if (this.pendingOptionRequests === 0) {
      this.loadingService.hide();
    }
  }

  private selectionLabel(names: string[], emptyLabel: string): string {
    if (names.length === 0) return emptyLabel;
    if (names.length <= 2) return names.join(', ');
    const remaining = names.length - 2;
    return `${names.slice(0, 2).join(', ')} y ${remaining} mas}`;
  }

  private resetForm(): void {
    this.initialPeriod = this.currentMonthSelection();
    this.name = '';
    this.notes = '';
    this.selectedIcon = this.initialIcon;
    this.selectedColor = this.initialColor;
    this.periodSelection = { ...this.initialPeriod };
    this.selectedAccounts = [];
    this.selectedCategoryAllocations = [];

    this.showUnsavedAlert = false;
    this.showErrorAlert = false;
    this.showAccountBalanceRequiredAlert = false;
    this.isPeriodModalOpen = false;
    this.isAccountModalOpen = false;
    this.isCategoryModalOpen = false;
    this.isPersonalizationModalOpen = false;
    this.isSaving = false;
    this.isSuccessModalOpen = false;
  }

}
