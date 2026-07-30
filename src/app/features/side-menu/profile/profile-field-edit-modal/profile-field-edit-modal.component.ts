import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BaseModalComponent } from "src/app/shared/components/base-modal/base-modal.component";

export type FieldEditType = "name" | "email" | "phone";

interface FieldEditConfig {
  title: string;
  description: string;
  inputLabel: string;
  placeholder: string;
  inputType: string;
  maxLength: number;
}

const FIELD_CONFIGS: Record<FieldEditType, FieldEditConfig> = {
  name: {
    title: "Editar nombre completo",
    description: "Tal como aparece en tu documento de identidad.",
    inputLabel: "Nombre completo",
    placeholder: "Ej. María García",
    inputType: "text",
    maxLength: 50,
  },
  email: {
    title: "Editar correo electrónico",
    description:
      "Usaremos este correo para notificarte movimientos importantes de tu cuenta.",
    inputLabel: "Correo electrónico",
    placeholder: "correo@ejemplo.com",
    inputType: "email",
    maxLength: 100,
  },
  phone: {
    title: "Agregar teléfono",
    description: "Ingresa un número celular de Perú (9 dígitos).",
    inputLabel: "Teléfono",
    placeholder: " Ej.999 999 999",
    inputType: "tel",
    maxLength: 11,
  },
};

const KNOWN_EMAIL_DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "protonmail.com",
  "outlook.es",
];

@Component({
  selector: "app-profile-field-edit-modal",
  templateUrl: "./profile-field-edit-modal.component.html",
  styleUrls: ["./profile-field-edit-modal.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, BaseModalComponent],
})
export class ProfileFieldEditModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input({ required: true }) fieldType!: FieldEditType;
  @Input() currentValue = "";

  @Output() readonly closed = new EventEmitter<void>();
  @Output() readonly saved = new EventEmitter<string>();

  editValue = "";
  initialValue = "";
  error = "";
  showDomainSuggestions = false;
  inputFocused = false;

  readonly knownDomains = KNOWN_EMAIL_DOMAINS;

  get config(): FieldEditConfig {
    return FIELD_CONFIGS[this.fieldType];
  }

  get hasChanges(): boolean {
    return this.editValue !== this.initialValue;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["isOpen"]?.currentValue === true) {
      this.initialValue = this.currentValue;
      this.editValue = this.currentValue;
      this.error = "";
      this.showDomainSuggestions = false;
    }
  }

  onValueChange(): void {
    this.error = "";

    if (this.fieldType === "phone") {
      const digits = this.editValue.replace(/\D/g, "").slice(0, 9);
      const groups: string[] = [];
      for (let i = 0; i < digits.length; i += 3) {
        groups.push(digits.slice(i, i + 3));
      }
      this.editValue = groups.join(" ");
    }

    if (this.fieldType === "email" && this.editValue.includes("@")) {
      this.showDomainSuggestions = true;
    } else {
      this.showDomainSuggestions = false;
    }
  }

  selectDomain(domain: string): void {
    const localPart = this.editValue.split("@")[0];
    this.editValue = `${localPart}@${domain}`;
    this.showDomainSuggestions = false;
  }

  onSave(): void {
    const value = this.editValue.trim();
    const validationError = this.validate(value);
    if (validationError) {
      this.error = validationError;
      return;
    }
    this.saved.emit(value);
  }

  onCancel(): void {
    this.closed.emit();
  }

  private validate(value: string): string | null {
    if (!value) {
      return "Este campo no puede estar vacío.";
    }

    switch (this.fieldType) {
      case "name": {
        if (value.length < 2) {
          return "Ingresa un nombre completo válido.";
        }
        return null;
      }
      case "email": {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          return "Ingresa un correo electrónico válido.";
        }
        return null;
      }
      case "phone": {
        const digits = value.replace(/\D/g, "");
        const isPeruStandard = digits.length === 9 && digits.startsWith("9");
        if (!isPeruStandard) {
          return "El número debe tener 9 dígitos y empezar con 9 (ej. 987654321).";
        }
        return null;
      }
    }
  }
}
