import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "@angular/common";
function CustomSegmentComponent_button_1_ion_icon_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 6);
} if (rf & 2) {
    i0.ɵɵproperty("src", "assets/icon/down-trend.svg");
} }
function CustomSegmentComponent_button_1_ion_icon_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 6);
} if (rf & 2) {
    i0.ɵɵproperty("src", "assets/icon/up-trend.svg");
} }
function CustomSegmentComponent_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 2);
    i0.ɵɵlistener("click", function CustomSegmentComponent_button_1_Template_button_click_0_listener() { const opt_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onChange(opt_r2.value)); });
    i0.ɵɵelementStart(1, "div", 3);
    i0.ɵɵtemplate(2, CustomSegmentComponent_button_1_ion_icon_2_Template, 1, 1, "ion-icon", 4)(3, CustomSegmentComponent_button_1_ion_icon_3_Template, 1, 1, "ion-icon", 4);
    i0.ɵɵelementStart(4, "span", 5);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const opt_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r2.model === opt_r2.value);
    i0.ɵɵattribute("aria-selected", ctx_r2.model === opt_r2.value);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", opt_r2.value === "gasto");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", opt_r2.value === "ingreso");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", opt_r2.label, " ");
} }
export class CustomSegmentComponent {
    constructor() {
        this.options = [];
        this.model = '';
        this.segmentClass = '';
        this.modelChange = new EventEmitter();
    }
    onChange(value) {
        this.model = value;
        this.modelChange.emit(this.model);
    }
    static { this.ɵfac = function CustomSegmentComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomSegmentComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomSegmentComponent, selectors: [["app-custom-segment"]], inputs: { options: "options", model: "model", segmentClass: "segmentClass" }, outputs: { modelChange: "modelChange" }, decls: 2, vars: 2, consts: [["role", "tablist", 1, "custom-segment", 3, "ngClass"], ["type", "button", "class", "custom-segment-btn", "role", "tab", 3, "active", "click", 4, "ngFor", "ngForOf"], ["type", "button", "role", "tab", 1, "custom-segment-btn", 3, "click"], [1, "segment-content"], ["class", "segment-icon", 3, "src", 4, "ngIf"], [1, "segment-label"], [1, "segment-icon", 3, "src"]], template: function CustomSegmentComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, CustomSegmentComponent_button_1_Template, 6, 6, "button", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngClass", ctx.segmentClass);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.options);
        } }, dependencies: [IonicModule, i1.IonIcon, CommonModule, i2.NgClass, i2.NgForOf, i2.NgIf, FormsModule], styles: [".custom-segment[_ngcontent-%COMP%] {\n  position: relative;\n\n  display: flex;\n  align-items: center;\n\n  gap: 4px;\n\n  padding: 4px;\n\n  min-height: 48px;\n\n  border-radius: 18px;\n\n  background:\n    rgba(255,255,255,.85);\n\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n\n  border:\n    1px solid\n    rgba(255,255,255,.40);\n\n  box-shadow:\n    0 6px 20px rgba(15,23,42,.05);\n\n  overflow: hidden;\n}\n\n.custom-segment-btn[_ngcontent-%COMP%] {\n  flex: 1;\n\n  position: relative;\n\n  height: 40px;\n\n  border: none;\n\n  border-radius: 14px;\n\n  background: transparent;\n\n  color: var(--fv-text-secondary);\n\n  font-size: 13px;\n  font-weight: 600;\n\n  cursor: pointer;\n\n  transition:\n    background .25s ease,\n    color .25s ease,\n    transform .2s ease,\n    box-shadow .25s ease;\n}\n\n.segment-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  gap: 6px;\n}\n\n.segment-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n\n  transition: .25s ease;\n}\n\n.segment-label[_ngcontent-%COMP%] {\n  line-height: 1;\n}\n\n.custom-segment-btn.active[_ngcontent-%COMP%] {\n  background: var(--fv-gradient-primary);\n\n  color: white;\n\n  box-shadow:\n    0 8px 20px rgba(67,97,238,.25);\n}\n\n.custom-segment-btn.active[_ngcontent-%COMP%]   .segment-icon[_ngcontent-%COMP%] {\n  color: white;\n}\n\n.custom-segment-btn[_ngcontent-%COMP%]:not(.active):hover {\n  background:\n    rgba(67,97,238,.05);\n}\n\n.custom-segment-btn[_ngcontent-%COMP%]:active {\n  transform: scale(.97);\n}\n\n.custom-segment-btn[_ngcontent-%COMP%]:disabled {\n  opacity: .5;\n\n  pointer-events: none;\n}\n\n\n\n\n\n\n@media (max-width: 380px) {\n\n  .custom-segment-btn[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n\n  .segment-icon[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomSegmentComponent, [{
        type: Component,
        args: [{ selector: 'app-custom-segment', standalone: true, imports: [IonicModule, CommonModule, FormsModule], template: "<div\n  class=\"custom-segment\"\n  [ngClass]=\"segmentClass\"\n  role=\"tablist\">\n\n  <button\n    *ngFor=\"let opt of options\"\n    type=\"button\"\n    class=\"custom-segment-btn\"\n    [class.active]=\"model === opt.value\"\n    [attr.aria-selected]=\"model === opt.value\"\n    (click)=\"onChange(opt.value)\"\n    role=\"tab\">\n\n    <div class=\"segment-content\">\n\n      <ion-icon\n        *ngIf=\"opt.value === 'gasto'\"\n        [src]=\"'assets/icon/down-trend.svg'\"\n        class=\"segment-icon\">\n      </ion-icon>\n\n      <ion-icon\n        *ngIf=\"opt.value === 'ingreso'\"\n        [src]=\"'assets/icon/up-trend.svg'\"\n        class=\"segment-icon\">\n      </ion-icon>\n\n      <span class=\"segment-label\">\n\n        {{ opt.label }}\n\n      </span>\n\n    </div>\n\n  </button>\n\n</div>\n", styles: [".custom-segment {\n  position: relative;\n\n  display: flex;\n  align-items: center;\n\n  gap: 4px;\n\n  padding: 4px;\n\n  min-height: 48px;\n\n  border-radius: 18px;\n\n  background:\n    rgba(255,255,255,.85);\n\n  -webkit-backdrop-filter: blur(12px);\n  backdrop-filter: blur(12px);\n\n  border:\n    1px solid\n    rgba(255,255,255,.40);\n\n  box-shadow:\n    0 6px 20px rgba(15,23,42,.05);\n\n  overflow: hidden;\n}\n\n.custom-segment-btn {\n  flex: 1;\n\n  position: relative;\n\n  height: 40px;\n\n  border: none;\n\n  border-radius: 14px;\n\n  background: transparent;\n\n  color: var(--fv-text-secondary);\n\n  font-size: 13px;\n  font-weight: 600;\n\n  cursor: pointer;\n\n  transition:\n    background .25s ease,\n    color .25s ease,\n    transform .2s ease,\n    box-shadow .25s ease;\n}\n\n.segment-content {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  gap: 6px;\n}\n\n.segment-icon {\n  font-size: 18px;\n\n  transition: .25s ease;\n}\n\n.segment-label {\n  line-height: 1;\n}\n\n.custom-segment-btn.active {\n  background: var(--fv-gradient-primary);\n\n  color: white;\n\n  box-shadow:\n    0 8px 20px rgba(67,97,238,.25);\n}\n\n.custom-segment-btn.active .segment-icon {\n  color: white;\n}\n\n.custom-segment-btn:not(.active):hover {\n  background:\n    rgba(67,97,238,.05);\n}\n\n.custom-segment-btn:active {\n  transform: scale(.97);\n}\n\n.custom-segment-btn:disabled {\n  opacity: .5;\n\n  pointer-events: none;\n}\n\n/* ==========================\n   RESPONSIVE\n   ========================== */\n\n@media (max-width: 380px) {\n\n  .custom-segment-btn {\n    font-size: 12px;\n  }\n\n  .segment-icon {\n    font-size: 13px;\n  }\n\n}\n"] }]
    }], null, { options: [{
            type: Input
        }], model: [{
            type: Input
        }], segmentClass: [{
            type: Input
        }], modelChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomSegmentComponent, { className: "CustomSegmentComponent", filePath: "src/app/shared/components/custom-segment/custom-segment.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=custom-segment.component.js.map