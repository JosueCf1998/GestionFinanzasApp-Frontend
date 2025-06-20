import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ICONOS_CATEGORIA, COLORES_CATEGORIA } from 'src/app/shared/constants/category-options';
import { NavigationService } from "src/app/core/services/navigation.service";
import { Router } from '@angular/router';
import { Categoria } from '../accounts.page';
import { CustomAlertComponent } from "../../../../shared/components/custom-alert/custom-alert.component";

@Component({
  selector: "app-create-account",
  templateUrl: "./create-account.page.html",
  styleUrls: ["./create-account.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomAlertComponent],
})
export class CreateAccountPage {
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
  private cambiosPendientes = false;
  private isFirstInput = true;

  constructor(
    private navService: NavigationService,
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

  seleccionarIcono(icon: any) {
    this.iconoSeleccionado = icon.archivo;
    this.iconoCategoria = icon.archivo;
    this.cambiosPendientes = this.iconoCategoria !== this.category.icono;
  }

  seleccionarColor(color: any) {
    this.colorSeleccionado = color.valor;
    this.colorCategoria = color.valor;
    this.cambiosPendientes = this.colorCategoria !== this.category.color;
  }

  anadirCategoria() {
    const nombreFinal = this.nombreCategoria.trim() === '' ? this.category.nombre : this.nombreCategoria.trim();
    if (!nombreFinal) {
      this.showError = true;
      return;
    }
    this.showError = false;
    const newCategory: Categoria = {
      nombre: nombreFinal,
      icono: this.iconoSeleccionado,
      color: this.colorSeleccionado
    };
    this.salirSinGuardar()
  }

  onInputNombreCategoria(event: any) {
    const value = event?.detail?.value ?? event?.target?.value ?? '';
    this.cambiosPendientes = value.trim() !== this.category.nombre;
  }

  clearNombreCategoria() {
    this.nombreCategoria = '';
    this.isFirstInput = true;
  }

  async backToCategories() {
    if (this.cambiosPendientes) {
      this.showCustomAlert = true;
    } else {
      (document.activeElement as HTMLElement)?.blur();
      this.navService.forward('/main/accounts', 'slide-right');
    }
  }

  salirSinGuardar() {
    this.showCustomAlert = false;
    (document.activeElement as HTMLElement)?.blur();
    this.navService.forward('/main/accounts', 'slide-right');
  }
}
