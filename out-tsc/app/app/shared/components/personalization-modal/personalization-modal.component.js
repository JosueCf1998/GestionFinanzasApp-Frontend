import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ItemIconComponent } from '../item-icon/item-icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function PersonalizationModalComponent_section_14_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 8);
    i0.ɵɵlistener("click", function PersonalizationModalComponent_section_14_button_1_Template_button_click_0_listener() { const option_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.selectIcon(option_r2.icon)); });
    i0.ɵɵelement(1, "app-item-icon", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", option_r2.icon === ctx_r2.draftIcon);
    i0.ɵɵattribute("aria-label", option_r2.label)("aria-pressed", option_r2.icon === ctx_r2.draftIcon);
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", option_r2.icon)("color", option_r2.icon === ctx_r2.draftIcon ? ctx_r2.draftColor : "#8f97a8");
} }
function PersonalizationModalComponent_section_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 6);
    i0.ɵɵtemplate(1, PersonalizationModalComponent_section_14_button_1_Template, 2, 6, "button", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.icons);
} }
function PersonalizationModalComponent_section_15_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 8);
    i0.ɵɵlistener("click", function PersonalizationModalComponent_section_15_button_1_Template_button_click_0_listener() { const option_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.selectColor(option_r5.value)); });
    i0.ɵɵelement(1, "span");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", option_r5.value === ctx_r2.draftColor);
    i0.ɵɵattribute("aria-label", option_r5.label)("aria-pressed", option_r5.value === ctx_r2.draftColor);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", option_r5.value);
} }
function PersonalizationModalComponent_section_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 10);
    i0.ɵɵtemplate(1, PersonalizationModalComponent_section_15_button_1_Template, 2, 6, "button", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.colors);
} }
export class PersonalizationModalComponent {
    constructor() {
        this.isOpen = false;
        this.selectedIcon = '';
        this.selectedColor = '';
        this.icons = [];
        this.colors = [];
        this.applied = new EventEmitter();
        this.modalClosed = new EventEmitter();
        this.draftIcon = '';
        this.draftColor = '';
        this.activeTab = 'icon';
    }
    ngOnChanges(changes) {
        if (changes['isOpen']?.currentValue === true) {
            this.draftIcon = this.selectedIcon;
            this.draftColor = this.selectedColor;
            this.activeTab = 'icon';
        }
    }
    apply() {
        this.applied.emit({
            icon: this.draftIcon,
            color: this.draftColor
        });
    }
    selectIcon(icon) {
        this.draftIcon = icon;
    }
    selectColor(color) {
        this.draftColor = color;
    }
    close() {
        this.modalClosed.emit();
    }
    static { this.ɵfac = function PersonalizationModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PersonalizationModalComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PersonalizationModalComponent, selectors: [["app-personalization-modal"]], inputs: { isOpen: "isOpen", selectedIcon: "selectedIcon", selectedColor: "selectedColor", icons: "icons", colors: "colors" }, outputs: { applied: "applied", modalClosed: "modalClosed" }, features: [i0.ɵɵNgOnChangesFeature], decls: 16, vars: 11, consts: [["title", "Personalizar presupuesto", "description", "Elige el icono y color que identificar\u00E1n este presupuesto.", "primaryText", "Aplicar personalizaci\u00F3n", "size", "lg", 3, "closed", "primary", "isOpen"], ["size", "lg", "variant", "soft", 3, "icon", "color"], ["role", "tablist", "aria-label", "Tipo de personalizaci\u00F3n"], ["type", "button", "role", "tab", 3, "click"], ["data-picker", "icon", "role", "tabpanel", 4, "ngIf"], ["data-picker", "color", "role", "tabpanel", 4, "ngIf"], ["data-picker", "icon", "role", "tabpanel"], ["type", "button", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", 3, "click"], ["size", "md", "variant", "soft", 3, "icon", "color"], ["data-picker", "color", "role", "tabpanel"]], template: function PersonalizationModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "app-base-modal", 0);
            i0.ɵɵlistener("closed", function PersonalizationModalComponent_Template_app_base_modal_closed_0_listener() { return ctx.close(); })("primary", function PersonalizationModalComponent_Template_app_base_modal_primary_0_listener() { return ctx.apply(); });
            i0.ɵɵelementStart(1, "main")(2, "header");
            i0.ɵɵelement(3, "app-item-icon", 1);
            i0.ɵɵelementStart(4, "div")(5, "strong");
            i0.ɵɵtext(6, "Vista previa");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "span");
            i0.ɵɵtext(8, "As\u00ED se identificar\u00E1 tu presupuesto");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "nav", 2)(10, "button", 3);
            i0.ɵɵlistener("click", function PersonalizationModalComponent_Template_button_click_10_listener() { return ctx.activeTab = "icon"; });
            i0.ɵɵtext(11, " Icono ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "button", 3);
            i0.ɵɵlistener("click", function PersonalizationModalComponent_Template_button_click_12_listener() { return ctx.activeTab = "color"; });
            i0.ɵɵtext(13, " Color ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(14, PersonalizationModalComponent_section_14_Template, 2, 1, "section", 4)(15, PersonalizationModalComponent_section_15_Template, 2, 1, "section", 5);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("isOpen", ctx.isOpen);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("icon", ctx.draftIcon)("color", ctx.draftColor);
            i0.ɵɵadvance(7);
            i0.ɵɵclassProp("active", ctx.activeTab === "icon");
            i0.ɵɵattribute("aria-selected", ctx.activeTab === "icon");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.activeTab === "color");
            i0.ɵɵattribute("aria-selected", ctx.activeTab === "color");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.activeTab === "icon");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activeTab === "color");
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, BaseModalComponent, ItemIconComponent], styles: ["[_nghost-%COMP%] {\n  display: contents;\n}\n\nmain[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 0;\n  gap: 14px;\n}\n\nmain[_ngcontent-%COMP%]    > header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 11px 12px;\n  border: 1px solid #ebeef5;\n  border-radius: 16px;\n  background: #fafbfe;\n}\n\nheader[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  gap: 3px;\n}\n\nheader[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--fv-text-primary, #252b38);\n  font-size: 13px;\n}\n\nheader[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--fv-text-secondary, #667085);\n  font-size: 11px;\n}\n\nnav[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 4px;\n  padding: 4px;\n  border-radius: 14px;\n  background: #f0f2f8;\n}\n\nnav[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 38px;\n  padding: 8px 12px;\n  border: 0;\n  border-radius: 11px;\n  background: transparent;\n  color: #667085;\n  font: inherit;\n  font-size: 13px;\n  font-weight: 700;\n}\n\nnav[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #3a0ca3, #4361ee);\n  box-shadow: 0 5px 12px rgba(58, 12, 163, .16);\n  color: #fff;\n}\n\nsection[role='tabpanel'][_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 0;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  align-content: start;\n  gap: 9px;\n  overflow-y: auto;\n  max-height: min(290px, calc(82dvh - 300px));\n  overscroll-behavior: contain;\n  padding: 2px 3px 6px 2px;\n  scrollbar-gutter: stable;\n  -webkit-overflow-scrolling: touch;\n}\n\nsection[role='tabpanel'][_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 4px;\n}\n\nsection[role='tabpanel'][_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  border-radius: 999px;\n  background: rgba(67, 24, 184, .18);\n}\n\nsection[role='tabpanel'][_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  padding: 6px;\n  border: 1px solid #eceef5;\n  border-radius: 14px;\n  background: #fafbfe;\n  aspect-ratio: 1;\n  place-items: center;\n}\n\nsection[role='tabpanel'][_ngcontent-%COMP%]    > button.selected[_ngcontent-%COMP%] {\n  border-color: #7458ef;\n  background: #f6f3ff;\n  box-shadow: 0 0 0 2px rgba(116, 88, 239, .08);\n}\n\nsection[data-picker='color'][_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  width: clamp(28px, 8vw, 36px);\n  height: clamp(28px, 8vw, 36px);\n  border-radius: 50%;\n  box-shadow: 0 3px 10px rgba(31, 37, 76, .12);\n}\n\n@media (max-width: 360px) {\n  section[role='tabpanel'][_ngcontent-%COMP%] {\n    gap: 7px;\n  }\n\n  section[role='tabpanel'][_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n    padding: 4px;\n  }\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PersonalizationModalComponent, [{
        type: Component,
        args: [{ selector: 'app-personalization-modal', standalone: true, imports: [CommonModule, BaseModalComponent, ItemIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<app-base-modal\n  [isOpen]=\"isOpen\"\n  title=\"Personalizar presupuesto\"\n  description=\"Elige el icono y color que identificar\u00E1n este presupuesto.\"\n  primaryText=\"Aplicar personalizaci\u00F3n\"\n  size=\"lg\"\n  (closed)=\"close()\"\n  (primary)=\"apply()\">\n  <main>\n    <header>\n      <app-item-icon\n        [icon]=\"draftIcon\"\n        [color]=\"draftColor\"\n        size=\"lg\"\n        variant=\"soft\">\n      </app-item-icon>\n      <div>\n        <strong>Vista previa</strong>\n        <span>As\u00ED se identificar\u00E1 tu presupuesto</span>\n      </div>\n    </header>\n\n    <nav role=\"tablist\" aria-label=\"Tipo de personalizaci\u00F3n\">\n      <button\n        type=\"button\"\n        role=\"tab\"\n        [class.active]=\"activeTab === 'icon'\"\n        [attr.aria-selected]=\"activeTab === 'icon'\"\n        (click)=\"activeTab = 'icon'\">\n        Icono\n      </button>\n      <button\n        type=\"button\"\n        role=\"tab\"\n        [class.active]=\"activeTab === 'color'\"\n        [attr.aria-selected]=\"activeTab === 'color'\"\n        (click)=\"activeTab = 'color'\">\n        Color\n      </button>\n    </nav>\n\n    <section *ngIf=\"activeTab === 'icon'\" data-picker=\"icon\" role=\"tabpanel\">\n      <button\n        *ngFor=\"let option of icons\"\n        type=\"button\"\n        [class.selected]=\"option.icon === draftIcon\"\n        [attr.aria-label]=\"option.label\"\n        [attr.aria-pressed]=\"option.icon === draftIcon\"\n        (click)=\"selectIcon(option.icon)\">\n        <app-item-icon\n          [icon]=\"option.icon\"\n          [color]=\"option.icon === draftIcon ? draftColor : '#8f97a8'\"\n          size=\"md\"\n          variant=\"soft\">\n        </app-item-icon>\n      </button>\n    </section>\n\n    <section *ngIf=\"activeTab === 'color'\" data-picker=\"color\" role=\"tabpanel\">\n      <button\n        *ngFor=\"let option of colors\"\n        type=\"button\"\n        [class.selected]=\"option.value === draftColor\"\n        [attr.aria-label]=\"option.label\"\n        [attr.aria-pressed]=\"option.value === draftColor\"\n        (click)=\"selectColor(option.value)\">\n        <span [style.background]=\"option.value\"></span>\n      </button>\n    </section>\n  </main>\n</app-base-modal>\n", styles: [":host {\n  display: contents;\n}\n\nmain {\n  display: grid;\n  min-height: 0;\n  gap: 14px;\n}\n\nmain > header {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 11px 12px;\n  border: 1px solid #ebeef5;\n  border-radius: 16px;\n  background: #fafbfe;\n}\n\nheader > div {\n  display: grid;\n  min-width: 0;\n  gap: 3px;\n}\n\nheader strong {\n  color: var(--fv-text-primary, #252b38);\n  font-size: 13px;\n}\n\nheader span {\n  color: var(--fv-text-secondary, #667085);\n  font-size: 11px;\n}\n\nnav {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 4px;\n  padding: 4px;\n  border-radius: 14px;\n  background: #f0f2f8;\n}\n\nnav button {\n  min-height: 38px;\n  padding: 8px 12px;\n  border: 0;\n  border-radius: 11px;\n  background: transparent;\n  color: #667085;\n  font: inherit;\n  font-size: 13px;\n  font-weight: 700;\n}\n\nnav button.active {\n  background: linear-gradient(135deg, #3a0ca3, #4361ee);\n  box-shadow: 0 5px 12px rgba(58, 12, 163, .16);\n  color: #fff;\n}\n\nsection[role='tabpanel'] {\n  display: grid;\n  min-height: 0;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n  align-content: start;\n  gap: 9px;\n  overflow-y: auto;\n  max-height: min(290px, calc(82dvh - 300px));\n  overscroll-behavior: contain;\n  padding: 2px 3px 6px 2px;\n  scrollbar-gutter: stable;\n  -webkit-overflow-scrolling: touch;\n}\n\nsection[role='tabpanel']::-webkit-scrollbar {\n  width: 4px;\n}\n\nsection[role='tabpanel']::-webkit-scrollbar-thumb {\n  border-radius: 999px;\n  background: rgba(67, 24, 184, .18);\n}\n\nsection[role='tabpanel'] > button {\n  display: grid;\n  min-width: 0;\n  padding: 6px;\n  border: 1px solid #eceef5;\n  border-radius: 14px;\n  background: #fafbfe;\n  aspect-ratio: 1;\n  place-items: center;\n}\n\nsection[role='tabpanel'] > button.selected {\n  border-color: #7458ef;\n  background: #f6f3ff;\n  box-shadow: 0 0 0 2px rgba(116, 88, 239, .08);\n}\n\nsection[data-picker='color'] button > span {\n  width: clamp(28px, 8vw, 36px);\n  height: clamp(28px, 8vw, 36px);\n  border-radius: 50%;\n  box-shadow: 0 3px 10px rgba(31, 37, 76, .12);\n}\n\n@media (max-width: 360px) {\n  section[role='tabpanel'] {\n    gap: 7px;\n  }\n\n  section[role='tabpanel'] > button {\n    padding: 4px;\n  }\n}\n"] }]
    }], null, { isOpen: [{
            type: Input
        }], selectedIcon: [{
            type: Input
        }], selectedColor: [{
            type: Input
        }], icons: [{
            type: Input
        }], colors: [{
            type: Input
        }], applied: [{
            type: Output
        }], modalClosed: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PersonalizationModalComponent, { className: "PersonalizationModalComponent", filePath: "src/app/shared/components/personalization-modal/personalization-modal.component.ts", lineNumber: 21 }); })();
//# sourceMappingURL=personalization-modal.component.js.map