import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CATEGORY_COLORS } from 'src/app/shared/constants/category-colors';
import { NavigationService } from "src/app/core/services/navigation.service";

@Component({
  selector: "app-edit-categories",
  templateUrl: "./edit-categories.page.html",
  styleUrls: ["./edit-categories.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class EditCategoriesPage {
  nombreCategoria: string = '';
  tipoCategoria: string = 'gastos';
  iconos: string[] = ['heart', 'study', 'wallet', 'gift', 'bus', 'restaurant', 'question', 'salary', 'bank'];
  colores: string[] = Object.values(CATEGORY_COLORS);
  iconoSeleccionado: string = this.iconos[0];
  colorSeleccionado: string = this.colores[0];
  showError: boolean = false;

  constructor(
    private navService: NavigationService
  ) { }

  ngOnInit() {
  }

  backToCategories() {
    this.navService.forward('/main/categories', 'slide-right');
  }

  seleccionarIcono(icon: string) {
    this.iconoSeleccionado = icon;
  }

  seleccionarColor(color: string) {
    this.colorSeleccionado = color;
  }

  anadirCategoria() {
    if (!this.nombreCategoria) {
      this.showError = true;
      return;
    }
    this.showError = false;
    // Aquí puedes manejar el guardado de la categoría
    // ...
    this.backToCategories();
  }
}
