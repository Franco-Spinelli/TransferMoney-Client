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
   //page
  currentPage = 1;
  productsPerPage = 6;
  constructor(userService: UserServiceService){
    userService.getTransfersMade().subscribe((data)=>{
      this.transfersMade=data;
      this.transfersMade=this.transfersMade.reverse();
    })
    userService.getTransfersReceived().subscribe((data)=>{
      this.transfersReceived=data;
      this.transfersReceived=this.transfersReceived.reverse();
    })
  }
  previousPage() {
    this.currentPage--;
  }
 
  nextPage() {
    this.currentPage++;
  }
 
  get totalPagesReceived() {
    return Math.ceil(this.transfersReceived.length / this.productsPerPage);
  }
  get totalPagesMade() {
    return Math.ceil(this.transfersMade.length / this.productsPerPage);
  }
  
}
