import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { AccountSelectorModalComponent, AccountSelectionMode } from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { FloatingActionButtonComponent } from 'src/app/shared/components/floating-action-button/floating-action-button.component';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/services/navigation.service";
import * as i2 from "src/app/core/services/spinnerService.service";
import * as i3 from "src/app/core/use-cases/accounts/list-accounts.usecase";
import * as i4 from "src/app/core/use-cases/transfer/list-transfer.usecase";
import * as i5 from "@ionic/angular";
import * as i6 from "@angular/common";
function HistoryTransferPage_app_item_icon_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-item-icon", 27);
} }
function HistoryTransferPage_app_item_icon_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-item-icon", 28);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("icon", ctx_r0.selectedAccountIcon)("color", ctx_r0.selectedAccountColor);
} }
function HistoryTransferPage_span_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate3(" Semana ", ctx_r0.selectedWeekOfMonth, " \u00B7 ", ctx_r0.getMonthName(ctx_r0.selectedMonth), " ", ctx_r0.selectedYear, " ");
} }
function HistoryTransferPage_span_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", ctx_r0.getMonthName(ctx_r0.selectedMonth), " ", ctx_r0.selectedYear, " ");
} }
function HistoryTransferPage_span_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.selectedYear, " ");
} }
function HistoryTransferPage_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29)(1, "div", 30);
    i0.ɵɵelement(2, "ion-icon", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3", 32);
    i0.ɵɵtext(4, " Sin transferencias ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 33);
    i0.ɵɵtext(6, " Aqu\u00ED ver\u00E1s tus movimientos entre cuentas cuando realices transferencias. ");
    i0.ɵɵelementEnd()();
} }
function HistoryTransferPage_div_28_button_4_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 45);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 46);
    i0.ɵɵtext(4, " Saldo inicial ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const transfer_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", transfer_r3.destinationAccountName, " ");
} }
function HistoryTransferPage_div_28_button_4_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 45);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 46);
    i0.ɵɵtext(4, " Ajuste de saldo ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const transfer_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", transfer_r3.originAccountName, " ");
} }
function HistoryTransferPage_div_28_button_4_ng_container_6_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const transfer_r3 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", transfer_r3.comment, " ");
} }
function HistoryTransferPage_div_28_button_4_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 47)(2, "span", 48);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "ion-icon", 49);
    i0.ɵɵelementStart(5, "span", 50);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, HistoryTransferPage_div_28_button_4_ng_container_6_div_7_Template, 2, 1, "div", 51);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const transfer_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", transfer_r3.originAccountName, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", transfer_r3.destinationAccountName, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", transfer_r3.comment);
} }
function HistoryTransferPage_div_28_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 38);
    i0.ɵɵlistener("click", function HistoryTransferPage_div_28_button_4_Template_button_click_0_listener() { const transfer_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.editTransfer(transfer_r3)); });
    i0.ɵɵelementStart(1, "div", 39);
    i0.ɵɵelement(2, "app-item-icon", 40);
    i0.ɵɵelementStart(3, "div", 41);
    i0.ɵɵtemplate(4, HistoryTransferPage_div_28_button_4_ng_container_4_Template, 5, 1, "ng-container", 18)(5, HistoryTransferPage_div_28_button_4_ng_container_5_Template, 5, 1, "ng-container", 18)(6, HistoryTransferPage_div_28_button_4_ng_container_6_Template, 8, 3, "ng-container", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 42)(8, "div", 43);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(10, "ion-icon", 44);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const transfer_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("icon", ctx_r0.getTransferIcon(transfer_r3.type))("color", ctx_r0.getTransferColor(transfer_r3.type));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", transfer_r3.type === "Inicial");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", transfer_r3.type === "Ajuste");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", transfer_r3.type === "Realizado");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" S/. ", transfer_r3.amount, " ");
} }
function HistoryTransferPage_div_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34)(1, "div", 35)(2, "span", 36);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(4, HistoryTransferPage_div_28_button_4_Template, 11, 6, "button", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r4 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", group_r4.fecha, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", group_r4.items);
} }
function HistoryTransferPage_app_custom_alert_30_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 52);
    i0.ɵɵlistener("onCancel", function HistoryTransferPage_app_custom_alert_30_Template_app_custom_alert_onCancel_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showCustomAlert = false); })("onConfirm", function HistoryTransferPage_app_custom_alert_30_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.salirSinGuardar()); });
    i0.ɵɵelementEnd();
} }
function HistoryTransferPage_app_custom_alert_31_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 53);
    i0.ɵɵlistener("onConfirm", function HistoryTransferPage_app_custom_alert_31_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showGenericAlert = false); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("message", "No se pudo completar la acci\u00F3n. Por favor, intenta nuevamente.")("imageUrl", "assets/icon/alert-triangle.svg")("confirmText", "Entendido")("alertSize", "medium")("reverseButtons", true)("showCancel", false);
} }
export class HistoryTransferPage {
    /* ==========================================================
       CONSTRUCTOR
       ========================================================== */
    constructor(navigationService, spinnerService, listAccountsUseCase, listTransferUseCase) {
        this.navigationService = navigationService;
        this.spinnerService = spinnerService;
        this.listAccountsUseCase = listAccountsUseCase;
        this.listTransferUseCase = listTransferUseCase;
        /* ==========================================================
           HEADER
           ========================================================== */
        this.title = 'Transferencias';
        /* ==========================================================
           ENUM
           ========================================================== */
        this.AccountSelectionMode = AccountSelectionMode;
        /* ==========================================================
           STATE - ALERTS
           ========================================================== */
        this.showGenericAlert = false;
        this.showCustomAlert = false;
        /* ==========================================================
           PERIOD STATE
           ========================================================== */
        this.selectedPeriod = 'mes';
        this.selectedYear = new Date().getFullYear();
        this.selectedMonth = new Date().getMonth() + 1;
        this.selectedWeekOfMonth = 1;
        this.periodTabs = [
            { value: 'semana', label: 'Semana' },
            { value: 'mes', label: 'Mes' },
            { value: 'anio', label: 'Año' }
        ];
        /* ==========================================================
           ACCOUNTS
           ========================================================== */
        this.accounts = [];
        this.selectedAccounts = [];
        this.isAccountModalOpen = false;
        /* ==========================================================
           TRANSFERS
           ========================================================== */
        this.allTransfers = [];
        this.groupedTransfers = [];
        /* ==========================================================
           CACHE (performance)
           ========================================================== */
        this.lastFilterKey = '';
    }
    /* ==========================================================
       LIFECYCLE
       ========================================================== */
    ngOnInit() {
        const today = new Date();
        this.selectedMonth = today.getMonth() + 1;
        this.selectedWeekOfMonth = this.getWeekOfMonth(today);
    }
    ionViewWillEnter() {
        this.loadData();
    }
    /* ==========================================================
       DATA LOADER
       ========================================================== */
    loadData() {
        this.spinnerService.show();
        forkJoin({
            accounts: this.listAccountsUseCase.listAccounts(),
            transfers: this.listTransferUseCase.listTransfer()
        }).subscribe({
            next: ({ accounts, transfers }) => {
                this.spinnerService.hide();
                if (accounts.success && accounts.data?.items) {
                    this.accounts = accounts.data.items;
                    this.selectedAccounts = [...this.accounts];
                }
                if (transfers.success && transfers.data?.items) {
                    this.allTransfers = this.enrichTransfers(transfers.data.items);
                    this.applyFilters();
                }
            },
            error: () => {
                this.spinnerService.hide();
                this.showGenericAlert = true;
            }
        });
    }
    /* ==========================================================
       ENRICH DATA
       ========================================================== */
    enrichTransfers(transfers) {
        return transfers.map(t => {
            const origin = this.accounts.find(a => a.id === t.originAccountId);
            const dest = this.accounts.find(a => a.id === t.destinationAccountId);
            return {
                ...t,
                originAccountName: origin?.name ?? 'Cuenta desconocida',
                destinationAccountName: dest?.name ?? 'Cuenta desconocida',
                originAccountIcon: origin?.icon ?? '',
                originAccountColor: origin?.color ?? '',
                destinationAccountIcon: dest?.icon ?? '',
                destinationAccountColor: dest?.color ?? ''
            };
        });
    }
    /* ==========================================================
       FILTER ENGINE
       ========================================================== */
    applyFilters() {
        const key = JSON.stringify({
            acc: this.selectedAccounts.map(a => a.id),
            period: this.selectedPeriod,
            m: this.selectedMonth,
            y: this.selectedYear,
            w: this.selectedWeekOfMonth
        });
        if (key === this.lastFilterKey)
            return;
        this.lastFilterKey = key;
        const selectedIds = this.selectedAccounts.map(a => a.id);
        const filtered = this.allTransfers.filter(t => {
            const accountOk = selectedIds.length === this.accounts.length ||
                selectedIds.includes(t.originAccountId) ||
                selectedIds.includes(t.destinationAccountId);
            return accountOk && this.matchesPeriod(t.date);
        });
        this.groupTransfers(filtered);
    }
    /* ==========================================================
       PERIOD MATCH
       ========================================================== */
    matchesPeriod(dateStr) {
        const d = new Date(dateStr);
        if (this.selectedPeriod === 'anio') {
            return d.getFullYear() === this.selectedYear;
        }
        if (this.selectedPeriod === 'mes') {
            return (d.getFullYear() === this.selectedYear &&
                d.getMonth() + 1 === this.selectedMonth);
        }
        return (d.getFullYear() === this.selectedYear &&
            d.getMonth() + 1 === this.selectedMonth &&
            this.getWeekOfMonth(d) === this.selectedWeekOfMonth);
    }
    /* ==========================================================
       GROUPING
       ========================================================== */
    groupTransfers(list) {
        const groups = {};
        for (const t of list) {
            const key = this.formatDateKey(t.date);
            (groups[key] ||= []).push(t);
        }
        this.groupedTransfers = Object.entries(groups)
            .map(([fecha, items]) => ({
            fecha,
            items: items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }))
            .sort((a, b) => new Date(b.items[0].date).getTime() -
            new Date(a.items[0].date).getTime());
    }
    /* ==========================================================
       PERIOD NAVIGATION (CLEAN)
       ========================================================== */
    onPeriodChange() {
        this.applyFilters();
    }
    prevPeriod() {
        this.navigatePeriod(-1);
    }
    nextPeriod() {
        this.navigatePeriod(1);
    }
    navigatePeriod(direction) {
        switch (this.selectedPeriod) {
            case 'semana':
                this.changeWeek(direction);
                break;
            case 'mes':
                this.changeMonth(direction);
                break;
            case 'anio':
                this.changeYear(direction);
                break;
        }
        this.applyFilters();
    }
    changeYear(d) {
        this.selectedYear += d;
    }
    changeMonth(d) {
        this.selectedMonth += d;
        if (this.selectedMonth > 12) {
            this.selectedMonth = 1;
            this.selectedYear++;
        }
        if (this.selectedMonth < 1) {
            this.selectedMonth = 12;
            this.selectedYear--;
        }
    }
    changeWeek(d) {
        this.selectedWeekOfMonth += d;
        if (this.selectedWeekOfMonth > 4) {
            this.selectedWeekOfMonth = 1;
            this.changeMonth(1);
        }
        if (this.selectedWeekOfMonth < 1) {
            this.selectedWeekOfMonth = 4;
            this.changeMonth(-1);
        }
    }
    /* ==========================================================
       ACCOUNT MODAL
       ========================================================== */
    openAccountModal() {
        this.isAccountModalOpen = true;
    }
    closeAccountModal() {
        this.isAccountModalOpen = false;
    }
    onAccountsSelected(accounts) {
        this.selectedAccounts = accounts;
        this.isAccountModalOpen = false;
        this.applyFilters();
    }
    /* ==========================================================
       NAVIGATION
       ========================================================== */
    backToAccounts() {
        document.activeElement?.blur();
        this.navigationService.back();
    }
    navigateToAddTransfer() {
        this.navigationService.push('/accounts/new-transfer');
    }
    editTransfer(t) {
        this.navigationService.push('/accounts/detail-transfer', {
            transferData: t
        });
    }
    /* ==========================================================
       HELPERS
       ========================================================== */
    formatDateKey(date) {
        const [y, m, d] = date.split('T')[0].split('-');
        const months = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        return `${+d} de ${months[+m - 1]} de ${y}`;
    }
    getWeekOfMonth(date) {
        return Math.min(4, Math.ceil(date.getDate() / 7));
    }
    getTransferIcon(type) {
        switch (type) {
            case 'Inicial':
                return 'salary';
            case 'Ajuste':
                return 'edit';
            case 'Realizado':
                return 'send-money';
            default:
                return 'transfer';
        }
    }
    getTransferColor(type) {
        switch (type) {
            case 'Inicial':
                return '#10B981'; // verde (entrada)
            case 'Ajuste':
                return '#F59E0B'; // ámbar (edición)
            case 'Realizado':
                return '#4361EE'; // primary FinVia
            default:
                return 'var(--fv-primary)';
        }
    }
    getMonthName(month) {
        return [
            'Enero', 'Febrero', 'Marzo', 'Abril',
            'Mayo', 'Junio', 'Julio', 'Agosto',
            'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ][month - 1] ?? '';
    }
    get accountFilterLabel() {
        if (!this.selectedAccounts || this.selectedAccounts.length === 0) {
            return 'Sin cuentas';
        }
        if (this.selectedAccounts.length === this.accounts.length) {
            return 'Todas las cuentas';
        }
        if (this.selectedAccounts.length === 1) {
            return this.selectedAccounts[0].name;
        }
        return `${this.selectedAccounts.length} cuentas`;
    }
    get selectedAccountIcon() {
        if (this.selectedAccounts?.length === 1) {
            return this.selectedAccounts[0]?.icon ?? 'wallet';
        }
        return 'wallet';
    }
    get selectedAccountColor() {
        if (this.selectedAccounts?.length === 1) {
            return this.selectedAccounts[0]?.color ?? 'var(--fv-primary)';
        }
        return 'var(--fv-primary)';
    }
    /* ==========================================================
       ALERT
       ========================================================== */
    salirSinGuardar() {
        this.showCustomAlert = false;
        document.activeElement?.blur();
        this.navigationService.back();
    }
    static { this.ɵfac = function HistoryTransferPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HistoryTransferPage)(i0.ɵɵdirectiveInject(i1.NavigationService), i0.ɵɵdirectiveInject(i2.SpinnerService), i0.ɵɵdirectiveInject(i3.ListAccountsUseCase), i0.ɵɵdirectiveInject(i4.ListTransferUseCase)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HistoryTransferPage, selectors: [["app-history-transfer"]], decls: 33, vars: 21, consts: [[3, "back", "title", "showBack"], ["scroll-y", "false", 1, "transfer-history-page", 3, "fullscreen"], [1, "content-wrapper"], [1, "filter-section"], ["type", "button", 1, "account-filter", 3, "click"], [1, "filter-content"], ["icon", "wallet", "color", "var(--fv-primary)", 4, "ngIf"], [3, "icon", "color", 4, "ngIf"], [1, "filter-text"], [1, "filter-title"], [1, "filter-subtitle"], ["src", "assets/icon/transfer.svg", 1, "filter-arrow"], [1, "period-card"], ["segmentClass", "period-tabs", 3, "modelChange", "options", "model"], [1, "period-navigation"], ["type", "button", 1, "nav-btn", 3, "click"], ["src", "assets/icon/left-inline.svg"], [1, "period-label"], [4, "ngIf"], ["src", "assets/icon/right-inline.svg"], [1, "transfers-list"], ["class", "empty-state", 4, "ngIf"], ["class", "transfer-group", 4, "ngFor", "ngForOf"], ["ariaLabel", "Agregar transferencia", 3, "clicked"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la transferencia. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm", 4, "ngIf"], ["header", "", 3, "message", "imageUrl", "confirmText", "alertSize", "reverseButtons", "showCancel", "onConfirm", 4, "ngIf"], [3, "modalClosed", "accountsSelected", "isOpen", "accounts", "selectionMode", "selectedAccounts"], ["icon", "wallet", "color", "var(--fv-primary)"], [3, "icon", "color"], [1, "empty-state"], [1, "empty-icon"], ["src", "assets/icon/transfer.svg"], [1, "empty-title"], [1, "empty-description"], [1, "transfer-group"], [1, "date-header"], [1, "date-text"], ["type", "button", "class", "transfer-item", 3, "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "transfer-item", 3, "click"], [1, "transfer-main"], ["size", "sm", 3, "icon", "color"], [1, "transfer-info"], [1, "transfer-right"], [1, "transfer-amount"], ["src", "assets/icon/right-inline.svg", 1, "transfer-arrow"], [1, "transfer-title"], [1, "transfer-comment"], [1, "transfer-route"], [1, "origin"], ["src", "assets/icon/arrow-swap.svg"], [1, "destination"], ["class", "transfer-comment", 4, "ngIf"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la transferencia. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm"], ["header", "", 3, "onConfirm", "message", "imageUrl", "confirmText", "alertSize", "reverseButtons", "showCancel"]], template: function HistoryTransferPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-header")(1, "app-page-layout", 0);
            i0.ɵɵlistener("back", function HistoryTransferPage_Template_app_page_layout_back_1_listener() { return ctx.backToAccounts(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(2, "ion-content", 1)(3, "div", 2)(4, "section", 3)(5, "button", 4);
            i0.ɵɵlistener("click", function HistoryTransferPage_Template_button_click_5_listener() { return ctx.openAccountModal(); });
            i0.ɵɵelementStart(6, "div", 5);
            i0.ɵɵtemplate(7, HistoryTransferPage_app_item_icon_7_Template, 1, 0, "app-item-icon", 6)(8, HistoryTransferPage_app_item_icon_8_Template, 1, 2, "app-item-icon", 7);
            i0.ɵɵelementStart(9, "div", 8)(10, "span", 9);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 10);
            i0.ɵɵtext(13, " Filtrar transferencias ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(14, "ion-icon", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 12)(16, "app-custom-segment", 13);
            i0.ɵɵtwoWayListener("modelChange", function HistoryTransferPage_Template_app_custom_segment_modelChange_16_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.selectedPeriod, $event) || (ctx.selectedPeriod = $event); return $event; });
            i0.ɵɵlistener("modelChange", function HistoryTransferPage_Template_app_custom_segment_modelChange_16_listener() { return ctx.onPeriodChange(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div", 14)(18, "button", 15);
            i0.ɵɵlistener("click", function HistoryTransferPage_Template_button_click_18_listener() { return ctx.prevPeriod(); });
            i0.ɵɵelement(19, "ion-icon", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 17);
            i0.ɵɵtemplate(21, HistoryTransferPage_span_21_Template, 2, 3, "span", 18)(22, HistoryTransferPage_span_22_Template, 2, 2, "span", 18)(23, HistoryTransferPage_span_23_Template, 2, 1, "span", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "button", 15);
            i0.ɵɵlistener("click", function HistoryTransferPage_Template_button_click_24_listener() { return ctx.nextPeriod(); });
            i0.ɵɵelement(25, "ion-icon", 19);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(26, "section", 20);
            i0.ɵɵtemplate(27, HistoryTransferPage_div_27_Template, 7, 0, "div", 21)(28, HistoryTransferPage_div_28_Template, 5, 2, "div", 22);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "app-floating-action-button", 23);
            i0.ɵɵlistener("clicked", function HistoryTransferPage_Template_app_floating_action_button_clicked_29_listener() { return ctx.navigateToAddTransfer(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(30, HistoryTransferPage_app_custom_alert_30_Template, 1, 0, "app-custom-alert", 24)(31, HistoryTransferPage_app_custom_alert_31_Template, 1, 6, "app-custom-alert", 25);
            i0.ɵɵelementStart(32, "app-account-selector-modal", 26);
            i0.ɵɵlistener("modalClosed", function HistoryTransferPage_Template_app_account_selector_modal_modalClosed_32_listener() { return ctx.closeAccountModal(); })("accountsSelected", function HistoryTransferPage_Template_app_account_selector_modal_accountsSelected_32_listener($event) { return ctx.onAccountsSelected($event); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", ctx.title)("showBack", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("fullscreen", true);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.selectedAccounts.length !== ctx.accounts.length);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.selectedAccounts.length !== 1);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedAccounts.length === 1);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.accountFilterLabel, " ");
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("options", ctx.periodTabs);
            i0.ɵɵtwoWayProperty("model", ctx.selectedPeriod);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.selectedPeriod === "semana");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedPeriod === "mes");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedPeriod === "anio");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.groupedTransfers.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.groupedTransfers);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.showCustomAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showGenericAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isAccountModalOpen)("accounts", ctx.accounts)("selectionMode", ctx.AccountSelectionMode.MULTIPLE)("selectedAccounts", ctx.selectedAccounts);
        } }, dependencies: [IonicModule, i5.IonContent, i5.IonHeader, i5.IonIcon, CommonModule, i6.NgForOf, i6.NgIf, FormsModule,
            HttpClientModule,
            CustomSegmentComponent,
            CustomAlertComponent,
            AccountSelectorModalComponent,
            PageLayoutComponent,
            ItemIconComponent,
            FloatingActionButtonComponent], styles: [".transfer-history-page[_ngcontent-%COMP%] {\n  --background: var(--fv-background);\n}\n\n\n\n\n\n\n.content-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n\n  padding: 16px;\n  padding-bottom: 110px;\n}\n\n\n\n\n\n\n.filter-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n\n\n\n\n\n.account-filter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  width: 100%;\n  padding: 14px;\n\n  border-radius: 16px;\n\n  background: var(--fv-surface);\n  border: 1px solid rgba(15,23,42,.05);\n\n  transition: .18s ease;\n}\n\n.account-filter[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  border-color: rgba(67,97,238,.12);\n}\n\n.account-filter[_ngcontent-%COMP%]:active {\n  transform: scale(.985);\n}\n\n.account-filter.active[_ngcontent-%COMP%] {\n  background: rgba(67,97,238,.03);\n}\n\n\n\n.filter-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n\n  flex: 1;\n  min-width: 0;\n}\n\n.filter-content[_ngcontent-%COMP%]   app-item-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n\n\n\n.filter-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n  gap: 2px;\n\n  min-width: 0;\n}\n\n.filter-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--fv-text-primary);\n\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.filter-subtitle[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 500;\n  color: var(--fv-text-secondary);\n}\n\n\n\n.filter-arrow[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n\n  opacity: .5;\n  transition: .18s ease;\n}\n\n.account-filter[_ngcontent-%COMP%]:hover   .filter-arrow[_ngcontent-%COMP%] {\n  opacity: .9;\n  transform: translateX(2px);\n}\n\n\n\n\n\n\n.period-card[_ngcontent-%COMP%] {\n  padding: 4px;\n  border-radius: 14px;\n  background: var(--fv-background);\n}\n\n.period-navigation[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 40px 1fr 40px;\n  gap: 10px;\n  align-items: center;\n}\n\n.nav-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n\n  border-radius: 50%;\n  border: none;\n\n  background: rgba(67,97,238,.06);\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  transition: .18s ease;\n}\n\n.nav-btn[_ngcontent-%COMP%]:active {\n  transform: scale(.92);\n}\n\n.period-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  min-height: 40px;\n\n  padding: 0 12px;\n\n  border-radius: 12px;\n\n  background: var(--fv-background);\n\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--fv-text-primary);\n}\n\n\n\n\n\n\n.date-text[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n\n  letter-spacing: .12em;\n  text-transform: uppercase;\n\n  color: #98A2B3;\n}\n\n\n\n\n\n\n.transfers-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.transfer-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n\n\n\n\n\n.transfer-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  padding: 10px 12px;\n\n  border-radius: 14px;\n\n  background: var(--fv-surface);\n  border: 1px solid rgba(15,23,42,.05);\n\n  min-height: 54px;\n\n  transition: .18s ease;\n}\n\n.transfer-item[_ngcontent-%COMP%]:hover {\n  border-color: rgba(67,97,238,.12);\n}\n\n.transfer-item[_ngcontent-%COMP%]:active {\n  transform: scale(.985);\n}\n\n\n\n.transfer-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n\n  flex: 1;\n  min-width: 0;\n}\n\n\n\n.transfer-main[_ngcontent-%COMP%]   app-item-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n\n\n\n.transfer-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n  gap: 2px;\n\n  min-width: 0;\n}\n\n\n\n.transfer-title[_ngcontent-%COMP%], \n.origin[_ngcontent-%COMP%], \n.destination[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--fv-text-primary);\n\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n\n\n.transfer-comment[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--fv-text-secondary);\n\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n\n\n.transfer-route[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n\n\n.transfer-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.transfer-amount[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--fv-text-primary);\n\n  font-variant-numeric: tabular-nums;\n}\n\n.transfer-arrow[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n\n  opacity: .5;\n}\n\n\n\n\n\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  gap: 12px;\n\n  padding: 60px 20px;\n\n  text-align: center;\n}\n\n.empty-icon[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 16px;\n\n  background: rgba(67,97,238,.06);\n}\n\n.empty-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n\n  color: var(--fv-primary);\n  opacity: .8;\n}\n\n.empty-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 800;\n\n  color: var(--fv-text-primary);\n}\n\n.empty-description[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: var(--fv-text-secondary);\n\n  max-width: 260px;\n  line-height: 1.4;\n}\n\n\n\n.empty-action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n\n  padding: 10px 14px;\n\n  border-radius: 12px;\n\n  border: none;\n\n  background: var(--fv-gradient-primary);\n  color: white;\n\n  font-size: 13px;\n  font-weight: 600;\n\n  box-shadow: var(--fv-shadow-primary);\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HistoryTransferPage, [{
        type: Component,
        args: [{ selector: 'app-history-transfer', standalone: true, imports: [
                    IonicModule,
                    CommonModule,
                    FormsModule,
                    HttpClientModule,
                    CustomSegmentComponent,
                    CustomAlertComponent,
                    AccountSelectorModalComponent,
                    PageLayoutComponent,
                    ItemIconComponent,
                    FloatingActionButtonComponent
                ], template: "<!-- ==========================================================\n     HEADER\n     ========================================================== -->\n\n<ion-header>\n  <app-page-layout\n    [title]=\"title\"\n    [showBack]=\"true\"\n    (back)=\"backToAccounts()\">\n  </app-page-layout>\n</ion-header>\n\n<!-- ==========================================================\n     CONTENT\n     ========================================================== -->\n\n<ion-content\n  [fullscreen]=\"true\"\n  scroll-y=\"false\"\n  class=\"transfer-history-page\">\n\n  <div class=\"content-wrapper\">\n\n    <!-- ==========================================================\n         FILTERS\n         ========================================================== -->\n\n    <section class=\"filter-section\">\n\n      <!-- ACCOUNT FILTER -->\n      <button\n        type=\"button\"\n        class=\"account-filter\"\n        [class.active]=\"selectedAccounts.length !== accounts.length\"\n        (click)=\"openAccountModal()\">\n\n        <div class=\"filter-content\">\n\n          <app-item-icon\n            *ngIf=\"selectedAccounts.length !== 1\"\n            icon=\"wallet\"\n            color=\"var(--fv-primary)\">\n          </app-item-icon>\n\n          <app-item-icon\n            *ngIf=\"selectedAccounts.length === 1\"\n            [icon]=\"selectedAccountIcon\"\n            [color]=\"selectedAccountColor\">\n          </app-item-icon>\n\n          <div class=\"filter-text\">\n\n            <span class=\"filter-title\">\n              {{ accountFilterLabel }}\n            </span>\n\n            <span class=\"filter-subtitle\">\n              Filtrar transferencias\n            </span>\n\n          </div>\n\n        </div>\n\n        <ion-icon\n          class=\"filter-arrow\"\n          src=\"assets/icon/transfer.svg\">\n        </ion-icon>\n\n      </button>\n\n      <!-- PERIOD SEGMENT -->\n      <div class=\"period-card\">\n\n        <app-custom-segment\n          [options]=\"periodTabs\"\n          [(model)]=\"selectedPeriod\"\n          segmentClass=\"period-tabs\"\n          (modelChange)=\"onPeriodChange()\">\n        </app-custom-segment>\n\n      </div>\n\n      <!-- PERIOD NAVIGATION -->\n      <div class=\"period-navigation\">\n\n        <button\n          type=\"button\"\n          class=\"nav-btn\"\n          (click)=\"prevPeriod()\">\n\n          <ion-icon src=\"assets/icon/left-inline.svg\"></ion-icon>\n\n        </button>\n\n        <div class=\"period-label\">\n\n          <span *ngIf=\"selectedPeriod === 'semana'\">\n            Semana {{ selectedWeekOfMonth }} \u00B7 {{ getMonthName(selectedMonth) }} {{ selectedYear }}\n          </span>\n\n          <span *ngIf=\"selectedPeriod === 'mes'\">\n            {{ getMonthName(selectedMonth) }} {{ selectedYear }}\n          </span>\n\n          <span *ngIf=\"selectedPeriod === 'anio'\">\n            {{ selectedYear }}\n          </span>\n\n        </div>\n\n        <button\n          type=\"button\"\n          class=\"nav-btn\"\n          (click)=\"nextPeriod()\">\n\n          <ion-icon src=\"assets/icon/right-inline.svg\"></ion-icon>\n\n        </button>\n\n      </div>\n\n    </section>\n\n    <!-- ==========================================================\n         TRANSFERS LIST\n         ========================================================== -->\n\n    <section class=\"transfers-list\">\n\n      <!-- EMPTY STATE -->\n      <div\n        *ngIf=\"groupedTransfers.length === 0\"\n        class=\"empty-state\">\n\n        <div class=\"empty-icon\">\n          <ion-icon src=\"assets/icon/transfer.svg\"></ion-icon>\n        </div>\n\n        <h3 class=\"empty-title\">\n          Sin transferencias\n        </h3>\n\n        <p class=\"empty-description\">\n          Aqu\u00ED ver\u00E1s tus movimientos entre cuentas cuando realices transferencias.\n        </p>\n\n      </div>\n\n      <!-- GROUPS -->\n      <div\n        *ngFor=\"let group of groupedTransfers\"\n        class=\"transfer-group\">\n\n        <!-- DATE HEADER -->\n        <div class=\"date-header\">\n          <span class=\"date-text\">\n            {{ group.fecha }}\n          </span>\n        </div>\n\n        <!-- ITEMS -->\n        <button\n          *ngFor=\"let transfer of group.items\"\n          type=\"button\"\n          class=\"transfer-item\"\n          (click)=\"editTransfer(transfer)\">\n\n          <!-- LEFT -->\n          <div class=\"transfer-main\">\n\n            <app-item-icon\n              [icon]=\"getTransferIcon(transfer.type)\"\n              size=\"sm\"\n              [color]=\"getTransferColor(transfer.type)\">\n            </app-item-icon>\n\n            <div class=\"transfer-info\">\n\n              <ng-container *ngIf=\"transfer.type === 'Inicial'\">\n\n                <div class=\"transfer-title\">\n                  {{ transfer.destinationAccountName }}\n                </div>\n\n                <div class=\"transfer-comment\">\n                  Saldo inicial\n                </div>\n\n              </ng-container>\n\n              <ng-container *ngIf=\"transfer.type === 'Ajuste'\">\n\n                <div class=\"transfer-title\">\n                  {{ transfer.originAccountName }}\n                </div>\n\n                <div class=\"transfer-comment\">\n                  Ajuste de saldo\n                </div>\n\n              </ng-container>\n\n              <ng-container *ngIf=\"transfer.type === 'Realizado'\">\n\n                <div class=\"transfer-route\">\n\n                  <span class=\"origin\">\n                    {{ transfer.originAccountName }}\n                  </span>\n\n                  <ion-icon src=\"assets/icon/arrow-swap.svg\"></ion-icon>\n\n                  <span class=\"destination\">\n                    {{ transfer.destinationAccountName }}\n                  </span>\n\n                </div>\n\n                <div\n                  *ngIf=\"transfer.comment\"\n                  class=\"transfer-comment\">\n                  {{ transfer.comment }}\n                </div>\n\n              </ng-container>\n\n            </div>\n\n          </div>\n\n          <!-- RIGHT -->\n          <div class=\"transfer-right\">\n\n            <div class=\"transfer-amount\">\n              S/. {{ transfer.amount }}\n            </div>\n\n            <ion-icon\n              class=\"transfer-arrow\"\n              src=\"assets/icon/right-inline.svg\">\n            </ion-icon>\n\n          </div>\n\n        </button>\n\n      </div>\n\n    </section>\n\n  </div>\n\n  <app-floating-action-button\n    ariaLabel=\"Agregar transferencia\"\n    (clicked)=\"navigateToAddTransfer()\">\n  </app-floating-action-button>\n\n</ion-content>\n\n<!-- ==========================================================\n     ALERTS\n     ========================================================== -->\n\n<app-custom-alert\n  *ngIf=\"showCustomAlert\"\n  header=\"Cambios sin guardar\"\n  message=\"Has realizado cambios en la transferencia. \u00BFDeseas salir sin guardar?\"\n  cancelText=\"No\"\n  confirmText=\"S\u00ED\"\n  (onCancel)=\"showCustomAlert = false\"\n  (onConfirm)=\"salirSinGuardar()\">\n</app-custom-alert>\n\n  <app-custom-alert\n  *ngIf=\"showGenericAlert\"\n  header=\"\"\n  [message]=\"'No se pudo completar la acci\u00F3n. Por favor, intenta nuevamente.'\"\n  [imageUrl]=\"'assets/icon/alert-triangle.svg'\"\n  [confirmText]=\"'Entendido'\"\n  [alertSize]=\"'medium'\"\n  [reverseButtons]=\"true\"\n  [showCancel]=\"false\"\n  (onConfirm)=\"showGenericAlert = false\">\n  </app-custom-alert>\n\n<!-- ACCOUNT MODAL -->\n<app-account-selector-modal\n  [isOpen]=\"isAccountModalOpen\"\n  [accounts]=\"accounts\"\n  [selectionMode]=\"AccountSelectionMode.MULTIPLE\"\n  [selectedAccounts]=\"selectedAccounts\"\n  (modalClosed)=\"closeAccountModal()\"\n  (accountsSelected)=\"onAccountsSelected($event)\">\n</app-account-selector-modal>\n", styles: [".transfer-history-page {\n  --background: var(--fv-background);\n}\n\n/* ==========================================================\n   LAYOUT\n   ========================================================== */\n\n.content-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n\n  padding: 16px;\n  padding-bottom: 110px;\n}\n\n/* ==========================================================\n   FILTER SECTION\n   ========================================================== */\n\n.filter-section {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n/* ==========================================================\n   ACCOUNT FILTER (PRO FINTECH)\n   ========================================================== */\n\n.account-filter {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  width: 100%;\n  padding: 14px;\n\n  border-radius: 16px;\n\n  background: var(--fv-surface);\n  border: 1px solid rgba(15,23,42,.05);\n\n  transition: .18s ease;\n}\n\n.account-filter:hover {\n  transform: translateY(-1px);\n  border-color: rgba(67,97,238,.12);\n}\n\n.account-filter:active {\n  transform: scale(.985);\n}\n\n.account-filter.active {\n  background: rgba(67,97,238,.03);\n}\n\n/* FILTER CONTENT */\n.filter-content {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n\n  flex: 1;\n  min-width: 0;\n}\n\n.filter-content app-item-icon {\n  flex-shrink: 0;\n}\n\n/* TEXT */\n.filter-text {\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n  gap: 2px;\n\n  min-width: 0;\n}\n\n.filter-title {\n  font-size: 14px;\n  font-weight: 800;\n  color: var(--fv-text-primary);\n\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.filter-subtitle {\n  font-size: 11.5px;\n  font-weight: 500;\n  color: var(--fv-text-secondary);\n}\n\n/* ARROW */\n.filter-arrow {\n  width: 16px;\n  height: 16px;\n\n  opacity: .5;\n  transition: .18s ease;\n}\n\n.account-filter:hover .filter-arrow {\n  opacity: .9;\n  transform: translateX(2px);\n}\n\n/* ==========================================================\n   PERIOD\n   ========================================================== */\n\n.period-card {\n  padding: 4px;\n  border-radius: 14px;\n  background: var(--fv-background);\n}\n\n.period-navigation {\n  display: grid;\n  grid-template-columns: 40px 1fr 40px;\n  gap: 10px;\n  align-items: center;\n}\n\n.nav-btn {\n  width: 40px;\n  height: 40px;\n\n  border-radius: 50%;\n  border: none;\n\n  background: rgba(67,97,238,.06);\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  transition: .18s ease;\n}\n\n.nav-btn:active {\n  transform: scale(.92);\n}\n\n.period-label {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  min-height: 40px;\n\n  padding: 0 12px;\n\n  border-radius: 12px;\n\n  background: var(--fv-background);\n\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--fv-text-primary);\n}\n\n/* ==========================================================\n   GROUP HEADER\n   ========================================================== */\n\n.date-text {\n  font-size: 10px;\n  font-weight: 700;\n\n  letter-spacing: .12em;\n  text-transform: uppercase;\n\n  color: #98A2B3;\n}\n\n/* ==========================================================\n   TRANSFER LIST\n   ========================================================== */\n\n.transfers-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.transfer-group {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n/* ==========================================================\n   TRANSFER ITEM (FINTECH CLEAN)\n   ========================================================== */\n\n.transfer-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  padding: 10px 12px;\n\n  border-radius: 14px;\n\n  background: var(--fv-surface);\n  border: 1px solid rgba(15,23,42,.05);\n\n  min-height: 54px;\n\n  transition: .18s ease;\n}\n\n.transfer-item:hover {\n  border-color: rgba(67,97,238,.12);\n}\n\n.transfer-item:active {\n  transform: scale(.985);\n}\n\n/* LEFT */\n.transfer-main {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n\n  flex: 1;\n  min-width: 0;\n}\n\n/* ICON */\n.transfer-main app-item-icon {\n  flex-shrink: 0;\n}\n\n/* INFO */\n.transfer-info {\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n  gap: 2px;\n\n  min-width: 0;\n}\n\n/* TITLE */\n.transfer-title,\n.origin,\n.destination {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--fv-text-primary);\n\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n/* COMMENT */\n.transfer-comment {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--fv-text-secondary);\n\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n/* ROUTE */\n.transfer-route {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n/* RIGHT */\n.transfer-right {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.transfer-amount {\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--fv-text-primary);\n\n  font-variant-numeric: tabular-nums;\n}\n\n.transfer-arrow {\n  width: 14px;\n  height: 14px;\n\n  opacity: .5;\n}\n\n/* ==========================================================\n   EMPTY STATE (LEVEL FINTECH)\n   ========================================================== */\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  gap: 12px;\n\n  padding: 60px 20px;\n\n  text-align: center;\n}\n\n.empty-icon {\n  width: 64px;\n  height: 64px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 16px;\n\n  background: rgba(67,97,238,.06);\n}\n\n.empty-icon ion-icon {\n  width: 28px;\n  height: 28px;\n\n  color: var(--fv-primary);\n  opacity: .8;\n}\n\n.empty-title {\n  font-size: 15px;\n  font-weight: 800;\n\n  color: var(--fv-text-primary);\n}\n\n.empty-description {\n  font-size: 12.5px;\n  color: var(--fv-text-secondary);\n\n  max-width: 260px;\n  line-height: 1.4;\n}\n\n/* ACTION BUTTON */\n.empty-action {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n\n  padding: 10px 14px;\n\n  border-radius: 12px;\n\n  border: none;\n\n  background: var(--fv-gradient-primary);\n  color: white;\n\n  font-size: 13px;\n  font-weight: 600;\n\n  box-shadow: var(--fv-shadow-primary);\n}\n"] }]
    }], () => [{ type: i1.NavigationService }, { type: i2.SpinnerService }, { type: i3.ListAccountsUseCase }, { type: i4.ListTransferUseCase }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HistoryTransferPage, { className: "HistoryTransferPage", filePath: "src/app/features/side-menu/accounts/history-transfer/history-transfer.page.ts", lineNumber: 44 }); })();
//# sourceMappingURL=history-transfer.page.js.map