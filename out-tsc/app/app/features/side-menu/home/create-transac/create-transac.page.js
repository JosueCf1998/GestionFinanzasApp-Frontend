import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CustomAlertComponent } from "src/app/shared/components/custom-alert/custom-alert.component";
import { AmountInputComponent } from "src/app/shared/components/amount-input/amount-input.component";
import 'src/app/core/utils/observable-extensions';
import { ItemIconComponent } from "src/app/shared/components/item-icon/item-icon.component";
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/services/navigation.service";
import * as i2 from "src/app/core/use-cases/transactions/create-transactions";
import * as i3 from "src/app/core/use-cases/categories/list-categories.usecase";
import * as i4 from "src/app/core/use-cases/accounts/list-accounts.usecase";
import * as i5 from "src/app/core/services/spinnerService.service";
import * as i6 from "src/app/core/services/alert.service";
import * as i7 from "@ionic/angular";
import * as i8 from "@angular/common";
import * as i9 from "@angular/forms";
const _c0 = () => ({ standalone: true });
function CreateTransacPage_span_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 43);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("S/. ", i0.ɵɵpipeBind2(2, 1, ctx_r0.cuentaAmount, "1.2-2"), "");
} }
function CreateTransacPage_div_44_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵlistener("click", function CreateTransacPage_div_44_Template_div_click_0_listener() { const categoria_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.seleccionarCategoria(categoria_r3)); });
    i0.ɵɵelement(1, "app-item-icon", 45);
    i0.ɵɵelementStart(2, "span", 32);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const categoria_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("selected", (ctx_r0.categoriaSeleccionada == null ? null : ctx_r0.categoriaSeleccionada.id) === categoria_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", categoria_r3.icono)("color", categoria_r3.color);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(categoria_r3.nombre);
} }
function CreateTransacPage_app_custom_alert_78_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 46);
    i0.ɵɵlistener("onCancel", function CreateTransacPage_app_custom_alert_78_Template_app_custom_alert_onCancel_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showCustomAlert = false); })("onConfirm", function CreateTransacPage_app_custom_alert_78_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.salirSinGuardar()); });
    i0.ɵɵelementEnd();
} }
export class CreateTransacPage {
    constructor(navService, createTransactionsUseCase, listCategoriesUseCase, listAccountsUseCase, loadingService, alertService) {
        this.navService = navService;
        this.createTransactionsUseCase = createTransactionsUseCase;
        this.listCategoriesUseCase = listCategoriesUseCase;
        this.listAccountsUseCase = listAccountsUseCase;
        this.loadingService = loadingService;
        this.alertService = alertService;
        this.segmentoSeleccionado = 'ingresos';
        this.monto = null;
        this.moneda = 'PEN';
        this.cuentaSeleccionada = '';
        this.cuentaId = '';
        this.categoriaSeleccionada = null;
        this.fecha = new Date().toISOString();
        this.fechaSeleccionada = 'hoy';
        this.comentario = '';
        this.showError = false;
        this.showCustomAlert = false;
        this.showGenericAlert = false;
        this.showUnauthorizedAlert = false;
        this.messageError = '';
        this.cambiosPendientes = false;
        this.isModalOpen = false;
        this.cuentaAmount = null;
        this.categoriasIngresos = [];
        this.categoriasGastos = [];
        this.cuentas = [];
        this.executeListCategories();
        this.executeListAccounts();
    }
    // MARK: - SERVICIOS
    executeListCategories() {
        this.loadingService.show();
        this.listCategoriesUseCase.execute().service({
            success: (data) => {
                this.loadingService.hide();
                if (data) {
                    this.categoriasIngresos = data.items.filter(cat => cat.tipo === "ingresos");
                    this.categoriasGastos = data.items.filter(cat => cat.tipo === "gastos");
                }
                else {
                    this.showGenericAlert = true;
                }
            },
            failure: (error) => {
                this.loadingService.hide();
                this.showGenericAlert = true;
            }
        });
    }
    executeListAccounts() {
        this.loadingService.show();
        this.listAccountsUseCase.listAccounts().service({
            success: (data) => {
                this.loadingService.hide();
                if (data) {
                    this.cuentas = data.items;
                    if (this.cuentas.length > 0) {
                        this.cuentaId = this.cuentas[0].id.toString();
                        this.cuentaSeleccionada = this.cuentas[0].name;
                        this.cuentaAmount = this.cuentas[0].amount;
                    }
                }
                else {
                    this.showGenericAlert = true;
                }
            },
            failure: (error) => {
                this.loadingService.hide();
                this.showGenericAlert = true;
            }
        });
    }
    executeCreateTransaction(body) {
        this.loadingService.show();
        this.createTransactionsUseCase.execute(body).service({
            success: () => {
                this.loadingService.hide();
                this.cambiosPendientes = false;
                this.resetForm();
                this.navService.back();
            },
            failure: (error) => {
                this.loadingService.hide();
                this.showGenericAlert = true;
            }
        });
    }
    // MARK: - FUNCIONES
    ngOnInit() {
        this.setFechaHoy();
    }
    cambiarTipo(tipo) {
        this.segmentoSeleccionado = tipo;
        this.categoriaSeleccionada = null;
        this.detectarCambios();
    }
    cambiarSegmento(event) {
        this.segmentoSeleccionado = event.detail.value;
        this.categoriaSeleccionada = null;
        this.detectarCambios();
    }
    obtenerCategorias() {
        return this.segmentoSeleccionado === 'ingresos'
            ? this.categoriasIngresos
            : this.categoriasGastos;
    }
    seleccionarCategoria(categoria) {
        this.categoriaSeleccionada = categoria;
        this.detectarCambios();
    }
    abrirCalculadora() {
        // TODO: Implementar calculadora
    }
    seleccionarCuenta() {
        document.activeElement?.blur();
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    onAccountSelected(account) {
        this.cuentaId = account.id.toString();
        this.cuentaSeleccionada = account.name;
        this.cuentaAmount = account.amount;
        this.detectarCambios();
    }
    setFechaHoy() {
        this.fecha = new Date().toISOString();
        this.fechaSeleccionada = 'hoy';
        this.detectarCambios();
    }
    setFechaAyer() {
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);
        this.fecha = ayer.toISOString();
        this.fechaSeleccionada = 'ayer';
        this.detectarCambios();
    }
    setFechaUltimo() {
        this.fechaSeleccionada = 'ultimo';
        this.detectarCambios();
        // TODO: Implementar selección de última fecha usada
    }
    abrirCalendario() {
        // TODO: Implementar selector de calendario
    }
    crearTransaccion() {
        if (!this.puedeGuardar) {
            this.showError = true;
            return;
        }
        this.showError = false;
        const requestBody = {
            categoryId: this.categoriaSeleccionada.id.toString(),
            accountId: this.cuentaId,
            amount: this.monto,
            date: new Date(this.fecha).toISOString().split('T')[0],
            type: this.segmentoSeleccionado,
            description: this.comentario || undefined
        };
        this.executeCreateTransaction(requestBody);
    }
    onMontoChange() {
        this.detectarCambios();
    }
    onComentarioChange() {
        this.detectarCambios();
    }
    detectarCambios() {
        const tieneMonto = this.monto !== null && this.monto > 0;
        const tieneCategoria = this.categoriaSeleccionada !== null;
        this.cambiosPendientes = tieneMonto || tieneCategoria || this.comentario.trim() !== '';
    }
    get puedeGuardar() {
        const tieneMonto = this.monto !== null && this.monto > 0;
        const tieneCategoria = this.categoriaSeleccionada !== null;
        const tieneCuenta = this.cuentaId !== '';
        return tieneMonto && tieneCategoria && tieneCuenta;
    }
    resetForm() {
        this.monto = null;
        this.categoriaSeleccionada = null;
        this.comentario = '';
        this.setFechaHoy();
        this.cambiosPendientes = false;
    }
    async backToCategories() {
        if (this.cambiosPendientes) {
            this.showCustomAlert = true;
        }
        else {
            document.activeElement?.blur();
            this.navService.back();
        }
    }
    salirSinGuardar() {
        this.showCustomAlert = false;
        document.activeElement?.blur();
        this.navService.back();
    }
    static { this.ɵfac = function CreateTransacPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CreateTransacPage)(i0.ɵɵdirectiveInject(i1.NavigationService), i0.ɵɵdirectiveInject(i2.CreateTransactionsUseCase), i0.ɵɵdirectiveInject(i3.ListCategoriesUseCase), i0.ɵɵdirectiveInject(i4.ListAccountsUseCase), i0.ɵɵdirectiveInject(i5.SpinnerService), i0.ɵɵdirectiveInject(i6.AlertService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CreateTransacPage, selectors: [["app-create-transac"]], decls: 79, vars: 25, consts: [["color", "side-menu", 1, "side-menu"], ["slot", "start"], ["type", "button", 1, "atras-btn", 3, "click"], ["src", "assets/icon/left.svg"], [1, "header-title", "text-subtitle"], ["slot", "end"], ["scroll-y", "false", 3, "fullscreen"], [1, "transaction-container"], [1, "transaction-form"], [1, "transfer-section"], [1, "transfer-label", "text-body"], ["src", "assets/icon/wallet.svg", 1, "label-icon"], ["type", "button", 1, "account-btn", 3, "click"], [1, "account-btn-content"], [1, "account-info"], ["src", "assets/icon/card.svg", 1, "account-icon"], [1, "account-name"], [1, "account-right"], ["class", "account-amount", 4, "ngIf"], ["name", "chevron-forward-outline", 1, "chevron-icon"], ["src", "assets/icon/money.svg", 1, "label-icon"], [1, "amount-row"], ["name", "monto", "placeholder", "0.00", "currencyCode", "PEN", "variant", "enhanced", "locale", "es-PE", 3, "ngModelChange", "ngModel", "required", "maxDigits"], ["src", "assets/icon/exchange.svg", 1, "label-icon"], [1, "tipo-selectores"], ["type", "button", 1, "tipo-btn", 3, "click"], ["src", "assets/icon/grid.svg", 1, "label-icon"], [1, "categories-grid"], ["class", "category-item", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "category-item"], [1, "category-icon-add"], ["src", "assets/icon/add.svg"], [1, "category-name"], ["name", "calendar-outline", 1, "label-icon"], [1, "date-options"], ["type", "button", 1, "date-btn", 3, "click"], ["type", "button", 1, "calendar-btn", 3, "click"], ["src", "assets/icon/calendar.svg"], ["name", "create-outline", 1, "label-icon"], ["placeholder", "Ingrese un comentario (opcional)", "rows", "3", 1, "comment-input", 3, "ngModelChange", "ionInput", "ngModel", "ngModelOptions"], [1, "comment-count"], ["expand", "block", "type", "button", 1, "btn-transferir", 3, "click", "disabled"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la transacci\u00F3n. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm", 4, "ngIf"], [1, "account-amount"], [1, "category-item", 3, "click"], ["size", "lg", "variant", "soft", 3, "icon", "color"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la transacci\u00F3n. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm"]], template: function CreateTransacPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-header")(1, "ion-toolbar", 0)(2, "ion-buttons", 1)(3, "button", 2);
            i0.ɵɵlistener("click", function CreateTransacPage_Template_button_click_3_listener() { return ctx.backToCategories(); });
            i0.ɵɵelement(4, "ion-icon", 3);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(5, "ion-title", 4);
            i0.ɵɵtext(6, "Nueva Transacci\u00F3n");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(7, "ion-buttons", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "ion-content", 6)(9, "div", 7)(10, "form", 8)(11, "div", 9)(12, "label", 10);
            i0.ɵɵelement(13, "ion-icon", 11);
            i0.ɵɵtext(14, " Cuenta ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "button", 12);
            i0.ɵɵlistener("click", function CreateTransacPage_Template_button_click_15_listener() { return ctx.seleccionarCuenta(); });
            i0.ɵɵelementStart(16, "div", 13)(17, "div", 14);
            i0.ɵɵelement(18, "ion-icon", 15);
            i0.ɵɵelementStart(19, "span", 16);
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "div", 17);
            i0.ɵɵtemplate(22, CreateTransacPage_span_22_Template, 3, 4, "span", 18);
            i0.ɵɵelement(23, "ion-icon", 19);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(24, "div", 9)(25, "label", 10);
            i0.ɵɵelement(26, "ion-icon", 20);
            i0.ɵɵtext(27, " Monto ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 21)(29, "app-amount-input", 22);
            i0.ɵɵtwoWayListener("ngModelChange", function CreateTransacPage_Template_app_amount_input_ngModelChange_29_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.monto, $event) || (ctx.monto = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function CreateTransacPage_Template_app_amount_input_ngModelChange_29_listener() { return ctx.onMontoChange(); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(30, "div", 9)(31, "label", 10);
            i0.ɵɵelement(32, "ion-icon", 23);
            i0.ɵɵtext(33, " Tipo ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 24)(35, "button", 25);
            i0.ɵɵlistener("click", function CreateTransacPage_Template_button_click_35_listener() { return ctx.cambiarTipo("gastos"); });
            i0.ɵɵtext(36, " Gasto ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "button", 25);
            i0.ɵɵlistener("click", function CreateTransacPage_Template_button_click_37_listener() { return ctx.cambiarTipo("ingresos"); });
            i0.ɵɵtext(38, " Ingreso ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(39, "div", 9)(40, "label", 10);
            i0.ɵɵelement(41, "ion-icon", 26);
            i0.ɵɵtext(42, " Categor\u00EDas ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div", 27);
            i0.ɵɵtemplate(44, CreateTransacPage_div_44_Template, 4, 5, "div", 28);
            i0.ɵɵelementStart(45, "div", 29)(46, "div", 30);
            i0.ɵɵelement(47, "ion-icon", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "span", 32);
            i0.ɵɵtext(49, "M\u00E1s");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(50, "div", 9)(51, "label", 10);
            i0.ɵɵelement(52, "ion-icon", 33);
            i0.ɵɵtext(53, " Fecha ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "div", 34)(55, "button", 35);
            i0.ɵɵlistener("click", function CreateTransacPage_Template_button_click_55_listener() { return ctx.setFechaHoy(); });
            i0.ɵɵtext(56, " 20/11");
            i0.ɵɵelement(57, "br");
            i0.ɵɵtext(58, "hoy ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "button", 35);
            i0.ɵɵlistener("click", function CreateTransacPage_Template_button_click_59_listener() { return ctx.setFechaAyer(); });
            i0.ɵɵtext(60, " 19/11");
            i0.ɵɵelement(61, "br");
            i0.ɵɵtext(62, "ayer ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "button", 35);
            i0.ɵɵlistener("click", function CreateTransacPage_Template_button_click_63_listener() { return ctx.setFechaUltimo(); });
            i0.ɵɵtext(64, " 23/6");
            i0.ɵɵelement(65, "br");
            i0.ɵɵtext(66, "\u00FAltimo ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "button", 36);
            i0.ɵɵlistener("click", function CreateTransacPage_Template_button_click_67_listener() { return ctx.abrirCalendario(); });
            i0.ɵɵelement(68, "ion-icon", 37);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(69, "div", 9)(70, "label", 10);
            i0.ɵɵelement(71, "ion-icon", 38);
            i0.ɵɵtext(72, " Comentario ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "ion-textarea", 39);
            i0.ɵɵtwoWayListener("ngModelChange", function CreateTransacPage_Template_ion_textarea_ngModelChange_73_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.comentario, $event) || (ctx.comentario = $event); return $event; });
            i0.ɵɵlistener("ionInput", function CreateTransacPage_Template_ion_textarea_ionInput_73_listener() { return ctx.onComentarioChange(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "div", 40);
            i0.ɵɵtext(75);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(76, "ion-button", 41);
            i0.ɵɵlistener("click", function CreateTransacPage_Template_ion_button_click_76_listener() { return ctx.crearTransaccion(); });
            i0.ɵɵtext(77, " A\u00F1adir ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(78, CreateTransacPage_app_custom_alert_78_Template, 1, 0, "app-custom-alert", 42);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("fullscreen", true);
            i0.ɵɵadvance(8);
            i0.ɵɵclassProp("selected", ctx.cuentaSeleccionada);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.cuentaSeleccionada || "Selecciona una cuenta");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.cuentaAmount !== null);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.monto);
            i0.ɵɵproperty("required", true)("maxDigits", 11);
            i0.ɵɵadvance(6);
            i0.ɵɵclassProp("selected", ctx.segmentoSeleccionado === "gastos");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("selected", ctx.segmentoSeleccionado === "ingresos");
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.obtenerCategorias());
            i0.ɵɵadvance(11);
            i0.ɵɵclassProp("active", ctx.fechaSeleccionada === "hoy");
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("active", ctx.fechaSeleccionada === "ayer");
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("active", ctx.fechaSeleccionada === "ultimo");
            i0.ɵɵadvance(10);
            i0.ɵɵtwoWayProperty("ngModel", ctx.comentario);
            i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(24, _c0));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx.comentario.length, "/200");
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", !ctx.puedeGuardar);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.showCustomAlert);
        } }, dependencies: [IonicModule, i7.IonButton, i7.IonButtons, i7.IonContent, i7.IonHeader, i7.IonIcon, i7.IonTextarea, i7.IonTitle, i7.IonToolbar, i7.TextValueAccessor, CommonModule, i8.NgForOf, i8.NgIf, i8.DecimalPipe, FormsModule, i9.ɵNgNoValidate, i9.NgControlStatus, i9.NgControlStatusGroup, i9.RequiredValidator, i9.NgModel, i9.NgForm, CustomAlertComponent, AmountInputComponent, ItemIconComponent], styles: ["//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Variables[_ngcontent-%COMP%]   y[_ngcontent-%COMP%]   estilos[_ngcontent-%COMP%]   globales\n//[_ngcontent-%COMP%]   ====================\nion-content[_ngcontent-%COMP%] {\n  --background: #ffffff;\n}\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Barra[_ngcontent-%COMP%]   superior[_ngcontent-%COMP%]   y[_ngcontent-%COMP%]   header\n//[_ngcontent-%COMP%]   ====================\n.side-menu[_ngcontent-%COMP%] {\n  display: flex;\n  height: 3.2em;\n  background: var(--ion-color-side-menu);\n  color: var(--ion-color-custom-gradient-contrast);\n}\n\n.header-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 600;\n  text-align: center;\n  color: #fff;\n  letter-spacing: 0.3px;\n}\n\n.atras-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  cursor: pointer;\n  padding: 0;\n  margin: 0;\n  border-radius: 50%;\n  transition: background 0.2s;\n  width: 40px;\n  height: 40px;\n  font-size: 25px;\n  \n  &:hover {\n    background: rgba(255, 255, 255, 0.1);\n  }\n  \n  ion-icon {\n    font-size: 28px;\n    color: #fff !important;\n    filter: brightness(0) invert(1);\n  }\n}\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Contenedor[_ngcontent-%COMP%]   principal[_ngcontent-%COMP%]   con[_ngcontent-%COMP%]   scroll\n//[_ngcontent-%COMP%]   ====================\n.transaction-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n  height: 100%;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Formulario\n//[_ngcontent-%COMP%]   ====================\n.transaction-form[_ngcontent-%COMP%] {\n  background: transparent;\n  padding: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  max-width: 600px;\n  margin: 0 auto;\n  width: 100%;\n}\n\n.transfer-section[_ngcontent-%COMP%] {\n  background: transparent;\n  border-radius: 0;\n  padding: 24px 20px;\n  border-bottom: 1px solid #f0f0f0;\n  transition: background 0.2s ease;\n  \n  &:active {\n    background: #fafafa;\n  }\n  \n  &:last-of-type {\n    border-bottom: none;\n  }\n}\n\n.transfer-label[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #333;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-weight: 500;\n  text-transform: none;\n  letter-spacing: 0;\n}\n\n.label-icon[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: #6b7280;\n}\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Monto\n//[_ngcontent-%COMP%]   ====================\n.amount-row[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Selector[_ngcontent-%COMP%]   de[_ngcontent-%COMP%]   cuenta[_ngcontent-%COMP%]   mejorado\n//[_ngcontent-%COMP%]   ====================\n.account-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  background: transparent;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.account-btn-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  background: #f8f9fa;\n  border-radius: 10px;\n  border: 1.5px solid transparent;\n  transition: all 0.2s ease;\n  \n  &:active {\n    background: #f0f0f0;\n  }\n  \n  &.selected {\n    border-color: var(--ion-color-side-menu);\n    background: rgba(var(--ion-color-side-menu-rgb), 0.03);\n    \n    .account-name {\n      color: #1a1a2e;\n      font-weight: 600;\n    }\n  }\n}\n\n.account-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n}\n\n.account-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: #6b7280;\n}\n\n.account-name[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #6b7280;\n  font-weight: 500;\n  transition: all 0.2s ease;\n}\n\n.account-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.account-amount[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: #1a1a2e;\n}\n\n.chevron-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #d1d5db;\n}\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Tipo[_ngcontent-%COMP%]   de[_ngcontent-%COMP%]   transacci\u00F3n[_ngcontent-%COMP%]   (dentro del formulario)\n//[_ngcontent-%COMP%]   ====================\n.tipo-selectores[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  margin-top: 4px;\n  background: #f8f9fa;\n  padding: 4px;\n  border-radius: 10px;\n}\n\n.tipo-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 10px 20px;\n  border-radius: 7px;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  font-size: 15px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  &.selected {\n    background: #ffffff;\n    color: #1a1a2e;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);\n  }\n}\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Secci\u00F3n[_ngcontent-%COMP%]   de[_ngcontent-%COMP%]   categor\u00EDas\n//[_ngcontent-%COMP%]   ====================\n.categories-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n  margin-top: 4px;\n}\n\n.category-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  \n  &:hover {\n    transform: translateY(-4px);\n    \n    .category-icon, .category-icon-add {\n      box-shadow: \n        0 12px 28px rgba(0, 0, 0, 0.15),\n        0 4px 12px rgba(0, 0, 0, 0.1),\n        inset 0 -4px 12px rgba(0, 0, 0, 0.15);\n    }\n  }\n  \n  &.selected {\n    .category-icon {\n      transform: scale(1.1);\n      box-shadow: \n        0 12px 28px rgba(0, 0, 0, 0.2),\n        0 4px 12px rgba(0, 0, 0, 0.15),\n        inset 0 -4px 12px rgba(0, 0, 0, 0.2),\n        0 0 0 3px var(--ion-color-side-menu),\n        0 0 0 5px rgba(var(--ion-color-side-menu-rgb), 0.2);\n    }\n    \n    .category-name {\n      color: var(--ion-color-side-menu);\n      font-weight: 700;\n    }\n  }\n}\n\n.category-icon[_ngcontent-%COMP%] {\n  width: 58px;\n  height: 58px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  box-shadow: \n    0 8px 24px rgba(0, 0, 0, 0.12),\n    0 2px 8px rgba(0, 0, 0, 0.08),\n    inset 0 -3px 10px rgba(0, 0, 0, 0.15);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  \n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    border-radius: 50%;\n    background: linear-gradient(135deg, \n      rgba(255,255,255,0.35) 0%, \n      rgba(255,255,255,0) 60%\n    );\n  }\n  \n  &::after {\n    content: '';\n    position: absolute;\n    top: 2px;\n    left: 2px;\n    right: 2px;\n    bottom: 2px;\n    border-radius: 50%;\n    border: 1px solid rgba(255, 255, 255, 0.2);\n  }\n  \n  ion-icon {\n    font-size: 26px;\n    color: #fff !important;\n    filter: brightness(0) invert(1) drop-shadow(0 2px 5px rgba(0, 0, 0, 0.25));\n    position: relative;\n    z-index: 1;\n  }\n}\n\n.category-icon-add[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto;\n  box-shadow: \n    0 8px 24px rgba(0, 0, 0, 0.12),\n    0 2px 8px rgba(0, 0, 0, 0.08),\n    inset 0 -3px 10px rgba(0, 0, 0, 0.15);\n  border-radius: 50%;\n  background: #e5e7eb;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  \n  ion-icon {\n    font-size: 36px;\n    color: #6b7280 !important;\n    filter: none;\n  }\n}\n\n.category-name[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #4b5563;\n  text-align: center;\n  font-weight: 500;\n  transition: all 0.3s ease;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Secci\u00F3n[_ngcontent-%COMP%]   de[_ngcontent-%COMP%]   fecha\n//[_ngcontent-%COMP%]   ====================\n.date-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  \n  .date-btn {\n    flex: 1;\n    background: #f8f9fa;\n    border: none;\n    border-radius: 10px;\n    padding: 12px 8px;\n    font-size: 13px;\n    color: #6b7280;\n    text-align: center;\n    cursor: pointer;\n    transition: all 0.2s ease;\n    line-height: 1.4;\n    font-weight: 500;\n    \n    &.active {\n      background: #1a1a2e;\n      color: #fff;\n      font-weight: 600;\n    }\n    \n    &:active:not(.active) {\n      background: #e5e7eb;\n    }\n  }\n  \n  .calendar-btn {\n    min-width: 48px;\n    background: #f8f9fa;\n    border: none;\n    border-radius: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    transition: all 0.2s ease;\n    \n    &:active {\n      background: #e5e7eb;\n    }\n    \n    ion-icon {\n      font-size: 22px;\n      color: #6b7280;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Comentario\n//[_ngcontent-%COMP%]   ====================\n.comment-input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 60px;\n  font-size: 15px;\n  background: #f8f9fa;\n  color: #1a1a2e;\n  border-radius: 10px;\n  border: none;\n  padding: 12px 16px;\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 12px;\n  --padding-bottom: 12px;\n}\n\n.comment-count[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #d1d5db;\n  text-align: right;\n  margin-top: 6px;\n  font-weight: 500;\n}\n\n//[_ngcontent-%COMP%]   ====================\n//[_ngcontent-%COMP%]   Bot\u00F3n[_ngcontent-%COMP%]   Submit\n//[_ngcontent-%COMP%]   ====================\n.btn-transferir[_ngcontent-%COMP%] {\n  margin: 32px 20px 20px 20px;\n  font-weight: 700;\n  font-size: 16px;\n  height: 54px;\n  border-radius: 12px;\n  letter-spacing: 0.2px;\n  --background: #1a1a2e;\n  --color: #fff;\n  --box-shadow: 0 4px 12px rgba(26, 26, 46, 0.15);\n  --border-radius: 12px;\n  text-transform: none;\n  \n  &:active:not(:disabled) {\n    --box-shadow: 0 2px 8px rgba(26, 26, 46, 0.2);\n  }\n  \n  &:disabled {\n    --background: #f0f0f0;\n    --color: #d1d5db;\n    --box-shadow: none;\n    opacity: 1;\n    cursor: not-allowed;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateTransacPage, [{
        type: Component,
        args: [{ selector: "app-create-transac", standalone: true, imports: [IonicModule, CommonModule, FormsModule, CustomAlertComponent, AmountInputComponent, ItemIconComponent], template: "<ion-header>\n  <ion-toolbar class=\"side-menu\" color=\"side-menu\">\n    <ion-buttons slot=\"start\">\n      <button class=\"atras-btn\" type=\"button\" (click)=\"backToCategories()\">\n        <ion-icon src=\"assets/icon/left.svg\"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title class=\"header-title text-subtitle\">Nueva Transacci\u00F3n</ion-title>\n    <ion-buttons slot=\"end\">\n      <!-- Acciones adicionales -->\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content [fullscreen]=\"true\" scroll-y=\"false\">\n  <div class=\"transaction-container\">\n    <!-- Formulario -->\n    <form class=\"transaction-form\">\n      <!-- Cuenta -->\n      <div class=\"transfer-section\">\n        <label class=\"transfer-label text-body\">\n          <ion-icon src=\"assets/icon/wallet.svg\" class=\"label-icon\"></ion-icon>\n          Cuenta\n        </label>\n        <button type=\"button\" class=\"account-btn\" (click)=\"seleccionarCuenta()\">\n          <div class=\"account-btn-content\" [class.selected]=\"cuentaSeleccionada\">\n            <div class=\"account-info\">\n              <ion-icon src=\"assets/icon/card.svg\" class=\"account-icon\"></ion-icon>\n              <span class=\"account-name\">{{ cuentaSeleccionada || 'Selecciona una cuenta' }}</span>\n            </div>\n            <div class=\"account-right\">\n              <span class=\"account-amount\" *ngIf=\"cuentaAmount !== null\">S/. {{ cuentaAmount | number:'1.2-2' }}</span>\n              <ion-icon name=\"chevron-forward-outline\" class=\"chevron-icon\"></ion-icon>\n            </div>\n          </div>\n        </button>\n      </div>\n\n      <!-- Monto -->\n      <div class=\"transfer-section\">\n        <label class=\"transfer-label text-body\">\n          <ion-icon src=\"assets/icon/money.svg\" class=\"label-icon\"></ion-icon>\n          Monto\n        </label>\n        <div class=\"amount-row\">\n          <app-amount-input\n            [(ngModel)]=\"monto\"\n            name=\"monto\"\n            placeholder=\"0.00\"\n            [required]=\"true\"\n            currencyCode=\"PEN\"\n            variant=\"enhanced\"\n            locale=\"es-PE\"\n            [maxDigits]=\"11\"\n            (ngModelChange)=\"onMontoChange()\"\n          ></app-amount-input>\n        </div>\n      </div>\n\n      <!-- Tipo (Gastos/Ingresos) -->\n      <div class=\"transfer-section\">\n        <label class=\"transfer-label text-body\">\n          <ion-icon src=\"assets/icon/exchange.svg\" class=\"label-icon\"></ion-icon>\n          Tipo\n        </label>\n        <div class=\"tipo-selectores\">\n          <button\n            type=\"button\"\n            class=\"tipo-btn\"\n            [class.selected]=\"segmentoSeleccionado === 'gastos'\"\n            (click)=\"cambiarTipo('gastos')\"\n          >\n            Gasto\n          </button>\n          <button\n            type=\"button\"\n            class=\"tipo-btn\"\n            [class.selected]=\"segmentoSeleccionado === 'ingresos'\"\n            (click)=\"cambiarTipo('ingresos')\"\n          >\n            Ingreso\n          </button>\n        </div>\n      </div>\n\n      <!-- Categor\u00EDas -->\n      <div class=\"transfer-section\">\n        <label class=\"transfer-label text-body\">\n          <ion-icon src=\"assets/icon/grid.svg\" class=\"label-icon\"></ion-icon>\n          Categor\u00EDas\n        </label>\n        <div class=\"categories-grid\">\n          <div\n            *ngFor=\"let categoria of obtenerCategorias()\"\n            class=\"category-item\"\n            [class.selected]=\"categoriaSeleccionada?.id === categoria.id\"\n            (click)=\"seleccionarCategoria(categoria)\"\n          >\n            <app-item-icon\n              [icon]=\"categoria.icono\"\n              [color]=\"categoria.color\"\n              size=\"lg\"\n              variant=\"soft\">\n            </app-item-icon>\n            <span class=\"category-name\">{{ categoria.nombre }}</span>\n          </div>\n\n          <div class=\"category-item\">\n            <div class=\"category-icon-add\">\n              <ion-icon src=\"assets/icon/add.svg\"></ion-icon>\n            </div>\n            <span class=\"category-name\">M\u00E1s</span>\n          </div>\n        </div>\n      </div>\n\n      <!-- Fecha -->\n      <div class=\"transfer-section\">\n        <label class=\"transfer-label text-body\">\n          <ion-icon name=\"calendar-outline\" class=\"label-icon\"></ion-icon>\n          Fecha\n        </label>\n        <div class=\"date-options\">\n          <button\n            type=\"button\"\n            class=\"date-btn\"\n            [class.active]=\"fechaSeleccionada === 'hoy'\"\n            (click)=\"setFechaHoy()\"\n          >\n            20/11<br>hoy\n          </button>\n          <button\n            type=\"button\"\n            class=\"date-btn\"\n            [class.active]=\"fechaSeleccionada === 'ayer'\"\n            (click)=\"setFechaAyer()\"\n          >\n            19/11<br>ayer\n          </button>\n          <button\n            type=\"button\"\n            class=\"date-btn\"\n            [class.active]=\"fechaSeleccionada === 'ultimo'\"\n            (click)=\"setFechaUltimo()\"\n          >\n            23/6<br>\u00FAltimo\n          </button>\n          <button\n            type=\"button\"\n            class=\"calendar-btn\"\n            (click)=\"abrirCalendario()\"\n          >\n              <ion-icon src=\"assets/icon/calendar.svg\"></ion-icon>\n          </button>\n        </div>\n      </div>\n\n      <!-- Comentario -->\n      <div class=\"transfer-section\">\n        <label class=\"transfer-label text-body\">\n          <ion-icon name=\"create-outline\" class=\"label-icon\"></ion-icon>\n          Comentario\n        </label>\n        <ion-textarea\n          [(ngModel)]=\"comentario\"\n          [ngModelOptions]=\"{standalone: true}\"\n          placeholder=\"Ingrese un comentario (opcional)\"\n          class=\"comment-input\"\n          rows=\"3\"\n          (ionInput)=\"onComentarioChange()\"\n        ></ion-textarea>\n        <div class=\"comment-count\">{{ comentario.length }}/200</div>\n      </div>\n\n      <!-- Bot\u00F3n -->\n      <ion-button\n        expand=\"block\"\n        class=\"btn-transferir\"\n        [disabled]=\"!puedeGuardar\"\n        type=\"button\"\n        (click)=\"crearTransaccion()\"\n      >\n        A\u00F1adir\n      </ion-button>\n    </form>\n  </div>\n\n  <app-custom-alert\n    *ngIf=\"showCustomAlert\"\n    header=\"Cambios sin guardar\"\n    message=\"Has realizado cambios en la transacci\u00F3n. \u00BFDeseas salir sin guardar?\"\n    cancelText=\"No\"\n    confirmText=\"S\u00ED\"\n    (onCancel)=\"showCustomAlert = false\"\n    (onConfirm)=\"salirSinGuardar()\"\n  ></app-custom-alert>\n\n  <!-- Modal de selecci\u00F3n de cuentas -->\n  <!-- <app-account-selector-modal\n    [isOpen]=\"isModalOpen\"\n    [accounts]=\"cuentas\"\n    [selectedAccountId]=\"cuentaId\"\n    (accountSelected)=\"onAccountSelected($event)\"\n    (modalClosed)=\"closeModal()\"\n  ></app-account-selector-modal> -->\n\n</ion-content>\n", styles: ["// ====================\n// Variables y estilos globales\n// ====================\nion-content {\n  --background: #ffffff;\n}\n\n// ====================\n// Barra superior y header\n// ====================\n.side-menu {\n  display: flex;\n  height: 3.2em;\n  background: var(--ion-color-side-menu);\n  color: var(--ion-color-custom-gradient-contrast);\n}\n\n.header-title {\n  font-size: 18px;\n  font-weight: 600;\n  text-align: center;\n  color: #fff;\n  letter-spacing: 0.3px;\n}\n\n.atras-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  cursor: pointer;\n  padding: 0;\n  margin: 0;\n  border-radius: 50%;\n  transition: background 0.2s;\n  width: 40px;\n  height: 40px;\n  font-size: 25px;\n  \n  &:hover {\n    background: rgba(255, 255, 255, 0.1);\n  }\n  \n  ion-icon {\n    font-size: 28px;\n    color: #fff !important;\n    filter: brightness(0) invert(1);\n  }\n}\n\n// ====================\n// Contenedor principal con scroll\n// ====================\n.transaction-container {\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n  height: 100%;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n\n// ====================\n// Formulario\n// ====================\n.transaction-form {\n  background: transparent;\n  padding: 0;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  max-width: 600px;\n  margin: 0 auto;\n  width: 100%;\n}\n\n.transfer-section {\n  background: transparent;\n  border-radius: 0;\n  padding: 24px 20px;\n  border-bottom: 1px solid #f0f0f0;\n  transition: background 0.2s ease;\n  \n  &:active {\n    background: #fafafa;\n  }\n  \n  &:last-of-type {\n    border-bottom: none;\n  }\n}\n\n.transfer-label {\n  font-size: 15px;\n  color: #333;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-weight: 500;\n  text-transform: none;\n  letter-spacing: 0;\n}\n\n.label-icon {\n  font-size: 15px;\n  color: #6b7280;\n}\n\n// ====================\n// Monto\n// ====================\n.amount-row {\n  width: 100%;\n}\n\n// ====================\n// Selector de cuenta mejorado\n// ====================\n.account-btn {\n  width: 100%;\n  background: transparent;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n.account-btn-content {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  background: #f8f9fa;\n  border-radius: 10px;\n  border: 1.5px solid transparent;\n  transition: all 0.2s ease;\n  \n  &:active {\n    background: #f0f0f0;\n  }\n  \n  &.selected {\n    border-color: var(--ion-color-side-menu);\n    background: rgba(var(--ion-color-side-menu-rgb), 0.03);\n    \n    .account-name {\n      color: #1a1a2e;\n      font-weight: 600;\n    }\n  }\n}\n\n.account-info {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex: 1;\n}\n\n.account-icon {\n  font-size: 20px;\n  color: #6b7280;\n}\n\n.account-name {\n  font-size: 16px;\n  color: #6b7280;\n  font-weight: 500;\n  transition: all 0.2s ease;\n}\n\n.account-right {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.account-amount {\n  font-size: 16px;\n  font-weight: 700;\n  color: #1a1a2e;\n}\n\n.chevron-icon {\n  font-size: 18px;\n  color: #d1d5db;\n}\n\n// ====================\n// Tipo de transacci\u00F3n (dentro del formulario)\n// ====================\n.tipo-selectores {\n  display: flex;\n  gap: 10px;\n  margin-top: 4px;\n  background: #f8f9fa;\n  padding: 4px;\n  border-radius: 10px;\n}\n\n.tipo-btn {\n  flex: 1;\n  padding: 10px 20px;\n  border-radius: 7px;\n  border: none;\n  background: transparent;\n  color: #6b7280;\n  font-size: 15px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  &.selected {\n    background: #ffffff;\n    color: #1a1a2e;\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);\n  }\n}\n\n// ====================\n// Secci\u00F3n de categor\u00EDas\n// ====================\n.categories-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n  margin-top: 4px;\n}\n\n.category-item {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  \n  &:hover {\n    transform: translateY(-4px);\n    \n    .category-icon, .category-icon-add {\n      box-shadow: \n        0 12px 28px rgba(0, 0, 0, 0.15),\n        0 4px 12px rgba(0, 0, 0, 0.1),\n        inset 0 -4px 12px rgba(0, 0, 0, 0.15);\n    }\n  }\n  \n  &.selected {\n    .category-icon {\n      transform: scale(1.1);\n      box-shadow: \n        0 12px 28px rgba(0, 0, 0, 0.2),\n        0 4px 12px rgba(0, 0, 0, 0.15),\n        inset 0 -4px 12px rgba(0, 0, 0, 0.2),\n        0 0 0 3px var(--ion-color-side-menu),\n        0 0 0 5px rgba(var(--ion-color-side-menu-rgb), 0.2);\n    }\n    \n    .category-name {\n      color: var(--ion-color-side-menu);\n      font-weight: 700;\n    }\n  }\n}\n\n.category-icon {\n  width: 58px;\n  height: 58px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  box-shadow: \n    0 8px 24px rgba(0, 0, 0, 0.12),\n    0 2px 8px rgba(0, 0, 0, 0.08),\n    inset 0 -3px 10px rgba(0, 0, 0, 0.15);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  \n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    border-radius: 50%;\n    background: linear-gradient(135deg, \n      rgba(255,255,255,0.35) 0%, \n      rgba(255,255,255,0) 60%\n    );\n  }\n  \n  &::after {\n    content: '';\n    position: absolute;\n    top: 2px;\n    left: 2px;\n    right: 2px;\n    bottom: 2px;\n    border-radius: 50%;\n    border: 1px solid rgba(255, 255, 255, 0.2);\n  }\n  \n  ion-icon {\n    font-size: 26px;\n    color: #fff !important;\n    filter: brightness(0) invert(1) drop-shadow(0 2px 5px rgba(0, 0, 0, 0.25));\n    position: relative;\n    z-index: 1;\n  }\n}\n\n.category-icon-add {\n  width: 52px;\n  height: 52px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto;\n  box-shadow: \n    0 8px 24px rgba(0, 0, 0, 0.12),\n    0 2px 8px rgba(0, 0, 0, 0.08),\n    inset 0 -3px 10px rgba(0, 0, 0, 0.15);\n  border-radius: 50%;\n  background: #e5e7eb;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  \n  ion-icon {\n    font-size: 36px;\n    color: #6b7280 !important;\n    filter: none;\n  }\n}\n\n.category-name {\n  font-size: 12px;\n  color: #4b5563;\n  text-align: center;\n  font-weight: 500;\n  transition: all 0.3s ease;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n// ====================\n// Secci\u00F3n de fecha\n// ====================\n.date-options {\n  display: flex;\n  gap: 8px;\n  \n  .date-btn {\n    flex: 1;\n    background: #f8f9fa;\n    border: none;\n    border-radius: 10px;\n    padding: 12px 8px;\n    font-size: 13px;\n    color: #6b7280;\n    text-align: center;\n    cursor: pointer;\n    transition: all 0.2s ease;\n    line-height: 1.4;\n    font-weight: 500;\n    \n    &.active {\n      background: #1a1a2e;\n      color: #fff;\n      font-weight: 600;\n    }\n    \n    &:active:not(.active) {\n      background: #e5e7eb;\n    }\n  }\n  \n  .calendar-btn {\n    min-width: 48px;\n    background: #f8f9fa;\n    border: none;\n    border-radius: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    transition: all 0.2s ease;\n    \n    &:active {\n      background: #e5e7eb;\n    }\n    \n    ion-icon {\n      font-size: 22px;\n      color: #6b7280;\n    }\n  }\n}\n\n// ====================\n// Comentario\n// ====================\n.comment-input {\n  width: 100%;\n  min-height: 60px;\n  font-size: 15px;\n  background: #f8f9fa;\n  color: #1a1a2e;\n  border-radius: 10px;\n  border: none;\n  padding: 12px 16px;\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 12px;\n  --padding-bottom: 12px;\n}\n\n.comment-count {\n  font-size: 11px;\n  color: #d1d5db;\n  text-align: right;\n  margin-top: 6px;\n  font-weight: 500;\n}\n\n// ====================\n// Bot\u00F3n Submit\n// ====================\n.btn-transferir {\n  margin: 32px 20px 20px 20px;\n  font-weight: 700;\n  font-size: 16px;\n  height: 54px;\n  border-radius: 12px;\n  letter-spacing: 0.2px;\n  --background: #1a1a2e;\n  --color: #fff;\n  --box-shadow: 0 4px 12px rgba(26, 26, 46, 0.15);\n  --border-radius: 12px;\n  text-transform: none;\n  \n  &:active:not(:disabled) {\n    --box-shadow: 0 2px 8px rgba(26, 26, 46, 0.2);\n  }\n  \n  &:disabled {\n    --background: #f0f0f0;\n    --color: #d1d5db;\n    --box-shadow: none;\n    opacity: 1;\n    cursor: not-allowed;\n  }\n}\n"] }]
    }], () => [{ type: i1.NavigationService }, { type: i2.CreateTransactionsUseCase }, { type: i3.ListCategoriesUseCase }, { type: i4.ListAccountsUseCase }, { type: i5.SpinnerService }, { type: i6.AlertService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CreateTransacPage, { className: "CreateTransacPage", filePath: "src/app/features/side-menu/home/create-transac/create-transac.page.ts", lineNumber: 24 }); })();
//# sourceMappingURL=create-transac.page.js.map