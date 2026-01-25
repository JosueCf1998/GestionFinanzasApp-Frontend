import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CustomSegmentComponent } from "../../../../shared/components/custom-segment/custom-segment.component";
import { ListTransferUseCase, Transfer } from "src/app/core/use-cases/transfer/list-transfer.usecase";
import { ListAccountsUseCase, Accounts } from "src/app/core/use-cases/accounts/list-accounts.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";

interface AccountFilter {
  id: number;
  name: string;
  selected: boolean;
  amount: number;
  color?: string;
  icon?: string;
}

@Component({
  selector: "app-history-transfer",
  templateUrl: "./history-transfer.page.html",
  styleUrls: ["./history-transfer.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomSegmentComponent],
})
export class HistoryTransferPage implements OnInit {
  title: string = "Transferencias";

  // Filtros
  selectedPeriod: string = 'mes';
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  selectedWeekOfMonth: number = 1; // Semana del mes (1-5)
  selectedDay: Date = new Date();

  // Opciones de periodos
  periodTabs = [
    { value: 'semana', label: 'Semana' },
    { value: 'mes', label: 'Mes' },
    { value: 'anio', label: 'Año' }
  ];

  // Filtro de cuentas
  accounts: AccountFilter[] = [];
  isAccountModalOpen: boolean = false;
  selectAllAccounts: boolean = true;

  allTransfers: Transfer[] = [];
  filteredTransfers: Transfer[] = [];
  groupedTransfers: { fecha: string; items: Transfer[] }[] = [];

  showCustomAlert = false;

  constructor(
    private navService: NavigationService,
    private router: Router,
    private listTransferUseCase: ListTransferUseCase,
    private listAccountsUseCase: ListAccountsUseCase,
    private loadingService: SpinnerService
  ) {}

  ngOnInit() {
    const currentDate = new Date();
    this.selectedMonth = currentDate.getMonth() + 1;
    this.selectedWeekOfMonth = this.getWeekOfMonth(currentDate);
    
    this.loadData();
  }

  // MARK: - SERVICIOS

  private loadData() {
    this.loadingService.show();
    
    forkJoin({
      accounts: this.listAccountsUseCase.listAccounts(),
      transfers: this.listTransferUseCase.listTransfer()
    }).subscribe({
      next: (results) => {
        this.loadingService.hide();
        
        // Procesar cuentas
        if (results.accounts.success && results.accounts.data?.items) {
          this.accounts = results.accounts.data.items.map(account => ({
            id: account.id,
            name: account.name,
            selected: true,
            amount: account.amount,
            color: account.color,
            icon: account.icon
          }));
        }
        
        // Procesar transferencias y enriquecer con nombres de cuentas
        if (results.transfers.success && results.transfers.data?.items) {
          this.allTransfers = this.enrichTransfersWithAccountNames(results.transfers.data.items);
          this.filterTransfers();
        }
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  private enrichTransfersWithAccountNames(transfers: Transfer[]): Transfer[] {
    return transfers.map(transfer => ({
      ...transfer,
      originAccountName: this.accounts.find(acc => acc.id === transfer.originAccountId)?.name || 'Cuenta desconocida',
      destinationAccountName: this.accounts.find(acc => acc.id === transfer.destinationAccountId)?.name || 'Cuenta desconocida'
    }));
  }

  // MARK: - FUNCIONALIDADES

  async backToAccounts() {
    (document.activeElement as HTMLElement)?.blur();
    this.navService.back();
  }

  onPeriodChange() {
    this.filterTransfers();
  }

  changeYear(direction: number) {
    this.selectedYear += direction;
    this.filterTransfers();
  }

  changeMonth(direction: number) {
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

  changeWeek(direction: number) {
    this.selectedWeekOfMonth += direction;
    
    const weeksInMonth = this.getWeeksInMonth(this.selectedMonth, this.selectedYear);
    
    if (this.selectedWeekOfMonth > weeksInMonth) {
      // Avanzar al próximo mes
      this.selectedWeekOfMonth = 1;
      this.selectedMonth++;
      if (this.selectedMonth > 12) {
        this.selectedMonth = 1;
        this.selectedYear++;
      }
    } else if (this.selectedWeekOfMonth < 1) {
      // Retroceder al mes anterior
      this.selectedMonth--;
      if (this.selectedMonth < 1) {
        this.selectedMonth = 12;
        this.selectedYear--;
      }
      this.selectedWeekOfMonth = this.getWeeksInMonth(this.selectedMonth, this.selectedYear);
    }
    
    this.filterTransfers();
  }

  changeDay(direction: number) {
    const newDay = new Date(this.selectedDay);
    newDay.setDate(newDay.getDate() + direction);
    this.selectedDay = newDay;
    this.filterTransfers();
  }

  filterTransfers() {
    const selectedAccountIds = this.selectAllAccounts 
      ? [] 
      : this.accounts.filter(acc => acc.selected).map(acc => acc.id);
    
    this.filteredTransfers = this.allTransfers.filter(transfer => {
      // Filtro por cuenta
      if (!this.selectAllAccounts) {
        if (selectedAccountIds.length === 0) return false;
        
        const accountMatch = selectedAccountIds.includes(transfer.originAccountId) || 
                             selectedAccountIds.includes(transfer.destinationAccountId);
        if (!accountMatch) return false;
      }
      
      // Filtro por período
      return this.matchesPeriodFilter(transfer);
    });

    this.groupByDate();
  }

  private matchesPeriodFilter(transfer: Transfer): boolean {
    const transferDate = new Date(transfer.date);
      
    switch (this.selectedPeriod) {
      case 'semana':
        const weekOfMonth = this.getWeekOfMonth(transferDate);
        return weekOfMonth === this.selectedWeekOfMonth && 
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

  groupByDate() {
    const groups = new Map<string, Transfer[]>();
    
    // Agrupar transferencias por fecha
    this.filteredTransfers.forEach(transfer => {
      const dateKey = this.formatDateKey(new Date(transfer.date));
      const group = groups.get(dateKey);
      if (group) {
        group.push(transfer);
      } else {
        groups.set(dateKey, [transfer]);
      }
    });

    // Convertir a array y ordenar por fecha descendente
    this.groupedTransfers = Array.from(groups.entries())
      .map(([fecha, items]) => ({ 
        fecha, 
        items: items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      }))
      .sort((a, b) => new Date(b.items[0].date).getTime() - new Date(a.items[0].date).getTime());
  }

  // MARK: - MODAL DE CUENTAS

  openAccountModal() {
    this.isAccountModalOpen = true;
  }

  closeAccountModal() {
    this.isAccountModalOpen = false;
    this.filterTransfers();
  }

  toggleSelectAll() {
    this.selectAllAccounts = !this.selectAllAccounts;
    if (this.selectAllAccounts) {
      this.accounts.forEach(account => account.selected = true);
    }
    this.filterTransfers();
  }

  toggleAccountSelection(account: AccountFilter) {
    if (this.selectAllAccounts) {
      // Si está "Todas" activo, desactivarlo y seleccionar solo la cuenta clickeada
      this.selectAllAccounts = false;
      this.accounts.forEach(acc => acc.selected = false);
      account.selected = true;
    } else {
      // Toggle normal de la cuenta
      account.selected = !account.selected;
      
      // Si todas las cuentas están seleccionadas, activar "Todas"
      if (this.accounts.every(acc => acc.selected)) {
        this.selectAllAccounts = true;
      }
    }
  }

  onAccountSelectionChange() {
    this.selectAllAccounts = this.accounts.every(acc => acc.selected);
  }

  applyAccountFilter() {
    this.closeAccountModal();
    this.filterTransfers();
  }

  getModalClass(): string {
    const numCuentas = this.accounts.length + 1; // +1 por "Todas las cuentas"
    if (numCuentas <= 2) return 'custom-modal modal-small';
    if (numCuentas === 3) return 'custom-modal modal-medium';
    if (numCuentas === 4) return 'custom-modal modal-large';
    return 'custom-modal modal-xlarge';
  }

  get selectedAccountsCount(): number {
    return this.accounts.filter(acc => acc.selected).length;
  }

  get accountFilterLabel(): string {
    if (this.selectAllAccounts || this.selectedAccountsCount === this.accounts.length) {
      return 'Todas las cuentas';
    }
    const count = this.selectedAccountsCount;
    if (count === 0) return 'Ninguna cuenta';
    if (count === 1) {
      const selected = this.accounts.find(acc => acc.selected);
      return selected ? selected.name : 'Seleccionar cuentas';
    }
    return `${count} cuentas`;
  }

  formatDateKey(date: Date): string {
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
  }

  getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  formatCurrency(amount: number): string {
    const prefix = amount >= 0 ? '+ ' : '- ';
    return `${prefix}${Math.abs(amount)} S/.`;
  }

  getMonthName(month: number): string {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[month - 1];
  }

  // Método auxiliar para comparar si dos fechas son el mismo día
  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  // Método para obtener la semana del mes (1-4)
  private getWeekOfMonth(date: Date): number {
    const day = date.getDate();
    if (day <= 7) return 1;
    if (day <= 14) return 2;
    if (day <= 21) return 3;
    return 4;
  }

  // Método para obtener cuántas semanas tiene un mes (siempre 4)
  private getWeeksInMonth(month: number, year: number): number {
    return 4;
  }

  getTransferIcon(type: string): string {
    switch(type) {
      case 'Inicial':
        return 'salary';
      case 'Ajuste':
        return 'edit';
      case 'Realizado':
      default:
        return 'send-money';
    }
  }
  
}