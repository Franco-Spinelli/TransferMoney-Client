import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { Transfer } from './transfer';
import { CreateTransfer } from './createTransfer';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }
  getUser():Observable<User>{
    return this.http.get<User>(environment.urlApi + '/user/me');
  }
  getTransfersMade():Observable<Transfer[]>{
    return this.http.get<Transfer[]>(environment.urlApi +'/user/transfers');
  }
  getTransfersReceived():Observable<Transfer[]>{
    return this.http.get<Transfer[]>(environment.urlApi +'/user/receivedTransfers');
  }
  postTransfer(data: CreateTransfer):Observable<any>{
    return this.http.post<any>(environment.urlApi + '/transfer/create',data);
  }
  deposit(amount:any):Observable<any>{
    return this.http.put<any>(environment.urlApi + '/user/deposit', amount)
  }
  getContacts():Observable<string[]>{
    return this.http.get<string[]>(environment.urlApi +'/user/get-contacts');
  }
}
