import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Router } from '@angular/router';
import { CustomAlertComponent } from "../../../../shared/components/custom-alert/custom-alert.component";
import { ListAccountsUseCase, Accounts } from "src/app/core/use-cases/accounts/list-accounts.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { CreateTransferRequest, CreateTransferUseCase } from "src/app/core/use-cases/transfer/create-transfer.usecase";
import { convertISODateToSQL } from "src/app/core/utils/date.util";

@Component({
  selector: "app-new-transfer",
  templateUrl: "./new-transfer.page.html",
  styleUrls: ["./new-transfer.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomAlertComponent],
})
export class NewTransferPage implements OnInit {

  accounts: Accounts[] = [];
  selectedAccount: Accounts | null = null;
  isModalOpen: boolean = false;
  tipoSeleccion: 'origen' | 'destino' = 'origen';
  cambiosPendientes = false;
  
  cuentaOrigenId: string = '';
  cuentaOrigen: string = '';
  cuentaDestinoId: string = '';
  cuentaDestino: string = '';
  monto: number | null = null;
  fecha: string = new Date().toISOString();
  comentario: string = '';
  
  showCustomAlert: boolean = false;
  showGenericAlert: boolean = false;
  showUnauthorizedAlert: boolean = false;
  messageError: string = '';
  maxDate: string = new Date().toISOString();

  constructor(
    private navService: NavigationService,
    private router: Router,
    private listAccountsUseCase: ListAccountsUseCase,
    private loadingService: SpinnerService,
    private createTransferUseCase: CreateTransferUseCase,
  ) {}

  ngOnInit() {
    this.executeAccountList();
  }

  // MARK: - SERVICIOS

  private executeAccountList() {
    this.loadingService.show();
    this.listAccountsUseCase.listAccounts().subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data?.items) {
          this.accounts = result.data.items
        }
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  private executeCreateTransfer(body: CreateTransferRequest) {
    this.loadingService.show();
    this.createTransferUseCase.createTransfer(body).subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          this.cambiosPendientes = false;
          this.navService.back();
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

  // MARK: - FUNCIONALIDADES

  seleccionarCuentaOrigen() {
    this.tipoSeleccion = 'origen';
    this.selectedAccount = null;
    this.isModalOpen = true;
  }

  seleccionarCuentaDestino() {
    this.tipoSeleccion = 'destino';
    this.selectedAccount = null;
    this.isModalOpen = true;
  }

  get cuentasDisponibles() {
    return this.tipoSeleccion === 'destino' 
      ? this.accounts.filter(c => c.id.toString() !== this.cuentaOrigenId)
      : this.accounts;
  }

  getModalClass(): string {
    const numCuentas = this.cuentasDisponibles.length;
    if (numCuentas === 1) return 'custom-modal modal-small';
    if (numCuentas === 2) return 'custom-modal modal-medium';
    if (numCuentas === 3) return 'custom-modal modal-large';
    return 'custom-modal modal-xlarge';
  }

  async crearTransferencia() {
    if (!this.validarTransferencia()) return;
    const transferencia: CreateTransferRequest = {
      originAccountId: this.cuentaOrigenId,
      destinationAccountId: this.cuentaDestinoId,
      amount: this.monto!,
      date: convertISODateToSQL(this.fecha),
      comment: this.comentario.trim()
    };
    this.executeCreateTransfer(transferencia);
  }

  private validarTransferencia(): boolean {
    if (!this.cuentaOrigenId || !this.cuentaDestinoId) {
      console.error('Debe seleccionar cuentas de origen y destino');
      return false;
    }

    if (!this.monto || this.monto <= 0) {
      console.error('El monto debe ser mayor a 0');
      return false;
    }

    if (this.cuentaOrigenId === this.cuentaDestinoId) {
      console.error('Las cuentas de origen y destino deben ser diferentes');
      return false;
    }

    const cuentaOrig = this.accounts.find(c => c.id.toString() === this.cuentaOrigenId);
    if (cuentaOrig && cuentaOrig.amount < this.monto) {
      console.error('Saldo insuficiente en la cuenta de origen');
      return false;
    }

    return true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedAccount = null;
  }

  updateAmount() {
    if (this.selectedAccount) {
      // this.confirmarCuenta();
    }
    this.closeModal();
  }
  
  seleccionarYConfirmar(account: Accounts) {
    this.selectedAccount = account;
    this.marcarCambiosPendientes();
    
    if (this.tipoSeleccion === 'origen') {
      this.cuentaOrigenId = account.id.toString();
      this.cuentaOrigen = account.name;
      
      if (this.cuentaDestinoId === this.cuentaOrigenId) {
        this.cuentaDestinoId = '';
        this.cuentaDestino = '';
      }
    } else {
      this.cuentaDestinoId = account.id.toString();
      this.cuentaDestino = account.name;
    }

    this.closeModal();
  }

  marcarCambiosPendientes() {
    this.cambiosPendientes = true;
  }

  onInputChange() {
    this.marcarCambiosPendientes();
  }

  async backToCategories() {
    const hayCambios = 
      this.cuentaDestinoId !== '' ||
      (this.monto !== null && this.monto > 0) ||
      this.comentario.trim() !== '';

    if (hayCambios) {
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
