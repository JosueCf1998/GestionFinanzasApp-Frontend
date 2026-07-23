import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ItemIconComponent } from '../item-icon/item-icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function IconPickerComponent_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function IconPickerComponent_button_2_Template_button_click_0_listener() { const option_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.select(option_r2)); });
    i0.ɵɵelement(1, "app-item-icon", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("selected", option_r2.icon === ctx_r2.selected);
    i0.ɵɵattribute("aria-label", option_r2.label)("aria-pressed", option_r2.icon === ctx_r2.selected);
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", option_r2.icon)("color", ctx_r2.iconColor(option_r2));
} }
function IconPickerComponent_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function IconPickerComponent_button_3_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openModal()); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "\u2026");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r2.isModalOpen);
    i0.ɵɵattribute("aria-expanded", ctx_r2.isModalOpen);
} }
function IconPickerComponent_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 10);
    i0.ɵɵlistener("click", function IconPickerComponent_button_6_Template_button_click_0_listener() { const option_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.select(option_r6, true)); });
    i0.ɵɵelement(1, "app-item-icon", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("selected", option_r6.icon === ctx_r2.selected);
    i0.ɵɵattribute("aria-label", option_r6.label)("aria-pressed", option_r6.icon === ctx_r2.selected);
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", option_r6.icon)("color", ctx_r2.iconColor(option_r6));
} }
export class IconPickerComponent {
    constructor() {
        this.options = [];
        this.selected = '';
        this.color = 'var(--fv-primary)';
        this.visibleCount = 5;
        this.selectedChange = new EventEmitter();
        this.isModalOpen = false;
        this.promotedIcons = [];
    }
    get quickOptions() {
        const availableIcons = new Set(this.options.map(option => option.icon));
        this.promotedIcons = this.promotedIcons.filter(icon => availableIcons.has(icon));
        const promotedOptions = this.promotedIcons
            .map(icon => this.options.find(option => option.icon === icon))
            .filter((option) => Boolean(option));
        const promotedSet = new Set(this.promotedIcons);
        const orderedOptions = [
            ...promotedOptions,
            ...this.options.filter(option => !promotedSet.has(option.icon))
        ];
        return orderedOptions.slice(0, this.visibleCount);
    }
    select(option, fromModal = false) {
        if (fromModal && !this.quickOptions.some(item => item.icon === option.icon)) {
            this.promotedIcons = [
                option.icon,
                ...this.promotedIcons.filter(icon => icon !== option.icon)
            ].slice(0, this.visibleCount);
        }
        this.selectedChange.emit(option.icon);
        if (fromModal)
            this.closeModal();
    }
    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    iconColor(option) {
        if (option.icon !== this.selected)
            return '#a3a8b3';
        return this.color.toLowerCase() === '#222' ? '#111111' : this.color;
    }
    static { this.ɵfac = function IconPickerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || IconPickerComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: IconPickerComponent, selectors: [["app-icon-picker"]], inputs: { options: "options", selected: "selected", color: "color", visibleCount: "visibleCount" }, outputs: { selectedChange: "selectedChange" }, decls: 7, vars: 4, consts: [["aria-label", "Seleccionar icono", 1, "icon-picker"], [1, "icon-picker__row"], ["type", "button", "class", "icon-picker__button", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", "class", "icon-picker__more", "aria-label", "Ver m\u00E1s iconos", 3, "active", "click", 4, "ngIf"], ["title", "Selecciona un icono", "description", "Elige el icono que identificar\u00E1 este elemento.", 3, "closed", "isOpen"], [1, "picker-grid"], ["type", "button", "class", "picker-option", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "icon-picker__button", 3, "click"], ["size", "md", "variant", "soft", 3, "icon", "color"], ["type", "button", "aria-label", "Ver m\u00E1s iconos", 1, "icon-picker__more", 3, "click"], ["type", "button", 1, "picker-option", 3, "click"]], template: function IconPickerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtemplate(2, IconPickerComponent_button_2_Template, 2, 6, "button", 2)(3, IconPickerComponent_button_3_Template, 3, 3, "button", 3);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "app-base-modal", 4);
            i0.ɵɵlistener("closed", function IconPickerComponent_Template_app_base_modal_closed_4_listener() { return ctx.closeModal(); });
            i0.ɵɵelementStart(5, "div", 5);
            i0.ɵɵtemplate(6, IconPickerComponent_button_6_Template, 2, 6, "button", 6);
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
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, ItemIconComponent, BaseModalComponent], styles: ["[_nghost-%COMP%] { display: block; }\n.icon-picker[_ngcontent-%COMP%] { display: grid; gap: 10px; }\n.icon-picker__row[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); align-items: center; gap: 8px; padding: 2px 0; }\n.icon-picker__button[_ngcontent-%COMP%] { display: grid; box-sizing: border-box; width: calc(100% - 4px); min-height: 42px; margin: 2px; padding: 1px; border: 0; border-radius: 12px; background: transparent; transition: transform .16s ease, box-shadow .16s ease; place-items: center; }\n.icon-picker__button[_ngcontent-%COMP%]:active { transform: scale(.94); }\n.icon-picker__button.selected[_ngcontent-%COMP%] { background: transparent; }\n[_nghost-%COMP%]     .icon-picker__button .fv-item-icon--md { width: clamp(36px,10vw,42px); height: clamp(36px,10vw,42px); border-radius: 12px; }\n[_nghost-%COMP%]     .icon-picker__button.selected .fv-item-icon--md { box-shadow: 0 0 0 2px #fff, 0 0 0 3.5px #6847ef, 0 4px 10px rgba(67,24,184,.08); }\n[_nghost-%COMP%]     .icon-picker__button .fv-item-icon__glyph { width: clamp(16px,4.5vw,19px); height: clamp(16px,4.5vw,19px); }\n.icon-picker__more[_ngcontent-%COMP%] { display: grid; width: 100%; min-height: 36px; padding: 0; border: 0; border-radius: 10px; background: transparent; color: #7a8295; aspect-ratio: 1; place-items: center; }\n.icon-picker__more[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { font-size: 24px; font-weight: 800; line-height: .7; transform: translateY(-2px); }\n.icon-picker__more.active[_ngcontent-%COMP%] { color: var(--fv-primary); }\n.picker-grid[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 9px; }\n.picker-option[_ngcontent-%COMP%] { display: grid; min-width: 0; padding: 6px; border: 1px solid #eceef5; border-radius: 14px; background: #fafbfe; aspect-ratio: 1; color: #596276; place-items: center; }\n.picker-option.selected[_ngcontent-%COMP%] { border-color: #7458ef; background: #f6f3ff; color: var(--fv-primary); }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(IconPickerComponent, [{
        type: Component,
        args: [{ selector: 'app-icon-picker', standalone: true, imports: [CommonModule, ItemIconComponent, BaseModalComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"icon-picker\" aria-label=\"Seleccionar icono\">\n  <div class=\"icon-picker__row\">\n    <button\n      *ngFor=\"let option of quickOptions\"\n      type=\"button\"\n      class=\"icon-picker__button\"\n      [class.selected]=\"option.icon === selected\"\n      [attr.aria-label]=\"option.label\"\n      [attr.aria-pressed]=\"option.icon === selected\"\n      (click)=\"select(option)\">\n      <app-item-icon\n        [icon]=\"option.icon\"\n        [color]=\"iconColor(option)\"\n        size=\"md\"\n        variant=\"soft\">\n      </app-item-icon>\n    </button>\n\n    <button\n      *ngIf=\"options.length > visibleCount\"\n      type=\"button\"\n      class=\"icon-picker__more\"\n      aria-label=\"Ver m\u00E1s iconos\"\n      [attr.aria-expanded]=\"isModalOpen\"\n      [class.active]=\"isModalOpen\"\n      (click)=\"openModal()\">\n      <span>\u2026</span>\n    </button>\n  </div>\n</div>\n\n<app-base-modal\n  [isOpen]=\"isModalOpen\"\n  title=\"Selecciona un icono\"\n  description=\"Elige el icono que identificar\u00E1 este elemento.\"\n  (closed)=\"closeModal()\">\n      <div class=\"picker-grid\">\n        <button\n          *ngFor=\"let option of options\"\n          type=\"button\"\n          class=\"picker-option\"\n          [class.selected]=\"option.icon === selected\"\n          [attr.aria-label]=\"option.label\"\n          [attr.aria-pressed]=\"option.icon === selected\"\n          (click)=\"select(option, true)\">\n          <app-item-icon\n            [icon]=\"option.icon\"\n            [color]=\"iconColor(option)\"\n            size=\"md\"\n            variant=\"soft\">\n          </app-item-icon>\n        </button>\n      </div>\n</app-base-modal>\n", styles: [":host { display: block; }\n.icon-picker { display: grid; gap: 10px; }\n.icon-picker__row { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); align-items: center; gap: 8px; padding: 2px 0; }\n.icon-picker__button { display: grid; box-sizing: border-box; width: calc(100% - 4px); min-height: 42px; margin: 2px; padding: 1px; border: 0; border-radius: 12px; background: transparent; transition: transform .16s ease, box-shadow .16s ease; place-items: center; }\n.icon-picker__button:active { transform: scale(.94); }\n.icon-picker__button.selected { background: transparent; }\n:host ::ng-deep .icon-picker__button .fv-item-icon--md { width: clamp(36px,10vw,42px); height: clamp(36px,10vw,42px); border-radius: 12px; }\n:host ::ng-deep .icon-picker__button.selected .fv-item-icon--md { box-shadow: 0 0 0 2px #fff, 0 0 0 3.5px #6847ef, 0 4px 10px rgba(67,24,184,.08); }\n:host ::ng-deep .icon-picker__button .fv-item-icon__glyph { width: clamp(16px,4.5vw,19px); height: clamp(16px,4.5vw,19px); }\n.icon-picker__more { display: grid; width: 100%; min-height: 36px; padding: 0; border: 0; border-radius: 10px; background: transparent; color: #7a8295; aspect-ratio: 1; place-items: center; }\n.icon-picker__more span { font-size: 24px; font-weight: 800; line-height: .7; transform: translateY(-2px); }\n.icon-picker__more.active { color: var(--fv-primary); }\n.picker-grid { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 9px; }\n.picker-option { display: grid; min-width: 0; padding: 6px; border: 1px solid #eceef5; border-radius: 14px; background: #fafbfe; aspect-ratio: 1; color: #596276; place-items: center; }\n.picker-option.selected { border-color: #7458ef; background: #f6f3ff; color: var(--fv-primary); }\n"] }]
    }], null, { options: [{
            type: Input
        }], selected: [{
            type: Input
        }], color: [{
            type: Input
        }], visibleCount: [{
            type: Input
        }], selectedChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(IconPickerComponent, { className: "IconPickerComponent", filePath: "src/app/shared/components/icon-picker/icon-picker.component.ts", lineNumber: 17 }); })();
//# sourceMappingURL=icon-picker.component.js.map