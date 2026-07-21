import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { PeriodPreset } from 'src/app/core/models/budgets/list-budgets.model';
import { BaseModalComponent } from '../base-modal/base-modal.component';
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
  imports: [BaseModalComponent, PeriodPickerComponent]
})
export class FilterModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() title = 'Filtros';
  @Input() description = 'Ajusta la información que deseas consultar.';
  @Input() applyText = 'Aplicar filtros';
  @Input() selectedPeriod: PeriodPreset = 'monthly';
  @Input() selectedPeriodValue = '';
  @Input() selectedStartDate = '';
  @Input() selectedEndDate = '';

  @Output() readonly modalClosed = new EventEmitter<void>();
  @Output() readonly filtersApplied = new EventEmitter<FilterSelection>();

  draftSelection: FilterSelection | null = null;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue === true) {
      this.resetDraft();
    }
  }

  get isDateRangeValid(): boolean {
    if (!this.draftSelection) return true;
    if (this.draftSelection.period !== 'custom') return true;
    return Boolean(this.draftSelection.startDate && this.draftSelection.endDate &&
      this.draftSelection.startDate <= this.draftSelection.endDate);
  }

  close(): void {
    this.resetDraft();
    this.modalClosed.emit();
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
