import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ICONOS_CUENTA, COLORES_CATEGORIA } from 'src/app/shared/constants/category-options';
import { NavigationService } from "src/app/core/services/navigation.service";
import { Router } from '@angular/router';
import { CustomAlertComponent } from "../../../../shared/components/custom-alert/custom-alert.component";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.page.html",
  styleUrls: ["./create-account.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomAlertComponent],
})
export class CreateAccountPage {
  title: string = "";
  iconos = ICONOS_CUENTA;
  colores = COLORES_CATEGORIA;

  iconoSeleccionado: string = "";
  colorSeleccionado: string = "";

  showError: boolean = false;
  showCustomAlert = false;
  cambiosPendientes = false;

  montoInicial: string = '';
  nombreCuenta: string = '';

  constructor(
    private navService: NavigationService,
    private router: Router
  ) {
    const state = window.history.state;
    if (!state || !state.type) {
      this.navService.forward('/main/accounts', 'slide-right');
      throw new Error('No se recibió la información necesaria para crear o editar la cuenta.');
    }
    this.title = state.type === 'crear' ? 'Crear Cuenta' : 'Editar Cuenta';
    if (state.cuenta) {
      this.nombreCuenta = state.cuenta.nombre;
      this.montoInicial = state.cuenta.saldo?.toString() ?? '';
      this.iconoSeleccionado = state.cuenta.icono ?? '';
      this.colorSeleccionado = state.cuenta.color ?? '';
    }
  }

  seleccionarIcono(icon: any) {
    this.iconoSeleccionado = icon.archivo;
    this.cambiosPendientes = true;
  }

  seleccionarColor(color: any) {
    this.colorSeleccionado = color.valor;
    this.cambiosPendientes = true;
  }
  
  isValidateForm(): boolean {
    return (
      !this.nombreCuenta ||
      this.montoInicial === null ||
      this.montoInicial === '' ||
      !this.colorSeleccionado ||
      !this.iconoSeleccionado
    );
  }

  isNumberInvalid(value: any): boolean {
    return isNaN(Number(value));
  }

  guardarCuenta() {
    if (!this.montoInicial || !this.nombreCuenta || !this.iconoSeleccionado || !this.colorSeleccionado) {
      this.showError = true;
      return;
    }
    this.showError = false;

    // Aquí deberías guardar la cuenta (llamada a servicio o almacenamiento)
    const nuevaCuenta = {
      nombre: this.nombreCuenta,
      saldo: parseFloat(this.montoInicial) || 0,
      icono: this.iconoSeleccionado,
      color: this.colorSeleccionado
    };

    // Simulación de guardado y navegación
    this.cambiosPendientes = false;
    this.navService.forward('/main/accounts', 'slide-right');
  }

  async backToAccounts() {
    if (this.cambiosPendientes) {
      this.showCustomAlert = true;
    } else {
      (document.activeElement as HTMLElement)?.blur();
      this.navService.forward('/main/accounts', 'slide-right');
    }
  }

  salirSinGuardar() {
    this.showCustomAlert = false;
    (document.activeElement as HTMLElement)?.blur();
    this.navService.forward('/main/accounts', 'slide-right');
  }
}
