import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { CustomSegmentComponent } from '../custom-segment/custom-segment.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function PeriodPickerComponent_div_2_button_12_ion_icon_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 17);
} }
function PeriodPickerComponent_div_2_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function PeriodPickerComponent_div_2_button_12_Template_button_click_0_listener() { const index_r4 = i0.ɵɵrestoreView(_r3).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectMonth(index_r4 + 1)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, PeriodPickerComponent_div_2_button_12_ion_icon_3_Template, 1, 0, "ion-icon", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const month_r5 = ctx.$implicit;
    const index_r4 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ctx_r1.selectedMonth === index_r4 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(month_r5);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.selectedMonth === index_r4 + 1);
} }
function PeriodPickerComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 8)(2, "button", 9);
    i0.ɵɵlistener("click", function PeriodPickerComponent_div_2_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.previousYear()); });
    i0.ɵɵelement(3, "ion-icon", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "small");
    i0.ɵɵtext(6, "Selecciona un mes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 11);
    i0.ɵɵlistener("click", function PeriodPickerComponent_div_2_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.nextYear()); });
    i0.ɵɵelement(10, "ion-icon", 12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 13);
    i0.ɵɵtemplate(12, PeriodPickerComponent_div_2_button_12_Template, 4, 4, "button", 14);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.selectedYear);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.months);
} }
function PeriodPickerComponent_div_3_button_12_ion_icon_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 17);
} }
function PeriodPickerComponent_div_3_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function PeriodPickerComponent_div_3_button_12_Template_button_click_0_listener() { const week_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectWeek(week_r8.value)); });
    i0.ɵɵelementStart(1, "span")(2, "small");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, PeriodPickerComponent_div_3_button_12_ion_icon_6_Template, 1, 0, "ion-icon", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const week_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ctx_r1.selectedWeek === week_r8.value);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(week_r8.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(week_r8.range);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.selectedWeek === week_r8.value);
} }
function PeriodPickerComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 18)(1, "div", 8)(2, "button", 19);
    i0.ɵɵlistener("click", function PeriodPickerComponent_div_3_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.previousWeeklyMonth()); });
    i0.ɵɵelement(3, "ion-icon", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "small");
    i0.ɵɵtext(6, "Selecciona una semana");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "button", 20);
    i0.ɵɵlistener("click", function PeriodPickerComponent_div_3_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.nextWeeklyMonth()); });
    i0.ɵɵelement(10, "ion-icon", 12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 21);
    i0.ɵɵtemplate(12, PeriodPickerComponent_div_3_button_12_Template, 7, 5, "button", 14);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.weeklyMonthTitle);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.weeksForSelectedMonth);
} }
function PeriodPickerComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 22)(1, "button", 9);
    i0.ɵɵlistener("click", function PeriodPickerComponent_div_4_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.previousYear()); });
    i0.ɵɵelement(2, "ion-icon", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "small");
    i0.ɵɵtext(5, "Selecciona un a\u00F1o");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 11);
    i0.ɵɵlistener("click", function PeriodPickerComponent_div_4_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.nextYear()); });
    i0.ɵɵelement(9, "ion-icon", 12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.selectedYear);
} }
function PeriodPickerComponent_div_5_ion_icon_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 17);
} }
function PeriodPickerComponent_div_5_ion_icon_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ion-icon", 17);
} }
function PeriodPickerComponent_div_5_span_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const weekday_r11 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(weekday_r11);
} }
function PeriodPickerComponent_div_5_button_29_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function PeriodPickerComponent_div_5_button_29_Template_button_click_0_listener() { const day_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.selectCalendarDay(day_r13)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const day_r13 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("outside", day_r13.outside)("in-range", ctx_r1.isInRange(day_r13))("range-start", ctx_r1.isRangeStart(day_r13))("range-end", ctx_r1.isRangeEnd(day_r13));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", day_r13.day, " ");
} }
function PeriodPickerComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 23)(1, "div", 24)(2, "div")(3, "span")(4, "small");
    i0.ɵɵtext(5, "Inicio");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, PeriodPickerComponent_div_5_ion_icon_8_Template, 1, 0, "ion-icon", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "ion-icon", 12);
    i0.ɵɵelementStart(10, "div")(11, "span")(12, "small");
    i0.ɵɵtext(13, "Fin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(16, PeriodPickerComponent_div_5_ion_icon_16_Template, 1, 0, "ion-icon", 16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 25)(18, "header")(19, "button", 19);
    i0.ɵɵlistener("click", function PeriodPickerComponent_div_5_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.previousMonth()); });
    i0.ɵɵelement(20, "ion-icon", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div")(22, "strong");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "button", 20);
    i0.ɵɵlistener("click", function PeriodPickerComponent_div_5_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.nextMonth()); });
    i0.ɵɵelement(25, "ion-icon", 12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 26);
    i0.ɵɵtemplate(27, PeriodPickerComponent_div_5_span_27_Template, 2, 1, "span", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 28);
    i0.ɵɵtemplate(29, PeriodPickerComponent_div_5_button_29_Template, 2, 9, "button", 29);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("selected", ctx_r1.customStartDate)("active", ctx_r1.customStartDate && !ctx_r1.customEndDate);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.formatSelectedDate(ctx_r1.customStartDate));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.customStartDate);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("selected", ctx_r1.customEndDate);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.formatSelectedDate(ctx_r1.customEndDate));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.customEndDate);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.calendarTitle);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.weekdays);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.calendarDays);
} }
function PeriodPickerComponent_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 30);
    i0.ɵɵtext(1, " Selecciona un rango de fechas v\u00E1lido. ");
    i0.ɵɵelementEnd();
} }
export class PeriodPickerComponent {
    constructor() {
        this.period = 'monthly';
        this.periodValue = '';
        this.startDate = '';
        this.endDate = '';
        this.valueChange = new EventEmitter();
        this.periodOptions = [
            { value: 'weekly', label: 'Semanal' },
            { value: 'monthly', label: 'Mensual' },
            { value: 'annual', label: 'Anual' },
            { value: 'custom', label: 'Rango' }
        ];
        this.months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        this.weekdays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        this.selectedPeriod = 'monthly';
        this.selectedYear = new Date().getFullYear();
        this.selectedMonth = new Date().getMonth() + 1;
        this.selectedWeek = 1;
        this.customStartDate = '';
        this.customEndDate = '';
        this.calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        this.calendarTitle = '';
        this.calendarDays = [];
        this.weeklyMonthTitle = '';
        this.weeksForSelectedMonth = [];
        this.monthYearFormatter = new Intl.DateTimeFormat('es-PE', {
            month: 'long', year: 'numeric'
        });
        this.weekRangeFormatter = new Intl.DateTimeFormat('es-PE', {
            day: 'numeric', month: 'short', timeZone: 'UTC'
        });
    }
    ngOnChanges(changes) {
        if (changes['period'] || changes['periodValue'] || changes['startDate'] || changes['endDate']) {
            this.reset();
        }
    }
    get isValid() {
        return this.selectedPeriod !== 'custom' || Boolean(this.customStartDate && this.customEndDate && this.customStartDate <= this.customEndDate);
    }
    refreshCalendar() {
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
    changePeriod(value) {
        this.selectedPeriod = value;
        if (this.selectedPeriod === 'custom') {
            this.focusCalendarOnSelection();
            this.refreshCalendar();
        }
        else if (this.selectedPeriod === 'weekly') {
            this.refreshWeeks();
            const selectedExists = this.weeksForSelectedMonth.some(week => week.value === this.selectedWeek);
            if (!selectedExists && this.weeksForSelectedMonth[0]) {
                this.selectedWeek = this.weeksForSelectedMonth[0].value;
            }
        }
        this.emitValue();
    }
    previousYear() {
        this.selectedYear--;
        this.normalizeWeek();
        this.emitValue();
    }
    nextYear() {
        this.selectedYear++;
        this.normalizeWeek();
        this.emitValue();
    }
    refreshWeeks() {
        const monthStart = `${this.selectedYear}-${String(this.selectedMonth).padStart(2, '0')}-01`;
        const monthEnd = this.localDate(new Date(this.selectedYear, this.selectedMonth, 0));
        this.weeksForSelectedMonth = Array.from({ length: this.isoWeeksInYear(this.selectedYear) }, (_, index) => index + 1)
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
    selectMonth(month) {
        this.selectedMonth = month;
        this.emitValue();
    }
    previousWeeklyMonth() {
        if (this.selectedMonth === 1) {
            this.selectedMonth = 12;
            this.selectedYear--;
        }
        else {
            this.selectedMonth--;
        }
        this.selectFirstWeekOfMonth();
    }
    nextWeeklyMonth() {
        if (this.selectedMonth === 12) {
            this.selectedMonth = 1;
            this.selectedYear++;
        }
        else {
            this.selectedMonth++;
        }
        this.selectFirstWeekOfMonth();
    }
    selectFirstWeekOfMonth() {
        this.refreshWeeks();
        const firstWeek = this.weeksForSelectedMonth[0];
        if (firstWeek)
            this.selectedWeek = firstWeek.value;
        this.emitValue();
    }
    selectWeek(week) {
        this.selectedWeek = week;
        this.emitValue();
    }
    previousMonth() {
        this.calendarMonth = new Date(this.calendarMonth.getFullYear(), this.calendarMonth.getMonth() - 1, 1);
        this.refreshCalendar();
    }
    nextMonth() {
        this.calendarMonth = new Date(this.calendarMonth.getFullYear(), this.calendarMonth.getMonth() + 1, 1);
        this.refreshCalendar();
    }
    selectCalendarDay(day) {
        if (!this.customStartDate || this.customEndDate || day.value < this.customStartDate) {
            this.customStartDate = day.value;
            this.customEndDate = '';
        }
        else {
            this.customEndDate = day.value;
        }
        if (day.outside) {
            const selected = this.parseLocalDate(day.value);
            this.calendarMonth = new Date(selected.getFullYear(), selected.getMonth(), 1);
            this.refreshCalendar();
        }
        this.emitValue();
    }
    isRangeStart(day) {
        return day.value === this.customStartDate;
    }
    isRangeEnd(day) {
        return day.value === this.customEndDate;
    }
    isInRange(day) {
        return Boolean(this.customStartDate && this.customEndDate &&
            day.value > this.customStartDate && day.value < this.customEndDate);
    }
    formatSelectedDate(value) {
        if (!value)
            return 'Seleccionar';
        return new Intl.DateTimeFormat('es-PE', {
            day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC'
        }).format(new Date(`${value}T00:00:00Z`));
    }
    reset() {
        this.selectedPeriod = this.period;
        this.customStartDate = this.startDate;
        this.customEndDate = this.endDate;
        this.focusCalendarOnSelection();
        const currentValue = this.periodValue || this.defaultPeriodValue(this.period);
        if (this.period === 'monthly') {
            const [year, month] = currentValue.split('-').map(Number);
            this.selectedYear = year;
            this.selectedMonth = month;
        }
        else if (this.period === 'annual') {
            this.selectedYear = Number(currentValue);
        }
        else if (this.period === 'weekly') {
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
    emitValue() {
        const value = this.resolveValue();
        if (value)
            this.valueChange.emit(value);
    }
    resolveValue() {
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
    defaultPeriodValue(period) {
        const today = new Date();
        if (period === 'monthly')
            return this.localDate(today).slice(0, 7);
        if (period === 'annual')
            return String(today.getFullYear());
        if (period === 'weekly')
            return this.isoWeek(today);
        return '';
    }
    normalizeWeek() {
        this.selectedWeek = Math.min(this.selectedWeek, this.isoWeeksInYear(this.selectedYear));
    }
    weekRange(year, week) {
        const januaryFourth = new Date(Date.UTC(year, 0, 4));
        const monday = new Date(januaryFourth);
        monday.setUTCDate(januaryFourth.getUTCDate() - (januaryFourth.getUTCDay() || 7) + 1 + (week - 1) * 7);
        const sunday = new Date(monday);
        sunday.setUTCDate(monday.getUTCDate() + 6);
        return { startDate: monday.toISOString().slice(0, 10), endDate: sunday.toISOString().slice(0, 10) };
    }
    isoWeeksInYear(year) {
        return Number(this.isoWeek(new Date(year, 11, 28)).slice(-2));
    }
    isoWeek(date) {
        const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        utc.setUTCDate(utc.getUTCDate() + 4 - (utc.getUTCDay() || 7));
        const start = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
        const week = Math.ceil((((utc.getTime() - start.getTime()) / 86400000) + 1) / 7);
        return `${utc.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
    }
    weekCardRange(year, week) {
        const range = this.weekRange(year, week);
        const start = new Date(`${range.startDate}T00:00:00Z`);
        const end = new Date(`${range.endDate}T00:00:00Z`);
        return `${this.weekRangeFormatter.format(start)} – ${this.weekRangeFormatter.format(end)}`;
    }
    localDate(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
    focusCalendarOnSelection() {
        const reference = this.customStartDate ? this.parseLocalDate(this.customStartDate) : new Date();
        this.calendarMonth = new Date(reference.getFullYear(), reference.getMonth(), 1);
    }
    parseLocalDate(value) {
        const [year, month, day] = value.split('-').map(Number);
        return new Date(year, month - 1, day);
    }
    static { this.ɵfac = function PeriodPickerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PeriodPickerComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PeriodPickerComponent, selectors: [["app-period-picker"]], inputs: { period: "period", periodValue: "periodValue", startDate: "startDate", endDate: "endDate" }, outputs: { valueChange: "valueChange" }, features: [i0.ɵɵNgOnChangesFeature], decls: 7, vars: 7, consts: [["aria-label", "Selector de fechas", 1, "period-picker"], ["segmentClass", "period-picker__segment", 3, "modelChange", "options", "model"], ["class", "period-picker__monthly", 4, "ngIf"], ["class", "period-picker__weekly", 4, "ngIf"], ["class", "period-picker__annual-selector", 4, "ngIf"], ["class", "period-picker__custom", 4, "ngIf"], ["class", "period-picker__error", 4, "ngIf"], [1, "period-picker__monthly"], [1, "period-picker__option-nav"], ["type", "button", "aria-label", "A\u00F1o anterior", 3, "click"], ["src", "assets/icon/left-inline.svg"], ["type", "button", "aria-label", "A\u00F1o siguiente", 3, "click"], ["src", "assets/icon/right-inline.svg"], [1, "period-picker__month-cards"], ["type", "button", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", 3, "click"], ["src", "assets/icon/check.svg", 4, "ngIf"], ["src", "assets/icon/check.svg"], [1, "period-picker__weekly"], ["type", "button", "aria-label", "Mes anterior", 3, "click"], ["type", "button", "aria-label", "Mes siguiente", 3, "click"], ["aria-label", "Semanas del mes", 1, "period-picker__week-cards"], [1, "period-picker__annual-selector"], [1, "period-picker__custom"], [1, "period-picker__range-summary"], [1, "period-picker__calendar"], [1, "period-picker__weekdays"], [4, "ngFor", "ngForOf"], [1, "period-picker__days"], ["type", "button", 3, "outside", "in-range", "range-start", "range-end", "click", 4, "ngFor", "ngForOf"], [1, "period-picker__error"]], template: function PeriodPickerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "app-custom-segment", 1);
            i0.ɵɵlistener("modelChange", function PeriodPickerComponent_Template_app_custom_segment_modelChange_1_listener($event) { return ctx.changePeriod($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(2, PeriodPickerComponent_div_2_Template, 13, 2, "div", 2)(3, PeriodPickerComponent_div_3_Template, 13, 2, "div", 3)(4, PeriodPickerComponent_div_4_Template, 10, 1, "div", 4)(5, PeriodPickerComponent_div_5_Template, 30, 13, "div", 5)(6, PeriodPickerComponent_p_6_Template, 2, 0, "p", 6);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("options", ctx.periodOptions)("model", ctx.selectedPeriod);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedPeriod === "monthly");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedPeriod === "weekly");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedPeriod === "annual");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedPeriod === "custom");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedPeriod === "custom" && !ctx.isValid);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, IonIcon, CustomSegmentComponent], styles: [".period-picker[_ngcontent-%COMP%] { display: grid; align-content: start; gap: 13px; }\n[_nghost-%COMP%]     .period-picker__segment.custom-segment { min-height: 46px; margin: 0; padding: 4px; border: 1px solid rgba(67,97,238,.05); border-radius: 14px; background: #f0f2f8; }\n.period-picker__annual-selector[_ngcontent-%COMP%], .period-picker__option-nav[_ngcontent-%COMP%] { display: grid; box-sizing: border-box; grid-template-columns: 38px minmax(0, 1fr) 38px; width: 100%; height: 56px; align-self: start; align-items: center; gap: 9px; padding: 9px; border: 1px solid rgba(67,97,238,.16); border-radius: 14px; background: linear-gradient(145deg, #f8f6ff, #eef3ff); box-shadow: 0 6px 16px rgba(58,12,163,.06); }\n.period-picker__annual-selector[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%], .period-picker__option-nav[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%] { display: grid; width: 36px; height: 36px; padding: 0; border: 1px solid rgba(67,97,238,.14); border-radius: 10px; background: rgba(255,255,255,.9); color: #3a0ca3; box-shadow: 0 3px 8px rgba(16,24,40,.04); place-items: center; }\n.period-picker__annual-selector[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], .period-picker__option-nav[_ngcontent-%COMP%]    > button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] { width: 20px; height: 20px; }\n.period-picker__annual-selector[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%], .period-picker__option-nav[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { display: grid; gap: 2px; place-items: center; text-align: center; }\n.period-picker__annual-selector[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .period-picker__option-nav[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #667085; font-size: var(--fv-type-caption-2); font-weight: 700; letter-spacing: .4px; text-transform: uppercase; }\n.period-picker__annual-selector[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .period-picker__option-nav[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #3a0ca3; font-size: 15px; line-height: 1.2; }\n.period-picker__monthly[_ngcontent-%COMP%], .period-picker__weekly[_ngcontent-%COMP%] { display: grid; gap: 11px; min-width: 0; }\n.period-picker__month-cards[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }\n.period-picker__month-cards[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { display: flex; min-width: 0; min-height: 43px; align-items: center; justify-content: center; gap: 5px; padding: 7px 5px; border: 1px solid #e4e8f1; border-radius: 12px; background: #fff; color: #344054; font: inherit; font-size: var(--fv-type-caption-1); font-weight: 700; }\n.period-picker__month-cards[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] { width: 12px; flex: 0 0 12px; }\n.period-picker__month-cards[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] { border-color: rgba(67,97,238,.45); background: linear-gradient(135deg, #f3efff, #edf2ff); color: #3a0ca3; box-shadow: 0 5px 12px rgba(58,12,163,.1); }\n.period-picker__week-cards[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }\n.period-picker__week-cards[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { display: flex; min-width: 0; min-height: 52px; align-items: center; justify-content: space-between; gap: 5px; padding: 8px 10px; border: 1px solid #e1e6ef; border-radius: 12px; background: #fff; color: #344054; font: inherit; text-align: left; transition: transform .16s ease, border-color .16s ease, background .16s ease; }\n.period-picker__week-cards[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:last-child:nth-child(odd) { grid-column: 1 / -1; }\n.period-picker__week-cards[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { display: grid; min-width: 0; gap: 3px; }\n.period-picker__week-cards[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #667085; font-size: var(--fv-type-caption-2); font-weight: 700; text-transform: uppercase; }\n.period-picker__week-cards[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { overflow: hidden; font-size: var(--fv-type-caption-1); text-overflow: ellipsis; white-space: nowrap; }\n.period-picker__week-cards[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]    > ion-icon[_ngcontent-%COMP%] { width: 14px; flex: 0 0 14px; }\n.period-picker__week-cards[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%] { border-color: rgba(67,97,238,.5); background: linear-gradient(135deg, #f3efff, #edf2ff); color: #3a0ca3; box-shadow: 0 5px 12px rgba(58,12,163,.1); }\n.period-picker__week-cards[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:active { transform: scale(.98); }\n.period-picker__week-cards[_ngcontent-%COMP%]   button.selected[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #4361ee; }\n.period-picker__custom[_ngcontent-%COMP%] { display: grid; gap: 12px; }\n.period-picker__range-summary[_ngcontent-%COMP%] { display: grid; grid-template-columns: 1fr 20px 1fr; align-items: center; gap: 6px; }\n.period-picker__range-summary[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { display: flex; min-width: 0; min-height: 49px; align-items: center; justify-content: space-between; gap: 5px; padding: 8px 10px; border: 1px solid #e4e8f1; border-radius: 12px; background: #fff; }\n.period-picker__range-summary[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] { display: grid; min-width: 0; gap: 3px; }\n.period-picker__range-summary[_ngcontent-%COMP%]    > div.selected[_ngcontent-%COMP%] { border-color: rgba(67,97,238,.45); background: linear-gradient(135deg, #f3efff, #edf2ff); color: #3a0ca3; box-shadow: 0 5px 12px rgba(58,12,163,.1); }\n.period-picker__range-summary[_ngcontent-%COMP%]    > div.active[_ngcontent-%COMP%] { border-color: #4361ee; box-shadow: 0 0 0 2px rgba(67,97,238,.1), 0 5px 12px rgba(58,12,163,.1); }\n.period-picker__range-summary[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]    > ion-icon[_ngcontent-%COMP%] { width: 13px; height: 13px; flex: 0 0 13px; color: #4361ee; }\n.period-picker__range-summary[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #667085; font-size: var(--fv-type-caption-2); font-weight: 700; text-transform: uppercase; }\n.period-picker__range-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { overflow: hidden; color: #1d2939; font-size: var(--fv-type-caption-1); text-overflow: ellipsis; white-space: nowrap; }\n.period-picker__range-summary[_ngcontent-%COMP%]    > div.selected[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #3a0ca3; }\n.period-picker__range-summary[_ngcontent-%COMP%]    > ion-icon[_ngcontent-%COMP%] { width: 14px; color: #98a2b3; }\n.period-picker__calendar[_ngcontent-%COMP%] { padding: 9px; border: 1px solid #e6eaf2; border-radius: 17px; background: #fff; box-shadow: 0 8px 22px rgba(16,24,40,.06); }\n.period-picker__calendar[_ngcontent-%COMP%]   header[_ngcontent-%COMP%] { display: grid; box-sizing: border-box; grid-template-columns: 38px minmax(0, 1fr) 38px; height: 56px; align-items: center; gap: 9px; margin-bottom: 8px; padding: 9px; border: 1px solid rgba(67,97,238,.16); border-radius: 13px; background: linear-gradient(145deg, #f8f6ff, #eef3ff); text-align: center; }\n.period-picker__calendar[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] { display: grid; gap: 2px; place-items: center; }\n.period-picker__calendar[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: #667085; font-size: var(--fv-type-caption-2); font-weight: 700; letter-spacing: .4px; text-transform: uppercase; }\n.period-picker__calendar[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { color: #3a0ca3; font-size: var(--fv-type-subhead); }\n.period-picker__calendar[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { display: grid; width: 36px; height: 36px; padding: 0; border: 1px solid rgba(67,97,238,.14); border-radius: 10px; background: rgba(255,255,255,.9); color: #3a0ca3; box-shadow: 0 3px 8px rgba(16,24,40,.04); place-items: center; }\n.period-picker__calendar[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] { width: 19px; height: 19px; }\n.period-picker__weekdays[_ngcontent-%COMP%], .period-picker__days[_ngcontent-%COMP%] { display: grid; grid-template-columns: repeat(7, 1fr); }\n.period-picker__weekdays[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { padding: 5px 0 7px; color: #98a2b3; font-size: var(--fv-type-caption-2); font-weight: 700; text-align: center; }\n.period-picker__days[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { position: relative; min-width: 0; height: 32px; padding: 0; border: 0; background: transparent; color: #344054; font: inherit; font-size: var(--fv-type-footnote); z-index: 0; }\n.period-picker__days[_ngcontent-%COMP%]   button.outside[_ngcontent-%COMP%] { color: #c5cad3; }\n.period-picker__days[_ngcontent-%COMP%]   button.in-range[_ngcontent-%COMP%] { background: #eef1ff; color: #3a0ca3; }\n.period-picker__days[_ngcontent-%COMP%]   button.range-start[_ngcontent-%COMP%], .period-picker__days[_ngcontent-%COMP%]   button.range-end[_ngcontent-%COMP%] { border-radius: 10px; background: linear-gradient(135deg, #3a0ca3, #4361ee); color: #fff; font-weight: 700; box-shadow: 0 4px 9px rgba(58,12,163,.2); }\n.period-picker__error[_ngcontent-%COMP%] { margin: -8px 0 0; color: #dc2626; font-size: var(--fv-type-caption-1); }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PeriodPickerComponent, [{
        type: Component,
        args: [{ selector: 'app-period-picker', standalone: true, imports: [CommonModule, IonIcon, CustomSegmentComponent], template: "<section class=\"period-picker\" aria-label=\"Selector de fechas\">\n  <app-custom-segment\n    [options]=\"periodOptions\"\n    [model]=\"selectedPeriod\"\n    segmentClass=\"period-picker__segment\"\n    (modelChange)=\"changePeriod($event)\">\n  </app-custom-segment>\n\n  <div *ngIf=\"selectedPeriod === 'monthly'\" class=\"period-picker__monthly\">\n    <div class=\"period-picker__option-nav\">\n      <button type=\"button\" aria-label=\"A\u00F1o anterior\" (click)=\"previousYear()\">\n        <ion-icon src=\"assets/icon/left-inline.svg\"></ion-icon>\n      </button>\n      <div>\n        <small>Selecciona un mes</small>\n        <strong>{{ selectedYear }}</strong>\n      </div>\n      <button type=\"button\" aria-label=\"A\u00F1o siguiente\" (click)=\"nextYear()\">\n        <ion-icon src=\"assets/icon/right-inline.svg\"></ion-icon>\n      </button>\n    </div>\n\n    <div class=\"period-picker__month-cards\">\n      <button\n        *ngFor=\"let month of months; let index = index\"\n        type=\"button\"\n        [class.selected]=\"selectedMonth === index + 1\"\n        (click)=\"selectMonth(index + 1)\">\n        <span>{{ month }}</span>\n        <ion-icon *ngIf=\"selectedMonth === index + 1\" src=\"assets/icon/check.svg\"></ion-icon>\n      </button>\n    </div>\n  </div>\n\n  <div *ngIf=\"selectedPeriod === 'weekly'\" class=\"period-picker__weekly\">\n    <div class=\"period-picker__option-nav\">\n      <button type=\"button\" aria-label=\"Mes anterior\" (click)=\"previousWeeklyMonth()\">\n        <ion-icon src=\"assets/icon/left-inline.svg\"></ion-icon>\n      </button>\n      <div>\n        <small>Selecciona una semana</small>\n        <strong>{{ weeklyMonthTitle }}</strong>\n      </div>\n      <button type=\"button\" aria-label=\"Mes siguiente\" (click)=\"nextWeeklyMonth()\">\n        <ion-icon src=\"assets/icon/right-inline.svg\"></ion-icon>\n      </button>\n    </div>\n\n    <div class=\"period-picker__week-cards\" aria-label=\"Semanas del mes\">\n      <button\n        *ngFor=\"let week of weeksForSelectedMonth\"\n        type=\"button\"\n        [class.selected]=\"selectedWeek === week.value\"\n        (click)=\"selectWeek(week.value)\">\n        <span>\n          <small>{{ week.label }}</small>\n          <strong>{{ week.range }}</strong>\n        </span>\n        <ion-icon *ngIf=\"selectedWeek === week.value\" src=\"assets/icon/check.svg\"></ion-icon>\n      </button>\n    </div>\n  </div>\n\n  <div *ngIf=\"selectedPeriod === 'annual'\" class=\"period-picker__annual-selector\">\n    <button type=\"button\" aria-label=\"A\u00F1o anterior\" (click)=\"previousYear()\">\n      <ion-icon src=\"assets/icon/left-inline.svg\"></ion-icon>\n    </button>\n    <div>\n      <small>Selecciona un a\u00F1o</small>\n      <strong>{{ selectedYear }}</strong>\n    </div>\n    <button type=\"button\" aria-label=\"A\u00F1o siguiente\" (click)=\"nextYear()\">\n      <ion-icon src=\"assets/icon/right-inline.svg\"></ion-icon>\n    </button>\n  </div>\n\n  <div *ngIf=\"selectedPeriod === 'custom'\" class=\"period-picker__custom\">\n    <div class=\"period-picker__range-summary\">\n      <div\n        [class.selected]=\"customStartDate\"\n        [class.active]=\"customStartDate && !customEndDate\">\n        <span>\n          <small>Inicio</small>\n          <strong>{{ formatSelectedDate(customStartDate) }}</strong>\n        </span>\n        <ion-icon *ngIf=\"customStartDate\" src=\"assets/icon/check.svg\"></ion-icon>\n      </div>\n      <ion-icon src=\"assets/icon/right-inline.svg\"></ion-icon>\n      <div [class.selected]=\"customEndDate\">\n        <span>\n          <small>Fin</small>\n          <strong>{{ formatSelectedDate(customEndDate) }}</strong>\n        </span>\n        <ion-icon *ngIf=\"customEndDate\" src=\"assets/icon/check.svg\"></ion-icon>\n      </div>\n    </div>\n\n    <div class=\"period-picker__calendar\">\n      <header>\n        <button type=\"button\" aria-label=\"Mes anterior\" (click)=\"previousMonth()\">\n          <ion-icon src=\"assets/icon/left-inline.svg\"></ion-icon>\n        </button>\n        <div>\n          <strong>{{ calendarTitle }}</strong>\n        </div>\n        <button type=\"button\" aria-label=\"Mes siguiente\" (click)=\"nextMonth()\">\n          <ion-icon src=\"assets/icon/right-inline.svg\"></ion-icon>\n        </button>\n      </header>\n\n      <div class=\"period-picker__weekdays\">\n        <span *ngFor=\"let weekday of weekdays\">{{ weekday }}</span>\n      </div>\n\n      <div class=\"period-picker__days\">\n        <button\n          *ngFor=\"let day of calendarDays\"\n          type=\"button\"\n          [class.outside]=\"day.outside\"\n          [class.in-range]=\"isInRange(day)\"\n          [class.range-start]=\"isRangeStart(day)\"\n          [class.range-end]=\"isRangeEnd(day)\"\n          (click)=\"selectCalendarDay(day)\">\n          {{ day.day }}\n        </button>\n      </div>\n    </div>\n  </div>\n\n  <p *ngIf=\"selectedPeriod === 'custom' && !isValid\" class=\"period-picker__error\">\n    Selecciona un rango de fechas v\u00E1lido.\n  </p>\n</section>\n", styles: [".period-picker { display: grid; align-content: start; gap: 13px; }\n:host ::ng-deep .period-picker__segment.custom-segment { min-height: 46px; margin: 0; padding: 4px; border: 1px solid rgba(67,97,238,.05); border-radius: 14px; background: #f0f2f8; }\n.period-picker__annual-selector, .period-picker__option-nav { display: grid; box-sizing: border-box; grid-template-columns: 38px minmax(0, 1fr) 38px; width: 100%; height: 56px; align-self: start; align-items: center; gap: 9px; padding: 9px; border: 1px solid rgba(67,97,238,.16); border-radius: 14px; background: linear-gradient(145deg, #f8f6ff, #eef3ff); box-shadow: 0 6px 16px rgba(58,12,163,.06); }\n.period-picker__annual-selector > button, .period-picker__option-nav > button { display: grid; width: 36px; height: 36px; padding: 0; border: 1px solid rgba(67,97,238,.14); border-radius: 10px; background: rgba(255,255,255,.9); color: #3a0ca3; box-shadow: 0 3px 8px rgba(16,24,40,.04); place-items: center; }\n.period-picker__annual-selector > button ion-icon, .period-picker__option-nav > button ion-icon { width: 20px; height: 20px; }\n.period-picker__annual-selector > div, .period-picker__option-nav > div { display: grid; gap: 2px; place-items: center; text-align: center; }\n.period-picker__annual-selector small, .period-picker__option-nav small { color: #667085; font-size: var(--fv-type-caption-2); font-weight: 700; letter-spacing: .4px; text-transform: uppercase; }\n.period-picker__annual-selector strong, .period-picker__option-nav strong { color: #3a0ca3; font-size: 15px; line-height: 1.2; }\n.period-picker__monthly, .period-picker__weekly { display: grid; gap: 11px; min-width: 0; }\n.period-picker__month-cards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }\n.period-picker__month-cards button { display: flex; min-width: 0; min-height: 43px; align-items: center; justify-content: center; gap: 5px; padding: 7px 5px; border: 1px solid #e4e8f1; border-radius: 12px; background: #fff; color: #344054; font: inherit; font-size: var(--fv-type-caption-1); font-weight: 700; }\n.period-picker__month-cards button ion-icon { width: 12px; flex: 0 0 12px; }\n.period-picker__month-cards button.selected { border-color: rgba(67,97,238,.45); background: linear-gradient(135deg, #f3efff, #edf2ff); color: #3a0ca3; box-shadow: 0 5px 12px rgba(58,12,163,.1); }\n.period-picker__week-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }\n.period-picker__week-cards button { display: flex; min-width: 0; min-height: 52px; align-items: center; justify-content: space-between; gap: 5px; padding: 8px 10px; border: 1px solid #e1e6ef; border-radius: 12px; background: #fff; color: #344054; font: inherit; text-align: left; transition: transform .16s ease, border-color .16s ease, background .16s ease; }\n.period-picker__week-cards button:last-child:nth-child(odd) { grid-column: 1 / -1; }\n.period-picker__week-cards button > span { display: grid; min-width: 0; gap: 3px; }\n.period-picker__week-cards small { color: #667085; font-size: var(--fv-type-caption-2); font-weight: 700; text-transform: uppercase; }\n.period-picker__week-cards strong { overflow: hidden; font-size: var(--fv-type-caption-1); text-overflow: ellipsis; white-space: nowrap; }\n.period-picker__week-cards button > ion-icon { width: 14px; flex: 0 0 14px; }\n.period-picker__week-cards button.selected { border-color: rgba(67,97,238,.5); background: linear-gradient(135deg, #f3efff, #edf2ff); color: #3a0ca3; box-shadow: 0 5px 12px rgba(58,12,163,.1); }\n.period-picker__week-cards button:active { transform: scale(.98); }\n.period-picker__week-cards button.selected small { color: #4361ee; }\n.period-picker__custom { display: grid; gap: 12px; }\n.period-picker__range-summary { display: grid; grid-template-columns: 1fr 20px 1fr; align-items: center; gap: 6px; }\n.period-picker__range-summary > div { display: flex; min-width: 0; min-height: 49px; align-items: center; justify-content: space-between; gap: 5px; padding: 8px 10px; border: 1px solid #e4e8f1; border-radius: 12px; background: #fff; }\n.period-picker__range-summary > div > span { display: grid; min-width: 0; gap: 3px; }\n.period-picker__range-summary > div.selected { border-color: rgba(67,97,238,.45); background: linear-gradient(135deg, #f3efff, #edf2ff); color: #3a0ca3; box-shadow: 0 5px 12px rgba(58,12,163,.1); }\n.period-picker__range-summary > div.active { border-color: #4361ee; box-shadow: 0 0 0 2px rgba(67,97,238,.1), 0 5px 12px rgba(58,12,163,.1); }\n.period-picker__range-summary > div > ion-icon { width: 13px; height: 13px; flex: 0 0 13px; color: #4361ee; }\n.period-picker__range-summary small { color: #667085; font-size: var(--fv-type-caption-2); font-weight: 700; text-transform: uppercase; }\n.period-picker__range-summary strong { overflow: hidden; color: #1d2939; font-size: var(--fv-type-caption-1); text-overflow: ellipsis; white-space: nowrap; }\n.period-picker__range-summary > div.selected strong { color: #3a0ca3; }\n.period-picker__range-summary > ion-icon { width: 14px; color: #98a2b3; }\n.period-picker__calendar { padding: 9px; border: 1px solid #e6eaf2; border-radius: 17px; background: #fff; box-shadow: 0 8px 22px rgba(16,24,40,.06); }\n.period-picker__calendar header { display: grid; box-sizing: border-box; grid-template-columns: 38px minmax(0, 1fr) 38px; height: 56px; align-items: center; gap: 9px; margin-bottom: 8px; padding: 9px; border: 1px solid rgba(67,97,238,.16); border-radius: 13px; background: linear-gradient(145deg, #f8f6ff, #eef3ff); text-align: center; }\n.period-picker__calendar header > div { display: grid; gap: 2px; place-items: center; }\n.period-picker__calendar header small { color: #667085; font-size: var(--fv-type-caption-2); font-weight: 700; letter-spacing: .4px; text-transform: uppercase; }\n.period-picker__calendar header strong { color: #3a0ca3; font-size: var(--fv-type-subhead); }\n.period-picker__calendar header button { display: grid; width: 36px; height: 36px; padding: 0; border: 1px solid rgba(67,97,238,.14); border-radius: 10px; background: rgba(255,255,255,.9); color: #3a0ca3; box-shadow: 0 3px 8px rgba(16,24,40,.04); place-items: center; }\n.period-picker__calendar header button ion-icon { width: 19px; height: 19px; }\n.period-picker__weekdays, .period-picker__days { display: grid; grid-template-columns: repeat(7, 1fr); }\n.period-picker__weekdays span { padding: 5px 0 7px; color: #98a2b3; font-size: var(--fv-type-caption-2); font-weight: 700; text-align: center; }\n.period-picker__days button { position: relative; min-width: 0; height: 32px; padding: 0; border: 0; background: transparent; color: #344054; font: inherit; font-size: var(--fv-type-footnote); z-index: 0; }\n.period-picker__days button.outside { color: #c5cad3; }\n.period-picker__days button.in-range { background: #eef1ff; color: #3a0ca3; }\n.period-picker__days button.range-start, .period-picker__days button.range-end { border-radius: 10px; background: linear-gradient(135deg, #3a0ca3, #4361ee); color: #fff; font-weight: 700; box-shadow: 0 4px 9px rgba(58,12,163,.2); }\n.period-picker__error { margin: -8px 0 0; color: #dc2626; font-size: var(--fv-type-caption-1); }\n"] }]
    }], null, { period: [{
            type: Input
        }], periodValue: [{
            type: Input
        }], startDate: [{
            type: Input
        }], endDate: [{
            type: Input
        }], valueChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PeriodPickerComponent, { className: "PeriodPickerComponent", filePath: "src/app/shared/components/period-picker/period-picker.component.ts", lineNumber: 34 }); })();
//# sourceMappingURL=period-picker.component.js.map