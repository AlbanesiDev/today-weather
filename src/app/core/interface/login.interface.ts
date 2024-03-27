import { FormControl } from "@angular/forms";

export interface IFormLogin {
  email: FormControl<string>;
  password: FormControl<string>;
}
