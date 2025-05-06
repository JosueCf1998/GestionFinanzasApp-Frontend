import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonAvatar, IonLabel, IonIcon, IonMenuButton, IonMenuToggle, IonMenu, IonButtons, IonButton, IonList, IonApp } from '@ionic/angular/standalone';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {

  isModalOpen = false; // Controla si el modal está abierto
  amount = 200; // Monto actual
  newAmount: number = this.amount; // Monto temporal para el modal

  constructor() { }

  ngOnInit() {
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

}
