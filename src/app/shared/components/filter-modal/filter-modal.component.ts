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
import { Currency, CurrencyCode } from 'src/app/shared/models/currency.model';
import { CustomSegmentComponent } from '../custom-segment/custom-segment.component';

export interface FilterOption<T extends string = string> {
  value: T;
  label: string;
}

export interface FilterPeriodGroup<T extends string = string> {
  frequency: T;
  periods: string[];
}

export interface FilterSelection<T extends string = string> {
  frequency: T;
  currencyCode: CurrencyCode;
  periodIndex: number;
  period: string;
}

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonModal, CustomSegmentComponent]
})
export class FilterModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() eyebrow = 'Personalizar vista';
  @Input() title = 'Filtros';
  @Input() description = 'Ajusta la información que deseas consultar.';
  @Input() applyText = 'Aplicar filtros';
  @Input() frequencyLabel = 'Frecuencia';
  @Input() currencyLabel = 'Moneda';
  @Input() periodLabel = 'Periodo';
  @Input() frequencies: FilterOption[] = [];
  @Input() currencies: Currency[] = [];
  @Input() periodGroups: FilterPeriodGroup[] = [];
  @Input() selectedFrequency = '';
  @Input() selectedCurrencyCode: CurrencyCode = 'PEN';
  @Input() selectedPeriodIndex = 0;
  @Input() modalClass = '';

  @Output() readonly modalClosed = new EventEmitter<void>();
  @Output() readonly filtersApplied = new EventEmitter<FilterSelection>();

  draftFrequency = '';
  draftCurrencyCode: CurrencyCode = 'PEN';
  draftPeriodIndex = 0;
  private closeEmitted = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue === true) {
      this.closeEmitted = false;
      this.resetDraft();
    }
  }

  get availablePeriods(): string[] {
    return this.periodGroups.find(group => group.frequency === this.draftFrequency)?.periods ?? [];
  }

  get hasChanges(): boolean {
    return this.draftFrequency !== this.selectedFrequency ||
      this.draftCurrencyCode !== this.selectedCurrencyCode ||
      this.draftPeriodIndex !== this.selectedPeriodIndex;
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

  changeFrequency(frequency: string): void {
    this.draftFrequency = frequency;
    this.draftPeriodIndex = 0;
  }

  selectCurrency(code: CurrencyCode): void {
    this.draftCurrencyCode = code;
  }

  selectPeriod(index: number): void {
    this.draftPeriodIndex = index;
  }

  apply(): void {
    const period = this.availablePeriods[this.draftPeriodIndex];

    if (!period) {
      return;
    }

    this.filtersApplied.emit({
      frequency: this.draftFrequency,
      currencyCode: this.draftCurrencyCode,
      periodIndex: this.draftPeriodIndex,
      period
    });
  }

  trackByPeriod(index: number): number {
    return index;
  }

  trackByCurrency(_: number, currency: Currency): CurrencyCode {
    return currency.code;
  }

  private resetDraft(): void {
    this.draftFrequency = this.selectedFrequency || this.frequencies[0]?.value || '';
    this.draftCurrencyCode = this.selectedCurrencyCode;
    this.draftPeriodIndex = Math.min(
      this.selectedPeriodIndex,
      Math.max(this.availablePeriods.length - 1, 0)
    );
  }
}
