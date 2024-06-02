import { Component } from '@angular/core';
import { Transfer } from '../services/transfer';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-transfers-history',
  templateUrl: './transfers-history.component.html',
  styleUrl: './transfers-history.component.css'
})
export class TransfersHistoryComponent {
  transfersMade: Transfer[];
  transfersReceived: Transfer[];
  constructor(userService: UserServiceService){
    userService.getTransfersMade().subscribe((data)=>{
      this.transfersMade=data;
      this.transfersMade=this.transfersMade.reverse();
      console.log(this.transfersMade)
    })
    userService.getTransfersReceived().subscribe((data)=>{
      this.transfersReceived=data;
      this.transfersReceived=this.transfersReceived.reverse();
      console.log(this.transfersMade)
    })
  }
  
}
