import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemIconComponent } from '../item-icon/item-icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = [[["", "header-actions", ""]], [["", "header-left", ""]]];
const _c1 = ["[header-actions]", "[header-left]"];
function PageLayoutComponent_app_item_icon_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-item-icon", 6);
    i0.ɵɵlistener("activated", function PageLayoutComponent_app_item_icon_2_Template_app_item_icon_activated_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onBack()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("interactive", true)("disabled", ctx_r1.loading);
} }
function PageLayoutComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵprojection(0, 1);
} }
export class PageLayoutComponent {
    constructor() {
        /* ==========================================================
         * INPUTS
         * ========================================================== */
        this.title = '';
        this.subtitle = '';
        this.showBack = true;
        this.loading = false;
        /* ==========================================================
         * OUTPUTS
         * ========================================================== */
        this.back = new EventEmitter();
        /* ==========================================================
         * STATE
         * ========================================================== */
        this.navigating = false;
    }
    /* ==========================================================
     * EVENTS
     * ========================================================== */
    onBack() {
        if (this.loading ||
            this.navigating) {
            return;
        }
        this.navigating = true;
        this.back.emit();
        setTimeout(() => {
            this.navigating = false;
        }, 600);
    }
    static { this.ɵfac = function PageLayoutComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PageLayoutComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PageLayoutComponent, selectors: [["app-page-layout"]], inputs: { title: "title", subtitle: "subtitle", showBack: "showBack", loading: "loading" }, outputs: { back: "back" }, ngContentSelectors: _c1, decls: 10, vars: 3, consts: [["menuSlot", ""], [1, "fv-header"], [1, "header-left"], ["icon", "left", "color", "#ffffff", "size", "md", "variant", "nav-glass", "ariaLabel", "Volver", 3, "interactive", "disabled", "activated", 4, "ngIf", "ngIfElse"], [1, "header-center"], [1, "header-right"], ["icon", "left", "color", "#ffffff", "size", "md", "variant", "nav-glass", "ariaLabel", "Volver", 3, "activated", "interactive", "disabled"]], template: function PageLayoutComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef(_c0);
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2);
            i0.ɵɵtemplate(2, PageLayoutComponent_app_item_icon_2_Template, 1, 2, "app-item-icon", 3)(3, PageLayoutComponent_ng_template_3_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 4)(6, "h1");
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 5);
            i0.ɵɵprojection(9);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            const menuSlot_r3 = i0.ɵɵreference(4);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.showBack)("ngIfElse", menuSlot_r3);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", ctx.title, " ");
        } }, dependencies: [CommonModule, i1.NgIf, ItemIconComponent], styles: ["[_nghost-%COMP%] {\n\n  display: block;\n\n}\n\n\n\n\n\n\n.fv-header[_ngcontent-%COMP%] {\n\n  position: relative;\n\n  display: grid;\n\n  grid-template-columns: 48px 1fr 48px;\n\n  align-items: center;\n\n  min-height: 60px;\n\n  padding:\n    max(env(safe-area-inset-top), 0px)\n    16px\n    8px;\n\n  overflow: hidden;\n\n  background: var(--fv-gradient-primary);\n\n}\n\n\n\n\n\n\n.fv-header[_ngcontent-%COMP%]::before {\n\n  content: '';\n\n  position: absolute;\n\n  top: -45px;\n  right: -25px;\n\n  width: 140px;\n  height: 140px;\n\n  border-radius: 50%;\n\n  background:\n    rgba(255,255,255,.05);\n\n}\n\n.fv-header[_ngcontent-%COMP%]::after {\n\n  content: '';\n\n  position: absolute;\n\n  left: -35px;\n  bottom: -65px;\n\n  width: 120px;\n  height: 120px;\n\n  border-radius: 50%;\n\n  background:\n    rgba(255,255,255,.04);\n\n}\n\n\n\n\n\n\n.header-left[_ngcontent-%COMP%], \n.header-center[_ngcontent-%COMP%], \n.header-right[_ngcontent-%COMP%] {\n\n  position: relative;\n\n  z-index: 2;\n\n}\n\n.header-left[_ngcontent-%COMP%], \n.header-right[_ngcontent-%COMP%] {\n\n  width: 48px;\n  height: 44px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n}\n\n.header-center[_ngcontent-%COMP%] {\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  min-width: 0;\n\n}\n\n\n\n\n\n\n.header-center[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n\n  margin: 0;\n\n  padding: 0 12px;\n\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n\n  color: #fff;\n\n  font-size: 19px;\n  font-weight: 700;\n\n  letter-spacing: -.02em;\n\n  line-height: 1.2;\n\n}\n\n\n\n\n\n\n.header-right[_ngcontent-%COMP%]:empty {\n\n  visibility: hidden;\n\n}\n\n\n\n\n\n\n@media (max-width: 420px) {\n\n  .fv-header[_ngcontent-%COMP%] {\n\n    padding:\n      max(env(safe-area-inset-top), 0px)\n      14px\n      8px;\n\n  }\n\n  .header-center[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n\n    font-size: 18px;\n\n  }\n\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PageLayoutComponent, [{
        type: Component,
        args: [{ selector: 'app-page-layout', standalone: true, imports: [
                    CommonModule,
                    ItemIconComponent
                ], template: "<!-- ==========================================================\n     HEADER\n     ========================================================== -->\n\n<div class=\"fv-header\">\n\n  <!-- ==========================\n       LEFT\n       ========================== -->\n\n  <div class=\"header-left\">\n\n    <app-item-icon\n      *ngIf=\"showBack; else menuSlot\"\n      icon=\"left\"\n      color=\"#ffffff\"\n      size=\"md\"\n      variant=\"nav-glass\"\n      [interactive]=\"true\"\n      ariaLabel=\"Volver\"\n      [disabled]=\"loading\"\n      (activated)=\"onBack()\">\n    </app-item-icon>\n\n    <ng-template #menuSlot>\n\n      <ng-content select=\"[header-left]\">\n      </ng-content>\n\n    </ng-template>\n\n  </div>\n\n  <!-- ==========================\n       TITLE\n       ========================== -->\n\n  <div class=\"header-center\">\n\n    <h1>\n\n      {{ title }}\n\n    </h1>\n\n  </div>\n\n  <!-- ==========================\n       RIGHT\n       ========================== -->\n\n  <div class=\"header-right\">\n\n    <ng-content select=\"[header-actions]\">\n    </ng-content>\n\n  </div>\n\n</div>\n", styles: [":host {\n\n  display: block;\n\n}\n\n/* ==========================================================\n   HEADER\n   ========================================================== */\n\n.fv-header {\n\n  position: relative;\n\n  display: grid;\n\n  grid-template-columns: 48px 1fr 48px;\n\n  align-items: center;\n\n  min-height: 60px;\n\n  padding:\n    max(env(safe-area-inset-top), 0px)\n    16px\n    8px;\n\n  overflow: hidden;\n\n  background: var(--fv-gradient-primary);\n\n}\n\n/* ==========================================================\n   DECORATION\n   ========================================================== */\n\n.fv-header::before {\n\n  content: '';\n\n  position: absolute;\n\n  top: -45px;\n  right: -25px;\n\n  width: 140px;\n  height: 140px;\n\n  border-radius: 50%;\n\n  background:\n    rgba(255,255,255,.05);\n\n}\n\n.fv-header::after {\n\n  content: '';\n\n  position: absolute;\n\n  left: -35px;\n  bottom: -65px;\n\n  width: 120px;\n  height: 120px;\n\n  border-radius: 50%;\n\n  background:\n    rgba(255,255,255,.04);\n\n}\n\n/* ==========================================================\n   LAYOUT\n   ========================================================== */\n\n.header-left,\n.header-center,\n.header-right {\n\n  position: relative;\n\n  z-index: 2;\n\n}\n\n.header-left,\n.header-right {\n\n  width: 48px;\n  height: 44px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n}\n\n.header-center {\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  min-width: 0;\n\n}\n\n/* ==========================================================\n   TITLE\n   ========================================================== */\n\n.header-center h1 {\n\n  margin: 0;\n\n  padding: 0 12px;\n\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n\n  color: #fff;\n\n  font-size: 19px;\n  font-weight: 700;\n\n  letter-spacing: -.02em;\n\n  line-height: 1.2;\n\n}\n\n/* ==========================================================\n   ACTIONS\n   ========================================================== */\n\n.header-right:empty {\n\n  visibility: hidden;\n\n}\n\n/* ==========================================================\n   RESPONSIVE\n   ========================================================== */\n\n@media (max-width: 420px) {\n\n  .fv-header {\n\n    padding:\n      max(env(safe-area-inset-top), 0px)\n      14px\n      8px;\n\n  }\n\n  .header-center h1 {\n\n    font-size: 18px;\n\n  }\n\n}\n"] }]
    }], null, { title: [{
            type: Input
        }], subtitle: [{
            type: Input
        }], showBack: [{
            type: Input
        }], loading: [{
            type: Input
        }], back: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PageLayoutComponent, { className: "PageLayoutComponent", filePath: "src/app/shared/components/page-layout/page-layout.component.ts", lineNumber: 21 }); })();
//# sourceMappingURL=page-layout.component.js.map