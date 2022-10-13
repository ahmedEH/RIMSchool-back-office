import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/permission';
import { User } from 'src/app/models/user';
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
  user: User | undefined = undefined
  permissions: Permission[] =[];

  constructor(authService:AuthService,router:Router) { 
    this.authService = authService;
    if(this.authService.isUserLoggedIn()){
      router.navigate(['home']);
    }
    this.user = this.authService.userO
    this.permissions = this.authService.userP
    console.log("userConnecte : ",this.authService.userO);
    console.log("userPermissions : ",this.authService.userP);
    
    
    


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
