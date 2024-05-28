import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../auth/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }
  getUser(id:number):Observable<User>{
    return this.http.get<User>('http://localhost:8080/api/user/meId/'+id)
  }
}
