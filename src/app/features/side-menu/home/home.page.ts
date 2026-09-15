import { ListAccountsUseCase } from '../../../core/use-cases/accounts/list-accounts.usecase';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, MenuController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { Categoria } from 'src/app/shared/models/categoria.model';

import 'src/app/core/utils/observable-extensions';
import { LocalManagementService } from 'src/app/core/services/localManagementService.service';
import { KEY_MANAGEMENT } from 'src/app/core/constants/key-management.constants';
import { DashboardRequest, DashboardSummary } from 'src/app/core/models/dashboard/dashboard.model';
import { DashboardSummaryUseCase } from 'src/app/core/use-cases/dashboard/dashboard-summary.usecase';
import { FilterTransactionsUseCase } from 'src/app/core/use-cases/transactions/filter-transactions.usecase';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    HttpClientModule
  ],
})
export class HomePage {

  showGenericAlert = false;
  showUnauthorizedAlert = false;
  messageError = '';

  hideSecretValues = false;

  amount = 0;
  accountName = 'Cuenta Principal';
  pendingDashboardRequests = 0;
  errorMessage: string | null = null;

  segment: 'gastos' | 'ingresos' = 'gastos';

  notificationCount = 3;

  userName = 'Josue';

  summaryCards = [
    {
      label: 'Ingresos',
      amount: 'S/. 0.00',
      tone: 'income',
      icon: 'salary',
      iconColor: '#2aa876'
    },
    {
      label: 'Gastos',
      amount: 'S/. 0.00',
      tone: 'expense',
      icon: 'down-trend',
      iconColor: '#e35d5d'
    },
    {
      label: 'Presupuesto',
      amount: 'S/. 0.00',
      tone: 'budget',
      icon: 'budget-wallet',
      iconColor: '#5b49d6'
    },
    {
      label: 'Saldo del periodo',
      amount: 'S/. 0.00',
      tone: 'goal',
      icon: 'up-trend',
      iconColor: '#5977d8'
    }
  ];

  recentMovements: Array<{
    label: string;
    amount: string;
    icon: string;
    color: string;
    type: 'income' | 'expense';
    dateLabel: string;
  }> = [];

  donutSegments = [
    { value: 30, color: '#f45d74' },
    { value: 24, color: '#4ec5a5' },
    { value: 17, color: '#f4c15b' },
    { value: 13, color: '#6f7ef7' },
    { value: 16, color: '#7dd3fc' }
  ];

  categoriesWithAmounts: Array<Categoria & {
    totalAmount: number;
  }> = [];

  gastosGrouped: Array<Categoria & {
    totalAmount: number;
  }> = [];

  ingresosGrouped: Array<Categoria & {
    totalAmount: number;
  }> = [];

  name: string = this.localManagementService.getVariable(KEY_MANAGEMENT.NAME) || "";
  isFirstTime: boolean = this.localManagementService.getVariable(KEY_MANAGEMENT.IS_FIRST_TIME) === 'true';

  dataTabs = [
    {
      value: 'gastos',
      label: 'Gasto'
    },
    {
      value: 'ingresos',
      label: 'Ingreso'
    }
  ];

  private readonly mockCategories: Array<Categoria & {
    totalAmount: number;
  }> = [
      {
        id: 1,
        nombre: 'Compras',
        icono: 'shopping-cart',
        color: '#8B5CF6',
        tipo: 'gastos',
        usuario_id: 1,
        totalAmount: 1250
      },
      {
        id: 2,
        nombre: 'Alimentación',
        icono: 'food',
        color: '#22C55E',
        tipo: 'gastos',
        usuario_id: 1,
        totalAmount: 940
      },
      {
        id: 3,
        nombre: 'Transporte',
        icono: 'car',
        color: '#3B82F6',
        tipo: 'gastos',
        usuario_id: 1,
        totalAmount: 705
      },
      {
        id: 4,
        nombre: 'Hogar',
        icono: 'home',
        color: '#F59E0B',
        tipo: 'gastos',
        usuario_id: 1,
        totalAmount: 470
      },
      {
        id: 5,
        nombre: 'Salud',
        icono: 'heart',
        color: '#EC4899',
        tipo: 'gastos',
        usuario_id: 1,
        totalAmount: 310
      },
      {
        id: 6,
        nombre: 'Salario',
        icono: 'wallet',
        color: '#22C55E',
        tipo: 'ingresos',
        usuario_id: 1,
        totalAmount: 4200
      },
      {
        id: 7,
        nombre: 'Freelance',
        icono: 'briefcase',
        color: '#3B82F6',
        tipo: 'ingresos',
        usuario_id: 1,
        totalAmount: 1200
      },
      {
        id: 8,
        nombre: 'Inversiones',
        icono: 'trending-up',
        color: '#8B5CF6',
        tipo: 'ingresos',
        usuario_id: 1,
        totalAmount: 850
      }
    ];

  constructor(
    private listAccountsUseCase: ListAccountsUseCase,
    private dashboardSummaryUseCase: DashboardSummaryUseCase,
    private filterTransactionsUseCase: FilterTransactionsUseCase,
    private localManagementService: LocalManagementService,
    private navService: NavigationService,
    private loadingService: SpinnerService,
    private menuCtrl: MenuController
  ) {

    this.loadDashboardData();

  }

  /* ==========================
     SERVICIOS
     ========================== */

  private loadDashboardData(): void {
    this.pendingDashboardRequests = 2;
    this.loadingService.show();

    this.listAccountsUseCase.listAccounts().service({
      success: data => {
        const accounts = data?.items ?? [];
        const accountIds = accounts.map(account => account.id);
        const accountName = accounts[0]?.name || 'Sin cuentas';

        this.loadDashboardSummary(accountIds);
        this.loadRecentTransactions(accountIds);

        this.accountName = accountName;
      },
      failure: () => {
        this.accountName = 'Sin cuentas';
        this.loadDashboardSummary([]);
        this.loadRecentTransactions([]);
      }
    });
  }

  private loadDashboardSummary(accountIds: number[]): void {
    const request = this.buildDashboardRequest(accountIds);

    this.dashboardSummaryUseCase.execute(request).service({
      success: data => {
        if (data?.summary) {
          this.applyDashboardSummary(data.summary);
        }
        this.finishDashboardRequest();
      },
      failure: () => {
        this.showGenericAlert = true;
        this.finishDashboardRequest();
      }
    });
  }

  private loadRecentTransactions(accountIds: number[]): void {
    const request = this.buildDashboardRequest(accountIds);

    this.filterTransactionsUseCase.execute({
      account_ids: accountIds,
      start_date: request.fecha_inicio,
      end_date: request.fecha_fin
    }).service({
      success: data => {
        const expenses = (data?.transactionList?.expensesList ?? []).map(item => ({
          label: item.category.name,
          amount: this.formatCurrency(Number(item.amount)),
          icon: item.category.icon || 'category',
          color: item.category.color || '#8b5cf6',
          type: 'expense' as const,
          dateLabel: this.formatMovementDate(item.date || item.createdAt)
        }));
        const incomes = (data?.transactionList?.incomeList ?? []).map(item => ({
          label: item.category.name,
          amount: this.formatCurrency(Number(item.amount)),
          icon: item.category.icon || 'category',
          color: item.category.color || '#22c55e',
          type: 'income' as const,
          dateLabel: this.formatMovementDate(item.date || item.createdAt)
        }));

        this.recentMovements = [...expenses, ...incomes].slice(0, 3);
        this.finishDashboardRequest();
      },
      failure: () => {
        this.recentMovements = [];
        this.finishDashboardRequest();
      }
    });
  }

  private buildDashboardRequest(accountIds: number[]): DashboardRequest {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    return {
      fecha_inicio: this.formatDate(startOfMonth),
      fecha_fin: this.formatDate(today),
      cuentas: accountIds,
      limit: 3
    };
  }

  private applyDashboardSummary(summary: DashboardSummary): void {
    this.amount = summary.currentBalance;
    this.summaryCards = [
      { label: 'Ingresos', amount: this.formatCurrency(summary.totalIncome), tone: 'income', icon: 'salary', iconColor: '#2aa876' },
      { label: 'Gastos', amount: this.formatCurrency(summary.totalExpenses), tone: 'expense', icon: 'down-trend', iconColor: '#e35d5d' },
      { label: 'Presupuesto', amount: this.formatCurrency(summary.totalBudget), tone: 'budget', icon: 'budget-wallet', iconColor: '#5b49d6' },
      { label: 'Saldo del periodo', amount: this.formatCurrency(summary.periodBalance), tone: 'goal', icon: 'up-trend', iconColor: '#5977d8' }
    ];
  }

  private finishDashboardRequest(): void {
    this.pendingDashboardRequests -= 1;
    if (this.pendingDashboardRequests <= 0) {
      this.loadingService.hide();
    }
  }

  private formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  private formatCurrency(value: number): string {
    return `S/. ${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  private formatMovementDate(value?: string): string {
    if (!value) return 'Este mes';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Este mes';
    return date.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });
  }

  /* ==========================
     MÉTODOS
     ========================== */

  private loadMockData(): void {

    this.gastosGrouped = this.mockCategories.filter(
      category => category.tipo === 'gastos'
    );

    this.ingresosGrouped = this.mockCategories.filter(
      category => category.tipo === 'ingresos'
    );

    this.updateCategoriesDisplay();

  }

  private groupTransactionsByCategory(
    transactions: any[]
  ): void {

    const categoryMap = new Map<
      string,
      {
        category: Categoria;
        total: number;
      }
    >();

    transactions.forEach(transaction => {

      const key = transaction.nombre;

      if (categoryMap.has(key)) {

        const existing = categoryMap.get(key)!;

        existing.total += Number(
          transaction.monto || 0
        );

      } else {

        categoryMap.set(key, {

          category: {

            id: transaction.id,
            nombre: transaction.nombre,
            icono: transaction.icono,
            color: transaction.color,
            tipo: transaction.tipo,
            usuario_id: transaction.usuario_id

          },

          total: Number(
            transaction.monto || 0
          )

        });

      }

    });

    const grouped = Array
      .from(categoryMap.values())
      .map(item => ({

        ...item.category,

        totalAmount: item.total

      }));

    this.gastosGrouped = grouped.filter(
      category => category.tipo === 'gastos'
    );

    this.ingresosGrouped = grouped.filter(
      category => category.tipo === 'ingresos'
    );

    this.updateCategoriesDisplay();

  }

  private updateCategoriesDisplay(): void {

    this.categoriesWithAmounts =
      this.segment === 'gastos'
        ? this.gastosGrouped
        : this.ingresosGrouped;

  }

  /* ==========================
     UI
     ========================== */

  openMenu(): void {

    this.menuCtrl.open(
      'main-menu'
    );

  }

  validationSecretValues(): void {

    this.hideSecretValues =
      !this.hideSecretValues;

  }

  onSegmentChanged(
    event: string | number
  ): void {

    this.segment =
      event as 'gastos' | 'ingresos';

    this.updateCategoriesDisplay();

  }

  donutBackground(): string {
    const segments = this.donutSegments
      .map((segment, index, arr) => {
        const previous = arr.slice(0, index).reduce((sum, item) => sum + item.value, 0);
        return `${segment.color} ${previous}% ${previous + segment.value}%`;
      })
      .join(', ');

    return `conic-gradient(${segments})`;
  }

  navigateToCreateTransac(): void {

    this.navService.push(
      '/transactions/create'
    );

  }

  navigateToTransactions(): void {
    this.navService.push('/main/transactions');
  }

  navigateToAccounts(): void {
    this.navService.push('/main/accounts');
  }

  navigateToLearning(): void {

    this.navService.push(
      '/main/learning'
    );

  }

  navigateToGraphics(): void {

    this.navService.push(
      '/main/graphics'
    );

  }

}
