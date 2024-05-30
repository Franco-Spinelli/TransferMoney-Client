import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../auth/login.service';
import { LoginRequest } from '../auth/loginRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  login() {
    this.loginService.login(this.loginForm.value as LoginRequest).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl("/user-dashboard")
      
    },
    (error) => {
      alert("Username or password incorrect")
    })
  }
}
