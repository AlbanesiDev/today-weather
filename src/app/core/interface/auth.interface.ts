import { FormControl } from "@angular/forms";

export interface IFormAuth {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface IRecoveryFormAuth {
  email_recovery: FormControl<string>;
}

export type TCurrentForm = "login" | "register" | "recovery" | "recovery_description";
export interface IPasswordRequirement {
  validator: string;
  message: string;
  valid?: boolean;
}
