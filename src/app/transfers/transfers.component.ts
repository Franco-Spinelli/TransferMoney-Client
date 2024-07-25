import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

import { CreateTransfer } from '../services/createTransfer';
import { Router } from '@angular/router';
import { LoadingCircleComponent } from '../loading-circle/loading-circle.component';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css'
})
export class TransfersComponent {
  transferForm: FormGroup;
  isLoading = false;
  constructor(private fb: FormBuilder,private userServie: UserServiceService, private router: Router, private loadingCircle: LoadingCircleComponent){
    this.transferForm = this.fb.group({
      recipient: ['', [Validators.required, Validators.minLength(4)]],
      transferAmount: [0, [Validators.required, Validators.min(100)]]
    });
  }
  onSubmit() {
    this.isLoading = true;
    this.loadingCircle.startLoading();
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
        this.isLoading = false;
        this.loadingCircle.stopLoading();
        this.router.navigateByUrl("/user-dashboard")
      
      }  ,(error)=>{
          alert("error unexpected! Please check the recipient data or your balance!")
          this.isLoading = false;
          this.loadingCircle.stopLoading();
      })
      
    } else {
      console.log('Form no valid');
    }
  }
}
