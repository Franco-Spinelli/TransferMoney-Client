import { Component } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLoggedIn: boolean = false;
  constructor(private loginService: LoginService, private router: Router ){
    this.isLoggedIn = loginService.isUserLoggedIn(); 
  }
  logout(){
    this.loginService.logOut();
    alert("Logout success")
    this.router.navigateByUrl("/login")
  }
}
