import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { GetHomeUseCase } from '../../../core/use-cases/get-home.usecase';
import { Post } from '../../../core/models/post.model';
import { Result } from '../../../core/models/result.model';
import { body } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class HomePage implements OnInit {
  isModalOpen = false;
  amount = 200;
  newAmount: number = this.amount;
  posts: Post[] = [];
  errorMessage: string | null = null;

  constructor(private getHomeUseCase: GetHomeUseCase) {}

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
      this.amount = this.newAmount;
    }
    this.closeModal();
  }

  loadPosts() {
    this.getHomeUseCase.execute().subscribe((result) => {
      if (result.success) {
        console.log('Datos obtenidos:', result.data);
      } else {
        console.error('Error:', result);
      }
    });
  }

  
}