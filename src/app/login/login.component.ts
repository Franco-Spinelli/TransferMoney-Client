import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../auth/login.service';
import { LoginRequest } from '../auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  login() {
    this.loginService.login(this.loginForm.value as LoginRequest).subscribe((data) => {
      console.log(data);
    });
  }
}
