export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    dni: string;
    cbu?: string;
    moneyAccount: number;
  }