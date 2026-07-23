import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CustomSegmentComponent } from "src/app/shared/components/custom-segment/custom-segment.component";
import { CustomAlertComponent } from "src/app/shared/components/custom-alert/custom-alert.component";
import { ItemIconComponent } from "src/app/shared/components/item-icon/item-icon.component";
import { FeatureHeaderComponent } from "src/app/shared/components/feature-header/feature-header.component";
import { InfoBannerComponent } from "src/app/shared/components/info-banner/info-banner.component";
import 'src/app/core/utils/observable-extensions';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/services/navigation.service";
import * as i2 from "src/app/core/use-cases/categories/list-categories.usecase";
import * as i3 from "src/app/core/services/spinnerService.service";
import * as i4 from "src/app/core/services/alert.service";
import * as i5 from "@ionic/angular";
import * as i6 from "@angular/common";
function CategoriesPage_app_custom_alert_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 13);
    i0.ɵɵlistener("onConfirm", function CategoriesPage_app_custom_alert_1_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.cerrarAlert()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("header", "Error")("message", "No se pudieron cargar las categor\u00EDas. Por favor, intenta nuevamente.")("confirmText", "Aceptar");
} }
function CategoriesPage_ng_container_10_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵlistener("click", function CategoriesPage_ng_container_10_div_1_Template_div_click_0_listener() { const cat_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.goToEditCategories(ctx_r2.segment, cat_r6)); });
    i0.ɵɵelement(1, "app-item-icon", 20);
    i0.ɵɵelementStart(2, "span", 18);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const cat_r6 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", cat_r6.icono)("color", cat_r6.color);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", cat_r6.nombre, " ");
} }
function CategoriesPage_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CategoriesPage_ng_container_10_div_1_Template, 4, 3, "div", 14);
    i0.ɵɵelementStart(2, "div", 15);
    i0.ɵɵlistener("click", function CategoriesPage_ng_container_10_Template_div_click_2_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToCreateCategories(ctx_r2.segment)); });
    i0.ɵɵelementStart(3, "div", 16);
    i0.ɵɵelement(4, "ion-icon", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 18);
    i0.ɵɵtext(6, " Agregar ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.categoriasActuales);
} }
function CategoriesPage_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵlistener("click", function CategoriesPage_ng_template_11_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToCreateCategories(ctx_r2.segment)); });
    i0.ɵɵelementStart(1, "div", 16);
    i0.ɵɵelement(2, "ion-icon", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 18);
    i0.ɵɵtext(4, " Agregar ");
    i0.ɵɵelementEnd()();
} }
export class CategoriesPage {
    constructor(navService, listCategoriesUseCase, loadingService, alertService) {
        this.navService = navService;
        this.listCategoriesUseCase = listCategoriesUseCase;
        this.loadingService = loadingService;
        this.alertService = alertService;
        this.showGenericAlert = false;
        this.dataTabs = [
            { value: 'gasto', label: 'Gasto' },
            { value: 'ingreso', label: 'Ingreso' }
        ];
        this.gastos = [];
        this.ingresos = [];
        this.segment = "gasto";
        this.executeListCategories();
    }
    // MARK: - SERVICIOS
    executeListCategories() {
        this.loadingService.show();
        this.listCategoriesUseCase.execute().service({
            success: (data) => {
                this.loadingService.hide();
                if (data) {
                    this.ingresos = data.items.filter(cat => cat.tipo === "ingreso");
                    this.gastos = data.items.filter(cat => cat.tipo === "gasto");
                    console.log(data);
                    console.log(this.ingresos);
                    console.log(this.gastos);
                }
                else {
                    this.showGenericAlert = true;
                }
            },
            failure: () => {
                this.loadingService.hide();
                this.showGenericAlert = true;
            }
        });
    }
    // MARK: - FUNCIONES
    onSegmentChanged(value) {
        if (value === "gasto" || value === "ingreso") {
            this.segment = value;
        }
    }
    goToCreateCategories(type) {
        this.navService.push('/categories/create', { type });
    }
    goToEditCategories(type, category) {
        if (category.usuario_id == null) {
            this.alertService.showAlert('Categoría del Sistema', 'Esta es una categoría predeterminada del sistema y no puede ser modificada.', 'Entendido');
            return;
        }
        this.navService.push('/categories/edit', { type, category });
    }
    cerrarAlert() {
        this.showGenericAlert = false;
    }
    get categoriasActuales() {
        return this.segment === 'gasto' ? this.gastos : this.ingresos;
    }
    static { this.ɵfac = function CategoriesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CategoriesPage)(i0.ɵɵdirectiveInject(i1.NavigationService), i0.ɵɵdirectiveInject(i2.ListCategoriesUseCase), i0.ɵɵdirectiveInject(i3.SpinnerService), i0.ɵɵdirectiveInject(i4.AlertService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CategoriesPage, selectors: [["app-categories"]], decls: 15, vars: 6, consts: [["onlyAdd", ""], [1, "categories-page", 3, "fullscreen"], [3, "header", "message", "confirmText", "onConfirm", 4, "ngIf"], [1, "page-container"], ["title", "Categor\u00EDas", "description", "Organiza tus ingresos y gastos para entender mejor tus finanzas.", "imageSrc", "assets/image/categories-header.svg", "imageAlt", "Categor\u00EDas"], [1, "segment-container"], ["segmentClass", "main-tabs", 3, "modelChange", "options", "model"], [1, "section-header"], [1, "text-subtitle"], [1, "categories-grid"], [4, "ngIf", "ngIfElse"], [1, "floating-tip"], ["title", "Consejo FinVia", "message", "Mant\u00E9n organizadas tus categor\u00EDas para obtener reportes m\u00E1s claros y un mejor control financiero.", "symbol", "\u2728"], [3, "onConfirm", "header", "message", "confirmText"], ["class", "category-item", 3, "click", 4, "ngFor", "ngForOf"], [1, "category-item", "add-category", 3, "click"], [1, "category-icon", "add-icon"], ["src", "assets/icon/add.svg"], [1, "category-name"], [1, "category-item", 3, "click"], ["size", "lg", "variant", "solid", 3, "icon", "color"]], template: function CategoriesPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "ion-content", 1);
            i0.ɵɵtemplate(1, CategoriesPage_app_custom_alert_1_Template, 1, 3, "app-custom-alert", 2);
            i0.ɵɵelementStart(2, "div", 3);
            i0.ɵɵelement(3, "app-feature-header", 4);
            i0.ɵɵelementStart(4, "div", 5)(5, "app-custom-segment", 6);
            i0.ɵɵtwoWayListener("modelChange", function CategoriesPage_Template_app_custom_segment_modelChange_5_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.segment, $event) || (ctx.segment = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("modelChange", function CategoriesPage_Template_app_custom_segment_modelChange_5_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSegmentChanged($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 7)(7, "h2", 8);
            i0.ɵɵtext(8, " Mis categor\u00EDas ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 9);
            i0.ɵɵtemplate(10, CategoriesPage_ng_container_10_Template, 7, 1, "ng-container", 10)(11, CategoriesPage_ng_template_11_Template, 5, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 11);
            i0.ɵɵelement(14, "app-info-banner", 12);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            const onlyAdd_r8 = i0.ɵɵreference(12);
            i0.ɵɵproperty("fullscreen", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showGenericAlert);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.dataTabs);
            i0.ɵɵtwoWayProperty("model", ctx.segment);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.categoriasActuales.length > 0)("ngIfElse", onlyAdd_r8);
        } }, dependencies: [IonicModule, i5.IonContent, i5.IonIcon, CommonModule, i6.NgForOf, i6.NgIf, FormsModule, HttpClientModule, CustomSegmentComponent, CustomAlertComponent, ItemIconComponent, FeatureHeaderComponent, InfoBannerComponent], styles: [".categories-page[_ngcontent-%COMP%] {\n  --background: var(--fv-background);\n}\n\n\n\n\n\n\n.page-container[_ngcontent-%COMP%] {\n  padding: var(--fv-space-lg);\n\n  display: flex;\n  flex-direction: column;\n\n  gap: var(--fv-space-xl);\n\n  min-height: 100%;\n}\n\n\n\n\n\n\n.segment-container[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n\n\n\n\n\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.section-header[_ngcontent-%COMP%]   .text-subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n\n\n\n\n\n.categories-grid[_ngcontent-%COMP%] {\n  display: grid;\n\n  grid-template-columns:\n    repeat(4, minmax(0, 1fr));\n\n  gap:\n    var(--fv-space-xl)\n    var(--fv-space-md);\n\n  justify-items: center;\n\n  padding-bottom: 190px;\n}\n\n\n\n\n\n\n.category-item[_ngcontent-%COMP%] {\n  width: 100%;\n\n  display: flex;\n  flex-direction: column;\n\n  align-items: center;\n\n  gap: var(--fv-space-sm);\n\n  cursor: pointer;\n\n  transition: all .2s ease;\n}\n\n.category-item[_ngcontent-%COMP%]:active {\n  transform: scale(.96);\n}\n\n.category-icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n\n  border-radius: 18px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  box-shadow: var(--fv-shadow-sm);\n\n  transition: all .2s ease;\n}\n\n.category-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n\n  filter: brightness(0) invert(1);\n}\n\n.category-name[_ngcontent-%COMP%] {\n  max-width: 72px;\n\n  text-align: center;\n\n  color: var(--fv-text-primary);\n\n  font-size: 12px;\n  font-weight: 500;\n\n  line-height: 1.3;\n}\n\n\n\n\n\n\n.add-icon[_ngcontent-%COMP%] {\n  background:\n    rgba(67, 97, 238, .08);\n\n  border:\n    1.5px dashed\n    rgba(67, 97, 238, .35);\n\n  box-shadow: none;\n}\n\n.add-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--fv-primary);\n\n  filter: none;\n}\n\n\n\n\n\n\n.floating-tip[_ngcontent-%COMP%] {\n  position: fixed;\n\n  left: var(--fv-space-lg);\n  right: var(--fv-space-lg);\n\n  bottom: 24px;\n\n  z-index: 50;\n\n  pointer-events: none;\n}\n\n.floating-tip[_ngcontent-%COMP%]   app-info-banner[_ngcontent-%COMP%] {\n  pointer-events: auto;\n}\n\n\n\n\n\n\n@media (max-width: 360px) {\n\n  .categories-grid[_ngcontent-%COMP%] {\n\n    grid-template-columns:\n      repeat(3, minmax(0, 1fr));\n\n  }\n\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CategoriesPage, [{
        type: Component,
        args: [{ selector: "app-categories", standalone: true, imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomSegmentComponent, CustomAlertComponent, ItemIconComponent, FeatureHeaderComponent, InfoBannerComponent], template: "<ion-content\n  [fullscreen]=\"true\"\n  class=\"categories-page\">\n\n  <app-custom-alert\n    *ngIf=\"showGenericAlert\"\n    [header]=\"'Error'\"\n    [message]=\"'No se pudieron cargar las categor\u00EDas. Por favor, intenta nuevamente.'\"\n    [confirmText]=\"'Aceptar'\"\n    (onConfirm)=\"cerrarAlert()\">\n  </app-custom-alert>\n\n  <div class=\"page-container\">\n\n    <app-feature-header\n      title=\"Categor\u00EDas\"\n      description=\"Organiza tus ingresos y gastos para entender mejor tus finanzas.\"\n      imageSrc=\"assets/image/categories-header.svg\"\n      imageAlt=\"Categor\u00EDas\">\n    </app-feature-header>\n\n    <!-- SEGMENT -->\n\n    <div class=\"segment-container\">\n\n      <app-custom-segment\n        [options]=\"dataTabs\"\n        [(model)]=\"segment\"\n        segmentClass=\"main-tabs\"\n        (modelChange)=\"onSegmentChanged($event)\">\n      </app-custom-segment>\n\n    </div>\n\n    <!-- HEADER -->\n\n    <div class=\"section-header\">\n\n      <h2 class=\"text-subtitle\">\n        Mis categor\u00EDas\n      </h2>\n\n    </div>\n\n    <!-- GRID -->\n\n    <div class=\"categories-grid\">\n\n      <ng-container\n        *ngIf=\"categoriasActuales.length > 0; else onlyAdd\">\n\n        <div\n          class=\"category-item\"\n          *ngFor=\"let cat of categoriasActuales\"\n          (click)=\"goToEditCategories(segment, cat)\">\n\n          <app-item-icon\n            [icon]=\"cat.icono\"\n            [color]=\"cat.color\"\n            size=\"lg\"\n            variant=\"solid\">\n          </app-item-icon>\n\n          <span class=\"category-name\">\n            {{ cat.nombre }}\n          </span>\n\n        </div>\n\n        <div\n          class=\"category-item add-category\"\n          (click)=\"goToCreateCategories(segment)\">\n\n          <div class=\"category-icon add-icon\">\n\n            <ion-icon\n              src=\"assets/icon/add.svg\">\n            </ion-icon>\n\n          </div>\n\n          <span class=\"category-name\">\n            Agregar\n          </span>\n\n        </div>\n\n      </ng-container>\n\n      <ng-template #onlyAdd>\n\n        <div\n          class=\"category-item add-category\"\n          (click)=\"goToCreateCategories(segment)\">\n\n          <div class=\"category-icon add-icon\">\n\n            <ion-icon\n              src=\"assets/icon/add.svg\">\n            </ion-icon>\n\n          </div>\n\n          <span class=\"category-name\">\n            Agregar\n          </span>\n\n        </div>\n\n      </ng-template>\n\n    </div>\n\n  </div>\n\n  <!-- FLOATING INSIGHT -->\n\n  <div class=\"floating-tip\">\n    <app-info-banner\n      title=\"Consejo FinVia\"\n      message=\"Mant\u00E9n organizadas tus categor\u00EDas para obtener reportes m\u00E1s claros y un mejor control financiero.\"\n      symbol=\"\u2728\">\n    </app-info-banner>\n\n  </div>\n\n</ion-content>\n", styles: [".categories-page {\n  --background: var(--fv-background);\n}\n\n/* ==========================\n   PAGE\n   ========================== */\n\n.page-container {\n  padding: var(--fv-space-lg);\n\n  display: flex;\n  flex-direction: column;\n\n  gap: var(--fv-space-xl);\n\n  min-height: 100%;\n}\n\n/* ==========================\n   SEGMENT\n   ========================== */\n\n.segment-container {\n  width: 100%;\n}\n\n/* ==========================\n   HEADER\n   ========================== */\n\n.section-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.section-header .text-subtitle {\n  margin: 0;\n}\n\n/* ==========================\n   GRID\n   ========================== */\n\n.categories-grid {\n  display: grid;\n\n  grid-template-columns:\n    repeat(4, minmax(0, 1fr));\n\n  gap:\n    var(--fv-space-xl)\n    var(--fv-space-md);\n\n  justify-items: center;\n\n  padding-bottom: 190px;\n}\n\n/* ==========================\n   CATEGORY\n   ========================== */\n\n.category-item {\n  width: 100%;\n\n  display: flex;\n  flex-direction: column;\n\n  align-items: center;\n\n  gap: var(--fv-space-sm);\n\n  cursor: pointer;\n\n  transition: all .2s ease;\n}\n\n.category-item:active {\n  transform: scale(.96);\n}\n\n.category-icon {\n  width: 56px;\n  height: 56px;\n\n  border-radius: 18px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  box-shadow: var(--fv-shadow-sm);\n\n  transition: all .2s ease;\n}\n\n.category-icon ion-icon {\n  width: 24px;\n  height: 24px;\n\n  filter: brightness(0) invert(1);\n}\n\n.category-name {\n  max-width: 72px;\n\n  text-align: center;\n\n  color: var(--fv-text-primary);\n\n  font-size: 12px;\n  font-weight: 500;\n\n  line-height: 1.3;\n}\n\n/* ==========================\n   ADD CATEGORY\n   ========================== */\n\n.add-icon {\n  background:\n    rgba(67, 97, 238, .08);\n\n  border:\n    1.5px dashed\n    rgba(67, 97, 238, .35);\n\n  box-shadow: none;\n}\n\n.add-icon ion-icon {\n  color: var(--fv-primary);\n\n  filter: none;\n}\n\n/* ==========================\n   FLOATING TIP\n   ========================== */\n\n.floating-tip {\n  position: fixed;\n\n  left: var(--fv-space-lg);\n  right: var(--fv-space-lg);\n\n  bottom: 24px;\n\n  z-index: 50;\n\n  pointer-events: none;\n}\n\n.floating-tip app-info-banner {\n  pointer-events: auto;\n}\n\n/* ==========================\n   RESPONSIVE\n   ========================== */\n\n@media (max-width: 360px) {\n\n  .categories-grid {\n\n    grid-template-columns:\n      repeat(3, minmax(0, 1fr));\n\n  }\n\n}\n"] }]
    }], () => [{ type: i1.NavigationService }, { type: i2.ListCategoriesUseCase }, { type: i3.SpinnerService }, { type: i4.AlertService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CategoriesPage, { className: "CategoriesPage", filePath: "src/app/features/side-menu/categories/categories.page.ts", lineNumber: 25 }); })();
//# sourceMappingURL=categories.page.js.map