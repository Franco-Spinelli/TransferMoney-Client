export interface Transfer {
    id?: number;
    recipientUser:string;
    recipientCbu:number;
    originUser:string;
    transferDate:Date;
    transferAmount:number;
  }