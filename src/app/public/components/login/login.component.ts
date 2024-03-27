import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { AutoFocusModule } from 'primeng/autofocus';
import { TranslateModule } from '@ngx-translate/core';
import { ModalService } from '../../services/modal.service';
import { IFormLogin } from '../../../core/interface/login.interface';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginComponent {
  public modalService: ModalService = inject(ModalService);
  public formBuilder: FormBuilder = inject(FormBuilder);
  public authService: AuthService = inject(AuthService);

  public visible: boolean = false;

  private formLogin: FormGroup<IFormLogin> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
  });
  private formRegister: FormGroup<IFormLogin> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
  });
  public form = this.formLogin;
  public currentForm: string = 'login';

  public switchForm() {
    if (this.currentForm === 'login') {
      this.currentForm = 'login';
      this.form = this.formLogin;
    } else if (this.currentForm === 'register') {
      this.currentForm = 'register';
      this.form = this.formRegister;
    }
  }

  title = 'a';

  value!: string;

  public closeDialog() {
    this.visible = false;
  }

  public loginWithEmail(){
    const formData = this.form.value;
    if(formData){
      // ToDo: resolver el undefined
      this.authService.loginWithEmail(formData.email!, formData.password!);
    }
  }

  public registerWithEmail(){
    this.authService.registerWithEmail('','','');
  }

  public loginWithGoogle(): void{
    this.authService.signInWithGoogle();
  }

  public recovery(){
    // this.authService.recoveryPassword();
  }
}
