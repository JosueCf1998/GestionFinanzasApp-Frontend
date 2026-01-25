import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Router } from '@angular/router';
import { CustomSegmentComponent } from "../../../../shared/components/custom-segment/custom-segment.component";
import { ListTransferUseCase, Transfer } from "src/app/core/use-cases/transfer/list-transfer.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";

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
  selectedPeriod: string = 'anio';
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;
  selectedWeek: number = 1;
  selectedDay: Date = new Date();

  // Opciones de periodos
  periodTabs = [
    { value: 'dia', label: 'Día' },
    { value: 'semana', label: 'Semana' },
    { value: 'mes', label: 'Mes' },
    { value: 'anio', label: 'Año' }
  ];

  allTransfers: Transfer[] = [];
  filteredTransfers: Transfer[] = [];
  groupedTransfers: { fecha: string; items: Transfer[] }[] = [];

  showCustomAlert = false;

  constructor(
    private navService: NavigationService,
    private router: Router,
    private listTransferUseCase: ListTransferUseCase,
    private loadingService: SpinnerService
  ) {}

  ngOnInit() {
    this.executeTransferList();
  }

  // MARK: - SERVICIOS

  private executeTransferList() {
    this.loadingService.show();
    this.listTransferUseCase.listTransfer().subscribe({
      next: (result) => {
        this.loadingService.hide();
        console.log('Respuesta del servicio:', result);
        if (result.success && result.data?.items) {
          this.allTransfers = result.data.items;
          console.log('Transferencias cargadas:', this.allTransfers);
          this.filterTransfers();
        } else {
          console.log('No hay items en la respuesta o no fue exitoso');
        }
      },
      error: (err) => {
        this.loadingService.hide();
        console.error('Error al cargar transferencias:', err);
      }
    });
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
    this.selectedWeek += direction;
    if (this.selectedWeek > 52) {
      this.selectedWeek = 1;
      this.selectedYear++;
    } else if (this.selectedWeek < 1) {
      this.selectedWeek = 52;
      this.selectedYear--;
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
    console.log('Filtrando transferencias. Total:', this.allTransfers.length);
    console.log('Período seleccionado:', this.selectedPeriod);
    
    this.filteredTransfers = this.allTransfers.filter(transfer => {
      const transferDate = new Date(transfer.date);
      
      switch (this.selectedPeriod) {
        case 'dia':
          return transferDate.toDateString() === this.selectedDay.toDateString();
        
        case 'semana':
          const weekNumber = this.getWeekNumber(transferDate);
          return weekNumber === this.selectedWeek && 
                 transferDate.getFullYear() === this.selectedYear;
        
        case 'mes':
          return transferDate.getMonth() + 1 === this.selectedMonth && 
                 transferDate.getFullYear() === this.selectedYear;
        
        case 'anio':
          return transferDate.getFullYear() === this.selectedYear;
        
        case 'periodo':
          return true;
        
        default:
          return true;
      }
    });

    console.log('Transferencias filtradas:', this.filteredTransfers.length);
    this.groupByDate();
  }

  groupByDate() {
    const groups = new Map<string, Transfer[]>();
    
    this.filteredTransfers.forEach(transfer => {
      const dateKey = this.formatDateKey(new Date(transfer.date));
      if (!groups.has(dateKey)) {
        groups.set(dateKey, []);
      }
      groups.get(dateKey)!.push(transfer);
    });
  
    console.log('Grupos creados:', this.groupedTransfers.length);
    console.log('Transferencias agrupadas:', this.groupedTransfers);
  
    this.groupedTransfers = Array.from(groups.entries())
      .map(([fecha, items]) => ({ fecha, items }))
      .sort((a, b) => new Date(b.items[0].date).getTime() - new Date(a.items[0].date).getTime());
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
  
}