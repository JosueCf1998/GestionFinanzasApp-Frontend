import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IonButton, IonIcon, IonInput, IonItem } from '@ionic/angular/standalone';
import { BaseModalComponent } from 'src/app/shared/components/base-modal/base-modal.component';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (!newPassword || !confirmPassword) return null;
  if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) return null;

  if (newPassword.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    confirmPassword.setErrors(null);
    return null;
  }
};

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonItem,
    IonInput,
    IonIcon,
    IonButton,
    BaseModalComponent
  ]
})
export class ChangePasswordModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() loading = false;

  @Output() readonly closed = new EventEmitter<void>();
  @Output() readonly saved = new EventEmitter<{ newPassword: string }>();

  showNewPassword = false;
  showConfirmPassword = false;

  form = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue === true) {
      this.form.reset();
      this.showNewPassword = false;
      this.showConfirmPassword = false;
    }
  }

  toggleShowNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }
    const newPassword = (this.form.value.newPassword || '').trim();
    if (newPassword) {
      this.saved.emit({ newPassword });
    }
  }

  onClose(): void {
    if (this.loading) return;
    this.closed.emit();
  }
}
