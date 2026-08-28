import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Categoria } from 'src/app/shared/models/categoria.model';
import { CustomSegmentComponent } from "src/app/shared/components/custom-segment/custom-segment.component";
import { ListCategoriesUseCase } from "src/app/core/use-cases/categories/list-categories.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import { CustomAlertComponent } from "src/app/shared/components/custom-alert/custom-alert.component";
import { AlertService } from "src/app/core/services/alert.service";
import { ItemIconComponent } from "src/app/shared/components/item-icon/item-icon.component";
import { FeatureHeaderComponent } from "src/app/shared/components/feature-header/feature-header.component";
import { InfoBannerComponent } from "src/app/shared/components/info-banner/info-banner.component";
import 'src/app/core/utils/observable-extensions';

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomSegmentComponent, CustomAlertComponent, ItemIconComponent, FeatureHeaderComponent, InfoBannerComponent],
})
export class CategoriesPage {

  showGenericAlert: boolean = false;
  dataTabs = [
    { value: 'gasto', label: 'Gasto' },
    { value: 'ingreso', label: 'Ingreso' }
  ];

  gastos: Categoria[] = [];
  ingresos: Categoria[] = [];
  segment: "gasto" | "ingreso" = "gasto";

  constructor(
    private navService: NavigationService,
    private listCategoriesUseCase: ListCategoriesUseCase,
    private loadingService: SpinnerService,
    private alertService: AlertService
  ) {
    this.executeListCategories();
  }

  // MARK: - SERVICIOS

  private executeListCategories() {
    this.loadingService.show();
    this.listCategoriesUseCase.execute().service({
      success: (data) => {
        this.loadingService.hide();
        if (data) {
          this.ingresos = data.items.filter(cat => cat.tipo === "ingreso");
          this.gastos = data.items.filter(cat => cat.tipo === "gasto");
        } else {
          this.showGenericAlert = true;
        }
      },
      failure: () => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  // MARK: - FUNCIONES

  onSegmentChanged(value: string) {
    if (value === "gasto" || value === "ingreso") {
      this.segment = value as "gasto" | "ingreso";
    }
  }

  goToCreateCategories(type: "gasto" | "ingreso") {
    this.navService.push('/categories/create', { type });
  }

  goToEditCategories(type: "gasto" | "ingreso", category: Categoria) {
    if (category.usuario_id == null) {
      this.alertService.showAlert(
        'Categoría del Sistema',
        'Esta es una categoría predeterminada del sistema y no puede ser modificada.',
        'Entendido'
      );
      return;
    }
    this.navService.push('/categories/edit', { type, category });
  }

  cerrarAlert() {
    this.showGenericAlert = false;
  }

  get categoriasActuales(): Categoria[] {
    return this.segment === 'gasto' ? this.gastos : this.ingresos;
  }

}
