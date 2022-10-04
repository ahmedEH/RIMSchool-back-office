import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  responseLogin:any;
  authService: AuthService | undefined;
  isAuth:boolean | undefined;

  constructor(authService:AuthService,router:Router) { 
    this.authService = authService;
    if(this.authService.isUserLoggedIn()){
      router.navigate(['home']);
    }
    


  }

  ngOnInit(): void {
    console.log("auth.service.isAuth",this.authService?.isAuth)
    setTimeout(
      ()=>{
        console.log("this.authService.userRole",this.authService?.userRole)
        
      },3000
    );
  }


}
