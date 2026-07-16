import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import {
  BUDGET_STATUS_LABELS,
  BudgetListItem
} from 'src/app/core/models/budgets/list-budgets.model';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';

@Component({
  selector: 'app-budget-list-item',
  templateUrl: './budget-list-item.component.html',
  styleUrls: ['./budget-list-item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, ItemIconComponent]
})
export class BudgetListItemComponent {
  @Input({ required: true }) budget!: BudgetListItem;
  @Input() currencySymbol = '';

  @Output() selected = new EventEmitter<BudgetListItem>();

  get statusLabel(): string {
    return BUDGET_STATUS_LABELS[this.budget.status];
  }

  select(): void {
    this.selected.emit(this.budget);
  }
}
