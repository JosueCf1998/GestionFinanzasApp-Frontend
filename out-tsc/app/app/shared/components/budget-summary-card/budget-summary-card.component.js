import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { ItemIconComponent } from '../item-icon/item-icon.component';
import { CircularProgressComponent } from '../circular-progress/circular-progress.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function BudgetSummaryCardComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.title);
} }
function BudgetSummaryCardComponent_p_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵelement(1, "ion-icon", 15);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.dateRange, " ");
} }
function BudgetSummaryCardComponent_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵelement(1, "i");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("data-status", ctx_r0.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r0.statusLabel, " ");
} }
function BudgetSummaryCardComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "app-item-icon", 17);
    i0.ɵɵelementStart(2, "span", 12);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.balanceLabel);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("summary-card__balance", ctx_r0.status !== "EXCEEDED")("summary-card__balance--danger", ctx_r0.status === "EXCEEDED");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r0.currencySymbol, " ", i0.ɵɵpipeBind2(6, 7, ctx_r0.balance, "1.2-2"), " ");
} }
export class BudgetSummaryCardComponent {
    constructor() {
        this.mode = 'period';
        this.appearance = 'layered';
        this.title = '';
        this.headline = '';
        this.dateRange = '';
        this.icon = 'wallet';
        this.color = '#ffffff';
        this.status = 'ON_TRACK';
        this.statusLabel = '';
        this.progress = 0;
        this.budgeted = 0;
        this.used = 0;
        this.balance = 0;
        this.balanceLabel = 'Disponible';
        this.currencySymbol = 'S/';
    }
    get showBalance() {
        return this.mode === 'budget';
    }
    static { this.ɵfac = function BudgetSummaryCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BudgetSummaryCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BudgetSummaryCardComponent, selectors: [["app-budget-summary-card"]], inputs: { mode: "mode", appearance: "appearance", title: "title", headline: "headline", dateRange: "dateRange", icon: "icon", color: "color", status: "status", statusLabel: "statusLabel", progress: "progress", budgeted: "budgeted", used: "used", balance: "balance", balanceLabel: "balanceLabel", currencySymbol: "currencySymbol" }, decls: 28, vars: 27, consts: [[1, "summary-card"], [1, "summary-card__hero"], [1, "summary-card__top"], [1, "summary-card__identity"], ["size", "md", "variant", "glass", 3, "icon", "color"], [1, "summary-card__content"], ["class", "summary-card__eyebrow", 4, "ngIf"], [4, "ngIf"], ["class", "summary-card__status", 4, "ngIf"], ["label", "Utilizado", "ariaLabel", "Porcentaje utilizado", 3, "progress", "size"], [1, "summary-card__metrics"], ["icon", "budget-wallet", "color", "#6747df", "size", "xs", "variant", "soft", "aria-hidden", "true"], [1, "summary-card__metric-label"], ["icon", "bills", "color", "#3657df", "size", "xs", "variant", "soft", "aria-hidden", "true"], [1, "summary-card__eyebrow"], ["src", "assets/icon/calendar.svg", "aria-hidden", "true"], [1, "summary-card__status"], ["icon", "money-bag", "color", "#12813d", "size", "xs", "variant", "soft", "aria-hidden", "true"]], template: function BudgetSummaryCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "article", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵelement(4, "app-item-icon", 4);
            i0.ɵɵelementStart(5, "div", 5);
            i0.ɵɵtemplate(6, BudgetSummaryCardComponent_span_6_Template, 2, 1, "span", 6);
            i0.ɵɵelementStart(7, "h2");
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, BudgetSummaryCardComponent_p_9_Template, 3, 1, "p", 7)(10, BudgetSummaryCardComponent_span_10_Template, 3, 2, "span", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(11, "app-circular-progress", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 10)(13, "div");
            i0.ɵɵelement(14, "app-item-icon", 11);
            i0.ɵɵelementStart(15, "span", 12);
            i0.ɵɵtext(16, "Presupuestado");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "strong");
            i0.ɵɵtext(18);
            i0.ɵɵpipe(19, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div");
            i0.ɵɵelement(21, "app-item-icon", 13);
            i0.ɵɵelementStart(22, "span", 12);
            i0.ɵɵtext(23, "Utilizado");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "strong");
            i0.ɵɵtext(25);
            i0.ɵɵpipe(26, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(27, BudgetSummaryCardComponent_div_27_Template, 7, 10, "div", 7);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵstyleProp("--card-color", ctx.color);
            i0.ɵɵclassProp("summary-card--budget", ctx.mode === "budget")("summary-card--classic", ctx.appearance === "classic");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("icon", ctx.icon)("color", ctx.mode === "budget" ? ctx.color : "var(--fv-primary-light)");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.mode === "period");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.mode === "period" ? ctx.headline : ctx.title);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.dateRange);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.mode === "budget" && ctx.statusLabel);
            i0.ɵɵadvance();
            i0.ɵɵproperty("progress", ctx.progress)("size", ctx.mode === "budget" ? "sm" : "md");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("summary-card__metrics--three", ctx.showBalance);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate2("", ctx.currencySymbol, " ", i0.ɵɵpipeBind2(19, 21, ctx.budgeted, "1.2-2"), "");
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate2("", ctx.currencySymbol, " ", i0.ɵɵpipeBind2(26, 24, ctx.used, "1.2-2"), "");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.showBalance);
        } }, dependencies: [CommonModule, i1.NgIf, i1.DecimalPipe, IonIcon, ItemIconComponent, CircularProgressComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.summary-card[_ngcontent-%COMP%] {\n  --progress: 0%;\n  --card-color: var(--fv-primary-light);\n  position: relative;\n}\n\n.summary-card--classic[_ngcontent-%COMP%] {\n  isolation: isolate;\n  padding: 15px;\n  overflow: hidden;\n  border: 1px solid rgba(255, 255, 255, .16);\n  border-radius: 20px;\n  background:\n    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--card-color) 26%, transparent), transparent 38%),\n    var(--fv-gradient-primary);\n  box-shadow: var(--fv-shadow-primary);\n  color: #fff;\n}\n\n.summary-card__hero[_ngcontent-%COMP%] {\n  position: relative;\n  isolation: isolate;\n  padding: 13px 13px 40px;\n  overflow: hidden;\n  border: 1px solid rgba(255, 255, 255, .16);\n  border-radius: 16px 16px 5px 5px;\n  background:\n    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--card-color) 26%, transparent), transparent 38%),\n    var(--fv-gradient-primary);\n  box-shadow: var(--fv-shadow-primary);\n  color: #fff;\n}\n\n.summary-card--classic[_ngcontent-%COMP%]   .summary-card__hero[_ngcontent-%COMP%] {\n  position: static;\n  padding: 0;\n  overflow: visible;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  box-shadow: none;\n}\n\n.summary-card--classic[_ngcontent-%COMP%]   .summary-card__hero[_ngcontent-%COMP%]::before, \n.summary-card--classic[_ngcontent-%COMP%]   .summary-card__hero[_ngcontent-%COMP%]::after {\n  display: none;\n}\n\n.summary-card__hero[_ngcontent-%COMP%]::before, \n.summary-card__hero[_ngcontent-%COMP%]::after {\n  position: absolute;\n  z-index: -1;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, .055);\n  content: '';\n}\n\n.summary-card__hero[_ngcontent-%COMP%]::before {\n  top: -62px;\n  right: -42px;\n  width: 142px;\n  height: 142px;\n}\n\n.summary-card__hero[_ngcontent-%COMP%]::after {\n  right: 72px;\n  bottom: -86px;\n  width: 150px;\n  height: 150px;\n}\n\n.summary-card__top[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 76px;\n  align-items: center;\n  gap: 11px;\n  min-height: 66px;\n}\n\n.summary-card__identity[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 11px;\n}\n\n.summary-card__content[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.summary-card__eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 3px;\n  color: rgba(255, 255, 255, .72);\n  font-size: var(--fv-type-caption-2);\n  font-weight: var(--fv-fw-semibold);\n  letter-spacing: .07em;\n  text-transform: uppercase;\n}\n\n.summary-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  overflow-wrap: anywhere;\n  color: #fff;\n  font-size: var(--fv-type-title-3);\n  font-weight: var(--fv-fw-bold);\n  letter-spacing: -.02em;\n  line-height: 1.2;\n}\n\n.summary-card--budget[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: var(--fv-type-footnote);\n}\n\n.summary-card--budget[_ngcontent-%COMP%]   .summary-card__top[_ngcontent-%COMP%] {\n  grid-template-columns: minmax(0, 1fr) 64px;\n  gap: 11px;\n}\n\n.summary-card__content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  margin: 5px 0 0;\n  color: rgba(255, 255, 255, .72);\n  font-size: var(--fv-type-caption-2);\n}\n\n.summary-card__content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n}\n\n.summary-card__status[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  margin-top: 6px;\n  padding: 3px 7px 3px 5px;\n  border: 1px solid color-mix(in srgb, var(--fv-success) 32%, transparent);\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--fv-success) 24%, transparent);\n  color: #d9ffe5;\n  font-size: 8.5px;\n  font-weight: var(--fv-fw-semibold);\n}\n\n.summary-card__status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: currentColor;\n}\n\n.summary-card__status[data-status='WARNING'][_ngcontent-%COMP%] {\n  border-color: color-mix(in srgb, var(--fv-warning) 36%, transparent);\n  background: color-mix(in srgb, var(--fv-warning) 24%, transparent);\n  color: #fff1c7;\n}\n\n.summary-card__status[data-status='EXCEEDED'][_ngcontent-%COMP%] {\n  border-color: color-mix(in srgb, var(--fv-danger) 36%, transparent);\n  background: color-mix(in srgb, var(--fv-danger) 24%, transparent);\n  color: #ffe1e1;\n}\n\n.summary-card__metrics[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.summary-card__metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.summary-card__metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  position: relative;\n  z-index: 2;\n  margin: -28px 8px 0;\n  padding: 9px 7px 10px;\n  border: 1px solid rgba(222, 226, 237, .9);\n  border-radius: 13px;\n  background: rgba(255, 255, 255, .98);\n  box-shadow: 0 6px 17px rgba(24, 10, 83, .085);\n}\n\n.summary-card--classic[_ngcontent-%COMP%]   .summary-card__metrics[_ngcontent-%COMP%] {\n  margin: 13px -15px -15px;\n  padding: 12px 15px 13px;\n  border: 0;\n  border-top: 1px solid rgba(255, 255, 255, .14);\n  border-radius: 0;\n  background: rgba(24, 10, 83, .2);\n  box-shadow: none;\n}\n\n.summary-card--classic[_ngcontent-%COMP%]   .summary-card__metrics[_ngcontent-%COMP%]   app-item-icon[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.summary-card--classic[_ngcontent-%COMP%]   .summary-card__metrics[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.summary-card--classic[_ngcontent-%COMP%]   .summary-card__metric-label[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  color: rgba(255, 255, 255, .7);\n  font-weight: var(--fv-fw-regular);\n}\n\n.summary-card--classic[_ngcontent-%COMP%]   .summary-card__metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 15px;\n}\n\n.summary-card--classic[_ngcontent-%COMP%]   .summary-card__metrics[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  margin-left: 14px;\n  padding-left: 14px;\n  border-left-color: rgba(255, 255, 255, .2);\n}\n\n.summary-card--classic[_ngcontent-%COMP%]   .summary-card__metrics[_ngcontent-%COMP%]:not(.summary-card__metrics--three)    > div[_ngcontent-%COMP%] {\n  padding-right: 0;\n}\n\n.summary-card--classic[_ngcontent-%COMP%]   .summary-card__metrics[_ngcontent-%COMP%]:not(.summary-card__metrics--three)    > div[_ngcontent-%COMP%]:first-child {\n  padding-left: 0;\n}\n\n.summary-card__metrics--three[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.summary-card__metrics[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  justify-items: center;\n}\n\n.summary-card__metrics[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  margin-left: 0;\n  padding-left: 0;\n  border-left: 1px solid #e4e7f0;\n}\n\n.summary-card__metric-label[_ngcontent-%COMP%] {\n  margin: 3px 0 2px;\n  color: #667085;\n  font-size: 11px;\n  font-weight: var(--fv-fw-medium);\n}\n\n.summary-card__metrics[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  max-width: 100%;\n  color: #25206f;\n  font-size: 13px;\n  font-weight: var(--fv-fw-bold);\n  font-variant-numeric: tabular-nums;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.summary-card__metrics--three[_ngcontent-%COMP%]   .summary-card__metric-label[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n}\n\n.summary-card__metrics--three[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n}\n\n.summary-card__metrics[_ngcontent-%COMP%]:not(.summary-card__metrics--three)    > div[_ngcontent-%COMP%] {\n  padding-right: 14px;\n  padding-left: 14px;\n}\n\n.summary-card__balance[_ngcontent-%COMP%] {\n  color: #166534;\n}\n\n.summary-card__balance--danger[_ngcontent-%COMP%] {\n  color: var(--fv-danger) !important;\n}\n\n@media (max-width: 360px) {\n  .summary-card__hero[_ngcontent-%COMP%] {\n    padding: 12px;\n    padding-bottom: 39px;\n  }\n\n  .summary-card__metrics[_ngcontent-%COMP%] {\n    margin-top: -27px;\n    margin-right: 7px;\n    margin-bottom: 0;\n    margin-left: 7px;\n    padding-right: 5px;\n    padding-left: 5px;\n  }\n\n  .summary-card__top[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr) 68px;\n    gap: 10px;\n  }\n\n  .summary-card__metrics[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n    margin-left: 7px;\n    padding-left: 7px;\n  }\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BudgetSummaryCardComponent, [{
        type: Component,
        args: [{ selector: 'app-budget-summary-card', standalone: true, imports: [CommonModule, IonIcon, ItemIconComponent, CircularProgressComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<article\n  class=\"summary-card\"\n  [class.summary-card--budget]=\"mode === 'budget'\"\n  [class.summary-card--classic]=\"appearance === 'classic'\"\n  [style.--card-color]=\"color\">\n  <div class=\"summary-card__hero\">\n    <div class=\"summary-card__top\">\n      <div class=\"summary-card__identity\">\n        <app-item-icon\n          [icon]=\"icon\"\n          [color]=\"mode === 'budget' ? color : 'var(--fv-primary-light)'\"\n          size=\"md\"\n          variant=\"glass\">\n        </app-item-icon>\n\n        <div class=\"summary-card__content\">\n          <span *ngIf=\"mode === 'period'\" class=\"summary-card__eyebrow\">{{ title }}</span>\n          <h2>{{ mode === 'period' ? headline : title }}</h2>\n\n          <p *ngIf=\"dateRange\">\n            <ion-icon src=\"assets/icon/calendar.svg\" aria-hidden=\"true\"></ion-icon>\n            {{ dateRange }}\n          </p>\n\n          <span\n            *ngIf=\"mode === 'budget' && statusLabel\"\n            class=\"summary-card__status\"\n            [attr.data-status]=\"status\">\n            <i></i>{{ statusLabel }}\n          </span>\n        </div>\n      </div>\n\n      <app-circular-progress\n        [progress]=\"progress\"\n        label=\"Utilizado\"\n        ariaLabel=\"Porcentaje utilizado\"\n        [size]=\"mode === 'budget' ? 'sm' : 'md'\">\n      </app-circular-progress>\n    </div>\n  </div>\n\n  <div class=\"summary-card__metrics\" [class.summary-card__metrics--three]=\"showBalance\">\n    <div>\n      <app-item-icon\n        icon=\"budget-wallet\"\n        color=\"#6747df\"\n        size=\"xs\"\n        variant=\"soft\"\n        aria-hidden=\"true\">\n      </app-item-icon>\n      <span class=\"summary-card__metric-label\">Presupuestado</span>\n      <strong>{{ currencySymbol }} {{ budgeted | number:'1.2-2' }}</strong>\n    </div>\n    <div>\n      <app-item-icon\n        icon=\"bills\"\n        color=\"#3657df\"\n        size=\"xs\"\n        variant=\"soft\"\n        aria-hidden=\"true\">\n      </app-item-icon>\n      <span class=\"summary-card__metric-label\">Utilizado</span>\n      <strong>{{ currencySymbol }} {{ used | number:'1.2-2' }}</strong>\n    </div>\n    <div *ngIf=\"showBalance\">\n      <app-item-icon\n        icon=\"money-bag\"\n        color=\"#12813d\"\n        size=\"xs\"\n        variant=\"soft\"\n        aria-hidden=\"true\">\n      </app-item-icon>\n      <span class=\"summary-card__metric-label\">{{ balanceLabel }}</span>\n      <strong\n        [class.summary-card__balance]=\"status !== 'EXCEEDED'\"\n        [class.summary-card__balance--danger]=\"status === 'EXCEEDED'\">\n        {{ currencySymbol }} {{ balance | number:'1.2-2' }}\n      </strong>\n    </div>\n  </div>\n</article>\n", styles: [":host {\n  display: block;\n}\n\n.summary-card {\n  --progress: 0%;\n  --card-color: var(--fv-primary-light);\n  position: relative;\n}\n\n.summary-card--classic {\n  isolation: isolate;\n  padding: 15px;\n  overflow: hidden;\n  border: 1px solid rgba(255, 255, 255, .16);\n  border-radius: 20px;\n  background:\n    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--card-color) 26%, transparent), transparent 38%),\n    var(--fv-gradient-primary);\n  box-shadow: var(--fv-shadow-primary);\n  color: #fff;\n}\n\n.summary-card__hero {\n  position: relative;\n  isolation: isolate;\n  padding: 13px 13px 40px;\n  overflow: hidden;\n  border: 1px solid rgba(255, 255, 255, .16);\n  border-radius: 16px 16px 5px 5px;\n  background:\n    radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--card-color) 26%, transparent), transparent 38%),\n    var(--fv-gradient-primary);\n  box-shadow: var(--fv-shadow-primary);\n  color: #fff;\n}\n\n.summary-card--classic .summary-card__hero {\n  position: static;\n  padding: 0;\n  overflow: visible;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  box-shadow: none;\n}\n\n.summary-card--classic .summary-card__hero::before,\n.summary-card--classic .summary-card__hero::after {\n  display: none;\n}\n\n.summary-card__hero::before,\n.summary-card__hero::after {\n  position: absolute;\n  z-index: -1;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, .055);\n  content: '';\n}\n\n.summary-card__hero::before {\n  top: -62px;\n  right: -42px;\n  width: 142px;\n  height: 142px;\n}\n\n.summary-card__hero::after {\n  right: 72px;\n  bottom: -86px;\n  width: 150px;\n  height: 150px;\n}\n\n.summary-card__top {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 76px;\n  align-items: center;\n  gap: 11px;\n  min-height: 66px;\n}\n\n.summary-card__identity {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 11px;\n}\n\n.summary-card__content {\n  min-width: 0;\n}\n\n.summary-card__eyebrow {\n  display: block;\n  margin-bottom: 3px;\n  color: rgba(255, 255, 255, .72);\n  font-size: var(--fv-type-caption-2);\n  font-weight: var(--fv-fw-semibold);\n  letter-spacing: .07em;\n  text-transform: uppercase;\n}\n\n.summary-card h2 {\n  margin: 0;\n  overflow-wrap: anywhere;\n  color: #fff;\n  font-size: var(--fv-type-title-3);\n  font-weight: var(--fv-fw-bold);\n  letter-spacing: -.02em;\n  line-height: 1.2;\n}\n\n.summary-card--budget h2 {\n  font-size: var(--fv-type-footnote);\n}\n\n.summary-card--budget .summary-card__top {\n  grid-template-columns: minmax(0, 1fr) 64px;\n  gap: 11px;\n}\n\n.summary-card__content p {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  margin: 5px 0 0;\n  color: rgba(255, 255, 255, .72);\n  font-size: var(--fv-type-caption-2);\n}\n\n.summary-card__content p ion-icon {\n  width: 12px;\n  height: 12px;\n}\n\n.summary-card__status {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  margin-top: 6px;\n  padding: 3px 7px 3px 5px;\n  border: 1px solid color-mix(in srgb, var(--fv-success) 32%, transparent);\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--fv-success) 24%, transparent);\n  color: #d9ffe5;\n  font-size: 8.5px;\n  font-weight: var(--fv-fw-semibold);\n}\n\n.summary-card__status i {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: currentColor;\n}\n\n.summary-card__status[data-status='WARNING'] {\n  border-color: color-mix(in srgb, var(--fv-warning) 36%, transparent);\n  background: color-mix(in srgb, var(--fv-warning) 24%, transparent);\n  color: #fff1c7;\n}\n\n.summary-card__status[data-status='EXCEEDED'] {\n  border-color: color-mix(in srgb, var(--fv-danger) 36%, transparent);\n  background: color-mix(in srgb, var(--fv-danger) 24%, transparent);\n  color: #ffe1e1;\n}\n\n.summary-card__metrics span,\n.summary-card__metrics strong {\n  display: block;\n}\n\n.summary-card__metrics {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  position: relative;\n  z-index: 2;\n  margin: -28px 8px 0;\n  padding: 9px 7px 10px;\n  border: 1px solid rgba(222, 226, 237, .9);\n  border-radius: 13px;\n  background: rgba(255, 255, 255, .98);\n  box-shadow: 0 6px 17px rgba(24, 10, 83, .085);\n}\n\n.summary-card--classic .summary-card__metrics {\n  margin: 13px -15px -15px;\n  padding: 12px 15px 13px;\n  border: 0;\n  border-top: 1px solid rgba(255, 255, 255, .14);\n  border-radius: 0;\n  background: rgba(24, 10, 83, .2);\n  box-shadow: none;\n}\n\n.summary-card--classic .summary-card__metrics app-item-icon {\n  display: none;\n}\n\n.summary-card--classic .summary-card__metrics > div {\n  display: block;\n}\n\n.summary-card--classic .summary-card__metric-label {\n  margin: 0 0 4px;\n  color: rgba(255, 255, 255, .7);\n  font-weight: var(--fv-fw-regular);\n}\n\n.summary-card--classic .summary-card__metrics strong {\n  color: #fff;\n  font-size: 15px;\n}\n\n.summary-card--classic .summary-card__metrics > div + div {\n  margin-left: 14px;\n  padding-left: 14px;\n  border-left-color: rgba(255, 255, 255, .2);\n}\n\n.summary-card--classic .summary-card__metrics:not(.summary-card__metrics--three) > div {\n  padding-right: 0;\n}\n\n.summary-card--classic .summary-card__metrics:not(.summary-card__metrics--three) > div:first-child {\n  padding-left: 0;\n}\n\n.summary-card__metrics--three {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.summary-card__metrics > div {\n  display: grid;\n  min-width: 0;\n  justify-items: center;\n}\n\n.summary-card__metrics > div + div {\n  margin-left: 0;\n  padding-left: 0;\n  border-left: 1px solid #e4e7f0;\n}\n\n.summary-card__metric-label {\n  margin: 3px 0 2px;\n  color: #667085;\n  font-size: 11px;\n  font-weight: var(--fv-fw-medium);\n}\n\n.summary-card__metrics strong {\n  overflow: hidden;\n  max-width: 100%;\n  color: #25206f;\n  font-size: 13px;\n  font-weight: var(--fv-fw-bold);\n  font-variant-numeric: tabular-nums;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.summary-card__metrics--three .summary-card__metric-label {\n  font-size: 10.5px;\n}\n\n.summary-card__metrics--three strong {\n  font-size: 12.5px;\n}\n\n.summary-card__metrics:not(.summary-card__metrics--three) > div {\n  padding-right: 14px;\n  padding-left: 14px;\n}\n\n.summary-card__balance {\n  color: #166534;\n}\n\n.summary-card__balance--danger {\n  color: var(--fv-danger) !important;\n}\n\n@media (max-width: 360px) {\n  .summary-card__hero {\n    padding: 12px;\n    padding-bottom: 39px;\n  }\n\n  .summary-card__metrics {\n    margin-top: -27px;\n    margin-right: 7px;\n    margin-bottom: 0;\n    margin-left: 7px;\n    padding-right: 5px;\n    padding-left: 5px;\n  }\n\n  .summary-card__top {\n    grid-template-columns: minmax(0, 1fr) 68px;\n    gap: 10px;\n  }\n\n  .summary-card__metrics > div + div {\n    margin-left: 7px;\n    padding-left: 7px;\n  }\n}\n"] }]
    }], null, { mode: [{
            type: Input
        }], appearance: [{
            type: Input
        }], title: [{
            type: Input
        }], headline: [{
            type: Input
        }], dateRange: [{
            type: Input
        }], icon: [{
            type: Input
        }], color: [{
            type: Input
        }], status: [{
            type: Input
        }], statusLabel: [{
            type: Input
        }], progress: [{
            type: Input
        }], budgeted: [{
            type: Input
        }], used: [{
            type: Input
        }], balance: [{
            type: Input
        }], balanceLabel: [{
            type: Input
        }], currencySymbol: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BudgetSummaryCardComponent, { className: "BudgetSummaryCardComponent", filePath: "src/app/shared/components/budget-summary-card/budget-summary-card.component.ts", lineNumber: 19 }); })();
//# sourceMappingURL=budget-summary-card.component.js.map