import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon, IonModal } from '@ionic/angular/standalone';

export interface ColorPickerOption {
  nombre: string;
  valor: string;
}

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonModal],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerComponent {
  @Input() options: readonly ColorPickerOption[] = [];
  @Input() selected = '';
  @Input() visibleCount = 5;
  @Output() readonly selectedChange = new EventEmitter<string>();

  isModalOpen = false;

  get orderedOptions(): readonly ColorPickerOption[] {
    const selectedOption = this.options.find(option => option.valor === this.selected);
    if (!selectedOption) return this.options;
    return [selectedOption, ...this.options.filter(option => option.valor !== this.selected)];
  }

  select(option: ColorPickerOption): void {
    this.selectedChange.emit(option.valor);
    this.closeModal();
  }

  openModal(): void { this.isModalOpen = true; }
  closeModal(): void { this.isModalOpen = false; }
}
