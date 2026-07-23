import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountSelectorModalComponent, AccountSelectionMode } from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { AmountInputComponent } from 'src/app/shared/components/amount-input/amount-input.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { convertISODateToSQL } from 'src/app/core/utils/date.util';
import { CustomAlertComponent } from "src/app/shared/components/custom-alert/custom-alert.component";
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/services/navigation.service";
import * as i2 from "src/app/core/use-cases/accounts/list-accounts.usecase";
import * as i3 from "src/app/core/use-cases/transfer/create-transfer.usecase";
import * as i4 from "src/app/core/services/spinnerService.service";
import * as i5 from "@ionic/angular";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
function NewTransferPage_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" S/. ", i0.ɵɵpipeBind2(2, 1, ctx_r0.cuentaOrigenAmount, "1.2-2"), " ");
} }
function NewTransferPage_span_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 18);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" S/. ", i0.ɵɵpipeBind2(2, 1, ctx_r0.cuentaDestinoAmount, "1.2-2"), " ");
} }
function NewTransferPage_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ion-datetime", 19);
    i0.ɵɵtwoWayListener("ngModelChange", function NewTransferPage_ng_template_30_Template_ion_datetime_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r0.fecha, $event) || (ctx_r0.fecha = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ionChange", function NewTransferPage_ng_template_30_Template_ion_datetime_ionChange_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.onInputChange()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.fecha);
    i0.ɵɵproperty("max", ctx_r0.maxDate);
} }
function NewTransferPage_app_custom_alert_39_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 20);
    i0.ɵɵlistener("onCancel", function NewTransferPage_app_custom_alert_39_Template_app_custom_alert_onCancel_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showCustomAlert = false); })("onConfirm", function NewTransferPage_app_custom_alert_39_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.salirSinGuardar()); });
    i0.ɵɵelementEnd();
} }
export class NewTransferPage {
    constructor(navService, listAccountsUseCase, createTransferUseCase, spinner) {
        this.navService = navService;
        this.listAccountsUseCase = listAccountsUseCase;
        this.createTransferUseCase = createTransferUseCase;
        this.spinner = spinner;
        /* =========================
           HEADER
           ========================= */
        this.title = 'Crear Transferencia';
        /* =========================
           ENUM
           ========================= */
        this.AccountSelectionMode = AccountSelectionMode;
        /* =========================
           DATA
           ========================= */
        this.accounts = [];
        /* =========================
           MODAL
           ========================= */
        this.isModalOpen = false;
        this.tipoSeleccion = 'origen';
        this.selectedAccount = null;
        /* =========================
           FORM
           ========================= */
        this.cuentaOrigenId = '';
        this.cuentaOrigen = '';
        this.cuentaOrigenAmount = null;
        this.cuentaDestinoId = '';
        this.cuentaDestino = '';
        this.cuentaDestinoAmount = null;
        this.monto = null;
        this.fecha = new Date().toISOString();
        this.comentario = '';
        this.maxDate = new Date().toISOString();
        /* =========================
           STATE
           ========================= */
        this.showCustomAlert = false;
        this.showGenericAlert = false;
        this.MAX_AMOUNT = 9_999_999.99;
    }
    /* =========================
       INIT
       ========================= */
    ngOnInit() {
        this.loadAccounts();
    }
    loadAccounts() {
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
    closeModal() {
        this.isModalOpen = false;
        this.selectedAccount = null;
    }
    seleccionarYConfirmar(account) {
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
        }
        else {
            this.cuentaDestinoId = account.id.toString();
            this.cuentaDestino = account.name;
            this.cuentaDestinoAmount = account.amount;
        }
        this.closeModal();
    }
    /* =========================
       INPUT CHANGE
       ========================= */
    onInputChange() {
        // hook futuro si quieres tracking de cambios
    }
    /* =========================
       VALIDATION CORE
       ========================= */
    validar() {
        if (!this.cuentaOrigenId || !this.cuentaDestinoId)
            return false;
        if (!this.monto || this.monto <= 0)
            return false;
        if (this.monto > this.MAX_AMOUNT)
            return false;
        if (this.cuentaOrigenId === this.cuentaDestinoId)
            return false;
        const origen = this.accounts.find(a => a.id.toString() === this.cuentaOrigenId);
        if (origen && origen.amount < this.monto)
            return false;
        return true;
    }
    /* =========================
       SUBMIT
       ========================= */
    crearTransferencia() {
        if (!this.validar()) {
            this.showGenericAlert = true;
            return;
        }
        const body = {
            originAccountId: this.cuentaOrigenId,
            destinationAccountId: this.cuentaDestinoId,
            amount: this.monto,
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
    backToCategories() {
        document.activeElement?.blur();
        const hayDatos = !!this.cuentaOrigenId ||
            !!this.cuentaDestinoId ||
            !!this.monto ||
            !!this.comentario;
        if (hayDatos) {
            this.showCustomAlert = true;
            return;
        }
        this.navService.back();
    }
    salirSinGuardar() {
        this.showCustomAlert = false;
        this.navService.back();
    }
    /* =========================
       UI HELPERS (por si luego los necesitas)
       ========================= */
    get canSubmit() {
        return this.validar();
    }
    static { this.ɵfac = function NewTransferPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NewTransferPage)(i0.ɵɵdirectiveInject(i1.NavigationService), i0.ɵɵdirectiveInject(i2.ListAccountsUseCase), i0.ɵɵdirectiveInject(i3.CreateTransferUseCase), i0.ɵɵdirectiveInject(i4.SpinnerService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NewTransferPage, selectors: [["app-new-transfer"]], decls: 41, vars: 19, consts: [[3, "back", "title", "showBack"], ["scroll-y", "false", 3, "fullscreen"], [1, "transfer-form", 3, "ngSubmit"], [1, "transfer-section"], [1, "transfer-label"], ["type", "button", 1, "account-btn", 3, "click"], [1, "account-btn-content"], [1, "account-name"], ["class", "account-amount", 4, "ngIf"], [1, "amount-row"], ["name", "monto", "placeholder", "0.00", "currencyCode", "PEN", "variant", "enhanced", "locale", "es-PE", 3, "ngModelChange", "ngModel", "required", "maxDigits"], ["datetime", "fecha-transferencia"], [3, "keepContentsMounted"], ["name", "comentario", "maxlength", "4096", "placeholder", "Agrega un comentario (opcional)", 1, "comment-input", 3, "ngModelChange", "ionChange", "ngModel"], [1, "comment-count"], ["expand", "block", "type", "submit", 1, "btn-transferir", 3, "disabled"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la transferencia. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm", 4, "ngIf"], [3, "modalClosed", "accountSelected", "isOpen", "accounts", "selectionMode", "selectedAccount"], [1, "account-amount"], ["id", "fecha-transferencia", "presentation", "date", "name", "fecha", 3, "ngModelChange", "ionChange", "ngModel", "max"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la transferencia. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm"]], template: function NewTransferPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-header")(1, "app-page-layout", 0);
            i0.ɵɵlistener("back", function NewTransferPage_Template_app_page_layout_back_1_listener() { return ctx.backToCategories(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(2, "ion-content", 1)(3, "form", 2);
            i0.ɵɵlistener("ngSubmit", function NewTransferPage_Template_form_ngSubmit_3_listener() { return ctx.crearTransferencia(); });
            i0.ɵɵelementStart(4, "div", 3)(5, "label", 4);
            i0.ɵɵtext(6, " Transfiere desde ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "button", 5);
            i0.ɵɵlistener("click", function NewTransferPage_Template_button_click_7_listener() { return ctx.seleccionarCuentaOrigen(); });
            i0.ɵɵelementStart(8, "div", 6)(9, "span", 7);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(11, NewTransferPage_span_11_Template, 3, 4, "span", 8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "div", 3)(13, "label", 4);
            i0.ɵɵtext(14, " Transfiere hacia ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "button", 5);
            i0.ɵɵlistener("click", function NewTransferPage_Template_button_click_15_listener() { return ctx.seleccionarCuentaDestino(); });
            i0.ɵɵelementStart(16, "div", 6)(17, "span", 7);
            i0.ɵɵtext(18);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(19, NewTransferPage_span_19_Template, 3, 4, "span", 8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "div", 3)(21, "label", 4);
            i0.ɵɵtext(22, " Monto ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 9)(24, "app-amount-input", 10);
            i0.ɵɵtwoWayListener("ngModelChange", function NewTransferPage_Template_app_amount_input_ngModelChange_24_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.monto, $event) || (ctx.monto = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function NewTransferPage_Template_app_amount_input_ngModelChange_24_listener() { return ctx.onInputChange(); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(25, "div", 3)(26, "label", 4);
            i0.ɵɵtext(27, " Fecha ");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(28, "ion-datetime-button", 11);
            i0.ɵɵelementStart(29, "ion-modal", 12);
            i0.ɵɵtemplate(30, NewTransferPage_ng_template_30_Template, 1, 2, "ng-template");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "div", 3)(32, "label", 4);
            i0.ɵɵtext(33, " Comentario ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "ion-textarea", 13);
            i0.ɵɵtwoWayListener("ngModelChange", function NewTransferPage_Template_ion_textarea_ngModelChange_34_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.comentario, $event) || (ctx.comentario = $event); return $event; });
            i0.ɵɵlistener("ionChange", function NewTransferPage_Template_ion_textarea_ionChange_34_listener() { return ctx.onInputChange(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 14);
            i0.ɵɵtext(36);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "ion-button", 15);
            i0.ɵɵtext(38, " Guardar transferencia ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(39, NewTransferPage_app_custom_alert_39_Template, 1, 0, "app-custom-alert", 16);
            i0.ɵɵelementStart(40, "app-account-selector-modal", 17);
            i0.ɵɵlistener("modalClosed", function NewTransferPage_Template_app_account_selector_modal_modalClosed_40_listener() { return ctx.closeModal(); })("accountSelected", function NewTransferPage_Template_app_account_selector_modal_accountSelected_40_listener($event) { return ctx.seleccionarYConfirmar($event); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", ctx.title)("showBack", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("fullscreen", true);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" ", ctx.cuentaOrigen || "Selecciona una cuenta", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.cuentaOrigenAmount !== null);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1(" ", ctx.cuentaDestino || "Selecciona una cuenta", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.cuentaDestinoAmount !== null);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.monto);
            i0.ɵɵproperty("required", true)("maxDigits", 11);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("keepContentsMounted", true);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.comentario);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", (ctx.comentario == null ? null : ctx.comentario.length) || 0, "/4096 ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", !ctx.canSubmit);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.showCustomAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isModalOpen)("accounts", ctx.accounts)("selectionMode", ctx.AccountSelectionMode.SINGLE)("selectedAccount", ctx.selectedAccount);
        } }, dependencies: [IonicModule, i5.IonButton, i5.IonContent, i5.IonDatetime, i5.IonDatetimeButton, i5.IonHeader, i5.IonTextarea, i5.IonModal, i5.SelectValueAccessor, i5.TextValueAccessor, CommonModule, i6.NgIf, i6.DecimalPipe, FormsModule, i7.ɵNgNoValidate, i7.NgControlStatus, i7.NgControlStatusGroup, i7.RequiredValidator, i7.MaxLengthValidator, i7.NgModel, i7.NgForm, HttpClientModule,
            AccountSelectorModalComponent,
            AmountInputComponent,
            PageLayoutComponent,
            CustomAlertComponent], styles: [".transfer-page[_ngcontent-%COMP%] {\n  --background: #f6f7fb;\n}\n\n\n\n\n\n\n.transfer-container[_ngcontent-%COMP%] {\n  padding: 18px;\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n\n\n\n\n\n\n.hero-card[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #3a0ca3, #4361ee);\n  border-radius: 18px;\n  padding: 18px;\n  color: #fff;\n  box-shadow: 0 12px 30px rgba(67, 97, 238, .25);\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n}\n\n.hero-subtitle[_ngcontent-%COMP%] {\n  font-size: 12px;\n  opacity: .8;\n  margin-top: 4px;\n}\n\n\n\n\n\n\n.section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.section-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 800;\n  letter-spacing: .12em;\n  text-transform: uppercase;\n  color: #6b7280;\n}\n\n\n\n\n\n\n.account-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 14px;\n  padding: 14px;\n  border: 1px solid rgba(0,0,0,.04);\n  display: flex;\n  align-items: center;\n  transition: .15s ease;\n  box-shadow: 0 6px 18px rgba(0,0,0,.04);\n}\n\n.account-card[_ngcontent-%COMP%]:active {\n  transform: scale(.98);\n}\n\n.account-card.soft[_ngcontent-%COMP%] {\n  background: #fafafa;\n}\n\n.account-main[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.account-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: #111827;\n}\n\n.account-title.muted[_ngcontent-%COMP%] {\n  color: #6b7280;\n}\n\n.account-sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6b7280;\n}\n\n\n\n\n\n\n.amount-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: #fff;\n  border-radius: 16px;\n  padding: 14px;\n  box-shadow: inset 0 0 0 1px rgba(67,97,238,.15);\n}\n\n.currency-pill[_ngcontent-%COMP%] {\n  background: rgba(67,97,238,.1);\n  color: #3a0ca3;\n  font-weight: 800;\n  padding: 6px 10px;\n  border-radius: 999px;\n  font-size: 12px;\n}\n\n.amount-input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n\n\n\n\n\n.date-card[_ngcontent-%COMP%] {\n  background: #fff;\n  padding: 12px;\n  border-radius: 14px;\n  border: 1px solid rgba(0,0,0,.04);\n}\n\n\n\n\n\n\n.comment-card[_ngcontent-%COMP%] {\n  background: #fff;\n  border-radius: 14px;\n  padding: 12px;\n  border: 1px solid rgba(0,0,0,.04);\n}\n\n.counter[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #9ca3af;\n  text-align: right;\n  margin-top: 6px;\n}\n\n\n\n\n\n\n.primary-btn[_ngcontent-%COMP%] {\n  --background: linear-gradient(135deg, #3a0ca3, #4361ee);\n  --border-radius: 14px;\n  height: 52px;\n  font-weight: 700;\n  box-shadow: 0 12px 25px rgba(67,97,238,.25);\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NewTransferPage, [{
        type: Component,
        args: [{ selector: 'app-new-transfer', standalone: true, imports: [
                    IonicModule,
                    CommonModule,
                    FormsModule,
                    HttpClientModule,
                    AccountSelectorModalComponent,
                    AmountInputComponent,
                    PageLayoutComponent,
                    CustomAlertComponent
                ], template: "<!-- HEADER -->\n<ion-header>\n  <app-page-layout\n    [title]=\"title\"\n    [showBack]=\"true\"\n    (back)=\"backToCategories()\">\n  </app-page-layout>\n</ion-header>\n\n<!-- CONTENT -->\n<ion-content [fullscreen]=\"true\" scroll-y=\"false\">\n\n  <form class=\"transfer-form\" (ngSubmit)=\"crearTransferencia()\">\n\n    <!-- ORIGEN -->\n    <div class=\"transfer-section\">\n\n      <label class=\"transfer-label\">\n        Transfiere desde\n      </label>\n\n      <button\n        type=\"button\"\n        class=\"account-btn\"\n        (click)=\"seleccionarCuentaOrigen()\">\n\n        <div class=\"account-btn-content\">\n\n          <span class=\"account-name\">\n            {{ cuentaOrigen || 'Selecciona una cuenta' }}\n          </span>\n\n          <span class=\"account-amount\" *ngIf=\"cuentaOrigenAmount !== null\">\n            S/. {{ cuentaOrigenAmount | number:'1.2-2' }}\n          </span>\n\n        </div>\n\n      </button>\n\n    </div>\n\n    <!-- DESTINO -->\n    <div class=\"transfer-section\">\n\n      <label class=\"transfer-label\">\n        Transfiere hacia\n      </label>\n\n      <button\n        type=\"button\"\n        class=\"account-btn\"\n        (click)=\"seleccionarCuentaDestino()\">\n\n        <div class=\"account-btn-content\">\n\n          <span class=\"account-name\">\n            {{ cuentaDestino || 'Selecciona una cuenta' }}\n          </span>\n\n          <span class=\"account-amount\" *ngIf=\"cuentaDestinoAmount !== null\">\n            S/. {{ cuentaDestinoAmount | number:'1.2-2' }}\n          </span>\n\n        </div>\n\n      </button>\n\n    </div>\n\n    <!-- MONTO -->\n    <div class=\"transfer-section\">\n\n      <label class=\"transfer-label\">\n        Monto\n      </label>\n\n      <div class=\"amount-row\">\n        <app-amount-input\n          [(ngModel)]=\"monto\"\n          name=\"monto\"\n          placeholder=\"0.00\"\n          [required]=\"true\"\n          currencyCode=\"PEN\"\n          variant=\"enhanced\"\n          locale=\"es-PE\"\n          [maxDigits]=\"11\"\n          (ngModelChange)=\"onInputChange()\">\n        </app-amount-input>\n      </div>\n\n    </div>\n\n    <!-- FECHA -->\n    <div class=\"transfer-section\">\n\n      <label class=\"transfer-label\">\n        Fecha\n      </label>\n\n      <ion-datetime-button datetime=\"fecha-transferencia\"></ion-datetime-button>\n\n      <ion-modal [keepContentsMounted]=\"true\">\n        <ng-template>\n          <ion-datetime\n            id=\"fecha-transferencia\"\n            presentation=\"date\"\n            [(ngModel)]=\"fecha\"\n            name=\"fecha\"\n            [max]=\"maxDate\"\n            (ionChange)=\"onInputChange()\">\n          </ion-datetime>\n        </ng-template>\n      </ion-modal>\n\n    </div>\n\n    <!-- COMENTARIO -->\n    <div class=\"transfer-section\">\n\n      <label class=\"transfer-label\">\n        Comentario\n      </label>\n\n      <ion-textarea\n        [(ngModel)]=\"comentario\"\n        name=\"comentario\"\n        maxlength=\"4096\"\n        placeholder=\"Agrega un comentario (opcional)\"\n        class=\"comment-input\"\n        (ionChange)=\"onInputChange()\">\n      </ion-textarea>\n\n      <div class=\"comment-count\">\n        {{ comentario?.length || 0 }}/4096\n      </div>\n\n    </div>\n\n    <!-- BOT\u00D3N -->\n    <ion-button\n      expand=\"block\"\n      class=\"btn-transferir\"\n      type=\"submit\"\n      [disabled]=\"!canSubmit\">\n\n      Guardar transferencia\n\n    </ion-button>\n\n  </form>\n\n</ion-content>\n\n<!-- ALERT -->\n<app-custom-alert\n  *ngIf=\"showCustomAlert\"\n  header=\"Cambios sin guardar\"\n  message=\"Has realizado cambios en la transferencia. \u00BFDeseas salir sin guardar?\"\n  cancelText=\"No\"\n  confirmText=\"S\u00ED\"\n  (onCancel)=\"showCustomAlert = false\"\n  (onConfirm)=\"salirSinGuardar()\">\n</app-custom-alert>\n\n<!-- MODAL (SINGLE MODE CORRECTO) -->\n<app-account-selector-modal\n  [isOpen]=\"isModalOpen\"\n  [accounts]=\"accounts\"\n  [selectionMode]=\"AccountSelectionMode.SINGLE\"\n  [selectedAccount]=\"selectedAccount\"\n  (modalClosed)=\"closeModal()\"\n  (accountSelected)=\"seleccionarYConfirmar($event)\">\n</app-account-selector-modal>\n", styles: [".transfer-page {\n  --background: #f6f7fb;\n}\n\n/* =========================\n   CONTAINER\n========================= */\n\n.transfer-container {\n  padding: 18px;\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n\n/* =========================\n   HERO\n========================= */\n\n.hero-card {\n  background: linear-gradient(135deg, #3a0ca3, #4361ee);\n  border-radius: 18px;\n  padding: 18px;\n  color: #fff;\n  box-shadow: 0 12px 30px rgba(67, 97, 238, .25);\n}\n\n.hero-title {\n  font-size: 18px;\n  font-weight: 800;\n}\n\n.hero-subtitle {\n  font-size: 12px;\n  opacity: .8;\n  margin-top: 4px;\n}\n\n/* =========================\n   SECTION\n========================= */\n\n.section {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.section-label {\n  font-size: 11px;\n  font-weight: 800;\n  letter-spacing: .12em;\n  text-transform: uppercase;\n  color: #6b7280;\n}\n\n/* =========================\n   ACCOUNT CARD\n========================= */\n\n.account-card {\n  background: #fff;\n  border-radius: 14px;\n  padding: 14px;\n  border: 1px solid rgba(0,0,0,.04);\n  display: flex;\n  align-items: center;\n  transition: .15s ease;\n  box-shadow: 0 6px 18px rgba(0,0,0,.04);\n}\n\n.account-card:active {\n  transform: scale(.98);\n}\n\n.account-card.soft {\n  background: #fafafa;\n}\n\n.account-main {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.account-title {\n  font-size: 15px;\n  font-weight: 700;\n  color: #111827;\n}\n\n.account-title.muted {\n  color: #6b7280;\n}\n\n.account-sub {\n  font-size: 12px;\n  color: #6b7280;\n}\n\n/* =========================\n   AMOUNT\n========================= */\n\n.amount-card {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: #fff;\n  border-radius: 16px;\n  padding: 14px;\n  box-shadow: inset 0 0 0 1px rgba(67,97,238,.15);\n}\n\n.currency-pill {\n  background: rgba(67,97,238,.1);\n  color: #3a0ca3;\n  font-weight: 800;\n  padding: 6px 10px;\n  border-radius: 999px;\n  font-size: 12px;\n}\n\n.amount-input {\n  flex: 1;\n}\n\n/* =========================\n   DATE\n========================= */\n\n.date-card {\n  background: #fff;\n  padding: 12px;\n  border-radius: 14px;\n  border: 1px solid rgba(0,0,0,.04);\n}\n\n/* =========================\n   COMMENT\n========================= */\n\n.comment-card {\n  background: #fff;\n  border-radius: 14px;\n  padding: 12px;\n  border: 1px solid rgba(0,0,0,.04);\n}\n\n.counter {\n  font-size: 11px;\n  color: #9ca3af;\n  text-align: right;\n  margin-top: 6px;\n}\n\n/* =========================\n   BUTTON\n========================= */\n\n.primary-btn {\n  --background: linear-gradient(135deg, #3a0ca3, #4361ee);\n  --border-radius: 14px;\n  height: 52px;\n  font-weight: 700;\n  box-shadow: 0 12px 25px rgba(67,97,238,.25);\n}\n"] }]
    }], () => [{ type: i1.NavigationService }, { type: i2.ListAccountsUseCase }, { type: i3.CreateTransferUseCase }, { type: i4.SpinnerService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NewTransferPage, { className: "NewTransferPage", filePath: "src/app/features/side-menu/accounts/new-transfer/new-transfer.page.ts", lineNumber: 35 }); })();
//# sourceMappingURL=new-transfer.page.js.map