import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, Validators, } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { IonContent, IonImg, IonIcon, IonButton, IonItem, IonText, IonInput, } from "@ionic/angular/standalone";
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { validate } from "src/app/core/utils/password-validation.util";
import 'src/app/core/utils/observable-extensions';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/navigation.service";
import * as i2 from "src/app/core/use-cases/users/login-user.usecase";
import * as i3 from "src/app/core/services/spinnerService.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
function LoginPage_app_custom_alert_29_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 22);
    i0.ɵɵlistener("onConfirm", function LoginPage_app_custom_alert_29_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showGenericAlert = false); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("message", "No se pudo completar la acci\u00F3n. Por favor, intenta nuevamente.")("imageUrl", "assets/icon/alert-triangle.svg")("confirmText", "Entendido")("alertSize", "medium")("reverseButtons", true)("showCancel", false);
} }
function LoginPage_app_custom_alert_30_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 22);
    i0.ɵɵlistener("onConfirm", function LoginPage_app_custom_alert_30_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showUnauthorizedAlert = false); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.messageError)("imageUrl", "assets/icon/alert-triangle.svg")("confirmText", "Entendido")("alertSize", "medium")("reverseButtons", true)("showCancel", false);
} }
export class LoginPage {
    constructor(navService, loginUserUseCase, loadingService) {
        this.navService = navService;
        this.loginUserUseCase = loginUserUseCase;
        this.loadingService = loadingService;
        this.showPassword = false;
        this.loginForm = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", [Validators.required]),
        });
        this.showGenericAlert = false;
        this.showUnauthorizedAlert = false;
        this.messageError = '';
    }
    ngOnInit() {
    }
    // MARK: - SERVICIOS
    executeLogin(body) {
        this.loadingService.show();
        this.loginUserUseCase.execute(body).service({
            success: (data) => {
                this.loadingService.hide();
                if (data) {
                    const responseError = this.validateLoginResponse(data);
                    if (responseError) {
                        this.showUnauthorizedAlert = true;
                        this.messageError = responseError;
                        return;
                    }
                    if (data.isFirstTime) {
                        this.navService.push("/welcome-step-one");
                    }
                    else {
                        this.navService.push('/main');
                    }
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
    login() {
        const { email, password } = this.sanitizeCredentials();
        if (!this.validationLogin(email, password)) {
            return;
        }
        const body = {
            email,
            password,
        };
        this.executeLogin(body);
    }
    validationLogin(email, password) {
        // Validar que el formulario tenga valores
        if (this.loginForm.invalid) {
            return this.showValidationError("Ingresa tus credenciales correctamente.");
        }
        // Validar que los campos no estén vacíos después del trim
        if (!email || !password) {
            return this.showValidationError("Por favor completa todos los campos.");
        }
        // Validar formato de email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return this.showValidationError("Por favor ingresa un correo electrónico válido.");
        }
        // Validar que el email no contenga espacios
        if (email.includes(' ')) {
            return this.showValidationError("El correo electrónico no debe contener espacios.");
        }
        // Requerir al menos un carácter especial en la contraseña
        const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?`~]/;
        if (!specialCharRegex.test(password)) {
            return this.showValidationError("La contraseña debe contener al menos un carácter especial (por ejemplo: !@#$%).");
        }
        const passwordError = validate(password);
        if (passwordError) {
            return this.showValidationError(passwordError);
        }
        // Validar longitud máxima razonable
        if (email.length > 254) {
            return this.showValidationError("El correo electrónico excede la longitud permitida.");
        }
        return true;
    }
    sanitizeCredentials() {
        const rawEmail = this.loginForm.value.email || "";
        const rawPassword = this.loginForm.value.password || "";
        const email = rawEmail.trim().toLowerCase().replace(/\s+/g, "");
        const password = rawPassword.trim();
        this.loginForm.patchValue({ email, password }, { emitEvent: false });
        return { email, password };
    }
    validateLoginResponse(data) {
        const email = this.loginForm.value.email || "";
        if (!data.token || data.token.trim().length === 0) {
            return "No se recibió un token válido en el inicio de sesión.";
        }
        if (email && email.includes(" ")) {
            return "El correo del usuario recibido no es válido.";
        }
        return null;
    }
    showValidationError(message) {
        this.showUnauthorizedAlert = true;
        this.messageError = message;
        return false;
    }
    forgotPassword() {
        this.navService.push('/forgot-password');
    }
    goToRegister() {
        this.navService.push('/register');
    }
    static { this.ɵfac = function LoginPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginPage)(i0.ɵɵdirectiveInject(i1.NavigationService), i0.ɵɵdirectiveInject(i2.LoginUserUseCase), i0.ɵɵdirectiveInject(i3.SpinnerService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginPage, selectors: [["app-login"]], decls: 31, vars: 6, consts: [["scroll-y", "false", 1, "auth-content", 3, "fullscreen"], [1, "background-curve"], [1, "login-container"], [1, "header"], ["src", "assets/image/logo-finvia-white.png", 1, "logo"], [1, "text-title", "login-title"], [1, "text-body", "login-subtitle"], [1, "login-form", 3, "formGroup"], ["lines", "none", 1, "form-item"], ["slot", "start", "src", "assets/icon/mail.svg"], ["type", "email", "placeholder", "Correo electr\u00F3nico", "formControlName", "email", "required", ""], ["slot", "start", "src", "assets/icon/password.svg"], ["placeholder", "Contrase\u00F1a", "formControlName", "password", "required", "", 3, "type"], ["type", "button", "fill", "clear", "slot", "end", 1, "eye-toggle-btn", 3, "click"], [3, "src"], [1, "section"], [1, "label-links"], ["expand", "block", "fill", "clear", "size", "small", 1, "forgot-link", 3, "click"], ["expand", "block", "shape", "round", 1, "login-btn", "text-button", 3, "click"], [1, "ion-text-center", "label-links"], [1, "text-caption"], ["header", "", 3, "message", "imageUrl", "confirmText", "alertSize", "reverseButtons", "showCancel", "onConfirm", 4, "ngIf"], ["header", "", 3, "onConfirm", "message", "imageUrl", "confirmText", "alertSize", "reverseButtons", "showCancel"]], template: function LoginPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-content", 0);
            i0.ɵɵelement(1, "div", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "div", 3);
            i0.ɵɵelement(4, "ion-img", 4);
            i0.ɵɵelementStart(5, "h1", 5);
            i0.ɵɵtext(6, " Bienvenido ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 6);
            i0.ɵɵtext(8, " Inicia sesi\u00F3n para continuar ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "form", 7)(10, "ion-item", 8);
            i0.ɵɵelement(11, "ion-icon", 9)(12, "ion-input", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "ion-item", 8);
            i0.ɵɵelement(14, "ion-icon", 11)(15, "ion-input", 12);
            i0.ɵɵelementStart(16, "ion-button", 13);
            i0.ɵɵlistener("click", function LoginPage_Template_ion_button_click_16_listener() { return ctx.togglePassword(); });
            i0.ɵɵelement(17, "ion-icon", 14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "div", 15)(19, "div", 16)(20, "ion-button", 17);
            i0.ɵɵlistener("click", function LoginPage_Template_ion_button_click_20_listener() { return ctx.forgotPassword(); });
            i0.ɵɵtext(21, " \u00BFOlvidaste tu contrase\u00F1a? ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "ion-button", 18);
            i0.ɵɵlistener("click", function LoginPage_Template_ion_button_click_22_listener() { return ctx.login(); });
            i0.ɵɵtext(23, " Iniciar sesi\u00F3n ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "ion-text", 19)(25, "p", 20);
            i0.ɵɵtext(26, " \u00F3 ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "ion-button", 18);
            i0.ɵɵlistener("click", function LoginPage_Template_ion_button_click_27_listener() { return ctx.goToRegister(); });
            i0.ɵɵtext(28, " Crear una cuenta ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(29, LoginPage_app_custom_alert_29_Template, 1, 6, "app-custom-alert", 21)(30, LoginPage_app_custom_alert_30_Template, 1, 6, "app-custom-alert", 21);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("fullscreen", true);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("formGroup", ctx.loginForm);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("type", ctx.showPassword ? "text" : "password");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("src", ctx.showPassword ? "assets/icon/eye-outline.svg" : "assets/icon/eye-off-outline.svg");
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngIf", ctx.showGenericAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showUnauthorizedAlert);
        } }, dependencies: [IonInput,
            IonText,
            IonItem,
            IonButton,
            IonIcon,
            IonImg,
            IonContent,
            CommonModule, i4.NgIf, ReactiveFormsModule, i5.ɵNgNoValidate, i5.NgControlStatus, i5.NgControlStatusGroup, i5.RequiredValidator, i5.FormGroupDirective, i5.FormControlName, CustomAlertComponent], styles: [".auth-content[_ngcontent-%COMP%] {\n  --background: var(--fv-gradient-primary);\n\n  position: relative;\n  overflow: hidden;\n\n  \n\n\n\n\n  .background-curve {\n    position: absolute;\n\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 58%;\n\n    background: var(--fv-gradient-primary);\n\n    clip-path: ellipse(\n      100% 60%\n      at 50% 40%\n    );\n\n    z-index: -1;\n  }\n\n  \n\n\n\n\n  .login-container {\n    min-height: 100vh;\n\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n\n    max-width: 420px;\n\n    margin: 0 auto;\n\n    padding: 20px;\n\n    gap: 28px;\n  }\n\n  \n\n\n\n\n  .header {\n    text-align: center;\n  }\n\n  .logo {\n    width: 280px;\n    max-width: 80%;\n\n    height: auto;\n\n    margin: 0 auto 20px;\n\n    filter: drop-shadow(\n      0 10px 24px rgba(255,255,255,.18)\n    );\n  }\n\n  .login-title {\n    color: white !important;\n\n    margin: 0 0 10px;\n\n    font-size: 28px;\n    font-weight: 700;\n\n    line-height: 1.2;\n  }\n\n  .login-subtitle {\n    color: rgba(255,255,255,.88) !important;\n\n    margin: 0 auto;\n\n    max-width: 280px;\n\n    font-size: 15px;\n\n    line-height: 1.5;\n  }\n\n  \n\n\n\n\n  .login-form {\n    background: white;\n\n    border-radius: 28px;\n\n    padding: 24px;\n\n    box-shadow:\n      0 16px 40px rgba(15,23,42,.08);\n\n    display: flex;\n    flex-direction: column;\n\n    gap: 18px;\n  }\n\n  \n\n\n\n\n  .form-item {\n    --background: #f8fafc;\n\n    --padding-start: 16px;\n    --inner-padding-end: 16px;\n\n    border-radius: 16px;\n\n    border: 1px solid transparent;\n\n    transition: all .25s ease;\n  }\n\n  .form-item:focus-within {\n    --background: #eef2ff;\n\n    border-color: var(--fv-primary-light);\n\n    box-shadow:\n      0 4px 12px rgba(67,97,238,.12);\n  }\n\n  .form-item ion-icon {\n    font-size: 20px;\n\n    color: var(--fv-primary-light);\n  }\n\n  .form-item ion-input {\n    font-size: 15px;\n\n    color: var(--fv-text-primary);\n  }\n\n  .eye-toggle-btn {\n    --padding-start: 0;\n    --padding-end: 0;\n\n    margin-inline-start: 0;\n    margin-inline-end: 0;\n  }\n\n  \n\n\n\n\n  .section {\n    display: flex;\n    flex-direction: column;\n\n    gap: 8px;\n  }\n\n  .label-links {\n    text-align: center;\n  }\n\n  .forgot-link {\n    --color: var(--fv-primary);\n\n    font-size: 13px;\n\n    text-transform: none;\n  }\n\n  .label-links p {\n    color: var(--fv-text-secondary);\n\n    margin: 4px 0;\n  }\n\n  \n\n\n\n\n  .login-btn {\n    --background: var(--fv-gradient-primary);\n\n    --background-hover: var(--fv-gradient-primary);\n\n    --background-activated: var(--fv-primary);\n\n    --border-radius: 16px;\n\n    height: 54px;\n\n    margin-top: 4px;\n\n    font-size: 15px;\n    font-weight: 600;\n\n    letter-spacing: .3px;\n  }\n\n  \n\n\n\n}\n\n\n\n\n\n\n@media (max-height: 700px) {\n\n  .auth-content[_ngcontent-%COMP%] {\n\n    .login-container {\n      justify-content: flex-start;\n\n      padding-top: 48px;\n    }\n\n    .logo {\n      width: 240px;\n    }\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginPage, [{
        type: Component,
        args: [{ selector: "app-login", standalone: true, imports: [
                    IonInput,
                    IonText,
                    IonItem,
                    IonButton,
                    IonIcon,
                    IonImg,
                    IonContent,
                    CommonModule,
                    ReactiveFormsModule,
                    CustomAlertComponent
                ], template: "<ion-content\n  [fullscreen]=\"true\"\n  class=\"auth-content\"\n  scroll-y=\"false\">\n\n  <!-- BACKGROUND -->\n\n  <div class=\"background-curve\"></div>\n\n  <!-- CONTAINER -->\n\n  <div class=\"login-container\">\n\n    <!-- HEADER -->\n\n    <div class=\"header\">\n\n      <ion-img\n        src=\"assets/image/logo-finvia-white.png\"\n        class=\"logo\">\n      </ion-img>\n\n      <h1 class=\"text-title login-title\">\n        Bienvenido\n      </h1>\n\n      <p class=\"text-body login-subtitle\">\n        Inicia sesi\u00F3n para continuar\n      </p>\n\n    </div>\n\n    <!-- FORM -->\n\n    <form\n      class=\"login-form\"\n      [formGroup]=\"loginForm\">\n\n      <!-- EMAIL -->\n\n      <ion-item\n        lines=\"none\"\n        class=\"form-item\">\n\n        <ion-icon\n          slot=\"start\"\n          src=\"assets/icon/mail.svg\">\n        </ion-icon>\n\n        <ion-input\n          type=\"email\"\n          placeholder=\"Correo electr\u00F3nico\"\n          formControlName=\"email\"\n          required>\n        </ion-input>\n\n      </ion-item>\n\n      <!-- PASSWORD -->\n\n      <ion-item\n        lines=\"none\"\n        class=\"form-item\">\n\n        <ion-icon\n          slot=\"start\"\n          src=\"assets/icon/password.svg\">\n        </ion-icon>\n\n        <ion-input\n          [type]=\"showPassword ? 'text' : 'password'\"\n          placeholder=\"Contrase\u00F1a\"\n          formControlName=\"password\"\n          required>\n        </ion-input>\n\n        <ion-button\n          type=\"button\"\n          fill=\"clear\"\n          slot=\"end\"\n          class=\"eye-toggle-btn\"\n          (click)=\"togglePassword()\">\n\n          <ion-icon\n            [src]=\"showPassword\n              ? 'assets/icon/eye-outline.svg'\n              : 'assets/icon/eye-off-outline.svg'\">\n          </ion-icon>\n\n        </ion-button>\n\n      </ion-item>\n\n      <!-- ACTIONS -->\n\n      <div class=\"section\">\n\n        <!-- FORGOT PASSWORD -->\n\n        <div class=\"label-links\">\n\n          <ion-button\n            expand=\"block\"\n            fill=\"clear\"\n            size=\"small\"\n            class=\"forgot-link\"\n            (click)=\"forgotPassword()\">\n\n            \u00BFOlvidaste tu contrase\u00F1a?\n\n          </ion-button>\n\n        </div>\n\n        <!-- LOGIN -->\n\n        <ion-button\n          expand=\"block\"\n          shape=\"round\"\n          class=\"login-btn text-button\"\n          (click)=\"login()\">\n\n          Iniciar sesi\u00F3n\n\n        </ion-button>\n\n        <!-- DIVIDER -->\n\n        <ion-text class=\"ion-text-center label-links\">\n\n          <p class=\"text-caption\">\n            \u00F3\n          </p>\n\n        </ion-text>\n\n        <!-- REGISTER -->\n\n        <ion-button\n          expand=\"block\"\n          shape=\"round\"\n          class=\"login-btn text-button\"\n          (click)=\"goToRegister()\">\n\n          Crear una cuenta\n\n        </ion-button>\n\n      </div>\n\n    </form>\n\n  </div>\n\n  <!-- ALERTS -->\n\n  <app-custom-alert\n    *ngIf=\"showGenericAlert\"\n    header=\"\"\n    [message]=\"'No se pudo completar la acci\u00F3n. Por favor, intenta nuevamente.'\"\n    [imageUrl]=\"'assets/icon/alert-triangle.svg'\"\n    [confirmText]=\"'Entendido'\"\n    [alertSize]=\"'medium'\"\n    [reverseButtons]=\"true\"\n    [showCancel]=\"false\"\n    (onConfirm)=\"showGenericAlert = false\">\n  </app-custom-alert>\n\n  <app-custom-alert\n    *ngIf=\"showUnauthorizedAlert\"\n    header=\"\"\n    [message]=\"messageError\"\n    [imageUrl]=\"'assets/icon/alert-triangle.svg'\"\n    [confirmText]=\"'Entendido'\"\n    [alertSize]=\"'medium'\"\n    [reverseButtons]=\"true\"\n    [showCancel]=\"false\"\n    (onConfirm)=\"showUnauthorizedAlert = false\">\n  </app-custom-alert>\n\n</ion-content>\n", styles: [".auth-content {\n  --background: var(--fv-gradient-primary);\n\n  position: relative;\n  overflow: hidden;\n\n  /* ==========================\n     BACKGROUND\n     ========================== */\n\n  .background-curve {\n    position: absolute;\n\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 58%;\n\n    background: var(--fv-gradient-primary);\n\n    clip-path: ellipse(\n      100% 60%\n      at 50% 40%\n    );\n\n    z-index: -1;\n  }\n\n  /* ==========================\n     CONTAINER\n     ========================== */\n\n  .login-container {\n    min-height: 100vh;\n\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n\n    max-width: 420px;\n\n    margin: 0 auto;\n\n    padding: 20px;\n\n    gap: 28px;\n  }\n\n  /* ==========================\n     HEADER\n     ========================== */\n\n  .header {\n    text-align: center;\n  }\n\n  .logo {\n    width: 280px;\n    max-width: 80%;\n\n    height: auto;\n\n    margin: 0 auto 20px;\n\n    filter: drop-shadow(\n      0 10px 24px rgba(255,255,255,.18)\n    );\n  }\n\n  .login-title {\n    color: white !important;\n\n    margin: 0 0 10px;\n\n    font-size: 28px;\n    font-weight: 700;\n\n    line-height: 1.2;\n  }\n\n  .login-subtitle {\n    color: rgba(255,255,255,.88) !important;\n\n    margin: 0 auto;\n\n    max-width: 280px;\n\n    font-size: 15px;\n\n    line-height: 1.5;\n  }\n\n  /* ==========================\n     FORM\n     ========================== */\n\n  .login-form {\n    background: white;\n\n    border-radius: 28px;\n\n    padding: 24px;\n\n    box-shadow:\n      0 16px 40px rgba(15,23,42,.08);\n\n    display: flex;\n    flex-direction: column;\n\n    gap: 18px;\n  }\n\n  /* ==========================\n     INPUTS\n     ========================== */\n\n  .form-item {\n    --background: #f8fafc;\n\n    --padding-start: 16px;\n    --inner-padding-end: 16px;\n\n    border-radius: 16px;\n\n    border: 1px solid transparent;\n\n    transition: all .25s ease;\n  }\n\n  .form-item:focus-within {\n    --background: #eef2ff;\n\n    border-color: var(--fv-primary-light);\n\n    box-shadow:\n      0 4px 12px rgba(67,97,238,.12);\n  }\n\n  .form-item ion-icon {\n    font-size: 20px;\n\n    color: var(--fv-primary-light);\n  }\n\n  .form-item ion-input {\n    font-size: 15px;\n\n    color: var(--fv-text-primary);\n  }\n\n  .eye-toggle-btn {\n    --padding-start: 0;\n    --padding-end: 0;\n\n    margin-inline-start: 0;\n    margin-inline-end: 0;\n  }\n\n  /* ==========================\n     ACTIONS\n     ========================== */\n\n  .section {\n    display: flex;\n    flex-direction: column;\n\n    gap: 8px;\n  }\n\n  .label-links {\n    text-align: center;\n  }\n\n  .forgot-link {\n    --color: var(--fv-primary);\n\n    font-size: 13px;\n\n    text-transform: none;\n  }\n\n  .label-links p {\n    color: var(--fv-text-secondary);\n\n    margin: 4px 0;\n  }\n\n  /* ==========================\n     BUTTONS\n     ========================== */\n\n  .login-btn {\n    --background: var(--fv-gradient-primary);\n\n    --background-hover: var(--fv-gradient-primary);\n\n    --background-activated: var(--fv-primary);\n\n    --border-radius: 16px;\n\n    height: 54px;\n\n    margin-top: 4px;\n\n    font-size: 15px;\n    font-weight: 600;\n\n    letter-spacing: .3px;\n  }\n\n  /* ==========================\n     ALERTS\n     ========================== */\n}\n\n/* ==========================\n   SMALL DEVICES\n   ========================== */\n\n@media (max-height: 700px) {\n\n  .auth-content {\n\n    .login-container {\n      justify-content: flex-start;\n\n      padding-top: 48px;\n    }\n\n    .logo {\n      width: 240px;\n    }\n  }\n}\n"] }]
    }], () => [{ type: i1.NavigationService }, { type: i2.LoginUserUseCase }, { type: i3.SpinnerService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginPage, { className: "LoginPage", filePath: "src/app/features/auth/login/login.page.ts", lineNumber: 43 }); })();
//# sourceMappingURL=login.page.js.map