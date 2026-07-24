import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import { FeatureHeaderComponent } from 'src/app/shared/components/feature-header/feature-header.component';
import { FloatingActionButtonComponent } from 'src/app/shared/components/floating-action-button/floating-action-button.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { AmountListItemComponent } from 'src/app/shared/components/amount-list-item/amount-list-item.component';
import { PeriodSummaryCardComponent } from 'src/app/shared/components/period-summary-card/period-summary-card.component';
import { FilterModalComponent } from 'src/app/shared/components/filter-modal/filter-modal.component';
import { AccountSelectionMode, AccountSelectorModalComponent } from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import 'src/app/core/utils/observable-extensions';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/use-cases/transactions/filter-transactions.usecase";
import * as i2 from "src/app/core/use-cases/accounts/list-accounts.usecase";
import * as i3 from "src/app/core/services/navigation.service";
import * as i4 from "@angular/common";
const _c0 = () => [1, 2, 3, 4];
function TransactionsPage_app_period_summary_card_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-period-summary-card", 18);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("totalLabel", ctx_r0.totalLabel)("totalAmount", ctx_r0.totalAmount)("metaValue", ctx_r0.accountCount)("metaLabel", ctx_r0.accountLabel)("chartSegments", ctx_r0.chartSegments)("chartAriaLabel", ctx_r0.chartAriaLabel)("chartTone", ctx_r0.selectedType === "ingreso" ? "success" : "primary")("periodLabel", ctx_r0.periodLabel)("currencySymbol", ctx_r0.currencySymbol);
} }
function TransactionsPage_div_27_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "i")(2, "span");
    i0.ɵɵelementEnd();
} }
function TransactionsPage_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵtemplate(1, TransactionsPage_div_27_div_1_Template, 3, 0, "div", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c0));
} }
function TransactionsPage_div_28_app_amount_list_item_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-amount-list-item", 23);
} if (rf & 2) {
    const transaction_r2 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("title", transaction_r2.category.name)("subtitle", transaction_r2.account.name)("icon", transaction_r2.category.icon)("color", transaction_r2.category.color)("amount", transaction_r2.amount)("amountTone", transaction_r2.type === "ingreso" ? "success" : "default")("currencySymbol", ctx_r0.currencySymbol);
} }
function TransactionsPage_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtemplate(1, TransactionsPage_div_28_app_amount_list_item_1_Template, 1, 7, "app-amount-list-item", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.transactions)("ngForTrackBy", ctx_r0.trackByTransaction);
} }
function TransactionsPage_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelement(1, "app-item-icon", 25);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "Sin movimientos");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("A\u00FAn no tienes ", ctx_r0.selectedType === "gasto" ? "gastos" : "ingresos", " registrados.");
} }
function TransactionsPage_div_30_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelement(1, "app-item-icon", 26);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "No se pudieron cargar");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Revisa tu conexi\u00F3n e int\u00E9ntalo nuevamente.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 27);
    i0.ɵɵlistener("click", function TransactionsPage_div_30_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.loadTransactions()); });
    i0.ɵɵtext(7, "Reintentar");
    i0.ɵɵelementEnd()();
} }
export class TransactionsPage {
    constructor(filterTransactionsUseCase, listAccountsUseCase, navService) {
        this.filterTransactionsUseCase = filterTransactionsUseCase;
        this.listAccountsUseCase = listAccountsUseCase;
        this.navService = navService;
        this.AccountSelectionMode = AccountSelectionMode;
        this.transactionTypes = [
            { value: 'gasto', label: 'Gastos' },
            { value: 'ingreso', label: 'Ingresos' }
        ];
        this.currencySymbol = 'S/';
        this.selectedType = 'gasto';
        this.selectedPeriod = 'monthly';
        this.selectedPeriodValue = this.getCurrentMonth();
        this.selectedStartDate = this.getFirstDayOfCurrentMonth();
        this.selectedEndDate = this.getLastDayOfCurrentMonth();
        this.accounts = [];
        this.selectedAccounts = [];
        this.allTransactions = [];
        this.transactions = [];
        this.isLoading = false;
        this.hasError = false;
        this.isPeriodSelectorOpen = false;
        this.isAccountSelectorOpen = false;
    }
    ngOnInit() {
        this.loadAccounts();
        this.loadTransactions();
    }
    ngOnDestroy() {
        this.transactionRequest?.unsubscribe();
        this.accountRequest?.unsubscribe();
    }
    ionViewWillEnter() {
        void this.content?.scrollToTop(0);
    }
    get totalAmount() {
        return this.transactions.reduce((total, transaction) => total + transaction.amount, 0);
    }
    get totalLabel() {
        return this.selectedType === 'gasto' ? 'Total de gastos' : 'Total de ingresos';
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
        return `${this.formatShortDate(this.selectedStartDate)} – ${this.formatShortDate(this.selectedEndDate)}`;
    }
    get selectedPeriodLabel() {
        return {
            weekly: 'Semanal',
            monthly: 'Mensual',
            annual: 'Anual',
            custom: 'Periodo'
        }[this.selectedPeriod];
    }
    get compactDateRange() {
        return `${this.formatCompactDate(this.selectedStartDate)} – ${this.formatCompactDate(this.selectedEndDate)}`;
    }
    get selectedAccountLabel() {
        if (!this.accounts.length)
            return 'Sin cuentas';
        if (this.selectedAccounts.length === 1) {
            return this.selectedAccounts[0].name;
        }
        return `${this.selectedAccounts.length} cuentas`;
    }
    changeType(value) {
        if (value !== 'gasto' && value !== 'ingreso')
            return;
        this.selectedType = value;
        this.loadTransactions();
    }
    openPeriodSelector() {
        this.isPeriodSelectorOpen = true;
    }
    closePeriodSelector() {
        this.isPeriodSelectorOpen = false;
    }
    applyFilters(selection) {
        this.selectedPeriod = selection.period;
        this.selectedPeriodValue = selection.periodValue;
        this.selectedStartDate = selection.startDate;
        this.selectedEndDate = selection.endDate;
        this.closePeriodSelector();
        this.applyLocalFilters();
    }
    openAccountSelector() {
        this.isAccountSelectorOpen = true;
    }
    closeAccountSelector() {
        this.isAccountSelectorOpen = false;
    }
    applyAccountFilter(accounts) {
        this.selectedAccounts = [...accounts];
        this.closeAccountSelector();
        this.applyLocalFilters();
    }
    loadTransactions() {
        this.isLoading = true;
        this.hasError = false;
        this.transactionRequest?.unsubscribe();
        this.transactionRequest = this.filterTransactionsUseCase.execute({
            type: this.selectedType
        }).service({
            success: data => {
                this.allTransactions = [...(data?.items ?? [])];
                this.applyLocalFilters();
                this.isLoading = false;
            },
            failure: () => {
                this.allTransactions = [];
                this.transactions = [];
                this.isLoading = false;
                this.hasError = true;
            }
        });
    }
    createTransaction() {
        void this.navService.forward('/transactions/create');
    }
    trackByTransaction(_, transaction) {
        return transaction.id;
    }
    loadAccounts() {
        this.accountRequest?.unsubscribe();
        this.accountRequest = this.listAccountsUseCase.listAccounts().service({
            success: data => {
                this.accounts = data?.items ?? [];
                this.selectedAccounts = [...this.accounts];
                this.applyLocalFilters();
            },
            failure: () => {
                this.accounts = [];
                this.selectedAccounts = [];
            }
        });
    }
    applyLocalFilters() {
        const selectedAccountIds = new Set(this.selectedAccounts.map(account => account.id));
        const filterByAccount = this.accounts.length > 0 &&
            this.selectedAccounts.length < this.accounts.length;
        this.transactions = this.allTransactions
            .filter(transaction => {
            const date = transaction.date.slice(0, 10);
            const matchesDate = date >= this.selectedStartDate &&
                date <= this.selectedEndDate;
            const matchesAccount = !filterByAccount ||
                selectedAccountIds.has(transaction.account.id);
            return matchesDate && matchesAccount;
        })
            .sort((first, second) => second.date.localeCompare(first.date) || second.id - first.id);
        requestAnimationFrame(() => {
            void this.content?.scrollToTop(0);
        });
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
    formatCompactDate(value) {
        return new Intl.DateTimeFormat('es-PE', {
            day: '2-digit',
            month: 'short',
            timeZone: 'UTC'
        })
            .format(new Date(`${value}T00:00:00Z`))
            .replace(/\./g, '');
    }
    getCurrentMonth() {
        return this.formatDateInput(new Date()).slice(0, 7);
    }
    getFirstDayOfCurrentMonth() {
        const today = new Date();
        return this.formatDateInput(new Date(today.getFullYear(), today.getMonth(), 1));
    }
    getLastDayOfCurrentMonth() {
        const today = new Date();
        return this.formatDateInput(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    }
    formatDateInput(value) {
        const year = value.getFullYear();
        const month = `${value.getMonth() + 1}`.padStart(2, '0');
        const day = `${value.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    static { this.ɵfac = function TransactionsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TransactionsPage)(i0.ɵɵdirectiveInject(i1.FilterTransactionsUseCase), i0.ɵɵdirectiveInject(i2.ListAccountsUseCase), i0.ɵɵdirectiveInject(i3.NavigationService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TransactionsPage, selectors: [["app-transactions"]], viewQuery: function TransactionsPage_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(IonContent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.content = _t.first);
        } }, decls: 34, vars: 22, consts: [[1, "transactions-page", 3, "fullscreen", "forceOverscroll"], [1, "transactions"], ["title", "Transacciones", "description", "Consulta y controla todos tus movimientos.", "imageSrc", "assets/image/budget-chart.png"], ["aria-label", "Filtros de transacciones", 1, "transaction-filters"], ["type", "button", 1, "filter-trigger", "filter-trigger--period", 3, "click"], [1, "filter-trigger__content"], [1, "filter-trigger__action"], ["src", "assets/icon/right-inline.svg"], ["type", "button", 1, "filter-trigger", "filter-trigger--account", 3, "click", "disabled"], [3, "modelChange", "options", "model"], ["title", "Resumen del per\u00EDodo", 3, "totalLabel", "totalAmount", "metaValue", "metaLabel", "chartSegments", "chartAriaLabel", "chartTone", "periodLabel", "currencySymbol", 4, "ngIf"], ["title", "Movimientos", "appearance", "plain"], ["class", "transactions-loading", "aria-label", "Cargando transacciones", 4, "ngIf"], ["class", "transactions-list", 4, "ngIf"], ["class", "transactions-empty", 4, "ngIf"], ["title", "Filtrar transacciones", "description", "Selecciona el per\u00EDodo que deseas consultar.", "applyText", "Aplicar filtros", 3, "modalClosed", "filtersApplied", "isOpen", "selectedPeriod", "selectedPeriodValue", "selectedStartDate", "selectedEndDate"], [3, "accountsSelected", "modalClosed", "isOpen", "accounts", "selectionMode", "selectedAccounts"], ["icon", "add", "ariaLabel", "Registrar transacci\u00F3n", 3, "clicked"], ["title", "Resumen del per\u00EDodo", 3, "totalLabel", "totalAmount", "metaValue", "metaLabel", "chartSegments", "chartAriaLabel", "chartTone", "periodLabel", "currencySymbol"], ["aria-label", "Cargando transacciones", 1, "transactions-loading"], [4, "ngFor", "ngForOf"], [1, "transactions-list"], [3, "title", "subtitle", "icon", "color", "amount", "amountTone", "currencySymbol", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "title", "subtitle", "icon", "color", "amount", "amountTone", "currencySymbol"], [1, "transactions-empty"], ["icon", "bills", "color", "var(--fv-primary)", "size", "lg", "variant", "soft", "aria-hidden", "true"], ["icon", "alert-triangle", "color", "var(--fv-danger)", "size", "lg", "variant", "soft", "aria-hidden", "true"], ["type", "button", 3, "click"]], template: function TransactionsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-content", 0)(1, "main", 1);
            i0.ɵɵelement(2, "app-feature-header", 2);
            i0.ɵɵelementStart(3, "section", 3)(4, "button", 4);
            i0.ɵɵlistener("click", function TransactionsPage_Template_button_click_4_listener() { return ctx.openPeriodSelector(); });
            i0.ɵɵelementStart(5, "span", 5)(6, "small");
            i0.ɵɵtext(7, "Per\u00EDodo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "strong");
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "span", 6);
            i0.ɵɵelement(13, "ion-icon", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "button", 8);
            i0.ɵɵlistener("click", function TransactionsPage_Template_button_click_14_listener() { return ctx.openAccountSelector(); });
            i0.ɵɵelementStart(15, "span", 5)(16, "small");
            i0.ɵɵtext(17, "Cuenta");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "strong");
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "span");
            i0.ɵɵtext(21, "Filtrar movimientos");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "span", 6);
            i0.ɵɵelement(23, "ion-icon", 7);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(24, "app-custom-segment", 9);
            i0.ɵɵlistener("modelChange", function TransactionsPage_Template_app_custom_segment_modelChange_24_listener($event) { return ctx.changeType($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(25, TransactionsPage_app_period_summary_card_25_Template, 1, 9, "app-period-summary-card", 10);
            i0.ɵɵelementStart(26, "app-section-card", 11);
            i0.ɵɵtemplate(27, TransactionsPage_div_27_Template, 2, 2, "div", 12)(28, TransactionsPage_div_28_Template, 2, 2, "div", 13)(29, TransactionsPage_div_29_Template, 6, 1, "div", 14)(30, TransactionsPage_div_30_Template, 8, 0, "div", 14);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(31, "app-filter-modal", 15);
            i0.ɵɵlistener("modalClosed", function TransactionsPage_Template_app_filter_modal_modalClosed_31_listener() { return ctx.closePeriodSelector(); })("filtersApplied", function TransactionsPage_Template_app_filter_modal_filtersApplied_31_listener($event) { return ctx.applyFilters($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "app-account-selector-modal", 16);
            i0.ɵɵlistener("accountsSelected", function TransactionsPage_Template_app_account_selector_modal_accountsSelected_32_listener($event) { return ctx.applyAccountFilter($event); })("modalClosed", function TransactionsPage_Template_app_account_selector_modal_modalClosed_32_listener() { return ctx.closeAccountSelector(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "app-floating-action-button", 17);
            i0.ɵɵlistener("clicked", function TransactionsPage_Template_app_floating_action_button_clicked_33_listener() { return ctx.createTransaction(); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("fullscreen", false)("forceOverscroll", false);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.selectedPeriodLabel);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.compactDateRange);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.accounts.length === 0);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.selectedAccountLabel);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("options", ctx.transactionTypes)("model", ctx.selectedType);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.hasError && ctx.transactions.length > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.hasError && ctx.transactions.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && !ctx.hasError && ctx.transactions.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.hasError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isPeriodSelectorOpen)("selectedPeriod", ctx.selectedPeriod)("selectedPeriodValue", ctx.selectedPeriodValue)("selectedStartDate", ctx.selectedStartDate)("selectedEndDate", ctx.selectedEndDate);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isAccountSelectorOpen)("accounts", ctx.accounts)("selectionMode", ctx.AccountSelectionMode.MULTIPLE)("selectedAccounts", ctx.selectedAccounts);
        } }, dependencies: [CommonModule, i4.NgForOf, i4.NgIf, IonContent,
            IonIcon,
            AccountSelectorModalComponent,
            CustomSegmentComponent,
            FeatureHeaderComponent,
            FloatingActionButtonComponent,
            ItemIconComponent,
            SectionCardComponent,
            AmountListItemComponent,
            PeriodSummaryCardComponent,
            FilterModalComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.transactions-page[_ngcontent-%COMP%] {\n  --background: linear-gradient(180deg, #fbfbff 0%, var(--fv-background) 100%);\n}\n\n.transactions[_ngcontent-%COMP%] {\n  display: grid;\n  width: 100%;\n  max-width: 680px;\n  margin: 0 auto;\n  padding: 16px 14px 72px;\n  gap: 18px;\n}\n\n.transactions-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 9px;\n}\n\n.transaction-filters[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  gap: 10px;\n  margin: 0;\n}\n\n.filter-trigger[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  min-height: 76px;\n  align-items: center;\n  gap: 9px;\n  padding: 10px;\n  overflow: hidden;\n  border: 1px solid rgba(67, 97, 238, .16);\n  border-radius: 17px;\n  background:\n    radial-gradient(circle at 92% 10%, rgba(67, 97, 238, .09), transparent 34%),\n    linear-gradient(120deg, #fbfaff 0%, #f1f3ff 100%);\n  box-shadow: 0 6px 18px rgba(58, 12, 163, .065);\n  font-family: inherit;\n  text-align: left;\n  transition: transform .18s ease, box-shadow .18s ease;\n}\n\n.filter-trigger[_ngcontent-%COMP%]:active {\n  transform: scale(.985);\n  box-shadow: 0 4px 12px rgba(30, 41, 59, .06);\n}\n\n.filter-trigger[_ngcontent-%COMP%]:disabled {\n  opacity: .55;\n}\n\n.filter-trigger__content[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  flex: 1;\n  gap: 2px;\n}\n\n.filter-trigger__content[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: var(--fv-text-secondary);\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n}\n\n.filter-trigger__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 13px;\n  font-weight: 750;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.filter-trigger__content[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: var(--fv-text-muted);\n  font-size: 10px;\n  font-weight: 550;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.filter-trigger__action[_ngcontent-%COMP%] {\n  display: grid;\n  width: 20px;\n  height: 26px;\n  flex: 0 0 20px;\n  color: var(--fv-primary);\n  place-items: center;\n}\n\n.filter-trigger__action[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 19px;\n  height: 19px;\n}\n\n.transactions-loading[_ngcontent-%COMP%], \n.transactions-empty[_ngcontent-%COMP%] {\n  border: 1px solid rgba(226, 229, 238, .92);\n  border-radius: 17px;\n  background: #fff;\n  box-shadow: 0 9px 26px rgba(31, 37, 76, .05);\n}\n\n.transactions-loading[_ngcontent-%COMP%] {\n  padding: 6px 13px;\n}\n\n.transactions-loading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 62px;\n  align-items: center;\n  gap: 12px;\n}\n\n.transactions-loading[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    + div[_ngcontent-%COMP%] {\n  border-top: 1px solid var(--fv-border);\n}\n\n.transactions-loading[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n.transactions-loading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  border-radius: 9px;\n  background: linear-gradient(90deg, #eef0f6 25%, #f7f8fb 50%, #eef0f6 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_transactions-loading 1.25s ease-in-out infinite;\n}\n\n.transactions-loading[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  flex: 0 0 32px;\n}\n\n.transactions-loading[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 68%;\n  height: 28px;\n}\n\n.transactions-empty[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: center;\n  padding: 28px 20px;\n  text-align: center;\n}\n\n.transactions-empty[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 12px 0 5px;\n  color: var(--fv-text-primary);\n  font-size: 14px;\n  font-weight: 750;\n}\n\n.transactions-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--fv-text-secondary);\n  font-size: 11px;\n}\n\n.transactions-empty[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  padding: 9px 15px;\n  border: 0;\n  border-radius: 11px;\n  background: color-mix(in srgb, var(--fv-primary) 9%, white);\n  color: var(--fv-primary);\n  font-size: 10px;\n  font-weight: 700;\n}\n\n@keyframes _ngcontent-%COMP%_transactions-loading {\n  from { background-position: 100% 0; }\n  to { background-position: -100% 0; }\n}\n\n@media (max-width: 380px) {\n  .transactions[_ngcontent-%COMP%] {\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n\n  .transaction-filters[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n\n  .filter-trigger[_ngcontent-%COMP%] {\n    min-height: 72px;\n    gap: 7px;\n    padding: 8px;\n  }\n\n  .filter-trigger__action[_ngcontent-%COMP%] {\n    width: 18px;\n    height: 24px;\n    flex-basis: 18px;\n  }\n\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TransactionsPage, [{
        type: Component,
        args: [{ selector: 'app-transactions', standalone: true, imports: [
                    CommonModule,
                    IonContent,
                    IonIcon,
                    AccountSelectorModalComponent,
                    CustomSegmentComponent,
                    FeatureHeaderComponent,
                    FloatingActionButtonComponent,
                    ItemIconComponent,
                    SectionCardComponent,
                    AmountListItemComponent,
                    PeriodSummaryCardComponent,
                    FilterModalComponent
                ], template: "<ion-content class=\"transactions-page\" [fullscreen]=\"false\" [forceOverscroll]=\"false\">\n  <main class=\"transactions\">\n    <app-feature-header\n      title=\"Transacciones\"\n      description=\"Consulta y controla todos tus movimientos.\"\n      imageSrc=\"assets/image/budget-chart.png\">\n    </app-feature-header>\n\n    <section class=\"transaction-filters\" aria-label=\"Filtros de transacciones\">\n      <button\n        type=\"button\"\n        class=\"filter-trigger filter-trigger--period\"\n        (click)=\"openPeriodSelector()\">\n        <span class=\"filter-trigger__content\">\n          <small>Per\u00EDodo</small>\n          <strong>{{ selectedPeriodLabel }}</strong>\n          <span>{{ compactDateRange }}</span>\n        </span>\n\n        <span class=\"filter-trigger__action\">\n          <ion-icon src=\"assets/icon/right-inline.svg\"></ion-icon>\n        </span>\n      </button>\n\n      <button\n        type=\"button\"\n        class=\"filter-trigger filter-trigger--account\"\n        [disabled]=\"accounts.length === 0\"\n        (click)=\"openAccountSelector()\">\n        <span class=\"filter-trigger__content\">\n          <small>Cuenta</small>\n          <strong>{{ selectedAccountLabel }}</strong>\n          <span>Filtrar movimientos</span>\n        </span>\n\n        <span class=\"filter-trigger__action\">\n          <ion-icon src=\"assets/icon/right-inline.svg\"></ion-icon>\n        </span>\n      </button>\n    </section>\n\n    <app-custom-segment\n      [options]=\"transactionTypes\"\n      [model]=\"selectedType\"\n      (modelChange)=\"changeType($event)\">\n    </app-custom-segment>\n\n    <app-period-summary-card\n      *ngIf=\"!isLoading && !hasError && transactions.length > 0\"\n      title=\"Resumen del per\u00EDodo\"\n      [totalLabel]=\"totalLabel\"\n      [totalAmount]=\"totalAmount\"\n      [metaValue]=\"accountCount\"\n      [metaLabel]=\"accountLabel\"\n      [chartSegments]=\"chartSegments\"\n      [chartAriaLabel]=\"chartAriaLabel\"\n      [chartTone]=\"selectedType === 'ingreso' ? 'success' : 'primary'\"\n      [periodLabel]=\"periodLabel\"\n      [currencySymbol]=\"currencySymbol\">\n    </app-period-summary-card>\n\n    <app-section-card title=\"Movimientos\" appearance=\"plain\">\n      <div *ngIf=\"isLoading\" class=\"transactions-loading\" aria-label=\"Cargando transacciones\">\n        <div *ngFor=\"let item of [1, 2, 3, 4]\">\n          <i></i>\n          <span></span>\n        </div>\n      </div>\n\n      <div *ngIf=\"!isLoading && !hasError && transactions.length\" class=\"transactions-list\">\n        <app-amount-list-item\n          *ngFor=\"let transaction of transactions; trackBy: trackByTransaction\"\n          [title]=\"transaction.category.name\"\n          [subtitle]=\"transaction.account.name\"\n          [icon]=\"transaction.category.icon\"\n          [color]=\"transaction.category.color\"\n          [amount]=\"transaction.amount\"\n          [amountTone]=\"transaction.type === 'ingreso' ? 'success' : 'default'\"\n          [currencySymbol]=\"currencySymbol\">\n        </app-amount-list-item>\n      </div>\n\n      <div *ngIf=\"!isLoading && !hasError && transactions.length === 0\" class=\"transactions-empty\">\n        <app-item-icon\n          icon=\"bills\"\n          color=\"var(--fv-primary)\"\n          size=\"lg\"\n          variant=\"soft\"\n          aria-hidden=\"true\">\n        </app-item-icon>\n        <h3>Sin movimientos</h3>\n        <p>A\u00FAn no tienes {{ selectedType === 'gasto' ? 'gastos' : 'ingresos' }} registrados.</p>\n      </div>\n\n      <div *ngIf=\"!isLoading && hasError\" class=\"transactions-empty\">\n        <app-item-icon\n          icon=\"alert-triangle\"\n          color=\"var(--fv-danger)\"\n          size=\"lg\"\n          variant=\"soft\"\n          aria-hidden=\"true\">\n        </app-item-icon>\n        <h3>No se pudieron cargar</h3>\n        <p>Revisa tu conexi\u00F3n e int\u00E9ntalo nuevamente.</p>\n        <button type=\"button\" (click)=\"loadTransactions()\">Reintentar</button>\n      </div>\n    </app-section-card>\n  </main>\n\n</ion-content>\n\n<app-filter-modal\n  [isOpen]=\"isPeriodSelectorOpen\"\n  title=\"Filtrar transacciones\"\n  description=\"Selecciona el per\u00EDodo que deseas consultar.\"\n  applyText=\"Aplicar filtros\"\n  [selectedPeriod]=\"selectedPeriod\"\n  [selectedPeriodValue]=\"selectedPeriodValue\"\n  [selectedStartDate]=\"selectedStartDate\"\n  [selectedEndDate]=\"selectedEndDate\"\n  (modalClosed)=\"closePeriodSelector()\"\n  (filtersApplied)=\"applyFilters($event)\">\n</app-filter-modal>\n\n<app-account-selector-modal\n  [isOpen]=\"isAccountSelectorOpen\"\n  [accounts]=\"accounts\"\n  [selectionMode]=\"AccountSelectionMode.MULTIPLE\"\n  [selectedAccounts]=\"selectedAccounts\"\n  (accountsSelected)=\"applyAccountFilter($event)\"\n  (modalClosed)=\"closeAccountSelector()\">\n</app-account-selector-modal>\n\n<app-floating-action-button\n  icon=\"add\"\n  ariaLabel=\"Registrar transacci\u00F3n\"\n  (clicked)=\"createTransaction()\">\n</app-floating-action-button>\n", styles: [":host {\n  display: block;\n}\n\n.transactions-page {\n  --background: linear-gradient(180deg, #fbfbff 0%, var(--fv-background) 100%);\n}\n\n.transactions {\n  display: grid;\n  width: 100%;\n  max-width: 680px;\n  margin: 0 auto;\n  padding: 16px 14px 72px;\n  gap: 18px;\n}\n\n.transactions-list {\n  display: grid;\n  gap: 9px;\n}\n\n.transaction-filters {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  gap: 10px;\n  margin: 0;\n}\n\n.filter-trigger {\n  display: flex;\n  width: 100%;\n  min-height: 76px;\n  align-items: center;\n  gap: 9px;\n  padding: 10px;\n  overflow: hidden;\n  border: 1px solid rgba(67, 97, 238, .16);\n  border-radius: 17px;\n  background:\n    radial-gradient(circle at 92% 10%, rgba(67, 97, 238, .09), transparent 34%),\n    linear-gradient(120deg, #fbfaff 0%, #f1f3ff 100%);\n  box-shadow: 0 6px 18px rgba(58, 12, 163, .065);\n  font-family: inherit;\n  text-align: left;\n  transition: transform .18s ease, box-shadow .18s ease;\n}\n\n.filter-trigger:active {\n  transform: scale(.985);\n  box-shadow: 0 4px 12px rgba(30, 41, 59, .06);\n}\n\n.filter-trigger:disabled {\n  opacity: .55;\n}\n\n.filter-trigger__content {\n  display: grid;\n  min-width: 0;\n  flex: 1;\n  gap: 2px;\n}\n\n.filter-trigger__content small {\n  color: var(--fv-text-secondary);\n  font-size: 9px;\n  font-weight: 700;\n  letter-spacing: .08em;\n  text-transform: uppercase;\n}\n\n.filter-trigger__content strong {\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: 13px;\n  font-weight: 750;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.filter-trigger__content > span {\n  overflow: hidden;\n  color: var(--fv-text-muted);\n  font-size: 10px;\n  font-weight: 550;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.filter-trigger__action {\n  display: grid;\n  width: 20px;\n  height: 26px;\n  flex: 0 0 20px;\n  color: var(--fv-primary);\n  place-items: center;\n}\n\n.filter-trigger__action ion-icon {\n  width: 19px;\n  height: 19px;\n}\n\n.transactions-loading,\n.transactions-empty {\n  border: 1px solid rgba(226, 229, 238, .92);\n  border-radius: 17px;\n  background: #fff;\n  box-shadow: 0 9px 26px rgba(31, 37, 76, .05);\n}\n\n.transactions-loading {\n  padding: 6px 13px;\n}\n\n.transactions-loading > div {\n  display: flex;\n  min-height: 62px;\n  align-items: center;\n  gap: 12px;\n}\n\n.transactions-loading > div + div {\n  border-top: 1px solid var(--fv-border);\n}\n\n.transactions-loading i,\n.transactions-loading span {\n  display: block;\n  border-radius: 9px;\n  background: linear-gradient(90deg, #eef0f6 25%, #f7f8fb 50%, #eef0f6 75%);\n  background-size: 200% 100%;\n  animation: transactions-loading 1.25s ease-in-out infinite;\n}\n\n.transactions-loading i {\n  width: 32px;\n  height: 32px;\n  flex: 0 0 32px;\n}\n\n.transactions-loading span {\n  width: 68%;\n  height: 28px;\n}\n\n.transactions-empty {\n  display: grid;\n  justify-items: center;\n  padding: 28px 20px;\n  text-align: center;\n}\n\n.transactions-empty h3 {\n  margin: 12px 0 5px;\n  color: var(--fv-text-primary);\n  font-size: 14px;\n  font-weight: 750;\n}\n\n.transactions-empty p {\n  margin: 0;\n  color: var(--fv-text-secondary);\n  font-size: 11px;\n}\n\n.transactions-empty button {\n  margin-top: 14px;\n  padding: 9px 15px;\n  border: 0;\n  border-radius: 11px;\n  background: color-mix(in srgb, var(--fv-primary) 9%, white);\n  color: var(--fv-primary);\n  font-size: 10px;\n  font-weight: 700;\n}\n\n@keyframes transactions-loading {\n  from { background-position: 100% 0; }\n  to { background-position: -100% 0; }\n}\n\n@media (max-width: 380px) {\n  .transactions {\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n\n  .transaction-filters {\n    gap: 8px;\n  }\n\n  .filter-trigger {\n    min-height: 72px;\n    gap: 7px;\n    padding: 8px;\n  }\n\n  .filter-trigger__action {\n    width: 18px;\n    height: 24px;\n    flex-basis: 18px;\n  }\n\n}\n"] }]
    }], () => [{ type: i1.FilterTransactionsUseCase }, { type: i2.ListAccountsUseCase }, { type: i3.NavigationService }], { content: [{
            type: ViewChild,
            args: [IonContent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TransactionsPage, { className: "TransactionsPage", filePath: "src/app/features/side-menu/transactions/transactions.page.ts", lineNumber: 53 }); })();
//# sourceMappingURL=transactions.page.js.map