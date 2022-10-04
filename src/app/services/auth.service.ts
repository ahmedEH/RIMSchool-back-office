import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/loginRequest';
import { User } from '../models/user';
import { UserToken } from '../models/userToken';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { GlobalResponse } from '../models/globalResponse';
import { Permission } from '../models/permission';
import { PermissionType } from '../enumerations/permissionType';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


   user: number | undefined;

   isAuth = false;

   userO:User | undefined
   userP:Permission[] = [];

   userToken:String |undefined;

   userRole:String | undefined;

   userState:String | undefined;


   constructor(private httpClient: HttpClient){
    console.log("Logging in ...");
    const isAuth = sessionStorage.getItem("isAuth");
    const user = sessionStorage.getItem("user");
    let a = sessionStorage.getItem("userO");
    let b = sessionStorage.getItem("userP");
    if(a != null && b!= null){
      this.userO = JSON.parse(a);
      this.userP = JSON.parse(b);
    }
    const userToken = sessionStorage.getItem("userToken");
    const userRole = sessionStorage.getItem("userRole");
    const userState = sessionStorage.getItem("userState");
    console.log("isAuth",isAuth);
    console.log("userRole1234",userRole);

    console.log("isAuth1234",isAuth);

    if(isAuth != null &&  JSON.parse(isAuth) == "1"){
        this.isAuth = true;
        this.user = (user != null)? JSON.parse(user) as number : 0;
        this.userToken = (userToken != null)? JSON.parse(userToken) as String : "";
        this.userRole = (userRole != null)? JSON.parse(userRole) as String : "";
        this.userState = (userState != null)? JSON.parse(userState) as String : "";


    }

   }

   login(loginRequest: LoginRequest){
    const response = this.httpClient.post<GlobalResponse<UserToken>>(environment.apiUrl + "login", loginRequest);

    return response
    
   }
   isUserLoggedIn(){
    console.log("this.isAuth",this.isAuth);
     return this.isAuth;
   }


   logout(){
     console.log("logging out ...");
     this.isAuth = false;
     this.user = undefined;
     this.userToken = undefined;
   }
   isAdministrator(){
     return this.userRole === "Administrator";
   }
   isSimple(){
    return this.userRole === "Simple";
  }

  isPermitted(p:PermissionType){
    let permissions = this.userP;
    for (const iterator of permissions) {
      if(iterator.name == p){
        return true
      }
    }
    if(p == PermissionType.Home){
      return true
    }
    return false


}

}
