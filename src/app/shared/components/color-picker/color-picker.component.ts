import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseModalComponent } from '../base-modal/base-modal.component';

export interface ColorPickerOption {
  nombre: string;
  valor: string;
}

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
    const availableColors = new Set(this.options.map(option => option.valor));
    this.promotedColors = this.promotedColors.filter(color => availableColors.has(color));

    const promotedOptions = this.promotedColors
      .map(color => this.options.find(option => option.valor === color))
      .filter((option): option is ColorPickerOption => Boolean(option));
    const promotedSet = new Set(this.promotedColors);
    const orderedOptions = [
      ...promotedOptions,
      ...this.options.filter(option => !promotedSet.has(option.valor))
    ];

    return orderedOptions.slice(0, this.visibleCount);
  }

  select(option: ColorPickerOption, fromModal = false): void {
    if (fromModal && !this.quickOptions.some(item => item.valor === option.valor)) {
      this.promotedColors = [
        option.valor,
        ...this.promotedColors.filter(color => color !== option.valor)
      ].slice(0, this.visibleCount);
    }
    this.selectedChange.emit(option.valor);
    if (fromModal) this.closeModal();
  }

  openModal(): void { this.isModalOpen = true; }
  closeModal(): void { this.isModalOpen = false; }
}
