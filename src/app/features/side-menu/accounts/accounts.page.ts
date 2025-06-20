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

export interface Categoria {
  nombre: string;
  icono: string;
  color: string; // nombre del color permitido
}

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.page.html",
  styleUrls: ["./accounts.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class AccountsPage {
  
  cuentas = [
    { nombre: 'Principal', saldo: 155, icono: 'dinero', color: '#BFD8CC' },
    { nombre: 'Ahorro', saldo: 0, icono: 'ahorro', color: '#F45B69' }
  ];

  constructor(
    private navService: NavigationService
  ) { }

  ngOnInit() {
  }

  get totalCuentas() {
    return this.cuentas.reduce((acc, c) => acc + c.saldo, 0);
  }

  goToCreateAccount() {

  }

  goToHistoryTransfer() {
    // Navega al historial de transferencias
  }

  goToNewTransfer() {
    // Navega a la pantalla de nueva transferencia
  }
  
}
