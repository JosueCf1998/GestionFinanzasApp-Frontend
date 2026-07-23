import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { BUDGET_STATUS_LABELS } from 'src/app/core/models/budgets/list-budgets.model';
import { InfoBannerComponent } from 'src/app/shared/components/info-banner/info-banner.component';
import { SelectionSummaryComponent } from 'src/app/shared/components/selection-summary/selection-summary.component';
import { AccountDetailsModalComponent } from 'src/app/shared/components/account-details-modal/account-details-modal.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { WarningMessageComponent } from 'src/app/shared/components/warning-message/warning-message.component';
import { BudgetSummaryCardComponent } from 'src/app/shared/components/budget-summary-card/budget-summary-card.component';
import { ProgressListItemComponent } from 'src/app/shared/components/progress-list-item/progress-list-item.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import 'src/app/core/utils/observable-extensions';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "src/app/core/services/navigation.service";
import * as i3 from "src/app/core/use-cases/budgets/detail-budget.usecase";
import * as i4 from "src/app/core/services/spinnerService.service";
import * as i5 from "@angular/common";
function DetailBudgetPage_app_warning_message_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-warning-message", 12);
    i0.ɵɵpipe(1, "currency");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", "Has superado el monto planificado por " + i0.ɵɵpipeBind4(1, 1, ctx_r0.exceededAmount, ctx_r0.currency, "symbol-narrow", "1.2-2") + ".");
} }
function DetailBudgetPage_app_progress_list_item_12_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-progress-list-item", 13);
    i0.ɵɵlistener("selected", function DetailBudgetPage_app_progress_list_item_12_Template_app_progress_list_item_selected_0_listener() { const category_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.openCategoryDetail(category_r3)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const category_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("item", category_r3)("currencySymbol", ctx_r0.currency === "PEN" ? "S/" : ctx_r0.currency);
} }
export class DetailBudgetPage {
    constructor(route, navService, detailBudgetUseCase, loadingService) {
        this.route = route;
        this.navService = navService;
        this.detailBudgetUseCase = detailBudgetUseCase;
        this.loadingService = loadingService;
        this.budget = {
            id: 0,
            name: 'Presupuesto',
            icon: 'wallet',
            color: '#283593',
            budgeted: 0,
            used: 0,
            percentage: 0,
            status: 'ON_TRACK'
        };
        this.currency = 'PEN';
        this.dateRangeLabel = 'Periodo seleccionado';
        this.startDate = '';
        this.endDate = '';
        this.budgetAccounts = [];
        this.isAccountDetailsModalOpen = false;
        this.categoryBudgets = [];
        this.alert = null;
        this.suggestion = '';
        this.notes = '';
        this.availableActions = null;
    }
    // MARK: - CICLO DE VIDA
    ngOnInit() {
        const state = window.history.state;
        if (state.budget)
            this.budget = { ...state.budget };
        this.budget.id = Number(this.route.snapshot.paramMap.get('id')) || this.budget.id;
        if (state.currency)
            this.currency = state.currency;
        if (state.dateRangeLabel)
            this.dateRangeLabel = state.dateRangeLabel;
        this.loadBudgetDetail();
    }
    // MARK: - SERVICIOS
    loadBudgetDetail() {
        if (this.budget.id <= 0) {
            return;
        }
        const request = { id: String(this.budget.id) };
        this.loadingService.show();
        this.detailBudgetUseCase.execute(request).service({
            success: data => {
                this.loadingService.hide();
                if (data)
                    this.applyBudgetDetail(data);
            },
            failure: () => {
                this.loadingService.hide();
            }
        });
    }
    applyBudgetDetail(data) {
        const detail = data.generalDetail;
        this.budget = {
            id: data.id,
            name: data.name,
            icon: data.icon,
            color: data.color,
            budgeted: detail.totalBudget,
            used: detail.totalSpent,
            percentage: detail.usagePercentage,
            status: detail.status
        };
        this.dateRangeLabel = `${this.formatDate(detail.startDate)} - ${this.formatDate(detail.endDate)}`;
        this.startDate = detail.startDate;
        this.endDate = detail.endDate;
        this.alert = data.alert;
        this.suggestion = data.suggestion;
        this.notes = detail.notes;
        this.availableActions = data.availableActions;
        this.budgetAccounts = data.linkedAccounts.map(account => ({
            id: account.id,
            name: account.name,
            amount: account.amount,
            icon: account.icon,
            color: account.color
        }));
        this.categoryBudgets = data.linkedCategories.map(category => ({
            id: category.id,
            name: category.name,
            icon: category.icon,
            color: category.color,
            budgeted: category.budgetAmount,
            used: category.spentAmount,
            remaining: category.remainingAmount,
            percentage: category.percentage,
            status: category.status
        }));
    }
    formatDate(value) {
        const [year, month, day] = value.split('-');
        return year && month && day ? `${day}/${month}/${year}` : value;
    }
    // MARK: - PRESENTACIÓN
    get statusLabel() {
        return BUDGET_STATUS_LABELS[this.budget.status];
    }
    get linkedAccountsTitle() {
        const count = this.budgetAccounts.length;
        return count === 1 ? '1 cuenta' : `${count} cuentas`;
    }
    get linkedAccountsLabel() {
        if (!this.budgetAccounts.length)
            return 'No hay cuentas vinculadas';
        const names = this.budgetAccounts.map(account => account.name);
        if (names.length === 1)
            return names[0];
        if (names.length === 2)
            return `${names[0]} y ${names[1]}`;
        return `${names[0]}, ${names[1]} y ${names.length - 2} más`;
    }
    get availableAmount() {
        return Math.max(this.budget.budgeted - this.budget.used, 0);
    }
    get exceededAmount() {
        return Math.max(this.budget.used - this.budget.budgeted, 0);
    }
    get isExceeded() {
        return this.budget.status === 'EXCEEDED';
    }
    get adviceMessage() {
        return this.suggestion || 'No hay sugerencias disponibles para este presupuesto.';
    }
    openAccountDetails() {
        if (this.budgetAccounts.length)
            this.isAccountDetailsModalOpen = true;
    }
    closeAccountDetails() {
        this.isAccountDetailsModalOpen = false;
    }
    openCategoryDetail(category) {
        void this.navService.forward('/budgets/category/detail', {
            category,
            budgetName: this.budget.name,
            currency: this.currency,
            dateRangeLabel: this.dateRangeLabel,
            startDate: this.startDate,
            endDate: this.endDate
        });
    }
    // MARK: - NAVEGACIÓN
    backToBudgets() {
        void this.navService.back();
    }
    editBudget() {
        if (this.availableActions?.canEdit === false || this.budget.id <= 0)
            return;
        void this.navService.forward(`/budgets/${this.budget.id}/edit`);
    }
    // MARK: - TRACKING
    trackByCategory(_, category) {
        return category.id;
    }
    static { this.ɵfac = function DetailBudgetPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DetailBudgetPage)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.NavigationService), i0.ɵɵdirectiveInject(i3.DetailBudgetUseCase), i0.ɵɵdirectiveInject(i4.SpinnerService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DetailBudgetPage, selectors: [["app-detail-budget"]], decls: 14, vars: 33, consts: [["title", "Detalle del presupuesto", 3, "back", "showBack"], ["header-actions", "", "icon", "pencil", "color", "#ffffff", "size", "md", "variant", "nav-glass", "ariaLabel", "Editar presupuesto", "title", "Editar presupuesto", 3, "activated", "interactive", "disabled"], [1, "detail-budget-page", 3, "fullscreen"], [1, "detail-budget"], ["mode", "budget", 3, "title", "dateRange", "icon", "color", "status", "statusLabel", "progress", "budgeted", "used", "balance", "balanceLabel", "currencySymbol"], ["title", "Presupuesto excedido", 3, "message", 4, "ngIf"], ["title", "Cuentas"], ["ariaLabel", "Cuentas vinculadas al presupuesto", "fallbackIcon", "assets/icon/bank.svg", 3, "activated", "primaryText", "secondaryText", "items", "interactive", "showArrow", "actionText", "actionOnly", "trailingText"], ["title", "Categor\u00EDas", "appearance", "plain"], [1, "categories-list"], [3, "item", "currencySymbol", "selected", 4, "ngFor", "ngForOf", "ngForTrackBy"], [3, "closed", "isOpen", "accounts", "currency"], ["title", "Presupuesto excedido", 3, "message"], [3, "selected", "item", "currencySymbol"]], template: function DetailBudgetPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-header")(1, "app-page-layout", 0);
            i0.ɵɵlistener("back", function DetailBudgetPage_Template_app_page_layout_back_1_listener() { return ctx.backToBudgets(); });
            i0.ɵɵelementStart(2, "app-item-icon", 1);
            i0.ɵɵlistener("activated", function DetailBudgetPage_Template_app_item_icon_activated_2_listener() { return ctx.editBudget(); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(3, "ion-content", 2)(4, "main", 3);
            i0.ɵɵelement(5, "app-budget-summary-card", 4);
            i0.ɵɵtemplate(6, DetailBudgetPage_app_warning_message_6_Template, 2, 6, "app-warning-message", 5);
            i0.ɵɵelementStart(7, "app-section-card", 6)(8, "app-selection-summary", 7);
            i0.ɵɵpipe(9, "number");
            i0.ɵɵlistener("activated", function DetailBudgetPage_Template_app_selection_summary_activated_8_listener() { return ctx.openAccountDetails(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "app-section-card", 8)(11, "div", 9);
            i0.ɵɵtemplate(12, DetailBudgetPage_app_progress_list_item_12_Template, 1, 2, "app-progress-list-item", 10);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(13, "app-account-details-modal", 11);
            i0.ɵɵlistener("closed", function DetailBudgetPage_Template_app_account_details_modal_closed_13_listener() { return ctx.closeAccountDetails(); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("showBack", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("interactive", true)("disabled", (ctx.availableActions == null ? null : ctx.availableActions.canEdit) === false);
            i0.ɵɵadvance();
            i0.ɵɵproperty("fullscreen", false);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("title", ctx.budget.name)("dateRange", ctx.dateRangeLabel)("icon", ctx.budget.icon)("color", ctx.budget.color)("status", ctx.budget.status)("statusLabel", ctx.statusLabel)("progress", ctx.budget.percentage)("budgeted", ctx.budget.budgeted)("used", ctx.budget.used)("balance", ctx.isExceeded ? ctx.exceededAmount : ctx.availableAmount)("balanceLabel", ctx.isExceeded ? "Excedido" : "Disponible")("currencySymbol", ctx.currency === "PEN" ? "S/" : ctx.currency);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isExceeded);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("primaryText", ctx.budgetAccounts.length === 1 ? ctx.budgetAccounts[0].name : ctx.linkedAccountsTitle)("secondaryText", ctx.budgetAccounts.length === 1 ? "Saldo de la cuenta" : ctx.linkedAccountsLabel)("items", ctx.budgetAccounts)("interactive", ctx.budgetAccounts.length > 1)("showArrow", false)("actionText", ctx.budgetAccounts.length > 1 ? "Ver detalles" : "")("actionOnly", true)("trailingText", ctx.budgetAccounts.length === 1 ? ctx.currency + i0.ɵɵpipeBind2(9, 30, ctx.budgetAccounts[0].amount, "1.2-2") : "");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.categoryBudgets)("ngForTrackBy", ctx.trackByCategory);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isAccountDetailsModalOpen)("accounts", ctx.budgetAccounts)("currency", ctx.currency);
        } }, dependencies: [CommonModule, i5.NgForOf, i5.NgIf, i5.DecimalPipe, i5.CurrencyPipe, IonContent,
            IonHeader,
            SelectionSummaryComponent,
            AccountDetailsModalComponent,
            PageLayoutComponent,
            WarningMessageComponent,
            BudgetSummaryCardComponent,
            ProgressListItemComponent,
            SectionCardComponent,
            ItemIconComponent], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.detail-budget-page[_ngcontent-%COMP%] {\n  --background: linear-gradient(180deg, var(--fv-surface) 0%, var(--fv-background) 100%);\n}\n\n.detail-budget[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 18px 14px calc(24px + env(safe-area-inset-bottom));\n  flex-direction: column;\n  gap: 18px;\n}\n\n.categories-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 10px;\n}\n\n@media (max-width: 420px) {\n  .detail-budget[_ngcontent-%COMP%] {\n    padding-right: 12px;\n    padding-left: 12px;\n    gap: 16px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DetailBudgetPage, [{
        type: Component,
        args: [{ selector: 'app-detail-budget', standalone: true, imports: [
                    CommonModule,
                    IonContent,
                    IonHeader,
                    InfoBannerComponent,
                    SelectionSummaryComponent,
                    AccountDetailsModalComponent,
                    PageLayoutComponent,
                    WarningMessageComponent,
                    BudgetSummaryCardComponent,
                    ProgressListItemComponent,
                    SectionCardComponent,
                    ItemIconComponent
                ], template: "<ion-header>\n  <app-page-layout\n    title=\"Detalle del presupuesto\"\n    [showBack]=\"true\"\n    (back)=\"backToBudgets()\">\n    <app-item-icon\n      header-actions\n      icon=\"pencil\"\n      color=\"#ffffff\"\n      size=\"md\"\n      variant=\"nav-glass\"\n      [interactive]=\"true\"\n      [disabled]=\"availableActions?.canEdit === false\"\n      ariaLabel=\"Editar presupuesto\"\n      title=\"Editar presupuesto\"\n      (activated)=\"editBudget()\">\n    </app-item-icon>\n  </app-page-layout>\n</ion-header>\n\n<ion-content [fullscreen]=\"false\" class=\"detail-budget-page\">\n  <main class=\"detail-budget\">\n    <app-budget-summary-card\n      mode=\"budget\"\n      [title]=\"budget.name\"\n      [dateRange]=\"dateRangeLabel\"\n      [icon]=\"budget.icon\"\n      [color]=\"budget.color\"\n      [status]=\"budget.status\"\n      [statusLabel]=\"statusLabel\"\n      [progress]=\"budget.percentage\"\n      [budgeted]=\"budget.budgeted\"\n      [used]=\"budget.used\"\n      [balance]=\"isExceeded ? exceededAmount : availableAmount\"\n      [balanceLabel]=\"isExceeded ? 'Excedido' : 'Disponible'\"\n      [currencySymbol]=\"currency === 'PEN' ? 'S/' : currency\">\n    </app-budget-summary-card>\n\n    <app-warning-message\n      *ngIf=\"isExceeded\"\n      title=\"Presupuesto excedido\"\n      [message]=\"'Has superado el monto planificado por ' + (exceededAmount | currency:currency:'symbol-narrow':'1.2-2') + '.'\">\n    </app-warning-message>\n\n    <app-section-card title=\"Cuentas\">\n      <app-selection-summary\n        [primaryText]=\"budgetAccounts.length === 1 ? budgetAccounts[0].name : linkedAccountsTitle\"\n        [secondaryText]=\"budgetAccounts.length === 1 ? 'Saldo de la cuenta' : linkedAccountsLabel\"\n        ariaLabel=\"Cuentas vinculadas al presupuesto\"\n        fallbackIcon=\"assets/icon/bank.svg\"\n        [items]=\"budgetAccounts\"\n        [interactive]=\"budgetAccounts.length > 1\"\n        [showArrow]=\"false\"\n        [actionText]=\"budgetAccounts.length > 1 ? 'Ver detalles' : ''\"\n        [actionOnly]=\"true\"\n        [trailingText]=\"budgetAccounts.length === 1 ? currency + (budgetAccounts[0].amount | number:'1.2-2') : ''\"\n        (activated)=\"openAccountDetails()\">\n      </app-selection-summary>\n    </app-section-card>\n\n    <app-section-card\n      title=\"Categor\u00EDas\"\n      appearance=\"plain\">\n      <div class=\"categories-list\">\n        <app-progress-list-item\n          *ngFor=\"let category of categoryBudgets; trackBy: trackByCategory\"\n          [item]=\"category\"\n          [currencySymbol]=\"currency === 'PEN' ? 'S/' : currency\"\n          (selected)=\"openCategoryDetail(category)\">\n        </app-progress-list-item>\n      </div>\n    </app-section-card>\n\n  </main>\n</ion-content>\n\n<app-account-details-modal\n  [isOpen]=\"isAccountDetailsModalOpen\"\n  [accounts]=\"budgetAccounts\"\n  [currency]=\"currency\"\n  (closed)=\"closeAccountDetails()\">\n</app-account-details-modal>\n", styles: [":host {\n  display: block;\n}\n\n.detail-budget-page {\n  --background: linear-gradient(180deg, var(--fv-surface) 0%, var(--fv-background) 100%);\n}\n\n.detail-budget {\n  display: flex;\n  width: 100%;\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 18px 14px calc(24px + env(safe-area-inset-bottom));\n  flex-direction: column;\n  gap: 18px;\n}\n\n.categories-list {\n  display: grid;\n  gap: 10px;\n}\n\n@media (max-width: 420px) {\n  .detail-budget {\n    padding-right: 12px;\n    padding-left: 12px;\n    gap: 16px;\n  }\n}\n"] }]
    }], () => [{ type: i1.ActivatedRoute }, { type: i2.NavigationService }, { type: i3.DetailBudgetUseCase }, { type: i4.SpinnerService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DetailBudgetPage, { className: "DetailBudgetPage", filePath: "src/app/features/side-menu/budgets/detail-budget/detail-budget.page.ts", lineNumber: 75 }); })();
//# sourceMappingURL=detail-budget.page.js.map