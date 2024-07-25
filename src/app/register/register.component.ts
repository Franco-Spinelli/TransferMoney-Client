import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { LoadingCircleComponent } from '../loading-circle/loading-circle.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup ;
  isLoading = false;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router,private loadingCircle: LoadingCircleComponent){
    this.registerForm = this.formBuilder.group({
      username:['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]]
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.loadingCircle.startLoading();
      this.loginService.register(this.registerForm.value).subscribe((data)=>{
        console.log(data);
        alert("Welcome to TransferMoney!")
        this.router.navigateByUrl("/user-dashboard")
        this.isLoading = false;
        this.loadingCircle.stopLoading();
      },
      (error)=>{
        console.log(error);
        alert("Something went wrong, please check the email, username or dni")
        this.isLoading = false;
        this.loadingCircle.stopLoading();
      }
    )
  }
}
