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
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule, CustomSegmentComponent],
})
export class HomePage implements OnInit {
  isModalOpen = false;
  amount = 200;
  newAmount: number = this.amount;
  posts: Post[] = [];
  errorMessage: string | null = null;
  segment: 'gastos' | 'ingresos' = 'gastos';

    dataTabs = [
    { value: 'gastos', label: 'Gasto' },
    { value: 'ingresos', label: 'Ingreso' }
  ];

  constructor(private testServiceUseCase: TestServiceUseCase) {}

  ngOnInit() {
    //this.loadGet();
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

  onSegmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  loadGet() {
    this.testServiceUseCase.executeGet().subscribe((result: Result<Post[]>) => {
      if (result.success) {
        this.posts = result.data!;
        console.log('Datos obtenidos:', this.posts);
      } else {
        this.errorMessage = result.message;
        console.error('Error al cargar datos:', this.errorMessage);
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

  
}