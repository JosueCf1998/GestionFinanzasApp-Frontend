import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CATEGORY_COLORS } from 'src/app/shared/constants/category-colors';
import { NavigationService } from "src/app/core/services/navigation.service";
import { Categoria } from 'src/app/shared/models/categoria.model';
import { CustomSegmentComponent } from "src/app/shared/components/custom-segment/custom-segment.component";
import { RegisterServiceUseCase } from "src/app/core/use-cases/registerService.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { ListCategoriesServiceUseCase } from "src/app/core/use-cases/listCategoriesService.usecase";

const ALLOWED_CATEGORY_COLORS = [
  "blue", "yellow", "green", "red", "black", "pink", "orange", "purple", "teal", "brown", "gray", "cyan", "lime", "indigo", "gold"
];

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomSegmentComponent],
})
export class CategoriesPage {

  showGenericAlert: boolean = false;
  dataTabs = [
    { value: 'gastos', label: 'Gasto' },
    { value: 'ingresos', label: 'Ingreso' }
  ];

  gastos: Categoria[] = [];
  ingresos: Categoria[] = [];
  segment: "gastos" | "ingresos" = "gastos";

  constructor(
    private navService: NavigationService,
    private listCategoriesServiceUseCase: ListCategoriesServiceUseCase,
    private loadingService: SpinnerService
  ) { }

  ngOnInit() {
    this.listCategories();
  }

  onSegmentChanged(value: string) {
    if (value === "gastos" || value === "ingresos") {
      this.segment = value as "gastos" | "ingresos";
    }
}

  goToCreateCategories(type: "gastos" | "ingresos") {
    this.navService.push('/categories/create', 'slide-left', { type });
  }

  goToEditCategories(type: "gastos" | "ingresos", category: Categoria) {
    this.navService.push('/categories/edit', 'slide-left', { type, category });
  }

  listCategories() {
    this.executeListCategories();
  }
  
  get categoriasActuales(): Categoria[] {
    return this.segment === 'gastos' ? this.gastos : this.ingresos;
  }

  private executeListCategories() {
    this.loadingService.show();
    this.listCategoriesServiceUseCase.listCategories().subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          this.ingresos = result.data.items.filter(cat => cat.tipo === "ingreso");
          this.gastos = result.data.items.filter(cat => cat.tipo === "gasto");
        } else {
          this.showGenericAlert = true;
        }
      },
      error: () => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }
}