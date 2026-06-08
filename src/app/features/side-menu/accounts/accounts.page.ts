import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Accounts, ListAccountsUseCase } from "src/app/core/use-cases/accounts/list-accounts.usecase";
import { SpinnerService } from "src/app/core/services/spinnerService.service";
import 'src/app/core/utils/observable-extensions';

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
    this.listAccountsUseCase.listAccounts().service({
      success: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          this.accountList = result.data.items;
        } else if (result.error) {
          if ((result as any).error?.description) {
            this.showUnauthorizedAlert = true;
            this.messageError = (result as any).error.description;
          } else {
            this.showGenericAlert = true;
          }
        } else {
          this.showGenericAlert = true;
        }
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showGenericAlert = true;
      }
    });
  }

  // MARK: - FUNCIONES

  get totalCuentas(): number {
    return this.accountList.reduce((acc, c) => acc + Number(c.amount || 0), 0);
  }

  goToCreateAccount() {
    this.navService.push('/accounts/create-account', { type: 'crear' });
  }

  goToEditAccount(account: Accounts) {
    this.navService.push('/accounts/create-account', { 
      type: 'editar', 
      account: account
    });
  }

  goToHistoryTransfer() {
    this.navService.push('/accounts/history-transfer', { });
  }

  goToNewTransfer() {
    this.navService.push('/accounts/new-transfer', { });
  }
}