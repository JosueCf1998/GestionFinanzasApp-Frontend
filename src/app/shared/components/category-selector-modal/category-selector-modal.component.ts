import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { CategoryResponse } from 'src/app/core/use-cases/categories/list-categories.usecase';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { ItemIconComponent } from '../item-icon/item-icon.component';
import { AmountInputComponent } from '../amount-input/amount-input.component';
import { WarningMessageComponent } from '../warning-message/warning-message.component';

export interface CategoryBudgetAllocation {
  category: CategoryResponse;
  amount: number;
}

@Component({
  selector: 'app-category-selector-modal',
  templateUrl: './category-selector-modal.component.html',
  styleUrls: ['./category-selector-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonIcon,
    BaseModalComponent,
    ItemIconComponent,
    AmountInputComponent,
    WarningMessageComponent
  ]
})
export class CategorySelectorModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() categories: CategoryResponse[] = [];
  @Input() selectedAllocations: CategoryBudgetAllocation[] = [];
  @Input() availableBalance: number | null = null;

  @Output() readonly allocationsSelected = new EventEmitter<CategoryBudgetAllocation[]>();
  @Output() readonly modalClosed = new EventEmitter<void>();

  workingSelection: CategoryBudgetAllocation[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedAllocations'] || (changes['isOpen'] && this.isOpen)) {
      this.workingSelection = this.selectedAllocations.map(item => ({ ...item }));
    }
  }

  get selectAll(): boolean {
    return this.categories.length > 0 && this.workingSelection.length === this.categories.length;
  }

  get canConfirm(): boolean {
    return this.workingSelection.length > 0 &&
      this.workingSelection.every(item => item.amount > 0);
  }

  get totalAllocated(): number {
    return this.workingSelection.reduce((total, item) => total + item.amount, 0);
  }

  get exceedsAvailableBalance(): boolean {
    return this.availableBalance !== null &&
      this.totalAllocated > this.availableBalance;
  }

  get balanceOverage(): number {
    if (this.availableBalance === null) return 0;
    return Math.max(this.totalAllocated - this.availableBalance, 0);
  }

  get balanceWarningMessage(): string {
    const difference = new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(this.balanceOverage);

    return `Excede el saldo de tus cuentas por ${difference}. Puedes continuar.`;
  }

  isSelected(category: CategoryResponse): boolean {
    return this.workingSelection.some(item => item.category.id === category.id);
  }

  toggle(category: CategoryResponse): void {
    this.workingSelection = this.isSelected(category)
      ? this.workingSelection.filter(item => item.category.id !== category.id)
      : [...this.workingSelection, { category, amount: 0 }];
  }

  toggleAll(): void {
    this.workingSelection = this.selectAll
      ? []
      : this.categories.map(category => ({ category, amount: 0 }));
  }

  amountFor(category: CategoryResponse): number | null {
    return this.workingSelection.find(item => item.category.id === category.id)?.amount ?? null;
  }

  updateAmount(category: CategoryResponse, value: number | null): void {
    const parsedAmount = Number(value ?? 0);
    const amount = Number.isFinite(parsedAmount) && parsedAmount >= 0
      ? Math.round(parsedAmount * 100) / 100
      : 0;

    this.workingSelection = this.workingSelection.map(item =>
      item.category.id === category.id ? { ...item, amount } : item
    );
  }

  confirm(): void {
    this.allocationsSelected.emit(this.workingSelection.map(item => ({ ...item })));
    this.close();
  }

  close(): void {
    this.modalClosed.emit();
  }
}
