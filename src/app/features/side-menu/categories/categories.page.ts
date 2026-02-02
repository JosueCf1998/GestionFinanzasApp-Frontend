import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Categoria } from 'src/app/shared/models/categoria.model';
import { CustomSegmentComponent } from "src/app/shared/components/custom-segment/custom-segment.component";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { ListCategoriesUseCase } from "src/app/core/use-cases/categories/list-categories.usecase";
import { CustomAlertComponent } from "src/app/shared/components/custom-alert/custom-alert.component";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomSegmentComponent, CustomAlertComponent],
})
export class CategoriesPage {

  showGenericAlert: boolean = false;
  dataTabs = [
    { value: 'gastos', label: 'Gasto' },
    { value: 'ingresos', label: 'Ingreso' }
  ];
  showSystemCategoryAlert = false;

  gastos: Categoria[] = [];
  ingresos: Categoria[] = [];
  segment: "gastos" | "ingresos" = "gastos";

  constructor(
    private navService: NavigationService,
    private listCategoriesUseCase: ListCategoriesUseCase,
    private loadingService: SpinnerService
  ) { 
    this.executeListCategories();
  }

  // MARK: - SERVICIOS

  private executeListCategories() {
    this.loadingService.show();
    this.listCategoriesUseCase.execute().subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          this.ingresos = result.data.items.filter(cat => cat.tipo === "ingresos");
          this.gastos = result.data.items.filter(cat => cat.tipo === "gastos");
        } else if (result.error) {
            this.showGenericAlert = true;
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

  // MARK: - FUNCIONES

  onSegmentChanged(value: string) {
    if (value === "gastos" || value === "ingresos") {
      this.segment = value as "gastos" | "ingresos";
    }
  }

  goToCreateCategories(type: "gastos" | "ingresos") {
    this.navService.push('/categories/create', { type });
  }

  goToEditCategories(type: "gastos" | "ingresos", category: Categoria) {
    if (category.usuario_id == null) {
      this.showSystemCategoryAlert = true;
      return;
    }
    this.navService.push('/categories/edit', { type, category });
  }
  
  cerrarAlert() {
    this.showSystemCategoryAlert = false;
    this.showGenericAlert = false;
  }
  
  get categoriasActuales(): Categoria[] {
    return this.segment === 'gastos' ? this.gastos : this.ingresos;
  }

}