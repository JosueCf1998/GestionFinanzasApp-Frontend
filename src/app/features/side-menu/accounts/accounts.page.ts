import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { NavigationService } from "src/app/core/services/navigation.service";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.page.html",
  styleUrls: ["./accounts.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AccountsPage {
  cuentas = [
    { nombre: 'Principal', saldo: 155, icono: 'bills', color: '#afb42b' },
    { nombre: 'Ahorro', saldo: 0, icono: 'money-bag', color: '#ad1457' }
  ];

  constructor(private navService: NavigationService) {}

  get totalCuentas() {
    return this.cuentas.reduce((acc, c) => acc + c.saldo, 0);
  }

  goToCreateAccount() {
    // Navegar a la ruta anidada bajo /main y pasar el tipo en el estado
    this.navService.push('/accounts/create-account', { type: 'crear' });
  }

  goToEditAccount(cuenta: any) {
    // Reutilizamos la pantalla de creación para edición pasando el estado
    this.navService.push('/accounts/create-account', { type: 'editar', cuenta });
  }

  goToHistoryTransfer() {
    this.navService.push('/accounts/history-transfer', { });
  }

  goToNewTransfer() {
    this.navService.push('/accounts/new-transfer', { });
  }
}