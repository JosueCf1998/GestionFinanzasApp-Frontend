import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { ItemIconComponent } from '../item-icon/item-icon.component';
import * as i0 from "@angular/core";
function BudgetPreviewCardComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵtextInterpolate2(" ", ctx_r0.categoryCount, " ", ctx_r0.categoryCount === 1 ? "asignada" : "asignadas", " ");
} }
function BudgetPreviewCardComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Sin asignar ");
} }
export class BudgetPreviewCardComponent {
    constructor() {
        this.name = '';
        this.icon = 'wallet';
        this.color = 'var(--fv-primary)';
        this.budgetTotal = 0;
        this.categoryCount = 0;
        this.startDate = '';
        this.endDate = '';
        this.personalize = new EventEmitter();
    }
    formatDate(value) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
            return 'Por definir';
        return new Intl.DateTimeFormat('es-PE', {
            day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
        }).format(new Date(`${value}T00:00:00Z`));
    }
    formatAmount(value) {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(Number.isFinite(value) ? value : 0);
    }
    static { this.ɵfac = function BudgetPreviewCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BudgetPreviewCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BudgetPreviewCardComponent, selectors: [["app-budget-preview-card"]], inputs: { name: "name", icon: "icon", color: "color", budgetTotal: "budgetTotal", categoryCount: "categoryCount", startDate: "startDate", endDate: "endDate" }, outputs: { personalize: "personalize" }, decls: 28, vars: 7, consts: [["aria-label", "Vista previa del presupuesto"], ["type", "button", "aria-label", "Cambiar color e icono del presupuesto", 3, "click"], ["size", "xl", "variant", "soft", 3, "icon", "color"], ["src", "assets/icon/edit.svg"], [1, "financial-summary"], [1, "date-range"], ["src", "assets/icon/calendar.svg", "aria-hidden", "true"], ["aria-hidden", "true"]], template: function BudgetPreviewCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "article", 0)(1, "button", 1);
            i0.ɵɵlistener("click", function BudgetPreviewCardComponent_Template_button_click_1_listener() { return ctx.personalize.emit(); });
            i0.ɵɵelement(2, "app-item-icon", 2);
            i0.ɵɵelementStart(3, "span");
            i0.ɵɵelement(4, "ion-icon", 3);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(5, "div")(6, "h2");
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "dl", 4)(9, "div")(10, "dt");
            i0.ɵɵtext(11, "Presupuesto total");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "dd");
            i0.ɵɵtext(13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div")(15, "dt");
            i0.ɵɵtext(16, "Categor\u00EDas");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "dd");
            i0.ɵɵtemplate(18, BudgetPreviewCardComponent_Conditional_18_Template, 1, 2)(19, BudgetPreviewCardComponent_Conditional_19_Template, 1, 0);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "p", 5);
            i0.ɵɵelement(21, "ion-icon", 6);
            i0.ɵɵelementStart(22, "span");
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span", 7);
            i0.ɵɵtext(25, "\u2014");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "span");
            i0.ɵɵtext(27);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("icon", ctx.icon)("color", ctx.color);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.name || "Nuevo presupuesto");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.budgetTotal > 0 ? ctx.formatAmount(ctx.budgetTotal) : "Por asignar");
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.categoryCount > 0 ? 18 : 19);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.formatDate(ctx.startDate));
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.formatDate(ctx.endDate));
        } }, dependencies: [IonIcon, ItemIconComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\narticle[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  min-height: 120px;\n  padding: 18px;\n  overflow: hidden;\n  border: 1px solid #ececf3;\n  border-radius: 20px;\n  background: #fff;\n  box-shadow: 0 8px 24px rgba(31, 37, 76, .06);\n}\n\narticle[_ngcontent-%COMP%]::before, \narticle[_ngcontent-%COMP%]::after {\n  position: absolute;\n  border-radius: 50%;\n  content: '';\n  pointer-events: none;\n}\n\narticle[_ngcontent-%COMP%]::before {\n  top: -78px;\n  right: -54px;\n  width: 150px;\n  height: 150px;\n  background: rgba(67, 97, 238, .055);\n}\n\narticle[_ngcontent-%COMP%]::after {\n  bottom: -92px;\n  left: -68px;\n  width: 160px;\n  height: 160px;\n  background: rgba(58, 12, 163, .035);\n}\n\narticle[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: 68px;\n  height: 68px;\n  flex: 0 0 68px;\n  padding: 0;\n  border: 0;\n  border-radius: 18px;\n  background: transparent;\n  box-shadow: none;\n  cursor: pointer;\n  place-items: center;\n}\n\narticle[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]:active {\n  transform: scale(.97);\n}\n\narticle[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid rgba(67, 24, 184, .16);\n  outline-offset: 3px;\n}\n\narticle[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  position: absolute;\n  right: -4px;\n  bottom: -4px;\n  display: grid;\n  width: 25px;\n  height: 25px;\n  border: 2px solid #fff;\n  border-radius: 9px;\n  background: #fff;\n  color: var(--fv-primary, #3a0ca3);\n  box-shadow: 0 5px 14px rgba(31, 37, 76, .12);\n  place-items: center;\n}\n\narticle[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n}\n\narticle[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  min-width: 0;\n  flex: 1;\n}\n\nh2[_ngcontent-%COMP%] {\n  margin: 0 0 13px;\n  color: var(--fv-text-primary, #202737);\n  font-size: 15px;\n  font-weight: 760;\n  letter-spacing: -.018em;\n  line-height: 1.3;\n  overflow-wrap: anywhere;\n}\n\n.financial-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.15fr .85fr;\n  gap: 0;\n  margin: 0;\n}\n\n.financial-summary[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding-right: 13px;\n}\n\n.financial-summary[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  padding-right: 0;\n  padding-left: 13px;\n  border-left: 1px solid rgba(58, 12, 163, .12);\n}\n\ndt[_ngcontent-%COMP%] {\n  color: #7e8498;\n  font-size: 8px;\n  font-weight: 700;\n  letter-spacing: .045em;\n  line-height: 1.2;\n  text-transform: uppercase;\n}\n\ndd[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  overflow: hidden;\n  color: #252b38;\n  font-size: 13px;\n  font-weight: 780;\n  letter-spacing: -.025em;\n  font-variant-numeric: tabular-nums;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.financial-summary[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child   dd[_ngcontent-%COMP%] {\n  color: var(--fv-primary, #3a0ca3);\n  font-size: 15px;\n}\n\n.date-range[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  margin: 10px 0 0;\n  color: #778096;\n  font-size: 10px;\n  font-weight: 500;\n  line-height: 1.25;\n}\n\n.date-range[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  margin-right: 1px;\n  color: var(--fv-primary-light, #4361ee);\n}\n\n@media (max-width: 420px) {\n  article[_ngcontent-%COMP%] {\n    gap: 13px;\n    min-height: 114px;\n    padding: 16px 14px 16px 16px;\n  }\n\n  article[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n    width: 62px;\n    height: 62px;\n    flex-basis: 62px;\n  }\n\n  .financial-summary[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child   dd[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n}\n\n@media (max-width: 350px) {\n  article[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n\n  article[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] {\n    width: 56px;\n    height: 56px;\n    flex-basis: 56px;\n  }\n\n  .financial-summary[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n\n  .financial-summary[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n    padding: 8px 0 0;\n    border-top: 1px solid rgba(58, 12, 163, .12);\n    border-left: 0;\n  }\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BudgetPreviewCardComponent, [{
        type: Component,
        args: [{ selector: 'app-budget-preview-card', standalone: true, imports: [IonIcon, ItemIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<article aria-label=\"Vista previa del presupuesto\">\n  <button\n    type=\"button\"\n    aria-label=\"Cambiar color e icono del presupuesto\"\n    (click)=\"personalize.emit()\">\n    <app-item-icon\n      [icon]=\"icon\"\n      [color]=\"color\"\n      size=\"xl\"\n      variant=\"soft\">\n    </app-item-icon>\n    <span>\n      <ion-icon src=\"assets/icon/edit.svg\"></ion-icon>\n    </span>\n  </button>\n\n  <div>\n    <h2>{{ name || 'Nuevo presupuesto' }}</h2>\n    <dl class=\"financial-summary\">\n      <div>\n        <dt>Presupuesto total</dt>\n        <dd>{{ budgetTotal > 0 ? formatAmount(budgetTotal) : 'Por asignar' }}</dd>\n      </div>\n      <div>\n        <dt>Categor\u00EDas</dt>\n        <dd>\n          @if (categoryCount > 0) {\n            {{ categoryCount }} {{ categoryCount === 1 ? 'asignada' : 'asignadas' }}\n          } @else {\n            Sin asignar\n          }\n        </dd>\n      </div>\n    </dl>\n    <p class=\"date-range\">\n      <ion-icon src=\"assets/icon/calendar.svg\" aria-hidden=\"true\"></ion-icon>\n      <span>{{ formatDate(startDate) }}</span>\n      <span aria-hidden=\"true\">\u2014</span>\n      <span>{{ formatDate(endDate) }}</span>\n    </p>\n  </div>\n</article>\n", styles: [":host {\n  display: block;\n}\n\narticle {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  min-height: 120px;\n  padding: 18px;\n  overflow: hidden;\n  border: 1px solid #ececf3;\n  border-radius: 20px;\n  background: #fff;\n  box-shadow: 0 8px 24px rgba(31, 37, 76, .06);\n}\n\narticle::before,\narticle::after {\n  position: absolute;\n  border-radius: 50%;\n  content: '';\n  pointer-events: none;\n}\n\narticle::before {\n  top: -78px;\n  right: -54px;\n  width: 150px;\n  height: 150px;\n  background: rgba(67, 97, 238, .055);\n}\n\narticle::after {\n  bottom: -92px;\n  left: -68px;\n  width: 160px;\n  height: 160px;\n  background: rgba(58, 12, 163, .035);\n}\n\narticle > button {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: 68px;\n  height: 68px;\n  flex: 0 0 68px;\n  padding: 0;\n  border: 0;\n  border-radius: 18px;\n  background: transparent;\n  box-shadow: none;\n  cursor: pointer;\n  place-items: center;\n}\n\narticle > button:active {\n  transform: scale(.97);\n}\n\narticle > button:focus-visible {\n  outline: 3px solid rgba(67, 24, 184, .16);\n  outline-offset: 3px;\n}\n\narticle > button > span {\n  position: absolute;\n  right: -4px;\n  bottom: -4px;\n  display: grid;\n  width: 25px;\n  height: 25px;\n  border: 2px solid #fff;\n  border-radius: 9px;\n  background: #fff;\n  color: var(--fv-primary, #3a0ca3);\n  box-shadow: 0 5px 14px rgba(31, 37, 76, .12);\n  place-items: center;\n}\n\narticle > button ion-icon {\n  width: 14px;\n  height: 14px;\n}\n\narticle > div {\n  position: relative;\n  z-index: 1;\n  min-width: 0;\n  flex: 1;\n}\n\nh2 {\n  margin: 0 0 13px;\n  color: var(--fv-text-primary, #202737);\n  font-size: 15px;\n  font-weight: 760;\n  letter-spacing: -.018em;\n  line-height: 1.3;\n  overflow-wrap: anywhere;\n}\n\n.financial-summary {\n  display: grid;\n  grid-template-columns: 1.15fr .85fr;\n  gap: 0;\n  margin: 0;\n}\n\n.financial-summary > div {\n  min-width: 0;\n  padding-right: 13px;\n}\n\n.financial-summary > div + div {\n  padding-right: 0;\n  padding-left: 13px;\n  border-left: 1px solid rgba(58, 12, 163, .12);\n}\n\ndt {\n  color: #7e8498;\n  font-size: 8px;\n  font-weight: 700;\n  letter-spacing: .045em;\n  line-height: 1.2;\n  text-transform: uppercase;\n}\n\ndd {\n  margin: 4px 0 0;\n  overflow: hidden;\n  color: #252b38;\n  font-size: 13px;\n  font-weight: 780;\n  letter-spacing: -.025em;\n  font-variant-numeric: tabular-nums;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.financial-summary > div:first-child dd {\n  color: var(--fv-primary, #3a0ca3);\n  font-size: 15px;\n}\n\n.date-range {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  margin: 10px 0 0;\n  color: #778096;\n  font-size: 10px;\n  font-weight: 500;\n  line-height: 1.25;\n}\n\n.date-range ion-icon {\n  width: 12px;\n  height: 12px;\n  margin-right: 1px;\n  color: var(--fv-primary-light, #4361ee);\n}\n\n@media (max-width: 420px) {\n  article {\n    gap: 13px;\n    min-height: 114px;\n    padding: 16px 14px 16px 16px;\n  }\n\n  article > button {\n    width: 62px;\n    height: 62px;\n    flex-basis: 62px;\n  }\n\n  .financial-summary > div:first-child dd {\n    font-size: 14px;\n  }\n}\n\n@media (max-width: 350px) {\n  article {\n    align-items: flex-start;\n  }\n\n  article > button {\n    width: 56px;\n    height: 56px;\n    flex-basis: 56px;\n  }\n\n  .financial-summary {\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n\n  .financial-summary > div + div {\n    padding: 8px 0 0;\n    border-top: 1px solid rgba(58, 12, 163, .12);\n    border-left: 0;\n  }\n}\n"] }]
    }], null, { name: [{
            type: Input
        }], icon: [{
            type: Input
        }], color: [{
            type: Input
        }], budgetTotal: [{
            type: Input
        }], categoryCount: [{
            type: Input
        }], startDate: [{
            type: Input
        }], endDate: [{
            type: Input
        }], personalize: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BudgetPreviewCardComponent, { className: "BudgetPreviewCardComponent", filePath: "src/app/shared/components/budget-preview-card/budget-preview-card.component.ts", lineNumber: 13 }); })();
//# sourceMappingURL=budget-preview-card.component.js.map