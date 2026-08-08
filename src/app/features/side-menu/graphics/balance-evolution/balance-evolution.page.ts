import { Component } from '@angular/core';
import { IonContent, IonHeader } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { PageLayoutComponent } from 'src/app/shared/components/page-layout/page-layout.component';

@Component({
  selector: 'app-balance-evolution',
  templateUrl: './balance-evolution.page.html',
  styleUrls: ['./balance-evolution.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, EmptyStateComponent, PageLayoutComponent]
})
export class BalanceEvolutionPage {
  constructor(private readonly navigationService: NavigationService) {}

  back(): void {
    void this.navigationService.back();
  }
}
