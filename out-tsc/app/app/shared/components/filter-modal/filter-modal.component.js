import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { PeriodPickerComponent } from '../period-picker/period-picker.component';
import * as i0 from "@angular/core";
export class FilterModalComponent {
    constructor() {
        this.isOpen = false;
        this.title = 'Filtros';
        this.description = 'Ajusta la información que deseas consultar.';
        this.applyText = 'Aplicar filtros';
        this.selectedPeriod = 'monthly';
        this.selectedPeriodValue = '';
        this.selectedStartDate = '';
        this.selectedEndDate = '';
        this.singleDate = false;
        this.modalClosed = new EventEmitter();
        this.filtersApplied = new EventEmitter();
        this.draftSelection = null;
    }
    ngOnChanges(changes) {
        if (changes['isOpen']?.currentValue === true) {
            this.resetDraft();
        }
    }
    get isDateRangeValid() {
        if (this.singleDate)
            return Boolean(this.draftSelection?.startDate || this.selectedStartDate);
        if (!this.draftSelection)
            return true;
        if (this.draftSelection.period !== 'custom')
            return true;
        return Boolean(this.draftSelection.startDate && this.draftSelection.endDate &&
            this.draftSelection.startDate <= this.draftSelection.endDate);
    }
    close() {
        this.resetDraft();
        this.modalClosed.emit();
    }
    updatePeriod(selection) {
        this.draftSelection = selection;
    }
    apply() {
        if (!this.isDateRangeValid)
            return;
        if (this.singleDate) {
            const selectedDate = this.draftSelection?.startDate || this.selectedStartDate;
            this.filtersApplied.emit({
                period: 'custom',
                periodValue: selectedDate,
                startDate: selectedDate,
                endDate: selectedDate
            });
            return;
        }
        this.filtersApplied.emit(this.draftSelection ?? {
            period: this.selectedPeriod,
            periodValue: this.selectedPeriodValue,
            startDate: this.selectedStartDate,
            endDate: this.selectedEndDate
        });
    }
    resetDraft() {
        this.draftSelection = null;
    }
    static { this.ɵfac = function FilterModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilterModalComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: FilterModalComponent, selectors: [["app-filter-modal"]], inputs: { isOpen: "isOpen", title: "title", description: "description", applyText: "applyText", selectedPeriod: "selectedPeriod", selectedPeriodValue: "selectedPeriodValue", selectedStartDate: "selectedStartDate", selectedEndDate: "selectedEndDate", singleDate: "singleDate" }, outputs: { modalClosed: "modalClosed", filtersApplied: "filtersApplied" }, features: [i0.ɵɵNgOnChangesFeature], decls: 2, vars: 10, consts: [[3, "closed", "primary", "isOpen", "title", "description", "primaryText", "primaryDisabled"], [3, "valueChange", "period", "periodValue", "startDate", "endDate", "singleDate"]], template: function FilterModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "app-base-modal", 0);
            i0.ɵɵlistener("closed", function FilterModalComponent_Template_app_base_modal_closed_0_listener() { return ctx.close(); })("primary", function FilterModalComponent_Template_app_base_modal_primary_0_listener() { return ctx.apply(); });
            i0.ɵɵelementStart(1, "app-period-picker", 1);
            i0.ɵɵlistener("valueChange", function FilterModalComponent_Template_app_period_picker_valueChange_1_listener($event) { return ctx.updatePeriod($event); });
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵproperty("isOpen", ctx.isOpen)("title", ctx.title)("description", ctx.description)("primaryText", ctx.applyText)("primaryDisabled", !ctx.isDateRangeValid);
            i0.ɵɵadvance();
            i0.ɵɵproperty("period", ctx.singleDate ? "custom" : ctx.selectedPeriod)("periodValue", ctx.selectedPeriodValue)("startDate", ctx.selectedStartDate)("endDate", ctx.selectedEndDate)("singleDate", ctx.singleDate);
        } }, dependencies: [BaseModalComponent, PeriodPickerComponent], styles: ["[_nghost-%COMP%] {\n  display: contents;\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterModalComponent, [{
        type: Component,
        args: [{ selector: 'app-filter-modal', standalone: true, imports: [BaseModalComponent, PeriodPickerComponent], template: "<app-base-modal\n  [isOpen]=\"isOpen\"\n  [title]=\"title\"\n  [description]=\"description\"\n  [primaryText]=\"applyText\"\n  [primaryDisabled]=\"!isDateRangeValid\"\n  (closed)=\"close()\"\n  (primary)=\"apply()\">\n  <app-period-picker\n    [period]=\"singleDate ? 'custom' : selectedPeriod\"\n    [periodValue]=\"selectedPeriodValue\"\n    [startDate]=\"selectedStartDate\"\n    [endDate]=\"selectedEndDate\"\n    [singleDate]=\"singleDate\"\n    (valueChange)=\"updatePeriod($event)\">\n  </app-period-picker>\n</app-base-modal>\n", styles: [":host {\n  display: contents;\n}\n"] }]
    }], null, { isOpen: [{
            type: Input
        }], title: [{
            type: Input
        }], description: [{
            type: Input
        }], applyText: [{
            type: Input
        }], selectedPeriod: [{
            type: Input
        }], selectedPeriodValue: [{
            type: Input
        }], selectedStartDate: [{
            type: Input
        }], selectedEndDate: [{
            type: Input
        }], singleDate: [{
            type: Input
        }], modalClosed: [{
            type: Output
        }], filtersApplied: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(FilterModalComponent, { className: "FilterModalComponent", filePath: "src/app/shared/components/filter-modal/filter-modal.component.ts", lineNumber: 25 }); })();
//# sourceMappingURL=filter-modal.component.js.map