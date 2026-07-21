import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { forkJoin } from 'rxjs';

import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';

import { ListAccountsUseCase, Accounts } from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import { ListTransferUseCase, Transfer } from 'src/app/core/use-cases/transfer/list-transfer.usecase';

import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';

import {
  AccountSelectorModalComponent,
  AccountSelectionMode
} from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';

import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { FloatingActionButtonComponent } from 'src/app/shared/components/floating-action-button/floating-action-button.component';

@Component({
  selector: 'app-history-transfer',
  templateUrl: './history-transfer.page.html',
  styleUrls: ['./history-transfer.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    CustomSegmentComponent,
    CustomAlertComponent,
    AccountSelectorModalComponent,
    PageLayoutComponent,
    ItemIconComponent,
    FloatingActionButtonComponent
  ]
})
export class HistoryTransferPage implements OnInit {

  /* ==========================================================
     HEADER
     ========================================================== */

  title = 'Transferencias';

  /* ==========================================================
     ENUM
     ========================================================== */

  readonly AccountSelectionMode = AccountSelectionMode;

  /* ==========================================================
     STATE - ALERTS
     ========================================================== */

  showGenericAlert = false;
  showCustomAlert = false;

  /* ==========================================================
     PERIOD STATE
     ========================================================== */

  selectedPeriod: 'semana' | 'mes' | 'anio' = 'mes';
  selectedYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth() + 1;
  selectedWeekOfMonth = 1;

  periodTabs = [
    { value: 'semana', label: 'Semana' },
    { value: 'mes', label: 'Mes' },
    { value: 'anio', label: 'Año' }
  ];

  /* ==========================================================
     ACCOUNTS
     ========================================================== */

  accounts: Accounts[] = [];
  selectedAccounts: Accounts[] = [];
  isAccountModalOpen = false;

  /* ==========================================================
     TRANSFERS
     ========================================================== */

  private allTransfers: Transfer[] = [];
  groupedTransfers: { fecha: string; items: Transfer[] }[] = [];

  /* ==========================================================
     CACHE (performance)
     ========================================================== */

  private lastFilterKey = '';

  /* ==========================================================
     CONSTRUCTOR
     ========================================================== */

  constructor(
    private navigationService: NavigationService,
    private spinnerService: SpinnerService,
    private listAccountsUseCase: ListAccountsUseCase,
    private listTransferUseCase: ListTransferUseCase
  ) {}

  /* ==========================================================
     LIFECYCLE
     ========================================================== */

  ngOnInit(): void {
    const today = new Date();

    this.selectedMonth = today.getMonth() + 1;
    this.selectedWeekOfMonth = this.getWeekOfMonth(today);
  }

  ionViewWillEnter(): void {
    this.loadData();
  }

  /* ==========================================================
     DATA LOADER
     ========================================================== */

  private loadData(): void {
    this.spinnerService.show();

    forkJoin({
      accounts: this.listAccountsUseCase.listAccounts(),
      transfers: this.listTransferUseCase.listTransfer()
    }).subscribe({
      next: ({ accounts, transfers }) => {

        this.spinnerService.hide();

        if (accounts.success && accounts.data?.items) {
          this.accounts = accounts.data.items;
          this.selectedAccounts = [...this.accounts];
        }

        if (transfers.success && transfers.data?.items) {
          this.allTransfers = this.enrichTransfers(transfers.data.items);
          this.applyFilters();
        }

      },
      error: () => {
        this.spinnerService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  /* ==========================================================
     ENRICH DATA
     ========================================================== */

  private enrichTransfers(transfers: Transfer[]): Transfer[] {
    return transfers.map(t => {

      const origin = this.accounts.find(a => a.id === t.originAccountId);
      const dest = this.accounts.find(a => a.id === t.destinationAccountId);

      return {
        ...t,
        originAccountName: origin?.name ?? 'Cuenta desconocida',
        destinationAccountName: dest?.name ?? 'Cuenta desconocida',
        originAccountIcon: origin?.icon ?? '',
        originAccountColor: origin?.color ?? '',
        destinationAccountIcon: dest?.icon ?? '',
        destinationAccountColor: dest?.color ?? ''
      };
    });
  }

  /* ==========================================================
     FILTER ENGINE
     ========================================================== */

  private applyFilters(): void {

    const key = JSON.stringify({
      acc: this.selectedAccounts.map(a => a.id),
      period: this.selectedPeriod,
      m: this.selectedMonth,
      y: this.selectedYear,
      w: this.selectedWeekOfMonth
    });

    if (key === this.lastFilterKey) return;
    this.lastFilterKey = key;

    const selectedIds = this.selectedAccounts.map(a => a.id);

    const filtered = this.allTransfers.filter(t => {

      const accountOk =
        selectedIds.length === this.accounts.length ||
        selectedIds.includes(t.originAccountId) ||
        selectedIds.includes(t.destinationAccountId);

      return accountOk && this.matchesPeriod(t.date);
    });

    this.groupTransfers(filtered);
  }

  /* ==========================================================
     PERIOD MATCH
     ========================================================== */

  private matchesPeriod(dateStr: string): boolean {

    const d = new Date(dateStr);

    if (this.selectedPeriod === 'anio') {
      return d.getFullYear() === this.selectedYear;
    }

    if (this.selectedPeriod === 'mes') {
      return (
        d.getFullYear() === this.selectedYear &&
        d.getMonth() + 1 === this.selectedMonth
      );
    }

    return (
      d.getFullYear() === this.selectedYear &&
      d.getMonth() + 1 === this.selectedMonth &&
      this.getWeekOfMonth(d) === this.selectedWeekOfMonth
    );
  }

  /* ==========================================================
     GROUPING
     ========================================================== */

  private groupTransfers(list: Transfer[]): void {

    const groups: Record<string, Transfer[]> = {};

    for (const t of list) {
      const key = this.formatDateKey(t.date);
      (groups[key] ||= []).push(t);
    }

    this.groupedTransfers = Object.entries(groups)
      .map(([fecha, items]) => ({
        fecha,
        items: items.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      }))
      .sort((a, b) =>
        new Date(b.items[0].date).getTime() -
        new Date(a.items[0].date).getTime()
      );
  }

  /* ==========================================================
     PERIOD NAVIGATION (CLEAN)
     ========================================================== */

  onPeriodChange(): void {
    this.applyFilters();
  }

  prevPeriod(): void {
    this.navigatePeriod(-1);
  }

  nextPeriod(): void {
    this.navigatePeriod(1);
  }

  private navigatePeriod(direction: number): void {

    switch (this.selectedPeriod) {

      case 'semana':
        this.changeWeek(direction);
        break;

      case 'mes':
        this.changeMonth(direction);
        break;

      case 'anio':
        this.changeYear(direction);
        break;
    }

    this.applyFilters();
  }

  changeYear(d: number): void {
    this.selectedYear += d;
  }

  changeMonth(d: number): void {

    this.selectedMonth += d;

    if (this.selectedMonth > 12) {
      this.selectedMonth = 1;
      this.selectedYear++;
    }

    if (this.selectedMonth < 1) {
      this.selectedMonth = 12;
      this.selectedYear--;
    }
  }

  changeWeek(d: number): void {

    this.selectedWeekOfMonth += d;

    if (this.selectedWeekOfMonth > 4) {
      this.selectedWeekOfMonth = 1;
      this.changeMonth(1);
    }

    if (this.selectedWeekOfMonth < 1) {
      this.selectedWeekOfMonth = 4;
      this.changeMonth(-1);
    }
  }

  /* ==========================================================
     ACCOUNT MODAL
     ========================================================== */

  openAccountModal(): void {
    this.isAccountModalOpen = true;
  }

  closeAccountModal(): void {
    this.isAccountModalOpen = false;
  }

  onAccountsSelected(accounts: Accounts[]): void {
    this.selectedAccounts = accounts;
    this.isAccountModalOpen = false;
    this.applyFilters();
  }

  /* ==========================================================
     NAVIGATION
     ========================================================== */

  backToAccounts(): void {
    (document.activeElement as HTMLElement)?.blur();
    this.navigationService.back();
  }

  navigateToAddTransfer(): void {
    this.navigationService.push('/accounts/new-transfer');
  }

  editTransfer(t: Transfer): void {
    this.navigationService.push('/accounts/detail-transfer', {
      transferData: t
    });
  }

  /* ==========================================================
     HELPERS
     ========================================================== */

  private formatDateKey(date: string): string {

    const [y, m, d] = date.split('T')[0].split('-');

    const months = [
      'enero','febrero','marzo','abril','mayo','junio',
      'julio','agosto','septiembre','octubre','noviembre','diciembre'
    ];

    return `${+d} de ${months[+m - 1]} de ${y}`;
  }

  getWeekOfMonth(date: Date): number {
    return Math.min(4, Math.ceil(date.getDate() / 7));
  }

  getTransferIcon(type: string): string {
    switch (type) {

      case 'Inicial':
        return 'salary';

      case 'Ajuste':
        return 'edit';

      case 'Realizado':
        return 'send-money';

      default:
        return 'transfer';
    }
  }

  getTransferColor(type: string): string {
    switch (type) {

      case 'Inicial':
        return '#10B981'; // verde (entrada)

      case 'Ajuste':
        return '#F59E0B'; // ámbar (edición)

      case 'Realizado':
        return '#4361EE'; // primary FinVia

      default:
        return 'var(--fv-primary)';
    }
  }

  getMonthName(month: number): string {
    return [
      'Enero', 'Febrero', 'Marzo', 'Abril',
      'Mayo', 'Junio', 'Julio', 'Agosto',
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ][month - 1] ?? '';
  }

  get accountFilterLabel(): string {
    if (!this.selectedAccounts || this.selectedAccounts.length === 0) {
      return 'Sin cuentas';
    }

    if (this.selectedAccounts.length === this.accounts.length) {
      return 'Todas las cuentas';
    }

    if (this.selectedAccounts.length === 1) {
      return this.selectedAccounts[0].name;
    }

    return `${this.selectedAccounts.length} cuentas`;
  }

  get selectedAccountIcon(): string {
    if (this.selectedAccounts?.length === 1) {
      return this.selectedAccounts[0]?.icon ?? 'wallet';
    }
    return 'wallet';
  }

  get selectedAccountColor(): string {
    if (this.selectedAccounts?.length === 1) {
      return this.selectedAccounts[0]?.color ?? 'var(--fv-primary)';
    }
    return 'var(--fv-primary)';
  }

  /* ==========================================================
     ALERT
     ========================================================== */

  salirSinGuardar(): void {
    this.showCustomAlert = false;
    (document.activeElement as HTMLElement)?.blur();
    this.navigationService.back();
  }
}
