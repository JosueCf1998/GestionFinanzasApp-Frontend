import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { IonIcon, IonModal } from '@ionic/angular/standalone';
import { BudgetPeriod } from 'src/app/core/models/budgets/list-budgets.model';
import {
  PeriodPickerComponent,
  PeriodPickerValue
} from '../period-picker/period-picker.component';

export type FilterSelection = PeriodPickerValue;

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonModal, PeriodPickerComponent]
})
export class FilterModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() eyebrow = 'Personalizar vista';
  @Input() title = 'Filtros';
  @Input() description = 'Ajusta la información que deseas consultar.';
  @Input() applyText = 'Aplicar filtros';
  @Input() selectedPeriod: BudgetPeriod = 'monthly';
  @Input() selectedPeriodValue = '';
  @Input() selectedStartDate = '';
  @Input() selectedEndDate = '';
  @Input() modalClass = '';

  @Output() readonly modalClosed = new EventEmitter<void>();
  @Output() readonly filtersApplied = new EventEmitter<FilterSelection>();

  draftSelection: FilterSelection | null = null;
  private closeEmitted = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue === true) {
      this.closeEmitted = false;
      this.resetDraft();
    }
  }

  get hasChanges(): boolean {
    if (!this.draftSelection) return false;
    return this.draftSelection.period !== this.selectedPeriod ||
      this.draftSelection.periodValue !== this.selectedPeriodValue ||
      this.draftSelection.startDate !== this.selectedStartDate ||
      this.draftSelection.endDate !== this.selectedEndDate;
  }

  get isDateRangeValid(): boolean {
    if (!this.draftSelection) return true;
    if (this.draftSelection.period !== 'custom') return true;
    return Boolean(this.draftSelection.startDate && this.draftSelection.endDate &&
      this.draftSelection.startDate <= this.draftSelection.endDate);
  }

  get modalCssClass(): string {
    return ['filter-modal', this.modalClass].filter(Boolean).join(' ');
  }

  close(): void {
    this.resetDraft();

    if (!this.closeEmitted) {
      this.closeEmitted = true;
      this.modalClosed.emit();
    }
  }

  updatePeriod(selection: PeriodPickerValue): void {
    this.draftSelection = selection;
  }

  apply(): void {
    if (!this.isDateRangeValid) return;

    this.filtersApplied.emit(this.draftSelection ?? {
      period: this.selectedPeriod,
      periodValue: this.selectedPeriodValue,
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate
    });
  }

  private resetDraft(): void {
    this.draftSelection = null;
  }
}
