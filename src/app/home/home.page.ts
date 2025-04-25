import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonAvatar, IonLabel, IonIcon, IonMenuButton, IonMenuToggle, IonMenu, IonButtons, IonButton, IonList } from '@ionic/angular/standalone';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonList, IonButton, IonButtons, IonIcon, IonLabel, IonAvatar, IonItem, IonContent, IonHeader, IonMenuButton, IonMenuToggle, IonMenu, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  @ViewChild('doughnutCanvas') doughnutCanvas: any;

  user = {
    name: 'Ana Martínez',
    email: 'ana.martinez@ejemplo.com',
    avatar: 'https://i.pravatar.cc/150?img=12'
  };



  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createDoughnutChart();
  }

  createDoughnutChart() {
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
    
    new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Proyectos', 'Tareas', 'Completado', 'Pendiente'],
        datasets: [{
          data: [35, 25, 20, 20],
          backgroundColor: [
            '#3880ff',
            '#3dc2ff',
            '#2dd36f',
            '#ffc409'
          ],
          hoverBackgroundColor: [
            '#4d90ff',
            '#52d2ff',
            '#42e37f',
            '#ffd449'
          ],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 20,
              font: {
                family: "'Roboto', sans-serif"
              }
            }
          }
        }
      }
    });
  }

}
