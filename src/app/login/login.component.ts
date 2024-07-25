import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../auth/login.service';
import { LoginRequest } from '../auth/loginRequest';
import { Router } from '@angular/router';
import { LoadingCircleComponent } from '../loading-circle/loading-circle.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private loadingCircle: LoadingCircleComponent
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  login() {
    this.isLoading = true;
    this.loadingCircle.startLoading();
    this.loginService.login(this.loginForm.value as LoginRequest).subscribe((data) => {
      this.router.navigateByUrl("/user-dashboard")
      this.isLoading = false;
      this.loadingCircle.stopLoading();
    },
    (error) => {
      alert("Username or password incorrect")
      this.isLoading = false;
      this.loadingCircle.stopLoading();
    })
  }
}
