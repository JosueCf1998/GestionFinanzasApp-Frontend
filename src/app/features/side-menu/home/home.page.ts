import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonAvatar, IonLabel, IonIcon, IonMenuButton, IonMenuToggle, IonMenu, IonButtons, IonButton, IonList, IonApp } from '@ionic/angular/standalone';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { ApiService } from '../../../core/services/api.service'; // Importa el servicio
import { NavigationService } from '../../../core/services/navigation.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [ApiService], 
})
export class HomePage implements OnInit {

  isModalOpen = false; // Controla si el modal está abierto
  amount = 200; // Monto actual
  newAmount: number = this.amount; // Monto temporal para el modal

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadPosts(); 
  }


  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateAmount() {
    if (this.newAmount) {
      this.amount = this.newAmount; // Actualiza el monto
    }
    this.closeModal(); // Cierra el modal
  }

  loadPosts() {
    this.apiService.getPosts().subscribe(
      (data) => {
        console.log('Datos cargados:', data);
      },
      (error) => {
        console.error('Error al cargar datos:', error);
      }
    );
  }

}
