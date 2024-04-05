import { FormControl } from "@angular/forms";

export interface IFormAuth {
  email: FormControl<string>;
  password: FormControl<string>;
}

export type TCurrentForm = "login" | "register";
export interface IPasswordRequirement {
  validator: string;
  message: string;
  valid?: boolean;
}
