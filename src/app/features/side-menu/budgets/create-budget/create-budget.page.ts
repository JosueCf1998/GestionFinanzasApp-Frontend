import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  CreateBudgetRequest,
  CreateBudgetUseCase
} from 'src/app/core/use-cases/budgets/create-budget.usecase';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { AmountInputComponent } from 'src/app/shared/components/amount-input/amount-input.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { ItemIconComponent } from 'src/app/shared/components/item-icon/item-icon.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { IconPickerComponent } from 'src/app/shared/components/icon-picker/icon-picker.component';
import { ColorPickerComponent } from 'src/app/shared/components/color-picker/color-picker.component';
import {
  FilterModalComponent,
  FilterSelection
} from 'src/app/shared/components/filter-modal/filter-modal.component';
import { COLORES_CATEGORIA, ICONOS_CATEGORIA } from 'src/app/shared/constants/category-options';
import 'src/app/core/utils/observable-extensions';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.page.html',
  styleUrls: ['./create-budget.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmountInputComponent,
    ButtonComponent,
    CustomAlertComponent,
    ItemIconComponent,
    PageLayoutComponent,
    FilterModalComponent,
    SectionCardComponent,
    IconPickerComponent,
    ColorPickerComponent
  ]
})
export class CreateBudgetPage {
  readonly icons = ICONOS_CATEGORIA;
  readonly colors = COLORES_CATEGORIA;

  private readonly initialIcon = 'wallet';
  private readonly initialColor = '#388e3c';
  private readonly initialPeriod = this.currentMonthSelection();

  name = '';
  amount: number | null = null;
  selectedIcon = this.initialIcon;
  selectedColor = this.initialColor;
  periodSelection = { ...this.initialPeriod };

  showUnsavedAlert = false;
  showErrorAlert = false;
  isPeriodModalOpen = false;
  isSaving = false;

  constructor(
    private readonly createBudgetUseCase: CreateBudgetUseCase,
    private readonly navService: NavigationService,
    private readonly loadingService: SpinnerService
  ) {}

  get canSave(): boolean {
    return !this.isSaving && Boolean(
      this.name.trim() &&
      this.amount !== null &&
      Number.isFinite(this.amount) &&
      this.amount > 0 &&
      this.selectedIcon &&
      this.selectedColor &&
      this.periodSelection.startDate &&
      this.periodSelection.endDate &&
      this.periodSelection.startDate <= this.periodSelection.endDate
    );
  }

  get hasChanges(): boolean {
    return Boolean(
      this.name.trim() ||
      (this.amount !== null && this.amount > 0) ||
      this.selectedIcon !== this.initialIcon ||
      this.selectedColor !== this.initialColor ||
      this.periodSelection.period !== this.initialPeriod.period ||
      this.periodSelection.startDate !== this.initialPeriod.startDate ||
      this.periodSelection.endDate !== this.initialPeriod.endDate
    );
  }

  get periodLabel(): string {
    const labels: Record<FilterSelection['period'], string> = {
      weekly: 'Semanal',
      monthly: 'Mensual',
      annual: 'Anual',
      custom: 'Personalizado'
    };
    return labels[this.periodSelection.period];
  }

  get formattedDateRange(): string {
    if (!this.periodSelection.startDate || !this.periodSelection.endDate) {
      return 'Selecciona la vigencia';
    }

    const formatter = new Intl.DateTimeFormat('es-PE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC'
    });
    const start = new Date(`${this.periodSelection.startDate}T00:00:00Z`);
    const end = new Date(`${this.periodSelection.endDate}T00:00:00Z`);
    return `${formatter.format(start)} — ${formatter.format(end)}`;
  }

  openPeriodModal(): void {
    this.isPeriodModalOpen = true;
  }

  closePeriodModal(): void {
    this.isPeriodModalOpen = false;
  }

  applyPeriod(selection: FilterSelection): void {
    this.periodSelection = selection;
    this.closePeriodModal();
  }

  saveBudget(): void {
    if (!this.canSave || this.amount === null) return;

    const request: CreateBudgetRequest = {
      name: this.name.trim(),
      budgetAmount: Number(this.amount.toFixed(2)),
      startDate: this.periodSelection.startDate,
      endDate: this.periodSelection.endDate,
      icon: this.selectedIcon,
      color: this.selectedColor
    };

    console.log('Datos enviados para crear presupuesto:', request);
    this.isSaving = true;
    this.loadingService.show();
    this.createBudgetUseCase.execute(request).service({
      success: () => {
        this.loadingService.hide();
        this.isSaving = false;
        this.navService.back();
      },
      failure: error => {
        this.loadingService.hide();
        this.isSaving = false;
        console.error('Error al crear presupuesto:', error);
        this.showErrorAlert = true;
      }
    });
  }

  backToBudgets(): void {
    if (this.isSaving) return;

    if (this.hasChanges) {
      this.showUnsavedAlert = true;
      return;
    }

    this.navService.back();
  }

  leaveWithoutSaving(): void {
    this.showUnsavedAlert = false;
    this.navService.back();
  }

  private currentMonthSelection(): FilterSelection {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const lastDay = new Date(year, today.getMonth() + 1, 0).getDate();

    return {
      period: 'monthly',
      periodValue: `${year}-${month}`,
      startDate: `${year}-${month}-01`,
      endDate: `${year}-${month}-${String(lastDay).padStart(2, '0')}`
    };
  }
}
