import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ColorPickerOption } from '../color-picker/color-picker.component';
import { IconPickerOption } from '../icon-picker/icon-picker.component';
import { ItemIconComponent } from '../item-icon/item-icon.component';

export interface PersonalizationValue {
  icon: string;
  color: string;
}

@Component({
  selector: 'app-personalization-modal',
  templateUrl: './personalization-modal.component.html',
  styleUrls: ['./personalization-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, BaseModalComponent, ItemIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalizationModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() selectedIcon = '';
  @Input() selectedColor = '';
  @Input() icons: readonly IconPickerOption[] = [];
  @Input() colors: readonly ColorPickerOption[] = [];
  @Input() title = 'Personalizar presupuesto';
  @Input() description = 'Elige el icono y color que identificarán este presupuesto.';
  @Input() previewText = 'Así se identificará tu presupuesto';

  @Output() readonly applied = new EventEmitter<PersonalizationValue>();
  @Output() readonly modalClosed = new EventEmitter<void>();

  draftIcon = '';
  draftColor = '';
  activeTab: 'icon' | 'color' = 'icon';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue === true) {
      this.draftIcon = this.selectedIcon;
      this.draftColor = this.selectedColor;
      this.activeTab = 'icon';
    }
  }

  apply(): void {
    this.applied.emit({
      icon: this.draftIcon,
      color: this.draftColor
    });
  }

  selectIcon(icon: string): void {
    this.draftIcon = icon;
  }

  selectColor(color: string): void {
    this.draftColor = color;
  }

  close(): void {
    this.modalClosed.emit();
  }
}
