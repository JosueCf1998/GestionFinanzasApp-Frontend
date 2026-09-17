import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInput, IonItem, IonIcon } from '@ionic/angular/standalone';
import { BaseModalComponent } from 'src/app/shared/components/base-modal/base-modal.component';

@Component({
  selector: 'app-profile-field-edit-modal',
  templateUrl: './profile-field-edit-modal.component.html',
  styleUrls: ['./profile-field-edit-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonInput,
    IonItem,
    IonIcon,
    BaseModalComponent
  ]
})
export class ProfileFieldEditModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() title = 'Editar información';
  @Input() label = 'Nombre';
  @Input() placeholder = 'Ingresa el valor';
  @Input() initialValue = '';
  @Input() icon = 'user';
  @Input() loading = false;

  @Output() readonly closed = new EventEmitter<void>();
  @Output() readonly saved = new EventEmitter<string>();

  form = new FormGroup({
    value: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']?.currentValue === true) {
      this.form.patchValue({ value: this.initialValue || '' });
      this.form.markAsPristine();
    }
  }

  onSave(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }
    const val = (this.form.value.value || '').trim();
    if (val) {
      this.saved.emit(val);
    }
  }

  onClose(): void {
    if (this.loading) return;
    this.closed.emit();
  }
}
