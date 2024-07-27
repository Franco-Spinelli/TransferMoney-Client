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
  currentPageMade = 1;
  productsPerPageMade = 4;
  currentPageReceived = 1;
  productsPerPageReceived  = 4;
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
  previousPageMade() {
    this.currentPageMade--;
  }
 
  nextPageMade() {
    this.currentPageMade++;
  }
  previousPageReceived() {
    this.currentPageReceived--;
  }
 
  nextPageReceived() {
    this.currentPageReceived++;
  }
 
 
  get totalPagesReceived() {
    return Math.ceil(this.transfersReceived.length / this.productsPerPageReceived);
  }
  get totalPagesMade() {
    return Math.ceil(this.transfersMade.length / this.productsPerPageMade);
  }
  
  get paginatedTransfersMade() {
    const startIndex = (this.currentPageMade - 1) * this.productsPerPageMade;
    const endIndex = startIndex + this.productsPerPageMade;
    return this.transfersMade.slice(startIndex, endIndex);
  }
  get paginatedTransfersReceived() {
    const startIndex = (this.currentPageReceived - 1) * this.productsPerPageReceived;
    const endIndex = startIndex + this.productsPerPageReceived;
    return this.transfersReceived.slice(startIndex, endIndex);
  }
}
