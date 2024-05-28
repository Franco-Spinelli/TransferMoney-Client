import { Component } from '@angular/core';
import { UserServiceService } from './services/user-service.service';
import { User } from './auth/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
  user?:User;
  constructor(private userService:UserServiceService){
    this.userService.getUser(1).subscribe({
      next:(userData)=>{
        this.user = userData;
      },
      error:(errorData)=>{
        console.log("error")
      }
    })
  }
}
