import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from './loginRequest';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentLoginOn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  currentUserData:BehaviorSubject<String>=new BehaviorSubject<String>('');
  constructor(private http: HttpClient) {
    this.currentLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token")||"");
   }
   login(credentials: LoginRequest):Observable<any>{
    return this.http.post<any>(environment.urlHost + "auth/login",credentials).pipe(
      tap((userData)=>{
        sessionStorage.setItem("token",userData.token);
        this.currentUserData.next(userData.token);
        this.currentLoginOn.next(true);
      }),
      map((userData)=>userData.token),
      catchError(this.hadleError)
    )
   }

   logOut(): void{
    sessionStorage.removeItem("token");
    this.currentLoginOn.next(false);
   }

  private hadleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Error',error.error)
    }else{
      console.error("backend returned the status code ", error)
    }
    return throwError(()=> new Error('Something is wrong, please try again'));
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }
  get userLoginOn(): Observable<boolean>{
    return this.currentLoginOn.asObservable();
  }
}
