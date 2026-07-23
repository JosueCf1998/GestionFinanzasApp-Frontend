import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, Validators, } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { IonContent, IonImg, IonIcon, IonButton, IonItem, IonText, IonInput, IonLabel } from "@ionic/angular/standalone";
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { KEY_MANAGEMENT } from "src/app/core/constants/key-management.constants";
import { validate } from "src/app/core/utils/password-validation.util";
import 'src/app/core/utils/observable-extensions';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/navigation.service";
import * as i2 from "src/app/core/use-cases/users/login-user.usecase";
import * as i3 from "src/app/core/use-cases/users/logout-user.usecase";
import * as i4 from "src/app/core/services/spinnerService.service";
import * as i5 from "src/app/core/services/localManagementService.service";
import * as i6 from "@angular/common";
import * as i7 from "@angular/forms";
function LoginRecurrentPage_app_custom_alert_33_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 24);
    i0.ɵɵlistener("onConfirm", function LoginRecurrentPage_app_custom_alert_33_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showGenericAlert = false); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵproperty("message", "No se pudo completar la acci\u00F3n. Por favor, intenta nuevamente.")("imageUrl", "assets/icon/alert-triangle.svg")("confirmText", "Entendido")("alertSize", "medium")("reverseButtons", true)("showCancel", false);
} }
function LoginRecurrentPage_app_custom_alert_34_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-custom-alert", 24);
    i0.ɵɵlistener("onConfirm", function LoginRecurrentPage_app_custom_alert_34_Template_app_custom_alert_onConfirm_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.showUnauthorizedAlert = false); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.messageError)("imageUrl", "assets/icon/alert-triangle.svg")("confirmText", "Entendido")("alertSize", "medium")("reverseButtons", true)("showCancel", false);
} }
export class LoginRecurrentPage {
    constructor(navService, loginUserUseCase, logoutUserUseCase, loadingService, localManagementService) {
        this.navService = navService;
        this.loginUserUseCase = loginUserUseCase;
        this.logoutUserUseCase = logoutUserUseCase;
        this.loadingService = loadingService;
        this.localManagementService = localManagementService;
        this.showPassword = false;
        this.loginForm = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", [Validators.required]),
        });
        this.showGenericAlert = false;
        this.showUnauthorizedAlert = false;
        this.messageError = '';
        this.email = this.localManagementService.getVariable(KEY_MANAGEMENT.EMAIL) || "";
        this.name = this.localManagementService.getVariable(KEY_MANAGEMENT.NAME) || "";
    }
    ngOnInit() { }
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
                    this.navService.push('/main');
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
        const rawEmail = this.email;
        const rawPassword = this.loginForm.value.password || "";
        const email = rawEmail.trim().toLowerCase().replace(/\s+/g, "");
        const password = rawPassword.trim();
        this.loginForm.patchValue({ email, password }, { emitEvent: false });
        return { email, password };
    }
    validateLoginResponse(data) {
        if (!data.token || data.token.trim().length === 0) {
            return "No se recibió un token válido en el inicio de sesión.";
        }
        if (this.email && this.email.includes(" ")) {
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
    goToChangeUser() {
        this.logoutUserUseCase.logout();
        this.navService.replace('/login');
    }
    static { this.ɵfac = function LoginRecurrentPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginRecurrentPage)(i0.ɵɵdirectiveInject(i1.NavigationService), i0.ɵɵdirectiveInject(i2.LoginUserUseCase), i0.ɵɵdirectiveInject(i3.LogoutUserUseCase), i0.ɵɵdirectiveInject(i4.SpinnerService), i0.ɵɵdirectiveInject(i5.LocalManagementService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginRecurrentPage, selectors: [["app-login-recurrent"]], decls: 35, vars: 8, consts: [["scroll-y", "false", 1, "auth-content", 3, "fullscreen"], [1, "background-curve"], [1, "login-container"], [1, "top-section"], ["fill", "outline", "shape", "round", 1, "switch-account-btn", 3, "click"], ["slot", "start", "src", "assets/icon/user.svg"], [1, "main-content"], [1, "header"], ["src", "assets/image/logo-finvia-white.png", 1, "logo"], [1, "user-avatar"], [1, "text-title", "login-title"], [1, "text-body", "login-subtitle"], [1, "login-form", 3, "formGroup"], ["lines", "none", 1, "form-item"], ["slot", "start", "src", "assets/icon/password.svg"], ["placeholder", "Contrase\u00F1a", "formControlName", "password", "required", "", 3, "type"], ["type", "button", "fill", "clear", "slot", "end", 1, "eye-toggle-btn", 3, "click"], [3, "src"], ["expand", "block", "shape", "round", 1, "login-btn", "text-button", 3, "click"], ["fill", "clear", 1, "forgot-link", 3, "click"], [1, "security-info"], ["src", "assets/icon/shield-security.svg", 1, "security-icon"], [1, "security-text"], ["header", "Error", 3, "message", "imageUrl", "confirmText", "alertSize", "reverseButtons", "showCancel", "onConfirm", 4, "ngIf"], ["header", "Error", 3, "onConfirm", "message", "imageUrl", "confirmText", "alertSize", "reverseButtons", "showCancel"]], template: function LoginRecurrentPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-content", 0);
            i0.ɵɵelement(1, "div", 1);
            i0.ɵɵelementStart(2, "div", 2)(3, "div", 3)(4, "ion-button", 4);
            i0.ɵɵlistener("click", function LoginRecurrentPage_Template_ion_button_click_4_listener() { return ctx.goToChangeUser(); });
            i0.ɵɵelement(5, "ion-icon", 5);
            i0.ɵɵtext(6, " Usar otra cuenta ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 6)(8, "div", 7);
            i0.ɵɵelement(9, "ion-img", 8);
            i0.ɵɵelementStart(10, "div", 9);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "h1", 10);
            i0.ɵɵtext(13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "p", 11);
            i0.ɵɵtext(15, " Ingresa tu contrase\u00F1a para continuar ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "form", 12)(17, "ion-item", 13);
            i0.ɵɵelement(18, "ion-icon", 14)(19, "ion-input", 15);
            i0.ɵɵelementStart(20, "ion-button", 16);
            i0.ɵɵlistener("click", function LoginRecurrentPage_Template_ion_button_click_20_listener() { return ctx.togglePassword(); });
            i0.ɵɵelement(21, "ion-icon", 17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "ion-button", 18);
            i0.ɵɵlistener("click", function LoginRecurrentPage_Template_ion_button_click_22_listener() { return ctx.login(); });
            i0.ɵɵtext(23, " Ingresar ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "ion-button", 19);
            i0.ɵɵlistener("click", function LoginRecurrentPage_Template_ion_button_click_24_listener() { return ctx.forgotPassword(); });
            i0.ɵɵtext(25, " \u00BFOlvidaste tu contrase\u00F1a? ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(26, "div", 20);
            i0.ɵɵelement(27, "ion-icon", 21);
            i0.ɵɵelementStart(28, "div", 22)(29, "h4");
            i0.ɵɵtext(30, " Tu informaci\u00F3n est\u00E1 protegida ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "p");
            i0.ɵɵtext(32, " Aplicamos tecnolog\u00EDas de seguridad para proteger tu informaci\u00F3n. ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(33, LoginRecurrentPage_app_custom_alert_33_Template, 1, 6, "app-custom-alert", 23)(34, LoginRecurrentPage_app_custom_alert_34_Template, 1, 6, "app-custom-alert", 23);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("fullscreen", true);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1(" ", ctx.name ? ctx.name.charAt(0).toUpperCase() : "U", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1(" Hola ", ctx.name || "Usuario", " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formGroup", ctx.loginForm);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("type", ctx.showPassword ? "text" : "password");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("src", ctx.showPassword ? "assets/icon/eye-outline.svg" : "assets/icon/eye-off-outline.svg");
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngIf", ctx.showGenericAlert);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showUnauthorizedAlert);
        } }, dependencies: [IonInput,
            IonItem,
            IonButton,
            IonIcon,
            IonImg,
            IonContent,
            CommonModule, i6.NgIf, ReactiveFormsModule, i7.ɵNgNoValidate, i7.NgControlStatus, i7.NgControlStatusGroup, i7.RequiredValidator, i7.FormGroupDirective, i7.FormControlName, CustomAlertComponent], styles: [".auth-content[_ngcontent-%COMP%] {\n  --background: var(--fv-background);\n\n  position: relative;\n  overflow: hidden;\n\n  \n\n\n\n\n  .background-curve {\n    position: absolute;\n\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 60%;\n\n    background: var(--fv-gradient-primary);\n\n    clip-path: ellipse(\n      100% 60%\n      at 50% 40%\n    );\n\n    z-index: 0;\n  }\n\n  \n\n\n\n\n  .login-container {\n    position: relative;\n    z-index: 1;\n\n    min-height: 100vh;\n\n    display: flex;\n    flex-direction: column;\n\n    max-width: 420px;\n\n    margin: 0 auto;\n\n    padding: 24px 20px 32px;\n  }\n\n  \n\n\n\n\n  .top-section {\n    display: flex;\n    justify-content: flex-end;\n\n    min-height: 56px;\n  }\n\n  .switch-account-btn {\n    margin-top: max(12px, env(safe-area-inset-top));\n\n    --color: #ffffff;\n    --border-color: rgba(255, 255, 255, 0.35);\n    --background: rgba(255, 255, 255, 0.08);\n\n    -webkit-backdrop-filter: blur(12px);\n    backdrop-filter: blur(12px);\n\n    min-height: 42px;\n\n    font-size: 13px;\n    font-weight: 500;\n\n    text-transform: none;\n  }\n\n  \n\n\n\n\n  .main-content {\n    flex: 1;\n\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n\n    padding-bottom: 60px;\n  }\n\n  \n\n\n\n\n  .header {\n    text-align: center;\n  }\n\n  .logo {\n    width: 220px;\n    max-width: 70%;\n\n    margin: 0 auto 20px;\n\n    filter: drop-shadow(\n      0 8px 20px rgba(255, 255, 255, 0.25)\n    );\n  }\n\n  .user-avatar {\n    width: 64px;\n    height: 64px;\n\n    margin: 0 auto 16px;\n\n    border-radius: 50%;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    background: rgba(255, 255, 255, 0.18);\n\n    border: 2px solid rgba(255, 255, 255, 0.25);\n\n    -webkit-backdrop-filter: blur(12px);\n    backdrop-filter: blur(12px);\n\n    color: white;\n\n    font-size: 24px;\n    font-weight: 700;\n\n    box-shadow:\n      0 8px 20px rgba(0, 0, 0, 0.15);\n  }\n\n  .login-title {\n    color: white !important;\n\n    margin: 0 0 8px;\n  }\n\n  .login-subtitle {\n    margin: 0;\n\n    color: rgba(255, 255, 255, 0.9) !important;\n  }\n\n  \n\n\n\n\n  .login-form {\n    width: 100%;\n\n    margin-top: 24px;\n\n    background: white;\n\n    border-radius: 24px;\n\n    padding: 24px;\n\n    box-shadow:\n      0 15px 40px rgba(0, 0, 0, 0.12);\n  }\n\n  \n\n\n\n\n  .form-item {\n    --background: #f8f9fa;\n    --border-radius: 16px;\n\n    --padding-start: 16px;\n    --inner-padding-end: 16px;\n\n    margin-bottom: 18px;\n  }\n\n  .form-item ion-icon {\n    font-size: 20px;\n\n    color: var(--fv-primary-light);\n  }\n\n  .form-item ion-input {\n    font-size: 15px;\n\n    color: var(--fv-text-primary);\n  }\n\n  .eye-toggle-btn {\n    --padding-start: 0;\n    --padding-end: 0;\n\n    margin-inline-start: 0;\n    margin-inline-end: 0;\n  }\n\n  \n\n\n\n\n  .login-btn {\n    --background: var(--fv-gradient-primary);\n\n    --background-activated: var(--fv-primary);\n\n    --box-shadow:\n      0 6px 20px rgba(67, 97, 238, 0.35);\n\n    min-height: 54px;\n\n    font-weight: 600;\n\n    margin-bottom: 8px;\n  }\n\n  .forgot-link {\n    width: 100%;\n\n    --color: var(--fv-primary);\n\n    text-transform: none;\n\n    font-size: 13px;\n  }\n\n  \n\n\n\n\n  .security-info {\n    margin-top: auto;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    gap: 10px;\n\n    text-align: left;\n\n    padding-top: 24px;\n    padding-left: 24px;\n    padding-right: 24px;\n  }\n\n  .security-icon {\n    width: 32px;\n    height: 32px;\n\n    color: var(--fv-primary);\n\n    flex-shrink: 0;\n  }\n\n  .security-text h4 {\n    margin: 0 0 4px;\n\n    font-size: 15px;\n    font-weight: 600;\n\n    color: var(--fv-text-primary);\n  }\n\n  .security-text p {\n    margin: 0;\n\n    font-size: 13px;\n\n    color: var(--fv-text-secondary);\n\n    line-height: 1.4;\n  }\n\n  \n\n\n\n}\n\n\n\n\n\n\n@media (max-height: 700px) {\n\n  .auth-content[_ngcontent-%COMP%] {\n\n    .logo {\n      width: 190px;\n    }\n\n    .user-avatar {\n      width: 56px;\n      height: 56px;\n\n      font-size: 22px;\n    }\n\n    .login-form {\n      margin-top: 18px;\n    }\n\n    .main-content {\n      padding-bottom: 40px;\n    }\n\n    .security-info {\n      padding-top: 16px;\n    }\n  }\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginRecurrentPage, [{
        type: Component,
        args: [{ selector: "app-login-recurrent", standalone: true, imports: [IonLabel,
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
                ], template: "<ion-content\n  [fullscreen]=\"true\"\n  class=\"auth-content\"\n  scroll-y=\"false\">\n\n  <!-- BACKGROUND -->\n\n  <div class=\"background-curve\"></div>\n\n  <!-- CONTAINER -->\n\n  <div class=\"login-container\">\n\n    <!-- TOP ACTIONS -->\n\n    <div class=\"top-section\">\n\n      <ion-button\n        fill=\"outline\"\n        shape=\"round\"\n        class=\"switch-account-btn\"\n        (click)=\"goToChangeUser()\">\n\n        <ion-icon\n          slot=\"start\"\n          src=\"assets/icon/user.svg\">\n        </ion-icon>\n\n        Usar otra cuenta\n\n      </ion-button>\n\n    </div>\n\n    <!-- MAIN CONTENT -->\n\n    <div class=\"main-content\">\n\n      <!-- HEADER -->\n\n      <div class=\"header\">\n\n        <ion-img\n          src=\"assets/image/logo-finvia-white.png\"\n          class=\"logo\">\n        </ion-img>\n\n        <div class=\"user-avatar\">\n          {{ name ? name.charAt(0).toUpperCase() : 'U' }}\n        </div>\n\n        <h1 class=\"text-title login-title\">\n          Hola {{ name || 'Usuario' }}\n        </h1>\n\n        <p class=\"text-body login-subtitle\">\n          Ingresa tu contrase\u00F1a para continuar\n        </p>\n\n      </div>\n\n      <!-- FORM -->\n\n      <form\n        class=\"login-form\"\n        [formGroup]=\"loginForm\">\n\n        <!-- PASSWORD -->\n\n        <ion-item\n          lines=\"none\"\n          class=\"form-item\">\n\n          <ion-icon\n            slot=\"start\"\n            src=\"assets/icon/password.svg\">\n          </ion-icon>\n\n          <ion-input\n            [type]=\"showPassword ? 'text' : 'password'\"\n            placeholder=\"Contrase\u00F1a\"\n            formControlName=\"password\"\n            required>\n          </ion-input>\n\n          <ion-button\n            type=\"button\"\n            fill=\"clear\"\n            slot=\"end\"\n            class=\"eye-toggle-btn\"\n            (click)=\"togglePassword()\">\n\n            <ion-icon\n              [src]=\"showPassword\n                ? 'assets/icon/eye-outline.svg'\n                : 'assets/icon/eye-off-outline.svg'\">\n            </ion-icon>\n\n          </ion-button>\n\n        </ion-item>\n\n        <!-- ACTIONS -->\n\n        <ion-button\n          expand=\"block\"\n          shape=\"round\"\n          class=\"login-btn text-button\"\n          (click)=\"login()\">\n\n          Ingresar\n\n        </ion-button>\n\n        <ion-button\n          fill=\"clear\"\n          class=\"forgot-link\"\n          (click)=\"forgotPassword()\">\n\n          \u00BFOlvidaste tu contrase\u00F1a?\n\n        </ion-button>\n\n      </form>\n\n    </div>\n\n    <!-- SECURITY INFO -->\n\n    <div class=\"security-info\">\n\n      <ion-icon\n        src=\"assets/icon/shield-security.svg\"\n        class=\"security-icon\">\n      </ion-icon>\n\n      <div class=\"security-text\">\n\n        <h4>\n          Tu informaci\u00F3n est\u00E1 protegida\n        </h4>\n\n        <p>\n          Aplicamos tecnolog\u00EDas de seguridad para proteger tu informaci\u00F3n.\n        </p>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <!-- ALERTS -->\n\n  <app-custom-alert\n    *ngIf=\"showGenericAlert\"\n    header=\"Error\"\n    [message]=\"'No se pudo completar la acci\u00F3n. Por favor, intenta nuevamente.'\"\n    [imageUrl]=\"'assets/icon/alert-triangle.svg'\"\n    [confirmText]=\"'Entendido'\"\n    [alertSize]=\"'medium'\"\n    [reverseButtons]=\"true\"\n    [showCancel]=\"false\"\n    (onConfirm)=\"showGenericAlert = false\">\n  </app-custom-alert>\n\n  <app-custom-alert\n    *ngIf=\"showUnauthorizedAlert\"\n    header=\"Error\"\n    [message]=\"messageError\"\n    [imageUrl]=\"'assets/icon/alert-triangle.svg'\"\n    [confirmText]=\"'Entendido'\"\n    [alertSize]=\"'medium'\"\n    [reverseButtons]=\"true\"\n    [showCancel]=\"false\"\n    (onConfirm)=\"showUnauthorizedAlert = false\">\n  </app-custom-alert>\n\n</ion-content>\n", styles: [".auth-content {\n  --background: var(--fv-background);\n\n  position: relative;\n  overflow: hidden;\n\n  /* ==========================\n     BACKGROUND\n     ========================== */\n\n  .background-curve {\n    position: absolute;\n\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 60%;\n\n    background: var(--fv-gradient-primary);\n\n    clip-path: ellipse(\n      100% 60%\n      at 50% 40%\n    );\n\n    z-index: 0;\n  }\n\n  /* ==========================\n     CONTAINER\n     ========================== */\n\n  .login-container {\n    position: relative;\n    z-index: 1;\n\n    min-height: 100vh;\n\n    display: flex;\n    flex-direction: column;\n\n    max-width: 420px;\n\n    margin: 0 auto;\n\n    padding: 24px 20px 32px;\n  }\n\n  /* ==========================\n     TOP ACTIONS\n     ========================== */\n\n  .top-section {\n    display: flex;\n    justify-content: flex-end;\n\n    min-height: 56px;\n  }\n\n  .switch-account-btn {\n    margin-top: max(12px, env(safe-area-inset-top));\n\n    --color: #ffffff;\n    --border-color: rgba(255, 255, 255, 0.35);\n    --background: rgba(255, 255, 255, 0.08);\n\n    -webkit-backdrop-filter: blur(12px);\n    backdrop-filter: blur(12px);\n\n    min-height: 42px;\n\n    font-size: 13px;\n    font-weight: 500;\n\n    text-transform: none;\n  }\n\n  /* ==========================\n     MAIN CONTENT\n     ========================== */\n\n  .main-content {\n    flex: 1;\n\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n\n    padding-bottom: 60px;\n  }\n\n  /* ==========================\n     HEADER\n     ========================== */\n\n  .header {\n    text-align: center;\n  }\n\n  .logo {\n    width: 220px;\n    max-width: 70%;\n\n    margin: 0 auto 20px;\n\n    filter: drop-shadow(\n      0 8px 20px rgba(255, 255, 255, 0.25)\n    );\n  }\n\n  .user-avatar {\n    width: 64px;\n    height: 64px;\n\n    margin: 0 auto 16px;\n\n    border-radius: 50%;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    background: rgba(255, 255, 255, 0.18);\n\n    border: 2px solid rgba(255, 255, 255, 0.25);\n\n    -webkit-backdrop-filter: blur(12px);\n    backdrop-filter: blur(12px);\n\n    color: white;\n\n    font-size: 24px;\n    font-weight: 700;\n\n    box-shadow:\n      0 8px 20px rgba(0, 0, 0, 0.15);\n  }\n\n  .login-title {\n    color: white !important;\n\n    margin: 0 0 8px;\n  }\n\n  .login-subtitle {\n    margin: 0;\n\n    color: rgba(255, 255, 255, 0.9) !important;\n  }\n\n  /* ==========================\n     FORM\n     ========================== */\n\n  .login-form {\n    width: 100%;\n\n    margin-top: 24px;\n\n    background: white;\n\n    border-radius: 24px;\n\n    padding: 24px;\n\n    box-shadow:\n      0 15px 40px rgba(0, 0, 0, 0.12);\n  }\n\n  /* ==========================\n     INPUTS\n     ========================== */\n\n  .form-item {\n    --background: #f8f9fa;\n    --border-radius: 16px;\n\n    --padding-start: 16px;\n    --inner-padding-end: 16px;\n\n    margin-bottom: 18px;\n  }\n\n  .form-item ion-icon {\n    font-size: 20px;\n\n    color: var(--fv-primary-light);\n  }\n\n  .form-item ion-input {\n    font-size: 15px;\n\n    color: var(--fv-text-primary);\n  }\n\n  .eye-toggle-btn {\n    --padding-start: 0;\n    --padding-end: 0;\n\n    margin-inline-start: 0;\n    margin-inline-end: 0;\n  }\n\n  /* ==========================\n     BUTTONS\n     ========================== */\n\n  .login-btn {\n    --background: var(--fv-gradient-primary);\n\n    --background-activated: var(--fv-primary);\n\n    --box-shadow:\n      0 6px 20px rgba(67, 97, 238, 0.35);\n\n    min-height: 54px;\n\n    font-weight: 600;\n\n    margin-bottom: 8px;\n  }\n\n  .forgot-link {\n    width: 100%;\n\n    --color: var(--fv-primary);\n\n    text-transform: none;\n\n    font-size: 13px;\n  }\n\n  /* ==========================\n     SECURITY INFO\n     ========================== */\n\n  .security-info {\n    margin-top: auto;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    gap: 10px;\n\n    text-align: left;\n\n    padding-top: 24px;\n    padding-left: 24px;\n    padding-right: 24px;\n  }\n\n  .security-icon {\n    width: 32px;\n    height: 32px;\n\n    color: var(--fv-primary);\n\n    flex-shrink: 0;\n  }\n\n  .security-text h4 {\n    margin: 0 0 4px;\n\n    font-size: 15px;\n    font-weight: 600;\n\n    color: var(--fv-text-primary);\n  }\n\n  .security-text p {\n    margin: 0;\n\n    font-size: 13px;\n\n    color: var(--fv-text-secondary);\n\n    line-height: 1.4;\n  }\n\n  /* ==========================\n     ALERTS\n     ========================== */\n}\n\n/* ==========================\n   SMALL DEVICES\n   ========================== */\n\n@media (max-height: 700px) {\n\n  .auth-content {\n\n    .logo {\n      width: 190px;\n    }\n\n    .user-avatar {\n      width: 56px;\n      height: 56px;\n\n      font-size: 22px;\n    }\n\n    .login-form {\n      margin-top: 18px;\n    }\n\n    .main-content {\n      padding-bottom: 40px;\n    }\n\n    .security-info {\n      padding-top: 16px;\n    }\n  }\n}\n"] }]
    }], () => [{ type: i1.NavigationService }, { type: i2.LoginUserUseCase }, { type: i3.LogoutUserUseCase }, { type: i4.SpinnerService }, { type: i5.LocalManagementService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginRecurrentPage, { className: "LoginRecurrentPage", filePath: "src/app/features/auth/login-recurrent/login-recurrent.page.ts", lineNumber: 45 }); })();
//# sourceMappingURL=login-recurrent.page.js.map