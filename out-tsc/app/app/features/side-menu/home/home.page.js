import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import 'src/app/core/utils/observable-extensions';
import { KEY_MANAGEMENT } from 'src/app/core/constants/key-management.constants';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { FloatingActionButtonComponent } from 'src/app/shared/components/floating-action-button/floating-action-button.component';
import { BaseModalComponent } from 'src/app/shared/components/base-modal/base-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/use-cases/accounts/list-accounts.usecase";
import * as i2 from "../../../core/use-cases/transfer/list-transfer.usecase";
import * as i3 from "../../../core/use-cases/transactions/list-transactions.usecase";
import * as i4 from "src/app/core/services/localManagementService.service";
import * as i5 from "src/app/core/services/navigation.service";
import * as i6 from "src/app/core/services/spinnerService.service";
import * as i7 from "@ionic/angular";
import * as i8 from "@angular/common";
import * as i9 from "@angular/forms";
function HomePage_ng_container_34_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵelement(1, "app-item-icon", 37);
    i0.ɵɵelementStart(2, "div", 38)(3, "div", 39);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 40)(6, "span", 41);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 42)(9, "div", 43);
    i0.ɵɵelement(10, "div", 44);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(11, "div", 45)(12, "span", 46);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "ion-icon", 47);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const category_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", category_r2.icono)("color", category_r2.color);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", category_r2.nombre, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("color", category_r2.color);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.amount > 0 ? (category_r2.totalAmount / ctx_r2.amount * 100).toFixed(0) : 0, "% ");
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("background", category_r2.color)("width", ctx_r2.amount > 0 ? category_r2.totalAmount / ctx_r2.amount * 100 : 0, "%");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" S/. ", i0.ɵɵpipeBind2(14, 11, category_r2.totalAmount, "1.2-2"), " ");
} }
function HomePage_ng_container_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 34);
    i0.ɵɵtemplate(2, HomePage_ng_container_34_div_2_Template, 16, 14, "div", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.categoriesWithAmounts);
} }
function HomePage_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48)(1, "div", 49);
    i0.ɵɵelement(2, "ion-icon", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3", 24);
    i0.ɵɵtext(4, " Sin movimientos ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 51);
    i0.ɵɵtext(6, " A\u00FAn no tienes transacciones registradas. ");
    i0.ɵɵelementEnd()();
} }
export class HomePage {
    constructor(listAccountsUseCase, listTransferUseCase, listTransactionsUseCase, localManagementService, navService, loadingService, menuCtrl) {
        this.listAccountsUseCase = listAccountsUseCase;
        this.listTransferUseCase = listTransferUseCase;
        this.listTransactionsUseCase = listTransactionsUseCase;
        this.localManagementService = localManagementService;
        this.navService = navService;
        this.loadingService = loadingService;
        this.menuCtrl = menuCtrl;
        this.showGenericAlert = false;
        this.showUnauthorizedAlert = false;
        this.messageError = '';
        this.isModalOpen = false;
        this.hideSecretValues = false;
        this.amount = 4580;
        this.newAmount = this.amount;
        this.errorMessage = null;
        this.segment = 'gastos';
        this.notificationCount = 3;
        this.userName = 'Josue';
        this.categoriesWithAmounts = [];
        this.gastosGrouped = [];
        this.ingresosGrouped = [];
        this.name = this.localManagementService.getVariable(KEY_MANAGEMENT.NAME) || "";
        this.isFirstTime = this.localManagementService.getVariable(KEY_MANAGEMENT.IS_FIRST_TIME) === 'true';
        this.dataTabs = [
            {
                value: 'gastos',
                label: 'Gasto'
            },
            {
                value: 'ingresos',
                label: 'Ingreso'
            }
        ];
        this.mockCategories = [
            {
                id: 1,
                nombre: 'Compras',
                icono: 'shopping-cart',
                color: '#8B5CF6',
                tipo: 'gastos',
                usuario_id: 1,
                totalAmount: 1250
            },
            {
                id: 2,
                nombre: 'Alimentación',
                icono: 'food',
                color: '#22C55E',
                tipo: 'gastos',
                usuario_id: 1,
                totalAmount: 940
            },
            {
                id: 3,
                nombre: 'Transporte',
                icono: 'car',
                color: '#3B82F6',
                tipo: 'gastos',
                usuario_id: 1,
                totalAmount: 705
            },
            {
                id: 4,
                nombre: 'Hogar',
                icono: 'home',
                color: '#F59E0B',
                tipo: 'gastos',
                usuario_id: 1,
                totalAmount: 470
            },
            {
                id: 5,
                nombre: 'Salud',
                icono: 'heart',
                color: '#EC4899',
                tipo: 'gastos',
                usuario_id: 1,
                totalAmount: 310
            },
            {
                id: 6,
                nombre: 'Salario',
                icono: 'wallet',
                color: '#22C55E',
                tipo: 'ingresos',
                usuario_id: 1,
                totalAmount: 4200
            },
            {
                id: 7,
                nombre: 'Freelance',
                icono: 'briefcase',
                color: '#3B82F6',
                tipo: 'ingresos',
                usuario_id: 1,
                totalAmount: 1200
            },
            {
                id: 8,
                nombre: 'Inversiones',
                icono: 'trending-up',
                color: '#8B5CF6',
                tipo: 'ingresos',
                usuario_id: 1,
                totalAmount: 850
            }
        ];
        this.loadMockData();
        // this.executeAccountList();
        // this.executeTransferList();
        // this.executeTransactionsList();
    }
    /* ==========================
       SERVICIOS
       ========================== */
    executeAccountList() {
        this.loadingService.show();
        this.listAccountsUseCase
            .listAccounts()
            .service({
            success: (data) => {
                this.loadingService.hide();
                if (data) {
                }
                else {
                    this.showGenericAlert = true;
                }
            },
            failure: () => {
                this.loadingService.hide();
                this.showGenericAlert = true;
            }
        });
    }
    executeTransferList() {
        this.loadingService.show();
        this.listTransferUseCase
            .listTransfer()
            .service({
            success: (data) => {
                this.loadingService.hide();
                if (data) {
                    console.log('Transfers List:', data.items);
                }
            },
            failure: (error) => {
                this.loadingService.hide();
                console.error('Error executing transfer list:', error);
            }
        });
    }
    executeTransactionsList() {
        this.loadingService.show();
        this.listTransactionsUseCase
            .execute()
            .service({
            success: (data) => {
                this.loadingService.hide();
                if (data) {
                    this.groupTransactionsByCategory(data.items);
                }
            },
            failure: (error) => {
                this.loadingService.hide();
                console.error('Error executing transactions list:', error);
            }
        });
    }
    /* ==========================
       MÉTODOS
       ========================== */
    loadMockData() {
        this.gastosGrouped = this.mockCategories.filter(category => category.tipo === 'gastos');
        this.ingresosGrouped = this.mockCategories.filter(category => category.tipo === 'ingresos');
        this.updateCategoriesDisplay();
    }
    groupTransactionsByCategory(transactions) {
        const categoryMap = new Map();
        transactions.forEach(transaction => {
            const key = transaction.nombre;
            if (categoryMap.has(key)) {
                const existing = categoryMap.get(key);
                existing.total += Number(transaction.monto || 0);
            }
            else {
                categoryMap.set(key, {
                    category: {
                        id: transaction.id,
                        nombre: transaction.nombre,
                        icono: transaction.icono,
                        color: transaction.color,
                        tipo: transaction.tipo,
                        usuario_id: transaction.usuario_id
                    },
                    total: Number(transaction.monto || 0)
                });
            }
        });
        const grouped = Array
            .from(categoryMap.values())
            .map(item => ({
            ...item.category,
            totalAmount: item.total
        }));
        this.gastosGrouped = grouped.filter(category => category.tipo === 'gastos');
        this.ingresosGrouped = grouped.filter(category => category.tipo === 'ingresos');
        this.updateCategoriesDisplay();
    }
    updateCategoriesDisplay() {
        this.categoriesWithAmounts =
            this.segment === 'gastos'
                ? this.gastosGrouped
                : this.ingresosGrouped;
    }
    /* ==========================
       UI
       ========================== */
    openMenu() {
        this.menuCtrl.open('main-menu');
    }
    openModal() {
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    updateAmount() {
        if (this.newAmount) {
            this.amount = this.newAmount;
        }
        this.closeModal();
    }
    validationSecretValues() {
        this.hideSecretValues =
            !this.hideSecretValues;
    }
    onSegmentChanged(event) {
        this.segment =
            event;
        this.updateCategoriesDisplay();
    }
    navigateToCreateTransac() {
        this.navService.push('/home/create');
    }
    static { this.ɵfac = function HomePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomePage)(i0.ɵɵdirectiveInject(i1.ListAccountsUseCase), i0.ɵɵdirectiveInject(i2.ListTransferUseCase), i0.ɵɵdirectiveInject(i3.ListTransactionsUseCase), i0.ɵɵdirectiveInject(i4.LocalManagementService), i0.ɵɵdirectiveInject(i5.NavigationService), i0.ɵɵdirectiveInject(i6.SpinnerService), i0.ɵɵdirectiveInject(i7.MenuController)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomePage, selectors: [["app-home"]], decls: 44, vars: 13, consts: [["noCategories", ""], [1, "home-page"], [1, "page-container"], [1, "hero-section"], [1, "hero-text"], [1, "text-title", "hero-title"], [1, "text-caption", "hero-subtitle"], [1, "hero-decoration"], ["src", "assets/image/img-wallet.jpg", "alt", "Billetera"], [1, "balance-card"], [1, "balance-header"], [1, "text-caption", "text-white"], [1, "balance-body"], [1, "balance-left"], [1, "text-display-large", "text-white", "balance-amount"], ["type", "button", 1, "balance-eye", 3, "click"], [3, "src"], [1, "balance-footer", 3, "click"], [1, "account-chip"], ["src", "assets/icon/wallet.svg"], [1, "text-body", "text-white", "account-text"], [1, "segment-container"], ["segmentClass", "main-tabs", 3, "modelChange", "options", "model"], [1, "section-header"], [1, "text-subtitle"], ["type", "button", 1, "view-all-button"], ["name", "chevron-forward-outline"], [4, "ngIf", "ngIfElse"], ["title", "Modificar monto", "description", "Actualiza el monto mostrado en tu resumen.", "primaryText", "Guardar", "size", "sm", 3, "closed", "primary", "isOpen"], [1, "modal-content"], [1, "fv-input"], ["position", "floating"], ["type", "number", 3, "ngModelChange", "ngModel"], ["ariaLabel", "Crear transacci\u00F3n", 3, "clicked"], [1, "categories-container"], ["class", "category-card", 4, "ngFor", "ngForOf"], [1, "category-card"], ["size", "sm", "variant", "soft", 3, "icon", "color"], [1, "category-info"], [1, "category-name", "text-body-bold"], [1, "category-progress-row"], [1, "category-percent"], [1, "category-progress"], [1, "progress-track"], [1, "progress-fill"], [1, "category-action"], [1, "category-amount", "text-body-bold"], ["src", "assets/icon/right-inline.svg", 1, "category-arrow"], [1, "empty-state"], [1, "empty-icon-container"], ["src", "assets/icon/category.svg"], [1, "text-caption"]], template: function HomePage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "ion-content", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h1", 5);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 6);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 7);
            i0.ɵɵelement(9, "img", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "div", 9)(11, "div", 10)(12, "span", 11);
            i0.ɵɵtext(13, " Balance Total ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 12)(15, "div", 13)(16, "h2", 14);
            i0.ɵɵtext(17);
            i0.ɵɵpipe(18, "number");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "button", 15);
            i0.ɵɵlistener("click", function HomePage_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.validationSecretValues()); });
            i0.ɵɵelement(20, "ion-icon", 16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "div", 17);
            i0.ɵɵlistener("click", function HomePage_Template_div_click_21_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.openModal()); });
            i0.ɵɵelementStart(22, "div", 18);
            i0.ɵɵelement(23, "ion-icon", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span", 20);
            i0.ɵɵtext(25, " Cuenta Principal ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(26, "div", 21)(27, "app-custom-segment", 22);
            i0.ɵɵtwoWayListener("modelChange", function HomePage_Template_app_custom_segment_modelChange_27_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.segment, $event) || (ctx.segment = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("modelChange", function HomePage_Template_app_custom_segment_modelChange_27_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSegmentChanged($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div", 23)(29, "h2", 24);
            i0.ɵɵtext(30, " Resumen por categor\u00EDa ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "button", 25);
            i0.ɵɵtext(32, " Ver todas ");
            i0.ɵɵelement(33, "ion-icon", 26);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(34, HomePage_ng_container_34_Template, 3, 1, "ng-container", 27)(35, HomePage_ng_template_35_Template, 7, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "app-base-modal", 28);
            i0.ɵɵlistener("closed", function HomePage_Template_app_base_modal_closed_37_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeModal()); })("primary", function HomePage_Template_app_base_modal_primary_37_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.updateAmount()); });
            i0.ɵɵelementStart(38, "div", 29)(39, "ion-item", 30)(40, "ion-label", 31);
            i0.ɵɵtext(41, " Nuevo monto ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "ion-input", 32);
            i0.ɵɵtwoWayListener("ngModelChange", function HomePage_Template_ion_input_ngModelChange_42_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.newAmount, $event) || (ctx.newAmount = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(43, "app-floating-action-button", 33);
            i0.ɵɵlistener("clicked", function HomePage_Template_app_floating_action_button_clicked_43_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.navigateToCreateTransac()); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            const noCategories_r4 = i0.ɵɵreference(36);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" Hola, ", ctx.name.charAt(0).toUpperCase() + ctx.name.slice(1), " \uD83D\uDC4B ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.isFirstTime ? "Bienvenido a FinVia" : "Bienvenido de nuevo a FinVia", " ");
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1(" S/. ", i0.ɵɵpipeBind2(18, 10, ctx.amount, "1.2-2"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("src", ctx.hideSecretValues ? "assets/icon/eye-off-outline.svg" : "assets/icon/eye-outline.svg");
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("options", ctx.dataTabs);
            i0.ɵɵtwoWayProperty("model", ctx.segment);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.categoriesWithAmounts.length > 0)("ngIfElse", noCategories_r4);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("isOpen", ctx.isModalOpen);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newAmount);
        } }, dependencies: [IonicModule, i7.IonContent, i7.IonIcon, i7.IonInput, i7.IonItem, i7.IonLabel, i7.NumericValueAccessor, CommonModule, i8.NgForOf, i8.NgIf, i8.DecimalPipe, FormsModule, i9.NgControlStatus, i9.NgModel, HttpClientModule,
            CustomSegmentComponent,
            ItemIconComponent,
            FloatingActionButtonComponent,
            BaseModalComponent], styles: [".home-page[_ngcontent-%COMP%] {\n  --background: linear-gradient(\n    180deg,\n    #ffffff 0%,\n    var(--fv-background) 50%,\n    #f1f5f9 100%\n  );\n}\n\n\n\n\n\n\n.page-container[_ngcontent-%COMP%] {\n  padding-inline: var(--fv-space-lg);\n}\n\n\n\n\n\n\n.hero-section[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 92px;\n  padding-top: 36px;\n  padding-bottom: var(--fv-space-sm);\n}\n\n.hero-text[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--fv-text-primary);\n  font-size: var(--fv-type-headline);\n  font-weight: var(--fv-fw-bold);\n  line-height: 1.2;\n}\n\n.hero-subtitle[_ngcontent-%COMP%] {\n  margin-top: 6px;\n  color: var(--fv-text-secondary);\n  font-size: var(--fv-type-caption-1);\n  line-height: 1.4;\n}\n\n.hero-decoration[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 16px;\n  right: 24px;\n  width: 120px;\n\n  img {\n    display: block;\n    width: 100px;\n    margin-left: auto;\n    mask-image: linear-gradient(\n      to bottom,\n      #000 0%,\n      #000 65%,\n      rgba(0, 0, 0, 0.7) 80%,\n      transparent 100%\n    );\n  }\n}\n\n\n\n\n\n\n.balance-card[_ngcontent-%COMP%] {\n  position: relative;\n\n  margin-top: var(--fv-space-sm);\n\n  padding: var(--fv-space-xl);\n\n  min-height: 140px;\n\n  border-radius: 24px;\n\n  overflow: hidden;\n\n  background: var(--fv-gradient-primary);\n\n  border: 1px solid rgba(255,255,255,.10);\n\n  box-shadow: var(--fv-shadow-primary);\n}\n\n.balance-card[_ngcontent-%COMP%]::before {\n  content: '';\n\n  position: absolute;\n\n  right: -90px;\n  bottom: -90px;\n\n  width: 220px;\n  height: 220px;\n\n  border-radius: 50%;\n\n  background: rgba(255,255,255,.06);\n}\n\n.balance-header[_ngcontent-%COMP%] {\n  position: relative;\n\n  z-index: 2;\n\n  margin-bottom: var(--fv-space-md);\n}\n\n.balance-body[_ngcontent-%COMP%] {\n  position: relative;\n\n  z-index: 2;\n\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.balance-left[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.balance-amount[_ngcontent-%COMP%] {\n  margin: 0;\n\n  font-size: 34px !important;\n  font-weight: 700;\n\n  line-height: 1;\n\n  letter-spacing: -.5px;\n}\n\n.balance-eye[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n\n  border: 1px solid rgba(255,255,255,.15);\n\n  border-radius: 12px;\n\n  background: rgba(255,255,255,.16);\n\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.balance-eye[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n\n  filter: brightness(0) invert(1);\n}\n\n.balance-footer[_ngcontent-%COMP%] {\n  position: relative;\n\n  z-index: 2;\n\n  display: flex;\n  align-items: center;\n\n  gap: 10px;\n\n  margin-top: 14px;\n}\n\n.account-chip[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n\n  border-radius: 50%;\n\n  background: rgba(255,255,255,.16);\n\n  border: 1px solid rgba(255,255,255,.15);\n\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.account-chip[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n\n  filter: brightness(0) invert(1);\n}\n\n\n\n\n\n\n.segment-container[_ngcontent-%COMP%] {\n  margin-top: 14px;\n}\n\n[_nghost-%COMP%]     .main-tabs {\n  min-height: 46px;\n\n  padding: 4px;\n\n  border-radius: 18px;\n\n  background: var(--fv-surface);\n\n  box-shadow: var(--fv-shadow-sm);\n}\n\n\n\n\n\n\n.section-header[_ngcontent-%COMP%] {\n  margin-top: var(--fv-space-xl);\n\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.section-header[_ngcontent-%COMP%]   .text-subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.view-all-button[_ngcontent-%COMP%] {\n  border: none;\n\n  background: transparent;\n\n  display: flex;\n  align-items: center;\n\n  gap: 4px;\n\n  color: var(--fv-primary);\n\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.view-all-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n\n\n\n\n\n\n.categories-container[_ngcontent-%COMP%] {\n  padding-top: var(--fv-space-sm);\n  padding-bottom: 100px;\n\n  display: flex;\n  flex-direction: column;\n\n  gap: var(--fv-space-sm);\n}\n\n.category-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  gap: var(--fv-space-md);\n\n  padding:\n    var(--fv-space-md)\n    var(--fv-space-md);\n\n  background: var(--fv-surface);\n\n  border-radius: 16px;\n\n  box-shadow: var(--fv-shadow-sm);\n}\n\n\n\n\n.category-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n\n  border-radius: 10px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  flex-shrink: 0;\n}\n\n.category-main-icon[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n}\n\n\n\n\n.category-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.category-name[_ngcontent-%COMP%] {\n  color: var(--fv-text-primary);\n\n  font-size: 11px;\n  font-weight: 600;\n\n  line-height: 1.2;\n}\n\n.category-progress-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n\n  gap: 8px;\n}\n\n.category-percent[_ngcontent-%COMP%] {\n  min-width: 22px;\n\n  font-size: 9px;\n  font-weight: 600;\n\n  line-height: 1;\n\n  flex-shrink: 0;\n}\n\n.category-progress[_ngcontent-%COMP%] {\n  flex: 1;\n\n  display: flex;\n  align-items: center;\n}\n\n.progress-track[_ngcontent-%COMP%] {\n  width: 100%;\n\n  height: 3px;\n\n  background: #e7edf5;\n\n  border-radius: 999px;\n\n  overflow: hidden;\n}\n\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n\n  border-radius: 999px;\n}\n\n\n\n\n.category-action[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n\n  gap: 4px;\n\n  flex-shrink: 0;\n}\n\n.category-amount[_ngcontent-%COMP%] {\n  color: var(--fv-text-primary);\n\n  font-size: 11px;\n  font-weight: 700;\n\n  line-height: 1;\n\n  white-space: nowrap;\n}\n\n.category-arrow[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n\n  opacity: .45;\n\n  flex-shrink: 0;\n}\n\n\n\n\n\n\n.empty-state[_ngcontent-%COMP%] {\n  margin-top: var(--fv-space-sm);\n\n  min-height: 220px;\n\n  background: var(--fv-surface);\n\n  border-radius: 24px;\n\n  padding: var(--fv-space-3xl);\n\n  display: flex;\n  flex-direction: column;\n\n  align-items: center;\n  justify-content: center;\n\n  text-align: center;\n\n  box-shadow: var(--fv-shadow-card);\n}\n\n.empty-icon-container[_ngcontent-%COMP%] {\n  width: 84px;\n  height: 84px;\n\n  border-radius: 50%;\n\n  background: rgba(67,97,238,.06);\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  margin-bottom: var(--fv-space-lg);\n}\n\n.empty-icon-container[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n\n  color: var(--fv-primary-light);\n\n  opacity: .5;\n}\n\n.empty-state[_ngcontent-%COMP%]   .text-subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 var(--fv-space-sm);\n}\n\n.empty-state[_ngcontent-%COMP%]   .text-caption[_ngcontent-%COMP%] {\n  max-width: 240px;\n\n  margin: 0 auto;\n}\n\n\n\n\n\n\n.custom-modal[_ngcontent-%COMP%] {\n  --width: min(420px, calc(100% - 40px));\n\n  --border-radius: 24px;\n}\n\n.modal-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n\n  gap: var(--fv-space-xl);\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomePage, [{
        type: Component,
        args: [{ selector: 'app-home', standalone: true, imports: [
                    IonicModule,
                    CommonModule,
                    FormsModule,
                    HttpClientModule,
                    CustomSegmentComponent,
                    ItemIconComponent,
                    FloatingActionButtonComponent,
                    BaseModalComponent
                ], template: "<ion-content class=\"home-page\">\n\n  <div class=\"page-container\">\n\n    <div class=\"hero-section\">\n      <div class=\"hero-text\">\n        <h1 class=\"text-title hero-title\">\n          Hola, {{ name.charAt(0).toUpperCase() + name.slice(1) }} \uD83D\uDC4B\n        </h1>\n\n        <p class=\"text-caption hero-subtitle\">\n          {{ isFirstTime ? 'Bienvenido a FinVia' : 'Bienvenido de nuevo a FinVia' }}\n        </p>\n      </div>\n\n      <div class=\"hero-decoration\">\n        <img src=\"assets/image/img-wallet.jpg\" alt=\"Billetera\">\n      </div>\n    </div>\n\n    <!-- BALANCE -->\n\n    <div class=\"balance-card\">\n\n      <div class=\"balance-header\">\n\n        <span class=\"text-caption text-white\">\n          Balance Total\n        </span>\n\n      </div>\n\n      <div class=\"balance-body\">\n\n        <div class=\"balance-left\">\n\n          <h2 class=\"text-display-large text-white balance-amount\">\n            S/. {{ amount | number:'1.2-2' }}\n          </h2>\n\n        </div>\n\n        <button\n          type=\"button\"\n          class=\"balance-eye\"\n          (click)=\"validationSecretValues()\">\n\n          <ion-icon\n            [src]=\"hideSecretValues\n              ? 'assets/icon/eye-off-outline.svg'\n              : 'assets/icon/eye-outline.svg'\">\n          </ion-icon>\n\n        </button>\n\n      </div>\n\n      <div\n        class=\"balance-footer\"\n        (click)=\"openModal()\">\n\n        <div class=\"account-chip\">\n\n          <ion-icon\n            src=\"assets/icon/wallet.svg\">\n          </ion-icon>\n\n        </div>\n\n        <span class=\"text-body text-white account-text\">\n          Cuenta Principal\n        </span>\n\n      </div>\n\n    </div>\n\n    <!-- SEGMENT -->\n\n    <div class=\"segment-container\">\n\n      <app-custom-segment\n        [options]=\"dataTabs\"\n        [(model)]=\"segment\"\n        segmentClass=\"main-tabs\"\n        (modelChange)=\"onSegmentChanged($event)\">\n      </app-custom-segment>\n\n    </div>\n\n    <!-- SECTION HEADER -->\n\n    <div class=\"section-header\">\n\n      <h2 class=\"text-subtitle\">\n        Resumen por categor\u00EDa\n      </h2>\n\n      <button\n        type=\"button\"\n        class=\"view-all-button\">\n\n        Ver todas\n\n        <ion-icon\n          name=\"chevron-forward-outline\">\n        </ion-icon>\n\n      </button>\n\n    </div>\n\n    <!-- CATEGORY LIST -->\n\n    <ng-container\n      *ngIf=\"categoriesWithAmounts.length > 0; else noCategories\">\n\n      <div class=\"categories-container\">\n\n        <div\n          class=\"category-card\"\n          *ngFor=\"let category of categoriesWithAmounts\">\n\n          <!-- BLOQUE 1 : ICON -->\n\n          <app-item-icon\n            [icon]=\"category.icono\"\n            [color]=\"category.color\"\n            size=\"sm\"\n            variant=\"soft\">\n          </app-item-icon>\n\n          <!-- BLOQUE 2 : INFO -->\n\n          <div class=\"category-info\">\n\n            <div class=\"category-name text-body-bold\">\n              {{ category.nombre }}\n            </div>\n\n            <div class=\"category-progress-row\">\n\n              <span\n                class=\"category-percent\"\n                [style.color]=\"category.color\">\n\n                {{\n                  amount > 0\n                    ? ((category.totalAmount / amount) * 100).toFixed(0)\n                    : 0\n                }}%\n\n              </span>\n\n              <div class=\"category-progress\">\n\n                <div class=\"progress-track\">\n\n                  <div\n                    class=\"progress-fill\"\n                    [style.background]=\"category.color\"\n                    [style.width.%]=\"\n                      amount > 0\n                        ? (category.totalAmount / amount) * 100\n                        : 0\n                    \">\n                  </div>\n\n                </div>\n\n              </div>\n\n            </div>\n\n          </div>\n\n          <!-- BLOQUE 3 : ACTION -->\n\n          <div class=\"category-action\">\n\n            <span class=\"category-amount text-body-bold\">\n              S/. {{ category.totalAmount | number:'1.2-2' }}\n            </span>\n\n            <ion-icon\n              class=\"category-arrow\"\n              src=\"assets/icon/right-inline.svg\">\n            </ion-icon>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </ng-container>\n\n    <!-- EMPTY STATE -->\n\n    <ng-template #noCategories>\n\n      <div class=\"empty-state\">\n\n        <div class=\"empty-icon-container\">\n\n          <ion-icon\n            src=\"assets/icon/category.svg\">\n          </ion-icon>\n\n        </div>\n\n        <h3 class=\"text-subtitle\">\n          Sin movimientos\n        </h3>\n\n        <p class=\"text-caption\">\n          A\u00FAn no tienes transacciones registradas.\n        </p>\n\n      </div>\n\n    </ng-template>\n\n  </div>\n\n  <!-- MODAL -->\n\n  <app-base-modal\n    [isOpen]=\"isModalOpen\"\n    title=\"Modificar monto\"\n    description=\"Actualiza el monto mostrado en tu resumen.\"\n    primaryText=\"Guardar\"\n    size=\"sm\"\n    (closed)=\"closeModal()\"\n    (primary)=\"updateAmount()\">\n      <div class=\"modal-content\">\n\n          <ion-item class=\"fv-input\">\n\n            <ion-label position=\"floating\">\n              Nuevo monto\n            </ion-label>\n\n            <ion-input\n              type=\"number\"\n              [(ngModel)]=\"newAmount\">\n            </ion-input>\n\n          </ion-item>\n\n      </div>\n  </app-base-modal>\n\n  <app-floating-action-button\n    ariaLabel=\"Crear transacci\u00F3n\"\n    (clicked)=\"navigateToCreateTransac()\">\n  </app-floating-action-button>\n\n</ion-content>\n", styles: [".home-page {\n  --background: linear-gradient(\n    180deg,\n    #ffffff 0%,\n    var(--fv-background) 50%,\n    #f1f5f9 100%\n  );\n}\n\n/* ==========================\n   PAGE CONTAINER\n   ========================== */\n\n.page-container {\n  padding-inline: var(--fv-space-lg);\n}\n\n/* ==========================\n   HERO\n   ========================== */\n\n.hero-section {\n  position: relative;\n  min-height: 92px;\n  padding-top: 36px;\n  padding-bottom: var(--fv-space-sm);\n}\n\n.hero-text {\n  position: relative;\n  z-index: 2;\n}\n\n.hero-title {\n  margin: 0;\n  color: var(--fv-text-primary);\n  font-size: var(--fv-type-headline);\n  font-weight: var(--fv-fw-bold);\n  line-height: 1.2;\n}\n\n.hero-subtitle {\n  margin-top: 6px;\n  color: var(--fv-text-secondary);\n  font-size: var(--fv-type-caption-1);\n  line-height: 1.4;\n}\n\n.hero-decoration {\n  position: absolute;\n  top: 16px;\n  right: 24px;\n  width: 120px;\n\n  img {\n    display: block;\n    width: 100px;\n    margin-left: auto;\n    mask-image: linear-gradient(\n      to bottom,\n      #000 0%,\n      #000 65%,\n      rgba(0, 0, 0, 0.7) 80%,\n      transparent 100%\n    );\n  }\n}\n\n/* ==========================\n   BALANCE\n   ========================== */\n\n.balance-card {\n  position: relative;\n\n  margin-top: var(--fv-space-sm);\n\n  padding: var(--fv-space-xl);\n\n  min-height: 140px;\n\n  border-radius: 24px;\n\n  overflow: hidden;\n\n  background: var(--fv-gradient-primary);\n\n  border: 1px solid rgba(255,255,255,.10);\n\n  box-shadow: var(--fv-shadow-primary);\n}\n\n.balance-card::before {\n  content: '';\n\n  position: absolute;\n\n  right: -90px;\n  bottom: -90px;\n\n  width: 220px;\n  height: 220px;\n\n  border-radius: 50%;\n\n  background: rgba(255,255,255,.06);\n}\n\n.balance-header {\n  position: relative;\n\n  z-index: 2;\n\n  margin-bottom: var(--fv-space-md);\n}\n\n.balance-body {\n  position: relative;\n\n  z-index: 2;\n\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.balance-left {\n  flex: 1;\n}\n\n.balance-amount {\n  margin: 0;\n\n  font-size: 34px !important;\n  font-weight: 700;\n\n  line-height: 1;\n\n  letter-spacing: -.5px;\n}\n\n.balance-eye {\n  width: 44px;\n  height: 44px;\n\n  border: 1px solid rgba(255,255,255,.15);\n\n  border-radius: 12px;\n\n  background: rgba(255,255,255,.16);\n\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.balance-eye ion-icon {\n  width: 24px;\n  height: 24px;\n\n  filter: brightness(0) invert(1);\n}\n\n.balance-footer {\n  position: relative;\n\n  z-index: 2;\n\n  display: flex;\n  align-items: center;\n\n  gap: 10px;\n\n  margin-top: 14px;\n}\n\n.account-chip {\n  width: 36px;\n  height: 36px;\n\n  border-radius: 50%;\n\n  background: rgba(255,255,255,.16);\n\n  border: 1px solid rgba(255,255,255,.15);\n\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.account-chip ion-icon {\n  width: 18px;\n  height: 18px;\n\n  filter: brightness(0) invert(1);\n}\n\n/* ==========================\n   SEGMENT\n   ========================== */\n\n.segment-container {\n  margin-top: 14px;\n}\n\n:host ::ng-deep .main-tabs {\n  min-height: 46px;\n\n  padding: 4px;\n\n  border-radius: 18px;\n\n  background: var(--fv-surface);\n\n  box-shadow: var(--fv-shadow-sm);\n}\n\n/* ==========================\n   SECTION HEADER\n   ========================== */\n\n.section-header {\n  margin-top: var(--fv-space-xl);\n\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.section-header .text-subtitle {\n  margin: 0;\n}\n\n.view-all-button {\n  border: none;\n\n  background: transparent;\n\n  display: flex;\n  align-items: center;\n\n  gap: 4px;\n\n  color: var(--fv-primary);\n\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.view-all-button ion-icon {\n  font-size: 14px;\n}\n\n/* ==========================\n   CATEGORY LIST\n   ========================== */\n\n.categories-container {\n  padding-top: var(--fv-space-sm);\n  padding-bottom: 100px;\n\n  display: flex;\n  flex-direction: column;\n\n  gap: var(--fv-space-sm);\n}\n\n.category-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  gap: var(--fv-space-md);\n\n  padding:\n    var(--fv-space-md)\n    var(--fv-space-md);\n\n  background: var(--fv-surface);\n\n  border-radius: 16px;\n\n  box-shadow: var(--fv-shadow-sm);\n}\n\n/* BLOCK 1 */\n\n.category-icon {\n  width: 32px;\n  height: 32px;\n\n  border-radius: 10px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  flex-shrink: 0;\n}\n\n.category-main-icon {\n  width: 14px;\n  height: 14px;\n}\n\n/* BLOCK 2 */\n\n.category-info {\n  flex: 1;\n}\n\n.category-name {\n  color: var(--fv-text-primary);\n\n  font-size: 11px;\n  font-weight: 600;\n\n  line-height: 1.2;\n}\n\n.category-progress-row {\n  display: flex;\n  align-items: center;\n\n  gap: 8px;\n}\n\n.category-percent {\n  min-width: 22px;\n\n  font-size: 9px;\n  font-weight: 600;\n\n  line-height: 1;\n\n  flex-shrink: 0;\n}\n\n.category-progress {\n  flex: 1;\n\n  display: flex;\n  align-items: center;\n}\n\n.progress-track {\n  width: 100%;\n\n  height: 3px;\n\n  background: #e7edf5;\n\n  border-radius: 999px;\n\n  overflow: hidden;\n}\n\n.progress-fill {\n  height: 100%;\n\n  border-radius: 999px;\n}\n\n/* BLOCK 3 */\n\n.category-action {\n  display: inline-flex;\n  align-items: center;\n\n  gap: 4px;\n\n  flex-shrink: 0;\n}\n\n.category-amount {\n  color: var(--fv-text-primary);\n\n  font-size: 11px;\n  font-weight: 700;\n\n  line-height: 1;\n\n  white-space: nowrap;\n}\n\n.category-arrow {\n  width: 12px;\n  height: 12px;\n\n  opacity: .45;\n\n  flex-shrink: 0;\n}\n\n/* ==========================\n   EMPTY STATE\n   ========================== */\n\n.empty-state {\n  margin-top: var(--fv-space-sm);\n\n  min-height: 220px;\n\n  background: var(--fv-surface);\n\n  border-radius: 24px;\n\n  padding: var(--fv-space-3xl);\n\n  display: flex;\n  flex-direction: column;\n\n  align-items: center;\n  justify-content: center;\n\n  text-align: center;\n\n  box-shadow: var(--fv-shadow-card);\n}\n\n.empty-icon-container {\n  width: 84px;\n  height: 84px;\n\n  border-radius: 50%;\n\n  background: rgba(67,97,238,.06);\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  margin-bottom: var(--fv-space-lg);\n}\n\n.empty-icon-container ion-icon {\n  width: 38px;\n  height: 38px;\n\n  color: var(--fv-primary-light);\n\n  opacity: .5;\n}\n\n.empty-state .text-subtitle {\n  margin: 0 0 var(--fv-space-sm);\n}\n\n.empty-state .text-caption {\n  max-width: 240px;\n\n  margin: 0 auto;\n}\n\n/* ==========================\n   MODAL\n   ========================== */\n\n.custom-modal {\n  --width: min(420px, calc(100% - 40px));\n\n  --border-radius: 24px;\n}\n\n.modal-content {\n  display: flex;\n  flex-direction: column;\n\n  gap: var(--fv-space-xl);\n}\n"] }]
    }], () => [{ type: i1.ListAccountsUseCase }, { type: i2.ListTransferUseCase }, { type: i3.ListTransactionsUseCase }, { type: i4.LocalManagementService }, { type: i5.NavigationService }, { type: i6.SpinnerService }, { type: i7.MenuController }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomePage, { className: "HomePage", filePath: "src/app/features/side-menu/home/home.page.ts", lineNumber: 37 }); })();
//# sourceMappingURL=home.page.js.map