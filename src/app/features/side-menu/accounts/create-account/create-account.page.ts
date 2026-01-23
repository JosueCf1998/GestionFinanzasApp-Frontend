import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ICONOS_CUENTA, COLORES_CATEGORIA } from 'src/app/shared/constants/category-options';
import { NavigationService } from "src/app/core/services/navigation.service";
import { Router } from '@angular/router';
import { CustomAlertComponent } from "../../../../shared/components/custom-alert/custom-alert.component";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { CreateAccountRequest, CreateAccountUseCase } from "src/app/core/use-cases/Accounts/create-account.usecase";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.page.html",
  styleUrls: ["./create-account.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomAlertComponent],
})
export class CreateAccountPage {

  showGenericAlert = false;
  showUnauthorizedAlert: boolean = false
  messageError: string = '';


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
    private createAccountUseCase: CreateAccountUseCase,
    private navService: NavigationService,
    private loadingService: SpinnerService,
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

  // MARK: - SERVICIOS 
  private executeAccountList(body: CreateAccountRequest) {
    this.loadingService.show();
    this.createAccountUseCase.createAccount(body).subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          this.cambiosPendientes = false;
          this.navService.forward('/main/accounts', 'slide-right');
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

  // MARK: - FUNCIONALDIDADES 
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
    const body: CreateAccountRequest = {
      name: this.nombreCuenta,
      amount: parseFloat(this.montoInicial) || 0,
      icon: this.iconoSeleccionado,
      color: this.colorSeleccionado
    }
    console.log(body);
    this.executeAccountList(body)
  }

  async backToAccounts() {
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
