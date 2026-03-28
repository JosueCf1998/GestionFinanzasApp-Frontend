import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput, IonItem } from '@ionic/angular/standalone';

type CurrencyCode = 'PEN' | 'USD';
type AmountInputVariant = 'basic' | 'enhanced';

@Component({
  selector: 'app-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss'],
  standalone: true,
  imports: [IonItem, IonInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmountInputComponent),
      multi: true,
    },
  ],
})
export class AmountInputComponent implements ControlValueAccessor {
  private static readonly CONTROL_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  private static readonly DEFAULT_MAX_DIGITS = 11;
  private static readonly MIN_MAX_DIGITS = 1;
  private static readonly MAX_ALLOWED_DIGITS = 15;

  @Input() placeholder: string = '0.00';
  @Input() required: boolean = false;
  @Input() currencyCode: CurrencyCode = 'PEN';
  @Input() variant: AmountInputVariant = 'basic';
  @Input()
  set locale(value: string) {
    const safeLocale = value?.trim() || 'es-PE';
    this._locale = safeLocale;
    this.numberFormatter = this.createNumberFormatter(safeLocale);
    this.syncDisplayFromCents();
  }

  get locale(): string {
    return this._locale;
  }
  @Input()
  set maxDigits(value: number) {
    const parsedValue = Number(value);
    const safeDigits = Number.isFinite(parsedValue)
      ? Math.floor(parsedValue)
      : AmountInputComponent.DEFAULT_MAX_DIGITS;

    this._maxDigits = Math.min(
      Math.max(safeDigits, AmountInputComponent.MIN_MAX_DIGITS),
      AmountInputComponent.MAX_ALLOWED_DIGITS,
    );

    this.syncDisplayFromCents();
  }

  get maxDigits(): number {
    return this._maxDigits;
  }

  displayValue: string = '0.00';
  private numericValueInCents: number = 0;
  private _maxDigits: number = AmountInputComponent.DEFAULT_MAX_DIGITS;
  private _locale: string = 'es-PE';
  private numberFormatter = this.createNumberFormatter(this._locale);
  isDisabled: boolean = false;

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    const safeValue = value ?? 0;

    if (Number.isNaN(safeValue) || safeValue < 0) {
      this.numericValueInCents = 0;
      this.syncDisplayFromCents();
      return;
    }

    this.numericValueInCents = this.clampCents(Math.round(safeValue * 100));
    this.syncDisplayFromCents();
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyDown(event: KeyboardEvent): void {
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

  onAmountInput(event: Event): void {
    // Fallback path for mobile keyboards where keydown may not fire consistently.
    const inputEvent = event as CustomEvent<{ value?: string | number | null }>;
    const inputValue = inputEvent.detail?.value?.toString() ?? '';
    const onlyNumbers = this.sanitizeDigits(inputValue);
    this.updateFromDigits(onlyNumbers);
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
  }

  removeLastDigit(): void {
    this.numericValueInCents = Math.floor(this.numericValueInCents / 10);
    this.propagateAmountValue();
  }

  markAsTouched(): void {
    this.onTouched();
  }

  get currencyLabel(): string {
    return this.currencyCode === 'USD' ? 'USD' : 'S/';
  }

  get isEnhanced(): boolean {
    return this.variant === 'enhanced';
  }

  private propagateAmountValue(): void {
    const amount = this.numericValueInCents / 100;
    this.displayValue = this.formatAmount(this.numericValueInCents);
    this.onChange(amount);
    this.onTouched();
  }

  private appendDigit(digit: number): void {
    const nextValue = this.numericValueInCents * 10 + digit;
    const nextDigits = nextValue.toString().length;

    if (nextDigits > this.maxDigits) {
      return;
    }

    this.updateFromCents(nextValue, true);
  }

  private updateFromDigits(digits: string): void {
    const nextValue = digits.length > 0 ? parseInt(digits, 10) || 0 : 0;
    this.updateFromCents(nextValue, false);
  }

  private sanitizeDigits(value: string): string {
    return value.replace(/[^0-9]/g, '').slice(0, this.maxDigits);
  }

  private updateFromCents(valueInCents: number, forceTouch: boolean): void {
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

  private syncDisplayFromCents(): void {
    this.numericValueInCents = this.clampCents(this.numericValueInCents);
    this.displayValue = this.formatAmount(this.numericValueInCents);
  }

  private formatAmount(valueInCents: number): string {
    return this.numberFormatter.format(valueInCents / 100);
  }

  private createNumberFormatter(locale: string): Intl.NumberFormat {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    });
  }

  private get maxCents(): number {
    return Number('9'.repeat(this.maxDigits));
  }

  private clampCents(valueInCents: number): number {
    return Math.min(Math.max(valueInCents, 0), this.maxCents);
  }
}
