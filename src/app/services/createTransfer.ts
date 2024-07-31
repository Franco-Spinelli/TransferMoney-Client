export interface TransferDTO {
    recipientUser:any;
    recipientCbu:any;
    transferAmount:number;
  }
  export interface CreateTransfer {
    transferDTO: TransferDTO;
    addContact: boolean; 
  }