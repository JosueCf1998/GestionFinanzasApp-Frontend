import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon, IonModal } from '@ionic/angular/standalone';
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
  imports: [CommonModule, ItemIconComponent, IonIcon, IonModal],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPickerComponent {
  @Input() options: readonly IconPickerOption[] = [];
  @Input() selected = '';
  @Input() color = 'var(--fv-primary)';
  @Input() visibleCount = 5;

  @Output() readonly selectedChange = new EventEmitter<string>();

  isModalOpen = false;

  get orderedOptions(): readonly IconPickerOption[] {
    const selectedOption = this.options.find(option => option.archivo === this.selected);
    if (!selectedOption) return this.options;
    return [selectedOption, ...this.options.filter(option => option.archivo !== this.selected)];
  }

  select(option: IconPickerOption): void {
    this.selectedChange.emit(option.archivo);
    this.closeModal();
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
