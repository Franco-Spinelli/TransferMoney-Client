import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrl: './add-money.component.css'
})
export class AddMoneyComponent {
  moneyForm: FormGroup;
  constructor(private fb: FormBuilder,private userService: UserServiceService, private router: Router){
    this.moneyForm = this.fb.group({
      moneyToDeposit: [0, [Validators.required, Validators.min(100)]]
    });
  }
  onSubmit() {
    if (this.moneyForm.valid) {
      const formValue = this.moneyForm.value;
      const depositDTO: any = {
        moneyToDeposit: formValue.moneyToDeposit,
        date: null
      };
      this.userService.deposit(depositDTO).subscribe((data)=>{
        alert("Deposit success!");
        this.router.navigateByUrl("/user-dashboard")
      })
    } else {
      console.log('Form no valid');
    }
  }
}
