import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateTransactionsRequest } from 'src/app/core/models/transactions/create-transaction.mode';
import { FilteredTransaction } from 'src/app/core/models/transactions/list-transactions.model';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import {
  Accounts,
  ListAccountsUseCase
} from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import {
  CategoryResponse,
  ListCategoriesUseCase
} from 'src/app/core/use-cases/categories/list-categories.usecase';
import { CreateTransactionsUseCase } from 'src/app/core/use-cases/transactions/create-transactions';
import { DeleteTransactionUseCase } from 'src/app/core/use-cases/transactions/delete-transaction.usecase';
import { UpdateTransactionUseCase } from 'src/app/core/use-cases/transactions/update-transaction.usecase';
import { convertISODateToSQL } from 'src/app/core/utils/date.util';
import 'src/app/core/utils/observable-extensions';
import {
  AccountSelectionMode,
  AccountSelectorModalComponent
} from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { AmountInputComponent } from 'src/app/shared/components/amount-input/amount-input.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import {
  CategorySelectionMode,
  CategorySelectorModalComponent
} from 'src/app/shared/components/category-selector-modal/category-selector-modal.component';
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import {
  FilterModalComponent,
  FilterSelection
} from 'src/app/shared/components/filter-modal/filter-modal.component';
import { InfoBannerComponent } from 'src/app/shared/components/info-banner/info-banner.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { SelectionSummaryComponent } from 'src/app/shared/components/selection-summary/selection-summary.component';
import { TextFieldComponent } from 'src/app/shared/components/text-field/text-field.component';
import {
  SuccessReceiptDetail,
  SuccessReceiptModalComponent
} from 'src/app/shared/components/success-receipt-modal/success-receipt-modal.component';

type TransactionType = 'gasto' | 'ingreso';

interface TransactionFormState {
  transaction?: FilteredTransaction;
  category?: {
    id: number;
    name: string;
    icon: string;
    color: string;
  };
  transactionType?: TransactionType;
}

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.page.html',
  styleUrls: ['./create-transaction.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountSelectorModalComponent,
    AmountInputComponent,
    ButtonComponent,
    CategorySelectorModalComponent,
    CustomAlertComponent,
    CustomSegmentComponent,
    FilterModalComponent,
    InfoBannerComponent,
    ItemIconComponent,
    PageLayoutComponent,
    SectionCardComponent,
    SelectionSummaryComponent,
    SuccessReceiptModalComponent,
    TextFieldComponent
  ]
})
export class CreateTransactionPage implements OnInit {
  readonly AccountSelectionMode = AccountSelectionMode;
  readonly CategorySelectionMode = CategorySelectionMode;
  readonly transactionTypes = [
    { value: 'gasto', label: 'Gastos' },
    { value: 'ingreso', label: 'Ingresos' }
  ];

  selectedType: TransactionType = 'gasto';
  amount: number | null = null;
  selectedAccount: Accounts | null = null;
  selectedCategory: CategoryResponse | null = null;
  date = this.today;
  description = '';

  incomeCategories: CategoryResponse[] = [];
  expenseCategories: CategoryResponse[] = [];
  accounts: Accounts[] = [];

  isAccountModalOpen = false;
  isCategoryModalOpen = false;
  isPeriodModalOpen = false;
  isSuccessReceiptOpen = false;
  isSaving = false;
  isDeleting = false;
  showUnsavedAlert = false;
  showLoadError = false;
  showSaveError = false;
  showDeleteAlert = false;
  showDeleteError = false;
  transactionId: number | null = null;
  readonly isEditMode: boolean;
  private readonly editingTransaction?: FilteredTransaction;
  private readonly initialCategoryId?: number;

  private hasPendingChanges = false;
  private pendingInitialLoads = 2;

  constructor(
    private readonly navService: NavigationService,
    private readonly createTransactionsUseCase: CreateTransactionsUseCase,
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
    private readonly deleteTransactionUseCase: DeleteTransactionUseCase,
    private readonly listCategoriesUseCase: ListCategoriesUseCase,
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly loadingService: SpinnerService
  ) {
    const state = window.history.state as TransactionFormState;
    this.editingTransaction = state.transaction;
    this.isEditMode = Boolean(this.editingTransaction);
    this.initialCategoryId = this.editingTransaction?.category.id ?? state.category?.id;

    if (this.editingTransaction) {
      this.transactionId = this.editingTransaction.id;
      this.selectedType = this.editingTransaction.type === 'income' ? 'ingreso' : 'gasto';
      this.amount = this.editingTransaction.amount;
      this.date = convertISODateToSQL(this.editingTransaction.date);
      this.description = this.editingTransaction.description ?? '';
      this.selectedAccount = {
        ...this.editingTransaction.account,
        amount: 0
      };
      this.selectedCategory = {
        id: this.editingTransaction.category.id,
        nombre: this.editingTransaction.category.name,
        icono: this.editingTransaction.category.icon,
        color: this.editingTransaction.category.color,
        tipo: this.selectedType,
        usuario_id: null
      };
    } else if (state.category) {
      this.selectedType = state.transactionType ?? 'gasto';
      this.selectedCategory = {
        id: state.category.id,
        nombre: state.category.name,
        icono: state.category.icon,
        color: state.category.color,
        tipo: this.selectedType,
        usuario_id: null
      };
    }
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.loadCategories();
    this.loadAccounts();
  }

  get categories(): CategoryResponse[] {
    return this.selectedType === 'ingreso'
      ? this.incomeCategories
      : this.expenseCategories;
  }

  get canSave(): boolean {
    return !this.isSaving && !this.isDeleting &&
      (!this.isEditMode || this.hasPendingChanges) &&
      (this.amount ?? 0) > 0 &&
      this.selectedAccount !== null &&
      this.selectedCategory?.id !== undefined &&
      Boolean(this.date);
  }

  get accountSummary(): string {
    return this.selectedAccount?.name ?? 'Selecciona una cuenta';
  }

  get accountBalanceLabel(): string {
    if (!this.selectedAccount) return 'Elige de dónde saldrá o ingresará el dinero';
    return `Saldo disponible: S/ ${this.formatAmount(this.selectedAccount.amount)}`;
  }

  get selectedAccountItems(): Array<{ id: number; name: string; icon: string; color: string }> {
    if (!this.selectedAccount) return [];
    return [{
      id: this.selectedAccount.id,
      name: this.selectedAccount.name,
      icon: this.selectedAccount.icon,
      color: this.selectedAccount.color
    }];
  }

  get categorySummary(): string {
    return this.selectedCategory?.nombre ?? 'Selecciona una categoría';
  }

  get categoryDescription(): string {
    return this.selectedCategory
      ? `Categoría de ${this.selectedType === 'gasto' ? 'gasto' : 'ingreso'}`
      : 'Clasifica el movimiento para organizar tus finanzas';
  }

  get selectedCategoryItems(): Array<{ id: number; name: string; icon: string; color: string }> {
    if (!this.selectedCategory) return [];
    return [{
      id: this.selectedCategory.id,
      name: this.selectedCategory.nombre,
      icon: this.selectedCategory.icono,
      color: this.selectedCategory.color
    }];
  }

  get formattedDate(): string {
    if (!this.date) return 'Selecciona una fecha';
    return new Intl.DateTimeFormat('es-PE', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(`${this.date}T00:00:00Z`));
  }

  get datePeriodValue(): string {
    return this.date;
  }

  get transactionAdvice(): string {
    return this.selectedType === 'gasto'
      ? 'Registrar tus gastos al momento te ayuda a mantener tus presupuestos siempre actualizados.'
      : 'Clasifica tus ingresos para entender mejor de dónde viene tu dinero.';
  }

  get successReceiptDetails(): SuccessReceiptDetail[] {
    return [
      {
        label: 'Monto',
        value: `S/ ${this.formatAmount(this.amount ?? 0)}`,
        emphasis: true
      },
      {
        label: 'Tipo',
        value: this.selectedType === 'gasto' ? 'Gasto' : 'Ingreso'
      },
      { label: 'Fecha', value: this.formattedDate, wrap: true },
      { label: 'Cuenta', value: this.selectedAccount?.name ?? '', wrap: true },
      { label: 'Categoría', value: this.selectedCategory?.nombre ?? '', wrap: true },
      ...(this.description.trim()
        ? [{ label: 'Nota', value: this.description.trim(), wrap: true }]
        : []),
      ...(this.transactionId !== null
        ? [{ label: 'N.º de operación', value: this.transactionId.toString() }]
        : [])
    ];
  }

  changeType(value: string): void {
    if (this.isEditMode) return;
    if (value !== 'gasto' && value !== 'ingreso') return;
    this.selectedType = value;
    this.selectedCategory = null;
    this.markAsChanged();
  }

  selectCategory(category: CategoryResponse): void {
    this.selectedCategory = category;
    this.markAsChanged();
  }

  openCategoryModal(): void {
    this.isCategoryModalOpen = true;
  }

  closeCategoryModal(): void {
    this.isCategoryModalOpen = false;
  }

  openAccountModal(): void {
    this.isAccountModalOpen = true;
  }

  closeAccountModal(): void {
    this.isAccountModalOpen = false;
  }

  selectAccount(account: Accounts): void {
    this.selectedAccount = account;
    this.markAsChanged();
  }

  openPeriodModal(): void {
    this.isPeriodModalOpen = true;
  }

  closePeriodModal(): void {
    this.isPeriodModalOpen = false;
  }

  applyPeriod(selection: FilterSelection): void {
    this.date = selection.startDate;
    this.closePeriodModal();
    this.markAsChanged();
  }

  onFormChange(): void {
    this.markAsChanged();
  }

  saveTransaction(): void {
    if (!this.canSave || !this.selectedCategory?.id || !this.selectedAccount) return;

    const request: CreateTransactionsRequest = {
      categoryId: this.selectedCategory.id.toString(),
      accountId: this.selectedAccount.id.toString(),
      amount: this.amount as number,
      date: convertISODateToSQL(this.date),
      type: this.selectedType,
      description: this.description.trim()
    };

    const operation = this.isEditMode && this.transactionId !== null
      ? this.updateTransactionUseCase.execute({ ...request, transactionId: this.transactionId })
      : this.createTransactionsUseCase.execute(request);

    this.isSaving = true;
    this.loadingService.show();
    operation.service({
      success: data => {
        this.loadingService.hide();
        this.isSaving = false;
        this.hasPendingChanges = false;
        this.transactionId = data?.info?.id ?? this.transactionId;
        this.isSuccessReceiptOpen = true;
      },
      failure: () => {
        this.loadingService.hide();
        this.isSaving = false;
        this.showSaveError = true;
      }
    });
  }

  backToTransactions(): void {
    if (this.hasPendingChanges) {
      this.showUnsavedAlert = true;
      return;
    }
    void this.navService.back();
  }

  leaveWithoutSaving(): void {
    this.showUnsavedAlert = false;
    this.hasPendingChanges = false;
    void this.navService.back();
  }

  viewTransactions(): void {
    this.isSuccessReceiptOpen = false;
    void this.navService.back();
  }

  requestDeleteTransaction(): void {
    if (!this.isEditMode || this.transactionId === null || this.isDeleting) return;
    this.showDeleteAlert = true;
  }

  confirmDeleteTransaction(): void {
    if (!this.isEditMode || this.transactionId === null || this.isDeleting) return;

    this.showDeleteAlert = false;
    this.isDeleting = true;
    this.loadingService.show();
    this.deleteTransactionUseCase.execute(this.transactionId).service({
      success: () => {
        this.loadingService.hide();
        this.isDeleting = false;
        this.hasPendingChanges = false;
        void this.navService.replace('/main/transactions', undefined, false);
      },
      failure: () => {
        this.loadingService.hide();
        this.isDeleting = false;
        this.showDeleteError = true;
      }
    });
  }

  private loadCategories(): void {
    this.listCategoriesUseCase.execute().service({
      success: data => {
        this.finishInitialLoad();
        const categories = data?.items ?? [];
        this.incomeCategories = categories.filter(category =>
          category.tipo === 'ingresos' || category.tipo === 'ingreso'
        );
        this.expenseCategories = categories.filter(category =>
          category.tipo === 'gastos' || category.tipo === 'gasto'
        );
        this.reconcileSelectedCategory();
      },
      failure: () => {
        this.finishInitialLoad();
        this.showLoadError = true;
      }
    });
  }

  private loadAccounts(): void {
    this.listAccountsUseCase.listAccounts().service({
      success: data => {
        this.finishInitialLoad();
        this.accounts = data?.items ?? [];
        this.reconcileSelectedAccount();
      },
      failure: () => {
        this.finishInitialLoad();
        this.showLoadError = true;
      }
    });
  }

  private markAsChanged(): void {
    this.hasPendingChanges = true;
  }

  private reconcileSelectedAccount(): void {
    if (!this.editingTransaction) return;
    this.selectedAccount = this.accounts.find(account => account.id === this.editingTransaction?.account.id)
      ?? this.selectedAccount;
  }

  private reconcileSelectedCategory(): void {
    if (this.initialCategoryId === undefined) return;
    this.selectedCategory = this.categories.find(category => category.id === this.initialCategoryId)
      ?? this.selectedCategory;
  }

  private finishInitialLoad(): void {
    this.pendingInitialLoads = Math.max(0, this.pendingInitialLoads - 1);
    if (this.pendingInitialLoads === 0) {
      this.loadingService.hide();
    }
  }

  private formatAmount(value: number): string {
    return new Intl.NumberFormat('es-PE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(value) || 0);
  }

  private toLocalDate(value: Date): string {
    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, '0');
    const day = `${value.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  get today(): string {
    return this.toLocalDate(new Date());
  }

}
