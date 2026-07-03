import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { ICONOS_CUENTA, COLORES_CATEGORIA } from 'src/app/shared/constants/category-options';

import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';

import { CustomAlertComponent } from '../../../../shared/components/custom-alert/custom-alert.component';
import { AmountInputComponent } from 'src/app/shared/components/amount-input/amount-input.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';

import { CreateAccountUseCase, CreateAccountRequest } from 'src/app/core/use-cases/accounts/create-account.usecase';
import { UpdateAccountUseCase, UpdateAccountRequest } from 'src/app/core/use-cases/Accounts/update-account.usecase';

import { Accounts } from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import { DeleteAccountRequest, DeleteAccountUseCase } from 'src/app/core/use-cases/Accounts/delete-accounts.usecase';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    CustomAlertComponent,
    AmountInputComponent,
    ButtonComponent,
    PageLayoutComponent
  ],
})
export class CreateAccountPage {

  // =========================
  // STATE
  // =========================

  title = '';

  isCreateAccountActive = false;

  showGenericAlert = false;
  showUnauthorizedAlert = false;
  showCustomAlert = false;
  showDeleteAlert = false;

  messageError = '';

  cambiosPendientes = false;

  // =========================
  // DATA
  // =========================

  accountData: Accounts = {} as Accounts;

  nombreCuenta = '';
  montoInicial: number | null = null;

  iconos = ICONOS_CUENTA;
  colores = COLORES_CATEGORIA;

  iconoSeleccionado = '';
  colorSeleccionado = '';

  maxDate = new Date().toISOString();

  // =========================
  // SNAPSHOT ORIGINAL (EDIT)
  // =========================

  private originalData = {
    nombreCuenta: '',
    montoInicial: null as number | null,
    iconoSeleccionado: '',
    colorSeleccionado: ''
  };

  constructor(
    private createAccountUseCase: CreateAccountUseCase,
    private updateAccountUseCase: UpdateAccountUseCase,
    private deleteAccountUseCase: DeleteAccountUseCase,
    private navService: NavigationService,
    private loadingService: SpinnerService
  ) {
    const state = window.history.state;
    if (!state?.type) {
      this.navService.forward('/main/accounts', 'slide-right');
      throw new Error('No se recibió información válida');
    }
    this.isCreateAccountActive = state.type === 'crear';
    this.updateView(this.isCreateAccountActive, state);
  }

  // =========================
  // INIT VIEW
  // =========================

  updateView(isCreate: boolean, state: any) {

    this.title = isCreate ? 'Crear Cuenta' : 'Editar Cuenta';

    if (state.account) {

      this.accountData = state.account;

      this.nombreCuenta = state.account.name;
      this.montoInicial = state.account.amount ?? null;
      this.iconoSeleccionado = state.account.icon ?? '';
      this.colorSeleccionado = state.account.color ?? '';

      // snapshot original
      this.originalData = {
        nombreCuenta: this.nombreCuenta,
        montoInicial: this.montoInicial,
        iconoSeleccionado: this.iconoSeleccionado,
        colorSeleccionado: this.colorSeleccionado
      };
    }
  }

  // =========================
  // SNAPSHOT ORIGINAL (EDIT)
  // =========================

  private createAccountService() {
    const body: CreateAccountRequest = {
      name: this.nombreCuenta,
      amount: this.montoInicial || 0,
      icon: this.iconoSeleccionado,
      color: this.colorSeleccionado
    };
    this.loadingService.show();
    this.createAccountUseCase.execute(body).service({
      success: () => {
        this.loadingService.hide();
        this.cambiosPendientes = false;
        this.navService.back();
      },
      failure: () => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  private updateAccountService() {
    const body: UpdateAccountRequest = {
      id: this.accountData.id,
      name: this.nombreCuenta,
      amount: this.montoInicial || 0,
      icon: this.iconoSeleccionado,
      color: this.colorSeleccionado
    };
    this.loadingService.show();
    this.updateAccountUseCase.execute(body).service({
      success: () => {
        this.loadingService.hide();
        this.cambiosPendientes = false;
        this.navService.back();
      },
      failure: () => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  private deleteAccountService() {
    const body: DeleteAccountRequest = {
      accountId: this.accountData.id.toString()
    };
    this.loadingService.show();
    this.deleteAccountUseCase.execute(body).service({
      success: () => {
        this.loadingService.hide();
        this.cambiosPendientes = false;
        this.navService.back();
      },
      failure: () => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  // =========================
  // VALIDATION (FORM READY)
  // =========================

  isValidateForm(): boolean {
    return (
      !this.nombreCuenta?.trim() ||
      this.montoInicial === null ||
      !this.iconoSeleccionado ||
      !this.colorSeleccionado
    );
  }

  // =========================
  // CHANGE DETECTION (REAL DIRTY CHECK)
  // =========================

  get hasChanges(): boolean {

    if (this.isCreateAccountActive) {
      return Boolean(
        this.nombreCuenta ||
        this.montoInicial !== null ||
        this.iconoSeleccionado ||
        this.colorSeleccionado
      );
    }

    return (
      this.nombreCuenta !== this.originalData.nombreCuenta ||
      this.montoInicial !== this.originalData.montoInicial ||
      this.iconoSeleccionado !== this.originalData.iconoSeleccionado ||
      this.colorSeleccionado !== this.originalData.colorSeleccionado
    );
  }

  // =========================
  // UI ACTIONS
  // =========================

  seleccionarIcono(icon: any) {
    this.iconoSeleccionado = icon.archivo;
    this.cambiosPendientes = true;
  }

  seleccionarColor(color: any) {
    this.colorSeleccionado = color.valor;
    this.cambiosPendientes = true;
  }

  // =========================
  // SAVE
  // =========================

  guardarCuenta() {

    if (this.isValidateForm()) {
      this.showError();
      return;
    }

    this.isCreateAccountActive
      ? this.createAccountService()
      : this.updateAccountService();
  }

  // =========================
  // DELETE
  // =========================

  deleteAccount() {
    this.showDeleteAlert = true;
  }

  confirmarEliminacion() {
    this.showDeleteAlert = false;
    this.deleteAccountService();
  }

  cerrarAlert() {
    this.showDeleteAlert = false;
  }

  // =========================
  // NAVIGATION
  // =========================

  backToAccounts() {
    if (this.hasChanges) {
      this.showCustomAlert = true;
      return;
    }
    this.navService.back();
  }

  salirSinGuardar() {
    this.showCustomAlert = false;
    this.navService.back();
  }

  // =========================
  // HELPERS
  // =========================

  private showError() {
    this.showGenericAlert = true;
  }
}
