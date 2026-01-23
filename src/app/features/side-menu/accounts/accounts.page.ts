import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Accounts, ListAccountsUseCase } from "src/app/core/use-cases/Accounts/list-accounts.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.page.html",
  styleUrls: ["./accounts.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AccountsPage {

  showGenericAlert = false;
  showUnauthorizedAlert: boolean = false
  messageError: string = '';

  accountList: Accounts[] = [];

  constructor(
      private listAccountsUseCase: ListAccountsUseCase,
      private navService: NavigationService,
      private loadingService: SpinnerService,
  ) {
    this.executeAccountList();
  }

  // MARK: - SERVICIOS

  private executeAccountList() {
    this.loadingService.show();
    this.listAccountsUseCase.listAccounts().subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          this.accountList = result.data.items;
          // Mapear las cuentas del backend al formato de la UI
          // this.cuentas = result.data.cuentas.map(cuenta => this.listAccountsUseCase.mapToUI(cuenta));
        } else if (result.error) {
          if (result.error.description) {
            this.showUnauthorizedAlert = true;
            this.messageError = result.error.description;
          } else {
            this.showGenericAlert = true;
          }
        } else {
          this.showGenericAlert = true;
        }
      },
      error: (err) => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  // MARK: - FUNCIONES

  get totalCuentas() {
    return this.accountList.reduce((acc, c) => acc + c.amount, 0);
  }

  goToCreateAccount() {
    // Navegar a la ruta anidada bajo /main y pasar el tipo en el estado
    this.navService.push('/accounts/create-account', { type: 'crear' });
  }

  goToEditAccount(account: Accounts) {
    // Reutilizamos la pantalla de creación para edición pasando el estado
    this.navService.push('/accounts/create-account', { type: 'editar', account });
  }

  goToHistoryTransfer() {
    this.navService.push('/accounts/history-transfer', { });
  }

  goToNewTransfer() {
    this.navService.push('/accounts/new-transfer', { });
  }
}