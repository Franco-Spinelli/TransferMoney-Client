import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../services/user';
import { Transfer } from '../services/transfer';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  user: User;
  transfers: Transfer[];
  constructor(userService: UserServiceService){
    userService.getUser().subscribe((data)=>{
      this.user = data;
      console.log(data);
      
    })
    userService.getTransfersMade().subscribe((data)=>{
      this.transfers=data;
      this.transfers=this.transfers.reverse();
      console.log(this.transfers)
    })
  }
}
