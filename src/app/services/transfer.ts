export interface Transfer {
    transfer_id?: number;
    recipientUser:string;
    recipientCbu:number;
    originUser:string;
    transferDate:Date;
    transferAmount:number;
  }