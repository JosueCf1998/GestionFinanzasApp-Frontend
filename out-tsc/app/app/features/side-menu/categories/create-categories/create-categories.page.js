import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CATEGORY_ICONS } from 'src/app/shared/constants/category-options';
import { PERSONALIZATION_COLORS } from 'src/app/shared/constants/personalization-options';
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import 'src/app/core/utils/observable-extensions';
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { ItemIconComponent } from "src/app/shared/components/item-icon/item-icon.component";
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/use-cases/categories/register-category.usecase";
import * as i2 from "src/app/core/services/navigation.service";
import * as i3 from "src/app/core/services/spinnerService.service";
import * as i4 from "@ionic/angular";
import * as i5 from "@angular/common";
import * as i6 from "@angular/forms";
function CreateCategoriesPage_app_item_icon_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-item-icon", 21);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("icon", ctx_r0.iconoCategoria)("color", ctx_r0.colorCategoria);
} }
function CreateCategoriesPage_button_26_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function CreateCategoriesPage_button_26_Template_button_click_0_listener() { const icon_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.seleccionarIcono(icon_r3)); });
    i0.ɵɵelement(1, "app-item-icon", 23);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const icon_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("selected", icon_r3.icon === ctx_r0.iconoSeleccionado);
    i0.ɵɵattribute("aria-label", icon_r3.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", icon_r3.icon)("color", ctx_r0.colorCategoria)("selected", icon_r3.icon === ctx_r0.iconoSeleccionado);
} }
function CreateCategoriesPage_button_34_ion_icon_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 26);
} }
function CreateCategoriesPage_button_34_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 24);
    i0.ɵɵlistener("click", function CreateCategoriesPage_button_34_Template_button_click_0_listener() { const color_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.seleccionarColor(color_r5)); });
    i0.ɵɵtemplate(1, CreateCategoriesPage_button_34_ion_icon_1_Template, 1, 0, "ion-icon", 25);
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
function CreateCategoriesPage_app_custom_alert_37_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 27);
    i0.ɵɵlistener("onCancel", function CreateCategoriesPage_app_custom_alert_37_Template_app_custom_alert_onCancel_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showCustomAlert = false); })("onConfirm", function CreateCategoriesPage_app_custom_alert_37_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.salirSinGuardar()); });
    i0.ɵɵelementEnd();
} }
function CreateCategoriesPage_app_custom_alert_38_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 28);
    i0.ɵɵlistener("onConfirm", function CreateCategoriesPage_app_custom_alert_38_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showGenericAlert = false); });
    i0.ɵɵelementEnd();
} }
export class CreateCategoriesPage {
    constructor(registerCategoryUseCase, navService, loadingService) {
        this.registerCategoryUseCase = registerCategoryUseCase;
        this.navService = navService;
        this.loadingService = loadingService;
        /* ==========================
           CONSTANTS
           ========================== */
        this.categoryTypes = [
            {
                label: 'Gasto',
                value: 'gasto'
            },
            {
                label: 'Ingreso',
                value: 'ingreso'
            }
        ];
        this.iconos = CATEGORY_ICONS;
        this.colores = PERSONALIZATION_COLORS;
        /* ==========================
           FORM
           ========================== */
        this.tipoCategoria = 'gasto';
        this.nombreCategoria = '';
        this.iconoSeleccionado = '';
        this.colorSeleccionado = '';
        /* ==========================
           UI STATE
           ========================== */
        this.showError = false;
        this.showCustomAlert = false;
        this.showGenericAlert = false;
        this.initialize();
    }
    /* ==========================
       INIT
       ========================== */
    initialize() {
        const state = window.history.state;
        if (!state?.type) {
            this.navService.forward('/main/categories', 'slide-right');
            return;
        }
        this.tipoCategoria = state.type;
    }
    /* ==========================
       GETTERS
       ========================== */
    get colorCategoria() {
        return (this.colorSeleccionado ||
            '#d3d3d3');
    }
    get iconoCategoria() {
        return this.iconoSeleccionado;
    }
    get puedeGuardar() {
        return Boolean(this.nombreCategoria.trim() &&
            this.iconoSeleccionado &&
            this.colorSeleccionado);
    }
    get hasChanges() {
        return Boolean(this.nombreCategoria.trim() ||
            this.iconoSeleccionado ||
            this.colorSeleccionado);
    }
    /* ==========================
       FORM ACTIONS
       ========================== */
    seleccionarIcono(option) {
        this.iconoSeleccionado =
            option.icon;
    }
    seleccionarColor(option) {
        this.colorSeleccionado =
            option.value;
    }
    clearNombreCategoria() {
        this.nombreCategoria = '';
    }
    onInputNombreCategoria() { }
    /* ==========================
       CREATE CATEGORY
       ========================== */
    anadirCategoria() {
        if (!this.puedeGuardar) {
            this.showError = true;
            return;
        }
        this.showError = false;
        const body = {
            name: this.nombreCategoria.trim(),
            type: this.tipoCategoria,
            icon: this.iconoSeleccionado,
            color: this.colorSeleccionado
        };
        this.executeCreateCategory(body);
    }
    executeCreateCategory(body) {
        this.loadingService.show();
        this.registerCategoryUseCase
            .registerCategory(body)
            .service({
            success: (data) => {
                this.loadingService.hide();
                if (!data) {
                    this.showGenericAlert = true;
                    return;
                }
                this.navService.back();
            },
            failure: () => {
                this.loadingService.hide();
                this.showGenericAlert = true;
            }
        });
    }
    /* ==========================
       NAVIGATION
       ========================== */
    backToCategories() {
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
    static { this.ɵfac = function CreateCategoriesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CreateCategoriesPage)(i0.ɵɵdirectiveInject(i1.CreateCategoryUseCase), i0.ɵɵdirectiveInject(i2.NavigationService), i0.ɵɵdirectiveInject(i3.SpinnerService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CreateCategoriesPage, selectors: [["app-create-categories"]], decls: 39, vars: 16, consts: [[1, "create-category-header"], ["title", "Crear categor\u00EDa", 3, "back"], [1, "create-category-page", 3, "fullscreen"], [1, "create-category-form", 3, "ngSubmit"], [1, "category-preview"], ["size", "xl", "variant", "soft", 3, "icon", "color", 4, "ngIf"], [1, "preview-title"], [1, "preview-type"], [1, "form-section"], [1, "section-label"], ["type", "text", "name", "nombreCategoria", "maxlength", "30", "autocomplete", "off", "placeholder", "Ej. Alimentaci\u00F3n", "required", "", 1, "fv-input", 3, "ngModelChange", "ngModel"], [1, "section-header"], [3, "modelChange", "options", "model"], [1, "icons-grid"], ["type", "button", "class", "icon-button", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "colors-grid"], ["type", "button", "class", "color-button", 3, "background", "selected", "click", 4, "ngFor", "ngForOf"], [1, "action-container"], ["text", "Crear categor\u00EDa", "type", "submit", 3, "disabled"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la categor\u00EDa. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm", 4, "ngIf"], ["header", "Error", "message", "No se pudo crear la categor\u00EDa. Int\u00E9ntalo nuevamente.", "confirmText", "Aceptar", 3, "onConfirm", 4, "ngIf"], ["size", "xl", "variant", "soft", 3, "icon", "color"], ["type", "button", 1, "icon-button", 3, "click"], ["size", "sm", "variant", "soft", 3, "icon", "color", "selected"], ["type", "button", 1, "color-button", 3, "click"], ["src", "assets/icon/check.svg", 4, "ngIf"], ["src", "assets/icon/check.svg"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la categor\u00EDa. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm"], ["header", "Error", "message", "No se pudo crear la categor\u00EDa. Int\u00E9ntalo nuevamente.", "confirmText", "Aceptar", 3, "onConfirm"]], template: function CreateCategoriesPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-header", 0)(1, "app-page-layout", 1);
            i0.ɵɵlistener("back", function CreateCategoriesPage_Template_app_page_layout_back_1_listener() { return ctx.backToCategories(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(2, "ion-content", 2)(3, "form", 3);
            i0.ɵɵlistener("ngSubmit", function CreateCategoriesPage_Template_form_ngSubmit_3_listener() { return ctx.anadirCategoria(); });
            i0.ɵɵelementStart(4, "section", 4);
            i0.ɵɵtemplate(5, CreateCategoriesPage_app_item_icon_5_Template, 1, 2, "app-item-icon", 5);
            i0.ɵɵelementStart(6, "h2", 6);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span", 7);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "section", 8)(11, "label", 9);
            i0.ɵɵtext(12, " Nombre ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "ion-input", 10);
            i0.ɵɵtwoWayListener("ngModelChange", function CreateCategoriesPage_Template_ion_input_ngModelChange_13_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.nombreCategoria, $event) || (ctx.nombreCategoria = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "section", 8)(15, "div", 11)(16, "label", 9);
            i0.ɵɵtext(17, " Tipo de categor\u00EDa ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "app-custom-segment", 12);
            i0.ɵɵtwoWayListener("modelChange", function CreateCategoriesPage_Template_app_custom_segment_modelChange_18_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.tipoCategoria, $event) || (ctx.tipoCategoria = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "section", 8)(20, "div", 11)(21, "label", 9);
            i0.ɵɵtext(22, " \u00CDcono ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span");
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 13);
            i0.ɵɵtemplate(26, CreateCategoriesPage_button_26_Template, 2, 6, "button", 14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "section", 8)(28, "div", 11)(29, "label", 9);
            i0.ɵɵtext(30, " Color ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span");
            i0.ɵɵtext(32);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "div", 15);
            i0.ɵɵtemplate(34, CreateCategoriesPage_button_34_Template, 2, 6, "button", 16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "div", 17);
            i0.ɵɵelement(36, "app-button", 18);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(37, CreateCategoriesPage_app_custom_alert_37_Template, 1, 0, "app-custom-alert", 19)(38, CreateCategoriesPage_app_custom_alert_38_Template, 1, 0, "app-custom-alert", 20);
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("fullscreen", false);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.iconoCategoria);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.nombreCategoria || "Nueva categor\u00EDa", " ");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("income", ctx.tipoCategoria === "ingreso");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.tipoCategoria === "ingreso" ? "Ingreso" : "Gasto", " ");
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.nombreCategoria);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("options", ctx.categoryTypes);
            i0.ɵɵtwoWayProperty("model", ctx.tipoCategoria);
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
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showCustomAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showGenericAlert);
        } }, dependencies: [IonicModule, i4.IonContent, i4.IonHeader, i4.IonIcon, i4.IonInput, i4.TextValueAccessor, CommonModule, i5.NgForOf, i5.NgIf, FormsModule, i6.ɵNgNoValidate, i6.NgControlStatus, i6.NgControlStatusGroup, i6.RequiredValidator, i6.MaxLengthValidator, i6.NgModel, i6.NgForm, HttpClientModule,
            CustomAlertComponent,
            CustomSegmentComponent,
            PageLayoutComponent,
            ButtonComponent,
            ItemIconComponent], styles: [".create-category-page[_ngcontent-%COMP%] {\n  --background: var(--fv-background);\n}\n\n\n\n\n\n\n.create-category-form[_ngcontent-%COMP%] {\n\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n\n  padding: 16px;\n\n}\n\n\n\n\n\n\n.category-preview[_ngcontent-%COMP%] {\n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  gap: 12px;\n\n  padding: 8px 0 4px;\n\n}\n\n.preview-icon[_ngcontent-%COMP%] {\n\n  width: 72px;\n  height: 72px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 20px;\n\n  box-shadow: var(--fv-shadow-primary);\n\n}\n\n.preview-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n\n  width: 30px;\n  height: 30px;\n\n  filter: brightness(0) invert(1);\n\n}\n\n.preview-title[_ngcontent-%COMP%] {\n\n  margin: 0;\n\n  color: var(--fv-text-primary);\n\n  font-size: 22px;\n  font-weight: 700;\n  line-height: 1.2;\n\n  text-align: center;\n\n}\n\n.preview-type[_ngcontent-%COMP%] {\n\n  display: inline-flex;\n\n  align-items: center;\n  justify-content: center;\n\n  padding: 5px 12px;\n\n  border-radius: 999px;\n\n  font-size: 11px;\n  font-weight: 700;\n\n  letter-spacing: .03em;\n\n  background: rgba(239, 68, 68, .10);\n\n  color: #ef4444;\n\n}\n\n.preview-type.income[_ngcontent-%COMP%] {\n\n  background: rgba(34, 197, 94, .10);\n\n  color: #22c55e;\n\n}\n\n\n\n\n\n\n.form-section[_ngcontent-%COMP%] {\n\n  display: flex;\n  flex-direction: column;\n\n  gap: 16px;\n\n  padding: 16px;\n\n  background: var(--fv-surface);\n\n  border: 1px solid rgba(67, 97, 238, .05);\n\n  border-radius: 18px;\n\n  box-shadow: var(--fv-shadow-sm);\n\n}\n\n.form-section[_ngcontent-%COMP%]:focus-within {\n\n  border-color: rgba(67, 97, 238, .15);\n\n  box-shadow:\n    0 0 0 3px rgba(67, 97, 238, .06);\n\n}\n\n\n\n\n\n\n.section-header[_ngcontent-%COMP%] {\n\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  gap: 12px;\n\n}\n\n.section-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n\n  color: var(--fv-text-secondary);\n\n  font-size: 12px;\n  font-weight: 600;\n\n}\n\n.section-label[_ngcontent-%COMP%] {\n\n  margin: 0;\n\n  color: var(--fv-text-secondary);\n\n  font-size: 11px;\n  font-weight: 700;\n\n  letter-spacing: .08em;\n\n  text-transform: uppercase;\n\n}\n\n\n\n\n\n\n.fv-input[_ngcontent-%COMP%] {\n\n  --background: #f8faff;\n\n  --padding-start: 18px;\n  --padding-end: 18px;\n\n  --border-radius: 16px;\n\n  min-height: 52px;\n\n  border: 1px solid rgba(67, 97, 238, .08);\n\n  transition:\n    border-color .2s ease,\n    box-shadow .2s ease;\n\n}\n\n.fv-input.ion-focused[_ngcontent-%COMP%] {\n\n  border-color: var(--fv-primary);\n\n  box-shadow:\n    0 0 0 3px rgba(67, 97, 238, .08);\n\n}\n\n\n\n\n\n\n.icons-grid[_ngcontent-%COMP%] {\n\n  display: grid;\n\n  grid-template-columns: repeat(6, 1fr);\n\n  gap: 12px;\n\n}\n\n.icon-button[_ngcontent-%COMP%] {\n\n  width: 100%;\n\n  aspect-ratio: 1;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  background: transparent;\n\n  border: 1px solid rgba(67, 97, 238, .06);\n\n  border-radius: 16px;\n\n  transition:\n    background .18s ease,\n    border-color .18s ease,\n    transform .18s ease;\n\n}\n\n.icon-button[_ngcontent-%COMP%]:active {\n\n  transform: scale(.95);\n\n}\n\n.icon-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n\n  width: 24px;\n  height: 24px;\n\n  color: var(--fv-text-primary);\n\n  transition: .18s ease;\n\n}\n\n.icon-button.selected[_ngcontent-%COMP%] {\n\n  background: rgba(67, 97, 238, .08);\n\n  border-color: var(--fv-primary);\n\n}\n\n.icon-button.selected[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n\n  width: 25px;\n  height: 25px;\n\n  color: var(--fv-primary);\n\n}\n\n\n\n\n\n\n.colors-grid[_ngcontent-%COMP%] {\n\n  display: flex;\n  flex-wrap: wrap;\n\n  gap: 12px;\n\n}\n\n.color-button[_ngcontent-%COMP%] {\n\n  width: 40px;\n  height: 40px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border: none;\n\n  border-radius: 50%;\n\n  transition:\n    transform .18s ease,\n    box-shadow .18s ease;\n\n}\n\n.color-button[_ngcontent-%COMP%]:active {\n\n  transform: scale(.92);\n\n}\n\n.color-button.selected[_ngcontent-%COMP%] {\n\n  transform: scale(1.1);\n\n  box-shadow:\n    0 0 0 3px var(--fv-surface),\n    0 0 0 5px rgba(67, 97, 238, .18);\n\n}\n\n.color-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n\n  width: 15px;\n  height: 15px;\n\n  filter: brightness(0) invert(1);\n\n}\n\n\n\n\n\n\n.action-container[_ngcontent-%COMP%] {\n\n  padding-top: 4px;\n\n}\n\n\n\n\n\n\n@media (max-width: 420px) {\n\n  .preview-icon[_ngcontent-%COMP%] {\n\n    width: 64px;\n    height: 64px;\n\n  }\n\n  .preview-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n\n    width: 28px;\n    height: 28px;\n\n  }\n\n  .preview-title[_ngcontent-%COMP%] {\n\n    font-size: 20px;\n\n  }\n\n  .form-section[_ngcontent-%COMP%] {\n\n    padding: 14px;\n\n  }\n\n  .icons-grid[_ngcontent-%COMP%] {\n\n    grid-template-columns: repeat(5, 1fr);\n\n    gap: 10px;\n\n  }\n\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateCategoriesPage, [{
        type: Component,
        args: [{ selector: 'app-create-categories', standalone: true, imports: [
                    IonicModule,
                    CommonModule,
                    FormsModule,
                    HttpClientModule,
                    CustomAlertComponent,
                    CustomSegmentComponent,
                    PageLayoutComponent,
                    ButtonComponent,
                    ItemIconComponent
                ], template: "<ion-header\n  class=\"create-category-header\">\n\n\n  <!-- ==========================================================\n       HEADER\n       ========================================================== -->\n\n  <app-page-layout\n    title=\"Crear categor\u00EDa\"\n    (back)=\"backToCategories()\">\n  </app-page-layout>\n\n\n</ion-header>\n\n<ion-content\n  [fullscreen]=\"false\"\n  class=\"create-category-page\">\n\n  <!-- ==========================================================\n       FORM\n       ========================================================== -->\n\n  <form\n    class=\"create-category-form\"\n    (ngSubmit)=\"anadirCategoria()\">\n\n    <!-- ==========================================================\n         HERO PREVIEW\n         ========================================================== -->\n\n    <section class=\"category-preview\">\n\n      <app-item-icon\n        *ngIf=\"iconoCategoria\"\n        [icon]=\"iconoCategoria\"\n        [color]=\"colorCategoria\"\n        size=\"xl\"\n        variant=\"soft\">\n      </app-item-icon>\n\n      <h2 class=\"preview-title\">\n\n        {{\n          nombreCategoria ||\n          'Nueva categor\u00EDa'\n        }}\n\n      </h2>\n\n      <span\n        class=\"preview-type\"\n        [class.income]=\"tipoCategoria === 'ingreso'\">\n\n        {{\n          tipoCategoria === 'ingreso'\n            ? 'Ingreso'\n            : 'Gasto'\n        }}\n\n      </span>\n\n    </section>\n\n    <!-- ==========================================================\n         NOMBRE\n         ========================================================== -->\n\n    <section class=\"form-section\">\n\n      <label class=\"section-label\">\n\n        Nombre\n\n      </label>\n\n      <ion-input\n        class=\"fv-input\"\n        type=\"text\"\n        name=\"nombreCategoria\"\n        maxlength=\"30\"\n        autocomplete=\"off\"\n        placeholder=\"Ej. Alimentaci\u00F3n\"\n        [(ngModel)]=\"nombreCategoria\"\n        required>\n\n      </ion-input>\n\n    </section>\n\n    <!-- ==========================================================\n         TIPO\n         ========================================================== -->\n\n    <section class=\"form-section\">\n\n      <div class=\"section-header\">\n\n        <label class=\"section-label\">\n\n          Tipo de categor\u00EDa\n\n        </label>\n\n      </div>\n\n      <app-custom-segment\n        [options]=\"categoryTypes\"\n        [(model)]=\"tipoCategoria\">\n\n      </app-custom-segment>\n\n    </section>\n\n    <!-- ==========================================================\n         ICONOS\n         ========================================================== -->\n\n    <section class=\"form-section\">\n\n      <div class=\"section-header\">\n\n        <label class=\"section-label\">\n\n          \u00CDcono\n\n        </label>\n\n        <span>\n\n          {{ iconos.length }} disponibles\n\n        </span>\n\n      </div>\n\n      <div class=\"icons-grid\">\n\n        <button\n          *ngFor=\"let icon of iconos\"\n          type=\"button\"\n          class=\"icon-button\"\n          [class.selected]=\"icon.icon === iconoSeleccionado\"\n          [attr.aria-label]=\"icon.label\"\n          (click)=\"seleccionarIcono(icon)\">\n\n          <app-item-icon\n            [icon]=\"icon.icon\"\n            [color]=\"colorCategoria\"\n            size=\"sm\"\n            variant=\"soft\"\n            [selected]=\"icon.icon === iconoSeleccionado\">\n          </app-item-icon>\n\n        </button>\n\n      </div>\n\n    </section>\n\n    <!-- ==========================================================\n         COLORES\n         ========================================================== -->\n\n    <section class=\"form-section\">\n\n      <div class=\"section-header\">\n\n        <label class=\"section-label\">\n\n          Color\n\n        </label>\n\n        <span>\n\n          {{ colores.length }} disponibles\n\n        </span>\n\n      </div>\n\n      <div class=\"colors-grid\">\n\n        <button\n          *ngFor=\"let color of colores\"\n          type=\"button\"\n          class=\"color-button\"\n          [style.background]=\"color.value\"\n          [class.selected]=\"color.value === colorSeleccionado\"\n          [attr.aria-label]=\"color.label\"\n          (click)=\"seleccionarColor(color)\">\n\n          <ion-icon\n            *ngIf=\"color.value === colorSeleccionado\"\n            src=\"assets/icon/check.svg\">\n          </ion-icon>\n\n        </button>\n\n      </div>\n\n    </section>\n\n    <!-- ==========================================================\n         ACTIONS\n         ========================================================== -->\n\n    <div class=\"action-container\">\n\n      <app-button\n        text=\"Crear categor\u00EDa\"\n        type=\"submit\"\n        [disabled]=\"!puedeGuardar\">\n      </app-button>\n\n    </div>\n\n  </form>\n\n</ion-content>\n\n<!-- ==========================================================\n     ALERTA CAMBIOS\n     ========================================================== -->\n\n<app-custom-alert\n  *ngIf=\"showCustomAlert\"\n  header=\"Cambios sin guardar\"\n  message=\"Has realizado cambios en la categor\u00EDa. \u00BFDeseas salir sin guardar?\"\n  cancelText=\"No\"\n  confirmText=\"S\u00ED\"\n  (onCancel)=\"showCustomAlert = false\"\n  (onConfirm)=\"salirSinGuardar()\">\n</app-custom-alert>\n\n<!-- ==========================================================\n     ALERTA ERROR\n     ========================================================== -->\n\n<app-custom-alert\n  *ngIf=\"showGenericAlert\"\n  header=\"Error\"\n  message=\"No se pudo crear la categor\u00EDa. Int\u00E9ntalo nuevamente.\"\n  confirmText=\"Aceptar\"\n  (onConfirm)=\"showGenericAlert = false\">\n</app-custom-alert>\n", styles: [".create-category-page {\n  --background: var(--fv-background);\n}\n\n/* ==========================================================\n   FORM\n   ========================================================== */\n\n.create-category-form {\n\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n\n  padding: 16px;\n\n}\n\n/* ==========================================================\n   PREVIEW\n   ========================================================== */\n\n.category-preview {\n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  gap: 12px;\n\n  padding: 8px 0 4px;\n\n}\n\n.preview-icon {\n\n  width: 72px;\n  height: 72px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 20px;\n\n  box-shadow: var(--fv-shadow-primary);\n\n}\n\n.preview-icon ion-icon {\n\n  width: 30px;\n  height: 30px;\n\n  filter: brightness(0) invert(1);\n\n}\n\n.preview-title {\n\n  margin: 0;\n\n  color: var(--fv-text-primary);\n\n  font-size: 22px;\n  font-weight: 700;\n  line-height: 1.2;\n\n  text-align: center;\n\n}\n\n.preview-type {\n\n  display: inline-flex;\n\n  align-items: center;\n  justify-content: center;\n\n  padding: 5px 12px;\n\n  border-radius: 999px;\n\n  font-size: 11px;\n  font-weight: 700;\n\n  letter-spacing: .03em;\n\n  background: rgba(239, 68, 68, .10);\n\n  color: #ef4444;\n\n}\n\n.preview-type.income {\n\n  background: rgba(34, 197, 94, .10);\n\n  color: #22c55e;\n\n}\n\n/* ==========================================================\n   CARD\n   ========================================================== */\n\n.form-section {\n\n  display: flex;\n  flex-direction: column;\n\n  gap: 16px;\n\n  padding: 16px;\n\n  background: var(--fv-surface);\n\n  border: 1px solid rgba(67, 97, 238, .05);\n\n  border-radius: 18px;\n\n  box-shadow: var(--fv-shadow-sm);\n\n}\n\n.form-section:focus-within {\n\n  border-color: rgba(67, 97, 238, .15);\n\n  box-shadow:\n    0 0 0 3px rgba(67, 97, 238, .06);\n\n}\n\n/* ==========================================================\n   SECTION HEADER\n   ========================================================== */\n\n.section-header {\n\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  gap: 12px;\n\n}\n\n.section-header span {\n\n  color: var(--fv-text-secondary);\n\n  font-size: 12px;\n  font-weight: 600;\n\n}\n\n.section-label {\n\n  margin: 0;\n\n  color: var(--fv-text-secondary);\n\n  font-size: 11px;\n  font-weight: 700;\n\n  letter-spacing: .08em;\n\n  text-transform: uppercase;\n\n}\n\n/* ==========================================================\n   INPUT\n   ========================================================== */\n\n.fv-input {\n\n  --background: #f8faff;\n\n  --padding-start: 18px;\n  --padding-end: 18px;\n\n  --border-radius: 16px;\n\n  min-height: 52px;\n\n  border: 1px solid rgba(67, 97, 238, .08);\n\n  transition:\n    border-color .2s ease,\n    box-shadow .2s ease;\n\n}\n\n.fv-input.ion-focused {\n\n  border-color: var(--fv-primary);\n\n  box-shadow:\n    0 0 0 3px rgba(67, 97, 238, .08);\n\n}\n\n/* ==========================================================\n   ICONS\n   ========================================================== */\n\n.icons-grid {\n\n  display: grid;\n\n  grid-template-columns: repeat(6, 1fr);\n\n  gap: 12px;\n\n}\n\n.icon-button {\n\n  width: 100%;\n\n  aspect-ratio: 1;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  background: transparent;\n\n  border: 1px solid rgba(67, 97, 238, .06);\n\n  border-radius: 16px;\n\n  transition:\n    background .18s ease,\n    border-color .18s ease,\n    transform .18s ease;\n\n}\n\n.icon-button:active {\n\n  transform: scale(.95);\n\n}\n\n.icon-button ion-icon {\n\n  width: 24px;\n  height: 24px;\n\n  color: var(--fv-text-primary);\n\n  transition: .18s ease;\n\n}\n\n.icon-button.selected {\n\n  background: rgba(67, 97, 238, .08);\n\n  border-color: var(--fv-primary);\n\n}\n\n.icon-button.selected ion-icon {\n\n  width: 25px;\n  height: 25px;\n\n  color: var(--fv-primary);\n\n}\n\n/* ==========================================================\n   COLORS\n   ========================================================== */\n\n.colors-grid {\n\n  display: flex;\n  flex-wrap: wrap;\n\n  gap: 12px;\n\n}\n\n.color-button {\n\n  width: 40px;\n  height: 40px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border: none;\n\n  border-radius: 50%;\n\n  transition:\n    transform .18s ease,\n    box-shadow .18s ease;\n\n}\n\n.color-button:active {\n\n  transform: scale(.92);\n\n}\n\n.color-button.selected {\n\n  transform: scale(1.1);\n\n  box-shadow:\n    0 0 0 3px var(--fv-surface),\n    0 0 0 5px rgba(67, 97, 238, .18);\n\n}\n\n.color-button ion-icon {\n\n  width: 15px;\n  height: 15px;\n\n  filter: brightness(0) invert(1);\n\n}\n\n/* ==========================================================\n   ACTION\n   ========================================================== */\n\n.action-container {\n\n  padding-top: 4px;\n\n}\n\n/* ==========================================================\n   RESPONSIVE\n   ========================================================== */\n\n@media (max-width: 420px) {\n\n  .preview-icon {\n\n    width: 64px;\n    height: 64px;\n\n  }\n\n  .preview-icon ion-icon {\n\n    width: 28px;\n    height: 28px;\n\n  }\n\n  .preview-title {\n\n    font-size: 20px;\n\n  }\n\n  .form-section {\n\n    padding: 14px;\n\n  }\n\n  .icons-grid {\n\n    grid-template-columns: repeat(5, 1fr);\n\n    gap: 10px;\n\n  }\n\n}\n"] }]
    }], () => [{ type: i1.CreateCategoryUseCase }, { type: i2.NavigationService }, { type: i3.SpinnerService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CreateCategoriesPage, { className: "CreateCategoriesPage", filePath: "src/app/features/side-menu/categories/create-categories/create-categories.page.ts", lineNumber: 41 }); })();
//# sourceMappingURL=create-categories.page.js.map