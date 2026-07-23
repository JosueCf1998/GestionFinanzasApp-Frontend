import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NavigationService } from 'src/app/core/services/navigation.service';
import { SpinnerService } from 'src/app/core/services/spinnerService.service';
import { LocalManagementService } from 'src/app/core/services/localManagementService.service';
import { KEY_MANAGEMENT } from 'src/app/core/constants/key-management.constants';
import 'src/app/core/utils/observable-extensions';

import { FeatureHeaderComponent } from 'src/app/shared/components/feature-header/feature-header.component';
import { SectionCardComponent } from 'src/app/shared/components/section-card/section-card.component';
import { WarningMessageComponent } from 'src/app/shared/components/warning-message/warning-message.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CustomAlertComponent } from 'src/app/shared/components/custom-alert/custom-alert.component';

import { DeactivateAccountUseCase } from 'src/app/core/use-cases/users/deactivate-account.usecase';
import { DeleteUserAccountUseCase } from 'src/app/core/use-cases/users/delete-user-account.usecase';
import { LogoutUserUseCase } from 'src/app/core/use-cases/users/logout-user.usecase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FeatureHeaderComponent,
    SectionCardComponent,
    WarningMessageComponent,
    ButtonComponent,
    CustomAlertComponent
  ],
})
export class ProfilePage {

  userName = '';
  userEmail = '';

  showDeactivateAlert = false;
  showDeleteAlert = false;
  showSuccessAlert = false;
  showErrorAlert = false;

  successMessage = '';
  errorMessage = '';

  constructor(
    private deactivateAccountUseCase: DeactivateAccountUseCase,
    private deleteUserAccountUseCase: DeleteUserAccountUseCase,
    private logoutUserUseCase: LogoutUserUseCase,
    private navService: NavigationService,
    private loadingService: SpinnerService,
    private localManagementService: LocalManagementService
  ) {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.userName = this.localManagementService.getVariable(KEY_MANAGEMENT.NAME) || '';
    this.userEmail = this.localManagementService.getVariable(KEY_MANAGEMENT.EMAIL) || '';
  }

  private getUserId(): string {
    return this.localManagementService.getVariable(KEY_MANAGEMENT.ID) || '';
  }

  // =========================
  // NAVIGATION
  // =========================

  backToMenu(): void {
    this.navService.back();
  }

  // =========================
  // DEACTIVATE ACCOUNT
  // =========================

  deactivateAccount(): void {
    this.showDeactivateAlert = true;
  }

  confirmDeactivate(): void {
    this.showDeactivateAlert = false;
    const userId = this.getUserId();

    if (!userId) {
      this.showError('No se pudo identificar al usuario.');
      return;
    }

    this.loadingService.show();
    this.deactivateAccountUseCase.execute({ userId }).service({
      success: () => {
        this.loadingService.hide();
        this.logoutUserUseCase.logout();
        this.successMessage = 'Tu cuenta ha sido desactivada temporalmente. Puedes reactivarla iniciando sesión nuevamente.';
        this.showSuccessAlert = true;
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showError(error?.message || 'No se pudo desactivar la cuenta. Intenta nuevamente.');
      }
    });
  }

  // =========================
  // DELETE ACCOUNT
  // =========================

  deleteAccount(): void {
    this.showDeleteAlert = true;
  }

  confirmDelete(): void {
    this.showDeleteAlert = false;
    const userId = this.getUserId();

    if (!userId) {
      this.showError('No se pudo identificar al usuario.');
      return;
    }

    this.loadingService.show();
    this.deleteUserAccountUseCase.execute({ userId }).service({
      success: () => {
        this.loadingService.hide();
        this.logoutUserUseCase.logout();
        this.successMessage = 'Tu cuenta ha sido eliminada permanentemente. Todos tus datos han sido borrados.';
        this.showSuccessAlert = true;
      },
      failure: (error) => {
        this.loadingService.hide();
        this.showError(error?.message || 'No se pudo eliminar la cuenta. Intenta nuevamente.');
      }
    });
  }

  // =========================
  // HELPERS
  // =========================

  handleSuccessConfirm(): void {
    this.showSuccessAlert = false;
    this.navService.replace('/splash');
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.showErrorAlert = true;
  }
}
