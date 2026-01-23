import { ListAccountsUseCase } from '../../../core/use-cases/accounts/list-accounts.usecase';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { TestServiceUseCase } from '../../../core/use-cases/testService.usecase';
import { Post } from '../../../core/models/post.model';
import { Result } from '../../../core/models/result.model';
import { body } from 'ionicons/icons';
import { CustomSegmentComponent } from "src/app/shared/components/custom-segment/custom-segment.component";
import { NavigationService } from "src/app/core/services/navigation.service";
import { SpinnerService } from 'src/app/core/services/spinnerService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomSegmentComponent],
})
export class HomePage implements OnInit {

  showGenericAlert = false;
  showUnauthorizedAlert: boolean = false
  messageError: string = '';


  isModalOpen = false;
  amount = 200;
  newAmount: number = this.amount;
  errorMessage: string | null = null;
  segment: 'gastos' | 'ingresos' = 'gastos';

  dataTabs = [
    { value: 'gastos', label: 'Gasto' },
    { value: 'ingresos', label: 'Ingreso' }
  ];

  constructor(
    private listAccountsUseCase: ListAccountsUseCase,
    private navService: NavigationService,
    private loadingService: SpinnerService,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateAmount() {
    if (this.newAmount) {
      this.amount = this.newAmount;
    }
    this.closeModal();
  }

  onSegmentChanged(event: string | number) {
    this.segment = event as 'gastos' | 'ingresos';
    console.log('Segment changed to:', this.segment);
  }

  navigateToCreateTransac() {
    this.navService.push('/home/create');
  }

  loadData() {
    this.executeAccountList();
  }

  private executeAccountList() {
    this.loadingService.show();
    this.listAccountsUseCase.listAccounts().subscribe({
      next: (result) => {
        this.loadingService.hide();
        if (result.success && result.data) {
          // guardar los datos y mostrarlos en la pantalla
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
  
}

/*

  loadGet() {
    this.testServiceUseCase.executeGet().subscribe((result: Result<Post[]>) => {
      if (result.success) {
        this.posts = result.data!;
      } else {
        this.errorMessage = result.message;
      }
    });
  }

  loadPost() {
    this.testServiceUseCase.executePost().subscribe((result: Result<Post[]>) => {
      if (result.success) {
        console.log('Solicitud enviada sin datos:', result.data);
      } else {
        console.error('Error al enviar solicitud:', result.message);
      }
    });
  }

*/