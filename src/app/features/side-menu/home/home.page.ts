import { ListAccountsUseCase } from '../../../core/use-cases/accounts/list-accounts.usecase';
import { ListTransferUseCase } from '../../../core/use-cases/transfer/list-transfer.usecase';
import { ListTransactionsUseCase } from '../../../core/use-cases/transactions/list-transactions.usecase';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { Categoria } from 'src/app/shared/models/categoria.model';

import 'src/app/core/utils/observable-extensions';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    CustomSegmentComponent
  ],
})
export class HomePage {

  showGenericAlert = false;
  showUnauthorizedAlert = false;
  messageError = '';

  isModalOpen = false;
  hideSecretValues = false

  amount = 200;
  newAmount = this.amount;

  errorMessage: string | null = null;

  segment: 'gastos' | 'ingresos' = 'gastos';

  notificationCount = 3;

  userName = 'Usuario';

  categoriesWithAmounts: Array<Categoria & { totalAmount: number }> = [];

  gastosGrouped: Array<Categoria & { totalAmount: number }> = [];

  ingresosGrouped: Array<Categoria & { totalAmount: number }> = [];

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

  constructor(
    private listAccountsUseCase: ListAccountsUseCase,
    private listTransferUseCase: ListTransferUseCase,
    private listTransactionsUseCase: ListTransactionsUseCase,
    private navService: NavigationService,
    private loadingService: SpinnerService,
    private menuCtrl: MenuController
  ) {
    // Temporalmente desactivados

    // this.executeAccountList();
    // this.executeTransferList();
    // this.executeTransactionsList();
  }

  /* ==========================
     SERVICIOS
     ========================== */

  private executeAccountList(): void {

    this.loadingService.show();

    this.listAccountsUseCase
      .listAccounts()
      .service({

        success: (data) => {

          this.loadingService.hide();

          if (data) {

            // TODO:
            // guardar cuentas
            // calcular balance

          } else {

            this.showGenericAlert = true;

          }

        },

        failure: () => {

          this.loadingService.hide();

          this.showGenericAlert = true;

        }

      });

  }

  private executeTransferList(): void {

    this.loadingService.show();

    this.listTransferUseCase
      .listTransfer()
      .service({

        success: (data) => {

          this.loadingService.hide();

          if (data) {

            console.log(
              'Transfers List:',
              data.items
            );

          }

        },

        failure: (error) => {

          this.loadingService.hide();

          console.error(
            'Error executing transfer list:',
            error
          );

        }

      });

  }

  private executeTransactionsList(): void {

    this.loadingService.show();

    this.listTransactionsUseCase
      .execute()
      .service({

        success: (data) => {

          this.loadingService.hide();

          if (data) {

            console.log(
              'Transactions List:',
              data.items
            );

            this.groupTransactionsByCategory(
              data.items
            );

          }

        },

        failure: (error) => {

          this.loadingService.hide();

          console.error(
            'Error executing transactions list:',
            error
          );

        }

      });

  }

  /* ==========================
     AGRUPAR TRANSACCIONES
     ========================== */

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

    console.log(
      'Gastos agrupados:',
      this.gastosGrouped
    );

    console.log(
      'Ingresos agrupados:',
      this.ingresosGrouped
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

  openModal(): void {

    this.isModalOpen = true;

  }

  closeModal(): void {

    this.isModalOpen = false;

  }

  updateAmount(): void {

    if (this.newAmount) {

      this.amount = this.newAmount;

    }

    this.closeModal();

  }

  validationSecretValues(): void {
    this.hideSecretValues = !this.hideSecretValues;
  }

  onSegmentChanged(
    event: string | number
  ): void {

    this.segment =
      event as 'gastos' | 'ingresos';

    this.updateCategoriesDisplay();

  }

  navigateToCreateTransac(): void {

    this.navService.push(
      '/home/create'
    );

  }

}
