import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput, IonTextarea } from '@ionic/angular/standalone';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  standalone: true,
  imports: [IonInput, IonTextarea],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ]
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() ariaLabel = 'Campo de texto';
  @Input() autocomplete = 'off';
  @Input() helperText = '';
  @Input() errorText = '';
  @Input() required = false;
  @Input() showCounter = false;
  @Input() embedded = false;
  @Input() multiline = false;
  @Input() rows = 3;

  private _maxLength?: number;
  value = '';
  isDisabled = false;
  isFocused = false;

  @Input()
  set maxLength(value: number | null | undefined) {
    const parsedValue = Number(value);
    this._maxLength = value !== null && value !== undefined && Number.isFinite(parsedValue) && parsedValue > 0
      ? Math.floor(parsedValue)
      : undefined;

    if (this._maxLength) {
      this.value = this.value.slice(0, this._maxLength);
    }
  }

  get maxLength(): number | undefined {
    return this._maxLength;
  }

  get supportingText(): string {
    return this.errorText || this.helperText;
  }

  writeValue(value: string | null | undefined): void {
    this.value = this.limitValue(String(value ?? ''));
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleInput(event: Event): void {
    const inputEvent = event as CustomEvent<{ value?: string | number | null }>;
    const nextValue = this.limitValue(String(inputEvent.detail?.value ?? ''));
    this.value = nextValue;
    this.onChange(nextValue);
  }

  handleFocus(): void {
    this.isFocused = true;
  }

  handleBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  private limitValue(value: string): string {
    return this.maxLength ? value.slice(0, this.maxLength) : value;
  }
}
