import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import 'src/app/core/utils/observable-extensions';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { FilterModalComponent } from 'src/app/shared/components/filter-modal/filter-modal.component';
import { ProgressListItemComponent } from 'src/app/shared/components/progress-list-item/progress-list-item.component';
import { FeatureHeaderComponent } from 'src/app/shared/components/feature-header/feature-header.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { FloatingActionButtonComponent } from 'src/app/shared/components/floating-action-button/floating-action-button.component';
import { BudgetSummaryCardComponent } from 'src/app/shared/components/budget-summary-card/budget-summary-card.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { CURRENCIES } from 'src/app/shared/models/currency.model';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/services/navigation.service";
import * as i2 from "src/app/core/use-cases/budgets/list-budgets.usecase";
import * as i3 from "src/app/core/services/spinnerService.service";
import * as i4 from "@angular/common";
function BudgetsPage_app_section_card_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "app-section-card", 19);
    i0.ɵɵelement(1, "app-budget-summary-card", 20);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("title", ctx_r0.summaryBalanceLabel)("headline", ctx_r0.currency.symbol + " " + i0.ɵɵpipeBind2(2, 7, ctx_r0.summaryBalance, "1.2-2"))("dateRange", ctx_r0.selectedDateRange)("progress", ctx_r0.summary.percentage)("budgeted", ctx_r0.summary.budgeted)("used", ctx_r0.summary.used)("currencySymbol", ctx_r0.currency.symbol);
} }
function BudgetsPage_app_progress_list_item_19_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-progress-list-item", 21);
    i0.ɵɵlistener("selected", function BudgetsPage_app_progress_list_item_19_Template_app_progress_list_item_selected_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.openBudget($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const budget_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("item", budget_r3)("currencySymbol", ctx_r0.currency.symbol);
} }
function BudgetsPage_div_20_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵelement(1, "app-item-icon", 23);
    i0.ɵɵelementStart(2, "h3");
    i0.ɵɵtext(3, "No hay presupuestos en este periodo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, "Selecciona otro periodo para consultar tus presupuestos.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 24)(7, "app-button", 25);
    i0.ɵɵlistener("clicked", function BudgetsPage_div_20_Template_app_button_clicked_7_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.openPeriodSelector()); });
    i0.ɵɵelementEnd()()();
} }
export class BudgetsPage {
    constructor(navService, listBudgetsUseCase, loadingService) {
        this.navService = navService;
        this.listBudgetsUseCase = listBudgetsUseCase;
        this.loadingService = loadingService;
        this.selectedPeriod = 'monthly';
        this.selectedPeriodValue = this.getCurrentMonth();
        this.selectedStartDate = this.getFirstDayOfCurrentMonth();
        this.selectedEndDate = this.getLastDayOfCurrentMonth();
        this.isPeriodSelectorOpen = false;
        this.currency = CURRENCIES.PEN;
        this.budgets = [];
        this.summary = {
            budgeted: 0,
            used: 0,
            percentage: 0
        };
        this.selectedDate = '';
    }
    // MARK: - CICLO DE VIDA
    ngOnInit() {
        this.loadBudgets();
    }
    ngOnDestroy() {
        this.budgetRequest?.unsubscribe();
        this.loadingService.hide();
    }
    // MARK: - SERVICIOS
    loadBudgets() {
        const request = this.buildRequest();
        if (!request) {
            this.clearBudgetData();
            return;
        }
        this.budgetRequest?.unsubscribe();
        this.loadingService.show();
        this.budgetRequest = this.listBudgetsUseCase
            .execute(request)
            .service({
            success: data => {
                this.loadingService.hide();
                if (data) {
                    this.setBudgetResponse(data);
                    return;
                }
                this.clearBudgetData();
            },
            failure: () => {
                this.loadingService.hide();
                this.clearBudgetData();
            }
        });
    }
    // MARK: - PRESENTACIÓN
    get selectedPeriodLabel() {
        return {
            weekly: 'Semanal',
            monthly: 'Mensual',
            annual: 'Anual',
            custom: 'Periodo'
        }[this.selectedPeriod];
    }
    get summaryBalance() {
        return Math.abs(this.summary.budgeted - this.summary.used);
    }
    get summaryBalanceLabel() {
        return this.summary.used > this.summary.budgeted
            ? 'Monto excedido'
            : 'Saldo disponible';
    }
    get summaryProgress() {
        return Math.min(Math.max(this.summary.percentage, 0), 100);
    }
    get selectedDateRange() {
        return `${this.formatNumericDate(this.selectedStartDate)} - ${this.formatNumericDate(this.selectedEndDate)}`;
    }
    openPeriodSelector() {
        this.isPeriodSelectorOpen = true;
    }
    closePeriodSelector() {
        this.isPeriodSelectorOpen = false;
    }
    applyFilters(selection) {
        if (!this.isValidSelection(selection)) {
            return;
        }
        this.selectedPeriod = selection.period;
        this.selectedPeriodValue = selection.periodValue;
        this.selectedStartDate = selection.startDate;
        this.selectedEndDate = selection.endDate;
        this.closePeriodSelector();
        this.loadBudgets();
    }
    openBudget(budget) {
        this.navService.forward(`/budgets/detail/${budget.id}`, {
            budget,
            currency: this.currency.code,
            dateRangeLabel: this.selectedDate
        });
    }
    createBudget() {
        this.navService.forward('/budgets/create');
    }
    trackByBudget(_, budget) {
        return budget.id;
    }
    buildRequest() {
        const request = {
            startDate: this.selectedStartDate,
            endDate: this.selectedEndDate
        };
        return this.isValidSelection(request) ? request : null;
    }
    isValidSelection(selection) {
        return this.isIsoDate(selection.startDate) &&
            this.isIsoDate(selection.endDate) &&
            selection.startDate <= selection.endDate;
    }
    isIsoDate(value) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
            return false;
        return !Number.isNaN(new Date(`${value}T00:00:00Z`).getTime());
    }
    setBudgetResponse(response) {
        this.budgets = [...response.items];
        this.summary = { ...response.summary };
        this.selectedDate = response.dateRangeLabel;
    }
    clearBudgetData() {
        this.budgets = [];
        this.summary = {
            budgeted: 0,
            used: 0,
            percentage: 0
        };
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
    formatDateInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    formatNumericDate(value) {
        const [year, month, day] = value.split('-');
        return year && month && day ? `${day}/${month}/${year}` : value;
    }
    static { this.ɵfac = function BudgetsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BudgetsPage)(i0.ɵɵdirectiveInject(i1.NavigationService), i0.ɵɵdirectiveInject(i2.ListBudgetsUseCase), i0.ɵɵdirectiveInject(i3.SpinnerService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BudgetsPage, selectors: [["app-budgets"]], decls: 24, vars: 14, consts: [[1, "budgets-content", 3, "fullscreen"], [1, "budgets-container"], ["title", "Presupuestos", "description", "Controla tus gastos sin exceder tus l\u00EDmites.", "imageSrc", "assets/image/budget-chart.png"], ["aria-label", "Filtros del presupuesto", 1, "budget-filters"], ["type", "button", 1, "filter-trigger", 3, "click"], [1, "filter-trigger__content"], ["src", "assets/icon/calendar.svg"], [1, "filter-trigger__date"], [1, "filter-trigger__period"], [1, "filter-trigger__action"], ["src", "assets/icon/right-inline.svg"], [1, "budget-sections"], ["title", "Resumen del periodo", "appearance", "plain", 4, "ngIf"], ["title", "Mis presupuestos", "appearance", "plain"], [1, "budget-list"], [3, "item", "currencySymbol", "selected", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "budget-empty-state", 4, "ngIf"], ["ariaLabel", "Crear presupuesto", 3, "clicked"], ["title", "Filtrar presupuestos", "description", "", "applyText", "Aplicar filtros", 3, "modalClosed", "filtersApplied", "isOpen", "selectedPeriod", "selectedPeriodValue", "selectedStartDate", "selectedEndDate"], ["title", "Resumen del periodo", "appearance", "plain"], ["mode", "period", "appearance", "classic", "icon", "wallet", 3, "title", "headline", "dateRange", "progress", "budgeted", "used", "currencySymbol"], [3, "selected", "item", "currencySymbol"], [1, "budget-empty-state"], ["icon", "wallet", "color", "var(--fv-primary)", "size", "lg", "shape", "rounded", "variant", "soft"], [1, "budget-empty-state__action"], ["text", "Cambiar periodo", "icon", "calendar", "variant", "secondary", "size", "compact", "expand", "auto", 3, "clicked"]], template: function BudgetsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-content", 0)(1, "main", 1);
            i0.ɵɵelement(2, "app-feature-header", 2);
            i0.ɵɵelementStart(3, "section", 3)(4, "button", 4);
            i0.ɵɵlistener("click", function BudgetsPage_Template_button_click_4_listener() { return ctx.openPeriodSelector(); });
            i0.ɵɵelementStart(5, "span", 5)(6, "small");
            i0.ɵɵelement(7, "ion-icon", 6);
            i0.ɵɵtext(8, " Periodo de consulta ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "strong", 7);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "span", 8);
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "span", 9);
            i0.ɵɵelement(14, "ion-icon", 10);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(15, "div", 11);
            i0.ɵɵtemplate(16, BudgetsPage_app_section_card_16_Template, 3, 10, "app-section-card", 12);
            i0.ɵɵelementStart(17, "app-section-card", 13)(18, "div", 14);
            i0.ɵɵtemplate(19, BudgetsPage_app_progress_list_item_19_Template, 1, 2, "app-progress-list-item", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(20, BudgetsPage_div_20_Template, 8, 0, "div", 16);
            i0.ɵɵpipe(21, "async");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(22, "app-floating-action-button", 17);
            i0.ɵɵlistener("clicked", function BudgetsPage_Template_app_floating_action_button_clicked_22_listener() { return ctx.createBudget(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "app-filter-modal", 18);
            i0.ɵɵlistener("modalClosed", function BudgetsPage_Template_app_filter_modal_modalClosed_23_listener() { return ctx.closePeriodSelector(); })("filtersApplied", function BudgetsPage_Template_app_filter_modal_filtersApplied_23_listener($event) { return ctx.applyFilters($event); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("fullscreen", true);
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate(ctx.selectedDate);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.selectedPeriodLabel);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.budgets.length > 0);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.budgets)("ngForTrackBy", ctx.trackByBudget);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(21, 12, ctx.loadingService.loading$) === false && ctx.budgets.length === 0);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("isOpen", ctx.isPeriodSelectorOpen)("selectedPeriod", ctx.selectedPeriod)("selectedPeriodValue", ctx.selectedPeriodValue)("selectedStartDate", ctx.selectedStartDate)("selectedEndDate", ctx.selectedEndDate);
        } }, dependencies: [CommonModule, i4.NgForOf, i4.NgIf, i4.AsyncPipe, i4.DecimalPipe, IonContent,
            IonIcon,
            ButtonComponent,
            ProgressListItemComponent,
            FeatureHeaderComponent,
            ItemIconComponent,
            FilterModalComponent,
            FloatingActionButtonComponent,
            BudgetSummaryCardComponent,
            SectionCardComponent], styles: ["[_nghost-%COMP%] {\n  --list-primary: var(--fv-primary-light);\n  --list-primary-dark: var(--fv-primary);\n  --list-background: #f6f7fb;\n  --list-surface: var(--fv-surface);\n  --list-border: #e9edf5;\n  --list-success: var(--fv-success);\n  --list-warning: var(--fv-warning);\n  --list-danger: var(--fv-danger);\n  --list-shadow: 0 6px 20px rgba(30, 41, 59, 0.06);\n}\n\n.budgets-content[_ngcontent-%COMP%] {\n  --background: linear-gradient(180deg, #fafbff 0%, var(--list-background) 100%);\n}\n\n.budgets-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 560px;\n  min-height: 100%;\n  margin: 0 auto;\n  padding: 18px 16px calc(env(safe-area-inset-bottom) + 28px);\n}\n\napp-feature-header[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 18px;\n}\n\n[_nghost-%COMP%]     app-feature-header .feature-header__content {\n  h1,\n  h2 {\n    color: #172033;\n    font-size: var(--fv-type-title-3);\n  }\n\n  p {\n    color: #64748b;\n    font-size: var(--fv-type-caption-2);\n  }\n}\n\nbutton[_ngcontent-%COMP%], \n[role='button'][_ngcontent-%COMP%] {\n  -webkit-tap-highlight-color: transparent;\n}\n\nbutton[_ngcontent-%COMP%] {\n  font-family: inherit;\n}\n\nbutton[_ngcontent-%COMP%]:focus-visible, \n[role='button'][_ngcontent-%COMP%]:focus-visible {\n  outline: 3px solid rgba(67, 97, 238, 0.18);\n  outline-offset: 2px;\n}\n\napp-custom-segment[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 14px;\n}\n\n.budget-filters[_ngcontent-%COMP%] {\n  margin-bottom: 18px;\n  padding: 0;\n}\n\n.filter-trigger[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  min-height: 70px;\n  gap: 10px;\n  padding: 11px 11px 11px 15px;\n  overflow: hidden;\n  border: 1px solid rgba(67, 97, 238, 0.16);\n  border-radius: 16px;\n  background:\n    radial-gradient(circle at 92% 10%, rgba(67, 97, 238, 0.09), transparent 34%),\n    linear-gradient(120deg, #fbfaff 0%, #f1f3ff 100%);\n  box-shadow: 0 6px 18px rgba(58, 12, 163, 0.065);\n  text-align: left;\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n\n  &:active {\n    transform: scale(0.985);\n    box-shadow: 0 4px 12px rgba(30, 41, 59, 0.06);\n  }\n}\n\n.filter-trigger__content[_ngcontent-%COMP%] {\n  display: grid;\n  flex: 1;\n  min-width: 0;\n  gap: 4px;\n\n  > small {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    color: var(--fv-text-secondary);\n    font-size: var(--fv-type-caption-2);\n    font-weight: var(--fv-fw-bold);\n    letter-spacing: 0.55px;\n    text-transform: uppercase;\n\n    ion-icon {\n      width: 14px;\n      height: 14px;\n      color: var(--list-primary-dark);\n    }\n  }\n}\n\n.filter-trigger__date[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: var(--fv-type-footnote);\n  font-weight: var(--fv-fw-bold);\n  line-height: 1.25;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.filter-trigger__period[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  padding: 4px 8px;\n  border: 1px solid rgba(67, 97, 238, 0.12);\n  border-radius: 9px;\n  background: rgba(255, 255, 255, 0.82);\n  color: var(--list-primary-dark);\n  font-size: var(--fv-type-caption-2);\n  font-weight: var(--fv-fw-bold);\n  box-shadow: 0 2px 6px rgba(58, 12, 163, 0.04);\n  white-space: nowrap;\n}\n\n.filter-trigger__action[_ngcontent-%COMP%] {\n  display: grid;\n  width: 34px;\n  height: 34px;\n  flex: 0 0 34px;\n  padding: 0;\n  border: 1px solid rgba(67, 97, 238, 0.12);\n  border-radius: 11px;\n  background: rgba(255, 255, 255, 0.92);\n  color: var(--list-primary-dark);\n  box-shadow: 0 3px 8px rgba(30, 41, 59, 0.05);\n\n  place-items: center;\n\n  ion-icon {\n    width: 20px;\n    height: 20px;\n  }\n}\n\n.budget-sections[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 22px;\n  margin-bottom: 14px;\n}\n\n.budget-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n}\n\n.budget-empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  margin-top: 4px;\n  padding: 26px 22px 24px;\n  border-radius: 18px;\n  background: rgba(255, 255, 255, 0.72);\n  box-shadow: 0 6px 20px rgba(30, 41, 59, 0.045);\n  text-align: center;\n\n  h3 {\n    margin: 13px 0 5px;\n    color: var(--fv-text-primary);\n    font-size: var(--fv-type-subhead);\n    font-weight: var(--fv-fw-bold);\n  }\n\n  p {\n    max-width: 260px;\n    margin: 0;\n    color: var(--fv-text-secondary);\n    font-size: var(--fv-type-footnote);\n    line-height: 1.45;\n  }\n\n}\n\n.budget-empty-state__action[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 17px;\n}\n\n@media (max-width: 380px) {\n  .budgets-container[_ngcontent-%COMP%] {\n    padding-right: 14px;\n    padding-left: 14px;\n  }\n\n}\n\n@media (hover: hover) {\n  .period-card[_ngcontent-%COMP%]:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 9px 24px rgba(30, 41, 59, 0.08);\n  }\n\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BudgetsPage, [{
        type: Component,
        args: [{ selector: 'app-budgets', standalone: true, imports: [
                    CommonModule,
                    IonContent,
                    IonIcon,
                    ButtonComponent,
                    ProgressListItemComponent,
                    FeatureHeaderComponent,
                    ItemIconComponent,
                    FilterModalComponent,
                    FloatingActionButtonComponent,
                    BudgetSummaryCardComponent,
                    SectionCardComponent
                ], template: "<ion-content class=\"budgets-content\" [fullscreen]=\"true\">\n  <main class=\"budgets-container\">\n\n    <app-feature-header\n      title=\"Presupuestos\"\n      description=\"Controla tus gastos sin exceder tus l\u00EDmites.\"\n      imageSrc=\"assets/image/budget-chart.png\">\n    </app-feature-header>\n\n    <section class=\"budget-filters\" aria-label=\"Filtros del presupuesto\">\n      <button\n        type=\"button\"\n        class=\"filter-trigger\"\n        (click)=\"openPeriodSelector()\">\n        <span class=\"filter-trigger__content\">\n          <small>\n            <ion-icon src=\"assets/icon/calendar.svg\"></ion-icon>\n            Periodo de consulta\n          </small>\n          <strong class=\"filter-trigger__date\">{{ selectedDate }}</strong>\n        </span>\n\n        <span class=\"filter-trigger__period\">{{ selectedPeriodLabel }}</span>\n\n        <span class=\"filter-trigger__action\">\n          <ion-icon src=\"assets/icon/right-inline.svg\"></ion-icon>\n        </span>\n      </button>\n    </section>\n\n    <div class=\"budget-sections\">\n      <app-section-card\n        *ngIf=\"budgets.length > 0\"\n        title=\"Resumen del periodo\"\n        appearance=\"plain\">\n        <app-budget-summary-card\n          mode=\"period\"\n          appearance=\"classic\"\n          [title]=\"summaryBalanceLabel\"\n          [headline]=\"currency.symbol + ' ' + (summaryBalance | number:'1.2-2')\"\n          [dateRange]=\"selectedDateRange\"\n          icon=\"wallet\"\n          [progress]=\"summary.percentage\"\n          [budgeted]=\"summary.budgeted\"\n          [used]=\"summary.used\"\n          [currencySymbol]=\"currency.symbol\">\n        </app-budget-summary-card>\n      </app-section-card>\n\n      <app-section-card\n        title=\"Mis presupuestos\"\n        appearance=\"plain\">\n        <div class=\"budget-list\">\n          <app-progress-list-item\n            *ngFor=\"let budget of budgets; trackBy: trackByBudget\"\n            [item]=\"budget\"\n            [currencySymbol]=\"currency.symbol\"\n            (selected)=\"openBudget($event)\">\n          </app-progress-list-item>\n        </div>\n\n        <div\n          *ngIf=\"(loadingService.loading$ | async) === false && budgets.length === 0\"\n          class=\"budget-empty-state\">\n          <app-item-icon\n            icon=\"wallet\"\n            color=\"var(--fv-primary)\"\n            size=\"lg\"\n            shape=\"rounded\"\n            variant=\"soft\">\n          </app-item-icon>\n\n          <h3>No hay presupuestos en este periodo</h3>\n          <p>Selecciona otro periodo para consultar tus presupuestos.</p>\n\n          <div class=\"budget-empty-state__action\">\n            <app-button\n              text=\"Cambiar periodo\"\n              icon=\"calendar\"\n              variant=\"secondary\"\n              size=\"compact\"\n              expand=\"auto\"\n              (clicked)=\"openPeriodSelector()\">\n            </app-button>\n          </div>\n        </div>\n      </app-section-card>\n    </div>\n\n  </main>\n\n  <app-floating-action-button\n    ariaLabel=\"Crear presupuesto\"\n    (clicked)=\"createBudget()\">\n  </app-floating-action-button>\n\n  <app-filter-modal\n    [isOpen]=\"isPeriodSelectorOpen\"\n    title=\"Filtrar presupuestos\"\n    description=\"\"\n    applyText=\"Aplicar filtros\"\n    [selectedPeriod]=\"selectedPeriod\"\n    [selectedPeriodValue]=\"selectedPeriodValue\"\n    [selectedStartDate]=\"selectedStartDate\"\n    [selectedEndDate]=\"selectedEndDate\"\n    (modalClosed)=\"closePeriodSelector()\"\n    (filtersApplied)=\"applyFilters($event)\">\n  </app-filter-modal>\n</ion-content>\n", styles: [":host {\n  --list-primary: var(--fv-primary-light);\n  --list-primary-dark: var(--fv-primary);\n  --list-background: #f6f7fb;\n  --list-surface: var(--fv-surface);\n  --list-border: #e9edf5;\n  --list-success: var(--fv-success);\n  --list-warning: var(--fv-warning);\n  --list-danger: var(--fv-danger);\n  --list-shadow: 0 6px 20px rgba(30, 41, 59, 0.06);\n}\n\n.budgets-content {\n  --background: linear-gradient(180deg, #fafbff 0%, var(--list-background) 100%);\n}\n\n.budgets-container {\n  width: 100%;\n  max-width: 560px;\n  min-height: 100%;\n  margin: 0 auto;\n  padding: 18px 16px calc(env(safe-area-inset-bottom) + 28px);\n}\n\napp-feature-header {\n  display: block;\n  margin-bottom: 18px;\n}\n\n:host ::ng-deep app-feature-header .feature-header__content {\n  h1,\n  h2 {\n    color: #172033;\n    font-size: var(--fv-type-title-3);\n  }\n\n  p {\n    color: #64748b;\n    font-size: var(--fv-type-caption-2);\n  }\n}\n\nbutton,\n[role='button'] {\n  -webkit-tap-highlight-color: transparent;\n}\n\nbutton {\n  font-family: inherit;\n}\n\nbutton:focus-visible,\n[role='button']:focus-visible {\n  outline: 3px solid rgba(67, 97, 238, 0.18);\n  outline-offset: 2px;\n}\n\napp-custom-segment {\n  display: block;\n  margin-bottom: 14px;\n}\n\n.budget-filters {\n  margin-bottom: 18px;\n  padding: 0;\n}\n\n.filter-trigger {\n  display: flex;\n  align-items: center;\n  width: 100%;\n  min-height: 70px;\n  gap: 10px;\n  padding: 11px 11px 11px 15px;\n  overflow: hidden;\n  border: 1px solid rgba(67, 97, 238, 0.16);\n  border-radius: 16px;\n  background:\n    radial-gradient(circle at 92% 10%, rgba(67, 97, 238, 0.09), transparent 34%),\n    linear-gradient(120deg, #fbfaff 0%, #f1f3ff 100%);\n  box-shadow: 0 6px 18px rgba(58, 12, 163, 0.065);\n  text-align: left;\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n\n  &:active {\n    transform: scale(0.985);\n    box-shadow: 0 4px 12px rgba(30, 41, 59, 0.06);\n  }\n}\n\n.filter-trigger__content {\n  display: grid;\n  flex: 1;\n  min-width: 0;\n  gap: 4px;\n\n  > small {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    color: var(--fv-text-secondary);\n    font-size: var(--fv-type-caption-2);\n    font-weight: var(--fv-fw-bold);\n    letter-spacing: 0.55px;\n    text-transform: uppercase;\n\n    ion-icon {\n      width: 14px;\n      height: 14px;\n      color: var(--list-primary-dark);\n    }\n  }\n}\n\n.filter-trigger__date {\n  overflow: hidden;\n  color: var(--fv-text-primary);\n  font-size: var(--fv-type-footnote);\n  font-weight: var(--fv-fw-bold);\n  line-height: 1.25;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.filter-trigger__period {\n  flex: 0 0 auto;\n  padding: 4px 8px;\n  border: 1px solid rgba(67, 97, 238, 0.12);\n  border-radius: 9px;\n  background: rgba(255, 255, 255, 0.82);\n  color: var(--list-primary-dark);\n  font-size: var(--fv-type-caption-2);\n  font-weight: var(--fv-fw-bold);\n  box-shadow: 0 2px 6px rgba(58, 12, 163, 0.04);\n  white-space: nowrap;\n}\n\n.filter-trigger__action {\n  display: grid;\n  width: 34px;\n  height: 34px;\n  flex: 0 0 34px;\n  padding: 0;\n  border: 1px solid rgba(67, 97, 238, 0.12);\n  border-radius: 11px;\n  background: rgba(255, 255, 255, 0.92);\n  color: var(--list-primary-dark);\n  box-shadow: 0 3px 8px rgba(30, 41, 59, 0.05);\n\n  place-items: center;\n\n  ion-icon {\n    width: 20px;\n    height: 20px;\n  }\n}\n\n.budget-sections {\n  display: grid;\n  gap: 22px;\n  margin-bottom: 14px;\n}\n\n.budget-list {\n  display: grid;\n  gap: 8px;\n}\n\n.budget-empty-state {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  margin-top: 4px;\n  padding: 26px 22px 24px;\n  border-radius: 18px;\n  background: rgba(255, 255, 255, 0.72);\n  box-shadow: 0 6px 20px rgba(30, 41, 59, 0.045);\n  text-align: center;\n\n  h3 {\n    margin: 13px 0 5px;\n    color: var(--fv-text-primary);\n    font-size: var(--fv-type-subhead);\n    font-weight: var(--fv-fw-bold);\n  }\n\n  p {\n    max-width: 260px;\n    margin: 0;\n    color: var(--fv-text-secondary);\n    font-size: var(--fv-type-footnote);\n    line-height: 1.45;\n  }\n\n}\n\n.budget-empty-state__action {\n  display: block;\n  margin-top: 17px;\n}\n\n@media (max-width: 380px) {\n  .budgets-container {\n    padding-right: 14px;\n    padding-left: 14px;\n  }\n\n}\n\n@media (hover: hover) {\n  .period-card:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 9px 24px rgba(30, 41, 59, 0.08);\n  }\n\n}\n"] }]
    }], () => [{ type: i1.NavigationService }, { type: i2.ListBudgetsUseCase }, { type: i3.SpinnerService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BudgetsPage, { className: "BudgetsPage", filePath: "src/app/features/side-menu/budgets/budgets.page.ts", lineNumber: 48 }); })();
//# sourceMappingURL=budgets.page.js.map