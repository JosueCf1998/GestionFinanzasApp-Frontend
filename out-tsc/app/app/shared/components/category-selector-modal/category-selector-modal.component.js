import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ItemIconComponent } from '../item-icon/item-icon.component';
import { AmountInputComponent } from '../amount-input/amount-input.component';
import { WarningMessageComponent } from '../warning-message/warning-message.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _c0 = () => ({ standalone: true });
function CategorySelectorModalComponent_ng_container_1_button_2_ion_icon_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 10);
} }
function CategorySelectorModalComponent_ng_container_1_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 5);
    i0.ɵɵlistener("click", function CategorySelectorModalComponent_ng_container_1_button_2_Template_button_click_0_listener() { const category_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.selectCategory(category_r3)); });
    i0.ɵɵelement(1, "app-item-icon", 6);
    i0.ɵɵelementStart(2, "span", 7)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 8);
    i0.ɵɵtemplate(8, CategorySelectorModalComponent_ng_container_1_button_2_ion_icon_8_Template, 1, 0, "ion-icon", 9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const category_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ctx_r3.isSelected(category_r3));
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", category_r3.icono)("color", category_r3.color)("selected", ctx_r3.isSelected(category_r3));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(category_r3.nombre);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(category_r3.tipo === "ingresos" || category_r3.tipo === "ingreso" ? "Categor\u00EDa de ingreso" : "Categor\u00EDa de gasto");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("selected", ctx_r3.isSelected(category_r3));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isSelected(category_r3));
} }
function CategorySelectorModalComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 3);
    i0.ɵɵtemplate(2, CategorySelectorModalComponent_ng_container_1_button_2_Template, 9, 10, "button", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r3.categories);
} }
function CategorySelectorModalComponent_ng_template_2_app_warning_message_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-warning-message", 16);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("message", ctx_r3.balanceWarningMessage);
} }
function CategorySelectorModalComponent_ng_template_2_ion_icon_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 10);
} }
function CategorySelectorModalComponent_ng_template_2_article_20_ion_icon_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 10);
} }
function CategorySelectorModalComponent_ng_template_2_article_20_label_10_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 20)(1, "span");
    i0.ɵɵtext(2, "Monto asignado");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "app-amount-input", 21);
    i0.ɵɵlistener("ngModelChange", function CategorySelectorModalComponent_ng_template_2_article_20_label_10_Template_app_amount_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r8); const category_r7 = i0.ɵɵnextContext().$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.updateAmount(category_r7, $event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const category_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ariaLabel", "Monto para " + category_r7.nombre)("ngModel", ctx_r3.amountFor(category_r7))("ngModelOptions", i0.ɵɵpureFunction0(3, _c0));
} }
function CategorySelectorModalComponent_ng_template_2_article_20_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 17)(1, "button", 18);
    i0.ɵɵlistener("click", function CategorySelectorModalComponent_ng_template_2_article_20_Template_button_click_1_listener() { const category_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.toggle(category_r7)); });
    i0.ɵɵelement(2, "app-item-icon", 6);
    i0.ɵɵelementStart(3, "span", 7)(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7, "Categor\u00EDa de gasto");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 8);
    i0.ɵɵtemplate(9, CategorySelectorModalComponent_ng_template_2_article_20_ion_icon_9_Template, 1, 0, "ion-icon", 9);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, CategorySelectorModalComponent_ng_template_2_article_20_label_10_Template, 4, 4, "label", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r7 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ctx_r3.isSelected(category_r7));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("icon", category_r7.icono)("color", category_r7.color)("selected", ctx_r3.isSelected(category_r7));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(category_r7.nombre);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("selected", ctx_r3.isSelected(category_r7));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isSelected(category_r7));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isSelected(category_r7));
} }
function CategorySelectorModalComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11)(1, "span")(2, "small");
    i0.ɵɵtext(3, "Presupuesto total");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 12);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(9, CategorySelectorModalComponent_ng_template_2_app_warning_message_9_Template, 1, 1, "app-warning-message", 13);
    i0.ɵɵelementStart(10, "div", 3)(11, "button", 5);
    i0.ɵɵlistener("click", function CategorySelectorModalComponent_ng_template_2_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.toggleAll()); });
    i0.ɵɵelement(12, "app-item-icon", 14);
    i0.ɵɵelementStart(13, "span", 7)(14, "strong");
    i0.ɵɵtext(15, "Todas las categor\u00EDas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "small");
    i0.ɵɵtext(17, "Asignar un monto a cada categor\u00EDa");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "span", 8);
    i0.ɵɵtemplate(19, CategorySelectorModalComponent_ng_template_2_ion_icon_19_Template, 1, 0, "ion-icon", 9);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(20, CategorySelectorModalComponent_ng_template_2_article_20_Template, 11, 10, "article", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("warning", ctx_r3.exceedsAvailableBalance);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("S/ ", i0.ɵɵpipeBind2(6, 13, ctx_r3.totalAllocated, "1.2-2"), "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", ctx_r3.workingSelection.length, " ", ctx_r3.workingSelection.length === 1 ? "categor\u00EDa" : "categor\u00EDas", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.exceedsAvailableBalance);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("selected", ctx_r3.selectAll);
    i0.ɵɵadvance();
    i0.ɵɵproperty("selected", ctx_r3.selectAll);
    i0.ɵɵadvance(6);
    i0.ɵɵclassProp("selected", ctx_r3.selectAll);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.selectAll);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.categories);
} }
export var CategorySelectionMode;
(function (CategorySelectionMode) {
    CategorySelectionMode["SINGLE"] = "single";
    CategorySelectionMode["ALLOCATION"] = "allocation";
})(CategorySelectionMode || (CategorySelectionMode = {}));
export class CategorySelectorModalComponent {
    constructor() {
        this.isOpen = false;
        this.categories = [];
        this.selectionMode = CategorySelectionMode.ALLOCATION;
        this.selectedCategory = null;
        this.selectedAllocations = [];
        this.availableBalance = null;
        this.categorySelected = new EventEmitter();
        this.allocationsSelected = new EventEmitter();
        this.modalClosed = new EventEmitter();
        this.workingSelection = [];
        this.CategorySelectionMode = CategorySelectionMode;
    }
    ngOnChanges(changes) {
        if (changes['selectedAllocations'] || (changes['isOpen'] && this.isOpen)) {
            this.workingSelection = this.selectedAllocations.map(item => ({ ...item }));
        }
    }
    get selectAll() {
        return this.categories.length > 0 && this.workingSelection.length === this.categories.length;
    }
    get canConfirm() {
        return this.workingSelection.length > 0 &&
            this.workingSelection.every(item => item.amount > 0);
    }
    get totalAllocated() {
        return this.workingSelection.reduce((total, item) => total + item.amount, 0);
    }
    get exceedsAvailableBalance() {
        return this.availableBalance !== null &&
            this.totalAllocated > this.availableBalance;
    }
    get balanceOverage() {
        if (this.availableBalance === null)
            return 0;
        return Math.max(this.totalAllocated - this.availableBalance, 0);
    }
    get balanceWarningMessage() {
        const difference = new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(this.balanceOverage);
        return `Excede el saldo de tus cuentas por ${difference}. Puedes continuar.`;
    }
    isSelected(category) {
        if (this.selectionMode === CategorySelectionMode.SINGLE) {
            return this.selectedCategory?.id === category.id;
        }
        return this.workingSelection.some(item => item.category.id === category.id);
    }
    selectCategory(category) {
        this.categorySelected.emit(category);
        this.close();
    }
    toggle(category) {
        this.workingSelection = this.isSelected(category)
            ? this.workingSelection.filter(item => item.category.id !== category.id)
            : [...this.workingSelection, { category, amount: 0 }];
    }
    toggleAll() {
        this.workingSelection = this.selectAll
            ? []
            : this.categories.map(category => ({ category, amount: 0 }));
    }
    amountFor(category) {
        return this.workingSelection.find(item => item.category.id === category.id)?.amount ?? null;
    }
    updateAmount(category, value) {
        const parsedAmount = Number(value ?? 0);
        const amount = Number.isFinite(parsedAmount) && parsedAmount >= 0
            ? Math.round(parsedAmount * 100) / 100
            : 0;
        this.workingSelection = this.workingSelection.map(item => item.category.id === category.id ? { ...item, amount } : item);
    }
    confirm() {
        this.allocationsSelected.emit(this.workingSelection.map(item => ({ ...item })));
        this.close();
    }
    close() {
        this.modalClosed.emit();
    }
    static { this.ɵfac = function CategorySelectorModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CategorySelectorModalComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CategorySelectorModalComponent, selectors: [["app-category-selector-modal"]], inputs: { isOpen: "isOpen", categories: "categories", selectionMode: "selectionMode", selectedCategory: "selectedCategory", selectedAllocations: "selectedAllocations", availableBalance: "availableBalance" }, outputs: { categorySelected: "categorySelected", allocationsSelected: "allocationsSelected", modalClosed: "modalClosed" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 7, consts: [["allocationMode", ""], ["size", "lg", 3, "closed", "primary", "isOpen", "title", "description", "primaryText", "primaryDisabled"], [4, "ngIf", "ngIfElse"], [1, "category-list"], ["type", "button", "class", "category-item category-item--all", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "category-item", "category-item--all", 3, "click"], ["variant", "soft", 3, "icon", "color", "selected"], [1, "category-item__content"], [1, "category-item__status"], ["name", "checkmark", 4, "ngIf"], ["name", "checkmark"], [1, "allocation-summary"], [1, "allocation-summary__count"], ["title", "Saldo insuficiente", 3, "message", 4, "ngIf"], ["icon", "category", "color", "var(--fv-primary)", "variant", "soft", 3, "selected"], ["class", "category-item", 3, "selected", 4, "ngFor", "ngForOf"], ["title", "Saldo insuficiente", 3, "message"], [1, "category-item"], ["type", "button", 1, "category-item__toggle", 3, "click"], ["class", "category-item__amount", 4, "ngIf"], [1, "category-item__amount"], ["variant", "compact", "currencyCode", "PEN", 3, "ngModelChange", "ariaLabel", "ngModel", "ngModelOptions"]], template: function CategorySelectorModalComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "app-base-modal", 1);
            i0.ɵɵlistener("closed", function CategorySelectorModalComponent_Template_app_base_modal_closed_0_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.close()); })("primary", function CategorySelectorModalComponent_Template_app_base_modal_primary_0_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.confirm()); });
            i0.ɵɵtemplate(1, CategorySelectorModalComponent_ng_container_1_Template, 3, 1, "ng-container", 2)(2, CategorySelectorModalComponent_ng_template_2_Template, 21, 16, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const allocationMode_r9 = i0.ɵɵreference(3);
            i0.ɵɵproperty("isOpen", ctx.isOpen)("title", ctx.selectionMode === ctx.CategorySelectionMode.SINGLE ? "Seleccionar categor\u00EDa" : "Seleccionar categor\u00EDas")("description", ctx.selectionMode === ctx.CategorySelectionMode.SINGLE ? "Elige la categor\u00EDa que mejor describe este movimiento." : "Asigna un monto a cada categor\u00EDa. La suma ser\u00E1 tu presupuesto total.")("primaryText", ctx.selectionMode === ctx.CategorySelectionMode.SINGLE ? "" : "Guardar distribuci\u00F3n")("primaryDisabled", !ctx.canConfirm);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectionMode === ctx.CategorySelectionMode.SINGLE)("ngIfElse", allocationMode_r9);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, i1.DecimalPipe, FormsModule, i2.NgControlStatus, i2.NgModel, IonIcon,
            BaseModalComponent,
            ItemIconComponent,
            AmountInputComponent,
            WarningMessageComponent], styles: ["[_nghost-%COMP%] {\n  display: contents;\n}\n\n.category-list[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 0;\n  flex-direction: column;\n  gap: 8px;\n  overflow-y: auto;\n  padding: 0 2px 8px;\n}\n\n.allocation-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 12px;\n  padding: 10px 12px;\n  border: 1px solid rgba(67, 24, 184, .12);\n  border-radius: 14px;\n  background: linear-gradient(135deg, #faf9ff, #f5f7ff);\n\n  > span {\n    display: grid;\n    gap: 3px;\n  }\n\n  small {\n    color: #7b8498;\n    font-size: 10px;\n  }\n\n  strong {\n    color: var(--fv-primary, #4318b8);\n    font-size: 16px;\n    letter-spacing: -.02em;\n  }\n\n  &__count {\n    display: block !important;\n    color: #667085;\n    font-size: 10px;\n    font-weight: 650;\n    white-space: nowrap;\n  }\n\n  &.warning {\n    border-color: var(--fv-warning-border);\n    background: linear-gradient(\n      135deg,\n      var(--fv-warning-surface-soft),\n      var(--fv-warning-surface)\n    );\n\n    strong {\n      color: var(--fv-warning-strong);\n    }\n  }\n}\n\n.allocation-summary[_ngcontent-%COMP%]    + app-warning-message[_ngcontent-%COMP%] {\n  margin: -5px 2px 10px;\n}\n\n.category-item[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  min-height: 0;\n  padding: 0;\n  overflow: hidden;\n  border: 1px solid #edf1f7;\n  border-radius: 15px;\n  background: #fff;\n  text-align: left;\n\n  &.selected {\n    border-color: rgba(67, 24, 184, 0.2);\n    background: #f7f5ff;\n  }\n\n  &--all,\n  &__toggle {\n    display: flex;\n    width: 100%;\n    min-height: 60px;\n    align-items: center;\n    gap: 12px;\n    padding: 10px 12px;\n    border: 0;\n    background: transparent;\n    text-align: left;\n  }\n\n  &__content {\n    display: grid;\n    min-width: 0;\n    flex: 1;\n    gap: 3px;\n\n    strong {\n      overflow: hidden;\n      color: #202737;\n      font-size: 14px;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n\n    small {\n      color: #7b8498;\n      font-size: 11px;\n    }\n  }\n\n  &__status {\n    display: grid;\n    width: 20px;\n    height: 20px;\n    flex: 0 0 20px;\n    border: 1.5px solid #d8dceb;\n    border-radius: 50%;\n    place-items: center;\n\n    &.selected {\n      border-color: var(--fv-primary);\n      background: var(--fv-primary);\n    }\n\n    ion-icon {\n      color: #fff;\n      font-size: 12px;\n    }\n  }\n\n  &__amount {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 12px;\n    padding: 8px 12px 11px;\n    border-top: 1px solid rgba(67, 24, 184, .08);\n\n    > span:first-child {\n      color: #667085;\n      font-size: 11px;\n      font-weight: 600;\n    }\n  }\n\n  &__amount app-amount-input {\n    width: 128px;\n    flex: 0 0 128px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CategorySelectorModalComponent, [{
        type: Component,
        args: [{ selector: 'app-category-selector-modal', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    IonIcon,
                    BaseModalComponent,
                    ItemIconComponent,
                    AmountInputComponent,
                    WarningMessageComponent
                ], template: "<app-base-modal\n  [isOpen]=\"isOpen\"\n  [title]=\"selectionMode === CategorySelectionMode.SINGLE ? 'Seleccionar categor\u00EDa' : 'Seleccionar categor\u00EDas'\"\n  [description]=\"selectionMode === CategorySelectionMode.SINGLE\n    ? 'Elige la categor\u00EDa que mejor describe este movimiento.'\n    : 'Asigna un monto a cada categor\u00EDa. La suma ser\u00E1 tu presupuesto total.'\"\n  [primaryText]=\"selectionMode === CategorySelectionMode.SINGLE ? '' : 'Guardar distribuci\u00F3n'\"\n  [primaryDisabled]=\"!canConfirm\"\n  size=\"lg\"\n  (closed)=\"close()\"\n  (primary)=\"confirm()\">\n  <ng-container *ngIf=\"selectionMode === CategorySelectionMode.SINGLE; else allocationMode\">\n    <div class=\"category-list\">\n      <button\n        *ngFor=\"let category of categories\"\n        type=\"button\"\n        class=\"category-item category-item--all\"\n        [class.selected]=\"isSelected(category)\"\n        (click)=\"selectCategory(category)\">\n        <app-item-icon\n          [icon]=\"category.icono\"\n          [color]=\"category.color\"\n          variant=\"soft\"\n          [selected]=\"isSelected(category)\">\n        </app-item-icon>\n        <span class=\"category-item__content\">\n          <strong>{{ category.nombre }}</strong>\n          <small>{{ category.tipo === 'ingresos' || category.tipo === 'ingreso' ? 'Categor\u00EDa de ingreso' : 'Categor\u00EDa de gasto' }}</small>\n        </span>\n        <span class=\"category-item__status\" [class.selected]=\"isSelected(category)\">\n          <ion-icon *ngIf=\"isSelected(category)\" name=\"checkmark\"></ion-icon>\n        </span>\n      </button>\n    </div>\n  </ng-container>\n\n  <ng-template #allocationMode>\n    <div class=\"allocation-summary\" [class.warning]=\"exceedsAvailableBalance\">\n    <span>\n      <small>Presupuesto total</small>\n      <strong>S/ {{ totalAllocated | number:'1.2-2' }}</strong>\n    </span>\n    <span class=\"allocation-summary__count\">\n      {{ workingSelection.length }}\n      {{ workingSelection.length === 1 ? 'categor\u00EDa' : 'categor\u00EDas' }}\n    </span>\n    </div>\n\n    <app-warning-message\n      *ngIf=\"exceedsAvailableBalance\"\n      title=\"Saldo insuficiente\"\n      [message]=\"balanceWarningMessage\">\n    </app-warning-message>\n\n    <div class=\"category-list\">\n      <button\n        type=\"button\"\n        class=\"category-item category-item--all\"\n        [class.selected]=\"selectAll\"\n        (click)=\"toggleAll()\">\n        <app-item-icon icon=\"category\" color=\"var(--fv-primary)\" variant=\"soft\" [selected]=\"selectAll\"></app-item-icon>\n        <span class=\"category-item__content\">\n          <strong>Todas las categor\u00EDas</strong>\n          <small>Asignar un monto a cada categor\u00EDa</small>\n        </span>\n        <span class=\"category-item__status\" [class.selected]=\"selectAll\">\n          <ion-icon *ngIf=\"selectAll\" name=\"checkmark\"></ion-icon>\n        </span>\n      </button>\n\n      <article\n        *ngFor=\"let category of categories\"\n        class=\"category-item\"\n        [class.selected]=\"isSelected(category)\">\n        <button type=\"button\" class=\"category-item__toggle\" (click)=\"toggle(category)\">\n          <app-item-icon\n            [icon]=\"category.icono\"\n            [color]=\"category.color\"\n            variant=\"soft\"\n            [selected]=\"isSelected(category)\">\n          </app-item-icon>\n          <span class=\"category-item__content\">\n            <strong>{{ category.nombre }}</strong>\n            <small>Categor\u00EDa de gasto</small>\n          </span>\n          <span class=\"category-item__status\" [class.selected]=\"isSelected(category)\">\n            <ion-icon *ngIf=\"isSelected(category)\" name=\"checkmark\"></ion-icon>\n          </span>\n        </button>\n\n        <label *ngIf=\"isSelected(category)\" class=\"category-item__amount\">\n          <span>Monto asignado</span>\n          <app-amount-input\n            variant=\"compact\"\n            currencyCode=\"PEN\"\n            [ariaLabel]=\"'Monto para ' + category.nombre\"\n            [ngModel]=\"amountFor(category)\"\n            [ngModelOptions]=\"{ standalone: true }\"\n            (ngModelChange)=\"updateAmount(category, $event)\">\n          </app-amount-input>\n        </label>\n      </article>\n    </div>\n  </ng-template>\n</app-base-modal>\n", styles: [":host {\n  display: contents;\n}\n\n.category-list {\n  display: flex;\n  min-height: 0;\n  flex-direction: column;\n  gap: 8px;\n  overflow-y: auto;\n  padding: 0 2px 8px;\n}\n\n.allocation-summary {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 12px;\n  padding: 10px 12px;\n  border: 1px solid rgba(67, 24, 184, .12);\n  border-radius: 14px;\n  background: linear-gradient(135deg, #faf9ff, #f5f7ff);\n\n  > span {\n    display: grid;\n    gap: 3px;\n  }\n\n  small {\n    color: #7b8498;\n    font-size: 10px;\n  }\n\n  strong {\n    color: var(--fv-primary, #4318b8);\n    font-size: 16px;\n    letter-spacing: -.02em;\n  }\n\n  &__count {\n    display: block !important;\n    color: #667085;\n    font-size: 10px;\n    font-weight: 650;\n    white-space: nowrap;\n  }\n\n  &.warning {\n    border-color: var(--fv-warning-border);\n    background: linear-gradient(\n      135deg,\n      var(--fv-warning-surface-soft),\n      var(--fv-warning-surface)\n    );\n\n    strong {\n      color: var(--fv-warning-strong);\n    }\n  }\n}\n\n.allocation-summary + app-warning-message {\n  margin: -5px 2px 10px;\n}\n\n.category-item {\n  display: block;\n  width: 100%;\n  min-height: 0;\n  padding: 0;\n  overflow: hidden;\n  border: 1px solid #edf1f7;\n  border-radius: 15px;\n  background: #fff;\n  text-align: left;\n\n  &.selected {\n    border-color: rgba(67, 24, 184, 0.2);\n    background: #f7f5ff;\n  }\n\n  &--all,\n  &__toggle {\n    display: flex;\n    width: 100%;\n    min-height: 60px;\n    align-items: center;\n    gap: 12px;\n    padding: 10px 12px;\n    border: 0;\n    background: transparent;\n    text-align: left;\n  }\n\n  &__content {\n    display: grid;\n    min-width: 0;\n    flex: 1;\n    gap: 3px;\n\n    strong {\n      overflow: hidden;\n      color: #202737;\n      font-size: 14px;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n\n    small {\n      color: #7b8498;\n      font-size: 11px;\n    }\n  }\n\n  &__status {\n    display: grid;\n    width: 20px;\n    height: 20px;\n    flex: 0 0 20px;\n    border: 1.5px solid #d8dceb;\n    border-radius: 50%;\n    place-items: center;\n\n    &.selected {\n      border-color: var(--fv-primary);\n      background: var(--fv-primary);\n    }\n\n    ion-icon {\n      color: #fff;\n      font-size: 12px;\n    }\n  }\n\n  &__amount {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 12px;\n    padding: 8px 12px 11px;\n    border-top: 1px solid rgba(67, 24, 184, .08);\n\n    > span:first-child {\n      color: #667085;\n      font-size: 11px;\n      font-weight: 600;\n    }\n  }\n\n  &__amount app-amount-input {\n    width: 128px;\n    flex: 0 0 128px;\n  }\n}\n"] }]
    }], null, { isOpen: [{
            type: Input
        }], categories: [{
            type: Input
        }], selectionMode: [{
            type: Input
        }], selectedCategory: [{
            type: Input
        }], selectedAllocations: [{
            type: Input
        }], availableBalance: [{
            type: Input
        }], categorySelected: [{
            type: Output
        }], allocationsSelected: [{
            type: Output
        }], modalClosed: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CategorySelectorModalComponent, { className: "CategorySelectorModalComponent", filePath: "src/app/shared/components/category-selector-modal/category-selector-modal.component.ts", lineNumber: 36 }); })();
//# sourceMappingURL=category-selector-modal.component.js.map