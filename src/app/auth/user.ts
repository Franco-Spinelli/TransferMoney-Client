export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    dni: number;
    cbu?: bigint;
    moneyAccount?: number;
  }