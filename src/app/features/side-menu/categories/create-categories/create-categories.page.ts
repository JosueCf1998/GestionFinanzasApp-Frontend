import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { CATEGORY_ICONS, IconOption } from 'src/app/shared/constants/category-options';
import { ColorOption, PERSONALIZATION_COLORS } from 'src/app/shared/constants/personalization-options';

import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';

import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';

import 'src/app/core/utils/observable-extensions';
import { CreateCategoryUseCase, RegisterCategoryRequest } from 'src/app/core/use-cases/categories/register-category.usecase';
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { ItemIconComponent } from "src/app/shared/components/item-icon/item-icon.component";
import { TextFieldComponent } from 'src/app/shared/components/text-field/text-field.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { InfoBannerComponent } from 'src/app/shared/components/info-banner/info-banner.component';
import {
  PersonalizationModalComponent,
  PersonalizationValue
} from 'src/app/shared/components/personalization-modal/personalization-modal.component';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.page.html',
  styleUrls: ['./create-categories.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    CustomAlertComponent,
    CustomSegmentComponent,
    PageLayoutComponent,
    ButtonComponent,
    ItemIconComponent,
    TextFieldComponent,
    SectionCardComponent,
    InfoBannerComponent,
    PersonalizationModalComponent
]
})
export class CreateCategoriesPage {

  /* ==========================
     CONSTANTS
     ========================== */

  readonly categoryTypes = [
    {
      label: 'Gasto',
      value: 'gasto'
    },
    {
      label: 'Ingreso',
      value: 'ingreso'
    }
  ];

  readonly iconos = CATEGORY_ICONS;

  readonly colores = PERSONALIZATION_COLORS;

  /* ==========================
     FORM
     ========================== */

  tipoCategoria = 'gasto';

  nombreCategoria = '';

  iconoSeleccionado: string = CATEGORY_ICONS[0]?.icon ?? '';

  colorSeleccionado: string = PERSONALIZATION_COLORS[0]?.value ?? '';

  /* ==========================
     UI STATE
     ========================== */

  showError = false;

  showCustomAlert = false;

  showGenericAlert = false;

  isPersonalizationModalOpen = false;

  constructor(
    private registerCategoryUseCase: CreateCategoryUseCase,
    private navService: NavigationService,
    private loadingService: SpinnerService
  ) {
    this.initialize();
  }

  /* ==========================
     INIT
     ========================== */

  private initialize(): void {

    const state = window.history.state;

    if (!state?.type) {

      this.navService.forward(
        '/main/categories',
        'slide-right'
      );

      return;
    }

    this.tipoCategoria = state.type;
  }

  /* ==========================
     GETTERS
     ========================== */

  get colorCategoria(): string {

    return (
      this.colorSeleccionado ||
      '#d3d3d3'
    );
  }

  get iconoCategoria(): string {

    return this.iconoSeleccionado;
  }

  get puedeGuardar(): boolean {

    return Boolean(
      this.nombreCategoria.trim() &&
      this.iconoSeleccionado &&
      this.colorSeleccionado
    );
  }

  get hasChanges(): boolean {

    return Boolean(
      this.nombreCategoria.trim() ||
      this.iconoSeleccionado !== (CATEGORY_ICONS[0]?.icon ?? '') ||
      this.colorSeleccionado !== (PERSONALIZATION_COLORS[0]?.value ?? '')
    );
  }

  /* ==========================
     FORM ACTIONS
     ========================== */

  seleccionarIcono(option: IconOption): void {

    this.iconoSeleccionado =
      option.icon;
  }

  seleccionarColor(option: ColorOption): void {

    this.colorSeleccionado =
      option.value;
  }

  openPersonalizationModal(): void {
    this.isPersonalizationModalOpen = true;
  }

  closePersonalizationModal(): void {
    this.isPersonalizationModalOpen = false;
  }

  applyPersonalization(value: PersonalizationValue): void {
    this.iconoSeleccionado = value.icon;
    this.colorSeleccionado = value.color;
    this.closePersonalizationModal();
  }

  clearNombreCategoria(): void {

    this.nombreCategoria = '';
  }

  onInputNombreCategoria(): void {}

  /* ==========================
     CREATE CATEGORY
     ========================== */

  anadirCategoria(): void {

    if (!this.puedeGuardar) {

      this.showError = true;

      return;
    }

    this.showError = false;

    const body: RegisterCategoryRequest = {

      name:
        this.nombreCategoria.trim(),

      type:
        this.tipoCategoria,

      icon:
        this.iconoSeleccionado,

      color:
        this.colorSeleccionado
    };

    this.executeCreateCategory(body);
  }

  private executeCreateCategory(
    body: RegisterCategoryRequest
  ): void {

    this.loadingService.show();

    this.registerCategoryUseCase
      .registerCategory(body)
      .service({

        success: (data) => {

          this.loadingService.hide();

          if (!data) {

            this.showGenericAlert = true;

            return;
          }

          this.navService.back();
        },

        failure: () => {

          this.loadingService.hide();

          this.showGenericAlert = true;
        }
      });
  }

  /* ==========================
     NAVIGATION
     ========================== */

  backToCategories(): void {

    if (this.hasChanges) {

      this.showCustomAlert = true;

      return;
    }

    this.navService.back();
  }

  salirSinGuardar(): void {

    this.showCustomAlert = false;

    this.navService.back();
  }
}
