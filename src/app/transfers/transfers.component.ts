import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

import { CreateTransfer } from '../services/createTransfer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css'
})
export class TransfersComponent {
  transferForm: FormGroup;
  constructor(private fb: FormBuilder,private userServie: UserServiceService, private router: Router){
    this.transferForm = this.fb.group({
      recipient: ['', [Validators.required, Validators.minLength(4)]],
      transferAmount: [0, [Validators.required, Validators.min(100)]]
    });
  }
  onSubmit() {
    if (this.transferForm.valid) {
      const formValue = this.transferForm.value;
      const transferDTO: CreateTransfer = {
        transferAmount: formValue.transferAmount,
        recipientUser: null,
        recipientCbu: null,
      };
      if (isNaN(Number(formValue.recipient))) {
        transferDTO.recipientUser = formValue.recipient;
      } else {
        transferDTO.recipientCbu = formValue.recipient;
      }

      this.userServie.postTransfer(transferDTO).subscribe((data)=>{
        alert("Transfer success!");
        this.router.navigateByUrl("/user-dashboard")
      
      }  ,(error)=>{
          alert("error unexpected! Please check the recipient data or your balance!")
      })
      
    } else {
      console.log('Form no valid');
    }
  }
}
