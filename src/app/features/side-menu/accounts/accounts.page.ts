import { Component } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { NavigationService } from "src/app/core/services/navigation.service";
import { Accounts, ListAccountsUseCase } from "src/app/core/use-cases/accounts/list-accounts.usecase";
import 'src/app/core/utils/observable-extensions';
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { ItemIconComponent } from "src/app/shared/components/item-icon/item-icon.component";
import { FeatureHeaderComponent } from "src/app/shared/components/feature-header/feature-header.component";
import { ListSkeletonComponent } from "src/app/shared/components/list-skeleton/list-skeleton.component";

@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.page.html",
  styleUrls: ["./accounts.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, ButtonComponent, ItemIconComponent, FeatureHeaderComponent, ListSkeletonComponent],
})
export class AccountsPage {

  showGenericAlert = false;
  showUnauthorizedAlert: boolean = false
  messageError: string = '';

  accountList: Accounts[] = [];
  isLoading = false;

  constructor(
      private listAccountsUseCase: ListAccountsUseCase,
      private navService: NavigationService,
  ) {
    this.executeAccountList();
  }

  // MARK: - SERVICIOS

  private executeAccountList() {
    this.isLoading = true;
    this.listAccountsUseCase.listAccounts().service({
      success: (data) => {
        this.isLoading = false;
        if (data) {
          this.accountList = data.items;
        } else {
          this.showGenericAlert = true;
        }
      },
      failure: (error) => {
        this.isLoading = false;
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
