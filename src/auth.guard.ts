import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './app/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): boolean {
    if (this.loginService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}