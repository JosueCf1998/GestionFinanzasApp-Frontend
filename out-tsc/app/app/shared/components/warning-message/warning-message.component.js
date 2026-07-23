import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import * as i0 from "@angular/core";
function WarningMessageComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong", 3);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.title);
} }
export class WarningMessageComponent {
    constructor() {
        this.title = '';
        this.message = '';
        this.icon = 'assets/icon/alert-triangle.svg';
    }
    static { this.ɵfac = function WarningMessageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WarningMessageComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WarningMessageComponent, selectors: [["app-warning-message"]], inputs: { title: "title", message: "message", icon: "icon" }, decls: 6, vars: 3, consts: [["role", "alert", 1, "warning-message"], [1, "warning-message__header"], ["aria-hidden", "true", 1, "warning-message__icon", 3, "src"], [1, "warning-message__title"], [1, "warning-message__description"]], template: function WarningMessageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "aside", 0)(1, "header", 1);
            i0.ɵɵelement(2, "ion-icon", 2);
            i0.ɵɵtemplate(3, WarningMessageComponent_Conditional_3_Template, 2, 1, "strong", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p", 4);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("src", ctx.icon);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.title ? 3 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.message);
        } }, dependencies: [IonIcon], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.warning-message[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 5px;\n  padding: 9px 10px;\n  border: 1px solid var(--fv-warning-border);\n  border-left: 3px solid var(--fv-warning-accent);\n  border-radius: 5px 11px 11px 5px;\n  background: linear-gradient(\n    135deg,\n    var(--fv-warning-surface-soft) 0%,\n    var(--fv-warning-surface) 100%\n  );\n  color: var(--fv-warning-text);\n  box-shadow: 0 3px 10px color-mix(in srgb, var(--fv-warning-strong) 5%, transparent);\n}\n\n.warning-message__header[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  gap: 7px;\n}\n\n.warning-message__icon[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n  width: 15px;\n  height: 15px;\n  flex: 0 0 15px;\n  padding: 0;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  color: var(--fv-warning-strong);\n}\n\n.warning-message__title[_ngcontent-%COMP%] {\n  color: var(--fv-warning-dark);\n  font-size: 11px;\n  font-weight: 750;\n  line-height: 1.35;\n}\n\n.warning-message__description[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 0;\n  color: var(--fv-warning-text);\n  font-size: 10px;\n  line-height: 1.4;\n}\n\n@media (max-width: 360px) {\n  .warning-message[_ngcontent-%COMP%] {\n    gap: 5px;\n    padding: 8px 9px;\n  }\n\n  .warning-message__icon[_ngcontent-%COMP%] {\n    width: 15px;\n    height: 15px;\n    flex-basis: 15px;\n    padding: 0;\n  }\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WarningMessageComponent, [{
        type: Component,
        args: [{ selector: 'app-warning-message', standalone: true, imports: [IonIcon], changeDetection: ChangeDetectionStrategy.OnPush, template: "<aside class=\"warning-message\" role=\"alert\">\n  <header class=\"warning-message__header\">\n    <ion-icon class=\"warning-message__icon\" [src]=\"icon\" aria-hidden=\"true\"></ion-icon>\n    @if (title) {\n      <strong class=\"warning-message__title\">{{ title }}</strong>\n    }\n  </header>\n  <p class=\"warning-message__description\">{{ message }}</p>\n</aside>\n", styles: [":host {\n  display: block;\n}\n\n.warning-message {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 5px;\n  padding: 9px 10px;\n  border: 1px solid var(--fv-warning-border);\n  border-left: 3px solid var(--fv-warning-accent);\n  border-radius: 5px 11px 11px 5px;\n  background: linear-gradient(\n    135deg,\n    var(--fv-warning-surface-soft) 0%,\n    var(--fv-warning-surface) 100%\n  );\n  color: var(--fv-warning-text);\n  box-shadow: 0 3px 10px color-mix(in srgb, var(--fv-warning-strong) 5%, transparent);\n}\n\n.warning-message__header {\n  display: flex;\n  width: 100%;\n  align-items: center;\n  gap: 7px;\n}\n\n.warning-message__icon {\n  box-sizing: border-box;\n  width: 15px;\n  height: 15px;\n  flex: 0 0 15px;\n  padding: 0;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  color: var(--fv-warning-strong);\n}\n\n.warning-message__title {\n  color: var(--fv-warning-dark);\n  font-size: 11px;\n  font-weight: 750;\n  line-height: 1.35;\n}\n\n.warning-message__description {\n  width: 100%;\n  margin: 0;\n  color: var(--fv-warning-text);\n  font-size: 10px;\n  line-height: 1.4;\n}\n\n@media (max-width: 360px) {\n  .warning-message {\n    gap: 5px;\n    padding: 8px 9px;\n  }\n\n  .warning-message__icon {\n    width: 15px;\n    height: 15px;\n    flex-basis: 15px;\n    padding: 0;\n  }\n}\n"] }]
    }], null, { title: [{
            type: Input
        }], message: [{
            type: Input,
            args: [{ required: true }]
        }], icon: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(WarningMessageComponent, { className: "WarningMessageComponent", filePath: "src/app/shared/components/warning-message/warning-message.component.ts", lineNumber: 12 }); })();
//# sourceMappingURL=warning-message.component.js.map