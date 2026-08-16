import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';

import { AccountSelectorModalComponent, AccountSelectionMode } from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { AmountInputComponent } from 'src/app/shared/components/amount-input/amount-input.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';

import { ListAccountsUseCase, Accounts } from 'src/app/core/use-cases/accounts/list-accounts.usecase';
import { CreateTransferUseCase, CreateTransferRequest } from 'src/app/core/use-cases/transfer/create-transfer.usecase';
import { UpdateTransferUseCase } from 'src/app/core/use-cases/transfer/update-transfer.usecase';
import { convertISODateToSQL, getLocalToday } from 'src/app/core/utils/date.util';
import { CustomAlertComponent } from "src/app/shared/components/custom-alert/custom-alert.component";
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FilterModalComponent, FilterSelection } from 'src/app/shared/components/filter-modal/filter-modal.component';
import { InfoBannerComponent } from 'src/app/shared/components/info-banner/info-banner.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { SelectionSummaryComponent } from 'src/app/shared/components/selection-summary/selection-summary.component';
import { TextFieldComponent } from 'src/app/shared/components/text-field/text-field.component';
import { WarningMessageComponent } from 'src/app/shared/components/warning-message/warning-message.component';
import { SuccessReceiptDetail, SuccessReceiptModalComponent } from 'src/app/shared/components/success-receipt-modal/success-receipt-modal.component';

interface TransferFormData {
  id: number;
  originAccountId: number;
  destinationAccountId: number;
  originAccountName?: string;
  destinationAccountName?: string;
  amount: number;
  date: string;
  comment?: string;
}

interface TransferFormState {
  isEdit?: boolean;
  transferData?: TransferFormData;
}

@Component({
  selector: 'app-new-transfer',
  templateUrl: './new-transfer.page.html',
  styleUrls: ['./new-transfer.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AccountSelectorModalComponent,
    AmountInputComponent,
    ButtonComponent,
    FilterModalComponent,
    InfoBannerComponent,
    ItemIconComponent,
    PageLayoutComponent,
    CustomAlertComponent,
    SectionCardComponent,
    SelectionSummaryComponent,
    TextFieldComponent,
    WarningMessageComponent,
    SuccessReceiptModalComponent
],
})
export class NewTransferPage implements OnInit {

  /* =========================
     HEADER
     ========================= */
  readonly isEditMode: boolean;
  readonly transferId: number | null;
  private readonly originalOriginAccountId: number | null;
  private readonly originalAmount: number;

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
  isDateModalOpen = false;
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
  fecha = this.today;
  comentario = '';

  maxDate = getLocalToday();

  /* =========================
     STATE
     ========================= */
  showCustomAlert = false;
  showGenericAlert = false;
  isSaving = false;
  isSuccessReceiptOpen = false;
  operationId: number | null = null;
  private hasPendingChanges = false;

  private MAX_AMOUNT = 9_999_999.99;

  constructor(
    private navService: NavigationService,
    private listAccountsUseCase: ListAccountsUseCase,
    private createTransferUseCase: CreateTransferUseCase,
    private updateTransferUseCase: UpdateTransferUseCase,
    private spinner: SpinnerService
  ) {
    const state = window.history.state as TransferFormState;
    const transfer = state.isEdit ? state.transferData : undefined;
    this.isEditMode = Boolean(transfer);
    this.transferId = transfer?.id ?? null;
    this.originalOriginAccountId = transfer?.originAccountId ?? null;
    this.originalAmount = Number(transfer?.amount) || 0;

    if (transfer) {
      this.cuentaOrigenId = transfer.originAccountId.toString();
      this.cuentaOrigen = transfer.originAccountName ?? '';
      this.cuentaDestinoId = transfer.destinationAccountId.toString();
      this.cuentaDestino = transfer.destinationAccountName ?? '';
      this.monto = Number(transfer.amount);
      this.fecha = convertISODateToSQL(transfer.date);
      this.comentario = transfer.comment ?? '';
    }
  }

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
        this.syncSelectedAccountBalances();
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
    this.selectedAccount = this.accounts.find(account => account.id.toString() === this.cuentaOrigenId) ?? null;
    this.isModalOpen = true;
  }

  seleccionarCuentaDestino(): void {
    this.tipoSeleccion = 'destino';
    this.selectedAccount = this.accounts.find(account => account.id.toString() === this.cuentaDestinoId) ?? null;
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

    this.hasPendingChanges = true;
    this.closeModal();
  }

  /* =========================
     INPUT CHANGE
     ========================= */
  onInputChange(): void {
    this.hasPendingChanges = true;
  }

  openDateModal(): void {
    this.isDateModalOpen = true;
  }

  closeDateModal(): void {
    this.isDateModalOpen = false;
  }

  applyDate(selection: FilterSelection): void {
    this.fecha = selection.startDate;
    this.closeDateModal();
    this.onInputChange();
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

    if (origen && this.effectiveOriginBalance < this.monto) return false;

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

    const operation = this.isEditMode && this.transferId !== null
      ? this.updateTransferUseCase.updateTransfer({ ...body, id: this.transferId })
      : this.createTransferUseCase.createTransfer(body);

    this.isSaving = true;
    this.spinner.show();
    operation.service({
      success: data => {
        this.spinner.hide();
        this.isSaving = false;
        this.hasPendingChanges = false;
        this.operationId = data?.info?.id ?? this.transferId;
        this.isSuccessReceiptOpen = true;
      },
      failure: () => {
        this.spinner.hide();
        this.isSaving = false;
        this.showGenericAlert = true;
      }
    });
  }

  /* =========================
     NAV
     ========================= */

  backToAccounts(): void {
    (document.activeElement as HTMLElement)?.blur();

    const hayDatos = this.isEditMode
      ? this.hasPendingChanges
      : !!this.cuentaOrigenId || !!this.cuentaDestinoId || !!this.monto || !!this.comentario;

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

  viewTransferHistory(): void {
    this.isSuccessReceiptOpen = false;
    void this.navService.back();
  }

  /* =========================
     UI HELPERS (por si luego los necesitas)
     ========================= */

  get canSubmit(): boolean {
    return !this.isSaving &&
      (!this.isEditMode || this.hasPendingChanges) &&
      this.validar();
  }

  get successReceiptDetails(): SuccessReceiptDetail[] {
    return [
      { label: 'Monto', value: `S/ ${this.formatAmount(this.monto ?? 0)}`, emphasis: true },
      { label: 'Desde', value: this.cuentaOrigen, wrap: true },
      { label: 'Hacia', value: this.cuentaDestino, wrap: true },
      { label: 'Fecha', value: this.formattedDate, wrap: true },
      ...(this.comentario.trim()
        ? [{ label: 'Comentario', value: this.comentario.trim(), wrap: true }]
        : []),
      ...(this.operationId !== null
        ? [{ label: 'N.º de operación', value: this.operationId.toString() }]
        : [])
    ];
  }

  get exceedsOriginBalance(): boolean {
    return this.cuentaOrigenAmount !== null &&
      (this.monto ?? 0) > this.effectiveOriginBalance;
  }

  get insufficientBalanceMessage(): string {
    const available = this.effectiveOriginBalance;
    const difference = Math.max((this.monto ?? 0) - available, 0);
    return `Saldo disponible: S/ ${this.formatAmount(available)}. Reduce el monto en S/ ${this.formatAmount(difference)} para continuar.`;
  }

  get availableAccounts(): Accounts[] {
    const excludedId = this.tipoSeleccion === 'origen' ? this.cuentaDestinoId : this.cuentaOrigenId;
    return this.accounts.filter(account => account.id.toString() !== excludedId);
  }

  get originAccountItems(): Accounts[] {
    return this.originAccount ? [this.originAccount] : [];
  }

  get destinationAccountItems(): Accounts[] {
    return this.destinationAccount ? [this.destinationAccount] : [];
  }

  get originAccount(): Accounts | undefined {
    return this.accounts.find(item => item.id.toString() === this.cuentaOrigenId);
  }

  get effectiveOriginBalance(): number {
    const currentBalance = this.cuentaOrigenAmount ?? 0;
    const restoresOriginalAmount = this.isEditMode &&
      Number(this.cuentaOrigenId) === this.originalOriginAccountId;
    return currentBalance + (restoresOriginalAmount ? this.originalAmount : 0);
  }

  get destinationAccount(): Accounts | undefined {
    return this.accounts.find(item => item.id.toString() === this.cuentaDestinoId);
  }

  get dateValue(): string {
    return this.fecha.slice(0, 10);
  }

  get formattedDate(): string {
    return new Intl.DateTimeFormat('es-PE', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC'
    }).format(new Date(`${this.dateValue}T00:00:00Z`));
  }

  private get today(): string {
    return getLocalToday();
  }

  private formatAmount(value: number): string {
    return new Intl.NumberFormat('es-PE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  private syncSelectedAccountBalances(): void {
    const origin = this.originAccount;
    const destination = this.destinationAccount;
    if (origin) {
      this.cuentaOrigen = origin.name;
      this.cuentaOrigenAmount = origin.amount;
    }
    if (destination) {
      this.cuentaDestino = destination.name;
      this.cuentaDestinoAmount = destination.amount;
    }
  }
}
