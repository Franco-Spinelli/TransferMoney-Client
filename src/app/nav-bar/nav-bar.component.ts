import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  isLoggedIn: boolean = false;
  constructor(private loginService: LoginService, private router: Router ){
  }
  ngOnInit(): void {
    this.loginService.userLoginOn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }
  logout(){
    this.loginService.logOut();
    alert("Logout success")
    this.router.navigateByUrl("/login")
  }
}
