import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, Validators, } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { IonContent, IonIcon, IonButton, IonItem, IonInput, } from "@ionic/angular/standalone";
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { validate, validateMatch } from "src/app/core/utils/password-validation.util";
import 'src/app/core/utils/observable-extensions';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/navigation.service";
import * as i2 from "src/app/core/use-cases/users/register-user.usecase";
import * as i3 from "src/app/core/services/spinnerService.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
function RegisterPage_app_custom_alert_34_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 25);
    i0.ɵɵlistener("onConfirm", function RegisterPage_app_custom_alert_34_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleSuccessConfirm()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("message", "Usuario registrado con \u00E9xito.")("imageUrl", "assets/icon/check.svg")("confirmText", "Ir a Login")("alertSize", "medium")("reverseButtons", true)("showCancel", false);
} }
function RegisterPage_app_custom_alert_35_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 26);
    i0.ɵɵlistener("onConfirm", function RegisterPage_app_custom_alert_35_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAlerts()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("message", "No se pudo completar la acci\u00F3n. Por favor, intenta nuevamente.")("imageUrl", "assets/icon/alert-triangle.svg")("confirmText", "Entendido")("alertSize", "medium")("reverseButtons", true)("showCancel", false);
} }
function RegisterPage_app_custom_alert_36_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 26);
    i0.ɵɵlistener("onConfirm", function RegisterPage_app_custom_alert_36_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeAlerts()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.messageError)("imageUrl", "assets/icon/alert-triangle.svg")("confirmText", "Entendido")("alertSize", "medium")("reverseButtons", true)("showCancel", false);
} }
export class RegisterPage {
    constructor(navService, registerUserUseCase, loadingService) {
        this.navService = navService;
        this.registerUserUseCase = registerUserUseCase;
        this.loadingService = loadingService;
        this.registerForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
            lastName: new FormControl("", [Validators.required]),
            email: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", [Validators.required]),
            repeatPassword: new FormControl("", [Validators.required]),
        });
        this.showPassword = false;
        this.showRepeatPassword = false;
        this.showSuccessAlert = false;
        this.showGenericAlert = false;
        this.showUnauthorizedAlert = false;
        this.messageError = '';
    }
    // MARK: - SERVICES
    executeRegister(body) {
        this.loadingService.show();
        this.registerUserUseCase.createUser(body).service({
            success: (data) => {
                this.loadingService.hide();
                if (data) {
                    this.showSuccessAlert = true;
                }
                else {
                    this.showGenericAlert = true;
                }
            },
            failure: (error) => {
                this.loadingService.hide();
                if (error) {
                    this.showUnauthorizedAlert = true;
                    this.messageError = error.message;
                }
                else {
                    this.showGenericAlert = true;
                }
            }
        });
    }
    // MARK: - FUNCTIONS
    togglePassword() {
        this.showPassword = !this.showPassword;
    }
    toggleRepeatPassword() {
        this.showRepeatPassword = !this.showRepeatPassword;
    }
    goBack() {
        this.navService.back();
    }
    handleRegister() {
        if (this.registerForm.invalid) {
            this.showUnauthorizedAlert = true;
            this.messageError = "Ingresa tus credenciales correctamente.";
            return;
        }
        const password = this.registerForm.value.password || "";
        const repeatPassword = this.registerForm.value.repeatPassword || "";
        const passwordError = validate(password);
        if (passwordError) {
            this.showUnauthorizedAlert = true;
            this.messageError = passwordError;
            return;
        }
        const matchError = validateMatch(password, repeatPassword);
        if (matchError) {
            this.showUnauthorizedAlert = true;
            this.messageError = matchError;
            return;
        }
        const body = {
            name: this.registerForm.value.name,
            lastName: this.registerForm.value.lastName,
            email: this.registerForm.value.email,
            password: password,
        };
        this.executeRegister(body);
    }
    async handleSuccessConfirm() {
        this.showSuccessAlert = false;
        await this.navService.replace('/login');
    }
    closeAlerts() {
        this.showGenericAlert = false;
        this.showUnauthorizedAlert = false;
    }
    static { this.ɵfac = function RegisterPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RegisterPage)(i0.ɵɵdirectiveInject(i1.NavigationService), i0.ɵɵdirectiveInject(i2.RegisterUserUseCase), i0.ɵɵdirectiveInject(i3.SpinnerService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RegisterPage, selectors: [["app-register"]], decls: 37, vars: 9, consts: [["scroll-y", "false", 1, "auth-content", 3, "fullscreen"], [1, "background-curve"], [1, "back-icon", 3, "click"], ["src", "assets/icon/left.svg", 1, "icon"], [1, "register-container"], [1, "header-section"], [1, "icon-wrapper"], ["src", "assets/icon/user-plus.svg", 1, "main-icon"], [1, "text-title", "register-title"], [1, "text-body", "register-subtitle"], [1, "register-form", 3, "formGroup"], ["lines", "none", 1, "form-item"], ["slot", "start", "src", "assets/icon/user.svg"], ["type", "text", "placeholder", "Nombres", "formControlName", "name", "required", ""], ["type", "text", "placeholder", "Apellidos", "formControlName", "lastName", "required", ""], ["slot", "start", "src", "assets/icon/mail.svg"], ["type", "email", "placeholder", "Correo electr\u00F3nico", "formControlName", "email", "required", ""], ["slot", "start", "src", "assets/icon/password.svg"], ["placeholder", "Contrase\u00F1a", "formControlName", "password", "required", "", 3, "type"], ["fill", "clear", "slot", "end", 1, "eye-toggle-btn", 3, "click"], [3, "src"], ["placeholder", "Repite la Contrase\u00F1a", "formControlName", "repeatPassword", "required", "", 3, "type"], ["expand", "block", "shape", "round", 1, "register-btn", "text-button", 3, "click"], ["header", "\u00C9xito", 3, "message", "imageUrl", "confirmText", "alertSize", "reverseButtons", "showCancel", "onConfirm", 4, "ngIf"], ["header", "Error", 3, "message", "imageUrl", "confirmText", "alertSize", "reverseButtons", "showCancel", "onConfirm", 4, "ngIf"], ["header", "\u00C9xito", 3, "onConfirm", "message", "imageUrl", "confirmText", "alertSize", "reverseButtons", "showCancel"], ["header", "Error", 3, "onConfirm", "message", "imageUrl", "confirmText", "alertSize", "reverseButtons", "showCancel"]], template: function RegisterPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-content", 0);
            i0.ɵɵelement(1, "div", 1);
            i0.ɵɵelementStart(2, "div", 2);
            i0.ɵɵlistener("click", function RegisterPage_Template_div_click_2_listener() { return ctx.goBack(); });
            i0.ɵɵelement(3, "ion-icon", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 4)(5, "div", 5)(6, "div", 6);
            i0.ɵɵelement(7, "ion-icon", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "h1", 8);
            i0.ɵɵtext(9, " Crea tu Cuenta ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 9);
            i0.ɵɵtext(11, " Completa los siguientes datos ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "form", 10)(13, "ion-item", 11);
            i0.ɵɵelement(14, "ion-icon", 12)(15, "ion-input", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "ion-item", 11);
            i0.ɵɵelement(17, "ion-icon", 12)(18, "ion-input", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "ion-item", 11);
            i0.ɵɵelement(20, "ion-icon", 15)(21, "ion-input", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "ion-item", 11);
            i0.ɵɵelement(23, "ion-icon", 17)(24, "ion-input", 18);
            i0.ɵɵelementStart(25, "ion-button", 19);
            i0.ɵɵlistener("click", function RegisterPage_Template_ion_button_click_25_listener() { return ctx.togglePassword(); });
            i0.ɵɵelement(26, "ion-icon", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "ion-item", 11);
            i0.ɵɵelement(28, "ion-icon", 17)(29, "ion-input", 21);
            i0.ɵɵelementStart(30, "ion-button", 19);
            i0.ɵɵlistener("click", function RegisterPage_Template_ion_button_click_30_listener() { return ctx.toggleRepeatPassword(); });
            i0.ɵɵelement(31, "ion-icon", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "ion-button", 22);
            i0.ɵɵlistener("click", function RegisterPage_Template_ion_button_click_32_listener() { return ctx.handleRegister(); });
            i0.ɵɵtext(33, " Crear Cuenta ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(34, RegisterPage_app_custom_alert_34_Template, 1, 6, "app-custom-alert", 23)(35, RegisterPage_app_custom_alert_35_Template, 1, 6, "app-custom-alert", 24)(36, RegisterPage_app_custom_alert_36_Template, 1, 6, "app-custom-alert", 24);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("fullscreen", true);
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("formGroup", ctx.registerForm);
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("type", ctx.showPassword ? "text" : "password");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("src", ctx.showPassword ? "assets/icon/eye-outline.svg" : "assets/icon/eye-off-outline.svg");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("type", ctx.showRepeatPassword ? "text" : "password");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("src", ctx.showRepeatPassword ? "assets/icon/eye-outline.svg" : "assets/icon/eye-off-outline.svg");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.showSuccessAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showGenericAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showUnauthorizedAlert);
        } }, dependencies: [CommonModule, i4.NgIf, ReactiveFormsModule, i5.ɵNgNoValidate, i5.NgControlStatus, i5.NgControlStatusGroup, i5.RequiredValidator, i5.FormGroupDirective, i5.FormControlName, IonContent,
            IonIcon,
            IonButton,
            IonItem,
            IonInput,
            CustomAlertComponent], styles: [".auth-content[_ngcontent-%COMP%] {\n  --background: var(--fv-background);\n\n  position: relative;\n  overflow: hidden;\n\n  \n\n\n\n\n  .background-curve {\n    position: absolute;\n\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 60%;\n\n    background: var(--fv-gradient-primary);\n\n    clip-path: ellipse(\n      100% 60%\n      at 50% 40%\n    );\n\n    z-index: 0;\n  }\n\n  \n\n\n\n\n  .back-icon {\n    position: absolute;\n\n    top: max(20px, env(safe-area-inset-top));\n    left: 8px;\n\n    width: 48px;\n    height: 48px;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    z-index: 10;\n\n    cursor: pointer;\n\n    .icon {\n      width: 26px;\n      height: 26px;\n\n      color: white;\n    }\n  }\n\n  \n\n\n\n\n  .register-container {\n    position: relative;\n    z-index: 1;\n\n    min-height: 100vh;\n\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n\n    max-width: 420px;\n\n    margin: 0 auto;\n\n    padding: 32px 20px;\n    padding-bottom: 64px;\n\n    gap: 24px;\n  }\n\n  \n\n\n\n\n  .header-section {\n    text-align: center;\n  }\n\n  .icon-wrapper {\n    width: 88px;\n    height: 88px;\n\n    background: white;\n\n    border-radius: 50%;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    margin: 0 auto 20px;\n\n    box-shadow:\n      0 10px 24px rgba(58, 12, 163, .18);\n  }\n\n  .main-icon {\n    font-size: 42px;\n\n    color: var(--fv-primary-light);\n  }\n\n  .register-title {\n    margin-bottom: 8px;\n\n    color: white !important;\n\n    text-shadow:\n      0 3px 8px rgba(0, 0, 0, .15);\n  }\n\n  .register-subtitle {\n    margin: 0;\n\n    color: rgba(255, 255, 255, .9) !important;\n\n    text-shadow:\n      0 2px 6px rgba(0, 0, 0, .1);\n  }\n\n  \n\n\n\n\n  .register-form {\n    background: white;\n\n    border-radius: 28px;\n\n    padding: 24px;\n\n    box-shadow:\n      0 16px 40px rgba(15, 23, 42, .08);\n\n    display: flex;\n    flex-direction: column;\n\n    gap: 18px;\n  }\n\n  \n\n\n\n\n  .form-item {\n    --background: #f8fafc;\n\n    --padding-start: 16px;\n    --inner-padding-end: 16px;\n\n    border-radius: 16px;\n\n    border: 1px solid transparent;\n\n    transition: all .25s ease;\n  }\n\n  .form-item:focus-within {\n    --background: #eef2ff;\n\n    border-color: var(--fv-primary-light);\n\n    box-shadow:\n      0 4px 12px rgba(67, 97, 238, .12);\n  }\n\n  .form-item ion-icon {\n    font-size: 20px;\n\n    color: var(--fv-text-primary);\n  }\n\n  .form-item ion-input {\n    color: var(--fv-text-primary);\n\n    font-size: 15px;\n  }\n\n  .eye-toggle-btn {\n    --padding-start: 0;\n    --padding-end: 0;\n\n    margin-inline-start: 0;\n    margin-inline-end: 0;\n  }\n\n  .eye-toggle-btn ion-icon {\n    color: var(--fv-text-primary);\n  }\n\n  \n\n\n\n\n  .register-btn {\n    --background: var(--fv-gradient-primary);\n\n    --background-hover: var(--fv-gradient-primary);\n\n    --background-activated: var(--fv-primary);\n\n    --border-radius: 16px;\n\n    height: 54px;\n\n    margin-top: 8px;\n\n    box-shadow:\n      0 6px 20px rgba(67, 97, 238, .35);\n\n    transition: transform .2s ease;\n  }\n\n  .register-btn:active {\n    transform: scale(.98);\n  }\n}\n\n\n\n\n\n\n@media (max-height: 700px) {\n\n  .auth-content[_ngcontent-%COMP%] {\n\n    .register-container {\n      justify-content: flex-start;\n\n      padding-top: 72px;\n    }\n\n    .icon-wrapper {\n      width: 76px;\n      height: 76px;\n    }\n\n    .main-icon {\n      font-size: 36px;\n    }\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RegisterPage, [{
        type: Component,
        args: [{ selector: 'app-register', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    IonContent,
                    IonIcon,
                    IonButton,
                    IonItem,
                    IonInput,
                    CustomAlertComponent
                ], template: "<ion-content\n  [fullscreen]=\"true\"\n  class=\"auth-content\"\n  scroll-y=\"false\">\n\n  <div class=\"background-curve\"></div>\n\n  <!-- BACK BUTTON -->\n\n  <div\n    class=\"back-icon\"\n    (click)=\"goBack()\">\n\n    <ion-icon\n      class=\"icon\"\n      src=\"assets/icon/left.svg\">\n    </ion-icon>\n\n  </div>\n\n  <!-- CONTAINER -->\n\n  <div class=\"register-container\">\n\n    <!-- HEADER -->\n\n    <div class=\"header-section\">\n\n      <div class=\"icon-wrapper\">\n\n        <ion-icon\n          src=\"assets/icon/user-plus.svg\"\n          class=\"main-icon\">\n        </ion-icon>\n\n      </div>\n\n      <h1 class=\"text-title register-title\">\n        Crea tu Cuenta\n      </h1>\n\n      <p class=\"text-body register-subtitle\">\n        Completa los siguientes datos\n      </p>\n\n    </div>\n\n    <!-- FORM -->\n\n    <form\n      class=\"register-form\"\n      [formGroup]=\"registerForm\">\n\n      <!-- NOMBRE -->\n\n      <ion-item\n        lines=\"none\"\n        class=\"form-item\">\n\n        <ion-icon\n          slot=\"start\"\n          src=\"assets/icon/user.svg\">\n        </ion-icon>\n\n        <ion-input\n          type=\"text\"\n          placeholder=\"Nombres\"\n          formControlName=\"name\"\n          required>\n        </ion-input>\n\n      </ion-item>\n\n      <!-- APELLIDO -->\n\n      <ion-item\n        lines=\"none\"\n        class=\"form-item\">\n\n        <ion-icon\n          slot=\"start\"\n          src=\"assets/icon/user.svg\">\n        </ion-icon>\n\n        <ion-input\n          type=\"text\"\n          placeholder=\"Apellidos\"\n          formControlName=\"lastName\"\n          required>\n        </ion-input>\n\n      </ion-item>\n\n      <!-- EMAIL -->\n\n      <ion-item\n        lines=\"none\"\n        class=\"form-item\">\n\n        <ion-icon\n          slot=\"start\"\n          src=\"assets/icon/mail.svg\">\n        </ion-icon>\n\n        <ion-input\n          type=\"email\"\n          placeholder=\"Correo electr\u00F3nico\"\n          formControlName=\"email\"\n          required>\n        </ion-input>\n\n      </ion-item>\n\n      <!-- PASSWORD -->\n\n      <ion-item\n        lines=\"none\"\n        class=\"form-item\">\n\n        <ion-icon\n          slot=\"start\"\n          src=\"assets/icon/password.svg\">\n        </ion-icon>\n\n        <ion-input\n          [type]=\"showPassword ? 'text' : 'password'\"\n          placeholder=\"Contrase\u00F1a\"\n          formControlName=\"password\"\n          required>\n        </ion-input>\n\n        <ion-button\n          fill=\"clear\"\n          slot=\"end\"\n          class=\"eye-toggle-btn\"\n          (click)=\"togglePassword()\">\n\n          <ion-icon\n            [src]=\"showPassword\n              ? 'assets/icon/eye-outline.svg'\n              : 'assets/icon/eye-off-outline.svg'\">\n          </ion-icon>\n\n        </ion-button>\n\n      </ion-item>\n\n      <!-- REPEAT PASSWORD -->\n\n      <ion-item\n        lines=\"none\"\n        class=\"form-item\">\n\n        <ion-icon\n          slot=\"start\"\n          src=\"assets/icon/password.svg\">\n        </ion-icon>\n\n        <ion-input\n          [type]=\"showRepeatPassword ? 'text' : 'password'\"\n          placeholder=\"Repite la Contrase\u00F1a\"\n          formControlName=\"repeatPassword\"\n          required>\n        </ion-input>\n\n        <ion-button\n          fill=\"clear\"\n          slot=\"end\"\n          class=\"eye-toggle-btn\"\n          (click)=\"toggleRepeatPassword()\">\n\n          <ion-icon\n            [src]=\"showRepeatPassword\n              ? 'assets/icon/eye-outline.svg'\n              : 'assets/icon/eye-off-outline.svg'\">\n          </ion-icon>\n\n        </ion-button>\n\n      </ion-item>\n\n      <!-- SUBMIT -->\n\n      <ion-button\n        expand=\"block\"\n        shape=\"round\"\n        class=\"register-btn text-button\"\n        (click)=\"handleRegister()\">\n\n        Crear Cuenta\n\n      </ion-button>\n\n    </form>\n\n  </div>\n\n  <!-- SUCCESS ALERT -->\n\n  <app-custom-alert\n    *ngIf=\"showSuccessAlert\"\n    header=\"\u00C9xito\"\n    [message]=\"'Usuario registrado con \u00E9xito.'\"\n    [imageUrl]=\"'assets/icon/check.svg'\"\n    [confirmText]=\"'Ir a Login'\"\n    [alertSize]=\"'medium'\"\n    [reverseButtons]=\"true\"\n    [showCancel]=\"false\"\n    (onConfirm)=\"handleSuccessConfirm()\">\n  </app-custom-alert>\n\n  <!-- GENERIC ERROR -->\n\n  <app-custom-alert\n    *ngIf=\"showGenericAlert\"\n    header=\"Error\"\n    [message]=\"'No se pudo completar la acci\u00F3n. Por favor, intenta nuevamente.'\"\n    [imageUrl]=\"'assets/icon/alert-triangle.svg'\"\n    [confirmText]=\"'Entendido'\"\n    [alertSize]=\"'medium'\"\n    [reverseButtons]=\"true\"\n    [showCancel]=\"false\"\n    (onConfirm)=\"closeAlerts()\">\n  </app-custom-alert>\n\n  <!-- UNAUTHORIZED ERROR -->\n\n  <app-custom-alert\n    *ngIf=\"showUnauthorizedAlert\"\n    header=\"Error\"\n    [message]=\"messageError\"\n    [imageUrl]=\"'assets/icon/alert-triangle.svg'\"\n    [confirmText]=\"'Entendido'\"\n    [alertSize]=\"'medium'\"\n    [reverseButtons]=\"true\"\n    [showCancel]=\"false\"\n    (onConfirm)=\"closeAlerts()\">\n  </app-custom-alert>\n\n</ion-content>\n", styles: [".auth-content {\n  --background: var(--fv-background);\n\n  position: relative;\n  overflow: hidden;\n\n  /* ==========================\n     BACKGROUND\n     ========================== */\n\n  .background-curve {\n    position: absolute;\n\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 60%;\n\n    background: var(--fv-gradient-primary);\n\n    clip-path: ellipse(\n      100% 60%\n      at 50% 40%\n    );\n\n    z-index: 0;\n  }\n\n  /* ==========================\n     BACK BUTTON\n     ========================== */\n\n  .back-icon {\n    position: absolute;\n\n    top: max(20px, env(safe-area-inset-top));\n    left: 8px;\n\n    width: 48px;\n    height: 48px;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    z-index: 10;\n\n    cursor: pointer;\n\n    .icon {\n      width: 26px;\n      height: 26px;\n\n      color: white;\n    }\n  }\n\n  /* ==========================\n     CONTAINER\n     ========================== */\n\n  .register-container {\n    position: relative;\n    z-index: 1;\n\n    min-height: 100vh;\n\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n\n    max-width: 420px;\n\n    margin: 0 auto;\n\n    padding: 32px 20px;\n    padding-bottom: 64px;\n\n    gap: 24px;\n  }\n\n  /* ==========================\n     HEADER\n     ========================== */\n\n  .header-section {\n    text-align: center;\n  }\n\n  .icon-wrapper {\n    width: 88px;\n    height: 88px;\n\n    background: white;\n\n    border-radius: 50%;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    margin: 0 auto 20px;\n\n    box-shadow:\n      0 10px 24px rgba(58, 12, 163, .18);\n  }\n\n  .main-icon {\n    font-size: 42px;\n\n    color: var(--fv-primary-light);\n  }\n\n  .register-title {\n    margin-bottom: 8px;\n\n    color: white !important;\n\n    text-shadow:\n      0 3px 8px rgba(0, 0, 0, .15);\n  }\n\n  .register-subtitle {\n    margin: 0;\n\n    color: rgba(255, 255, 255, .9) !important;\n\n    text-shadow:\n      0 2px 6px rgba(0, 0, 0, .1);\n  }\n\n  /* ==========================\n     FORM CARD\n     ========================== */\n\n  .register-form {\n    background: white;\n\n    border-radius: 28px;\n\n    padding: 24px;\n\n    box-shadow:\n      0 16px 40px rgba(15, 23, 42, .08);\n\n    display: flex;\n    flex-direction: column;\n\n    gap: 18px;\n  }\n\n  /* ==========================\n     INPUTS\n     ========================== */\n\n  .form-item {\n    --background: #f8fafc;\n\n    --padding-start: 16px;\n    --inner-padding-end: 16px;\n\n    border-radius: 16px;\n\n    border: 1px solid transparent;\n\n    transition: all .25s ease;\n  }\n\n  .form-item:focus-within {\n    --background: #eef2ff;\n\n    border-color: var(--fv-primary-light);\n\n    box-shadow:\n      0 4px 12px rgba(67, 97, 238, .12);\n  }\n\n  .form-item ion-icon {\n    font-size: 20px;\n\n    color: var(--fv-text-primary);\n  }\n\n  .form-item ion-input {\n    color: var(--fv-text-primary);\n\n    font-size: 15px;\n  }\n\n  .eye-toggle-btn {\n    --padding-start: 0;\n    --padding-end: 0;\n\n    margin-inline-start: 0;\n    margin-inline-end: 0;\n  }\n\n  .eye-toggle-btn ion-icon {\n    color: var(--fv-text-primary);\n  }\n\n  /* ==========================\n     BUTTON\n     ========================== */\n\n  .register-btn {\n    --background: var(--fv-gradient-primary);\n\n    --background-hover: var(--fv-gradient-primary);\n\n    --background-activated: var(--fv-primary);\n\n    --border-radius: 16px;\n\n    height: 54px;\n\n    margin-top: 8px;\n\n    box-shadow:\n      0 6px 20px rgba(67, 97, 238, .35);\n\n    transition: transform .2s ease;\n  }\n\n  .register-btn:active {\n    transform: scale(.98);\n  }\n}\n\n/* ==========================\n   SMALL DEVICES\n   ========================== */\n\n@media (max-height: 700px) {\n\n  .auth-content {\n\n    .register-container {\n      justify-content: flex-start;\n\n      padding-top: 72px;\n    }\n\n    .icon-wrapper {\n      width: 76px;\n      height: 76px;\n    }\n\n    .main-icon {\n      font-size: 36px;\n    }\n  }\n}\n"] }]
    }], () => [{ type: i1.NavigationService }, { type: i2.RegisterUserUseCase }, { type: i3.SpinnerService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RegisterPage, { className: "RegisterPage", filePath: "src/app/features/auth/register/register.page.ts", lineNumber: 42 }); })();
//# sourceMappingURL=register.page.js.map