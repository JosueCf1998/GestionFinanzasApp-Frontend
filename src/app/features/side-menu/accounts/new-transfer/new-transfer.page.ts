import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Router } from '@angular/router';
import { CustomAlertComponent } from "../../../../shared/components/custom-alert/custom-alert.component";
import { AccountSelectorModalComponent } from "src/app/shared/components/account-selector-modal/account-selector-modal.component";
import { ListAccountsUseCase, Accounts } from "src/app/core/use-cases/accounts/list-accounts.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { CreateTransferRequest, CreateTransferUseCase } from "src/app/core/use-cases/transfer/create-transfer.usecase";
import { UpdateTransferRequest, UpdateTransferUseCase } from "src/app/core/use-cases/transfer/update-transfer.usecase";
import { convertISODateToSQL } from "src/app/core/utils/date.util";

@Component({
  selector: "app-new-transfer",
  templateUrl: "./new-transfer.page.html",
  styleUrls: ["./new-transfer.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomAlertComponent, AccountSelectorModalComponent],
})
export class NewTransferPage implements OnInit {

  title: string = 'Crear Transferencia';
  isEditMode: boolean = false;
  transferId: number | null = null;
  
  // Valores originales para detectar cambios en modo edición
  private originalData: {
    cuentaOrigenId: string;
    cuentaDestinoId: string;
    monto: number | null;
    fecha: string;
    comentario: string;
  } = {
    cuentaOrigenId: '',
    cuentaDestinoId: '',
    monto: null,
    fecha: new Date().toISOString(),
    comentario: ''
  };
  
  accounts: Accounts[] = [];
  selectedAccount: Accounts | null = null;
  isModalOpen: boolean = false;
  tipoSeleccion: 'origen' | 'destino' = 'origen';
  cambiosPendientes = false;
  
  cuentaOrigenId: string = '';
  cuentaOrigen: string = '';
  cuentaOrigenAmount: number | null = null;
  cuentaDestinoId: string = '';
  cuentaDestino: string = '';
  cuentaDestinoAmount: number | null = null;
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
    private updateTransferUseCase: UpdateTransferUseCase,
  ) {}

  ngOnInit() {
    const state = window.history.state;
    if (state?.isEdit && state?.transferData) {
      this.isEditMode = true;
      this.title = 'Editar Transferencia';
      this.loadTransferData(state.transferData);
      this.executeAccountList();
      return;
    }
    this.isEditMode = false;
    this.title = 'Crear Transferencia';
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

  private executeUpdateTransfer(body: UpdateTransferRequest) {
    this.loadingService.show();
    this.updateTransferUseCase.updateTransfer(body).subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success) {
          this.cambiosPendientes = false;
          this.navService.backMultiple(2)
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

  private loadTransferData(transfer: any) {
    this.transferId = transfer.id;
    this.cuentaOrigenId = transfer.originAccountId?.toString() || '';
    this.cuentaOrigen = transfer.originAccountName || '';
    this.cuentaDestinoId = transfer.destinationAccountId?.toString() || '';
    this.cuentaDestino = transfer.destinationAccountName || '';
    this.monto = transfer.amount;
    this.fecha = transfer.date ? new Date(transfer.date).toISOString() : new Date().toISOString();
    this.comentario = transfer.comment || '';
    
    // Cargar los montos de las cuentas
    if (this.cuentaOrigenId) {
      const accountOrigen = this.accounts.find(a => a.id.toString() === this.cuentaOrigenId);
      this.cuentaOrigenAmount = accountOrigen?.amount ?? null;
    }
    if (this.cuentaDestinoId) {
      const accountDestino = this.accounts.find(a => a.id.toString() === this.cuentaDestinoId);
      this.cuentaDestinoAmount = accountDestino?.amount ?? null;
    }
    
    // Guardar valores originales para comparar cambios
    this.originalData = {
      cuentaOrigenId: this.cuentaOrigenId,
      cuentaDestinoId: this.cuentaDestinoId,
      monto: this.monto,
      fecha: this.fecha,
      comentario: this.comentario
    };
  }

  seleccionarCuentaOrigen() {
    (document.activeElement as HTMLElement)?.blur();
    this.tipoSeleccion = 'origen';
    this.selectedAccount = null;
    this.isModalOpen = true;
  }

  seleccionarCuentaDestino() {
    (document.activeElement as HTMLElement)?.blur();
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
    
    if (this.isEditMode && this.transferId) {
      // Modo edición: usar updateTransfer
      const transferencia: UpdateTransferRequest = {
        id: this.transferId,
        originAccountId: this.cuentaOrigenId,
        destinationAccountId: this.cuentaDestinoId,
        amount: this.monto!,
        date: convertISODateToSQL(this.fecha),
        comment: this.comentario.trim()
      };
      this.executeUpdateTransfer(transferencia);
    } else {
      // Modo creación: usar createTransfer
      const transferencia: CreateTransferRequest = {
        originAccountId: this.cuentaOrigenId,
        destinationAccountId: this.cuentaDestinoId,
        amount: this.monto!,
        date: convertISODateToSQL(this.fecha),
        comment: this.comentario.trim()
      };
      this.executeCreateTransfer(transferencia);
    }
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
      this.cuentaOrigenAmount = account.amount;
      
      if (this.cuentaDestinoId === this.cuentaOrigenId) {
        this.cuentaDestinoId = '';
        this.cuentaDestino = '';
        this.cuentaDestinoAmount = null;
      }
    } else {
      this.cuentaDestinoId = account.id.toString();
      this.cuentaDestino = account.name;
      this.cuentaDestinoAmount = account.amount;
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
    let hayCambios = false;
    if (this.isEditMode) {
      hayCambios = 
        this.cuentaOrigenId !== this.originalData.cuentaOrigenId ||
        this.cuentaDestinoId !== this.originalData.cuentaDestinoId ||
        this.monto !== this.originalData.monto ||
        this.fecha !== this.originalData.fecha ||
        this.comentario.trim() !== this.originalData.comentario.trim();
    } else {
      // En modo creación, verificar si hay datos ingresados
      hayCambios = 
        this.cuentaDestinoId !== '' ||
        (this.monto !== null && this.monto > 0) ||
        this.comentario.trim() !== '';
    }
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
