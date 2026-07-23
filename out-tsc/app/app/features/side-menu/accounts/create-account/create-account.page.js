import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { ACCOUNT_ICONS } from 'src/app/shared/constants/category-options';
import { PERSONALIZATION_COLORS } from 'src/app/shared/constants/personalization-options';
import { CustomAlertComponent } from '../../../../shared/components/custom-alert/custom-alert.component';
import { AmountInputComponent } from 'src/app/shared/components/amount-input/amount-input.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/use-cases/accounts/create-account.usecase";
import * as i2 from "src/app/core/use-cases/Accounts/update-account.usecase";
import * as i3 from "src/app/core/use-cases/Accounts/delete-accounts.usecase";
import * as i4 from "src/app/core/services/navigation.service";
import * as i5 from "src/app/core/services/spinnerService.service";
import * as i6 from "@ionic/angular";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
function CreateAccountPage_button_25_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 21);
    i0.ɵɵlistener("click", function CreateAccountPage_button_25_Template_button_click_0_listener() { const icon_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.seleccionarIcono(icon_r2)); });
    i0.ɵɵelement(1, "app-item-icon", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const icon_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("selected", icon_r2.icon === ctx_r2.iconoSeleccionado);
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", icon_r2.icon)("color", ctx_r2.colorSeleccionado)("selected", icon_r2.icon === ctx_r2.iconoSeleccionado);
} }
function CreateAccountPage_button_31_ion_icon_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 25);
} }
function CreateAccountPage_button_31_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 23);
    i0.ɵɵlistener("click", function CreateAccountPage_button_31_Template_button_click_0_listener() { const color_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.seleccionarColor(color_r5)); });
    i0.ɵɵtemplate(1, CreateAccountPage_button_31_ion_icon_1_Template, 1, 0, "ion-icon", 24);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background", color_r5.value);
    i0.ɵɵclassProp("selected", color_r5.value === ctx_r2.colorSeleccionado);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", color_r5.value === ctx_r2.colorSeleccionado);
} }
function CreateAccountPage_app_button_34_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-button", 26);
    i0.ɵɵlistener("clicked", function CreateAccountPage_app_button_34_Template_app_button_clicked_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.deleteAccount()); });
    i0.ɵɵelementEnd();
} }
function CreateAccountPage_app_custom_alert_35_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 27);
    i0.ɵɵlistener("onCancel", function CreateAccountPage_app_custom_alert_35_Template_app_custom_alert_onCancel_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.showCustomAlert = false); })("onConfirm", function CreateAccountPage_app_custom_alert_35_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.salirSinGuardar()); });
    i0.ɵɵelementEnd();
} }
function CreateAccountPage_app_custom_alert_36_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 28);
    i0.ɵɵlistener("onCancel", function CreateAccountPage_app_custom_alert_36_Template_app_custom_alert_onCancel_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.cerrarAlert()); })("onConfirm", function CreateAccountPage_app_custom_alert_36_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.confirmarEliminacion()); });
    i0.ɵɵelementEnd();
} }
export class CreateAccountPage {
    constructor(createAccountUseCase, updateAccountUseCase, deleteAccountUseCase, navService, loadingService) {
        this.createAccountUseCase = createAccountUseCase;
        this.updateAccountUseCase = updateAccountUseCase;
        this.deleteAccountUseCase = deleteAccountUseCase;
        this.navService = navService;
        this.loadingService = loadingService;
        // =========================
        // STATE
        // =========================
        this.title = '';
        this.isCreateAccountActive = false;
        this.showGenericAlert = false;
        this.showUnauthorizedAlert = false;
        this.showCustomAlert = false;
        this.showDeleteAlert = false;
        this.messageError = '';
        this.cambiosPendientes = false;
        // =========================
        // DATA
        // =========================
        this.accountData = {};
        this.nombreCuenta = '';
        this.montoInicial = null;
        this.iconos = ACCOUNT_ICONS;
        this.colores = PERSONALIZATION_COLORS;
        this.iconoSeleccionado = '';
        this.colorSeleccionado = '';
        this.maxDate = new Date().toISOString();
        // =========================
        // SNAPSHOT ORIGINAL (EDIT)
        // =========================
        this.originalData = {
            nombreCuenta: '',
            montoInicial: null,
            iconoSeleccionado: '',
            colorSeleccionado: ''
        };
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
    updateView(isCreate, state) {
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
    createAccountService() {
        const body = {
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
    updateAccountService() {
        const body = {
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
    deleteAccountService() {
        const body = {
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
    isValidateForm() {
        return (!this.nombreCuenta?.trim() ||
            this.montoInicial === null ||
            !this.iconoSeleccionado ||
            !this.colorSeleccionado);
    }
    // =========================
    // CHANGE DETECTION (REAL DIRTY CHECK)
    // =========================
    get hasChanges() {
        if (this.isCreateAccountActive) {
            return Boolean(this.nombreCuenta ||
                this.montoInicial !== null ||
                this.iconoSeleccionado ||
                this.colorSeleccionado);
        }
        return (this.nombreCuenta !== this.originalData.nombreCuenta ||
            this.montoInicial !== this.originalData.montoInicial ||
            this.iconoSeleccionado !== this.originalData.iconoSeleccionado ||
            this.colorSeleccionado !== this.originalData.colorSeleccionado);
    }
    // =========================
    // UI ACTIONS
    // =========================
    seleccionarIcono(option) {
        this.iconoSeleccionado = option.icon;
        this.cambiosPendientes = true;
    }
    seleccionarColor(option) {
        this.colorSeleccionado = option.value;
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
    showError() {
        this.showGenericAlert = true;
    }
    static { this.ɵfac = function CreateAccountPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CreateAccountPage)(i0.ɵɵdirectiveInject(i1.CreateAccountUseCase), i0.ɵɵdirectiveInject(i2.UpdateAccountUseCase), i0.ɵɵdirectiveInject(i3.DeleteAccountUseCase), i0.ɵɵdirectiveInject(i4.NavigationService), i0.ɵɵdirectiveInject(i5.SpinnerService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CreateAccountPage, selectors: [["app-create-account"]], decls: 37, vars: 16, consts: [[3, "back", "title", "showBack"], [1, "create-account-page", 3, "fullscreen"], [1, "create-account-form", 3, "ngSubmit"], [1, "account-preview"], ["size", "xl", "variant", "soft", 3, "icon", "color"], [1, "preview-title"], [1, "preview-balance"], [1, "form-section"], [1, "section-header"], [1, "section-label"], ["name", "montoInicial", "placeholder", "0.00", "currencyCode", "PEN", "variant", "enhanced", 3, "ngModelChange", "ngModel", "required"], ["type", "text", "name", "nombreCuenta", "placeholder", "Ej. Cuenta principal", "maxlength", "30", "autocomplete", "off", "required", "", 1, "fv-input", 3, "ngModelChange", "ngModel"], [1, "icons-grid"], ["type", "button", "class", "icon-button", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "colors-grid"], ["type", "button", "class", "color-button", 3, "background", "selected", "click", 4, "ngFor", "ngForOf"], [1, "action-container"], ["text", "Guardar cuenta", "type", "submit", 3, "disabled"], ["text", "Eliminar cuenta", "icon", "trash", "variant", "danger", 3, "clicked", 4, "ngIf"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la cuenta. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm", 4, "ngIf"], ["header", "Eliminar cuenta", "message", "\u00BFEst\u00E1s seguro de que deseas eliminar esta cuenta?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm", 4, "ngIf"], ["type", "button", 1, "icon-button", 3, "click"], ["size", "sm", "variant", "soft", 3, "icon", "color", "selected"], ["type", "button", 1, "color-button", 3, "click"], ["src", "assets/icon/check.svg", 4, "ngIf"], ["src", "assets/icon/check.svg"], ["text", "Eliminar cuenta", "icon", "trash", "variant", "danger", 3, "clicked"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la cuenta. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm"], ["header", "Eliminar cuenta", "message", "\u00BFEst\u00E1s seguro de que deseas eliminar esta cuenta?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm"]], template: function CreateAccountPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-header")(1, "app-page-layout", 0);
            i0.ɵɵlistener("back", function CreateAccountPage_Template_app_page_layout_back_1_listener() { return ctx.backToAccounts(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(2, "ion-content", 1)(3, "form", 2);
            i0.ɵɵlistener("ngSubmit", function CreateAccountPage_Template_form_ngSubmit_3_listener() { return ctx.guardarCuenta(); });
            i0.ɵɵelementStart(4, "section", 3);
            i0.ɵɵelement(5, "app-item-icon", 4);
            i0.ɵɵelementStart(6, "h2", 5);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 6);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "section", 7)(11, "div", 8)(12, "h3", 9);
            i0.ɵɵtext(13, " Monto inicial ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "app-amount-input", 10);
            i0.ɵɵtwoWayListener("ngModelChange", function CreateAccountPage_Template_app_amount_input_ngModelChange_14_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.montoInicial, $event) || (ctx.montoInicial = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "section", 7)(16, "div", 8)(17, "h3", 9);
            i0.ɵɵtext(18, " Nombre de la cuenta ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "ion-input", 11);
            i0.ɵɵtwoWayListener("ngModelChange", function CreateAccountPage_Template_ion_input_ngModelChange_19_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.nombreCuenta, $event) || (ctx.nombreCuenta = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "section", 7)(21, "div", 8)(22, "h3", 9);
            i0.ɵɵtext(23, " Icono ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "div", 12);
            i0.ɵɵtemplate(25, CreateAccountPage_button_25_Template, 2, 5, "button", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "section", 7)(27, "div", 8)(28, "h3", 9);
            i0.ɵɵtext(29, " Color ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 14);
            i0.ɵɵtemplate(31, CreateAccountPage_button_31_Template, 2, 5, "button", 15);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "div", 16);
            i0.ɵɵelement(33, "app-button", 17);
            i0.ɵɵtemplate(34, CreateAccountPage_app_button_34_Template, 1, 0, "app-button", 18);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(35, CreateAccountPage_app_custom_alert_35_Template, 1, 0, "app-custom-alert", 19)(36, CreateAccountPage_app_custom_alert_36_Template, 1, 0, "app-custom-alert", 20);
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", ctx.title)("showBack", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("fullscreen", false);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("icon", ctx.iconoSeleccionado)("color", ctx.colorSeleccionado);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.nombreCuenta || "Nueva cuenta", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" S/. ", ctx.montoInicial || "0.00", " ");
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.montoInicial);
            i0.ɵɵproperty("required", true);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.nombreCuenta);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngForOf", ctx.iconos);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngForOf", ctx.colores);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isValidateForm());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isCreateAccountActive);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showCustomAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showDeleteAlert);
        } }, dependencies: [IonicModule, i6.IonContent, i6.IonHeader, i6.IonIcon, i6.IonInput, i6.TextValueAccessor, CommonModule, i7.NgForOf, i7.NgIf, FormsModule, i8.ɵNgNoValidate, i8.NgControlStatus, i8.NgControlStatusGroup, i8.RequiredValidator, i8.MaxLengthValidator, i8.NgModel, i8.NgForm, HttpClientModule,
            CustomAlertComponent,
            AmountInputComponent,
            ButtonComponent,
            PageLayoutComponent,
            ItemIconComponent], styles: [".create-account-page[_ngcontent-%COMP%] {\n  --background: var(--fv-background);\n}\n\n\n\n\n\n\n.create-account-form[_ngcontent-%COMP%] {\n\n  display: flex;\n  flex-direction: column;\n\n  gap: 20px;\n\n  padding: 16px;\n  padding-bottom: 24px;\n\n}\n\n\n\n\n\n\n.account-preview[_ngcontent-%COMP%] {\n\n  display: flex;\n  flex-direction: column;\n\n  align-items: center;\n  justify-content: center;\n\n  gap: 12px;\n\n  padding:\n    8px\n    0\n    4px;\n\n}\n\n.preview-icon[_ngcontent-%COMP%] {\n\n  width: 72px;\n  height: 72px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 20px;\n\n  box-shadow: var(--fv-shadow-primary);\n\n}\n\n.preview-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n\n  width: 30px;\n  height: 30px;\n\n  color: white;\n\n  filter: brightness(0) invert(1);\n\n}\n\n.preview-title[_ngcontent-%COMP%] {\n\n  margin: 0;\n\n  color: var(--fv-text-primary);\n\n  font-size: 22px;\n  font-weight: 700;\n\n  line-height: 1.2;\n\n  text-align: center;\n\n}\n\n.preview-balance[_ngcontent-%COMP%] {\n\n  display: inline-flex;\n\n  align-items: center;\n  justify-content: center;\n\n  padding:\n    6px\n    14px;\n\n  border-radius: 999px;\n\n  background: rgba(67,97,238,.08);\n\n  color: var(--fv-primary);\n\n  font-size: 14px;\n  font-weight: 700;\n\n  letter-spacing: .02em;\n\n}\n\n\n\n\n\n\n.form-section[_ngcontent-%COMP%] {\n\n  display: flex;\n  flex-direction: column;\n\n  gap: 16px;\n\n  padding: 16px;\n\n  background: var(--fv-surface);\n\n  border-radius: 16px;\n\n  border: 1px solid rgba(67,97,238,.05);\n\n  box-shadow: var(--fv-shadow-sm);\n\n  transition:\n    border-color .2s ease,\n    box-shadow .2s ease;\n\n}\n\n.form-section[_ngcontent-%COMP%]:focus-within {\n\n  border-color: rgba(67,97,238,.15);\n\n  box-shadow:\n    0 0 0 3px rgba(67,97,238,.06);\n\n}\n\n\n\n\n\n\n.section-header[_ngcontent-%COMP%] {\n\n  display: flex;\n\n  align-items: center;\n  justify-content: space-between;\n\n  gap: 12px;\n\n}\n\n.section-label[_ngcontent-%COMP%] {\n\n  margin: 0;\n\n  color: var(--fv-text-secondary);\n\n  font-size: 11px;\n  font-weight: 700;\n\n  text-transform: uppercase;\n\n  letter-spacing: .08em;\n\n}\n\n\n\n\n\n\n.fv-input[_ngcontent-%COMP%] {\n\n  --background: #f8faff;\n\n  --padding-start: 18px;\n  --padding-end: 18px;\n\n  --border-radius: 14px;\n\n  min-height: 52px;\n\n  border: 1px solid rgba(67,97,238,.08);\n\n  transition:\n    border-color .2s ease,\n    box-shadow .2s ease;\n\n}\n\n.fv-input.ion-focused[_ngcontent-%COMP%] {\n\n  border-color: var(--fv-primary);\n\n  box-shadow:\n    0 0 0 3px rgba(67,97,238,.08);\n\n}\n\n\n\n\n\n\napp-amount-input[_ngcontent-%COMP%] {\n\n  display: block;\n\n  width: 100%;\n\n}\n\n\n\n\n\n\n.icons-grid[_ngcontent-%COMP%] {\n\n  display: grid;\n\n  grid-template-columns: repeat(6, 1fr);\n\n  gap: 12px;\n\n}\n\n.icon-button[_ngcontent-%COMP%] {\n\n  width: 100%;\n\n  aspect-ratio: 1;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border: 1px solid rgba(67,97,238,.06);\n\n  border-radius: 14px;\n\n  background: transparent;\n\n  transition:\n    background .2s ease,\n    border-color .2s ease,\n    transform .18s ease;\n\n}\n\n.icon-button[_ngcontent-%COMP%]:active {\n\n  transform: scale(.94);\n\n}\n\n.icon-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n\n  width: 24px;\n  height: 24px;\n\n  color: var(--fv-text-primary);\n\n}\n\n.icon-button.selected[_ngcontent-%COMP%] {\n\n  background: rgba(67,97,238,.08);\n\n  border-color: var(--fv-primary);\n\n}\n\n.icon-button.selected[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n\n  color: var(--fv-primary);\n\n}\n\n\n\n\n\n\n.colors-grid[_ngcontent-%COMP%] {\n\n  display: flex;\n\n  flex-wrap: wrap;\n\n  gap: 12px;\n\n}\n\n.color-button[_ngcontent-%COMP%] {\n\n  width: 40px;\n  height: 40px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border: none;\n\n  border-radius: 50%;\n\n  transition:\n    transform .18s ease,\n    box-shadow .18s ease;\n\n}\n\n.color-button[_ngcontent-%COMP%]:active {\n\n  transform: scale(.92);\n\n}\n\n.color-button.selected[_ngcontent-%COMP%] {\n\n  transform: scale(1.10);\n\n  box-shadow:\n    0 0 0 3px var(--fv-surface),\n    0 0 0 5px rgba(67,97,238,.18);\n\n}\n\n.color-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n\n  width: 16px;\n  height: 16px;\n\n  color: white;\n\n  filter: brightness(0) invert(1);\n\n}\n\n\n\n\n\n\n.action-container[_ngcontent-%COMP%] {\n\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-top: 4px;\n\n}\n\n\n\n\n\n\n@media (max-width:420px) {\n\n  .create-account-form[_ngcontent-%COMP%] {\n\n    padding: 16px;\n\n  }\n\n  .preview-icon[_ngcontent-%COMP%] {\n\n    width: 64px;\n    height: 64px;\n\n  }\n\n  .preview-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n\n    width: 28px;\n    height: 28px;\n\n  }\n\n  .preview-title[_ngcontent-%COMP%] {\n\n    font-size: 20px;\n\n  }\n\n  .preview-balance[_ngcontent-%COMP%] {\n\n    font-size: 13px;\n\n  }\n\n  .form-section[_ngcontent-%COMP%] {\n\n    padding: 14px;\n\n  }\n\n  .icons-grid[_ngcontent-%COMP%] {\n\n    grid-template-columns: repeat(5, 1fr);\n\n    gap: 10px;\n\n  }\n\n  .icon-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n\n    width: 22px;\n    height: 22px;\n\n  }\n\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateAccountPage, [{
        type: Component,
        args: [{ selector: 'app-create-account', standalone: true, imports: [
                    IonicModule,
                    CommonModule,
                    FormsModule,
                    HttpClientModule,
                    CustomAlertComponent,
                    AmountInputComponent,
                    ButtonComponent,
                    PageLayoutComponent,
                    ItemIconComponent
                ], template: "<!-- ==========================================================\n     HEADER\n     ========================================================== -->\n\n<ion-header>\n\n  <app-page-layout\n    [title]=\"title\"\n    [showBack]=\"true\"\n    (back)=\"backToAccounts()\">\n\n  </app-page-layout>\n\n</ion-header>\n\n<!-- ==========================================================\n     CONTENT\n     ========================================================== -->\n\n<ion-content\n  [fullscreen]=\"false\"\n  class=\"create-account-page\">\n\n  <form\n    class=\"create-account-form\"\n    (ngSubmit)=\"guardarCuenta()\">\n\n    <!-- ==========================================================\n         ACCOUNT PREVIEW\n         ========================================================== -->\n\n    <section class=\"account-preview\">\n\n      <app-item-icon\n        [icon]=\"iconoSeleccionado\"\n        [color]=\"colorSeleccionado\"\n        size=\"xl\"\n        variant=\"soft\">\n      </app-item-icon>\n\n      <h2 class=\"preview-title\">\n\n        {{ nombreCuenta || 'Nueva cuenta' }}\n\n      </h2>\n\n      <div class=\"preview-balance\">\n\n        S/. {{ montoInicial || '0.00' }}\n\n      </div>\n\n    </section>\n\n    <!-- ==========================================================\n         INITIAL BALANCE\n         ========================================================== -->\n\n    <section class=\"form-section\">\n\n      <div class=\"section-header\">\n\n        <h3 class=\"section-label\">\n\n          Monto inicial\n\n        </h3>\n\n      </div>\n\n      <app-amount-input\n        [(ngModel)]=\"montoInicial\"\n        name=\"montoInicial\"\n        placeholder=\"0.00\"\n        currencyCode=\"PEN\"\n        variant=\"enhanced\"\n        [required]=\"true\">\n\n      </app-amount-input>\n\n    </section>\n\n    <!-- ==========================================================\n         ACCOUNT NAME\n         ========================================================== -->\n\n    <section class=\"form-section\">\n\n      <div class=\"section-header\">\n\n        <h3 class=\"section-label\">\n\n          Nombre de la cuenta\n\n        </h3>\n\n      </div>\n\n      <ion-input\n        class=\"fv-input\"\n        type=\"text\"\n        name=\"nombreCuenta\"\n        placeholder=\"Ej. Cuenta principal\"\n        maxlength=\"30\"\n        autocomplete=\"off\"\n        [(ngModel)]=\"nombreCuenta\"\n        required>\n\n      </ion-input>\n\n    </section>\n\n    <!-- ==========================================================\n         ICON\n         ========================================================== -->\n\n    <section class=\"form-section\">\n\n      <div class=\"section-header\">\n\n        <h3 class=\"section-label\">\n\n          Icono\n\n        </h3>\n\n      </div>\n\n      <div class=\"icons-grid\">\n\n        <button\n          *ngFor=\"let icon of iconos\"\n          type=\"button\"\n          class=\"icon-button\"\n          [class.selected]=\"icon.icon === iconoSeleccionado\"\n          (click)=\"seleccionarIcono(icon)\">\n\n          <app-item-icon\n            [icon]=\"icon.icon\"\n            [color]=\"colorSeleccionado\"\n            size=\"sm\"\n            variant=\"soft\"\n            [selected]=\"icon.icon === iconoSeleccionado\">\n          </app-item-icon>\n\n        </button>\n\n      </div>\n\n    </section>\n\n    <!-- ==========================================================\n         COLOR\n         ========================================================== -->\n\n    <section class=\"form-section\">\n\n      <div class=\"section-header\">\n\n        <h3 class=\"section-label\">\n\n          Color\n\n        </h3>\n\n      </div>\n\n      <div class=\"colors-grid\">\n\n        <button\n          *ngFor=\"let color of colores\"\n          type=\"button\"\n          class=\"color-button\"\n          [style.background]=\"color.value\"\n          [class.selected]=\"color.value === colorSeleccionado\"\n          (click)=\"seleccionarColor(color)\">\n\n          <ion-icon\n            *ngIf=\"color.value === colorSeleccionado\"\n            src=\"assets/icon/check.svg\">\n\n          </ion-icon>\n\n        </button>\n\n      </div>\n\n    </section>\n\n    <!-- ==========================================================\n         ACTIONS\n         ========================================================== -->\n\n    <div class=\"action-container\">\n\n      <app-button\n        text=\"Guardar cuenta\"\n        type=\"submit\"\n        [disabled]=\"isValidateForm()\">\n\n      </app-button>\n\n      <app-button\n        *ngIf=\"!isCreateAccountActive\"\n        text=\"Eliminar cuenta\"\n        icon=\"trash\"\n        variant=\"danger\"\n        (clicked)=\"deleteAccount()\">\n      </app-button>\n\n    </div>\n\n  </form>\n\n</ion-content>\n\n<!-- ==========================================================\n     ALERT\n     ========================================================== -->\n\n<app-custom-alert\n  *ngIf=\"showCustomAlert\"\n  header=\"Cambios sin guardar\"\n  message=\"Has realizado cambios en la cuenta. \u00BFDeseas salir sin guardar?\"\n  cancelText=\"No\"\n  confirmText=\"S\u00ED\"\n  (onCancel)=\"showCustomAlert = false\"\n  (onConfirm)=\"salirSinGuardar()\">\n</app-custom-alert>\n\n<app-custom-alert\n  *ngIf=\"showDeleteAlert\"\n  header=\"Eliminar cuenta\"\n  message=\"\u00BFEst\u00E1s seguro de que deseas eliminar esta cuenta?\"\n  cancelText=\"No\"\n  confirmText=\"S\u00ED\"\n  (onCancel)=\"cerrarAlert()\"\n  (onConfirm)=\"confirmarEliminacion()\">\n</app-custom-alert>\n", styles: [".create-account-page {\n  --background: var(--fv-background);\n}\n\n/* ==========================================================\n   FORM\n   ========================================================== */\n\n.create-account-form {\n\n  display: flex;\n  flex-direction: column;\n\n  gap: 20px;\n\n  padding: 16px;\n  padding-bottom: 24px;\n\n}\n\n/* ==========================================================\n   ACCOUNT PREVIEW\n   ========================================================== */\n\n.account-preview {\n\n  display: flex;\n  flex-direction: column;\n\n  align-items: center;\n  justify-content: center;\n\n  gap: 12px;\n\n  padding:\n    8px\n    0\n    4px;\n\n}\n\n.preview-icon {\n\n  width: 72px;\n  height: 72px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 20px;\n\n  box-shadow: var(--fv-shadow-primary);\n\n}\n\n.preview-icon ion-icon {\n\n  width: 30px;\n  height: 30px;\n\n  color: white;\n\n  filter: brightness(0) invert(1);\n\n}\n\n.preview-title {\n\n  margin: 0;\n\n  color: var(--fv-text-primary);\n\n  font-size: 22px;\n  font-weight: 700;\n\n  line-height: 1.2;\n\n  text-align: center;\n\n}\n\n.preview-balance {\n\n  display: inline-flex;\n\n  align-items: center;\n  justify-content: center;\n\n  padding:\n    6px\n    14px;\n\n  border-radius: 999px;\n\n  background: rgba(67,97,238,.08);\n\n  color: var(--fv-primary);\n\n  font-size: 14px;\n  font-weight: 700;\n\n  letter-spacing: .02em;\n\n}\n\n/* ==========================================================\n   FORM SECTION\n   ========================================================== */\n\n.form-section {\n\n  display: flex;\n  flex-direction: column;\n\n  gap: 16px;\n\n  padding: 16px;\n\n  background: var(--fv-surface);\n\n  border-radius: 16px;\n\n  border: 1px solid rgba(67,97,238,.05);\n\n  box-shadow: var(--fv-shadow-sm);\n\n  transition:\n    border-color .2s ease,\n    box-shadow .2s ease;\n\n}\n\n.form-section:focus-within {\n\n  border-color: rgba(67,97,238,.15);\n\n  box-shadow:\n    0 0 0 3px rgba(67,97,238,.06);\n\n}\n\n/* ==========================================================\n   SECTION HEADER\n   ========================================================== */\n\n.section-header {\n\n  display: flex;\n\n  align-items: center;\n  justify-content: space-between;\n\n  gap: 12px;\n\n}\n\n.section-label {\n\n  margin: 0;\n\n  color: var(--fv-text-secondary);\n\n  font-size: 11px;\n  font-weight: 700;\n\n  text-transform: uppercase;\n\n  letter-spacing: .08em;\n\n}\n\n/* ==========================================================\n   INPUT\n   ========================================================== */\n\n.fv-input {\n\n  --background: #f8faff;\n\n  --padding-start: 18px;\n  --padding-end: 18px;\n\n  --border-radius: 14px;\n\n  min-height: 52px;\n\n  border: 1px solid rgba(67,97,238,.08);\n\n  transition:\n    border-color .2s ease,\n    box-shadow .2s ease;\n\n}\n\n.fv-input.ion-focused {\n\n  border-color: var(--fv-primary);\n\n  box-shadow:\n    0 0 0 3px rgba(67,97,238,.08);\n\n}\n\n/* ==========================================================\n   AMOUNT INPUT\n   ========================================================== */\n\napp-amount-input {\n\n  display: block;\n\n  width: 100%;\n\n}\n\n/* ==========================================================\n   ICONS\n   ========================================================== */\n\n.icons-grid {\n\n  display: grid;\n\n  grid-template-columns: repeat(6, 1fr);\n\n  gap: 12px;\n\n}\n\n.icon-button {\n\n  width: 100%;\n\n  aspect-ratio: 1;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border: 1px solid rgba(67,97,238,.06);\n\n  border-radius: 14px;\n\n  background: transparent;\n\n  transition:\n    background .2s ease,\n    border-color .2s ease,\n    transform .18s ease;\n\n}\n\n.icon-button:active {\n\n  transform: scale(.94);\n\n}\n\n.icon-button ion-icon {\n\n  width: 24px;\n  height: 24px;\n\n  color: var(--fv-text-primary);\n\n}\n\n.icon-button.selected {\n\n  background: rgba(67,97,238,.08);\n\n  border-color: var(--fv-primary);\n\n}\n\n.icon-button.selected ion-icon {\n\n  color: var(--fv-primary);\n\n}\n\n/* ==========================================================\n   COLORS\n   ========================================================== */\n\n.colors-grid {\n\n  display: flex;\n\n  flex-wrap: wrap;\n\n  gap: 12px;\n\n}\n\n.color-button {\n\n  width: 40px;\n  height: 40px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border: none;\n\n  border-radius: 50%;\n\n  transition:\n    transform .18s ease,\n    box-shadow .18s ease;\n\n}\n\n.color-button:active {\n\n  transform: scale(.92);\n\n}\n\n.color-button.selected {\n\n  transform: scale(1.10);\n\n  box-shadow:\n    0 0 0 3px var(--fv-surface),\n    0 0 0 5px rgba(67,97,238,.18);\n\n}\n\n.color-button ion-icon {\n\n  width: 16px;\n  height: 16px;\n\n  color: white;\n\n  filter: brightness(0) invert(1);\n\n}\n\n/* ==========================================================\n   ACTION\n   ========================================================== */\n\n.action-container {\n\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-top: 4px;\n\n}\n\n/* ==========================================================\n   RESPONSIVE\n   ========================================================== */\n\n@media (max-width:420px) {\n\n  .create-account-form {\n\n    padding: 16px;\n\n  }\n\n  .preview-icon {\n\n    width: 64px;\n    height: 64px;\n\n  }\n\n  .preview-icon ion-icon {\n\n    width: 28px;\n    height: 28px;\n\n  }\n\n  .preview-title {\n\n    font-size: 20px;\n\n  }\n\n  .preview-balance {\n\n    font-size: 13px;\n\n  }\n\n  .form-section {\n\n    padding: 14px;\n\n  }\n\n  .icons-grid {\n\n    grid-template-columns: repeat(5, 1fr);\n\n    gap: 10px;\n\n  }\n\n  .icon-button ion-icon {\n\n    width: 22px;\n    height: 22px;\n\n  }\n\n}\n"] }]
    }], () => [{ type: i1.CreateAccountUseCase }, { type: i2.UpdateAccountUseCase }, { type: i3.DeleteAccountUseCase }, { type: i4.NavigationService }, { type: i5.SpinnerService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CreateAccountPage, { className: "CreateAccountPage", filePath: "src/app/features/side-menu/accounts/create-account/create-account.page.ts", lineNumber: 44 }); })();
//# sourceMappingURL=create-account.page.js.map