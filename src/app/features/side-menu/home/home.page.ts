import { ListAccountsUseCase } from '../../../core/use-cases/accounts/list-accounts.usecase';
import { ListTransferUseCase } from '../../../core/use-cases/transfer/list-transfer.usecase';
import { ListTransactionsUseCase } from '../../../core/use-cases/transactions/list-transactions.usecase';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CustomSegmentComponent } from "src/app/shared/components/custom-segment/custom-segment.component";
import { NavigationService } from "src/app/core/services/navigation.service";
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { Categoria } from 'src/app/shared/models/categoria.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomSegmentComponent],
})
export class HomePage {

  showGenericAlert = false;
  showUnauthorizedAlert: boolean = false
  messageError: string = '';

  isModalOpen = false;
  amount = 200;
  newAmount: number = this.amount;
  errorMessage: string | null = null;
  segment: 'gastos' | 'ingresos' = 'gastos';

  categoriesWithAmounts: Array<Categoria & { totalAmount: number }> = [];
  gastosGrouped: Array<Categoria & { totalAmount: number }> = [];
  ingresosGrouped: Array<Categoria & { totalAmount: number }> = [];

  dataTabs = [
    { value: 'gastos', label: 'Gasto' },
    { value: 'ingresos', label: 'Ingreso' }
  ];

  constructor(
    private listAccountsUseCase: ListAccountsUseCase,
    private listTransferUseCase: ListTransferUseCase,
    private listTransactionsUseCase: ListTransactionsUseCase,
    private navService: NavigationService,
    private loadingService: SpinnerService,
  ) {
    this.executeAccountList();
    this.executeTransferList();
    this.executeTransactionsList();
  }

  // MARK: - SERVICIOS

  private executeAccountList() {
    this.loadingService.show();
    this.listAccountsUseCase.listAccounts().subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          // guardar los datos y mostrarlos en la pantalla
        } else if (result.error) {
          if (result.error.description) {
            this.showUnauthorizedAlert = true;
            this.messageError = result.error.description;
          } else {
            this.showGenericAlert = true;
          }
        } else {
          this.showGenericAlert = true;
        }
      },
      error: (err) => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  private executeTransferList() {
    this.loadingService.show();
    this.listTransferUseCase.listTransfer().subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          console.log('Transfers List:', result.data.items);
        } else if (result.error) {
          console.error('Error loading transfers:', result.error);
        }
      },
      error: (err) => {
        this.loadingService.hide();
        console.error('Error executing transfer list:', err);
      }
    });
  }

  private executeTransactionsList() {
    this.loadingService.show();
    this.listTransactionsUseCase.execute().subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          console.log('Transactions List:', result.data.items);
          this.groupTransactionsByCategory(result.data.items);
        } else if (result.error) {
          console.error('Error loading transactions:', result.error);
        }
      },
      error: (err) => {
        this.loadingService.hide();
        console.error('Error executing transactions list:', err);
      }
    });
  }

  // MARK: - FUNCIONES

  private groupTransactionsByCategory(transactions: any[]) {
    const categoryMap = new Map<string, { category: Categoria; total: number }>();

    transactions.forEach(transaction => {
      const key = transaction.nombre;
      if (categoryMap.has(key)) {
        const existing = categoryMap.get(key)!;
        existing.total += parseFloat(transaction.monto || 0);
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
          total: parseFloat(transaction.monto || 0)
        });
      }
    });

    const grouped = Array.from(categoryMap.values()).map(item => ({
      ...item.category,
      totalAmount: item.total
    }));

    // Separar por tipo
    this.gastosGrouped = grouped.filter(cat => cat.tipo === 'gastos');
    this.ingresosGrouped = grouped.filter(cat => cat.tipo === 'ingresos');

    console.log('Gastos agrupados:', this.gastosGrouped);
    console.log('Ingresos agrupados:', this.ingresosGrouped);

    this.updateCategoriesDisplay();
  }

  private updateCategoriesDisplay() {
    this.categoriesWithAmounts = this.segment === 'gastos' ? this.gastosGrouped : this.ingresosGrouped;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateAmount() {
    if (this.newAmount) {
      this.amount = this.newAmount;
    }
    this.closeModal();
  }

  onSegmentChanged(event: string | number) {
    this.segment = event as 'gastos' | 'ingresos';
    console.log('Segment changed to:', this.segment);
    this.updateCategoriesDisplay();
  }

  navigateToCreateTransac() {
    this.navService.push('/home/create');
  }
  
}
