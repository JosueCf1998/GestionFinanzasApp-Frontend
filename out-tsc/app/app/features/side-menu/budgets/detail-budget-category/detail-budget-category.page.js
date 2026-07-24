import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { BUDGET_STATUS_LABELS } from 'src/app/core/models/budgets/list-budgets.model';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import 'src/app/core/utils/observable-extensions';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/services/navigation.service";
import * as i2 from "src/app/core/use-cases/transactions/filter-transactions.usecase";
import * as i3 from "@angular/common";
const _c0 = () => [1, 2, 3];
function DetailBudgetCategoryPage_div_60_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "i")(2, "span");
    i0.ɵɵelementEnd();
} }
function DetailBudgetCategoryPage_div_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵtemplate(1, DetailBudgetCategoryPage_div_60_div_1_Template, 3, 0, "div", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c0));
} }
function DetailBudgetCategoryPage_div_61_section_1_article_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 27);
    i0.ɵɵelement(1, "app-item-icon", 28);
    i0.ɵɵelementStart(2, "div", 29)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 30)(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12, "Salida");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const transaction_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵstyleProp("--transaction-color", transaction_r1.account.color);
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", transaction_r1.account.icon || "bank")("color", transaction_r1.account.color || "var(--fv-primary)");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.transactionTitle(transaction_r1));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(transaction_r1.account.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("\u2212 ", ctx_r1.currencySymbol, " ", i0.ɵɵpipeBind2(10, 8, transaction_r1.amount, "1.2-2"), "");
} }
function DetailBudgetCategoryPage_div_61_section_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 24)(1, "h3");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 25);
    i0.ɵɵtemplate(4, DetailBudgetCategoryPage_div_61_section_1_article_4_Template, 13, 11, "article", 26);
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
function DetailBudgetCategoryPage_div_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵtemplate(1, DetailBudgetCategoryPage_div_61_section_1_Template, 5, 4, "section", 23);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.transactionGroups)("ngForTrackBy", ctx_r1.trackByTransactionGroup);
} }
function DetailBudgetCategoryPage_div_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵelement(1, "app-item-icon", 32);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Sin transacciones");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "No hay movimientos de esta categor\u00EDa dentro del periodo del presupuesto.");
    i0.ɵɵelementEnd()();
} }
function DetailBudgetCategoryPage_div_63_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵelement(1, "app-item-icon", 33);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "No se pudieron cargar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Revisa tu conexi\u00F3n e int\u00E9ntalo nuevamente.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 34);
    i0.ɵɵlistener("click", function DetailBudgetCategoryPage_div_63_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadTransactions()); });
    i0.ɵɵtext(7, "Reintentar");
    i0.ɵɵelementEnd()();
} }
export class DetailBudgetCategoryPage {
    constructor(navService, filterTransactionsUseCase) {
        this.navService = navService;
        this.filterTransactionsUseCase = filterTransactionsUseCase;
        this.transactions = [];
        this.transactionGroups = [];
        this.isLoadingTransactions = false;
        this.hasTransactionError = false;
        const state = window.history.state;
        if (!state.category) {
            void this.navService.back();
            this.category = this.emptyCategory();
            this.budgetName = '';
            this.currencySymbol = 'S/';
            this.dateRangeLabel = '';
            this.startDate = '';
            this.endDate = '';
            return;
        }
        this.category = state.category;
        this.budgetName = state.budgetName ?? '';
        this.currencySymbol = state.currency === 'PEN' ? 'S/' : (state.currency ?? 'S/');
        this.dateRangeLabel = state.dateRangeLabel ?? '';
        this.startDate = state.startDate ?? '';
        this.endDate = state.endDate ?? '';
    }
    ngOnInit() {
        if (this.category.id > 0) {
            this.loadTransactions();
        }
    }
    get statusLabel() {
        return BUDGET_STATUS_LABELS[this.category.status];
    }
    get remainingLabel() {
        return this.category.status === 'EXCEEDED' ? 'Monto excedido' : 'Disponible';
    }
    get remainingAmount() {
        return this.category.status === 'EXCEEDED'
            ? Math.max(this.category.used - this.category.budgeted, 0)
            : Math.max(this.category.budgeted - this.category.used, 0);
    }
    get progressWidth() {
        return Math.min(Math.max(this.category.percentage, 0), 100);
    }
    loadTransactions() {
        this.isLoadingTransactions = true;
        this.hasTransactionError = false;
        this.filterTransactionsUseCase.execute({
            category_ids: [this.category.id],
            type: 'gasto'
        }).service({
            success: data => {
                this.transactions = (data?.items ?? []).filter(transaction => this.isTransactionInBudgetPeriod(transaction.date));
                this.transactionGroups = this.groupTransactionsByDate(this.transactions);
                this.isLoadingTransactions = false;
            },
            failure: () => {
                this.transactions = [];
                this.transactionGroups = [];
                this.isLoadingTransactions = false;
                this.hasTransactionError = true;
            }
        });
    }
    transactionTitle(transaction) {
        return transaction.description?.trim() || `Gasto en ${transaction.category.name}`;
    }
    trackByTransaction(_, transaction) {
        return transaction.id;
    }
    trackByTransactionGroup(_, group) {
        return group.date;
    }
    backToBudget() {
        void this.navService.back();
    }
    isTransactionInBudgetPeriod(value) {
        if (!this.startDate || !this.endDate)
            return true;
        const transactionDate = value.slice(0, 10);
        return transactionDate >= this.startDate && transactionDate <= this.endDate;
    }
    groupTransactionsByDate(transactions) {
        const groups = new Map();
        transactions.forEach(transaction => {
            const date = transaction.date.slice(0, 10);
            const current = groups.get(date) ?? [];
            current.push(transaction);
            groups.set(date, current);
        });
        return Array.from(groups.entries())
            .sort(([firstDate], [secondDate]) => secondDate.localeCompare(firstDate))
            .map(([date, items]) => ({
            date,
            label: this.formatDateGroupLabel(date),
            transactions: items
        }));
    }
    formatDateGroupLabel(value) {
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
    emptyCategory() {
        return {
            id: 0,
            name: '',
            icon: 'category',
            color: '#4361ee',
            budgeted: 0,
            used: 0,
            remaining: 0,
            percentage: 0,
            status: 'ON_TRACK'
        };
    }
    static { this.ɵfac = function DetailBudgetCategoryPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DetailBudgetCategoryPage)(i0.ɵɵdirectiveInject(i1.NavigationService), i0.ɵɵdirectiveInject(i2.FilterTransactionsUseCase)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DetailBudgetCategoryPage, selectors: [["app-detail-budget-category"]], decls: 64, vars: 50, consts: [["title", "Detalle de categor\u00EDa", 3, "back", "showBack"], [1, "category-detail-page", 3, "fullscreen"], [1, "category-detail"], [1, "category-detail__card"], [1, "category-detail__hero"], [1, "category-detail__identity"], ["size", "lg", "variant", "glass", 3, "icon", "color"], [1, "category-detail__heading"], [1, "category-detail__status"], [1, "category-detail__usage"], [1, "category-detail__usage-heading"], ["role", "progressbar", "aria-label", "Porcentaje utilizado", "aria-valuemin", "0", "aria-valuemax", "100", 1, "category-detail__progress"], [1, "category-detail__metrics"], [1, "category-detail__period"], ["icon", "calendar", "color", "var(--fv-primary)", "size", "xs", "variant", "soft", "aria-hidden", "true"], ["aria-label", "Transacciones", 1, "category-transactions"], ["title", "Transacciones", "appearance", "plain"], ["class", "category-transactions__loading", "aria-label", "Cargando transacciones", 4, "ngIf"], ["class", "category-transactions__list", 4, "ngIf"], ["class", "category-transactions__empty", 4, "ngIf"], ["aria-label", "Cargando transacciones", 1, "category-transactions__loading"], [4, "ngFor", "ngForOf"], [1, "category-transactions__list"], ["class", "transaction-date-group", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "transaction-date-group"], [1, "transaction-date-group__items"], ["class", "transaction-item", 3, "--transaction-color", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "transaction-item"], ["size", "sm", "variant", "soft", "aria-hidden", "true", 3, "icon", "color"], [1, "transaction-item__content"], [1, "transaction-item__amount"], [1, "category-transactions__empty"], ["icon", "bills", "color", "var(--fv-primary)", "size", "md", "variant", "soft", "aria-hidden", "true"], ["icon", "alert-triangle", "color", "var(--fv-danger)", "size", "md", "variant", "soft", "aria-hidden", "true"], ["type", "button", 3, "click"]], template: function DetailBudgetCategoryPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-header")(1, "app-page-layout", 0);
            i0.ɵɵlistener("back", function DetailBudgetCategoryPage_Template_app_page_layout_back_1_listener() { return ctx.backToBudget(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(2, "ion-content", 1)(3, "main", 2)(4, "article", 3)(5, "section", 4)(6, "header", 5);
            i0.ɵɵelement(7, "app-item-icon", 6);
            i0.ɵɵelementStart(8, "div", 7)(9, "span");
            i0.ɵɵtext(10, "Categor\u00EDa");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "h1");
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "p");
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "span", 8);
            i0.ɵɵelement(16, "i");
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 9)(19, "div", 10)(20, "div")(21, "span");
            i0.ɵɵtext(22, "Consumo del presupuesto");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "p");
            i0.ɵɵtext(24);
            i0.ɵɵpipe(25, "number");
            i0.ɵɵpipe(26, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "strong");
            i0.ɵɵtext(28);
            i0.ɵɵpipe(29, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 11);
            i0.ɵɵelement(31, "span");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(32, "dl", 12)(33, "div")(34, "dt");
            i0.ɵɵtext(35, "Presupuestado");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "dd");
            i0.ɵɵtext(37);
            i0.ɵɵpipe(38, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "div")(40, "dt");
            i0.ɵɵtext(41, "Utilizado");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "dd");
            i0.ɵɵtext(43);
            i0.ɵɵpipe(44, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "div")(46, "dt");
            i0.ɵɵtext(47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "dd");
            i0.ɵɵtext(49);
            i0.ɵɵpipe(50, "number");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(51, "footer", 13);
            i0.ɵɵelement(52, "app-item-icon", 14);
            i0.ɵɵelementStart(53, "div")(54, "span");
            i0.ɵɵtext(55, "Periodo del presupuesto");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "strong");
            i0.ɵɵtext(57);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(58, "section", 15)(59, "app-section-card", 16);
            i0.ɵɵtemplate(60, DetailBudgetCategoryPage_div_60_Template, 2, 2, "div", 17)(61, DetailBudgetCategoryPage_div_61_Template, 2, 2, "div", 18)(62, DetailBudgetCategoryPage_div_62_Template, 6, 0, "div", 19)(63, DetailBudgetCategoryPage_div_63_Template, 8, 0, "div", 19);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("showBack", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("fullscreen", false);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleProp("--category-color", ctx.category.color);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("icon", ctx.category.icon)("color", ctx.category.color);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.category.name);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.budgetName);
            i0.ɵɵadvance();
            i0.ɵɵattribute("data-status", ctx.category.status);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.statusLabel, " ");
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate4(" ", ctx.currencySymbol, " ", i0.ɵɵpipeBind2(25, 32, ctx.category.used, "1.2-2"), " de ", ctx.currencySymbol, " ", i0.ɵɵpipeBind2(26, 35, ctx.category.budgeted, "1.2-2"), " ");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(29, 38, ctx.category.percentage, "1.0-1"), "%");
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("aria-valuenow", ctx.progressWidth);
            i0.ɵɵadvance();
            i0.ɵɵstyleProp("width", ctx.progressWidth, "%");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate2("", ctx.currencySymbol, " ", i0.ɵɵpipeBind2(38, 41, ctx.category.budgeted, "1.2-2"), "");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate2("", ctx.currencySymbol, " ", i0.ɵɵpipeBind2(44, 44, ctx.category.used, "1.2-2"), "");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.remainingLabel);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("category-detail__danger", ctx.category.status === "EXCEEDED");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate2(" ", ctx.currencySymbol, " ", i0.ɵɵpipeBind2(50, 47, ctx.remainingAmount, "1.2-2"), " ");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.dateRangeLabel);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.isLoadingTransactions);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoadingTransactions && !ctx.hasTransactionError && ctx.transactions.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoadingTransactions && !ctx.hasTransactionError && ctx.transactions.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoadingTransactions && ctx.hasTransactionError);
        } }, dependencies: [CommonModule, i3.NgForOf, i3.NgIf, i3.DecimalPipe, IonContent,
            IonHeader,
            ItemIconComponent,
            PageLayoutComponent,
            SectionCardComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.category-detail-page[_ngcontent-%COMP%] {\n  --background: linear-gradient(180deg, #fafbff 0%, var(--fv-background) 100%);\n}\n\n.category-detail[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 18px 14px calc(24px + env(safe-area-inset-bottom));\n}\n\n.category-detail__card[_ngcontent-%COMP%] {\n  --category-color: var(--fv-primary);\n  position: relative;\n  overflow: hidden;\n  border: 1px solid color-mix(in srgb, var(--category-color) 12%, var(--fv-border));\n  border-radius: 22px;\n  background: var(--fv-surface);\n  box-shadow:\n    0 18px 42px rgba(31, 37, 76, .09),\n    0 2px 8px rgba(31, 37, 76, .04);\n}\n\n.category-detail__card[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 2;\n  height: 3px;\n  background: linear-gradient(\n    90deg,\n    var(--category-color),\n    color-mix(in srgb, var(--category-color) 54%, #7c6ff5)\n  );\n  content: '';\n}\n\n.category-detail__hero[_ngcontent-%COMP%] {\n  position: relative;\n  isolation: isolate;\n  padding: 20px 18px 18px;\n  overflow: hidden;\n  background:\n    radial-gradient(\n      circle at 102% -10%,\n      color-mix(in srgb, var(--category-color) 16%, transparent),\n      transparent 42%\n    ),\n    linear-gradient(\n      145deg,\n      color-mix(in srgb, var(--category-color) 4%, white),\n      var(--fv-surface) 64%\n    );\n}\n\n.category-detail__hero[_ngcontent-%COMP%]::after {\n  position: absolute;\n  right: -58px;\n  bottom: -76px;\n  z-index: -1;\n  width: 150px;\n  height: 150px;\n  border-radius: 50%;\n  background: color-mix(in srgb, var(--category-color) 5%, transparent);\n  content: '';\n}\n\n.category-detail__identity[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 12px;\n}\n\n.category-detail__heading[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.category-detail__heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 3px;\n  color: var(--category-color);\n  font-size: 9px;\n  font-weight: 800;\n  letter-spacing: .1em;\n  text-transform: uppercase;\n}\n\n.category-detail__heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 18px;\n  font-weight: 780;\n  letter-spacing: -.025em;\n  line-height: 1.25;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.category-detail__heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  overflow: hidden;\n  color: var(--fv-text-secondary);\n  font-size: 11px;\n  font-weight: 500;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.category-detail__status[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 5px 8px;\n  border: 1px solid color-mix(in srgb, var(--fv-success) 16%, transparent);\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--fv-success) 9%, white);\n  color: var(--fv-success);\n  font-size: 9px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n.category-detail__status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: currentColor;\n  box-shadow: 0 0 0 3px color-mix(in srgb, currentColor 10%, transparent);\n}\n\n.category-detail__status[data-status='WARNING'][_ngcontent-%COMP%] {\n  border-color: color-mix(in srgb, var(--fv-warning) 18%, transparent);\n  background: color-mix(in srgb, var(--fv-warning) 10%, white);\n  color: var(--fv-warning);\n}\n\n.category-detail__status[data-status='EXCEEDED'][_ngcontent-%COMP%] {\n  border-color: color-mix(in srgb, var(--fv-danger) 17%, transparent);\n  background: color-mix(in srgb, var(--fv-danger) 9%, white);\n  color: var(--fv-danger);\n}\n\n.category-detail__usage[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  padding: 14px 15px 13px;\n  border: 1px solid color-mix(in srgb, var(--category-color) 14%, var(--fv-border));\n  border-radius: 15px;\n  background: rgba(255, 255, 255, .78);\n  box-shadow:\n    inset 0 1px 0 #fff,\n    0 7px 18px color-mix(in srgb, var(--category-color) 7%, transparent);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n}\n\n.category-detail__usage-heading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n}\n\n.category-detail__usage-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--fv-text-secondary);\n  font-size: 10px;\n  font-weight: 650;\n}\n\n.category-detail__usage-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: var(--fv-text-muted);\n  font-size: 10px;\n  font-variant-numeric: tabular-nums;\n}\n\n.category-detail__usage-heading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--category-color);\n  font-size: 22px;\n  font-weight: 820;\n  font-variant-numeric: tabular-nums;\n  letter-spacing: -.035em;\n  line-height: 1;\n}\n\n.category-detail__progress[_ngcontent-%COMP%] {\n  height: 7px;\n  margin-top: 12px;\n  overflow: hidden;\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--category-color) 9%, #e8edf4);\n  box-shadow: inset 0 1px 2px rgba(31, 37, 76, .06);\n}\n\n.category-detail__progress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  min-width: 0;\n  height: 100%;\n  border-radius: inherit;\n  background: linear-gradient(\n    90deg,\n    var(--category-color),\n    color-mix(in srgb, var(--category-color) 68%, white)\n  );\n  box-shadow: 0 0 8px color-mix(in srgb, var(--category-color) 28%, transparent);\n}\n\n.category-detail__metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  margin: 0;\n  padding: 18px 12px;\n  border-top: 1px solid color-mix(in srgb, var(--category-color) 7%, var(--fv-border));\n  border-bottom: 1px solid color-mix(in srgb, var(--category-color) 7%, var(--fv-border));\n  background: #fff;\n}\n\n.category-detail__metrics[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  min-width: 0;\n  padding: 0 9px;\n  text-align: center;\n}\n\n.category-detail__metrics[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  border-left: 1px solid var(--fv-border);\n}\n\n.category-detail__metrics[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  margin-bottom: 6px;\n  color: var(--fv-text-muted);\n  font-size: 9px;\n  font-weight: 650;\n}\n\n.category-detail__metrics[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  margin: 0;\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 12px;\n  font-weight: 780;\n  font-variant-numeric: tabular-nums;\n  letter-spacing: -.015em;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.category-detail__metrics[_ngcontent-%COMP%]   dd.category-detail__danger[_ngcontent-%COMP%] {\n  color: var(--fv-danger);\n}\n\n.category-detail__period[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 61px;\n  align-items: center;\n  gap: 11px;\n  padding: 12px 18px 14px;\n  background: color-mix(in srgb, var(--fv-primary) 1.5%, white);\n}\n\n.category-detail__period[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.category-detail__period[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.category-detail__period[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.category-detail__period[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-bottom: 3px;\n  color: var(--fv-text-muted);\n  font-size: 9px;\n  font-weight: 650;\n}\n\n.category-detail__period[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 12px;\n  font-weight: 700;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n@media (max-width: 380px) {\n  .category-detail[_ngcontent-%COMP%] {\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n\n  .category-detail__hero[_ngcontent-%COMP%] {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n\n  .category-detail__identity[_ngcontent-%COMP%] {\n    grid-template-columns: auto minmax(0, 1fr);\n  }\n\n  .category-detail__status[_ngcontent-%COMP%] {\n    grid-column: 2;\n    justify-self: start;\n  }\n\n  .category-detail__metrics[_ngcontent-%COMP%] {\n    padding-right: 6px;\n    padding-left: 6px;\n  }\n\n  .category-detail__metrics[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    padding-right: 6px;\n    padding-left: 6px;\n  }\n\n  .category-detail__metrics[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n}\n\n\n\n\n\n\n.category-transactions[_ngcontent-%COMP%] {\n  margin-top: 26px;\n}\n\n.category-transactions__list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 18px;\n}\n\n.transaction-date-group[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  padding-left: 4px;\n  color: #9399ad;\n  font-size: 9px;\n  font-weight: 750;\n  letter-spacing: .15em;\n  line-height: 1.3;\n}\n\n.transaction-date-group__items[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n}\n\n.transaction-item[_ngcontent-%COMP%] {\n  --transaction-color: var(--fv-primary);\n  position: relative;\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  min-height: 66px;\n  align-items: center;\n  gap: 12px;\n  padding: 11px 13px 11px 14px;\n  overflow: hidden;\n  border: 1px solid color-mix(in srgb, var(--transaction-color) 9%, var(--fv-border));\n  border-radius: 16px;\n  background: #fff;\n  box-shadow:\n    0 7px 19px rgba(31, 37, 76, .055),\n    0 1px 3px rgba(31, 37, 76, .025);\n}\n\n.transaction-item[_ngcontent-%COMP%]::before {\n  position: absolute;\n  top: 12px;\n  bottom: 12px;\n  left: 0;\n  width: 3px;\n  border-radius: 0 999px 999px 0;\n  background: var(--transaction-color);\n  opacity: .72;\n  content: '';\n}\n\n.transaction-item__content[_ngcontent-%COMP%], \n.transaction-item__amount[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.transaction-item__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.transaction-item__content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.transaction-item__amount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.transaction-item__amount[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.transaction-item__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 12.5px;\n  font-weight: 740;\n  letter-spacing: -.01em;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.transaction-item__content[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  overflow: hidden;\n  color: var(--fv-text-muted);\n  color: #858b9d;\n  font-size: 9.5px;\n  font-weight: 500;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.transaction-item__content[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin: 0 3px;\n  font-style: normal;\n}\n\n.transaction-item__amount[_ngcontent-%COMP%] {\n  text-align: right;\n}\n\n.transaction-item__amount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #29246f;\n  font-size: 12px;\n  font-weight: 800;\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n}\n\n.transaction-item__amount[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: fit-content;\n  margin: 5px 0 0 auto;\n  padding: 2px 6px;\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--fv-danger) 7%, white);\n  color: color-mix(in srgb, var(--fv-danger) 84%, #6b2440);\n  font-size: 8px;\n  font-weight: 700;\n}\n\n.category-transactions__loading[_ngcontent-%COMP%], \n.category-transactions__empty[_ngcontent-%COMP%] {\n  border: 1px solid rgba(226, 229, 238, .92);\n  border-radius: 17px;\n  background: #fff;\n  box-shadow: 0 9px 26px rgba(31, 37, 76, .05);\n}\n\n.category-transactions__loading[_ngcontent-%COMP%] {\n  padding: 6px 13px;\n}\n\n.category-transactions__loading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 62px;\n  align-items: center;\n  gap: 12px;\n}\n\n.category-transactions__loading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--fv-border);\n}\n\n.category-transactions__loading[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.category-transactions__loading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  border-radius: 9px;\n  background: linear-gradient(90deg, #eef0f6 25%, #f7f8fb 50%, #eef0f6 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_transaction-loading 1.25s ease-in-out infinite;\n}\n\n.category-transactions__loading[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  flex: 0 0 32px;\n}\n\n.category-transactions__loading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 68%;\n  height: 28px;\n}\n\n.category-transactions__empty[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  padding: 25px 20px 23px;\n  text-align: center;\n}\n\n.category-transactions__empty[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 11px 0 5px;\n  color: var(--fv-text-primary);\n  font-size: 13px;\n  font-weight: 750;\n}\n\n.category-transactions__empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  max-width: 290px;\n  margin: 0;\n  color: var(--fv-text-secondary);\n  font-size: 10.5px;\n  line-height: 1.45;\n}\n\n.category-transactions__empty[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 13px;\n  padding: 8px 14px;\n  border: 0;\n  border-radius: 10px;\n  background: color-mix(in srgb, var(--fv-primary) 9%, white);\n  color: var(--fv-primary);\n  font-size: 10px;\n  font-weight: 700;\n  cursor: pointer;\n}\n\n@keyframes _ngcontent-%COMP%_transaction-loading {\n  from {\n    background-position: 100% 0;\n  }\n\n  to {\n    background-position: -100% 0;\n  }\n}\n\n@media (max-width: 380px) {\n  .transaction-item[_ngcontent-%COMP%] {\n    gap: 9px;\n    padding-right: 10px;\n    padding-left: 10px;\n  }\n\n  .transaction-item__amount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 10.5px;\n  }\n}\n\n\n\n\n\n\n.category-detail-page[_ngcontent-%COMP%] {\n  --background: linear-gradient(180deg, #fbfbff 0%, #f5f6fb 100%);\n}\n\n.category-detail__card[_ngcontent-%COMP%] {\n  overflow: visible;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n}\n\n.category-detail__card[_ngcontent-%COMP%]::before {\n  display: none;\n}\n\n.category-detail__hero[_ngcontent-%COMP%] {\n  padding: 18px 17px 55px;\n  border: 1px solid rgba(255, 255, 255, .14);\n  border-radius: 20px;\n  background:\n    radial-gradient(\n      circle at 100% 0%,\n      color-mix(in srgb, var(--category-color) 26%, transparent),\n      transparent 38%\n    ),\n    var(--fv-gradient-primary);\n  box-shadow: var(--fv-shadow-primary);\n  color: #fff;\n}\n\n.category-detail__hero[_ngcontent-%COMP%]::before, \n.category-detail__hero[_ngcontent-%COMP%]::after {\n  position: absolute;\n  z-index: -1;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, .055);\n  content: '';\n}\n\n.category-detail__hero[_ngcontent-%COMP%]::before {\n  top: -64px;\n  right: -42px;\n  width: 142px;\n  height: 142px;\n}\n\n.category-detail__hero[_ngcontent-%COMP%]::after {\n  right: 82px;\n  bottom: -92px;\n  width: 160px;\n  height: 160px;\n}\n\n.category-detail__identity[_ngcontent-%COMP%]    > app-item-icon[_ngcontent-%COMP%] {\n  filter: drop-shadow(0 7px 14px rgba(18, 6, 74, .2));\n}\n\n.category-detail__heading[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, .64);\n}\n\n.category-detail__heading[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #fff;\n}\n\n.category-detail__heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, .72);\n}\n\n.category-detail__status[_ngcontent-%COMP%], \n.category-detail__status[data-status='WARNING'][_ngcontent-%COMP%], \n.category-detail__status[data-status='EXCEEDED'][_ngcontent-%COMP%] {\n  border-color: rgba(255, 255, 255, .16);\n  background: rgba(255, 255, 255, .11);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08);\n  color: #fff;\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n}\n\n.category-detail__status[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #77efa0;\n}\n\n.category-detail__status[data-status='WARNING'][_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #ffd36b;\n}\n\n.category-detail__status[data-status='EXCEEDED'][_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #ff8e9a;\n}\n\n.category-detail__usage[_ngcontent-%COMP%] {\n  margin-top: 18px;\n  padding: 13px 14px 12px;\n  border-color: rgba(255, 255, 255, .13);\n  background: rgba(20, 8, 83, .19);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, .06),\n    0 8px 20px rgba(17, 5, 69, .12);\n}\n\n.category-detail__usage-heading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, .68);\n}\n\n.category-detail__usage-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, .7);\n}\n\n.category-detail__usage-heading[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #fff;\n  text-shadow: 0 2px 10px rgba(12, 3, 58, .2);\n}\n\n.category-detail__progress[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, .16);\n  box-shadow: inset 0 1px 2px rgba(12, 3, 58, .16);\n}\n\n.category-detail__progress[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: linear-gradient(\n    90deg,\n    color-mix(in srgb, var(--category-color) 68%, #fff),\n    #fff\n  );\n  box-shadow: 0 0 10px rgba(255, 255, 255, .24);\n}\n\n.category-detail__metrics[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  margin: -37px 9px 0;\n  padding: 15px 8px 14px;\n  border: 1px solid rgba(222, 226, 237, .92);\n  border-radius: 16px;\n  background: rgba(255, 255, 255, .985);\n  box-shadow:\n    0 12px 28px rgba(24, 10, 83, .1),\n    0 2px 7px rgba(24, 10, 83, .04);\n}\n\n.category-detail__metrics[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  padding: 0 8px;\n}\n\n.category-detail__metrics[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n  color: #7b8194;\n}\n\n.category-detail__metrics[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n  color: #25206f;\n  font-size: 12.5px;\n}\n\n.category-detail__period[_ngcontent-%COMP%] {\n  min-height: 62px;\n  margin: 12px 9px 0;\n  padding: 11px 14px;\n  border: 1px solid rgba(226, 229, 238, .92);\n  border-radius: 15px;\n  background: #fff;\n  box-shadow: 0 7px 20px rgba(31, 37, 76, .055);\n}\n\n.category-detail__period[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #858b9d;\n}\n\n.category-detail__period[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #29246f;\n}\n\n@media (max-width: 380px) {\n  .category-detail__hero[_ngcontent-%COMP%] {\n    padding: 16px 14px 53px;\n  }\n\n  .category-detail__metrics[_ngcontent-%COMP%] {\n    margin-right: 7px;\n    margin-left: 7px;\n    padding-right: 4px;\n    padding-left: 4px;\n  }\n\n  .category-detail__metrics[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n    padding-right: 5px;\n    padding-left: 5px;\n  }\n\n  .category-detail__period[_ngcontent-%COMP%] {\n    margin-right: 7px;\n    margin-left: 7px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DetailBudgetCategoryPage, [{
        type: Component,
        args: [{ selector: 'app-detail-budget-category', standalone: true, imports: [
                    CommonModule,
                    IonContent,
                    IonHeader,
                    ItemIconComponent,
                    PageLayoutComponent,
                    SectionCardComponent
                ], template: "<ion-header>\n  <app-page-layout\n    title=\"Detalle de categor\u00EDa\"\n    [showBack]=\"true\"\n    (back)=\"backToBudget()\">\n  </app-page-layout>\n</ion-header>\n\n<ion-content [fullscreen]=\"false\" class=\"category-detail-page\">\n  <main class=\"category-detail\">\n    <article class=\"category-detail__card\" [style.--category-color]=\"category.color\">\n      <section class=\"category-detail__hero\">\n        <header class=\"category-detail__identity\">\n          <app-item-icon\n            [icon]=\"category.icon\"\n            [color]=\"category.color\"\n            size=\"lg\"\n            variant=\"glass\">\n          </app-item-icon>\n\n          <div class=\"category-detail__heading\">\n            <span>Categor\u00EDa</span>\n            <h1>{{ category.name }}</h1>\n            <p>{{ budgetName }}</p>\n          </div>\n\n          <span class=\"category-detail__status\" [attr.data-status]=\"category.status\">\n            <i></i>\n            {{ statusLabel }}\n          </span>\n        </header>\n\n        <div class=\"category-detail__usage\">\n          <div class=\"category-detail__usage-heading\">\n            <div>\n              <span>Consumo del presupuesto</span>\n              <p>\n                {{ currencySymbol }} {{ category.used | number:'1.2-2' }}\n                de\n                {{ currencySymbol }} {{ category.budgeted | number:'1.2-2' }}\n              </p>\n            </div>\n            <strong>{{ category.percentage | number:'1.0-1' }}%</strong>\n          </div>\n\n          <div\n            class=\"category-detail__progress\"\n            role=\"progressbar\"\n            aria-label=\"Porcentaje utilizado\"\n            aria-valuemin=\"0\"\n            aria-valuemax=\"100\"\n            [attr.aria-valuenow]=\"progressWidth\">\n            <span [style.width.%]=\"progressWidth\"></span>\n          </div>\n        </div>\n      </section>\n\n      <dl class=\"category-detail__metrics\">\n        <div>\n          <dt>Presupuestado</dt>\n          <dd>{{ currencySymbol }} {{ category.budgeted | number:'1.2-2' }}</dd>\n        </div>\n        <div>\n          <dt>Utilizado</dt>\n          <dd>{{ currencySymbol }} {{ category.used | number:'1.2-2' }}</dd>\n        </div>\n        <div>\n          <dt>{{ remainingLabel }}</dt>\n          <dd [class.category-detail__danger]=\"category.status === 'EXCEEDED'\">\n            {{ currencySymbol }} {{ remainingAmount | number:'1.2-2' }}\n          </dd>\n        </div>\n      </dl>\n\n      <footer class=\"category-detail__period\">\n        <app-item-icon\n          icon=\"calendar\"\n          color=\"var(--fv-primary)\"\n          size=\"xs\"\n          variant=\"soft\"\n          aria-hidden=\"true\">\n        </app-item-icon>\n        <div>\n          <span>Periodo del presupuesto</span>\n          <strong>{{ dateRangeLabel }}</strong>\n        </div>\n      </footer>\n    </article>\n\n    <section class=\"category-transactions\" aria-label=\"Transacciones\">\n      <app-section-card title=\"Transacciones\" appearance=\"plain\">\n        <div *ngIf=\"isLoadingTransactions\" class=\"category-transactions__loading\" aria-label=\"Cargando transacciones\">\n          <div *ngFor=\"let item of [1, 2, 3]\">\n            <i></i>\n            <span></span>\n          </div>\n        </div>\n\n        <div\n          *ngIf=\"!isLoadingTransactions && !hasTransactionError && transactions.length\"\n          class=\"category-transactions__list\">\n          <section\n            *ngFor=\"let group of transactionGroups; trackBy: trackByTransactionGroup\"\n            class=\"transaction-date-group\"\n            [attr.aria-label]=\"group.label\">\n            <h3>{{ group.label }}</h3>\n\n            <div class=\"transaction-date-group__items\">\n              <article\n                *ngFor=\"let transaction of group.transactions; trackBy: trackByTransaction\"\n                class=\"transaction-item\"\n                [style.--transaction-color]=\"transaction.account.color\">\n                <app-item-icon\n                  [icon]=\"transaction.account.icon || 'bank'\"\n                  [color]=\"transaction.account.color || 'var(--fv-primary)'\"\n                  size=\"sm\"\n                  variant=\"soft\"\n                  aria-hidden=\"true\">\n                </app-item-icon>\n\n                <div class=\"transaction-item__content\">\n                  <strong>{{ transactionTitle(transaction) }}</strong>\n                  <span>{{ transaction.account.name }}</span>\n                </div>\n\n                <div class=\"transaction-item__amount\">\n                  <strong>\u2212 {{ currencySymbol }} {{ transaction.amount | number:'1.2-2' }}</strong>\n                  <span>Salida</span>\n                </div>\n              </article>\n            </div>\n          </section>\n        </div>\n\n        <div\n          *ngIf=\"!isLoadingTransactions && !hasTransactionError && transactions.length === 0\"\n          class=\"category-transactions__empty\">\n          <app-item-icon\n            icon=\"bills\"\n            color=\"var(--fv-primary)\"\n            size=\"md\"\n            variant=\"soft\"\n            aria-hidden=\"true\">\n          </app-item-icon>\n          <h3>Sin transacciones</h3>\n          <p>No hay movimientos de esta categor\u00EDa dentro del periodo del presupuesto.</p>\n        </div>\n\n        <div *ngIf=\"!isLoadingTransactions && hasTransactionError\" class=\"category-transactions__empty\">\n          <app-item-icon\n            icon=\"alert-triangle\"\n            color=\"var(--fv-danger)\"\n            size=\"md\"\n            variant=\"soft\"\n            aria-hidden=\"true\">\n          </app-item-icon>\n          <h3>No se pudieron cargar</h3>\n          <p>Revisa tu conexi\u00F3n e int\u00E9ntalo nuevamente.</p>\n          <button type=\"button\" (click)=\"loadTransactions()\">Reintentar</button>\n        </div>\n      </app-section-card>\n    </section>\n  </main>\n</ion-content>\n", styles: [":host {\n  display: block;\n}\n\n.category-detail-page {\n  --background: linear-gradient(180deg, #fafbff 0%, var(--fv-background) 100%);\n}\n\n.category-detail {\n  width: 100%;\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 18px 14px calc(24px + env(safe-area-inset-bottom));\n}\n\n.category-detail__card {\n  --category-color: var(--fv-primary);\n  position: relative;\n  overflow: hidden;\n  border: 1px solid color-mix(in srgb, var(--category-color) 12%, var(--fv-border));\n  border-radius: 22px;\n  background: var(--fv-surface);\n  box-shadow:\n    0 18px 42px rgba(31, 37, 76, .09),\n    0 2px 8px rgba(31, 37, 76, .04);\n}\n\n.category-detail__card::before {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 2;\n  height: 3px;\n  background: linear-gradient(\n    90deg,\n    var(--category-color),\n    color-mix(in srgb, var(--category-color) 54%, #7c6ff5)\n  );\n  content: '';\n}\n\n.category-detail__hero {\n  position: relative;\n  isolation: isolate;\n  padding: 20px 18px 18px;\n  overflow: hidden;\n  background:\n    radial-gradient(\n      circle at 102% -10%,\n      color-mix(in srgb, var(--category-color) 16%, transparent),\n      transparent 42%\n    ),\n    linear-gradient(\n      145deg,\n      color-mix(in srgb, var(--category-color) 4%, white),\n      var(--fv-surface) 64%\n    );\n}\n\n.category-detail__hero::after {\n  position: absolute;\n  right: -58px;\n  bottom: -76px;\n  z-index: -1;\n  width: 150px;\n  height: 150px;\n  border-radius: 50%;\n  background: color-mix(in srgb, var(--category-color) 5%, transparent);\n  content: '';\n}\n\n.category-detail__identity {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 12px;\n}\n\n.category-detail__heading {\n  min-width: 0;\n}\n\n.category-detail__heading > span {\n  display: block;\n  margin-bottom: 3px;\n  color: var(--category-color);\n  font-size: 9px;\n  font-weight: 800;\n  letter-spacing: .1em;\n  text-transform: uppercase;\n}\n\n.category-detail__heading h1 {\n  margin: 0;\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 18px;\n  font-weight: 780;\n  letter-spacing: -.025em;\n  line-height: 1.25;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.category-detail__heading p {\n  margin: 4px 0 0;\n  overflow: hidden;\n  color: var(--fv-text-secondary);\n  font-size: 11px;\n  font-weight: 500;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.category-detail__status {\n  display: inline-flex;\n  align-items: center;\n  gap: 5px;\n  padding: 5px 8px;\n  border: 1px solid color-mix(in srgb, var(--fv-success) 16%, transparent);\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--fv-success) 9%, white);\n  color: var(--fv-success);\n  font-size: 9px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n.category-detail__status i {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: currentColor;\n  box-shadow: 0 0 0 3px color-mix(in srgb, currentColor 10%, transparent);\n}\n\n.category-detail__status[data-status='WARNING'] {\n  border-color: color-mix(in srgb, var(--fv-warning) 18%, transparent);\n  background: color-mix(in srgb, var(--fv-warning) 10%, white);\n  color: var(--fv-warning);\n}\n\n.category-detail__status[data-status='EXCEEDED'] {\n  border-color: color-mix(in srgb, var(--fv-danger) 17%, transparent);\n  background: color-mix(in srgb, var(--fv-danger) 9%, white);\n  color: var(--fv-danger);\n}\n\n.category-detail__usage {\n  margin-top: 20px;\n  padding: 14px 15px 13px;\n  border: 1px solid color-mix(in srgb, var(--category-color) 14%, var(--fv-border));\n  border-radius: 15px;\n  background: rgba(255, 255, 255, .78);\n  box-shadow:\n    inset 0 1px 0 #fff,\n    0 7px 18px color-mix(in srgb, var(--category-color) 7%, transparent);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n}\n\n.category-detail__usage-heading {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n}\n\n.category-detail__usage-heading span {\n  color: var(--fv-text-secondary);\n  font-size: 10px;\n  font-weight: 650;\n}\n\n.category-detail__usage-heading p {\n  margin: 4px 0 0;\n  color: var(--fv-text-muted);\n  font-size: 10px;\n  font-variant-numeric: tabular-nums;\n}\n\n.category-detail__usage-heading strong {\n  color: var(--category-color);\n  font-size: 22px;\n  font-weight: 820;\n  font-variant-numeric: tabular-nums;\n  letter-spacing: -.035em;\n  line-height: 1;\n}\n\n.category-detail__progress {\n  height: 7px;\n  margin-top: 12px;\n  overflow: hidden;\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--category-color) 9%, #e8edf4);\n  box-shadow: inset 0 1px 2px rgba(31, 37, 76, .06);\n}\n\n.category-detail__progress span {\n  display: block;\n  min-width: 0;\n  height: 100%;\n  border-radius: inherit;\n  background: linear-gradient(\n    90deg,\n    var(--category-color),\n    color-mix(in srgb, var(--category-color) 68%, white)\n  );\n  box-shadow: 0 0 8px color-mix(in srgb, var(--category-color) 28%, transparent);\n}\n\n.category-detail__metrics {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  margin: 0;\n  padding: 18px 12px;\n  border-top: 1px solid color-mix(in srgb, var(--category-color) 7%, var(--fv-border));\n  border-bottom: 1px solid color-mix(in srgb, var(--category-color) 7%, var(--fv-border));\n  background: #fff;\n}\n\n.category-detail__metrics > div {\n  min-width: 0;\n  padding: 0 9px;\n  text-align: center;\n}\n\n.category-detail__metrics > div + div {\n  border-left: 1px solid var(--fv-border);\n}\n\n.category-detail__metrics dt {\n  margin-bottom: 6px;\n  color: var(--fv-text-muted);\n  font-size: 9px;\n  font-weight: 650;\n}\n\n.category-detail__metrics dd {\n  margin: 0;\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 12px;\n  font-weight: 780;\n  font-variant-numeric: tabular-nums;\n  letter-spacing: -.015em;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.category-detail__metrics dd.category-detail__danger {\n  color: var(--fv-danger);\n}\n\n.category-detail__period {\n  display: flex;\n  min-height: 61px;\n  align-items: center;\n  gap: 11px;\n  padding: 12px 18px 14px;\n  background: color-mix(in srgb, var(--fv-primary) 1.5%, white);\n}\n\n.category-detail__period div {\n  min-width: 0;\n}\n\n.category-detail__period span,\n.category-detail__period strong {\n  display: block;\n}\n\n.category-detail__period span {\n  margin-bottom: 3px;\n  color: var(--fv-text-muted);\n  font-size: 9px;\n  font-weight: 650;\n}\n\n.category-detail__period strong {\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 12px;\n  font-weight: 700;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n@media (max-width: 380px) {\n  .category-detail {\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n\n  .category-detail__hero {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n\n  .category-detail__identity {\n    grid-template-columns: auto minmax(0, 1fr);\n  }\n\n  .category-detail__status {\n    grid-column: 2;\n    justify-self: start;\n  }\n\n  .category-detail__metrics {\n    padding-right: 6px;\n    padding-left: 6px;\n  }\n\n  .category-detail__metrics > div {\n    padding-right: 6px;\n    padding-left: 6px;\n  }\n\n  .category-detail__metrics dd {\n    font-size: 11px;\n  }\n}\n\n/* ==========================================================\n   TRANSACTIONS\n   ========================================================== */\n\n.category-transactions {\n  margin-top: 26px;\n}\n\n.category-transactions__list {\n  display: grid;\n  gap: 18px;\n}\n\n.transaction-date-group h3 {\n  margin: 0 0 8px;\n  padding-left: 4px;\n  color: #9399ad;\n  font-size: 9px;\n  font-weight: 750;\n  letter-spacing: .15em;\n  line-height: 1.3;\n}\n\n.transaction-date-group__items {\n  display: grid;\n  gap: 8px;\n}\n\n.transaction-item {\n  --transaction-color: var(--fv-primary);\n  position: relative;\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  min-height: 66px;\n  align-items: center;\n  gap: 12px;\n  padding: 11px 13px 11px 14px;\n  overflow: hidden;\n  border: 1px solid color-mix(in srgb, var(--transaction-color) 9%, var(--fv-border));\n  border-radius: 16px;\n  background: #fff;\n  box-shadow:\n    0 7px 19px rgba(31, 37, 76, .055),\n    0 1px 3px rgba(31, 37, 76, .025);\n}\n\n.transaction-item::before {\n  position: absolute;\n  top: 12px;\n  bottom: 12px;\n  left: 0;\n  width: 3px;\n  border-radius: 0 999px 999px 0;\n  background: var(--transaction-color);\n  opacity: .72;\n  content: '';\n}\n\n.transaction-item__content,\n.transaction-item__amount {\n  min-width: 0;\n}\n\n.transaction-item__content strong,\n.transaction-item__content span,\n.transaction-item__amount strong,\n.transaction-item__amount span {\n  display: block;\n}\n\n.transaction-item__content strong {\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 12.5px;\n  font-weight: 740;\n  letter-spacing: -.01em;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.transaction-item__content span {\n  margin-top: 4px;\n  overflow: hidden;\n  color: var(--fv-text-muted);\n  color: #858b9d;\n  font-size: 9.5px;\n  font-weight: 500;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.transaction-item__content i {\n  margin: 0 3px;\n  font-style: normal;\n}\n\n.transaction-item__amount {\n  text-align: right;\n}\n\n.transaction-item__amount strong {\n  color: #29246f;\n  font-size: 12px;\n  font-weight: 800;\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n}\n\n.transaction-item__amount span {\n  width: fit-content;\n  margin: 5px 0 0 auto;\n  padding: 2px 6px;\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--fv-danger) 7%, white);\n  color: color-mix(in srgb, var(--fv-danger) 84%, #6b2440);\n  font-size: 8px;\n  font-weight: 700;\n}\n\n.category-transactions__loading,\n.category-transactions__empty {\n  border: 1px solid rgba(226, 229, 238, .92);\n  border-radius: 17px;\n  background: #fff;\n  box-shadow: 0 9px 26px rgba(31, 37, 76, .05);\n}\n\n.category-transactions__loading {\n  padding: 6px 13px;\n}\n\n.category-transactions__loading > div {\n  display: flex;\n  min-height: 62px;\n  align-items: center;\n  gap: 12px;\n}\n\n.category-transactions__loading > div + div {\n  border-top: 1px solid var(--fv-border);\n}\n\n.category-transactions__loading i,\n.category-transactions__loading span {\n  display: block;\n  border-radius: 9px;\n  background: linear-gradient(90deg, #eef0f6 25%, #f7f8fb 50%, #eef0f6 75%);\n  background-size: 200% 100%;\n  animation: transaction-loading 1.25s ease-in-out infinite;\n}\n\n.category-transactions__loading i {\n  width: 32px;\n  height: 32px;\n  flex: 0 0 32px;\n}\n\n.category-transactions__loading span {\n  width: 68%;\n  height: 28px;\n}\n\n.category-transactions__empty {\n  display: grid;\n  justify-items: center;\n  padding: 25px 20px 23px;\n  text-align: center;\n}\n\n.category-transactions__empty h3 {\n  margin: 11px 0 5px;\n  color: var(--fv-text-primary);\n  font-size: 13px;\n  font-weight: 750;\n}\n\n.category-transactions__empty p {\n  max-width: 290px;\n  margin: 0;\n  color: var(--fv-text-secondary);\n  font-size: 10.5px;\n  line-height: 1.45;\n}\n\n.category-transactions__empty button {\n  margin-top: 13px;\n  padding: 8px 14px;\n  border: 0;\n  border-radius: 10px;\n  background: color-mix(in srgb, var(--fv-primary) 9%, white);\n  color: var(--fv-primary);\n  font-size: 10px;\n  font-weight: 700;\n  cursor: pointer;\n}\n\n@keyframes transaction-loading {\n  from {\n    background-position: 100% 0;\n  }\n\n  to {\n    background-position: -100% 0;\n  }\n}\n\n@media (max-width: 380px) {\n  .transaction-item {\n    gap: 9px;\n    padding-right: 10px;\n    padding-left: 10px;\n  }\n\n  .transaction-item__amount strong {\n    font-size: 10.5px;\n  }\n}\n\n/* ==========================================================\n   FINVIA LAYERED COMPOSITION\n   ========================================================== */\n\n.category-detail-page {\n  --background: linear-gradient(180deg, #fbfbff 0%, #f5f6fb 100%);\n}\n\n.category-detail__card {\n  overflow: visible;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n}\n\n.category-detail__card::before {\n  display: none;\n}\n\n.category-detail__hero {\n  padding: 18px 17px 55px;\n  border: 1px solid rgba(255, 255, 255, .14);\n  border-radius: 20px;\n  background:\n    radial-gradient(\n      circle at 100% 0%,\n      color-mix(in srgb, var(--category-color) 26%, transparent),\n      transparent 38%\n    ),\n    var(--fv-gradient-primary);\n  box-shadow: var(--fv-shadow-primary);\n  color: #fff;\n}\n\n.category-detail__hero::before,\n.category-detail__hero::after {\n  position: absolute;\n  z-index: -1;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, .055);\n  content: '';\n}\n\n.category-detail__hero::before {\n  top: -64px;\n  right: -42px;\n  width: 142px;\n  height: 142px;\n}\n\n.category-detail__hero::after {\n  right: 82px;\n  bottom: -92px;\n  width: 160px;\n  height: 160px;\n}\n\n.category-detail__identity > app-item-icon {\n  filter: drop-shadow(0 7px 14px rgba(18, 6, 74, .2));\n}\n\n.category-detail__heading > span {\n  color: rgba(255, 255, 255, .64);\n}\n\n.category-detail__heading h1 {\n  color: #fff;\n}\n\n.category-detail__heading p {\n  color: rgba(255, 255, 255, .72);\n}\n\n.category-detail__status,\n.category-detail__status[data-status='WARNING'],\n.category-detail__status[data-status='EXCEEDED'] {\n  border-color: rgba(255, 255, 255, .16);\n  background: rgba(255, 255, 255, .11);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08);\n  color: #fff;\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n}\n\n.category-detail__status i {\n  color: #77efa0;\n}\n\n.category-detail__status[data-status='WARNING'] i {\n  color: #ffd36b;\n}\n\n.category-detail__status[data-status='EXCEEDED'] i {\n  color: #ff8e9a;\n}\n\n.category-detail__usage {\n  margin-top: 18px;\n  padding: 13px 14px 12px;\n  border-color: rgba(255, 255, 255, .13);\n  background: rgba(20, 8, 83, .19);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, .06),\n    0 8px 20px rgba(17, 5, 69, .12);\n}\n\n.category-detail__usage-heading span {\n  color: rgba(255, 255, 255, .68);\n}\n\n.category-detail__usage-heading p {\n  color: rgba(255, 255, 255, .7);\n}\n\n.category-detail__usage-heading strong {\n  color: #fff;\n  text-shadow: 0 2px 10px rgba(12, 3, 58, .2);\n}\n\n.category-detail__progress {\n  background: rgba(255, 255, 255, .16);\n  box-shadow: inset 0 1px 2px rgba(12, 3, 58, .16);\n}\n\n.category-detail__progress span {\n  background: linear-gradient(\n    90deg,\n    color-mix(in srgb, var(--category-color) 68%, #fff),\n    #fff\n  );\n  box-shadow: 0 0 10px rgba(255, 255, 255, .24);\n}\n\n.category-detail__metrics {\n  position: relative;\n  z-index: 2;\n  margin: -37px 9px 0;\n  padding: 15px 8px 14px;\n  border: 1px solid rgba(222, 226, 237, .92);\n  border-radius: 16px;\n  background: rgba(255, 255, 255, .985);\n  box-shadow:\n    0 12px 28px rgba(24, 10, 83, .1),\n    0 2px 7px rgba(24, 10, 83, .04);\n}\n\n.category-detail__metrics > div {\n  padding: 0 8px;\n}\n\n.category-detail__metrics dt {\n  color: #7b8194;\n}\n\n.category-detail__metrics dd {\n  color: #25206f;\n  font-size: 12.5px;\n}\n\n.category-detail__period {\n  min-height: 62px;\n  margin: 12px 9px 0;\n  padding: 11px 14px;\n  border: 1px solid rgba(226, 229, 238, .92);\n  border-radius: 15px;\n  background: #fff;\n  box-shadow: 0 7px 20px rgba(31, 37, 76, .055);\n}\n\n.category-detail__period span {\n  color: #858b9d;\n}\n\n.category-detail__period strong {\n  color: #29246f;\n}\n\n@media (max-width: 380px) {\n  .category-detail__hero {\n    padding: 16px 14px 53px;\n  }\n\n  .category-detail__metrics {\n    margin-right: 7px;\n    margin-left: 7px;\n    padding-right: 4px;\n    padding-left: 4px;\n  }\n\n  .category-detail__metrics > div {\n    padding-right: 5px;\n    padding-left: 5px;\n  }\n\n  .category-detail__period {\n    margin-right: 7px;\n    margin-left: 7px;\n  }\n}\n"] }]
    }], () => [{ type: i1.NavigationService }, { type: i2.FilterTransactionsUseCase }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DetailBudgetCategoryPage, { className: "DetailBudgetCategoryPage", filePath: "src/app/features/side-menu/budgets/detail-budget-category/detail-budget-category.page.ts", lineNumber: 43 }); })();
//# sourceMappingURL=detail-budget-category.page.js.map