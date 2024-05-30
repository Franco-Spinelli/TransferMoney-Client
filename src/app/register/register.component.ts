import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup ;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router){
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dni: ['', Validators.required]
    });
  }

  onSubmit() {
      this.loginService.register(this.registerForm.value).subscribe((data)=>{
        console.log(data);
        alert("Welcome to TransferMoney!")
        this.router.navigateByUrl("/user-dashboard")
      },
      (error)=>{
        console.log(error);
        alert("Something went wrong, please check the email, username or dni")
      }
    )
  }
}
