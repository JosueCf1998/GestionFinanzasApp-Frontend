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
import { DynamicAlertComponent } from 'src/app/shared/components/basic-alert/basic-alert.component';

import {
  AccountSelectorModalComponent,
  AccountSelectionMode
} from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { PageLayoutComponent } from "src/app/shared/components/page-layout/page-layout.component";
import { ItemIconComponent } from "src/app/shared/components/item-icon/item-icon.component";

/* ==========================================================
   COMPONENT
   ========================================================== */

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
    DynamicAlertComponent,
    AccountSelectorModalComponent,
    PageLayoutComponent,
    ItemIconComponent
]
})
export class HistoryTransferPage implements OnInit {

  /* ==========================================================
     HEADER
     ========================================================== */

  title = 'Transferencias';

  /* ==========================================================
     ENUMS
     ========================================================== */

  readonly AccountSelectionMode = AccountSelectionMode;

  /* ==========================================================
     ALERTS
     ========================================================== */

  showGenericAlert = false;
  showCustomAlert = false;

  /* ==========================================================
     PERIOD FILTER
     ========================================================== */

  selectedPeriod = 'mes';
  selectedYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth() + 1;
  selectedWeekOfMonth = 1;

  periodTabs = [
    { value: 'semana', label: 'Semana' },
    { value: 'mes', label: 'Mes' },
    { value: 'anio', label: 'Año' }
  ];

  private readonly WEEKS_PER_MONTH = 4;
  /* ==========================================================
     ACCOUNT FILTER
     ========================================================== */

  accounts: Accounts[] = [];
  selectedAccounts: Accounts[] = [];
  selectedAccount: Accounts | null = null;
  isAccountModalOpen = false;

  /* ==========================================================
     TRANSFERS
     ========================================================== */

  allTransfers: Transfer[] = [];
  filteredTransfers: Transfer[] = [];
  groupedTransfers: { fecha: string; items: Transfer[] }[] = [];

  /* ==========================================================
     CONSTRUCTOR
     ========================================================== */

  constructor(
    private readonly navigationService: NavigationService,
    private readonly spinnerService: SpinnerService,
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly listTransferUseCase: ListTransferUseCase
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
     LOAD DATA
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
          this.allTransfers = this.enrichTransfersWithAccountNames(transfers.data.items);
          this.filterTransfers();
        }
      },
      error: () => {
        this.spinnerService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  private enrichTransfersWithAccountNames(transfers: Transfer[]): Transfer[] {
    return transfers.map(transfer => {
      const originAccount = this.accounts.find(account => account.id === transfer.originAccountId);
      const destinationAccount = this.accounts.find(account => account.id === transfer.destinationAccountId);

      return {
        ...transfer,
        originAccountName: originAccount?.name ?? 'Cuenta desconocida',
        destinationAccountName: destinationAccount?.name ?? 'Cuenta desconocida',
        originAccountIcon: originAccount?.icon ?? '',
        originAccountColor: originAccount?.color ?? '',
        destinationAccountIcon: destinationAccount?.icon ?? '',
        destinationAccountColor: destinationAccount?.color ?? ''
      };
    });
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

  editTransfer(transfer: Transfer): void {
    localStorage.setItem('transferDetail', JSON.stringify(transfer));

    this.navigationService.push('/accounts/detail-transfer', {
      transferData: transfer
    });
  }

  /* ==========================================================
     PERIOD FILTER
     ========================================================== */

  onPeriodChange(): void {
    this.filterTransfers();
  }

  changeYear(direction: number): void {
    this.selectedYear += direction;
    this.filterTransfers();
  }

  changeMonth(direction: number): void {
    this.selectedMonth += direction;

    if (this.selectedMonth > 12) {
      this.selectedMonth = 1;
      this.selectedYear++;
    } else if (this.selectedMonth < 1) {
      this.selectedMonth = 12;
      this.selectedYear--;
    }

    this.filterTransfers();
  }

  changeWeek(direction: number): void {
    this.selectedWeekOfMonth += direction;

    const weeksInMonth = this.WEEKS_PER_MONTH;
    if (this.selectedWeekOfMonth > weeksInMonth) {
      this.selectedWeekOfMonth = 1;
      this.selectedMonth++;

      if (this.selectedMonth > 12) {
        this.selectedMonth = 1;
        this.selectedYear++;
      }
    } else if (this.selectedWeekOfMonth < 1) {
      this.selectedMonth--;

      if (this.selectedMonth < 1) {
        this.selectedMonth = 12;
        this.selectedYear--;
      }

      this.selectedWeekOfMonth = this.WEEKS_PER_MONTH;
    }

    this.filterTransfers();
  }

  /* ==========================================================
     TRANSFER FILTER
     ========================================================== */

  private filterTransfers(): void {
    const selectedIds = this.selectedAccounts.map(account => account.id);

    this.filteredTransfers = this.allTransfers.filter(transfer => {
      const accountMatch =
        selectedIds.length === this.accounts.length ||
        selectedIds.includes(transfer.originAccountId) ||
        selectedIds.includes(transfer.destinationAccountId);

      return accountMatch && this.matchesPeriodFilter(transfer);
    });

    this.groupByDate();
  }

  private matchesPeriodFilter(transfer: Transfer): boolean {
    const transferDate = new Date(transfer.date);

    switch (this.selectedPeriod) {
      case 'semana':
        return this.getWeekOfMonth(transferDate) === this.selectedWeekOfMonth &&
          transferDate.getMonth() + 1 === this.selectedMonth &&
          transferDate.getFullYear() === this.selectedYear;

      case 'mes':
        return transferDate.getMonth() + 1 === this.selectedMonth &&
          transferDate.getFullYear() === this.selectedYear;

      case 'anio':
        return transferDate.getFullYear() === this.selectedYear;

      default:
        return true;
    }
  }

  private groupByDate(): void {
    const groups = new Map<string, Transfer[]>();

    this.filteredTransfers.forEach(transfer => {
      const key = this.formatDateKey(transfer.date);
      const group = groups.get(key);

      group
        ? group.push(transfer)
        : groups.set(key, [transfer]);
    });

    this.groupedTransfers = Array.from(groups.entries())
      .map(([fecha, items]) => ({
        fecha,
        items: items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }))
      .sort((a, b) => new Date(b.items[0].date).getTime() - new Date(a.items[0].date).getTime());
  }

  /* ==========================================================
     ACCOUNT FILTER
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
    this.filterTransfers();
  }

  get accountFilterLabel(): string {
    if (this.selectedAccounts.length === this.accounts.length) {
      return 'Todas las cuentas';
    }

    if (this.selectedAccounts.length === 1) {
      return this.selectedAccounts[0].name;
    }

    return `${this.selectedAccounts.length} cuentas`;
  }

  get selectedAccountColor(): string {
    return this.selectedAccounts.length === 1
      ? this.selectedAccounts[0].color ?? 'var(--fv-primary)'
      : 'var(--fv-primary)';
  }

  get selectedAccountIcon(): string {
    return this.selectedAccounts.length === 1
      ? this.selectedAccounts[0].icon ?? "wallet"
      : "wallet";
  }

  /* ==========================================================
     HELPERS
     ========================================================== */

  formatDateKey(dateString: string): string {
    const [year, month, day] = dateString.split('T')[0].split('-');

    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    return `${+day} de ${months[+month - 1]} de ${year}`;
  }

  getMonthName(month: number): string {
    return [
      'Enero', 'Febrero', 'Marzo', 'Abril',
      'Mayo', 'Junio', 'Julio', 'Agosto',
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ][month - 1];
  }

  getTransferIcon(type: string): string {
    switch (type) {
      case 'Inicial':
        return 'salary';
      case 'Ajuste':
        return 'edit';
      default:
        return 'send-money';
    }
  }

  salirSinGuardar(): void {
    this.showCustomAlert = false;
    (document.activeElement as HTMLElement)?.blur();
    this.navigationService.back();
  }

  getTransferColor(type: string): string {
    switch (type) {
      case 'Inicial':
        return '#10B981';

      case 'Ajuste':
        return '#F59E0B';

      default:
        return '#4361EE';
    }
  }

  private getWeekOfMonth(date: Date): number {
    const day = date.getDate();

    if (day <= 7) return 1;
    if (day <= 14) return 2;
    if (day <= 21) return 3;

    return 4;
  }

}
