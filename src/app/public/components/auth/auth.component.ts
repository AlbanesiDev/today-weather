import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FirebaseError } from "@angular/fire/app";
import { Subscription, firstValueFrom } from "rxjs";

import { TranslateModule, TranslateService } from "@ngx-translate/core";

import { InputTextModule } from "primeng/inputtext";
import { AutoFocusModule } from "primeng/autofocus";
import { PasswordModule } from "primeng/password";
import { DividerModule } from "primeng/divider";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { MessageService } from "primeng/api";

import { AuthService } from "../../../core/services/auth.service";
import { ModalService } from "../../services/modal.service";

import {
  IFormAuth,
  IPasswordRequirement,
  IRecoveryFormAuth,
  TCurrentForm,
} from "../../../core/interface/auth.interface";

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
  private translateService: TranslateService = inject(TranslateService);
  private messageService: MessageService = inject(MessageService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);

  public modalService: ModalService = inject(ModalService);

  public currentForm = signal<TCurrentForm>("login");

  /**
   * Password requirements array containing validation rules.
   */
  public passwordRequirements: IPasswordRequirement[] = [
    { validator: "hasMinLength", message: "register.error_msg_password_minLength" },
    { validator: "hasUppercase", message: "register.error_msg_password_uppercase" },
    { validator: "hasLowercase", message: "register.error_msg_password_lowercase" },
    { validator: "hasNumber", message: "register.error_msg_password_number" },
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

  public form: FormGroup<IFormAuth> = this.formBuilder.group({
    email: this.formBuilder.control("", {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control("", {
      validators: [Validators.required, Validators.minLength(8)], // Custom validator
      nonNullable: true,
    }),
  });
  public recovery_form: FormGroup<IRecoveryFormAuth> = this.formBuilder.group({
    email_recovery: this.formBuilder.control("", {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });

  public changeFormClick(form: TCurrentForm): void {
    this.currentForm.set(form);
    this.form.reset();
    if (form === "register") {
      this.subscribeToPasswordRegister();
    }
  }

  /**
   * Subscribes to the password field changes for the registration form.
   */
  private subscribeToPasswordRegister(): void {
    this.passwordSubscription = this.form.get("password")!.valueChanges.subscribe((value) => {
      this.updatePasswordRequirements(value);
    });
  }

  public isLoginForm(): boolean {
    return this.currentForm() === "login" ? true : false;
  }

  /**
   * Updates password requirements based on input value.
   * @param value The input value to check against password requirements.
   */
  private updatePasswordRequirements(value: string): void {
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

  private successMessage(method: string): void {
    const translatedSuccessDetail = this.translateService.instant(
      `firebase_auth.auth/${method}-success`,
    );
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: translatedSuccessDetail,
    });
  }

  private errorMessage(err: unknown): void {
    if (err instanceof FirebaseError) {
      const translatedErrorSummary = this.translateService.instant("firebase_auth.summary");
      const translatedErrorDetail = this.translateService.instant("firebase_auth." + err.code);
      this.messageService.add({
        severity: "error",
        summary: translatedErrorSummary,
        detail: translatedErrorDetail,
        life: 8000,
      });
    }
  }

  private invalidForm(form: any): void {
    if (form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAsDirty();
      return;
    }
  }

  public async loginWithEmailClick(): Promise<void> {
    this.invalidForm(this.form);
    const formData = this.form.value;
    try {
      await firstValueFrom(this.authService.loginWithEmail(formData.email!, formData.password!));
      this.successMessage("login");
      this.modalService.closeLogin();
    } catch (err: unknown) {
      this.errorMessage(err);
    }
  }

  public async registerWithEmailClick(): Promise<void> {
    this.invalidForm(this.form);
    const formData = this.form.value;
    try {
      await firstValueFrom(this.authService.registerWithEmail(formData.email!, formData.password!));
      this.modalService.closeLogin();
      this.successMessage("register");
      this.authService.userAuth.set(true);
    } catch (err: unknown) {
      this.errorMessage(err);
    }
  }

  public async loginWithGoogleClick(): Promise<void> {
    await this.authService
      .signInWithGoogle()
      .then(() => {
        this.modalService.closeLogin();
        this.successMessage("google");
      })
      .catch((err: unknown) => {
        this.errorMessage(err);
      });
  }

  public async sendRecoveryEmailClick(): Promise<void> {
    this.invalidForm(this.recovery_form);
    const email = this.recovery_form.value.email_recovery;
    await this.authService
      .sendPasswordResetEmail(email!)
      .then(() => {
        this.successMessage("recovery");
        this.currentForm.set("recovery_description");
      })
      .catch((err) => {
        this.errorMessage(err);
      });
  }
}
