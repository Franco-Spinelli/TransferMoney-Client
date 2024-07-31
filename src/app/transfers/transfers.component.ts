import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

import { CreateTransfer } from '../services/createTransfer';
import { Router } from '@angular/router';
import { LoadingCircleComponent } from '../loading-circle/loading-circle.component';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css'
})
export class TransfersComponent implements OnInit {
  transferForm: FormGroup;
  contacts: string[];
  selectedValue: string;
  isLoading = false;
  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router, private loadingCircle: LoadingCircleComponent) {
    this.transferForm = this.fb.group({
      recipient: ['', [Validators.required, Validators.minLength(4)]],
      transferAmount: [0, [Validators.required, Validators.min(100)]],
      addToContacts: [false],
      selectedContact: ['']
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
      const transferDTO: any = {
        transferAmount: formValue.transferAmount,
        recipientUser: null,
        recipientCbu: null,
      }
      const request: CreateTransfer = {
        transferDTO: transferDTO,
        addContact: formValue.addToContacts
      };
      if (isNaN(Number(formValue.recipient))) {
        transferDTO.recipientUser = formValue.recipient;
      } else {
        transferDTO.recipientCbu = formValue.recipient;
      }

      this.userService.postTransfer(request).subscribe((data) => {
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
}
