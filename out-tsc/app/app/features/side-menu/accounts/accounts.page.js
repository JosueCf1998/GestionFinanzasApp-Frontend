import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import 'src/app/core/utils/observable-extensions';
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { ItemIconComponent } from "src/app/shared/components/item-icon/item-icon.component";
import { FeatureHeaderComponent } from "src/app/shared/components/feature-header/feature-header.component";
import * as i0 from "@angular/core";
import * as i1 from "src/app/core/use-cases/accounts/list-accounts.usecase";
import * as i2 from "src/app/core/services/navigation.service";
import * as i3 from "src/app/core/services/spinnerService.service";
import * as i4 from "@ionic/angular";
import * as i5 from "@angular/common";
function AccountsPage_section_30_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 21);
    i0.ɵɵlistener("click", function AccountsPage_section_30_button_6_Template_button_click_0_listener() { const account_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.goToEditAccount(account_r2)); });
    i0.ɵɵelementStart(1, "div", 22);
    i0.ɵɵelement(2, "app-item-icon", 23);
    i0.ɵɵelementStart(3, "div", 24)(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 25);
    i0.ɵɵtext(7, " Cuenta financiera ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "div", 26)(9, "div", 27);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "ion-icon", 28);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const account_r2 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("icon", account_r2.icon)("color", account_r2.color);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(account_r2.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" S/. ", i0.ɵɵpipeBind2(11, 4, +account_r2.amount, "1.2-2"), " ");
} }
function AccountsPage_section_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 17)(1, "div", 18)(2, "h2");
    i0.ɵɵtext(3, "Tus cuentas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 19);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, AccountsPage_section_30_button_6_Template, 13, 7, "button", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.accountList.length, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.accountList);
} }
function AccountsPage_section_31_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 29)(1, "div", 30);
    i0.ɵɵelement(2, "ion-icon", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h2");
    i0.ɵɵtext(4, "A\u00FAn no tienes cuentas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, " Crea tu primera cuenta para comenzar a administrar tu dinero en FinVia. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "app-button", 31);
    i0.ɵɵlistener("clicked", function AccountsPage_section_31_Template_app_button_clicked_7_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToCreateAccount()); });
    i0.ɵɵelementEnd()();
} }
export class AccountsPage {
    constructor(listAccountsUseCase, navService, loadingService) {
        this.listAccountsUseCase = listAccountsUseCase;
        this.navService = navService;
        this.loadingService = loadingService;
        this.showGenericAlert = false;
        this.showUnauthorizedAlert = false;
        this.messageError = '';
        this.accountList = [];
        this.executeAccountList();
    }
    // MARK: - SERVICIOS
    executeAccountList() {
        this.loadingService.show();
        this.listAccountsUseCase.listAccounts().service({
            success: (data) => {
                this.loadingService.hide();
                if (data) {
                    this.accountList = data.items;
                }
                else {
                    this.showGenericAlert = true;
                }
            },
            failure: (error) => {
                this.loadingService.hide();
                this.showGenericAlert = true;
            }
        });
    }
    // MARK: - FUNCIONES
    get totalCuentas() {
        return this.accountList.reduce((acc, c) => acc + Number(c.amount || 0), 0);
    }
    goToCreateAccount() {
        this.navService.push('/accounts/create-account', { type: 'crear' });
    }
    goToEditAccount(account) {
        this.navService.push('/accounts/create-account', {
            type: 'editar',
            account: account
        });
    }
    goToHistoryTransfer() {
        this.navService.push('/accounts/history-transfer', {});
    }
    goToNewTransfer() {
        this.navService.push('/accounts/new-transfer', {});
    }
    static { this.ɵfac = function AccountsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccountsPage)(i0.ɵɵdirectiveInject(i1.ListAccountsUseCase), i0.ɵɵdirectiveInject(i2.NavigationService), i0.ɵɵdirectiveInject(i3.SpinnerService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccountsPage, selectors: [["app-accounts"]], decls: 32, vars: 8, consts: [[1, "accounts-page", 3, "fullscreen"], [1, "accounts-content"], ["title", "Cuentas", "description", "Administra tus saldos y movimientos desde un solo lugar.", "imageSrc", "assets/image/accounts-header.svg", "imageAlt", "Billetera"], [1, "accounts-summary"], [1, "summary-label"], [1, "summary-amount"], [1, "summary-footer"], [1, "summary-chip"], ["src", "assets/icon/wallet.svg"], [1, "actions-section"], [1, "action-card", 3, "click"], [1, "action-icon"], ["src", "assets/icon/add.svg"], ["src", "assets/icon/transfer.svg"], ["src", "assets/icon/history.svg"], ["class", "accounts-section", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "accounts-section"], [1, "section-header"], [1, "accounts-counter"], ["type", "button", "class", "account-card", 3, "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "account-card", 3, "click"], [1, "account-left"], ["size", "sm", "variant", "soft", 3, "icon", "color"], [1, "account-info"], [1, "account-subtitle"], [1, "account-right"], [1, "account-amount"], ["src", "assets/icon/right-inline.svg", 1, "transfer-arrow"], [1, "empty-state"], [1, "empty-icon"], ["text", "Crear cuenta", "icon", "add", 3, "clicked"]], template: function AccountsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-content", 0)(1, "div", 1);
            i0.ɵɵelement(2, "app-feature-header", 2);
            i0.ɵɵelementStart(3, "section", 3)(4, "span", 4);
            i0.ɵɵtext(5, " Balance total ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1", 5);
            i0.ɵɵtext(7);
            i0.ɵɵpipe(8, "number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 6)(10, "div", 7);
            i0.ɵɵelement(11, "ion-icon", 8);
            i0.ɵɵelementStart(12, "span");
            i0.ɵɵtext(13);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(14, "section", 9)(15, "button", 10);
            i0.ɵɵlistener("click", function AccountsPage_Template_button_click_15_listener() { return ctx.goToCreateAccount(); });
            i0.ɵɵelementStart(16, "div", 11);
            i0.ɵɵelement(17, "ion-icon", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "span");
            i0.ɵɵtext(19, "Crear cuenta");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "button", 10);
            i0.ɵɵlistener("click", function AccountsPage_Template_button_click_20_listener() { return ctx.goToNewTransfer(); });
            i0.ɵɵelementStart(21, "div", 11);
            i0.ɵɵelement(22, "ion-icon", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span");
            i0.ɵɵtext(24, "Transferir");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "button", 10);
            i0.ɵɵlistener("click", function AccountsPage_Template_button_click_25_listener() { return ctx.goToHistoryTransfer(); });
            i0.ɵɵelementStart(26, "div", 11);
            i0.ɵɵelement(27, "ion-icon", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span");
            i0.ɵɵtext(29, "Historial");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(30, AccountsPage_section_30_Template, 7, 2, "section", 15)(31, AccountsPage_section_31_Template, 8, 0, "section", 16);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("fullscreen", false);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1(" S/. ", i0.ɵɵpipeBind2(8, 5, ctx.totalCuentas, "1.2-2"), " ");
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.accountList.length, " cuentas ");
            i0.ɵɵadvance(17);
            i0.ɵɵproperty("ngIf", ctx.accountList.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.accountList.length);
        } }, dependencies: [IonicModule, i4.IonContent, i4.IonIcon, CommonModule, i5.NgForOf, i5.NgIf, i5.DecimalPipe, ButtonComponent, ItemIconComponent, FeatureHeaderComponent], styles: [".accounts-page[_ngcontent-%COMP%] {\n  --background: var(--fv-background);\n}\n\n\n\n\n\n\n.accounts-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n\n  padding: 16px;\n  padding-bottom: 32px;\n}\n\n\n\n\n\n\n.accounts-summary[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n\n  gap: 6px;\n\n  padding: 20px 16px;\n\n  border-radius: 18px;\n\n  background: var(--fv-gradient-primary);\n  box-shadow: var(--fv-shadow-primary);\n}\n\n.accounts-summary[_ngcontent-%COMP%]::before, \n.accounts-summary[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  border-radius: 50%;\n  background: rgba(255,255,255,.05);\n}\n\n.accounts-summary[_ngcontent-%COMP%]::before {\n  top: -40px;\n  right: -30px;\n  width: 110px;\n  height: 110px;\n}\n\n.accounts-summary[_ngcontent-%COMP%]::after {\n  left: -40px;\n  bottom: -50px;\n  width: 90px;\n  height: 90px;\n}\n\n\n\n.summary-label[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n\n  color: rgba(255,255,255,.75);\n\n  font-size: 10px;\n  font-weight: 700;\n\n  letter-spacing: .14em;\n  text-transform: uppercase;\n}\n\n\n\n.summary-amount[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n\n  margin: 0;\n\n  color: white;\n\n  font-size: 28px;\n  font-weight: 800;\n\n  line-height: 1;\n  letter-spacing: -0.02em;\n}\n\n\n\n.summary-footer[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n}\n\n.summary-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n\n  padding: 6px 12px;\n\n  border-radius: 999px;\n\n  background: rgba(255,255,255,.12);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n\n.summary-chip[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 14px;\n  height: 14px;\n  filter: brightness(0) invert(1);\n}\n\n.summary-chip[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: white;\n\n  font-size: 12px;\n  font-weight: 600;\n}\n\n\n\n\n\n\n.actions-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n\n  gap: 8px;\n}\n\n.action-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n\n  gap: 6px;\n\n  padding: 12px 8px;\n\n  border-radius: 14px;\n\n  background: var(--fv-surface);\n  border: 1px solid rgba(67,97,238,.05);\n\n  box-shadow: var(--fv-shadow-sm);\n\n  transition: .18s ease;\n}\n\n.action-card[_ngcontent-%COMP%]:active {\n  transform: scale(.97);\n}\n\n.action-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 12px;\n\n  background: rgba(67,97,238,.08);\n}\n\n.action-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  color: var(--fv-primary);\n}\n\n.action-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: var(--fv-text-primary);\n\n  font-size: 11.5px;\n  font-weight: 600;\n\n  text-align: center;\n}\n\n\n\n\n\n\n.accounts-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n\n  color: var(--fv-text-primary);\n\n  font-size: 15px;\n  font-weight: 700;\n}\n\n.accounts-counter[_ngcontent-%COMP%] {\n  min-width: 22px;\n  height: 22px;\n\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n\n  padding: 0 6px;\n\n  border-radius: 999px;\n\n  background: rgba(67,97,238,.08);\n\n  color: var(--fv-primary);\n\n  font-size: 11px;\n  font-weight: 700;\n}\n\n\n\n\n\n\n.account-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  gap: 10px;\n\n  min-height: 60px;\n\n  padding: 10px 12px;\n\n  border-radius: 14px;\n\n  background: var(--fv-surface);\n  border: 1px solid rgba(67,97,238,.05);\n\n  box-shadow: 0 2px 10px rgba(15,23,42,.04);\n\n  transition: .18s ease;\n}\n\n.account-card[_ngcontent-%COMP%]:hover {\n  border-color: rgba(67,97,238,.12);\n}\n\n.account-card[_ngcontent-%COMP%]:active {\n  transform: scale(.985);\n}\n\n\n\n.account-left[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n\n  gap: 10px;\n\n  flex: 1;\n  min-width: 0;\n}\n\n\n\n.account-icon[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 10px;\n\n  flex-shrink: 0;\n\n  box-shadow: 0 4px 10px rgba(0,0,0,.06);\n}\n\n.account-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  color: white;\n}\n\n\n\n.account-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n  gap: 2px;\n  min-width: 0;\n}\n\n.account-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n\n  font-size: 13.5px;\n  font-weight: 700;\n\n  color: var(--fv-text-primary);\n\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.account-subtitle[_ngcontent-%COMP%] {\n  font-size: 10.5px;\n  font-weight: 500;\n\n  color: var(--fv-text-secondary);\n\n  opacity: .85;\n\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n\n\n.account-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.account-amount[_ngcontent-%COMP%] {\n  font-size: 13.5px;\n  font-weight: 800;\n\n  color: var(--fv-text-primary);\n\n  font-variant-numeric: tabular-nums;\n}\n\n.account-arrow[_ngcontent-%COMP%] {\n  width: 13px;\n  height: 13px;\n\n  opacity: .55;\n}\n\n\n\n\n\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  gap: 12px;\n\n  padding: 40px 20px;\n\n  text-align: center;\n}\n\n.empty-icon[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 16px;\n\n  background: rgba(67,97,238,.06);\n}\n\n.empty-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  color: var(--fv-primary);\n}\n\n.empty-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n\n  font-size: 16px;\n  font-weight: 700;\n}\n\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n\n  font-size: 12.5px;\n  color: var(--fv-text-secondary);\n}\n\n\n\n\n\n\n@media (max-width: 420px) {\n\n  .summary-amount[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n\n  .action-card[_ngcontent-%COMP%] {\n    padding: 10px 6px;\n  }\n\n  .action-icon[_ngcontent-%COMP%] {\n    width: 36px;\n    height: 36px;\n  }\n\n  .account-card[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n\n  .account-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 12.8px;\n  }\n\n  .account-amount[_ngcontent-%COMP%] {\n    font-size: 12.8px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccountsPage, [{
        type: Component,
        args: [{ selector: "app-accounts", standalone: true, imports: [IonicModule, CommonModule, ButtonComponent, ItemIconComponent, FeatureHeaderComponent], template: "<ion-content\n  [fullscreen]=\"false\"\n  class=\"accounts-page\">\n\n  <div class=\"accounts-content\">\n\n    <app-feature-header\n      title=\"Cuentas\"\n      description=\"Administra tus saldos y movimientos desde un solo lugar.\"\n      imageSrc=\"assets/image/accounts-header.svg\"\n      imageAlt=\"Billetera\">\n    </app-feature-header>\n\n    <!-- ==========================================================\n         SUMMARY (SIN COMPONENTE ICONO)\n         ========================================================== -->\n\n    <section class=\"accounts-summary\">\n\n      <span class=\"summary-label\">\n        Balance total\n      </span>\n\n      <h1 class=\"summary-amount\">\n        S/. {{ totalCuentas | number:'1.2-2' }}\n      </h1>\n\n      <div class=\"summary-footer\">\n\n        <div class=\"summary-chip\">\n\n          <ion-icon\n            src=\"assets/icon/wallet.svg\">\n          </ion-icon>\n\n          <span>\n            {{ accountList.length }} cuentas\n          </span>\n\n        </div>\n\n      </div>\n\n    </section>\n\n    <!-- ==========================================================\n         QUICK ACTIONS (SIN COMPONENTE ICONO)\n         ========================================================== -->\n\n    <section class=\"actions-section\">\n\n      <button class=\"action-card\" (click)=\"goToCreateAccount()\">\n\n        <div class=\"action-icon\">\n\n          <ion-icon src=\"assets/icon/add.svg\"></ion-icon>\n\n        </div>\n\n        <span>Crear cuenta</span>\n\n      </button>\n\n      <button class=\"action-card\" (click)=\"goToNewTransfer()\">\n\n        <div class=\"action-icon\">\n\n          <ion-icon src=\"assets/icon/transfer.svg\"></ion-icon>\n\n        </div>\n\n        <span>Transferir</span>\n\n      </button>\n\n      <button class=\"action-card\" (click)=\"goToHistoryTransfer()\">\n\n        <div class=\"action-icon\">\n\n          <ion-icon src=\"assets/icon/history.svg\"></ion-icon>\n\n        </div>\n\n        <span>Historial</span>\n\n      </button>\n\n    </section>\n\n    <!-- ==========================================================\n         ACCOUNTS (AQU\u00CD S\u00CD SE USA COMPONENTE)\n         ========================================================== -->\n\n    <section\n      class=\"accounts-section\"\n      *ngIf=\"accountList.length\">\n\n      <div class=\"section-header\">\n\n        <h2>Tus cuentas</h2>\n\n        <div class=\"accounts-counter\">\n          {{ accountList.length }}\n        </div>\n\n      </div>\n\n      <button\n        *ngFor=\"let account of accountList\"\n        type=\"button\"\n        class=\"account-card\"\n        (click)=\"goToEditAccount(account)\">\n\n        <!-- LEFT -->\n\n        <div class=\"account-left\">\n\n          <app-item-icon\n            [icon]=\"account.icon\"\n            [color]=\"account.color\"\n            size=\"sm\"\n            variant=\"soft\">\n          </app-item-icon>\n\n          <div class=\"account-info\">\n\n            <h3>{{ account.name }}</h3>\n\n            <span class=\"account-subtitle\">\n              Cuenta financiera\n            </span>\n\n          </div>\n\n        </div>\n\n        <!-- RIGHT -->\n\n        <div class=\"account-right\">\n\n          <div class=\"account-amount\">\n            S/. {{ +account.amount | number:'1.2-2' }}\n          </div>\n\n          <ion-icon\n            class=\"transfer-arrow\"\n            src=\"assets/icon/right-inline.svg\">\n          </ion-icon>\n\n        </div>\n\n      </button>\n\n    </section>\n\n    <!-- ==========================================================\n         EMPTY STATE (SIN COMPONENTE ICONO)\n         ========================================================== -->\n\n    <section class=\"empty-state\" *ngIf=\"!accountList.length\">\n\n      <div class=\"empty-icon\">\n\n        <ion-icon src=\"assets/icon/wallet.svg\"></ion-icon>\n\n      </div>\n\n      <h2>A\u00FAn no tienes cuentas</h2>\n\n      <p>\n        Crea tu primera cuenta para comenzar a administrar tu dinero en FinVia.\n      </p>\n\n      <app-button\n        text=\"Crear cuenta\"\n        icon=\"add\"\n        (clicked)=\"goToCreateAccount()\">\n      </app-button>\n\n    </section>\n\n  </div>\n\n</ion-content>\n", styles: [".accounts-page {\n  --background: var(--fv-background);\n}\n\n/* ==========================================================\n   CONTENT\n   ========================================================== */\n\n.accounts-content {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n\n  padding: 16px;\n  padding-bottom: 32px;\n}\n\n/* ==========================================================\n   SUMMARY (BALANCE CARD)\n   ========================================================== */\n\n.accounts-summary {\n  position: relative;\n  overflow: hidden;\n\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n\n  gap: 6px;\n\n  padding: 20px 16px;\n\n  border-radius: 18px;\n\n  background: var(--fv-gradient-primary);\n  box-shadow: var(--fv-shadow-primary);\n}\n\n.accounts-summary::before,\n.accounts-summary::after {\n  content: '';\n  position: absolute;\n  border-radius: 50%;\n  background: rgba(255,255,255,.05);\n}\n\n.accounts-summary::before {\n  top: -40px;\n  right: -30px;\n  width: 110px;\n  height: 110px;\n}\n\n.accounts-summary::after {\n  left: -40px;\n  bottom: -50px;\n  width: 90px;\n  height: 90px;\n}\n\n/* LABEL */\n.summary-label {\n  position: relative;\n  z-index: 2;\n\n  color: rgba(255,255,255,.75);\n\n  font-size: 10px;\n  font-weight: 700;\n\n  letter-spacing: .14em;\n  text-transform: uppercase;\n}\n\n/* AMOUNT */\n.summary-amount {\n  position: relative;\n  z-index: 2;\n\n  margin: 0;\n\n  color: white;\n\n  font-size: 28px;\n  font-weight: 800;\n\n  line-height: 1;\n  letter-spacing: -0.02em;\n}\n\n/* CHIP */\n.summary-footer {\n  position: relative;\n  z-index: 2;\n}\n\n.summary-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n\n  padding: 6px 12px;\n\n  border-radius: 999px;\n\n  background: rgba(255,255,255,.12);\n  -webkit-backdrop-filter: blur(10px);\n  backdrop-filter: blur(10px);\n}\n\n.summary-chip ion-icon {\n  width: 14px;\n  height: 14px;\n  filter: brightness(0) invert(1);\n}\n\n.summary-chip span {\n  color: white;\n\n  font-size: 12px;\n  font-weight: 600;\n}\n\n/* ==========================================================\n   ACTIONS\n   ========================================================== */\n\n.actions-section {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n\n  gap: 8px;\n}\n\n.action-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n\n  gap: 6px;\n\n  padding: 12px 8px;\n\n  border-radius: 14px;\n\n  background: var(--fv-surface);\n  border: 1px solid rgba(67,97,238,.05);\n\n  box-shadow: var(--fv-shadow-sm);\n\n  transition: .18s ease;\n}\n\n.action-card:active {\n  transform: scale(.97);\n}\n\n.action-icon {\n  width: 40px;\n  height: 40px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 12px;\n\n  background: rgba(67,97,238,.08);\n}\n\n.action-icon ion-icon {\n  width: 18px;\n  height: 18px;\n  color: var(--fv-primary);\n}\n\n.action-card span {\n  color: var(--fv-text-primary);\n\n  font-size: 11.5px;\n  font-weight: 600;\n\n  text-align: center;\n}\n\n/* ==========================================================\n   ACCOUNTS SECTION\n   ========================================================== */\n\n.accounts-section {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.section-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.section-header h2 {\n  margin: 0;\n\n  color: var(--fv-text-primary);\n\n  font-size: 15px;\n  font-weight: 700;\n}\n\n.accounts-counter {\n  min-width: 22px;\n  height: 22px;\n\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n\n  padding: 0 6px;\n\n  border-radius: 999px;\n\n  background: rgba(67,97,238,.08);\n\n  color: var(--fv-primary);\n\n  font-size: 11px;\n  font-weight: 700;\n}\n\n/* ==========================================================\n   ACCOUNT CARD (FINVIA LIST ITEM PRO)\n   ========================================================== */\n\n.account-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  gap: 10px;\n\n  min-height: 60px;\n\n  padding: 10px 12px;\n\n  border-radius: 14px;\n\n  background: var(--fv-surface);\n  border: 1px solid rgba(67,97,238,.05);\n\n  box-shadow: 0 2px 10px rgba(15,23,42,.04);\n\n  transition: .18s ease;\n}\n\n.account-card:hover {\n  border-color: rgba(67,97,238,.12);\n}\n\n.account-card:active {\n  transform: scale(.985);\n}\n\n/* LEFT */\n.account-left {\n  display: flex;\n  align-items: center;\n\n  gap: 10px;\n\n  flex: 1;\n  min-width: 0;\n}\n\n/* ICON */\n.account-icon {\n  width: 34px;\n  height: 34px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 10px;\n\n  flex-shrink: 0;\n\n  box-shadow: 0 4px 10px rgba(0,0,0,.06);\n}\n\n.account-icon ion-icon {\n  width: 16px;\n  height: 16px;\n  color: white;\n}\n\n/* TEXT */\n.account-info {\n  display: flex;\n  flex-direction: column;\n  text-align: left;\n  gap: 2px;\n  min-width: 0;\n}\n\n.account-info h3 {\n  margin: 0;\n\n  font-size: 13.5px;\n  font-weight: 700;\n\n  color: var(--fv-text-primary);\n\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.account-subtitle {\n  font-size: 10.5px;\n  font-weight: 500;\n\n  color: var(--fv-text-secondary);\n\n  opacity: .85;\n\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n/* RIGHT */\n.account-right {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.account-amount {\n  font-size: 13.5px;\n  font-weight: 800;\n\n  color: var(--fv-text-primary);\n\n  font-variant-numeric: tabular-nums;\n}\n\n.account-arrow {\n  width: 13px;\n  height: 13px;\n\n  opacity: .55;\n}\n\n/* ==========================================================\n   EMPTY STATE\n   ========================================================== */\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  gap: 12px;\n\n  padding: 40px 20px;\n\n  text-align: center;\n}\n\n.empty-icon {\n  width: 64px;\n  height: 64px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 16px;\n\n  background: rgba(67,97,238,.06);\n}\n\n.empty-icon ion-icon {\n  width: 30px;\n  height: 30px;\n  color: var(--fv-primary);\n}\n\n.empty-state h2 {\n  margin: 0;\n\n  font-size: 16px;\n  font-weight: 700;\n}\n\n.empty-state p {\n  margin: 0;\n\n  font-size: 12.5px;\n  color: var(--fv-text-secondary);\n}\n\n/* ==========================================================\n   RESPONSIVE\n   ========================================================== */\n\n@media (max-width: 420px) {\n\n  .summary-amount {\n    font-size: 24px;\n  }\n\n  .action-card {\n    padding: 10px 6px;\n  }\n\n  .action-icon {\n    width: 36px;\n    height: 36px;\n  }\n\n  .account-card {\n    padding: 10px;\n  }\n\n  .account-info h3 {\n    font-size: 12.8px;\n  }\n\n  .account-amount {\n    font-size: 12.8px;\n  }\n}\n"] }]
    }], () => [{ type: i1.ListAccountsUseCase }, { type: i2.NavigationService }, { type: i3.SpinnerService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccountsPage, { className: "AccountsPage", filePath: "src/app/features/side-menu/accounts/accounts.page.ts", lineNumber: 19 }); })();
//# sourceMappingURL=accounts.page.js.map