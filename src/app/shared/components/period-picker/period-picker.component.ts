import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { PeriodPreset } from 'src/app/core/models/budgets/list-budgets.model';
import { CustomSegmentComponent } from '../custom-segment/custom-segment.component';

export interface PeriodPickerValue {
  /** Estado de presentación; no debe enviarse al backend. */
  period: PeriodPreset;
  periodValue: string;
  startDate: string;
  endDate: string;
}

interface CalendarDay {
  value: string;
  day: number;
  outside: boolean;
}

interface WeekOption {
  value: number;
  label: string;
  range: string;
}

@Component({
  selector: 'app-period-picker',
  templateUrl: './period-picker.component.html',
  styleUrls: ['./period-picker.component.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, CustomSegmentComponent]
})
export class PeriodPickerComponent implements OnChanges {
  @Input() period: PeriodPreset = 'monthly';
  @Input() periodValue = '';
  @Input() startDate = '';
  @Input() endDate = '';

  @Output() readonly valueChange = new EventEmitter<PeriodPickerValue>();

  readonly periodOptions = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'annual', label: 'Anual' },
    { value: 'custom', label: 'Periodo' }
  ];
  readonly months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  readonly weekdays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  selectedPeriod: PeriodPreset = 'monthly';
  selectedYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth() + 1;
  selectedWeek = 1;
  customStartDate = '';
  customEndDate = '';
  calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  calendarTitle = '';
  calendarDays: CalendarDay[] = [];
  weeklyMonthTitle = '';
  weeksForSelectedMonth: WeekOption[] = [];

  private readonly monthYearFormatter = new Intl.DateTimeFormat('es-PE', {
    month: 'long', year: 'numeric'
  });
  private readonly weekRangeFormatter = new Intl.DateTimeFormat('es-PE', {
    day: 'numeric', month: 'short', timeZone: 'UTC'
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['period'] || changes['periodValue'] || changes['startDate'] || changes['endDate']) {
      this.reset();
    }
  }

  get isValid(): boolean {
    return this.selectedPeriod !== 'custom' || Boolean(
      this.customStartDate && this.customEndDate && this.customStartDate <= this.customEndDate
    );
  }

  private refreshCalendar(): void {
    const year = this.calendarMonth.getFullYear();
    const month = this.calendarMonth.getMonth();
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
    const gridStart = new Date(year, month, 1 - firstWeekday);
    const title = this.monthYearFormatter.format(this.calendarMonth);
    this.calendarTitle = title.charAt(0).toUpperCase() + title.slice(1);

    this.calendarDays = Array.from({ length: 42 }, (_, index) => {
      const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
      return {
        value: this.localDate(date),
        day: date.getDate(),
        outside: date.getMonth() !== month
      };
    });
  }

  changePeriod(value: string): void {
    this.selectedPeriod = value as PeriodPreset;
    if (this.selectedPeriod === 'custom') {
      this.focusCalendarOnSelection();
      this.refreshCalendar();
    } else if (this.selectedPeriod === 'weekly') {
      this.refreshWeeks();
      const selectedExists = this.weeksForSelectedMonth.some(week => week.value === this.selectedWeek);
      if (!selectedExists && this.weeksForSelectedMonth[0]) {
        this.selectedWeek = this.weeksForSelectedMonth[0].value;
      }
    }
    this.emitValue();
  }

  previousYear(): void {
    this.selectedYear--;
    this.normalizeWeek();
    this.emitValue();
  }

  nextYear(): void {
    this.selectedYear++;
    this.normalizeWeek();
    this.emitValue();
  }

  private refreshWeeks(): void {
    const monthStart = `${this.selectedYear}-${String(this.selectedMonth).padStart(2, '0')}-01`;
    const monthEnd = this.localDate(new Date(this.selectedYear, this.selectedMonth, 0));

    this.weeksForSelectedMonth = Array.from(
      { length: this.isoWeeksInYear(this.selectedYear) }, (_, index) => index + 1
    )
      .filter(week => {
        const range = this.weekRange(this.selectedYear, week);
        return range.startDate <= monthEnd && range.endDate >= monthStart;
      })
      .map(week => ({
        value: week,
        label: `Semana ${week}`,
        range: this.weekCardRange(this.selectedYear, week)
      }));
    const date = new Date(this.selectedYear, this.selectedMonth - 1, 1);
    const title = this.monthYearFormatter.format(date);
    this.weeklyMonthTitle = title.charAt(0).toUpperCase() + title.slice(1);
  }

  selectMonth(month: number): void {
    this.selectedMonth = month;
    this.emitValue();
  }

  previousWeeklyMonth(): void {
    if (this.selectedMonth === 1) {
      this.selectedMonth = 12;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.selectFirstWeekOfMonth();
  }

  nextWeeklyMonth(): void {
    if (this.selectedMonth === 12) {
      this.selectedMonth = 1;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.selectFirstWeekOfMonth();
  }

  private selectFirstWeekOfMonth(): void {
    this.refreshWeeks();
    const firstWeek = this.weeksForSelectedMonth[0];
    if (firstWeek) this.selectedWeek = firstWeek.value;
    this.emitValue();
  }

  selectWeek(week: number): void {
    this.selectedWeek = week;
    this.emitValue();
  }

  previousMonth(): void {
    this.calendarMonth = new Date(
      this.calendarMonth.getFullYear(), this.calendarMonth.getMonth() - 1, 1
    );
    this.refreshCalendar();
  }

  nextMonth(): void {
    this.calendarMonth = new Date(
      this.calendarMonth.getFullYear(), this.calendarMonth.getMonth() + 1, 1
    );
    this.refreshCalendar();
  }

  selectCalendarDay(day: CalendarDay): void {
    if (!this.customStartDate || this.customEndDate || day.value < this.customStartDate) {
      this.customStartDate = day.value;
      this.customEndDate = '';
    } else {
      this.customEndDate = day.value;
    }

    if (day.outside) {
      const selected = this.parseLocalDate(day.value);
      this.calendarMonth = new Date(selected.getFullYear(), selected.getMonth(), 1);
      this.refreshCalendar();
    }
    this.emitValue();
  }

  isRangeStart(day: CalendarDay): boolean {
    return day.value === this.customStartDate;
  }

  isRangeEnd(day: CalendarDay): boolean {
    return day.value === this.customEndDate;
  }

  isInRange(day: CalendarDay): boolean {
    return Boolean(this.customStartDate && this.customEndDate &&
      day.value > this.customStartDate && day.value < this.customEndDate);
  }

  formatSelectedDate(value: string): string {
    if (!value) return 'Seleccionar';
    return new Intl.DateTimeFormat('es-PE', {
      day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
    }).format(new Date(`${value}T00:00:00Z`));
  }

  private reset(): void {
    this.selectedPeriod = this.period;
    this.customStartDate = this.startDate;
    this.customEndDate = this.endDate;
    this.focusCalendarOnSelection();
    const currentValue = this.periodValue || this.defaultPeriodValue(this.period);

    if (this.period === 'monthly') {
      const [year, month] = currentValue.split('-').map(Number);
      this.selectedYear = year;
      this.selectedMonth = month;
    } else if (this.period === 'annual') {
      this.selectedYear = Number(currentValue);
    } else if (this.period === 'weekly') {
      const match = /^(\d{4})-W(\d{2})$/.exec(currentValue);
      if (match) {
        this.selectedYear = Number(match[1]);
        this.selectedWeek = Number(match[2]);
        const range = this.weekRange(this.selectedYear, this.selectedWeek);
        this.selectedMonth = new Date(`${range.endDate}T00:00:00Z`).getUTCMonth() + 1;
      }
    }

    this.refreshWeeks();
    this.refreshCalendar();
  }

  private emitValue(): void {
    const value = this.resolveValue();
    if (value) this.valueChange.emit(value);
  }

  private resolveValue(): PeriodPickerValue | null {
    if (this.selectedPeriod === 'custom') {
      return {
        period: 'custom', periodValue: '',
        startDate: this.customStartDate, endDate: this.customEndDate
      };
    }

    if (this.selectedPeriod === 'monthly') {
      const month = String(this.selectedMonth).padStart(2, '0');
      return {
        period: 'monthly', periodValue: `${this.selectedYear}-${month}`,
        startDate: `${this.selectedYear}-${month}-01`,
        endDate: this.localDate(new Date(this.selectedYear, this.selectedMonth, 0))
      };
    }

    if (this.selectedPeriod === 'annual') {
      return {
        period: 'annual', periodValue: String(this.selectedYear),
        startDate: `${this.selectedYear}-01-01`, endDate: `${this.selectedYear}-12-31`
      };
    }

    const range = this.weekRange(this.selectedYear, this.selectedWeek);
    return {
      period: 'weekly',
      periodValue: `${this.selectedYear}-W${String(this.selectedWeek).padStart(2, '0')}`,
      ...range
    };
  }

  private defaultPeriodValue(period: PeriodPreset): string {
    const today = new Date();
    if (period === 'monthly') return this.localDate(today).slice(0, 7);
    if (period === 'annual') return String(today.getFullYear());
    if (period === 'weekly') return this.isoWeek(today);
    return '';
  }

  private normalizeWeek(): void {
    this.selectedWeek = Math.min(this.selectedWeek, this.isoWeeksInYear(this.selectedYear));
  }

  private weekRange(year: number, week: number): { startDate: string; endDate: string } {
    const januaryFourth = new Date(Date.UTC(year, 0, 4));
    const monday = new Date(januaryFourth);
    monday.setUTCDate(januaryFourth.getUTCDate() - (januaryFourth.getUTCDay() || 7) + 1 + (week - 1) * 7);
    const sunday = new Date(monday);
    sunday.setUTCDate(monday.getUTCDate() + 6);
    return { startDate: monday.toISOString().slice(0, 10), endDate: sunday.toISOString().slice(0, 10) };
  }

  private isoWeeksInYear(year: number): number {
    return Number(this.isoWeek(new Date(year, 11, 28)).slice(-2));
  }

  private isoWeek(date: Date): string {
    const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    utc.setUTCDate(utc.getUTCDate() + 4 - (utc.getUTCDay() || 7));
    const start = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
    const week = Math.ceil((((utc.getTime() - start.getTime()) / 86400000) + 1) / 7);
    return `${utc.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
  }

  private weekCardRange(year: number, week: number): string {
    const range = this.weekRange(year, week);
    const start = new Date(`${range.startDate}T00:00:00Z`);
    const end = new Date(`${range.endDate}T00:00:00Z`);
    return `${this.weekRangeFormatter.format(start)} – ${this.weekRangeFormatter.format(end)}`;
  }

  private localDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  private focusCalendarOnSelection(): void {
    const reference = this.customStartDate ? this.parseLocalDate(this.customStartDate) : new Date();
    this.calendarMonth = new Date(reference.getFullYear(), reference.getMonth(), 1);
  }

  private parseLocalDate(value: string): Date {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
}
