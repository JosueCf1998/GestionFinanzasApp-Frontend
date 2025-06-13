import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CATEGORY_COLORS } from 'src/app/shared/constants/category-colors';

interface Categoria {
  nombre: string;
  icono: string;
  color: string; // nombre del color permitido
}

@Component({
  selector: "app-edit-categories",
  templateUrl: "./edit-categories.page.html",
  styleUrls: ["./edit-categories.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class EditCategoriesPage {
  
}
