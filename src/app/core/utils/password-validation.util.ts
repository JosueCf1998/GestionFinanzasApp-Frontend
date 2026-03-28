export interface PasswordValidationOptions {
  minLength?: number;
  maxLength?: number;
  requireSpecialChar?: boolean;
  requireUppercase?: boolean;
}

const DEFAULT_OPTIONS: Required<PasswordValidationOptions> = {
  minLength: 6,
  maxLength: 128,
  requireSpecialChar: true,
  requireUppercase: true,
};

export function validate(
  password: string,
  options: PasswordValidationOptions = {}
): string | null {
  const config = { ...DEFAULT_OPTIONS, ...options };

  if (password.trim().length === 0) {
    return "La contraseña no puede contener solo espacios.";
  }

  if (password.length < config.minLength) {
    return `La contraseña debe tener al menos ${config.minLength} caracteres.`;
  }

  if (config.requireSpecialChar && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return "La contraseña debe incluir al menos un carácter especial.";
  }

  if (config.requireUppercase && !/[A-Z]/.test(password)) {
    return "La contraseña debe incluir al menos una letra mayúscula.";
  }

  if (password.length > config.maxLength) {
    return "La contraseña excede la longitud permitida.";
  }

  return null;
}

export function validateMatch(password: string, repeatPassword: string): string | null {
  if (password !== repeatPassword) {
    return "Las contraseñas no coinciden.";
  }

  return null;
}
