import { FormControl } from "@angular/forms";
import { AUTH_DICTIONARY } from "../utils";

export interface IFormAuth {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface IRecoveryFormAuth {
  email_recovery: FormControl<string>;
}

export type TCurrentForm = (typeof AUTH_DICTIONARY.CURRENT_FORM)[keyof typeof AUTH_DICTIONARY.CURRENT_FORM];
export interface IPasswordRequirement {
  validator: string;
  message: string;
  valid?: boolean;
}
