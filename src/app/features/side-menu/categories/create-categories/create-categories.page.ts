import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import {
  ICONOS_CATEGORIA,
  COLORES_CATEGORIA
} from 'src/app/shared/constants/category-options';

import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';

import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';
import { CustomSegmentComponent } from 'src/app/shared/components/custom-segment/custom-segment.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';

import 'src/app/core/utils/observable-extensions';
import { CreateCategoryUseCase, RegisterCategoryRequest } from 'src/app/core/use-cases/categories/register-category.usecase';
import { ButtonComponent } from "src/app/shared/components/button/button.component";

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
    ButtonComponent
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

  readonly iconos = ICONOS_CATEGORIA;

  readonly colores = COLORES_CATEGORIA;

  /* ==========================
     FORM
     ========================== */

  tipoCategoria = 'gasto';

  nombreCategoria = '';

  iconoSeleccionado = '';

  colorSeleccionado = '';

  /* ==========================
     UI STATE
     ========================== */

  showError = false;

  showCustomAlert = false;

  showGenericAlert = false;

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
      this.iconoSeleccionado ||
      this.colorSeleccionado
    );
  }

  /* ==========================
     FORM ACTIONS
     ========================== */

  seleccionarIcono(icon: { archivo: string }): void {

    this.iconoSeleccionado =
      icon.archivo;
  }

  seleccionarColor(color: { valor: string }): void {

    this.colorSeleccionado =
      color.valor;
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
