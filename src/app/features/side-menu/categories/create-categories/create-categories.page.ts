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
import { CreateCategoryRequest, CreateCategoryUseCase } from "src/app/core/use-cases/categories/create-category.usecase";
import 'src/app/core/utils/observable-extensions';

@Component({
  selector: "app-create-categories",
  templateUrl: "./create-categories.page.html",
  styleUrls: ["./create-categories.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomAlertComponent],
})
export class CreateCategoriesPage {
  tipoCategoria: string;
  category: Categoria = {
    nombre: "",
    icono: "",
    color: ""
  };
  
  iconos = ICONOS_CATEGORIA;
  colores = COLORES_CATEGORIA;

  nombreCategoria: string = '';
  colorCategoria: string = "";
  iconoCategoria: string = "";

  iconoSeleccionado: string = "";
  colorSeleccionado: string = "";

  showError: boolean = false;
  showCustomAlert = false;
  showGenericAlert = false;
  showUnauthorizedAlert: boolean = false;
  messageError: string = '';
  private cambiosPendientes = false;
  private isFirstInput = true;

  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private navService: NavigationService,
    private loadingService: SpinnerService,
    private router: Router
  ) {
    const state = window.history.state;
    if (!state || !state.type) {
      this.navService.forward('/main/categories', 'slide-right');
      throw new Error('No se recibió la información necesaria para editar la categoría.');
    }
    this.tipoCategoria = state.type;
    this.colorCategoria = "#d3d3d3";
  }

  // MARK: - SERVICIOS

  private executeCreateCategory(body: CreateCategoryRequest) {
    this.loadingService.show();
    this.createCategoryUseCase.createCategory(body).service({
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
    
    const body: CreateCategoryRequest = {
      name: nombreFinal,
      type: this.tipoCategoria,
      icon: this.iconoSeleccionado,
      color: this.colorSeleccionado
    };
    
    this.executeCreateCategory(body);
  }

  onInputNombreCategoria(event: any) {
    const value = event?.detail?.value ?? event?.target?.value ?? '';
    this.detectarCambios();
  }

  private detectarCambios() {
    const tieneNombre = this.nombreCategoria.trim() !== '';
    const tieneIcono = this.iconoSeleccionado !== '';
    const tieneColor = this.colorSeleccionado !== '';
    
    // En crear, hay cambios si el usuario ha ingresado algo
    this.cambiosPendientes = tieneNombre || tieneIcono || tieneColor;
  }

  clearNombreCategoria() {
    this.nombreCategoria = '';
    this.isFirstInput = true;
    this.detectarCambios();
  }

  get puedeGuardar(): boolean {
    const tieneNombre = this.nombreCategoria.trim() !== '';
    const tieneIcono = this.iconoSeleccionado !== '';
    const tieneColor = this.colorSeleccionado !== '';
    
    return tieneNombre && tieneIcono && tieneColor;
  }

  async backToCategories() {
    if (this.cambiosPendientes) {
      this.showCustomAlert = true;
    } else {
      (document.activeElement as HTMLElement)?.blur();
      this.navService.back();
    }
  }

  salirSinGuardar() {
    this.showCustomAlert = false;
    (document.activeElement as HTMLElement)?.blur();
    this.navService.back();
  }
}
