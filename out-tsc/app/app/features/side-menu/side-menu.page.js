import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonIcon, IonButton, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonContent, IonSplitPane, IonMenu, IonList, IonMenuToggle, IonItem, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KEY_MANAGEMENT } from 'src/app/core/constants/key-management.constants';
import { PageLayoutComponent } from "src/app/shared/components/page-layout/page-layout.component";
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/navigation.service";
import * as i2 from "../../core/services/localManagementService.service";
import * as i3 from "@ionic/angular";
import * as i4 from "@angular/router";
const _c0 = a0 => [a0];
function SideMenuPage_For_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ion-menu-toggle", 11)(1, "ion-item", 19);
    i0.ɵɵelement(2, "ion-icon", 20);
    i0.ɵɵelementStart(3, "ion-label");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const p_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(3, _c0, p_r1.url));
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", "assets/icon/" + p_r1.icon + ".svg");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", p_r1.title, " ");
} }
export class SideMenuPage {
    constructor(navigationService, localManagementService, menuCtrl) {
        this.navigationService = navigationService;
        this.localManagementService = localManagementService;
        this.menuCtrl = menuCtrl;
        // =========================
        // ROUTE
        // =========================
        this.activatedRoute = inject(ActivatedRoute);
        this.folder = '';
        // =========================
        // MENU DATA
        // =========================
        this.appPages = [
            { title: "Inicio", url: "/main/home", icon: "home" },
            { title: "Cuentas", url: "/main/accounts", icon: "money-bag" },
            { title: "Gráficos", url: "/main/graphics", icon: "chart" },
            { title: "Categorías", url: "/main/categories", icon: "category" },
            { title: "Presupuesto", url: "/main/budgets", icon: "wallet" },
            { title: "Transacciones", url: "/main/transactions", icon: "bills" },
        ];
        // =========================
        // USER DATA
        // =========================
        this.email = '';
        this.name = '';
    }
    // =========================
    // INIT
    // =========================
    ngOnInit() {
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
        this.loadUserData();
    }
    loadUserData() {
        this.email =
            this.localManagementService.getVariable(KEY_MANAGEMENT.EMAIL) || '';
        this.name =
            this.localManagementService.getVariable(KEY_MANAGEMENT.NAME) || '';
    }
    // =========================
    // MENU CONTROL (FIX CLAVE)
    // =========================
    async closeMenuIfOpen() {
        const isOpen = await this.menuCtrl.isOpen('main-menu');
        if (isOpen) {
            await this.menuCtrl.close('main-menu');
        }
    }
    // =========================
    // ACTIONS
    // =========================
    logOut() {
        this.navigationService.replace('/splash');
    }
    static { this.ɵfac = function SideMenuPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SideMenuPage)(i0.ɵɵdirectiveInject(i1.NavigationService), i0.ɵɵdirectiveInject(i2.LocalManagementService), i0.ɵɵdirectiveInject(i3.MenuController)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SideMenuPage, selectors: [["app-side-menu"]], decls: 27, vars: 6, consts: [["contentId", "main-content", "when", "false"], ["menuId", "main-menu", "contentId", "main-content", "type", "overlay", 3, "swipeGesture"], [3, "scrollY"], [1, "menu-content"], [1, "menu-header"], [1, "avatar-container"], [1, "avatar"], [1, "user-info"], [1, "user-name"], [1, "user-email"], ["id", "inbox-list"], ["auto-hide", "true"], [1, "menu-footer"], ["lines", "none", "detail", "false", "button", "", 1, "logout-item", 3, "click"], ["slot", "start", "src", "assets/icon/exit.svg"], ["id", "main-content", 1, "ion-page"], [3, "showBack"], ["header-left", "", "menuId", "main-menu"], [1, "router-container"], ["routerDirection", "root", "routerLinkActive", "selected", "lines", "none", "detail", "false", 3, "routerLink"], ["slot", "start", 3, "src"]], template: function SideMenuPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-split-pane", 0)(1, "ion-menu", 1)(2, "ion-content", 2)(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "div", 6);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 7)(9, "ion-label", 8);
            i0.ɵɵtext(10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "ion-label", 9);
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(13, "ion-list", 10);
            i0.ɵɵrepeaterCreate(14, SideMenuPage_For_15_Template, 5, 5, "ion-menu-toggle", 11, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 12)(17, "ion-item", 13);
            i0.ɵɵlistener("click", function SideMenuPage_Template_ion_item_click_17_listener() { return ctx.logOut(); });
            i0.ɵɵelement(18, "ion-icon", 14);
            i0.ɵɵelementStart(19, "ion-label");
            i0.ɵɵtext(20, "Cerrar sesi\u00F3n");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(21, "div", 15)(22, "ion-header")(23, "app-page-layout", 16);
            i0.ɵɵelement(24, "ion-menu-button", 17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 18);
            i0.ɵɵelement(26, "router-outlet");
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("swipeGesture", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("scrollY", true);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", ctx.name ? ctx.name.charAt(0).toUpperCase() : "U", " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.name ? ctx.name.charAt(0).toUpperCase() + ctx.name.slice(1) : "Usuario", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" ", ctx.email || "usuario@ejemplo.com", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.appPages);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("showBack", false);
        } }, dependencies: [IonIcon,
            RouterModule, i4.RouterOutlet, i4.RouterLink, i4.RouterLinkActive, IonHeader,
            IonMenuButton,
            IonContent,
            IonSplitPane,
            IonMenu,
            IonList,
            IonMenuToggle,
            IonItem,
            IonLabel,
            CommonModule,
            PageLayoutComponent], styles: ["\n\n\n\n\nion-split-pane[_ngcontent-%COMP%] {\n  --side-width: 290px;\n  --side-max-width: 290px;\n}\n\n\n\n\n\n\nion-menu[_ngcontent-%COMP%] {\n  --width: 290px;\n  --max-width: 290px;\n\n  box-shadow: 12px 0 40px rgba(0,0,0,.08);\n}\n\n\n\n\n\n\nion-menu[_ngcontent-%COMP%]   ion-content[_ngcontent-%COMP%] {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --background: var(--fv-surface);\n}\n\n\n\n\n\n\n.menu-content[_ngcontent-%COMP%] {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n\n\n\n\n\n.menu-header[_ngcontent-%COMP%] {\n  position: relative;\n\n  display: flex;\n  align-items: center;\n  gap: 14px;\n\n  padding:\n    calc(env(safe-area-inset-top) + 0px)\n    16px\n    18px;\n\n  background: var(--fv-gradient-primary);\n\n  overflow: hidden;\n}\n\n\n\n.menu-header[_ngcontent-%COMP%]::before, \n.menu-header[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  border-radius: 50%;\n  opacity: .06;\n}\n\n.menu-header[_ngcontent-%COMP%]::before {\n  top: -40px;\n  right: -60px;\n  width: 160px;\n  height: 160px;\n  background: #fff;\n}\n\n.menu-header[_ngcontent-%COMP%]::after {\n  left: -50px;\n  bottom: -60px;\n  width: 130px;\n  height: 130px;\n  background: #fff;\n}\n\n\n\n\n\n\n.avatar-container[_ngcontent-%COMP%] {\n  width: 54px;\n  height: 54px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 50%;\n\n  background: rgba(255,255,255,.14);\n  border: 1px solid rgba(255,255,255,.22);\n\n  flex-shrink: 0;\n}\n\n.avatar[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 20px;\n  font-weight: 800;\n}\n\n\n\n\n\n\n.user-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.user-name[_ngcontent-%COMP%] {\n  color: #fff;\n  font-size: 16px;\n  font-weight: 800;\n  line-height: 1.2;\n\n  white-space: normal;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n\n  max-width: 200px;\n}\n\n.user-email[_ngcontent-%COMP%] {\n  color: rgba(255,255,255,.75);\n  font-size: 12px;\n\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n\n  max-width: 200px;\n}\n\n\n\n\n\n\n#inbox-list[_ngcontent-%COMP%] {\n  flex: 1;              \n\n  overflow-y: auto;\n\n  padding: 14px 10px;\n\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n\n\n\n\n\nion-menu[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --background: transparent;\n  --padding-start: 14px;\n  --inner-padding-end: 14px;\n\n  min-height: 52px;\n  border-radius: 14px;\n\n  position: relative;\n}\n\n\n\nion-menu[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]:hover {\n  --background: rgba(99,102,241,.06);\n}\n\n\n\nion-menu[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  color: var(--fv-text-secondary);\n}\n\n\n\nion-menu[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 500;\n  color: var(--fv-text-primary);\n}\n\n\n\n\n\n\nion-menu[_ngcontent-%COMP%]   ion-item.selected[_ngcontent-%COMP%] {\n  --background: rgba(99,102,241,.10);\n}\n\n\n\nion-menu[_ngcontent-%COMP%]   ion-item.selected[_ngcontent-%COMP%]::before {\n  content: '';\n  position: absolute;\n\n  left: 0;\n  top: 10px;\n  bottom: 10px;\n\n  width: 4px;\n  border-radius: 10px;\n\n  background: var(--fv-primary);\n}\n\nion-menu[_ngcontent-%COMP%]   ion-item.selected[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--fv-primary);\n}\n\nion-menu[_ngcontent-%COMP%]   ion-item.selected[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  color: var(--fv-primary);\n  font-weight: 700;\n}\n\n\n\n\n\n\n.menu-footer[_ngcontent-%COMP%] {\n  margin-top: auto;     \n\n  padding: 14px;\n  border-top: 1px solid var(--fv-border);\n}\n\n\n\n.logout-item[_ngcontent-%COMP%] {\n  --background: rgba(239,68,68,.06);\n\n  border-radius: 14px;\n  min-height: 52px;\n}\n\n.logout-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--fv-danger);\n}\n\n.logout-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  color: var(--fv-danger);\n  font-weight: 600;\n}\n\n\n\n\n\n\nion-menu-button[_ngcontent-%COMP%] {\n  --color: #fff;\n\n  width: 42px;\n  height: 42px;\n\n  border-radius: 14px;\n\n  background: rgba(255,255,255,.12);\n}\n\n\n\n\n\n\n#main-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100dvh;\n}\n\n.router-container[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n\n\n\n\n\n\n@media (max-width: 768px) {\n  ion-menu[_ngcontent-%COMP%] {\n    --width: 280px;\n  }\n\n  .menu-header[_ngcontent-%COMP%] {\n    padding:\n      calc(env(safe-area-inset-top) + 0px)\n      14px\n      16px;\n  }\n\n  .avatar-container[_ngcontent-%COMP%] {\n    width: 50px;\n    height: 50px;\n  }\n\n  .avatar[_ngcontent-%COMP%] {\n    font-size: 19px;\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SideMenuPage, [{
        type: Component,
        args: [{ selector: 'app-side-menu', standalone: true, imports: [
                    IonIcon,
                    IonButton,
                    RouterModule,
                    IonHeader,
                    IonToolbar,
                    IonButtons,
                    IonMenuButton,
                    IonContent,
                    IonSplitPane,
                    IonMenu,
                    IonList,
                    IonMenuToggle,
                    IonItem,
                    IonLabel,
                    CommonModule,
                    PageLayoutComponent
                ], template: "<ion-split-pane contentId=\"main-content\" when=\"false\">\n\n  <!-- ================= MENU ================= -->\n\n  <ion-menu\n    menuId=\"main-menu\"\n    contentId=\"main-content\"\n    type=\"overlay\"\n    [swipeGesture]=\"true\">\n\n    <ion-content [scrollY]=\"true\">\n\n      <div class=\"menu-content\">\n\n        <!-- ================= HEADER ================= -->\n\n        <div class=\"menu-header\">\n\n          <div class=\"avatar-container\">\n            <div class=\"avatar\">\n              {{ name ? name.charAt(0).toUpperCase() : 'U' }}\n            </div>\n          </div>\n\n          <div class=\"user-info\">\n\n            <ion-label class=\"user-name\">\n              {{ name ? (name.charAt(0).toUpperCase() + name.slice(1)) : 'Usuario' }}\n            </ion-label>\n\n            <ion-label class=\"user-email\">\n              {{ email || 'usuario@ejemplo.com' }}\n            </ion-label>\n\n          </div>\n\n        </div>\n\n        <!-- ================= ITEMS ================= -->\n\n        <ion-list id=\"inbox-list\">\n\n          @for (p of appPages; track p) {\n\n            <ion-menu-toggle auto-hide=\"true\">\n\n              <ion-item\n                routerDirection=\"root\"\n                [routerLink]=\"[p.url]\"\n                routerLinkActive=\"selected\"\n                lines=\"none\"\n                detail=\"false\">\n\n                <ion-icon\n                  slot=\"start\"\n                  [src]=\"'assets/icon/' + p.icon + '.svg'\">\n                </ion-icon>\n\n                <ion-label>\n                  {{ p.title }}\n                </ion-label>\n\n              </ion-item>\n\n            </ion-menu-toggle>\n\n          }\n\n        </ion-list>\n\n        <!-- ================= FOOTER ================= -->\n\n        <div class=\"menu-footer\">\n\n          <ion-item\n            class=\"logout-item\"\n            lines=\"none\"\n            detail=\"false\"\n            button\n            (click)=\"logOut()\">\n\n            <ion-icon slot=\"start\" src=\"assets/icon/exit.svg\"></ion-icon>\n\n            <ion-label>Cerrar sesi\u00F3n</ion-label>\n\n          </ion-item>\n\n        </div>\n\n      </div>\n\n    </ion-content>\n\n  </ion-menu>\n\n  <!-- ================= MAIN ================= -->\n\n  <div class=\"ion-page\" id=\"main-content\">\n\n    <ion-header>\n\n      <app-page-layout [showBack]=\"false\">\n\n        <ion-menu-button\n          header-left\n          menuId=\"main-menu\">\n        </ion-menu-button>\n\n      </app-page-layout>\n\n    </ion-header>\n\n    <div class=\"router-container\">\n      <router-outlet></router-outlet>\n    </div>\n\n  </div>\n\n</ion-split-pane>\n", styles: ["\n/* ==========================================================\n   SPLIT PANE\n   ========================================================== */\n\nion-split-pane {\n  --side-width: 290px;\n  --side-max-width: 290px;\n}\n\n/* ==========================================================\n   MENU ROOT\n   ========================================================== */\n\nion-menu {\n  --width: 290px;\n  --max-width: 290px;\n\n  box-shadow: 12px 0 40px rgba(0,0,0,.08);\n}\n\n/* ==========================================================\n   CONTENT FIX (CR\u00CDTICO iOS)\n   ========================================================== */\n\nion-menu ion-content {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --background: var(--fv-surface);\n}\n\n/* ==========================================================\n   WRAPPER PRINCIPAL\n   ========================================================== */\n\n.menu-content {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n/* ==========================================================\n   HEADER USER\n   ========================================================== */\n\n.menu-header {\n  position: relative;\n\n  display: flex;\n  align-items: center;\n  gap: 14px;\n\n  padding:\n    calc(env(safe-area-inset-top) + 0px)\n    16px\n    18px;\n\n  background: var(--fv-gradient-primary);\n\n  overflow: hidden;\n}\n\n/* decor blobs */\n.menu-header::before,\n.menu-header::after {\n  content: '';\n  position: absolute;\n  border-radius: 50%;\n  opacity: .06;\n}\n\n.menu-header::before {\n  top: -40px;\n  right: -60px;\n  width: 160px;\n  height: 160px;\n  background: #fff;\n}\n\n.menu-header::after {\n  left: -50px;\n  bottom: -60px;\n  width: 130px;\n  height: 130px;\n  background: #fff;\n}\n\n/* ==========================================================\n   AVATAR\n   ========================================================== */\n\n.avatar-container {\n  width: 54px;\n  height: 54px;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 50%;\n\n  background: rgba(255,255,255,.14);\n  border: 1px solid rgba(255,255,255,.22);\n\n  flex-shrink: 0;\n}\n\n.avatar {\n  color: #fff;\n  font-size: 20px;\n  font-weight: 800;\n}\n\n/* ==========================================================\n   USER INFO (FIX TEXT FLOW)\n   ========================================================== */\n\n.user-info {\n  flex: 1;\n  min-width: 0;\n\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.user-name {\n  color: #fff;\n  font-size: 16px;\n  font-weight: 800;\n  line-height: 1.2;\n\n  white-space: normal;\n  overflow-wrap: anywhere;\n  word-break: break-word;\n\n  max-width: 200px;\n}\n\n.user-email {\n  color: rgba(255,255,255,.75);\n  font-size: 12px;\n\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n\n  max-width: 200px;\n}\n\n/* ==========================================================\n   LIST (OCUPA ESPACIO CENTRAL)\n   ========================================================== */\n\n#inbox-list {\n  flex: 1;              /* \uD83D\uDD25 EMPUJA FOOTER ABAJO */\n  overflow-y: auto;\n\n  padding: 14px 10px;\n\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n/* ==========================================================\n   ITEM BASE\n   ========================================================== */\n\nion-menu ion-item {\n  --background: transparent;\n  --padding-start: 14px;\n  --inner-padding-end: 14px;\n\n  min-height: 52px;\n  border-radius: 14px;\n\n  position: relative;\n}\n\n/* hover */\nion-menu ion-item:hover {\n  --background: rgba(99,102,241,.06);\n}\n\n/* icon */\nion-menu ion-item ion-icon {\n  width: 20px;\n  height: 20px;\n  color: var(--fv-text-secondary);\n}\n\n/* label */\nion-menu ion-item ion-label {\n  font-size: 15px;\n  font-weight: 500;\n  color: var(--fv-text-primary);\n}\n\n/* ==========================================================\n   ACTIVE STATE\n   ========================================================== */\n\nion-menu ion-item.selected {\n  --background: rgba(99,102,241,.10);\n}\n\n/* barra izquierda */\nion-menu ion-item.selected::before {\n  content: '';\n  position: absolute;\n\n  left: 0;\n  top: 10px;\n  bottom: 10px;\n\n  width: 4px;\n  border-radius: 10px;\n\n  background: var(--fv-primary);\n}\n\nion-menu ion-item.selected ion-icon {\n  color: var(--fv-primary);\n}\n\nion-menu ion-item.selected ion-label {\n  color: var(--fv-primary);\n  font-weight: 700;\n}\n\n/* ==========================================================\n   FOOTER (SIEMPRE ABAJO - LOGOUT)\n   ========================================================== */\n\n.menu-footer {\n  margin-top: auto;     /* \uD83D\uDD25 clave */\n  padding: 14px;\n  border-top: 1px solid var(--fv-border);\n}\n\n/* logout button */\n.logout-item {\n  --background: rgba(239,68,68,.06);\n\n  border-radius: 14px;\n  min-height: 52px;\n}\n\n.logout-item ion-icon {\n  color: var(--fv-danger);\n}\n\n.logout-item ion-label {\n  color: var(--fv-danger);\n  font-weight: 600;\n}\n\n/* ==========================================================\n   MENU BUTTON\n   ========================================================== */\n\nion-menu-button {\n  --color: #fff;\n\n  width: 42px;\n  height: 42px;\n\n  border-radius: 14px;\n\n  background: rgba(255,255,255,.12);\n}\n\n/* ==========================================================\n   LAYOUT\n   ========================================================== */\n\n#main-content {\n  display: flex;\n  flex-direction: column;\n  height: 100dvh;\n}\n\n.router-container {\n  position: relative;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n}\n\n/* ==========================================================\n   RESPONSIVE\n   ========================================================== */\n\n@media (max-width: 768px) {\n  ion-menu {\n    --width: 280px;\n  }\n\n  .menu-header {\n    padding:\n      calc(env(safe-area-inset-top) + 0px)\n      14px\n      16px;\n  }\n\n  .avatar-container {\n    width: 50px;\n    height: 50px;\n  }\n\n  .avatar {\n    font-size: 19px;\n  }\n}\n"] }]
    }], () => [{ type: i1.NavigationService }, { type: i2.LocalManagementService }, { type: i3.MenuController }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SideMenuPage, { className: "SideMenuPage", filePath: "src/app/features/side-menu/side-menu.page.ts", lineNumber: 55 }); })();
//# sourceMappingURL=side-menu.page.js.map