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
import { CreateAccountRequest, CreateAccountUseCase } from "src/app/core/use-cases/accounts/create-account.usecase";
import { Accounts } from "src/app/core/use-cases/accounts/list-accounts.usecase";
import { AmountInputComponent } from "src/app/shared/components/amount-input/amount-input.component";
import 'src/app/core/utils/observable-extensions';
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { UpdateAccountRequest, UpdateAccountUseCase } from "src/app/core/use-cases/Accounts/update-account.usecase";
import { PageLayoutComponent } from "src/app/shared/components/page-layout/page-layout.component";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.page.html",
  styleUrls: ["./create-account.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomAlertComponent, AmountInputComponent, ButtonComponent, PageLayoutComponent],
})
export class CreateAccountPage {

  showGenericAlert = false;
  showUnauthorizedAlert: boolean = false
  messageError: string = '';

  isCreateAccountActive = false

  title: string = "";
  iconos = ICONOS_CUENTA;
  colores = COLORES_CATEGORIA;

  iconoSeleccionado: string = "";
  colorSeleccionado: string = "";

  showError: boolean = false;
  showCustomAlert = false;
  cambiosPendientes = false;

  montoInicial: number | null = null;
  nombreCuenta: string = '';
  accountData: Accounts = {} as Accounts;

  constructor(
    private createAccountUseCase: CreateAccountUseCase,
    private updateAccountUseCase: UpdateAccountUseCase,
    private navService: NavigationService,
    private loadingService: SpinnerService,
  ) {
    const state = window.history.state;
    if (!state || !state.type) {
      this.navService.forward('/main/accounts', 'slide-right');
      throw new Error('No se recibió la información necesaria para crear o editar la cuenta.');
    }
    this.isCreateAccountActive = state.type === 'crear';
    this.updateView(this.isCreateAccountActive, state);
  }

  updateView(value: Boolean, state: any) {
    this.title = value ? 'Crear Cuenta' : 'Editar Cuenta';
    if (state.account) {
      this.accountData = state.account;
      this.nombreCuenta = state.account.name;
      this.montoInicial = state.account.amount ?? null;
      this.iconoSeleccionado = state.account.icon ?? '';
      this.colorSeleccionado = state.account.color ?? '';
    }
  }

  // MARK: - SERVICIOS

  private executeCreateAccount(body: CreateAccountRequest) {
    this.loadingService.show();
    this.createAccountUseCase.execute(body).service({
      success: (data) => {
        this.loadingService.hide();
        if (data) {
          this.cambiosPendientes = false;
          this.navService.back();
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

  private executeUpdateAccount(body: UpdateAccountRequest) {
    this.loadingService.show();
    this.updateAccountUseCase.execute(body).service({
      success: (data) => {
        this.loadingService.hide();
        if (data) {
          this.cambiosPendientes = false;
          this.navService.back();
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
    if (this.isCreateAccountActive) {
      const body: CreateAccountRequest = {
        name: this.nombreCuenta,
        amount: this.montoInicial || 0,
        icon: this.iconoSeleccionado,
        color: this.colorSeleccionado
      }
      this.executeCreateAccount(body)
    } else {
      const body: UpdateAccountRequest = {
        id: this.accountData.id,
        name: this.nombreCuenta,
        amount: this.montoInicial || 0,
        icon: this.iconoSeleccionado,
        color: this.colorSeleccionado
      }
      this.executeUpdateAccount(body)
    }
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
