import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { CategoryResponse } from 'src/app/core/use-cases/categories/list-categories.usecase';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ItemIconComponent } from '../item-icon/item-icon.component';

@Component({
  selector: 'app-category-selector-modal',
  templateUrl: './category-selector-modal.component.html',
  styleUrls: ['./category-selector-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, BaseModalComponent, ItemIconComponent]
})
export class CategorySelectorModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() categories: CategoryResponse[] = [];
  @Input() selectedCategories: CategoryResponse[] = [];

  @Output() readonly categoriesSelected = new EventEmitter<CategoryResponse[]>();
  @Output() readonly modalClosed = new EventEmitter<void>();

  workingSelection: CategoryResponse[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategories'] || (changes['isOpen'] && this.isOpen)) {
      this.workingSelection = [...this.selectedCategories];
    }
  }

  get selectAll(): boolean {
    return this.categories.length > 0 && this.workingSelection.length === this.categories.length;
  }

  get canConfirm(): boolean {
    return this.workingSelection.length > 0;
  }

  isSelected(category: CategoryResponse): boolean {
    return this.workingSelection.some(item => item.id === category.id);
  }

  toggle(category: CategoryResponse): void {
    this.workingSelection = this.isSelected(category)
      ? this.workingSelection.filter(item => item.id !== category.id)
      : [...this.workingSelection, category];
  }

  toggleAll(): void {
    this.workingSelection = this.selectAll ? [] : [...this.categories];
  }

  confirm(): void {
    this.categoriesSelected.emit([...this.workingSelection]);
    this.close();
  }

  close(): void {
    this.modalClosed.emit();
  }
}
