import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import { FeatureHeaderComponent } from 'src/app/shared/components/feature-header/feature-header.component';
import { FloatingActionButtonComponent } from 'src/app/shared/components/floating-action-button/floating-action-button.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { AmountListItemComponent } from 'src/app/shared/components/amount-list-item/amount-list-item.component';
import { PeriodSummaryCardComponent } from 'src/app/shared/components/period-summary-card/period-summary-card.component';
import 'src/app/core/utils/observable-extensions';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/use-cases/transactions/filter-transactions.usecase";
import * as i2 from "src/app/core/services/navigation.service";
import * as i3 from "@angular/common";
const _c0 = () => [1, 2, 3, 4];
function TransactionsPage_div_6_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "i")(2, "span");
    i0.ɵɵelementEnd();
} }
function TransactionsPage_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵtemplate(1, TransactionsPage_div_6_div_1_Template, 3, 0, "div", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c0));
} }
function TransactionsPage_div_7_app_amount_list_item_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-amount-list-item", 14);
} if (rf & 2) {
    const transaction_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("title", (transaction_r1.description == null ? null : transaction_r1.description.trim()) || transaction_r1.category.name)("subtitle", transaction_r1.category.name + " \u00B7 " + transaction_r1.account.name)("icon", transaction_r1.category.icon)("color", transaction_r1.category.color)("amount", transaction_r1.amount)("amountPrefix", transaction_r1.type === "gasto" ? "\u2212" : "+")("amountTone", transaction_r1.type === "ingreso" ? "success" : "default")("currencySymbol", ctx_r1.currencySymbol);
} }
function TransactionsPage_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtemplate(1, TransactionsPage_div_7_app_amount_list_item_1_Template, 1, 8, "app-amount-list-item", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.transactions)("ngForTrackBy", ctx_r1.trackByTransaction);
} }
function TransactionsPage_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelement(1, "app-item-icon", 16);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Sin movimientos");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("A\u00FAn no tienes ", ctx_r1.selectedType === "gasto" ? "gastos" : "ingresos", " registrados.");
} }
function TransactionsPage_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵelement(1, "app-item-icon", 17);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "No se pudieron cargar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Revisa tu conexi\u00F3n e int\u00E9ntalo nuevamente.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 18);
    i0.ɵɵlistener("click", function TransactionsPage_div_9_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadTransactions()); });
    i0.ɵɵtext(7, "Reintentar");
    i0.ɵɵelementEnd()();
} }
export class TransactionsPage {
    constructor(filterTransactionsUseCase, navService) {
        this.filterTransactionsUseCase = filterTransactionsUseCase;
        this.navService = navService;
        this.transactionTypes = [
            { value: 'gasto', label: 'Gastos' },
            { value: 'ingreso', label: 'Ingresos' }
        ];
        this.currencySymbol = 'S/';
        this.selectedType = 'gasto';
        this.transactions = [];
        this.isLoading = false;
        this.hasError = false;
    }
    ngOnInit() {
        this.loadTransactions();
    }
    get totalAmount() {
        return this.transactions.reduce((total, transaction) => total + transaction.amount, 0);
    }
    get totalLabel() {
        return this.selectedType === 'gasto' ? 'Total de gastos' : 'Total de ingresos';
    }
    get amountPrefix() {
        return this.selectedType === 'gasto' ? '−' : '+';
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
        return `Distribución de ${this.selectedType === 'gasto' ? 'gastos' : 'ingresos'} por categoría`;
    }
    get periodLabel() {
        if (!this.transactions.length)
            return 'Sin movimientos registrados';
        const dates = this.transactions
            .map(transaction => transaction.date.slice(0, 10))
            .sort();
        const firstDate = this.formatShortDate(dates[0]);
        const lastDate = this.formatShortDate(dates[dates.length - 1]);
        return firstDate === lastDate ? firstDate : `${firstDate} – ${lastDate}`;
    }
    changeType(value) {
        if (value !== 'gasto' && value !== 'ingreso')
            return;
        this.selectedType = value;
        this.loadTransactions();
    }
    loadTransactions() {
        this.isLoading = true;
        this.hasError = false;
        this.filterTransactionsUseCase.execute({
            type: this.selectedType
        }).service({
            success: data => {
                this.transactions = [...(data?.items ?? [])].sort((first, second) => second.date.localeCompare(first.date) || second.id - first.id);
                this.isLoading = false;
            },
            failure: () => {
                this.transactions = [];
                this.isLoading = false;
                this.hasError = true;
            }
        });
    }
    createTransaction() {
        void this.navService.forward('/home/create');
    }
    trackByTransaction(_, transaction) {
        return transaction.id;
    }
    formatShortDate(value) {
        return new Intl.DateTimeFormat('es-PE', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC'
        })
            .format(new Date(`${value}T00:00:00Z`))
            .replace(/\./g, '');
    }
    static { this.ɵfac = function TransactionsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TransactionsPage)(i0.ɵɵdirectiveInject(i1.FilterTransactionsUseCase), i0.ɵɵdirectiveInject(i2.NavigationService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TransactionsPage, selectors: [["app-transactions"]], decls: 11, vars: 17, consts: [[1, "transactions-page", 3, "fullscreen"], [1, "transactions"], ["title", "Transacciones", "description", "Consulta y controla todos tus movimientos.", "imageSrc", "assets/image/budget-chart.png"], ["title", "Resumen del per\u00EDodo", 3, "totalLabel", "totalAmount", "amountPrefix", "metaValue", "metaLabel", "chartSegments", "chartAriaLabel", "chartTone", "periodLabel", "currencySymbol"], [3, "modelChange", "options", "model"], ["title", "Movimientos", "appearance", "plain"], ["class", "transactions-loading", "aria-label", "Cargando transacciones", 4, "ngIf"], ["class", "transactions-list", 4, "ngIf"], ["class", "transactions-empty", 4, "ngIf"], ["icon", "add", "ariaLabel", "Registrar transacci\u00F3n", 3, "clicked"], ["aria-label", "Cargando transacciones", 1, "transactions-loading"], [4, "ngFor", "ngForOf"], [1, "transactions-list"], [3, "title", "subtitle", "icon", "color", "amount", "amountPrefix", "amountTone", "currencySymbol", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "title", "subtitle", "icon", "color", "amount", "amountPrefix", "amountTone", "currencySymbol"], [1, "transactions-empty"], ["icon", "bills", "color", "var(--fv-primary)", "size", "lg", "variant", "soft", "aria-hidden", "true"], ["icon", "alert-triangle", "color", "var(--fv-danger)", "size", "lg", "variant", "soft", "aria-hidden", "true"], ["type", "button", 3, "click"]], template: function TransactionsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-content", 0)(1, "main", 1);
            i0.ɵɵelement(2, "app-feature-header", 2)(3, "app-period-summary-card", 3);
            i0.ɵɵelementStart(4, "app-custom-segment", 4);
            i0.ɵɵlistener("modelChange", function TransactionsPage_Template_app_custom_segment_modelChange_4_listener($event) { return ctx.changeType($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "app-section-card", 5);
            i0.ɵɵtemplate(6, TransactionsPage_div_6_Template, 2, 2, "div", 6)(7, TransactionsPage_div_7_Template, 2, 2, "div", 7)(8, TransactionsPage_div_8_Template, 6, 1, "div", 8)(9, TransactionsPage_div_9_Template, 8, 0, "div", 8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(10, "app-floating-action-button", 9);
            i0.ɵɵlistener("clicked", function TransactionsPage_Template_app_floating_action_button_clicked_10_listener() { return ctx.createTransaction(); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("fullscreen", true);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("totalLabel", ctx.totalLabel)("totalAmount", ctx.totalAmount)("amountPrefix", ctx.amountPrefix)("metaValue", ctx.accountCount)("metaLabel", ctx.accountLabel)("chartSegments", ctx.chartSegments)("chartAriaLabel", ctx.chartAriaLabel)("chartTone", ctx.selectedType === "ingreso" ? "success" : "primary")("periodLabel", ctx.periodLabel)("currencySymbol", ctx.currencySymbol);
            i0.ɵɵadvance();
            i0.ɵɵproperty("options", ctx.transactionTypes)("model", ctx.selectedType);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.hasError && ctx.transactions.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.hasError && ctx.transactions.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.hasError);
        } }, dependencies: [CommonModule, i3.NgForOf, i3.NgIf, IonContent,
            CustomSegmentComponent,
            FeatureHeaderComponent,
            FloatingActionButtonComponent,
            ItemIconComponent,
            SectionCardComponent,
            AmountListItemComponent,
            PeriodSummaryCardComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.transactions-page[_ngcontent-%COMP%] {\n  --background: linear-gradient(180deg, #fbfbff 0%, var(--fv-background) 100%);\n}\n\n.transactions[_ngcontent-%COMP%] {\n  display: grid;\n  width: 100%;\n  max-width: 680px;\n  margin: 0 auto;\n  padding: 16px 14px calc(92px + env(safe-area-inset-bottom));\n  gap: 18px;\n}\n\n.transactions-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 9px;\n}\n\n.transactions-loading[_ngcontent-%COMP%], \n.transactions-empty[_ngcontent-%COMP%] {\n  border: 1px solid rgba(226, 229, 238, .92);\n  border-radius: 17px;\n  background: #fff;\n  box-shadow: 0 9px 26px rgba(31, 37, 76, .05);\n}\n\n.transactions-loading[_ngcontent-%COMP%] {\n  padding: 6px 13px;\n}\n\n.transactions-loading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 62px;\n  align-items: center;\n  gap: 12px;\n}\n\n.transactions-loading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--fv-border);\n}\n\n.transactions-loading[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.transactions-loading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  border-radius: 9px;\n  background: linear-gradient(90deg, #eef0f6 25%, #f7f8fb 50%, #eef0f6 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_transactions-loading 1.25s ease-in-out infinite;\n}\n\n.transactions-loading[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  flex: 0 0 32px;\n}\n\n.transactions-loading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 68%;\n  height: 28px;\n}\n\n.transactions-empty[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  padding: 28px 20px;\n  text-align: center;\n}\n\n.transactions-empty[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 12px 0 5px;\n  color: var(--fv-text-primary);\n  font-size: 14px;\n  font-weight: 750;\n}\n\n.transactions-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--fv-text-secondary);\n  font-size: 11px;\n}\n\n.transactions-empty[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  padding: 9px 15px;\n  border: 0;\n  border-radius: 11px;\n  background: color-mix(in srgb, var(--fv-primary) 9%, white);\n  color: var(--fv-primary);\n  font-size: 10px;\n  font-weight: 700;\n}\n\n@keyframes _ngcontent-%COMP%_transactions-loading {\n  from { background-position: 100% 0; }\n  to { background-position: -100% 0; }\n}\n\n@media (max-width: 380px) {\n  .transactions[_ngcontent-%COMP%] {\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TransactionsPage, [{
        type: Component,
        args: [{ selector: 'app-transactions', standalone: true, imports: [
                    CommonModule,
                    IonContent,
                    CustomSegmentComponent,
                    FeatureHeaderComponent,
                    FloatingActionButtonComponent,
                    ItemIconComponent,
                    SectionCardComponent,
                    AmountListItemComponent,
                    PeriodSummaryCardComponent
                ], template: "<ion-content class=\"transactions-page\" [fullscreen]=\"true\">\n  <main class=\"transactions\">\n    <app-feature-header\n      title=\"Transacciones\"\n      description=\"Consulta y controla todos tus movimientos.\"\n      imageSrc=\"assets/image/budget-chart.png\">\n    </app-feature-header>\n\n    <app-period-summary-card\n      title=\"Resumen del per\u00EDodo\"\n      [totalLabel]=\"totalLabel\"\n      [totalAmount]=\"totalAmount\"\n      [amountPrefix]=\"amountPrefix\"\n      [metaValue]=\"accountCount\"\n      [metaLabel]=\"accountLabel\"\n      [chartSegments]=\"chartSegments\"\n      [chartAriaLabel]=\"chartAriaLabel\"\n      [chartTone]=\"selectedType === 'ingreso' ? 'success' : 'primary'\"\n      [periodLabel]=\"periodLabel\"\n      [currencySymbol]=\"currencySymbol\">\n    </app-period-summary-card>\n\n    <app-custom-segment\n      [options]=\"transactionTypes\"\n      [model]=\"selectedType\"\n      (modelChange)=\"changeType($event)\">\n    </app-custom-segment>\n\n    <app-section-card title=\"Movimientos\" appearance=\"plain\">\n      <div *ngIf=\"isLoading\" class=\"transactions-loading\" aria-label=\"Cargando transacciones\">\n        <div *ngFor=\"let item of [1, 2, 3, 4]\">\n          <i></i>\n          <span></span>\n        </div>\n      </div>\n\n      <div *ngIf=\"!isLoading && !hasError && transactions.length\" class=\"transactions-list\">\n        <app-amount-list-item\n          *ngFor=\"let transaction of transactions; trackBy: trackByTransaction\"\n          [title]=\"transaction.description?.trim() || transaction.category.name\"\n          [subtitle]=\"transaction.category.name + ' \u00B7 ' + transaction.account.name\"\n          [icon]=\"transaction.category.icon\"\n          [color]=\"transaction.category.color\"\n          [amount]=\"transaction.amount\"\n          [amountPrefix]=\"transaction.type === 'gasto' ? '\u2212' : '+'\"\n          [amountTone]=\"transaction.type === 'ingreso' ? 'success' : 'default'\"\n          [currencySymbol]=\"currencySymbol\">\n        </app-amount-list-item>\n      </div>\n\n      <div *ngIf=\"!isLoading && !hasError && transactions.length === 0\" class=\"transactions-empty\">\n        <app-item-icon\n          icon=\"bills\"\n          color=\"var(--fv-primary)\"\n          size=\"lg\"\n          variant=\"soft\"\n          aria-hidden=\"true\">\n        </app-item-icon>\n        <h3>Sin movimientos</h3>\n        <p>A\u00FAn no tienes {{ selectedType === 'gasto' ? 'gastos' : 'ingresos' }} registrados.</p>\n      </div>\n\n      <div *ngIf=\"!isLoading && hasError\" class=\"transactions-empty\">\n        <app-item-icon\n          icon=\"alert-triangle\"\n          color=\"var(--fv-danger)\"\n          size=\"lg\"\n          variant=\"soft\"\n          aria-hidden=\"true\">\n        </app-item-icon>\n        <h3>No se pudieron cargar</h3>\n        <p>Revisa tu conexi\u00F3n e int\u00E9ntalo nuevamente.</p>\n        <button type=\"button\" (click)=\"loadTransactions()\">Reintentar</button>\n      </div>\n    </app-section-card>\n  </main>\n\n</ion-content>\n\n<app-floating-action-button\n  icon=\"add\"\n  ariaLabel=\"Registrar transacci\u00F3n\"\n  (clicked)=\"createTransaction()\">\n</app-floating-action-button>\n", styles: [":host {\n  display: block;\n}\n\n.transactions-page {\n  --background: linear-gradient(180deg, #fbfbff 0%, var(--fv-background) 100%);\n}\n\n.transactions {\n  display: grid;\n  width: 100%;\n  max-width: 680px;\n  margin: 0 auto;\n  padding: 16px 14px calc(92px + env(safe-area-inset-bottom));\n  gap: 18px;\n}\n\n.transactions-list {\n  display: grid;\n  gap: 9px;\n}\n\n.transactions-loading,\n.transactions-empty {\n  border: 1px solid rgba(226, 229, 238, .92);\n  border-radius: 17px;\n  background: #fff;\n  box-shadow: 0 9px 26px rgba(31, 37, 76, .05);\n}\n\n.transactions-loading {\n  padding: 6px 13px;\n}\n\n.transactions-loading > div {\n  display: flex;\n  min-height: 62px;\n  align-items: center;\n  gap: 12px;\n}\n\n.transactions-loading > div + div {\n  border-top: 1px solid var(--fv-border);\n}\n\n.transactions-loading i,\n.transactions-loading span {\n  display: block;\n  border-radius: 9px;\n  background: linear-gradient(90deg, #eef0f6 25%, #f7f8fb 50%, #eef0f6 75%);\n  background-size: 200% 100%;\n  animation: transactions-loading 1.25s ease-in-out infinite;\n}\n\n.transactions-loading i {\n  width: 32px;\n  height: 32px;\n  flex: 0 0 32px;\n}\n\n.transactions-loading span {\n  width: 68%;\n  height: 28px;\n}\n\n.transactions-empty {\n  display: grid;\n  justify-items: center;\n  padding: 28px 20px;\n  text-align: center;\n}\n\n.transactions-empty h3 {\n  margin: 12px 0 5px;\n  color: var(--fv-text-primary);\n  font-size: 14px;\n  font-weight: 750;\n}\n\n.transactions-empty p {\n  margin: 0;\n  color: var(--fv-text-secondary);\n  font-size: 11px;\n}\n\n.transactions-empty button {\n  margin-top: 14px;\n  padding: 9px 15px;\n  border: 0;\n  border-radius: 11px;\n  background: color-mix(in srgb, var(--fv-primary) 9%, white);\n  color: var(--fv-primary);\n  font-size: 10px;\n  font-weight: 700;\n}\n\n@keyframes transactions-loading {\n  from { background-position: 100% 0; }\n  to { background-position: -100% 0; }\n}\n\n@media (max-width: 380px) {\n  .transactions {\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n\n}\n"] }]
    }], () => [{ type: i1.FilterTransactionsUseCase }, { type: i2.NavigationService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TransactionsPage, { className: "TransactionsPage", filePath: "src/app/features/side-menu/transactions/transactions.page.ts", lineNumber: 36 }); })();
//# sourceMappingURL=transactions.page.js.map