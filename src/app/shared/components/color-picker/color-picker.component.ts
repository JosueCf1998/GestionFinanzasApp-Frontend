import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorOption } from '../../constants/personalization-options';
import { BaseModalComponent } from '../base-modal/base-modal.component';

export type ColorPickerOption = ColorOption;

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  standalone: true,
  imports: [CommonModule, BaseModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerComponent {
  @Input() options: readonly ColorPickerOption[] = [];
  @Input() selected = '';
  @Input() visibleCount = 5;
  @Output() readonly selectedChange = new EventEmitter<string>();

  isModalOpen = false;
  private promotedColors: string[] = [];

  get quickOptions(): readonly ColorPickerOption[] {
    const availableColors = new Set(this.options.map(option => option.value));
    this.promotedColors = this.promotedColors.filter(color => availableColors.has(color));

    const promotedOptions = this.promotedColors
      .map(color => this.options.find(option => option.value === color))
      .filter((option): option is ColorPickerOption => Boolean(option));
    const promotedSet = new Set(this.promotedColors);
    const orderedOptions = [
      ...promotedOptions,
      ...this.options.filter(option => !promotedSet.has(option.value))
    ];

    return orderedOptions.slice(0, this.visibleCount);
  }

  select(option: ColorPickerOption, fromModal = false): void {
    if (fromModal && !this.quickOptions.some(item => item.value === option.value)) {
      this.promotedColors = [
        option.value,
        ...this.promotedColors.filter(color => color !== option.value)
      ].slice(0, this.visibleCount);
    }
    this.selectedChange.emit(option.value);
    if (fromModal) this.closeModal();
  }

  openModal(): void { this.isModalOpen = true; }
  closeModal(): void { this.isModalOpen = false; }
}
