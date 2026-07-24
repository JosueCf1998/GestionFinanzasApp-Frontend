import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TextFieldComponent } from 'src/app/shared/components/text-field/text-field.component';
import { AccountSelectionMode, AccountSelectorModalComponent } from 'src/app/shared/components/account-selector-modal/account-selector-modal.component';
import { CategorySelectorModalComponent } from 'src/app/shared/components/category-selector-modal/category-selector-modal.component';
import { PersonalizationModalComponent } from 'src/app/shared/components/personalization-modal/personalization-modal.component';
import { SelectionSummaryComponent } from 'src/app/shared/components/selection-summary/selection-summary.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { BudgetPreviewCardComponent } from 'src/app/shared/components/budget-preview-card/budget-preview-card.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { InfoBannerComponent } from 'src/app/shared/components/info-banner/info-banner.component';
import { WarningMessageComponent } from 'src/app/shared/components/warning-message/warning-message.component';
import { SuccessReceiptModalComponent } from 'src/app/shared/components/success-receipt-modal/success-receipt-modal.component';
import { FilterModalComponent } from 'src/app/shared/components/filter-modal/filter-modal.component';
import { CATEGORY_ICONS } from 'src/app/shared/constants/category-options';
import { PERSONALIZATION_COLORS } from 'src/app/shared/constants/personalization-options';
import 'src/app/core/utils/observable-extensions';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "src/app/core/use-cases/budgets/create-budget.usecase";
import * as i3 from "src/app/core/use-cases/budgets/update-budget.usecase";
import * as i4 from "src/app/core/use-cases/budgets/detail-budget.usecase";
import * as i5 from "src/app/core/use-cases/budgets/delete-budget.usecase";
import * as i6 from "src/app/core/services/navigation.service";
import * as i7 from "src/app/core/services/spinnerService.service";
import * as i8 from "src/app/core/use-cases/accounts/list-accounts.usecase";
import * as i9 from "src/app/core/use-cases/categories/list-categories.usecase";
import * as i10 from "@angular/common";
import * as i11 from "@angular/forms";
import * as i12 from "@ionic/angular";
function CreateBudgetPage_app_warning_message_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-warning-message", 30);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r0.accountBalanceWarningMessage);
} }
function CreateBudgetPage_app_info_banner_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-info-banner", 31);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r0.budgetAdviceMessage);
} }
function CreateBudgetPage_app_button_19_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-button", 32);
    i0.ɵɵlistener("clicked", function CreateBudgetPage_app_button_19_Template_app_button_clicked_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.requestDeleteBudget()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("loading", ctx_r0.isDeleting)("disabled", ctx_r0.isSaving || ctx_r0.isDeleting);
} }
function CreateBudgetPage_app_custom_alert_25_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 33);
    i0.ɵɵlistener("onCancel", function CreateBudgetPage_app_custom_alert_25_Template_app_custom_alert_onCancel_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showUnsavedAlert = false); })("onConfirm", function CreateBudgetPage_app_custom_alert_25_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.leaveWithoutSaving()); });
    i0.ɵɵelementEnd();
} }
function CreateBudgetPage_app_custom_alert_26_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 34);
    i0.ɵɵlistener("onCancel", function CreateBudgetPage_app_custom_alert_26_Template_app_custom_alert_onCancel_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.cancelDeleteBudget()); })("onConfirm", function CreateBudgetPage_app_custom_alert_26_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.confirmDeleteBudget()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", "Esta acci\u00F3n eliminar\u00E1 definitivamente \u201C" + ctx_r0.name.trim() + "\u201D y no se puede deshacer. \u00BFDeseas continuar?");
} }
function CreateBudgetPage_app_custom_alert_27_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 35);
    i0.ɵɵlistener("onConfirm", function CreateBudgetPage_app_custom_alert_27_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showDeleteError = false); });
    i0.ɵɵelementEnd();
} }
function CreateBudgetPage_app_custom_alert_28_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 36);
    i0.ɵɵlistener("onConfirm", function CreateBudgetPage_app_custom_alert_28_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showDataError = false); });
    i0.ɵɵelementEnd();
} }
function CreateBudgetPage_app_custom_alert_29_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 37);
    i0.ɵɵlistener("onConfirm", function CreateBudgetPage_app_custom_alert_29_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showAccountBalanceRequiredAlert = false); });
    i0.ɵɵelementEnd();
} }
function CreateBudgetPage_app_custom_alert_30_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 38);
    i0.ɵɵlistener("onConfirm", function CreateBudgetPage_app_custom_alert_30_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.showErrorAlert = false); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r0.isEditMode ? "No se pudo actualizar el presupuesto. Int\u00E9ntalo nuevamente." : "No se pudo crear el presupuesto. Int\u00E9ntalo nuevamente.");
} }
export class CreateBudgetPage {
    constructor(route, createBudgetUseCase, updateBudgetUseCase, detailBudgetUseCase, deleteBudgetUseCase, navService, loadingService, listAccountsUseCase, listCategoriesUseCase) {
        this.route = route;
        this.createBudgetUseCase = createBudgetUseCase;
        this.updateBudgetUseCase = updateBudgetUseCase;
        this.detailBudgetUseCase = detailBudgetUseCase;
        this.deleteBudgetUseCase = deleteBudgetUseCase;
        this.navService = navService;
        this.loadingService = loadingService;
        this.listAccountsUseCase = listAccountsUseCase;
        this.listCategoriesUseCase = listCategoriesUseCase;
        // MARK: - CONFIGURACIÓN
        this.icons = CATEGORY_ICONS;
        this.colors = PERSONALIZATION_COLORS;
        this.AccountSelectionMode = AccountSelectionMode;
        this.initialIcon = 'wallet';
        this.initialColor = '#283593';
        this.initialPeriod = this.currentMonthSelection();
        this.initialFormSnapshot = null;
        // MARK: - FORMULARIO Y DATOS
        this.name = '';
        this.notes = '';
        this.selectedIcon = this.initialIcon;
        this.selectedColor = this.initialColor;
        this.periodSelection = { ...this.initialPeriod };
        this.accounts = [];
        this.categories = [];
        this.selectedAccounts = [];
        this.selectedCategoryAllocations = [];
        // MARK: - ESTADO
        this.showUnsavedAlert = false;
        this.showErrorAlert = false;
        this.isPeriodModalOpen = false;
        this.isAccountModalOpen = false;
        this.isCategoryModalOpen = false;
        this.isPersonalizationModalOpen = false;
        this.isSaving = false;
        this.isSuccessModalOpen = false;
        this.showDataError = false;
        this.showAccountBalanceRequiredAlert = false;
        this.showDeleteAlert = false;
        this.showDeleteError = false;
        this.isDeleting = false;
        this.canDeleteBudget = false;
        this.pendingOptionRequests = 0;
        this.budgetId = Number(this.route.snapshot.paramMap.get('id')) || 0;
        this.isEditMode = this.budgetId > 0;
    }
    // MARK: - CICLO DE VIDA
    ngOnInit() {
        this.loadSelectableData();
        if (this.isEditMode) {
            this.loadBudgetDetail();
        }
    }
    ionViewWillEnter() {
        if (!this.isEditMode) {
            this.resetForm();
        }
    }
    // MARK: - SERVICIOS
    saveBudget() {
        if (!this.canSave)
            return;
        const request = this.buildRequest();
        this.isSaving = true;
        this.loadingService.show();
        const operation = this.isEditMode
            ? this.updateBudgetUseCase.execute({
                ...request,
                id: this.budgetId
            })
            : this.createBudgetUseCase.execute(request);
        operation.service({
            success: () => {
                this.loadingService.hide();
                this.isSaving = false;
                this.initialFormSnapshot = this.buildSnapshot();
                this.isSuccessModalOpen = true;
            },
            failure: () => {
                this.loadingService.hide();
                this.isSaving = false;
                this.showErrorAlert = true;
            }
        });
    }
    requestDeleteBudget() {
        if (!this.isEditMode || !this.canDeleteBudget || this.isSaving || this.isDeleting)
            return;
        this.showDeleteAlert = true;
    }
    cancelDeleteBudget() {
        this.showDeleteAlert = false;
    }
    confirmDeleteBudget() {
        if (!this.isEditMode || !this.canDeleteBudget || this.isDeleting)
            return;
        this.showDeleteAlert = false;
        this.isDeleting = true;
        this.loadingService.show();
        this.deleteBudgetUseCase.execute({ id: this.budgetId }).service({
            success: () => {
                this.loadingService.hide();
                this.isDeleting = false;
                this.initialFormSnapshot = this.buildSnapshot();
                void this.navService.replace('/main/budgets', undefined, false);
            },
            failure: () => {
                this.loadingService.hide();
                this.isDeleting = false;
                this.showDeleteError = true;
            }
        });
    }
    loadSelectableData() {
        this.pendingOptionRequests = this.isEditMode ? 3 : 2;
        this.loadingService.show();
        this.listAccountsUseCase.listAccounts().service({
            success: data => {
                this.accounts = data?.items ?? [];
                this.reconcileSelectedAccounts();
                this.finishOptionRequest();
            },
            failure: () => {
                this.showDataError = true;
                this.finishOptionRequest();
            }
        });
        this.listCategoriesUseCase.execute().service({
            success: data => {
                this.categories = (data?.items ?? []).filter(category => category.tipo === 'gasto');
                this.reconcileSelectedCategories();
                this.finishOptionRequest();
            },
            failure: () => {
                this.showDataError = true;
                this.finishOptionRequest();
            }
        });
    }
    loadBudgetDetail() {
        this.detailBudgetUseCase.execute({ id: String(this.budgetId) }).service({
            success: data => {
                if (data) {
                    this.applyBudgetDetail(data);
                }
                else {
                    this.showDataError = true;
                }
                this.finishOptionRequest();
            },
            failure: () => {
                this.showDataError = true;
                this.finishOptionRequest();
            }
        });
    }
    // MARK: - VALIDACIÓN
    get canSave() {
        return !this.isSaving && !this.isDeleting && Boolean(this.name.trim() &&
            this.selectedIcon &&
            this.selectedColor &&
            this.selectedAccounts.length > 0 &&
            this.selectedAccountBalanceTotal > 0 &&
            this.selectedCategoryAllocations.length > 0 &&
            this.selectedCategoryAllocations.every(item => item.amount > 0) &&
            this.categoryAllocationTotal > 0 &&
            this.periodSelection.startDate &&
            this.periodSelection.endDate &&
            this.periodSelection.startDate <= this.periodSelection.endDate &&
            (!this.isEditMode || this.hasChanges));
    }
    get hasChanges() {
        if (this.isEditMode) {
            return this.initialFormSnapshot !== null &&
                JSON.stringify(this.buildSnapshot()) !== JSON.stringify(this.initialFormSnapshot);
        }
        return Boolean(this.name.trim() ||
            this.notes.trim() ||
            this.selectedIcon !== this.initialIcon ||
            this.selectedColor !== this.initialColor ||
            this.selectedAccounts.length > 0 ||
            this.selectedCategoryAllocations.length > 0 ||
            this.periodSelection.period !== this.initialPeriod.period ||
            this.periodSelection.startDate !== this.initialPeriod.startDate ||
            this.periodSelection.endDate !== this.initialPeriod.endDate);
    }
    // MARK: - PRESENTACIÓN
    get periodLabel() {
        const labels = {
            weekly: 'Semanal',
            monthly: 'Mensual',
            annual: 'Anual',
            custom: 'Personalizado'
        };
        return labels[this.periodSelection.period];
    }
    get formattedDateRange() {
        if (!this.periodSelection.startDate || !this.periodSelection.endDate) {
            return 'Selecciona las fechas';
        }
        const formatter = new Intl.DateTimeFormat('es-PE', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC'
        });
        const start = new Date(`${this.periodSelection.startDate}T00:00:00Z`);
        const end = new Date(`${this.periodSelection.endDate}T00:00:00Z`);
        return `${formatter.format(start)} — ${formatter.format(end)}`;
    }
    get successReceiptDetails() {
        return [
            {
                label: 'Presupuesto total',
                value: `S/ ${this.categoryAllocationTotal.toFixed(2)}`,
                emphasis: true
            },
            { label: 'Programación', value: this.formattedDateRange, wrap: true },
            { label: 'Cuentas', value: this.selectedAccountsLabel, wrap: true },
            { label: 'Categorías', value: this.selectedCategoriesLabel, wrap: true },
            ...(this.notes.trim()
                ? [{ label: 'Nota', value: this.notes.trim(), wrap: true }]
                : [])
        ];
    }
    get selectedAccountsLabel() {
        return this.selectionLabel(this.selectedAccounts.map(account => account.name), 'Selecciona una o más cuentas');
    }
    get selectedAccountsTitle() {
        const count = this.selectedAccounts.length;
        if (count === 0)
            return 'Seleccionar cuentas';
        return count === 1 ? '1 cuenta vinculada' : `${count} cuentas vinculadas`;
    }
    get accountSummaryItems() {
        return this.selectedAccounts.map(account => ({
            id: account.id,
            name: account.name,
            icon: account.icon,
            color: account.color
        }));
    }
    get selectedCategoriesLabel() {
        return this.selectionLabel(this.selectedCategories.map(category => category.nombre), 'Selecciona una o más categorías');
    }
    get selectedCategories() {
        return this.selectedCategoryAllocations.map(item => item.category);
    }
    get categoryAllocationTotal() {
        return this.selectedCategoryAllocations.reduce((total, item) => total + item.amount, 0);
    }
    get selectedAccountBalanceTotal() {
        return this.selectedAccounts.reduce((total, account) => total + (Number(account.amount) || 0), 0);
    }
    get hasInsufficientAccountBalance() {
        return this.selectedAccounts.length > 0 &&
            this.categoryAllocationTotal > this.selectedAccountBalanceTotal;
    }
    get accountBalanceWarningMessage() {
        const difference = this.categoryAllocationTotal - this.selectedAccountBalanceTotal;
        const formattedDifference = new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(Math.max(difference, 0));
        return `Tu presupuesto supera el saldo actual de las cuentas vinculadas por ${formattedDifference}. Puedes continuar, pero revisa tu disponibilidad.`;
    }
    get budgetAdviceMessage() {
        if (this.selectedCategoryAllocations.length === 0) {
            return 'Asigna un monto a cada categoría. La suma se calculará automáticamente como tu presupuesto total.';
        }
        return 'El presupuesto total se calcula con los montos de tus categorías y se controlará durante las fechas seleccionadas.';
    }
    get selectedCategoriesTitle() {
        const count = this.selectedCategories.length;
        if (count === 0)
            return 'Seleccionar categorías';
        return count === 1 ? '1 categoría incluida' : `${count} categorías incluidas`;
    }
    get categorySummaryItems() {
        return this.selectedCategories.map(category => ({
            id: category.id,
            name: category.nombre,
            icon: category.icono,
            color: category.color
        }));
    }
    // MARK: - MODALES
    openAccountModal() {
        this.isAccountModalOpen = true;
    }
    closeAccountModal() {
        this.isAccountModalOpen = false;
    }
    applyAccounts(accounts) {
        this.selectedAccounts = accounts;
        this.closeAccountModal();
    }
    openCategoryModal() {
        if (this.selectedAccounts.length === 0 || this.selectedAccountBalanceTotal <= 0) {
            this.showAccountBalanceRequiredAlert = true;
            return;
        }
        this.isCategoryModalOpen = true;
    }
    closeCategoryModal() {
        this.isCategoryModalOpen = false;
    }
    applyCategoryAllocations(allocations) {
        this.selectedCategoryAllocations = allocations;
        this.closeCategoryModal();
    }
    openPersonalizationModal() {
        this.isPersonalizationModalOpen = true;
    }
    closePersonalizationModal() {
        this.isPersonalizationModalOpen = false;
    }
    applyPersonalization(value) {
        this.selectedIcon = value.icon;
        this.selectedColor = value.color;
        this.closePersonalizationModal();
    }
    openPeriodModal() {
        this.isPeriodModalOpen = true;
    }
    closePeriodModal() {
        this.isPeriodModalOpen = false;
    }
    applyPeriod(selection) {
        this.periodSelection = selection;
        this.closePeriodModal();
    }
    // MARK: - NAVEGACIÓN
    backToBudgets() {
        if (this.isSaving || this.isDeleting)
            return;
        if (this.hasChanges) {
            this.showUnsavedAlert = true;
            return;
        }
        void this.navService.back();
    }
    leaveWithoutSaving() {
        this.showUnsavedAlert = false;
        void this.navService.back();
    }
    viewBudgets() {
        this.isSuccessModalOpen = false;
        void this.navService.replace('/main/budgets', undefined, false);
    }
    // MARK: - FUNCIONES PRIVADAS
    currentMonthSelection() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const lastDay = new Date(year, today.getMonth() + 1, 0).getDate();
        return {
            period: 'monthly',
            periodValue: `${year}-${month}`,
            startDate: `${year}-${month}-01`,
            endDate: `${year}-${month}-${String(lastDay).padStart(2, '0')}`
        };
    }
    finishOptionRequest() {
        this.pendingOptionRequests -= 1;
        if (this.pendingOptionRequests === 0) {
            this.loadingService.hide();
        }
    }
    buildRequest() {
        return {
            name: this.name.trim(),
            budgetAmount: Number(this.categoryAllocationTotal.toFixed(2)),
            startDate: this.periodSelection.startDate,
            endDate: this.periodSelection.endDate,
            icon: this.selectedIcon,
            color: this.selectedColor,
            account_ids: this.selectedAccounts.map(account => account.id),
            categories: this.selectedCategoryAllocations.map(item => ({
                category_id: item.category.id,
                amount: Number(item.amount.toFixed(2))
            })),
            notes: this.notes.trim()
        };
    }
    buildSnapshot() {
        return {
            name: this.name.trim(),
            notes: this.notes.trim(),
            icon: this.selectedIcon,
            color: this.selectedColor,
            period: {
                startDate: this.periodSelection.startDate,
                endDate: this.periodSelection.endDate
            },
            accountIds: this.selectedAccounts
                .map(account => account.id)
                .sort((a, b) => a - b),
            categories: this.selectedCategoryAllocations
                .map(item => ({
                categoryId: item.category.id,
                amount: Number(item.amount.toFixed(2))
            }))
                .sort((a, b) => a.categoryId - b.categoryId)
        };
    }
    applyBudgetDetail(data) {
        this.name = data.name;
        this.notes = data.generalDetail.notes ?? '';
        this.selectedIcon = data.icon;
        this.selectedColor = data.color;
        this.canDeleteBudget = data.availableActions?.canDelete ?? false;
        this.periodSelection = {
            period: 'custom',
            periodValue: '',
            startDate: data.generalDetail.startDate,
            endDate: data.generalDetail.endDate
        };
        this.selectedAccounts = data.linkedAccounts.map(account => ({
            id: account.id,
            name: account.name,
            amount: account.amount,
            icon: account.icon,
            color: account.color
        }));
        this.selectedCategoryAllocations = data.linkedCategories.map(category => ({
            category: {
                id: category.id,
                nombre: category.name,
                icono: category.icon,
                color: category.color,
                tipo: 'gasto',
                usuario_id: null
            },
            amount: category.budgetAmount
        }));
        this.reconcileSelectedAccounts();
        this.reconcileSelectedCategories();
        this.initialFormSnapshot = this.buildSnapshot();
    }
    reconcileSelectedAccounts() {
        if (!this.accounts.length || !this.selectedAccounts.length)
            return;
        const selectedIds = new Set(this.selectedAccounts.map(account => account.id));
        this.selectedAccounts = this.accounts.filter(account => selectedIds.has(account.id));
    }
    reconcileSelectedCategories() {
        if (!this.categories.length || !this.selectedCategoryAllocations.length)
            return;
        const amountsById = new Map(this.selectedCategoryAllocations.map(item => [item.category.id, item.amount]));
        this.selectedCategoryAllocations = this.categories
            .filter(category => amountsById.has(category.id))
            .map(category => ({
            category,
            amount: amountsById.get(category.id) ?? 0
        }));
    }
    selectionLabel(names, emptyLabel) {
        if (names.length === 0)
            return emptyLabel;
        if (names.length <= 2)
            return names.join(', ');
        const remaining = names.length - 2;
        return `${names.slice(0, 2).join(', ')} y ${remaining} mas}`;
    }
    resetForm() {
        this.initialPeriod = this.currentMonthSelection();
        this.name = '';
        this.notes = '';
        this.selectedIcon = this.initialIcon;
        this.selectedColor = this.initialColor;
        this.periodSelection = { ...this.initialPeriod };
        this.selectedAccounts = [];
        this.selectedCategoryAllocations = [];
        this.initialFormSnapshot = null;
        this.showUnsavedAlert = false;
        this.showErrorAlert = false;
        this.showAccountBalanceRequiredAlert = false;
        this.showDeleteAlert = false;
        this.showDeleteError = false;
        this.isPeriodModalOpen = false;
        this.isAccountModalOpen = false;
        this.isCategoryModalOpen = false;
        this.isPersonalizationModalOpen = false;
        this.isSaving = false;
        this.isDeleting = false;
        this.isSuccessModalOpen = false;
    }
    static { this.ɵfac = function CreateBudgetPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CreateBudgetPage)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.CreateBudgetUseCase), i0.ɵɵdirectiveInject(i3.UpdateBudgetUseCase), i0.ɵɵdirectiveInject(i4.DetailBudgetUseCase), i0.ɵɵdirectiveInject(i5.DeleteBudgetUseCase), i0.ɵɵdirectiveInject(i6.NavigationService), i0.ɵɵdirectiveInject(i7.SpinnerService), i0.ɵɵdirectiveInject(i8.ListAccountsUseCase), i0.ɵɵdirectiveInject(i9.ListCategoriesUseCase)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CreateBudgetPage, selectors: [["app-create-budget"]], decls: 31, vars: 63, consts: [[3, "back", "title", "showBack", "loading"], [1, "create-budget-page", 3, "fullscreen"], [1, "create-budget-form", 3, "ngSubmit"], [3, "personalize", "name", "icon", "color", "budgetTotal", "categoryCount", "startDate", "endDate"], ["title", "Nombre del Presupuesto"], ["name", "name", "ariaLabel", "Nombre del presupuesto", "placeholder", "Ej. Vacaciones en familia", 3, "ngModelChange", "maxLength", "embedded", "ngModel", "required"], ["title", "Programaci\u00F3n"], ["ariaLabel", "Cambiar las fechas del presupuesto", "fallbackIcon", "assets/icon/calendar.svg", 3, "activated", "primaryText", "secondaryText"], ["title", "Cuentas"], ["ariaLabel", "Seleccionar cuentas vinculadas", "fallbackIcon", "assets/icon/bank.svg", 3, "activated", "primaryText", "secondaryText", "items"], ["title", "Revisa la cobertura", 3, "message", 4, "ngIf"], ["title", "Categor\u00EDas"], ["ariaLabel", "Seleccionar categor\u00EDas del presupuesto", "fallbackIcon", "assets/icon/category.svg", 3, "activated", "primaryText", "secondaryText", "items"], ["title", "Notas (opcional)"], ["name", "notes", "ariaLabel", "Notas del presupuesto", "placeholder", "A\u00F1ade un detalle o recordatorio para este presupuesto", 3, "ngModelChange", "embedded", "multiline", "rows", "maxLength", "ngModel"], ["title", "Consejo FinVia", "symbol", "\u2728", 3, "message", 4, "ngIf"], [1, "action-container"], ["type", "submit", 3, "text", "loading", "disabled"], ["text", "Eliminar presupuesto", "icon", "trash", "variant", "danger", 3, "loading", "disabled", "clicked", 4, "ngIf"], ["title", "Elige las fechas", "description", "Selecciona durante cu\u00E1nto tiempo controlar\u00E1s este presupuesto.", "applyText", "Aplicar fechas", 3, "modalClosed", "filtersApplied", "isOpen", "selectedPeriod", "selectedPeriodValue", "selectedStartDate", "selectedEndDate"], [3, "accountsSelected", "modalClosed", "isOpen", "accounts", "selectionMode", "selectedAccounts"], [3, "allocationsSelected", "modalClosed", "isOpen", "categories", "selectedAllocations", "availableBalance"], [3, "modalClosed", "applied", "isOpen", "selectedIcon", "selectedColor", "icons", "colors"], ["actionText", "Ir a mis presupuestos", 3, "completed", "isOpen", "title", "eyebrow", "heading", "details"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en el presupuesto. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm", 4, "ngIf"], ["header", "Eliminar presupuesto", "cancelText", "Cancelar", "confirmText", "Eliminar", 3, "message", "onCancel", "onConfirm", 4, "ngIf"], ["header", "No se pudo eliminar", "message", "Ocurri\u00F3 un error al eliminar el presupuesto. Int\u00E9ntalo nuevamente.", "confirmText", "Aceptar", 3, "onConfirm", 4, "ngIf"], ["header", "No se pudieron cargar los datos", "message", "No fue posible obtener las cuentas o categor\u00EDas. Int\u00E9ntalo nuevamente.", "confirmText", "Aceptar", 3, "onConfirm", 4, "ngIf"], ["header", "Cuenta sin saldo disponible", "message", "Selecciona primero una cuenta con un saldo mayor que cero antes de asignar montos a las categor\u00EDas.", "confirmText", "Aceptar", 3, "onConfirm", 4, "ngIf"], ["header", "Error", "confirmText", "Aceptar", 3, "message", "onConfirm", 4, "ngIf"], ["title", "Revisa la cobertura", 3, "message"], ["title", "Consejo FinVia", "symbol", "\u2728", 3, "message"], ["text", "Eliminar presupuesto", "icon", "trash", "variant", "danger", 3, "clicked", "loading", "disabled"], ["header", "Cambios sin guardar", "message", "Has realizado cambios en el presupuesto. \u00BFDeseas salir sin guardar?", "cancelText", "No", "confirmText", "S\u00ED", 3, "onCancel", "onConfirm"], ["header", "Eliminar presupuesto", "cancelText", "Cancelar", "confirmText", "Eliminar", 3, "onCancel", "onConfirm", "message"], ["header", "No se pudo eliminar", "message", "Ocurri\u00F3 un error al eliminar el presupuesto. Int\u00E9ntalo nuevamente.", "confirmText", "Aceptar", 3, "onConfirm"], ["header", "No se pudieron cargar los datos", "message", "No fue posible obtener las cuentas o categor\u00EDas. Int\u00E9ntalo nuevamente.", "confirmText", "Aceptar", 3, "onConfirm"], ["header", "Cuenta sin saldo disponible", "message", "Selecciona primero una cuenta con un saldo mayor que cero antes de asignar montos a las categor\u00EDas.", "confirmText", "Aceptar", 3, "onConfirm"], ["header", "Error", "confirmText", "Aceptar", 3, "onConfirm", "message"]], template: function CreateBudgetPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-header")(1, "app-page-layout", 0);
            i0.ɵɵlistener("back", function CreateBudgetPage_Template_app_page_layout_back_1_listener() { return ctx.backToBudgets(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(2, "ion-content", 1)(3, "form", 2);
            i0.ɵɵlistener("ngSubmit", function CreateBudgetPage_Template_form_ngSubmit_3_listener() { return ctx.saveBudget(); });
            i0.ɵɵelementStart(4, "app-budget-preview-card", 3);
            i0.ɵɵlistener("personalize", function CreateBudgetPage_Template_app_budget_preview_card_personalize_4_listener() { return ctx.openPersonalizationModal(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "app-section-card", 4)(6, "app-text-field", 5);
            i0.ɵɵtwoWayListener("ngModelChange", function CreateBudgetPage_Template_app_text_field_ngModelChange_6_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.name, $event) || (ctx.name = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "app-section-card", 6)(8, "app-selection-summary", 7);
            i0.ɵɵlistener("activated", function CreateBudgetPage_Template_app_selection_summary_activated_8_listener() { return ctx.openPeriodModal(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "app-section-card", 8)(10, "app-selection-summary", 9);
            i0.ɵɵlistener("activated", function CreateBudgetPage_Template_app_selection_summary_activated_10_listener() { return ctx.openAccountModal(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(11, CreateBudgetPage_app_warning_message_11_Template, 1, 1, "app-warning-message", 10);
            i0.ɵɵelementStart(12, "app-section-card", 11)(13, "app-selection-summary", 12);
            i0.ɵɵlistener("activated", function CreateBudgetPage_Template_app_selection_summary_activated_13_listener() { return ctx.openCategoryModal(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "app-section-card", 13)(15, "app-text-field", 14);
            i0.ɵɵtwoWayListener("ngModelChange", function CreateBudgetPage_Template_app_text_field_ngModelChange_15_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.notes, $event) || (ctx.notes = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(16, CreateBudgetPage_app_info_banner_16_Template, 1, 1, "app-info-banner", 15);
            i0.ɵɵelementStart(17, "div", 16);
            i0.ɵɵelement(18, "app-button", 17);
            i0.ɵɵtemplate(19, CreateBudgetPage_app_button_19_Template, 1, 2, "app-button", 18);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "app-filter-modal", 19);
            i0.ɵɵlistener("modalClosed", function CreateBudgetPage_Template_app_filter_modal_modalClosed_20_listener() { return ctx.closePeriodModal(); })("filtersApplied", function CreateBudgetPage_Template_app_filter_modal_filtersApplied_20_listener($event) { return ctx.applyPeriod($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "app-account-selector-modal", 20);
            i0.ɵɵlistener("accountsSelected", function CreateBudgetPage_Template_app_account_selector_modal_accountsSelected_21_listener($event) { return ctx.applyAccounts($event); })("modalClosed", function CreateBudgetPage_Template_app_account_selector_modal_modalClosed_21_listener() { return ctx.closeAccountModal(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "app-category-selector-modal", 21);
            i0.ɵɵlistener("allocationsSelected", function CreateBudgetPage_Template_app_category_selector_modal_allocationsSelected_22_listener($event) { return ctx.applyCategoryAllocations($event); })("modalClosed", function CreateBudgetPage_Template_app_category_selector_modal_modalClosed_22_listener() { return ctx.closeCategoryModal(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "app-personalization-modal", 22);
            i0.ɵɵlistener("modalClosed", function CreateBudgetPage_Template_app_personalization_modal_modalClosed_23_listener() { return ctx.closePersonalizationModal(); })("applied", function CreateBudgetPage_Template_app_personalization_modal_applied_23_listener($event) { return ctx.applyPersonalization($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "app-success-receipt-modal", 23);
            i0.ɵɵlistener("completed", function CreateBudgetPage_Template_app_success_receipt_modal_completed_24_listener() { return ctx.viewBudgets(); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(25, CreateBudgetPage_app_custom_alert_25_Template, 1, 0, "app-custom-alert", 24)(26, CreateBudgetPage_app_custom_alert_26_Template, 1, 1, "app-custom-alert", 25)(27, CreateBudgetPage_app_custom_alert_27_Template, 1, 0, "app-custom-alert", 26)(28, CreateBudgetPage_app_custom_alert_28_Template, 1, 0, "app-custom-alert", 27)(29, CreateBudgetPage_app_custom_alert_29_Template, 1, 0, "app-custom-alert", 28)(30, CreateBudgetPage_app_custom_alert_30_Template, 1, 1, "app-custom-alert", 29);
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", ctx.isEditMode ? "Editar presupuesto" : "Crear presupuesto")("showBack", true)("loading", ctx.isSaving || ctx.isDeleting);
            i0.ɵɵadvance();
            i0.ɵɵproperty("fullscreen", false);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("name", ctx.name)("icon", ctx.selectedIcon)("color", ctx.selectedColor)("budgetTotal", ctx.categoryAllocationTotal)("categoryCount", ctx.selectedCategoryAllocations.length)("startDate", ctx.periodSelection.startDate)("endDate", ctx.periodSelection.endDate);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("maxLength", 30)("embedded", true);
            i0.ɵɵtwoWayProperty("ngModel", ctx.name);
            i0.ɵɵproperty("required", true);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("primaryText", ctx.formattedDateRange)("secondaryText", ctx.periodLabel);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("primaryText", ctx.selectedAccountsTitle)("secondaryText", ctx.selectedAccountsLabel)("items", ctx.accountSummaryItems);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasInsufficientAccountBalance);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("primaryText", ctx.selectedCategoriesTitle)("secondaryText", ctx.selectedCategoriesLabel)("items", ctx.categorySummaryItems);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("embedded", true)("multiline", true)("rows", 3)("maxLength", 200);
            i0.ɵɵtwoWayProperty("ngModel", ctx.notes);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isEditMode);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("text", ctx.isSaving ? ctx.isEditMode ? "Guardando..." : "Creando..." : ctx.isEditMode ? "Guardar cambios" : "Crear presupuesto")("loading", ctx.isSaving)("disabled", !ctx.canSave);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode && ctx.canDeleteBudget);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isPeriodModalOpen)("selectedPeriod", ctx.periodSelection.period)("selectedPeriodValue", ctx.periodSelection.periodValue)("selectedStartDate", ctx.periodSelection.startDate)("selectedEndDate", ctx.periodSelection.endDate);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isAccountModalOpen)("accounts", ctx.accounts)("selectionMode", ctx.AccountSelectionMode.MULTIPLE)("selectedAccounts", ctx.selectedAccounts);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isCategoryModalOpen)("categories", ctx.categories)("selectedAllocations", ctx.selectedCategoryAllocations)("availableBalance", ctx.selectedAccounts.length ? ctx.selectedAccountBalanceTotal : null);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isPersonalizationModalOpen)("selectedIcon", ctx.selectedIcon)("selectedColor", ctx.selectedColor)("icons", ctx.icons)("colors", ctx.colors);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isSuccessModalOpen)("title", ctx.isEditMode ? "Presupuesto actualizado" : "Presupuesto creado")("eyebrow", ctx.isEditMode ? "\u00A1Cambios guardados!" : "\u00A1Presupuesto creado!")("heading", ctx.name)("details", ctx.successReceiptDetails);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showUnsavedAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showDeleteAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showDeleteError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showDataError);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showAccountBalanceRequiredAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showErrorAlert);
        } }, dependencies: [CommonModule, i10.NgIf, FormsModule, i11.ɵNgNoValidate, i11.NgControlStatus, i11.NgControlStatusGroup, i11.RequiredValidator, i11.NgModel, i11.NgForm, IonicModule, i12.IonContent, i12.IonHeader, TextFieldComponent,
            AccountSelectorModalComponent,
            CategorySelectorModalComponent,
            PersonalizationModalComponent,
            SelectionSummaryComponent,
            ButtonComponent,
            CustomAlertComponent,
            BudgetPreviewCardComponent,
            PageLayoutComponent,
            FilterModalComponent,
            SectionCardComponent,
            InfoBannerComponent,
            WarningMessageComponent,
            SuccessReceiptModalComponent], styles: ["[_nghost-%COMP%] {\n  --create-primary: var(--fv-primary, #4318b8);\n  --create-accent: #5267f7;\n  --create-background: #f7f8fc;\n}\n\n.create-budget-page[_ngcontent-%COMP%] {\n  --background: linear-gradient(180deg, #fcfcff 0%, var(--create-background) 100%);\n}\n\n.create-budget-form[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 18px 14px calc(12px + env(safe-area-inset-bottom));\n  flex-direction: column;\n  gap: 18px;\n}\n\n.action-container[_ngcontent-%COMP%] {\n  margin-top: 3px;\n}\n\n@media (max-width: 420px) {\n  .create-budget-form[_ngcontent-%COMP%] {\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n\n  .create-budget-form[_ngcontent-%COMP%] {\n    gap: 16px;\n  }\n\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateBudgetPage, [{
        type: Component,
        args: [{ selector: 'app-create-budget', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    IonicModule,
                    TextFieldComponent,
                    AccountSelectorModalComponent,
                    CategorySelectorModalComponent,
                    PersonalizationModalComponent,
                    SelectionSummaryComponent,
                    ButtonComponent,
                    CustomAlertComponent,
                    BudgetPreviewCardComponent,
                    PageLayoutComponent,
                    FilterModalComponent,
                    SectionCardComponent,
                    InfoBannerComponent,
                    WarningMessageComponent,
                    SuccessReceiptModalComponent
                ], template: "<ion-header>\n  <app-page-layout\n    [title]=\"isEditMode ? 'Editar presupuesto' : 'Crear presupuesto'\"\n    [showBack]=\"true\"\n    [loading]=\"isSaving || isDeleting\"\n    (back)=\"backToBudgets()\">\n  </app-page-layout>\n</ion-header>\n\n<ion-content [fullscreen]=\"false\" class=\"create-budget-page\">\n  <form class=\"create-budget-form\" (ngSubmit)=\"saveBudget()\">\n    <app-budget-preview-card\n      [name]=\"name\"\n      [icon]=\"selectedIcon\"\n      [color]=\"selectedColor\"\n      [budgetTotal]=\"categoryAllocationTotal\"\n      [categoryCount]=\"selectedCategoryAllocations.length\"\n      [startDate]=\"periodSelection.startDate\"\n      [endDate]=\"periodSelection.endDate\"\n      (personalize)=\"openPersonalizationModal()\">\n    </app-budget-preview-card>\n\n    <app-section-card title=\"Nombre del Presupuesto\">\n      <app-text-field\n        name=\"name\"\n        [maxLength]=\"30\"\n        [embedded]=\"true\"\n        ariaLabel=\"Nombre del presupuesto\"\n        placeholder=\"Ej. Vacaciones en familia\"\n        [(ngModel)]=\"name\"\n        [required]=\"true\">\n      </app-text-field>\n    </app-section-card>\n\n    <app-section-card title=\"Programaci\u00F3n\">\n      <app-selection-summary\n        [primaryText]=\"formattedDateRange\"\n        [secondaryText]=\"periodLabel\"\n        ariaLabel=\"Cambiar las fechas del presupuesto\"\n        fallbackIcon=\"assets/icon/calendar.svg\"\n        (activated)=\"openPeriodModal()\">\n      </app-selection-summary>\n    </app-section-card>\n\n    <app-section-card title=\"Cuentas\">\n      <app-selection-summary\n        [primaryText]=\"selectedAccountsTitle\"\n        [secondaryText]=\"selectedAccountsLabel\"\n        ariaLabel=\"Seleccionar cuentas vinculadas\"\n        fallbackIcon=\"assets/icon/bank.svg\"\n        [items]=\"accountSummaryItems\"\n        (activated)=\"openAccountModal()\">\n      </app-selection-summary>\n    </app-section-card>\n\n    <app-warning-message\n      *ngIf=\"hasInsufficientAccountBalance\"\n      title=\"Revisa la cobertura\"\n      [message]=\"accountBalanceWarningMessage\">\n    </app-warning-message>\n\n    <app-section-card title=\"Categor\u00EDas\">\n      <app-selection-summary\n        [primaryText]=\"selectedCategoriesTitle\"\n        [secondaryText]=\"selectedCategoriesLabel\"\n        ariaLabel=\"Seleccionar categor\u00EDas del presupuesto\"\n        fallbackIcon=\"assets/icon/category.svg\"\n        [items]=\"categorySummaryItems\"\n        (activated)=\"openCategoryModal()\">\n      </app-selection-summary>\n    </app-section-card>\n\n    <app-section-card title=\"Notas (opcional)\">\n      <app-text-field\n        name=\"notes\"\n        [embedded]=\"true\"\n        [multiline]=\"true\"\n        [rows]=\"3\"\n        [maxLength]=\"200\"\n        ariaLabel=\"Notas del presupuesto\"\n        placeholder=\"A\u00F1ade un detalle o recordatorio para este presupuesto\"\n        [(ngModel)]=\"notes\">\n      </app-text-field>\n    </app-section-card>\n\n    <app-info-banner\n      *ngIf=\"!isEditMode\"\n      title=\"Consejo FinVia\"\n      [message]=\"budgetAdviceMessage\"\n      symbol=\"\u2728\">\n    </app-info-banner>\n\n    <div class=\"action-container\">\n      <app-button\n        [text]=\"isSaving\n          ? (isEditMode ? 'Guardando...' : 'Creando...')\n          : (isEditMode ? 'Guardar cambios' : 'Crear presupuesto')\"\n        type=\"submit\"\n        [loading]=\"isSaving\"\n        [disabled]=\"!canSave\">\n      </app-button>\n\n      <app-button\n        *ngIf=\"isEditMode && canDeleteBudget\"\n        text=\"Eliminar presupuesto\"\n        icon=\"trash\"\n        variant=\"danger\"\n        [loading]=\"isDeleting\"\n        [disabled]=\"isSaving || isDeleting\"\n        (clicked)=\"requestDeleteBudget()\">\n      </app-button>\n    </div>\n  </form>\n</ion-content>\n\n<app-filter-modal\n  [isOpen]=\"isPeriodModalOpen\"\n  title=\"Elige las fechas\"\n  description=\"Selecciona durante cu\u00E1nto tiempo controlar\u00E1s este presupuesto.\"\n  applyText=\"Aplicar fechas\"\n  [selectedPeriod]=\"periodSelection.period\"\n  [selectedPeriodValue]=\"periodSelection.periodValue\"\n  [selectedStartDate]=\"periodSelection.startDate\"\n  [selectedEndDate]=\"periodSelection.endDate\"\n  (modalClosed)=\"closePeriodModal()\"\n  (filtersApplied)=\"applyPeriod($event)\">\n</app-filter-modal>\n\n<app-account-selector-modal\n  [isOpen]=\"isAccountModalOpen\"\n  [accounts]=\"accounts\"\n  [selectionMode]=\"AccountSelectionMode.MULTIPLE\"\n  [selectedAccounts]=\"selectedAccounts\"\n  (accountsSelected)=\"applyAccounts($event)\"\n  (modalClosed)=\"closeAccountModal()\">\n</app-account-selector-modal>\n\n<app-category-selector-modal\n  [isOpen]=\"isCategoryModalOpen\"\n  [categories]=\"categories\"\n  [selectedAllocations]=\"selectedCategoryAllocations\"\n  [availableBalance]=\"selectedAccounts.length ? selectedAccountBalanceTotal : null\"\n  (allocationsSelected)=\"applyCategoryAllocations($event)\"\n  (modalClosed)=\"closeCategoryModal()\">\n</app-category-selector-modal>\n\n<app-personalization-modal\n  [isOpen]=\"isPersonalizationModalOpen\"\n  [selectedIcon]=\"selectedIcon\"\n  [selectedColor]=\"selectedColor\"\n  [icons]=\"icons\"\n  [colors]=\"colors\"\n  (modalClosed)=\"closePersonalizationModal()\"\n  (applied)=\"applyPersonalization($event)\">\n</app-personalization-modal>\n\n<app-success-receipt-modal\n  [isOpen]=\"isSuccessModalOpen\"\n  [title]=\"isEditMode ? 'Presupuesto actualizado' : 'Presupuesto creado'\"\n  [eyebrow]=\"isEditMode ? '\u00A1Cambios guardados!' : '\u00A1Presupuesto creado!'\"\n  [heading]=\"name\"\n  actionText=\"Ir a mis presupuestos\"\n  [details]=\"successReceiptDetails\"\n  (completed)=\"viewBudgets()\">\n</app-success-receipt-modal>\n\n<app-custom-alert\n  *ngIf=\"showUnsavedAlert\"\n  header=\"Cambios sin guardar\"\n  message=\"Has realizado cambios en el presupuesto. \u00BFDeseas salir sin guardar?\"\n  cancelText=\"No\"\n  confirmText=\"S\u00ED\"\n  (onCancel)=\"showUnsavedAlert = false\"\n  (onConfirm)=\"leaveWithoutSaving()\">\n</app-custom-alert>\n\n<app-custom-alert\n  *ngIf=\"showDeleteAlert\"\n  header=\"Eliminar presupuesto\"\n  [message]=\"'Esta acci\u00F3n eliminar\u00E1 definitivamente \u201C' + name.trim() + '\u201D y no se puede deshacer. \u00BFDeseas continuar?'\"\n  cancelText=\"Cancelar\"\n  confirmText=\"Eliminar\"\n  (onCancel)=\"cancelDeleteBudget()\"\n  (onConfirm)=\"confirmDeleteBudget()\">\n</app-custom-alert>\n\n<app-custom-alert\n  *ngIf=\"showDeleteError\"\n  header=\"No se pudo eliminar\"\n  message=\"Ocurri\u00F3 un error al eliminar el presupuesto. Int\u00E9ntalo nuevamente.\"\n  confirmText=\"Aceptar\"\n  (onConfirm)=\"showDeleteError = false\">\n</app-custom-alert>\n\n<app-custom-alert\n  *ngIf=\"showDataError\"\n  header=\"No se pudieron cargar los datos\"\n  message=\"No fue posible obtener las cuentas o categor\u00EDas. Int\u00E9ntalo nuevamente.\"\n  confirmText=\"Aceptar\"\n  (onConfirm)=\"showDataError = false\">\n</app-custom-alert>\n\n<app-custom-alert\n  *ngIf=\"showAccountBalanceRequiredAlert\"\n  header=\"Cuenta sin saldo disponible\"\n  message=\"Selecciona primero una cuenta con un saldo mayor que cero antes de asignar montos a las categor\u00EDas.\"\n  confirmText=\"Aceptar\"\n  (onConfirm)=\"showAccountBalanceRequiredAlert = false\">\n</app-custom-alert>\n\n<app-custom-alert\n  *ngIf=\"showErrorAlert\"\n  header=\"Error\"\n  [message]=\"isEditMode\n    ? 'No se pudo actualizar el presupuesto. Int\u00E9ntalo nuevamente.'\n    : 'No se pudo crear el presupuesto. Int\u00E9ntalo nuevamente.'\"\n  confirmText=\"Aceptar\"\n  (onConfirm)=\"showErrorAlert = false\">\n</app-custom-alert>\n", styles: [":host {\n  --create-primary: var(--fv-primary, #4318b8);\n  --create-accent: #5267f7;\n  --create-background: #f7f8fc;\n}\n\n.create-budget-page {\n  --background: linear-gradient(180deg, #fcfcff 0%, var(--create-background) 100%);\n}\n\n.create-budget-form {\n  display: flex;\n  width: 100%;\n  max-width: 560px;\n  margin: 0 auto;\n  padding: 18px 14px calc(12px + env(safe-area-inset-bottom));\n  flex-direction: column;\n  gap: 18px;\n}\n\n.action-container {\n  margin-top: 3px;\n}\n\n@media (max-width: 420px) {\n  .create-budget-form {\n    padding-right: 12px;\n    padding-left: 12px;\n  }\n\n  .create-budget-form {\n    gap: 16px;\n  }\n\n}\n"] }]
    }], () => [{ type: i1.ActivatedRoute }, { type: i2.CreateBudgetUseCase }, { type: i3.UpdateBudgetUseCase }, { type: i4.DetailBudgetUseCase }, { type: i5.DeleteBudgetUseCase }, { type: i6.NavigationService }, { type: i7.SpinnerService }, { type: i8.ListAccountsUseCase }, { type: i9.ListCategoriesUseCase }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CreateBudgetPage, { className: "CreateBudgetPage", filePath: "src/app/features/side-menu/budgets/create-budget/create-budget.page.ts", lineNumber: 101 }); })();
//# sourceMappingURL=create-budget.page.js.map