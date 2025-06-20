import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CATEGORY_COLORS } from 'src/app/shared/constants/category-colors';
import { NavigationService } from "src/app/core/services/navigation.service";

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
    { nombre: 'Principal', saldo: 155, icono: 'bills', color: '#afb42b' },
    { nombre: 'Ahorro', saldo: 0, icono: 'money-bag', color: '#ad1457' }
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
    let type: "crear" | "editar" = "crear";
    this.navService.push('/accounts/create-account', 'slide-left', { type });
  }

  goToEditAccount(cuenta: any) {
    let type: "crear" | "editar" = "editar";
    this.navService.push('/accounts/create-account', 'slide-left', { type, cuenta });
  }

  goToHistoryTransfer() {
    let type: "gastos" | "ingresos" = "gastos";
    this.navService.push('/accounts/history-transfer', 'slide-left', { type });
  }

  goToNewTransfer() {
    let type: "gastos" | "ingresos" = "gastos";
    this.navService.push('/accounts/new-transfer', 'slide-left', { type });
  }
  
}
