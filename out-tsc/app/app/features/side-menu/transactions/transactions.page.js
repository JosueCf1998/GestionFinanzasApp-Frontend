import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import { FeatureHeaderComponent } from 'src/app/shared/components/feature-header/feature-header.component';
import { FloatingActionButtonComponent } from 'src/app/shared/components/floating-action-button/floating-action-button.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import 'src/app/core/utils/observable-extensions';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/use-cases/transactions/filter-transactions.usecase";
import * as i2 from "src/app/core/services/navigation.service";
import * as i3 from "@angular/common";
const _c0 = () => [1, 2, 3, 4];
function TransactionsPage_div_18_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "i")(2, "span");
    i0.ɵɵelementEnd();
} }
function TransactionsPage_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtemplate(1, TransactionsPage_div_18_div_1_Template, 3, 0, "div", 15);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c0));
} }
function TransactionsPage_div_19_section_1_article_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 21);
    i0.ɵɵelement(1, "app-item-icon", 22);
    i0.ɵɵelementStart(2, "div", 23)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 24)(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(11, "img", 25);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const transaction_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵstyleProp("--transaction-color", transaction_r1.category.color);
    i0.ɵɵclassProp("transaction-row--income", ctx_r1.selectedType === "ingreso");
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", transaction_r1.category.icon)("color", transaction_r1.category.color);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.transactionTitle(transaction_r1));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", transaction_r1.account.name, " \u00B7 ", transaction_r1.category.name, "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate3(" ", ctx_r1.transactionSign(), " ", ctx_r1.currencySymbol, " ", i0.ɵɵpipeBind2(10, 12, transaction_r1.amount, "1.2-2"), " ");
} }
function TransactionsPage_div_19_section_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 18)(1, "h3");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 19);
    i0.ɵɵtemplate(4, TransactionsPage_div_19_section_1_article_4_Template, 12, 15, "article", 20);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const group_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("aria-label", group_r3.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(group_r3.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", group_r3.transactions)("ngForTrackBy", ctx_r1.trackByTransaction);
} }
function TransactionsPage_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵtemplate(1, TransactionsPage_div_19_section_1_Template, 5, 4, "section", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.transactionGroups)("ngForTrackBy", ctx_r1.trackByTransactionGroup);
} }
function TransactionsPage_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵelement(1, "app-item-icon", 27);
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
function TransactionsPage_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵelement(1, "app-item-icon", 28);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "No se pudieron cargar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Revisa tu conexi\u00F3n e int\u00E9ntalo nuevamente.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 29);
    i0.ɵɵlistener("click", function TransactionsPage_div_21_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadTransactions()); });
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
        this.transactionGroups = [];
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
        return this.selectedType === 'gasto' ? 'Total gastado' : 'Total recibido';
    }
    get movementLabel() {
        const count = this.transactions.length;
        return `${count} ${count === 1 ? 'movimiento' : 'movimientos'}`;
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
                this.transactions = data?.items ?? [];
                this.transactionGroups = this.groupTransactionsByDate(this.transactions);
                this.isLoading = false;
            },
            failure: () => {
                this.transactions = [];
                this.transactionGroups = [];
                this.isLoading = false;
                this.hasError = true;
            }
        });
    }
    createTransaction() {
        void this.navService.forward('/home/create');
    }
    transactionTitle(transaction) {
        return transaction.description?.trim() || transaction.category.name;
    }
    transactionSign() {
        return this.selectedType === 'gasto' ? '−' : '+';
    }
    trackByTransaction(_, transaction) {
        return transaction.id;
    }
    trackByTransactionGroup(_, group) {
        return group.date;
    }
    groupTransactionsByDate(transactions) {
        const groups = new Map();
        transactions.forEach(transaction => {
            const date = transaction.date.slice(0, 10);
            groups.set(date, [...(groups.get(date) ?? []), transaction]);
        });
        return Array.from(groups.entries())
            .sort(([firstDate], [secondDate]) => secondDate.localeCompare(firstDate))
            .map(([date, items]) => ({
            date,
            label: this.formatDate(date),
            transactions: items
        }));
    }
    formatDate(value) {
        const [year, month, day] = value.split('-');
        if (!year || !month || !day)
            return value.toUpperCase();
        return new Intl.DateTimeFormat('es-PE', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC'
        })
            .format(new Date(`${value}T00:00:00Z`))
            .toUpperCase();
    }
    static { this.ɵfac = function TransactionsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TransactionsPage)(i0.ɵɵdirectiveInject(i1.FilterTransactionsUseCase), i0.ɵɵdirectiveInject(i2.NavigationService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TransactionsPage, selectors: [["app-transactions"]], decls: 23, vars: 17, consts: [[1, "transactions-page", 3, "fullscreen"], [1, "transactions"], ["title", "Transacciones", "description", "Consulta y controla todos tus movimientos.", "imageSrc", "assets/image/budget-chart.png"], ["aria-label", "Resumen de transacciones", 1, "transactions-summary"], [1, "transactions-summary__icon"], ["color", "#ffffff", "size", "lg", "variant", "plain", "aria-hidden", "true", 3, "icon"], [1, "transactions-summary__content"], [1, "transactions-summary__type"], [3, "modelChange", "options", "model"], ["title", "Movimientos", "appearance", "plain"], ["class", "transactions-loading", "aria-label", "Cargando transacciones", 4, "ngIf"], ["class", "transactions-list", 4, "ngIf"], ["class", "transactions-empty", 4, "ngIf"], ["ariaLabel", "Registrar transacci\u00F3n", 3, "clicked"], ["aria-label", "Cargando transacciones", 1, "transactions-loading"], [4, "ngFor", "ngForOf"], [1, "transactions-list"], ["class", "transactions-date-group", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "transactions-date-group"], [1, "transactions-date-group__items"], ["class", "transaction-row", 3, "transaction-row--income", "--transaction-color", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "transaction-row"], ["size", "sm", "variant", "soft", "aria-hidden", "true", 3, "icon", "color"], [1, "transaction-row__content"], [1, "transaction-row__amount"], ["src", "assets/icon/right-inline.svg", "alt", "", "aria-hidden", "true", 1, "transaction-row__chevron"], [1, "transactions-empty"], ["icon", "bills", "color", "var(--fv-primary)", "size", "lg", "variant", "soft", "aria-hidden", "true"], ["icon", "alert-triangle", "color", "var(--fv-danger)", "size", "lg", "variant", "soft", "aria-hidden", "true"], ["type", "button", 3, "click"]], template: function TransactionsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-content", 0)(1, "main", 1);
            i0.ɵɵelement(2, "app-feature-header", 2);
            i0.ɵɵelementStart(3, "section", 3)(4, "div", 4);
            i0.ɵɵelement(5, "app-item-icon", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 6)(7, "span");
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "strong");
            i0.ɵɵtext(10);
            i0.ɵɵpipe(11, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "p");
            i0.ɵɵtext(13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "span", 7);
            i0.ɵɵtext(15);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "app-custom-segment", 8);
            i0.ɵɵlistener("modelChange", function TransactionsPage_Template_app_custom_segment_modelChange_16_listener($event) { return ctx.changeType($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "app-section-card", 9);
            i0.ɵɵtemplate(18, TransactionsPage_div_18_Template, 2, 2, "div", 10)(19, TransactionsPage_div_19_Template, 2, 2, "div", 11)(20, TransactionsPage_div_20_Template, 6, 1, "div", 12)(21, TransactionsPage_div_21_Template, 8, 0, "div", 12);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "app-floating-action-button", 13);
            i0.ɵɵlistener("clicked", function TransactionsPage_Template_app_floating_action_button_clicked_22_listener() { return ctx.createTransaction(); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("fullscreen", true);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("icon", ctx.selectedType === "gasto" ? "bills" : "salary");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.totalLabel);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate3(" ", ctx.selectedType === "gasto" ? "\u2212" : "+", " ", ctx.currencySymbol, " ", i0.ɵɵpipeBind2(11, 14, ctx.totalAmount, "1.2-2"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.movementLabel);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.selectedType === "gasto" ? "Salidas" : "Entradas", " ");
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
        } }, dependencies: [CommonModule, i3.NgForOf, i3.NgIf, i3.DecimalPipe, IonContent,
            CustomSegmentComponent,
            FeatureHeaderComponent,
            FloatingActionButtonComponent,
            ItemIconComponent,
            SectionCardComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.transactions-page[_ngcontent-%COMP%] {\n  --background: linear-gradient(180deg, #fbfbff 0%, var(--fv-background) 100%);\n}\n\n.transactions[_ngcontent-%COMP%] {\n  display: grid;\n  width: 100%;\n  max-width: 680px;\n  margin: 0 auto;\n  padding: 16px 14px calc(92px + env(safe-area-inset-bottom));\n  gap: 18px;\n}\n\n.transactions-summary[_ngcontent-%COMP%] {\n  position: relative;\n  isolation: isolate;\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  min-height: 122px;\n  align-items: center;\n  gap: 14px;\n  padding: 18px;\n  overflow: hidden;\n  border: 1px solid rgba(255, 255, 255, .14);\n  border-radius: 20px;\n  background: var(--fv-gradient-primary);\n  box-shadow: var(--fv-shadow-primary);\n  color: #fff;\n}\n\n.transactions-summary[_ngcontent-%COMP%]::before, \n.transactions-summary[_ngcontent-%COMP%]::after {\n  position: absolute;\n  z-index: -1;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, .055);\n  content: '';\n}\n\n.transactions-summary[_ngcontent-%COMP%]::before {\n  top: -68px;\n  right: -35px;\n  width: 150px;\n  height: 150px;\n}\n\n.transactions-summary[_ngcontent-%COMP%]::after {\n  right: 92px;\n  bottom: -92px;\n  width: 160px;\n  height: 160px;\n}\n\n.transactions-summary__icon[_ngcontent-%COMP%] {\n  display: grid;\n  width: 48px;\n  height: 48px;\n  border: 1px solid rgba(255, 255, 255, .18);\n  border-radius: 15px;\n  background: rgba(255, 255, 255, .11);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);\n  place-items: center;\n}\n\n.transactions-summary__content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.transactions-summary__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.transactions-summary__content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.transactions-summary__content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, .68);\n  font-size: 10px;\n  font-weight: 650;\n}\n\n.transactions-summary__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  font-size: 22px;\n  font-weight: 820;\n  font-variant-numeric: tabular-nums;\n  letter-spacing: -.035em;\n}\n\n.transactions-summary__content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 5px 0 0;\n  color: rgba(255, 255, 255, .7);\n  font-size: 10px;\n}\n\n.transactions-summary__type[_ngcontent-%COMP%] {\n  align-self: start;\n  padding: 5px 8px;\n  border: 1px solid rgba(255, 255, 255, .15);\n  border-radius: 999px;\n  background: rgba(255, 255, 255, .1);\n  color: #fff;\n  font-size: 9px;\n  font-weight: 700;\n}\n\n.transactions-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n}\n\n.transactions-date-group[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 9px;\n  padding-left: 2px;\n  color: #919ab1;\n  font-size: 9.5px;\n  font-weight: 800;\n  letter-spacing: .17em;\n  line-height: 1.4;\n}\n\n.transactions-date-group__items[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 9px;\n}\n\n.transaction-row[_ngcontent-%COMP%] {\n  --transaction-color: var(--fv-primary);\n  position: relative;\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto 14px;\n  min-height: 72px;\n  align-items: center;\n  gap: 13px;\n  padding: 12px 14px 12px 12px;\n  overflow: hidden;\n  border: 1px solid rgba(225, 228, 238, .9);\n  border-radius: 18px;\n  background: #fff;\n  box-shadow:\n    0 8px 24px rgba(35, 39, 78, .055),\n    0 1px 2px rgba(35, 39, 78, .025);\n  transition:\n    border-color 160ms ease,\n    box-shadow 160ms ease,\n    transform 160ms ease;\n}\n\n.transaction-row[_ngcontent-%COMP%]:active {\n  border-color: color-mix(in srgb, var(--transaction-color) 18%, var(--fv-border));\n  box-shadow: 0 4px 14px rgba(35, 39, 78, .06);\n  transform: scale(.992);\n}\n\n.transaction-row[_ngcontent-%COMP%]   app-item-icon[_ngcontent-%COMP%] {\n  filter: drop-shadow(0 4px 8px color-mix(in srgb, var(--transaction-color) 12%, transparent));\n}\n\n.transaction-row__content[_ngcontent-%COMP%], \n.transaction-row__amount[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.transaction-row__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.transaction-row__content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.transaction-row__amount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.transaction-row__amount[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.transaction-row__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 13px;\n  font-weight: 760;\n  letter-spacing: -.01em;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.transaction-row__content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 3px;\n  overflow: hidden;\n  color: #858b9d;\n  font-size: 10px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.transaction-row__amount[_ngcontent-%COMP%] {\n  text-align: right;\n}\n\n.transaction-row__amount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #25215f;\n  font-size: 12.5px;\n  font-weight: 820;\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n}\n\n.transaction-row--income[_ngcontent-%COMP%]   .transaction-row__amount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--fv-success);\n}\n\n.transaction-row__chevron[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  opacity: .42;\n  object-fit: contain;\n}\n\n.transactions-loading[_ngcontent-%COMP%], \n.transactions-empty[_ngcontent-%COMP%] {\n  border: 1px solid rgba(226, 229, 238, .92);\n  border-radius: 17px;\n  background: #fff;\n  box-shadow: 0 9px 26px rgba(31, 37, 76, .05);\n}\n\n.transactions-loading[_ngcontent-%COMP%] {\n  padding: 6px 13px;\n}\n\n.transactions-loading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 62px;\n  align-items: center;\n  gap: 12px;\n}\n\n.transactions-loading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--fv-border);\n}\n\n.transactions-loading[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.transactions-loading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  border-radius: 9px;\n  background: linear-gradient(90deg, #eef0f6 25%, #f7f8fb 50%, #eef0f6 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_transactions-loading 1.25s ease-in-out infinite;\n}\n\n.transactions-loading[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  flex: 0 0 32px;\n}\n\n.transactions-loading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 68%;\n  height: 28px;\n}\n\n.transactions-empty[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  padding: 28px 20px;\n  text-align: center;\n}\n\n.transactions-empty[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 12px 0 5px;\n  color: var(--fv-text-primary);\n  font-size: 14px;\n  font-weight: 750;\n}\n\n.transactions-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--fv-text-secondary);\n  font-size: 11px;\n}\n\n.transactions-empty[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  padding: 9px 15px;\n  border: 0;\n  border-radius: 11px;\n  background: color-mix(in srgb, var(--fv-primary) 9%, white);\n  color: var(--fv-primary);\n  font-size: 10px;\n  font-weight: 700;\n}\n\n@keyframes _ngcontent-%COMP%_transactions-loading {\n  from { background-position: 100% 0; }\n  to { background-position: -100% 0; }\n}\n\n@media (max-width: 380px) {\n  .transactions[_ngcontent-%COMP%] {\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n\n  .transactions-summary[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n\n  .transactions-summary__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n\n  .transaction-row[_ngcontent-%COMP%] {\n    grid-template-columns: auto minmax(0, 1fr) auto 12px;\n    gap: 9px;\n    padding-right: 11px;\n  }\n\n  .transaction-row__amount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 10.5px;\n  }\n}"] }); }
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
                    SectionCardComponent
                ], template: "<ion-content class=\"transactions-page\" [fullscreen]=\"true\">\n  <main class=\"transactions\">\n    <app-feature-header\n      title=\"Transacciones\"\n      description=\"Consulta y controla todos tus movimientos.\"\n      imageSrc=\"assets/image/budget-chart.png\">\n    </app-feature-header>\n\n    <section class=\"transactions-summary\" aria-label=\"Resumen de transacciones\">\n      <div class=\"transactions-summary__icon\">\n        <app-item-icon\n          [icon]=\"selectedType === 'gasto' ? 'bills' : 'salary'\"\n          color=\"#ffffff\"\n          size=\"lg\"\n          variant=\"plain\"\n          aria-hidden=\"true\">\n        </app-item-icon>\n      </div>\n\n      <div class=\"transactions-summary__content\">\n        <span>{{ totalLabel }}</span>\n        <strong>\n          {{ selectedType === 'gasto' ? '\u2212' : '+' }}\n          {{ currencySymbol }} {{ totalAmount | number:'1.2-2' }}\n        </strong>\n        <p>{{ movementLabel }}</p>\n      </div>\n\n      <span class=\"transactions-summary__type\">\n        {{ selectedType === 'gasto' ? 'Salidas' : 'Entradas' }}\n      </span>\n    </section>\n\n    <app-custom-segment\n      [options]=\"transactionTypes\"\n      [model]=\"selectedType\"\n      (modelChange)=\"changeType($event)\">\n    </app-custom-segment>\n\n    <app-section-card title=\"Movimientos\" appearance=\"plain\">\n      <div *ngIf=\"isLoading\" class=\"transactions-loading\" aria-label=\"Cargando transacciones\">\n        <div *ngFor=\"let item of [1, 2, 3, 4]\">\n          <i></i>\n          <span></span>\n        </div>\n      </div>\n\n      <div *ngIf=\"!isLoading && !hasError && transactions.length\" class=\"transactions-list\">\n        <section\n          *ngFor=\"let group of transactionGroups; trackBy: trackByTransactionGroup\"\n          class=\"transactions-date-group\"\n          [attr.aria-label]=\"group.label\">\n          <h3>{{ group.label }}</h3>\n\n          <div class=\"transactions-date-group__items\">\n            <article\n              *ngFor=\"let transaction of group.transactions; trackBy: trackByTransaction\"\n              class=\"transaction-row\"\n              [class.transaction-row--income]=\"selectedType === 'ingreso'\"\n              [style.--transaction-color]=\"transaction.category.color\">\n              <app-item-icon\n                [icon]=\"transaction.category.icon\"\n                [color]=\"transaction.category.color\"\n                size=\"sm\"\n                variant=\"soft\"\n                aria-hidden=\"true\">\n              </app-item-icon>\n\n              <div class=\"transaction-row__content\">\n                <strong>{{ transactionTitle(transaction) }}</strong>\n                <span>{{ transaction.account.name }} \u00B7 {{ transaction.category.name }}</span>\n              </div>\n\n              <div class=\"transaction-row__amount\">\n                <strong>\n                  {{ transactionSign() }}\n                  {{ currencySymbol }} {{ transaction.amount | number:'1.2-2' }}\n                </strong>\n              </div>\n\n              <img\n                class=\"transaction-row__chevron\"\n                src=\"assets/icon/right-inline.svg\"\n                alt=\"\"\n                aria-hidden=\"true\">\n            </article>\n          </div>\n        </section>\n      </div>\n\n      <div *ngIf=\"!isLoading && !hasError && transactions.length === 0\" class=\"transactions-empty\">\n        <app-item-icon\n          icon=\"bills\"\n          color=\"var(--fv-primary)\"\n          size=\"lg\"\n          variant=\"soft\"\n          aria-hidden=\"true\">\n        </app-item-icon>\n        <h3>Sin movimientos</h3>\n        <p>A\u00FAn no tienes {{ selectedType === 'gasto' ? 'gastos' : 'ingresos' }} registrados.</p>\n      </div>\n\n      <div *ngIf=\"!isLoading && hasError\" class=\"transactions-empty\">\n        <app-item-icon\n          icon=\"alert-triangle\"\n          color=\"var(--fv-danger)\"\n          size=\"lg\"\n          variant=\"soft\"\n          aria-hidden=\"true\">\n        </app-item-icon>\n        <h3>No se pudieron cargar</h3>\n        <p>Revisa tu conexi\u00F3n e int\u00E9ntalo nuevamente.</p>\n        <button type=\"button\" (click)=\"loadTransactions()\">Reintentar</button>\n      </div>\n    </app-section-card>\n  </main>\n\n  <app-floating-action-button\n    ariaLabel=\"Registrar transacci\u00F3n\"\n    (clicked)=\"createTransaction()\">\n  </app-floating-action-button>\n</ion-content>\n", styles: [":host {\n  display: block;\n}\n\n.transactions-page {\n  --background: linear-gradient(180deg, #fbfbff 0%, var(--fv-background) 100%);\n}\n\n.transactions {\n  display: grid;\n  width: 100%;\n  max-width: 680px;\n  margin: 0 auto;\n  padding: 16px 14px calc(92px + env(safe-area-inset-bottom));\n  gap: 18px;\n}\n\n.transactions-summary {\n  position: relative;\n  isolation: isolate;\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  min-height: 122px;\n  align-items: center;\n  gap: 14px;\n  padding: 18px;\n  overflow: hidden;\n  border: 1px solid rgba(255, 255, 255, .14);\n  border-radius: 20px;\n  background: var(--fv-gradient-primary);\n  box-shadow: var(--fv-shadow-primary);\n  color: #fff;\n}\n\n.transactions-summary::before,\n.transactions-summary::after {\n  position: absolute;\n  z-index: -1;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, .055);\n  content: '';\n}\n\n.transactions-summary::before {\n  top: -68px;\n  right: -35px;\n  width: 150px;\n  height: 150px;\n}\n\n.transactions-summary::after {\n  right: 92px;\n  bottom: -92px;\n  width: 160px;\n  height: 160px;\n}\n\n.transactions-summary__icon {\n  display: grid;\n  width: 48px;\n  height: 48px;\n  border: 1px solid rgba(255, 255, 255, .18);\n  border-radius: 15px;\n  background: rgba(255, 255, 255, .11);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);\n  place-items: center;\n}\n\n.transactions-summary__content span,\n.transactions-summary__content strong,\n.transactions-summary__content p {\n  display: block;\n}\n\n.transactions-summary__content span {\n  color: rgba(255, 255, 255, .68);\n  font-size: 10px;\n  font-weight: 650;\n}\n\n.transactions-summary__content strong {\n  margin-top: 4px;\n  font-size: 22px;\n  font-weight: 820;\n  font-variant-numeric: tabular-nums;\n  letter-spacing: -.035em;\n}\n\n.transactions-summary__content p {\n  margin: 5px 0 0;\n  color: rgba(255, 255, 255, .7);\n  font-size: 10px;\n}\n\n.transactions-summary__type {\n  align-self: start;\n  padding: 5px 8px;\n  border: 1px solid rgba(255, 255, 255, .15);\n  border-radius: 999px;\n  background: rgba(255, 255, 255, .1);\n  color: #fff;\n  font-size: 9px;\n  font-weight: 700;\n}\n\n.transactions-list {\n  display: grid;\n  gap: 18px;\n}\n\n.transactions-date-group h3 {\n  margin: 0 0 9px;\n  padding-left: 2px;\n  color: #919ab1;\n  font-size: 9.5px;\n  font-weight: 800;\n  letter-spacing: .17em;\n  line-height: 1.4;\n}\n\n.transactions-date-group__items {\n  display: grid;\n  gap: 9px;\n}\n\n.transaction-row {\n  --transaction-color: var(--fv-primary);\n  position: relative;\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto 14px;\n  min-height: 72px;\n  align-items: center;\n  gap: 13px;\n  padding: 12px 14px 12px 12px;\n  overflow: hidden;\n  border: 1px solid rgba(225, 228, 238, .9);\n  border-radius: 18px;\n  background: #fff;\n  box-shadow:\n    0 8px 24px rgba(35, 39, 78, .055),\n    0 1px 2px rgba(35, 39, 78, .025);\n  transition:\n    border-color 160ms ease,\n    box-shadow 160ms ease,\n    transform 160ms ease;\n}\n\n.transaction-row:active {\n  border-color: color-mix(in srgb, var(--transaction-color) 18%, var(--fv-border));\n  box-shadow: 0 4px 14px rgba(35, 39, 78, .06);\n  transform: scale(.992);\n}\n\n.transaction-row app-item-icon {\n  filter: drop-shadow(0 4px 8px color-mix(in srgb, var(--transaction-color) 12%, transparent));\n}\n\n.transaction-row__content,\n.transaction-row__amount {\n  min-width: 0;\n}\n\n.transaction-row__content strong,\n.transaction-row__content span,\n.transaction-row__amount strong,\n.transaction-row__amount span {\n  display: block;\n}\n\n.transaction-row__content strong {\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 13px;\n  font-weight: 760;\n  letter-spacing: -.01em;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.transaction-row__content span {\n  margin-top: 3px;\n  overflow: hidden;\n  color: #858b9d;\n  font-size: 10px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.transaction-row__amount {\n  text-align: right;\n}\n\n.transaction-row__amount strong {\n  color: #25215f;\n  font-size: 12.5px;\n  font-weight: 820;\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n}\n\n.transaction-row--income .transaction-row__amount strong {\n  color: var(--fv-success);\n}\n\n.transaction-row__chevron {\n  width: 14px;\n  height: 14px;\n  opacity: .42;\n  object-fit: contain;\n}\n\n.transactions-loading,\n.transactions-empty {\n  border: 1px solid rgba(226, 229, 238, .92);\n  border-radius: 17px;\n  background: #fff;\n  box-shadow: 0 9px 26px rgba(31, 37, 76, .05);\n}\n\n.transactions-loading {\n  padding: 6px 13px;\n}\n\n.transactions-loading > div {\n  display: flex;\n  min-height: 62px;\n  align-items: center;\n  gap: 12px;\n}\n\n.transactions-loading > div + div {\n  border-top: 1px solid var(--fv-border);\n}\n\n.transactions-loading i,\n.transactions-loading span {\n  display: block;\n  border-radius: 9px;\n  background: linear-gradient(90deg, #eef0f6 25%, #f7f8fb 50%, #eef0f6 75%);\n  background-size: 200% 100%;\n  animation: transactions-loading 1.25s ease-in-out infinite;\n}\n\n.transactions-loading i {\n  width: 32px;\n  height: 32px;\n  flex: 0 0 32px;\n}\n\n.transactions-loading span {\n  width: 68%;\n  height: 28px;\n}\n\n.transactions-empty {\n  display: grid;\n  justify-items: center;\n  padding: 28px 20px;\n  text-align: center;\n}\n\n.transactions-empty h3 {\n  margin: 12px 0 5px;\n  color: var(--fv-text-primary);\n  font-size: 14px;\n  font-weight: 750;\n}\n\n.transactions-empty p {\n  margin: 0;\n  color: var(--fv-text-secondary);\n  font-size: 11px;\n}\n\n.transactions-empty button {\n  margin-top: 14px;\n  padding: 9px 15px;\n  border: 0;\n  border-radius: 11px;\n  background: color-mix(in srgb, var(--fv-primary) 9%, white);\n  color: var(--fv-primary);\n  font-size: 10px;\n  font-weight: 700;\n}\n\n@keyframes transactions-loading {\n  from { background-position: 100% 0; }\n  to { background-position: -100% 0; }\n}\n\n@media (max-width: 380px) {\n  .transactions {\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n\n  .transactions-summary {\n    padding: 16px;\n  }\n\n  .transactions-summary__content strong {\n    font-size: 20px;\n  }\n\n  .transaction-row {\n    grid-template-columns: auto minmax(0, 1fr) auto 12px;\n    gap: 9px;\n    padding-right: 11px;\n  }\n\n  .transaction-row__amount strong {\n    font-size: 10.5px;\n  }\n}\n"] }]
    }], () => [{ type: i1.FilterTransactionsUseCase }, { type: i2.NavigationService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TransactionsPage, { className: "TransactionsPage", filePath: "src/app/features/side-menu/transactions/transactions.page.ts", lineNumber: 37 }); })();
//# sourceMappingURL=transactions.page.js.map