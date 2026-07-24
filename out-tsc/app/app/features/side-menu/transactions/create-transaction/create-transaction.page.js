import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import 'src/app/core/utils/observable-extensions';
import { AccountSelectionMode, AccountSelectorModalComponent } from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { AmountInputComponent } from 'src/app/shared/components/amount-input/amount-input.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CategorySelectionMode, CategorySelectorModalComponent } from 'src/app/shared/components/category-selector-modal/category-selector-modal.component';
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import { FilterModalComponent } from 'src/app/shared/components/filter-modal/filter-modal.component';
import { InfoBannerComponent } from 'src/app/shared/components/info-banner/info-banner.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { SelectionSummaryComponent } from 'src/app/shared/components/selection-summary/selection-summary.component';
import { TextFieldComponent } from 'src/app/shared/components/text-field/text-field.component';
import { SuccessReceiptModalComponent } from 'src/app/shared/components/success-receipt-modal/success-receipt-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/services/navigation.service";
import * as i2 from "src/app/core/use-cases/transactions/create-transactions";
import * as i3 from "src/app/core/use-cases/categories/list-categories.usecase";
import * as i4 from "src/app/core/use-cases/accounts/list-accounts.usecase";
import * as i5 from "src/app/core/services/spinnerService.service";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
import * as i8 from "@ionic/angular";
function CreateTransactionPage_app_custom_alert_51_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 34);
    i0.ɵɵlistener("onCancel", function CreateTransactionPage_app_custom_alert_51_Template_app_custom_alert_onCancel_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showUnsavedAlert = false); })("onConfirm", function CreateTransactionPage_app_custom_alert_51_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.leaveWithoutSaving()); });
    i0.ɵɵelementEnd();
} }
function CreateTransactionPage_app_custom_alert_52_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 35);
    i0.ɵɵlistener("onConfirm", function CreateTransactionPage_app_custom_alert_52_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showLoadError = false); });
    i0.ɵɵelementEnd();
} }
function CreateTransactionPage_app_custom_alert_53_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 36);
    i0.ɵɵlistener("onConfirm", function CreateTransactionPage_app_custom_alert_53_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showSaveError = false); });
    i0.ɵɵelementEnd();
} }
export class CreateTransactionPage {
    constructor(navService, createTransactionsUseCase, listCategoriesUseCase, listAccountsUseCase, loadingService) {
        this.navService = navService;
        this.createTransactionsUseCase = createTransactionsUseCase;
        this.listCategoriesUseCase = listCategoriesUseCase;
        this.listAccountsUseCase = listAccountsUseCase;
        this.loadingService = loadingService;
        this.AccountSelectionMode = AccountSelectionMode;
        this.CategorySelectionMode = CategorySelectionMode;
        this.transactionTypes = [
            { value: 'gastos', label: 'Gasto' },
            { value: 'ingresos', label: 'Ingreso' }
        ];
        this.selectedType = 'gastos';
        this.amount = null;
        this.selectedAccount = null;
        this.selectedCategory = null;
        this.date = this.today;
        this.description = '';
        this.incomeCategories = [];
        this.expenseCategories = [];
        this.accounts = [];
        this.isAccountModalOpen = false;
        this.isCategoryModalOpen = false;
        this.isPeriodModalOpen = false;
        this.isSuccessReceiptOpen = false;
        this.isSaving = false;
        this.showUnsavedAlert = false;
        this.showLoadError = false;
        this.showSaveError = false;
        this.transactionId = null;
        this.hasPendingChanges = false;
        this.pendingInitialLoads = 2;
    }
    ngOnInit() {
        this.loadingService.show();
        this.loadCategories();
        this.loadAccounts();
    }
    get categories() {
        return this.selectedType === 'ingresos'
            ? this.incomeCategories
            : this.expenseCategories;
    }
    get canSave() {
        return !this.isSaving &&
            (this.amount ?? 0) > 0 &&
            this.selectedAccount !== null &&
            this.selectedCategory?.id !== undefined &&
            Boolean(this.date);
    }
    get accountSummary() {
        return this.selectedAccount?.name ?? 'Selecciona una cuenta';
    }
    get accountBalanceLabel() {
        if (!this.selectedAccount)
            return 'Elige de dónde saldrá o ingresará el dinero';
        return `Saldo disponible: S/ ${this.formatAmount(this.selectedAccount.amount)}`;
    }
    get selectedAccountItems() {
        if (!this.selectedAccount)
            return [];
        return [{
                id: this.selectedAccount.id,
                name: this.selectedAccount.name,
                icon: this.selectedAccount.icon,
                color: this.selectedAccount.color
            }];
    }
    get categorySummary() {
        return this.selectedCategory?.nombre ?? 'Selecciona una categoría';
    }
    get categoryDescription() {
        return this.selectedCategory
            ? `Categoría de ${this.selectedType === 'gastos' ? 'gasto' : 'ingreso'}`
            : 'Clasifica el movimiento para organizar tus finanzas';
    }
    get selectedCategoryItems() {
        if (!this.selectedCategory)
            return [];
        return [{
                id: this.selectedCategory.id,
                name: this.selectedCategory.nombre,
                icon: this.selectedCategory.icono,
                color: this.selectedCategory.color
            }];
    }
    get formattedDate() {
        if (!this.date)
            return 'Selecciona una fecha';
        return new Intl.DateTimeFormat('es-PE', {
            weekday: 'short',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC'
        }).format(new Date(`${this.date}T00:00:00Z`));
    }
    get datePeriodValue() {
        return this.date;
    }
    get transactionAdvice() {
        return this.selectedType === 'gastos'
            ? 'Registrar tus gastos al momento te ayuda a mantener tus presupuestos siempre actualizados.'
            : 'Clasifica tus ingresos para entender mejor de dónde viene tu dinero.';
    }
    get successReceiptDetails() {
        return [
            {
                label: 'Monto',
                value: `S/ ${this.formatAmount(this.amount ?? 0)}`,
                emphasis: true
            },
            {
                label: 'Tipo',
                value: this.selectedType === 'gastos' ? 'Gasto' : 'Ingreso'
            },
            { label: 'Fecha', value: this.formattedDate, wrap: true },
            { label: 'Cuenta', value: this.selectedAccount?.name ?? '', wrap: true },
            { label: 'Categoría', value: this.selectedCategory?.nombre ?? '', wrap: true },
            ...(this.description.trim()
                ? [{ label: 'Nota', value: this.description.trim(), wrap: true }]
                : []),
            ...(this.transactionId !== null
                ? [{ label: 'N.º de operación', value: this.transactionId.toString() }]
                : [])
        ];
    }
    changeType(value) {
        if (value !== 'gastos' && value !== 'ingresos')
            return;
        this.selectedType = value;
        this.selectedCategory = null;
        this.markAsChanged();
    }
    selectCategory(category) {
        this.selectedCategory = category;
        this.markAsChanged();
    }
    openCategoryModal() {
        this.isCategoryModalOpen = true;
    }
    closeCategoryModal() {
        this.isCategoryModalOpen = false;
    }
    openAccountModal() {
        this.isAccountModalOpen = true;
    }
    closeAccountModal() {
        this.isAccountModalOpen = false;
    }
    selectAccount(account) {
        this.selectedAccount = account;
        this.markAsChanged();
    }
    openPeriodModal() {
        this.isPeriodModalOpen = true;
    }
    closePeriodModal() {
        this.isPeriodModalOpen = false;
    }
    applyPeriod(selection) {
        this.date = selection.startDate;
        this.closePeriodModal();
        this.markAsChanged();
    }
    onFormChange() {
        this.markAsChanged();
    }
    saveTransaction() {
        if (!this.canSave || !this.selectedCategory?.id || !this.selectedAccount)
            return;
        const request = {
            categoryId: this.selectedCategory.id.toString(),
            accountId: this.selectedAccount.id.toString(),
            amount: this.amount,
            date: this.date,
            type: this.selectedType,
            description: this.description.trim()
        };
        this.isSaving = true;
        this.createTransactionsUseCase.execute(request).service({
            success: data => {
                this.isSaving = false;
                this.hasPendingChanges = false;
                this.transactionId = data?.info?.id ?? null;
                this.isSuccessReceiptOpen = true;
            },
            failure: () => {
                this.isSaving = false;
                this.showSaveError = true;
            }
        });
    }
    backToTransactions() {
        if (this.hasPendingChanges) {
            this.showUnsavedAlert = true;
            return;
        }
        void this.navService.back();
    }
    leaveWithoutSaving() {
        this.showUnsavedAlert = false;
        this.hasPendingChanges = false;
        void this.navService.back();
    }
    viewTransactions() {
        this.isSuccessReceiptOpen = false;
        void this.navService.replace('/main/transactions', undefined, false);
    }
    loadCategories() {
        this.listCategoriesUseCase.execute().service({
            success: data => {
                this.finishInitialLoad();
                const categories = data?.items ?? [];
                this.incomeCategories = categories.filter(category => category.tipo === 'ingresos' || category.tipo === 'ingreso');
                this.expenseCategories = categories.filter(category => category.tipo === 'gastos' || category.tipo === 'gasto');
            },
            failure: () => {
                this.finishInitialLoad();
                this.showLoadError = true;
            }
        });
    }
    loadAccounts() {
        this.listAccountsUseCase.listAccounts().service({
            success: data => {
                this.finishInitialLoad();
                this.accounts = data?.items ?? [];
            },
            failure: () => {
                this.finishInitialLoad();
                this.showLoadError = true;
            }
        });
    }
    markAsChanged() {
        this.hasPendingChanges = true;
    }
    finishInitialLoad() {
        this.pendingInitialLoads = Math.max(0, this.pendingInitialLoads - 1);
        if (this.pendingInitialLoads === 0) {
            this.loadingService.hide();
        }
    }
    formatAmount(value) {
        return new Intl.NumberFormat('es-PE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(Number(value) || 0);
    }
    toLocalDate(value) {
        const year = value.getFullYear();
        const month = `${value.getMonth() + 1}`.padStart(2, '0');
        const day = `${value.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    get today() {
        return this.toLocalDate(new Date());
    }
    static { this.ɵfac = function CreateTransactionPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CreateTransactionPage)(i0.ɵɵdirectiveInject(i1.NavigationService), i0.ɵɵdirectiveInject(i2.CreateTransactionsUseCase), i0.ɵɵdirectiveInject(i3.ListCategoriesUseCase), i0.ɵɵdirectiveInject(i4.ListAccountsUseCase), i0.ɵɵdirectiveInject(i5.SpinnerService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CreateTransactionPage, selectors: [["app-create-transaction"]], decls: 54, vars: 58, consts: [["title", "Nueva transacci\u00F3n", 3, "back", "showBack", "loading"], [1, "create-transaction-page", 3, "fullscreen"], [1, "transaction-form", 3, "ngSubmit"], [3, "modelChange", "options", "model"], ["aria-live", "polite", 1, "transaction-preview"], [1, "preview-header"], [1, "preview-type"], ["aria-hidden", "true"], [1, "preview-date"], [1, "preview-value"], [1, "preview-amount"], [1, "preview-meta"], [1, "preview-detail"], ["size", "sm", "variant", "soft", "aria-hidden", "true", 3, "icon", "color"], ["title", "Monto", "appearance", "plain"], ["name", "amount", "ariaLabel", "Monto de la transacci\u00F3n", "placeholder", "0.00", "currencyCode", "PEN", "variant", "enhanced", "locale", "es-PE", 3, "ngModelChange", "ngModel", "maxDigits", "required"], ["title", "Programaci\u00F3n"], ["secondaryText", "Fecha del movimiento", "ariaLabel", "Cambiar la fecha de la transacci\u00F3n", "fallbackIcon", "assets/icon/calendar.svg", 3, "activated", "primaryText"], ["title", "Cuenta"], ["ariaLabel", "Seleccionar cuenta", "fallbackIcon", "assets/icon/wallet.svg", 3, "activated", "primaryText", "secondaryText", "items"], ["title", "Categor\u00EDa"], ["ariaLabel", "Seleccionar categor\u00EDa", "fallbackIcon", "assets/icon/category.svg", 3, "activated", "primaryText", "secondaryText", "items", "interactive"], ["title", "Nota (opcional)"], ["name", "description", "ariaLabel", "Nota de la transacci\u00F3n", "placeholder", "Ej. Almuerzo con el equipo", 3, "ngModelChange", "embedded", "multiline", "rows", "maxLength", "ngModel"], ["title", "Consejo FinVia", "symbol", "\u2728", 3, "message"], [1, "action-container"], ["type", "submit", 3, "text", "loading", "disabled"], ["title", "Elige la fecha", "description", "Selecciona cu\u00E1ndo ocurri\u00F3 este movimiento.", "applyText", "Aplicar fecha", "selectedPeriod", "custom", 3, "modalClosed", "filtersApplied", "isOpen", "singleDate", "selectedPeriodValue", "selectedStartDate", "selectedEndDate"], [3, "accountSelected", "modalClosed", "isOpen", "accounts", "selectionMode", "selectedAccount"], [3, "categorySelected", "modalClosed", "isOpen", "categories", "selectionMode", "selectedCategory"], ["title", "Transacci\u00F3n registrada", "eyebrow", "\u00A1Movimiento registrado!", "actionText", "Ver mis transacciones", 3, "completed", "isOpen", "heading", "details"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la transacci\u00F3n. \u00BFDeseas salir sin guardar?", "cancelText", "Seguir editando", "confirmText", "Salir", 3, "onCancel", "onConfirm", 4, "ngIf"], ["header", "No se pudieron cargar los datos", "message", "No fue posible obtener tus cuentas o categor\u00EDas. Int\u00E9ntalo nuevamente.", "confirmText", "Aceptar", 3, "onConfirm", 4, "ngIf"], ["header", "No se pudo registrar", "message", "Ocurri\u00F3 un error al guardar la transacci\u00F3n. Revisa los datos e int\u00E9ntalo nuevamente.", "confirmText", "Aceptar", 3, "onConfirm", 4, "ngIf"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en la transacci\u00F3n. \u00BFDeseas salir sin guardar?", "cancelText", "Seguir editando", "confirmText", "Salir", 3, "onCancel", "onConfirm"], ["header", "No se pudieron cargar los datos", "message", "No fue posible obtener tus cuentas o categor\u00EDas. Int\u00E9ntalo nuevamente.", "confirmText", "Aceptar", 3, "onConfirm"], ["header", "No se pudo registrar", "message", "Ocurri\u00F3 un error al guardar la transacci\u00F3n. Revisa los datos e int\u00E9ntalo nuevamente.", "confirmText", "Aceptar", 3, "onConfirm"]], template: function CreateTransactionPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-header")(1, "app-page-layout", 0);
            i0.ɵɵlistener("back", function CreateTransactionPage_Template_app_page_layout_back_1_listener() { return ctx.backToTransactions(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(2, "ion-content", 1)(3, "form", 2);
            i0.ɵɵlistener("ngSubmit", function CreateTransactionPage_Template_form_ngSubmit_3_listener() { return ctx.saveTransaction(); });
            i0.ɵɵelementStart(4, "app-custom-segment", 3);
            i0.ɵɵlistener("modelChange", function CreateTransactionPage_Template_app_custom_segment_modelChange_4_listener($event) { return ctx.changeType($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "section", 4)(6, "header", 5)(7, "span", 6);
            i0.ɵɵelement(8, "i", 7);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 8);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 9)(13, "span");
            i0.ɵɵtext(14, "Monto del movimiento");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 10)(16, "strong");
            i0.ɵɵtext(17);
            i0.ɵɵpipe(18, "number");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(19, "div", 11)(20, "div", 12);
            i0.ɵɵelement(21, "app-item-icon", 13);
            i0.ɵɵelementStart(22, "span")(23, "small");
            i0.ɵɵtext(24, "Cuenta");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "strong");
            i0.ɵɵtext(26);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(27, "div", 12);
            i0.ɵɵelement(28, "app-item-icon", 13);
            i0.ɵɵelementStart(29, "span")(30, "small");
            i0.ɵɵtext(31, "Categor\u00EDa");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "strong");
            i0.ɵɵtext(33);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(34, "app-section-card", 14)(35, "app-amount-input", 15);
            i0.ɵɵtwoWayListener("ngModelChange", function CreateTransactionPage_Template_app_amount_input_ngModelChange_35_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.amount, $event) || (ctx.amount = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function CreateTransactionPage_Template_app_amount_input_ngModelChange_35_listener() { return ctx.onFormChange(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "app-section-card", 16)(37, "app-selection-summary", 17);
            i0.ɵɵlistener("activated", function CreateTransactionPage_Template_app_selection_summary_activated_37_listener() { return ctx.openPeriodModal(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(38, "app-section-card", 18)(39, "app-selection-summary", 19);
            i0.ɵɵlistener("activated", function CreateTransactionPage_Template_app_selection_summary_activated_39_listener() { return ctx.openAccountModal(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "app-section-card", 20)(41, "app-selection-summary", 21);
            i0.ɵɵlistener("activated", function CreateTransactionPage_Template_app_selection_summary_activated_41_listener() { return ctx.openCategoryModal(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "app-section-card", 22)(43, "app-text-field", 23);
            i0.ɵɵtwoWayListener("ngModelChange", function CreateTransactionPage_Template_app_text_field_ngModelChange_43_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.description, $event) || (ctx.description = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function CreateTransactionPage_Template_app_text_field_ngModelChange_43_listener() { return ctx.onFormChange(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(44, "app-info-banner", 24);
            i0.ɵɵelementStart(45, "div", 25);
            i0.ɵɵelement(46, "app-button", 26);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(47, "app-filter-modal", 27);
            i0.ɵɵlistener("modalClosed", function CreateTransactionPage_Template_app_filter_modal_modalClosed_47_listener() { return ctx.closePeriodModal(); })("filtersApplied", function CreateTransactionPage_Template_app_filter_modal_filtersApplied_47_listener($event) { return ctx.applyPeriod($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "app-account-selector-modal", 28);
            i0.ɵɵlistener("accountSelected", function CreateTransactionPage_Template_app_account_selector_modal_accountSelected_48_listener($event) { return ctx.selectAccount($event); })("modalClosed", function CreateTransactionPage_Template_app_account_selector_modal_modalClosed_48_listener() { return ctx.closeAccountModal(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "app-category-selector-modal", 29);
            i0.ɵɵlistener("categorySelected", function CreateTransactionPage_Template_app_category_selector_modal_categorySelected_49_listener($event) { return ctx.selectCategory($event); })("modalClosed", function CreateTransactionPage_Template_app_category_selector_modal_modalClosed_49_listener() { return ctx.closeCategoryModal(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "app-success-receipt-modal", 30);
            i0.ɵɵlistener("completed", function CreateTransactionPage_Template_app_success_receipt_modal_completed_50_listener() { return ctx.viewTransactions(); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(51, CreateTransactionPage_app_custom_alert_51_Template, 1, 0, "app-custom-alert", 31)(52, CreateTransactionPage_app_custom_alert_52_Template, 1, 0, "app-custom-alert", 32)(53, CreateTransactionPage_app_custom_alert_53_Template, 1, 0, "app-custom-alert", 33);
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("showBack", true)("loading", ctx.isSaving);
            i0.ɵɵadvance();
            i0.ɵɵproperty("fullscreen", false);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("options", ctx.transactionTypes)("model", ctx.selectedType);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("income", ctx.selectedType === "ingresos");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", ctx.selectedType === "gastos" ? "Gasto" : "Ingreso", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.formattedDate);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1("S/ ", i0.ɵɵpipeBind2(18, 55, ctx.amount || 0, "1.2-2"), "");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("icon", (ctx.selectedAccount == null ? null : ctx.selectedAccount.icon) || "wallet")("color", (ctx.selectedAccount == null ? null : ctx.selectedAccount.color) || "var(--fv-interactive-icon)");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate((ctx.selectedAccount == null ? null : ctx.selectedAccount.name) || "Sin seleccionar");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("icon", (ctx.selectedCategory == null ? null : ctx.selectedCategory.icono) || "category")("color", (ctx.selectedCategory == null ? null : ctx.selectedCategory.color) || "var(--fv-interactive-icon)");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate((ctx.selectedCategory == null ? null : ctx.selectedCategory.nombre) || "Sin seleccionar");
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.amount);
            i0.ɵɵproperty("maxDigits", 11)("required", true);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("primaryText", ctx.formattedDate);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("primaryText", ctx.accountSummary)("secondaryText", ctx.accountBalanceLabel)("items", ctx.selectedAccountItems);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("primaryText", ctx.categorySummary)("secondaryText", ctx.categoryDescription)("items", ctx.selectedCategoryItems)("interactive", ctx.categories.length > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("embedded", true)("multiline", true)("rows", 3)("maxLength", 200);
            i0.ɵɵtwoWayProperty("ngModel", ctx.description);
            i0.ɵɵadvance();
            i0.ɵɵproperty("message", ctx.transactionAdvice);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("text", ctx.isSaving ? "Guardando..." : "Registrar transacci\u00F3n")("loading", ctx.isSaving)("disabled", !ctx.canSave);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isPeriodModalOpen)("singleDate", true)("selectedPeriodValue", ctx.datePeriodValue)("selectedStartDate", ctx.date)("selectedEndDate", ctx.date);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isAccountModalOpen)("accounts", ctx.accounts)("selectionMode", ctx.AccountSelectionMode.SINGLE)("selectedAccount", ctx.selectedAccount);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isCategoryModalOpen)("categories", ctx.categories)("selectionMode", ctx.CategorySelectionMode.SINGLE)("selectedCategory", ctx.selectedCategory);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isSuccessReceiptOpen)("heading", ctx.selectedType === "gastos" ? "Gasto registrado correctamente" : "Ingreso registrado correctamente")("details", ctx.successReceiptDetails);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showUnsavedAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showLoadError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showSaveError);
        } }, dependencies: [CommonModule, i6.NgIf, i6.DecimalPipe, FormsModule, i7.ɵNgNoValidate, i7.NgControlStatus, i7.NgControlStatusGroup, i7.RequiredValidator, i7.NgModel, i7.NgForm, IonicModule, i8.IonContent, i8.IonHeader, AccountSelectorModalComponent,
            AmountInputComponent,
            ButtonComponent,
            CategorySelectorModalComponent,
            CustomAlertComponent,
            CustomSegmentComponent,
            FilterModalComponent,
            InfoBannerComponent,
            ItemIconComponent,
            PageLayoutComponent,
            SectionCardComponent,
            SelectionSummaryComponent,
            SuccessReceiptModalComponent,
            TextFieldComponent], styles: ["[_nghost-%COMP%] {\n  --transaction-tone: var(--fv-expense);\n}\n\n.create-transaction-page[_ngcontent-%COMP%] {\n  --background: linear-gradient(180deg, #fcfcff 0%, var(--fv-background) 100%);\n}\n\n.transaction-form[_ngcontent-%COMP%] {\n  --custom-segment-min-height: 48px;\n  --custom-segment-padding: 4px;\n  --custom-segment-radius: 18px;\n  --custom-segment-background: rgba(255, 255, 255, .96);\n  --custom-segment-border: #edf0f5;\n  --custom-segment-shadow: 0 7px 22px rgba(34, 39, 76, .055);\n  --custom-segment-button-height: 40px;\n  --custom-segment-button-radius: 14px;\n  --amount-enhanced-min-height: 60px;\n  --amount-enhanced-mobile-min-height: 60px;\n  --amount-enhanced-radius: 17px;\n  --amount-enhanced-border: #edf0f5;\n  --amount-enhanced-shadow: 0 7px 22px rgba(34, 39, 76, .055);\n  --amount-enhanced-font-size: 22px;\n  --amount-enhanced-mobile-font-size: 22px;\n  --amount-enhanced-focus-border: rgba(67, 97, 238, .28);\n  --amount-enhanced-focus-shadow: 0 0 0 3px rgba(67, 97, 238, .08), 0 7px 22px rgba(34, 39, 76, .055);\n  display: flex;\n  width: 100%;\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 18px 14px max(18px, env(safe-area-inset-bottom));\n  flex-direction: column;\n  gap: 18px;\n}\n\n.transaction-preview[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  min-height: 0;\n  overflow: hidden;\n  gap: 13px;\n  padding: 18px;\n  border: 1px solid rgba(255, 255, 255, .22);\n  border-radius: 23px;\n  background:\n    radial-gradient(110% 135% at 108% -8%, rgba(96, 165, 250, .38) 0%, transparent 49%),\n    radial-gradient(90% 120% at -8% 110%, rgba(168, 85, 247, .28) 0%, transparent 54%),\n    linear-gradient(138deg, #21055b 0%, #35109b 52%, #365edc 100%);\n  box-shadow:\n    0 18px 36px rgba(43, 10, 107, .22),\n    inset 0 1px 0 rgba(255, 255, 255, .16);\n  color: #fff;\n  isolation: isolate;\n}\n\n.transaction-preview[_ngcontent-%COMP%]::before {\n  position: absolute;\n  z-index: -1;\n  inset: 0;\n  border-radius: inherit;\n  background:\n    linear-gradient(115deg, rgba(255, 255, 255, .07), transparent 24%),\n    linear-gradient(180deg, rgba(255, 255, 255, .035), transparent 45%);\n  content: '';\n  pointer-events: none;\n}\n\n.transaction-preview[_ngcontent-%COMP%]::after {\n  position: absolute;\n  z-index: -1;\n  width: 170px;\n  height: 100px;\n  right: -55px;\n  bottom: -65px;\n  border-radius: 50%;\n  background: var(--preview-accent, var(--fv-expense));\n  content: '';\n  filter: blur(34px);\n  opacity: .18;\n  pointer-events: none;\n}\n\n.transaction-preview.income[_ngcontent-%COMP%] {\n  --preview-accent: var(--fv-income);\n}\n\n.preview-header[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n}\n\n.preview-type[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 9px;\n  border: 1px solid rgba(255, 255, 255, .13);\n  border-radius: 999px;\n  background: rgba(255, 255, 255, .1);\n  font-size: 10px;\n  font-weight: 700;\n  line-height: 1;\n  white-space: nowrap;\n}\n\n.preview-type[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--preview-accent, var(--fv-expense));\n}\n\n.preview-date[_ngcontent-%COMP%] {\n  min-width: 0;\n  overflow: hidden;\n  font-size: 10px;\n  font-weight: 600;\n  text-overflow: ellipsis;\n  text-transform: capitalize;\n  white-space: nowrap;\n  opacity: .68;\n}\n\n.preview-value[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  gap: 4px;\n}\n\n.preview-value[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 650;\n  letter-spacing: .04em;\n  opacity: .62;\n  text-transform: uppercase;\n}\n\n.preview-amount[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 0;\n  align-items: baseline;\n  gap: 6px;\n  font-variant-numeric: tabular-nums;\n}\n\n.preview-amount[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  min-width: 0;\n  overflow: hidden;\n  font-size: clamp(27px, 7.4vw, 34px);\n  font-weight: 800;\n  letter-spacing: -.035em;\n  line-height: 1.1;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.preview-meta[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n}\n\n.preview-detail[_ngcontent-%COMP%] {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 8px;\n  overflow: hidden;\n  padding: 7px 9px;\n  border: 1px solid rgba(255, 255, 255, .1);\n  border-radius: 12px;\n  background: linear-gradient(145deg, rgba(255, 255, 255, .12), rgba(255, 255, 255, .065));\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06);\n}\n\n.preview-detail[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  display: grid;\n  min-width: 0;\n  gap: 2px;\n}\n\n.preview-detail[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.preview-detail[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.preview-detail[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 9px;\n  font-weight: 600;\n  opacity: .55;\n}\n\n.preview-detail[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.action-container[_ngcontent-%COMP%] {\n  margin-top: 2px;\n}\n\n@media (max-width: 420px) {\n  .transaction-form[_ngcontent-%COMP%] {\n    padding-right: 12px;\n    padding-left: 12px;\n    gap: 16px;\n  }\n\n  .transaction-preview[_ngcontent-%COMP%] {\n    gap: 12px;\n    padding: 16px;\n    border-radius: 20px;\n  }\n\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateTransactionPage, [{
        type: Component,
        args: [{ selector: 'app-create-transaction', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    IonicModule,
                    AccountSelectorModalComponent,
                    AmountInputComponent,
                    ButtonComponent,
                    CategorySelectorModalComponent,
                    CustomAlertComponent,
                    CustomSegmentComponent,
                    FilterModalComponent,
                    InfoBannerComponent,
                    ItemIconComponent,
                    PageLayoutComponent,
                    SectionCardComponent,
                    SelectionSummaryComponent,
                    SuccessReceiptModalComponent,
                    TextFieldComponent
                ], template: "<ion-header>\n  <app-page-layout\n    title=\"Nueva transacci\u00F3n\"\n    [showBack]=\"true\"\n    [loading]=\"isSaving\"\n    (back)=\"backToTransactions()\">\n  </app-page-layout>\n</ion-header>\n\n<ion-content [fullscreen]=\"false\" class=\"create-transaction-page\">\n  <form class=\"transaction-form\" (ngSubmit)=\"saveTransaction()\">\n\n    <app-custom-segment\n      [options]=\"transactionTypes\"\n      [model]=\"selectedType\"\n      (modelChange)=\"changeType($event)\">\n    </app-custom-segment>\n\n    <section\n      class=\"transaction-preview\"\n      [class.income]=\"selectedType === 'ingresos'\"\n      aria-live=\"polite\">\n      <header class=\"preview-header\">\n        <span class=\"preview-type\">\n          <i aria-hidden=\"true\"></i>\n          {{ selectedType === 'gastos' ? 'Gasto' : 'Ingreso' }}\n        </span>\n        <span class=\"preview-date\">{{ formattedDate }}</span>\n      </header>\n\n      <div class=\"preview-value\">\n        <span>Monto del movimiento</span>\n        <div class=\"preview-amount\">\n          <strong>S/ {{ (amount || 0) | number:'1.2-2' }}</strong>\n        </div>\n      </div>\n\n      <div class=\"preview-meta\">\n        <div class=\"preview-detail\">\n          <app-item-icon\n            [icon]=\"selectedAccount?.icon || 'wallet'\"\n            [color]=\"selectedAccount?.color || 'var(--fv-interactive-icon)'\"\n            size=\"sm\"\n            variant=\"soft\"\n            aria-hidden=\"true\">\n          </app-item-icon>\n          <span>\n            <small>Cuenta</small>\n            <strong>{{ selectedAccount?.name || 'Sin seleccionar' }}</strong>\n          </span>\n        </div>\n\n        <div class=\"preview-detail\">\n          <app-item-icon\n            [icon]=\"selectedCategory?.icono || 'category'\"\n            [color]=\"selectedCategory?.color || 'var(--fv-interactive-icon)'\"\n            size=\"sm\"\n            variant=\"soft\"\n            aria-hidden=\"true\">\n          </app-item-icon>\n          <span>\n            <small>Categor\u00EDa</small>\n            <strong>{{ selectedCategory?.nombre || 'Sin seleccionar' }}</strong>\n          </span>\n        </div>\n      </div>\n\n    </section>\n\n    <app-section-card title=\"Monto\" appearance=\"plain\">\n      <app-amount-input\n        [(ngModel)]=\"amount\"\n        name=\"amount\"\n        ariaLabel=\"Monto de la transacci\u00F3n\"\n        placeholder=\"0.00\"\n        currencyCode=\"PEN\"\n        variant=\"enhanced\"\n        locale=\"es-PE\"\n        [maxDigits]=\"11\"\n        [required]=\"true\"\n        (ngModelChange)=\"onFormChange()\">\n      </app-amount-input>\n    </app-section-card>\n\n    <app-section-card title=\"Programaci\u00F3n\">\n      <app-selection-summary\n        [primaryText]=\"formattedDate\"\n        secondaryText=\"Fecha del movimiento\"\n        ariaLabel=\"Cambiar la fecha de la transacci\u00F3n\"\n        fallbackIcon=\"assets/icon/calendar.svg\"\n        (activated)=\"openPeriodModal()\">\n      </app-selection-summary>\n    </app-section-card>\n\n    <app-section-card title=\"Cuenta\">\n      <app-selection-summary\n        [primaryText]=\"accountSummary\"\n        [secondaryText]=\"accountBalanceLabel\"\n        ariaLabel=\"Seleccionar cuenta\"\n        fallbackIcon=\"assets/icon/wallet.svg\"\n        [items]=\"selectedAccountItems\"\n        (activated)=\"openAccountModal()\">\n      </app-selection-summary>\n    </app-section-card>\n\n    <app-section-card title=\"Categor\u00EDa\">\n      <app-selection-summary\n        [primaryText]=\"categorySummary\"\n        [secondaryText]=\"categoryDescription\"\n        ariaLabel=\"Seleccionar categor\u00EDa\"\n        fallbackIcon=\"assets/icon/category.svg\"\n        [items]=\"selectedCategoryItems\"\n        [interactive]=\"categories.length > 0\"\n        (activated)=\"openCategoryModal()\">\n      </app-selection-summary>\n    </app-section-card>\n\n    <app-section-card title=\"Nota (opcional)\">\n      <app-text-field\n        name=\"description\"\n        [embedded]=\"true\"\n        [multiline]=\"true\"\n        [rows]=\"3\"\n        [maxLength]=\"200\"\n        ariaLabel=\"Nota de la transacci\u00F3n\"\n        placeholder=\"Ej. Almuerzo con el equipo\"\n        [(ngModel)]=\"description\"\n        (ngModelChange)=\"onFormChange()\">\n      </app-text-field>\n    </app-section-card>\n\n    <app-info-banner\n      title=\"Consejo FinVia\"\n      [message]=\"transactionAdvice\"\n      symbol=\"\u2728\">\n    </app-info-banner>\n\n    <div class=\"action-container\">\n      <app-button\n        [text]=\"isSaving ? 'Guardando...' : 'Registrar transacci\u00F3n'\"\n        type=\"submit\"\n        [loading]=\"isSaving\"\n        [disabled]=\"!canSave\">\n      </app-button>\n    </div>\n  </form>\n</ion-content>\n\n<app-filter-modal\n  [isOpen]=\"isPeriodModalOpen\"\n  title=\"Elige la fecha\"\n  description=\"Selecciona cu\u00E1ndo ocurri\u00F3 este movimiento.\"\n  applyText=\"Aplicar fecha\"\n  [singleDate]=\"true\"\n  selectedPeriod=\"custom\"\n  [selectedPeriodValue]=\"datePeriodValue\"\n  [selectedStartDate]=\"date\"\n  [selectedEndDate]=\"date\"\n  (modalClosed)=\"closePeriodModal()\"\n  (filtersApplied)=\"applyPeriod($event)\">\n</app-filter-modal>\n\n<app-account-selector-modal\n  [isOpen]=\"isAccountModalOpen\"\n  [accounts]=\"accounts\"\n  [selectionMode]=\"AccountSelectionMode.SINGLE\"\n  [selectedAccount]=\"selectedAccount\"\n  (accountSelected)=\"selectAccount($event)\"\n  (modalClosed)=\"closeAccountModal()\">\n</app-account-selector-modal>\n\n<app-category-selector-modal\n  [isOpen]=\"isCategoryModalOpen\"\n  [categories]=\"categories\"\n  [selectionMode]=\"CategorySelectionMode.SINGLE\"\n  [selectedCategory]=\"selectedCategory\"\n  (categorySelected)=\"selectCategory($event)\"\n  (modalClosed)=\"closeCategoryModal()\">\n</app-category-selector-modal>\n\n<app-success-receipt-modal\n  [isOpen]=\"isSuccessReceiptOpen\"\n  title=\"Transacci\u00F3n registrada\"\n  eyebrow=\"\u00A1Movimiento registrado!\"\n  [heading]=\"selectedType === 'gastos' ? 'Gasto registrado correctamente' : 'Ingreso registrado correctamente'\"\n  actionText=\"Ver mis transacciones\"\n  [details]=\"successReceiptDetails\"\n  (completed)=\"viewTransactions()\">\n</app-success-receipt-modal>\n\n<app-custom-alert\n  *ngIf=\"showUnsavedAlert\"\n  header=\"Cambios sin guardar\"\n  message=\"Has realizado cambios en la transacci\u00F3n. \u00BFDeseas salir sin guardar?\"\n  cancelText=\"Seguir editando\"\n  confirmText=\"Salir\"\n  (onCancel)=\"showUnsavedAlert = false\"\n  (onConfirm)=\"leaveWithoutSaving()\">\n</app-custom-alert>\n\n<app-custom-alert\n  *ngIf=\"showLoadError\"\n  header=\"No se pudieron cargar los datos\"\n  message=\"No fue posible obtener tus cuentas o categor\u00EDas. Int\u00E9ntalo nuevamente.\"\n  confirmText=\"Aceptar\"\n  (onConfirm)=\"showLoadError = false\">\n</app-custom-alert>\n\n<app-custom-alert\n  *ngIf=\"showSaveError\"\n  header=\"No se pudo registrar\"\n  message=\"Ocurri\u00F3 un error al guardar la transacci\u00F3n. Revisa los datos e int\u00E9ntalo nuevamente.\"\n  confirmText=\"Aceptar\"\n  (onConfirm)=\"showSaveError = false\">\n</app-custom-alert>\n", styles: [":host {\n  --transaction-tone: var(--fv-expense);\n}\n\n.create-transaction-page {\n  --background: linear-gradient(180deg, #fcfcff 0%, var(--fv-background) 100%);\n}\n\n.transaction-form {\n  --custom-segment-min-height: 48px;\n  --custom-segment-padding: 4px;\n  --custom-segment-radius: 18px;\n  --custom-segment-background: rgba(255, 255, 255, .96);\n  --custom-segment-border: #edf0f5;\n  --custom-segment-shadow: 0 7px 22px rgba(34, 39, 76, .055);\n  --custom-segment-button-height: 40px;\n  --custom-segment-button-radius: 14px;\n  --amount-enhanced-min-height: 60px;\n  --amount-enhanced-mobile-min-height: 60px;\n  --amount-enhanced-radius: 17px;\n  --amount-enhanced-border: #edf0f5;\n  --amount-enhanced-shadow: 0 7px 22px rgba(34, 39, 76, .055);\n  --amount-enhanced-font-size: 22px;\n  --amount-enhanced-mobile-font-size: 22px;\n  --amount-enhanced-focus-border: rgba(67, 97, 238, .28);\n  --amount-enhanced-focus-shadow: 0 0 0 3px rgba(67, 97, 238, .08), 0 7px 22px rgba(34, 39, 76, .055);\n  display: flex;\n  width: 100%;\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 18px 14px max(18px, env(safe-area-inset-bottom));\n  flex-direction: column;\n  gap: 18px;\n}\n\n.transaction-preview {\n  position: relative;\n  display: grid;\n  min-height: 0;\n  overflow: hidden;\n  gap: 13px;\n  padding: 18px;\n  border: 1px solid rgba(255, 255, 255, .22);\n  border-radius: 23px;\n  background:\n    radial-gradient(110% 135% at 108% -8%, rgba(96, 165, 250, .38) 0%, transparent 49%),\n    radial-gradient(90% 120% at -8% 110%, rgba(168, 85, 247, .28) 0%, transparent 54%),\n    linear-gradient(138deg, #21055b 0%, #35109b 52%, #365edc 100%);\n  box-shadow:\n    0 18px 36px rgba(43, 10, 107, .22),\n    inset 0 1px 0 rgba(255, 255, 255, .16);\n  color: #fff;\n  isolation: isolate;\n}\n\n.transaction-preview::before {\n  position: absolute;\n  z-index: -1;\n  inset: 0;\n  border-radius: inherit;\n  background:\n    linear-gradient(115deg, rgba(255, 255, 255, .07), transparent 24%),\n    linear-gradient(180deg, rgba(255, 255, 255, .035), transparent 45%);\n  content: '';\n  pointer-events: none;\n}\n\n.transaction-preview::after {\n  position: absolute;\n  z-index: -1;\n  width: 170px;\n  height: 100px;\n  right: -55px;\n  bottom: -65px;\n  border-radius: 50%;\n  background: var(--preview-accent, var(--fv-expense));\n  content: '';\n  filter: blur(34px);\n  opacity: .18;\n  pointer-events: none;\n}\n\n.transaction-preview.income {\n  --preview-accent: var(--fv-income);\n}\n\n.preview-header {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n}\n\n.preview-type {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 9px;\n  border: 1px solid rgba(255, 255, 255, .13);\n  border-radius: 999px;\n  background: rgba(255, 255, 255, .1);\n  font-size: 10px;\n  font-weight: 700;\n  line-height: 1;\n  white-space: nowrap;\n}\n\n.preview-type i {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: var(--preview-accent, var(--fv-expense));\n}\n\n.preview-date {\n  min-width: 0;\n  overflow: hidden;\n  font-size: 10px;\n  font-weight: 600;\n  text-overflow: ellipsis;\n  text-transform: capitalize;\n  white-space: nowrap;\n  opacity: .68;\n}\n\n.preview-value {\n  display: grid;\n  min-width: 0;\n  gap: 4px;\n}\n\n.preview-value > span {\n  font-size: 10px;\n  font-weight: 650;\n  letter-spacing: .04em;\n  opacity: .62;\n  text-transform: uppercase;\n}\n\n.preview-amount {\n  display: flex;\n  min-width: 0;\n  align-items: baseline;\n  gap: 6px;\n  font-variant-numeric: tabular-nums;\n}\n\n.preview-amount strong {\n  min-width: 0;\n  overflow: hidden;\n  font-size: clamp(27px, 7.4vw, 34px);\n  font-weight: 800;\n  letter-spacing: -.035em;\n  line-height: 1.1;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.preview-meta {\n  display: grid;\n  min-width: 0;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 8px;\n}\n\n.preview-detail {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 8px;\n  overflow: hidden;\n  padding: 7px 9px;\n  border: 1px solid rgba(255, 255, 255, .1);\n  border-radius: 12px;\n  background: linear-gradient(145deg, rgba(255, 255, 255, .12), rgba(255, 255, 255, .065));\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06);\n}\n\n.preview-detail > span {\n  display: grid;\n  min-width: 0;\n  gap: 2px;\n}\n\n.preview-detail small,\n.preview-detail strong {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.preview-detail small {\n  font-size: 9px;\n  font-weight: 600;\n  opacity: .55;\n}\n\n.preview-detail strong {\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.action-container {\n  margin-top: 2px;\n}\n\n@media (max-width: 420px) {\n  .transaction-form {\n    padding-right: 12px;\n    padding-left: 12px;\n    gap: 16px;\n  }\n\n  .transaction-preview {\n    gap: 12px;\n    padding: 16px;\n    border-radius: 20px;\n  }\n\n}\n"] }]
    }], () => [{ type: i1.NavigationService }, { type: i2.CreateTransactionsUseCase }, { type: i3.ListCategoriesUseCase }, { type: i4.ListAccountsUseCase }, { type: i5.SpinnerService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CreateTransactionPage, { className: "CreateTransactionPage", filePath: "src/app/features/side-menu/transactions/create-transaction/create-transaction.page.ts", lineNumber: 72 }); })();
//# sourceMappingURL=create-transaction.page.js.map