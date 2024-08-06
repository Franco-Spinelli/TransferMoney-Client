import { Component, inject } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../services/user';
import { Transfer } from '../services/transfer';
import {Clipboard} from '@angular/cdk/clipboard'

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  private clipboard = inject(Clipboard)
  user: User;
  transfers: Transfer[];
  constructor(userService: UserServiceService){
    userService.getUser().subscribe((data)=>{
      this.user = data;
    })
    userService.getTransfersMade().subscribe((data)=>{
      this.transfers=data;
      this.transfers=this.transfers.reverse();
    })
  }
  copyText(){
    this.clipboard.copy(this.user.cbu ?? '');
    alert("Copy succesful!")
  }
}
