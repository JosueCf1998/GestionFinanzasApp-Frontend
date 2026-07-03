import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';

import { AccountSelectorModalComponent, AccountSelectionMode } from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { AmountInputComponent } from 'src/app/shared/components/amount-input/amount-input.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';

import { ListAccountsUseCase, Accounts } from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import { CreateTransferUseCase, CreateTransferRequest } from 'src/app/core/use-cases/transfer/create-transfer.usecase';
import { convertISODateToSQL } from 'src/app/core/utils/date.util';
import { CustomAlertComponent } from "src/app/shared/components/custom-alert/custom-alert.component";

@Component({
  selector: 'app-new-transfer',
  templateUrl: './new-transfer.page.html',
  styleUrls: ['./new-transfer.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AccountSelectorModalComponent,
    AmountInputComponent,
    PageLayoutComponent,
    CustomAlertComponent
],
})
export class NewTransferPage implements OnInit {

  /* =========================
     HEADER
     ========================= */
  title = 'Crear Transferencia';

  /* =========================
     ENUM
     ========================= */
  readonly AccountSelectionMode = AccountSelectionMode;

  /* =========================
     DATA
     ========================= */
  accounts: Accounts[] = [];

  /* =========================
     MODAL
     ========================= */
  isModalOpen = false;
  tipoSeleccion: 'origen' | 'destino' = 'origen';
  selectedAccount: Accounts | null = null;

  /* =========================
     FORM
     ========================= */
  cuentaOrigenId = '';
  cuentaOrigen = '';
  cuentaOrigenAmount: number | null = null;

  cuentaDestinoId = '';
  cuentaDestino = '';
  cuentaDestinoAmount: number | null = null;

  monto: number | null = null;
  fecha: string = new Date().toISOString();
  comentario = '';

  maxDate: string = new Date().toISOString();

  /* =========================
     STATE
     ========================= */
  showCustomAlert = false;
  showGenericAlert = false;

  private MAX_AMOUNT = 9_999_999.99;

  constructor(
    private navService: NavigationService,
    private listAccountsUseCase: ListAccountsUseCase,
    private createTransferUseCase: CreateTransferUseCase,
    private spinner: SpinnerService
  ) {}

  /* =========================
     INIT
     ========================= */
  ngOnInit(): void {
    this.loadAccounts();
  }

  private loadAccounts(): void {
    this.spinner.show();

    this.listAccountsUseCase.listAccounts().service({
      success: (res) => {
        this.spinner.hide();
        this.accounts = res?.items ?? [];
      },
      failure: () => {
        this.spinner.hide();
        this.showGenericAlert = true;
      }
    });
  }

  /* =========================
     MODAL
     ========================= */

  seleccionarCuentaOrigen(): void {
    this.tipoSeleccion = 'origen';
    this.selectedAccount = null;
    this.isModalOpen = true;
  }

  seleccionarCuentaDestino(): void {
    this.tipoSeleccion = 'destino';
    this.selectedAccount = null;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedAccount = null;
  }

  seleccionarYConfirmar(account: Accounts): void {
    this.selectedAccount = account;

    if (this.tipoSeleccion === 'origen') {
      this.cuentaOrigenId = account.id.toString();
      this.cuentaOrigen = account.name;
      this.cuentaOrigenAmount = account.amount;

      // evita mismo origen/destino
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

  /* =========================
     INPUT CHANGE
     ========================= */
  onInputChange(): void {
    // hook futuro si quieres tracking de cambios
  }

  /* =========================
     VALIDATION CORE
     ========================= */

  private validar(): boolean {

    if (!this.cuentaOrigenId || !this.cuentaDestinoId) return false;

    if (!this.monto || this.monto <= 0) return false;

    if (this.monto > this.MAX_AMOUNT) return false;

    if (this.cuentaOrigenId === this.cuentaDestinoId) return false;

    const origen = this.accounts.find(a => a.id.toString() === this.cuentaOrigenId);

    if (origen && origen.amount < this.monto) return false;

    return true;
  }

  /* =========================
     SUBMIT
     ========================= */

  crearTransferencia(): void {

    if (!this.validar()) {
      this.showGenericAlert = true;
      return;
    }

    const body: CreateTransferRequest = {
      originAccountId: this.cuentaOrigenId,
      destinationAccountId: this.cuentaDestinoId,
      amount: this.monto!,
      date: convertISODateToSQL(this.fecha),
      comment: this.comentario?.trim() ?? ''
    };

    this.spinner.show();

    this.createTransferUseCase.createTransfer(body).service({
      success: () => {
        this.spinner.hide();
        this.navService.back();
      },
      failure: () => {
        this.spinner.hide();
        this.showGenericAlert = true;
      }
    });
  }

  /* =========================
     NAV
     ========================= */

  backToCategories(): void {
    (document.activeElement as HTMLElement)?.blur();

    const hayDatos =
      !!this.cuentaOrigenId ||
      !!this.cuentaDestinoId ||
      !!this.monto ||
      !!this.comentario;

    if (hayDatos) {
      this.showCustomAlert = true;
      return;
    }

    this.navService.back();
  }

  salirSinGuardar(): void {
    this.showCustomAlert = false;
    this.navService.back();
  }

  /* =========================
     UI HELPERS (por si luego los necesitas)
     ========================= */

  get canSubmit(): boolean {
    return this.validar();
  }
}
