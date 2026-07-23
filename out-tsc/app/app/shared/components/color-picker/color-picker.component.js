import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ColorPickerComponent_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function ColorPickerComponent_button_2_Template_button_click_0_listener() { const option_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.select(option_r2)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("background", option_r2.value);
    i0.ɵɵclassProp("selected", option_r2.value === ctx_r2.selected);
    i0.ɵɵattribute("aria-label", option_r2.label)("aria-pressed", option_r2.value === ctx_r2.selected);
} }
function ColorPickerComponent_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 8);
    i0.ɵɵlistener("click", function ColorPickerComponent_button_3_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openModal()); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "\u2026");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r2.isModalOpen);
    i0.ɵɵattribute("aria-expanded", ctx_r2.isModalOpen);
} }
function ColorPickerComponent_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function ColorPickerComponent_button_6_Template_button_click_0_listener() { const option_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.select(option_r6, true)); });
    i0.ɵɵelement(1, "span", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("selected", option_r6.value === ctx_r2.selected);
    i0.ɵɵattribute("aria-label", option_r6.label)("aria-pressed", option_r6.value === ctx_r2.selected);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", option_r6.value);
} }
export class ColorPickerComponent {
    constructor() {
        this.options = [];
        this.selected = '';
        this.visibleCount = 5;
        this.selectedChange = new EventEmitter();
        this.isModalOpen = false;
        this.promotedColors = [];
    }
    get quickOptions() {
        const availableColors = new Set(this.options.map(option => option.value));
        this.promotedColors = this.promotedColors.filter(color => availableColors.has(color));
        const promotedOptions = this.promotedColors
            .map(color => this.options.find(option => option.value === color))
            .filter((option) => Boolean(option));
        const promotedSet = new Set(this.promotedColors);
        const orderedOptions = [
            ...promotedOptions,
            ...this.options.filter(option => !promotedSet.has(option.value))
        ];
        return orderedOptions.slice(0, this.visibleCount);
    }
    select(option, fromModal = false) {
        if (fromModal && !this.quickOptions.some(item => item.value === option.value)) {
            this.promotedColors = [
                option.value,
                ...this.promotedColors.filter(color => color !== option.value)
            ].slice(0, this.visibleCount);
        }
        this.selectedChange.emit(option.value);
        if (fromModal)
            this.closeModal();
    }
    openModal() { this.isModalOpen = true; }
    closeModal() { this.isModalOpen = false; }
    static { this.ɵfac = function ColorPickerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ColorPickerComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ColorPickerComponent, selectors: [["app-color-picker"]], inputs: { options: "options", selected: "selected", visibleCount: "visibleCount" }, outputs: { selectedChange: "selectedChange" }, decls: 7, vars: 4, consts: [["aria-label", "Seleccionar color", 1, "color-picker"], [1, "color-picker__row"], ["type", "button", "class", "color-picker__button", 3, "background", "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", "class", "color-picker__more", "aria-label", "Ver m\u00E1s colores", 3, "active", "click", 4, "ngIf"], ["title", "Selecciona un color", "description", "Elige el color que identificar\u00E1 este elemento.", 3, "closed", "isOpen"], [1, "picker-grid"], ["type", "button", "class", "picker-option", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "color-picker__button", 3, "click"], ["type", "button", "aria-label", "Ver m\u00E1s colores", 1, "color-picker__more", 3, "click"], ["type", "button", 1, "picker-option", 3, "click"], [1, "picker-swatch"]], template: function ColorPickerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtemplate(2, ColorPickerComponent_button_2_Template, 1, 6, "button", 2)(3, ColorPickerComponent_button_3_Template, 3, 3, "button", 3);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "app-base-modal", 4);
            i0.ɵɵlistener("closed", function ColorPickerComponent_Template_app_base_modal_closed_4_listener() { return ctx.closeModal(); });
            i0.ɵɵelementStart(5, "div", 5);
            i0.ɵɵtemplate(6, ColorPickerComponent_button_6_Template, 2, 6, "button", 6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.quickOptions);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.options.length > ctx.visibleCount);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isModalOpen);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.options);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, BaseModalComponent], styles: ["[_nghost-%COMP%] { display: block; }\n.color-picker[_ngcontent-%COMP%] { display: grid; gap: 10px; }\n.color-picker__row[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(6,minmax(0,1fr)); align-items: center; justify-items: center; gap: 8px; padding: 3px 1px; }\n.color-picker__button[_ngcontent-%COMP%] { width: clamp(24px,7vw,28px); height: clamp(24px,7vw,28px); padding: 0; border: 0; border-radius: 50%; transition: transform .16s ease, box-shadow .16s ease; }\n.color-picker__button[_ngcontent-%COMP%]:active { transform: scale(.92); }\n.color-picker__button.selected[_ngcontent-%COMP%] { box-shadow: 0 0 0 2px white, 0 0 0 3.5px #6847ef; transform: scale(1.02); }\n.color-picker__more[_ngcontent-%COMP%] { display: grid; width: clamp(24px,7vw,28px); height: clamp(24px,7vw,28px); padding: 0; border: 0; border-radius: 9px; background: transparent; color: #7a8295; place-items: center; }\n.color-picker__more[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 24px; font-weight: 800; line-height: .7; transform: translateY(-2px); }\n.color-picker__more.active[_ngcontent-%COMP%] { color: var(--fv-primary); }\n.picker-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 9px; }\n.picker-option[_ngcontent-%COMP%] { display: grid; min-width: 0; padding: 7px; border: 1px solid #eceef5; border-radius: 14px; background: #fafbfe; aspect-ratio: 1; color: #596276; place-items: center; }\n.picker-option.selected[_ngcontent-%COMP%] { border-color: #7458ef; background: #f6f3ff; color: var(--fv-primary); }\n.picker-swatch[_ngcontent-%COMP%] { width: 34px; height: 34px; border-radius: 50%; box-shadow: 0 3px 10px rgba(31,37,76,.12); }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ColorPickerComponent, [{
        type: Component,
        args: [{ selector: 'app-color-picker', standalone: true, imports: [CommonModule, BaseModalComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"color-picker\" aria-label=\"Seleccionar color\">\n  <div class=\"color-picker__row\">\n    <button *ngFor=\"let option of quickOptions\" type=\"button\" class=\"color-picker__button\" [style.background]=\"option.value\" [class.selected]=\"option.value === selected\" [attr.aria-label]=\"option.label\" [attr.aria-pressed]=\"option.value === selected\" (click)=\"select(option)\"></button>\n    <button *ngIf=\"options.length > visibleCount\" type=\"button\" class=\"color-picker__more\" aria-label=\"Ver m\u00E1s colores\" [attr.aria-expanded]=\"isModalOpen\" [class.active]=\"isModalOpen\" (click)=\"openModal()\"><span>\u2026</span></button>\n  </div>\n</div>\n\n<app-base-modal\n  [isOpen]=\"isModalOpen\"\n  title=\"Selecciona un color\"\n  description=\"Elige el color que identificar\u00E1 este elemento.\"\n  (closed)=\"closeModal()\">\n      <div class=\"picker-grid\">\n        <button *ngFor=\"let option of options\" type=\"button\" class=\"picker-option\" [class.selected]=\"option.value === selected\" [attr.aria-label]=\"option.label\" [attr.aria-pressed]=\"option.value === selected\" (click)=\"select(option, true)\">\n          <span class=\"picker-swatch\" [style.background]=\"option.value\"></span>\n        </button>\n      </div>\n</app-base-modal>\n", styles: [":host { display: block; }\n.color-picker { display: grid; gap: 10px; }\n.color-picker__row { display: grid; grid-template-columns: repeat(6,minmax(0,1fr)); align-items: center; justify-items: center; gap: 8px; padding: 3px 1px; }\n.color-picker__button { width: clamp(24px,7vw,28px); height: clamp(24px,7vw,28px); padding: 0; border: 0; border-radius: 50%; transition: transform .16s ease, box-shadow .16s ease; }\n.color-picker__button:active { transform: scale(.92); }\n.color-picker__button.selected { box-shadow: 0 0 0 2px white, 0 0 0 3.5px #6847ef; transform: scale(1.02); }\n.color-picker__more { display: grid; width: clamp(24px,7vw,28px); height: clamp(24px,7vw,28px); padding: 0; border: 0; border-radius: 9px; background: transparent; color: #7a8295; place-items: center; }\n.color-picker__more span { font-size: 24px; font-weight: 800; line-height: .7; transform: translateY(-2px); }\n.color-picker__more.active { color: var(--fv-primary); }\n.picker-grid { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 9px; }\n.picker-option { display: grid; min-width: 0; padding: 7px; border: 1px solid #eceef5; border-radius: 14px; background: #fafbfe; aspect-ratio: 1; color: #596276; place-items: center; }\n.picker-option.selected { border-color: #7458ef; background: #f6f3ff; color: var(--fv-primary); }\n.picker-swatch { width: 34px; height: 34px; border-radius: 50%; box-shadow: 0 3px 10px rgba(31,37,76,.12); }\n"] }]
    }], null, { options: [{
            type: Input
        }], selected: [{
            type: Input
        }], visibleCount: [{
            type: Input
        }], selectedChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ColorPickerComponent, { className: "ColorPickerComponent", filePath: "src/app/shared/components/color-picker/color-picker.component.ts", lineNumber: 16 }); })();
//# sourceMappingURL=color-picker.component.js.map