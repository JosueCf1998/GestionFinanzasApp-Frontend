import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput, IonTextarea } from '@ionic/angular/standalone';
import * as i0 from "@angular/core";
function TextFieldComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ion-textarea", 4);
    i0.ɵɵlistener("ionInput", function TextFieldComponent_Conditional_1_Template_ion_textarea_ionInput_0_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleInput($event)); })("ionFocus", function TextFieldComponent_Conditional_1_Template_ion_textarea_ionFocus_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleFocus()); })("ionBlur", function TextFieldComponent_Conditional_1_Template_ion_textarea_ionBlur_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleBlur()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", ctx_r1.value)("placeholder", ctx_r1.placeholder)("maxlength", ctx_r1.maxLength)("required", ctx_r1.required)("disabled", ctx_r1.isDisabled)("rows", ctx_r1.rows)("autoGrow", true);
    i0.ɵɵattribute("aria-label", ctx_r1.ariaLabel)("aria-invalid", ctx_r1.errorText ? true : null);
} }
function TextFieldComponent_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ion-input", 5);
    i0.ɵɵlistener("ionInput", function TextFieldComponent_Conditional_2_Template_ion_input_ionInput_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleInput($event)); })("ionFocus", function TextFieldComponent_Conditional_2_Template_ion_input_ionFocus_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleFocus()); })("ionBlur", function TextFieldComponent_Conditional_2_Template_ion_input_ionBlur_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleBlur()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", ctx_r1.value)("placeholder", ctx_r1.placeholder)("autocomplete", ctx_r1.autocomplete)("maxlength", ctx_r1.maxLength)("required", ctx_r1.required)("disabled", ctx_r1.isDisabled);
    i0.ɵɵattribute("aria-label", ctx_r1.ariaLabel)("aria-invalid", ctx_r1.errorText ? true : null);
} }
function TextFieldComponent_Conditional_3_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", ctx_r1.value.length, "/", ctx_r1.maxLength, "");
} }
function TextFieldComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, TextFieldComponent_Conditional_3_Conditional_3_Template, 2, 2, "span", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.supportingText);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.showCounter && ctx_r1.maxLength ? 3 : -1);
} }
export class TextFieldComponent {
    constructor() {
        this.placeholder = '';
        this.ariaLabel = 'Campo de texto';
        this.autocomplete = 'off';
        this.helperText = '';
        this.errorText = '';
        this.required = false;
        this.showCounter = false;
        this.embedded = false;
        this.multiline = false;
        this.rows = 3;
        this.value = '';
        this.isDisabled = false;
        this.isFocused = false;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    set maxLength(value) {
        const parsedValue = Number(value);
        this._maxLength = value !== null && value !== undefined && Number.isFinite(parsedValue) && parsedValue > 0
            ? Math.floor(parsedValue)
            : undefined;
        if (this._maxLength) {
            this.value = this.value.slice(0, this._maxLength);
        }
    }
    get maxLength() {
        return this._maxLength;
    }
    get supportingText() {
        return this.errorText || this.helperText;
    }
    writeValue(value) {
        this.value = this.limitValue(String(value ?? ''));
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
    handleInput(event) {
        const inputEvent = event;
        const nextValue = this.limitValue(String(inputEvent.detail?.value ?? ''));
        this.value = nextValue;
        this.onChange(nextValue);
    }
    handleFocus() {
        this.isFocused = true;
    }
    handleBlur() {
        this.isFocused = false;
        this.onTouched();
    }
    limitValue(value) {
        return this.maxLength ? value.slice(0, this.maxLength) : value;
    }
    static { this.ɵfac = function TextFieldComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TextFieldComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TextFieldComponent, selectors: [["app-text-field"]], inputs: { placeholder: "placeholder", ariaLabel: "ariaLabel", autocomplete: "autocomplete", helperText: "helperText", errorText: "errorText", required: "required", showCounter: "showCounter", embedded: "embedded", multiline: "multiline", rows: "rows", maxLength: "maxLength" }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => TextFieldComponent),
                    multi: true
                }
            ])], decls: 4, vars: 10, consts: [[1, "text-field"], [3, "value", "placeholder", "maxlength", "required", "disabled", "rows", "autoGrow"], ["type", "text", 3, "value", "placeholder", "autocomplete", "maxlength", "required", "disabled"], ["aria-live", "polite", 1, "text-field__footer"], [3, "ionInput", "ionFocus", "ionBlur", "value", "placeholder", "maxlength", "required", "disabled", "rows", "autoGrow"], ["type", "text", 3, "ionInput", "ionFocus", "ionBlur", "value", "placeholder", "autocomplete", "maxlength", "required", "disabled"], [1, "text-field__counter"]], template: function TextFieldComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, TextFieldComponent_Conditional_1_Template, 1, 9, "ion-textarea", 1)(2, TextFieldComponent_Conditional_2_Template, 1, 8, "ion-input", 2)(3, TextFieldComponent_Conditional_3_Template, 4, 2, "div", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("text-field--embedded", ctx.embedded)("text-field--focused", ctx.isFocused)("text-field--disabled", ctx.isDisabled)("text-field--error", ctx.errorText);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.multiline ? 1 : 2);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.supportingText || ctx.showCounter && ctx.maxLength ? 3 : -1);
        } }, dependencies: [IonInput, IonTextarea], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.text-field[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  border: 1px solid #e7e9f2;\n  border-radius: 17px;\n  background: rgba(255, 255, 255, 0.96);\n  box-shadow: 0 4px 14px rgba(31, 37, 76, 0.04);\n  color: var(--text-field-color, #252b38);\n  transition: box-shadow 180ms ease;\n\n  ion-input,\n  ion-textarea {\n    min-height: var(--text-field-min-height, 22px);\n    color: inherit;\n    font-size: var(--text-field-font-size, 13px);\n    font-weight: var(--text-field-font-weight, 600);\n    line-height: 1.4;\n    --background: transparent;\n    --padding-top: 0;\n    --padding-bottom: 0;\n    --padding-start: 0;\n    --padding-end: 0;\n    --placeholder-color: var(--text-field-placeholder-color, #8b93a7);\n    --placeholder-opacity: 1;\n  }\n\n  ion-textarea {\n    min-height: 68px;\n    font-weight: 500;\n    line-height: 1.5;\n  }\n\n  &__footer {\n    display: flex;\n    min-height: 17px;\n    justify-content: space-between;\n    gap: 12px;\n    margin-top: 5px;\n    color: var(--text-field-helper-color, #7b8498);\n    font-size: 11px;\n    line-height: 1.45;\n  }\n\n  &__counter {\n    margin-left: auto;\n    white-space: nowrap;\n  }\n\n  &--error {\n    color: var(--text-field-error-input-color, #9f2130);\n\n    .text-field__footer {\n      color: var(--text-field-error-color, #c5293d);\n    }\n  }\n\n  &--disabled {\n    opacity: 0.58;\n  }\n\n  &--focused {\n    box-shadow: 0 5px 16px rgba(31, 37, 76, 0.055);\n  }\n\n  &--embedded {\n    padding: 0;\n    border: 0;\n    border-radius: 0;\n    background: transparent;\n    box-shadow: none;\n  }\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TextFieldComponent, [{
        type: Component,
        args: [{ selector: 'app-text-field', standalone: true, imports: [IonInput, IonTextarea], changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => TextFieldComponent),
                        multi: true
                    }
                ], template: "<div\n  class=\"text-field\"\n  [class.text-field--embedded]=\"embedded\"\n  [class.text-field--focused]=\"isFocused\"\n  [class.text-field--disabled]=\"isDisabled\"\n  [class.text-field--error]=\"errorText\">\n  @if (multiline) {\n    <ion-textarea\n      [value]=\"value\"\n      [placeholder]=\"placeholder\"\n      [attr.aria-label]=\"ariaLabel\"\n      [attr.aria-invalid]=\"errorText ? true : null\"\n      [maxlength]=\"maxLength\"\n      [required]=\"required\"\n      [disabled]=\"isDisabled\"\n      [rows]=\"rows\"\n      [autoGrow]=\"true\"\n      (ionInput)=\"handleInput($event)\"\n      (ionFocus)=\"handleFocus()\"\n      (ionBlur)=\"handleBlur()\">\n    </ion-textarea>\n  } @else {\n    <ion-input\n      type=\"text\"\n      [value]=\"value\"\n      [placeholder]=\"placeholder\"\n      [attr.aria-label]=\"ariaLabel\"\n      [attr.aria-invalid]=\"errorText ? true : null\"\n      [autocomplete]=\"autocomplete\"\n      [maxlength]=\"maxLength\"\n      [required]=\"required\"\n      [disabled]=\"isDisabled\"\n      (ionInput)=\"handleInput($event)\"\n      (ionFocus)=\"handleFocus()\"\n      (ionBlur)=\"handleBlur()\">\n    </ion-input>\n  }\n\n  @if (supportingText || (showCounter && maxLength)) {\n    <div class=\"text-field__footer\" aria-live=\"polite\">\n      <span>{{ supportingText }}</span>\n      @if (showCounter && maxLength) {\n        <span class=\"text-field__counter\">{{ value.length }}/{{ maxLength }}</span>\n      }\n    </div>\n  }\n</div>\n", styles: [":host {\n  display: block;\n}\n\n.text-field {\n  padding: 10px 16px;\n  border: 1px solid #e7e9f2;\n  border-radius: 17px;\n  background: rgba(255, 255, 255, 0.96);\n  box-shadow: 0 4px 14px rgba(31, 37, 76, 0.04);\n  color: var(--text-field-color, #252b38);\n  transition: box-shadow 180ms ease;\n\n  ion-input,\n  ion-textarea {\n    min-height: var(--text-field-min-height, 22px);\n    color: inherit;\n    font-size: var(--text-field-font-size, 13px);\n    font-weight: var(--text-field-font-weight, 600);\n    line-height: 1.4;\n    --background: transparent;\n    --padding-top: 0;\n    --padding-bottom: 0;\n    --padding-start: 0;\n    --padding-end: 0;\n    --placeholder-color: var(--text-field-placeholder-color, #8b93a7);\n    --placeholder-opacity: 1;\n  }\n\n  ion-textarea {\n    min-height: 68px;\n    font-weight: 500;\n    line-height: 1.5;\n  }\n\n  &__footer {\n    display: flex;\n    min-height: 17px;\n    justify-content: space-between;\n    gap: 12px;\n    margin-top: 5px;\n    color: var(--text-field-helper-color, #7b8498);\n    font-size: 11px;\n    line-height: 1.45;\n  }\n\n  &__counter {\n    margin-left: auto;\n    white-space: nowrap;\n  }\n\n  &--error {\n    color: var(--text-field-error-input-color, #9f2130);\n\n    .text-field__footer {\n      color: var(--text-field-error-color, #c5293d);\n    }\n  }\n\n  &--disabled {\n    opacity: 0.58;\n  }\n\n  &--focused {\n    box-shadow: 0 5px 16px rgba(31, 37, 76, 0.055);\n  }\n\n  &--embedded {\n    padding: 0;\n    border: 0;\n    border-radius: 0;\n    background: transparent;\n    box-shadow: none;\n  }\n}\n"] }]
    }], null, { placeholder: [{
            type: Input
        }], ariaLabel: [{
            type: Input
        }], autocomplete: [{
            type: Input
        }], helperText: [{
            type: Input
        }], errorText: [{
            type: Input
        }], required: [{
            type: Input
        }], showCounter: [{
            type: Input
        }], embedded: [{
            type: Input
        }], multiline: [{
            type: Input
        }], rows: [{
            type: Input
        }], maxLength: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TextFieldComponent, { className: "TextFieldComponent", filePath: "src/app/shared/components/text-field/text-field.component.ts", lineNumber: 20 }); })();
//# sourceMappingURL=text-field.component.js.map