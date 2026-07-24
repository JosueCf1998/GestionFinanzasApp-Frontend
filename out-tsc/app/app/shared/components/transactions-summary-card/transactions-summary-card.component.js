import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DonutChartComponent } from '../donut-chart/donut-chart.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class TransactionsSummaryCardComponent {
    constructor() {
        this.type = 'gasto';
        this.totalAmount = 0;
        this.currencySymbol = 'S/';
        this.periodLabel = 'Período actual';
        this.transactions = [];
    }
    get totalLabel() {
        return this.type === 'gasto' ? 'Total de gastos' : 'Total de ingresos';
    }
    get sign() {
        return this.type === 'gasto' ? '−' : '+';
    }
    get accountCount() {
        return new Set(this.transactions.map(transaction => transaction.account.id)).size;
    }
    get accountLabel() {
        return this.accountCount === 1 ? 'cuenta vinculada' : 'cuentas vinculadas';
    }
    get chartSegments() {
        const categories = new Map();
        this.transactions.forEach(transaction => {
            const amount = Number(transaction.amount);
            if (amount <= 0)
                return;
            const current = categories.get(transaction.category.id);
            categories.set(transaction.category.id, {
                value: (current?.value ?? 0) + amount,
                color: transaction.category.color
            });
        });
        return Array.from(categories.values());
    }
    get chartAriaLabel() {
        return `Distribución de ${this.type === 'gasto' ? 'gastos' : 'ingresos'} por categoría`;
    }
    static { this.ɵfac = function TransactionsSummaryCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TransactionsSummaryCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TransactionsSummaryCardComponent, selectors: [["app-transactions-summary-card"]], inputs: { type: "type", totalAmount: "totalAmount", currencySymbol: "currencySymbol", periodLabel: "periodLabel", transactions: "transactions" }, decls: 18, vars: 15, consts: [["aria-label", "Resumen de transacciones", 1, "summary-card"], [1, "summary-card__information"], [1, "summary-card__header"], [1, "summary-card__total"], [3, "segments", "ariaLabel", "tone"]], template: function TransactionsSummaryCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "header", 2)(3, "strong");
            i0.ɵɵtext(4, "Resumen del per\u00EDodo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "span");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 3)(8, "span");
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "strong");
            i0.ɵɵtext(11);
            i0.ɵɵpipe(12, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "small")(14, "b");
            i0.ɵɵtext(15);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(17, "app-donut-chart", 4);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("summary-card--income", ctx.type === "ingreso");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.periodLabel);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.totalLabel);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate3("", ctx.sign, " ", ctx.currencySymbol, " ", i0.ɵɵpipeBind2(12, 12, ctx.totalAmount, "1.2-2"), "");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.accountCount);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.accountLabel, " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("segments", ctx.chartSegments)("ariaLabel", ctx.chartAriaLabel)("tone", ctx.type === "ingreso" ? "success" : "primary");
        } }, dependencies: [CommonModule, i1.DecimalPipe, DonutChartComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.summary-card[_ngcontent-%COMP%] {\n  display: grid;\n  min-height: 158px;\n  grid-template-columns: minmax(0, 1fr) 128px;\n  align-items: center;\n  gap: 14px;\n  padding: 18px;\n  border: 1px solid rgba(220, 222, 235, .88);\n  border-radius: 20px;\n  background:\n    radial-gradient(circle at 90% 10%, rgba(91, 62, 218, .055), transparent 35%),\n    linear-gradient(145deg, #fff 0%, #fff 64%, #fbfaff 100%),\n    #fff;\n  box-shadow:\n    0 14px 30px rgba(40, 39, 82, .065),\n    0 2px 6px rgba(40, 39, 82, .025),\n    inset 0 1px 0 rgba(255, 255, 255, .9);\n}\n\n.summary-card__information[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 116px;\n  flex-direction: column;\n  justify-content: space-between;\n  min-width: 0;\n}\n\n.summary-card__header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.summary-card__header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.summary-card__total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.summary-card__total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.summary-card__header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--fv-text-primary);\n  font-size: 12.5px;\n  font-weight: 800;\n  letter-spacing: -.015em;\n}\n\n.summary-card__header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  color: #8790a7;\n  font-size: 9.5px;\n  font-weight: 600;\n}\n\n.summary-card__total[_ngcontent-%COMP%] {\n  margin-top: 18px;\n}\n\n.summary-card__total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #7e879f;\n  font-size: 10px;\n  font-weight: 650;\n}\n\n.summary-card__total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 5px;\n  color: #4930df;\n  font-size: clamp(20px, 6vw, 25px);\n  font-weight: 820;\n  font-variant-numeric: tabular-nums;\n  letter-spacing: -.045em;\n  line-height: 1.05;\n  white-space: nowrap;\n}\n\n.summary-card__total[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-top: 10px;\n  color: #8991a5;\n  font-size: 9px;\n  font-weight: 600;\n}\n\n.summary-card__total[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n  display: inline-grid;\n  min-width: 17px;\n  height: 17px;\n  padding: 0 5px;\n  border-radius: 6px;\n  background: #f0edfb;\n  color: #5d3fc4;\n  font-size: 9px;\n  font-weight: 800;\n  place-items: center;\n}\n\n.summary-card--income[_ngcontent-%COMP%]   .summary-card__total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #159961;\n}\n\n.summary-card[_ngcontent-%COMP%]    > app-donut-chart[_ngcontent-%COMP%] {\n  justify-self: end;\n}\n\n@media (max-width: 390px) {\n  .summary-card[_ngcontent-%COMP%] {\n    min-height: 152px;\n    grid-template-columns: minmax(0, 1fr) 106px;\n    gap: 8px;\n    padding: 16px 14px;\n  }\n\n  .summary-card__information[_ngcontent-%COMP%] {\n    min-height: 112px;\n  }\n\n  .summary-card__total[_ngcontent-%COMP%] {\n    margin-top: 18px;\n  }\n\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TransactionsSummaryCardComponent, [{
        type: Component,
        args: [{ selector: 'app-transactions-summary-card', standalone: true, imports: [CommonModule, DonutChartComponent], template: "<section\n  class=\"summary-card\"\n  [class.summary-card--income]=\"type === 'ingreso'\"\n  aria-label=\"Resumen de transacciones\">\n  <div class=\"summary-card__information\">\n    <header class=\"summary-card__header\">\n      <strong>Resumen del per\u00EDodo</strong>\n      <span>{{ periodLabel }}</span>\n    </header>\n\n    <div class=\"summary-card__total\">\n      <span>{{ totalLabel }}</span>\n      <strong>{{ sign }} {{ currencySymbol }} {{ totalAmount | number:'1.2-2' }}</strong>\n      <small>\n        <b>{{ accountCount }}</b>\n        {{ accountLabel }}\n      </small>\n    </div>\n\n  </div>\n\n  <app-donut-chart\n    [segments]=\"chartSegments\"\n    [ariaLabel]=\"chartAriaLabel\"\n    [tone]=\"type === 'ingreso' ? 'success' : 'primary'\">\n  </app-donut-chart>\n</section>\n", styles: [":host {\n  display: block;\n}\n\n.summary-card {\n  display: grid;\n  min-height: 158px;\n  grid-template-columns: minmax(0, 1fr) 128px;\n  align-items: center;\n  gap: 14px;\n  padding: 18px;\n  border: 1px solid rgba(220, 222, 235, .88);\n  border-radius: 20px;\n  background:\n    radial-gradient(circle at 90% 10%, rgba(91, 62, 218, .055), transparent 35%),\n    linear-gradient(145deg, #fff 0%, #fff 64%, #fbfaff 100%),\n    #fff;\n  box-shadow:\n    0 14px 30px rgba(40, 39, 82, .065),\n    0 2px 6px rgba(40, 39, 82, .025),\n    inset 0 1px 0 rgba(255, 255, 255, .9);\n}\n\n.summary-card__information {\n  display: flex;\n  min-height: 116px;\n  flex-direction: column;\n  justify-content: space-between;\n  min-width: 0;\n}\n\n.summary-card__header strong,\n.summary-card__header span,\n.summary-card__total span,\n.summary-card__total strong {\n  display: block;\n}\n\n.summary-card__header strong {\n  color: var(--fv-text-primary);\n  font-size: 12.5px;\n  font-weight: 800;\n  letter-spacing: -.015em;\n}\n\n.summary-card__header span {\n  margin-top: 6px;\n  color: #8790a7;\n  font-size: 9.5px;\n  font-weight: 600;\n}\n\n.summary-card__total {\n  margin-top: 18px;\n}\n\n.summary-card__total span {\n  color: #7e879f;\n  font-size: 10px;\n  font-weight: 650;\n}\n\n.summary-card__total strong {\n  margin-top: 5px;\n  color: #4930df;\n  font-size: clamp(20px, 6vw, 25px);\n  font-weight: 820;\n  font-variant-numeric: tabular-nums;\n  letter-spacing: -.045em;\n  line-height: 1.05;\n  white-space: nowrap;\n}\n\n.summary-card__total small {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  margin-top: 10px;\n  color: #8991a5;\n  font-size: 9px;\n  font-weight: 600;\n}\n\n.summary-card__total small b {\n  display: inline-grid;\n  min-width: 17px;\n  height: 17px;\n  padding: 0 5px;\n  border-radius: 6px;\n  background: #f0edfb;\n  color: #5d3fc4;\n  font-size: 9px;\n  font-weight: 800;\n  place-items: center;\n}\n\n.summary-card--income .summary-card__total strong {\n  color: #159961;\n}\n\n.summary-card > app-donut-chart {\n  justify-self: end;\n}\n\n@media (max-width: 390px) {\n  .summary-card {\n    min-height: 152px;\n    grid-template-columns: minmax(0, 1fr) 106px;\n    gap: 8px;\n    padding: 16px 14px;\n  }\n\n  .summary-card__information {\n    min-height: 112px;\n  }\n\n  .summary-card__total {\n    margin-top: 18px;\n  }\n\n}\n"] }]
    }], null, { type: [{
            type: Input
        }], totalAmount: [{
            type: Input
        }], currencySymbol: [{
            type: Input
        }], periodLabel: [{
            type: Input
        }], transactions: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TransactionsSummaryCardComponent, { className: "TransactionsSummaryCardComponent", filePath: "src/app/shared/components/transactions-summary-card/transactions-summary-card.component.ts", lineNumber: 18 }); })();
//# sourceMappingURL=transactions-summary-card.component.js.map