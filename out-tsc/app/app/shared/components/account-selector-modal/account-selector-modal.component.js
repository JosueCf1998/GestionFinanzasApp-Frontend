import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { ItemIconComponent } from "../item-icon/item-icon.component";
import { BaseModalComponent } from '../base-modal/base-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function AccountSelectorModalComponent_button_2_ion_icon_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 11);
} }
function AccountSelectorModalComponent_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 4);
    i0.ɵɵlistener("click", function AccountSelectorModalComponent_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleSelectAll()); });
    i0.ɵɵelement(1, "app-item-icon", 5);
    i0.ɵɵelementStart(2, "div", 6)(3, "span", 7);
    i0.ɵɵtext(4, "Todas las cuentas");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 8);
    i0.ɵɵtext(6, "Mostrar todas las cuentas");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 9);
    i0.ɵɵtemplate(8, AccountSelectorModalComponent_button_2_ion_icon_8_Template, 1, 0, "ion-icon", 10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("selected", ctx_r1.selectAll);
    i0.ɵɵadvance();
    i0.ɵɵproperty("selected", ctx_r1.selectAll);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("selected", ctx_r1.selectAll);
    i0.ɵɵadvance(5);
    i0.ɵɵclassProp("selected", ctx_r1.selectAll);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.selectAll);
} }
function AccountSelectorModalComponent_button_3_ion_icon_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 11);
} }
function AccountSelectorModalComponent_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 12);
    i0.ɵɵlistener("click", function AccountSelectorModalComponent_button_3_Template_button_click_0_listener() { const account_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectAccount(account_r4)); });
    i0.ɵɵelement(1, "app-item-icon", 13);
    i0.ɵɵelementStart(2, "div", 6)(3, "span", 7);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 8);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 9);
    i0.ɵɵtemplate(9, AccountSelectorModalComponent_button_3_ion_icon_9_Template, 1, 0, "ion-icon", 10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const account_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("selected", ctx_r1.isSelected(account_r4));
    i0.ɵɵadvance();
    i0.ɵɵproperty("icon", account_r4.icon)("color", account_r4.color)("selected", ctx_r1.isSelected(account_r4));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("selected", ctx_r1.isSelected(account_r4));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(account_r4.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("S/. ", i0.ɵɵpipeBind2(7, 12, +account_r4.amount, "1.2-2"), "");
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("selected", ctx_r1.isSelected(account_r4));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isSelected(account_r4));
} }
/* ==========================================================
   ENUMS
   ========================================================== */
export var AccountSelectionMode;
(function (AccountSelectionMode) {
    AccountSelectionMode["SINGLE"] = "single";
    AccountSelectionMode["MULTIPLE"] = "multiple";
})(AccountSelectionMode || (AccountSelectionMode = {}));
/* ==========================================================
   COMPONENT
   ========================================================== */
export class AccountSelectorModalComponent {
    constructor() {
        /* ==========================================================
           INPUTS
           ========================================================== */
        this.isOpen = false;
        this.accounts = [];
        this.selectionMode = AccountSelectionMode.SINGLE;
        this.selectedAccount = null;
        this.selectedAccounts = [];
        /* ==========================================================
           OUTPUTS
           ========================================================== */
        this.accountSelected = new EventEmitter();
        this.accountsSelected = new EventEmitter();
        this.modalClosed = new EventEmitter();
        /* ==========================================================
           PROPERTIES
           ========================================================== */
        this.AccountSelectionMode = AccountSelectionMode;
        this.workingSelection = [];
    }
    /* ==========================================================
       LIFECYCLE
       ========================================================== */
    ngOnChanges(changes) {
        if (changes['selectedAccounts'] ||
            (changes['isOpen'] && this.isOpen)) {
            this.workingSelection = [...this.selectedAccounts];
        }
    }
    /* ==========================================================
       GETTERS
       ========================================================== */
    get selectAll() {
        return this.accounts.length > 0 &&
            this.workingSelection.length === this.accounts.length;
    }
    get canConfirmSelection() {
        return this.workingSelection.length > 0;
    }
    /* ==========================================================
       PUBLIC
       ========================================================== */
    closeModal() {
        this.modalClosed.emit();
    }
    isSelected(account) {
        if (this.selectionMode === AccountSelectionMode.SINGLE) {
            return this.selectedAccount?.id === account.id;
        }
        return this.workingSelection.some(item => item.id === account.id);
    }
    selectAccount(account) {
        if (this.selectionMode === AccountSelectionMode.SINGLE) {
            this.accountSelected.emit(account);
            this.closeModal();
            return;
        }
        if (this.isSelected(account)) {
            this.workingSelection = this.workingSelection.filter(item => item.id !== account.id);
        }
        else {
            this.workingSelection = [
                ...this.workingSelection,
                account
            ];
        }
    }
    toggleSelectAll() {
        this.workingSelection = this.selectAll
            ? []
            : [...this.accounts];
    }
    confirmSelection() {
        this.accountsSelected.emit([...this.workingSelection]);
        this.closeModal();
    }
    static { this.ɵfac = function AccountSelectorModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccountSelectorModalComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccountSelectorModalComponent, selectors: [["app-account-selector-modal"]], inputs: { isOpen: "isOpen", accounts: "accounts", selectionMode: "selectionMode", selectedAccount: "selectedAccount", selectedAccounts: "selectedAccounts" }, outputs: { accountSelected: "accountSelected", accountsSelected: "accountsSelected", modalClosed: "modalClosed" }, features: [i0.ɵɵNgOnChangesFeature], decls: 4, vars: 7, consts: [["size", "lg", 3, "closed", "primary", "isOpen", "title", "description", "primaryText", "primaryDisabled"], [1, "fv-account-list"], ["type", "button", "class", "fv-account-item fv-all-account", 3, "selected", "click", 4, "ngIf"], ["type", "button", "class", "fv-account-item", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "fv-account-item", "fv-all-account", 3, "click"], ["icon", "wallet", "color", "var(--fv-primary)", "variant", "soft", 3, "selected"], [1, "fv-account-content"], [1, "fv-account-name"], [1, "fv-account-balance"], [1, "fv-account-status"], ["class", "fv-check-icon", "name", "checkmark", 4, "ngIf"], ["name", "checkmark", 1, "fv-check-icon"], ["type", "button", 1, "fv-account-item", 3, "click"], ["variant", "soft", 3, "icon", "color", "selected"]], template: function AccountSelectorModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "app-base-modal", 0);
            i0.ɵɵlistener("closed", function AccountSelectorModalComponent_Template_app_base_modal_closed_0_listener() { return ctx.closeModal(); })("primary", function AccountSelectorModalComponent_Template_app_base_modal_primary_0_listener() { return ctx.confirmSelection(); });
            i0.ɵɵelementStart(1, "div", 1);
            i0.ɵɵtemplate(2, AccountSelectorModalComponent_button_2_Template, 9, 8, "button", 2)(3, AccountSelectorModalComponent_button_3_Template, 10, 15, "button", 3);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("isOpen", ctx.isOpen)("title", ctx.selectionMode === ctx.AccountSelectionMode.SINGLE ? "Seleccionar cuenta" : "Seleccionar cuentas")("description", ctx.selectionMode === ctx.AccountSelectionMode.SINGLE ? "Elige la cuenta que deseas utilizar." : "Selecciona una o varias cuentas para filtrar.")("primaryText", ctx.selectionMode === ctx.AccountSelectionMode.MULTIPLE ? "Aplicar" : "")("primaryDisabled", !ctx.canConfirmSelection);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.selectionMode === ctx.AccountSelectionMode.MULTIPLE);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.accounts);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, i1.DecimalPipe, IonIcon,
            ItemIconComponent,
            BaseModalComponent], styles: ["[_nghost-%COMP%] {\n  display: contents;\n}\n\n.fv-account-list[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 0;\n  flex-direction: column;\n  gap: 8px;\n  overflow-y: auto;\n  padding: 0 2px 8px;\n}\n\n.fv-account-list[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 4px;\n}\n\n.fv-account-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  border-radius: 999px;\n  background: rgba(67, 97, 238, .18);\n}\n\n.fv-account-item[_ngcontent-%COMP%] {\n  display: flex;\n  width: 100%;\n  min-height: 64px;\n  align-items: center;\n  gap: 14px;\n  padding: 12px 14px;\n  border: 1px solid #edf1f7;\n  border-radius: 16px;\n  background: #fff;\n  transition: background .18s ease, border-color .18s ease, transform .18s ease;\n}\n\n.fv-account-item[_ngcontent-%COMP%]:active {\n  transform: scale(.985);\n}\n\n.fv-account-item.selected[_ngcontent-%COMP%] {\n  border-color: rgba(67, 97, 238, .22);\n  background: linear-gradient(135deg, rgba(67, 97, 238, .08), rgba(67, 97, 238, .03));\n}\n\n.fv-all-account.selected[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(67, 97, 238, .12), rgba(67, 97, 238, .05));\n}\n\n.fv-account-content[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n}\n\n.fv-account-content.selected[_ngcontent-%COMP%]   .fv-account-name[_ngcontent-%COMP%] {\n  color: var(--fv-primary);\n  font-weight: 800;\n}\n\n.fv-account-name[_ngcontent-%COMP%], \n.fv-account-balance[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.fv-account-name[_ngcontent-%COMP%] {\n  overflow: hidden;\n  color: #101828;\n  font-size: 15px;\n  font-weight: 700;\n  line-height: 1.3;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.fv-account-balance[_ngcontent-%COMP%] {\n  margin-top: 3px;\n  color: #667085;\n  font-size: 13px;\n  font-weight: 500;\n  font-variant-numeric: tabular-nums;\n}\n\n.fv-account-status[_ngcontent-%COMP%] {\n  display: flex;\n  width: 20px;\n  height: 20px;\n  flex: 0 0 20px;\n  align-items: center;\n  justify-content: center;\n  border: 1.5px solid rgba(67, 97, 238, .2);\n  border-radius: 50%;\n  background: #fff;\n}\n\n.fv-account-status.selected[_ngcontent-%COMP%] {\n  border-color: var(--fv-primary);\n  background: var(--fv-primary);\n}\n\n.fv-check-icon[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 12px;\n}\n\n@media (hover: hover) {\n  .fv-account-item[_ngcontent-%COMP%]:hover {\n    transform: translateY(-1px);\n    border-color: #dbe4ff;\n  }\n}\n\n@media (max-width: 420px) {\n  .fv-account-item[_ngcontent-%COMP%] {\n    min-height: 60px;\n    gap: 12px;\n    padding: 10px 12px;\n  }\n\n  .fv-account-name[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n\n  .fv-account-balance[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccountSelectorModalComponent, [{
        type: Component,
        args: [{ selector: 'app-account-selector-modal', standalone: true, imports: [
                    CommonModule,
                    IonIcon,
                    ItemIconComponent,
                    BaseModalComponent
                ], template: "<app-base-modal\n  [isOpen]=\"isOpen\"\n  [title]=\"selectionMode === AccountSelectionMode.SINGLE ? 'Seleccionar cuenta' : 'Seleccionar cuentas'\"\n  [description]=\"selectionMode === AccountSelectionMode.SINGLE ? 'Elige la cuenta que deseas utilizar.' : 'Selecciona una o varias cuentas para filtrar.'\"\n  [primaryText]=\"selectionMode === AccountSelectionMode.MULTIPLE ? 'Aplicar' : ''\"\n  [primaryDisabled]=\"!canConfirmSelection\"\n  size=\"lg\"\n  (closed)=\"closeModal()\"\n  (primary)=\"confirmSelection()\">\n  <div class=\"fv-account-list\">\n    <button\n      *ngIf=\"selectionMode === AccountSelectionMode.MULTIPLE\"\n      type=\"button\"\n      class=\"fv-account-item fv-all-account\"\n      [class.selected]=\"selectAll\"\n      (click)=\"toggleSelectAll()\">\n      <app-item-icon icon=\"wallet\" color=\"var(--fv-primary)\" variant=\"soft\" [selected]=\"selectAll\"></app-item-icon>\n      <div class=\"fv-account-content\" [class.selected]=\"selectAll\">\n        <span class=\"fv-account-name\">Todas las cuentas</span>\n        <span class=\"fv-account-balance\">Mostrar todas las cuentas</span>\n      </div>\n      <div class=\"fv-account-status\" [class.selected]=\"selectAll\">\n        <ion-icon *ngIf=\"selectAll\" class=\"fv-check-icon\" name=\"checkmark\"></ion-icon>\n      </div>\n    </button>\n\n    <button\n      *ngFor=\"let account of accounts\"\n      type=\"button\"\n      class=\"fv-account-item\"\n      [class.selected]=\"isSelected(account)\"\n      (click)=\"selectAccount(account)\">\n      <app-item-icon\n        [icon]=\"account.icon\"\n        [color]=\"account.color\"\n        variant=\"soft\"\n        [selected]=\"isSelected(account)\">\n      </app-item-icon>\n      <div class=\"fv-account-content\" [class.selected]=\"isSelected(account)\">\n        <span class=\"fv-account-name\">{{ account.name }}</span>\n        <span class=\"fv-account-balance\">S/. {{ +account.amount | number:'1.2-2' }}</span>\n      </div>\n      <div class=\"fv-account-status\" [class.selected]=\"isSelected(account)\">\n        <ion-icon *ngIf=\"isSelected(account)\" class=\"fv-check-icon\" name=\"checkmark\"></ion-icon>\n      </div>\n    </button>\n  </div>\n</app-base-modal>\n", styles: [":host {\n  display: contents;\n}\n\n.fv-account-list {\n  display: flex;\n  min-height: 0;\n  flex-direction: column;\n  gap: 8px;\n  overflow-y: auto;\n  padding: 0 2px 8px;\n}\n\n.fv-account-list::-webkit-scrollbar {\n  width: 4px;\n}\n\n.fv-account-list::-webkit-scrollbar-thumb {\n  border-radius: 999px;\n  background: rgba(67, 97, 238, .18);\n}\n\n.fv-account-item {\n  display: flex;\n  width: 100%;\n  min-height: 64px;\n  align-items: center;\n  gap: 14px;\n  padding: 12px 14px;\n  border: 1px solid #edf1f7;\n  border-radius: 16px;\n  background: #fff;\n  transition: background .18s ease, border-color .18s ease, transform .18s ease;\n}\n\n.fv-account-item:active {\n  transform: scale(.985);\n}\n\n.fv-account-item.selected {\n  border-color: rgba(67, 97, 238, .22);\n  background: linear-gradient(135deg, rgba(67, 97, 238, .08), rgba(67, 97, 238, .03));\n}\n\n.fv-all-account.selected {\n  background: linear-gradient(135deg, rgba(67, 97, 238, .12), rgba(67, 97, 238, .05));\n}\n\n.fv-account-content {\n  min-width: 0;\n  flex: 1;\n}\n\n.fv-account-content.selected .fv-account-name {\n  color: var(--fv-primary);\n  font-weight: 800;\n}\n\n.fv-account-name,\n.fv-account-balance {\n  display: block;\n}\n\n.fv-account-name {\n  overflow: hidden;\n  color: #101828;\n  font-size: 15px;\n  font-weight: 700;\n  line-height: 1.3;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.fv-account-balance {\n  margin-top: 3px;\n  color: #667085;\n  font-size: 13px;\n  font-weight: 500;\n  font-variant-numeric: tabular-nums;\n}\n\n.fv-account-status {\n  display: flex;\n  width: 20px;\n  height: 20px;\n  flex: 0 0 20px;\n  align-items: center;\n  justify-content: center;\n  border: 1.5px solid rgba(67, 97, 238, .2);\n  border-radius: 50%;\n  background: #fff;\n}\n\n.fv-account-status.selected {\n  border-color: var(--fv-primary);\n  background: var(--fv-primary);\n}\n\n.fv-check-icon {\n  color: #fff;\n  font-size: 12px;\n}\n\n@media (hover: hover) {\n  .fv-account-item:hover {\n    transform: translateY(-1px);\n    border-color: #dbe4ff;\n  }\n}\n\n@media (max-width: 420px) {\n  .fv-account-item {\n    min-height: 60px;\n    gap: 12px;\n    padding: 10px 12px;\n  }\n\n  .fv-account-name {\n    font-size: 14px;\n  }\n\n  .fv-account-balance {\n    font-size: 12px;\n  }\n}\n"] }]
    }], null, { isOpen: [{
            type: Input
        }], accounts: [{
            type: Input
        }], selectionMode: [{
            type: Input
        }], selectedAccount: [{
            type: Input
        }], selectedAccounts: [{
            type: Input
        }], accountSelected: [{
            type: Output
        }], accountsSelected: [{
            type: Output
        }], modalClosed: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccountSelectorModalComponent, { className: "AccountSelectorModalComponent", filePath: "src/app/shared/components/account-selector-modal/account-selector-modal.component.ts", lineNumber: 33 }); })();
//# sourceMappingURL=account-selector-modal.component.js.map