import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput, IonItem } from '@ionic/angular/standalone';
import * as i0 from "@angular/core";
export class AmountInputComponent {
    constructor() {
        this.placeholder = '0.00';
        this.ariaLabel = 'Monto';
        this.embedded = false;
        this.required = false;
        this.currencyCode = 'PEN';
        this.variant = 'basic';
        this.displayValue = '0.00';
        this.numericValueInCents = 0;
        this._maxDigits = AmountInputComponent.DEFAULT_MAX_DIGITS;
        this._locale = 'es-PE';
        this.numberFormatter = this.createNumberFormatter(this._locale);
        this.isDisabled = false;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    static { this.CONTROL_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab']; }
    static { this.DEFAULT_MAX_DIGITS = 11; }
    static { this.MIN_MAX_DIGITS = 1; }
    static { this.MAX_ALLOWED_DIGITS = 15; }
    set locale(value) {
        const safeLocale = value?.trim() || 'es-PE';
        this._locale = safeLocale;
        this.numberFormatter = this.createNumberFormatter(safeLocale);
        this.syncDisplayFromCents();
    }
    get locale() {
        return this._locale;
    }
    set maxDigits(value) {
        const parsedValue = Number(value);
        const safeDigits = Number.isFinite(parsedValue)
            ? Math.floor(parsedValue)
            : AmountInputComponent.DEFAULT_MAX_DIGITS;
        this._maxDigits = Math.min(Math.max(safeDigits, AmountInputComponent.MIN_MAX_DIGITS), AmountInputComponent.MAX_ALLOWED_DIGITS);
        this.syncDisplayFromCents();
    }
    get maxDigits() {
        return this._maxDigits;
    }
    writeValue(value) {
        const safeValue = value ?? 0;
        if (Number.isNaN(safeValue) || safeValue < 0) {
            this.numericValueInCents = 0;
            this.syncDisplayFromCents();
            return;
        }
        this.numericValueInCents = this.clampCents(Math.round(safeValue * 100));
        this.syncDisplayFromCents();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
    onKeyDown(event) {
        const key = event.key;
        if (event.ctrlKey || event.metaKey || event.altKey) {
            return;
        }
        if (AmountInputComponent.CONTROL_KEYS.includes(key)) {
            if (key === 'Backspace' || key === 'Delete') {
                event.preventDefault();
                this.removeLastDigit();
            }
            return;
        }
        if (/^[0-9]$/.test(key)) {
            event.preventDefault();
            this.appendDigit(parseInt(key, 10));
            return;
        }
        event.preventDefault();
    }
    onAmountInput(event) {
        // Fallback path for mobile keyboards where keydown may not fire consistently.
        const inputEvent = event;
        const inputValue = inputEvent.detail?.value?.toString() ?? '';
        const onlyNumbers = this.sanitizeDigits(inputValue);
        this.updateFromDigits(onlyNumbers);
    }
    onPaste(event) {
        event.preventDefault();
    }
    removeLastDigit() {
        this.numericValueInCents = Math.floor(this.numericValueInCents / 10);
        this.propagateAmountValue();
    }
    markAsTouched() {
        this.onTouched();
    }
    get currencyLabel() {
        return this.currencyCode === 'USD' ? 'USD' : 'S/';
    }
    get inputMode() {
        return 'numeric';
    }
    get isEnhanced() {
        return this.variant === 'enhanced';
    }
    get isCompact() {
        return this.variant === 'compact';
    }
    propagateAmountValue() {
        const amount = this.numericValueInCents / 100;
        this.displayValue = this.formatAmount(this.numericValueInCents);
        this.onChange(amount);
        this.onTouched();
    }
    appendDigit(digit) {
        const nextValue = this.numericValueInCents * 10 + digit;
        const nextDigits = nextValue.toString().length;
        if (nextDigits > this.maxDigits) {
            return;
        }
        this.updateFromCents(nextValue, true);
    }
    updateFromDigits(digits) {
        const nextValue = digits.length > 0 ? parseInt(digits, 10) || 0 : 0;
        this.updateFromCents(nextValue, false);
    }
    sanitizeDigits(value) {
        return value.replace(/[^0-9]/g, '').slice(0, this.maxDigits);
    }
    updateFromCents(valueInCents, forceTouch) {
        const clampedValue = this.clampCents(valueInCents);
        if (clampedValue === this.numericValueInCents) {
            if (forceTouch) {
                this.onTouched();
            }
            return;
        }
        this.numericValueInCents = clampedValue;
        this.propagateAmountValue();
    }
    syncDisplayFromCents() {
        this.numericValueInCents = this.clampCents(this.numericValueInCents);
        this.displayValue = this.formatAmount(this.numericValueInCents);
    }
    formatAmount(valueInCents) {
        return this.numberFormatter.format(valueInCents / 100);
    }
    createNumberFormatter(locale) {
        return new Intl.NumberFormat(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        });
    }
    get maxCents() {
        return Number('9'.repeat(this.maxDigits));
    }
    clampCents(valueInCents) {
        return Math.min(Math.max(valueInCents, 0), this.maxCents);
    }
    static { this.ɵfac = function AmountInputComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AmountInputComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AmountInputComponent, selectors: [["app-amount-input"]], inputs: { placeholder: "placeholder", ariaLabel: "ariaLabel", embedded: "embedded", required: "required", currencyCode: "currencyCode", variant: "variant", locale: "locale", maxDigits: "maxDigits" }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => AmountInputComponent),
                    multi: true,
                },
            ])], decls: 4, vars: 15, consts: [["lines", "none", 1, "amount-input-item"], [1, "currency-label"], ["type", "text", 3, "ionInput", "keydown", "paste", "ionBlur", "inputmode", "value", "placeholder", "required", "disabled"]], template: function AmountInputComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "ion-item", 0)(1, "span", 1);
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "ion-input", 2);
            i0.ɵɵlistener("ionInput", function AmountInputComponent_Template_ion_input_ionInput_3_listener($event) { return ctx.onAmountInput($event); })("keydown", function AmountInputComponent_Template_ion_input_keydown_3_listener($event) { return ctx.onKeyDown($event); })("paste", function AmountInputComponent_Template_ion_input_paste_3_listener($event) { return ctx.onPaste($event); })("ionBlur", function AmountInputComponent_Template_ion_input_ionBlur_3_listener() { return ctx.markAsTouched(); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵclassProp("enhanced", ctx.isEnhanced)("compact", ctx.isCompact)("embedded", ctx.embedded)("is-disabled", ctx.isDisabled);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.currencyLabel);
            i0.ɵɵadvance();
            i0.ɵɵproperty("inputmode", ctx.inputMode)("value", ctx.displayValue)("placeholder", ctx.placeholder)("required", ctx.required)("disabled", ctx.isDisabled);
            i0.ɵɵattribute("aria-label", ctx.ariaLabel);
        } }, dependencies: [IonItem, IonInput], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.amount-input-item[_ngcontent-%COMP%] {\n  --background: var(--amount-input-bg, rgba(255, 255, 255, 0.95));\n  --border-radius: var(--amount-input-border-radius, 16px);\n  --padding-start: var(--amount-input-padding-start, 20px);\n  --padding-end: var(--amount-input-padding-end, 20px);\n  --min-height: var(--amount-input-min-height, 60px);\n  box-shadow: var(--amount-input-shadow, 0 10px 40px rgba(0, 0, 0, 0.2));\n  transition: all 0.3s ease;\n\n  &:focus-within {\n    --background: var(--amount-input-bg-focus, white);\n    box-shadow: var(--amount-input-shadow-focus, 0 15px 50px rgba(0, 0, 0, 0.3));\n    transform: translateY(-2px);\n  }\n\n  ion-input {\n    flex: 1;\n    font-size: var(--amount-input-font-size, 18px);\n    font-weight: var(--amount-input-font-weight, 500);\n    color: var(--amount-input-color, #1a1a1a);\n    --placeholder-color: var(--amount-input-placeholder-color, #94a3b8);\n    --placeholder-opacity: 1;\n  }\n\n  .currency-label {\n    margin-right: 10px;\n    font-size: var(--amount-currency-font-size, 16px);\n    font-weight: var(--amount-currency-font-weight, 700);\n    color: var(--amount-currency-color, #64748b);\n    white-space: nowrap;\n  }\n\n  &.enhanced {\n    --background: var(--amount-enhanced-bg, linear-gradient(135deg, #ffffff 0%, #fafaff 100%));\n    --padding-start: var(--amount-enhanced-padding-x, 16px);\n    --padding-end: var(--amount-enhanced-padding-x, 16px);\n    --min-height: var(--amount-enhanced-min-height, 68px);\n    --inner-padding-start: 0;\n    --inner-padding-end: 0;\n    border-radius: var(--amount-enhanced-radius, 17px);\n    border: 1px solid var(--amount-enhanced-border, #e3e5ee);\n    box-shadow: var(\n      --amount-enhanced-shadow,\n      0 1px 2px rgba(16, 24, 40, 0.05),\n      0 8px 24px rgba(16, 24, 40, 0.06)\n    );\n    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;\n\n    &:focus-within {\n      border-color: var(--amount-enhanced-focus-border, #e3e5ee);\n      box-shadow: var(\n        --amount-enhanced-focus-shadow,\n        0 4px 14px rgba(31, 37, 76, 0.05)\n      );\n      transform: var(--amount-enhanced-focus-transform, none);\n    }\n\n    ion-input {\n      font-size: var(--amount-enhanced-font-size, 26px);\n      font-weight: var(--amount-enhanced-font-weight, 700);\n      color: var(--amount-enhanced-color, #1f2933);\n      text-align: right;\n      letter-spacing: -0.025em;\n      line-height: 1.1;\n      --padding-start: 0;\n      --padding-end: 0;\n      --placeholder-color: var(--amount-enhanced-placeholder-color, #9aa8b3);\n      --placeholder-opacity: 1;\n    }\n\n    .currency-label {\n      margin-right: var(--amount-enhanced-currency-gap, 12px);\n      font-size: var(--amount-enhanced-currency-font-size, 1.02rem);\n      font-weight: var(--amount-enhanced-currency-weight, 700);\n      color: var(--amount-enhanced-currency-color, #3a0ca3);\n      letter-spacing: 0.06em;\n      text-transform: uppercase;\n      min-width: 40px;\n      text-align: center;\n      flex-shrink: 0;\n      padding: 7px 10px;\n      background: var(--amount-enhanced-currency-bg, #e9eeff);\n      border: 1px solid var(--amount-enhanced-currency-border, #c8d4ff);\n      border-radius: 999px;\n      line-height: 1;\n    }\n  }\n\n  &.enhanced.is-disabled {\n    opacity: 0.65;\n    box-shadow: 0 1px 4px rgba(16, 24, 40, 0.04);\n    transform: none;\n  }\n\n  &.enhanced.embedded {\n    --background: transparent;\n    --min-height: 38px;\n    --padding-start: 0;\n    --padding-end: 0;\n    border: 0;\n    border-radius: 0;\n    box-shadow: none;\n\n    ion-input {\n      min-height: 38px;\n    }\n\n    &:focus-within {\n      border: 0;\n      box-shadow: none;\n      transform: none;\n    }\n  }\n\n  &.compact {\n    --background: #fff;\n    --min-height: 38px;\n    --padding-start: 10px;\n    --padding-end: 10px;\n    --inner-padding-start: 0;\n    --inner-padding-end: 0;\n    border: 1px solid #ddd9ef;\n    border-radius: 11px;\n    box-shadow: none;\n    transition: border-color .18s ease, box-shadow .18s ease;\n\n    &:focus-within {\n      --background: #fff;\n      border-color: #c9c3df;\n      box-shadow: 0 0 0 3px rgba(67, 24, 184, .06);\n      transform: none;\n    }\n\n    ion-input {\n      min-height: 34px;\n      color: #252b38;\n      font-size: 13px;\n      font-weight: 700;\n      text-align: right;\n      --padding-start: 0;\n      --padding-end: 0;\n    }\n\n    .currency-label {\n      min-width: auto;\n      margin-right: 7px;\n      padding: 0;\n      background: transparent;\n      color: var(--fv-primary, #4318b8);\n      font-size: 12px;\n      font-weight: 700;\n      letter-spacing: 0;\n      text-transform: none;\n    }\n  }\n}\n\n@media (max-width: 480px) {\n  .amount-input-item.enhanced[_ngcontent-%COMP%] {\n    --min-height: var(--amount-enhanced-mobile-min-height, 72px);\n    --padding-start: var(--amount-enhanced-mobile-padding-x, 14px);\n    --padding-end: var(--amount-enhanced-mobile-padding-x, 14px);\n\n    ion-input {\n      font-size: var(--amount-enhanced-mobile-font-size, 25px);\n    }\n\n    .currency-label {\n      font-size: 0.95rem;\n      padding: 6px 9px;\n    }\n  }\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AmountInputComponent, [{
        type: Component,
        args: [{ selector: 'app-amount-input', standalone: true, imports: [IonItem, IonInput], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AmountInputComponent),
                        multi: true,
                    },
                ], template: "<ion-item\n  lines=\"none\"\n  class=\"amount-input-item\"\n  [class.enhanced]=\"isEnhanced\"\n  [class.compact]=\"isCompact\"\n  [class.embedded]=\"embedded\"\n  [class.is-disabled]=\"isDisabled\">\n  <span class=\"currency-label\">{{ currencyLabel }}</span>\n  <ion-input\n    type=\"text\"\n    [inputmode]=\"inputMode\"\n    [value]=\"displayValue\"\n    [placeholder]=\"placeholder\"\n    [attr.aria-label]=\"ariaLabel\"\n    [required]=\"required\"\n    [disabled]=\"isDisabled\"\n    (ionInput)=\"onAmountInput($event)\"\n    (keydown)=\"onKeyDown($event)\"\n    (paste)=\"onPaste($event)\"\n    (ionBlur)=\"markAsTouched()\">\n  </ion-input>\n</ion-item>\n", styles: [":host {\n  display: block;\n}\n\n.amount-input-item {\n  --background: var(--amount-input-bg, rgba(255, 255, 255, 0.95));\n  --border-radius: var(--amount-input-border-radius, 16px);\n  --padding-start: var(--amount-input-padding-start, 20px);\n  --padding-end: var(--amount-input-padding-end, 20px);\n  --min-height: var(--amount-input-min-height, 60px);\n  box-shadow: var(--amount-input-shadow, 0 10px 40px rgba(0, 0, 0, 0.2));\n  transition: all 0.3s ease;\n\n  &:focus-within {\n    --background: var(--amount-input-bg-focus, white);\n    box-shadow: var(--amount-input-shadow-focus, 0 15px 50px rgba(0, 0, 0, 0.3));\n    transform: translateY(-2px);\n  }\n\n  ion-input {\n    flex: 1;\n    font-size: var(--amount-input-font-size, 18px);\n    font-weight: var(--amount-input-font-weight, 500);\n    color: var(--amount-input-color, #1a1a1a);\n    --placeholder-color: var(--amount-input-placeholder-color, #94a3b8);\n    --placeholder-opacity: 1;\n  }\n\n  .currency-label {\n    margin-right: 10px;\n    font-size: var(--amount-currency-font-size, 16px);\n    font-weight: var(--amount-currency-font-weight, 700);\n    color: var(--amount-currency-color, #64748b);\n    white-space: nowrap;\n  }\n\n  &.enhanced {\n    --background: var(--amount-enhanced-bg, linear-gradient(135deg, #ffffff 0%, #fafaff 100%));\n    --padding-start: var(--amount-enhanced-padding-x, 16px);\n    --padding-end: var(--amount-enhanced-padding-x, 16px);\n    --min-height: var(--amount-enhanced-min-height, 68px);\n    --inner-padding-start: 0;\n    --inner-padding-end: 0;\n    border-radius: var(--amount-enhanced-radius, 17px);\n    border: 1px solid var(--amount-enhanced-border, #e3e5ee);\n    box-shadow: var(\n      --amount-enhanced-shadow,\n      0 1px 2px rgba(16, 24, 40, 0.05),\n      0 8px 24px rgba(16, 24, 40, 0.06)\n    );\n    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;\n\n    &:focus-within {\n      border-color: var(--amount-enhanced-focus-border, #e3e5ee);\n      box-shadow: var(\n        --amount-enhanced-focus-shadow,\n        0 4px 14px rgba(31, 37, 76, 0.05)\n      );\n      transform: var(--amount-enhanced-focus-transform, none);\n    }\n\n    ion-input {\n      font-size: var(--amount-enhanced-font-size, 26px);\n      font-weight: var(--amount-enhanced-font-weight, 700);\n      color: var(--amount-enhanced-color, #1f2933);\n      text-align: right;\n      letter-spacing: -0.025em;\n      line-height: 1.1;\n      --padding-start: 0;\n      --padding-end: 0;\n      --placeholder-color: var(--amount-enhanced-placeholder-color, #9aa8b3);\n      --placeholder-opacity: 1;\n    }\n\n    .currency-label {\n      margin-right: var(--amount-enhanced-currency-gap, 12px);\n      font-size: var(--amount-enhanced-currency-font-size, 1.02rem);\n      font-weight: var(--amount-enhanced-currency-weight, 700);\n      color: var(--amount-enhanced-currency-color, #3a0ca3);\n      letter-spacing: 0.06em;\n      text-transform: uppercase;\n      min-width: 40px;\n      text-align: center;\n      flex-shrink: 0;\n      padding: 7px 10px;\n      background: var(--amount-enhanced-currency-bg, #e9eeff);\n      border: 1px solid var(--amount-enhanced-currency-border, #c8d4ff);\n      border-radius: 999px;\n      line-height: 1;\n    }\n  }\n\n  &.enhanced.is-disabled {\n    opacity: 0.65;\n    box-shadow: 0 1px 4px rgba(16, 24, 40, 0.04);\n    transform: none;\n  }\n\n  &.enhanced.embedded {\n    --background: transparent;\n    --min-height: 38px;\n    --padding-start: 0;\n    --padding-end: 0;\n    border: 0;\n    border-radius: 0;\n    box-shadow: none;\n\n    ion-input {\n      min-height: 38px;\n    }\n\n    &:focus-within {\n      border: 0;\n      box-shadow: none;\n      transform: none;\n    }\n  }\n\n  &.compact {\n    --background: #fff;\n    --min-height: 38px;\n    --padding-start: 10px;\n    --padding-end: 10px;\n    --inner-padding-start: 0;\n    --inner-padding-end: 0;\n    border: 1px solid #ddd9ef;\n    border-radius: 11px;\n    box-shadow: none;\n    transition: border-color .18s ease, box-shadow .18s ease;\n\n    &:focus-within {\n      --background: #fff;\n      border-color: #c9c3df;\n      box-shadow: 0 0 0 3px rgba(67, 24, 184, .06);\n      transform: none;\n    }\n\n    ion-input {\n      min-height: 34px;\n      color: #252b38;\n      font-size: 13px;\n      font-weight: 700;\n      text-align: right;\n      --padding-start: 0;\n      --padding-end: 0;\n    }\n\n    .currency-label {\n      min-width: auto;\n      margin-right: 7px;\n      padding: 0;\n      background: transparent;\n      color: var(--fv-primary, #4318b8);\n      font-size: 12px;\n      font-weight: 700;\n      letter-spacing: 0;\n      text-transform: none;\n    }\n  }\n}\n\n@media (max-width: 480px) {\n  .amount-input-item.enhanced {\n    --min-height: var(--amount-enhanced-mobile-min-height, 72px);\n    --padding-start: var(--amount-enhanced-mobile-padding-x, 14px);\n    --padding-end: var(--amount-enhanced-mobile-padding-x, 14px);\n\n    ion-input {\n      font-size: var(--amount-enhanced-mobile-font-size, 25px);\n    }\n\n    .currency-label {\n      font-size: 0.95rem;\n      padding: 6px 9px;\n    }\n  }\n}\n"] }]
    }], null, { placeholder: [{
            type: Input
        }], ariaLabel: [{
            type: Input
        }], embedded: [{
            type: Input
        }], required: [{
            type: Input
        }], currencyCode: [{
            type: Input
        }], variant: [{
            type: Input
        }], locale: [{
            type: Input
        }], maxDigits: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AmountInputComponent, { className: "AmountInputComponent", filePath: "src/app/shared/components/amount-input/amount-input.component.ts", lineNumber: 23 }); })();
//# sourceMappingURL=amount-input.component.js.map