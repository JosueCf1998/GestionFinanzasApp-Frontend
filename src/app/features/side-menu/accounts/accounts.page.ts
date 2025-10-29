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
    //this.navService.push('/accounts/create-account', 'slide-left', { type: "crear" });
  }

  goToEditAccount(cuenta: any) {
    //this.navService.push('/accounts/create-account', 'slide-left', { type: "editar", cuenta });
  }

  goToHistoryTransfer() {
    //this.navService.push('/accounts/history-transfer', 'slide-left', { type: "gastos" });
  }

  goToNewTransfer() {
    //this.navService.push('/accounts/new-transfer', 'slide-left', { type: "gastos" });
  }
}