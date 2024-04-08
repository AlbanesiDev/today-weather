import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Custom validator function for passwords
 */
export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;

  const hasMinLength = value.length >= 8;
  const hasUppercase = /[A-Z]/.test(value);
  const hasLowercase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);

  const errors = {
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
  };

  return errors;
};
