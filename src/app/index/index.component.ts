import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/loginRequest';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isAuth = false;
  activated = true
  error:any;
  type = "password";
  authService: AuthService;
  router:Router
  title = "SchoolRoom";
  description = "SchoolRoom Application is a plateform that make easy to share books images and texts with students";

  user: User | undefined;
  loginRequest = new FormGroup({
    login: new FormControl('',[Validators.required,Validators.minLength(5)]),
    password: new FormControl('',[Validators.minLength(8),Validators.required]),
  });
  responseLogin: any;
  constructor(authService:AuthService,router:Router) { 
    this.authService = authService;
    this.router = router;
    const isAuth = sessionStorage.getItem("isAuth");
    if(isAuth){
      this.authService.isAuth = JSON.parse(isAuth) === +"1";
      router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }
  isPassword(){
    return this.type ==="password";
  }

  isText(){
    return this.type == "text";
  }

  onSwitch(){
    this.type = (this.type ==="password")? "text":"password"
  }

onSubmit(){
    console.log(this.loginRequest.value);
    const login = new LoginRequest(this.loginRequest.controls['login'].value,this.loginRequest.controls['password'].value);
    this.authService.login(login)
    .subscribe(     
      (val) => {
        if(val.result.user?.user?.state == 'Activated' && val.result.user?.user?.role != 'Android'){
          console.log("POST call successful value returned in body", 
          val);
          this.authService.userO = val.result.user.user;
          console.log("this.authService.userV",this.authService.userO);
          
          this.responseLogin = val;
          this.activated = true
          this.authService.userToken = val.result.accessToken;
          console.log("this.responseLogin",this.responseLogin);
          sessionStorage.setItem('user',JSON.stringify(val.result.user?.user?.id));
          sessionStorage.setItem('userO',JSON.stringify(val.result.user?.user));
          sessionStorage.setItem('userP',JSON.stringify(val.result.user?.permissions));
          sessionStorage.setItem('userToken',JSON.stringify(val.result.accessToken));
          sessionStorage.setItem('userRole',JSON.stringify(val.result.user?.user?.role));
          sessionStorage.setItem('userState',JSON.stringify(val.result.user?.user?.state));
          this.authService.isAuth= true;
          sessionStorage.setItem("isAuth","1");
          console.log("this.authService.userToken",this.authService.userToken);
          this.router.navigate(['/home']).then(() => {
          window.location.reload();
          });
        }else{
          this.activated=false
        }



        },
        response => {
            console.log("POST call in error", response);
            this.error = response;
        },
  () => {
      console.log("The POST observable is now completed.");
  });


    
  }


}
