import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BaseModalComponent } from 'src/app/shared/components/base-modal/base-modal.component';
import { validate as validatePassword, validateMatch } from 'src/app/core/utils/password-validation.util';

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
}

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, BaseModalComponent],
})
export class ChangePasswordModalComponent implements OnChanges {
  @Input() isOpen = false;

  @Output() readonly closed = new EventEmitter<void>();
  @Output() readonly saved = new EventEmitter<PasswordData>();

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  currentError = '';
  newPasswordError = '';
  confirmError = '';

  showCurrent = false;
  showNew = false;
  showConfirm = false;

  currentFocused = false;
  newFocused = false;
  confirmFocused = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue === true) {
      this.reset();
    }
  }

  get canSave(): boolean {
    return (
      !!this.currentPassword &&
      !!this.newPassword &&
      !!this.confirmPassword &&
      !this.currentError &&
      !this.newPasswordError &&
      !this.confirmError
    );
  }

  get passwordStrength(): { level: 'weak' | 'medium' | 'strong'; score: number; label: string } {
    if (!this.newPassword) {
      return { level: 'weak', score: 0, label: '' };
    }

    let score = 0;
    if (this.newPassword.length >= 8) score++;
    if (/[A-Z]/.test(this.newPassword)) score++;
    if (/[a-z]/.test(this.newPassword)) score++;
    if (/\d/.test(this.newPassword)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.newPassword)) score++;

    if (score <= 2) return { level: 'weak', score, label: 'Débil' };
    if (score === 3) return { level: 'medium', score, label: 'Media' };
    return { level: 'strong', score, label: 'Fuerte' };
  }

  onValueChange(): void {
    if (!this.currentPassword) {
      this.currentError = 'La contraseña actual es obligatoria.';
    } else {
      this.currentError = '';
    }

    const pwdError = validatePassword(this.newPassword);
    this.newPasswordError = pwdError || '';

    if (this.confirmPassword) {
      const matchError = validateMatch(this.newPassword, this.confirmPassword);
      this.confirmError = matchError || '';
    } else {
      this.confirmError = '';
    }
  }

  onSave(): void {
    if (!this.canSave) return;
    this.saved.emit({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    });
  }

  onCancel(): void {
    this.closed.emit();
  }

  private reset(): void {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.currentError = '';
    this.newPasswordError = '';
    this.confirmError = '';
    this.showCurrent = false;
    this.showNew = false;
    this.showConfirm = false;
    this.currentFocused = false;
    this.newFocused = false;
    this.confirmFocused = false;
  }
}
