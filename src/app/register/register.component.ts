import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../auth/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup ;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService){
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
      },
      (error)=>{
        console.log(error);
        alert("Something went wrong, please check the email, username or dni")
      }
    )
  }
}
