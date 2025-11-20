import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Router } from '@angular/router';
import { CustomSegmentComponent } from "../../../../shared/components/custom-segment/custom-segment.component";

interface Transfer {
  id: number;
  fecha: Date;
  tipo: string; // 'gasto' | 'ingreso' | 'ajuste'
  categoria: string;
  subcategoria?: string;
  monto: number;
  descripcion?: string;
}

@Component({
  selector: "app-history-transfer",
  templateUrl: "./history-transfer.page.html",
  styleUrls: ["./history-transfer.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomSegmentComponent],
})
export class HistoryTransferPage {
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

  // Datos de transferencias (ejemplo - reemplazar con datos del servicio)
  allTransfers: Transfer[] = [
    {
      id: 1,
      fecha: new Date(2025, 9, 9), // 9 de octubre de 2025
      tipo: 'gasto',
      categoria: 'Principal',
      subcategoria: 'Compras',
      monto: -200,
      descripcion: 'Hol'
    },
    {
      id: 2,
      fecha: new Date(2025, 5, 23), // 23 de junio de 2025
      tipo: 'gasto',
      categoria: 'Principal',
      subcategoria: 'Compras',
      monto: 300,
      descripcion: 'Balance inicial'
    },
    {
      id: 3,
      fecha: new Date(2025, 5, 23), // 23 de junio de 2025
      tipo: 'ajuste',
      categoria: 'Principal',
      subcategoria: 'Ajuste de balance',
      monto: -129
    },
    {
      id: 4,
      fecha: new Date(2025, 3, 25), // 25 de abril de 2025
      tipo: 'ingreso',
      categoria: 'Principal',
      subcategoria: 'Balance inicial',
      monto: 200
    }
  ];

  filteredTransfers: Transfer[] = [];
  groupedTransfers: { fecha: string; items: Transfer[] }[] = [];

  showCustomAlert = false;

  constructor(
    private navService: NavigationService,
    private router: Router
  ) {
    this.filterTransfers();
  }

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
    const now = new Date();
    
    this.filteredTransfers = this.allTransfers.filter(transfer => {
      const transferDate = new Date(transfer.fecha);
      
      switch (this.selectedPeriod) {
        case 'dia':
          return transferDate.toDateString() === this.selectedDay.toDateString();
        
        case 'semana':
          // Filtrar por semana del año
          const weekNumber = this.getWeekNumber(transferDate);
          return weekNumber === this.selectedWeek && 
                 transferDate.getFullYear() === this.selectedYear;
        
        case 'mes':
          return transferDate.getMonth() + 1 === this.selectedMonth && 
                 transferDate.getFullYear() === this.selectedYear;
        
        case 'anio':
          return transferDate.getFullYear() === this.selectedYear;
        
        case 'periodo':
          // Mostrar todas las transferencias
          return true;
        
        default:
          return true;
      }
    });

    // Agrupar por fecha
    this.groupByDate();
  }

  groupByDate() {
    const groups = new Map<string, Transfer[]>();
    
    this.filteredTransfers.forEach(transfer => {
      const dateKey = this.formatDateKey(transfer.fecha);
      if (!groups.has(dateKey)) {
        groups.set(dateKey, []);
      }
      groups.get(dateKey)!.push(transfer);
    });

    this.groupedTransfers = Array.from(groups.entries())
      .map(([fecha, items]) => ({ fecha, items }))
      .sort((a, b) => new Date(b.items[0].fecha).getTime() - new Date(a.items[0].fecha).getTime());
  }

  formatDateKey(date: Date): string {
    const d = new Date(date);
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()}`;
  }

  getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }

  getTransferIcon(tipo: string): string {
    switch (tipo) {
      case 'gasto':
        return 'arrow-down';
      case 'ingreso':
        return 'arrow-up';
      case 'ajuste':
        return 'create-outline';
      default:
        return 'swap-horizontal';
    }
  }

  getTransferIconColor(tipo: string): string {
    switch (tipo) {
      case 'gasto':
        return '#f86c6b';
      case 'ingreso':
        return '#5e9c87';
      case 'ajuste':
        return '#ffc107';
      default:
        return '#6cb2eb';
    }
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
