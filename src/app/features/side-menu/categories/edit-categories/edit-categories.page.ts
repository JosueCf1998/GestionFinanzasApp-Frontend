import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ICONOS_CATEGORIA, COLORES_CATEGORIA } from 'src/app/shared/constants/category-options';
import { NavigationService } from "src/app/core/services/navigation.service";
import { Router } from '@angular/router';
import { Categoria } from 'src/app/shared/models/categoria.model';
import { CustomAlertComponent } from "../../../../shared/components/custom-alert/custom-alert.component";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { UpdateCategoryRequest, UpdateCategoryUseCase } from "src/app/core/use-cases/categories/update-category.usecase";
import { DeleteCategoryUseCase } from "src/app/core/use-cases/categories/delete-category.usecase";
import 'src/app/core/utils/observable-extensions';

@Component({
  selector: "app-edit-categories",
  templateUrl: "./edit-categories.page.html",
  styleUrls: ["./edit-categories.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomAlertComponent],
})
export class EditCategoriesPage {
  tipoCategoria: string;
  category: Categoria;

  iconos = ICONOS_CATEGORIA;
  colores = COLORES_CATEGORIA;

  nombreCategoria: string = '';
  colorCategoria: string;
  iconoCategoria: string;

  iconoSeleccionado: string;
  colorSeleccionado: string;

  showError: boolean = false;
  showExitAlert = false;
  showDeleteAlert = false;
  showGenericAlert = false;
  showUnauthorizedAlert: boolean = false;
  messageError: string = '';
  private cambiosPendientes = false;
  private isFirstInput = true;

  constructor(
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
    private navService: NavigationService,
    private loadingService: SpinnerService,
    private router: Router
  ) {
    const state = window.history.state;
    if (!state || !state.type || !state.category) {
      this.navService.back();
      throw new Error('No se recibió la información necesaria para editar la categoría.');
    }
    this.tipoCategoria = state.type;
    this.category = state.category;
    this.nombreCategoria = this.category.nombre;
    this.iconoCategoria = this.category.icono;
    this.colorCategoria = this.category.color;
    this.iconoSeleccionado = this.category.icono;
    this.colorSeleccionado = this.category.color;
  }

  // MARK: - SERVICIOS

  private executeUpdateCategory(body: UpdateCategoryRequest) {
    this.loadingService.show();
    this.updateCategoryUseCase.updateCategory(body).service({
      success: (data) => {
        this.loadingService.hide();
        if (data) {
          this.cambiosPendientes = false;
          this.navService.back();
        } else {
          this.showGenericAlert = true;
        }
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  private executeDeleteCategory() {
    if (!this.category.id) {
      console.error('No hay ID de categoría para eliminar');
      this.showGenericAlert = true;
      return;
    }

    this.loadingService.show();
    this.deleteCategoryUseCase.deleteCategory({ id: this.category.id }).service({
      success: () => {
        this.loadingService.hide();
        this.cambiosPendientes = false;
        this.navService.back();
      },
      failure: (error) => {
        this.loadingService.hide();
        this.messageError = 'Error al eliminar la categoría';
        this.showGenericAlert = true;
      }
    });
  }

  // MARK: - FUNCIONALIDADES

  seleccionarIcono(icon: any) {
    this.iconoSeleccionado = icon.archivo;
    this.iconoCategoria = icon.archivo;
    this.detectarCambios();
  }

  seleccionarColor(color: any) {
    this.colorSeleccionado = color.valor;
    this.colorCategoria = color.valor;
    this.detectarCambios();
  }

  anadirCategoria() {
    const nombreFinal = this.nombreCategoria.trim() === '' ? this.category.nombre : this.nombreCategoria.trim();
    if (!nombreFinal || !this.iconoSeleccionado || !this.colorSeleccionado) {
      this.showError = true;
      return;
    }
    this.showError = false;
    
    if (!this.category.id) {
      console.error('No se puede actualizar la categoría sin ID');
      this.showGenericAlert = true;
      return;
    }

    const body: UpdateCategoryRequest = {
      id: this.category.id,
      name: nombreFinal,
      type: this.tipoCategoria,
      icon: this.iconoSeleccionado,
      color: this.colorSeleccionado
    };
    console.log('Cuerpo de la solicitud de actualización:', body);
    this.executeUpdateCategory(body);
  }

  onInputNombreCategoria(event: any) {
    const value = event?.detail?.value ?? event?.target?.value ?? '';
    this.detectarCambios();
  }

  private detectarCambios() {
    const nombreCambiado = this.nombreCategoria.trim() !== this.category.nombre;
    const iconoCambiado = this.iconoSeleccionado !== this.category.icono;
    const colorCambiado = this.colorSeleccionado !== this.category.color;
    
    this.cambiosPendientes = nombreCambiado || iconoCambiado || colorCambiado;
  }
  
  clearNombreCategoria() {
    this.nombreCategoria = '';
    this.isFirstInput = true;
  }

  async backToCategories() {
    if (this.cambiosPendientes) {
      this.showExitAlert = true;
    } else {
      (document.activeElement as HTMLElement)?.blur();
      this.navService.back();
    }
  }

  eliminarCategoria() {
    if (!this.category.id) {
      console.error('No hay ID de categoría para eliminar');
      return;
    }
    this.showDeleteAlert = true;
  }

  confirmarEliminacion() {
    this.showDeleteAlert = false;
    this.executeDeleteCategory();
  }

  cerrarAlert() {
    this.showExitAlert = false;
    this.showDeleteAlert = false;
    this.showGenericAlert = false;
    this.showUnauthorizedAlert = false;
  }

  get puedeGuardar(): boolean {
    const tieneNombre = this.nombreCategoria.trim() !== '';
    const tieneIcono = this.iconoSeleccionado !== '';
    const tieneColor = this.colorSeleccionado !== '';
    const hayCambios = this.cambiosPendientes;
    
    return tieneNombre && tieneIcono && tieneColor && hayCambios;
  }

  salirSinGuardar() {
    this.showExitAlert = false;
    (document.activeElement as HTMLElement)?.blur();
    this.navService.back();
  }
}
