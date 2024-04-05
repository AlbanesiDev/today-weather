import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnDestroy, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { InputTextModule } from "primeng/inputtext";
import { AutoFocusModule } from "primeng/autofocus";
import { PasswordModule } from "primeng/password";
import { DividerModule } from "primeng/divider";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { AuthService } from "../../../core/services/auth.service";
import { ModalService } from "../../services/modal.service";
import { IFormAuth, IPasswordRequirement, TCurrentForm } from "../../../core/interface/auth.interface";
import { passwordValidator } from "../../shared/validator/password-validator.function";
import { Subscription } from "rxjs";
/**
 * Component responsible for authentication features such as login, registration, and password recovery.
 */
@Component({
  selector: "app-auth",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    DialogModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    DividerModule,
    AutoFocusModule,
  ],
  templateUrl: "./auth.component.html",
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AuthComponent implements OnDestroy {
  /**
   * Form builder injection for handling form operations.
   */
  public formBuilder: FormBuilder = inject(FormBuilder);

  /**
   * Modal service injection for displaying modal.
   */
  public modalService: ModalService = inject(ModalService);

  /**
   * Authentication service injection for handling user authentication.
   */
  public authService: AuthService = inject(AuthService);

  /**
   * Represents the current state of the form, defaults to "login".
   */
  public currentForm: TCurrentForm = "login";

  /**
   * Password requirements array containing validation rules.
   */
  public passwordRequirements: IPasswordRequirement[] = [
    { validator: "hasMinLength", message: "register.minLength" },
    { validator: "hasUppercase", message: "register.uppercase" },
    { validator: "hasLowercase", message: "register.lowercase" },
    { validator: "hasNumber", message: "register.number" },
  ];

  private passwordSubscription?: Subscription;

  /**
   * Unsubscribes from the password field changes when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.passwordSubscription) {
      this.passwordSubscription.unsubscribe();
    }
  }

  /**
   * Updates password requirements based on input value.
   * @param value The input value to check against password requirements.
   */
  updatePasswordRequirements(value: string): void {
    this.passwordRequirements.forEach((req) => {
      switch (req.validator) {
        case "hasMinLength":
          req["valid"] = value.length >= 8;
          break;
        case "hasUppercase":
          req["valid"] = /[A-Z]/.test(value);
          break;
        case "hasLowercase":
          req["valid"] = /[a-z]/.test(value);
          break;
        case "hasNumber":
          req["valid"] = /[0-9]/.test(value);
          break;
      }
    });
  }

  /**
   * Represents the form group for authentication.
   */
  public form: FormGroup<IFormAuth> = this.formBuilder.group({
    email: this.formBuilder.control("", {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control("", {
      validators: [Validators.required, passwordValidator], // Custom validator
      nonNullable: true,
    }),
  });

  /**
   * Changes the current form.
   * @param form The form to change to.
   */
  public changeFormClick(form: TCurrentForm): void {
    this.currentForm = form;
    if (form === "register") {
      this.subscribeToPasswordRegister();
    }
  }

  /**
   * Checks if the current form is the login form.
   * @returns True if the current form is 'login', false otherwise.
   */
  public isLoginForm(): boolean {
    const isLogin = this.currentForm === "login" ? true : false;
    return isLogin;
  }

  /**
   * Subscribes to the password field changes for the registration form.
   */
  private subscribeToPasswordRegister(): void {
    this.passwordSubscription = this.form.get("password")!.valueChanges.subscribe((value) => {
      this.updatePasswordRequirements(value);
    });
  }

  /**
   * Handles the login action when the user clicks the login button.
   */
  public loginWithEmailClick(): void {
    const formData = this.form.value;
    // ToDo: Add validation before sending data.
    this.authService.loginWithEmail(formData.email!, formData.password!);
  }

  /**
   * Handles the registration action when the user clicks the register button.
   */
  public registerWithEmailClick(): void {
    const formData = this.form.value;
    // ToDo: Add validation before sending data.
    this.authService.registerWithEmail(formData.email!, formData.password!);
  }

  /**
   * Handles the Google login action when the user clicks the Google login button.
   */
  public loginWithGoogleClick(): void {
    this.authService.signInWithGoogle();
  }

  /**
   * Handles the password recovery action when the user clicks the password recovery button.
   */
  public recoveryPasswordClick(): void {
    // The method has yet to be built into the service.
    // this.authService.recoveryPassword();
  }
}
