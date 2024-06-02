import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { Transfer } from '../services/transfer';
import { CreateTransfer } from '../services/createTransfer';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css'
})
export class TransfersComponent {
  transferForm: FormGroup;
  constructor(private fb: FormBuilder,private userServie: UserServiceService){
    this.transferForm = this.fb.group({
      recipient: ['', Validators.required],
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
      
      }  ,(error)=>{
        console.log(transferDTO);
          alert("error unexpected!")
      })
      
    } else {
      console.log('Form no valid');
    }
  }
}
