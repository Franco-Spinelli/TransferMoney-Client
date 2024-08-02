import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

import { CreateTransfer } from '../services/createTransfer';
import { Router } from '@angular/router';
import { LoadingCircleComponent } from '../loading-circle/loading-circle.component';
import { User } from '../services/user';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css'
})
export class TransfersComponent implements OnInit {
  transferForm: FormGroup;
  amountForm: FormGroup;
  contacts: string[];
  selectedValue: string;
  userSearch: boolean;
  userData:any;
  isLoading = false;
  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router, private loadingCircle: LoadingCircleComponent) {
    this.transferForm = this.fb.group({
      recipient: ['', [Validators.required, Validators.minLength(4)]],
      selectedContact: ['']
    });
    this.amountForm = this.fb.group({
      transferAmount: [0, [Validators.required, Validators.min(100)]],
      addToContacts: [false]
    });
    this.transferForm.get('selectedContact')?.valueChanges.subscribe(value => {
      this.transferForm.get('recipient')?.setValue(value, { emitEvent: false });
    });
    this.transferForm.get('recipient')?.valueChanges.subscribe(value => {
      if (value !== this.transferForm.get('selectedContact')?.value) {
        this.transferForm.get('selectedContact')?.setValue('', { emitEvent: false });
      }
    });

  }
  ngOnInit(): void {
    this.userService.getContacts().subscribe((data) => {
      this.contacts = data;
    })
  }
  onSubmit() {
    this.isLoading = true;
    this.loadingCircle.startLoading();
    if (this.transferForm.valid) {
      const formValue = this.transferForm.value;
      const amountValue = this.amountForm.value;
      const transferDTO: any = {
        transferAmount: amountValue.transferAmount,
        recipientUser: null,
        recipientCbu: null,
      }
      const request: CreateTransfer = {
        transferDTO: transferDTO,
        addContact: amountValue.addToContacts
      };
      if (isNaN(Number(formValue.recipient))) {
        transferDTO.recipientUser = formValue.recipient;
      } else {
        transferDTO.recipientCbu = formValue.recipient;
      }

      this.userService.postTransfer(request).subscribe((data) => {
        console.log('Transfer response:', data); 
        alert("Transfer success!");
        this.isLoading = false;
        this.loadingCircle.stopLoading();
        this.router.navigateByUrl("/user-dashboard")

      }, (error) => {
        alert("error unexpected! Please check the recipient data or your balance!")
        this.isLoading = false;
        this.loadingCircle.stopLoading();
      })

    } else {
      console.log('Form no valid');
    }
  }
  searchUser(){
    this.isLoading = true;
    this.loadingCircle.startLoading();
    const request = {
      cbu: null,
      username:null
    }
    if(this.transferForm.valid){
      const formValue = this.transferForm.value;
    if (isNaN(Number(formValue.recipient))) {
      request.username = formValue.recipient;
    } else {
      request.cbu = formValue.recipient;
    }
    this.userService.getUserDetails(request).subscribe((data)=>{
      this.isLoading = false;
      this.loadingCircle.stopLoading();
        this.userData = data;
        this.userSearch=true;
        console.log(data);
        
    },
    (error)=>{
      alert("user not found! Please check the recipient data")
      this.isLoading = false;
      this.loadingCircle.stopLoading();
    })
    }else {
      console.log('Form no valid');
    }
  }

  hideDetails() {
    this.userSearch=false;
  }
}
