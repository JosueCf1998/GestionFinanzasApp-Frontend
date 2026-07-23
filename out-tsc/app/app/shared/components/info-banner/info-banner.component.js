import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import * as i0 from "@angular/core";
function InfoBannerComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.symbol, " ");
} }
function InfoBannerComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r0.icon);
} }
export class InfoBannerComponent {
    constructor() {
        this.title = '';
        this.message = '';
        this.icon = 'assets/icon/question.svg';
        this.symbol = '';
        this.tone = 'info';
    }
    static { this.ɵfac = function InfoBannerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InfoBannerComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: InfoBannerComponent, selectors: [["app-info-banner"]], inputs: { title: "title", message: "message", icon: "icon", symbol: "symbol", tone: "tone" }, decls: 9, vars: 6, consts: [["aria-hidden", "true"], [3, "src"]], template: function InfoBannerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "aside")(1, "header")(2, "span", 0);
            i0.ɵɵtemplate(3, InfoBannerComponent_Conditional_3_Template, 1, 1)(4, InfoBannerComponent_Conditional_4_Template, 1, 1, "ion-icon", 1);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "strong");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "p");
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵclassProp("warning", ctx.tone === "warning");
            i0.ɵɵattribute("role", ctx.tone === "warning" ? "alert" : "note");
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.symbol ? 3 : 4);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.message);
        } }, dependencies: [IonIcon], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\naside[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n  padding: 14px 16px;\n  border: 1px solid rgba(67, 24, 184, .1);\n  border-radius: 17px;\n  background: linear-gradient(135deg, #f5f2ff 0%, #f1f4ff 100%);\n  box-shadow: 0 5px 16px rgba(31, 37, 76, .035);\n}\n\naside.warning[_ngcontent-%COMP%] {\n  border-color: var(--fv-warning-border);\n  background: linear-gradient(\n    135deg,\n    var(--fv-warning-surface-soft) 0%,\n    var(--fv-warning-surface) 100%\n  );\n  box-shadow: 0 6px 18px color-mix(in srgb, var(--fv-warning-strong) 7%, transparent);\n\n  header > span {\n    background: var(--fv-warning-icon-surface);\n    color: var(--fv-warning-strong);\n  }\n\n  strong {\n    color: var(--fv-warning-dark);\n  }\n\n  p {\n    color: var(--fv-warning-text);\n  }\n}\n\nheader[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n}\n\nheader[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  width: 28px;\n  height: 28px;\n  flex: 0 0 28px;\n  border-radius: 9px;\n  background: rgba(67, 24, 184, .08);\n  color: var(--fv-primary, #4318b8);\n  font-size: 14px;\n  place-items: center;\n}\n\nion-icon[_ngcontent-%COMP%] {\n  width: 17px;\n  height: 17px;\n}\n\nstrong[_ngcontent-%COMP%] {\n  color: var(--fv-text-primary, #252b38);\n  font-size: 13px;\n  font-weight: 700;\n  line-height: 1.35;\n}\n\np[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--fv-text-secondary, #667085);\n  font-size: 11.5px;\n  line-height: 1.55;\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InfoBannerComponent, [{
        type: Component,
        args: [{ selector: 'app-info-banner', standalone: true, imports: [IonIcon], changeDetection: ChangeDetectionStrategy.OnPush, template: "<aside\n  [class.warning]=\"tone === 'warning'\"\n  [attr.role]=\"tone === 'warning' ? 'alert' : 'note'\">\n  <header>\n    <span aria-hidden=\"true\">\n      @if (symbol) {\n        {{ symbol }}\n      } @else {\n        <ion-icon [src]=\"icon\"></ion-icon>\n      }\n    </span>\n    <strong>{{ title }}</strong>\n  </header>\n\n  <p>{{ message }}</p>\n</aside>\n", styles: [":host {\n  display: block;\n}\n\naside {\n  display: grid;\n  gap: 8px;\n  padding: 14px 16px;\n  border: 1px solid rgba(67, 24, 184, .1);\n  border-radius: 17px;\n  background: linear-gradient(135deg, #f5f2ff 0%, #f1f4ff 100%);\n  box-shadow: 0 5px 16px rgba(31, 37, 76, .035);\n}\n\naside.warning {\n  border-color: var(--fv-warning-border);\n  background: linear-gradient(\n    135deg,\n    var(--fv-warning-surface-soft) 0%,\n    var(--fv-warning-surface) 100%\n  );\n  box-shadow: 0 6px 18px color-mix(in srgb, var(--fv-warning-strong) 7%, transparent);\n\n  header > span {\n    background: var(--fv-warning-icon-surface);\n    color: var(--fv-warning-strong);\n  }\n\n  strong {\n    color: var(--fv-warning-dark);\n  }\n\n  p {\n    color: var(--fv-warning-text);\n  }\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n}\n\nheader > span {\n  display: grid;\n  width: 28px;\n  height: 28px;\n  flex: 0 0 28px;\n  border-radius: 9px;\n  background: rgba(67, 24, 184, .08);\n  color: var(--fv-primary, #4318b8);\n  font-size: 14px;\n  place-items: center;\n}\n\nion-icon {\n  width: 17px;\n  height: 17px;\n}\n\nstrong {\n  color: var(--fv-text-primary, #252b38);\n  font-size: 13px;\n  font-weight: 700;\n  line-height: 1.35;\n}\n\np {\n  margin: 0;\n  color: var(--fv-text-secondary, #667085);\n  font-size: 11.5px;\n  line-height: 1.55;\n}\n"] }]
    }], null, { title: [{
            type: Input,
            args: [{ required: true }]
        }], message: [{
            type: Input,
            args: [{ required: true }]
        }], icon: [{
            type: Input
        }], symbol: [{
            type: Input
        }], tone: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(InfoBannerComponent, { className: "InfoBannerComponent", filePath: "src/app/shared/components/info-banner/info-banner.component.ts", lineNumber: 14 }); })();
//# sourceMappingURL=info-banner.component.js.map