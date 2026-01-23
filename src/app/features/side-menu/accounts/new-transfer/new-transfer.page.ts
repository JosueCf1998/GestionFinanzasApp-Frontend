import { Component, OnInit } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Router } from '@angular/router';
import { CustomAlertComponent } from "../../../../shared/components/custom-alert/custom-alert.component";
import { ListAccountsUseCase, Accounts } from "src/app/core/use-cases/accounts/list-accounts.usecase";
import { from } from "rxjs";
import { SpinnerService } from "src/app/core/services/spinnerService.service";

interface CuentaTransferencia {
  nombre: string;
  id: string;
  saldo: number;
  icon: string;
  color: string;
}

@Component({
  selector: "app-new-transfer",
  templateUrl: "./new-transfer.page.html",
  styleUrls: ["./new-transfer.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomAlertComponent],
})
export class NewTransferPage implements OnInit {

  cuentas: CuentaTransferencia[] = [];
  cuentaSeleccionada: CuentaTransferencia | null = null;
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
  maxDate: string = new Date().toISOString();

  constructor(
    private navService: NavigationService,
    private router: Router,
    private listAccountsUseCase: ListAccountsUseCase,
    private loadingService: SpinnerService,
  ) {}

  ngOnInit() {
    this.cargarCuentas();
  }

  // MARK: - SERVICIOS

  private cargarCuentas() {
    this.loadingService.show();
    this.listAccountsUseCase.listAccounts().subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data?.items) {
          this.cuentas = result.data.items.map(account => ({
            nombre: account.name,
            id: account.id.toString(),
            saldo: account.amount,
            icon: account.icon,
            color: account.color
          }));
        }
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  // MARK: - FUNCIONALIDADES

  seleccionarCuentaOrigen() {
    this.tipoSeleccion = 'origen';
    this.cuentaSeleccionada = null;
    this.isModalOpen = true;
  }

  seleccionarCuentaDestino() {
    this.tipoSeleccion = 'destino';
    this.cuentaSeleccionada = null;
    this.isModalOpen = true;
  }

  get cuentasDisponibles() {
    return this.tipoSeleccion === 'destino' 
      ? this.cuentas.filter(c => c.id !== this.cuentaOrigenId)
      : this.cuentas;
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

    const transferencia = {
      cuentaOrigenId: this.cuentaOrigenId,
      cuentaDestinoId: this.cuentaDestinoId,
      monto: this.monto,
      fecha: this.fecha,
      comentario: this.comentario.trim()
    };

    console.log('Transferencia a guardar:', transferencia);

    this.cambiosPendientes = false;
    this.navService.back();
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

    const cuentaOrig = this.cuentas.find(c => c.id === this.cuentaOrigenId);
    if (cuentaOrig && cuentaOrig.saldo < this.monto) {
      console.error('Saldo insuficiente en la cuenta de origen');
      return false;
    }

    return true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.cuentaSeleccionada = null;
  }

  updateAmount() {
    if (this.cuentaSeleccionada) {
      this.confirmarCuenta();
    }
    this.closeModal();
  }
  
  seleccionarCuentaModal(cuenta: CuentaTransferencia) {
    this.cuentaSeleccionada = cuenta;
    this.marcarCambiosPendientes();
  }
  
  confirmarCuenta() {
    if (!this.cuentaSeleccionada) return;

    if (this.tipoSeleccion === 'origen') {
      this.cuentaOrigenId = this.cuentaSeleccionada.id;
      this.cuentaOrigen = this.cuentaSeleccionada.nombre;
      
      if (this.cuentaDestinoId === this.cuentaOrigenId) {
        this.cuentaDestinoId = '';
        this.cuentaDestino = '';
      }
    } else {
      this.cuentaDestinoId = this.cuentaSeleccionada.id;
      this.cuentaDestino = this.cuentaSeleccionada.nombre;
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
