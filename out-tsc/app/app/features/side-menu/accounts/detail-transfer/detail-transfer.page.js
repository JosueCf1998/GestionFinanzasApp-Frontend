import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { CustomAlertComponent } from "../../../../shared/components/custom-alert/custom-alert.component";
import { ItemIconComponent } from "src/app/shared/components/item-icon/item-icon.component";
import { PageLayoutComponent } from "src/app/shared/components/page-layout/page-layout.component";
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/services/navigation.service";
import * as i2 from "@angular/router";
import * as i3 from "src/app/core/use-cases/transfer/delete-transfer.usecase";
import * as i4 from "src/app/core/services/spinnerService.service";
import * as i5 from "@ionic/angular";
import * as i6 from "@angular/common";
function DetailTransferPage_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "span", 8);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 15);
    i0.ɵɵelement(4, "app-item-icon", 16);
    i0.ɵɵelementStart(5, "span", 10);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.type === "Realizado" ? "Desde" : "Cuenta", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("icon", ctx_r0.cuentaOrigenIcon)("color", ctx_r0.cuentaOrigenColor);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.cuentaOrigen, " ");
} }
function DetailTransferPage_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "span", 8);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 15);
    i0.ɵɵelement(4, "app-item-icon", 16);
    i0.ɵɵelementStart(5, "span", 10);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.type === "Realizado" ? "Hacia" : "Cuenta inicial", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("icon", ctx_r0.cuentaDestinoIcon)("color", ctx_r0.cuentaDestinoColor);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.cuentaDestino, " ");
} }
function DetailTransferPage_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "span", 8);
    i0.ɵɵtext(2, " Comentario ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 17);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.comentario, " ");
} }
function DetailTransferPage_div_22_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 18)(1, "ion-button", 19);
    i0.ɵɵlistener("click", function DetailTransferPage_div_22_Template_ion_button_click_1_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.editarTransferencia()); });
    i0.ɵɵelement(2, "ion-icon", 20);
    i0.ɵɵtext(3, " Editar ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "ion-button", 21);
    i0.ɵɵlistener("click", function DetailTransferPage_div_22_Template_ion_button_click_4_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.eliminarTransferencia()); });
    i0.ɵɵtext(5, " Eliminar ");
    i0.ɵɵelementEnd()();
} }
function DetailTransferPage_app_custom_alert_23_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 22);
    i0.ɵɵlistener("onCancel", function DetailTransferPage_app_custom_alert_23_Template_app_custom_alert_onCancel_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cerrarAlert()); })("onConfirm", function DetailTransferPage_app_custom_alert_23_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.confirmarEliminacion()); });
    i0.ɵɵelementEnd();
} }
function DetailTransferPage_app_custom_alert_24_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 23);
    i0.ɵɵlistener("onConfirm", function DetailTransferPage_app_custom_alert_24_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cerrarAlert()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r0.messageError);
} }
function DetailTransferPage_app_custom_alert_25_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 24);
    i0.ɵɵlistener("onConfirm", function DetailTransferPage_app_custom_alert_25_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showGenericAlert = false); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("message", "No se pudo completar la acci\u00F3n. Por favor, intenta nuevamente.")("imageUrl", "assets/icon/alert-triangle.svg")("confirmText", "Entendido")("alertSize", "medium")("reverseButtons", true)("showCancel", false);
} }
function DetailTransferPage_app_custom_alert_26_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 24);
    i0.ɵɵlistener("onConfirm", function DetailTransferPage_app_custom_alert_26_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showUnauthorizedAlert = false); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r0.messageError)("imageUrl", "assets/icon/alert-triangle.svg")("confirmText", "Entendido")("alertSize", "medium")("reverseButtons", true)("showCancel", false);
} }
export class DetailTransferPage {
    constructor(navService, router, deleteTransferUseCase, loadingService) {
        this.navService = navService;
        this.router = router;
        this.deleteTransferUseCase = deleteTransferUseCase;
        this.loadingService = loadingService;
        this.title = 'Detalle Transferencia';
        this.transferId = null;
        this.cuentaOrigenId = null;
        this.cuentaDestinoId = null;
        this.cuentaOrigen = '';
        this.cuentaDestino = '';
        this.monto = null;
        this.fecha = '';
        this.comentario = '';
        this.type = '';
        // Datos adicionales de las cuentas
        this.cuentaOrigenIcon = '';
        this.cuentaOrigenColor = '';
        this.cuentaDestinoIcon = '';
        this.cuentaDestinoColor = '';
        this.showCustomAlert = false;
        this.showGenericAlert = false;
        this.showUnauthorizedAlert = false;
        this.showErrorAlert = false;
        this.messageError = '';
    }
    ngOnInit() {
    }
    ionViewWillEnter() {
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras?.state || window.history.state;
        if (state?.transferData) {
            this.loadTransferData(state.transferData);
            localStorage.removeItem('transferDetail');
        }
        else {
            console.log('⚠️ No se recibió transferData en el state, intentando localStorage...');
            const storedData = localStorage.getItem('transferDetail');
            if (storedData) {
                console.log('✅ Datos recuperados desde localStorage');
                const transfer = JSON.parse(storedData);
                this.loadTransferData(transfer);
                localStorage.removeItem('transferDetail');
            }
            else {
                console.error('❌ No hay datos disponibles ni en state ni en localStorage');
            }
        }
    }
    loadTransferData(transfer) {
        console.log('=== CARGANDO DATOS DE TRANSFERENCIA ===');
        console.log('Transfer recibido:', transfer);
        this.transferId = transfer.id;
        this.cuentaOrigenId = transfer.originAccountId || null;
        this.cuentaDestinoId = transfer.destinationAccountId || null;
        this.cuentaOrigen = transfer.originAccountName || '';
        this.cuentaDestino = transfer.destinationAccountName || '';
        this.monto = transfer.amount;
        this.fecha = transfer.date || '';
        this.comentario = transfer.comment || '';
        this.type = transfer.type || '';
        // Cargar icono y color de las cuentas
        this.cuentaOrigenIcon = transfer.originAccountIcon || '';
        this.cuentaOrigenColor = transfer.originAccountColor || '';
        this.cuentaDestinoIcon = transfer.destinationAccountIcon || '';
        this.cuentaDestinoColor = transfer.destinationAccountColor || '';
    }
    backToCategories() {
        document.activeElement?.blur();
        this.navService.back();
    }
    formatDate(dateString) {
        if (!dateString)
            return '';
        // Extraer directamente del string para evitar problemas de zona horaria
        const parts = dateString.split('T')[0].split('-');
        const year = parts[0];
        const monthIndex = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const month = months[monthIndex];
        return `${day} de ${month} del ${year}`;
    }
    getTransferTypeLabel() {
        switch (this.type) {
            case 'Inicial':
                return 'Monto Inicial';
            case 'Ajuste':
                return 'Ajuste del Monto';
            case 'Realizado':
                return 'Transferencia Realizada';
            default:
                return 'Transferencia';
        }
    }
    editarTransferencia() {
        // Desenfocar el elemento activo antes de navegar
        document.activeElement?.blur();
        // Navegar a la página de edición con los datos de la transferencia
        const transferData = {
            id: this.transferId,
            originAccountId: this.cuentaOrigenId,
            destinationAccountId: this.cuentaDestinoId,
            amount: this.monto,
            date: this.fecha,
            comment: this.comentario,
            type: this.type,
            originAccountName: this.cuentaOrigen,
            destinationAccountName: this.cuentaDestino,
            originAccountIcon: this.cuentaOrigenIcon,
            originAccountColor: this.cuentaOrigenColor,
            destinationAccountIcon: this.cuentaDestinoIcon,
            destinationAccountColor: this.cuentaDestinoColor
        };
        localStorage.setItem('editTransfer', JSON.stringify(transferData));
        this.navService.push('/accounts/new-transfer', { transferData, isEdit: true });
    }
    async eliminarTransferencia() {
        if (!this.transferId) {
            console.error('No hay ID de transferencia para eliminar');
            return;
        }
        this.showCustomAlert = true;
    }
    confirmarEliminacion() {
        this.showCustomAlert = false;
        if (!this.transferId)
            return;
        this.loadingService.show();
        this.deleteTransferUseCase.deleteTransfer({ id: this.transferId }).service({
            success: () => {
                this.loadingService.hide();
                console.log('✅ Transferencia eliminada exitosamente');
                this.navService.back();
            },
            failure: (error) => {
                this.loadingService.hide();
                console.error('❌ Error en la petición:', error);
                this.showGenericAlert = true;
            }
        });
    }
    cerrarAlert() {
        this.showCustomAlert = false;
        this.showErrorAlert = false;
    }
    static { this.ɵfac = function DetailTransferPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DetailTransferPage)(i0.ɵɵdirectiveInject(i1.NavigationService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.DeleteTransferUseCase), i0.ɵɵdirectiveInject(i4.SpinnerService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DetailTransferPage, selectors: [["app-detail-transfer"]], decls: 27, vars: 16, consts: [[3, "back", "title", "showBack"], [3, "fullscreen"], [1, "transfer-detail-page"], [1, "detail-card"], [1, "section"], ["class", "row", 4, "ngIf"], [1, "divider"], [1, "row"], [1, "label"], [1, "value", "strong"], [1, "value"], ["class", "actions", 4, "ngIf"], ["header", "Eliminar transferencia", "message", "\u00BFEst\u00E1s seguro de que deseas eliminar esta transferencia?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm", 4, "ngIf"], ["header", "Error", "confirmText", "OK", 3, "message", "onConfirm", 4, "ngIf"], ["header", "", 3, "message", "imageUrl", "confirmText", "alertSize", "reverseButtons", "showCancel", "onConfirm", 4, "ngIf"], [1, "account-row"], ["size", "lg", 3, "icon", "color"], [1, "value", "muted"], [1, "actions"], ["expand", "block", 1, "btn-primary", 3, "click"], ["src", "assets/icon/edit.svg"], ["expand", "block", 1, "btn-danger", 3, "click"], ["header", "Eliminar transferencia", "message", "\u00BFEst\u00E1s seguro de que deseas eliminar esta transferencia?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm"], ["header", "Error", "confirmText", "OK", 3, "onConfirm", "message"], ["header", "", 3, "onConfirm", "message", "imageUrl", "confirmText", "alertSize", "reverseButtons", "showCancel"]], template: function DetailTransferPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-header")(1, "app-page-layout", 0);
            i0.ɵɵlistener("back", function DetailTransferPage_Template_app_page_layout_back_1_listener() { return ctx.backToCategories(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(2, "ion-content", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4);
            i0.ɵɵtemplate(6, DetailTransferPage_div_6_Template, 7, 4, "div", 5)(7, DetailTransferPage_div_7_Template, 7, 4, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(8, "div", 6);
            i0.ɵɵelementStart(9, "div", 4)(10, "div", 7)(11, "span", 8);
            i0.ɵɵtext(12, " Monto ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "span", 9);
            i0.ɵɵtext(14);
            i0.ɵɵpipe(15, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 7)(17, "span", 8);
            i0.ɵɵtext(18, " Fecha ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "span", 10);
            i0.ɵɵtext(20);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(21, DetailTransferPage_div_21_Template, 5, 1, "div", 5);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(22, DetailTransferPage_div_22_Template, 6, 0, "div", 11);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(23, DetailTransferPage_app_custom_alert_23_Template, 1, 0, "app-custom-alert", 12)(24, DetailTransferPage_app_custom_alert_24_Template, 1, 1, "app-custom-alert", 13)(25, DetailTransferPage_app_custom_alert_25_Template, 1, 6, "app-custom-alert", 14)(26, DetailTransferPage_app_custom_alert_26_Template, 1, 6, "app-custom-alert", 14);
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", ctx.title)("showBack", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("fullscreen", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.type === "Realizado" || ctx.type === "Ajuste");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.type === "Realizado" || ctx.type === "Inicial");
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1(" S/. ", i0.ɵɵpipeBind2(15, 13, ctx.monto, "1.2-2"), " ");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.formatDate(ctx.fecha), " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.comentario);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.type === "Realizado");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showCustomAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showErrorAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showGenericAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showUnauthorizedAlert);
        } }, dependencies: [IonicModule, i5.IonButton, i5.IonContent, i5.IonHeader, i5.IonIcon, CommonModule, i6.NgIf, i6.DecimalPipe, CustomAlertComponent, ItemIconComponent, PageLayoutComponent], styles: [".transfer-detail-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  padding: 16px;\n  background: var(--fv-background);\n}\n\n\n\n\n\n\n.detail-card[_ngcontent-%COMP%] {\n  background: var(--fv-surface);\n  border-radius: 18px;\n  padding: 18px;\n  box-shadow: var(--fv-shadow-sm);\n\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n\n\n\n\n\n\n.section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n\n\n\n\n\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n\n\n.label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n  color: var(--fv-text-secondary);\n}\n\n\n\n.value[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--fv-text-primary);\n  line-height: 1.3;\n}\n\n\n\n.value.strong[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--fv-text-primary);\n}\n\n\n\n.value.muted[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 400;\n  color: var(--fv-text-secondary);\n}\n\n\n\n\n\n\n.account-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n\n\n\n\n\n.divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: rgba(15, 23, 42, .06);\n  margin: 4px 0;\n}\n\n\n\n\n\n\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n\n\n.btn-primary[_ngcontent-%COMP%] {\n  --background: var(--fv-primary);\n  --border-radius: 14px;\n  height: 48px;\n\n  font-size: 14px;\n  font-weight: 700;\n}\n\n\n\n.btn-danger[_ngcontent-%COMP%] {\n  --background: #ef4444;\n  --border-radius: 14px;\n  height: 48px;\n\n  font-size: 14px;\n  font-weight: 700;\n}\n\n\n\n\n\n\nion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-right: 6px;\n  font-size: 18px;\n}\n\n\n\n\n\n\n@media (max-width: 380px) {\n\n  .transfer-detail-page[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n\n  .detail-card[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .value.strong[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DetailTransferPage, [{
        type: Component,
        args: [{ selector: "app-detail-transfer", standalone: true, imports: [IonicModule, CommonModule, CustomAlertComponent, ItemIconComponent, PageLayoutComponent], template: "<!-- ==========================================================\n     HEADER\n     ========================================================== -->\n\n<ion-header>\n  <app-page-layout\n    [title]=\"title\"\n    [showBack]=\"true\"\n    (back)=\"backToCategories()\">\n  </app-page-layout>\n</ion-header>\n\n<!-- ==========================================================\n     CONTENT\n     ========================================================== -->\n\n<ion-content [fullscreen]=\"true\">\n\n  <div class=\"transfer-detail-page\">\n\n    <!-- ==========================================================\n         MAIN CARD\n         ========================================================== -->\n\n    <div class=\"detail-card\">\n\n      <!-- ======================================================\n           ACCOUNTS SECTION\n           ====================================================== -->\n\n      <div class=\"section\">\n\n        <!-- ORIGIN -->\n        <div\n          class=\"row\"\n          *ngIf=\"type === 'Realizado' || type === 'Ajuste'\">\n\n          <span class=\"label\">\n            {{ type === 'Realizado' ? 'Desde' : 'Cuenta' }}\n          </span>\n\n          <div class=\"account-row\">\n\n            <app-item-icon\n              [icon]=\"cuentaOrigenIcon\"\n              [color]=\"cuentaOrigenColor\"\n              size=\"lg\">\n            </app-item-icon>\n\n            <span class=\"value\">\n              {{ cuentaOrigen }}\n            </span>\n\n          </div>\n\n        </div>\n\n        <!-- DESTINATION -->\n        <div\n          class=\"row\"\n          *ngIf=\"type === 'Realizado' || type === 'Inicial'\">\n\n          <span class=\"label\">\n            {{ type === 'Realizado' ? 'Hacia' : 'Cuenta inicial' }}\n          </span>\n\n          <div class=\"account-row\">\n\n            <app-item-icon\n              [icon]=\"cuentaDestinoIcon\"\n              [color]=\"cuentaDestinoColor\"\n              size=\"lg\">\n            </app-item-icon>\n\n            <span class=\"value\">\n              {{ cuentaDestino }}\n            </span>\n\n          </div>\n\n        </div>\n\n      </div>\n\n      <!-- DIVIDER -->\n      <div class=\"divider\"></div>\n\n      <!-- ======================================================\n           DETAILS SECTION\n           ====================================================== -->\n\n      <div class=\"section\">\n\n        <!-- AMOUNT -->\n        <div class=\"row\">\n\n          <span class=\"label\">\n            Monto\n          </span>\n\n          <span class=\"value strong\">\n            S/. {{ monto | number:'1.2-2' }}\n          </span>\n\n        </div>\n\n        <!-- DATE -->\n        <div class=\"row\">\n\n          <span class=\"label\">\n            Fecha\n          </span>\n\n          <span class=\"value\">\n            {{ formatDate(fecha) }}\n          </span>\n\n        </div>\n\n        <!-- COMMENT -->\n        <div\n          class=\"row\"\n          *ngIf=\"comentario\">\n\n          <span class=\"label\">\n            Comentario\n          </span>\n\n          <span class=\"value muted\">\n            {{ comentario }}\n          </span>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <!-- ==========================================================\n         ACTIONS\n         ========================================================== -->\n\n    <div\n      class=\"actions\"\n      *ngIf=\"type === 'Realizado'\">\n\n      <ion-button\n        class=\"btn-primary\"\n        expand=\"block\"\n        (click)=\"editarTransferencia()\">\n\n        <ion-icon src=\"assets/icon/edit.svg\"></ion-icon>\n\n        Editar\n\n      </ion-button>\n\n      <ion-button\n        class=\"btn-danger\"\n        expand=\"block\"\n        (click)=\"eliminarTransferencia()\">\n\n        Eliminar\n\n      </ion-button>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n<!-- ==========================================================\n     ALERTS\n     ========================================================== -->\n\n<app-custom-alert\n  *ngIf=\"showCustomAlert\"\n  header=\"Eliminar transferencia\"\n  message=\"\u00BFEst\u00E1s seguro de que deseas eliminar esta transferencia?\"\n  cancelText=\"No\"\n  confirmText=\"S\u00ED\"\n  (onCancel)=\"cerrarAlert()\"\n  (onConfirm)=\"confirmarEliminacion()\">\n</app-custom-alert>\n\n<app-custom-alert\n  *ngIf=\"showErrorAlert\"\n  header=\"Error\"\n  [message]=\"messageError\"\n  confirmText=\"OK\"\n  (onConfirm)=\"cerrarAlert()\">\n</app-custom-alert>\n\n  <app-custom-alert\n  *ngIf=\"showGenericAlert\"\n  header=\"\"\n  [message]=\"'No se pudo completar la acci\u00F3n. Por favor, intenta nuevamente.'\"\n  [imageUrl]=\"'assets/icon/alert-triangle.svg'\"\n  [confirmText]=\"'Entendido'\"\n  [alertSize]=\"'medium'\"\n  [reverseButtons]=\"true\"\n  [showCancel]=\"false\"\n  (onConfirm)=\"showGenericAlert = false\">\n  </app-custom-alert>\n\n<app-custom-alert\n  *ngIf=\"showUnauthorizedAlert\"\n  header=\"\"\n  [message]=\"messageError\"\n  [imageUrl]=\"'assets/icon/alert-triangle.svg'\"\n  [confirmText]=\"'Entendido'\"\n  [alertSize]=\"'medium'\"\n  [reverseButtons]=\"true\"\n  [showCancel]=\"false\"\n  (onConfirm)=\"showUnauthorizedAlert = false\">\n</app-custom-alert>\n", styles: [".transfer-detail-page {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  padding: 16px;\n  background: var(--fv-background);\n}\n\n/* ==========================================================\n   CARD PRINCIPAL\n   ========================================================== */\n\n.detail-card {\n  background: var(--fv-surface);\n  border-radius: 18px;\n  padding: 18px;\n  box-shadow: var(--fv-shadow-sm);\n\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n\n/* ==========================================================\n   SECTIONS\n   ========================================================== */\n\n.section {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n/* ==========================================================\n   ROW STRUCTURE\n   ========================================================== */\n\n.row {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n/* LABEL (FINVIA TYPO SYSTEM) */\n.label {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n  color: var(--fv-text-secondary);\n}\n\n/* VALUE BASE */\n.value {\n  font-size: 14px;\n  font-weight: 500;\n  color: var(--fv-text-primary);\n  line-height: 1.3;\n}\n\n/* STRONG VALUE (MOUNT) */\n.value.strong {\n  font-size: 16px;\n  font-weight: 800;\n  color: var(--fv-text-primary);\n}\n\n/* MUTED VALUE (COMMENT) */\n.value.muted {\n  font-size: 13px;\n  font-weight: 400;\n  color: var(--fv-text-secondary);\n}\n\n/* ==========================================================\n   ACCOUNT ROW (ICON + TEXT)\n   ========================================================== */\n\n.account-row {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n/* ==========================================================\n   DIVIDER\n   ========================================================== */\n\n.divider {\n  height: 1px;\n  background: rgba(15, 23, 42, .06);\n  margin: 4px 0;\n}\n\n/* ==========================================================\n   ACTIONS\n   ========================================================== */\n\n.actions {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n/* PRIMARY BUTTON */\n.btn-primary {\n  --background: var(--fv-primary);\n  --border-radius: 14px;\n  height: 48px;\n\n  font-size: 14px;\n  font-weight: 700;\n}\n\n/* DANGER BUTTON */\n.btn-danger {\n  --background: #ef4444;\n  --border-radius: 14px;\n  height: 48px;\n\n  font-size: 14px;\n  font-weight: 700;\n}\n\n/* ==========================================================\n   ICONS INSIDE BUTTONS\n   ========================================================== */\n\nion-button ion-icon {\n  margin-right: 6px;\n  font-size: 18px;\n}\n\n/* ==========================================================\n   RESPONSIVE\n   ========================================================== */\n\n@media (max-width: 380px) {\n\n  .transfer-detail-page {\n    padding: 12px;\n  }\n\n  .detail-card {\n    padding: 16px;\n  }\n\n  .value.strong {\n    font-size: 15px;\n  }\n}\n"] }]
    }], () => [{ type: i1.NavigationService }, { type: i2.Router }, { type: i3.DeleteTransferUseCase }, { type: i4.SpinnerService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DetailTransferPage, { className: "DetailTransferPage", filePath: "src/app/features/side-menu/accounts/detail-transfer/detail-transfer.page.ts", lineNumber: 19 }); })();
//# sourceMappingURL=detail-transfer.page.js.map