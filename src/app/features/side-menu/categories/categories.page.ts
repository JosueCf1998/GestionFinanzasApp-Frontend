import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CATEGORY_COLORS } from 'src/app/shared/constants/category-colors';
import { NavigationService } from "src/app/core/services/navigation.service";

const ALLOWED_CATEGORY_COLORS = [
  "blue", "yellow", "green", "red", "black", "pink", "orange", "purple", "teal", "brown", "gray", "cyan", "lime", "indigo", "gold"
];

interface Categoria {
  nombre: string;
  icono: string;
  color: string; // nombre del color permitido
}

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class CategoriesPage {
  categorias: { gastos: Categoria[]; ingresos: Categoria[] } = {
    gastos: [
      { nombre: "Salud", icono: "heart", color: "#c62828" },
      { nombre: "Educación", icono: "study", color: "#388e3c" },
      { nombre: "Alquiler", icono: "wallet", color: "#222" },
      { nombre: "Regalo", icono: "gift", color: "#1976d2" },
      { nombre: "Transporte", icono: "bus", color: "#fbc02d" },
      { nombre: "Comida", icono: "restaurant", color: "#ad1457" },
      { nombre: "Otros", icono: "question", color: "#616161" },
    ],
    ingresos: [
      { nombre: "Salario", icono: "salary", color: "#1976d2" },
      { nombre: "Regalo", icono: "gift", color: "#ad1457" },
      { nombre: "Interés", icono: "bank", color: "#388e3c" },
      { nombre: "Otros", icono: "question", color: "#616161" },
    ],
  };

  segment: "gastos" | "ingresos" = "gastos";

  constructor(
    private navService: NavigationService
  ) { }

  ngOnInit() {
  }

  onSegmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  goToCreateCategories(tipo: "gastos" | "ingresos") {
    this.navService.push('/categories/create', 'slide-left');
  }

  goToEditCategories(tipo: "gastos" | "ingresos") {
    this.navService.push('/categories/edit', 'slide-left');
  }

  get categoriasActuales() {
    return this.categorias[this.segment];
  }

}
