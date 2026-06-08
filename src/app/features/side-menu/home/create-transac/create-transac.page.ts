import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NavigationService } from "src/app/core/services/navigation.service";
import { CreateTransactionsUseCase } from "src/app/core/use-cases/transactions/create-transactions";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { AlertService } from "src/app/core/services/alert.service";
import { CustomAlertComponent } from "src/app/shared/components/custom-alert/custom-alert.component";
import { ListCategoriesUseCase } from "src/app/core/use-cases/categories/list-categories.usecase";
import { ListAccountsUseCase, Accounts } from "src/app/core/use-cases/accounts/list-accounts.usecase";
import { Categoria } from "src/app/shared/models/categoria.model";
import { AccountSelectorModalComponent } from "src/app/shared/components/account-selector-modal/account-selector-modal.component";
import { AmountInputComponent } from "src/app/shared/components/amount-input/amount-input.component";
import 'src/app/core/utils/observable-extensions';

@Component({
  selector: "app-create-transac",
  templateUrl: "./create-transac.page.html",
  styleUrls: ["./create-transac.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CustomAlertComponent, AccountSelectorModalComponent, AmountInputComponent],
})
export class CreateTransacPage implements OnInit {
  segmentoSeleccionado = 'ingresos';
  monto: number | null = null;
  moneda = 'PEN';
  cuentaSeleccionada = '';
  cuentaId = '';
  categoriaSeleccionada: any = null;
  fecha = new Date().toISOString();
  fechaSeleccionada = 'hoy';
  comentario = '';

  showError: boolean = false;
  showCustomAlert = false;
  showGenericAlert = false;
  showUnauthorizedAlert = false;
  messageError = '';
  private cambiosPendientes = false;

  isModalOpen: boolean = false;
  cuentaAmount: number | null = null;

  categoriasIngresos: Categoria[] = [];
  categoriasGastos: Categoria[] = [];
  cuentas: Accounts[] = [];

  constructor(
    private navService: NavigationService,
    private createTransactionsUseCase: CreateTransactionsUseCase,
    private listCategoriesUseCase: ListCategoriesUseCase,
    private listAccountsUseCase: ListAccountsUseCase,
    private loadingService: SpinnerService,
    private alertService: AlertService
  ) {
    this.executeListCategories();
    this.executeListAccounts();
  }

  // MARK: - SERVICIOS

  private executeListCategories() {
    this.loadingService.show();
    this.listCategoriesUseCase.execute().service({
      success: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          this.categoriasIngresos = result.data.items.filter(cat => cat.tipo === "ingresos");
          this.categoriasGastos = result.data.items.filter(cat => cat.tipo === "gastos");
        } else if (result.error) {
          if ((result as any).error?.description) {
            this.showUnauthorizedAlert = true;
            this.messageError = (result as any).error.description;
          } else {
            this.showGenericAlert = true;
          }
        } else {
          this.showGenericAlert = true;
        }
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  private executeListAccounts() {
    this.loadingService.show();
    this.listAccountsUseCase.listAccounts().service({
      success: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          this.cuentas = result.data.items;
          if (this.cuentas.length > 0) {
            this.cuentaId = this.cuentas[0].id.toString();
            this.cuentaSeleccionada = this.cuentas[0].name;
            this.cuentaAmount = this.cuentas[0].amount;
          }
        } else if (result.error) {
          if ((result as any).error?.description) {
            this.showUnauthorizedAlert = true;
            this.messageError = (result as any).error.description;
          } else {
            this.showGenericAlert = true;
          }
        } else {
          this.showGenericAlert = true;
        }
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  private executeCreateTransaction(body: any) {
    this.loadingService.show();
    this.createTransactionsUseCase.execute(body).service({
      success: (result) => {
        this.loadingService.hide();
        if (result.success) {
          this.cambiosPendientes = false;
          this.resetForm();
          this.navService.back();
        } else if (result.error) {
          if ((result as any).error?.description) {
            this.alertService.showAlert(
              'Error',
              (result as any).error.description,
              'Aceptar'
            );
          } else {
            this.alertService.showAlert(
              'Error',
              'No se pudo crear la transacción',
              'Aceptar'
            );
          }
        } else {
          this.showGenericAlert = true;
        }
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  // MARK: - FUNCIONES

  ngOnInit() {
    this.setFechaHoy();
  }

  cambiarTipo(tipo: string) {
    this.segmentoSeleccionado = tipo;
    this.categoriaSeleccionada = null;
    this.detectarCambios();
  }

  cambiarSegmento(event: any) {
    this.segmentoSeleccionado = event.detail.value;
    this.categoriaSeleccionada = null;
    this.detectarCambios();
  }

  obtenerCategorias() {
    return this.segmentoSeleccionado === 'ingresos' 
      ? this.categoriasIngresos 
      : this.categoriasGastos;
  }

  seleccionarCategoria(categoria: any) {
    this.categoriaSeleccionada = categoria;
    this.detectarCambios();
  }

  abrirCalculadora() {
    // TODO: Implementar calculadora
  }

  seleccionarCuenta() {
    (document.activeElement as HTMLElement)?.blur();
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onAccountSelected(account: Accounts) {
    this.cuentaId = account.id.toString();
    this.cuentaSeleccionada = account.name;
    this.cuentaAmount = account.amount;
    this.detectarCambios();

  }

  setFechaHoy() {
    this.fecha = new Date().toISOString();
    this.fechaSeleccionada = 'hoy';
    this.detectarCambios();
  }

  setFechaAyer() {
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    this.fecha = ayer.toISOString();
    this.fechaSeleccionada = 'ayer';
    this.detectarCambios();
  }

  setFechaUltimo() {
    this.fechaSeleccionada = 'ultimo';
    this.detectarCambios();
    // TODO: Implementar selección de última fecha usada
  }

  abrirCalendario() {
    // TODO: Implementar selector de calendario
  }

  crearTransaccion() {
    if (!this.puedeGuardar) {
      this.showError = true;
      return;
    }
    this.showError = false;

    const requestBody = {
      categoryId: this.categoriaSeleccionada.id.toString(),
      accountId: this.cuentaId,
      amount: this.monto,
      date: new Date(this.fecha).toISOString().split('T')[0],
      type: this.segmentoSeleccionado,
      description: this.comentario || undefined
    };

    this.executeCreateTransaction(requestBody);
  }

  onMontoChange() {
    this.detectarCambios();
  }

  onComentarioChange() {
    this.detectarCambios();
  }

  private detectarCambios() {
    const tieneMonto = this.monto !== null && this.monto > 0;
    const tieneCategoria = this.categoriaSeleccionada !== null;
    
    this.cambiosPendientes = tieneMonto || tieneCategoria || this.comentario.trim() !== '';
  }

  get puedeGuardar(): boolean {
    const tieneMonto = this.monto !== null && this.monto > 0;
    const tieneCategoria = this.categoriaSeleccionada !== null;
    const tieneCuenta = this.cuentaId !== '';
    
    return tieneMonto && tieneCategoria && tieneCuenta;
  }

  resetForm() {
    this.monto = null;
    this.categoriaSeleccionada = null;
    this.comentario = '';
    this.setFechaHoy();
    this.cambiosPendientes = false;
  }

  async backToCategories() {
    if (this.cambiosPendientes) {
      this.showCustomAlert = true;
    } else {
      (document.activeElement as HTMLElement)?.blur();
      this.navService.back();
    }
  }

  salirSinGuardar() {
    this.showCustomAlert = false;
    (document.activeElement as HTMLElement)?.blur();
    this.navService.back();
  }
}
