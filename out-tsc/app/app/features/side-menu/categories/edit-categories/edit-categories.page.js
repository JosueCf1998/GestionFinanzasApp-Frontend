import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CATEGORY_ICONS } from 'src/app/shared/constants/category-options';
import { PERSONALIZATION_COLORS } from 'src/app/shared/constants/personalization-options';
import { CustomAlertComponent } from "../../../../shared/components/custom-alert/custom-alert.component";
import 'src/app/core/utils/observable-extensions';
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { PageLayoutComponent } from "src/app/shared/components/page-layout/page-layout.component";
import { ItemIconComponent } from "src/app/shared/components/item-icon/item-icon.component";
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/use-cases/categories/update-category.usecase";
import * as i2 from "src/app/core/use-cases/categories/delete-category.usecase";
import * as i3 from "src/app/core/services/navigation.service";
import * as i4 from "src/app/core/services/spinnerService.service";
import * as i5 from "@angular/router";
import * as i6 from "@ionic/angular";
import * as i7 from "@angular/common";
import * as i8 from "@angular/forms";
function EditCategoriesPage_app_item_icon_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-item-icon", 23);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("icon", ctx_r0.iconoCategoria)("color", ctx_r0.colorCategoria);
} }
function EditCategoriesPage_button_27_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 24);
    i0.ɵɵlistener("click", function EditCategoriesPage_button_27_Template_button_click_0_listener() { const icon_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.seleccionarIcono(icon_r3)); });
    i0.ɵɵelement(1, "app-item-icon", 25);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const icon_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("selected", icon_r3.icon === ctx_r0.iconoSeleccionado);
    i0.ɵɵattribute("aria-label", icon_r3.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", icon_r3.icon)("color", ctx_r0.colorCategoria)("selected", icon_r3.icon === ctx_r0.iconoSeleccionado);
} }
function EditCategoriesPage_button_35_ion_icon_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 28);
} }
function EditCategoriesPage_button_35_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 26);
    i0.ɵɵlistener("click", function EditCategoriesPage_button_35_Template_button_click_0_listener() { const color_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.seleccionarColor(color_r5)); });
    i0.ɵɵtemplate(1, EditCategoriesPage_button_35_ion_icon_1_Template, 1, 0, "ion-icon", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const color_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background", color_r5.value);
    i0.ɵɵclassProp("selected", color_r5.value === ctx_r0.colorSeleccionado);
    i0.ɵɵattribute("aria-label", color_r5.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", color_r5.value === ctx_r0.colorSeleccionado);
} }
function EditCategoriesPage_app_custom_alert_39_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 29);
    i0.ɵɵlistener("onCancel", function EditCategoriesPage_app_custom_alert_39_Template_app_custom_alert_onCancel_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cerrarAlert()); })("onConfirm", function EditCategoriesPage_app_custom_alert_39_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.salirSinGuardar()); });
    i0.ɵɵelementEnd();
} }
function EditCategoriesPage_app_custom_alert_40_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 30);
    i0.ɵɵlistener("onCancel", function EditCategoriesPage_app_custom_alert_40_Template_app_custom_alert_onCancel_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cerrarAlert()); })("onConfirm", function EditCategoriesPage_app_custom_alert_40_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.confirmarEliminacion()); });
    i0.ɵɵelementEnd();
} }
function EditCategoriesPage_app_custom_alert_41_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 31);
    i0.ɵɵlistener("onConfirm", function EditCategoriesPage_app_custom_alert_41_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cerrarAlert()); });
    i0.ɵɵelementEnd();
} }
function EditCategoriesPage_app_custom_alert_42_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 32);
    i0.ɵɵlistener("onConfirm", function EditCategoriesPage_app_custom_alert_42_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cerrarAlert()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r0.messageError);
} }
export class EditCategoriesPage {
    constructor(updateCategoryUseCase, deleteCategoryUseCase, navService, loadingService, router) {
        this.updateCategoryUseCase = updateCategoryUseCase;
        this.deleteCategoryUseCase = deleteCategoryUseCase;
        this.navService = navService;
        this.loadingService = loadingService;
        this.router = router;
        this.iconos = CATEGORY_ICONS;
        this.colores = PERSONALIZATION_COLORS;
        this.nombreCategoria = '';
        this.showError = false;
        this.showExitAlert = false;
        this.showDeleteAlert = false;
        this.showGenericAlert = false;
        this.showUnauthorizedAlert = false;
        this.messageError = '';
        this.cambiosPendientes = false;
        this.isFirstInput = true;
        const state = window.history.state;
        if (!state || !state.type || !state.category) {
            this.navService.back();
            throw new Error('No se recibió la información necesaria para editar la categoría.');
        }
        this.tipoCategoria = state.type;
        this.category = state.category;
        this.nombreCategoria = this.category.nombre;
        this.iconoCategoria = this.category.icono;
        this.colorCategoria = this.category.color;
        this.iconoSeleccionado = this.category.icono;
        this.colorSeleccionado = this.category.color;
    }
    // MARK: - SERVICIOS
    executeUpdateCategory(body) {
        this.loadingService.show();
        this.updateCategoryUseCase.updateCategory(body).service({
            success: (data) => {
                this.loadingService.hide();
                if (data) {
                    this.cambiosPendientes = false;
                    this.navService.back();
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
    executeDeleteCategory() {
        if (!this.category.id) {
            console.error('No hay ID de categoría para eliminar');
            this.showGenericAlert = true;
            return;
        }
        this.loadingService.show();
        this.deleteCategoryUseCase.deleteCategory({ id: this.category.id }).service({
            success: () => {
                this.loadingService.hide();
                this.cambiosPendientes = false;
                this.navService.back();
            },
            failure: (error) => {
                this.loadingService.hide();
                this.messageError = 'Error al eliminar la categoría';
                this.showGenericAlert = true;
            }
        });
    }
    // MARK: - FUNCIONALIDADES
    seleccionarIcono(option) {
        this.iconoSeleccionado = option.icon;
        this.iconoCategoria = option.icon;
        this.detectarCambios();
    }
    seleccionarColor(option) {
        this.colorSeleccionado = option.value;
        this.colorCategoria = option.value;
        this.detectarCambios();
    }
    anadirCategoria() {
        const nombreFinal = this.nombreCategoria.trim() === '' ? this.category.nombre : this.nombreCategoria.trim();
        if (!nombreFinal || !this.iconoSeleccionado || !this.colorSeleccionado) {
            this.showError = true;
            return;
        }
        this.showError = false;
        if (!this.category.id) {
            console.error('No se puede actualizar la categoría sin ID');
            this.showGenericAlert = true;
            return;
        }
        const body = {
            id: this.category.id,
            name: nombreFinal,
            type: this.tipoCategoria,
            icon: this.iconoSeleccionado,
            color: this.colorSeleccionado
        };
        console.log('Cuerpo de la solicitud de actualización:', body);
        this.executeUpdateCategory(body);
    }
    onInputNombreCategoria(event) {
        const value = event?.detail?.value ?? event?.target?.value ?? '';
        this.detectarCambios();
    }
    detectarCambios() {
        const nombreCambiado = this.nombreCategoria.trim() !== this.category.nombre;
        const iconoCambiado = this.iconoSeleccionado !== this.category.icono;
        const colorCambiado = this.colorSeleccionado !== this.category.color;
        this.cambiosPendientes = nombreCambiado || iconoCambiado || colorCambiado;
    }
    clearNombreCategoria() {
        this.nombreCategoria = '';
        this.isFirstInput = true;
    }
    async backToCategories() {
        if (this.cambiosPendientes) {
            this.showExitAlert = true;
        }
        else {
            document.activeElement?.blur();
            this.navService.back();
        }
    }
    eliminarCategoria() {
        if (!this.category.id) {
            console.error('No hay ID de categoría para eliminar');
            return;
        }
        this.showDeleteAlert = true;
    }
    confirmarEliminacion() {
        this.showDeleteAlert = false;
        this.executeDeleteCategory();
    }
    cerrarAlert() {
        this.showExitAlert = false;
        this.showDeleteAlert = false;
        this.showGenericAlert = false;
        this.showUnauthorizedAlert = false;
    }
    get puedeGuardar() {
        const tieneNombre = this.nombreCategoria.trim() !== '';
        const tieneIcono = this.iconoSeleccionado !== '';
        const tieneColor = this.colorSeleccionado !== '';
        const hayCambios = this.cambiosPendientes;
        return tieneNombre && tieneIcono && tieneColor && hayCambios;
    }
    salirSinGuardar() {
        this.showExitAlert = false;
        document.activeElement?.blur();
        this.navService.back();
    }
    static { this.ɵfac = function EditCategoriesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EditCategoriesPage)(i0.ɵɵdirectiveInject(i1.UpdateCategoryUseCase), i0.ɵɵdirectiveInject(i2.DeleteCategoryUseCase), i0.ɵɵdirectiveInject(i3.NavigationService), i0.ɵɵdirectiveInject(i4.SpinnerService), i0.ɵɵdirectiveInject(i5.Router)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EditCategoriesPage, selectors: [["app-edit-categories"]], decls: 43, vars: 19, consts: [["title", "Editar categor\u00EDa", 3, "back"], [1, "edit-category-page", 3, "fullscreen"], [1, "edit-category-form", 3, "ngSubmit"], [1, "category-preview"], ["size", "xl", "variant", "soft", 3, "icon", "color", 4, "ngIf"], [1, "preview-title"], [1, "preview-type"], [1, "form-section"], [1, "section-label"], ["type", "text", "name", "nombreCategoria", "maxlength", "30", "autocomplete", "off", "placeholder", "Ej. Alimentaci\u00F3n", "required", "", 1, "fv-input", 3, "ngModelChange", "ionInput", "ngModel"], [1, "readonly-type"], [1, "section-header"], [1, "icons-grid"], ["type", "button", "class", "icon-button", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "colors-grid"], ["type", "button", "class", "color-button", 3, "background", "selected", "click", 4, "ngFor", "ngForOf"], [1, "action-container"], ["text", "Guardar cambios", "type", "submit", 3, "disabled"], ["text", "Eliminar categor\u00EDa", "icon", "trash", "variant", "danger", 3, "clicked"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la categor\u00EDa. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm", 4, "ngIf"], ["header", "Eliminar categor\u00EDa", "message", "Esta acci\u00F3n no se puede deshacer. \u00BFDeseas continuar?", "cancelText", "Cancelar", "confirmText", "Eliminar", 3, "onCancel", "onConfirm", 4, "ngIf"], ["header", "Error", "message", "Ocurri\u00F3 un error al procesar la solicitud. Int\u00E9ntalo nuevamente.", "confirmText", "Aceptar", 3, "onConfirm", 4, "ngIf"], ["header", "Error", "confirmText", "Aceptar", 3, "message", "onConfirm", 4, "ngIf"], ["size", "xl", "variant", "soft", 3, "icon", "color"], ["type", "button", 1, "icon-button", 3, "click"], ["size", "sm", "variant", "soft", 3, "icon", "color", "selected"], ["type", "button", 1, "color-button", 3, "click"], ["src", "assets/icon/check.svg", 4, "ngIf"], ["src", "assets/icon/check.svg"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la categor\u00EDa. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm"], ["header", "Eliminar categor\u00EDa", "message", "Esta acci\u00F3n no se puede deshacer. \u00BFDeseas continuar?", "cancelText", "Cancelar", "confirmText", "Eliminar", 3, "onCancel", "onConfirm"], ["header", "Error", "message", "Ocurri\u00F3 un error al procesar la solicitud. Int\u00E9ntalo nuevamente.", "confirmText", "Aceptar", 3, "onConfirm"], ["header", "Error", "confirmText", "Aceptar", 3, "onConfirm", "message"]], template: function EditCategoriesPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-header")(1, "app-page-layout", 0);
            i0.ɵɵlistener("back", function EditCategoriesPage_Template_app_page_layout_back_1_listener() { return ctx.backToCategories(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(2, "ion-content", 1)(3, "form", 2);
            i0.ɵɵlistener("ngSubmit", function EditCategoriesPage_Template_form_ngSubmit_3_listener() { return ctx.anadirCategoria(); });
            i0.ɵɵelementStart(4, "section", 3);
            i0.ɵɵtemplate(5, EditCategoriesPage_app_item_icon_5_Template, 1, 2, "app-item-icon", 4);
            i0.ɵɵelementStart(6, "h2", 5);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span", 6);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "section", 7)(11, "label", 8);
            i0.ɵɵtext(12, " Nombre ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "ion-input", 9);
            i0.ɵɵtwoWayListener("ngModelChange", function EditCategoriesPage_Template_ion_input_ngModelChange_13_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.nombreCategoria, $event) || (ctx.nombreCategoria = $event); return $event; });
            i0.ɵɵlistener("ionInput", function EditCategoriesPage_Template_ion_input_ionInput_13_listener($event) { return ctx.onInputNombreCategoria($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "section", 7)(15, "label", 8);
            i0.ɵɵtext(16, " Tipo de categor\u00EDa ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 10)(18, "span", 6);
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "section", 7)(21, "div", 11)(22, "label", 8);
            i0.ɵɵtext(23, " \u00CDcono ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span");
            i0.ɵɵtext(25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "div", 12);
            i0.ɵɵtemplate(27, EditCategoriesPage_button_27_Template, 2, 6, "button", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "section", 7)(29, "div", 11)(30, "label", 8);
            i0.ɵɵtext(31, " Color ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "span");
            i0.ɵɵtext(33);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 14);
            i0.ɵɵtemplate(35, EditCategoriesPage_button_35_Template, 2, 6, "button", 15);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "div", 16);
            i0.ɵɵelement(37, "app-button", 17);
            i0.ɵɵelementStart(38, "app-button", 18);
            i0.ɵɵlistener("clicked", function EditCategoriesPage_Template_app_button_clicked_38_listener() { return ctx.eliminarCategoria(); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(39, EditCategoriesPage_app_custom_alert_39_Template, 1, 0, "app-custom-alert", 19)(40, EditCategoriesPage_app_custom_alert_40_Template, 1, 0, "app-custom-alert", 20)(41, EditCategoriesPage_app_custom_alert_41_Template, 1, 0, "app-custom-alert", 21)(42, EditCategoriesPage_app_custom_alert_42_Template, 1, 1, "app-custom-alert", 22);
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("fullscreen", false);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.iconoCategoria);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.nombreCategoria || "Categor\u00EDa", " ");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("income", ctx.tipoCategoria === "ingresos");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.tipoCategoria === "ingresos" ? "Ingreso" : "Gasto", " ");
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.nombreCategoria);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("income", ctx.tipoCategoria === "ingresos");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.tipoCategoria === "ingresos" ? "Ingreso" : "Gasto", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.iconos.length, " disponibles ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.iconos);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.colores.length, " disponibles ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.colores);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.puedeGuardar);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.showExitAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showDeleteAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showGenericAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showUnauthorizedAlert);
        } }, dependencies: [IonicModule, i6.IonContent, i6.IonHeader, i6.IonIcon, i6.IonInput, i6.TextValueAccessor, CommonModule, i7.NgForOf, i7.NgIf, FormsModule, i8.ɵNgNoValidate, i8.NgControlStatus, i8.NgControlStatusGroup, i8.RequiredValidator, i8.MaxLengthValidator, i8.NgModel, i8.NgForm, HttpClientModule, CustomAlertComponent, ButtonComponent, PageLayoutComponent, ItemIconComponent], styles: ["@use '../../../../shared/styles/category-form';\n\n.edit-category-page[_ngcontent-%COMP%] {\n  --background: var(--fv-background);\n}\n\n.edit-category-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding: 16px;\n  padding-bottom: 16px;\n}\n\n.readonly-type[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n\n.action-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-top: 4px;\n}\n\n.delete-button[_ngcontent-%COMP%] {\n  \n\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EditCategoriesPage, [{
        type: Component,
        args: [{ selector: "app-edit-categories", standalone: true, imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomAlertComponent, ButtonComponent, PageLayoutComponent, ItemIconComponent], template: "<ion-header>\n\n  <app-page-layout\n    title=\"Editar categor\u00EDa\"\n    (back)=\"backToCategories()\">\n  </app-page-layout>\n\n</ion-header>\n\n<ion-content\n  [fullscreen]=\"false\"\n  class=\"edit-category-page\">\n\n  <!-- ==========================================================\n       FORM\n       ========================================================== -->\n\n  <form\n    class=\"edit-category-form\"\n    (ngSubmit)=\"anadirCategoria()\">\n\n    <!-- ==========================================================\n         CATEGORY PREVIEW\n         ========================================================== -->\n\n    <section class=\"category-preview\">\n\n      <app-item-icon\n        *ngIf=\"iconoCategoria\"\n        [icon]=\"iconoCategoria\"\n        [color]=\"colorCategoria\"\n        size=\"xl\"\n        variant=\"soft\">\n      </app-item-icon>\n\n      <h2 class=\"preview-title\">\n\n        {{\n          nombreCategoria ||\n          'Categor\u00EDa'\n        }}\n\n      </h2>\n\n      <span\n        class=\"preview-type\"\n        [class.income]=\"tipoCategoria === 'ingresos'\">\n\n        {{\n          tipoCategoria === 'ingresos'\n            ? 'Ingreso'\n            : 'Gasto'\n        }}\n\n      </span>\n\n    </section>\n\n    <!-- ==========================================================\n         NAME\n         ========================================================== -->\n\n    <section class=\"form-section\">\n\n      <label class=\"section-label\">\n\n        Nombre\n\n      </label>\n\n      <ion-input\n        class=\"fv-input\"\n        type=\"text\"\n        name=\"nombreCategoria\"\n        maxlength=\"30\"\n        autocomplete=\"off\"\n        placeholder=\"Ej. Alimentaci\u00F3n\"\n        [(ngModel)]=\"nombreCategoria\"\n        (ionInput)=\"onInputNombreCategoria($event)\"\n        required>\n\n      </ion-input>\n\n    </section>\n\n    <!-- ==========================================================\n         TYPE\n         ========================================================== -->\n\n    <section class=\"form-section\">\n\n      <label class=\"section-label\">\n\n        Tipo de categor\u00EDa\n\n      </label>\n\n      <div class=\"readonly-type\">\n\n        <span\n          class=\"preview-type\"\n          [class.income]=\"tipoCategoria === 'ingresos'\">\n\n          {{\n            tipoCategoria === 'ingresos'\n              ? 'Ingreso'\n              : 'Gasto'\n          }}\n\n        </span>\n\n      </div>\n\n    </section>\n\n    <!-- ==========================================================\n         ICONS\n         ========================================================== -->\n\n    <section class=\"form-section\">\n\n      <div class=\"section-header\">\n\n        <label class=\"section-label\">\n\n          \u00CDcono\n\n        </label>\n\n        <span>\n\n          {{ iconos.length }} disponibles\n\n        </span>\n\n      </div>\n\n      <div class=\"icons-grid\">\n\n        <button\n          *ngFor=\"let icon of iconos\"\n          type=\"button\"\n          class=\"icon-button\"\n          [class.selected]=\"icon.icon === iconoSeleccionado\"\n          [attr.aria-label]=\"icon.label\"\n          (click)=\"seleccionarIcono(icon)\">\n\n          <app-item-icon\n            [icon]=\"icon.icon\"\n            [color]=\"colorCategoria\"\n            size=\"sm\"\n            variant=\"soft\"\n            [selected]=\"icon.icon === iconoSeleccionado\">\n          </app-item-icon>\n\n        </button>\n\n      </div>\n\n    </section>\n\n    <!-- ==========================================================\n         COLORS\n         ========================================================== -->\n\n    <section class=\"form-section\">\n\n      <div class=\"section-header\">\n\n        <label class=\"section-label\">\n\n          Color\n\n        </label>\n\n        <span>\n\n          {{ colores.length }} disponibles\n\n        </span>\n\n      </div>\n\n      <div class=\"colors-grid\">\n\n        <button\n          *ngFor=\"let color of colores\"\n          type=\"button\"\n          class=\"color-button\"\n          [style.background]=\"color.value\"\n          [class.selected]=\"color.value === colorSeleccionado\"\n          [attr.aria-label]=\"color.label\"\n          (click)=\"seleccionarColor(color)\">\n\n          <ion-icon\n            *ngIf=\"color.value === colorSeleccionado\"\n            src=\"assets/icon/check.svg\">\n\n          </ion-icon>\n\n        </button>\n\n      </div>\n\n    </section>\n\n    <!-- ==========================================================\n         ACTIONS\n         ========================================================== -->\n\n    <div class=\"action-container\">\n\n      <app-button\n        text=\"Guardar cambios\"\n        type=\"submit\"\n        [disabled]=\"!puedeGuardar\">\n\n      </app-button>\n\n      <app-button\n        text=\"Eliminar categor\u00EDa\"\n        icon=\"trash\"\n        variant=\"danger\"\n        (clicked)=\"eliminarCategoria()\">\n\n      </app-button>\n\n    </div>\n\n  </form>\n\n</ion-content>\n\n<!-- ==========================================================\n     ALERTA CAMBIOS\n     ========================================================== -->\n\n<app-custom-alert\n  *ngIf=\"showExitAlert\"\n  header=\"Cambios sin guardar\"\n  message=\"Has realizado cambios en la categor\u00EDa. \u00BFDeseas salir sin guardar?\"\n  cancelText=\"No\"\n  confirmText=\"S\u00ED\"\n  (onCancel)=\"cerrarAlert()\"\n  (onConfirm)=\"salirSinGuardar()\">\n</app-custom-alert>\n\n<!-- ==========================================================\n     ALERTA ELIMINAR\n     ========================================================== -->\n\n<app-custom-alert\n  *ngIf=\"showDeleteAlert\"\n  header=\"Eliminar categor\u00EDa\"\n  message=\"Esta acci\u00F3n no se puede deshacer. \u00BFDeseas continuar?\"\n  cancelText=\"Cancelar\"\n  confirmText=\"Eliminar\"\n  (onCancel)=\"cerrarAlert()\"\n  (onConfirm)=\"confirmarEliminacion()\">\n</app-custom-alert>\n\n<!-- ==========================================================\n     ALERTA ERROR\n     ========================================================== -->\n\n<app-custom-alert\n  *ngIf=\"showGenericAlert\"\n  header=\"Error\"\n  message=\"Ocurri\u00F3 un error al procesar la solicitud. Int\u00E9ntalo nuevamente.\"\n  confirmText=\"Aceptar\"\n  (onConfirm)=\"cerrarAlert()\">\n</app-custom-alert>\n\n<!-- ==========================================================\n     ALERTA MENSAJE\n     ========================================================== -->\n\n<app-custom-alert\n  *ngIf=\"showUnauthorizedAlert\"\n  header=\"Error\"\n  [message]=\"messageError\"\n  confirmText=\"Aceptar\"\n  (onConfirm)=\"cerrarAlert()\">\n</app-custom-alert>\n", styles: ["@use '../../../../shared/styles/category-form';\n\n.edit-category-page {\n  --background: var(--fv-background);\n}\n\n.edit-category-form {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding: 16px;\n  padding-bottom: 16px;\n}\n\n.readonly-type {\n  display: flex;\n  align-items: center;\n}\n\n.action-container {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-top: 4px;\n}\n\n.delete-button {\n  /* estilos */\n}\n"] }]
    }], () => [{ type: i1.UpdateCategoryUseCase }, { type: i2.DeleteCategoryUseCase }, { type: i3.NavigationService }, { type: i4.SpinnerService }, { type: i5.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EditCategoriesPage, { className: "EditCategoriesPage", filePath: "src/app/features/side-menu/categories/edit-categories/edit-categories.page.ts", lineNumber: 27 }); })();
//# sourceMappingURL=edit-categories.page.js.map