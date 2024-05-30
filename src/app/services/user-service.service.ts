import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { Transfer } from './transfer';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }
  getUser():Observable<User>{
    return this.http.get<User>('http://localhost:8080/api/user/me')
  }
  getTransfersMade():Observable<Transfer[]>{
    return this.http.get<Transfer[]>('http://localhost:8080/api/user/transfers')
  }
}
