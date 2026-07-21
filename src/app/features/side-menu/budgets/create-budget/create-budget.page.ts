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
import { AmountInputComponent } from 'src/app/shared/components/amount-input/amount-input.component';
import { TextFieldComponent } from 'src/app/shared/components/text-field/text-field.component';
import {
  AccountSelectionMode,
  AccountSelectorModalComponent
} from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { CategorySelectorModalComponent } from 'src/app/shared/components/category-selector-modal/category-selector-modal.component';
import { BaseModalComponent } from 'src/app/shared/components/base-modal/base-modal.component';
import { Accounts, ListAccountsUseCase } from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import {
  CategoryResponse,
  ListCategoriesUseCase
} from 'src/app/core/use-cases/categories/list-categories.usecase';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { IconPickerComponent } from 'src/app/shared/components/icon-picker/icon-picker.component';
import { ColorPickerComponent } from 'src/app/shared/components/color-picker/color-picker.component';
import {
  FilterModalComponent,
  FilterSelection
} from 'src/app/shared/components/filter-modal/filter-modal.component';
import { COLORES_CATEGORIA, ICONOS_CATEGORIA } from 'src/app/shared/constants/category-options';
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
    AmountInputComponent,
    TextFieldComponent,
    AccountSelectorModalComponent,
    CategorySelectorModalComponent,
    BaseModalComponent,
    ButtonComponent,
    CustomAlertComponent,
    ItemIconComponent,
    PageLayoutComponent,
    FilterModalComponent,
    SectionCardComponent,
    IconPickerComponent,
    ColorPickerComponent
  ]
})
export class CreateBudgetPage implements OnInit {
  // MARK: - CONFIGURACIÓN

  readonly icons = ICONOS_CATEGORIA;
  readonly colors = COLORES_CATEGORIA;
  readonly AccountSelectionMode = AccountSelectionMode;

  private readonly initialIcon = 'wallet';
  private readonly initialColor = '#388e3c';
  private readonly initialPeriod = this.currentMonthSelection();

  // MARK: - FORMULARIO Y DATOS

  name = '';
  amount: number | null = null;
  selectedIcon = this.initialIcon;
  selectedColor = this.initialColor;
  periodSelection = { ...this.initialPeriod };
  accounts: Accounts[] = [];
  categories: CategoryResponse[] = [];
  selectedAccounts: Accounts[] = [];
  selectedCategories: CategoryResponse[] = [];
  draftIcon = this.initialIcon;
  draftColor = this.initialColor;

  // MARK: - ESTADO

  showUnsavedAlert = false;
  showErrorAlert = false;
  isPeriodModalOpen = false;
  isAccountModalOpen = false;
  isCategoryModalOpen = false;
  isPersonalizationModalOpen = false;
  isSaving = false;
  showDataError = false;

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

  // MARK: - VALIDACIÓN

  get canSave(): boolean {
    return !this.isSaving && Boolean(
      this.name.trim() &&
      this.amount !== null &&
      Number.isFinite(this.amount) &&
      this.amount > 0 &&
      this.selectedIcon &&
      this.selectedColor &&
      this.selectedAccounts.length > 0 &&
      this.selectedCategories.length > 0 &&
      this.periodSelection.startDate &&
      this.periodSelection.endDate &&
      this.periodSelection.startDate <= this.periodSelection.endDate
    );
  }

  get hasChanges(): boolean {
    return Boolean(
      this.name.trim() ||
      (this.amount !== null && this.amount > 0) ||
      this.selectedIcon !== this.initialIcon ||
      this.selectedColor !== this.initialColor ||
      this.selectedAccounts.length > 0 ||
      this.selectedCategories.length > 0 ||
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
      return 'Selecciona la vigencia';
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

  get selectedCategoriesLabel(): string {
    return this.selectionLabel(this.selectedCategories.map(category => category.nombre), 'Selecciona una o más categorías');
  }

  get selectedCategoriesTitle(): string {
    const count = this.selectedCategories.length;
    if (count === 0) return 'Seleccionar categorías';
    return count === 1 ? '1 categoría incluida' : `${count} categorías incluidas`;
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
    this.isCategoryModalOpen = true;
  }

  closeCategoryModal(): void {
    this.isCategoryModalOpen = false;
  }

  applyCategories(categories: CategoryResponse[]): void {
    this.selectedCategories = categories;
    this.closeCategoryModal();
  }

  openPersonalizationModal(): void {
    this.draftIcon = this.selectedIcon;
    this.draftColor = this.selectedColor;
    this.isPersonalizationModalOpen = true;
  }

  closePersonalizationModal(): void {
    this.isPersonalizationModalOpen = false;
  }

  applyPersonalization(): void {
    this.selectedIcon = this.draftIcon;
    this.selectedColor = this.draftColor;
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

  // MARK: - SERVICIOS

  saveBudget(): void {
    if (!this.canSave || this.amount === null) return;

    const request: CreateBudgetRequest = {
      name: this.name.trim(),
      budgetAmount: Number(this.amount.toFixed(2)),
      startDate: this.periodSelection.startDate,
      endDate: this.periodSelection.endDate,
      icon: this.selectedIcon,
      color: this.selectedColor,
      accountIds: this.selectedAccounts.map(account => account.id),
      categoryIds: this.selectedCategories.map(category => category.id)
    };

    console.log('Datos enviados para crear presupuesto:', request);
    this.isSaving = true;
    this.loadingService.show();
    this.createBudgetUseCase.execute(request).service({
      success: () => {
        this.loadingService.hide();
        this.isSaving = false;
        this.navService.back();
      },
      failure: error => {
        this.loadingService.hide();
        this.isSaving = false;
        console.error('Error al crear presupuesto:', error);
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
    return `${names.slice(0, 2).join(', ')} y ${names.length - 2} más`;
  }
}
