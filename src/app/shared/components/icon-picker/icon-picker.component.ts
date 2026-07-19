import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ItemIconComponent } from '../item-icon/item-icon.component';

export interface IconPickerOption {
  nombre: string;
  archivo: string;
}

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss'],
  standalone: true,
  imports: [CommonModule, ItemIconComponent, BaseModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPickerComponent {
  @Input() options: readonly IconPickerOption[] = [];
  @Input() selected = '';
  @Input() color = 'var(--fv-primary)';
  @Input() visibleCount = 5;

  @Output() readonly selectedChange = new EventEmitter<string>();

  isModalOpen = false;
  private promotedIcons: string[] = [];

  get quickOptions(): readonly IconPickerOption[] {
    const availableIcons = new Set(this.options.map(option => option.archivo));
    this.promotedIcons = this.promotedIcons.filter(icon => availableIcons.has(icon));

    const promotedOptions = this.promotedIcons
      .map(icon => this.options.find(option => option.archivo === icon))
      .filter((option): option is IconPickerOption => Boolean(option));
    const promotedSet = new Set(this.promotedIcons);
    const orderedOptions = [
      ...promotedOptions,
      ...this.options.filter(option => !promotedSet.has(option.archivo))
    ];

    return orderedOptions.slice(0, this.visibleCount);
  }

  select(option: IconPickerOption, fromModal = false): void {
    if (fromModal && !this.quickOptions.some(item => item.archivo === option.archivo)) {
      this.promotedIcons = [
        option.archivo,
        ...this.promotedIcons.filter(icon => icon !== option.archivo)
      ].slice(0, this.visibleCount);
    }
    this.selectedChange.emit(option.archivo);
    if (fromModal) this.closeModal();
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  iconColor(option: IconPickerOption): string {
    if (option.archivo !== this.selected) return '#a3a8b3';
    return this.color.toLowerCase() === '#222' ? '#111111' : this.color;
  }
}
